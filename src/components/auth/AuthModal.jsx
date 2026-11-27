import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Fingerprint, 
  Crown,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Badge from '../shared/Badge';

export const DUMMY_ACCOUNTS = [
  {
    id: 'alex-reed',
    name: 'Alex Reed',
    email: 'alex.reed@redstakesgolf.com',
    password: 'RedStakes2024!',
    handle: '@alexreed_golf',
    handicap: '+1.4',
    membership: 'RSG Founder #0412',
    avatar: '/images/lifestyle_1.png',
    homeStudio: 'Bay 04 • Detroit Metro Club',
    totalShots: '14,892',
    role: 'Founder',
    currentBag: [
      { id: "driver", name: "Driver", spec: "9.0° • Stealth 2 Plus • Ventus Black 6X", loft: 9.0, type: "wood" },
      { id: "3wood", name: "3-Wood", spec: "15.0° • Qi10 Tour • Ventus TR Blue 7X", loft: 15.0, type: "wood" },
      { id: "5iron", name: "5-Iron", spec: "26.0° • P770 • Dynamic Gold Tour Issue X100", loft: 26.0, type: "iron" },
      { id: "8iron", name: "8-Iron", spec: "37.0° • P770 • Dynamic Gold Tour Issue X100", loft: 37.0, type: "iron" },
      { id: "pw", name: "Pitching Wedge", spec: "46.0° • MG4 • Dynamic Gold Tour Issue S400", loft: 46.0, type: "wedge" }
    ]
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    email: 'marcus.vance@pgatour.com',
    password: 'RedStakes2024!',
    handle: '@marcus_vance',
    handicap: '+3.8',
    membership: 'RSG Tour Elite #0088',
    avatar: '/images/lifestyle_2.png',
    homeStudio: 'Bay 01 • Scottsdale National',
    totalShots: '28,410',
    role: 'Tour Pro',
    currentBag: [
      { id: "driver", name: "Driver", spec: "8.0° • Qi10 LS • Fujikura Ventus Black 7X", loft: 8.0, type: "wood" },
      { id: "3wood", name: "3-Wood", spec: "14.5° • Stealth 2 Plus • Diamana WB 83TX", loft: 14.5, type: "wood" },
      { id: "4iron", name: "4-Iron", spec: "22.0° • P7TW • Project X 6.5", loft: 22.0, type: "iron" }
    ]
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    email: 'elena.r@rsgclub.com',
    password: 'RedStakes2024!',
    handle: '@elena_golf',
    handicap: '4.6',
    membership: 'RSG Club Champion #1204',
    avatar: '/images/lifestyle_wide.png',
    homeStudio: 'Bay 03 • Chicago Sim Club',
    totalShots: '9,240',
    role: 'Club Member',
    currentBag: [
      { id: "driver", name: "Driver", spec: "10.5° • Paradym Ai Smoke • Tensei 1K Blue", loft: 10.5, type: "wood" },
      { id: "7iron", name: "7-Iron", spec: "32.0° • Apex Pro • KBS Tour 90", loft: 32.0, type: "iron" }
    ]
  }
];

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [selectedPresetId, setSelectedPresetId] = useState('alex-reed');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  // Form states prefilled with dummy data
  const [email, setEmail] = useState('alex.reed@redstakesgolf.com');
  const [password, setPassword] = useState('RedStakes2024!');
  const [fullName, setFullName] = useState('Jordan Miller');
  const [handicap, setHandicap] = useState('+0.8');
  const [homeStudio, setHomeStudio] = useState('Bay 07 • Chicago Club');
  const [rememberBay, setRememberBay] = useState(true);

  if (!isOpen) return null;

  // Handle preset selection
  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setEmail(preset.email);
    setPassword(preset.password);
    setFullName(preset.name);
    setHandicap(preset.handicap);
    setHomeStudio(preset.homeStudio);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setAuthSuccess(true);

      setTimeout(() => {
        // Return authenticated user object
        if (authMode === 'login') {
          const matched = DUMMY_ACCOUNTS.find(a => a.email.toLowerCase() === email.toLowerCase()) || DUMMY_ACCOUNTS[0];
          onLoginSuccess(matched);
        } else {
          // New registered user
          const newUser = {
            id: 'user-' + Date.now(),
            name: fullName || 'New Golfer',
            email: email,
            handle: '@' + (fullName || 'golfer').toLowerCase().replace(/\s+/g, '_'),
            handicap: handicap || '0.0',
            membership: 'RSG Founder #0992',
            avatar: '/images/lifestyle_1.png',
            homeStudio: homeStudio || 'Bay 04 • Detroit Metro Club',
            totalShots: '0',
            lifetimeSoftware: true,
            currentBag: DUMMY_ACCOUNTS[0].currentBag
          };
          onLoginSuccess(newUser);
        }
        onClose();
        setAuthSuccess(false);
      }, 700);
    }, 900);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in text-left">
      <div className="w-full max-w-[395px] max-h-[92%] bg-[#13171f] border border-white/15 rounded-3xl p-5 shadow-2xl relative flex flex-col overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header / Brand */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#f61919] to-[#990000] shadow-[0_0_12px_rgba(246,25,25,0.5)] border border-white/20 shrink-0">
            <span className="font-extrabold text-sm text-white font-display">R</span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-display font-extrabold text-base text-white flex items-center gap-1 leading-tight">
              RED STAKES <span className="text-[#f61919]">GOLF</span>
            </h3>
            <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase">
              AEROSPACE CLOUD TELEMETRY
            </span>
          </div>
        </div>

        {/* Tab Toggle: Sign In vs Create Account */}
        <div className="grid grid-cols-2 p-1 bg-[#181c24] rounded-xl border border-white/5 my-3 shrink-0">
          <button
            onClick={() => setAuthMode('login')}
            className={`py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-[#f61919] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'bg-[#f61919] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Quick-Pick Dummy Accounts Banner */}
        <div className="mb-3 p-2.5 rounded-xl bg-[#181c24] border border-white/8 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono uppercase text-gray-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              1-TAP PREFILLED DUMMY ACCOUNTS
            </span>
            <Badge variant="lime" size="xs">READY</Badge>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {DUMMY_ACCOUNTS.map((acc) => {
              const isSelected = selectedPresetId === acc.id;
              return (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleSelectPreset(acc)}
                  className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#f61919]/15 border-[#f61919]/50 ring-1 ring-[#f61919]/50'
                      : 'bg-[#13171f] border-white/5 hover:border-white/20'
                  }`}
                >
                  <span className="text-[10px] font-bold text-white truncate block">{acc.name.split(' ')[0]}</span>
                  <span className="text-[8px] font-mono text-emerald-400 truncate block">HCP {acc.handicap}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto pr-0.5 space-y-2.5 font-sans flex-1 no-scrollbar">
          
          {authMode === 'signup' && (
            <>
              {/* Full Name */}
              <div>
                <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Golfer Full Name</label>
                <div className="relative flex items-center">
                  <User className="w-3.5 h-3.5 text-gray-400 absolute left-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Reed"
                    className="w-full pl-9 pr-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-xs text-white font-mono outline-none focus:border-[#f61919]"
                  />
                </div>
              </div>

              {/* Handicap & Bay row */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Handicap Index</label>
                  <input
                    type="text"
                    value={handicap}
                    onChange={(e) => setHandicap(e.target.value)}
                    placeholder="+1.4"
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-xs text-emerald-400 font-mono font-bold outline-none focus:border-[#f61919]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Home Studio Bay</label>
                  <input
                    type="text"
                    value={homeStudio}
                    onChange={(e) => setHomeStudio(e.target.value)}
                    placeholder="Bay 04"
                    className="w-full px-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-xs text-white font-mono outline-none focus:border-[#f61919]"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email Address */}
          <div>
            <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Email / Member ID</label>
            <div className="relative flex items-center">
              <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.reed@redstakesgolf.com"
                className="w-full pl-9 pr-3 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-xs text-white font-mono outline-none focus:border-[#f61919]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-mono text-gray-400 uppercase">Password</label>
              {authMode === 'login' && (
                <span className="text-[9px] font-mono text-gray-400 hover:text-white cursor-pointer">
                  Forgot?
                </span>
              )}
            </div>
            <div className="relative flex items-center">
              <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-9 py-2 bg-[#0b0d10] border border-white/10 rounded-xl text-xs text-white font-mono outline-none focus:border-[#f61919]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-white cursor-pointer p-0.5"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Remember Bay Checkbox */}
          <div className="flex items-center gap-2 pt-0.5">
            <input
              type="checkbox"
              id="rememberBay"
              checked={rememberBay}
              onChange={(e) => setRememberBay(e.target.checked)}
              className="w-3.5 h-3.5 rounded bg-[#0b0d10] border-white/20 text-[#f61919] focus:ring-0 cursor-pointer"
            />
            <label htmlFor="rememberBay" className="text-[11px] text-gray-300 font-sans cursor-pointer">
              Remember credentials for this Simulator Bay
            </label>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isLoading || authSuccess}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#f61919] to-[#d61313] hover:from-[#ff3b30] hover:to-[#f61919] text-white font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(246,25,25,0.4)] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Authenticating Optical Bay...</span>
              </span>
            ) : authSuccess ? (
              <span className="flex items-center gap-1.5 text-white">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Session Verified • Bay Ready</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>{authMode === 'login' ? 'SIGN IN TO RSG PRO BAY' : 'ACTIVATE LIFETIME ACCOUNT'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            )}
          </button>

          {/* Biometric Face ID Simulation */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-2 px-3 rounded-xl bg-[#181c24] hover:bg-[#202735] border border-white/10 text-gray-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Fingerprint className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fast Sign In with Apple / Face ID</span>
          </button>
        </form>

      </div>
    </div>
  );
}
