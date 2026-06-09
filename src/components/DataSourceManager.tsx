import React, { useState } from "react";
import { Server, RefreshCw, AlertTriangle, ShieldCheck, Database, FileSpreadsheet, Clock } from "lucide-react";
import { SystemLog } from "../types";

interface DataSourceManagerProps {
  logs: SystemLog[];
  onTriggerScrape: () => void;
  isScraping: boolean;
}

export default function DataSourceManager({ logs, onTriggerScrape, isScraping }: DataSourceManagerProps) {
  const [activeTab, setActiveTab] = useState<"Logs" | "Sources" | "Audit">("Logs");

  const sourcesList = [
    { name: "Opta Pro 战术数据实时流", type: "API Webhook", lastSync: "6 分钟前", reliability: 98, status: "Connected", records: "14,830" },
    { name: "Transfermarkt 球队大名单数据库", type: "JSON Scraping", lastSync: "12 分钟前", reliability: 95, status: "Connected", records: "2,540" },
    { name: "FIFA 世界杯数据官方门户", type: "HTML Parser", lastSync: "1 小时前", reliability: 99, status: "Connected", records: "8,206" },
    { name: "Understat 预期进球 xG 终端", type: "REST Endpoint", lastSync: "32 分钟前", reliability: 92, status: "Idle", records: "1,270" }
  ];

  const typeConfig = {
    crawler: { color: "text-[#0A84FF] bg-[#0A84FF]/10 border-[#0A84FF]/25", label: "爬虫数据接入" },
    injury: { color: "text-red-custom bg-red-custom/10 border-red-custom/25", label: "队内伤病警报" },
    analysis: { color: "text-green-custom bg-green-custom/10 border-green-custom/25", label: "战术智慧剖析" },
    system: { color: "text-white bg-bg-custom border-border-custom", label: "球探行为日志" }
  };

  return (
    <div id="datasource-manager" className="bg-panel-custom border border-border-custom rounded-xl overflow-hidden font-sans text-white shadow-md flex flex-col h-full animate-fade-in">
      {/* Drawer Header */}
      <div className="bg-bg-custom p-4 border-b border-border-custom flex items-center justify-between">
        <div>
          <h2 className="font-bold text-white tracking-tight text-sm flex items-center gap-2 font-mono uppercase">
            <Database className="w-4 h-4 text-[#0A84FF]" />
            多源特征数据实时消歧融合中枢
          </h2>
          <p className="text-xs text-text-secondary">实时核验、清洗消歧分布式爬虫同步至本振节点的球员静态特质与动态伤口数据</p>
        </div>

        <button
          onClick={onTriggerScrape}
          disabled={isScraping}
          className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:opacity-95 text-white border border-emerald-500/10 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer font-sans shadow-[0_4px_12px_rgba(48,209,88,0.2),_inset_0_1px_1px_rgba(255,255,255,0.2)]"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-white ${isScraping ? "animate-spin" : ""}`} />
          {isScraping ? "正在极速同步特征流..." : "一键同步全网情报"}
        </button>
      </div>

      {/* Segment Controllers */}
      <div className="flex bg-bg-custom/50 border-b border-border-custom px-4 text-[10px] font-semibold font-mono">
        <button
          onClick={() => setActiveTab("Logs")}
          className={`py-2 px-3 border-b-2 hover:text-white transition-colors cursor-pointer ${
            activeTab === "Logs" ? "border-accent-custom text-accent-custom" : "border-transparent text-text-secondary"
          }`}
        >
          数据清洗日志 ({logs.length})
        </button>
        <button
          onClick={() => setActiveTab("Sources")}
          className={`py-2 px-3 border-b-2 hover:text-white transition-colors cursor-pointer ${
            activeTab === "Sources" ? "border-accent-custom text-accent-custom" : "border-transparent text-text-secondary"
          }`}
        >
          已连接数据源 ({sourcesList.length})
        </button>
        <button
          onClick={() => setActiveTab("Audit")}
          className={`py-2 px-3 border-b-2 hover:text-white transition-colors cursor-pointer ${
            activeTab === "Audit" ? "border-accent-custom text-accent-custom" : "border-transparent text-text-secondary"
          }`}
        >
          数据冲突审计
        </button>
      </div>

      {/* Pane Content */}
      <div className="flex-1 p-4 overflow-y-auto max-h-[620px]">
        {activeTab === "Logs" && (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="p-3 bg-bg-custom border border-border-custom rounded-xl space-y-2 text-xs hover:border-[#444] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-semibold font-mono ${typeConfig[log.type]?.color}`}>
                      {typeConfig[log.type]?.label || log.type}
                    </span>
                    <span className="text-text-secondary flex items-center gap-1 text-[10px] font-mono">
                      <Clock className="w-3 h-3 text-text-secondary/60" />
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-text-secondary font-mono">置信度:</span>
                    <span className={`px-1.5 py-0.2 rounded font-mono font-bold text-[10px] ${
                      log.confidenceScore >= 95 ? "bg-green-custom/10 text-green-custom border border-green-custom/20" : "bg-accent-custom/10 text-accent-custom border border-accent-custom/20"
                    }`}>
                      {log.confidenceScore}%
                    </span>
                  </div>
                </div>

                <p className="text-slate-200 leading-relaxed text-xs font-mono">{log.message}</p>

                <div className="flex items-center justify-between border-t border-border-custom/50 pt-2 text-[10px] font-mono">
                  <span className="text-text-secondary">数据源: <b className="text-white mt-0.5 uppercase">{log.source}</b></span>
                  <span className={`flex items-center gap-1.5 font-semibold text-[10px] ${
                    log.status === "Synced" ? "text-green-custom" : "text-accent-custom"
                  }`}>
                    {log.status === "Synced" ? (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 text-green-custom" />
                        去重洗净完毕
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 text-accent-custom" />
                        已自动冲突消歧
                      </>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Sources" && (
          <div className="space-y-3 font-mono">
            {sourcesList.map((src, i) => (
              <div key={i} className="p-3 bg-bg-custom border border-border-custom rounded-xl flex items-center justify-between text-xs hover:border-[#444] transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white uppercase text-xs">{src.name}</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#1C1C1E] text-[9px] text-text-secondary border border-border-custom">{src.type}</span>
                  </div>
                  <div className="text-[10px] text-text-secondary flex items-center gap-3">
                    <span>上次同步: {src.lastSync}</span>
                    <span>•</span>
                    <span>已索引缓存行数: {src.records}</span>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="text-[9px] text-text-secondary font-mono">数据可靠性指数:</div>
                  <div className="flex items-center gap-2 justify-end">
                    <span className="font-mono font-bold text-accent-custom text-xs">{src.reliability}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Audit" && (
          <div className="space-y-4 text-xs font-mono">
            <div className="p-3.5 bg-bg-custom border border-border-custom rounded-xl space-y-3.5">
              <h3 className="font-semibold text-white flex items-center gap-2 text-xs">
                <AlertTriangle className="w-4 h-4 text-accent-custom" />
                多源数据冲突消歧战略与置信度硬阈值
              </h3>
              <p className="text-text-secondary leading-relaxed text-[11px] font-sans">
                当从多个独立的足球数据门户拉取名单与伤病状态时，必然产生冲突（例如 <b>Opta Scraper</b> 与 <b>Sofascore API</b> 对某球员伤愈复出时间点预测不一致）。系统在此部署了三重自动化消歧模型：
              </p>

              <div className="space-y-3 border-t border-border-custom pt-3 font-sans">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 px-1.5 bg-[#1C1C1E] border border-border-custom rounded font-bold font-mono text-[9px] text-white">策略一</div>
                  <div>
                    <h4 className="font-semibold text-white text-[11px] font-mono uppercase">主权威源决策树</h4>
                    <p className="text-text-secondary text-[11px] mt-0.5">国家队阵容选择直接默认信任官方 FIFA 登入档案。俱乐部表现参数优先回落至 Transfermarkt 接口。</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="p-1 px-1.5 bg-[#1C1C1E] border border-border-custom rounded font-bold font-mono text-[9px] text-white">策略二</div>
                  <div>
                    <h4 className="font-semibold text-white text-[11px] font-mono uppercase">医疗伤病高权重戳</h4>
                    <p className="text-text-secondary text-[11px] mt-0.5">在离正赛不长的时间线内，肌肉群、骨折伤病状态将默认覆盖俱乐部参数，直接信任随队队医在本地中录入的康复记录。</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="p-1 px-1.5 bg-[#1C1C1E] border border-border-custom rounded font-bold font-mono text-[9px] text-white">策略三</div>
                  <div>
                    <h4 className="font-semibold text-white text-[11px] font-mono uppercase">战术突变阵型兜底</h4>
                    <p className="text-text-secondary text-[11px] mt-0.5">当爬取的预设主力阵型偏离基准过大时，系统将触发安全系数最高的现代主流 4-2-3-1 模型予以自动保护与对齐。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-bg-custom/30 border border-border-custom rounded-lg text-text-secondary flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-custom" />
              <span className="text-[10px]">当前系统一致性参数同步处于极佳合规态。</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
