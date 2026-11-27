import React, { useState } from 'react';
import { Smartphone, Maximize2 } from 'lucide-react';

const CHASSIS_FINISHES = {
  black: {
    id: 'black',
    name: 'Black Titanium',
    chassisClass: 'bg-[#1a1c23] border-[#2c303c] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_2px_rgba(255,255,255,0.2)]',
    buttonClass: 'bg-[#252833] border-[#363b49] shadow-[inset_1px_0_1px_rgba(255,255,255,0.3)]',
    cameraControlClass: 'bg-[#1d2029] border-[#303542]',
    colorDot: 'bg-[#1e2029]'
  },
  natural: {
    id: 'natural',
    name: 'Natural Titanium',
    chassisClass: 'bg-[#616266] border-[#81838b] shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.25),inset_0_1px_2px_rgba(255,255,255,0.45)]',
    buttonClass: 'bg-[#505155] border-[#72747c] shadow-[inset_1px_0_1px_rgba(255,255,255,0.5)]',
    cameraControlClass: 'bg-[#58595d] border-[#797b83]',
    colorDot: 'bg-[#76777b]'
  },
  white: {
    id: 'white',
    name: 'White Titanium',
    chassisClass: 'bg-[#f4f5f7] border-[#d8dce6] shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.9),inset_0_1px_2px_rgba(255,255,255,1)]',
    buttonClass: 'bg-[#d8dade] border-[#c0c4ce] shadow-[inset_1px_0_1px_rgba(255,255,255,0.9)]',
    cameraControlClass: 'bg-[#e4e6eb] border-[#c8ccd6]',
    colorDot: 'bg-[#f1f2f6]'
  },
  desert: {
    id: 'desert',
    name: 'Desert Titanium',
    chassisClass: 'bg-[#857465] border-[#a18e7d] shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.25),inset_0_1px_2px_rgba(255,255,255,0.45)]',
    buttonClass: 'bg-[#6d5e50] border-[#8c7b6c] shadow-[inset_1px_0_1px_rgba(255,255,255,0.4)]',
    cameraControlClass: 'bg-[#78685a] border-[#978575]',
    colorDot: 'bg-[#988675]'
  }
};

export default function IPhoneFrame({ children }) {
  const [finish, setFinish] = useState('black');
  const [showFrame, setShowFrame] = useState(true);
  const [scale, setScale] = useState(100); // 100%, 90%, 82%

  const currentFinish = CHASSIS_FINISHES[finish] || CHASSIS_FINISHES.black;

  return (
    <div className="min-h-screen w-full bg-[#050608] flex flex-col items-center justify-start sm:justify-center p-0 sm:py-6 overflow-x-hidden overflow-y-auto select-none relative">
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

      {/* Desktop Toolbar: Device info, Finish Switcher, Zoom, Frame Toggle */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[500px] px-3 py-2 mb-3 z-30 rounded-2xl bg-[#0e1117]/80 backdrop-blur-md border border-white/10 text-xs shadow-xl">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <Smartphone className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[11px] font-bold text-white tracking-tight flex items-center gap-1.5">
              iPhone 16 Pro Max
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-gray-300 font-normal">
                440 × 956 pt
              </span>
            </span>
          </div>
        </div>

        {/* Controls: Finish dots + Zoom + Frame toggle */}
        <div className="flex items-center gap-3">
          {/* Finish selector */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10">
            {Object.values(CHASSIS_FINISHES).map((f) => (
              <button
                key={f.id}
                title={f.name}
                onClick={() => setFinish(f.id)}
                className={`w-3.5 h-3.5 rounded-full ${f.colorDot} border transition-all cursor-pointer ${
                  finish === f.id ? 'border-red-500 ring-2 ring-red-500/40 scale-110' : 'border-white/20 hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          {/* Scale selector */}
          <div className="flex items-center gap-0.5 bg-black/40 p-0.5 rounded-lg border border-white/10 font-mono text-[10px]">
            {[100, 90, 82].map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  scale === s ? 'bg-white/20 text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {s}%
              </button>
            ))}
          </div>

          {/* Frame Toggle */}
          <button
            onClick={() => setShowFrame(!showFrame)}
            className={`px-2 py-1 rounded-lg border text-[10px] font-mono font-medium transition-all cursor-pointer flex items-center gap-1 ${
              showFrame 
                ? 'bg-red-500/15 border-red-500/30 text-red-300' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
            title="Toggle Outer Titanium Chassis"
          >
            <Maximize2 className="w-2.5 h-2.5" />
            <span>{showFrame ? 'Frame ON' : 'Borderless'}</span>
          </button>
        </div>
      </div>

      {/* Main Wrapper Container with Scaling */}
      <div 
        className="relative z-10 flex flex-col items-center transition-transform duration-300 origin-top"
        style={{ transform: `scale(${scale / 100})` }}
      >
        {/* Outer Titanium Chassis - iPhone 16 Pro Max */}
        <div 
          className={`relative w-full sm:w-[458px] h-screen sm:h-[974px] flex flex-col transition-all duration-300 ${
            showFrame 
              ? `${currentFinish.chassisClass} sm:rounded-[56px] p-0 sm:p-[9px] border` 
              : 'p-0 sm:p-0 bg-transparent'
          }`}
        >
          {/* Hardware Buttons (Visible when frame is enabled) */}
          {showFrame && (
            <>
              {/* Action Button (Left Top) */}
              <div 
                className={`hidden sm:block absolute -left-[3.5px] top-[120px] w-[3.5px] h-9 rounded-l-[2px] border-r transition-colors ${currentFinish.buttonClass}`} 
                title="Action Button"
              />
              
              {/* Volume Up (Left) */}
              <div 
                className={`hidden sm:block absolute -left-[3.5px] top-[170px] w-[3.5px] h-14 rounded-l-[2px] border-r transition-colors ${currentFinish.buttonClass}`} 
                title="Volume Up"
              />
              
              {/* Volume Down (Left) */}
              <div 
                className={`hidden sm:block absolute -left-[3.5px] top-[238px] w-[3.5px] h-14 rounded-l-[2px] border-r transition-colors ${currentFinish.buttonClass}`} 
                title="Volume Down"
              />
              
              {/* Power / Siri Button (Right) */}
              <div 
                className={`hidden sm:block absolute -right-[3.5px] top-[185px] w-[3.5px] h-18 rounded-r-[2px] border-l transition-colors ${currentFinish.buttonClass}`} 
                title="Power Button"
              />
              
              {/* iPhone 16 Pro Max Camera Control Sapphire Button (Right Lower) */}
              <div 
                className={`hidden sm:block absolute -right-[2.5px] top-[330px] w-[2.5px] h-16 rounded-r-[1px] border shadow-sm transition-colors ${currentFinish.cameraControlClass}`} 
                title="Camera Control Sapphire Button"
              />
            </>
          )}

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
