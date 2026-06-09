import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Database,
  Trophy,
  Swords,
  FileText,
  Activity,
  Search,
  Filter,
  Users,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  Globe,
  Settings,
  Heart,
  ChevronRight,
  TrendingUp,
  Sliders,
  CheckCircle,
  Menu
} from "lucide-react";

// Import modules
import TacticalWhiteboard from "./components/TacticalWhiteboard";
import DataSourceManager from "./components/DataSourceManager";
import MatchPredictor from "./components/MatchPredictor";
import TournamentSimulator from "./components/TournamentSimulator";
import TeamDetailDrawer from "./components/TeamDetailDrawer";
import ReportCenter from "./components/ReportCenter";
import ScheduleAndStandings from "./components/ScheduleAndStandings";
import { FootballTeam, SystemLog, TournamentProbabilities } from "./types";

export default function App() {
  // Navigation active state
  const [activeTab, setActiveTab] = useState<"Overview" | "Schedule" | "Database" | "Simulator" | "H2H" | "Whiteboard" | "Reporter" | "Crawler">("Overview");

  // Core synchronized databases in client memory
  const [teams, setTeams] = useState<FootballTeam[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [probabilities, setProbabilities] = useState<any[]>([]);

  // Filtering states for database
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConfed, setSelectedConfed] = useState<string>("ALL");
  const [activeLevelFilter, setActiveLevelFilter] = useState<"ALL" | "Injured" | "Powerhouse">("ALL");

  // Selected team to open the detailed medical/tactical sidebar
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  // loading and refreshing states
  const [isScraping, setIsScraping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial database boot
  const initApp = async () => {
    setIsLoading(true);
    let retries = 5;
    let success = false;
    while (retries > 0 && !success) {
      try {
        const [teamsRes, logsRes] = await Promise.all([
          fetch("/api/teams"),
          fetch("/api/logs")
        ]);
        const teamsData = await teamsRes.json();
        const logsData = await logsRes.json();

        if (teamsData.success && logsData.success) {
          setTeams(teamsData.data);
          setLogs(logsData.data);
          success = true;
        }
      } catch (e) {
        retries--;
        if (retries === 0) {
          console.error("Critical dashboard boot error:", e);
        } else {
          // Wait 1.5 seconds before retrying to let the Express server start
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initApp();
  }, []);

  // Update a team's representation inside the active React State array instantly
  const handleRefreshTeamDb = (updatedTeam: FootballTeam) => {
    setTeams(prev => prev.map(t => t.id === updatedTeam.id ? updatedTeam : t));
  };

  // Reset core database to pristine original seed
  const handleResetDb = async () => {
    if (!window.confirm("Restore FIFA 2026 tactical tables back to nominal seed presets? All custom edits will clear.")) return;
    try {
      const res = await fetch("/api/teams/reset", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setTeams(data.data);
        alert("Scouting directories normalized back to original FIFA seeds!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Trigger manual crawler log scrape pipeline
  const handleTriggerScrape = async () => {
    setIsScraping(true);
    try {
      const res = await fetch("/api/logs/crawl", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setLogs(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsScraping(false);
    }
  };

  // Filtered lists computation
  const filteredTeams = teams.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConfed = selectedConfed === "ALL" || t.confederation === selectedConfed;
    
    let matchesLevel = true;
    if (activeLevelFilter === "Injured") {
      matchesLevel = t.injuries && t.injuries.length > 0;
    } else if (activeLevelFilter === "Powerhouse") {
      // Powerhouses are teams with base Elo higher than 1750
      matchesLevel = t.elo >= 1750;
    }

    return matchesSearch && matchesConfed && matchesLevel;
  });

  const selectedTeamDetails = teams.find(t => t.id === selectedTeamId);

  // Top tier stats
  const activeInjuriesCount = teams.reduce((count, t) => count + (t.injuries?.length || 0), 0);
  const highestEloTeam = teams.length > 0 ? [...teams].sort((a,b) => b.elo - a.elo)[0] : null;

  return (
    <div className="flex h-screen bg-[#07070e] font-sans text-slate-200 select-none overflow-hidden relative">
      {/* Liquid Glass Ambient Backdrops (macOS Translucent Visual Layer) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-[#0A84FF]/8 blur-[130px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-[#30D158]/6 blur-[140px] animate-pulse" />
        <div className="absolute top-[30%] right-[20%] w-[35%] h-[35%] rounded-full bg-[#BF5AF2]/6 blur-[120px]" />
      </div>

      {/* LEFT COMPONENT: macOS Standard Navigation sidebar with high-contrast frosted glass effect */}
      <aside className="w-64 bg-panel-custom/65 backdrop-blur-2xl border-r border-border-custom flex flex-col justify-between shrink-0 select-none z-10 shadow-[4px_0_24px_rgba(0,0,0,0.15)]">
        
        <div className="space-y-6 pt-5">
          {/* Dashboard Head Active Logo */}
          <div className="px-5 flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-[#0055ff] to-[#0A84FF] rounded-xl flex items-center justify-center font-black text-white text-base shadow-[0_4px_16px_rgba(10,132,255,0.35),_inset_0_1.5px_1px_rgba(255,255,255,0.4)] font-sans">
              W
            </div>
            <div>
              <div className="font-black text-xs text-white tracking-tight">世界杯智能战术研判超脑</div>
              <div className="text-[9px] text-text-secondary/80 font-mono tracking-wider uppercase">多维量化核演沙盘 v4.2</div>
            </div>
          </div>

          {/* Nav Categories */}
          <nav className="px-3.5 space-y-4">
            <div className="space-y-1">
              <span className="px-2 text-[9px] font-bold text-text-secondary/70 uppercase tracking-widest block font-mono">全局研判控制台</span>
              <button
                onClick={() => setActiveTab("Overview")}
                className={`w-full text-left py-2 px-3 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "Overview" 
                    ? "bg-white/8 text-white font-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),_0_4px_12px_rgba(0,0,0,0.15)] border border-white/10" 
                    : "hover:bg-white/5 text-text-secondary hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#0A84FF]" />
                  全局势态主决策大屏
                </span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab("Schedule")}
                className={`w-full text-left py-2 px-3 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "Schedule" 
                    ? "bg-white/8 text-white font-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),_0_4px_12px_rgba(0,0,0,0.15)] border border-white/10" 
                    : "hover:bg-white/5 text-text-secondary hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  世界杯赛程与积分大厅
                </span>
                <span className="text-[8px] bg-emerald-500/10 border border-emerald-500/20 text-[#30D158] font-mono font-semibold px-1 rounded-full">新赛制</span>
              </button>
            </div>

            <div className="space-y-1">
              <span className="px-2 text-[9px] font-bold text-text-secondary/70 uppercase tracking-widest block font-mono">量化模型演操</span>
              
              <button
                onClick={() => setActiveTab("Database")}
                className={`w-full text-left py-2 px-3 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "Database" 
                    ? "bg-white/8 text-white font-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),_0_4px_12px_rgba(0,0,0,0.15)] border border-white/10" 
                    : "hover:bg-white/5 text-text-secondary hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-[#30D158]" />
                  48强兵力部署图谱
                </span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab("Simulator")}
                className={`w-full text-left py-2 px-3 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "Simulator" 
                    ? "bg-white/8 text-white font-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),_0_4px_12px_rgba(0,0,0,0.15)] border border-white/10" 
                    : "hover:bg-white/5 text-text-secondary hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  蒙特卡洛捧杯多核推演
                </span>
                <span className="text-[8px] bg-amber-500/10 border border-amber-500/20 text-[#FFD60A] font-mono font-semibold px-1 rounded-full">千次拟合</span>
              </button>

              <button
                onClick={() => setActiveTab("H2H")}
                className={`w-full text-left py-2 px-3 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "H2H" 
                    ? "bg-white/8 text-white font-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),_0_4px_12px_rgba(0,0,0,0.15)] border border-white/10" 
                    : "hover:bg-white/5 text-text-secondary hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Swords className="w-3.5 h-3.5 text-rose-500" />
                  双雄锋线对弈仿真
                </span>
                <span className="text-[8px] bg-red-custom/10 border border-red-custom/20 text-red-custom font-mono font-semibold px-1 rounded-full">xG进球率</span>
              </button>
            </div>

            <div className="space-y-1">
              <span className="px-2 text-[9px] font-bold text-text-secondary/70 uppercase tracking-widest block font-mono">战术智脑机能</span>

              <button
                onClick={() => setActiveTab("Whiteboard")}
                className={`w-full text-left py-2 px-3 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "Whiteboard" 
                    ? "bg-white/8 text-white font-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),_0_4px_12px_rgba(0,0,0,0.15)] border border-white/10" 
                    : "hover:bg-white/5 text-text-secondary hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  互动式战术演练白板
                </span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab("Reporter")}
                className={`w-full text-left py-2 px-3 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "Reporter" 
                    ? "bg-white/8 text-white font-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),_0_4px_12px_rgba(0,0,0,0.15)] border border-white/10" 
                    : "hover:bg-white/5 text-text-secondary hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  AI 球队分析透视研报
                </span>
                <span className="text-[7.5px] bg-[#BF5AF2]/15 border border-[#BF5AF2]/25 text-[#BF5AF2] font-black px-1 rounded-full">Gemini</span>
              </button>

              <button
                onClick={() => setActiveTab("Crawler")}
                className={`w-full text-left py-2 px-3 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                  activeTab === "Crawler" 
                    ? "bg-white/8 text-white font-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),_0_4px_12px_rgba(0,0,0,0.15)] border border-white/10" 
                    : "hover:bg-white/5 text-text-secondary hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  多源流数据清洗清洗周枢
                </span>
                <span className="text-[8px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-mono px-1 rounded-full font-bold">同步中</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Bottom utility controls */}
        <div className="p-4 border-t border-border-custom space-y-3.5 bg-white/[0.01]">
          <div className="space-y-1">
            <div className="text-[9px] uppercase font-mono tracking-wider text-text-secondary/70 block font-bold">本地多核解算负载分配</div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="w-[65.2%] h-full bg-gradient-to-r from-emerald-500 to-[#30D158] shadow-[0_0_8px_rgba(48,209,88,0.6)] rounded-full" />
            </div>
            <div className="flex justify-between font-mono text-[9px] text-text-secondary pt-0.5">
              <span>双通道解算载荷</span>
              <span className="font-bold text-[#30D158]">65.2%</span>
            </div>
          </div>

          <button
            onClick={handleResetDb}
            className="w-full py-1.5 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5 rounded-xl font-medium text-xs text-text-secondary flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            重置回归战术标准阵型
          </button>

          <div className="text-[9px] text-text-secondary/60 text-center font-mono space-y-0.5 select-text">
            <p>特征基准点: 标准常态预设 (NOMINAL)</p>
            <p className="opacity-50">© 2026 绿茵战术量子沙盘系统</p>
          </div>
        </div>
      </aside>

      {/* RIGHT WORKSPACE: Renders active screen component */}
      <main className="flex-1 flex flex-col bg-transparent relative overflow-hidden z-10">
        
        {/* Loader backdrop screen */}
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-3 text-text-secondary">
            <Activity className="w-10 h-10 text-accent-custom animate-spin" />
            <span className="text-xs font-semibold font-mono tracking-wider text-text-secondary">正在编译战术档案并装载沙盘...</span>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Header toolbar */}
            <header className="bg-panel-custom/40 backdrop-blur-2xl border-b border-border-custom h-14 shrink-0 flex items-center justify-between px-6 z-10 select-none shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#30D158] border border-[#30D158]/15 px-3 py-1 bg-[#30D158]/5 rounded-full shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.02)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-pulse shadow-[0_0_8px_#30D158]" />
                  实时多源流特征对齐清洗中枢已装载
                </div>
              </div>

              {/* Dynamic search bar only shown on relevant tabs */}
              {(activeTab === "Overview" || activeTab === "Database") && (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="快检参赛国家或代码 (如 ARG)..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="bg-white/5 border border-white/5 rounded-full px-3.5 py-1.5 pl-9 text-xs text-white placeholder-text-secondary/70 font-sans focus:outline-none focus:border-accent-custom focus:bg-white/8 transition-all w-56 placeholder:text-[11px] shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.02)]"
                    />
                  </div>
                </div>
              )}
            </header>

            {/* Main view container panel switches */}
            <div className="flex-1 overflow-auto p-6">
              
              {/* Tab 8: WORLD CUP SCHEDULE & STANDINGS */}
              {activeTab === "Schedule" && (
                <ScheduleAndStandings teams={teams} />
              )}

              {/* Tab 1: OVERVIEW SCREEN */}
              {activeTab === "Overview" && (
                <div className="space-y-6">
                  {/* Stats Cards Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
                    <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 hover:shadow-lg transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]">
                      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block font-mono">已锁定参赛名录</span>
                      <div className="text-2xl font-black text-white mt-1">48 强精细建档</div>
                      <span className="text-[10px] text-text-secondary mt-1 block">正赛列强身价、打法、阵型特征链均对齐</span>
                    </div>

                    <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 hover:shadow-lg transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]">
                      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block font-mono">即时战力标杆 (Elo)</span>
                      <div className="text-2xl font-black text-accent-custom mt-1 truncate">
                        {highestEloTeam ? `${highestEloTeam.name}` : "暂无"}
                      </div>
                      <span className="text-[10px] text-text-secondary mt-1 block font-mono">
                        全队列阵最高评分: {highestEloTeam ? highestEloTeam.elo : 0}
                      </span>
                    </div>

                    <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 hover:shadow-lg transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]">
                      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block font-mono">人员战损/禁赛监控</span>
                      <div className="text-2xl font-black text-red-custom mt-1">{activeInjuriesCount} 员伤情不稳</div>
                      <span className="text-[10px] text-text-secondary mt-1 block">物理伤损已自适应扣减动态战力加权值</span>
                    </div>

                    <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 hover:shadow-lg transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block font-mono">多源爬虫动态清洗管道</span>
                      <div className="text-xs font-semibold text-[#30D158] flex items-center gap-1.5 mt-2 bg-[#30D158]/10 border border-[#30D158]/20 px-2.5 py-1 rounded-full w-max select-none font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-custom animate-pulse shadow-[0_0_6px_#30D158]" />
                        数据管道连通饱满
                      </div>
                    </div>
                  </div>

                  {/* Dual columns main view */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Active 48 Team Directories list */}
                    <div className="lg:col-span-8 bg-panel-custom/30 backdrop-blur-md border border-white/5 rounded-2xl p-5 space-y-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]">
                      <div className="flex flex-wrap gap-2 items-center justify-between border-b border-white/5 pb-3">
                        <div className="space-y-0.5">
                          <h3 className="font-semibold text-white text-sm">2026世界杯参赛诸强研判图谱</h3>
                          <p className="text-xs text-text-secondary">轻触国家队卡片核准大名单成员、实时伤损、预设战阵以及反击转换率</p>
                        </div>
                        {/* Selector filter confederation */}
                        <div className="flex gap-1.5 text-[10px] font-mono">
                          {[
                            { code: "ALL", label: "全部足联" },
                            { code: "UEFA", label: "欧足联" },
                            { code: "CONMEBOL", label: "南美" },
                            { code: "CONCACAF", label: "中北美" },
                            { code: "CAF", label: "非洲" },
                            { code: "AFC", label: "亚洲" }
                          ].map(conf => (
                            <button
                              key={conf.code}
                              onClick={() => setSelectedConfed(conf.code)}
                              className={`px-2.5 py-1 rounded-full select-none cursor-pointer border transition-colors ${
                                selectedConfed === conf.code
                                  ? "bg-accent-custom border-accent-custom text-white font-bold shadow-sm"
                                  : "bg-white/5 border-white/5 text-text-secondary hover:border-white/10 hover:text-white"
                              }`}
                            >
                              {conf.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Filter switches matrix */}
                      <div className="flex gap-2 text-[10px] items-center">
                        <span className="text-text-secondary font-mono text-[9px] uppercase font-bold tracking-wider mr-1">筛滤维度:</span>
                        <button
                          onClick={() => setActiveLevelFilter("ALL")}
                          className={`px-3 py-1 rounded-full transition-colors cursor-pointer border ${
                            activeLevelFilter === "ALL" ? "bg-white/10 text-white border-white/10" : "bg-transparent border-transparent text-text-secondary hover:text-white"
                          }`}
                        >
                          全员建档
                        </button>
                        <button
                          onClick={() => setActiveLevelFilter("Injured")}
                          className={`px-3 py-1 rounded-full transition-colors cursor-pointer border ${
                            activeLevelFilter === "Injured" ? "bg-red-custom/10 border-red-custom/20 text-red-custom font-semibold" : "bg-transparent border-transparent text-text-secondary hover:text-white"
                          }`}
                        >
                          包含伤病戒备
                        </button>
                        <button
                          onClick={() => setActiveLevelFilter("Powerhouse")}
                          className={`px-3 py-1 rounded-full transition-colors cursor-pointer border ${
                            activeLevelFilter === "Powerhouse" ? "bg-accent-custom/15 border-accent-custom/25 text-accent-custom font-semibold" : "bg-transparent border-transparent text-text-secondary hover:text-white"
                          }`}
                        >
                          顶级豪门劲旅 (&gt;1750 ELO)
                        </button>
                      </div>

                      {/* Country grids */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {filteredTeams.map(t => {
                          const code = t.code.toUpperCase();
                          const injuriesCount = t.injuries?.length || 0;
                          return (
                            <div
                              key={t.id}
                              onClick={() => setSelectedTeamId(t.id)}
                              className={`p-4 bg-white/[0.02] border rounded-xl cursor-pointer transition-all hover:border-white/15 hover:bg-white/[0.05] hover:shadow-lg flex flex-col justify-between gap-4 shadow-sm ${
                                selectedTeamId === t.id 
                                  ? "border-accent-custom shadow-[0_0_15px_rgba(10,132,255,0.25)] ring-1 ring-accent-custom/40 bg-white/[0.04]" 
                                  : "border-white/5"
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <span className="text-[9px] font-bold text-text-secondary font-mono tracking-wider">{code}</span>
                                  <h4 className="font-bold text-white text-xs mt-0.5 truncate uppercase tracking-tight">{t.name}</h4>
                                </div>
                                <span className="text-[10px] text-text-secondary font-mono bg-white/5 px-1.5 py-0.5 rounded">小组: {t.group}</span>
                              </div>

                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-text-secondary">即时 ELO: <b className="text-white font-mono">{t.elo}</b></span>
                                {injuriesCount > 0 && (
                                  <span className="px-2 py-0.5 bg-red-custom/10 border border-red-custom/20 text-red-custom font-mono text-[9px] font-bold rounded-full">
                                    {injuriesCount} 员受损
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {filteredTeams.length === 0 && (
                        <div className="py-12 text-center text-slate-500 font-mono italic bg-white/[0.01] border border-dashed border-white/5 rounded-xl">
                          没有符合检索条件的国家队档案。
                        </div>
                      )}
                    </div>
                    {/* Right side: Top Predicted Champion List + live crawl stream logs */}
                    <div className="lg:col-span-4 space-y-6">
                      {/* Top contenders panel */}
                      <div className="bg-panel-custom/30 backdrop-blur-md border border-white/5 rounded-2xl p-5 space-y-3.5 text-xs shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]">
                        <div className="border-b border-white/5 pb-2">
                          <h3 className="font-semibold text-white flex items-center gap-1.5">
                            <Trophy className="w-4 h-4 text-amber-500" />
                            大力神金杯归属拟合
                          </h3>
                        </div>

                        {probabilities.length === 0 ? (
                          <div className="py-2 space-y-2">
                            <p className="text-text-secondary text-[11px] leading-relaxed">
                              请移步「夺冠概率沙盘推演」运行蒙特卡罗仿真，以获知最新的概率拟合排行。
                            </p>
                            <button
                              onClick={() => setActiveTab("Simulator")}
                              className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-white font-medium border border-white/5 rounded-lg text-[10px] cursor-pointer flex items-center gap-1.5 transition-colors shadow-sm"
                            >
                              <Play className="w-3 h-3 text-[#0A84FF]" />
                              激活推沙盘预测
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {probabilities
                              .sort((a,b) => b.champion - a.champion)
                              .slice(0, 5)
                              .map((p, idx) => (
                                <div key={p.teamId} className="space-y-1.5">
                                  <div className="flex justify-between items-center py-1">
                                    <span className="text-text-secondary font-mono text-[11px]">
                                      <span className="text-text-secondary/50 font-bold mr-2">0{idx+1}</span>
                                      <b className="text-white font-semibold uppercase">{p.teamName}</b>
                                    </span>
                                    <span className="bg-[#30D158]/10 border border-[#30D158]/20 text-[#30D158] font-bold text-[10px] px-2 py-0.2 rounded-full font-mono">
                                      {p.champion}%
                                    </span>
                                  </div>
                                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-blue-500 to-[#0A84FF] h-full rounded-full" style={{ width: `${p.champion}%` }} />
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>

                      {/* Ingest crawl widget log feed preview */}
                      <div className="bg-panel-custom/30 backdrop-blur-md border border-white/5 rounded-2xl p-5 shrink-0 flex flex-col justify-between max-h-[360px] overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] animate-fade-in">
                        <div className="border-b border-white/5 pb-2 mb-3">
                          <h3 className="font-semibold text-white flex items-center gap-1.5 text-xs select-none">
                            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                            数据消歧清洗状态流
                          </h3>
                        </div>
                        <div className="flex-1 space-y-2.5 overflow-y-auto mb-3 select-text font-mono text-[10px] scrollbar-thin">
                          {logs.slice(0, 4).map(l => (
                            <div key={l.id} className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                              <div className="text-text-secondary text-[9px] mb-1 flex justify-between pr-1">
                                <span>{new Date(l.timestamp).toLocaleTimeString()}</span>
                                <span className="text-accent-custom font-bold uppercase tracking-wider">{l.source}</span>
                              </div>
                              <p className="text-slate-200 leading-normal line-clamp-2">{l.message}</p>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => setActiveTab("Crawler")}
                          className="w-full text-center text-[10px] font-semibold text-accent-custom hover:text-accent-custom/80 border border-accent-custom/10 hover:border-accent-custom/25 bg-accent-custom/5 py-2 rounded-lg cursor-pointer transition-all"
                        >
                          进入数据清洗中枢面板
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Tab 2: ROSTER DATABASE DIRECTORY */}
              {activeTab === "Database" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="bg-panel-custom/30 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]">
                    <h3 className="font-semibold text-white text-sm border-b border-white/5 pb-3 mb-4 font-mono uppercase tracking-wider">
                      48 强首发特征与量化战术体系索引
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                      {filteredTeams.map(t => (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTeamId(t.id)}
                          className={`p-4 bg-white/[0.02] border rounded-xl cursor-pointer transition-all hover:border-white/12 hover:bg-white/[0.05] flex flex-col justify-between gap-4 text-xs ${
                            selectedTeamId === t.id ? "border-accent-custom ring-1 ring-accent-custom/25 bg-white/[0.04]" : "border-white/5"
                          }`}
                        >
                          <div>
                            <span className="text-[9px] text-text-secondary block font-mono">{t.code.toUpperCase()}</span>
                            <span className="font-bold text-white uppercase truncate block mt-0.5 tracking-tight">{t.name}</span>
                          </div>

                          <div className="space-y-1.5 font-mono text-[10px] text-text-secondary">
                            <div className="flex justify-between">
                              <span>前场穿透力:</span>
                              <span className="text-accent-custom font-bold">{t.ratings.attack}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>防线硬阻阻尼:</span>
                              <span className="text-green-custom font-bold">{t.ratings.defense}</span>
                            </div>
                            <div className="flex justify-between border-t border-white/5 pt-1.5 mt-1 text-[9px]">
                              <span>经典落位:</span>
                              <span className="text-white font-bold text-[9px]">{t.tactics.preferredFormation}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: BRACKET SIMULATION */}
              {activeTab === "Simulator" && (
                <TournamentSimulator probabilities={probabilities} onUpdateProbs={setProbabilities} />
              )}

              {/* Tab 4: MATCH PREDICTION */}
              {activeTab === "H2H" && (
                <MatchPredictor teams={teams} />
              )}

              {/* Tab 5: DRAW TACTICAL BOARD BOARD */}
              {activeTab === "Whiteboard" && (
                <TacticalWhiteboard teams={teams} />
              )}

              {/* Tab 6: SCENARIOS / INTELLIGENCE Scouting Reports output block */}
              {activeTab === "Reporter" && (
                <ReportCenter teams={teams} />
              )}

              {/* Tab 7: DATASOURCE LOGS SCREEN */}
              {activeTab === "Crawler" && (
                <DataSourceManager logs={logs} onTriggerScrape={handleTriggerScrape} isScraping={isScraping} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* CORE INSPECTOR: Dynamic Slide Drawer shown only when country is selected */}
      {selectedTeamId && selectedTeamDetails && (
        <aside className="w-96 border-l border-border-custom bg-panel-custom shadow-[0_0_24px_rgba(0,0,0,0.5)] overflow-hidden relative shrink-0">
          <TeamDetailDrawer
            team={selectedTeamDetails}
            onClose={() => setSelectedTeamId(null)}
            onRefreshTeamDb={handleRefreshTeamDb}
          />
        </aside>
      )}
    </div>
  );
}
