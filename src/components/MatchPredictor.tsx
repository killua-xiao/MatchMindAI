import React, { useState } from "react";
import { Swords, Play, Zap, Shield, Users, Compass, Flame } from "lucide-react";
import { FootballTeam } from "../types";

interface MatchPredictorProps {
  teams: FootballTeam[];
}

interface PredictionResult {
  predictedHomeScore: number;
  predictedAwayScore: number;
  homeProbability: number;
  drawProbability: number;
  awayProbability: number;
  tacticalInsight: string;
  simulationSample: {
    homeTeamScore: number;
    awayTeamScore: number;
    homeXg: number;
    awayXg: number;
    events: string[];
    possession: number;
    shots: { home: number; away: number };
  };
}

export default function MatchPredictor({ teams }: MatchPredictorProps) {
  const [homeId, setHomeId] = useState<string>("argentina");
  const [awayId, setAwayId] = useState<string>("france");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const homeTeam = teams.find(t => t.id === homeId);
  const awayTeam = teams.find(t => t.id === awayId);

  const runPrediction = async () => {
    if (!homeId || !awayId) return;
    setErrorMessage(null);
    if (homeId === awayId) {
      setErrorMessage("系统对位冲突：请选择两支不同的国家队以运行推演。");
      return;
    }

    setIsSimulating(true);
    setResult(null);

    try {
      const res = await fetch("/api/predict-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ homeId, awayId })
      });
      const data = await res.json();
      if (data.success) {
        // Sensory buffer delay
        setTimeout(() => {
          setResult(data);
          setIsSimulating(false);
        }, 1100);
      } else {
        setErrorMessage("无法计算该对位情况: " + data.error);
        setIsSimulating(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("网络连接超时，执行对位推演计算失败。");
      setIsSimulating(false);
    }
  };

  const getStatWidth = (val: number = 80) => `${Math.min(100, Math.max(10, val))}%`;

  return (
    <div id="match-predictor" className="bg-panel-custom border border-border-custom rounded-xl overflow-hidden font-sans text-white shadow-lg flex flex-col h-full animate-fade-in">
      {/* Header banner */}
      <div className="bg-bg-custom p-4 border-b border-border-custom flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-white tracking-tight text-sm flex items-center gap-2 font-mono uppercase">
            <Swords className="w-4 h-4 text-accent-custom animate-pulse" />
            双雄战术博弈模拟器
          </h2>
          <p className="text-xs text-text-secondary">深度对齐阵形反击陷阱，动态计算标准时间期望进球数 (xG)</p>
        </div>
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-y-auto bg-panel-custom">
        {/* Error notification block */}
        {errorMessage && (
          <div className="p-3 bg-red-custom/10 border border-red-custom/20 rounded-lg text-xs text-red-custom font-mono">
            <span className="font-bold">系统错误报告:</span> {errorMessage}
          </div>
        )}

        {/* Dropdowns Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center bg-bg-custom p-4 rounded-xl border border-border-custom">
          <div className="md:col-span-4 space-y-1">
            <label className="text-[10px] text-text-secondary font-bold block uppercase tracking-wider font-mono">蓝方代表队 (ALPHA)</label>
            <select
              value={homeId}
              onChange={e => setHomeId(e.target.value)}
              className="w-full bg-panel-custom border border-border-custom rounded-lg px-2.5 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-accent-custom"
            >
              {teams.map(t => (
                <option key={t.id} value={t.id} className="bg-panel-custom text-white">{t.name} (Elo {t.elo})</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 text-center flex flex-col items-center justify-center pt-2 md:pt-0">
            <span className="text-[9px] font-mono font-extrabold text-[#0A84FF] border border-[#0A84FF]/25 px-2 py-0.5 rounded-full bg-[#0A84FF]/5 uppercase inline-block font-bold">
              经典战术对决演兵
            </span>
            <button
              onClick={runPrediction}
              disabled={isSimulating}
              className="mt-2 text-xs font-semibold px-4 py-1.5 bg-gradient-to-r from-[#0055ff] to-[#0A84FF] hover:opacity-95 disabled:bg-bg-custom disabled:opacity-40 text-white rounded-xl flex items-center gap-1.5 transition-all cursor-pointer font-sans shadow-[0_4px_12px_rgba(10,132,255,0.3),_inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
              {isSimulating ? (
                <>
                  <Compass className="w-3.5 h-3.5 animate-spin text-white" />
                  正在解算战双雄对冲...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current text-white" />
                  一键启动对位解算
                </>
              )}
            </button>
          </div>

          <div className="md:col-span-4 space-y-1 text-right">
            <label className="text-[10px] text-text-secondary font-bold block uppercase tracking-wider font-mono">红方代表队 (BETA)</label>
            <select
              value={awayId}
              onChange={e => setAwayId(e.target.value)}
              className="w-full bg-panel-custom border border-border-custom rounded-lg px-2.5 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-accent-custom text-right"
            >
              {teams.map(t => (
                <option key={t.id} value={t.id} className="bg-panel-custom text-white">{t.name} (Elo {t.elo})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tactical Metrics Bars Comparison */}
        {homeTeam && awayTeam && !result && !isSimulating && (
          <div className="space-y-4 bg-bg-custom/50 p-4 rounded-xl border border-border-custom mt-2 animate-fade-in">
            <h3 className="text-xs font-bold text-text-secondary flex items-center gap-1.5 select-none font-mono uppercase">
              <Users className="w-3.5 h-3.5 text-text-secondary/80" />
              阵位多源数据属性对消映射
            </h3>

            <div className="space-y-3.5 text-xs">
              {/* Attack stat */}
              <div className="space-y-1 bg-panel-custom/25 p-2 rounded-lg border border-border-custom/30 lg:p-3">
                <div className="flex justify-between text-[11px] font-mono text-text-secondary">
                  <span>{homeTeam.ratings.attack} (进攻)</span>
                  <span className="text-text-secondary font-bold font-sans uppercase text-[10px]">前场摧毁能力</span>
                  <span>(进攻) {awayTeam.ratings.attack}</span>
                </div>
                <div className="flex gap-1 h-1.5 items-center">
                  <div className="flex-1 bg-bg-custom rounded-full h-1 overflow-hidden flex justify-end">
                    <div className="bg-accent-custom h-1" style={{ width: getStatWidth(homeTeam.ratings.attack) }} />
                  </div>
                  <div className="w-2 h-2 rounded-full border border-border-custom bg-panel-custom" />
                  <div className="flex-1 bg-bg-custom rounded-full h-1 overflow-hidden">
                    <div className="bg-accent-custom h-1" style={{ width: getStatWidth(awayTeam.ratings.attack) }} />
                  </div>
                </div>
              </div>

              {/* Midfield stat */}
              <div className="space-y-1 bg-panel-custom/25 p-2 rounded-lg border border-border-custom/30 lg:p-3">
                <div className="flex justify-between text-[11px] font-mono text-text-secondary">
                  <span>{homeTeam.ratings.midfield} (中场)</span>
                  <span className="text-text-secondary font-bold font-sans uppercase text-[10px]">中场枢纽球权支配</span>
                  <span>(中场) {awayTeam.ratings.midfield}</span>
                </div>
                <div className="flex gap-1 h-1.5 items-center">
                  <div className="flex-1 bg-bg-custom rounded-full h-1 overflow-hidden flex justify-end">
                    <div className="bg-accent-custom h-1" style={{ width: getStatWidth(homeTeam.ratings.midfield) }} />
                  </div>
                  <div className="w-2 h-2 rounded-full border border-border-custom bg-panel-custom" />
                  <div className="flex-1 bg-bg-custom rounded-full h-1 overflow-hidden">
                    <div className="bg-accent-custom h-1" style={{ width: getStatWidth(awayTeam.ratings.midfield) }} />
                  </div>
                </div>
              </div>

              {/* Defense stat */}
              <div className="space-y-1 bg-panel-custom/25 p-2 rounded-lg border border-border-custom/30 lg:p-3">
                <div className="flex justify-between text-[11px] font-mono text-text-secondary">
                  <span>{homeTeam.ratings.defense} (防守)</span>
                  <span className="text-text-secondary font-bold font-sans uppercase text-[10px]">后场防线落位硬度</span>
                  <span>(防守) {awayTeam.ratings.defense}</span>
                </div>
                <div className="flex gap-1 h-1.5 items-center">
                  <div className="flex-1 bg-bg-custom rounded-full h-1 overflow-hidden flex justify-end">
                    <div className="bg-accent-custom h-1" style={{ width: getStatWidth(homeTeam.ratings.defense) }} />
                  </div>
                  <div className="w-2 h-2 rounded-full border border-border-custom bg-panel-custom" />
                  <div className="flex-1 bg-bg-custom rounded-full h-1 overflow-hidden">
                    <div className="bg-accent-custom h-1" style={{ width: getStatWidth(awayTeam.ratings.defense) }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Tactical preferred Formations tags */}
            <div className="flex justify-between items-center bg-bg-custom p-3 rounded-lg border border-border-custom mt-4 text-xs font-mono">
              <div className="text-accent-custom font-extrabold">{homeTeam.code}: {homeTeam.tactics.preferredFormation}</div>
              <div className="text-text-secondary text-[9px] uppercase tracking-wider">主帅进攻几何向量</div>
              <div className="text-accent-custom font-extrabold">{awayTeam.code}: {awayTeam.tactics.preferredFormation}</div>
            </div>
          </div>
        )}

        {/* Loading overlay spacer */}
        {isSimulating && (
          <div className="flex flex-col items-center justify-center p-12 text-text-secondary space-y-4 font-mono animate-pulse">
            <div className="relative">
              <Compass className="w-12 h-12 text-accent-custom animate-spin" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs font-bold text-white uppercase tracking-wider">正在启动博弈计算引擎...</p>
              <p className="text-[10px] text-text-secondary">正在分析两队主力在多源雷达图中的对弈干涉，计算 Poisson 精确进球期望</p>
            </div>
          </div>
        )}

        {/* Calculated Results presentation */}
        {result && homeTeam && awayTeam && !isSimulating && (
          <div className="space-y-5 animate-fade-in">
            {/* Probability Odds split */}
            <div className="bg-bg-custom border border-border-custom rounded-xl p-3.5 space-y-2">
              <div className="flex justify-between text-[10px] text-text-secondary font-bold uppercase tracking-wider font-mono">
                <span>{homeTeam.name} 胜率</span>
                <span>平局概率</span>
                <span>{awayTeam.name} 胜率</span>
              </div>
              <div className="flex h-5 w-full rounded-lg overflow-hidden text-[10px] font-bold text-white shadow-inner font-mono">
                <div className="bg-accent-custom flex items-center justify-center transition-all duration-300" style={{ width: `${result.homeProbability}%` }}>
                  {result.homeProbability}%
                </div>
                <div className="bg-bg-custom border-x border-border-custom/50 flex items-center justify-center transition-all duration-300 text-text-secondary" style={{ width: `${result.drawProbability}%` }}>
                  {result.drawProbability}%
                </div>
                <div className="bg-white/20 flex items-center justify-center transition-all duration-300" style={{ width: `${result.awayProbability}%` }}>
                  {result.awayProbability}%
                </div>
              </div>
            </div>

            {/* Simulated Projected Score Display */}
            <div className="grid grid-cols-3 bg-bg-custom border border-border-custom rounded-xl p-4 items-center text-center">
              <div>
                <span className="text-xs uppercase text-text-secondary font-mono font-bold block">{homeTeam.code}</span>
                <span className="text-sm font-semibold block mt-1 text-white truncate">{homeTeam.name}</span>
                <span className="text-[11px] text-accent-custom font-mono mt-1 block">xG {result.simulationSample.homeXg}</span>
              </div>

              <div className="space-y-1 border-x border-border-custom/30">
                <span className="text-[9px] uppercase text-text-secondary font-mono tracking-wider block">预期模型完场比分</span>
                <span className="text-3xl font-black font-mono tracking-tight text-white block">
                  {result.predictedHomeScore} - {result.predictedAwayScore}
                </span>
                <span className="text-[9px] bg-panel-custom text-text-secondary px-2 py-0.5 border border-border-custom rounded-lg inline-block font-mono">
                  泊松分布矩阵采样 (200x)
                </span>
              </div>

              <div>
                <span className="text-xs uppercase text-text-secondary font-mono font-bold block">{awayTeam.code}</span>
                <span className="text-sm font-semibold block mt-1 text-white truncate">{awayTeam.name}</span>
                <span className="text-[11px] text-accent-custom font-mono mt-1 block">xG {result.simulationSample.awayXg}</span>
              </div>
            </div>

            {/* Tactical Insight Box */}
            <div className="p-3.5 bg-bg-custom border-l-2 border-l-accent-custom border border-border-custom rounded-r-xl space-y-1">
              <h4 className="text-xs font-semibold text-white flex items-center gap-1.5 font-mono uppercase">
                <Compass className="w-3.5 h-3.5 text-accent-custom" />
                世界杯专家战术交锋智囊
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">{result.tacticalInsight}</p>
            </div>

            {/* Minute-by-Minute highlighted events */}
            <div className="space-y-2 bg-bg-custom/30 p-4 rounded-xl border border-border-custom max-h-[240px] overflow-y-auto">
              <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-1 mb-2 select-none font-mono">
                <Flame className="w-3.5 h-3.5 text-accent-custom" />
                虚拟赛事回放日志序列
              </h4>

              <div className="space-y-3 font-mono text-[11px]">
                <div className="flex items-center gap-2 border-b border-border-custom pb-2 text-text-secondary text-[10px]">
                  <span>控制分析:</span>
                  <span>控球率: {result.simulationSample.possession}% vs {100 - result.simulationSample.possession}%</span>
                  <span>•</span>
                  <span>打门尝试: {result.simulationSample.shots.home} 次 vs {result.simulationSample.shots.away} 次</span>
                </div>

                {result.simulationSample.events.length === 0 ? (
                  <p className="text-text-secondary italic">本次比赛推演沙盘无重大进球或吃红牌警告发生。</p>
                ) : (
                  result.simulationSample.events.map((ev, i) => (
                    <div key={i} className="flex gap-2 items-start py-0.5 text-xs font-mono leading-relaxed mt-1">
                      <span className="text-accent-custom font-bold shrink-0">►</span>
                      <p className="text-slate-200">{ev}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
