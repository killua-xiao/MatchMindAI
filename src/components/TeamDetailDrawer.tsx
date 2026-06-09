import React, { useState, useEffect } from "react";
import { Plus, Trash2, Shield, Save, Users, Zap, X, AlertTriangle, Check, Trophy } from "lucide-react";
import { FootballTeam, KeyPlayer, InjuryStory } from "../types";

interface TeamDetailDrawerProps {
  team: FootballTeam;
  onClose: () => void;
  onRefreshTeamDb: (updatedTeam: FootballTeam) => void;
}

export default function TeamDetailDrawer({ team, onClose, onRefreshTeamDb }: TeamDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<"Tactics" | "Squad" | "Injuries" | "Recent matches">("Tactics");
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | null; text: string }>({ type: null, text: "" });

  // Editable states initialized from team
  const [editedTeam, setEditedTeam] = useState<FootballTeam>(JSON.parse(JSON.stringify(team)));

  // Sync state if team changes
  useEffect(() => {
    setEditedTeam(JSON.parse(JSON.stringify(team)));
    setStatusMessage({ type: null, text: "" });
  }, [team]);

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage({ type: null, text: "" });
    try {
      const res = await fetch("/api/teams/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedTeam)
      });
      const data = await res.json();
      if (data.success) {
        onRefreshTeamDb(editedTeam);
        setStatusMessage({ type: "success", text: `${editedTeam.name} 的随探战术参数和球探大名单已安全保存。` });
      } else {
        setStatusMessage({ type: "error", text: "同步更新数据库失败: " + data.error });
      }
    } catch (error) {
      console.error(error);
      setStatusMessage({ type: "error", text: "往后台数据库写入对战数据发生编译或网络超时。" });
    } finally {
      setIsSaving(false);
    }
  };

  // Subhandlers
  const handleRatingChange = (field: keyof typeof editedTeam.ratings, val: number) => {
    setEditedTeam(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [field]: val }
    }));
  };

  const handleTacticsChange = (field: keyof typeof editedTeam.tactics, val: number) => {
    setEditedTeam(prev => ({
      ...prev,
      tactics: { ...prev.tactics, [field]: val }
    }));
  };

  // Add key player
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerClub, setNewPlayerClub] = useState("");
  const [newPlayerRole, setNewPlayerRole] = useState<"GK" | "DEF" | "MID" | "FWD">("MID");
  const [newPlayerRating, setNewPlayerRating] = useState(80);

  const handleAddPlayer = () => {
    if (!newPlayerName.trim() || !newPlayerClub.trim()) return;
    const newP: KeyPlayer = {
      name: newPlayerName,
      club: newPlayerClub,
      role: newPlayerRole,
      rating: newPlayerRating,
      status: "Healthy"
    };
    setEditedTeam(prev => ({
      ...prev,
      keyPlayers: [...prev.keyPlayers, newP]
    }));
    setNewPlayerName("");
    setNewPlayerClub("");
    setStatusMessage({ type: "success", text: `已成功在缓存大名单里登入新主力 "${newP.name}"。点击“提交修改”写入数据库。` });
  };

  const handleDeletePlayer = (idx: number) => {
    const deleted = editedTeam.keyPlayers[idx];
    setEditedTeam(prev => ({
      ...prev,
      keyPlayers: prev.keyPlayers.filter((_, i) => i !== idx)
    }));
    setStatusMessage({ type: "success", text: `已在草稿大名单中注销主力球员 "${deleted.name}"。点击“提交修改”确认注销。` });
  };

  // Add Injury
  const [newInjuryName, setNewInjuryName] = useState("");
  const [newInjuryRole, setNewInjuryRole] = useState("MID");
  const [newInjuryDesc, setNewInjuryDesc] = useState("汉密尔拉伤");
  const [newInjurySeverity, setNewInjurySeverity] = useState<"High" | "Medium" | "Low">("Medium");
  const [newInjuryImpact, setNewInjuryImpact] = useState(8);

  const handleAddInjury = () => {
    if (!newInjuryName.trim()) return;
    const newIn: InjuryStory = {
      playerName: newInjuryName,
      role: newInjuryRole,
      injury: newInjuryDesc,
      severity: newInjurySeverity,
      impactPercent: newInjuryImpact,
      status: `康复中`
    };
    setEditedTeam(prev => ({
      ...prev,
      injuries: [...(prev.injuries || []), newIn]
    }));
    setNewInjuryName("");
    setStatusMessage({ type: "success", text: `已预登记 "${newIn.playerName}" 的病态及折损权重。点击“提交修改”触发 ELO 衰减。` });
  };

  const handleDeleteInjury = (idx: number) => {
    const deleted = editedTeam.injuries[idx];
    setEditedTeam(prev => ({
      ...prev,
      injuries: prev.injuries.filter((_, i) => i !== idx)
    }));
    setStatusMessage({ type: "success", text: `已清除 "${deleted.playerName}" 的伤耗对位。点击“提交修改”可使其满额康复。` });
  };

  return (
    <div id="team-detail-drawer" className="bg-panel-custom border border-border-custom rounded-xl overflow-hidden font-sans text-white shadow-xl flex flex-col h-full animate-fade-in">
      {/* Title bar header */}
      <div className="bg-bg-custom p-4 border-b border-border-custom flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-accent-custom px-2 py-1 text-[10px] font-mono rounded text-white font-bold tracking-tight">
            世界杯 {editedTeam.group} 组种子
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-1.5 uppercase">
              {editedTeam.name}
            </h2>
            <p className="text-[10px] text-text-secondary font-mono uppercase">
              {editedTeam.confederation} • 战力基础 ELO: {editedTeam.elo}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-3 py-1 bg-accent-custom hover:bg-accent-custom/85 disabled:opacity-55 rounded-lg text-xs text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer font-mono"
          >
            <Save className="w-3.5 h-3.5" />
            {isSaving ? "正在同步后端..." : "提交修改"}
          </button>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-white p-1 rounded-lg hover:bg-bg-custom cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Save Status Notification Block inside drawer */}
      {statusMessage.type && (
        <div className={`px-4 py-2.5 mx-4 mt-3 rounded-lg border text-[11px] flex gap-2 items-start ${
          statusMessage.type === "success" 
            ? "bg-green-custom/10 border-green-custom/25 text-green-custom" 
            : "bg-red-custom/10 border-red-custom/25 text-red-custom"
        }`}>
          {statusMessage.type === "success" ? <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />}
          <div>
            <span className="font-bold font-mono">数据指标提醒:</span> {statusMessage.text}
          </div>
        </div>
      )}

      {/* Mini tabs options bar */}
      <div className="flex bg-bg-custom/50 px-4 mt-2 border-b border-border-custom text-[10px] font-semibold font-mono">
        <button
          onClick={() => setActiveTab("Tactics")}
          className={`py-2 px-2.5 border-b-2 hover:text-white transition-colors cursor-pointer ${
            activeTab === "Tactics" ? "border-accent-custom text-accent-custom font-bold" : "border-transparent text-text-secondary"
          }`}
        >
          战术属性
        </button>
        <button
          onClick={() => setActiveTab("Squad")}
          className={`py-2 px-2.5 border-b-2 hover:text-white transition-colors cursor-pointer ${
            activeTab === "Squad" ? "border-accent-custom text-accent-custom font-bold" : "border-transparent text-text-secondary"
          }`}
        >
          大名单成员 ({editedTeam.keyPlayers.length})
        </button>
        <button
          onClick={() => setActiveTab("Injuries")}
          className={`py-2 px-2.5 border-b-2 hover:text-white transition-colors cursor-pointer ${
            activeTab === "Injuries" ? "border-accent-custom text-accent-custom font-bold" : "border-transparent text-text-secondary"
          }`}
        >
          医疗拉伤档案 ({editedTeam.injuries?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("Recent matches")}
          className={`py-2 px-2.5 border-b-2 hover:text-white transition-colors cursor-pointer ${
            activeTab === "Recent matches" ? "border-accent-custom text-accent-custom font-bold" : "border-transparent text-text-secondary"
          }`}
        >
          近期正赛战绩 ({editedTeam.recentForm.length}场)
        </button>
      </div>

      {/* Pane Content Panels */}
      <div className="flex-1 p-4 overflow-y-auto max-h-[580px] bg-panel-custom text-xs">
        {activeTab === "Tactics" && (
          <div className="space-y-6">
            {/* Core Ratings Sliders Section */}
            <div className="space-y-4">
              <h3 className="font-bold text-text-secondary uppercase text-[10px] tracking-wider select-none flex items-center gap-1.5 font-mono">
                <Users className="w-3.5 h-3.5 text-text-secondary" />
                国家队首发战力精调
              </h3>

              <div className="grid grid-cols-1 gap-3.5">
                {/* Attack Slider */}
                <div className="space-y-1.5 p-3 bg-bg-custom rounded-lg border border-border-custom">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="font-medium text-text-secondary uppercase text-[10px]">进攻穿透能力</span>
                    <span className="font-bold text-accent-custom">{editedTeam.ratings.attack}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={editedTeam.ratings.attack}
                    onChange={e => handleRatingChange("attack", parseInt(e.target.value))}
                    className="w-full accent-accent-custom cursor-pointer"
                  />
                </div>

                {/* Midfield Slider */}
                <div className="space-y-1.5 p-3 bg-bg-custom rounded-lg border border-border-custom">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="font-medium text-text-secondary uppercase text-[10px]">中场枢纽支配力</span>
                    <span className="font-bold text-accent-custom">{editedTeam.ratings.midfield}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={editedTeam.ratings.midfield}
                    onChange={e => handleRatingChange("midfield", parseInt(e.target.value))}
                    className="w-full accent-accent-custom cursor-pointer"
                  />
                </div>

                {/* Defense Slider */}
                <div className="space-y-1.5 p-3 bg-bg-custom rounded-lg border border-border-custom">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="font-medium text-text-secondary uppercase text-[10px]">低位防线硬阻阻尼</span>
                    <span className="font-bold text-accent-custom">{editedTeam.ratings.defense}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={editedTeam.ratings.defense}
                    onChange={e => handleRatingChange("defense", parseInt(e.target.value))}
                    className="w-full accent-accent-custom cursor-pointer"
                  />
                </div>

                {/* Bench Depth Slider */}
                <div className="space-y-1.5 p-3 bg-bg-custom rounded-lg border border-border-custom">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="font-medium text-text-secondary uppercase text-[10px]">多位置替补板凳深度</span>
                    <span className="font-bold text-accent-custom">{editedTeam.ratings.benchDepth}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={editedTeam.ratings.benchDepth}
                    onChange={e => handleRatingChange("benchDepth", parseInt(e.target.value))}
                    className="w-full accent-accent-custom cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Tactical Style Parameters */}
            <div className="space-y-4 pt-4 border-t border-border-custom">
              <h3 className="font-bold text-text-secondary uppercase text-[10px] tracking-wider select-none flex items-center gap-1.5 font-mono">
                <Zap className="w-3.5 h-3.5 text-text-secondary" />
                国家主帅战略指数偏移
              </h3>

              <div className="space-y-3">
                {/* Possession Slider */}
                <div className="space-y-1 bg-bg-custom/50 p-3 rounded-lg border border-border-custom/50">
                  <div className="flex justify-between font-mono text-[10px] text-text-secondary">
                    <span>控球主导倾向比重</span>
                    <span className="font-bold text-white">{editedTeam.tactics.possession}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    value={editedTeam.tactics.possession}
                    onChange={e => handleTacticsChange("possession", parseInt(e.target.value))}
                    className="w-full accent-accent-custom cursor-pointer"
                  />
                </div>

                {/* High Pressing Slider */}
                <div className="space-y-1 bg-bg-custom/50 p-3 rounded-lg border border-border-custom/50">
                  <div className="flex justify-between font-mono text-[10px] text-text-secondary">
                    <span>前场逼抢触发烈度</span>
                    <span className="font-bold text-white">{editedTeam.tactics.pressing}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="98"
                    value={editedTeam.tactics.pressing}
                    onChange={e => handleTacticsChange("pressing", parseInt(e.target.value))}
                    className="w-full accent-accent-custom cursor-pointer"
                  />
                </div>

                {/* Counter attack rate */}
                <div className="space-y-1 bg-bg-custom/50 p-3 rounded-lg border border-border-custom/50">
                  <div className="flex justify-between font-mono text-[10px] text-text-secondary">
                    <span>守转攻垂直反击转换率</span>
                    <span className="font-bold text-white">{editedTeam.tactics.counterAttack}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="98"
                    value={editedTeam.tactics.counterAttack}
                    onChange={e => handleTacticsChange("counterAttack", parseInt(e.target.value))}
                    className="w-full accent-accent-custom cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Coach formation text info */}
            <div className="flex gap-4 items-center bg-bg-custom p-3.5 rounded-xl border border-border-custom">
              <div className="space-y-1 w-1/2">
                <span className="text-[10px] text-text-secondary font-mono font-bold block uppercase">预设阵首发体系</span>
                <input
                  type="text"
                  value={editedTeam.tactics.preferredFormation}
                  onChange={e => setEditedTeam(prev => ({ ...prev, tactics: { ...prev.tactics, preferredFormation: e.target.value } }))}
                  className="bg-panel-custom border border-border-custom rounded-lg px-2.5 py-1 text-xs text-accent-custom font-bold font-mono focus:outline-none w-32 uppercase animate-pulse"
                />
              </div>
              <div className="space-y-1 w-1/2 border-l border-border-custom/55 pl-4">
                <span className="text-[10px] text-text-secondary font-mono font-bold block uppercase">主教练席位</span>
                <span className="text-xs text-white block font-semibold">{editedTeam.coach.name}</span>
                <span className="text-[10px] text-text-secondary font-mono block">战术哲学风格: {editedTeam.coach.style}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Squad" && (
          <div className="space-y-6">
            <h3 className="font-bold text-text-secondary uppercase text-[10px] tracking-wider font-mono flex justify-between">
              <span>在册核心大名单注册</span>
              <span className="text-accent-custom">在籍主力人数: {editedTeam.keyPlayers.length}</span>
            </h3>

            {/* Form to append mock player */}
            <div className="p-3 bg-bg-custom border border-border-custom rounded-xl space-y-3.5">
              <span className="font-semibold text-white block text-[11px] uppercase tracking-wider font-mono">大名单资产录入</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  placeholder="球员姓名 (如 莱奥)"
                  value={newPlayerName}
                  onChange={e => setNewPlayerName(e.target.value)}
                  className="bg-panel-custom border border-border-custom rounded-lg px-2.5 py-1.5 text-white placeholder-text-secondary text-xs focus:outline-none focus:border-accent-custom"
                />
                <input
                  type="text"
                  placeholder="俱乐部 (如 AC米兰)"
                  value={newPlayerClub}
                  onChange={e => setNewPlayerClub(e.target.value)}
                  className="bg-panel-custom border border-border-custom rounded-lg px-2.5 py-1.5 text-white placeholder-text-secondary text-xs focus:outline-none focus:border-accent-custom"
                />

                <div className="space-y-1 col-span-2">
                  <span className="text-[9px] text-text-secondary font-mono uppercase">战术战地阵位</span>
                  <select
                    value={newPlayerRole}
                    onChange={e => setNewPlayerRole(e.target.value as any)}
                    className="w-full bg-panel-custom border border-border-custom rounded-lg p-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="GK">门将 (GK)</option>
                    <option value="DEF">后卫 (DEF)</option>
                    <option value="MID">中场 (MID)</option>
                    <option value="FWD">前锋 (FWD)</option>
                  </select>
                </div>

                <div className="space-y-1 col-span-2 pt-1">
                  <div className="flex justify-between font-mono text-[9px] text-text-secondary">
                    <span>球员综合战力评估评分</span>
                    <span>{newPlayerRating} / 99</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="99"
                    value={newPlayerRating}
                    onChange={e => setNewPlayerRating(parseInt(e.target.value))}
                    className="w-full accent-accent-custom cursor-pointer"
                  />
                </div>
              </div>

              <button
                onClick={handleAddPlayer}
                className="w-full py-1.5 bg-[#1C1C1E] hover:bg-border-custom text-accent-custom font-semibold border border-accent-custom/25 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors font-mono text-[10px] uppercase"
              >
                <Plus className="w-3.5 h-3.5" />
                注入该大名单资产
              </button>
            </div>

            {/* List key players */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {editedTeam.keyPlayers.map((player, idx) => (
                <div key={idx} className="p-2.5 bg-bg-custom/50 border border-border-custom rounded-lg flex items-center justify-between hover:border-[#444] transition-colors">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white uppercase text-xs">{player.name}</span>
                    <p className="text-[10px] text-text-secondary font-mono">
                      {player.role} • 效力于 {player.club} • 战力权重值: <b className="text-accent-custom">{player.rating}</b>
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeletePlayer(idx)}
                    className="text-text-secondary hover:text-red-custom p-1.5 rounded-lg hover:bg-bg-custom cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Injuries" && (
          <div className="space-y-6">
            <h3 className="font-bold text-text-secondary uppercase text-[10px] tracking-wider font-mono flex justify-between">
              <span>随队因病折损报告登记</span>
              <span className="text-red-custom font-mono">伤缺员人次: {editedTeam.injuries?.length || 0}</span>
            </h3>

            {/* Form to spawn Injury Warning */}
            <div className="p-3 bg-bg-custom border border-border-custom rounded-xl space-y-3.5">
              <span className="font-semibold text-white block text-[11px] uppercase tracking-wider font-mono">登记伤情与康复细节</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  placeholder="球员姓名"
                  value={newInjuryName}
                  onChange={e => setNewInjuryName(e.target.value)}
                  className="bg-panel-custom border border-border-custom rounded-lg px-2.5 py-1.5 mt-1 text-white placeholder-text-secondary text-xs focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="伤名诊断 (如 ACL韧带磨损/病痛)"
                  value={newInjuryDesc}
                  onChange={e => setNewInjuryDesc(e.target.value)}
                  className="bg-panel-custom border border-border-custom rounded-lg px-2.5 py-1.5 mt-1 text-white placeholder-text-secondary text-xs focus:outline-none"
                />

                <div className="space-y-1">
                  <span className="text-[9px] text-text-secondary font-mono">场上位置</span>
                  <input
                    type="text"
                    value={newInjuryRole}
                    onChange={e => setNewInjuryRole(e.target.value)}
                    placeholder="FWD / MID / DEF"
                    className="bg-panel-custom border border-border-custom rounded-lg px-2 py-1 text-white text-xs w-full focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-text-secondary font-mono">病理严重级别</span>
                  <select
                    value={newInjurySeverity}
                    onChange={e => setNewInjurySeverity(e.target.value as any)}
                    className="bg-panel-custom border border-border-custom rounded-lg p-1 text-xs text-white w-full focus:outline-none"
                  >
                    <option value="Low">低风险 (轻微拉伤拉扯)</option>
                    <option value="Medium">中度受制 (无法爆发长距离)</option>
                    <option value="High">极严重损坏 (长期病房/直接降Elo)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 pb-1">
                <div className="flex justify-between font-mono text-[9px] text-text-secondary">
                  <span>对国家队 Elo 体系削减阻尼率</span>
                  <span className="text-red-custom font-bold">-{newInjuryImpact}% 战力衰竭</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="15"
                  value={newInjuryImpact}
                  onChange={e => setNewInjuryImpact(parseInt(e.target.value))}
                  className="w-full accent-red-custom cursor-pointer"
                />
              </div>

              <button
                onClick={handleAddInjury}
                className="w-full py-1.5 bg-[#1C1C1E] hover:bg-border-custom text-red-custom font-semibold border border-red-custom/25 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors font-mono text-[10px] uppercase"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-red-custom" />
                确诊该伤病并折损
              </button>
            </div>

            {/* List existing injuries */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {!editedTeam.injuries || editedTeam.injuries.length === 0 ? (
                <div className="p-4 bg-bg-custom/30 rounded-lg border border-border-custom text-center text-text-secondary font-mono italic">
                  本世界杯国家队无在册伤情，全员健康处于满载战斗状态。
                </div>
              ) : (
                editedTeam.injuries.map((ing, idx) => (
                  <div key={idx} className="p-3 bg-bg-custom/50 border border-border-custom rounded-lg flex items-center justify-between hover:border-[#444] transition-colors text-xs animate-fade-in">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-red-custom uppercase text-xs">{ing.playerName}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[8px] font-bold uppercase font-mono bg-red-custom/10 text-red-custom`}>
                          {ing.severity === "High" ? "重度上阵受限" : ing.severity === "Medium" ? "中等受制" : "轻度阻尼"}
                        </span>
                      </div>
                      <p className="text-slate-200 text-xs">{ing.injury} ({ing.status})</p>
                      <span className="text-[10px] text-text-secondary font-mono italic block">
                        伤缺对整防线/前场拖累折合系数: -{ing.impactPercent || 0}%
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteInjury(idx)}
                      className="text-text-secondary hover:text-red-custom p-1.5 rounded-lg hover:bg-bg-custom cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-custom" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "Recent matches" && (
          <div className="space-y-3">
            <h3 className="font-bold text-text-secondary uppercase text-[10px] tracking-wider font-mono mb-3">
              历史正赛轨迹 (最近5场国际正赛)
            </h3>

            {editedTeam.recentForm.map((match, i) => (
              <div key={i} className="p-3 bg-bg-custom/50 border border-border-custom rounded-lg flex items-center justify-between text-xs hover:border-[#444] transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono font-black text-[10px] px-2 py-0.5 rounded ${
                      match.outcome === "W" ? "bg-green-custom/15 text-green-custom font-extrabold" :
                      match.outcome === "D" ? "bg-border-custom text-text-secondary" : "bg-red-custom/15 text-red-custom"
                    }`}>
                      {match.outcome === "W" ? "胜" : match.outcome === "D" ? "平" : "负"}
                    </span>
                    <span className="text-white font-medium text-xs">vs {match.opponent}</span>
                  </div>
                  <p className="text-[10px] text-text-secondary font-mono">{match.date} • {match.type}</p>
                </div>

                <div className="text-right space-y-0.5 font-mono">
                  <div className="text-xs font-black text-white">{match.score}</div>
                  <div className="text-[10px] text-text-secondary">xG 期望进球率: {match.xg}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
