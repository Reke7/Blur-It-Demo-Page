
import React from 'react';
import { METRICS } from '../constants';

export const MetricGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {METRICS.map((metric) => (
        <div 
          key={metric.label}
          className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-700 hover:shadow-lg transition-all cursor-default group"
        >
          <div className="flex justify-between items-start mb-4">
            <p className="text-slate-400 text-sm font-medium">{metric.label}</p>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${
              metric.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
            }`}>
              {metric.change}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {metric.value}
            </h3>
          </div>
          <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${metric.isPositive ? 'bg-blue-500' : 'bg-rose-500'}`} 
              style={{ width: `${Math.floor(Math.random() * 40) + 40}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};
