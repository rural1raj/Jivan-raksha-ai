
import React from 'react';
import { AnalysisResult, Severity } from '../types';
import { Clock, ChevronRight, ArrowLeft } from 'lucide-react';

interface Props {
  history: AnalysisResult[];
  onSelect: (result: AnalysisResult) => void;
  onBack: () => void;
}

export const HistoryView: React.FC<Props> = ({ history, onSelect, onBack }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-3 glass-panel rounded-2xl text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-black text-white tracking-tighter uppercase">CASE LOGS</h2>
      </div>

      {history.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-gray-500">No cases recorded yet. Your animal health scan history will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {history.map((item) => (
            <button 
              key={item.id}
              onClick={() => onSelect(item)}
              className="glass-panel p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black ${
                  item.severity === Severity.CRITICAL ? 'bg-red-500/20 text-red-500' :
                  item.severity === Severity.INJURED ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'
                }`}>
                  {item.species.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-tight">{item.species}</h4>
                  <p className="text-[10px] text-gray-500 mono flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleDateString()} — {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <p className="text-[10px] text-gray-600 font-bold uppercase">{item.diseaseOrInjuryName}</p>
                  <p className="text-[10px] text-blue-500 font-mono">CONF: {(item.overallConfidenceScore * 100).toFixed(0)}%</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-blue-500 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
