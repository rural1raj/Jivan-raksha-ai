
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { Severity } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface LiveCallbacks {
  onStatusUpdate: (text: string) => void;
  onCriticalAlert: (data: any) => void;
  onTranscription: (text: string) => void;
}

export function connectLiveAnimalMonitor(callbacks: LiveCallbacks) {
  const sessionPromise = ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    config: {
      responseModalities: [Modality.AUDIO],
      outputAudioTranscription: {},
      systemInstruction: `
        You are an Elite AI Veterinary Monitor. You are performing real-time video stream analysis of an animal.
        Your task is to continuously identify:
        1. Species
        2. Immediate health threats (bleeding, fractures, malnutrition)
        3. Mental state (Fear, Stress, Pain)
        
        ARCHITECTURE: You are a hybrid ensemble of YOLOv8, EfficientNet, and PPO-RL Agents.
        
        RULES:
        - Provide brief, urgent updates via audio/transcription.
        - If you detect a CRITICAL condition, say "CRITICAL_ALERT" followed by details.
        - Monitor for anomalies (unsupervised learning).
        - Act as a life-saving tool.
      `,
    },
    callbacks: {
      onopen: () => console.log("Live session opened"),
      onmessage: async (message: LiveServerMessage) => {
        if (message.serverContent?.outputTranscription) {
          const text = message.serverContent.outputTranscription.text;
          callbacks.onTranscription(text);
          
          if (text.toUpperCase().includes("CRITICAL_ALERT")) {
            callbacks.onCriticalAlert({ text });
          }
        }
      },
      onerror: (e) => console.error("Live error:", e),
      onclose: () => console.log("Live session closed"),
    },
  });

  return sessionPromise;
}

export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.readAsDataURL(blob);
  });
}
