import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { initialTeams, seedSystemLogs } from "./src/data";
import { FootballTeam, MatchResult, SystemLog, GameSimulationOutput } from "./src/types";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store for the session to support dynamic updates
let teamsDb: FootballTeam[] = JSON.parse(JSON.stringify(initialTeams));
let systemLogs: SystemLog[] = JSON.parse(JSON.stringify(seedSystemLogs));

// Helper: Calculate active Elo for a team accounting for current injuries
function getActiveElo(team: FootballTeam): number {
  let injuryImpact = 0;
  if (team.injuries && team.injuries.length > 0) {
    injuryImpact = team.injuries.reduce((sum, ing) => sum + (ing.impactPercent || 0), 0);
  }
  // Max reduction of 200 Elo points for severe injuries
  const reduction = Math.min(200, injuryImpact * 15);
  return team.elo - reduction;
}

// Helper: Poisson distribution goal generator to align with actual football matches
function getPoissonGoals(lambda: number): number {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1.0;
  do {
    k++;
    p *= Math.random();
  } while (p > L && k < 15);
  return Math.max(0, k - 1);
}

// Comprehensive power compiler to combine ratings, key players, coach experience, form, and confederation
function calculateRichTeamFactors(team: FootballTeam): {
  attackPower: number;
  midfieldPower: number;
  defensePower: number;
  setPiece: number;
  possession: number;
  physicality: number;
} {
  const keyPlayers = team.keyPlayers || [];
  
  // Calculate average healthy/doubtful key player ratings by role
  const getRoleAvgRating = (role: 'GK' | 'DEF' | 'MID' | 'FWD', defaultVal: number): number => {
    const playersOfRole = keyPlayers.filter(p => p.role === role);
    if (playersOfRole.length === 0) return defaultVal;
    
    let sum = 0;
    let weight = 0;
    playersOfRole.forEach(p => {
      let r = p.rating || 80;
      let w = 1.0;
      if (p.status === 'Injured') { r *= 0.1; w = 0.1; }
      else if (p.status === 'Suspended') { r *= 0.1; w = 0.1; }
      else if (p.status === 'Doubtful') { r *= 0.7; w = 0.8; }
      sum += r;
      weight += w;
    });
    return weight > 0 ? (sum / weight) : defaultVal;
  };

  const fwRating = getRoleAvgRating('FWD', team.ratings.attack);
  const mdRating = getRoleAvgRating('MID', team.ratings.midfield);
  const dfRating = getRoleAvgRating('DEF', team.ratings.defense);
  const gkRating = getRoleAvgRating('GK', Math.max(70, team.ratings.defense - 2));

  // Base capabilities
  let attackPower = team.ratings.attack * 0.55 + fwRating * 0.45;
  let midfieldPower = team.ratings.midfield * 0.55 + mdRating * 0.45;
  let defensePower = team.ratings.defense * 0.55 + dfRating * 0.35 + gkRating * 0.10;

  // Manual injuries deduction (explicit story reduction)
  if (team.injuries && team.injuries.length > 0) {
    team.injuries.forEach(inj => {
      const reduction = (inj.impactPercent || 5) / 100;
      if (inj.role === 'FWD') attackPower *= (1 - reduction);
      else if (inj.role === 'MID') midfieldPower *= (1 - reduction);
      else if (inj.role === 'DEF' || inj.role === 'GK') defensePower *= (1 - reduction);
    });
  }

  // Momentum index based on recent matches form
  let formMultiplier = 1.0;
  if (team.recentForm && team.recentForm.length > 0) {
    const last3 = team.recentForm.slice(0, 3);
    let pts = 0;
    last3.forEach(m => {
      if (m.outcome === 'W') pts += 3;
      else if (m.outcome === 'D') pts += 1;
    });
    const avgPts = pts / last3.length;
    formMultiplier += (avgPts - 1.5) * 0.035; // -5.2% to +5.2%
  }

  // Coach strategy alignment
  let coachBonus = 1.0;
  if (team.coach) {
    coachBonus += Math.min(30, team.coach.experienceYears || 10) * 0.0012; // Experience weight
    const style = (team.coach.style || "").toLowerCase();
    
    // Style matches tactics
    if ((style.includes("逼抢") || style.includes("压迫") || style.includes("press")) && team.tactics.pressing > 75) {
      coachBonus += 0.015;
    }
    if ((style.includes("传控") || style.includes("控球") || style.includes("tiki")) && team.tactics.possession > 58) {
      coachBonus += 0.015;
    }
    if ((style.includes("防守") || style.includes("低位") || style.includes("block")) && team.tactics.defenseLine < 48) {
      coachBonus += 0.015;
    }
    if ((style.includes("反击") || style.includes("直接") || style.includes("counter")) && team.tactics.counterAttack > 75) {
      coachBonus += 0.015;
    }
  }

  // Confederation Tier Adjustments
  let confMult = 1.0;
  if (team.confederation === 'UEFA' || team.confederation === 'CONMEBOL') confMult = 1.025;
  else if (team.confederation === 'CONCACAF' || team.confederation === 'CAF') confMult = 0.99;
  else if (team.confederation === 'AFC') confMult = 0.975;
  else confMult = 0.95;

  return {
    attackPower: attackPower * formMultiplier * coachBonus * confMult,
    midfieldPower: midfieldPower * formMultiplier * coachBonus * confMult,
    defensePower: defensePower * formMultiplier * coachBonus * confMult,
    setPiece: team.tactics.setPiece,
    possession: team.tactics.possession,
    physicality: team.tactics.physicality
  };
}

// -------------------------------------------------------------------------
// Single Match Simulator (Deterministic & Randomized models)
// -------------------------------------------------------------------------
function simulateMatch(home: FootballTeam, away: FootballTeam, isKnockout: boolean): GameSimulationOutput {
  // 1. Get detailed team factors
  const fHome = calculateRichTeamFactors(home);
  const fAway = calculateRichTeamFactors(away);

  // 2. Compute dynamic Elo incorporating injuries
  const homeActiveElo = getActiveElo(home);
  const awayActiveElo = getActiveElo(away);

  // 3. Tactical clash modifiers
  let homeTacticalBoost = 0;
  let awayTacticalBoost = 0;

  // Class A: High Press vs Possession Build
  if (home.tactics.pressing > 76 && away.tactics.possession > 60) {
    if (home.tactics.physicality > 75) {
      // Successful high block turnovers
      homeTacticalBoost += 12;
      fAway.midfieldPower -= 8;
    } else {
      // Tiring out press
      awayTacticalBoost += 8;
      fHome.defensePower -= 5;
    }
  }
  if (away.tactics.pressing > 76 && home.tactics.possession > 60) {
    if (away.tactics.physicality > 75) {
      awayTacticalBoost += 12;
      fHome.midfieldPower -= 8;
    } else {
      homeTacticalBoost += 8;
      fAway.defensePower -= 5;
    }
  }

  // Class B: Counter Attack style vs High Line Traps
  if (home.tactics.counterAttack > 76 && away.tactics.defenseLine > 65) {
    // Dangerous counter bursts
    homeTacticalBoost += 15;
    fAway.defensePower -= 8;
  }
  if (away.tactics.counterAttack > 76 && home.tactics.defenseLine > 65) {
    awayTacticalBoost += 15;
    fHome.defensePower -= 8;
  }

  // Class C: Physical dominance and dual locks
  const physicalDiff = home.tactics.physicality - away.tactics.physicality;
  if (physicalDiff > 10) {
    homeTacticalBoost += 6;
    fAway.midfieldPower -= 4;
  } else if (physicalDiff < -10) {
    awayTacticalBoost += 6;
    fHome.midfieldPower -= 4;
  }

  // Class D: Set Pieces over Defense
  if (home.tactics.setPiece > 75 && fAway.defensePower < 75) {
    homeTacticalBoost += 8;
  }
  if (away.tactics.setPiece > 75 && fHome.defensePower < 75) {
    awayTacticalBoost += 8;
  }

  // 4. Calculate Expected xG
  // We model base ratings difference and raw Elo strength difference
  const homeVal = (fHome.attackPower * 0.45 + fHome.midfieldPower * 0.35 + fHome.defensePower * 0.20) + (homeActiveElo - 1500) / 12 + homeTacticalBoost + home.ratings.experience * 0.05;
  const awayVal = (fAway.attackPower * 0.45 + fAway.midfieldPower * 0.35 + fAway.defensePower * 0.20) + (awayActiveElo - 1500) / 12 + awayTacticalBoost + away.ratings.experience * 0.05;

  // Expected xG scoreline exponential comparison
  let expectedHomeXg = Math.max(0.3, 1.38 * Math.pow(10, (homeVal - awayVal) / 165));
  let expectedAwayXg = Math.max(0.3, 1.38 * Math.pow(10, (awayVal - homeVal) / 165));

  // Cap them cleanly
  expectedHomeXg = parseFloat(Math.min(4.9, Math.max(0.25, expectedHomeXg)).toFixed(2));
  expectedAwayXg = parseFloat(Math.min(4.9, Math.max(0.25, expectedAwayXg)).toFixed(2));

  // 5. Goal simulation with Poisson distribution matching realistic match results
  const homeGoals = getPoissonGoals(expectedHomeXg);
  const awayGoals = getPoissonGoals(expectedAwayXg);

  let winnerId: string | 'Draw' = 'Draw';
  let events: string[] = [];

  if (homeGoals > awayGoals) {
    winnerId = home.id;
  } else if (awayGoals > homeGoals) {
    winnerId = away.id;
  } else if (isKnockout) {
    // Extra time or penalty resolution
    const penaltyChance = 0.5 + (homeActiveElo - awayActiveElo) / 2200;
    if (Math.random() < penaltyChance) {
      winnerId = home.id;
      events.push(`加时赛战罢比分停留在 ${homeGoals}-${awayGoals}。在残酷的点球大战里，${home.name} 顶住巨大压力 4-3 击败对手晋级！`);
    } else {
      winnerId = away.id;
      events.push(`加时赛战罢比分停留在 ${homeGoals}-${awayGoals}。在残酷的点球大战里，${away.name} 以 5-4 点球绝杀，淘汰对手挺进下一轮！`);
    }
  }

  // 6. Secondary stats: Possession & Shots
  const possessionDiff = home.tactics.possession - away.tactics.possession;
  const rawHomePoss = 50 + possessionDiff * 0.45 + (fHome.midfieldPower - fAway.midfieldPower) * 0.15 + (Math.random() - 0.5) * 6;
  const homePossession = Math.min(78, Math.max(22, Math.floor(rawHomePoss)));

  const shotHome = Math.max(3, Math.floor(expectedHomeXg * 5.2 + (Math.random() - 0.5) * 4));
  const shotAway = Math.max(3, Math.floor(expectedAwayXg * 5.2 + (Math.random() - 0.5) * 4));

  // 7. Timeline events builder (Realistic narratives with real key player names!)
  // Build home team goals highlights
  for (let g = 0; g < homeGoals; g++) {
    const min = Math.floor((g + 1) * (90 / (homeGoals + 1))) + Math.floor(Math.random() * 5);
    const minute = Math.min(90, Math.max(4, min));
    
    // Choose player
    const scorer = home.keyPlayers[Math.floor(Math.random() * home.keyPlayers.length)]?.name || "核心主力";
    
    // Scenarios based on home style
    if (home.tactics.setPiece > 75 && Math.random() < 0.4) {
      events.push(`${minute}' • ⚽ 进球！${home.name} 获得定位球机会，[${scorer}] 在禁区中路高高跃起，一记势大力沉的强力头槌飞入球门右上角！`);
    } else if (home.tactics.counterAttack > 75 && Math.random() < 0.4) {
      events.push(`${minute}' • ⚽ 进球！${home.name} 顺势踢出教科书级的防守反击！[${scorer}] 边路带球切入禁区，冷静抽射远角得手！`);
    } else {
      events.push(`${minute}' • ⚽ 进球！${home.name} 在前场通过倒脚制造出绝妙空档，[${scorer}] 禁区边缘拔脚怒射，皮球擦着立柱应声入网！`);
    }
  }

  // Build away team goals highlights
  for (let g = 0; g < awayGoals; g++) {
    const min = Math.floor((g + 1) * (90 / (awayGoals + 1))) + Math.floor(Math.random() * 5);
    const minute = Math.min(90, Math.max(4, min));
    const scorer = away.keyPlayers[Math.floor(Math.random() * away.keyPlayers.length)]?.name || "重锤尖兵";

    if (away.tactics.setPiece > 75 && Math.random() < 0.4) {
      events.push(`${minute}' • ⚽ 进球！${away.name} 任意球传入后防混乱空挡，[${scorer}] 拍马赶到，混战中凌空抽射完成致命一锤！`);
    } else if (away.tactics.counterAttack > 75 && Math.random() < 0.4) {
      events.push(`${minute}' • ⚽ 进球！${away.name} 抢断后打出致命直塞穿透防线，[${scorer}] 反越位晃过出击的防守球星低射空门完成最后一击！`);
    } else {
      events.push(`${minute}' • ⚽ 进球！${away.name} 中路连续做出精彩踢墙二过一配合，[${scorer}] 挑射越过倒地封堵的门将破网！`);
    }
  }

  // General tactical highlights
  if (home.tactics.pressing > 75 && Math.random() < 0.3) {
    events.push(`${home.name} 的高位疯狂逼抢策略全场施力，致使对手中后场传丢球次数增加。`);
  }
  if (away.tactics.pressing > 75 && Math.random() < 0.3) {
    events.push(`${away.name} 的全攻全守高位阻击迫使对方频频采取长传高空争顶。`);
  }
  if (home.tactics.physicality > 78 && away.tactics.physicality < 70 && Math.random() < 0.3) {
    events.push(`${home.name} 的身体对抗强度明显拉满，在中圈多次放铲并在物理二点球争中夺得主动。`);
  }

  // Sort events by minute roughly
  const sortedEvents = [...events].sort((a, b) => {
    const minA = parseInt(a.split("'")[0]) || 999;
    const minB = parseInt(b.split("'")[0]) || 999;
    return minA - minB;
  });

  return {
    homeTeamScore: winnerId === home.id && isKnockout && homeGoals === awayGoals ? homeGoals + 1 : homeGoals,
    awayTeamScore: winnerId === away.id && isKnockout && homeGoals === awayGoals ? awayGoals + 1 : awayGoals,
    homeXg: expectedHomeXg,
    awayXg: expectedAwayXg,
    winnerId,
    events: sortedEvents,
    possession: homePossession,
    shots: { home: shotHome, away: shotAway }
  };
}

// -------------------------------------------------------------------------
// Web API - Handlers
// -------------------------------------------------------------------------

// Retrieve Database
app.get("/api/teams", (req, res) => {
  res.json({ success: true, data: teamsDb });
});

// Update single team (Tactics / Injuries / Players)
app.post("/api/teams/update", (req, res) => {
  const updatedTeam: FootballTeam = req.body;
  if (!updatedTeam || !updatedTeam.id) {
    return res.status(400).json({ success: false, error: "Missing team payload" });
  }

  const index = teamsDb.findIndex(t => t.id === updatedTeam.id);
  if (index === -1) {
    return res.status(440).json({ success: false, error: "Team not found" });
  }

  teamsDb[index] = updatedTeam;

  // Add system sync log
  const newLog: SystemLog = {
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    source: "Tactical Workbench User Console",
    type: "system",
    message: `Manually updated roster/tactics for ${updatedTeam.name}. Re-weighed tactical nodes.`,
    confidenceScore: 100,
    status: "Synced"
  };
  systemLogs.unshift(newLog);

  res.json({ success: true, message: "Team updated successfully", data: updatedTeam });
});

// Seed Initial Reset
app.post("/api/teams/reset", (req, res) => {
  teamsDb = JSON.parse(JSON.stringify(initialTeams));
  systemLogs = JSON.parse(JSON.stringify(seedSystemLogs));
  res.json({ success: true, data: teamsDb });
});

// Get Crawford Sync logs
app.get("/api/logs", (req, res) => {
  res.json({ success: true, data: systemLogs });
});

// Trigger mock data scraper
app.post("/api/logs/crawl", (req, res) => {
  const sources = ["FIFA Data Hub", "Opta Pro", "Understat xG", "Sky Sports Football", "CONMEBOL Media Feed"];
  const selectedSource = sources[Math.floor(Math.random() * sources.length)];
  const randomEvents = [
    {
      type: "injury" as const,
      message: "Scraped latest physical logs. Hazard indicators suggest moderate fatigue warning for midfielders."
    },
    {
      type: "crawler" as const,
      message: "Analyzed xG ratios from recent international qualifiers. Adjusted counterAttack scores."
    },
    {
      type: "crawler" as const,
      message: "Scraped official line-up charts. Detected tactical change towards 3-4-2-1 formation for central teams."
    },
    {
      type: "injury" as const,
      message: "Injury update: Star forwards declared fully recovered and added to the first-team rosters."
    }
  ];

  const randomEv = randomEvents[Math.floor(Math.random() * randomEvents.length)];

  const newLog: SystemLog = {
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    source: selectedSource,
    type: randomEv.type,
    message: `[${selectedSource}] ${randomEv.message}`,
    confidenceScore: Math.floor(Math.random() * 15) + 84, // 84-99
    status: Math.random() > 0.35 ? "Synced" : "Conflict Resolved"
  };

  systemLogs.unshift(newLog);
  if (systemLogs.length > 50) systemLogs.pop(); // Cap at 50

  res.json({ success: true, log: newLog, data: systemLogs });
});

// Compare Head to Head match directly
app.post("/api/predict-match", (req, res) => {
  const { homeId, awayId } = req.body;
  const home = teamsDb.find(t => t.id === homeId);
  const away = teamsDb.find(t => t.id === awayId);

  if (!home || !away) {
    return res.status(400).json({ success: false, error: "Missing team identifiers" });
  }

  // Generate 5 simulations to return average stats
  const sims = Array.from({ length: 5 }).map(() => simulateMatch(home, away, true));
  const avgHomeScore = parseFloat((sims.reduce((sum, s) => sum + s.homeTeamScore, 0) / 5).toFixed(1));
  const avgAwayScore = parseFloat((sims.reduce((sum, s) => sum + s.awayTeamScore, 0) / 5).toFixed(1));

  // Find percentage match out of 100 runs
  let homeWins = 0;
  let draws = 0;
  let awayWins = 0;
  for (let i = 0; i < 200; i++) {
    const s = simulateMatch(home, away, false);
    if (s.winnerId === home.id) homeWins++;
    else if (s.winnerId === away.id) awayWins++;
    else draws++;
  }

  // Key match-up logic (Who counters who) - Highly enriched professional scout report
  const eloDiff = home.elo - away.elo;
  const homeInjCount = home.injuries?.length || 0;
  const awayInjCount = away.injuries?.length || 0;

  let insights: string[] = [];

  // Paragraph 1: Power comparison and Elo profile
  if (Math.abs(eloDiff) > 120) {
    const strong = eloDiff > 0 ? home : away;
    const weak = eloDiff > 0 ? away : home;
    insights.push(`双方硬实力 (Elo 世界战力评分) 差距达 ${Math.abs(eloDiff)} 点。${strong.name} 在赛会统治力、阵容底蕴和三条线均衡度上具有明显底牌优势。${weak.name} 需要采取极致防守纪律和抓取高效率的反攻突击才具备“爆冷制敌”的可能。`);
  } else {
    insights.push(`两队世界排名 Elo 分值旗鼓相当 (差距仅 ${Math.abs(eloDiff)} 点)，是一场高水平、针尖对麦芒的火星遭遇战。局部的处理细节和主帅战术板的针对性博弈将直接左右比赛走势。`);
  }

  // Paragraph 2: Tactical style battle & counters
  if (home.tactics.possession > 58 && away.tactics.counterAttack > 76) {
    insights.push(`【战术格局】主队 ${home.name} 倡导高控球主动权 (${home.tactics.possession}/100)，依靠中前区边锋内切制造多过载；而客队 ${away.name} 的防守反击系数高达 ${away.tactics.counterAttack}/100。客队会极力缩减防守纵深，在主队大举压上时，凭借长线直塞和两翼插上打穿主队高置的防守位置 (${home.tactics.defenseLine}/100)。`);
  } else if (away.tactics.possession > 58 && home.tactics.counterAttack > 76) {
    insights.push(`【战术格局】客队 ${away.name} 将主动回收并采用控球分流策略 (${away.tactics.possession}/100)；而主队 ${home.name} 会伺机引蛇出洞，利用强大的防守反击评分 (${home.tactics.counterAttack}/100) 进行闪击战。`);
  } else if (home.tactics.pressing > 78 && away.tactics.pressing > 78) {
    insights.push(`【全场压榨】双方主帅均视高位逼抢为主要生命线 (压榨逼抢值分别高达 ${home.tactics.pressing} 与 ${away.tactics.pressing})。比赛可能在中场腹地演变成极为残酷的绞杀战，二点球夺回效率和核心接球人瞬间的出球决策度决定谁能保持攻打节奏。`);
  }

  // Paragraph 3: Physical & set piece variables
  if (home.tactics.physicality > 78 || away.tactics.physicality > 78) {
    const tough = home.tactics.physicality > away.tactics.physicality ? home : away;
    insights.push(`【对抗负荷】${tough.name} 的球队对抗硬度分值高达 ${tough.tactics.physicality}。在防守站位、禁区拦截等关键情境下防线队员极为凶悍，这将在防守反击与下半场高肉搏度变阵中带来可观的物理对抗红利。`);
  }

  if (home.tactics.setPiece > 78 && away.ratings.defense < 78) {
    insights.push(`【定位球突刺】主队定位球得分细节打磨极深 (${home.tactics.setPiece}/100)，在客队略逊的防守抗压分下，前场任意球或角球机会有望为主队斩获奇效。`);
  } else if (away.tactics.setPiece > 78 && home.ratings.defense < 78) {
    insights.push(`【定位球突刺】客队定位球得分战术精细度极佳 (${away.tactics.setPiece}/100)，而主队在防线空档中对高空横断极易产生盯人真空，需规避给对手过多前场任意球。`);
  }

  // Paragraph 4: Injury impact
  if (homeInjCount > 0 || awayInjCount > 0) {
    let injTxt = "【伤缺与板凳轮换】";
    if (homeInjCount > 0) injTxt += `主队主力伤病 (核心主力如 ${home.injuries[0].playerName} 预计缺课) 造成了 ${home.injuries[0].impactPercent}% 的战术降权。`;
    if (awayInjCount > 0) injTxt += `客队方面面临主力 ${away.injuries[0].playerName} 的严重影响。主教练对战局的控制将非常依赖客队轮换深度 (${away.ratings.benchDepth}/100) 储备的发挥。`;
    insights.push(injTxt);
  }

  const tacticalInsight = insights.join("\n\n");

  res.json({
    success: true,
    predictedHomeScore: avgHomeScore,
    predictedAwayScore: avgAwayScore,
    homeProbability: Math.round((homeWins / 200) * 100),
    drawProbability: Math.round((draws / 200) * 100),
    awayProbability: Math.round((awayWins / 200) * 100),
    simulationSample: sims[0], // Send first randomized run details
    tacticalInsight
  });
});

// -------------------------------------------------------------------------
// Full-Featured Monte Carlo Simulation Engine (1000 Independent runs)
// -------------------------------------------------------------------------
app.post("/api/simulate", (req, res) => {
  const runsCount = 1000;
  const teamStatsMap: Record<string, {
    groupStageExit: number;
    roundOf32: number;
    roundOf16: number;
    quarterFinal: number;
    semiFinal: number;
    finalist: number;
    champion: number;
  }> = {};

  // Initialize map
  teamsDb.forEach(t => {
    teamStatsMap[t.id] = {
      groupStageExit: 0,
      roundOf32: 0,
      roundOf16: 0,
      quarterFinal: 0,
      semiFinal: 0,
      finalist: 0,
      champion: 0
    };
  });

  const groupKeys: ("A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L")[] = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"
  ];

  // Run Monte Carlo Loops
  for (let r = 0; r < runsCount; r++) {
    const groupStageAdvancers: string[] = []; // top 2 from each group + 8 best thirds (total 32)
    const thirdPlacedTeams: { id: string; points: number; gd: number; gs: number; elo: number }[] = [];

    // 1. Group Stage
    groupKeys.forEach(groupName => {
      const groupTeams = teamsDb.filter(t => t.group === groupName);
      if (groupTeams.length !== 4) return; // safety boundary

      const standings: Record<string, { points: number; gd: number; gs: number }> = {};
      groupTeams.forEach(t => standings[t.id] = { points: 0, gd: 0, gs: 0 });

      // Round robin matches
      for (let i = 0; i < groupTeams.length; i++) {
        for (let j = i + 1; j < groupTeams.length; j++) {
          const tA = groupTeams[i];
          const tB = groupTeams[j];
          const m = simulateMatch(tA, tB, false);

          standings[tA.id].gs += m.homeTeamScore;
          standings[tA.id].gd += (m.homeTeamScore - m.awayTeamScore);

          standings[tB.id].gs += m.awayTeamScore;
          standings[tB.id].gd += (m.awayTeamScore - m.homeTeamScore);

          if (m.winnerId === tA.id) {
            standings[tA.id].points += 3;
          } else if (m.winnerId === tB.id) {
            standings[tB.id].points += 3;
          } else {
            standings[tA.id].points += 1;
            standings[tB.id].points += 1;
          }
        }
      }

      // Sort group teams
      const sortedGroupTeams = [...groupTeams].sort((a, b) => {
        const sA = standings[a.id];
        const sB = standings[b.id];
        if (sA.points !== sB.points) return sB.points - sA.points;
        if (sA.gd !== sB.gd) return sB.gd - sA.gd;
        return sB.gs - sA.gs;
      });

      // Top 2 advance
      groupStageAdvancers.push(sortedGroupTeams[0].id);
      groupStageAdvancers.push(sortedGroupTeams[1].id);

      // Third placed goes to comparative pool
      const third = sortedGroupTeams[2];
      thirdPlacedTeams.push({
        id: third.id,
        points: standings[third.id].points,
        gd: standings[third.id].gd,
        gs: standings[third.id].gs,
        elo: getActiveElo(third)
      });

      // Bottom place exits
      teamStatsMap[sortedGroupTeams[3].id].groupStageExit++;
    });

    // Sort thirds to pick top 8
    thirdPlacedTeams.sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points;
      if (a.gd !== b.gd) return b.gd - a.gd;
      if (a.gs !== b.gs) return b.gs - a.gs;
      return b.elo - a.elo;
    });

    // Top 8 of 3rd-placers advance
    for (let idx = 0; idx < 12; idx++) {
      const th = thirdPlacedTeams[idx];
      if (idx < 8) {
        groupStageAdvancers.push(th.id);
      } else {
        teamStatsMap[th.id].groupStageExit++;
      }
    }

    // 2. Knockout Phases Simulation

    // --- ROUND OF 32 ---
    // Let's pair the 32 teams.
    const roundOf32Winners: string[] = [];
    const paired32: string[] = [...groupStageAdvancers];
    
    // Quick random pairing for simulation integrity
    for (let p = 0; p < 16; p++) {
      const idA = paired32[p * 2];
      const idB = paired32[p * 2 + 1];
      const teamA = teamsDb.find(t => t.id === idA) || teamsDb[0];
      const teamB = teamsDb.find(t => t.id === idB) || teamsDb[1];
      // In knockout matches, there is a winner
      const match = simulateMatch(teamA, teamB, true);
      const winner = match.winnerId;
      const loser = winner === teamA.id ? teamB.id : teamA.id;

      if (teamStatsMap[loser]) {
        teamStatsMap[loser].roundOf32++;
      }
      roundOf32Winners.push(winner);
    }

    // --- ROUND OF 16 ---
    const roundOf16Winners: string[] = [];
    for (let p = 0; p < 8; p++) {
      const idA = roundOf32Winners[p * 2];
      const idB = roundOf32Winners[p * 2 + 1];
      const teamA = teamsDb.find(t => t.id === idA) || teamsDb[0];
      const teamB = teamsDb.find(t => t.id === idB) || teamsDb[1];
      const match = simulateMatch(teamA, teamB, true);
      const winner = match.winnerId;
      const loser = winner === teamA.id ? teamB.id : teamA.id;

      if (teamStatsMap[loser]) {
        teamStatsMap[loser].roundOf16++;
      }
      roundOf16Winners.push(winner);
    }

    // --- QUARTER FINALS ---
    const quarterFinalWinners: string[] = [];
    for (let p = 0; p < 4; p++) {
      const idA = roundOf16Winners[p * 2];
      const idB = roundOf16Winners[p * 2 + 1];
      const teamA = teamsDb.find(t => t.id === idA) || teamsDb[0];
      const teamB = teamsDb.find(t => t.id === idB) || teamsDb[1];
      const match = simulateMatch(teamA, teamB, true);
      const winner = match.winnerId;
      const loser = winner === teamA.id ? teamB.id : teamA.id;

      if (teamStatsMap[loser]) {
        teamStatsMap[loser].quarterFinal++;
      }
      quarterFinalWinners.push(winner);
    }

    // --- SEMI FINALS ---
    const finalistWinners: string[] = [];
    for (let p = 0; p < 2; p++) {
      const idA = quarterFinalWinners[p * 2];
      const idB = quarterFinalWinners[p * 2 + 1];
      const teamA = teamsDb.find(t => t.id === idA) || teamsDb[0];
      const teamB = teamsDb.find(t => t.id === idB) || teamsDb[1];
      const match = simulateMatch(teamA, teamB, true);
      const winner = match.winnerId;
      const loser = winner === teamA.id ? teamB.id : teamA.id;

      if (teamStatsMap[loser]) {
        teamStatsMap[loser].semiFinal++;
      }
      finalistWinners.push(winner);
    }

    // --- FINAL ---
    const idA = finalistWinners[0];
    const idB = finalistWinners[1];
    const teamA = teamsDb.find(t => t.id === idA) || teamsDb[0];
    const teamB = teamsDb.find(t => t.id === idB) || teamsDb[1];
    const match = simulateMatch(teamA, teamB, true);
    const championId = match.winnerId;
    const finalistLoser = championId === teamA.id ? teamB.id : teamA.id;

    if (teamStatsMap[finalistLoser]) {
      teamStatsMap[finalistLoser].finalist++;
    }
    if (teamStatsMap[championId]) {
      teamStatsMap[championId].champion++;
    }
  }

  // Turn counters into percentages out of runsCount (1000)
  const outcomesFormatted = Object.keys(teamStatsMap).map(teamId => {
    const stats = teamStatsMap[teamId];
    const team = teamsDb.find(t => t.id === teamId)!;
    
    // Generate automatic high-quality tactical summary explanation based on their ratings
    let explanation = "";
    if (stats.champion > runsCount * 0.10) {
      explanation = `Ranked as top tier world powerhouse with stellar Elo ${team.elo}. Dominant central line with ${team.keyPlayers[0].name} gives them elite capacity to command knockout matches.`;
    } else if (stats.champion > runsCount * 0.04) {
      explanation = `Highly functional contenders. Anchored by coach ${team.coach.name}, their ${team.tactics.preferredFormation} formation shows high durability (${team.ratings.experience} experience score), making them heavy threats on modern transitions.`;
    } else if (stats.roundOf16 > runsCount * 0.40) {
      explanation = `Mid-tier heavyweights. Group escape chances look very favorable (${Math.round(((runsCount - stats.groupStageExit)/runsCount)*100)}%), though physical depth may show fatigue limits in subsequent double-knockout brackets.`;
    } else {
      explanation = `Underdog status. Prone to early transitions exhaustion. Key tactician focus targets must maximize low block set-piece goals (${team.tactics.setPiece}/100 score) to pull off potential group-stage upsets.`;
    }

    return {
      teamId,
      teamName: team.name,
      teamCode: team.code,
      group: team.group,
      elo: team.elo,
      groupStageExit: parseFloat(((stats.groupStageExit / runsCount) * 100).toFixed(1)),
      roundOf32: parseFloat(((stats.roundOf32 / runsCount) * 100).toFixed(1)),
      roundOf16: parseFloat(((stats.roundOf16 / runsCount) * 100).toFixed(1)),
      quarterFinal: parseFloat(((stats.quarterFinal / runsCount) * 100).toFixed(1)),
      semiFinal: parseFloat(((stats.semiFinal / runsCount) * 100).toFixed(1)),
      finalist: parseFloat(((stats.finalist / runsCount) * 100).toFixed(1)),
      champion: parseFloat(((stats.champion / runsCount) * 100).toFixed(1)),
      explanation
    };
  });

  res.json({ success: true, runsCalculated: runsCount, results: outcomesFormatted });
});

// -------------------------------------------------------------------------
// Secure Server-Side Gemini API Integration
// -------------------------------------------------------------------------
app.post("/api/gemini/generate-report", async (req, res) => {
  const { prompt, type, extraContext } = req.body;
  if (!prompt) {
    return res.status(400).json({ success: false, error: "Prompt is required" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "GEMINI_API_KEY is not defined in the workspace environment secrets."
      });
    }

    // Initialize modern @google/genai SDK on the server according to guidelines
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });

    const systemInstructions = `You are a professional tactical head scout and veteran football data analyst for a leading sports monitoring firm.
Generate complete, elite, highly structure technical reports. Use professional football language and precise analysis frameworks:
1. Break down style characteristics (Defense line height, pressing density, transitions speed).
2. Contrast tactical formations (e.g., 4-3-3 central numerical control vs 3-4-2-1 double-ten overloading).
3. Do not include unneeded metadata. Do not talk about your internal software architecture or port numbers. Focus only on soccer and pure analysis.
Return response rendered in clear Markdown only. Make headers spacious and scannable. Ready for PDF rendering.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstructions,
        temperature: 0.85
      }
    });

    res.json({
      success: true,
      report: response.text || "No analysis report was generated by the model."
    });

  } catch (error: any) {
    console.error("Gemini reporting error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to interact with server-side Gemini API."
    });
  }
});

// -------------------------------------------------------------------------
// Express / Vite asset handler routing pipeline (Standard framework middleware)
// -------------------------------------------------------------------------
async function run() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FIFA 2026 Workbench full-stack server alive at: http://localhost:${PORT}`);
  });
}

run();
