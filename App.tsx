
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { InstructionBanner } from './components/InstructionBanner';
import { MetricGrid } from './components/MetricGrid';
import { DataTable } from './components/DataTable';
import { CTAToast } from './components/CTAToast';
import { IntroModal } from './components/IntroModal';

const App: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      {/* Introduction Modal */}
      <IntroModal isOpen={isIntroOpen} onClose={() => setIsIntroOpen(false)} />

      {/* Fixed Sidebar - Testing blurs against static elements while page scrolls */}
      <Sidebar />

      {/* Main Content Area - Significant padding-left to account for fixed sidebar */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Instruction Banner - Fixed/Sticky atop everything else */}
        <InstructionBanner />

        {/* Sticky Header - Crucial for testing blur drift during vertical scroll */}
        <Header />

        <main className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              Platform Performance Overview
            </h2>
            <MetricGrid />
          </section>

          <section className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Sensitive Financial Data</h2>
                <p className="text-slate-400 text-sm">Direct API access logs and revenue streams.</p>
              </div>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">
                Export CSV
              </button>
            </div>
            {/* Dense Data Table - High target count for blurring */}
            <DataTable />
          </section>

          {/* Spacer to allow plenty of scrolling for the stress test */}
          <div className="h-48"></div>
        </main>
      </div>

      {/* Conversion Element - Floating CTA */}
      <CTAToast isVisible={showToast} />
    </div>
  );
};

export default App;
