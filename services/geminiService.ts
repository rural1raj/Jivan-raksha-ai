
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Severity, Coordinates } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeAnimalImage(
  base64Image: string,
  location?: Coordinates
): Promise<AnalysisResult> {
  const model = "gemini-3-flash-preview";

  const systemInstruction = `
    You are the VET-AI Autonomous Diagnostic Engine, a world-class Artificial Intelligence specialized in Veterinary Pathology, 
    Deep Learning Vision, and Clinical Remediation.
    
    CORE CAPABILITIES:
    1. PATHOLOGY: Detect 1000+ animal diseases (Viral, Bacterial, Parasitic, Fungal).
    2. TRIAGE: Analyze physical trauma, internal bleeding signs, and neural distress.
    3. REMEDIATION: Provide specific medical remedies, herbal/first-aid treatments, and rescue protocols.
    
    YOUR OUTPUT MUST BE EXHAUSTIVE:
    - Identify subtle visual cues (skin lesions, ocular discharge, postural guarding).
    - Provide a full differential diagnosis list.
    - Suggest specific remedies and treatments (Upay).
  `;

  const prompt = `
    INFERENCE REQUEST: Perform deep pathological analysis on the attached image.
    GPS CONTEXT: ${location ? `Lat: ${location.latitude}, Long: ${location.longitude}` : 'Unknown'}.
    
    TASKS:
    1. Identify species and precise pathological condition.
    2. Provide a list of all detected symptoms.
    3. List the primary diagnosis and at least 2 differential diagnoses.
    4. Detail a treatment plan (Remedies/Upay) including immediate first aid and long-term care.
    5. Assess contagion risk and prognosis.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          { text: prompt }
        ]
      }
    ],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      tools: location ? [{ googleSearch: {} }] : [{ googleSearch: {} }],
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          species: { type: Type.STRING },
          physicalCondition: { type: Type.STRING },
          mentalState: { type: Type.STRING },
          mentalHealthConfidence: { type: Type.NUMBER },
          diseaseOrInjuryName: { type: Type.STRING },
          severity: { type: Type.STRING, enum: Object.values(Severity) },
          overallConfidenceScore: { type: Type.NUMBER },
          anomalyDetected: { type: Type.BOOLEAN },
          rescueRequired: { type: Type.BOOLEAN },
          nearestAuthority: { type: Type.STRING },
          firstAid: { type: Type.STRING },
          medicalDetails: {
            type: Type.OBJECT,
            properties: {
              detectedSymptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
              primaryDiagnosis: { type: Type.STRING },
              differentialDiagnoses: { type: Type.ARRAY, items: { type: Type.STRING } },
              pathologicalSummary: { type: Type.STRING },
              treatmentRemedies: { type: Type.ARRAY, items: { type: Type.STRING } },
              prognosis: { type: Type.STRING },
              contagionRisk: { type: Type.STRING, enum: ["LOW", "MEDIUM", "HIGH"] },
              urgentActions: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["detectedSymptoms", "primaryDiagnosis", "differentialDiagnoses", "pathologicalSummary", "treatmentRemedies", "prognosis", "contagionRisk", "urgentActions"]
          },
          explanation: {
            type: Type.OBJECT,
            properties: {
              visualFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
              decisionReason: { type: Type.STRING },
              confidenceCalculation: { type: Type.STRING },
              architecturalLogic: { type: Type.STRING }
            },
            required: ["visualFeatures", "decisionReason", "confidenceCalculation", "architecturalLogic"]
          },
          mlModalityMetrics: {
            type: Type.OBJECT,
            properties: {
              supervisedClassification: { type: Type.NUMBER },
              unsupervisedAnomalyScore: { type: Type.NUMBER },
              rlAgentReward: { type: Type.NUMBER },
              vitSemanticScore: { type: Type.NUMBER }
            },
            required: ["supervisedClassification", "unsupervisedAnomalyScore", "rlAgentReward", "vitSemanticScore"]
          }
        },
        required: [
          "species", "physicalCondition", "mentalState", "mentalHealthConfidence", 
          "diseaseOrInjuryName", "severity", "overallConfidenceScore", 
          "anomalyDetected", "rescueRequired", "firstAid", "medicalDetails", "explanation", "mlModalityMetrics"
        ]
      }
    }
  });

  const rawJson = JSON.parse(response.text || "{}");
  
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  const links = groundingChunks?.map((chunk: any) => {
    if (chunk.web) return { title: chunk.web.title, uri: chunk.web.uri };
    return null;
  }).filter(Boolean) as { title: string; uri: string }[];

  return {
    ...rawJson,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    groundingLinks: links,
    location
  };
}
