
import React from 'react';
import { AnalysisResult, Severity } from '../types';
import { 
  AlertTriangle, 
  Activity, 
  MapPin, 
  Stethoscope, 
  BrainCircuit, 
  ExternalLink,
  ShieldAlert,
  Dna,
  Binary,
  HeartPulse,
  Eye,
  Microscope,
  Camera,
  ArrowLeft,
  CheckCircle2,
  Info,
  Syringe,
  AlertCircle
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer
} from 'recharts';

interface Props {
  result: AnalysisResult;
  imageUrl: string;
  onBack: () => void;
}

export const AnalysisDashboard: React.FC<Props> = ({ result, imageUrl, onBack }) => {
  const radarData = [
    { subject: 'Supervised', A: result.mlModalityMetrics.supervisedClassification * 100 },
    { subject: 'Anomaly', A: result.mlModalityMetrics.unsupervisedAnomalyScore * 100 },
    { subject: 'RL Policy', A: result.mlModalityMetrics.rlAgentReward * 100 },
    { subject: 'ViT Semantic', A: result.mlModalityMetrics.vitSemanticScore * 100 },
    { subject: 'Confidence', A: result.overallConfidenceScore * 100 }
  ];

  const severityColor = {
    [Severity.HEALTHY]: 'text-green-400 bg-green-400/10 border-green-400/20',
    [Severity.INJURED]: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    [Severity.CRITICAL]: 'text-red-400 bg-red-400/10 border-red-400/20'
  }[result.severity];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-3 glass-panel rounded-2xl text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Comprehensive Pathology Report</h2>
          <p className="text-[10px] mono text-blue-400 font-bold uppercase tracking-widest">Medical ID: {result.id.slice(0, 8)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Image & Pathological Vitals */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel rounded-3xl overflow-hidden p-3 bg-black/40">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img src={imageUrl} alt="Animal" className="w-full h-full object-cover opacity-90" />
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-1.5 rounded-full text-xs font-black border flex items-center gap-2 shadow-xl backdrop-blur-md ${severityColor}`}>
                  {result.severity === Severity.CRITICAL && <ShieldAlert className="w-4 h-4 animate-pulse" />}
                  {result.severity}
                </span>
              </div>
              <div className="absolute inset-0 border-2 border-dashed border-white/5 pointer-events-none rounded-2xl">
                <div className="absolute top-2 right-2 text-[9px] mono bg-blue-600 text-white px-2 py-1 rounded shadow-lg uppercase font-bold">
                  SENSING: {result.species}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Microscope className="w-5 h-5" />
              <h3 className="font-bold text-xs uppercase tracking-widest">Symptomatic Profile</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.medicalDetails.detectedSymptoms.map((symptom, idx) => (
                <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-300">
                  {symptom.toUpperCase()}
                </span>
              ))}
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-2">Contagion Risk</p>
              <div className="flex items-center gap-3">
                 <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-1000 ${
                     result.medicalDetails.contagionRisk === 'HIGH' ? 'w-full bg-red-500' :
                     result.medicalDetails.contagionRisk === 'MEDIUM' ? 'w-2/3 bg-amber-500' : 'w-1/3 bg-emerald-500'
                   }`}></div>
                 </div>
                 <span className={`text-xs font-black ${
                   result.medicalDetails.contagionRisk === 'HIGH' ? 'text-red-400' :
                   result.medicalDetails.contagionRisk === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'
                 }`}>{result.medicalDetails.contagionRisk}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center & Right: Detailed Medical Data */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-3xl p-8 space-y-8 bg-gradient-to-br from-blue-900/10 to-transparent">
            {/* Clinical Overview */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-2 flex-1">
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">{result.species}</h2>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500/20 rounded-lg"><Dna className="w-4 h-4 text-blue-400" /></div>
                  <h3 className="text-lg font-bold text-blue-100">{result.medicalDetails.primaryDiagnosis}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xl">{result.medicalDetails.pathologicalSummary}</p>
              </div>
              <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-3xl text-center min-w-[160px] shadow-2xl">
                <p className="text-[10px] font-black text-blue-400 mb-1 uppercase tracking-widest">Inference Confidence</p>
                <p className="text-3xl font-black text-white">{(result.overallConfidenceScore * 100).toFixed(1)}%</p>
                <p className="text-[8px] mono text-gray-500 mt-1 uppercase">EF_NET_B7 VALIDATED</p>
              </div>
            </div>

            {/* Differential Diagnosis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                  <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4" /> Differential Diagnosis
                  </h4>
                  <ul className="space-y-2">
                    {result.medicalDetails.differentialDiagnoses.map((d, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-6 bg-amber-500/5 rounded-3xl border border-amber-500/10">
                  <h4 className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Recovery Prognosis
                  </h4>
                  <p className="text-sm font-medium text-amber-200/80 italic">"{result.medicalDetails.prognosis}"</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-red-500/5 rounded-3xl border border-red-500/10">
                  <h4 className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Critical Indicators
                  </h4>
                  <ul className="space-y-2">
                    {result.medicalDetails.urgentActions.map((action, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-red-200/70 font-bold uppercase leading-tight">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Treatment & Remedies Section - THE "UPAY" */}
            <div className="p-8 bg-blue-600 rounded-[2.5rem] shadow-2xl shadow-blue-900/40 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                  <Syringe className="w-6 h-6" /> Treatment Remedies (Upay)
                </h3>
                <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black text-white">AI_PROTOCOLS_READY</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.medicalDetails.treatmentRemedies.map((remedy, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 group hover:bg-white/20 transition-all">
                    <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-black text-xs shrink-0 group-hover:scale-110 transition-transform">{i+1}</div>
                    <p className="text-sm font-bold text-white leading-tight">{remedy}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-blue-100 font-medium italic">
                  <strong>First Aid Priority:</strong> {result.firstAid}
                </p>
              </div>
            </div>

            {/* XAI Logic */}
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Binary className="w-4 h-4" /> Neural Feature Attention
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.explanation.visualFeatures.map((feat, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-500/10 text-[9px] mono text-blue-400 rounded-lg border border-blue-500/20">
                    {feat.toUpperCase()}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed px-1">
                <span className="font-bold text-gray-400">Logic:</span> {result.explanation.decisionReason}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
             <button 
              onClick={() => window.location.reload()} 
              className="flex-1 py-5 bg-white text-black font-black rounded-3xl flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-[0.98] hover:bg-gray-200"
            >
              <Camera className="w-5 h-5" />
              SCAN NEW SUBJECT
            </button>
            <button className="p-5 glass-panel rounded-3xl text-white hover:bg-white/10">
              <ExternalLink className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
