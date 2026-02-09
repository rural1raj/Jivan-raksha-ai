
import React from 'react';
import { Settings, Globe, Shield, Info, Bell, Trash2, Heart, ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export const SettingsView: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-3 glass-panel rounded-2xl text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-black text-white tracking-tighter uppercase">APP CONFIG</h2>
      </div>

      <div className="space-y-4">
        <section className="glass-panel rounded-3xl p-6">
          <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Localization
          </h3>
          <div className="flex gap-2">
            <button className="flex-1 py-3 bg-white text-black font-bold rounded-xl text-sm">ENGLISH</button>
            <button className="flex-1 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm">HINDI</button>
          </div>
        </section>

        <section className="glass-panel rounded-3xl p-6">
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4" /> Emergency Alerts
          </h3>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
            <div>
              <p className="text-sm font-bold text-white uppercase">Auto-Dispatch Alert</p>
              <p className="text-[10px] text-gray-500">Send rescue signal immediately for critical cases</p>
            </div>
            <div className="w-12 h-6 bg-blue-500 rounded-full flex items-center px-1">
              <div className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></div>
            </div>
          </div>
        </section>

        <section className="glass-panel rounded-3xl p-6">
          <h3 className="text-xs font-black text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Medical Disclaimer
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed italic">
            VET-AI Guardian is an assistive diagnostic tool designed for triage and rapid intervention. It does not replace the expertise of a licensed veterinarian. All diagnoses are high-probability estimations based on training data.
          </p>
        </section>

        <section className="glass-panel rounded-3xl p-6">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Info className="w-4 h-4" /> About the System
          </h3>
          <div className="space-y-2 text-xs text-gray-400">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span>Core Engine</span>
              <span className="text-white font-mono">VET_AI_GUARDIAN_v4.5</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span>Models</span>
              <span className="text-white font-mono">YOLOv8 + EFNET_B7 + PPO_RL</span>
            </div>
          </div>
        </section>

        <button className="w-full py-4 glass-panel border-red-500/20 text-red-500 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-500/10 transition-colors">
          <Trash2 className="w-4 h-4" />
          Clear All Historical Data
        </button>
      </div>

      <div className="text-center py-6">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest flex items-center justify-center gap-2">
          Made with <Heart className="w-3 h-3 text-red-500" /> for Animal Welfare
        </p>
      </div>
    </div>
  );
};
