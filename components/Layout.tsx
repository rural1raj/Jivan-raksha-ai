
import React from 'react';
import { NavigationTab } from '../types';

interface Props {
  children: React.ReactNode;
  onNavigate: (tab: NavigationTab) => void;
  activeTab: NavigationTab;
}

export const Layout: React.FC<Props> = ({ children, onNavigate, activeTab }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass-panel py-4 px-6 flex flex-col md:flex-row items-center justify-between border-b border-white/10 gap-4">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate(NavigationTab.DASHBOARD)}
        >
          <div className="w-10 h-10 ai-gradient rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">VET-AI <span className="text-blue-400">GUARDIAN</span></h1>
            <p className="text-[10px] mono text-gray-400 uppercase tracking-widest">Autonomous Rescue Intelligence</p>
          </div>
        </div>
        <nav className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar w-full md:w-auto">
          {[
            { id: NavigationTab.CORE_ENGINE, label: 'Core Engine' },
            { id: NavigationTab.SAFETY_METRICS, label: 'Safety Metrics' },
            { id: NavigationTab.NGO_DASHBOARD, label: 'NGO Dashboard' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTab === item.id ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {children}
      </main>
      <footer className="py-6 px-6 border-t border-white/5 text-center">
        <p className="text-gray-500 text-xs">
          VET-AI System v4.6.2 • Deploying ethical rescue protocols worldwide.
        </p>
      </footer>
    </div>
  );
};
