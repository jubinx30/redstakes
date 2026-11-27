import React from 'react';
import { 
  X, 
  CheckCircle2, 
  TrendingUp, 
  Download, 
  Clock, 
  Award, 
  Target, 
  Layers, 
  Sparkles,
  CloudCheck,
  ChevronRight
} from 'lucide-react';
import Badge from './Badge';
import PhonePortal from './PhonePortal';

export default function SessionSummaryModal({ 
  isOpen, 
  onClose, 
  sessionStats, 
  sessionShots, 
  elapsedTime,
  onNavigateToTelemetry 
}) {
  if (!isOpen) return null;

  const handleExportCSV = () => {
    const csvHeader = "ShotNumber,Time,Club,CarryYD,TotalYD,BallSpeedMPH,ClubSpeedMPH,SmashFactor,LaunchAngle,SpinRPM,Offline,Shape,Quality\n";
    const csvRows = sessionShots.map(s => 
      `"${s.shotNumber}","${s.time}","${s.clubName}","${s.carry}","${s.total}","${s.ballSpeed}","${s.clubSpeed}","${s.smash}","${s.launch}","${s.spin}","${s.offline}","${s.shape}","${s.tag}"`
    ).join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `RSG_Range_Session_Audit_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PhonePortal>
      <div className="absolute inset-0 z-50 flex items-center justify-center p-3.5 bg-black/85 backdrop-blur-md animate-fade-in text-left">
        <div className="w-full max-w-[420px] max-h-[92vh] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left flex flex-col overflow-y-auto no-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
            SESSION COMPLETE • BAY 04
          </span>
        </div>
        <h2 className="text-xl font-black font-display tracking-tight text-white mb-1">
          Performance Audit Report
        </h2>
        <p className="text-xs text-gray-400 mb-4 font-sans">
          Dual Machine Vision telemetry compiled across 14-club bag matrix.
        </p>

        {/* 4-Stat Metric Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 font-mono">
          <div className="p-3 rounded-xl bg-[#181c24] border border-white/5 flex flex-col">
            <div className="flex items-center justify-between text-gray-400 text-[10px]">
              <span>BALLS STRUCK</span>
              <Target className="w-3.5 h-3.5 text-[#f61919]" />
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {sessionStats.totalBallsHit}
            </div>
            <span className="text-[9px] text-emerald-400 mt-0.5">
              100% Optical Lock
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#181c24] border border-white/5 flex flex-col">
            <div className="flex items-center justify-between text-gray-400 text-[10px]">
              <span>SESSION TIME</span>
              <Clock className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {elapsedTime}
            </div>
            <span className="text-[9px] text-gray-400 mt-0.5">
              High Intensity Cadence
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#181c24] border border-white/5 flex flex-col">
            <div className="flex items-center justify-between text-gray-400 text-[10px]">
              <span>AVG SMASH</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {sessionStats.avgSmash}
            </div>
            <span className="text-[9px] text-emerald-400 mt-0.5 font-bold">
              PGA Tour Elite
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#181c24] border border-white/5 flex flex-col">
            <div className="flex items-center justify-between text-gray-400 text-[10px]">
              <span>FAIRWAY ACCURACY</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#a3e635]" />
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {sessionStats.accuracyPct}%
            </div>
            <span className="text-[9px] text-[#a3e635] mt-0.5">
              &lt; 30 YD Corridor
            </span>
          </div>
        </div>

        {/* AI Swing Coach Takeaway */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#1b222d] to-[#121620] border border-amber-400/20 mb-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white font-display">
                Nick Bradley AI Synthesis
              </span>
            </div>
            <Badge variant="lime" size="xs">96% CONSISTENCY</Badge>
          </div>
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            "Your smash factor sustained a 1.48 average with driver and long irons. Attack angle remained positive (+2.4°) off the tee. Center face impact frequency was 88%."
          </p>
        </div>

        {/* Recent Session Shots Log */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 uppercase font-bold mb-2">
            <span>Session Shot Ledger</span>
            <span>{sessionShots.length} Recorded</span>
          </div>
          <div className="space-y-1.5 max-h-36 overflow-y-auto no-scrollbar font-mono text-xs pr-1">
            {sessionShots.slice(0, 6).map((shot) => (
              <div 
                key={shot.shotNumber}
                className="p-2 rounded-lg bg-[#181c24] border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1b222d] text-white flex items-center justify-center text-[10px] font-bold">
                    #{shot.shotNumber}
                  </span>
                  <div>
                    <span className="text-white font-bold">{shot.clubName}</span>
                    <span className="text-[10px] text-gray-400 ml-1.5">{shot.shape}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <span className="font-bold text-emerald-400">{shot.carry} YD</span>
                  <Badge variant="emerald" size="xs">{shot.tag}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 mt-auto pt-2">
          <button
            onClick={() => {
              onClose();
              if (onNavigateToTelemetry) onNavigateToTelemetry();
            }}
            className="w-full py-3 rounded-xl bg-[#f61919] hover:bg-[#ff3b30] text-white font-display font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(246,25,25,0.4)] cursor-pointer transition-all active:scale-95"
          >
            Review Detailed Telemetry & Dispersion →
          </button>

          <button
            onClick={handleExportCSV}
            className="w-full py-2.5 rounded-xl bg-[#1b222d] hover:bg-[#242c3a] border border-white/10 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#a3e635]" />
            Export Session Data (.CSV)
          </button>
        </div>
      </div>
    </div>
    </PhonePortal>
  );
}
