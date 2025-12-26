import React, { useState, useEffect, useCallback } from 'react';

interface TutorialSystemProps {
  isActive: boolean;
  onComplete: () => void;
}

type Step = 0 | 1 | 2; // 0: Select, 1: Draw, 2: Complete

export const TutorialSystem: React.FC<TutorialSystemProps> = ({ isActive, onComplete }) => {
  const [step, setStep] = useState<Step>(0);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  const [demoActioned, setDemoActioned] = useState(false);

  const updateSpotlight = useCallback(() => {
    const ids = ['#blur-it-selector', '#blur-it-area'];
    const el = document.querySelector(ids[step]);
    if (el) {
      setSpotlightRect(el.getBoundingClientRect());
    } else {
      setSpotlightRect(null);
    }
  }, [step]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(updateSpotlight, 100);
      window.addEventListener('resize', updateSpotlight);
      window.addEventListener('scroll', updateSpotlight);
      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', updateSpotlight);
        window.removeEventListener('scroll', updateSpotlight);
      };
    }
  }, [isActive, updateSpotlight]);

  useEffect(() => {
    if (!isActive) return;

    const checkInterval = setInterval(() => {
      let isDone = false;
      if (step === 0) isDone = document.querySelectorAll('.blurred-element').length > 0;
      if (step === 1) isDone = document.querySelectorAll('.blur-rect').length > 0;

      if (isDone && !demoActioned) {
        setDemoActioned(true);
      }
    }, 500);

    return () => clearInterval(checkInterval);
  }, [isActive, step, demoActioned]);

  const handleNext = () => {
    if (step < 1) {
      setStep((s) => (s + 1) as Step);
      setDemoActioned(false);
    } else {
      setStep(2);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('blur-it-tutorial-complete', 'true');
    onComplete();
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      <div 
        className="absolute inset-0 bg-slate-950/80 transition-all duration-500 pointer-events-auto"
        style={{
          clipPath: spotlightRect && step < 2
            ? `polygon(0% 0%, 0% 100%, ${spotlightRect.left}px 100%, ${spotlightRect.left}px ${spotlightRect.top}px, ${spotlightRect.right}px ${spotlightRect.top}px, ${spotlightRect.right}px ${spotlightRect.bottom}px, ${spotlightRect.left}px ${spotlightRect.bottom}px, ${spotlightRect.left}px 100%, 100% 100%, 100% 0%)`
            : 'none'
        }}
      ></div>

      {spotlightRect && step < 2 && (
        <div 
          className="absolute border-2 border-blue-500 rounded-xl animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300 pointer-events-none"
          style={{
            top: spotlightRect.top - 4,
            left: spotlightRect.left - 4,
            width: spotlightRect.width + 8,
            height: spotlightRect.height + 8,
          }}
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
        <div className="max-w-md w-full pointer-events-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
          {step < 2 ? (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[9px] font-black uppercase tracking-widest">
                  Step {step + 1} of 2
                </span>
                <button 
                  onClick={handleFinish}
                  className="text-slate-400 hover:text-slate-900 text-xs font-bold transition-colors"
                >
                  Skip
                </button>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight flex items-center gap-3">
                {step === 0 ? (
                  <>
                    <span>Select Mode</span>
                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Draw Mode</span>
                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </>
                )}
              </h3>

              <div className="text-slate-600 mb-6 leading-relaxed font-medium space-y-3">
                {step === 0 ? (
                  <>
                    <p className="text-sm">Use the <strong>Select tool</strong> (tilted arrow) to click data in the practice zone.</p>
                    <div className="bg-amber-50 text-amber-900 p-3 rounded-xl border border-amber-200">
                      <p className="text-[10px] font-bold uppercase tracking-wide flex items-center gap-2 mb-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        Important:
                      </p>
                      <p className="text-[11px] leading-tight">
                        To exit Select Mode, press the <strong>Esc</strong> key before continuing.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm">Select the <strong>Draw tool</strong> (square icon), then click and drag over the card below.</p>
                    <div className="bg-amber-50 text-amber-900 p-3 rounded-xl border border-amber-200">
                      <p className="text-[10px] font-bold uppercase tracking-wide flex items-center gap-2 mb-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Action:
                      </p>
                      <p className="text-[11px] leading-tight">
                        To disable Draw Mode, click the <strong>Draw button</strong> again on your toolbar.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-4 mb-6 transition-all">
                <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest mb-3">Practice Zone</p>
                
                {step === 0 && (
                  <div className="space-y-2">
                    {['jane.doe@company.com', 'admin@secure-vault.io'].map((email, i) => (
                      <div 
                        key={i} 
                        className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-bold shadow-sm cursor-crosshair flex items-center gap-2"
                      >
                        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        {email}
                      </div>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="relative p-6 bg-gradient-to-br from-slate-800 to-slate-950 rounded-xl shadow-lg border border-slate-700 cursor-crosshair overflow-hidden">
                    <div className="text-white/10 text-lg font-black italic tracking-tighter uppercase mb-4">Secure Card</div>
                    <div className="text-white font-mono text-base tracking-[0.2em] mb-2 text-center">4242 4242 4242 4242</div>
                  </div>
                )}
              </div>

              {demoActioned ? (
                <div className="animate-in zoom-in-95 duration-300">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-base mb-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Perfect! Exit the tool.
                  </div>
                  <button 
                    onClick={handleNext}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 text-base"
                  >
                    {step === 0 ? 'Next Step' : 'Finish Tutorial'}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 text-slate-400 text-[11px] font-bold py-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div>
                  Waiting for extension action...
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 shadow-2xl text-center border border-slate-100">
              <div className="w-20 h-20 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Mastered</h3>
              <p className="text-slate-500 mb-6 font-bold uppercase tracking-[0.2em] text-[10px]">
                Your privacy is now guaranteed.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl mb-8 text-left border border-slate-100">
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  <strong>Pro Tip:</strong> Want to start over? Click the <strong>clear button (trash icon)</strong> on your toolbar to clear all blurs instantly.
                </p>
              </div>
              <button 
                onClick={handleFinish}
                className="w-full py-5 bg-slate-900 hover:bg-black text-white font-black rounded-2xl transition-all shadow-xl active:scale-[0.98] text-lg"
              >
                Start Protecting
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};