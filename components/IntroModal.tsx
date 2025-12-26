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

  if (!isOpen) return null;

  const Icons = {
    ArrowRight: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>,
    ArrowLeft: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
    External: (className: string) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
    Drop: (className: string) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.5c-4.142 0-7.5-3.358-7.5-7.5 0-4.142 7.5-11.75 7.5-11.75s7.5 7.608 7.5 11.75c0 4.142-3.358 7.5-7.5 7.5z" /></svg>,
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
    <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 mb-6">
        {Icons.Drop("w-8 h-8 text-white")}
      </div>
      <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Welcome to Blur It</h2>
      <p className="text-slate-400 text-base mb-8 max-w-sm leading-relaxed">
        Personalize your experience to get the most out of our privacy shield.
      </p>
      <div className="w-full space-y-3">
        <button 
          onClick={() => setStep('role')}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-3 text-base"
        >
          Let's Go {Icons.ArrowRight("w-5 h-5")}
        </button>
        <button onClick={onClose} className="w-full py-3 text-slate-500 font-medium hover:text-slate-300 transition-colors text-sm">
          Skip to demo
        </button>
      </div>
    </div>
  );

  const renderRoleSelection = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Tell us who you are:</h2>
        <span className="text-slate-500 text-xs font-bold bg-slate-800 px-3 py-1 rounded-full border border-slate-700">Step 1/2</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => { setSelectedRole(role.id); setStep('tutorial_intro'); }}
            className="group flex items-start gap-3 p-4 rounded-xl border bg-slate-800/40 border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all text-left"
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center border bg-slate-800 text-slate-400 border-slate-700 group-hover:bg-slate-700 transition-all flex-shrink-0">
              {role.icon}
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-white group-hover:text-blue-400 text-sm truncate">{role.title}</h4>
              <p className="text-[10px] text-slate-500 leading-tight mt-1 line-clamp-2">{role.sub}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-slate-800 pt-5">
        <button onClick={() => setStep('welcome')} className="text-slate-500 hover:text-white flex items-center gap-2 transition-colors font-medium text-sm">
          {Icons.ArrowLeft("w-4 h-4")} Back
        </button>
      </div>
    </div>
  );

  const renderTutorialIntro = () => (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-6">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-5 text-center tracking-tight">How to Use Blur It</h2>
      
      <div className="space-y-3 mb-6 w-full max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <h4 className="text-blue-400 font-bold mb-2 uppercase tracking-widest text-[10px] flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>
            Finding the Toolbar
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            If missing, look to the <strong>left of your tab window</strong> and click the <strong>blue knob</strong> to show it. Or open the extension popup and click <strong>"Show Toolbar"</strong>.
          </p>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <h4 className="text-amber-400 font-bold mb-2 uppercase tracking-widest text-[10px] flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Essential Actions
          </h4>
          <ul className="text-xs text-slate-300 space-y-2 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">1.</span>
              <span><strong>Exit Select Mode:</strong> Click your <strong>Esc</strong> key.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">2.</span>
              <span><strong>Disable Blur Area:</strong> Click the <strong>square button</strong> again on your toolbar.</span>
            </li>
          </ul>
        </div>

        <a 
          href="https://chromewebstore.google.com/detail/blur-it/lhiefljkimmkabhjepmkofflmadgbomm?authuser=0&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-slate-700 text-xs group"
        >
          {Icons.External("w-3.5 h-3.5 group-hover:scale-110 transition-transform")} Install Chrome Extension
        </a>
      </div>

      <div className="w-full pt-2">
        <button 
          onClick={onStartTutorial}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98] flex items-center justify-center gap-3 text-base"
        >
          Start Tutorial {Icons.ArrowRight("w-5 h-5")}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md transition-all duration-500">
      <div className="bg-slate-900 border border-slate-800/80 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col animate-in zoom-in-95 duration-500 max-h-[90vh] ring-1 ring-white/5">
        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
          {step === 'welcome' && renderWelcome()}
          {step === 'role' && renderRoleSelection()}
          {step === 'tutorial_intro' && renderTutorialIntro()}
        </div>
      </div>
    </div>
  );
};