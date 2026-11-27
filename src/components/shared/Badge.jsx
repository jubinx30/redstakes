import React from 'react';

export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'sm', 
  dot = false, 
  dotPulse = false, 
  className = '',
  onClick
}) {
  const variants = {
    default: 'bg-[#1b222d] text-gray-300 border-white/10',
    red: 'bg-[#f61919]/15 text-[#ff3b30] border-[#f61919]/30',
    redSolid: 'bg-[#f61919] text-white border-transparent shadow-[0_0_12px_rgba(246,25,25,0.4)]',
    emerald: 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30',
    emeraldSolid: 'bg-[#10b981] text-[#0a0e16] border-transparent shadow-[0_0_12px_rgba(16,185,129,0.3)]',
    lime: 'bg-[#a3e635]/15 text-[#a3e635] border-[#a3e635]/30',
    limeSolid: 'bg-[#a3e635] text-[#0a0e16] border-transparent shadow-[0_0_12px_rgba(163,230,53,0.3)]',
    cyan: 'bg-[#06b6d4]/15 text-[#06b6d4] border-[#06b6d4]/30',
    glass: 'bg-[#0b0d10]/80 backdrop-blur-md text-gray-200 border-white/10',
    dark: 'bg-[#0a0e16] text-gray-400 border-white/5'
  };

  const sizes = {
    xs: 'text-[9px] px-1.5 py-0.5 tracking-wider font-semibold',
    sm: 'text-[10px] px-2 py-0.5 tracking-wider font-semibold',
    md: 'text-[11px] px-2.5 py-1 tracking-wider font-bold',
    lg: 'text-xs px-3 py-1.5 tracking-wider font-bold'
  };

  return (
    <span 
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border uppercase select-none transition-all duration-150 ${variants[variant] || variants.default} ${sizes[size] || sizes.sm} ${onClick ? 'cursor-pointer hover:brightness-110 active:scale-95' : ''} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          variant.startsWith('emerald') ? 'bg-[#10b981]' :
          variant.startsWith('red') ? 'bg-[#f61919]' :
          variant.startsWith('lime') ? 'bg-[#a3e635]' :
          variant.startsWith('cyan') ? 'bg-[#06b6d4]' : 'bg-gray-400'
        } ${dotPulse ? 'animate-pulse' : ''}`} />
      )}
      {children}
    </span>
  );
}
