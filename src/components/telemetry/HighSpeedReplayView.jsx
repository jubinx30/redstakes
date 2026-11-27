import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  X,
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Video,
  Download,
  Sparkles,
  Crosshair,
  CheckCircle2,
  Activity,
  Layers,
  Gauge
} from 'lucide-react';
import Badge from '../shared/Badge';

export default function HighSpeedReplayView({ shot, onClose }) {
  // Timeline progress in percentage 0 - 100
  // 0% = -2.5ms (pre-impact), 50% = 0.00ms (impact compression), 100% = +2.5ms (launch)
  const [timelinePos, setTimelinePos] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.1); // 0.1x represents 480 FPS slow-mo
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Convert timelinePos (0 - 100) to milliseconds (-2.5ms to +2.5ms)
  const currentMs = ((timelinePos - 50) / 50) * 2.5;

  // Slow motion playback loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      lastTimeRef.current = null;
      return;
    }

    const step = (time) => {
      if (lastTimeRef.current != null) {
        const delta = time - lastTimeRef.current;
        // At 1.0x speed, 5000ms duration for the entire 5ms window; scale by playbackSpeed
        const progressIncrement = (delta / (3000 / playbackSpeed)) * 100;
        setTimelinePos((prev) => {
          const next = prev + progressIncrement;
          if (next >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return next;
        });
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const handleSeek = (e) => {
    setTimelinePos(parseFloat(e.target.value));
    setIsPlaying(false);
  };

  const handleStep = (direction) => {
    setIsPlaying(false);
    setTimelinePos((prev) => Math.min(100, Math.max(0, prev + direction * 5)));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimelinePos(0);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    }, 1200);
  };

  // Clubhead and ball positions based on timeline
  // timeline 0..50: club approaches from x: 60 to x: 170
  // timeline 50: impact at x: 170
  // timeline 50..100: ball launches from x: 180 to x: 340
  const clubX = timelinePos <= 50 
    ? 50 + (timelinePos / 50) * 115 
    : 165 + ((timelinePos - 50) / 50) * 50;
  
  const ballX = timelinePos <= 50 
    ? 180 
    : 180 + Math.pow((timelinePos - 50) / 50, 1.3) * 160;

  const ballCompression = timelinePos >= 46 && timelinePos <= 54
    ? 0.72 // High-speed deformation ratio
    : 1;

  const isImpactMoment = Math.abs(timelinePos - 50) < 4;

  const ballSpeedMetric = shot?.metrics?.find((m) => m.label.toLowerCase().includes('ball speed'))?.value || '167.4';
  const clubSpeedMetric = shot?.metrics?.find((m) => m.label.toLowerCase().includes('clubhead speed'))?.value || '114.2';
  const faceAngleMetric = shot?.impactRadar?.faceAngle || '0.8° Open';
  const impactPoint = shot?.impactRadar?.point || '+2mm Toe • High Flush';

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[#0b0d10] text-white animate-fade-in overflow-hidden">
      {/* 1. Dedicated Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#11141c] border-b border-white/10 shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer active:scale-95 group"
        >
          <ChevronLeft className="w-4 h-4 text-[#f61919] group-hover:-translate-x-0.5 transition-transform" />
          <span>BACK</span>
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#f61919] animate-pulse" />
            <h2 className="font-display font-extrabold text-sm uppercase tracking-wider text-white">
              480 FPS High-Speed Replay
            </h2>
          </div>
          <span className="text-[10px] font-mono text-gray-400">
            {shot?.club || 'Driver'} • Shot #{shot?.shotNumber || '4'}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Close Replay"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-4 text-left">
        {/* High-Speed Optical Player Container */}
        <div className="relative w-full rounded-2xl bg-[#090b10] border border-white/15 overflow-hidden shadow-2xl flex flex-col">
          {/* Viewport Canvas (SVG Impact Simulation + Overlays) */}
          <div className="relative w-full h-56 bg-gradient-to-b from-[#0e121a] via-[#090b10] to-[#07080c] overflow-hidden select-none">
            {/* Subtle background studio image */}
            <img 
              src="/images/lifestyle_wide.png" 
              alt="High Speed Impact Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 filter contrast-150 brightness-75 pointer-events-none"
            />

            {/* Optical Measurement Grid Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-25">
              <div className="w-full h-full grid grid-cols-6 grid-rows-4">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-white/10" />
                ))}
              </div>
            </div>

            {/* Center Impact Focal Reticle */}
            <div className="absolute left-[175px] top-[100px] w-6 h-6 -translate-x-1/2 -translate-y-1/2 border border-dashed border-red-500/50 rounded-full pointer-events-none" />

            {/* Impact Flash Shockwave at 0.00ms */}
            {isImpactMoment && (
              <div className="absolute left-[175px] top-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
                <span className="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/30 animate-ping" />
                <span className="absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f61919] blur-md opacity-80" />
                <div className="w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_#ffffff]" />
              </div>
            )}

            {/* Animated SVG Clubhead & Ball Visualizer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 220">
              <defs>
                <linearGradient id="clubFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4a5568" />
                  <stop offset="50%" stopColor="#2d3748" />
                  <stop offset="100%" stopColor="#1a202c" />
                </linearGradient>
                <linearGradient id="tracerBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f61919" stopOpacity="0" />
                  <stop offset="100%" stopColor="#a3e635" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Tee Peg */}
              <line x1="180" y1="112" x2="180" y2="175" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="180" cy="112" rx="4" ry="2" fill="#718096" />

              {/* Ball Launch Tracer Trail (after impact) */}
              {timelinePos > 52 && (
                <line
                  x1="180"
                  y1="100"
                  x2={ballX}
                  y2="100"
                  stroke="url(#tracerBeam)"
                  strokeWidth="3"
                  strokeDasharray="4 2"
                />
              )}

              {/* Clubhead Representation */}
              <g transform={`translate(${clubX - 60}, 65)`}>
                {/* Hosel */}
                <rect x="5" y="0" width="6" height="25" fill="#718096" rx="2" />
                {/* Clubface */}
                <path
                  d="M 10 20 C 35 18, 55 22, 60 55 C 55 68, 30 70, 10 65 Z"
                  fill="url(#clubFaceGrad)"
                  stroke="#f61919"
                  strokeWidth="1.5"
                />
                {/* Grooves */}
                <line x1="42" y1="28" x2="52" y2="38" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <line x1="38" y1="35" x2="50" y2="47" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                <line x1="34" y1="42" x2="48" y2="56" stroke="#f61919" strokeWidth="1.5" /> {/* Strike Groove #3 */}
                <line x1="30" y1="49" x2="44" y2="63" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              </g>

              {/* Golf Ball (with decompression squeeze) */}
              <g transform={`translate(${ballX}, 100)`}>
                <ellipse
                  cx="0"
                  cy="0"
                  rx={10 * ballCompression}
                  ry={10}
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
                {/* Ball Dimple accents */}
                <circle cx={-3 * ballCompression} cy="-3" r="1" fill="#94a3b8" />
                <circle cx={1 * ballCompression} cy="2" r="1" fill="#94a3b8" />
                <circle cx={-2 * ballCompression} cy="4" r="1" fill="#94a3b8" />
              </g>
            </svg>

            {/* Top Live Video HUD Overlay */}
            <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 font-mono pointer-events-none">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 border border-white/10 backdrop-blur-md text-[9px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-ping" />
                <span className="text-[#a3e635] font-bold">OPTICAL 480 FPS</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-300">CAM #01 FACE-ON</span>
              </div>

              <div className="px-2 py-0.5 rounded bg-black/80 border border-white/10 backdrop-blur-md text-[10px] font-bold text-white">
                {currentMs > 0 ? `+${currentMs.toFixed(2)}` : currentMs.toFixed(2)} ms
              </div>
            </div>

            {/* Bottom Live Video HUD Overlay */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10 font-mono pointer-events-none text-[10px]">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-gray-300 backdrop-blur-md">
                <Crosshair className="w-3 h-3 text-[#f61919]" />
                <span className="text-emerald-400 font-bold">Groove #3 Flush</span>
              </div>

              <div className="px-2 py-0.5 rounded bg-black/80 border border-white/10 text-gray-300 backdrop-blur-md">
                <span>Dwell: </span>
                <span className="text-[#a3e635] font-bold">0.45 ms</span>
              </div>
            </div>
          </div>

          {/* Interactive Player Controls & Timeline Scrubber */}
          <div className="p-3 bg-[#13171f] flex flex-col gap-2.5">
            {/* Timeline Progress Bar */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[9px] font-mono text-gray-400 px-0.5">
                <span>-2.50 ms (Approach)</span>
                <span className="text-[#f61919] font-bold">0.00 ms (Impact)</span>
                <span>+2.50 ms (Separation)</span>
              </div>

              <div className="relative flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.5"
                  value={timelinePos}
                  onChange={handleSeek}
                  className="w-full h-2 bg-[#1b222d] rounded-lg appearance-none cursor-pointer accent-[#f61919] z-10"
                />
                {/* Center impact marker notch */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500/80 -translate-x-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Control Bar */}
            <div className="flex items-center justify-between pt-1">
              {/* Playback Step Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg bg-[#181c24] hover:bg-[#202632] border border-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Rewind to start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleStep(-1)}
                  className="p-1.5 rounded-lg bg-[#181c24] hover:bg-[#202632] border border-white/5 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  title="Step 1 frame backward"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 rounded-lg bg-[#f61919] hover:bg-[#ff3b30] text-white flex items-center gap-1 font-mono text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-[0_0_12px_rgba(246,25,25,0.4)]"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-white" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>PLAY</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleStep(1)}
                  className="p-1.5 rounded-lg bg-[#181c24] hover:bg-[#202632] border border-white/5 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  title="Step 1 frame forward"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Slow-mo Speed Selector */}
              <div className="flex items-center gap-1 font-mono text-[10px]">
                {[0.1, 0.25, 0.5].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                      playbackSpeed === speed
                        ? 'bg-[#a3e635] text-black font-bold'
                        : 'bg-[#181c24] text-gray-400 hover:text-white'
                    }`}
                  >
                    {speed === 0.1 ? '480 FPS' : `${speed}x`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Optical Impact Kinematics Grid */}
        <div className="grid grid-cols-2 gap-2 font-mono">
          <div className="p-3 rounded-xl bg-[#13171f] border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 uppercase">Sustained Club Speed</span>
            <div className="text-base font-bold text-white flex items-center gap-1.5">
              <span>{clubSpeedMetric} MPH</span>
              <span className="text-[10px] text-emerald-400 font-normal">±0.1</span>
            </div>
            <span className="text-[9px] text-gray-500">Peak bottom quadrant velocity</span>
          </div>

          <div className="p-3 rounded-xl bg-[#13171f] border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 uppercase">Face Deflection</span>
            <div className="text-base font-bold text-emerald-400 flex items-center gap-1.5">
              <span>0.0°</span>
              <span className="text-[10px] text-gray-400 font-normal">Torquing</span>
            </div>
            <span className="text-[9px] text-gray-500">Zero twisting on impact</span>
          </div>

          <div className="p-3 rounded-xl bg-[#13171f] border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 uppercase">Impact Compression</span>
            <div className="text-base font-bold text-white flex items-center gap-1.5">
              <span>0.45 ms</span>
              <span className="text-[10px] text-[#a3e635] font-normal">Flush</span>
            </div>
            <span className="text-[9px] text-gray-500">Max energy transfer window</span>
          </div>

          <div className="p-3 rounded-xl bg-[#13171f] border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 uppercase">Contact Point</span>
            <div className="text-base font-bold text-amber-400 truncate">
              {impactPoint}
            </div>
            <span className="text-[9px] text-gray-500">Machine vision reticle match</span>
          </div>
        </div>

        {/* 4. Machine Vision Optical Diagnostics Card */}
        <div className="p-4 rounded-2xl bg-[#13171f] border border-white/10 flex flex-col gap-2.5 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f61919]" />
              <h3 className="font-display font-bold text-xs uppercase text-white">
                Machine Vision Diagnostics
              </h3>
            </div>
            <Badge variant="emerald" size="xs">
              98.4% EFFICIENCY
            </Badge>
          </div>

          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            Ultra high-speed optical capture confirms clean ball decompression without face deflection. Clubhead speed was sustained at {clubSpeedMetric} MPH through bottom quadrant.
          </p>

          <div className="p-2.5 rounded-xl bg-[#181c24] border border-white/5 font-mono text-[11px] text-gray-300 flex items-center justify-between">
            <span className="text-gray-400">CMOS Sensor Resolution:</span>
            <span className="text-white font-bold">480 FPS @ 0.05mm Spatial</span>
          </div>
        </div>

        {/* 5. Action Buttons */}
        <div className="flex flex-col gap-2 pt-1 pb-4">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full py-3 px-4 rounded-xl bg-[#181c24] hover:bg-[#202632] border border-white/10 hover:border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
          >
            {isExporting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>RENDERING HIGH-SPEED CLIP...</span>
              </>
            ) : exportComplete ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">CLIP DOWNLOADED (480 FPS MP4)</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#a3e635]" />
                <span>EXPORT HIGH-SPEED CLIP (MP4)</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#f61919] to-[#d61313] hover:from-[#ff3b30] hover:to-[#f61919] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(246,25,25,0.4)] active:scale-98 transition-all cursor-pointer"
          >
            CLOSE REPLAY & RETURN TO TELEMETRY
          </button>
        </div>
      </div>
    </div>
  );
}
