
import React from 'react';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntroModal: React.FC<IntroModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const features = [
    {
      title: '🎯 Select Mode',
      description: 'The easiest way to hide content. Just hover over any text, image, or paragraph and click to instantly blur it.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      )
    },
    {
      title: '✏️ Draw Mode',
      description: 'Need a custom shape? Click and drag to draw a box anywhere on the screen to cover exactly what you need.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: '⚡ Smart Blur',
      description: 'Instantly detect and hide sensitive info like emails, credit card numbers, and amounts with one single click.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: '🎨 Blur vs. Redact',
      description: 'Switch between the "Frosted Glass" look or "Solid Black" redaction using the toggle in the toolbar.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: '💾 Auto-Save',
      description: 'We remember your blurs even if you refresh the page. Your setup is persistent and ready for your next demo.',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[90vh]">
        <div className="p-6 md:p-10 overflow-y-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none">The Privacy Powerhouse</h2>
              <p className="text-slate-400 text-sm mt-1">Master the features of Blur It to protect your demos.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group p-4 rounded-2xl bg-slate-800/30 border border-slate-800 hover:border-blue-500/50 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-blue-400 border border-slate-700 mb-3 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-slate-100 mb-1">{feature.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-600/10 rounded-2xl p-5 border border-blue-500/20">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quick Control Guide
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-slate-800 rounded text-blue-400 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.297A8.609 8.609 0 0113.5 15h.875a1.875 1.875 0 110 3.75H14a1.875 1.875 0 110-3.75h.875A3.375 3.375 0 0118 18.375V19a1 1 0 01-1 1H7a1 1 0 01-1-1v-5.375a3.375 3.375 0 013.375-3.375H10a1.875 1.875 0 110 3.75h-.875a1.875 1.875 0 110-3.75H10a8.609 8.609 0 012.5 4.297V5.882a1 1 0 01.447-.894l2-1A1 1 0 0116 4.882V5h1a1 1 0 011 1v1h-4V5.882z" />
                  </svg>
                </div>
                <p>Features appear as primary buttons inside the <b>Extension Popup</b>.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-slate-800 rounded text-blue-400 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>
                </div>
                <p>Access active tools instantly via the <b>Draggable Toolbar</b> on the right side of the page.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-700">
          <p className="text-xs text-slate-500 font-medium text-center sm:text-left">Use the dashboard below to test persistency while scrolling.</p>
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
          >
            Got it, Let's Go!
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
