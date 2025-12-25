
import React from 'react';

interface CTAToastProps {
  isVisible: boolean;
}

export const CTAToast: React.FC<CTAToastProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl w-80 ring-1 ring-blue-500/20">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-blue-600/20 p-2 rounded-lg">
            <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04accura M12 21.75c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-white">Protection Active?</h4>
            <p className="text-slate-400 text-sm mt-1">Works perfectly? Secure your demos and shield your private data today.</p>
          </div>
        </div>
        
        <a 
          href="https://buy.polar.sh/polar_cl_0G0XUeTrwBSQbTlBtraku1c3We5MUw0pr1Vw70hSzfI"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 hover:bg-blue-500 text-white text-center font-bold py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 mb-3"
        >
          Get License Key - $49.99
        </a>
        
        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium uppercase tracking-widest">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          100% Money-Back Guarantee
        </div>

        <button 
          onClick={() => (document.querySelector('.fixed.bottom-6.right-6') as HTMLElement).style.display = 'none'}
          className="absolute -top-2 -right-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full p-1 border border-slate-700 transition-colors shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
