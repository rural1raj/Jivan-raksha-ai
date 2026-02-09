
import React, { useRef, useState, useEffect } from 'react';
import { RefreshCw, Zap, AlertCircle, Play, Square, Activity, Target, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { connectLiveAnimalMonitor, blobToBase64 } from '../services/geminiLiveService';

interface Props {
  onCapture: (base64: string) => void;
  isAnalyzing: boolean;
  onLiveCritical: (text: string) => void;
  onBack: () => void;
  onOpenGallery: () => void;
}

const FRAME_RATE = 1; 
const JPEG_QUALITY = 0.6;

export const CameraView: React.FC<Props> = ({ onCapture, isAnalyzing, onLiveCritical, onBack, onOpenGallery }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [liveTranscription, setLiveTranscription] = useState("");
  const frameIntervalRef = useRef<number | null>(null);
  const sessionRef = useRef<any>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopLiveMode();
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    } catch (err) {
      setError("Camera access denied or unavailable.");
    }
  };

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        onCapture(dataUrl);
      }
    }
  };

  const toggleLiveMode = async () => {
    if (isLiveMode) {
      stopLiveMode();
    } else {
      startLiveMode();
    }
  };

  const startLiveMode = async () => {
    setIsLiveMode(true);
    setLiveTranscription("Initializing Real-time CV...");
    
    const sessionPromise = connectLiveAnimalMonitor({
      onStatusUpdate: (t) => setLiveTranscription(t),
      onTranscription: (t) => setLiveTranscription(t),
      onCriticalAlert: (data) => onLiveCritical(data.text),
    });

    sessionRef.current = sessionPromise;

    frameIntervalRef.current = window.setInterval(() => {
      if (videoRef.current && canvasRef.current && isLiveMode) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(async (blob) => {
            if (blob && sessionRef.current) {
              const base64 = await blobToBase64(blob);
              sessionRef.current.then((session: any) => {
                session.sendRealtimeInput({
                  media: { data: base64, mimeType: 'image/jpeg' }
                });
              });
            }
          }, 'image/jpeg', JPEG_QUALITY);
        }
      }
    }, 1000 / FRAME_RATE);
  };

  const stopLiveMode = () => {
    setIsLiveMode(false);
    if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
    if (sessionRef.current) {
      sessionRef.current.then((s: any) => s.close());
    }
    setLiveTranscription("");
  };

  return (
    <div className="relative w-full h-[calc(100vh-180px)] bg-black rounded-[2.5rem] overflow-hidden animate-in fade-in duration-500 shadow-2xl border border-white/10">
      {error ? (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Capture Offline</h3>
          <p className="text-gray-400 text-sm max-w-xs">{error}</p>
          <div className="flex gap-4">
            <button onClick={onBack} className="px-6 py-2 bg-white/10 rounded-xl text-white font-bold">Back</button>
            <button onClick={startCamera} className="px-6 py-2 bg-blue-500 rounded-xl text-white font-bold">Retry</button>
          </div>
        </div>
      ) : (
        <>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute inset-0 border-[2px] transition-colors duration-300 ${isLiveMode ? 'border-blue-500/40 animate-pulse' : 'border-white/5'}`}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-[3rem] border-dashed">
                 <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 -translate-x-1 -translate-y-1 rounded-tl-2xl"></div>
                 <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 translate-x-1 -translate-y-1 rounded-tr-2xl"></div>
                 <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 -translate-x-1 translate-y-1 rounded-bl-2xl"></div>
                 <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 translate-x-1 translate-y-1 rounded-br-2xl"></div>
              </div>
            </div>
          </div>

          <div className="absolute top-6 left-6 right-6 flex flex-col gap-2 pointer-events-none">
            <div className="flex justify-between items-center pointer-events-auto">
              <div className="flex items-center gap-3">
                <button 
                  onClick={onBack}
                  className="p-3 glass-panel rounded-2xl text-white hover:bg-white/10 transition-colors shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className={`px-4 py-2 glass-panel rounded-full text-[10px] mono flex items-center gap-2 font-black tracking-widest ${isLiveMode ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {isLiveMode ? <Activity className="w-3 h-3 animate-pulse" /> : <Zap className="w-3 h-3" />}
                  {isLiveMode ? 'LIVE_NEURAL_MONITOR' : 'SCANNER_READY'}
                </div>
              </div>
              <button 
                onClick={startCamera}
                className="p-3 glass-panel rounded-2xl text-white hover:bg-white/10 transition-colors shadow-lg pointer-events-auto"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            
            {isLiveMode && liveTranscription && (
              <div className="px-4 py-3 glass-panel rounded-2xl border-blue-500/30 text-xs text-white max-w-[85%] animate-in slide-in-from-top-2 ml-10 shadow-2xl backdrop-blur-xl">
                <p className="font-mono text-blue-400 text-[10px] mb-1 font-black uppercase tracking-widest">Neural_Stream:</p>
                <p className="leading-tight font-medium opacity-90">{liveTranscription}</p>
              </div>
            )}
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-10">
            {/* Gallery Access Button */}
            <button 
              onClick={onOpenGallery}
              className="p-4 glass-panel rounded-full text-purple-400 border border-purple-500/20 hover:bg-purple-500/10 active:scale-90 transition-all shadow-xl"
              title="Upload from Gallery"
            >
              <ImageIcon className="w-7 h-7" />
            </button>
            
            <button 
              disabled={isAnalyzing}
              onClick={capture}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-[6px] border-blue-500/50 active:scale-95 transition-transform disabled:opacity-50 shadow-[0_0_50px_rgba(59,130,246,0.4)]"
            >
              <div className="w-20 h-20 bg-white border-4 border-black/5 rounded-full flex items-center justify-center">
                 <Target className="w-10 h-10 text-gray-200" />
              </div>
            </button>

            <button 
              onClick={toggleLiveMode}
              className={`p-4 glass-panel rounded-full transition-all active:scale-90 shadow-xl ${isLiveMode ? 'bg-red-500/20 text-red-500 border-red-500/40' : 'text-emerald-400 border-emerald-500/30'}`}
              title={isLiveMode ? "Stop Live Monitoring" : "Start Live AI Monitor"}
            >
              {isLiveMode ? <Square className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
            </button>
          </div>
        </>
      )}

      {isAnalyzing && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center space-y-4 z-50">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-white font-black animate-pulse uppercase tracking-[0.3em] text-[10px]">Processing_Neural_Data</p>
        </div>
      )}
    </div>
  );
};
