import React, { useState, useEffect, useCallback, useRef } from 'react';

interface TutorialSystemProps {
  isActive: boolean;
  onComplete: () => void;
}

type Step = 0 | 1 | 2; // 0: Select + Clear, 1: Draw + Clear, 2: Complete

export const TutorialSystem: React.FC<TutorialSystemProps> = ({ isActive, onComplete }) => {
  const [step, setStep] = useState<Step>(0);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  
  // Track specific tool phases within a step
  const [hasBlurred, setHasBlurred] = useState(false);
  const [hasCleared, setHasCleared] = useState(false);

  const updateSpotlight = useCallback(() => {
    // Spotlight the tool based on phase
    const toolId = !hasBlurred 
      ? (step === 0 ? '#blur-it-selector' : '#blur-it-area')
      : '#blur-it-clear';
    
    const el = document.querySelector(toolId);
    if (el) {
      setSpotlightRect(el.getBoundingClientRect());
    } else {
      setSpotlightRect(null);
    }
  }, [step, hasBlurred]);

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
      const blurCount = document.querySelectorAll('.blurred-element, .blur-rect').length;

      // Logic: User must blur first
      if (!hasBlurred && blurCount > 0) {
        setHasBlurred(true);
      }

      // Logic: Once blurred, user must clear
      if (hasBlurred && !hasCleared && blurCount === 0) {
        setHasCleared(true);
      }
    }, 300);

    return () => clearInterval(checkInterval);
  }, [isActive, hasBlurred, hasCleared]);

  const handleNext = () => {
    if (step < 1) {
      setStep((s) => (s + 1) as Step);
      setHasBlurred(false);
      setHasCleared(false);
    } else {
      setStep(2);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('blur-it-tutorial-complete', 'true');
    onComplete();
  };

  if (!isActive) return null;

  const Icons = {
    Select: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5.5 3.5l14.5 11-6.5.5 4 6-2 1.5-4-6.5-6 4z" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    Draw: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="5" width="14" height="14" rx="1.5" /></svg>,
    Clear: (c: string) => <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6m0-6l-6 6" strokeLinecap="round" /></svg>,
  };

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
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden border border-slate-200 text-slate-900">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[9px] font-black uppercase tracking-widest">
                  Task {step + 1} of 2
                </span>
                <button 
                  onClick={handleFinish}
                  className="text-slate-400 hover:text-slate-900 text-xs font-bold transition-colors"
                >
                  Skip
                </button>
              </div>

              <h3 className="text-xl font-black mb-3 tracking-tight flex items-center gap-3">
                {step === 0 ? (
                  <>
                    <span>{hasBlurred ? 'Finish Task' : 'Element Selection'}</span>
                    {!hasBlurred ? Icons.Select("w-6 h-6 text-blue-500") : Icons.Clear("w-6 h-6 text-rose-500")}
                  </>
                ) : (
                  <>
                    <span>{hasBlurred ? 'Finish Task' : 'Draw Protection'}</span>
                    {!hasBlurred ? Icons.Draw("w-6 h-6 text-blue-500") : Icons.Clear("w-6 h-6 text-rose-500")}
                  </>
                )}
              </h3>

              <div className="text-slate-600 mb-6 leading-relaxed font-medium space-y-4">
                {!hasBlurred ? (
                  <>
                    <p className="text-sm">
                      Use the <strong>{step === 0 ? 'Select tool' : 'Draw tool'}</strong> to {step === 0 ? 'click sensitive data' : 'cover an area'} in the practice zone.
                    </p>
                    <div className="text-[10px] bg-blue-50 p-2 rounded-lg border border-blue-100 text-blue-900 font-bold">
                      {step === 0 ? 'TIP: Press ESC key after selecting to exit the mode.' : 'TIP: Re-click the square icon to stop drawing.'}
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm font-bold">
                      Great! To finish this lesson:
                    </p>
                    <ul className="text-sm space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-black">•</span>
                        <span><strong>Stop tool:</strong> {step === 0 ? 'Press ESC key.' : 'Click square icon again.'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 font-black">•</span>
                        <span><strong>Clear Blurs:</strong> Click the {Icons.Clear("w-4 h-4 inline-block text-rose-500")} <strong>Clear icon</strong> on your toolbar.</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {!hasCleared && (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-4 mb-6 transition-all">
                  <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest mb-3">Practice Zone</p>
                  
                  {step === 0 && (
                    <div className="space-y-2">
                      {['personal@data.io', 'confidential@vault.net'].map((email, i) => (
                        <div 
                          key={i} 
                          className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-bold shadow-sm cursor-crosshair"
                        >
                          {email}
                        </div>
                      ))}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="p-8 bg-slate-900 rounded-xl shadow-lg border border-slate-700 cursor-crosshair text-center">
                      <div className="text-white/20 text-xs font-black uppercase tracking-widest">Confidential Document</div>
                    </div>
                  )}
                </div>
              )}

              {hasCleared ? (
                <div className="animate-in zoom-in-95 duration-300">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-base mb-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Action Complete!
                  </div>
                  <button 
                    onClick={handleNext}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 text-sm"
                  >
                    {step < 1 ? 'Next Lesson' : 'Finish Tutorial'}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 text-slate-400 text-[11px] font-bold py-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div>
                  Waiting for {!hasBlurred ? 'blur' : 'clear'} action...
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 shadow-2xl text-center border border-slate-100">
              <div className="w-20 h-20 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Fully Prepared</h3>
              <p className="text-slate-500 mb-6 font-bold uppercase tracking-[0.2em] text-[10px]">
                Privacy is now your default setting.
              </p>
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