import React, { useState, useEffect } from 'react';

export const DraggableToolbar: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'select' | 'draw' | null>(null);
  const [style, setStyle] = useState<'blur' | 'redact'>('blur');

  const handleSelectClick = () => {
    setActiveTool(activeTool === 'select' ? null : 'select');
    document.dispatchEvent(new CustomEvent('blur-it-mode-change', { detail: 'select' }));
  };

  const handleDrawClick = () => {
    setActiveTool(activeTool === 'draw' ? null : 'draw');
    document.dispatchEvent(new CustomEvent('blur-it-mode-change', { detail: 'draw' }));
  };

  const handleSmartBlurClick = () => {
    const overlay = document.createElement('div');
    overlay.className = 'smart-blur-overlay hidden';
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      overlay.classList.remove('hidden');
      document.dispatchEvent(new CustomEvent('blur-it-smart-complete'));
    }, 500);
  };

  const handleClearClick = () => {
    // Mock clearing blurs
    const elements = document.querySelectorAll('.blurred-element, .blur-rect');
    elements.forEach(el => el.remove());
    document.dispatchEvent(new CustomEvent('blur-it-clear'));
  };

  return (
    <div className="fixed top-1/4 right-6 z-[60] flex flex-col items-center gap-4 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 p-3 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-right-10 duration-700">
      <div className="w-8 h-1 bg-slate-700 rounded-full mb-1 cursor-grab active:cursor-grabbing"></div>

      <div className="flex flex-col gap-2">
        <button 
          id="blur-it-selector"
          onClick={handleSelectClick}
          title="Select Mode"
          className={`p-3 rounded-xl transition-all relative ${activeTool === 'select' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
          </svg>
        </button>

        <button 
          id="blur-it-area"
          onClick={handleDrawClick}
          title="Draw Mode"
          className={`p-3 rounded-xl transition-all relative ${activeTool === 'draw' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <button 
          id="blur-it-smart"
          onClick={handleSmartBlurClick}
          title="Smart Blur"
          className="p-3 rounded-xl bg-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-700 transition-all relative"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>

        <div className="h-[1px] bg-slate-700/50 mx-2 my-1"></div>

        <button 
          id="blur-it-clear"
          onClick={handleClearClick}
          title="Clear All Blurs"
          className="p-3 rounded-xl bg-slate-800 text-rose-500 hover:text-rose-400 hover:bg-slate-700 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="w-full h-[1px] bg-slate-700/50"></div>

      <button 
        onClick={() => setStyle(style === 'blur' ? 'redact' : 'blur')}
        className="flex flex-col items-center gap-1 group"
      >
        <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${style === 'redact' ? 'bg-slate-700' : 'bg-blue-600'}`}>
          <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${style === 'redact' ? 'translate-x-4' : 'translate-x-0'}`}></div>
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter group-hover:text-slate-300">{style}</span>
      </button>

      <div className="w-full h-[1px] bg-slate-700/50"></div>

      <button title="Settings" className="p-2 text-slate-500 hover:text-slate-300 transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
      </button>
    </div>
  );
};