
import React from 'react';
import { 
  Camera, 
  Image as ImageIcon, 
  MapPin, 
  Clock, 
  Settings, 
  ShieldAlert, 
  Activity, 
  ChevronRight,
  Zap,
  HeartPulse,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { NavigationTab, AnalysisResult, Severity } from '../types';

interface Props {
  onNavigate: (tab: NavigationTab) => void;
  latestResult: AnalysisResult | null;
  historyCount: number;
}

export const DashboardView: React.FC<Props> = ({ onNavigate, latestResult, historyCount }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-900 p-8 shadow-2xl shadow-blue-500/20">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest text-blue-200">
            <Zap className="w-3 h-3" /> System Online: v4.6.0
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight leading-none">
            Welcome to <br />
            <span className="text-blue-300">VET-AI Guardian</span>
          </h2>
          <p className="text-blue-100/70 text-sm max-w-[280px] leading-relaxed">
            Elite AI monitoring for wildlife protection and emergency roadside animal rescue.
          </p>
        </div>
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute right-8 top-8 opacity-20">
          <HeartPulse className="w-24 h-24 text-white" />
        </div>
      </div>

      {/* Main Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate(NavigationTab.CAMERA)}
          className="group relative h-48 glass-panel rounded-3xl p-6 flex flex-col justify-between hover:bg-blue-500/10 hover:border-blue-500/30 transition-all text-left overflow-hidden"
        >
          <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">Scan Animal</h3>
            <p className="text-[10px] text-gray-500 font-medium">REAL-TIME CV ANALYTICS</p>
          </div>
          <Zap className="absolute -right-4 -top-4 w-24 h-24 text-blue-500/5 group-hover:text-blue-500/10 transition-colors" />
        </button>

        <button 
          onClick={() => onNavigate(NavigationTab.CHAT)}
          className="group relative h-48 glass-panel rounded-3xl p-6 flex flex-col justify-between hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-left overflow-hidden"
        >
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">AI Expert</h3>
            <p className="text-[10px] text-gray-500 font-medium">24/7 VET CONSULTANT</p>
          </div>
          <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors" />
        </button>

        <button 
          onClick={() => onNavigate(NavigationTab.RESCUE)}
          className="group relative h-40 glass-panel rounded-3xl p-6 flex flex-col justify-between hover:bg-red-500/10 hover:border-red-500/30 transition-all text-left overflow-hidden col-span-2"
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-red-500/20 text-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            {latestResult?.severity === Severity.CRITICAL && (
              <div className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full animate-pulse">
                ACTIVE DISPATCH
              </div>
            )}
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Rescue Center</h3>
              <p className="text-[10px] text-gray-500 font-medium">NGO COORDINATION & TRACKING</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
          </div>
        </button>
      </div>

      {/* Quick Stats / History Snippet */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate(NavigationTab.HISTORY)}
          className="glass-panel rounded-3xl p-5 flex items-center gap-4 hover:bg-white/5 transition-colors group"
        >
          <div className="w-10 h-10 bg-white/5 text-gray-400 rounded-xl flex items-center justify-center group-hover:text-white transition-colors">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-xl font-bold text-white">{historyCount}</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase">Total Scans</p>
          </div>
        </button>

        <button 
          onClick={() => onNavigate(NavigationTab.SETTINGS)}
          className="glass-panel rounded-3xl p-5 flex items-center gap-4 hover:bg-white/5 transition-colors group"
        >
          <div className="w-10 h-10 bg-white/5 text-gray-400 rounded-xl flex items-center justify-center group-hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white uppercase">Settings</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase">Config</p>
          </div>
        </button>
      </div>

      {/* Media & Other quick access */}
      <button 
        onClick={() => onNavigate(NavigationTab.GALLERY)}
        className="w-full h-16 glass-panel rounded-3xl flex items-center justify-between px-6 hover:bg-white/5 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <ImageIcon className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-bold text-gray-300 tracking-wide uppercase">Media Library & Analysis</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-700 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Live Monitoring Summary */}
      {latestResult && (
        <div className="glass-panel rounded-[2.5rem] p-6 border-l-4 border-emerald-500 bg-emerald-500/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Activity className="w-4 h-4" />
              <h4 className="text-[10px] font-black uppercase tracking-widest">Latest Diagnostic Result</h4>
            </div>
            <span className="text-[10px] mono text-gray-500 uppercase">{new Date(latestResult.timestamp).toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center text-2xl font-black">
              {latestResult.species.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-white uppercase">{latestResult.species}</p>
              <p className="text-xs text-gray-400 line-clamp-1">{latestResult.diseaseOrInjuryName}</p>
            </div>
            <button 
              onClick={() => onNavigate(NavigationTab.REPORT)}
              className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <FileText className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const FileText: React.FC<any> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
