
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { DashboardView } from './components/DashboardView';
import { CameraView } from './components/CameraView';
import { GalleryView } from './components/GalleryView';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { RescueView } from './components/RescueView';
import { HistoryView } from './components/HistoryView';
import { SettingsView } from './components/SettingsView';
import { ChatbotView } from './components/ChatbotView';
import { CoreEngineView } from './components/CoreEngineView';
import { SafetyMetricsView } from './components/SafetyMetricsView';
import { NGODashboardView } from './components/NGODashboardView';
import { analyzeAnimalImage } from './services/geminiService';
import { AnalysisResult, Coordinates, NavigationTab } from './types';
import { Home, Camera, FileText, MapPin, Clock, AlertCircle, MessageSquare } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.DASHBOARD);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [liveAlert, setLiveAlert] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('vet_ai_history');
    if (saved) setHistory(JSON.parse(saved));

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        (err) => console.log("Location access denied", err)
      );
    }
  }, []);

  const handleMediaInput = async (base64: string) => {
    setCapturedImage(base64);
    setIsAnalyzing(true);
    setLiveAlert(null);
    try {
      const result = await analyzeAnimalImage(base64.split(',')[1], location || undefined);
      setCurrentResult(result);
      const newHistory = [result, ...history].slice(0, 50);
      setHistory(newHistory);
      localStorage.setItem('vet_ai_history', JSON.stringify(newHistory));
      setActiveTab(NavigationTab.REPORT);
    } catch (err) {
      console.error(err);
      alert("AI analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLiveCritical = (text: string) => {
    setLiveAlert(text);
    setActiveTab(NavigationTab.RESCUE);
  };

  const navigateBack = () => setActiveTab(NavigationTab.DASHBOARD);

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.DASHBOARD:
        return <DashboardView onNavigate={setActiveTab} latestResult={currentResult} historyCount={history.length} />;
      case NavigationTab.CAMERA:
        return (
          <CameraView 
            onCapture={handleMediaInput} 
            isAnalyzing={isAnalyzing} 
            onLiveCritical={handleLiveCritical} 
            onBack={navigateBack} 
            onOpenGallery={() => setActiveTab(NavigationTab.GALLERY)} 
          />
        );
      case NavigationTab.GALLERY:
        return <GalleryView onUpload={handleMediaInput} history={history} isAnalyzing={isAnalyzing} onBack={navigateBack} />;
      case NavigationTab.CHAT:
        return <ChatbotView onBack={navigateBack} />;
      case NavigationTab.REPORT:
        return currentResult && capturedImage ? (
          <AnalysisDashboard result={currentResult} imageUrl={capturedImage} onBack={navigateBack} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 space-y-4">
            <FileText className="w-12 h-12 text-gray-700" />
            <p>No active report. Scan or upload an image first.</p>
            <button onClick={navigateBack} className="px-6 py-2 bg-blue-500/10 text-blue-500 rounded-xl font-bold">Back to Home</button>
          </div>
        );
      case NavigationTab.RESCUE:
        return (
          <div className="space-y-4">
            {liveAlert && (
              <div className="glass-panel p-6 border-red-500 rounded-3xl animate-in zoom-in">
                <div className="flex items-start gap-4 text-red-500">
                  <AlertCircle className="w-8 h-8 shrink-0 animate-pulse" />
                  <div>
                    <h3 className="font-black text-xl tracking-tighter uppercase">Live Critical Dispatch</h3>
                    <p className="text-sm text-gray-400 mt-1">{liveAlert}</p>
                  </div>
                </div>
              </div>
            )}
            <RescueView latestResult={currentResult} onBack={navigateBack} />
          </div>
        );
      case NavigationTab.HISTORY:
        return <HistoryView history={history} onSelect={(res) => { setCurrentResult(res); setActiveTab(NavigationTab.REPORT); }} onBack={navigateBack} />;
      case NavigationTab.SETTINGS:
        return <SettingsView onBack={navigateBack} />;
      case NavigationTab.CORE_ENGINE:
        return <CoreEngineView onBack={navigateBack} />;
      case NavigationTab.SAFETY_METRICS:
        return <SafetyMetricsView onBack={navigateBack} />;
      case NavigationTab.NGO_DASHBOARD:
        return <NGODashboardView onBack={navigateBack} />;
      default:
        return navigateBack();
    }
  };

  return (
    <Layout onNavigate={setActiveTab} activeTab={activeTab}>
      <div className="pb-24 max-w-4xl mx-auto">
        {renderContent()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 glass-panel border-t border-white/10 px-4 py-3 flex items-center justify-around z-[100] max-w-7xl mx-auto rounded-t-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        {[
          { id: NavigationTab.DASHBOARD, icon: Home, label: 'HOME' },
          { id: NavigationTab.CAMERA, icon: Camera, label: 'SCAN' },
          { id: NavigationTab.CHAT, icon: MessageSquare, label: 'CHAT' },
          { id: NavigationTab.RESCUE, icon: MapPin, label: 'RESCUE' },
          { id: NavigationTab.HISTORY, icon: Clock, label: 'LOGS' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all relative ${
              activeTab === item.id ? 'text-blue-500 scale-110' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <item.icon className={`w-6 h-6 transition-all ${activeTab === item.id ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
            <span className="text-[9px] font-black tracking-widest uppercase">{item.label}</span>
            {activeTab === item.id && (
              <div className="absolute -bottom-1 w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
            )}
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default App;
