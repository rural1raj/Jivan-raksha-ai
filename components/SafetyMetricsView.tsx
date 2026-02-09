
import React from 'react';
import { ShieldCheck, Heart, AlertTriangle, CheckCircle, ArrowLeft, BarChart3 } from 'lucide-react';

export const SafetyMetricsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const metrics = [
    { label: 'Rescue Success Rate', value: '94.2%', icon: Heart, color: 'text-rose-400' },
    { label: 'Decision Confidence', value: '98.5%', icon: CheckCircle, color: 'text-emerald-400' },
    { label: 'False Alert Rate', value: '< 0.8%', icon: AlertTriangle, color: 'text-amber-400' },
    { label: 'Triage Efficiency', value: '+320%', icon: BarChart3, color: 'text-blue-400' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-3 glass-panel rounded-2xl text-gray-400 hover:text-white"><ArrowLeft className="w-6 h-6" /></button>
        <h2 className="text-2xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400" /> Operational Safety
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="glass-panel p-6 rounded-3xl text-center space-y-2">
            <m.icon className={`w-8 h-8 mx-auto mb-2 ${m.color}`} />
            <p className="text-2xl font-black text-white">{m.value}</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-[2.5rem] border-emerald-500/20 bg-emerald-500/5">
        <h3 className="text-lg font-black text-white uppercase mb-4">Ethical AI Framework</h3>
        <ul className="space-y-4 text-sm text-gray-400">
          <li className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">1</div>
            <p><strong>Transparency:</strong> Every diagnostic result includes an XAI (Explainable AI) trace detailing which visual features triggered the decision.</p>
          </li>
          <li className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">2</div>
            <p><strong>Privacy:</strong> All human faces detected in the stream are automatically blurred locally before inference processing.</p>
          </li>
          <li className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">3</div>
            <p><strong>Non-Invasive:</strong> Our algorithms prioritize behavioral observation over physical intervention whenever possible.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
