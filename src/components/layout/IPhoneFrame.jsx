import React from 'react';
import { Wifi, Battery } from 'lucide-react';

export default function IPhoneFrame({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#050608] flex items-center justify-center p-0 sm:py-6 overflow-hidden select-none">
      {/* Outer Titanium Chassis */}
      <div className="relative w-full max-w-[430px] h-screen sm:h-[900px] sm:max-h-[94vh] bg-[#1a1c22] sm:rounded-[54px] p-0 sm:p-[11px] shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_3px_rgba(255,255,255,0.25)] flex flex-col transition-all">
        
        {/* Hardware Buttons (Visible on desktop / tablet wrapper) */}
        {/* Action Button (Left) */}
        <div className="hidden sm:block absolute -left-[3px] top-[115px] w-[3px] h-8 bg-[#2d3039] rounded-l-[2px] shadow-[inset_1px_0_1px_rgba(255,255,255,0.2)]" />
        
        {/* Volume Up (Left) */}
        <div className="hidden sm:block absolute -left-[3px] top-[160px] w-[3px] h-13 bg-[#2d3039] rounded-l-[2px] shadow-[inset_1px_0_1px_rgba(255,255,255,0.2)]" />
        
        {/* Volume Down (Left) */}
        <div className="hidden sm:block absolute -left-[3px] top-[225px] w-[3px] h-13 bg-[#2d3039] rounded-l-[2px] shadow-[inset_1px_0_1px_rgba(255,255,255,0.2)]" />
        
        {/* Power / Siri Button (Right) */}
        <div className="hidden sm:block absolute -right-[3px] top-[175px] w-[3px] h-16 bg-[#2d3039] rounded-r-[2px] shadow-[inset_-1px_0_1px_rgba(255,255,255,0.2)]" />
        
        {/* Camera Control Sapphire Button (Right - iPhone 18 Pro Max signature) */}
        <div className="hidden sm:block absolute -right-[2px] top-[305px] w-[2px] h-14 bg-[#22242b] rounded-r-[1px] border-l border-white/20" />

        {/* OLED Screen Bezel & Container */}
        <div className="relative w-full h-full bg-[#0b0d10] text-white sm:rounded-[44px] overflow-hidden flex flex-col border border-white/10 sm:border-white/5">
          
          {/* iOS 18 Status Bar with Dynamic Island */}
          <div className="relative z-50 w-full pt-3 px-6 pb-2 flex items-center justify-between text-white text-[13px] font-semibold tracking-tight backdrop-blur-md bg-[#0b0d10]/95 select-none shrink-0 border-b border-white/5">
            {/* Left: Clock */}
            <div className="w-16 font-mono font-bold text-xs pl-1">
              9:41
            </div>

            {/* Center: Dynamic Island */}
            <div className="flex items-center justify-between px-3 w-28 h-7 bg-black rounded-full ring-1 ring-white/10 shadow-inner group cursor-pointer transition-all hover:w-32">
              {/* Front Camera Lens */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#0d111a] border border-[#1f2638] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#1b2540]" />
              </div>
              
              {/* FaceID / Mic Indicator */}
              <div className="w-2 h-2 rounded-full bg-black flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#10b981] animate-pulse" />
              </div>
            </div>

            {/* Right: Signal, Wi-Fi, Battery */}
            <div className="w-16 flex items-center justify-end gap-1.5 pr-1 text-gray-200">
              {/* 5G Label */}
              <span className="text-[10px] font-mono font-bold tracking-tight">5G</span>
              
              {/* Wi-Fi Icon */}
              <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />

              {/* Battery Icon */}
              <div className="flex items-center">
                <div className="w-5 h-2.5 rounded-[3px] border border-white/80 p-[1px] flex items-center">
                  <div className="w-full h-full bg-white rounded-[1.5px]" />
                </div>
                <div className="w-0.5 h-1 bg-white/80 rounded-r-[1px]" />
              </div>
            </div>
          </div>

          {/* Main App Content Viewport (Scrolls inside iPhone frame) */}
          <div className="relative flex-1 w-full overflow-y-auto overflow-x-hidden no-scrollbar pb-24">
            {children}
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="absolute bottom-1 left-0 right-0 z-50 flex justify-center pointer-events-none pb-1">
            <div className="w-32 h-1 bg-white/35 rounded-full backdrop-blur-sm" />
          </div>

        </div>
      </div>
    </div>
  );
}
