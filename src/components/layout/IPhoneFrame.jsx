import React from 'react';

export default function IPhoneFrame({ children }) {
  return (
    <div className="w-full h-full h-[100dvh] sm:min-h-screen sm:h-auto bg-[#0b0d10] sm:bg-[#06080a] flex items-center justify-center p-0 sm:py-6 overflow-hidden sm:overflow-y-auto select-none relative">
      {/* Main Wrapper Container */}
      <div className="relative z-10 w-full h-full sm:w-auto sm:h-auto flex flex-col items-center">
        {/* Outer Chassis */}
        <div className="relative w-full h-full sm:w-[458px] sm:h-[974px] sm:max-h-[96vh] bg-[#0b0d10] sm:bg-[#1e2029] border-0 sm:border sm:border-[#2d3240] rounded-none sm:rounded-[56px] p-0 sm:p-[9px] flex flex-col transition-all overflow-hidden sm:shadow-2xl">
          
          {/* Hardware Buttons */}
          {/* Action Button (Left Top) */}
          <div 
            className="hidden sm:block absolute -left-[3.5px] top-[120px] w-[3.5px] h-9 bg-[#282c38] rounded-l-[2px] border-r border-[#3a3f50] shadow-[inset_1px_0_1px_rgba(255,255,255,0.25)]" 
            title="Action Button"
          />
          
          {/* Volume Up (Left) */}
          <div 
            className="hidden sm:block absolute -left-[3.5px] top-[170px] w-[3.5px] h-14 bg-[#282c38] rounded-l-[2px] border-r border-[#3a3f50] shadow-[inset_1px_0_1px_rgba(255,255,255,0.25)]" 
            title="Volume Up"
          />
          
          {/* Volume Down (Left) */}
          <div 
            className="hidden sm:block absolute -left-[3.5px] top-[238px] w-[3.5px] h-14 bg-[#282c38] rounded-l-[2px] border-r border-[#3a3f50] shadow-[inset_1px_0_1px_rgba(255,255,255,0.25)]" 
            title="Volume Down"
          />
          
          {/* Power / Siri Button (Right) */}
          <div 
            className="hidden sm:block absolute -right-[3.5px] top-[185px] w-[3.5px] h-18 bg-[#282c38] rounded-r-[2px] border-l border-[#3a3f50] shadow-[inset_-1px_0_1px_rgba(255,255,255,0.25)]" 
            title="Power Button"
          />
          
          {/* Camera Control Sapphire Button (Right Lower) */}
          <div 
            className="hidden sm:block absolute -right-[2.5px] top-[330px] w-[2.5px] h-16 bg-[#232733] rounded-r-[1px] border border-[#373c4d] shadow-sm" 
            title="Camera Control Sapphire Button"
          />

          {/* OLED Screen Bezel & Container - Ultra-thin 1.15mm Micro-Bezel */}
          <div className="relative w-full h-full bg-[#0b0d10] text-white rounded-none sm:rounded-[47px] overflow-hidden flex flex-col sm:ring-1 sm:ring-black/90">
            {/* Main App Content Viewport */}
            <div className="relative flex-1 w-full min-h-0 h-full flex flex-col overflow-hidden">
              {children}
            </div>

            {/* iOS Home Indicator Bar - Only on desktop simulation frame */}
            <div className="hidden sm:flex absolute bottom-1 left-0 right-0 z-50 justify-center pointer-events-none pb-1">
              <div className="w-32 h-1 bg-white/35 rounded-full backdrop-blur-sm" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
