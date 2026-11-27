import React from 'react';
import Badge from './Badge';

export default function MetricCard({
  label,
  value,
  unit = '',
  baseline = null,
  status = null,
  color = 'emerald',
  percentage = 100,
  note = null,
  onClick
}) {
  const colorMap = {
    emerald: {
      text: 'text-[#10b981]',
      bar: 'bg-[#10b981]',
      badgeVariant: 'emerald'
    },
    lime: {
      text: 'text-[#a3e635]',
      bar: 'bg-[#a3e635]',
      badgeVariant: 'lime'
    },
    cyan: {
      text: 'text-[#06b6d4]',
      bar: 'bg-[#06b6d4]',
      badgeVariant: 'cyan'
    },
    red: {
      text: 'text-[#ff3b30]',
      bar: 'bg-[#f61919]',
      badgeVariant: 'red'
    }
  };

  const scheme = colorMap[color] || colorMap.emerald;

  return (
    <div 
      onClick={onClick}
      className={`bg-[#13171f] hover:bg-[#181c26] border border-white/8 rounded-xl p-3 flex flex-col justify-between transition-all duration-200 relative overflow-hidden group shadow-sm ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}`}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-mono tracking-widest text-gray-400 font-semibold uppercase">
          {label}
        </span>
        {status && (
          <Badge variant={scheme.badgeVariant} size="xs">
            {status}
          </Badge>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="flex items-baseline gap-1 my-0.5">
        <span className="font-mono text-2xl font-bold tracking-tight text-white group-hover:scale-105 transition-transform origin-left">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-mono font-medium text-gray-400">
            {unit}
          </span>
        )}
      </div>

      {/* Sub-label / Tour Baseline Comparison */}
      <div className="mt-1 flex flex-col gap-1.5">
        {baseline && (
          <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
            <span>PGA BASELINE</span>
            <span className="text-gray-300 font-semibold">{baseline}</span>
          </div>
        )}

        {note && (
          <div className="text-[10px] text-gray-400 font-mono truncate">
            {note}
          </div>
        )}

        {/* Progress Fill Meter */}
        {typeof percentage === 'number' && (
          <div className="w-full h-1 bg-[#1b222d] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${scheme.bar}`}
              style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
