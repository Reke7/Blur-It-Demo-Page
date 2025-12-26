import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { InstructionBanner } from './components/InstructionBanner';
import { MetricGrid } from './components/MetricGrid';
import { DataTable } from './components/DataTable';
import { CTAToast } from './components/CTAToast';
import { IntroModal } from './components/IntroModal';
import { TutorialSystem } from './components/TutorialSystem';

const App: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(true);
  const [isTutorialActive, setIsTutorialActive] = useState(false);

  useEffect(() => {
    const tutorialComplete = localStorage.getItem('blur-it-tutorial-complete');
    if (tutorialComplete === 'true') {
      setIsIntroOpen(false);
    }

    const timer = setTimeout(() => setShowToast(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleStartTutorial = () => {
    setIsIntroOpen(false);
    setIsTutorialActive(true);
  };

  return (
    <div className="flex min-h-screen text-slate-50 relative selection:bg-blue-500/30">
      {/* Introduction Modal & Tutorial */}
      <IntroModal 
        isOpen={isIntroOpen} 
        onClose={() => setIsIntroOpen(false)} 
        onStartTutorial={handleStartTutorial} 
      />
      
      <TutorialSystem 
        isActive={isTutorialActive} 
        onComplete={() => setIsTutorialActive(false)} 
      />

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col relative z-10">
        {/* Instruction Banner */}
        <InstructionBanner />

        {/* Sticky Header */}
        <Header />

        <main className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              Platform Performance Overview
            </h2>
            <MetricGrid />
          </section>

          <section className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 transition-all hover:border-slate-700/60">
            <div className="p-6 border-b border-slate-800/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/20">
              <div>
                <h2 className="text-lg font-semibold text-white">Sensitive Financial Data</h2>
                <p className="text-slate-400 text-sm">Direct API access logs and revenue streams for primary accounts.</p>
              </div>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-semibold border border-slate-700 transition-all text-slate-200">
                Export CSV
              </button>
            </div>
            {/* Dense Data Table */}
            <DataTable />
          </section>

          <div className="h-48"></div>
        </main>
      </div>

      {/* Conversion Element - Floating CTA */}
      <CTAToast isVisible={showToast} />
    </div>
  );
};

export default App;