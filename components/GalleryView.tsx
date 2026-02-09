
import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, History, ArrowLeft } from 'lucide-react';
import { AnalysisResult, Severity } from '../types';

interface Props {
  onUpload: (base64: string) => void;
  history: AnalysisResult[];
  isAnalyzing: boolean;
  onBack: () => void;
}

export const GalleryView: React.FC<Props> = ({ onUpload, history, isAnalyzing, onBack }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-3 glass-panel rounded-2xl text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Media Gallery</h2>
          <div className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold inline-block">
            LOCAL_STORAGE_SYNC
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div 
        onClick={() => !isAnalyzing && fileInputRef.current?.click()}
        className={`group relative h-64 glass-panel rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all ${isAnalyzing ? 'opacity-50 cursor-wait' : ''}`}
      >
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
          <Upload className="w-8 h-8 text-blue-400" />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-white">Upload Animal Image</p>
          <p className="text-sm text-gray-500">Drag & drop or tap to browse your gallery</p>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
        
        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-3xl flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Recent Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <History className="w-4 h-4" /> Recent Analyses
          </h3>
        </div>

        {history.length === 0 ? (
          <div className="p-12 text-center glass-panel rounded-3xl border-white/5">
            <p className="text-sm text-gray-600">No recent data. Upload an image to start classification.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {history.slice(0, 4).map((item) => (
              <div 
                key={item.id} 
                className="group relative aspect-square glass-panel rounded-2xl overflow-hidden border-white/5 hover:border-blue-500/30 transition-all cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                   <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 z-30">
                  <p className="text-[10px] font-black text-white uppercase truncate">{item.species}</p>
                  <p className={`text-[8px] font-bold ${
                    item.severity === Severity.CRITICAL ? 'text-red-400' : 'text-emerald-400'
                  }`}>{item.severity}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pro Tips */}
      <div className="p-6 glass-panel rounded-3xl border-l-4 border-blue-500 bg-blue-500/5">
        <h4 className="text-xs font-black text-blue-400 uppercase mb-2">Pro Analysis Tip</h4>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          For the best results with our <strong>EfficientNet-B7</strong> classifier, ensure images are well-lit and the animal occupies at least 40% of the frame. Our YOLO layer will automatically crop the region of interest for secondary disease validation.
        </p>
      </div>
    </div>
  );
};
