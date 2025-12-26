import React, { useState } from 'react';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTutorial: () => void;
}

type Step = 'welcome' | 'role' | 'pain' | 'consequence' | 'tutorial_intro';
type RoleId = 'sales' | 'dev' | 'edu' | 'exec' | 'design' | 'freelance' | 'other';

interface RoleConfig {
  id: RoleId;
  title: string;
  sub: string;
  icon: React.ReactNode;
}

export const IntroModal: React.FC<IntroModalProps> = ({ isOpen, onClose, onStartTutorial }) => {
  const [step, setStep] = useState<Step>('welcome');
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
  const [selectedPain, setSelectedPain] = useState<number | null>(null);

  if (!isOpen) return null;

  const Icons = {
    ArrowRight: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>,
    ArrowLeft: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
    External: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
    Shield: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.75c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" /></svg>,
    Briefcase: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z" /></svg>,
    Code: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    Academic: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>,
    UserTie: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    Palette: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    Monitor: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    Search: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  };

  const roles: RoleConfig[] = [
    { id: 'sales', title: 'Sales/Marketing', sub: 'Demos, client calls, pitches', icon: Icons.Briefcase("w-8 h-8") },
    { id: 'dev', title: 'Developer/Engineer', sub: 'Code reviews, pair programming', icon: Icons.Code("w-8 h-8") },
    { id: 'edu', title: 'Educator/Trainer', sub: 'Teaching, tutorials, courses', icon: Icons.Academic("w-8 h-8") },
    { id: 'exec', title: 'Executive/Manager', sub: 'Team meetings, presentations', icon: Icons.UserTie("w-8 h-8") },
    { id: 'design', title: 'Designer/Creator', sub: 'Portfolio reviews, feedback', icon: Icons.Palette("w-8 h-8") },
    { id: 'freelance', title: 'Freelancer/Consultant', sub: 'Client work, screen shares', icon: Icons.Monitor("w-8 h-8") },
    { id: 'other', title: 'Other/Just Browsing', sub: 'General curiosity', icon: Icons.Search("w-8 h-8") },
  ];

  const renderWelcome = () => (
    <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 mb-8">
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Welcome to Blur It</h2>
      <p className="text-slate-400 text-lg mb-12 max-w-md leading-relaxed">
        Before you try the demo, help us personalize your experience (takes 20 seconds).
      </p>
      <div className="w-full space-y-4">
        <button 
          onClick={() => setStep('role')}
          className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-3 text-lg"
        >
          Let's Go {Icons.ArrowRight("w-5 h-5")}
        </button>
        <button onClick={onClose} className="w-full py-4 text-slate-500 font-medium hover:text-slate-300 transition-colors">
          Skip to demo
        </button>
      </div>
    </div>
  );

  const renderRoleSelection = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">First, tell us who you are:</h2>
        <span className="text-slate-500 text-sm font-bold bg-slate-800 px-4 py-1 rounded-full border border-slate-700">1 of 3</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => { setSelectedRole(role.id); setStep('pain'); }}
            className="group flex items-start gap-4 p-5 rounded-2xl border bg-slate-800/40 border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all text-left"
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center border bg-slate-800 text-slate-400 border-slate-700 group-hover:bg-slate-700 transition-all flex-shrink-0">
              {role.icon}
            </div>
            <div>
              <h4 className="font-bold text-white group-hover:text-blue-400 text-base">{role.title}</h4>
              <p className="text-xs text-slate-500 leading-tight mt-1">{role.sub}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-slate-800 pt-6">
        <button onClick={() => setStep('welcome')} className="text-slate-500 hover:text-white flex items-center gap-2 transition-colors font-medium">
          {Icons.ArrowLeft("w-4 h-4")} Back
        </button>
      </div>
    </div>
  );

  const renderPainPointSelection = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white max-w-sm leading-tight tracking-tight">
          What worries you most during screen shares?
        </h2>
        <span className="text-slate-500 text-sm font-bold bg-slate-800 px-4 py-1 rounded-full border border-slate-700">2 of 3</span>
      </div>
      <div className="space-y-3 mb-10">
        {[
          "Exposing passwords, emails, or financial data",
          "Looking unprofessional with messy screens",
          "Wasting time manually hiding info before calls",
          "Accidental privacy violations (GDPR/HIPAA)"
        ].map((point, idx) => (
          <button
            key={idx}
            onClick={() => setStep('consequence')}
            className="w-full p-5 text-left rounded-2xl border bg-slate-800/40 border-slate-700 hover:border-slate-500 transition-all flex items-center gap-4"
          >
            <div className="w-6 h-6 rounded-full border-2 border-slate-700 flex items-center justify-center"></div>
            <span className="text-sm font-medium text-slate-300">{point}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-slate-800 pt-6">
        <button onClick={() => setStep('role')} className="text-slate-500 hover:text-white flex items-center gap-2 transition-colors font-medium">
          {Icons.ArrowLeft("w-4 h-4")} Back
        </button>
      </div>
    </div>
  );

  const renderConsequence = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">Privacy is a Priority</h2>
        <span className="text-slate-500 text-sm font-bold bg-slate-800 px-4 py-1 rounded-full border border-slate-700">3 of 3</span>
      </div>
      
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-8 mb-8 relative overflow-hidden shadow-inner">
        <p className="text-xl italic text-slate-100 mb-8 leading-relaxed relative z-10 font-medium">
          "I accidentally showed my bank balance during a Zoom call. It was a complete nightmare and so embarrassing."
        </p>
        <span className="text-base font-bold text-white tracking-tight relative z-10">— Jordan W., Freelancer</span>
      </div>

      <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/50 mb-10">
        <p className="text-sm text-slate-200 font-semibold leading-relaxed">
          Blur It eliminates this anxiety instantly. No more manual cleanup. No more accidental leaks.
        </p>
      </div>

      <button
        onClick={() => setStep('tutorial_intro')}
        className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-2xl shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-3 text-lg"
      >
        Next Step {Icons.ArrowRight("w-5 h-5")}
      </button>
    </div>
  );

  const renderTutorialIntro = () => (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 mb-8">
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-white mb-6 text-center tracking-tight">How to Use Blur It</h2>
      
      <div className="space-y-4 mb-8 w-full">
        {/* Toolbar instructions */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
          <h4 className="text-blue-400 font-bold mb-3 uppercase tracking-widest text-xs flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>
            Finding the Toolbar
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            If you can't find the toolbar, look to the <strong>left of your tab window</strong> and click the <strong>blue knob</strong> to show it. Alternatively, open the extension popup menu and click the toggle <strong>"Show Toolbar"</strong>.
          </p>
        </div>

        {/* Essential actions */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
          <h4 className="text-amber-400 font-bold mb-3 uppercase tracking-widest text-xs flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Mastering the Tools
          </h4>
          <ul className="text-sm text-slate-300 space-y-3 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">1.</span>
              <span><strong>To exit Select Mode:</strong> Click your <strong>Esc</strong> key. Do this before moving to other tasks.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">2.</span>
              <span><strong>To disable Blur Area:</strong> Simply click the <strong>square button</strong> again on your toolbar.</span>
            </li>
          </ul>
        </div>

        <a 
          href="https://chromewebstore.google.com/detail/blur-it/lhiefljkimmkabhjepmkofflmadgbomm?authuser=0&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-slate-700 text-sm"
        >
          {Icons.External("w-4 h-4")} Install Chrome Extension
        </a>
      </div>

      <div className="w-full space-y-4">
        <button 
          onClick={onStartTutorial}
          className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-emerald-600/30 active:scale-95 flex items-center justify-center gap-3 text-lg"
        >
          Start Tutorial {Icons.ArrowRight("w-5 h-5")}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-lg transition-all duration-500">
      <div className="bg-slate-900 border border-slate-800/80 rounded-[2.5rem] shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col animate-in zoom-in-95 duration-500 max-h-[95vh] ring-1 ring-white/5">
        <div className="p-8 md:p-14 overflow-y-auto">
          {step === 'welcome' && renderWelcome()}
          {step === 'role' && renderRoleSelection()}
          {step === 'pain' && renderPainPointSelection()}
          {step === 'consequence' && renderConsequence()}
          {step === 'tutorial_intro' && renderTutorialIntro()}
        </div>
      </div>
    </div>
  );
};