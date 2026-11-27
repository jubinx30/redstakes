import React, { useState } from 'react';
import { 
  Activity, 
  RotateCcw, 
  Download, 
  Sliders, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  Video, 
  X, 
  ChevronDown, 
  Layers, 
  Crosshair,
  TrendingUp,
  BarChart3,
  Clock,
  Compass
} from 'lucide-react';
import Badge from '../shared/Badge';
import MetricCard from '../shared/MetricCard';
import { TELEMETRY_SHOTS, MOCK_USER } from '../../data/mockData';

export default function TelemetryView() {
  const [selectedClubKey, setSelectedClubKey] = useState('driver');
  const [activeFilter, setActiveFilter] = useState('LAST SHOT'); // 'LAST SHOT' | 'DISPERSION' | 'CLUB AVERAGES' | 'HISTORY'
  const [showClubDropdown, setShowClubDropdown] = useState(false);
  const [showReplayModal, setShowReplayModal] = useState(false);
  const [showBaselineModal, setShowBaselineModal] = useState(false);
  const [showDrillModal, setShowDrillModal] = useState(false);
  const [isFlightAnimating, setIsFlightAnimating] = useState(false);
  const [flightProgress, setFlightProgress] = useState(1);
  const [interactiveImpact, setInteractiveImpact] = useState({ x: 14, y: -6, text: '+2mm Toe • High Flush' });

  const currentShot = TELEMETRY_SHOTS[selectedClubKey] || TELEMETRY_SHOTS.driver;

  const handleAnimateFlight = () => {
    setIsFlightAnimating(true);
    setFlightProgress(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 0.05;
      if (step >= 1) {
        clearInterval(interval);
        setFlightProgress(1);
        setIsFlightAnimating(false);
      } else {
        setFlightProgress(step);
      }
    }, 40);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value,Unit,PGA Baseline,Status\n"
      + currentShot.metrics.map(m => `"${m.label}","${m.value}","${m.unit}","${m.baseline || ''}","${m.status || ''}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `RSG_Telemetry_Shot_${currentShot.shotNumber}_${selectedClubKey}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImpactClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left - rect.width / 2);
    const y = Math.round(e.clientY - rect.top - rect.height / 2);
    const horizontal = x > 8 ? `+${Math.abs(x)}mm Toe` : x < -8 ? `-${Math.abs(x)}mm Heel` : 'Center Flush';
    const vertical = y < -6 ? 'High Flush' : y > 6 ? 'Low Groove' : 'Sweet Spot';
    setInteractiveImpact({
      x,
      y,
      text: `${horizontal} • ${vertical}`
    });
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-8 text-left animate-fade-in">
      {/* 1. Club Selector & Tracking Banner */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <button
            onClick={() => setShowClubDropdown(!showClubDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141822] border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-[#f61919]" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1">
                {currentShot.club} • SHOT #{currentShot.shotNumber}
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </span>
              <span className="text-[9px] font-mono text-gray-400 truncate max-w-[170px]">
                {currentShot.shaft}
              </span>
            </div>
          </button>

          {/* Club Picker Dropdown */}
          {showClubDropdown && (
            <div className="absolute top-full left-0 mt-1.5 w-64 bg-[#181c24] border border-white/15 rounded-xl shadow-2xl p-1.5 z-30 font-mono text-xs">
              <div className="px-2 py-1 text-[10px] text-gray-400 uppercase font-bold">Select Active Bag Club</div>
              {Object.keys(TELEMETRY_SHOTS).map((clubKey) => (
                <button
                  key={clubKey}
                  onClick={() => {
                    setSelectedClubKey(clubKey);
                    setShowClubDropdown(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                    selectedClubKey === clubKey ? 'bg-[#f61919] text-white font-bold' : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  <span>{TELEMETRY_SHOTS[clubKey].club}</span>
                  <span className="text-[10px] opacity-80">{TELEMETRY_SHOTS[clubKey].distance}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Machine Vision Status Tag */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1b222d] border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-gray-300 uppercase tracking-tight">
            RSG DUAL-VISION SYNC
          </span>
        </div>
      </div>

      {/* 2. View Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {['LAST SHOT', 'DISPERSION', 'CLUB AVERAGES', 'HISTORY'].map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#f61919] text-white shadow-[0_0_12px_rgba(246,25,25,0.4)]'
                  : 'bg-[#141822] text-gray-400 hover:text-white hover:bg-[#1a202c] border border-white/5'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* FILTER VIEW: 1. LAST SHOT (Default Telemetry) */}
      {activeFilter === 'LAST SHOT' && (
        <>
          {/* 3. Shot Flight Visualization Card */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl">
            {/* Header within card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a3e635]" />
                <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                  FLIGHT TRAJECTORY
                </span>
              </div>
              <Badge variant="limeSolid" size="xs" className="font-mono">
                {currentShot.pinYardage}
              </Badge>
            </div>

            {/* Range SVG Flight Arc Canvas */}
            <div className="relative w-full h-44 rounded-xl bg-gradient-to-b from-[#0b0f17] via-[#0f1420] to-[#0a0d14] overflow-hidden border border-white/5 p-2 flex flex-col justify-between">
              {/* Distance Grid Rings */}
              <div className="absolute inset-0 flex justify-between px-6 pointer-events-none opacity-20">
                <div className="border-r border-dashed border-gray-400 h-full flex items-end pb-1 text-[8px] font-mono text-gray-400">100 YD</div>
                <div className="border-r border-dashed border-gray-400 h-full flex items-end pb-1 text-[8px] font-mono text-gray-400">150 YD</div>
                <div className="border-r border-dashed border-gray-400 h-full flex items-end pb-1 text-[8px] font-mono text-gray-400">200 YD</div>
                <div className="border-r border-dashed border-gray-400 h-full flex items-end pb-1 text-[8px] font-mono text-gray-400">250 YD</div>
              </div>

              {/* Parabolic SVG Arc */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 160">
                <defs>
                  <linearGradient id="tracerGradient" x1="0%" y1="100%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f61919" />
                    <stop offset="50%" stopColor="#ff3b30" />
                    <stop offset="100%" stopColor="#a3e635" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Ground Line */}
                <line x1="20" y1="135" x2="340" y2="135" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                {/* Background Shadow Arc */}
                <path
                  d="M 25 135 Q 180 15 325 135"
                  fill="none"
                  stroke="rgba(255,59,48,0.2)"
                  strokeWidth="6"
                />

                {/* Main Parabolic Tracer Arc */}
                <path
                  d="M 25 135 Q 180 15 325 135"
                  fill="none"
                  stroke="url(#tracerGradient)"
                  strokeWidth="3"
                  filter="url(#glow)"
                  strokeDasharray="400"
                  strokeDashoffset={400 * (1 - flightProgress)}
                  className="transition-all"
                />

                {/* Apex Indicator Node */}
                <circle cx="180" cy="45" r="4" fill="#a3e635" />
                <text x="180" y="35" textAnchor="middle" fill="#a3e635" fontSize="9" fontFamily="Space Grotesk" fontWeight="bold">
                  APEX 94 FT
                </text>

                {/* Animated Ball Tracer Node */}
                <circle 
                  cx={25 + (300 * flightProgress)} 
                  cy={135 - (90 * Math.sin(flightProgress * Math.PI))} 
                  r="5" 
                  fill="#ffffff" 
                  filter="url(#glow)"
                />
              </svg>

              {/* Top Controls Overlay */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-[10px] font-mono text-gray-400 bg-[#0b0d10]/70 px-2 py-0.5 rounded">
                  SIDE PROFILE (ELEVATION)
                </span>
                <button
                  onClick={handleAnimateFlight}
                  disabled={isFlightAnimating}
                  className="px-2 py-1 rounded bg-[#f61919]/20 hover:bg-[#f61919]/40 border border-[#f61919]/40 text-[#ff3b30] text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                >
                  <Play className="w-3 h-3 fill-[#ff3b30]" />
                  REPLAY TRACER
                </button>
              </div>

              {/* Bottom Landing Target Indicator */}
              <div className="relative z-10 flex justify-between items-end">
                <span className="text-[10px] font-mono text-gray-400">TEE #04</span>
                <div className="flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-[#0b0d10]/70 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3 h-3" />
                  CARRY: {currentShot.distance}
                </div>
              </div>
            </div>

            {/* Flight Micro-Stats Trio */}
            <div className="grid grid-cols-3 gap-2 pt-1 font-mono">
              <div className="p-2 rounded-xl bg-[#181c24] border border-white/5 text-center">
                <span className="text-[9px] text-gray-400 uppercase font-semibold">Apex</span>
                <div className="text-sm font-bold text-white mt-0.5">{currentShot.flightMicroStats.apex}</div>
              </div>
              <div className="p-2 rounded-xl bg-[#181c24] border border-white/5 text-center">
                <span className="text-[9px] text-gray-400 uppercase font-semibold">Curvature</span>
                <div className="text-sm font-bold text-[#10b981] mt-0.5">{currentShot.flightMicroStats.curvature}</div>
              </div>
              <div className="p-2 rounded-xl bg-[#181c24] border border-white/5 text-center">
                <span className="text-[9px] text-gray-400 uppercase font-semibold">Offline</span>
                <div className="text-sm font-bold text-white mt-0.5">{currentShot.flightMicroStats.offline}</div>
              </div>
            </div>
          </div>

          {/* 4. Tour-Grade Telemetry Grid (2-Column Cards) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200 font-display flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#f61919]" />
                Tour-Grade Telemetry Metrics
              </h3>
              <span className="text-[10px] font-mono text-gray-400 uppercase">
                PGA TOUR TOLERANCE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {currentShot.metrics.map((metric) => (
                <MetricCard
                  key={metric.id}
                  label={metric.label}
                  value={metric.value}
                  unit={metric.unit}
                  baseline={metric.baseline}
                  status={metric.status}
                  color={metric.color}
                  percentage={metric.percentage}
                  note={metric.note}
                />
              ))}
            </div>
          </div>

          {/* 5. Clubface Sweet Spot Radar */}
          <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-[#ff3b30]" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  CLUBFACE SWEET SPOT RADAR
                </span>
              </div>
              <Badge variant="red" size="xs">
                {interactiveImpact.text}
              </Badge>
            </div>

            {/* Dark stylized clubface SVG */}
            <div 
              onClick={handleImpactClick}
              className="relative w-full h-36 rounded-xl bg-gradient-to-b from-[#181c24] to-[#0f121a] border border-white/10 flex items-center justify-center cursor-crosshair overflow-hidden group"
              title="Click anywhere on clubface to simulate off-center impact"
            >
              {/* Clubface Groove Lines */}
              <div className="absolute inset-0 flex flex-col justify-around py-4 px-8 opacity-20 pointer-events-none">
                <div className="w-full h-0.5 bg-gray-400 rounded-full" />
                <div className="w-full h-0.5 bg-gray-400 rounded-full" />
                <div className="w-full h-0.5 bg-gray-400 rounded-full" />
                <div className="w-full h-0.5 bg-gray-400 rounded-full" />
                <div className="w-full h-0.5 bg-gray-400 rounded-full" />
              </div>

              {/* Crosshair Center */}
              <div className="absolute w-full h-0.5 bg-white/10 pointer-events-none" />
              <div className="absolute h-full w-0.5 bg-white/10 pointer-events-none" />
              <div className="absolute w-12 h-12 rounded-full border border-dashed border-[#a3e635]/40 pointer-events-none" />
              <div className="absolute w-24 h-24 rounded-full border border-dashed border-white/10 pointer-events-none" />

              {/* Dynamic Glowing Impact Marker */}
              <div 
                className="absolute w-5 h-5 rounded-full bg-[#f61919] shadow-[0_0_16px_#f61919] flex items-center justify-center transition-all duration-200 pointer-events-none"
                style={{ 
                  transform: `translate(${interactiveImpact.x}px, ${interactiveImpact.y}px)` 
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </div>

              {/* Micro-Instructions */}
              <div className="absolute bottom-1.5 right-2 text-[9px] font-mono text-gray-500 pointer-events-none group-hover:text-gray-300 transition-colors">
                TAP TO TEST IMPACT SHIFT
              </div>
            </div>

            {/* Dynamic Loft, Face Angle, Club Path Matrix */}
            <div className="grid grid-cols-3 gap-2 font-mono text-center">
              <div className="p-2 rounded-xl bg-[#181c24] border border-white/5">
                <span className="text-[9px] text-gray-400 uppercase font-semibold">Dynamic Loft</span>
                <div className="text-sm font-bold text-white mt-0.5">{currentShot.impactRadar.dynamicLoft}</div>
              </div>
              <div className="p-2 rounded-xl bg-[#181c24] border border-white/5">
                <span className="text-[9px] text-gray-400 uppercase font-semibold">Face Angle</span>
                <div className="text-sm font-bold text-white mt-0.5">{currentShot.impactRadar.faceAngle}</div>
              </div>
              <div className="p-2 rounded-xl bg-[#181c24] border border-white/5">
                <span className="text-[9px] text-gray-400 uppercase font-semibold">Club Path</span>
                <div className="text-sm font-bold text-[#10b981] mt-0.5">{currentShot.impactRadar.clubPath}</div>
              </div>
            </div>
          </div>

          {/* 6. AI Coaching Card */}
          <div className="rounded-2xl border border-white/10 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-amber-400/20 border border-amber-400/70">
                  <img src="/images/lifestyle_2.png" alt="Nick Bradley" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-display">Nick Bradley AI Coach</h4>
                  <span className="text-[10px] text-gray-400 font-sans">Biomechanical Kinematic Sequence</span>
                </div>
              </div>
              <Badge variant="lime" size="xs">
                AI MATCH: {currentShot.aiCoach.score}
              </Badge>
            </div>

            <p className="text-xs text-gray-300 font-sans leading-relaxed">
              "{currentShot.aiCoach.analysis}"
            </p>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#181c24] border border-white/5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">{currentShot.aiCoach.recommendation}</span>
                  <span className="text-[10px] text-gray-400 font-mono">{currentShot.aiCoach.duration} drill video</span>
                </div>
              </div>
              <button 
                onClick={() => setShowDrillModal(true)}
                className="px-2.5 py-1 rounded-lg bg-[#a3e635] hover:bg-[#bef264] text-black text-[10px] font-bold uppercase font-mono transition-all active:scale-95"
              >
                Watch Drill
              </button>
            </div>
          </div>
        </>
      )}

      {/* FILTER VIEW: 2. DISPERSION */}
      {activeFilter === 'DISPERSION' && (
        <div className="p-4 rounded-2xl bg-[#13171f] border border-white/10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-white uppercase">Fairway Dispersion Ellipse</h3>
            <Badge variant="emerald" size="xs">92% FAIRWAY HIT</Badge>
          </div>
          <div className="relative w-full h-64 rounded-xl bg-[#0e121a] border border-white/5 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-around py-4 px-6 opacity-20 pointer-events-none">
              <div className="w-full border-t border-dashed border-gray-400" />
              <div className="w-full border-t border-dashed border-gray-400" />
              <div className="w-full border-t border-dashed border-gray-400" />
            </div>
            {/* Center target line */}
            <div className="absolute h-full w-0.5 bg-emerald-500/40" />
            {/* 30 YD Fairway bounds */}
            <div className="w-36 h-48 border-2 border-emerald-500/30 rounded-[50px] bg-emerald-500/5 relative flex items-center justify-center">
              {/* Scatter dots */}
              <div className="absolute w-2 h-2 rounded-full bg-white -top-6 left-12" />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#f61919] top-10 left-16 ring-2 ring-white/50" />
              <div className="absolute w-2 h-2 rounded-full bg-white top-24 left-10" />
              <div className="absolute w-2 h-2 rounded-full bg-white bottom-8 left-18" />
              <div className="absolute w-2 h-2 rounded-full bg-white top-16 right-8" />
            </div>
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-gray-400">
              Corridor Width: 32 YD • Oval: 95% Confidence
            </div>
          </div>
        </div>
      )}

      {/* FILTER VIEW: 3. CLUB AVERAGES */}
      {activeFilter === 'CLUB AVERAGES' && (
        <div className="p-4 rounded-2xl bg-[#13171f] border border-white/10 flex flex-col gap-3">
          <h3 className="text-xs font-mono font-bold text-white uppercase">Bag Carry & Gapping Matrix</h3>
          <div className="space-y-2 font-mono text-xs">
            {Object.keys(TELEMETRY_SHOTS).map((k) => {
              const shot = TELEMETRY_SHOTS[k];
              return (
                <div key={k} className="p-3 rounded-xl bg-[#181c24] flex items-center justify-between border border-white/5">
                  <div>
                    <div className="font-bold text-white">{shot.club}</div>
                    <div className="text-[10px] text-gray-400">Smash: {shot.metrics[2]?.value} • Spin: {shot.metrics[3]?.value}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-emerald-400">{shot.distance}</div>
                    <div className="text-[10px] text-gray-400">Carry Avg</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FILTER VIEW: 4. HISTORY */}
      {activeFilter === 'HISTORY' && (
        <div className="p-4 rounded-2xl bg-[#13171f] border border-white/10 flex flex-col gap-3">
          <h3 className="text-xs font-mono font-bold text-white uppercase">Session Shot Log (Bay 04)</h3>
          <div className="space-y-2 font-mono text-xs">
            {[24, 23, 22, 21].map((num) => (
              <div key={num} className="p-3 rounded-xl bg-[#181c24] flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1b222d] flex items-center justify-center font-bold text-[10px] text-white">
                    #{num}
                  </span>
                  <div>
                    <div className="font-bold text-white">Driver (9.0°)</div>
                    <div className="text-[10px] text-gray-400">167.4 MPH Ball • 12.8° Launch</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">278 YD</div>
                  <Badge variant="emerald" size="xs">FLUSH</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Bottom Action Buttons */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          onClick={() => setShowReplayModal(true)}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#f61919] to-[#d61313] hover:from-[#ff3b30] hover:to-[#f61919] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(246,25,25,0.4)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Video className="w-4 h-4" />
          Replay High-Speed Camera (480 FPS)
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowBaselineModal(true)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1b222d] hover:bg-[#242c3a] border border-white/10 text-white text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            PGA Baseline
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1b222d] hover:bg-[#242c3a] border border-white/10 text-white text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#a3e635]" />
            Export CSV
          </button>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* 480 FPS Camera Replay Modal */}
      {showReplayModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-[400px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
            <button
              onClick={() => setShowReplayModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f61919] animate-pulse" />
              <h3 className="font-display font-bold text-lg text-white">480 FPS Impact High-Speed</h3>
            </div>
            
            {/* Simulated Video Player */}
            <div className="relative w-full h-48 rounded-xl bg-[#0a0d14] border border-white/10 overflow-hidden mb-3 flex items-center justify-center">
              <img 
                src="/images/lifestyle_wide.png" 
                alt="Impact Replay" 
                className="w-full h-full object-cover opacity-50 filter brightness-90 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[9px] text-[#a3e635]">
                SLOW-MO: 0.125x SPEED
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] font-mono text-gray-300">
                <span>0.00ms (Impact Compression)</span>
                <span className="text-emerald-400 font-bold">Flush Groove #3</span>
              </div>
            </div>

            <p className="text-xs text-gray-300 mb-4 font-sans">
              Ultra high-speed optical capture confirms clean ball decompression without face deflection. Clubhead speed was sustained at 114.2 MPH through bottom quadrant.
            </p>

            <button
              onClick={() => setShowReplayModal(false)}
              className="w-full py-2.5 bg-[#f61919] text-white font-bold text-xs uppercase rounded-xl"
            >
              Close Replay
            </button>
          </div>
        </div>
      )}

      {/* PGA Baseline Comparison Modal */}
      {showBaselineModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[400px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
            <button
              onClick={() => setShowBaselineModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-bold text-lg text-white mb-2">PGA Tour Baseline Comparison</h3>
            <p className="text-xs text-gray-400 mb-3 font-sans">Benchmarked against TrackMan 2024 PGA Tour player average statistics.</p>
            
            <div className="space-y-2 font-mono text-xs mb-4">
              <div className="p-2.5 rounded-lg bg-[#181c24] flex justify-between items-center">
                <span className="text-gray-400">Ball Speed:</span>
                <span className="text-white font-bold">167.4 vs Tour 168.0 MPH</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#181c24] flex justify-between items-center">
                <span className="text-gray-400">Launch Angle:</span>
                <span className="text-white font-bold">12.8° vs Tour 11.2°</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#181c24] flex justify-between items-center">
                <span className="text-gray-400">Spin Rate:</span>
                <span className="text-white font-bold">2,420 vs Tour 2,500 RPM</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#181c24] flex justify-between items-center">
                <span className="text-gray-400">Smash Factor:</span>
                <span className="text-emerald-400 font-bold">1.47 vs Tour 1.49</span>
              </div>
            </div>

            <button
              onClick={() => setShowBaselineModal(false)}
              className="w-full py-2.5 bg-[#1b222d] text-white font-bold text-xs uppercase rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Drill Preview Modal */}
      {showDrillModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-[400px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
            <button
              onClick={() => setShowDrillModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="font-display font-bold text-lg text-white">Gate Tee Face Centering</h3>
            </div>
            <p className="text-xs text-gray-300 font-sans mb-3">
              Setup two alignment tees 2 inches outside the toe and heel of your driver. Swing through the gate without clipping either peg to tighten sweet spot clustering.
            </p>
            <div className="p-3 bg-[#181c24] rounded-xl border border-white/5 font-mono text-xs text-emerald-400 mb-4">
              Goal: Eliminate the +2mm toe bias and achieve 1.49 smash efficiency.
            </div>
            <button
              onClick={() => setShowDrillModal(false)}
              className="w-full py-2.5 bg-[#f61919] text-white font-bold text-xs uppercase rounded-xl"
            >
              Start Drill in Bay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
