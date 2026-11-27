import React from 'react';
import { Wifi, Battery } from 'lucide-react';

export default function IPhoneFrame({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#000] flex items-center justify-center p-0 sm:py-5 overflow-hidden select-none">
      {/* Outer White Titanium Chassis - iPhone 16 Pro Max (440 x 956 viewport) */}
      <div className="relative w-full sm:w-[458px] h-screen sm:h-[974px] sm:max-h-[96vh] bg-[#f8f9fa] sm:rounded-[56px] p-0 sm:p-[9px] shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_2px_rgba(255,255,255,1)] border border-[#e1e4ea] flex flex-col transition-all">
        
        {/* Hardware Buttons (White Titanium / Silver) */}
        {/* Action Button (Left) */}
        <div className="hidden sm:block absolute -left-[3.5px] top-[120px] w-[3.5px] h-9 bg-[#d8dade] rounded-l-[2px] border-r border-[#c2c5cc] shadow-[inset_1px_0_1px_rgba(255,255,255,0.9)]" />
        
        {/* Volume Up (Left) */}
        <div className="hidden sm:block absolute -left-[3.5px] top-[170px] w-[3.5px] h-14 bg-[#d8dade] rounded-l-[2px] border-r border-[#c2c5cc] shadow-[inset_1px_0_1px_rgba(255,255,255,0.9)]" />
        
        {/* Volume Down (Left) */}
        <div className="hidden sm:block absolute -left-[3.5px] top-[238px] w-[3.5px] h-14 bg-[#d8dade] rounded-l-[2px] border-r border-[#c2c5cc] shadow-[inset_1px_0_1px_rgba(255,255,255,0.9)]" />
        
        {/* Power / Siri Button (Right) */}
        <div className="hidden sm:block absolute -right-[3.5px] top-[185px] w-[3.5px] h-18 bg-[#d8dade] rounded-r-[2px] border-l border-[#c2c5cc] shadow-[inset_-1px_0_1px_rgba(255,255,255,0.9)]" />
        
        {/* Camera Control Sapphire Button (Right - iPhone 16 Pro Max signature) */}
        <div className="hidden sm:block absolute -right-[2.5px] top-[330px] w-[2.5px] h-16 bg-[#e4e6eb] rounded-r-[1px] border border-[#c8ccd6] shadow-sm" />

        {/* OLED Screen Bezel & Container - Ultra-thin 1.15mm Micro-Bezel */}
        <div className="relative w-full h-full bg-[#0b0d10] text-white sm:rounded-[47px] overflow-hidden flex flex-col ring-1 ring-black/90">
          
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

          {/* Main App Container */}
          <div className="relative flex-1 w-full min-h-0 flex flex-col overflow-hidden">
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
