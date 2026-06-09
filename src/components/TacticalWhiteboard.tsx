import React, { useState, useRef, useEffect } from "react";
import {
  Swords,
  RotateCcw,
  Plus,
  Play,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  AlertTriangle,
  Zap,
  Target,
  Users,
  Compass,
  ArrowRightLeft
} from "lucide-react";
import { FootballTeam, KeyPlayer } from "../types";

interface TacticalWhiteboardProps {
  teams: FootballTeam[];
}

interface Magnet {
  id: string;
  name: string;
  number: number;
  role: 'GK' | 'DEF' | 'MID' | 'FWD' | 'BALL';
  x: number; // percentage width 0-100
  y: number; // percentage height 0-100
  color: string;
}

export default function TacticalWhiteboard({ teams = [] }: TacticalWhiteboardProps) {
  // If teams is not loaded yet, guard
  if (!teams || teams.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-slate-400 font-mono italic">
        正在装载世界杯48强数据，请稍等...
      </div>
    );
  }

  // Active matchups states
  const [selectedHomeId, setSelectedHomeId] = useState<string>("argentina");
  const [selectedAwayId, setSelectedAwayId] = useState<string>("france");

  const homeTeam = teams.find(t => t.id === selectedHomeId) || teams[0];
  const awayTeam = teams.find(t => t.id === selectedAwayId) || teams[1];

  const [magnets, setMagnets] = useState<Magnet[]>([]);
  const [selectedMagnetId, setSelectedMagnetId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse formations and generate coordinates for 11 Home & 11 Away players
  useEffect(() => {
    generateSquadMagnets();
  }, [selectedHomeId, selectedAwayId, teams]);

  const generateSquadMagnets = () => {
    const newMagnets: Magnet[] = [];

    // Formations parameters
    const homeForm = homeTeam.tactics.preferredFormation || "4-3-3";
    const awayForm = awayTeam.tactics.preferredFormation || "4-3-3";

    // 1. Generate Team A (HOME - RED - TOP, attacks down)
    const homePlayers = getTeamLineup(homeTeam, 11);
    const homeCoords = getFormationCoordinates(homeForm, "HOME");

    for (let i = 0; i < 11; i++) {
      const p = homePlayers[i];
      const coord = homeCoords[i] || { x: 50, y: 25 };
      newMagnets.push({
        id: `home_${i + 1}`,
        name: p.name,
        number: p.number,
        role: p.role,
        x: coord.x,
        y: coord.y,
        color: "bg-[#FF453A]"
      });
    }

    // 2. Generate Team B (AWAY - BLUE - BOTTOM, defends up)
    const awayPlayers = getTeamLineup(awayTeam, 11);
    const awayCoords = getFormationCoordinates(awayForm, "AWAY");

    for (let i = 0; i < 11; i++) {
      const p = awayPlayers[i];
      const coord = awayCoords[i] || { x: 50, y: 75 };
      newMagnets.push({
        id: `away_${i + 1}`,
        name: p.name,
        number: p.number,
        role: p.role,
        x: coord.x,
        y: coord.y,
        color: "bg-[#0A84FF]"
      });
    }

    // 3. Add ball in the middle
    newMagnets.push({
      id: "ball",
      name: "比赛用球",
      number: 0,
      role: "BALL",
      x: 50,
      y: 50,
      color: "bg-[#FFD60A] text-black border-dashed"
    });

    setMagnets(newMagnets);
  };

  // Extract or synthesize 11 starters for a team
  const getTeamLineup = (team: FootballTeam, count: number): { name: string; number: number; role: Magnet['role'] }[] => {
    const lineup: { name: string; number: number; role: Magnet['role'] }[] = [];
    
    // Use actual key players as high priority
    const keys = team.keyPlayers || [];
    
    // Add real players first
    keys.forEach((kp, idx) => {
      lineup.push({
        name: kp.name,
        number: idx === 0 ? 10 : idx === 1 ? 9 : idx === 2 ? 7 : idx === 3 ? 4 : 8,
        role: kp.role
      });
    });

    // Fill the rest with high quality tactical generic players to complete 11 starters
    const rolesToFill: Magnet['role'][] = ['GK', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID', 'MID', 'FWD', 'FWD', 'FWD'];
    let idx = lineup.length;

    while (lineup.length < count) {
      const genericRole = rolesToFill[lineup.length] || 'MID';
      const number = lineup.length === 0 ? 1 : lineup.length + 1;
      lineup.push({
        name: `${genericRole}-${number}号`,
        number,
        role: genericRole
      });
    }

    // Ensure there is exactly one GK
    const hasGk = lineup.some(p => p.role === 'GK');
    if (!hasGk) {
      lineup[0].role = 'GK';
      lineup[0].name = keys[0]?.name || "门神";
      lineup[0].number = 1;
    }

    return lineup.slice(0, count);
  };

  // Helper to coordinate locations matching tactical layout shapes
  const getFormationCoordinates = (formation: string, side: "HOME" | "AWAY"): { x: number; y: number }[] => {
    const coords: { x: number; y: number }[] = [];
    const parts = formation.split("-").map(Number);
    const dfCount = parts[0] || 4;
    const mfCount = parts[1] || 3;
    const fwCount = parts[2] || 3;
    const amfCount = parts[3] || 0; // handle e.g. 4-2-3-1

    const isHome = side === "HOME";

    // Standard rows definition depending on who is attacking/defending
    const yGk = isHome ? 7 : 93;
    const yDf = isHome ? 20 : 80;
    const yMf = isHome ? 34 : 66;
    const yAm = isHome ? 41 : 59;
    const yFw = isHome ? 46 : 54;

    // 1. Goal Keeper
    coords.push({ x: 50, y: yGk });

    // 2. Defenders Distribution
    for (let i = 0; i < dfCount; i++) {
      let x = 50;
      if (dfCount === 4) {
        const xVals = [15, 38, 62, 85];
        x = xVals[i];
      } else if (dfCount === 3) {
        const xVals = [25, 50, 75];
        x = xVals[i];
      } else if (dfCount === 5) {
        const xVals = [12, 31, 50, 69, 88];
        x = xVals[i];
      } else {
        x = 10 + (80 / (dfCount - 1)) * i;
      }
      coords.push({ x, y: yDf });
    }

    // 3. Midfielders Distribution
    const totalMf = mfCount + amfCount;
    for (let i = 0; i < mfCount; i++) {
      let x = 50;
      if (mfCount === 3) {
        const xVals = [30, 50, 70];
        x = xVals[i];
      } else if (mfCount === 4) {
        const xVals = [18, 39, 61, 82];
        x = xVals[i];
      } else if (mfCount === 2) {
        const xVals = [35, 65];
        x = xVals[i];
      } else if (mfCount === 5) {
        const xVals = [15, 32, 50, 68, 85];
        x = xVals[i];
      } else {
        x = 15 + (70 / (mfCount - 1)) * i;
      }
      coords.push({ x, y: yMf });
    }

    // Attacking Midfielders Row (if exists, e.g. 4-2-3-1 secondary row)
    if (amfCount > 0) {
      for (let i = 0; i < amfCount; i++) {
        let x = 50;
        if (amfCount === 3) {
          x = [22, 50, 78][i];
        } else if (amfCount === 1) {
          x = 50;
        } else {
          x = 25 + (50 / (amfCount - 1)) * i;
        }
        coords.push({ x, y: yAm });
      }
    }

    // 4. Forwards Distribution
    for (let i = 0; i < fwCount; i++) {
      let x = 50;
      if (fwCount === 3) {
        const xVals = [20, 50, 80];
        x = xVals[i];
      } else if (fwCount === 2) {
        const xVals = [36, 64];
        x = xVals[i];
      } else if (fwCount === 1) {
        x = 50;
      } else {
        x = 20 + (60 / (fwCount - 1)) * i;
      }
      coords.push({ x, y: yFw });
    }

    return coords;
  };

  // Pointer dragging operations
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.preventDefault();
    setSelectedMagnetId(id);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!selectedMagnetId || !containerRef.current) return;
    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const constrainedX = Math.min(97, Math.max(3, x));
    const constrainedY = Math.min(97, Math.max(3, y));

    setMagnets(prev =>
      prev.map(m => (m.id === selectedMagnetId ? { ...m, x: parseFloat(constrainedX.toFixed(1)), y: parseFloat(constrainedY.toFixed(1)) } : m))
    );
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (selectedMagnetId) {
      setSelectedMagnetId(null);
    }
  };

  // Tactical Insight calculations (计算两队的优劣势)
  const getTacticalAnalysis = () => {
    const insights: { type: "strength" | "weakness" | "neutral", title: string, text: string }[] = [];

    // Compare ELO
    const eloDifference = homeTeam.elo - awayTeam.elo;
    if (Math.abs(eloDifference) > 150) {
      const stronger = eloDifference > 0 ? homeTeam : awayTeam;
      const weaker = eloDifference > 0 ? awayTeam : homeTeam;
      insights.push({
        type: "strength",
        title: `🏆 战意压制 (${stronger.name})`,
        text: `${stronger.name} 凭高出 ${Math.abs(eloDifference)} 点的 Elo 战力，在硬实力、双后腰轮换厚度具有常态压制。`
      });
    }

    // Formation analysis
    const homeForm = homeTeam.tactics.preferredFormation;
    const awayForm = awayTeam.tactics.preferredFormation;
    if (homeForm === "4-3-3" && awayForm === "5-3-2") {
      insights.push({
        type: "neutral",
        title: "🛡️ 阵型博弈 (宽度 vs 纵深)",
        text: `${homeTeam.name}的 4-3-3 阵形注重边路深度过载，而 ${awayTeam.name} 的五后卫三中卫防线能极致锁住禁区纵深防守。边路下底质量是胜负手。`
      });
    } else if (homeForm === "3-5-2" && awayForm === "4-3-3") {
      insights.push({
        type: "strength",
        title: "⚡ 中场人数超载优势",
        text: `${homeTeam.name} 的 3-5-2 在中圈拥有 5 人强硬防区，对 ${awayTeam.name} 的 3 中场能形成局部绞杀与控制链。`
      });
    } else {
      insights.push({
        type: "neutral",
        title: "⚔️ 阵型格斗",
        text: `红方 ${homeTeam.name} (${homeForm}) 对位 蓝方 ${awayTeam.name} (${awayForm})。是一场讲求空间压迫与局部抗载的阵地碰撞。`
      });
    }

    // Tactic Counter: Pressing vs Possession
    if (homeTeam.tactics.pressing > 75 && awayTeam.tactics.possession < 55) {
      insights.push({
        type: "strength",
        title: `🔥 红方高位阻击红利 (${homeTeam.name})`,
        text: `红方高位逼抢度达 ${homeTeam.tactics.pressing}，能有效克制蓝方相对薄弱的后场出球，极易拦截并在对手危险区域获得打反击机会。`
      });
    }

    // Tactic Counter: Counterattack vs High Defensive Line
    if (awayTeam.tactics.counterAttack > 78 && homeTeam.tactics.defenseLine > 70) {
      insights.push({
        type: "weakness",
        title: `⚠️ 红方防线纵深隐患 (${homeTeam.name})`,
        text: `红方造越界防守线位置极高 (${homeTeam.tactics.defenseLine})，面对蓝方 ${awayTeam.tactics.counterAttack} 强攻击反击套路，极易在攻防转换瞬间被打穿身后。`
      });
    }

    // Direct retrieved database parameters
    if (homeTeam.strengths && homeTeam.strengths.length > 0) {
      insights.push({
        type: "strength",
        title: `✨ 红方特长: ${homeTeam.strengths[0]}`,
        text: `结合常设战术库，红方在赛会中表现出极佳的: ${homeTeam.strengths.join(", ")}。`
      });
    }

    if (awayTeam.weaknesses && awayTeam.weaknesses.length > 0) {
      insights.push({
        type: "weakness",
        title: `🚨 蓝方罩门: ${awayTeam.weaknesses[0]}`,
        text: `蓝防线在国际 A 级赛事中时常暴露出: ${awayTeam.weaknesses.join(", ")}，这是红方战术演练应主攻的区域。`
      });
    }

    return insights;
  };

  return (
    <div id="interactive-tactical-lab" className="bg-panel-custom/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden font-sans text-white p-5 space-y-5 shadow-xl animate-fade-in flex flex-col h-full">
      
      {/* Upper selector workspace */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/5 pb-4 gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2 font-mono uppercase">
            <Swords className="w-4 h-4 text-accent-custom animate-pulse" />
            2026 世界杯对阵战术演练盘口 (TACTICAL DESK)
          </h2>
          <p className="text-xs text-text-secondary">选择任意世界杯两支对阵队伍，自动渲染其真实阵型、比对双强战术特长与博弈优劣势</p>
        </div>

        <div className="flex bg-white/[0.02] p-2.5 rounded-xl border border-white/5 items-center gap-3">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF453A]" />
            <select
              value={selectedHomeId}
              onChange={e => setSelectedHomeId(e.target.value)}
              className="bg-panel-custom border border-white/10 rounded px-2.5 py-1 text-xs text-white max-w-[110px] focus:outline-none focus:border-accent-custom font-sans font-semibold cursor-pointer"
            >
              {teams.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <ArrowRightLeft className="w-3.5 h-3.5 text-text-secondary" />

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0A84FF]" />
            <select
              value={selectedAwayId}
              onChange={e => setSelectedAwayId(e.target.value)}
              className="bg-panel-custom border border-white/10 rounded px-2.5 py-1 text-xs text-white max-w-[110px] focus:outline-none focus:border-accent-custom font-sans font-semibold cursor-pointer"
            >
              {teams.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main split work board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        
        {/* Left 8 columns: Interactive Green Ground Chalkboard */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="flex justify-between items-center text-[10px] text-text-secondary font-mono uppercase bg-white/[0.01] p-2 rounded-lg border border-white/5">
            <span>🔴 {homeTeam.name}首发 ({homeTeam.tactics.preferredFormation})</span>
            <span className="text-accent-custom">您可以拖拽任意球员棋子与皮球进行对位演练</span>
            <span>🔵 {awayTeam.name}首发 ({awayTeam.tactics.preferredFormation})</span>
          </div>

          {/* Interactive green ground field container */}
          <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative bg-[#022C22] border-2 border-[#0F5132]/60 rounded-2xl overflow-hidden shadow-inner select-none cursor-crosshair min-h-[480px]"
            style={{
              backgroundImage: "radial-gradient(circle, #022c22 40%, #01140f 90%)"
            }}
          >
            {/* Markings */}
            <div className="absolute inset-3.5 border border-white/8 pointer-events-none rounded-lg" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/8 pointer-events-none rounded-full" />
            <div className="absolute top-1/2 left-3.5 right-3.5 h-0.5 bg-white/8 pointer-events-none" />
            
            {/* Penalty boxes */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-64 h-22 border border-t-0 border-white/8 pointer-events-none" />
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-8 border border-t-0 border-white/8 pointer-events-none" />
            
            <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 w-64 h-22 border border-b-0 border-white/8 pointer-events-none" />
            <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 w-28 h-8 border border-b-0 border-white/8 pointer-events-none" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full pointer-events-none" />

            {/* Corner quarters */}
            <div className="absolute top-3.5 left-3.5 w-4 h-4 border-r border-b border-white/8 rounded-br pointer-events-none" />
            <div className="absolute top-3.5 right-3.5 w-4 h-4 border-l border-b border-white/8 rounded-bl pointer-events-none" />
            <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-r border-t border-white/8 pointer-events-none rounded-tr" />
            <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-l border-t border-white/8 pointer-events-none rounded-tl" />

            {/* Render magnets */}
            {magnets.map(mag => {
              const isBall = mag.role === "BALL";
              const isHome = mag.id.startsWith("home");
              const glowColor = isHome 
                ? "shadow-[0_0_8px_#FF453A] border-[#FF453A]/40" 
                : isBall 
                ? "shadow-[0_0_12px_#FFD60A] border-white text-[11px]" 
                : "shadow-[0_0_8px_#0A84FF] border-[#0A84FF]/40";

              return (
                <div
                  key={mag.id}
                  onPointerDown={e => handlePointerDown(mag.id, e)}
                  style={{
                    left: `${mag.x}%`,
                    top: `${mag.y}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  className={`absolute w-7.5 h-7.5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] text-white select-none shadow-lg cursor-grab active:cursor-grabbing border transition-transform hover:scale-120 active:scale-95 ${mag.color} ${glowColor} group`}
                >
                  {isBall ? "⚽" : mag.number}

                  {/* Enhanced Tooltip pointing real player name and exact role */}
                  <div className="absolute bottom-9 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-black/90 text-white font-sans text-[10px] py-1 px-2.5 rounded border border-white/10 whitespace-nowrap z-50 pointer-events-none transition-all flex flex-col items-center">
                    <span className="font-semibold text-white">{mag.name}</span>
                    <span className="text-[8px] text-text-secondary mt-0.5 tracking-wider uppercase font-mono">{isBall ? "皮球" : `${isHome ? homeTeam.name : awayTeam.name} • ${mag.role}`}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center bg-white/[0.01] p-3 rounded-xl border border-white/5 font-mono text-[10px] select-none text-text-secondary">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-[#FF453A]" /> {homeTeam.name} 攻势棋</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-[#0A84FF]" /> {awayTeam.name} 拦截棋</span>
            <button
              onClick={generateSquadMagnets}
              className="py-1 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-white text-[10px] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3 h-3" /> snap/重归战术默认落点
            </button>
          </div>
        </div>

        {/* Right 4 columns: Tactical Contrasts, Pros/Cons & Dynamic Stats Metrics */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Quick Stats Bars side-by-side comparison */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4.5 space-y-4">
            <h3 className="text-xs font-bold font-mono tracking-wider text-white uppercase border-b border-white/5 pb-2">
              📊 真实战意与攻防几何对比
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {/* Elo rating */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-red-400 font-bold">{homeTeam.elo} <span className="text-[9px] font-normal text-text-secondary">Elo</span></span>
                  <span className="text-text-secondary text-[10px] uppercase font-bold">硬实力分值</span>
                  <span className="text-[#0A84FF] font-bold">{awayTeam.elo} <span className="text-[9px] font-normal text-text-secondary">Elo</span></span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden flex">
                  <div className="bg-red-500" style={{ width: `${(homeTeam.elo / (homeTeam.elo + awayTeam.elo)) * 100}%` }} />
                  <div className="bg-[#0A84FF]" style={{ width: `${(awayTeam.elo / (homeTeam.elo + awayTeam.elo)) * 100}%` }} />
                </div>
              </div>

              {/* Attack rating */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-red-400 font-bold">{homeTeam.ratings.attack}</span>
                  <span className="text-text-secondary text-[10px] uppercase font-bold">攻击评估</span>
                  <span className="text-[#0A84FF] font-bold">{awayTeam.ratings.attack}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden flex">
                  <div className="bg-red-500" style={{ width: `${(homeTeam.ratings.attack / (homeTeam.ratings.attack + awayTeam.ratings.attack)) * 100}%` }} />
                  <div className="bg-[#0A84FF]" style={{ width: `${(awayTeam.ratings.attack / (homeTeam.ratings.attack + awayTeam.ratings.attack)) * 100}%` }} />
                </div>
              </div>

              {/* Midfield rating */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-red-400 font-bold">{homeTeam.ratings.midfield}</span>
                  <span className="text-text-secondary text-[10px] uppercase font-bold">中圈合拢</span>
                  <span className="text-[#0A84FF] font-bold">{awayTeam.ratings.midfield}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden flex">
                  <div className="bg-red-500" style={{ width: `${(homeTeam.ratings.midfield / (homeTeam.ratings.midfield + awayTeam.ratings.midfield)) * 100}%` }} />
                  <div className="bg-[#0A84FF]" style={{ width: `${(awayTeam.ratings.midfield / (homeTeam.ratings.midfield + awayTeam.ratings.midfield)) * 100}%` }} />
                </div>
              </div>

              {/* Defense rating */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-red-400 font-bold">{homeTeam.ratings.defense}</span>
                  <span className="text-text-secondary text-[10px] uppercase font-bold">防守抗载</span>
                  <span className="text-[#0A84FF] font-bold">{awayTeam.ratings.defense}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden flex">
                  <div className="bg-red-500" style={{ width: `${(homeTeam.ratings.defense / (homeTeam.ratings.defense + awayTeam.ratings.defense)) * 100}%` }} />
                  <div className="bg-[#0A84FF]" style={{ width: `${(awayTeam.ratings.defense / (homeTeam.ratings.defense + awayTeam.ratings.defense)) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Pros / Cons Panel */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4.5 space-y-4">
            <h3 className="text-xs font-bold font-mono tracking-wider text-white uppercase border-b border-white/5 pb-2">
              📋 战术对位优劣势与克制演训
            </h3>

            <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
              {getTacticalAnalysis().map((item, idx) => {
                let cardColor = "bg-white/5 border-white/5";
                let icon = <Compass className="w-3.5 h-3.5 text-text-secondary" />;

                if (item.type === "strength") {
                  cardColor = "bg-emerald-500/5 border-emerald-500/10 text-emerald-300";
                  icon = <Zap className="w-3.5 h-3.5 text-emerald-400" />;
                } else if (item.type === "weakness") {
                  cardColor = "bg-red-500/5 border-red-500/10 text-red-300";
                  icon = <AlertTriangle className="w-3.5 h-3.5 text-red-400" />;
                }

                return (
                  <div key={idx} className={`p-3 border rounded-xl text-xs space-y-1 transition-all hover:bg-white/[0.03] ${cardColor}`}>
                    <div className="flex items-center gap-1.5 font-bold font-mono text-[11px]">
                      {icon}
                      {item.title}
                    </div>
                    <p className="text-text-secondary leading-relaxed text-[10.5px] font-sans">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Injury Check Alert lists */}
          {(homeTeam.injuries?.length > 0 || awayTeam.injuries?.length > 0) && (
            <div className="bg-red-500/5 border border-red-500/10 p-4.5 rounded-2xl space-y-2.5">
              <h4 className="text-[10.5px] font-black text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                赛前伤停/退赛战术战损警报
              </h4>
              <div className="space-y-1.5 font-mono text-[10.5px]">
                {homeTeam.injuries?.slice(0, 1).map((inj, i) => (
                  <div key={i} className="text-red-300 leading-normal font-sans">
                    🔴 <b>{homeTeam.name}</b> {inj.playerName} 因 {inj.injury} 缺席，防线实力减少了 <b className="text-[#FF453A]">{inj.impactPercent}%</b>。
                  </div>
                ))}
                {awayTeam.injuries?.slice(0, 1).map((inj, i) => (
                  <div key={i} className="text-red-300 leading-normal font-sans">
                    🔵 <b>{awayTeam.name}</b> {inj.playerName} 遭遇 {inj.injury} ({inj.status})，影响防区稳定性，应避免阵地超压。
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
