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
    <nav className="fixed sm:absolute bottom-3 sm:bottom-4 left-0 right-0 z-40 flex justify-center px-3 sm:px-3.5 pointer-events-none pb-[env(safe-area-inset-bottom,0px)]">
      <div className="w-full max-w-[424px] backdrop-blur-2xl bg-[#131722]/95 border border-white/15 rounded-2xl px-2 sm:px-3 py-1.5 sm:py-2 flex items-center justify-around pointer-events-auto shadow-[0_12px_40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer group flex-1 max-w-[84px] ${
                isActive 
                  ? 'text-[#ff3b30]' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {/* Active Top Glow Pill */}
              {isActive && (
                <span className="absolute -top-1.5 sm:-top-2 w-7 sm:w-8 h-1 rounded-full bg-[#f61919] shadow-[0_0_12px_#f61919]" />
              )}

              {/* Icon Container with Badge */}
              <div className="relative mb-0.5">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 stroke-[2.4]' : 'group-hover:scale-105 stroke-[1.8]'}`} />
                
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#f61919] text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-[0_0_8px_rgba(246,25,25,0.7)] ring-1 ring-[#0b0d10]">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className={`text-[10px] uppercase tracking-wider font-semibold ${isActive ? 'font-bold text-white' : 'text-gray-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
