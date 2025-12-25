import React from 'react';

export const InstructionBanner: React.FC = () => {
  return (
    <div className="bg-blue-600 px-4 py-3 text-white shadow-lg relative z-50 border-b border-blue-500">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Privacy Mode Active
        </span>
        <p className="text-sm sm:text-base font-medium">
          👇 Select a tool from the <strong>Blur It</strong> bar and click any data to protect it. 
          <span className="hidden md:inline"> Watch the blurs stay <strong className="underline decoration-2 underline-offset-4 decoration-blue-300">perfectly positioned</strong> as you scroll.</span>
        </p>
      </div>
    </div>
  );
};