import React from 'react';

export default function IPhoneFrame({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#050608] flex items-center justify-center p-0 sm:py-6 overflow-x-hidden overflow-y-auto select-none relative">
      {/* Subtle Studio Ambient Background Lights */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-red-600/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/[0.025] rounded-full blur-[120px]" />
        {/* Subtle grid pattern for aerospace studio feel */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Main Wrapper Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Outer Chassis in #1e2029 */}
        <div className="relative w-full sm:w-[458px] h-screen sm:h-[974px] sm:max-h-[96vh] bg-[#1e2029] border border-[#2d3240] shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_2px_rgba(255,255,255,0.18)] sm:rounded-[56px] p-0 sm:p-[9px] flex flex-col transition-all">
          
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
          <div className="relative w-full h-full bg-[#0b0d10] text-white sm:rounded-[47px] overflow-hidden flex flex-col ring-1 ring-black/90 shadow-2xl">
            {/* Main App Content Viewport */}
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
    </div>
  );
}
