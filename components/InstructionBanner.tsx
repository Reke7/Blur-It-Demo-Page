
import React from 'react';

export const InstructionBanner: React.FC = () => {
  return (
    <div className="bg-blue-600 px-4 py-3 text-white shadow-lg relative z-50">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Privacy Shield Active
        </span>
        <p className="text-sm sm:text-base font-medium">
          👇 Activate the <strong>Blur It</strong> extension and click any sensitive data below. 
          <span className="hidden md:inline"> Then <strong className="underline decoration-2">SCROLL</strong> to see the protection in action.</span>
        </p>
      </div>
    </div>
  );
};
