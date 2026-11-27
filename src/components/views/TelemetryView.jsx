import React, { useState, useEffect } from 'react';
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
import PhonePortal from '../shared/PhonePortal';
import HighSpeedReplayView from '../telemetry/HighSpeedReplayView';
import { TELEMETRY_SHOTS, MOCK_USER } from '../../data/mockData';
import { useRangeSession } from '../../context/RangeSessionContext';

export default function TelemetryView() {
  const { sessionShots, telemetryCatalog, activeClubKey, setActiveClubKey } = useRangeSession();
  const [selectedClubKey, setSelectedClubKey] = useState(activeClubKey || 'driver');
  const [activeFilter, setActiveFilter] = useState('LAST SHOT'); // 'LAST SHOT' | 'DISPERSION' | 'CLUB AVERAGES' | 'HISTORY'
  const [showClubDropdown, setShowClubDropdown] = useState(false);
  const [showReplayModal, setShowReplayModal] = useState(false);
  const [showBaselineModal, setShowBaselineModal] = useState(false);
  const [showDrillModal, setShowDrillModal] = useState(false);
  const [isFlightAnimating, setIsFlightAnimating] = useState(false);
  const [flightProgress, setFlightProgress] = useState(1);
  const [interactiveImpact, setInteractiveImpact] = useState({ x: 14, y: -6, text: '+2mm Toe • High Flush' });

  // Sync selected club with context
  useEffect(() => {
    if (activeClubKey && telemetryCatalog[activeClubKey]) {
      setSelectedClubKey(activeClubKey);
    }
  }, [activeClubKey]);

  const currentShot = telemetryCatalog[selectedClubKey] || TELEMETRY_SHOTS[selectedClubKey] || TELEMETRY_SHOTS.driver;

  const handleAnimateFlight = () => {
    if (isFlightAnimating) return;
    setIsFlightAnimating(true);
    setFlightProgress(0);
    const startTime = performance.now();
    const duration = 1100; // ms

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setFlightProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setFlightProgress(1);
        setIsFlightAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  };

  // Sync impact point and trigger smooth ball flight animation on club change
  useEffect(() => {
    if (currentShot?.impactRadar) {
      setInteractiveImpact({
        x: currentShot.impactRadar.offsetX || 0,
        y: currentShot.impactRadar.offsetY || 0,
        text: currentShot.impactRadar.point || 'Center Flush'
      });
    }
    handleAnimateFlight();
  }, [selectedClubKey]);

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
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141822] border border-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
          >
            <div className="w-2 h-2 rounded-full bg-[#f61919] animate-pulse" />
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
            <div className="absolute top-full left-0 mt-1.5 w-64 bg-[#181c24] border border-white/15 rounded-xl shadow-2xl p-1.5 z-30 font-mono text-xs animate-fade-in">
              <div className="px-2 py-1 text-[10px] text-gray-400 uppercase font-bold">Select Active Bag Club</div>
              {Object.keys(telemetryCatalog).map((clubKey) => (
                <button
                  key={clubKey}
                  onClick={() => {
                    setSelectedClubKey(clubKey);
                    setActiveClubKey(clubKey);
                    setShowClubDropdown(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                    selectedClubKey === clubKey ? 'bg-[#f61919] text-white font-bold' : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  <span>{telemetryCatalog[clubKey].club}</span>
                  <span className="text-[10px] opacity-80">{telemetryCatalog[clubKey].distance}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Machine Vision Status Tag */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1b222d] border border-white/10 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
          </span>
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
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-[#f61919] text-white shadow-[0_0_14px_rgba(246,25,25,0.5)] scale-[1.02]'
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
        <div className="flex flex-col gap-4 animate-fade-in">
          {/* 3. Shot Flight Visualization Card */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl transition-all duration-300">
            {/* Header within card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3e635] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3e635]" />
                </span>
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
              {/* Subtle radar scanline sweep effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="w-full h-10 bg-gradient-to-b from-transparent via-emerald-400/25 to-transparent animate-scanline" />
              </div>

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
                  className="transition-all opacity-40"
                />

                {/* Main Parabolic Tracer Arc */}
                <path
                  d="M 25 135 Q 180 15 325 135"
                  fill="none"
                  stroke="url(#tracerGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  strokeDasharray="400"
                  strokeDashoffset={400 * (1 - flightProgress)}
                  className="transition-all"
                />

                {/* Apex Vertical Guide Line */}
                <line x1="180" y1="45" x2="180" y2="135" stroke="rgba(163,230,53,0.3)" strokeDasharray="3 3" strokeWidth="1" />

                {/* Apex Indicator Node with subtle pulse ring */}
                <circle cx="180" cy="45" r="7" fill="none" stroke="#a3e635" strokeWidth="1" opacity="0.6" className="animate-pulse" />
                <circle cx="180" cy="45" r="4" fill="#a3e635" />
                <text x="180" y="34" textAnchor="middle" fill="#a3e635" fontSize="9" fontFamily="Space Grotesk" fontWeight="bold">
                  APEX {currentShot.flightMicroStats.apex}
                </text>

                {/* Landing Target Pin & Ping Ripple */}
                <circle cx="325" cy="135" r="8" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4" className="animate-ping" />
                <circle cx="325" cy="135" r="3" fill="#10b981" />
                <line x1="325" y1="120" x2="325" y2="135" stroke="#10b981" strokeWidth="1.5" />
                <polygon points="325,120 332,124 325,128" fill="#10b981" />

                {/* Animated Ball Tracer Node */}
                <g transform={`translate(${25 + (300 * flightProgress)}, ${135 - (90 * Math.sin(flightProgress * Math.PI))})`}>
                  <circle r="8" fill="#ffffff" opacity="0.25" className="animate-ping" />
                  <circle r="4.5" fill="#ffffff" filter="url(#glow)" />
                </g>
              </svg>

              {/* Top Controls Overlay */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-[10px] font-mono text-gray-400 bg-[#0b0d10]/70 px-2 py-0.5 rounded backdrop-blur-xs">
                  SIDE PROFILE (ELEVATION)
                </span>
                <button
                  onClick={handleAnimateFlight}
                  disabled={isFlightAnimating}
                  className={`px-2.5 py-1 rounded bg-[#f61919]/20 hover:bg-[#f61919]/40 border border-[#f61919]/40 text-[#ff3b30] text-[10px] font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
                    isFlightAnimating ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_12px_rgba(246,25,25,0.4)]'
                  }`}
                >
                  <Play className={`w-3 h-3 fill-[#ff3b30] ${isFlightAnimating ? 'animate-pulse' : ''}`} />
                  REPLAY TRACER
                </button>
              </div>

              {/* Bottom Landing Target Indicator */}
              <div className="relative z-10 flex justify-between items-end">
                <span className="text-[10px] font-mono text-gray-400">TEE #04</span>
                <div className="flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-[#0b0d10]/70 px-2 py-0.5 rounded backdrop-blur-xs border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3 animate-pulse" />
                  CARRY: {currentShot.distance}
                </div>
              </div>
            </div>

            {/* Flight Micro-Stats Trio */}
            <div className="grid grid-cols-3 gap-2 pt-1 font-mono">
              <div className="p-2 rounded-xl bg-[#181c24] border border-white/5 text-center hover:border-white/15 hover:-translate-y-0.5 transition-all duration-200">
                <span className="text-[9px] text-gray-400 uppercase font-semibold">Apex</span>
                <div className="text-sm font-bold text-white mt-0.5">{currentShot.flightMicroStats.apex}</div>
              </div>
              <div className="p-2 rounded-xl bg-[#181c24] border border-white/5 text-center hover:border-white/15 hover:-translate-y-0.5 transition-all duration-200">
                <span className="text-[9px] text-gray-400 uppercase font-semibold">Curvature</span>
                <div className="text-sm font-bold text-[#10b981] mt-0.5">{currentShot.flightMicroStats.curvature}</div>
              </div>
              <div className="p-2 rounded-xl bg-[#181c24] border border-white/5 text-center hover:border-white/15 hover:-translate-y-0.5 transition-all duration-200">
                <span className="text-[9px] text-gray-400 uppercase font-semibold">Offline</span>
                <div className="text-sm font-bold text-white mt-0.5">{currentShot.flightMicroStats.offline}</div>
              </div>
            </div>
          </div>

          {/* 4. Tour-Grade Telemetry Grid (2-Column Cards) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200 font-display flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#f61919] animate-pulse" />
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
          <div className="rounded-2xl border border-white/10 hover:border-white/20 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl transition-all duration-300">
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
              className="relative w-full h-36 rounded-xl bg-gradient-to-b from-[#181c24] to-[#0f121a] border border-white/10 flex items-center justify-center cursor-crosshair overflow-hidden group hover:border-white/20 transition-all duration-300"
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
              <div className="absolute w-12 h-12 rounded-full border border-dashed border-[#a3e635]/40 animate-pulse pointer-events-none" />
              <div className="absolute w-24 h-24 rounded-full border border-dashed border-white/10 pointer-events-none" />

              {/* Dynamic Glowing Impact Marker with Acoustic Compression Shockwaves */}
              <div 
                className="absolute w-5 h-5 rounded-full bg-[#f61919] shadow-[0_0_18px_#f61919] flex items-center justify-center transition-all duration-300 ease-out pointer-events-none"
                style={{ 
                  transform: `translate(${interactiveImpact.x}px, ${interactiveImpact.y}px)` 
                }}
              >
                {/* Acoustic shockwave concentric ripples */}
                <span className="absolute w-10 h-10 rounded-full border border-red-500/60 animate-impact-ripple pointer-events-none" />
                <span className="absolute w-10 h-10 rounded-full border border-red-400/40 animate-impact-ripple-delayed pointer-events-none" />
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </div>

              {/* Micro-Instructions */}
              <div className="absolute bottom-1.5 right-2 text-[9px] font-mono text-gray-500 pointer-events-none group-hover:text-gray-300 transition-colors">
                TAP TO TEST IMPACT SHIFT
              </div>
            </div>

            {/* Dynamic Loft, Face Angle, Club Path Matrix */}
            <div className="grid grid-cols-3 gap-2 font-mono text-center">
              <div className="p-2 rounded-xl bg-[#181c24] border border-white/5 hover:border-white/15 hover:-translate-y-0.5 transition-all duration-200">
                <span className="text-[9px] text-gray-400 uppercase font-semibold">Dynamic Loft</span>
                <div className="text-sm font-bold text-white mt-0.5">{currentShot.impactRadar.dynamicLoft}</div>
              </div>
              <div className="p-2 rounded-xl bg-[#181c24] border border-white/5 hover:border-white/15 hover:-translate-y-0.5 transition-all duration-200">
                <span className="text-[9px] text-gray-400 uppercase font-semibold">Face Angle</span>
                <div className="text-sm font-bold text-white mt-0.5">{currentShot.impactRadar.faceAngle}</div>
              </div>
              <div className="p-2 rounded-xl bg-[#181c24] border border-white/5 hover:border-white/15 hover:-translate-y-0.5 transition-all duration-200">
                <span className="text-[9px] text-gray-400 uppercase font-semibold">Club Path</span>
                <div className="text-sm font-bold text-[#10b981] mt-0.5">{currentShot.impactRadar.clubPath}</div>
              </div>
            </div>
          </div>

          {/* 6. AI Coaching Card */}
          <div className="rounded-2xl border border-white/10 hover:border-white/20 bg-[#13171f] p-4 flex flex-col gap-3 shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-amber-400/20 border-2 border-amber-400/70 shadow-[0_0_12px_rgba(251,191,36,0.25)] ring-2 ring-amber-400/30">
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

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#181c24] border border-white/5 hover:border-white/15 transition-all duration-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">{currentShot.aiCoach.recommendation}</span>
                  <span className="text-[10px] text-gray-400 font-mono">{currentShot.aiCoach.duration} drill video</span>
                </div>
              </div>
              <button 
                onClick={() => setShowDrillModal(true)}
                className="px-2.5 py-1 rounded-lg bg-[#a3e635] hover:bg-[#bef264] hover:shadow-[0_0_12px_rgba(163,230,53,0.5)] text-black text-[10px] font-bold uppercase font-mono transition-all duration-200 active:scale-95 cursor-pointer"
              >
                Watch Drill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FILTER VIEW: 2. DISPERSION */}
      {activeFilter === 'DISPERSION' && (
        <div className="p-4 rounded-2xl bg-[#13171f] border border-white/10 flex flex-col gap-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-white uppercase">Fairway Dispersion Ellipse</h3>
            <Badge variant="emerald" size="xs">92% FAIRWAY HIT</Badge>
          </div>
          <div className="relative w-full h-64 rounded-xl bg-[#0e121a] border border-white/5 flex items-center justify-center overflow-hidden">
            {/* Subtle fairway scanline */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="w-full h-14 bg-gradient-to-b from-transparent via-emerald-400/25 to-transparent animate-scanline" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-around py-4 px-6 opacity-20 pointer-events-none">
              <div className="w-full border-t border-dashed border-gray-400 flex justify-end text-[8px] font-mono text-gray-400 pr-2">290 YD</div>
              <div className="w-full border-t border-dashed border-gray-400 flex justify-end text-[8px] font-mono text-gray-400 pr-2">275 YD</div>
              <div className="w-full border-t border-dashed border-gray-400 flex justify-end text-[8px] font-mono text-gray-400 pr-2">260 YD</div>
            </div>
            {/* Center target line */}
            <div className="absolute h-full w-0.5 bg-emerald-500/40" />
            {/* 30 YD Fairway bounds with confidence glow */}
            <div className="w-36 h-48 border-2 border-emerald-500/40 rounded-[50px] bg-emerald-500/5 relative flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.12)]">
              {/* Dynamic Scatter dots from sessionShots */}
              {sessionShots.slice(1, 8).map((s) => {
                // Map offline string (e.g. "1.2 L" or "2.4 R") and carry to relative x, y inside oval
                const isLeft = s.offline.includes('L');
                const val = parseFloat(s.offline) || 1.0;
                const posX = isLeft ? Math.max(10, 64 - val * 12) : Math.min(118, 64 + val * 12);
                const posY = Math.max(15, Math.min(160, 85 - (s.carry - 250) * 0.8));
                return (
                  <div 
                    key={s.shotNumber} 
                    className="absolute w-2 h-2 rounded-full bg-white/75 hover:bg-emerald-400 hover:scale-150 transition-all cursor-pointer"
                    style={{ left: `${posX}px`, top: `${posY}px` }}
                    title={`Shot #${s.shotNumber}: ${s.clubName} - ${s.carry} YD (${s.offline})`}
                  />
                );
              })}
              {/* Active current shot with animated beacon ring */}
              <div 
                className="absolute w-3.5 h-3.5 rounded-full bg-[#f61919] ring-2 ring-white/80 flex items-center justify-center shadow-[0_0_14px_rgba(246,25,25,0.9)] z-10 transition-all duration-300"
                style={{ 
                  left: `${64 + (currentShot.flightMicroStats.offline.includes('L') ? -parseFloat(currentShot.flightMicroStats.offline) * 12 : parseFloat(currentShot.flightMicroStats.offline) * 12)}px`,
                  top: `${Math.max(20, Math.min(150, 85 - (currentShot.carryYardage - 250) * 0.8))}px`
                }}
              >
                <span className="absolute inset-0 rounded-full bg-[#f61919] animate-beacon opacity-75" />
                <div className="w-1 h-1 rounded-full bg-white" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-gray-400">
              Corridor Width: 32 YD • Oval: 95% Confidence
            </div>
          </div>
        </div>
      )}

      {/* FILTER VIEW: 3. CLUB AVERAGES */}
      {activeFilter === 'CLUB AVERAGES' && (
        <div className="p-4 rounded-2xl bg-[#13171f] border border-white/10 flex flex-col gap-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-white uppercase">Bag Carry & Gapping Matrix</h3>
            <span className="text-[10px] font-mono text-emerald-400">14-CLUB CALIBRATION</span>
          </div>
          <div className="space-y-2 font-mono text-xs">
            {Object.keys(telemetryCatalog).map((k) => {
              const shot = telemetryCatalog[k];
              // Calculate club-specific average from sessionShots if available
              const clubShots = sessionShots.filter(s => s.clubKey === k);
              const calculatedAvgCarry = clubShots.length > 0
                ? Math.round(clubShots.reduce((acc, s) => acc + (s.carry || 200), 0) / clubShots.length)
                : parseInt(shot.distance) || 200;
              const barWidth = Math.min(100, Math.round((calculatedAvgCarry / 300) * 100));

              return (
                <div 
                  key={k} 
                  onClick={() => { 
                    setSelectedClubKey(k); 
                    setActiveClubKey(k);
                    setActiveFilter('LAST SHOT'); 
                  }}
                  className="p-3 rounded-xl bg-[#181c24] hover:bg-[#1c222e] border border-white/5 hover:border-emerald-500/30 flex flex-col gap-2 transition-all duration-200 cursor-pointer hover:translate-x-1 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                        {shot.club}
                        {selectedClubKey === k && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">ACTIVE</span>
                        )}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Smash: {shot.metrics[2]?.value} • Spin: {shot.metrics[3]?.value} • {clubShots.length > 0 ? `${clubShots.length} hits` : 'Preset'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-emerald-400">{calculatedAvgCarry} YD</div>
                      <div className="text-[10px] text-gray-400">Carry Avg</div>
                    </div>
                  </div>
                  {/* Subtle carry gapping bar */}
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-[#a3e635] rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${barWidth}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FILTER VIEW: 4. HISTORY */}
      {activeFilter === 'HISTORY' && (
        <div className="p-4 rounded-2xl bg-[#13171f] border border-white/10 flex flex-col gap-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-white uppercase">Session Shot Log (Bay 04)</h3>
            <span className="text-[10px] font-mono text-gray-400">{sessionShots.length} HITS RECORDED</span>
          </div>
          <div className="space-y-2 font-mono text-xs max-h-[380px] overflow-y-auto no-scrollbar pr-1">
            {sessionShots.map((shot, idx) => (
              <div 
                key={shot.shotNumber}
                onClick={() => {
                  setSelectedClubKey(shot.clubKey);
                  setActiveClubKey(shot.clubKey);
                  setActiveFilter('LAST SHOT');
                }}
                className="p-3 rounded-xl bg-[#181c24] hover:bg-[#1c222e] border border-white/5 hover:border-white/15 flex items-center justify-between transition-all duration-200 hover:translate-x-1 cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] transition-colors ${
                    idx === 0 ? 'bg-[#f61919] text-white shadow-[0_0_8px_rgba(246,25,25,0.6)]' : 'bg-[#1b222d] text-white group-hover:bg-white/20'
                  }`}>
                    #{shot.shotNumber}
                  </span>
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      {shot.clubName}
                      {idx === 0 && <span className="text-[9px] text-[#f61919] font-bold">LATEST</span>}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {shot.ballSpeed} MPH Ball • {shot.launch}° Launch • {shot.shape}
                    </div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <div className="font-bold text-white">{shot.carry} YD</div>
                  <Badge variant="emerald" size="xs">{shot.tag}</Badge>
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
          className="relative overflow-hidden w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#f61919] to-[#d61313] hover:from-[#ff3b30] hover:to-[#f61919] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(246,25,25,0.4)] hover:shadow-[0_0_25px_rgba(246,25,25,0.6)] active:scale-[0.98] transition-all cursor-pointer group"
        >
          {/* Subtle light shimmer sheen */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer pointer-events-none" />
          <Video className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          Replay High-Speed Camera (480 FPS)
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowBaselineModal(true)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1b222d] hover:bg-[#242c3a] border border-white/10 hover:border-white/20 text-white text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer hover:shadow-lg"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            PGA Baseline
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1b222d] hover:bg-[#242c3a] border border-white/10 hover:border-white/20 text-white text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer hover:shadow-lg"
          >
            <Download className="w-3.5 h-3.5 text-[#a3e635]" />
            Export CSV
          </button>
        </div>
      </div>

      {/* --- MODALS & FULL-SCREEN OVERLAYS (PORTALED TO PHONE FRAME ROOT) --- */}

      {/* 480 FPS High-Speed Camera Replay Page / Full View */}
      {showReplayModal && (
        <PhonePortal>
          <HighSpeedReplayView
            shot={currentShot}
            onClose={() => setShowReplayModal(false)}
          />
        </PhonePortal>
      )}

      {/* PGA Baseline Comparison Modal */}
      {showBaselineModal && (
        <PhonePortal>
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-left">
            <div className="w-full max-w-[390px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
              <button
                onClick={() => setShowBaselineModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
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
                className="w-full py-2.5 bg-[#1b222d] hover:bg-[#242c3a] text-white font-bold text-xs uppercase rounded-xl transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </PhonePortal>
      )}

      {/* Drill Preview Modal */}
      {showDrillModal && (
        <PhonePortal>
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in text-left">
            <div className="w-full max-w-[390px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
              <button
                onClick={() => setShowDrillModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <h3 className="font-display font-bold text-lg text-white">Gate Tee Face Centering</h3>
              </div>
              <p className="text-xs text-gray-300 font-sans mb-3 leading-relaxed">
                Setup two alignment tees 2 inches outside the toe and heel of your driver. Swing through the gate without clipping either peg to tighten sweet spot clustering.
              </p>
              <div className="p-3 bg-[#181c24] rounded-xl border border-white/5 font-mono text-xs text-emerald-400 mb-4">
                Goal: Eliminate the +2mm toe bias and achieve 1.49 smash efficiency.
              </div>
              <button
                onClick={() => setShowDrillModal(false)}
                className="w-full py-2.5 bg-[#f61919] hover:bg-[#ff3b30] text-white font-bold text-xs uppercase rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                Start Drill in Bay
              </button>
            </div>
          </div>
        </PhonePortal>
      )}
    </div>
  );
}
