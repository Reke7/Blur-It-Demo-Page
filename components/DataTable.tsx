import React from 'react';
import { CLIENT_DATA } from '../constants';

export const DataTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-800">
            <th className="px-6 py-4">Client Entity</th>
            <th className="px-6 py-4">Revenue (USD)</th>
            <th className="px-6 py-4">Contact Gateway</th>
            <th className="px-6 py-4">API Secret Key</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {CLIENT_DATA.map((row) => (
            <tr 
              key={row.id} 
              className="hover:bg-blue-500/5 transition-colors group cursor-pointer"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-400">
                    {row.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{row.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono uppercase">{row.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-bold text-emerald-400">{row.revenue}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-slate-300 font-medium hover:text-blue-400 underline decoration-slate-700 underline-offset-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {row.email}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <code className="bg-slate-800/50 px-2 py-1 rounded text-xs text-slate-400 font-mono border border-slate-800 group-hover:border-slate-700">
                    {row.apiKey.substring(0, 16)}...
                  </code>
                  <button className="text-slate-600 hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  row.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' :
                  row.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-rose-500/10 text-rose-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    row.status === 'Active' ? 'bg-emerald-400' :
                    row.status === 'Pending' ? 'bg-amber-400' :
                    'bg-rose-400'
                  }`}></span>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};