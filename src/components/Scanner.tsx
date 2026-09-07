import { useState, useRef, useCallback } from 'react';
import { UploadCloud, ImageIcon, X, ScanLine, ArrowRight, FileSearch, Sparkles } from 'lucide-react';
import type { Page } from '@/types';

interface ScannerProps {
  onNavigate: (page: Page) => void;
}

type LabelType = 'front' | 'back' | 'side';

interface UploadedImage {
  id: string;
  label: LabelType;
  name: string;
  url: string;
}

const labelTypes: { id: LabelType; label: string }[] = [
  { id: 'front', label: 'Front Label' },
  { id: 'back', label: 'Back Label' },
  { id: 'side', label: 'Side Label' },
];

export default function Scanner({ onNavigate }: ScannerProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [activeLabel, setActiveLabel] = useState<LabelType>('front');
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setImages((prev) => {
      const filtered = prev.filter((img) => img.label !== activeLabel);
      return [...filtered, { id: `${activeLabel}-${Date.now()}`, label: activeLabel, name: file.name, url }];
    });
  }, [activeLabel]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      onNavigate('result');
    }, 2200);
  };

  const currentImage = images.find((img) => img.label === activeLabel);
  const hasAnyImage = images.length > 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-navy-900">Product Scanner</h2>
            <p className="text-sm text-navy-400 mt-1">Upload product label images for AI-powered compliance analysis</p>
          </div>
          {hasAnyImage && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium">
              <Sparkles size={15} />
              {images.length} image{images.length !== 1 ? 's' : ''} ready
            </div>
          )}
        </div>

        {/* Label Type Tabs */}
        <div className="flex gap-2 p-1.5 bg-navy-50 rounded-xl w-fit">
          {labelTypes.map((lt) => {
            const has = images.some((img) => img.label === lt.id);
            return (
              <button
                key={lt.id}
                onClick={() => setActiveLabel(lt.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeLabel === lt.id
                    ? 'bg-white text-navy-900 card-shadow'
                    : 'text-navy-500 hover:text-navy-700'
                }`}
              >
                {lt.label}
                {has && <span className="h-2 w-2 rounded-full bg-teal-500" />}
              </button>
            );
          })}
        </div>

        {/* Upload Area */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !currentImage && fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
            dragging
              ? 'border-teal-400 bg-teal-50/50 scale-[1.01]'
              : currentImage
              ? 'border-navy-200 bg-white'
              : 'border-navy-200 bg-navy-50/30 hover:border-teal-300 hover:bg-teal-50/20 cursor-pointer'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          {currentImage ? (
            <div className="p-4">
              <div className="relative group">
                <img src={currentImage.url} alt={currentImage.name} className="w-full h-64 sm:h-80 object-contain rounded-xl bg-navy-50" />
                <button
                  onClick={(e) => { e.stopPropagation(); removeImage(currentImage.id); }}
                  className="absolute top-3 right-3 h-9 w-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-navy-600 hover:bg-red-50 hover:text-red-500 transition-colors card-shadow"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-navy-900/80 backdrop-blur-sm text-white text-xs font-medium">
                  {currentImage.name}
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-navy-50 text-navy-700 text-sm font-semibold hover:bg-navy-100 transition-colors flex items-center justify-center gap-2"
                >
                  <UploadCloud size={17} />
                  Replace Image
                </button>
                <button
                  onClick={() => {
                    const next = labelTypes.find((lt) => lt.id !== activeLabel && !images.some((img) => img.label === lt.id));
                    if (next) setActiveLabel(next.id);
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-teal-50 text-teal-700 text-sm font-semibold hover:bg-teal-100 transition-colors flex items-center justify-center gap-2"
                >
                  <ImageIcon size={17} />
                  Add Another Label
                </button>
              </div>
            </div>
          ) : (
            <div className="py-16 sm:py-24 px-6 text-center">
              <div className={`mx-auto h-20 w-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                dragging ? 'bg-teal-500 scale-110' : 'bg-white card-shadow'
              }`}>
                <UploadCloud size={36} className={dragging ? 'text-white' : 'text-teal-500'} strokeWidth={1.8} />
              </div>
              <h3 className="text-xl font-display font-bold text-navy-900 mb-2">
                {dragging ? 'Drop your image here' : 'Upload Product Image'}
              </h3>
              <p className="text-sm text-navy-400 max-w-md mx-auto">
                Drag and drop the <span className="font-semibold text-navy-600">{labelTypes.find((l) => l.id === activeLabel)?.label}</span> image here, or click to browse
              </p>
              <p className="text-xs text-navy-300 mt-3">Supports JPG, PNG, WEBP — up to 10MB</p>
            </div>
          )}
        </div>

        {/* Uploaded Thumbnails */}
        {hasAnyImage && (
          <div className="flex gap-3 flex-wrap">
            {labelTypes.map((lt) => {
              const img = images.find((i) => i.label === lt.id);
              return (
                <button
                  key={lt.id}
                  onClick={() => setActiveLabel(lt.id)}
                  className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeLabel === lt.id ? 'border-teal-500 ring-2 ring-teal-200' : 'border-navy-100'
                  } ${img ? '' : 'bg-navy-50 border-dashed'}`}
                >
                  {img ? (
                    <>
                      <img src={img.url} alt={lt.label} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-navy-900/0 hover:bg-navy-900/20 transition-colors" />
                    </>
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center text-navy-300">
                      <ImageIcon size={18} />
                      <span className="text-[10px] mt-1 capitalize">{lt.label.split(' ')[0]}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Analyze Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3 text-sm text-navy-400">
            <FileSearch size={18} />
            {hasAnyImage
              ? 'Ready to analyze. Click to start AI compliance check.'
              : 'Upload at least one product image to begin analysis.'}
          </div>
          <button
            onClick={handleAnalyze}
            disabled={!hasAnyImage || analyzing}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 text-white text-base font-semibold hover:shadow-xl hover:shadow-teal-500/30 transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center gap-3 min-w-[200px] justify-center"
          >
            {analyzing ? (
              <>
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <ScanLine size={20} />
                Analyze Product
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {analyzing && (
          <div className="fixed inset-0 bg-navy-950/40 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 card-shadow-lg text-center">
              <div className="relative h-20 w-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-teal-100" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ScanLine size={28} className="text-teal-500" />
                </div>
              </div>
              <h3 className="text-lg font-display font-bold text-navy-900 mb-2">Analyzing Product Label</h3>
              <p className="text-sm text-navy-400 mb-4">Running AI compliance checks against Legal Metrology Act...</p>
              <div className="space-y-2 text-left">
                {['Extracting text via OCR', 'Identifying mandatory fields', 'Checking compliance rules', 'Calculating compliance score'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2.5 text-sm" style={{ animationDelay: `${i * 0.4}s` }}>
                    <div className="h-4 w-4 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" style={{ animationDelay: `${i * 0.2}s` }} />
                    <span className="text-navy-600">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
