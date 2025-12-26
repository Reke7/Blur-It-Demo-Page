import React from 'react';

export const InstructionBanner: React.FC = () => {
  return (
    <div className="bg-blue-600 px-4 py-3 text-white shadow-lg relative z-50">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em] bg-white/20 px-3 py-1 rounded-full">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Privacy Shield Ready
          </span>
          <p className="text-sm sm:text-base font-bold">
            👇 Open the <strong>Blur It</strong> browser extension to hide sensitive data on this dashboard. 
          </p>
        </div>
        <p className="text-[11px] font-medium text-blue-100 max-w-2xl opacity-90">
          Can't find the toolbar? Look to the left of your window and click the <strong>blue knob</strong> to show it, or check the extension popup menu and toggle <strong>"Show Toolbar"</strong>.
        </p>
      </div>
    </div>
  );
};