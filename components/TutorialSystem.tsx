import React, { useState, useEffect, useCallback } from 'react';

interface TutorialSystemProps {
  isActive: boolean;
  onComplete: () => void;
}

type Step = 0 | 1 | 2 | 3; // 0: Select, 1: Draw, 2: Smart, 3: Complete

export const TutorialSystem: React.FC<TutorialSystemProps> = ({ isActive, onComplete }) => {
  const [step, setStep] = useState<Step>(0);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  const [isCelebration, setIsCelebration] = useState(false);
  const [demoActioned, setDemoActioned] = useState(false);

  // Spotlight positioning logic targeting external extension IDs
  const updateSpotlight = useCallback(() => {
    const ids = ['#blur-it-selector', '#blur-it-area', '#blur-it-smart'];
    const el = document.querySelector(ids[step]);
    if (el) {
      setSpotlightRect(el.getBoundingClientRect());
    } else {
      setSpotlightRect(null); // Extension toolbar might be hidden or moving
    }
  }, [step]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(updateSpotlight, 100); // More frequent updates to track extension UI
      window.addEventListener('resize', updateSpotlight);
      window.addEventListener('scroll', updateSpotlight);
      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', updateSpotlight);
        window.removeEventListener('scroll', updateSpotlight);
      };
    }
  }, [isActive, updateSpotlight]);

  // Observer/Poller to check if the extension has performed its job
  useEffect(() => {
    if (!isActive) return;

    const checkInterval = setInterval(() => {
      let isDone = false;
      // We check for the classes/elements the user's extension is expected to inject
      if (step === 0) isDone = document.querySelectorAll('.blurred-element').length > 0;
      if (step === 1) isDone = document.querySelectorAll('.blur-rect').length > 0;
      if (step === 2) isDone = document.querySelectorAll('.smart-blur-overlay:not(.hidden)').length > 0;

      if (isDone && !demoActioned) {
        setDemoActioned(true);
        setIsCelebration(true);
        setTimeout(() => setIsCelebration(false), 2000);
      }
    }, 500);

    return () => clearInterval(checkInterval);
  }, [isActive, step, demoActioned]);

  const handleNext = () => {
    if (step < 2) {
      setStep((s) => (s + 1) as Step);
      setDemoActioned(false);
    } else {
      setStep(3);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('blur-it-tutorial-complete', 'true');
    onComplete();
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      {/* Dark Overlay with Dynamic Hole */}
      <div 
        className="absolute inset-0 bg-slate-950/85 transition-all duration-500 pointer-events-auto"
        style={{
          clipPath: spotlightRect && step < 3
            ? `polygon(0% 0%, 0% 100%, ${spotlightRect.left}px 100%, ${spotlightRect.left}px ${spotlightRect.top}px, ${spotlightRect.right}px ${spotlightRect.top}px, ${spotlightRect.right}px ${spotlightRect.bottom}px, ${spotlightRect.left}px ${spotlightRect.bottom}px, ${spotlightRect.left}px 100%, 100% 100%, 100% 0%)`
            : 'none'
        }}
      ></div>

      {/* Visual Feedback for Spotlight */}
      {spotlightRect && step < 3 && (
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

      {/* Tutorial Card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="max-w-md w-full mx-4 pointer-events-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
          {step < 3 ? (
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-[0.15em]">
                  Step {step + 1} of 3
                </span>
                <button 
                  onClick={handleFinish}
                  className="text-slate-400 hover:text-slate-900 text-sm font-bold transition-colors"
                >
                  Skip Tutorial
                </button>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                {step === 0 && '🎯 Select Mode'}
                {step === 1 && '✏️ Draw Mode'}
                {step === 2 && '⚡ Smart Blur'}
              </h3>

              <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                {step === 0 && "Use your extension's 'Select' tool to click any of the email addresses in the practice zone below."}
                {step === 1 && "Select the 'Draw' tool from your extension, then click and drag over the credit card card below."}
                {step === 2 && "Finally, trigger your extension's 'Smart Blur' feature to see it automatically detect the sensitive data below."}
              </p>

              {/* Practice Zone - Designed for Extension Targeting */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 mb-8 transition-all group-hover:border-blue-300/50">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-4">Practice Zone</p>
                
                {step === 0 && (
                  <div className="space-y-3">
                    {['jane.doe@company.com', 'admin@secure-vault.io', 'ceo@growth-labs.net'].map((email, i) => (
                      <div 
                        key={i} 
                        className="p-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 font-bold shadow-sm hover:shadow-md transition-all cursor-crosshair"
                      >
                        📧 {email}
                      </div>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="relative p-8 bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl shadow-xl border border-slate-700 cursor-crosshair overflow-hidden group/card">
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                        <div className="w-8 h-6 bg-amber-500/40 rounded-sm"></div>
                      </div>
                      <div className="text-white/10 text-2xl font-black italic tracking-tighter">PREMIUM</div>
                    </div>
                    <div className="text-white font-mono text-xl tracking-[0.25em] mb-6 drop-shadow-lg">4242 4242 4242 4242</div>
                    <div className="flex gap-6">
                      <div><p className="text-[9px] text-white/30 uppercase font-bold tracking-widest mb-1">Expiry</p><p className="text-xs text-white font-bold">12/28</p></div>
                      <div><p className="text-[9px] text-white/30 uppercase font-bold tracking-widest mb-1">CVC</p><p className="text-xs text-white font-bold">***</p></div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3 relative">
                    <div className="p-4 bg-white border border-slate-200 rounded-xl flex justify-between shadow-sm">
                      <span className="text-sm font-bold text-slate-800 tracking-tight">Q4 Projected Revenue</span>
                      <span className="text-sm font-mono font-black text-emerald-600">$842,500.00</span>
                    </div>
                    <div className="p-4 bg-white border border-slate-200 rounded-xl flex justify-between shadow-sm">
                      <span className="text-sm font-bold text-slate-800 tracking-tight">System Admin Access</span>
                      <span className="text-sm text-blue-600 font-bold underline">root@production.db</span>
                    </div>
                  </div>
                )}
              </div>

              {demoActioned ? (
                <div className="animate-in zoom-in-95 duration-300">
                  <div className="flex items-center gap-3 text-emerald-600 font-black text-xl mb-6">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    {step === 0 && "Perfect!"}
                    {step === 1 && "Excellent!"}
                    {step === 2 && "Amazing!"}
                  </div>
                  <button 
                    onClick={handleNext}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-2xl shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-3 text-lg"
                  >
                    Next Step 
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 text-slate-400 text-sm font-bold py-4 bg-slate-50 rounded-2xl border border-slate-100 animate-pulse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                  Waiting for extension action...
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] text-center relative overflow-hidden animate-in zoom-in-95 duration-500 border border-slate-100">
              <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-500/40 rotate-12">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">🎓 Mastered!</h3>
              <p className="text-slate-600 mb-12 leading-relaxed text-lg font-medium max-w-sm mx-auto">
                You've successfully integrated Blur It with your workflow. Your privacy is now <span className="text-emerald-600 font-black uppercase tracking-widest">Guaranteed</span>.
              </p>
              <button 
                onClick={handleFinish}
                className="w-full py-6 bg-slate-900 hover:bg-black text-white font-black rounded-[1.5rem] transition-all shadow-2xl shadow-slate-900/40 active:scale-95 text-xl tracking-tight"
              >
                Start Protecting →
              </button>
            </div>
          )}
        </div>
      </div>

      {isCelebration && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
           <div className="animate-ping absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full"></div>
        </div>
      )}
    </div>
  );
};