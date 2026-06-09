import React, { useState, useEffect } from "react";
import { Play, Trophy, BarChart2, ShieldAlert, Sliders, RefreshCw, Layers } from "lucide-react";

interface TeamProbabilities {
  teamId: string;
  teamName: string;
  teamCode: string;
  group: string;
  elo: number;
  groupStageExit: number;
  roundOf32: number;
  roundOf16: number;
  quarterFinal: number;
  semiFinal: number;
  finalist: number;
  champion: number;
  explanation: string;
}

interface TournamentSimulatorProps {
  onUpdateProbs: (probs: TeamProbabilities[]) => void;
  probabilities: TeamProbabilities[];
}

export default function TournamentSimulator({ onUpdateProbs, probabilities }: TournamentSimulatorProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<"Standings" | "Leaderboard" | "Factors">("Leaderboard");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Custom scenario factors
  const [altitudeMode, setAltitudeMode] = useState(0); // Penalizes low-physicality teams
  const [tournamentIntensity, setTournamentIntensity] = useState(0); // Boosts bench depth and experience
  const [hostFatigue, setHostFatigue] = useState(0); // Adjusts USA/MEX/CAN modifiers

  const fetchSimulation = async () => {
    setIsSimulating(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ altitudeMode, tournamentIntensity, hostFatigue })
      });
      const data = await res.json();
      if (data.success && data.results) {
        // Aesthetic sensory lag
        setTimeout(() => {
          onUpdateProbs(data.results);
          setIsSimulating(false);
        }, 900);
      } else {
        setErrorMessage("模拟算法引擎未能正确初始化或响应");
        setIsSimulating(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("在触发多核蒙特卡洛对战推演API时发生了网络超时");
      setIsSimulating(false);
    }
  };

  // Trigger default simulation on load if empty
  useEffect(() => {
    if (probabilities.length === 0) {
      fetchSimulation();
    }
  }, []);

  const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

  const getSubGroupTeams = (grp: string) => {
    return probabilities
      .filter(t => t.group === grp)
      .sort((a, b) => b.champion - a.champion || a.groupStageExit - b.groupStageExit);
  };

  return (
    <div id="tournament-simulator" className="bg-panel-custom/30 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] flex flex-col h-full animate-fade-in font-sans">
      {/* Simulation Banner Workspace */}
      <div className="bg-white/[0.02] p-5 border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-white tracking-tight text-sm flex items-center gap-2 font-mono uppercase">
            <Trophy className="w-4 h-4 text-accent-custom animate-pulse" />
            蒙特卡洛多并发模拟预测引擎
          </h2>
          <p className="text-xs text-text-secondary">融合两强攻防、队医伤免与气候乘数，瞬间在服务端并行计算 1,000 轮模拟对局</p>
        </div>

        <button
          onClick={fetchSimulation}
          disabled={isSimulating}
          className="px-4 py-1.5 bg-accent-custom hover:bg-accent-custom/85 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50 font-mono"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
          {isSimulating ? "线程集群高速计算中..." : "重新预测 1000 次赛事"}
        </button>
      </div>

      {/* Tabs Menu Navigation */}
      <div className="flex bg-white/[0.01] px-5 border-b border-white/5 text-[10px] font-semibold font-mono">
        <button
          onClick={() => setActiveTab("Leaderboard")}
          className={`py-2 px-3 border-b-2 hover:text-white transition-colors cursor-pointer ${
            activeTab === "Leaderboard" ? "border-accent-custom text-accent-custom font-bold" : "border-transparent text-text-secondary"
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5 inline mr-1" />
          终极夺冠概率榜
        </button>
        <button
          onClick={() => setActiveTab("Standings")}
          className={`py-2 px-3 border-b-2 hover:text-white transition-colors cursor-pointer ${
            activeTab === "Standings" ? "border-accent-custom text-accent-custom font-bold" : "border-transparent text-text-secondary"
          }`}
        >
          <Layers className="w-3.5 h-3.5 inline mr-1" />
          小组出线形势拟合
        </button>
        <button
          onClick={() => setActiveTab("Factors")}
          className={`py-2 px-3 border-b-2 hover:text-white transition-colors cursor-pointer ${
            activeTab === "Factors" ? "border-accent-custom text-accent-custom font-bold" : "border-transparent text-text-secondary"
          }`}
        >
          <Sliders className="w-3.5 h-3.5 inline mr-1" />
          动态环境变量微调
        </button>
      </div>

      <div className="flex-1 p-5 overflow-y-auto max-h-[600px] bg-transparent animate-fade-in">
        {errorMessage && (
          <div className="p-3 bg-red-custom/10 border border-red-custom/20 rounded-lg text-xs text-red-custom font-mono mb-4">
            <span className="font-bold">推演系统异常:</span> {errorMessage}
          </div>
        )}

        {/* Loader panel */}
        {isSimulating && (
          <div className="flex flex-col items-center justify-center py-20 text-text-secondary space-y-4 font-mono">
            <RefreshCw className="w-10 h-10 text-accent-custom animate-spin" />
            <div className="text-center">
              <p className="text-xs text-white font-bold uppercase tracking-wider">正在拟合 Monte Carlo 数据模型...</p>
              <p className="text-[10px] text-text-secondary font-sans leading-relaxed mt-1">系统正计算 48 队主力变数，推演 32 强遭遇战平局概率及主场干扰系数</p>
            </div>
          </div>
        )}

        {/* Chance Rankings tab */}
        {!isSimulating && activeTab === "Leaderboard" && probabilities.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center text-[10px] text-text-secondary font-bold uppercase tracking-wider px-2 border-b border-white/5 pb-2 font-mono font-bold">
              <div className="w-2/5 animate-pulse">参赛国家队 (小组成员)</div>
              <div className="w-1/5 text-center">小组出局率 %</div>
              <div className="w-1/5 text-center">打入四强概率 %</div>
              <div className="w-1/5 text-right">模拟夺冠期望率</div>
            </div>

            <div className="divide-y divide-white/5 space-y-1 font-mono">
              {probabilities
                .sort((a, b) => b.champion - a.champion)
                .map((prob, idx) => {
                  const medalColors = idx === 0 ? "text-accent-custom shrink-0 font-black" : idx === 1 ? "text-slate-300 shrink-0" : idx === 2 ? "text-[#FFD60A] shrink-0" : "text-text-secondary shrink-0";
                  return (
                    <div key={prob.teamId} className="flex justify-between items-center py-3 px-2 text-xs hover:bg-white/[0.03] rounded-xl group transition-all">
                      <div className="w-2/5 flex items-center gap-2">
                        <span className={`w-5 text-center text-[11px] font-mono ${medalColors}`}>
                          #{idx + 1}
                        </span>
                        <div>
                          <span className="font-bold text-white group-hover:text-accent-custom transition-colors uppercase">{prob.teamName}</span>
                          <span className="text-[10px] text-text-secondary block mt-0.5 uppercase">{prob.group}组 • 基础Elo {prob.elo}</span>
                        </div>
                      </div>

                      {/* Group Stage Exit progress bar */}
                      <div className="w-1/5 text-center font-bold">
                        <div className="inline-block bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full font-mono text-[10px] text-text-secondary">
                          {prob.groupStageExit}%
                        </div>
                      </div>

                      {/* Reach Semi Final percentage */}
                      <div className="w-1/5 text-center font-bold">
                        <div className="inline-block bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full font-mono text-[10px] text-text-secondary">
                          {prob.semiFinal}%
                        </div>
                      </div>

                      {/* Champion percentage with gauge */}
                      <div className="w-1/5 text-right space-y-1">
                        <span className="font-mono font-black text-accent-custom tracking-tight text-sm">
                          {prob.champion}%
                        </span>
                        <div className="w-16 bg-white/5 h-1 ml-auto overflow-hidden rounded-full">
                          <div className="bg-accent-custom h-full" style={{ width: `${Math.min(100, prob.champion * 5)}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Stage Projections Tab */}
        {!isSimulating && activeTab === "Standings" && probabilities.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in font-mono">
            {groups.map(grp => {
              const grpTeams = getSubGroupTeams(grp);
              return (
                <div key={grp} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3.5 shadow-sm">
                  <h3 className="text-xs font-bold text-white border-b border-white/5 pb-2 flex justify-between uppercase">
                    <span>{grp}组 拟合排名预测</span>
                    <span className="text-[#30D158] text-[10px]">前两名直接晋级</span>
                  </h3>
                  <div className="space-y-2 text-[11px]">
                    {grpTeams.map((t, idx) => {
                      const qualifyProb = parseFloat((100 - t.groupStageExit).toFixed(0));
                      return (
                        <div key={t.teamId} className="flex items-center justify-between py-1 border-b border-white/5">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className={`w-3.5 text-center font-bold ${idx < 2 ? "text-[#30D158]" : "text-text-secondary"}`}>
                              {idx + 1}
                            </span>
                            <span className="text-white uppercase font-bold text-[10px] truncate">{t.teamName}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-text-secondary font-mono text-[10px]/none font-bold">
                              出线率: <b className="text-white font-black">{qualifyProb}%</b>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic Factors configuration */}
        {!isSimulating && activeTab === "Factors" && (
          <div className="space-y-5 animate-fade-in font-mono">
            <div className="bg-white/[0.02] p-5 border border-white/5 rounded-2xl space-y-2.5 shadow-sm">
              <h3 className="font-semibold text-white text-xs flex items-center gap-1.5 uppercase">
                <Sliders className="w-4 h-4 text-accent-custom" />
                物理环境乘数与主战狂热偏差配比
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                引入特异性物理环境变量将驱动核心底层战术模态偏移。高原缺载对大负荷压榨逼抢型打法带来剧烈的缺氧折损，而极度粘滞的高频转场则严苛考验一线大名单的均龄厚度与第二梯队的板凳可用率。
              </p>
            </div>

            <div className="space-y-4">
              {/* Factor 1 */}
              <div className="bg-white/[0.02] p-5 border border-white/5 rounded-2xl space-y-3.5 text-xs shadow-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] hover:bg-white/[0.04] transition-colors">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white uppercase tracking-wider text-[11px]">赛地物理高程缺氧阻尼</span>
                  <span className="font-mono text-accent-custom font-bold">{altitudeMode === 0 ? "海平温和常区 (0米)" : altitudeMode === 1 ? "盘山微缺氧高原 (1200米)" : "极端急陡稀氧高地 (2200米)"}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  value={altitudeMode}
                  onChange={e => setAltitudeMode(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-custom"
                />
                <span className="text-[10px] text-text-secondary block leading-normal font-sans">
                  针对全场高消耗拼抢的队伍（如加拿大、美国、乌拉圭等高频对抗快节奏队伍）引入高地缺氧损耗系数，微调试炼阻压耐受力。
                </span>
              </div>

              {/* Factor 2 */}
              <div className="bg-white/[0.02] p-5 border border-white/5 rounded-2xl space-y-3.5 text-xs shadow-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] hover:bg-white/[0.04] transition-colors">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white uppercase tracking-wider text-[11px]">地狱赛程物理周期紧密阻尼</span>
                  <span className="font-mono text-accent-custom font-bold">
                    {tournamentIntensity === 0 ? "温和松散歇憩期 (1.0x)" : tournamentIntensity === 1 ? "黄金排期 (1.15x)" : "地狱级贴地复战 (1.3x)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  value={tournamentIntensity}
                  onChange={e => setTournamentIntensity(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-custom"
                />
                <span className="text-[10px] text-text-secondary block leading-normal font-sans">
                  调节体能衰损乘数。高抗阻尼下，先发主力团队年龄过高、或板凳替补厚度单薄的国家队在中后段样本中将遭受概率抑制。
                </span>
              </div>

              {/* Factor 3 */}
              <div className="bg-white/[0.02] p-5 border border-white/5 rounded-2xl space-y-3.5 text-xs shadow-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] hover:bg-white/[0.04] transition-colors">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white uppercase tracking-wider text-[11px]">美墨加东道主主场心力补偿量</span>
                  <span className="font-mono text-accent-custom font-bold">
                    {hostFatigue === 0 ? "中立平稳对等 (1.0x)" : hostFatigue === 1 ? "东道主氛围亢奋 (1.1x)" : "地狱死誓拥泵轰鸣 (1.25x)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  value={hostFatigue}
                  onChange={e => setHostFatigue(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-custom"
                />
                <span className="text-[10px] text-text-secondary block leading-normal font-sans">
                  在多轮竞技演化中，为联合东道主之美、墨、加三国直接注入氛围增幅与主场哨音倾向。
                </span>
              </div>
            </div>

            <div className="p-4 bg-accent-custom/5 text-accent-custom border border-accent-custom/15 text-xs rounded-2xl flex items-start gap-2.5 font-sans leading-relaxed">
              <ShieldAlert className="w-4 h-4 shrink-0 text-accent-custom mt-0.5 animate-pulse" />
              <p className="text-[11px]">
                <b>沙盘参数提示：</b> 精准微调上述权重因子后，<b>必须重击顶部 “确认重构推演” 系统中枢</b>，系统才会正式覆写并结算新概率模型。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
