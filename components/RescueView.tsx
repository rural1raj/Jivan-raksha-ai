
import React from 'react';
import { AnalysisResult, Severity } from '../types';
import { MapPin, Phone, MessageSquare, AlertCircle, CheckCircle, Navigation, ArrowLeft } from 'lucide-react';

interface Props {
  latestResult: AnalysisResult | null;
  onBack: () => void;
}

export const RescueView: React.FC<Props> = ({ latestResult, onBack }) => {
  const isCritical = latestResult?.severity === Severity.CRITICAL;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-3 glass-panel rounded-2xl text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase">RESCUE OPS</h2>
          <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${isCritical ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-800 text-gray-400'}`}>
            {isCritical ? 'ACTIVE_EMERGENCY' : 'MONITORING_MODE'}
          </div>
        </div>
      </div>

      {!latestResult ? (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <MapPin className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-gray-500">No active cases to coordinate rescue. Use the Camera to scan an animal.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-6 border-l-4 border-blue-500">
              <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Case Overview</h3>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xl font-bold text-white">{latestResult.species}</p>
                  <p className="text-sm text-gray-400">{latestResult.diseaseOrInjuryName}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  latestResult.severity === Severity.CRITICAL ? 'bg-red-500/20 text-red-500' : 
                  latestResult.severity === Severity.INJURED ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'
                }`}>
                  {latestResult.severity}
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-xl text-xs text-gray-400 font-mono">
                LAST_LOC: {latestResult.location ? `${latestResult.location.latitude.toFixed(4)}, ${latestResult.location.longitude.toFixed(4)}` : 'UNKNOWN'}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6">
              <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-4">Rescue Status</h3>
              <div className="space-y-4">
                {[
                  { label: 'Inference Voting', status: 'COMPLETED', done: true },
                  { label: 'Dispatch Alert', status: isCritical ? 'SENT' : 'NOT_REQUIRED', done: isCritical },
                  { label: 'NGO Acceptance', status: isCritical ? 'PENDING' : 'N/A', done: false },
                  { label: 'On-Site Status', status: 'STANDBY', done: false }
                ].map((step, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${step.done ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gray-700'}`}></div>
                      <span className="text-sm font-medium text-gray-300">{step.label}</span>
                    </div>
                    <span className={`text-[10px] mono font-bold ${step.done ? 'text-emerald-400' : 'text-gray-600'}`}>{step.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 bg-blue-500/5 border-blue-500/20">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center justify-between">
              Nearest Authority
              <Navigation className="w-4 h-4 text-blue-400" />
            </h3>
            
            <div className="space-y-6">
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                   <AlertCircle className="w-6 h-6 text-blue-400" />
                 </div>
                 <div>
                   <h4 className="text-lg font-bold text-white">{latestResult.nearestAuthority || 'Coordinating Dispatch...'}</h4>
                   <p className="text-sm text-gray-500">Identified via Neural Spatial Search</p>
                 </div>
               </div>

               {isCritical && (
                 <div className="grid grid-cols-3 gap-2">
                   <button className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                     <Phone className="w-5 h-5 text-emerald-400" />
                     <span className="text-[10px] font-bold text-gray-400">CALL</span>
                   </button>
                   <button className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                     <MessageSquare className="w-5 h-5 text-blue-400" />
                     <span className="text-[10px] font-bold text-gray-400">ALERT</span>
                   </button>
                   <button className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                     <Navigation className="w-5 h-5 text-purple-400" />
                     <span className="text-[10px] font-bold text-gray-400">MAP</span>
                   </button>
                 </div>
               )}

               <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex gap-3">
                 <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                 <p className="text-xs text-emerald-400 leading-tight">
                   The PPO-RL Agent has validated this dispatch protocol with {(latestResult.overallConfidenceScore * 100).toFixed(0)}% decision confidence.
                 </p>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
