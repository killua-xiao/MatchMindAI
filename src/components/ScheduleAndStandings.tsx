import React, { useState, useEffect } from "react";
import {
  Trophy,
  History,
  Swords,
  RefreshCw,
  Play,
  TrendingUp,
  Award,
  Users,
  Compass,
  ListFilter,
  Check,
  ChevronRight,
  Flame,
  Search,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { FootballTeam, MatchResult, GameSimulationOutput } from "../types";

interface ScheduleAndStandingsProps {
  teams: FootballTeam[];
}

interface TournamentMatch {
  id: string;
  stage: 'Group' | 'R32' | 'R16' | 'QF' | 'SF' | 'Final';
  groupKey?: string;
  homeTeam: FootballTeam;
  awayTeam: FootballTeam;
  homeScore?: number;
  awayScore?: number;
  homeXg?: number;
  awayXg?: number;
  played: boolean;
  events?: string[];
  possession?: number;
  shots?: { home: number; away: number };
}

interface TeamGroupRecord {
  teamId: string;
  name: string;
  code: string;
  played: number;
  win: number;
  draw: number;
  loss: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  elo: number;
}

export default function ScheduleAndStandings({ teams }: ScheduleAndStandingsProps) {
  // Current tab inside the component
  const [activeSubTab, setActiveSubTab] = useState<"Standings" | "Schedule" | "RecentShowcase">("Standings");
  
  // Active stage filter for schedule
  const [stageFilter, setStageFilter] = useState<'ALL' | 'Group' | 'Knockout' | 'R32' | 'R16' | 'QF' | 'SF' | 'Final'>('ALL');
  const [groupFilter, setGroupFilter] = useState<string>('ALL');

  // Match and Standings State
  const [matches, setMatches] = useState<TournamentMatch[]>([]);
  const [selectedMatchForDetails, setSelectedMatchForDetails] = useState<TournamentMatch | null>(null);

  // Standings map by group
  const [groupStandings, setGroupStandings] = useState<Record<string, TeamGroupRecord[]>>({});

  // Head-to-head recent matchup research state
  const [h2hTeamAId, setH2hTeamAId] = useState<string>("argentina");
  const [h2hTeamBId, setH2hTeamBId] = useState<string>("france");
  const [isH2hSimulating, setIsH2hSimulating] = useState<boolean>(false);
  const [h2hSimResult, setH2hSimResult] = useState<{
    homeWins: number;
    draws: number;
    awayWins: number;
    avgHomeScore: number;
    avgAwayScore: number;
    sampleMatch: GameSimulationOutput;
    insight: string;
  } | null>(null);

  const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

  // Initialize and generate Group Matches
  useEffect(() => {
    if (teams.length < 48) return;
    initializeGroupStage();
  }, [teams]);

  const initializeGroupStage = () => {
    const tempMatches: TournamentMatch[] = [];
    const initialStandings: Record<string, TeamGroupRecord[]> = {};

    groups.forEach(grp => {
      const gTeams = teams.filter(t => t.group === grp);
      
      // Setup initial empty record for group standings
      initialStandings[grp] = gTeams.map(t => ({
        teamId: t.id,
        name: t.name,
        code: t.code,
        played: 0,
        win: 0,
        draw: 0,
        loss: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        pts: 0,
        elo: t.elo
      }));

      // Generate round robin group fixtures
      if (gTeams.length === 4) {
        const pairings = [
          { h: gTeams[0], a: gTeams[1], day: 1 },
          { h: gTeams[2], a: gTeams[3], day: 1 },
          { h: gTeams[0], a: gTeams[2], day: 2 },
          { h: gTeams[1], a: gTeams[3], day: 2 },
          { h: gTeams[3], a: gTeams[0], day: 3 },
          { h: gTeams[1], a: gTeams[2], day: 3 },
        ];

        pairings.forEach((p, idx) => {
          tempMatches.push({
            id: `grp_${grp}_${idx + 1}`,
            stage: "Group",
            groupKey: grp,
            homeTeam: p.h,
            awayTeam: p.a,
            played: false
          });
        });
      }
    });

    setMatches(tempMatches);
    setGroupStandings(initialStandings);
    setH2hSimResult(null);
  };

  // Client-Side Deterministic and Randomized Simulation Engine, matching server.ts exactly
  const simulateModelMatch = (home: FootballTeam, away: FootballTeam, isKnockout: boolean): GameSimulationOutput => {
    // Helper: Poisson distribution goal generator to align with actual football matches
    const getPoissonGoals = (lambda: number): number => {
      const L = Math.exp(-lambda);
      let k = 0;
      let p = 1.0;
      do {
        k++;
        p *= Math.random();
      } while (p > L && k < 15);
      return Math.max(0, k - 1);
    };

    // Comprehensive power compiler to combine ratings, key players, coach experience, form, and confederation
    const calculateRichTeamFactors = (team: FootballTeam) => {
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

      // Manual injuries deduction
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
    };

    const getActiveElo = (t: FootballTeam): number => {
      let loss = 0;
      if (t.injuries && t.injuries.length > 0) {
        loss = t.injuries.reduce((sum, ing) => sum + (ing.impactPercent || 0), 0);
      }
      const reduction = Math.min(200, loss * 15);
      return t.elo - reduction;
    };

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
        homeTacticalBoost += 12;
        fAway.midfieldPower -= 8;
      } else {
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
    const homeVal = (fHome.attackPower * 0.45 + fHome.midfieldPower * 0.35 + fHome.defensePower * 0.20) + (homeActiveElo - 1500) / 12 + homeTacticalBoost + home.ratings.experience * 0.05;
    const awayVal = (fAway.attackPower * 0.45 + fAway.midfieldPower * 0.35 + fAway.defensePower * 0.20) + (awayActiveElo - 1500) / 12 + awayTacticalBoost + away.ratings.experience * 0.05;

    let expectedHomeXg = Math.max(0.3, 1.38 * Math.pow(10, (homeVal - awayVal) / 165));
    let expectedAwayXg = Math.max(0.3, 1.38 * Math.pow(10, (awayVal - homeVal) / 165));

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
    const possession = Math.min(78, Math.max(22, Math.floor(rawHomePoss)));

    const shotsHome = Math.max(3, Math.floor(expectedHomeXg * 5.2 + (Math.random() - 0.5) * 4));
    const shotsAway = Math.max(3, Math.floor(expectedAwayXg * 5.2 + (Math.random() - 0.5) * 4));

    // 7. Timeline events builder (Realistic narratives with real key player names!)
    for (let g = 0; g < homeGoals; g++) {
      const min = Math.floor((g + 1) * (90 / (homeGoals + 1))) + Math.floor(Math.random() * 5);
      const minute = Math.min(90, Math.max(4, min));
      const scorer = home.keyPlayers[Math.floor(Math.random() * home.keyPlayers.length)]?.name || "核心主力";
      
      if (home.tactics.setPiece > 75 && Math.random() < 0.4) {
        events.push(`${minute}' • ⚽ 进球！${home.name} 获得定位球机会，[${scorer}] 在禁区中路高高跃起，一记头槌直飞死角！`);
      } else if (home.tactics.counterAttack > 75 && Math.random() < 0.4) {
        events.push(`${minute}' • ⚽ 进球！${home.name} 顺势踢出防守反击！[${scorer}] 边路带球长驱直入斜射远角破网！`);
      } else {
        events.push(`${minute}' • ⚽ 进球！${home.name} 在盘带配合中撕开对手空档，[${scorer}] 禁区边缘射门，皮球直挂死角！`);
      }
    }

    for (let g = 0; g < awayGoals; g++) {
      const min = Math.floor((g + 1) * (90 / (awayGoals + 1))) + Math.floor(Math.random() * 5);
      const minute = Math.min(90, Math.max(4, min));
      const scorer = away.keyPlayers[Math.floor(Math.random() * away.keyPlayers.length)]?.name || "锋线骑兵";

      if (away.tactics.setPiece > 75 && Math.random() < 0.4) {
        events.push(`${minute}' • ⚽ 进球！${away.name} 任意球传中制造混乱，[${scorer}] 突袭门前扫射完成致命一击！`);
      } else if (away.tactics.counterAttack > 75 && Math.random() < 0.4) {
        events.push(`${minute}' • ⚽ 进球！${away.name} 抢断后断球打出致命直塞，[${scorer}] 单刀面对门将冷静低射破门！`);
      } else {
        events.push(`${minute}' • ⚽ 进球！${away.name} 完成精彩前场进攻串联，[${scorer}] 顺过防守队员推射完成绝杀！`);
      }
    }

    if (home.tactics.pressing > 75 && Math.random() < 0.3) {
      events.push(`${home.name} 的高空拼抢和全场逼抢给蓝方造成极大运转麻烦。`);
    }
    if (away.tactics.pressing > 75 && Math.random() < 0.3) {
      events.push(`${away.name} 的中场高位断球频繁发生，攻守转换节奏极度紧绷。`);
    }

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
      possession,
      shots: { home: shotsHome, away: shotsAway }
    };
  };

  // Simulate a single match and update group standings or advance the bracket
  const runSingleMatchSimulation = (matchId: string) => {
    const updatedMatches = matches.map(m => {
      if (m.id !== matchId || m.played) return m;

      const results = simulateModelMatch(m.homeTeam, m.awayTeam, m.stage !== "Group");
      return {
        ...m,
        played: true,
        homeScore: results.homeTeamScore,
        awayScore: results.awayTeamScore,
        homeXg: results.homeXg,
        awayXg: results.awayXg,
        events: results.events,
        possession: results.possession,
        shots: results.shots
      };
    });

    setMatches(updatedMatches);
    rebuildStandings(updatedMatches);
    propagateKnockoutUpdates(updatedMatches);
  };

  // Run all group stage matches in bulk
  const simulateAllGroupGames = () => {
    const updatedMatches = matches.map(m => {
      if (m.stage !== "Group" || m.played) return m;

      const results = simulateModelMatch(m.homeTeam, m.awayTeam, false);
      return {
        ...m,
        played: true,
        homeScore: results.homeTeamScore,
        awayScore: results.awayTeamScore,
        homeXg: results.homeXg,
        awayXg: results.awayXg,
        events: results.events,
        possession: results.possession,
        shots: results.shots
      };
    });

    setMatches(updatedMatches);
    rebuildStandings(updatedMatches);
    
    // Once all group matches are simulated, we auto-generate the Round of 32!
    setTimeout(() => {
      generateRoundOf32(updatedMatches);
    }, 200);
  };

  // Re-calculate group standings dynamically based on played matches
  const rebuildStandings = (activeMatches: TournamentMatch[]) => {
    const nextStandings: Record<string, TeamGroupRecord[]> = {};

    groups.forEach(grp => {
      const gTeams = teams.filter(t => t.group === grp);
      const teamRecords: Record<string, TeamGroupRecord> = {};

      gTeams.forEach(t => {
        teamRecords[t.id] = {
          teamId: t.id,
          name: t.name,
          code: t.code,
          played: 0,
          win: 0,
          draw: 0,
          loss: 0,
          gf: 0,
          ga: 0,
          gd: 0,
          pts: 0,
          elo: t.elo
        };
      });

      // Filter matches played of this group
      const grpMatches = activeMatches.filter(m => m.stage === "Group" && m.groupKey === grp);

      grpMatches.forEach(m => {
        if (!m.played || m.homeScore === undefined || m.awayScore === undefined) return;

        const hRec = teamRecords[m.homeTeam.id];
        const aRec = teamRecords[m.awayTeam.id];

        if (hRec && aRec) {
          hRec.played += 1;
          aRec.played += 1;
          hRec.gf += m.homeScore;
          hRec.ga += m.awayScore;
          aRec.gf += m.awayScore;
          aRec.ga += m.homeScore;
          hRec.gd += (m.homeScore - m.awayScore);
          aRec.gd += (m.awayScore - m.homeScore);

          if (m.homeScore > m.awayScore) {
            hRec.win += 1;
            hRec.pts += 3;
            aRec.loss += 1;
          } else if (m.awayScore > m.homeScore) {
            aRec.win += 1;
            aRec.pts += 3;
            hRec.loss += 1;
          } else {
            hRec.draw += 1;
            aRec.draw += 1;
            hRec.pts += 1;
            aRec.pts += 1;
          }
        }
      });

      // Sort standing records correctly: points desc, gd desc, gf desc, elo desc
      nextStandings[grp] = Object.values(teamRecords).sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return b.elo - a.elo;
      });
    });

    setGroupStandings(nextStandings);
  };

  // Generate the Knockout Round of 32 based on Group Standings (Top 2 of A-L + 8 Best 3rd place teams)
  const generateRoundOf32 = (activeMatches: TournamentMatch[]) => {
    // 1. Gather all rankings
    const firstPlaces: FootballTeam[] = [];
    const secondPlaces: FootballTeam[] = [];
    const thirdPlaces: { team: FootballTeam; pts: number; gd: number; gf: number; elo: number }[] = [];

    // Temporary calculations of standings
    groups.forEach(grp => {
      const grpTeams = teams.filter(t => t.group === grp);
      const tempRecords: Record<string, TeamGroupRecord> = {};
      grpTeams.forEach(t => {
        tempRecords[t.id] = {
          teamId: t.id, name: t.name, code: t.code, played: 0, win: 0, draw: 0, loss: 0, gf: 0, ga: 0, gd: 0, pts: 0, elo: t.elo
        };
      });

      const grpMatches = activeMatches.filter(m => m.stage === "Group" && m.groupKey === grp);
      grpMatches.forEach(m => {
        if (!m.played || m.homeScore === undefined || m.awayScore === undefined) return;
        const h = tempRecords[m.homeTeam.id];
        const a = tempRecords[m.awayTeam.id];
        if (h && a) {
          h.played += 1; a.played += 1; h.gf += m.homeScore; h.ga += m.awayScore; a.gf += m.awayScore; a.ga += m.homeScore;
          h.gd += (m.homeScore - m.awayScore); a.gd += (m.awayScore - m.homeScore);
          if (m.homeScore > m.awayScore) { h.win += 1; h.pts += 3; a.loss += 1; }
          else if (m.awayScore > m.homeScore) { a.win += 1; a.pts += 3; h.loss += 1; }
          else { h.draw += 1; a.draw += 1; h.pts += 1; a.pts += 1; }
        }
      });

      const sorted = Object.values(tempRecords).sort((a,b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return b.elo - a.elo;
      });

      // Push teams
      const findObj = (id: string) => teams.find(t => t.id === id)!;
      if (sorted[0]) firstPlaces.push(findObj(sorted[0].teamId));
      if (sorted[1]) secondPlaces.push(findObj(sorted[1].teamId));
      if (sorted[2]) thirdPlaces.push({
        team: findObj(sorted[2].teamId),
        pts: sorted[2].pts,
        gd: sorted[2].gd,
        gf: sorted[2].gf,
        elo: sorted[2].elo
      });
    });

    // Sort 3rd place potential advancers
    const sortedThirds = [...thirdPlaces].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      if (b.gf !== a.gf) return b.gf - a.gf;
      return b.elo - a.elo;
    });

    const advancingThirds = sortedThirds.slice(0, 8).map(x => x.team);

    // Build the Round of 32 Pairs (16 Matches)
    // Structure:
    // Match 1-8: Group winners (A to H) vs the 8 advancing third places
    // Match 9-12: Remaining Group Winners (I, J, K, L) vs runners-up of other groups
    // Match 13-16: Remaining runners-up amongst themselves
    const r32Matches: TournamentMatch[] = [];

    // 1. Group Winners vs Third places
    for (let i = 0; i < 8; i++) {
      const winner = firstPlaces[i];
      const third = advancingThirds[i] || secondPlaces[11 - i]; // fallback
      r32Matches.push({
        id: `r32_${i + 1}`,
        stage: "R32",
        homeTeam: winner,
        awayTeam: third,
        played: false
      });
    }

    // 2. Remaining 4 Winners (I to L) vs Runners-up
    for (let i = 8; i < 12; i++) {
      const winner = firstPlaces[i];
      const runnerUp = secondPlaces[i - 8];
      r32Matches.push({
        id: `r32_${i + 1}`,
        stage: "R32",
        homeTeam: winner,
        awayTeam: runnerUp,
        played: false
      });
    }

    // 3. Remaining 8 Runners-up matched
    const remainingRunners = secondPlaces.slice(4);
    for (let i = 0; i < 4; i++) {
      const hTeam = remainingRunners[i * 2];
      const aTeam = remainingRunners[i * 2 + 1];
      r32Matches.push({
        id: `r32_${i + 13}`,
        stage: "R32",
        homeTeam: hTeam,
        awayTeam: aTeam,
        played: false
      });
    }

    // Keep existing group stage games, and add the Round of 32!
    const filteredGroup = activeMatches.filter(m => m.stage === "Group");
    setMatches([...filteredGroup, ...r32Matches]);
  };

  // Propagate Updates to generate subsequent knockout rounds (R16, QF, SF, Final) dynamically when results are recorded!
  const propagateKnockoutUpdates = (activeMatches: TournamentMatch[]) => {
    // Stage check list
    const stages: ('R32' | 'R16' | 'QF' | 'SF' | 'Final')[] = ['R32', 'R16', 'QF', 'SF'];

    stages.forEach(st => {
      const stMatches = activeMatches.filter(m => m.stage === st);
      // If ALL matches of this stage are PLAYED, we generate the next stage pairings
      if (stMatches.length > 0 && stMatches.every(m => m.played)) {
        
        let nextStage: 'R16' | 'QF' | 'SF' | 'Final' = 'R16';
        if (st === 'R32') nextStage = 'R16';
        else if (st === 'R16') nextStage = 'QF';
        else if (st === 'QF') nextStage = 'SF';
        else if (st === 'SF') nextStage = 'Final';

        // Check if next stage matches already exist, if so don't generate duplicate
        const nextExist = activeMatches.some(m => m.stage === nextStage);
        if (nextExist) return;

        const nextMatchesList: TournamentMatch[] = [];
        const winners: FootballTeam[] = [];

        stMatches.forEach(m => {
          if (m.homeScore !== undefined && m.awayScore !== undefined) {
            winners.push(m.homeScore > m.awayScore ? m.homeTeam : m.awayTeam);
          }
        });

        // Pair the winners (e.g. Winner of Match 1 vs Winner of Match 2)
        const matchCount = winners.length / 2;
        for (let i = 0; i < matchCount; i++) {
          const hTeam = winners[i * 2];
          const aTeam = winners[i * 2 + 1];

          nextMatchesList.push({
            id: `${nextStage.toLowerCase()}_${i + 1}`,
            stage: nextStage,
            homeTeam: hTeam,
            awayTeam: aTeam,
            played: false
          });
        }

        activeMatches = [...activeMatches, ...nextMatchesList];
        setMatches(activeMatches);
      }
    });
  };

  // Run H2H Match Simulator for the research tab
  const runH2hSimulations = () => {
    if (!h2hTeamAId || !h2hTeamBId || h2hTeamAId === h2hTeamBId) return;

    setIsH2hSimulating(true);
    setH2hSimResult(null);

    const teamA = teams.find(t => t.id === h2hTeamAId)!;
    const teamB = teams.find(t => t.id === h2hTeamBId)!;

    // Simulate 200 matches in real-time
    setTimeout(() => {
      let homeCount = 0;
      let drawCount = 0;
      let awayCount = 0;
      let homeGoalsSum = 0;
      let awayGoalsSum = 0;
      let sampleMatch: GameSimulationOutput = simulateModelMatch(teamA, teamB, false);

      for (let i = 0; i < 200; i++) {
        const results = simulateModelMatch(teamA, teamB, false);
        homeGoalsSum += results.homeTeamScore;
        awayGoalsSum += results.awayTeamScore;

        if (results.winnerId === teamA.id) homeCount++;
        else if (results.winnerId === teamB.id) awayCount++;
        else drawCount++;
      }

      // Generate strategic advisor text
      let insight = "";
      if (teamA.tactics.possession > 58 && teamB.tactics.counterAttack > 78) {
        insight = `${teamB.name} 是极为犀利的转换反击高手，专门合拢低位防守防缩，借由 ${teamA.name} 的高举传控高位防线，利用纵深空间伺机进行惩罚。`;
      } else if (teamA.tactics.pressing > 78 && teamB.tactics.possession > 58) {
        insight = `${teamA.name} 采取全压迫策略，将全力冲击 ${teamB.name} 从后场耐心推进的战术逻辑。本场战术胜点取决于对抗回收点高度。`;
      } else if (Math.abs(teamA.elo - teamB.elo) < 50) {
        insight = `均势对弈。两队硬实力相当。先得球并执行定位球高空合拢的一方将占据战局极高出线主动权。`;
      } else {
        insight = `${teamA.elo > teamB.elo ? teamA.name : teamB.name} 凭更厚的整体身价及基础 Elo 量级在防空争顶、双后腰抗载拥有数值上的常态压制。`;
      }

      setH2hSimResult({
        homeWins: Math.round((homeCount / 200) * 100),
        draws: Math.round((drawCount / 200) * 100),
        awayWins: Math.round((awayCount / 200) * 100),
        avgHomeScore: parseFloat((homeGoalsSum / 200).toFixed(1)),
        avgAwayScore: parseFloat((awayGoalsSum / 200).toFixed(1)),
        sampleMatch,
        insight
      });
      setIsH2hSimulating(false);
    }, 700);
  };

  const selectedTeamA = teams.find(t => t.id === h2hTeamAId);
  const selectedTeamB = teams.find(t => t.id === h2hTeamBId);

  // Filter schedule list
  const filteredMatchesList = matches.filter(m => {
    let matchesStage = true;
    if (stageFilter === 'Group') matchesStage = m.stage === 'Group';
    else if (stageFilter === 'Knockout') matchesStage = m.stage !== 'Group';
    else if (stageFilter !== 'ALL') matchesStage = m.stage === stageFilter;

    let matchesGroup = true;
    if (groupFilter !== 'ALL') {
      matchesGroup = m.stage === 'Group' && m.groupKey === groupFilter;
    }

    return matchesStage && matchesGroup;
  });

  return (
    <div id="schedule-standings-workbench" className="bg-panel-custom/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden text-white shadow-xl flex flex-col h-full animate-fade-in font-sans">
      
      {/* Upper Command Workspace */}
      <div className="bg-white/[0.02] p-5 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 select-none">
        <div>
          <h2 className="font-semibold text-white tracking-tight text-sm flex items-center gap-2 font-mono uppercase">
            <Trophy className="w-4 h-4 text-accent-custom animate-pulse" />
            2026 世界杯赛程巡模与积分大厅
          </h2>
          <p className="text-xs text-text-secondary">在真实的 12 小组 48 强大赛赛制中一键推演全赛程、追踪球队即时积分，核对历史 H2H 战意</p>
        </div>

        <div className="flex gap-2">
          {activeSubTab === "Schedule" && (
            <button
              onClick={simulateAllGroupGames}
              className="px-4 py-1.5 bg-[#30D158] hover:bg-[#30D158]/85 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer font-sans"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              一键模拟全部小组赛
            </button>
          )}

          <button
            onClick={initializeGroupStage}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white font-medium border border-white/5 rounded-lg text-xs cursor-pointer flex items-center gap-1 transition-colors"
          >
            重置所有对局
          </button>
        </div>
      </div>

      {/* Navigation Sub Tabs */}
      <div className="flex bg-white/[0.01] px-5 border-b border-white/5 text-[10px] font-semibold font-mono">
        <button
          onClick={() => setActiveSubTab("Standings")}
          className={`py-2 px-3.5 border-b-2 hover:text-white transition-colors cursor-pointer ${
            activeSubTab === "Standings" ? "border-accent-custom text-accent-custom font-bold" : "border-transparent text-text-secondary"
          }`}
        >
          <Layers className="w-3.5 h-3.5 inline mr-1" />
          各个小组积分排名 (STANDINGS)
        </button>
        <button
          onClick={() => setActiveSubTab("Schedule")}
          className={`py-2 px-3.5 border-b-2 hover:text-white transition-colors cursor-pointer ${
            activeSubTab === "Schedule" ? "border-accent-custom text-accent-custom font-bold" : "border-transparent text-text-secondary"
          }`}
        >
          <Calendar className="w-3.5 h-3.5 inline mr-1" />
          完整世界杯赛程表 (FIXTURES)
        </button>
        <button
          onClick={() => setActiveSubTab("RecentShowcase")}
          className={`py-2 px-3.5 border-b-2 hover:text-white transition-colors cursor-pointer ${
            activeSubTab === "RecentShowcase" ? "border-accent-custom text-accent-custom font-bold" : "border-transparent text-text-secondary"
          }`}
        >
          <Swords className="w-3.5 h-3.5 inline mr-1" />
          双强最近对阵/历史 H2H 碰撞 (ANALYSIS)
        </button>
      </div>

      {/* Main Container Area */}
      <div className="flex-1 p-5 overflow-y-auto max-h-[640px] bg-transparent">
        
        {/* TAB 1: GROUP STANDINGS GRID */}
        {activeSubTab === "Standings" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 flex items-center justify-between">
              <p className="text-xs text-text-secondary leading-relaxed">
                2026 美墨加世界杯采用全新 48 强架构。共 12 小组（A组至L组），每组前 2 名与 8 个成绩最好的第 3 名晋级 32 强遭遇淘汰赛。
              </p>
              <div className="flex gap-2 font-mono text-[9px] shrink-0">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500" /> 直接晋级</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#0A84FF]" /> 待定资格</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 font-mono">
              {groups.map(grp => {
                const grpStanding = groupStandings[grp] || [];
                return (
                  <div key={grp} className="bg-white/[0.02]/40 border border-white/5 rounded-xl p-4 space-y-3 shadow-md hover:border-white/10 hover:bg-white/[0.03] transition-all">
                    <h3 className="text-xs font-black text-white border-b border-white/5 pb-2 flex justify-between tracking-wider">
                      <span>{grp}组 即时积分表</span>
                      <span className="text-accent-custom text-[10px]">GROUP {grp}</span>
                    </h3>

                    {/* Table Titles */}
                    <div className="grid grid-cols-12 text-[9px] text-text-secondary font-bold pb-1 text-center font-mono">
                      <div className="col-span-1 text-left">#</div>
                      <div className="col-span-5 text-left">球队</div>
                      <div className="col-span-1">赛</div>
                      <div className="col-span-1">胜</div>
                      <div className="col-span-1">平</div>
                      <div className="col-span-1">负</div>
                      <div className="col-span-1">得/失</div>
                      <div className="col-span-1 text-right">分</div>
                    </div>

                    {/* Table Data */}
                    <div className="divide-y divide-white/5 space-y-0.5">
                      {grpStanding.map((record, idx) => {
                        const rowHighlight =
                          idx < 2
                            ? "border-l-2 border-l-emerald-500 pl-1.5"
                            : idx === 2
                            ? "border-l-2 border-l-[#0A84FF] pl-1.5"
                            : "pl-2";

                        return (
                          <div
                            key={record.teamId}
                            className={`grid grid-cols-12 items-center py-2 text-xs font-mono group hover:bg-white/[0.02] rounded-r-lg transition-colors text-center ${rowHighlight}`}
                          >
                            {/* Position */}
                            <div className={`col-span-1 text-left font-black text-[10.5px] ${idx < 2 ? "text-emerald-400" : idx === 2 ? "text-[#0A84FF]" : "text-text-secondary"}`}>
                              {idx + 1}
                            </div>
                            
                            {/* Team Name */}
                            <div className="col-span-5 text-left truncate text-white uppercase font-bold text-[10.5px]">
                              {record.name}
                            </div>

                            {/* Played */}
                            <div className="col-span-1 text-text-secondary text-[10px]">
                              {record.played}
                            </div>

                            {/* Wins */}
                            <div className="col-span-1 text-white">
                              {record.win}
                            </div>

                            {/* Draws */}
                            <div className="col-span-1 text-text-secondary">
                              {record.draw}
                            </div>

                            {/* Losses */}
                            <div className="col-span-1 text-text-secondary">
                              {record.loss}
                            </div>

                            {/* GD */}
                            <div className="col-span-1 text-text-secondary text-[10px]/none">
                              {record.gf}/{record.ga}
                            </div>

                            {/* Pts */}
                            <div className="col-span-1 text-right font-black text-accent-custom text-sm">
                              {record.pts}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED世界杯赛程表 */}
        {activeSubTab === "Schedule" && (
          <div className="space-y-5 animate-fade-in font-mono">
            
            {/* Filters Sub Row */}
            <div className="bg-white/[0.02] p-4 border border-white/5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs select-none">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-text-secondary font-bold text-[10px] uppercase font-mono mr-1">赛程阶段:</span>
                {[
                  { value: 'ALL', label: '全部阶段' },
                  { value: 'Group', label: '小组赛' },
                  { value: 'Knockout', label: '淘汰赛阶段' },
                  { value: 'R32', label: '32强赛' },
                  { value: 'R16', label: '16强决赛' },
                  { value: 'QF', label: '1/4 决赛' },
                  { value: 'SF', label: '半决赛' },
                  { value: 'Final', label: '总决赛' },
                ].map(item => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setStageFilter(item.value as any);
                      if (item.value !== 'Group') setGroupFilter('ALL');
                    }}
                    className={`px-3 py-1 rounded-full border transition-colors cursor-pointer text-[10px] ${
                      stageFilter === item.value
                        ? 'bg-accent-custom border-accent-custom text-white font-bold'
                        : 'bg-white/5 border-white/5 text-text-secondary hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {stageFilter === 'Group' && (
                <div className="flex gap-1 items-center">
                  <span className="text-text-secondary font-bold text-[10px] uppercase font-mono mr-1">小组:</span>
                  <select
                    value={groupFilter}
                    onChange={e => setGroupFilter(e.target.value)}
                    className="bg-panel-custom border border-white/10 rounded px-2 py-0.5 text-xs text-white uppercase focus:outline-none focus:border-accent-custom font-mono"
                  >
                    <option value="ALL">全部小组</option>
                    {groups.map(g => (
                      <option key={g} value={g}>{g} 组</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Simulated Live Matches List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredMatchesList.map(m => {
                const isGroup = m.stage === "Group";
                const borderHighlight = m.played ? "border-white/10 bg-white/[0.03]" : "border-white/5 bg-white/[0.01]";
                
                return (
                  <div
                    key={m.id}
                    className={`border rounded-xl p-4 flex flex-col justify-between gap-3 shadow-md hover:border-white/15 transition-all relative ${borderHighlight}`}
                  >
                    {/* Upper Line Header */}
                    <div className="flex justify-between items-center text-[9px] text-text-secondary border-b border-white/5 pb-1.5 font-bold uppercase">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-accent-custom" />
                        {isGroup ? `小组赛 ${m.groupKey}组` : m.stage === "R32" ? "多哈 32强淘汰赛" : m.stage === "R16" ? "美墨加 1/8决赛" : m.stage === "QF" ? "1/4 决赛国家战" : m.stage === "SF" ? "荣耀半决赛" : "洛杉矶冠冕之夜"}
                      </span>
                      <span>#{m.id}</span>
                    </div>

                    {/* Scores confrontation view */}
                    <div className="grid grid-cols-5 items-center justify-between py-2 text-center select-none">
                      
                      {/* Home team */}
                      <div className="col-span-2 text-center space-y-1">
                        <span className="text-xs uppercase text-text-secondary font-bold block">{m.homeTeam.code}</span>
                        <span className="text-sm font-semibold truncate block text-white px-1 leading-tight">{m.homeTeam.name}</span>
                        <span className="text-[10px] text-white/40 block">Elo {m.homeTeam.elo}</span>
                      </div>

                      {/* Middle score display */}
                      <div className="col-span-1 text-center py-1 select-text">
                        {m.played ? (
                          <div className="space-y-1">
                            <span className="text-2xl font-black text-white font-mono tracking-tight block">
                              {m.homeScore} - {m.awayScore}
                            </span>
                            <span className="text-[9px] text-accent-custom bg-accent-custom/5 border border-accent-custom/10 rounded px-1.5 py-0.2 font-mono">
                              完场
                            </span>
                          </div>
                        ) : (
                          <span className="text-text-secondary/55 text-sm font-bold font-mono tracking-wide">
                            VS
                          </span>
                        )}
                      </div>

                      {/* Away team */}
                      <div className="col-span-2 text-center space-y-1">
                        <span className="text-xs uppercase text-text-secondary font-bold block">{m.awayTeam.code}</span>
                        <span className="text-sm font-semibold truncate block text-white px-1 leading-tight">{m.awayTeam.name}</span>
                        <span className="text-[10px] text-white/40 block">Elo {m.awayTeam.elo}</span>
                      </div>
                    </div>

                    {/* Footer Details action nodes */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-2.5 mt-1">
                      
                      <div className="text-[10px] text-text-secondary font-mono">
                        {m.played && m.homeXg !== undefined ? (
                          <span>
                            xG 期望: <b className="text-white">{m.homeXg}</b> - <b className="text-white">{m.awayXg}</b>
                          </span>
                        ) : (
                          <span className="text-white/35 italic">盘口对局待推演</span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {m.played && m.events && m.events.length > 0 && (
                          <button
                            onClick={() => setSelectedMatchForDetails(m)}
                            className="text-[10px] text-accent-custom hover:text-accent-custom/80 font-bold flex items-center gap-0.5 cursor-pointer"
                          >
                            战况简报
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}

                        {!m.played && (
                          <button
                            onClick={() => runSingleMatchSimulation(m.id)}
                            className="bg-accent-custom hover:bg-accent-custom/85 text-white font-bold text-[10px] px-2.5 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <Play className="w-2.5 h-2.5 fill-current text-white" />
                            模拟
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredMatchesList.length === 0 && (
              <div className="py-20 text-center text-slate-500 font-mono italic bg-white/[0.01] border border-dashed border-white/5 rounded-2xl select-none">
                当前阶段在所选的小组中没有生成的赛程。若小组赛已模拟完毕，淘汰赛队伍名单将自动进阶至相应的下一轮淘汰板块中。
              </div>
            )}
          </div>
        )}

        {/* TAB 3: H2H RECENT MATCHUPS RESEARCH PROBE */}
        {activeSubTab === "RecentShowcase" && (
          <div className="space-y-6 animate-fade-in font-sans">
            
            <div className="bg-white/[0.02] p-4 border border-white/5 rounded-2xl space-y-2 select-none">
              <h3 className="font-semibold text-white text-xs flex items-center gap-1.5 uppercase font-mono tracking-wider">
                <Swords className="w-4 h-4 text-accent-custom" />
                国家对位历史与最近真实比赛 (H2H) 特征探诊
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                自选任意两支首发世界杯强队，系统将自动核算检索历史国际 qualifier、联谊友谊赛等真实攻防数据，自适应拟合动态战力雷达，并计算多维概率对决期望。
              </p>
            </div>

            {/* Selection Grid picker */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center bg-white/[0.02] p-5 rounded-2xl border border-white/5 font-mono text-xs">
              <div className="md:col-span-4 space-y-1">
                <label className="text-[10px] text-text-secondary font-bold block uppercase tracking-wider">首选研判代表队 (ALPHA)</label>
                <select
                  value={h2hTeamAId}
                  onChange={e => setH2hTeamAId(e.target.value)}
                  className="w-full bg-panel-custom border border-white/10 rounded-lg px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-accent-custom font-mono cursor-pointer"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.id} className="bg-panel-custom text-white">{t.name} (Elo {t.elo})</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3 text-center flex flex-col items-center justify-center pt-2 md:pt-0">
                <span className="text-[9px] font-extrabold text-[#0A84FF] border border-[#0A84FF]/25 px-2.5 py-0.5 rounded-full bg-[#0A84FF]/5 uppercase font-mono tracking-wider">
                  双战对立智脑
                </span>
                <button
                  onClick={runH2hSimulations}
                  disabled={isH2hSimulating || h2hTeamAId === h2hTeamBId}
                  className="mt-3 text-xs font-semibold px-4.5 py-1.8 bg-accent-custom hover:bg-accent-custom/90 text-white rounded-lg flex items-center gap-1 shadow-md cursor-pointer disabled:opacity-40"
                >
                  {isH2hSimulating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      运行推演计算中
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      对阵期望多轮重构
                    </>
                  )}
                </button>
              </div>

              <div className="md:col-span-4 space-y-1 text-right">
                <label className="text-[10px] text-text-secondary font-bold block uppercase tracking-wider">次备研判代表队 (BETA)</label>
                <select
                  value={h2hTeamBId}
                  onChange={e => setH2hTeamBId(e.target.value)}
                  className="w-full bg-panel-custom border border-white/10 rounded-lg px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-accent-custom text-right font-mono cursor-pointer"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.id} className="bg-panel-custom text-white">{t.name} (Elo {t.elo})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Teams detailed contrast sheets */}
            {selectedTeamA && selectedTeamB && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Team A Details Card */}
                <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-start border-b border-white/5 pb-2">
                    <div>
                      <span className="text-[10px] text-text-secondary font-mono">{selectedTeamA.code} • {selectedTeamA.confederation}</span>
                      <h4 className="font-bold text-white text-base mt-0.5">{selectedTeamA.name}</h4>
                    </div>
                    <span className="text-xl font-black font-mono text-accent-custom">{selectedTeamA.elo} <span className="text-[9px] text-text-secondary font-normal">Elo</span></span>
                  </div>

                  {/* Recent Real Match History (展现真实/塞入历史战绩数据以方便研究对局情况) */}
                  <div className="space-y-2.5">
                    <span className="text-[9.5px] font-bold text-text-secondary block tracking-wider uppercase font-mono">
                      近 5 场国际战绩与对手 (RECENT FORM)
                    </span>
                    <div className="space-y-1.5 font-mono text-[10.5px]">
                      {selectedTeamA.recentForm && selectedTeamA.recentForm.slice(0, 5).map((match, idx) => {
                        const winColor = match.outcome === 'W' ? 'text-emerald-400 bg-emerald-500/10' : match.outcome === 'L' ? 'text-red-400 bg-red-400/10' : 'text-slate-300 bg-white/5';
                        return (
                          <div key={idx} className="flex justify-between items-center py-1 border-b border-white/4">
                            <span className="text-white/80 font-bold truncate pr-2">vs {match.opponent}</span>
                            <div className="flex gap-2 items-center shrink-0">
                              <span className="text-[9.5px] text-text-secondary/80 font-mono">{match.date} • {match.type}</span>
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[9px] ${winColor}`}>
                                {match.outcome}
                              </span>
                              <span className="font-bold text-white w-8 text-right text-[10px]">{match.score}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tactics parameters */}
                  <div className="space-y-2 pt-2 text-[11px] font-mono border-t border-white/5">
                    <span className="text-[9.5px] font-bold text-text-secondary block tracking-wider uppercase">主帅首发战术几何:</span>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">战术落位:</span>
                      <span className="text-white font-bold">{selectedTeamA.tactics.preferredFormation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">传控制持球:</span>
                      <span className="text-white font-bold">{selectedTeamA.tactics.possession}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">高位逼抢度:</span>
                      <span className="text-white font-bold">{selectedTeamA.tactics.pressing}/100</span>
                    </div>
                  </div>
                </div>

                {/* Simulation Middle Board Comparison */}
                <div className="lg:col-span-4 flex flex-col justify-between bg-white/[0.01] border border-white/5 rounded-2xl p-5 select-none text-xs">
                  
                  {h2hSimResult ? (
                    <div className="space-y-5 animate-fade-in font-mono">
                      <h4 className="text-center text-[10px] font-bold text-text-secondary uppercase tracking-widest block font-mono">
                        蒙特卡洛碰撞模拟盘口 (200 轮拟合)
                      </h4>

                      {/* Odds list percentage block */}
                      <div className="space-y-2 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                        <div className="flex justify-between text-[10.5px] font-bold text-text-secondary">
                          <span>{selectedTeamA.name} 胜</span>
                          <span>平局</span>
                          <span>{selectedTeamB.name} 胜</span>
                        </div>
                        <div className="flex h-4 rounded-full overflow-hidden text-[9px] font-bold shadow-inner">
                          <div className="bg-accent-custom flex items-center justify-center text-white" style={{ width: `${h2hSimResult.homeWins}%` }}>
                            {h2hSimResult.homeWins}%
                          </div>
                          <div className="bg-white/5 border-x border-white/5 flex items-center justify-center text-text-secondary" style={{ width: `${h2hSimResult.draws}%` }}>
                            {h2hSimResult.draws}%
                          </div>
                          <div className="bg-white/20 flex items-center justify-center text-white" style={{ width: `${h2hSimResult.awayWins}%` }}>
                            {h2hSimResult.awayWins}%
                          </div>
                        </div>
                      </div>

                      {/* Mean goals scored list */}
                      <div className="p-4 bg-white/[0.03] border border-white/5 rounded-xl text-center space-y-1">
                        <span className="text-[9.5px] uppercase text-text-secondary tracking-wider block">模拟平均完场大盘比分</span>
                        <div className="text-3xl font-black font-sans text-white tracking-tight leading-none py-1 block">
                          {h2hSimResult.avgHomeScore} - {h2hSimResult.avgAwayScore}
                        </div>
                        <span className="text-[9px] text-[#30D158] block pt-0.5">期望进球 xG {h2hSimResult.sampleMatch.homeXg} vs {h2hSimResult.sampleMatch.awayXg}</span>
                      </div>

                      {/* Strategic analysis advisement */}
                      <div className="p-3 bg-accent-custom/5 border-l-2 border-l-accent-custom border border-white/5 rounded-r-xl space-y-1">
                        <span className="text-[10px] font-bold text-white flex items-center gap-1 font-mono uppercase">
                          <Compass className="w-3 h-3 text-accent-custom" />
                          战术交弈智脑研判
                        </span>
                        <p className="text-[10.5px] text-white/80 leading-relaxed leading-normal font-sans">{h2hSimResult.insight}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-text-secondary p-5 uppercase font-mono text-[10px] space-y-3">
                      <Swords className="w-8 h-8 text-white/10 animate-pulse" />
                      <div className="space-y-1">
                        <p>请点击上部 “对阵期望多轮重构” 按钮</p>
                        <p className="text-white/35 font-sans leading-normal mt-1">模拟大盘将立即展现两队交手胜平负大盘变数以及专业技智分析</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Team B Details Card */}
                <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-start border-b border-white/5 pb-2">
                    <div>
                      <span className="text-[10px] text-text-secondary font-mono">{selectedTeamB.code} • {selectedTeamB.confederation}</span>
                      <h4 className="font-bold text-white text-base mt-0.5">{selectedTeamB.name}</h4>
                    </div>
                    <span className="text-xl font-black font-mono text-accent-custom">{selectedTeamB.elo} <span className="text-[9px] text-text-secondary font-normal">Elo</span></span>
                  </div>

                  {/* Recent Real Match History (展现真实/塞入历史战绩数据以方便研究对局情况) */}
                  <div className="space-y-2.5">
                    <span className="text-[9.5px] font-bold text-text-secondary block tracking-wider uppercase font-mono">
                      近 5 场国际战绩与对手 (RECENT FORM)
                    </span>
                    <div className="space-y-1.5 font-mono text-[10.5px]">
                      {selectedTeamB.recentForm && selectedTeamB.recentForm.slice(0, 5).map((match, idx) => {
                        const winColor = match.outcome === 'W' ? 'text-emerald-400 bg-emerald-500/10' : match.outcome === 'L' ? 'text-red-400 bg-red-400/10' : 'text-slate-300 bg-white/5';
                        return (
                          <div key={idx} className="flex justify-between items-center py-1 border-b border-white/4">
                            <span className="text-white/80 font-bold truncate pr-2">vs {match.opponent}</span>
                            <div className="flex gap-2 items-center shrink-0">
                              <span className="text-[9.5px] text-text-secondary/80 font-mono">{match.date} • {match.type}</span>
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[9px] ${winColor}`}>
                                {match.outcome}
                              </span>
                              <span className="font-bold text-white w-8 text-right text-[10px]">{match.score}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tactics parameters */}
                  <div className="space-y-2 pt-2 text-[11px] font-mono border-t border-white/5">
                    <span className="text-[9.5px] font-bold text-text-secondary block tracking-wider uppercase">主帅首发战术几何:</span>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">战术落位:</span>
                      <span className="text-white font-bold">{selectedTeamB.tactics.preferredFormation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">传控制持球:</span>
                      <span className="text-white font-bold">{selectedTeamB.tactics.possession}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">高位逼抢度:</span>
                      <span className="text-white font-bold">{selectedTeamB.tactics.pressing}/100</span>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

      </div>

      {/* MODAL / BOTTOM SHEET DIALOG FOR SINGLE MATCH HIGHLIGHT EVENTS */}
      {selectedMatchForDetails && (
        <div className="fixed inset-0 bg-[#07070e]/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-panel-custom border border-white/10 rounded-2xl p-5 w-full max-w-lg shadow-[0_8px_32px_rgba(0,0,0,0.5)] space-y-4">
            
            <div className="flex justify-between items-start border-b border-white/5 pb-2">
              <div>
                <h3 className="font-extrabold text-white text-sm font-sans uppercase">
                  世界杯完场模拟赛事回盘记录
                </h3>
                <p className="text-xs text-text-secondary">赛事 ID: {selectedMatchForDetails.id}</p>
              </div>
              <button
                onClick={() => setSelectedMatchForDetails(null)}
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer transition-colors text-xs font-mono font-bold"
              >
                ✕
              </button>
            </div>

            {/* Scorecard block */}
            <div className="grid grid-cols-3 bg-white/[0.02] border border-white/5 rounded-xl p-4 items-center text-center font-mono select-none">
              <div className="space-y-0.5">
                <span className="text-xs uppercase text-text-secondary font-bold block">{selectedMatchForDetails.homeTeam.code}</span>
                <span className="text-sm font-semibold text-white truncate block">{selectedMatchForDetails.homeTeam.name}</span>
                <span className="text-[10px] text-accent-custom block">xG {selectedMatchForDetails.homeXg}</span>
              </div>

              <div className="space-y-1 border-x border-white/5">
                <span className="text-[9px] uppercase text-text-secondary font-bold block">最终战果</span>
                <span className="text-2xl font-black text-white block">
                  {selectedMatchForDetails.homeScore} - {selectedMatchForDetails.awayScore}
                </span>
                <span className="text-[9px] text-[#30D158] bg-[#30D158]/5 border border-[#30D158]/10 px-1.5 py-0.2 rounded-full inline-block font-bold">
                  控球 {selectedMatchForDetails.possession}%
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-xs uppercase text-text-secondary font-bold block">{selectedMatchForDetails.awayTeam.code}</span>
                <span className="text-sm font-semibold text-white truncate block">{selectedMatchForDetails.awayTeam.name}</span>
                <span className="text-[10px] text-accent-custom block">xG {selectedMatchForDetails.awayXg}</span>
              </div>
            </div>

            {/* Events timeline */}
            <div className="space-y-2 max-h-[250px] overflow-y-auto w-full pr-1 font-mono">
              <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-1 select-none pb-1.5 border-b border-white/5">
                <Flame className="w-3.5 h-3.5 text-accent-custom" />
                赛地对攻亮点还原
              </h4>
              <div className="space-y-2 text-[11px] leading-relaxed">
                {selectedMatchForDetails.events && selectedMatchForDetails.events.length > 0 ? (
                  selectedMatchForDetails.events.map((ev, i) => (
                    <div key={i} className="flex gap-2 items-start py-0.5 text-xs text-left">
                      <span className="text-accent-custom font-bold shrink-0">►</span>
                      <p className="text-slate-200">{ev}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-text-secondary italic text-center py-4">本次比赛推演沙盘未触发重大进球或战损事件。</p>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedMatchForDetails(null)}
              className="w-full bg-accent-custom hover:opacity-95 text-xs text-white font-bold py-2 rounded-xl transition-all cursor-pointer shadow-md"
            >
              确认归档记录
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
