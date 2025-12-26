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

  // Spotlight positioning
  const updateSpotlight = useCallback(() => {
    const ids = ['#blur-it-selector', '#blur-it-area', '#blur-it-smart'];
    const el = document.querySelector(ids[step]);
    if (el) {
      setSpotlightRect(el.getBoundingClientRect());
    }
  }, [step]);

  useEffect(() => {
    if (isActive) {
      updateSpotlight();
      window.addEventListener('resize', updateSpotlight);
      window.addEventListener('scroll', updateSpotlight);
      return () => {
        window.removeEventListener('resize', updateSpotlight);
        window.removeEventListener('scroll', updateSpotlight);
      };
    }
  }, [isActive, updateSpotlight]);

  // Check for completion logic
  useEffect(() => {
    if (!isActive) return;

    const checkInterval = setInterval(() => {
      let isDone = false;
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
      {/* Dark Overlay with Hole */}
      <div 
        className="absolute inset-0 bg-slate-950/85 transition-all duration-700 pointer-events-auto"
        style={{
          clipPath: spotlightRect && step < 3
            ? `polygon(0% 0%, 0% 100%, ${spotlightRect.left}px 100%, ${spotlightRect.left}px ${spotlightRect.top}px, ${spotlightRect.right}px ${spotlightRect.top}px, ${spotlightRect.right}px ${spotlightRect.bottom}px, ${spotlightRect.left}px ${spotlightRect.bottom}px, ${spotlightRect.left}px 100%, 100% 100%, 100% 0%)`
            : 'none'
        }}
      ></div>

      {/* Spotlight Border */}
      {spotlightRect && step < 3 && (
        <div 
          className="absolute border-2 border-blue-500 rounded-xl animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-500 pointer-events-none"
          style={{
            top: spotlightRect.top - 4,
            left: spotlightRect.left - 4,
            width: spotlightRect.width + 8,
            height: spotlightRect.height + 8,
          }}
        />
      )}

      {/* Tutorial Instruction Card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="max-w-md w-full mx-4 pointer-events-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
          {step < 3 ? (
            <div className="bg-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">
                  Step {step + 1} of 3
                </span>
                <button 
                  onClick={handleFinish}
                  className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
                >
                  Skip Tutorial
                </button>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                {step === 0 && '🎯 Select Mode'}
                {step === 1 && '✏️ Draw Mode'}
                {step === 2 && '⚡ Smart Blur'}
              </h3>

              <p className="text-slate-600 mb-8 leading-relaxed">
                {step === 0 && "Click the 'Select' button on the toolbar, then click any of the email addresses below to hide them instantly."}
                {step === 1 && "Click the 'Draw' button, then drag your mouse over the credit card area below to mask it."}
                {step === 2 && "Finally, click the 'Smart Blur' button to automatically detect and hide all sensitive data at once."}
              </p>

              {/* Demo Area */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 mb-8 transition-all group-hover:border-blue-200">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-4">Practice Zone</p>
                
                {step === 0 && (
                  <div className="space-y-3">
                    {['jane.doe@company.com', 'admin@server.io', 'support@client.net'].map((email, i) => (
                      <div 
                        key={i} 
                        onClick={(e) => {
                           if(document.querySelector('#blur-it-selector')?.classList.contains('bg-blue-600')) {
                             e.currentTarget.classList.add('blurred-element', 'bg-slate-200', 'text-transparent', 'select-none', 'blur-sm');
                           }
                        }}
                        className="p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 font-medium cursor-crosshair hover:border-blue-300 transition-colors"
                      >
                        📧 {email}
                      </div>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div 
                    className="relative p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg border border-slate-700 cursor-crosshair overflow-hidden"
                    onMouseDown={(e) => {
                      if(document.querySelector('#blur-it-area')?.classList.contains('bg-blue-600')) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const blurBox = document.createElement('div');
                        blurBox.className = 'blur-rect absolute bg-slate-900/80 backdrop-blur-xl border border-white/10 z-50 pointer-events-none';
                        blurBox.style.left = `${e.clientX - rect.left}px`;
                        blurBox.style.top = `${e.clientY - rect.top}px`;
                        blurBox.style.width = '120px';
                        blurBox.style.height = '40px';
                        e.currentTarget.appendChild(blurBox);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-10 h-10 bg-amber-400/20 rounded-md"></div>
                      <div className="text-white/20 text-xl font-bold italic tracking-tighter">VISA</div>
                    </div>
                    <div className="text-white font-mono text-lg tracking-[0.2em] mb-4">4242 4242 4242 4242</div>
                    <div className="flex gap-4">
                      <div><p className="text-[8px] text-white/30 uppercase">Expiry</p><p className="text-xs text-white">12/28</p></div>
                      <div><p className="text-[8px] text-white/30 uppercase">CVC</p><p className="text-xs text-white">***</p></div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3 relative overflow-hidden">
                    <div className="p-3 bg-white border border-slate-200 rounded-lg flex justify-between">
                      <span className="text-sm font-bold text-slate-700">Account Balance</span>
                      <span className="text-sm font-mono text-emerald-600">$124,500.22</span>
                    </div>
                    <div className="p-3 bg-white border border-slate-200 rounded-lg flex justify-between">
                      <span className="text-sm font-bold text-slate-700">Owner Email</span>
                      <span className="text-sm text-slate-500 underline">ceo@startup.io</span>
                    </div>
                    {/* The Smart Blur Overlay is handled by the button logic */}
                    <div className="smart-blur-overlay hidden absolute inset-0 bg-blue-600/10 backdrop-blur-md flex items-center justify-center border-2 border-blue-500 rounded-xl z-50">
                      <div className="p-3 bg-blue-600 text-white rounded-full shadow-lg">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.75c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" /></svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {demoActioned ? (
                <div className="animate-in zoom-in-95 duration-300">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg mb-6">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    {step === 0 && "🎉 Perfect!"}
                    {step === 1 && "🎉 Excellent!"}
                    {step === 2 && "🎉 Amazing!"}
                  </div>
                  <button 
                    onClick={handleNext}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    Next Step {Icons.ArrowRight("w-5 h-5 group-hover:translate-x-1 transition-transform")}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-400 text-sm italic py-4 animate-pulse">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Waiting for your action...
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl text-center relative overflow-hidden animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">🎓 Tutorial Complete!</h3>
              <p className="text-slate-600 mb-10 leading-relaxed text-lg">
                You've mastered the essential tools to protect your privacy. All features are <span className="text-emerald-600 font-bold">UNLOCKED</span> and free to use on this demo page.
              </p>
              <button 
                onClick={handleFinish}
                className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-2xl shadow-slate-900/20 active:scale-95 text-lg"
              >
                Start Using Blur It →
              </button>
            </div>
          )}
        </div>
      </div>

      {isCelebration && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
           <div className="animate-ping absolute w-96 h-96 bg-blue-500/20 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

const Icons = {
  ArrowRight: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>,
};