import React from 'react';
import { Crosshair, Activity, Trophy, ShoppingBag } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab, cartCount = 1 }) {
  const tabs = [
    {
      id: 'play',
      label: 'Play',
      icon: Crosshair,
      description: 'Simulator Bay'
    },
    {
      id: 'telemetry',
      label: 'Telemetry',
      icon: Activity,
      description: 'Ball Radar'
    },
    {
      id: 'arena',
      label: 'Arena',
      icon: Trophy,
      description: 'Tournaments'
    },
    {
      id: 'shop',
      label: 'Shop',
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : null,
      description: 'Hardware'
    }
  ];

  return (
    <nav className="fixed sm:absolute bottom-3.5 sm:bottom-4 left-0 right-0 z-40 flex justify-center px-3 sm:px-3.5 pointer-events-none pb-[env(safe-area-inset-bottom,0px)]">
      {/* Ambient Liquid Aura Underneath Dock */}
      <div className="absolute inset-x-8 -inset-y-1 bg-gradient-to-r from-transparent via-[#f61919]/20 to-transparent blur-2xl rounded-full pointer-events-none" />

      {/* Main Liquid Glass Vessel */}
      <div className="relative w-full max-w-[428px] backdrop-blur-[42px] backdrop-saturate-[220%] bg-gradient-to-b from-white/[0.14] via-[#0e131d]/85 to-[#080b11]/92 border border-white/20 rounded-[28px] p-1.5 flex items-center justify-around pointer-events-auto shadow-[0_24px_64px_rgba(0,0,0,0.85),inset_0_1.5px_1px_rgba(255,255,255,0.45),inset_0_-1px_1px_rgba(0,0,0,0.6),0_0_30px_rgba(246,25,25,0.14)] overflow-hidden group">
        
        {/* Specular Rim Highlight Along Top Beveled Edge */}
        <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

        {/* Refractive Liquid Light Sweep */}
        <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none animate-liquid-sweep" />

        {/* Subsurface Caustic Reflection Line */}
        <div className="absolute inset-x-12 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#f61919]/40 to-transparent pointer-events-none" />

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-[20px] transition-all duration-300 cursor-pointer group flex-1 max-w-[88px] ${
                isActive 
                  ? 'bg-gradient-to-b from-[#f61919]/25 via-[#ff3b30]/15 to-transparent border border-[#ff3b30]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_20px_rgba(246,25,25,0.35)]' 
                  : 'hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              {/* Active Liquid Ruby Droplet Bead */}
              {isActive && (
                <span className="absolute -top-1 w-6 h-1 rounded-full bg-gradient-to-r from-[#ff3b30] via-white to-[#ff3b30] shadow-[0_0_12px_#ff3b30] animate-pulse" />
              )}

              {/* Laser-Etched Holographic Icon */}
              <div className="relative mb-0.5">
                <Icon 
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive 
                      ? 'scale-110 stroke-[2.4] text-white drop-shadow-[0_0_10px_rgba(255,59,48,0.9)]' 
                      : 'stroke-[1.8] text-gray-400 group-hover:text-white group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] group-hover:scale-105'
                  }`} 
                />
                
                {/* Dynamic Island Badge */}
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-gradient-to-br from-[#ff3b30] to-[#c91818] text-white text-[9px] font-mono font-black flex items-center justify-center shadow-[0_0_10px_rgba(246,25,25,0.9),inset_0_1px_1px_rgba(255,255,255,0.5)] ring-1 ring-[#080b11]">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Luminous Micro-Typography */}
              <span 
                className={`text-[9.5px] font-mono tracking-wider transition-all duration-300 ${
                  isActive 
                    ? 'font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' 
                    : 'font-medium text-gray-400 group-hover:text-gray-200'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
