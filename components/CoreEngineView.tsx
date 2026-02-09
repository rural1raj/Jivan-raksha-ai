
import React from 'react';
import { Cpu, Zap, Layers, Activity, Binary, BrainCircuit, ArrowLeft } from 'lucide-react';

export const CoreEngineView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const models = [
    {
      name: 'YOLOv8 Ensemble',
      type: 'Computer Vision',
      purpose: 'Real-time localization and bounding box regression for species identification.',
      stats: '45 FPS • 99.2% mAP'
    },
    {
      name: 'EfficientNet-B7',
      type: 'Feature Extraction',
      purpose: 'High-resolution physiological analysis for wound detection and disease classification.',
      stats: '600M params • SOTA accuracy'
    },
    {
      name: 'PPO-RL Agent',
      type: 'Decision Making',
      purpose: 'Reinforcement learning agent optimizing the policy for autonomous rescue dispatch.',
      stats: '0.89 Mean Reward'
    },
    {
      name: 'ViT Semantic Layer',
      type: 'Deep Learning',
      purpose: 'Vision Transformer for holistic environmental and behavioral context understanding.',
      stats: 'Attention-based inference'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-3 glass-panel rounded-2xl text-gray-400 hover:text-white"><ArrowLeft className="w-6 h-6" /></button>
        <h2 className="text-2xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
          <Cpu className="w-8 h-8 text-blue-400" /> Core AI Engine
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map((model, i) => (
          <div key={i} className="glass-panel p-6 rounded-3xl border-l-4 border-blue-500/50 hover:bg-blue-500/5 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl"><Layers className="w-6 h-6" /></div>
              <span className="text-[10px] mono text-blue-500 font-bold bg-blue-500/10 px-2 py-1 rounded">{model.stats}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
            <p className="text-xs text-blue-400 uppercase font-bold tracking-widest mb-3">{model.type}</p>
            <p className="text-sm text-gray-400 leading-relaxed">{model.purpose}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-[2.5rem] bg-gradient-to-r from-blue-900/20 to-transparent border-blue-500/20">
        <h3 className="text-lg font-black text-white uppercase mb-6 flex items-center gap-3">
          <BrainCircuit className="w-6 h-6 text-purple-400" /> Inference Pipeline
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 p-4 bg-white/5 rounded-2xl text-center border border-white/10">
            <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">Input</p>
            <p className="text-sm font-bold text-white">4K Raw Stream</p>
          </div>
          <Zap className="w-5 h-5 text-blue-500 animate-pulse hidden md:block" />
          <div className="flex-1 p-4 bg-blue-500/20 rounded-2xl text-center border border-blue-500/30">
            <p className="text-[10px] text-blue-400 font-bold uppercase mb-2">Processor</p>
            <p className="text-sm font-bold text-white">Neural Ensemble</p>
          </div>
          <Zap className="w-5 h-5 text-blue-500 animate-pulse hidden md:block" />
          <div className="flex-1 p-4 bg-white/5 rounded-2xl text-center border border-white/10">
            <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">Output</p>
            <p className="text-sm font-bold text-white">Actionable Triage</p>
          </div>
        </div>
      </div>
    </div>
  );
};
