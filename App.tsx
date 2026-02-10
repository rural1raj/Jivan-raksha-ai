import React, { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import {
  Home,
  Camera,
  Clock,
  MapPin,
  MessageSquare,
  FileText,
} from "lucide-react";
import { NavigationTab, AnalysisResult } from "./types";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(
    NavigationTab.DASHBOARD
  );
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [currentResult, setCurrentResult] =
    useState<AnalysisResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("vet_ai_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // 🔥 DEMO MODE ANALYSIS (NO API)
  const runDemoAnalysis = () => {
    const demoResult: AnalysisResult = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      summary: "Demo Mode: Animal appears safe. No critical risk detected.",
      severity: "LOW",
      recommendations: [
        "Provide clean water",
        "Ensure food availability",
        "Monitor behavior regularly",
      ],
    };

    setCurrentResult(demoResult);
    const newHistory = [demoResult, ...history].slice(0, 20);
    setHistory(newHistory);
    localStorage.setItem("vet_ai_history", JSON.stringify(newHistory));
    setActiveTab(NavigationTab.REPORT);
  };

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.DASHBOARD:
        return (
          <div className="text-white space-y-4">
            <h1 className="text-2xl font-bold">🐾 VET-AI Guardian</h1>
            <p className="text-gray-400">
              AI-powered animal safety & health assistant (Demo Mode)
            </p>

            <button
              onClick={runDemoAnalysis}
              className="px-6 py-3 bg-blue-600 rounded-xl font-bold"
            >
              Run Demo Scan
            </button>
          </div>
        );

      case NavigationTab.REPORT:
        return currentResult ? (
          <div className="space-y-4 text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText /> Analysis Report
            </h2>
            <p>{currentResult.summary}</p>
            <ul className="list-disc pl-6 text-gray-300">
              {currentResult.recommendations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            <button
              onClick={() => setActiveTab(NavigationTab.DASHBOARD)}
              className="mt-4 px-5 py-2 bg-gray-700 rounded-lg"
            >
              Back to Home
            </button>
          </div>
        ) : null;

      case NavigationTab.HISTORY:
        return (
          <div className="text-white space-y-3">
            <h2 className="text-xl font-bold">History</h2>
            {history.length === 0 && (
              <p className="text-gray-400">No scans yet.</p>
            )}
            {history.map((h) => (
              <div
                key={h.id}
                className="p-3 bg-gray-800 rounded-xl text-sm"
              >
                {h.summary}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout onNavigate={setActiveTab} activeTab={activeTab}>
      <div className="pb-24 max-w-3xl mx-auto px-4">
        {renderContent()}
      </div>

      {/* 🔻 Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur border-t border-white/10 flex justify-around py-3">
        {[
          { id: NavigationTab.DASHBOARD, icon: Home, label: "HOME" },
          { id: NavigationTab.CAMERA, icon: Camera, label: "SCAN" },
          { id: NavigationTab.REPORT, icon: FileText, label: "REPORT" },
          { id: NavigationTab.HISTORY, icon: Clock, label: "HISTORY" },
          { id: NavigationTab.CHAT, icon: MessageSquare, label: "CHAT" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center text-xs ${
              activeTab === item.id ? "text-blue-500" : "text-gray-400"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default App;

