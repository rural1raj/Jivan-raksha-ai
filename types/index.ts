
export enum Severity {
  HEALTHY = 'HEALTHY',
  INJURED = 'INJURED',
  CRITICAL = 'CRITICAL'
}

export enum NavigationTab {
  DASHBOARD = 'dashboard',
  CAMERA = 'camera',
  GALLERY = 'gallery',
  REPORT = 'report',
  RESCUE = 'rescue',
  HISTORY = 'history',
  SETTINGS = 'settings',
  CHAT = 'chat',
  CORE_ENGINE = 'core_engine',
  SAFETY_METRICS = 'safety_metrics',
  NGO_DASHBOARD = 'ngo_dashboard'
}

export interface MedicalAnalysis {
  detectedSymptoms: string[];
  primaryDiagnosis: string;
  differentialDiagnoses: string[];
  pathologicalSummary: string;
  treatmentRemedies: string[];
  prognosis: string;
  contagionRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  urgentActions: string[];
}

export interface AnalysisResult {
  id: string;
  timestamp: number;
  species: string;
  physicalCondition: string;
  mentalState: string;
  mentalHealthConfidence: number;
  diseaseOrInjuryName: string;
  severity: Severity;
  overallConfidenceScore: number;
  anomalyDetected: boolean;
  rescueRequired: boolean;
  nearestAuthority?: string;
  firstAid: string;
  medicalDetails: MedicalAnalysis;
  explanation: {
    visualFeatures: string[];
    decisionReason: string;
    confidenceCalculation: string;
    architecturalLogic: string;
  };
  mlModalityMetrics: {
    supervisedClassification: number;
    unsupervisedAnomalyScore: number;
    rlAgentReward: number;
    vitSemanticScore: number;
  };
  groundingLinks?: { title: string; uri: string }[];
  location?: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
