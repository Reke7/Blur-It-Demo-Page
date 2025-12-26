import React, { useState } from 'react';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTutorial: () => void;
}

type Step = 'welcome' | 'role' | 'pain' | 'consequence' | 'tutorial_intro';
type RoleId = 'sales' | 'dev' | 'edu' | 'exec' | 'design' | 'freelance' | 'agency' | 'founder' | 'other';

interface RoleContent {
  id: RoleId;
  title: string;
  sub: string;
  icon: (className: string) => React.ReactNode;
  pains: string[];
  stat: string;
  fact: string;
  cta: string;
}

const ROLES: RoleContent[] = [
  {
    id: 'sales',
    title: 'Sales/Marketing',
    sub: 'Demos, client calls',
    icon: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z" /></svg>,
    pains: ["Accidentally showing competitor research", "Client sees personal emails", "Revealing internal revenue data", "Looking disorganized during demos", "Wasting 15+ min prepping calls"],
    stat: "73% of sales reps worry about exposing confidential info during demos",
    fact: "Average prep time: 20 min per client call",
    cta: "Blur It eliminates this anxiety in 2 clicks."
  },
  {
    id: 'dev',
    title: 'Developer',
    sub: 'Code reviews, pair programming',
    icon: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    pains: ["Exposing API keys or credentials", "Showing proprietary code architecture", "Revealing .env files", "Messy terminal history exposure", "Sanitizing screens before calls"],
    stat: "GitHub removes 5+ million exposed secrets annually",
    fact: "Manual sanitization: 15+ min per code review",
    cta: "Blur It prevents credential leaks instantly."
  },
  {
    id: 'agency',
    title: 'Agency Owner',
    sub: 'Client pitches, walkthroughs',
    icon: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    pains: ["Leaking client project details", "Revealing internal profit margins", "Messy workspace during pitches", "Accidental exposure of strategy docs", "Internal Slack feedback visible"],
    stat: "85% of clients state confidentiality is as vital as delivery",
    fact: "A single slip can cost an agency its biggest retainer",
    cta: "Blur It protects your professional reputation."
  },
  {
    id: 'founder',
    title: 'SaaS Founder',
    sub: 'Investor pitches, demos',
    icon: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    pains: ["Showing real churn/MRR to investors", "Exposing database configs", "Revealing unreleased features", "Personal notifications in meetings", "Wasting dev time on demo envs"],
    stat: "Data leaks during pitches can reduce valuation by up to 30%",
    fact: "Founders spend 4 hours weekly prepping demos",
    cta: "Blur It secures your IP and financial secrets."
  },
  {
    id: 'edu',
    title: 'Educator',
    sub: 'Teaching, tutorials',
    icon: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>,
    pains: ["Students seeing personal emails", "Showing financial/payment info", "Looking unprepared with clutter", "Privacy concerns with student data", "Prepping clean screens for lessons"],
    stat: "Privacy violations can cost educators their positions",
    fact: "79% of teachers worry about personal leaks",
    cta: "Blur It protects you and your students."
  },
  {
    id: 'exec',
    title: 'Executive',
    sub: 'Team meetings, board calls',
    icon: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    pains: ["Exposing strategic financial data", "Showing confidential employee info", "Disorganized front for the board", "Compliance violations (GDPR/HIPAA)", "Interruptions from notifications"],
    stat: "Compliance fines reach millions of dollars annually",
    fact: "68% of executives fear sharing sensitive reports",
    cta: "Blur It ensures enterprise-grade compliance."
  },
  {
    id: 'design',
    title: 'Designer',
    sub: 'Portfolio reviews, feedback',
    icon: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    pains: ["Showing unfinished client work", "Revealing pricing/contracts", "Messy Figma making you look bad", "Personal files visible in reviews", "Time wasted organizing tabs"],
    stat: "62% of creatives feel anxiety sharing live mockups",
    fact: "Designers spend 15 min daily on cleanup",
    cta: "Blur It keeps focus on your creativity."
  },
  {
    id: 'freelance',
    title: 'Freelancer',
    sub: 'Client work, screen shares',
    icon: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    pains: ["Client sees competitor work", "Revealing your rates to others", "Personal messages popping up", "Disorganization losing trust", "Wasted prep time for meetings"],
    stat: "First impressions are made in under 7 seconds",
    fact: "Consultants lose 3 hours weekly to screen-prep",
    cta: "Blur It builds immediate professional trust."
  },
  {
    id: 'other',
    title: 'Other',
    sub: 'General browsing',
    icon: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    pains: ["Exposing passwords/emails", "Looking unprofessional", "Wasting time hiding info", "Security/compliance risks", "General privacy anxiety"],
    stat: "Exposed data incidents increased by 40% last year",
    fact: "Security is no longer optional online",
    cta: "Blur It is your first line of defense."
  }
];

export const IntroModal: React.FC<IntroModalProps> = ({ isOpen, onClose, onStartTutorial }) => {
  const [step, setStep] = useState<Step>('welcome');
  const [selectedRole, setSelectedRole] = useState<RoleContent | null>(null);

  if (!isOpen) return null;

  const Icons = {
    ArrowRight: (c: string) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>,
    ArrowLeft: (c: string) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
    Shield: (c: string) => <svg className={c} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.5c-4.142 0-7.5-3.358-7.5-7.5 0-4.142 7.5-11.75 7.5-11.75s7.5 7.608 7.5 11.75c0 4.142-3.358 7.5-7.5 7.5z" /></svg>,
    Check: (c: string) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>,
  };

  const renderWelcome = () => (
    <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto py-2">
      <div className="w-16 h-16 bg-blue-600 rounded-[24px] flex items-center justify-center shadow-xl shadow-blue-500/30 mb-6">
        {Icons.Shield("w-8 h-8 text-white")}
      </div>
      <h2 className="text-3xl font-black text-slate-100 mb-3 tracking-tight">Welcome to Blur It!</h2>
      <p className="text-slate-400 text-base mb-8 leading-relaxed max-w-sm">
        Help us personalize your experience (takes 20 seconds).
      </p>
      <div className="w-full space-y-2 max-w-[280px]">
        <button 
          onClick={() => setStep('role')}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
        >
          Let's Go {Icons.ArrowRight("w-5 h-5")}
        </button>
        <button onClick={onClose} className="w-full py-2 text-slate-500 font-bold hover:text-slate-300 transition-colors text-sm">
          Skip to demo
        </button>
      </div>
    </div>
  );

  const renderRoleSelection = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-black text-slate-100 tracking-tight">Who are you?</h2>
        <span className="text-slate-500 text-[9px] font-black bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700 uppercase tracking-widest">1 / 3</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-5 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
        {ROLES.map((role) => (
          <button
            key={role.id}
            onClick={() => { setSelectedRole(role); setStep('pain'); }}
            className="group flex flex-col items-start gap-2.5 p-4 rounded-xl border-2 bg-slate-800/40 border-slate-700/50 hover:border-blue-500 hover:bg-slate-800 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-700 bg-slate-800 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all flex-shrink-0">
              {role.icon("w-6 h-6")}
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-200 group-hover:text-blue-400 transition-colors mb-0.5">{role.title}</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-tight">{role.sub}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-slate-800 pt-5">
        <button onClick={() => setStep('welcome')} className="text-slate-500 hover:text-white flex items-center gap-1.5 transition-colors font-black text-sm">
          {Icons.ArrowLeft("w-3.5 h-3.5")} Back
        </button>
        <button onClick={onClose} className="text-slate-500 hover:text-white font-black text-sm">Skip</button>
      </div>
    </div>
  );

  const renderPainPoints = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-black text-slate-100 leading-tight">What worries you most?</h2>
        <span className="text-slate-500 text-[9px] font-black bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700 uppercase tracking-widest">2 / 3</span>
      </div>
      <div className="space-y-2 mb-5">
        {selectedRole?.pains.map((pain, i) => (
          <button
            key={i}
            onClick={() => setStep('consequence')}
            className="w-full p-3.5 text-left rounded-xl border bg-slate-800/40 border-slate-700/50 hover:border-blue-500 hover:bg-slate-800 transition-all group flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors flex-shrink-0"></div>
            <span className="text-sm text-slate-300 font-bold group-hover:text-slate-100 leading-tight">{pain}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-slate-800 pt-5">
        <button onClick={() => setStep('role')} className="text-slate-500 hover:text-white flex items-center gap-1.5 transition-colors font-black text-sm">
          {Icons.ArrowLeft("w-3.5 h-3.5")} Back
        </button>
        <button onClick={onClose} className="text-slate-500 hover:text-white font-black text-sm">Skip</button>
      </div>
    </div>
  );

  const renderConsequence = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-black text-slate-100 tracking-tight">You're in good company.</h2>
        <span className="text-slate-500 text-[9px] font-black bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700 uppercase tracking-widest">3 / 3</span>
      </div>
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 mb-6 space-y-4 relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Industry Stat</p>
            <p className="text-sm text-slate-200 font-black leading-tight">{selectedRole?.stat}</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Efficiency Loss</p>
            <p className="text-sm text-slate-200 font-black leading-tight">{selectedRole?.fact}</p>
          </div>
        </div>
        <div className="bg-blue-600/20 p-4 rounded-xl border border-blue-500/30 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
            {Icons.Check("w-4 h-4")}
          </div>
          <p className="text-base text-blue-100 font-black leading-tight">{selectedRole?.cta}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setStep('tutorial_intro')}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 text-xl"
        >
          Try It Now {Icons.ArrowRight("w-6 h-6")}
        </button>
        <button onClick={() => setStep('pain')} className="text-slate-500 hover:text-white flex items-center justify-center gap-1.5 transition-colors font-bold text-xs">
          {Icons.ArrowLeft("w-3 h-3")} Back
        </button>
      </div>
    </div>
  );

  const renderTutorialIntro = () => (
    <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-black text-slate-100 mb-5 tracking-tight">Setup Instructions</h2>
      <div className="space-y-3 mb-6 w-full max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
          <p className="text-base text-slate-300 leading-relaxed font-bold">
            Toggle the <span className="text-blue-500 underline underline-offset-4">blue knob</span> on the left of your tab to show the toolbar.
          </p>
        </div>
        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
          <ul className="text-sm text-slate-300 space-y-3 font-bold">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-black">1</span>
              <span><strong>Exit Select:</strong> Press <strong>Esc</strong> key after blurring.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-black">2</span>
              <span><strong>Stop Drawing:</strong> Re-click the square icon.</span>
            </li>
          </ul>
        </div>
      </div>
      <button 
        onClick={onStartTutorial}
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 text-xl"
      >
        Start Practice {Icons.ArrowRight("w-6 h-6")}
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl">
      <div className="bg-slate-900 border-2 border-slate-800/80 rounded-[36px] shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col animate-in zoom-in-95 duration-500 max-h-[85vh]">
        <div className="p-7 md:p-10 overflow-y-auto custom-scrollbar">
          {step === 'welcome' && renderWelcome()}
          {step === 'role' && renderRoleSelection()}
          {step === 'pain' && renderPainPoints()}
          {step === 'consequence' && renderConsequence()}
          {step === 'tutorial_intro' && renderTutorialIntro()}
        </div>
      </div>
    </div>
  );
};