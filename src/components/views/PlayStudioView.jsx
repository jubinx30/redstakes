import React, { useState } from 'react';
import { 
  Play, 
  Target, 
  MapPin, 
  Sun, 
  Compass, 
  ChevronRight, 
  Sparkles, 
  Flame, 
  Layers, 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2, 
  X,
  Volume2,
  Sliders,
  ExternalLink
} from 'lucide-react';
import Badge from '../shared/Badge';
import { COURSES_CATALOG, MOCK_USER } from '../../data/mockData';

export default function PlayStudioView({ onNavigateToTelemetry, onNavigateToArena }) {
  // Interactive States
  const [lightingPreset, setLightingPreset] = useState('DUSK 60%');
  const [selectedCourseModal, setSelectedCourseModal] = useState(false);
  const [skillsModal, setSkillsModal] = useState(false);
  const [bagMappingModal, setBagMappingModal] = useState(false);
  const [aiCoachModal, setAiCoachModal] = useState(false);
  const [isSimulatingSession, setIsSimulatingSession] = useState(false);
  const [sessionShotCount, setSessionShotCount] = useState(24);
  const [lastShotFeedback, setLastShotFeedback] = useState(null);

  const lightingOptions = ['DUSK 60%', 'DAYLIGHT 100%', 'NIGHT STADIUM', 'SUNSET 45%'];

  const toggleLighting = () => {
    const nextIdx = (lightingOptions.indexOf(lightingPreset) + 1) % lightingOptions.length;
    setLightingPreset(lightingOptions[nextIdx]);
  };

  const handleStartSession = () => {
    setIsSimulatingSession(true);
    setLastShotFeedback(null);
  };

  const handleTriggerSimulatedShot = () => {
    const newCount = sessionShotCount + 1;
    setSessionShotCount(newCount);
    setLastShotFeedback({
      carry: '281 YD',
      ballSpeed: '168.2 MPH',
      launch: '12.4°',
      tag: 'PURE FLUSH'
    });
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-3 pb-8 text-left animate-fade-in">
      {/* 1. Top Sensor Status Banner */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#141822] border border-white/10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-mono font-bold text-gray-200 uppercase tracking-tight">
              RSG PRO STUDIO ONLINE
            </span>
            <span className="text-[9px] font-mono text-gray-400">
              Dual Machine Vision (3,200 FPS)
            </span>
          </div>
        </div>
        <Badge variant="emerald" size="xs" dot>
          CALIBRATED
        </Badge>
      </div>

      {/* 2. Hero Session Card */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#13171f] shadow-2xl group">
        {/* Course Background Graphic */}
        <div className="relative h-48 w-full overflow-hidden bg-[#0d1117]">
          <img 
            src="/images/simulator_bay.png" 
            alt="RSG Studio Simulator Bay" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13171f] via-[#13171f]/60 to-transparent" />
          
          {/* Top Overlays */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <Badge variant="glass" size="xs">
              BAY 04 • ULTRA-HDR
            </Badge>
            <Badge variant="limeSolid" size="xs" className="font-mono">
              PIN: 241 YD
            </Badge>
          </div>
        </div>

        {/* Content & Action Buttons */}
        <div className="relative p-4 -mt-12 flex flex-col gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff3b30] font-bold">
              ACTIVE SIMULATOR BAY
            </span>
            <h2 className="text-2xl font-black font-display tracking-tight text-white">
              Quick Session Launch
            </h2>
            <p className="text-xs text-gray-400 font-sans mt-0.5">
              High-speed optical shutter active. Ready for driver through wedge telemetry.
            </p>
          </div>

          {/* Main Red Launch Button */}
          <button
            onClick={handleStartSession}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#f61919] to-[#d61313] hover:from-[#ff3b30] hover:to-[#f61919] text-white font-display font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(246,25,25,0.45)] hover:shadow-[0_0_32px_rgba(246,25,25,0.65)] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            START RANGE SESSION
          </button>

          {/* Secondary Outline Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedCourseModal(true)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1b222d]/90 hover:bg-[#242c3a] border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              100+ COURSES
            </button>
            <button
              onClick={() => setSkillsModal(true)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1b222d]/90 hover:bg-[#242c3a] border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 text-[#a3e635]" />
              SKILLS CHALLENGE
            </button>
          </div>
        </div>
      </div>

      {/* 3. Recent Performance Card */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#10b981]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200 font-display">
              Recent Performance
            </h3>
          </div>
          <span className="text-[10px] font-mono text-gray-400 uppercase">
            Today • 08:42 AM
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#13171f] border border-white/10 shadow-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white font-display">
                Spyglass Dunes Championship
              </span>
              <span className="text-[11px] text-gray-400 font-sans">
                Full 18 Holes • RSG Tour Pins
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1b222d] px-2.5 py-1 rounded-lg border border-white/5">
              <span className="font-mono text-base font-bold text-[#10b981]">-2</span>
              <span className="text-xs font-mono text-gray-400">(70)</span>
            </div>
          </div>

          {/* Metric Trio */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-[#181c24] border border-white/5 flex flex-col">
              <span className="text-[9px] font-mono text-gray-400 uppercase font-semibold">
                Avg Carry
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-lg font-mono font-bold text-white">278</span>
                <span className="text-[10px] font-mono text-gray-400">YD</span>
              </div>
              <span className="text-[9px] font-mono text-[#10b981] mt-0.5 font-bold">
                Driver Opt.
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#181c24] border border-white/5 flex flex-col">
              <span className="text-[9px] font-mono text-gray-400 uppercase font-semibold">
                Smash Factor
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-lg font-mono font-bold text-white">1.49</span>
              </div>
              <span className="text-[9px] font-mono text-[#10b981] mt-0.5 font-bold">
                Tour Elite
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#181c24] border border-white/5 flex flex-col">
              <span className="text-[9px] font-mono text-gray-400 uppercase font-semibold">
                Launch Angle
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-lg font-mono font-bold text-white">11.2</span>
                <span className="text-[10px] font-mono text-gray-400">°</span>
              </div>
              <span className="text-[9px] font-mono text-[#a3e635] mt-0.5 font-bold">
                Window Locked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Simulator Game Modes List */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-200 font-display">
            Simulator Game Modes
          </h3>
          <span className="text-[10px] font-mono font-bold text-[#10b981]">
            4 MODES READY
          </span>
        </div>

        <div className="space-y-2">
          {/* Mode 1: Driving Range & Bag Mapping */}
          <div 
            onClick={() => setBagMappingModal(true)}
            className="p-3.5 rounded-xl bg-[#13171f] hover:bg-[#181c26] border border-white/8 flex items-center justify-between transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1b222d] border border-white/10 flex items-center justify-center text-white group-hover:border-[#f61919]/50 transition-colors">
                <Layers className="w-5 h-5 text-gray-300 group-hover:text-[#ff3b30]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-display">
                    Driving Range & Bag Mapping
                  </span>
                  <Badge variant="cyan" size="xs">14 CLUBS</Badge>
                </div>
                <span className="text-[11px] text-gray-400 font-sans">
                  Carry, apex, & dynamic loft gap analysis
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>

          {/* Mode 2: Virtual Tour Courses */}
          <div 
            onClick={() => setSelectedCourseModal(true)}
            className="p-3.5 rounded-xl bg-[#13171f] hover:bg-[#181c26] border border-white/8 flex items-center justify-between transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1b222d] border border-white/10 flex items-center justify-center text-white group-hover:border-[#10b981]/50 transition-colors">
                <Compass className="w-5 h-5 text-[#10b981]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-display">
                    Virtual Tour Courses
                  </span>
                  <Badge variant="emerald" size="xs">4K LIDAR</Badge>
                </div>
                <span className="text-[11px] text-gray-400 font-sans">
                  104 tracks: Pebble Bay, St. Andrews, Pinehurst No. 2
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>

          {/* Mode 3: Wager Matches & Online Skins */}
          <div 
            onClick={onNavigateToArena}
            className="p-3.5 rounded-xl bg-[#13171f] hover:bg-[#181c26] border border-white/8 flex items-center justify-between transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1b222d] border border-white/10 flex items-center justify-center text-white group-hover:border-[#f61919]/50 transition-colors">
                <Flame className="w-5 h-5 text-[#ff3b30]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-display">
                    Wager Matches & Online Skins
                  </span>
                  <Badge variant="red" size="xs" dot dotPulse>24 LIVE</Badge>
                </div>
                <span className="text-[11px] text-gray-400 font-sans">
                  Live bay matchmaking with instant escrow
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>

          {/* Mode 4: Nick Bradley AI Swing Coach */}
          <div 
            onClick={() => setAiCoachModal(true)}
            className="p-3.5 rounded-xl bg-[#13171f] hover:bg-[#181c26] border border-white/8 flex items-center justify-between transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1b222d] border border-white/10 flex items-center justify-center text-white group-hover:border-amber-400/50 transition-colors">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-display">
                    Nick Bradley AI Swing Coach
                  </span>
                  <Badge variant="lime" size="xs">94% MATCH</Badge>
                </div>
                <span className="text-[11px] text-gray-400 font-sans">
                  Biomechanical kinematic sequence analysis
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        {/* 5. Studio Lighting Preset Toggle */}
        <div className="mt-1 p-3 rounded-xl bg-[#181c24] border border-white/8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Studio Ambient Preset</span>
              <span className="text-[10px] text-gray-400">Controls projector lumination & bay optics</span>
            </div>
          </div>
          <button
            onClick={toggleLighting}
            className="px-3 py-1.5 rounded-lg bg-[#13171f] hover:bg-[#202735] border border-white/10 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            {lightingPreset}
          </button>
        </div>
      </div>

      {/* --- MODALS & INTERACTIVE OVERLAYS --- */}

      {/* Active Range Session Simulation Modal */}
      {isSimulatingSession && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-[400px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
            <button
              onClick={() => setIsSimulatingSession(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-[#f61919] animate-ping" />
              <h3 className="font-display font-black text-xl text-white">BAY 04 • ACTIVE SESSION</h3>
            </div>

            <div className="p-3 bg-[#181c24] rounded-xl border border-white/10 mb-4">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-gray-400">SESSION SHOTS:</span>
                <span className="text-white font-bold">{sessionShotCount} Hits</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-gray-400">CURRENT CLUB:</span>
                <span className="text-emerald-400 font-bold">Driver (9.0°)</span>
              </div>
            </div>

            {lastShotFeedback ? (
              <div className="p-4 bg-gradient-to-br from-[#1b222d] to-[#121620] rounded-xl border border-emerald-500/30 mb-4 animate-fade-in">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="emerald" size="xs">BALL FLIGHT DETECTED</Badge>
                  <span className="text-xs font-mono font-bold text-emerald-400">{lastShotFeedback.tag}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mt-3">
                  <div>
                    <div className="text-[10px] text-gray-400 font-mono">CARRY</div>
                    <div className="text-xl font-mono font-bold text-white">{lastShotFeedback.carry}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-mono">BALL SPEED</div>
                    <div className="text-xl font-mono font-bold text-white">{lastShotFeedback.ballSpeed}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-mono">LAUNCH</div>
                    <div className="text-xl font-mono font-bold text-white">{lastShotFeedback.launch}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center border-2 border-dashed border-white/10 rounded-xl mb-4 bg-[#181c24]/50">
                <div className="text-xs font-mono text-gray-300">
                  Ready on stance mat. Take your swing into the RSG projection screen.
                </div>
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={handleTriggerSimulatedShot}
                className="w-full py-3 rounded-xl bg-[#f61919] hover:bg-[#ff3b30] text-white font-display font-extrabold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(246,25,25,0.4)] cursor-pointer"
              >
                Simulate Shot Trigger
              </button>
              <button
                onClick={() => {
                  setIsSimulatingSession(false);
                  onNavigateToTelemetry();
                }}
                className="w-full py-2.5 rounded-xl bg-[#1b222d] hover:bg-[#242c3a] text-white font-bold text-xs uppercase tracking-wider border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Inspect Telemetry Radar →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 100+ Courses Catalog Modal */}
      {selectedCourseModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[400px] max-h-[85vh] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-display font-bold text-lg text-white">LiDAR Course Catalog</h3>
                <span className="text-[10px] font-mono text-emerald-400">104 TOURNAMENT TRACKS LOADED</span>
              </div>
              <button
                onClick={() => setSelectedCourseModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-2.5 my-3 pr-1">
              {COURSES_CATALOG.map((course) => (
                <div 
                  key={course.id}
                  className="p-3 rounded-xl bg-[#181c24] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white font-display">{course.name}</span>
                    <span className="text-[10px] text-gray-400">{course.location} • Par {course.par}</span>
                    <div className="flex gap-1.5 mt-1">
                      <Badge variant="cyan" size="xs">{course.badge}</Badge>
                      <Badge variant="dark" size="xs">{course.yardage}</Badge>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedCourseModal(false);
                      handleStartSession();
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-[#f61919] hover:bg-[#ff3b30] text-white text-[10px] font-bold uppercase"
                  >
                    Load Bay
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedCourseModal(false)}
              className="w-full py-2 bg-[#1b222d] text-gray-300 text-xs font-bold rounded-xl uppercase"
            >
              Close Catalog
            </button>
          </div>
        </div>
      )}

      {/* Bag Mapping Modal */}
      {bagMappingModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[400px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
            <button
              onClick={() => setBagMappingModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-bold text-lg text-white mb-1">Bag Mapping Matrix</h3>
            <p className="text-xs text-gray-400 mb-3 font-sans">Active carry distances calibrated across 14 clubs.</p>
            
            <div className="space-y-2 mb-4 font-mono text-xs max-h-56 overflow-y-auto pr-1">
              {MOCK_USER.currentBag.map((club) => (
                <div key={club.id} className="p-2.5 rounded-lg bg-[#181c24] flex items-center justify-between border border-white/5">
                  <div>
                    <span className="font-bold text-white">{club.name}</span>
                    <div className="text-[10px] text-gray-400">{club.spec}</div>
                  </div>
                  <Badge variant="emerald" size="xs">MAPPED</Badge>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setBagMappingModal(false);
                onNavigateToTelemetry();
              }}
              className="w-full py-2.5 bg-[#f61919] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_12px_rgba(246,25,25,0.4)]"
            >
              View Detailed Telemetry
            </button>
          </div>
        </div>
      )}

      {/* Skills Challenge Modal */}
      {skillsModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[400px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
            <button
              onClick={() => setSkillsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-bold text-lg text-white mb-1">RSG Skills Challenge</h3>
            <p className="text-xs text-gray-400 mb-3">Test precision against tour-standard target rings.</p>
            
            <div className="space-y-2 mb-4">
              <div className="p-3 bg-[#181c24] rounded-xl border border-white/5 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-white">Wedge Matrix (50 - 120 YD)</div>
                  <div className="text-[10px] text-gray-400">10 Shots with dynamic target pins</div>
                </div>
                <Badge variant="lime" size="xs">ACTIVE</Badge>
              </div>
              <div className="p-3 bg-[#181c24] rounded-xl border border-white/5 flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-white">Driver Dispersion Corridor</div>
                  <div className="text-[10px] text-gray-400">30-yard fairway window penalty test</div>
                </div>
                <Badge variant="cyan" size="xs">PRO TIER</Badge>
              </div>
            </div>

            <button
              onClick={() => {
                setSkillsModal(false);
                handleStartSession();
              }}
              className="w-full py-2.5 bg-[#f61919] text-white font-bold text-xs uppercase rounded-xl"
            >
              Launch Drill in Bay 04
            </button>
          </div>
        </div>
      )}

      {/* Nick Bradley AI Coach Modal */}
      {aiCoachModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[400px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
            <button
              onClick={() => setAiCoachModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-amber-400/20 border-2 border-amber-400/80">
                <img src="/images/lifestyle_2.png" alt="Nick Bradley" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Nick Bradley AI Coach</h3>
                <Badge variant="lime" size="xs">BIOMECHANICS 94%</Badge>
              </div>
            </div>

            <div className="p-3 bg-[#181c24] rounded-xl border border-white/5 space-y-2 mb-4 text-xs font-sans text-gray-300">
              <p>
                <strong>Kinematic Sequence:</strong> Your pelvis rotation initiates 0.04s prior to chest deceleration. Peak clubhead delivery is operating at PGA Tour standard.
              </p>
              <div className="p-2 rounded bg-[#1b222d] border border-white/5 font-mono text-[11px] text-[#a3e635]">
                Drill: Gate Tee Face Centering (2 min 14 sec)
              </div>
            </div>

            <button
              onClick={() => setAiCoachModal(false)}
              className="w-full py-2.5 bg-[#1b222d] text-white font-bold text-xs uppercase rounded-xl"
            >
              Back to Bay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
