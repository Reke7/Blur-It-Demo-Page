import React from 'react';

export const InstructionBanner: React.FC = () => {
  return (
    <div className="bg-blue-600 px-4 py-3 text-white shadow-lg relative z-50">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em] bg-white/20 px-3 py-1 rounded-full">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Privacy Shield Ready
          </span>
          <p className="text-sm sm:text-base font-bold">
            Open the <strong>Blur It</strong> browser extension to hide sensitive data. 
          </p>
          <a 
            href="https://chromewebstore.google.com/detail/blur-it/lhiefljkimmkabhjepmkofflmadgbomm?authuser=0&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-white text-blue-600 px-3 py-1 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-sm"
          >
            Install Extension
          </a>
        </div>
        <p className="text-[11px] font-medium text-blue-100 max-w-2xl opacity-90 leading-relaxed">
          Can't find the toolbar? Look to the <strong>left of your tab window</strong> and click the <strong>blue knob</strong> to show it, or open the extension popup menu and click the toggle that says <strong>"Show Toolbar"</strong>.
        </p>
      </div>
    </div>
  );
};