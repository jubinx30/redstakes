import React, { useState } from 'react';
import { Wifi, ShieldCheck, BatteryCharging, ChevronRight, X, User, Crown, RefreshCw, ShoppingBag, LogIn } from 'lucide-react';
import Badge from '../shared/Badge';

export default function TopHeader({ 
  user, 
  onOpenProfile, 
  onOpenConnectionModal, 
  cartCount = 0, 
  onOpenCheckout,
  onOpenAuth
}) {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibratedTime, setCalibratedTime] = useState('0.4 ms');

  const handleRecalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      setCalibratedTime('0.2 ms');
    }, 1200);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0b0d10]/95 border-b border-white/10 px-3.5 py-2.5 transition-all">
        <div className="max-w-[440px] mx-auto flex items-center justify-between">
          {/* Brand Wordmark & Circle-R Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#f61919] to-[#990000] shadow-[0_0_12px_rgba(246,25,25,0.5)] border border-white/20">
              <span className="font-extrabold text-xs text-white tracking-tighter">R</span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10b981] ring-2 ring-[#0b0d10]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-black tracking-tight font-display text-white leading-tight flex items-center gap-1">
                RED STAKES <span className="text-[#f61919]">GOLF</span>
              </span>
              <span className="text-[7.5px] font-mono tracking-widest text-gray-400 font-semibold uppercase leading-none">
                AEROSPACE TELEMETRY
              </span>
            </div>
          </div>

          {/* Connection Status Pill, Bag & Golfer Avatar / Sign In */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Connection Indicator Pill */}
            <button
              onClick={() => {
                if (onOpenConnectionModal) onOpenConnectionModal();
                else setShowStatusModal(true);
              }}
              className="group flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#141822] border border-white/10 hover:border-[#10b981]/50 hover:bg-[#1a202c] transition-all cursor-pointer shadow-sm active:scale-95"
              title="Click to view sensor telemetry diagnostics"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-mono font-bold tracking-tight text-emerald-400 uppercase">
                CONNECTED
              </span>
            </button>

            {/* Quick Bag / Checkout Button in Header */}
            {cartCount > 0 && onOpenCheckout && (
              <button
                onClick={onOpenCheckout}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#f61919]/20 border border-[#f61919]/40 hover:bg-[#f61919]/30 text-white font-mono text-[10px] font-bold transition-all cursor-pointer shadow-sm active:scale-95"
                title="View Bag & Checkout"
              >
                <ShoppingBag className="w-3 h-3 text-[#ff3b30]" />
                <span className="text-[#ff3b30]">{cartCount}</span>
              </button>
            )}

            {/* Golfer Avatar or Sign In Button */}
            {user ? (
              <button
                onClick={onOpenProfile}
                className="relative group p-0.5 rounded-full border-2 border-amber-400/80 shadow-[0_0_10px_rgba(251,191,36,0.3)] hover:scale-105 transition-all cursor-pointer bg-[#141822]"
                title="Golfer Profile & Account Settings"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-[#181c26] flex items-center justify-center">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[11px] font-bold text-amber-300 font-mono">
                      {user?.name?.slice(0, 2).toUpperCase() || 'AR'}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5 shadow-sm border border-[#0b0d10]">
                  <Crown className="w-2.5 h-2.5 text-black stroke-[3]" />
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-2.5 py-1 rounded-full bg-[#f61919] hover:bg-[#ff3b30] text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-[0_0_10px_rgba(246,25,25,0.4)] active:scale-95 transition-all cursor-pointer"
              >
                <LogIn className="w-3 h-3" />
                <span>SIGN IN</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Sensor Diagnostics Modal (Global Shell) */}
      {showStatusModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-[390px] bg-[#13171f] border border-white/15 rounded-2xl p-5 shadow-2xl relative text-left">
            <button
              onClick={() => setShowStatusModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-display font-bold text-lg text-white">Machine Vision Status</h3>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#1b222d] rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Ceiling Dual-Vision:</span>
                  <span className="text-emerald-400 font-bold">3,200 FPS ACTIVE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sub-Millimeter Latency:</span>
                  <span className="text-white font-bold">{calibratedTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Calibration Grid:</span>
                  <Badge variant="emerald" size="xs">CALIBRATED</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Studio Bay Lock:</span>
                  <span className="text-white">Bay 04 (HDR Projector)</span>
                </div>
              </div>

              <div className="p-3 bg-[#181c24] rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-white">PGA Tour Accuracy Protocol</div>
                  <div className="text-[10px] text-gray-400">99.8% Spin & Vector Reliability</div>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>

              <button
                onClick={handleRecalibrate}
                disabled={isCalibrating}
                className="w-full py-2.5 rounded-xl bg-[#f61919] hover:bg-[#ff3b30] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(246,25,25,0.4)] disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isCalibrating ? 'animate-spin' : ''}`} />
                {isCalibrating ? 'Recalibrating High-Speed Shutter...' : 'Recalibrate Optics (3-Sec)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
