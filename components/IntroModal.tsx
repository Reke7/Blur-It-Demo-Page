import React, { useState, useMemo } from 'react';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'welcome' | 'role' | 'pain' | 'consequence';
type Role = 'sales' | 'dev' | 'edu' | 'exec' | 'design' | 'freelance' | 'other';

export const IntroModal: React.FC<IntroModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('welcome');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPain, setSelectedPain] = useState<number | null>(null);

  if (!isOpen) return null;

  const roles = [
    { id: 'sales', title: 'Sales/Marketing', sub: 'Demos, client calls, pitches', icon: '💼' },
    { id: 'dev', title: 'Developer/Engineer', sub: 'Code reviews, pair programming', icon: '👨‍💻' },
    { id: 'edu', title: 'Educator/Trainer', sub: 'Teaching, tutorials, courses', icon: '🎓' },
    { id: 'exec', title: 'Executive/Manager', sub: 'Team meetings, presentations', icon: '👔' },
    { id: 'design', title: 'Designer/Creator', sub: 'Portfolio reviews, feedback', icon: '🎨' },
    { id: 'freelance', title: 'Freelancer/Consultant', sub: 'Client work, screen shares', icon: '💻' },
    { id: 'other', title: 'Other/Just Browsing', sub: 'General usage', icon: '🤷' },
  ];

  const painPointsMap: Record<Role, { q: string, points: string[] }> = {
    sales: {
      q: 'As a Sales/Marketing professional, what worries you most?',
      points: [
        'Accidentally showing competitor research or pricing',
        'Client sees personal emails or Slack messages',
        'Revealing internal revenue/sales data',
        'Looking disorganized during high-stakes demos',
        'Wasting 15+ min prepping before every client call'
      ]
    },
    dev: {
      q: "As a Developer, what's your biggest screen-sharing fear?",
      points: [
        'Exposing API keys, tokens, or credentials',
        'Showing proprietary code or architecture',
        'Accidentally revealing .env files or configs',
        'Looking unprofessional with messy terminal history',
        'Time wasted sanitizing screens before pair programming'
      ]
    },
    edu: {
      q: 'As an Educator, what concerns you during screen shares?',
      points: [
        'Students seeing your personal emails or notifications',
        'Accidentally showing financial/payment info',
        'Looking unprepared with cluttered desktop',
        'Privacy concerns with student data visible',
        'Prepping clean screens for every single lesson'
      ]
    },
    exec: {
      q: "As a Leader, what's your top concern?",
      points: [
        'Exposing sensitive financial/strategic data',
        'Showing confidential employee or company info',
        'Looking disorganized in front of board/executives',
        'Compliance violations (GDPR, HIPAA, SOC2)',
        'Personal notifications interrupting important meetings'
      ]
    },
    design: {
      q: 'As a Designer/Creator, what worries you most?',
      points: [
        'Showing unfinished work or client projects',
        'Revealing pricing or contract details',
        'Messy Figma/desktop making you look unprofessional',
        'Personal files or tabs visible during portfolio reviews',
        'Organizing screens before every client call'
      ]
    },
    freelance: {
      q: "As a Freelancer/Consultant, what's your biggest fear?",
      points: [
        'Client sees you\'re working with their competitors',
        'Accidentally revealing your rates or other client info',
        'Personal messages popping up during professional calls',
        'Looking disorganized = losing client trust',
        'Time wasted prepping for every single client meeting'
      ]
    },
    other: {
      q: "What's your biggest fear when sharing your screen?",
      points: [
        'Exposing passwords, emails, or financial data',
        'Looking unprofessional in front of others',
        'Wasting time manually hiding info',
        'Security or compliance violations',
        'All of the above'
      ]
    }
  };

  const consequencesMap: Record<Role, { quote: string, author: string, stat: string, time: string }> = {
    sales: {
      quote: "I accidentally showed our competitor pricing doc during a demo. The deal fell apart.",
      author: "Sarah M., Enterprise Sales",
      stat: "73% of sales reps worry about exposing confidential info during demos",
      time: "20 min per client call"
    },
    dev: {
      quote: "Exposed my AWS keys in a demo. Cost the company $8,000 in fraudulent charges.",
      author: "Mike T., Senior Dev",
      stat: "GitHub removes 5+ million exposed secrets annually",
      time: "15+ min per code review"
    },
    edu: {
      quote: "A student screenshot my screen with another student's grades visible. FERPA violation.",
      author: "Prof. James L.",
      stat: "Privacy violations can cost educators their jobs",
      time: "Clean screens for every lesson"
    },
    exec: {
      quote: "Internal salary data flickered on screen for 2 seconds. The slack channel exploded.",
      author: "David R., VP Ops",
      stat: "Compliance fines (GDPR/HIPAA) average $4.2M per leak",
      time: "Constant anxiety in board meetings"
    },
    design: {
      quote: "Shared a moodboard but a browser tab with another client's invoice was visible.",
      author: "Lena K., Art Director",
      stat: "85% of creatives value professional presentation as a top priority",
      time: "Pre-session desktop cleanup"
    },
    freelance: {
      quote: "A prospective client saw a competing agency's contract in my open tabs. I lost the pitch.",
      author: "Mark S., Growth Consultant",
      stat: "Trust takes years to build and seconds to lose",
      time: "Pre-meeting browser sanitization"
    },
    other: {
      quote: "I was showing a recipe and my bank balance popped up in a notification. Embarrassing.",
      author: "Jordan W.",
      stat: "Digital privacy is a basic human right",
      time: "Manual data masking"
    }
  };

  const IconMap: Record<string, React.ReactNode> = {
    sales: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z" /></svg>,
    dev: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    edu: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>,
    exec: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    design: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    freelance: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    other: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    shield: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.75c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" /></svg>,
    alert: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    clock: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  };

  const currentPainData = selectedRole ? painPointsMap[selectedRole] : null;
  const currentConsequence = selectedRole ? consequencesMap[selectedRole] : null;

  const renderWelcome = () => (
    <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 mb-8">
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Welcome to Blur It!</h2>
      <p className="text-slate-400 text-lg mb-12 max-w-md leading-relaxed">
        Before you try the demo, help us personalize your experience (takes 20 seconds).
      </p>
      <div className="w-full space-y-4">
        <button 
          onClick={() => setStep('role')}
          className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-3"
        >
          Let's Go
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
        <button onClick={onClose} className="w-full py-4 text-slate-500 font-medium hover:text-slate-300 transition-colors">
          Skip to demo
        </button>
      </div>
    </div>
  );

  const renderRoleSelection = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">First, tell us who you are:</h2>
        <span className="text-slate-500 text-sm font-bold bg-slate-800 px-3 py-1 rounded-full border border-slate-700">1 of 3</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => { setSelectedRole(role.id as Role); setStep('pain'); }}
            className="group relative flex items-start gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-500 hover:bg-slate-800 transition-all text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-800 group-hover:bg-blue-600/20 flex items-center justify-center text-slate-400 group-hover:text-blue-400 border border-slate-700 transition-all">
              {IconMap[role.id]}
            </div>
            <div>
              <h4 className="font-bold text-white group-hover:text-blue-400">{role.title}</h4>
              <p className="text-xs text-slate-500 leading-tight mt-1">{role.sub}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-slate-800 pt-6">
        <button onClick={() => setStep('welcome')} className="text-slate-500 hover:text-white flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back
        </button>
        <button onClick={() => setStep('pain')} className="text-slate-400 hover:text-white font-medium">Skip</button>
      </div>
    </div>
  );

  const renderPainPointSelection = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white max-w-sm leading-tight">
          {currentPainData?.q || 'What concerns you most?'}
        </h2>
        <span className="text-slate-500 text-sm font-bold bg-slate-800 px-3 py-1 rounded-full border border-slate-700">2 of 3</span>
      </div>
      <div className="space-y-3 mb-8">
        {currentPainData?.points.map((point, idx) => (
          <button
            key={idx}
            onClick={() => { setSelectedPain(idx); setStep('consequence'); }}
            className={`w-full p-5 text-left rounded-2xl border transition-all duration-200 flex items-center gap-4 ${
              selectedPain === idx 
                ? 'bg-blue-600/10 border-blue-500 ring-1 ring-blue-500' 
                : 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPain === idx ? 'bg-blue-600 border-blue-600' : 'border-slate-700'}`}>
              {selectedPain === idx && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className={`text-sm font-medium ${selectedPain === idx ? 'text-white' : 'text-slate-300'}`}>{point}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-slate-800 pt-6">
        <button onClick={() => setStep('role')} className="text-slate-500 hover:text-white flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back
        </button>
        <button onClick={() => setStep('consequence')} className="text-slate-400 hover:text-white font-medium">Skip</button>
      </div>
    </div>
  );

  const renderConsequence = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">You're not alone.</h2>
        <span className="text-slate-500 text-sm font-bold bg-slate-800 px-3 py-1 rounded-full border border-slate-700">3 of 3</span>
      </div>
      
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-8 mb-8 relative overflow-hidden group">
        <div className="absolute top-4 right-4 text-blue-500/20 group-hover:text-blue-500/30 transition-colors">
          <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.34315 15.3602 2 17.017 2H21.017C22.6739 2 24.017 3.34315 24.017 5V15C24.017 18.3137 21.3307 21 18.017 21H14.017ZM0 21L0 18C0 16.8954 0.89543 16 2 16H5C5.55228 16 6 15.5523 6 15V9C6 8.44772 5.55228 8 5 8H2C0.89543 8 0 7.10457 0 6V5C0 3.34315 1.34315 2 3 2H7C8.65685 2 10 3.34315 10 5V15C10 18.3137 7.31371 21 4 21H0Z" /></svg>
        </div>
        <p className="text-lg italic text-slate-200 mb-6 leading-relaxed relative z-10">
          "{currentConsequence?.quote}"
        </p>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-blue-400 uppercase tracking-tighter">
            {currentConsequence?.author.charAt(0)}
          </div>
          <span className="text-sm font-bold text-white">— {currentConsequence?.author}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-4">
          <div className="text-amber-400">{IconMap.alert}</div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Reality Check</p>
            <p className="text-sm text-slate-300 font-medium">{currentConsequence?.stat}</p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-4">
          <div className="text-blue-400">{IconMap.clock}</div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Time Sink</p>
            <p className="text-sm text-slate-300 font-medium">Pre-session: {currentConsequence?.time}</p>
          </div>
        </div>
      </div>

      <p className="text-center text-slate-400 mb-6 font-medium">Blur It eliminates this anxiety in 2 clicks.</p>

      <button
        onClick={onClose}
        className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-3 group"
      >
        Try It Now
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
      </button>

      <div className="flex items-center justify-center mt-6">
        <button onClick={() => setStep('pain')} className="text-slate-500 hover:text-white flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md transition-all duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[95vh]">
        
        {/* Progress Header */}
        <div className="h-1.5 w-full bg-slate-800">
          <div 
            className="h-full bg-blue-600 transition-all duration-700" 
            style={{ 
              width: step === 'welcome' ? '0%' : 
                     step === 'role' ? '33%' : 
                     step === 'pain' ? '66%' : '100%' 
            }}
          ></div>
        </div>

        <div className="p-8 md:p-12 overflow-y-auto">
          {step === 'welcome' && renderWelcome()}
          {step === 'role' && renderRoleSelection()}
          {step === 'pain' && renderPainPointSelection()}
          {step === 'consequence' && renderConsequence()}
        </div>

        <div className="bg-slate-800/50 px-8 py-4 flex items-center justify-center border-t border-slate-800">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="text-blue-500">{IconMap.shield}</span>
            Trusted by 4,000+ Enterprise Demo Specialists
          </p>
        </div>
      </div>
    </div>
  );
};