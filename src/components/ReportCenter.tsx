import React, { useState } from "react";
import { FileText, Sparkles, Download, Copy, Cpu, Check } from "lucide-react";
import { FootballTeam } from "../types";

interface ReportCenterProps {
  teams: FootballTeam[];
}

export default function ReportCenter({ teams }: ReportCenterProps) {
  const [selectedTeamId, setSelectedTeamId] = useState("argentina");
  const [reportType, setReportType] = useState<"SquadOverview" | "TacticalBrief" | "KnockoutRisk">("TacticalBrief");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const team = teams.find(t => t.id === selectedTeamId) || teams[0];

  const templates = {
    SquadOverview: {
      name: "小组出线格局与多维宏观剖析",
      desc: "统筹结合全队统计参数、小组宿敌实力阶梯、以及国家队年龄架构等指标，智能生成定性/定量分析报告。"
    },
    TacticalBrief: {
      name: "国家队核心攻守系统深度剖析",
      desc: "全方位解构主教练主力战术、肋部套边路线、压迫触发机制、以及向后防转守时的阵地高度和阻尼。"
    },
    KnockoutRisk: {
      name: "淘汰赛路径推演与多重风险评估",
      desc: "全景预测十六强至决赛的潜在对局、点球历届成功率分布，以及在肉搏战里被吹罚红黄牌和肌肉硬伤的危险概率。"
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedReport("");
    setCopied(false);

    // Build highly professional scouts prompt to supply Gemini with real-time variables!
    const injuriesList = team.injuries && team.injuries.length > 0
      ? team.injuries.map(i => `${i.playerName} (${i.injury}, 严重程度: ${i.severity})`).join(", ")
      : "暂无伤折报告，全员状态极佳，体能丰沛。";

    const playersList = team.keyPlayers.map(p => `${p.name} (位置: ${p.role}, 能力评分: ${p.rating}, 效力俱乐部: ${p.club})`).join(", ");

    const promptMessage = `Please generate an elite, professional World Cup Scouting Tactical report for ${team.name} (${team.code}) in Group ${team.group}.
Current real-time variables to incorporate:
- Elo Rating Strength Score: ${team.elo}
- Head Coach Name & Style: ${team.coach.name} (${team.coach.style})
- Favorite Tactical System: ${team.tactics.preferredFormation}
- Style metrics (out of 100): Possession: ${team.tactics.possession}, High-Press Triggers: ${team.tactics.pressing}, Vertical counter Attack Speed: ${team.tactics.counterAttack}, Defense line depth block: ${team.tactics.defenseLine}
- Core Star Players roster: ${playersList}
- Current Medical Infirmary & Absences: ${injuriesList}
- Recent International forms: ${team.recentForm.map(f => `${f.outcome} vs ${f.opponent} (${f.score})`).join(", ")}

Scouting Template Mode requested: ${templates[reportType].name}.
Deliver a meticulously formatted, granular executive analytical briefing containing:
1. Executive Physical Profile (Style, Pressing, Pace).
2. Deep Tactical Configuration & Buildup Overlaps (Contrast their preferred system against common countering layouts).
3. Critical Star Highlights & Dependency Analysis (How they cope with absences/tired rosters).
4. Concrete Prediction Matrix for the 2026 World Cup stages.

Ensure maximum professional analytical demeanor, use precise modern football syntax (e.g. halfspaces, rest-defense, overload-to-isolate, low-block containment heights). Maintain a pristine scannable layout. Render the report in full scannable Markdown format. Do not use unrequired technical software references.
CRITICAL: Write the entire report in natural, highly professional, analytical and fluent simplified Chinese (简体中文). Do not use English for headings. Ensure standard professional Chinese football terminology (e.g., 肋部空间, 局部超载, 守转攻过渡, 低位防守防区, 高位压迫触发器).`;

    try {
      const res = await fetch("/api/gemini/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptMessage,
          type: reportType,
          extraContext: { teamId: selectedTeamId }
        })
      });

      const data = await res.json();
      if (data.success) {
        setGeneratedReport(data.report);
      } else {
        setGeneratedReport(`### 战术档案合成出现异常\n调用 AI 智能分析网络链路失败: ${data.error || "未知令牌鉴权限制或 GEMINI_API_KEY 配置缺失"}`);
      }
    } catch (error) {
      console.error(error);
      setGeneratedReport("### 核心服务网络超时\n请求未达后端合成网关，请先确认后台环境中的 GEMINI_API_KEY 环境变量已正确加载。");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedReport) return;
    navigator.clipboard.writeText(generatedReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedReport) return;
    const blob = new Blob([generatedReport], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `世界杯球探战术报告_${team.code}_${reportType}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="report-center" className="bg-panel-custom border border-border-custom rounded-2xl overflow-hidden font-sans text-white shadow-xl flex flex-col h-full animate-fade-in">
      {/* Header element bar */}
      <div className="bg-bg-custom p-4 border-b border-border-custom flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#0A84FF]" />
          <div>
            <h2 className="font-bold text-white tracking-tight text-sm flex items-center gap-1.5 font-mono uppercase">
              AI 智能战术研判智库中心
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </h2>
            <p className="text-xs text-text-secondary">结合特质大名单，利用 Gemini 智脑秒级合成国家队的拟合分析与阵型报告</p>
          </div>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-[500px] bg-panel-custom">
        {/* Left Side: Parameters configuration form */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4 bg-bg-custom p-4 rounded-xl border border-border-custom">
          <div className="space-y-4 text-xs font-mono">
            {/* Team Picker dropdown */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-text-secondary font-bold uppercase block">分析目标对象(国家队)</label>
              <select
                value={selectedTeamId}
                onChange={e => setSelectedTeamId(e.target.value)}
                className="w-full bg-panel-custom border border-border-custom rounded-lg px-2.5 py-2 text-xs text-white uppercase focus:outline-none focus:border-accent-custom"
              >
                {teams.map(t => (
                  <option key={t.id} value={t.id} className="bg-panel-custom text-white">{t.name} (Elo {t.elo})</option>
                ))}
              </select>
            </div>

            {/* Template type options */}
            <div className="space-y-2">
              <label className="text-[10px] text-text-secondary font-bold uppercase block">智能推演框架模板</label>
              
              <div className="space-y-2">
                <button
                  onClick={() => setReportType("SquadOverview")}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                    reportType === "SquadOverview" ? "bg-accent-custom/10 border-accent-custom text-accent-custom" : "bg-panel-custom/60 border-border-custom text-text-secondary hover:border-[#444]"
                  }`}
                >
                  <div className="font-bold font-mono uppercase text-[10px] tracking-wide text-white">
                    小组出线格局综述
                  </div>
                  <p className="text-[10px] text-text-secondary font-normal mt-1 leading-relaxed font-sans">
                    全盘统算该组内各出线积分卡位线、对弈队伍宏观硬度。
                  </p>
                </button>

                <button
                  onClick={() => setReportType("TacticalBrief")}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                    reportType === "TacticalBrief" ? "bg-accent-custom/10 border-accent-custom text-accent-custom" : "bg-panel-custom/60 border-border-custom text-text-secondary hover:border-[#444]"
                  }`}
                >
                  <div className="font-bold font-mono uppercase text-[10px] tracking-wide text-white">
                    攻守战术纵深拆解
                  </div>
                  <p className="text-[10px] text-text-secondary font-normal mt-1 leading-relaxed font-sans">
                    拆解核心进攻肋部攻势、压迫阻尼以及反击转换落位。
                  </p>
                </button>

                <button
                  onClick={() => setReportType("KnockoutRisk")}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                    reportType === "KnockoutRisk" ? "bg-accent-custom/10 border-accent-custom text-accent-custom" : "bg-panel-custom/60 border-border-custom text-text-secondary hover:border-[#444]"
                  }`}
                >
                  <div className="font-bold font-mono uppercase text-[10px] tracking-wide text-white">
                    淘汰赛多维风险智推
                  </div>
                  <p className="text-[10px] text-text-secondary font-normal mt-1 leading-relaxed font-sans">
                    多维度模拟十六强后的积分碰撞、历届点球偏向与伤损警告。
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border-custom mt-3">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-2 bg-gradient-to-r from-[#0055ff] to-[#0A84FF] hover:opacity-95 text-white font-black rounded-xl flex items-center justify-center gap-1.5 cursor-pointer text-xs shadow-[0_4px_16px_rgba(10,132,255,0.35),_inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all disabled:opacity-50 font-sans tracking-wide"
            >
              <Cpu className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin text-white" : ""}`} />
              {isGenerating ? "正在高速对齐解算..." : "高阶多流建模：合成 AI 战术深度研报"}
            </button>
          </div>
        </div>

        {/* Right Side: Render Result screen */}
        <div className="lg:col-span-8 bg-bg-custom p-4 rounded-xl border border-border-custom flex flex-col justify-between h-full min-h-[460px]">
          {/* Active Workbar controls */}
          <div className="flex justify-between items-center bg-panel-custom/60 px-3.5 py-2 rounded-t-xl border-x border-t border-border-custom text-xs animate-fade-in font-mono">
            <span className="text-[10px] text-text-secondary">
              球探卷宗: <b className="text-white">FIFA2026/{team.code.toUpperCase()}</b>
            </span>

            {generatedReport && (
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="p-1 px-3 bg-bg-custom border border-border-custom text-[10px] rounded-lg hover:text-white text-text-secondary flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-green-custom" />
                      已拷贝
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      拷贝原文
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownload}
                  className="p-1 px-3 bg-accent-custom/20 border border-accent-custom text-[10px] rounded-lg hover:bg-accent-custom/40 text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Download className="w-3 h-3" />
                  导出 MD 卷宗
                </button>
              </div>
            )}
          </div>

          {/* Actual Report output body */}
          <div className="flex-1 bg-bg-custom border border-border-custom rounded-b-xl p-4 overflow-y-auto max-h-[420px] font-sans text-slate-200 select-text leading-relaxed">
            {isGenerating && (
              <div className="flex flex-col items-center justify-center py-20 text-text-secondary space-y-4">
                <Sparkles className="w-10 h-10 text-accent-custom animate-spin" />
                <div className="text-center font-mono">
                  <p className="text-xs text-white font-bold uppercase tracking-wider">战术档案高速合成中...</p>
                  <p className="text-[10px] text-text-secondary leading-normal max-w-sm px-4 mt-1 font-sans">
                    正在利用大语言模型渲染定制排版，包含肋部多向撕扯重叠、守攻两翼过渡阵形及预期泊松拟合模型。
                  </p>
                </div>
              </div>
            )}

            {!isGenerating && !generatedReport && (
              <div className="flex flex-col items-center justify-center py-20 text-text-secondary text-center space-y-3 font-mono">
                <FileText className="w-12 h-12 text-border-custom" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-white uppercase tracking-wider">球探智库档案空置</p>
                  <p className="text-[10px] text-text-secondary max-w-xs mx-auto font-sans leading-relaxed">
                    在左下方挑选合适的分析大纲及推演国家，接着点击“闪击合成 AI 球探报告”，即可获取由 Gemini API 精准计算、战术术语严苛的专业档案。
                  </p>
                </div>
              </div>
            )}

            {!isGenerating && generatedReport && (
              <div className="whitespace-pre-wrap text-sm text-[13.5px] text-slate-200 font-sans leading-relaxed tracking-normal select-text">
                {generatedReport}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
