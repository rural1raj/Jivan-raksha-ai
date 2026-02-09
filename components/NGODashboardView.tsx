
import React from 'react';
import { 
  MapPin, 
  Users, 
  Globe, 
  Radio, 
  ArrowLeft, 
  ExternalLink, 
  Phone, 
  MessageCircle, 
  Bell, 
  Navigation,
  Activity,
  Zap,
  ShieldCheck
} from 'lucide-react';

export const NGODashboardView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const activeCases = [
    { id: 'NGO-782', loc: 'Uttarakhand, IN', species: 'Leopard', status: 'En Route', severity: 'CRITICAL' },
    { id: 'NGO-781', loc: 'Rajasthan, IN', species: 'Camel', status: 'In Treatment', severity: 'INJURED' },
    { id: 'NGO-779', loc: 'Nairobi, KE', species: 'Rhino', status: 'Rescued', severity: 'HEALTHY' }
  ];

  const nearestNGOs = [
    { name: 'Wildlife SOS Triage', distance: '4.2 km', contact: '+91 98765 43210', type: 'Primary' },
    { name: 'PETA Emergency Unit', distance: '12.8 km', contact: '+91 88888 77777', type: 'Secondary' },
    { name: 'Blue Cross Shelter', distance: '15.5 km', contact: '+91 99999 00000', type: 'Specialist' }
  ];

  const signalSteps = [
    { label: 'DETECTION', status: 'DONE', icon: Zap },
    { label: 'VERIFICATION', status: 'ACTIVE', icon: Activity },
    { label: 'DISPATCH', status: 'PENDING', icon: Navigation },
    { label: 'INTERVENTION', status: 'WAITING', icon: ShieldCheck }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-3 glass-panel rounded-2xl text-gray-400 hover:text-white transition-all active:scale-90">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-400" /> Partner NGO Hub
          </h2>
          <p className="text-[10px] mono text-gray-500 uppercase tracking-widest font-bold">Autonomous_Rescue_Network</p>
        </div>
      </div>

      {/* Actionable Signal Flow */}
      <div className="glass-panel p-6 rounded-[2.5rem] bg-gradient-to-r from-blue-900/20 to-transparent border-blue-500/20">
        <h3 className="text-xs font-black text-blue-400 uppercase mb-6 tracking-[0.2em]">🧠 Signal: Real-world Action Flow</h3>
        <div className="flex justify-between items-center relative px-2">
          {signalSteps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-3 relative z-10 flex-1">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                step.status === 'DONE' ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' :
                step.status === 'ACTIVE' ? 'bg-blue-500 text-white animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.4)]' :
                'bg-white/5 text-gray-600 border border-white/5'
              }`}>
                <step.icon className="w-6 h-6" />
              </div>
              <p className={`text-[9px] font-black uppercase tracking-widest ${
                step.status === 'DONE' ? 'text-emerald-400' :
                step.status === 'ACTIVE' ? 'text-blue-400' : 'text-gray-600'
              }`}>{step.label}</p>
              {i < signalSteps.length - 1 && (
                <div className="absolute top-6 left-[60%] w-[80%] h-0.5 bg-white/5 -z-10">
                   <div className={`h-full bg-blue-500 transition-all duration-1000 ${step.status === 'DONE' ? 'w-full' : 'w-0'}`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Nearest Triage Centers */}
          <div className="glass-panel rounded-3xl overflow-hidden border-emerald-500/10">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" /> Nearest Triage Centers
              </h3>
              <span className="text-[10px] mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">GPS_LIVE</span>
            </div>
            <div className="divide-y divide-white/5">
              {nearestNGOs.map((ngo, idx) => (
                <div key={idx} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center font-black text-xl">
                      {ngo.name[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white uppercase">{ngo.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-[10px] text-gray-500 flex items-center gap-1 font-bold">
                           <Navigation className="w-3 h-3" /> {ngo.distance}
                        </p>
                        <span className="text-[8px] mono text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">{ngo.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none p-3 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-90 border border-emerald-500/20">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="flex-1 sm:flex-none p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all active:scale-90 border border-blue-500/20">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button className="flex-1 sm:flex-none p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90 border border-red-500/20">
                      <Bell className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Global Case Tracker */}
          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-500 animate-pulse" /> Global Live Dispatches
              </h3>
              <button className="text-[10px] font-bold text-blue-400 flex items-center gap-1 uppercase hover:underline">View Global Map <ExternalLink className="w-3 h-3" /></button>
            </div>
            <div className="divide-y divide-white/10">
              {activeCases.map((c) => (
                <div key={c.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-lg font-black text-white">{c.species[0]}</div>
                    <div>
                      <p className="text-sm font-bold text-white uppercase">{c.species} Case {c.id}</p>
                      <p className="text-[10px] text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.loc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg ${
                      c.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10">
            <Globe className="w-10 h-10 text-blue-400 mb-4" />
            <h4 className="text-xl font-black text-white uppercase mb-2">Global Impact</h4>
            <p className="text-4xl font-black text-blue-400">142+</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Partner Organizations</p>
          </div>
          <div className="glass-panel p-6 rounded-3xl bg-purple-500/5 border border-purple-500/10">
            <Users className="w-10 h-10 text-purple-400 mb-4" />
            <h4 className="text-xl font-black text-white uppercase mb-2">Volunteer Network</h4>
            <p className="text-4xl font-black text-purple-400">12.5K</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Certified Rescuers</p>
          </div>
          <div className="p-6 glass-panel rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
             <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">NGO Sync Protocol</h4>
             <p className="text-xs text-gray-400 leading-relaxed italic">
               "Automated verification using EfficientNet-B7 ensures that only validated medical emergencies trigger full-scale dispatch, reducing false alerts by 82%."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
