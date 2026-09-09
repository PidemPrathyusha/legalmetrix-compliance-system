import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Camera, UploadCloud, FileText, X, ImageIcon, Check,
  RefreshCw, ArrowRight, AlertCircle,
} from 'lucide-react';

export type InputMode = 'camera' | 'image' | 'pdf';
export type LabelType = 'front' | 'back' | 'side';

export interface ScanFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'pdf';
  label?: LabelType;
  source: 'camera' | 'upload';
}

interface ScanInputProps {
  /** If provided, shows Front/Back/Side label tabs. If null, no label tabs (consumer mode). */
  labels?: { id: LabelType; label: string }[];
  /** Called when the user clicks the analyze/check button. */
  onAnalyze: () => void;
  /** Button label text. */
  analyzeLabel: string;
  /** Whether analysis is in progress. */
  analyzing: boolean;
  /** Loading overlay content. */
  analyzingTitle: string;
  analyzingSubtitle: string;
  /** Loading steps. */
  analyzingSteps: string[];
}

const defaultLabels: { id: LabelType; label: string }[] = [
  { id: 'front', label: 'Front Label' },
  { id: 'back', label: 'Back Label' },
  { id: 'side', label: 'Side Label' },
];

export default function ScanInput({
  labels,
  onAnalyze,
  analyzeLabel,
  analyzing,
  analyzingTitle,
  analyzingSubtitle,
  analyzingSteps,
}: ScanInputProps) {
  const useLabels = labels ?? null;
  const labelList = useLabels ?? defaultLabels;

  const [files, setFiles] = useState<ScanFile[]>([]);
  const [activeLabel, setActiveLabel] = useState<LabelType>('front');
  const [mode, setMode] = useState<InputMode>('image');
  const [dragging, setDragging] = useState(false);

  // Camera state
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const hasAnyFile = files.length > 0;

  // --- File management ---

  const addImageFile = useCallback((file: File, source: 'camera' | 'upload') => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const newFile: ScanFile = {
      id: `${source}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: file.name,
      url,
      type: 'image',
      source,
      label: useLabels ? activeLabel : undefined,
    };
    setFiles((prev) => {
      if (useLabels) {
        const filtered = prev.filter((f) => f.label !== activeLabel || f.type !== 'image');
        return [...filtered, newFile];
      }
      return [...prev, newFile];
    });
  }, [activeLabel, useLabels]);

  const addPdfFile = useCallback((file: File) => {
    if (file.type !== 'application/pdf') return;
    const url = URL.createObjectURL(file);
    const newFile: ScanFile = {
      id: `pdf-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: file.name,
      url,
      type: 'pdf',
      source: 'upload',
      label: useLabels ? activeLabel : undefined,
    };
    setFiles((prev) => {
      if (useLabels) {
        const filtered = prev.filter((f) => f.label !== activeLabel || f.type !== 'pdf');
        return [...filtered, newFile];
      }
      return [...prev, newFile];
    });
  }, [activeLabel, useLabels]);

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((f) => f.id !== id);
    });
  };

  // --- Image upload ---

  const handleImageFiles = useCallback((fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    Array.from(fileList).forEach((file) => addImageFile(file, 'upload'));
  }, [addImageFile]);

  const handleImageDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleImageFiles(e.dataTransfer.files);
  }, [handleImageFiles]);

  // --- PDF upload ---

  const handlePdfFiles = useCallback((fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    Array.from(fileList).forEach((file) => addPdfFile(file));
  }, [addPdfFile]);

  // --- Camera ---

  const startCamera = useCallback(async () => {
    setCameraError(null);
    setCapturedPhoto(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
    } catch {
      setCameraError('Unable to access camera. Please grant camera permission or use image upload instead.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedPhoto(dataUrl);
    stopCamera();
  }, [stopCamera]);

  const retakePhoto = useCallback(() => {
    setCapturedPhoto(null);
    startCamera();
  }, [startCamera]);

  const usePhoto = useCallback(() => {
    if (!capturedPhoto) return;
    const blob = (async () => {
      const res = await fetch(capturedPhoto);
      return await res.blob();
    })();
    blob.then((b) => {
      const file = new File([b], `camera-capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
      addImageFile(file, 'camera');
      setCapturedPhoto(null);
    });
  }, [capturedPhoto, addImageFile]);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // Stop camera when switching away from camera mode
  useEffect(() => {
    if (mode !== 'camera' && cameraActive) {
      stopCamera();
    }
    if (mode !== 'camera' && capturedPhoto) {
      setCapturedPhoto(null);
    }
  }, [mode]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Derived data ---

  const currentLabelFiles = useLabels
    ? files.filter((f) => f.label === activeLabel)
    : files;
  const currentImage = currentLabelFiles.find((f) => f.type === 'image');
  const currentPdf = currentLabelFiles.find((f) => f.type === 'pdf');

  const imageCount = files.filter((f) => f.type === 'image').length;
  const pdfCount = files.filter((f) => f.type === 'pdf').length;
  const cameraCount = files.filter((f) => f.source === 'camera').length;

  // --- Mode tabs ---

  const modeTabs: { id: InputMode; label: string; icon: typeof Camera; emoji: string }[] = [
    { id: 'camera', label: 'Camera', icon: Camera, emoji: '📷' },
    { id: 'image', label: 'Image Upload', icon: UploadCloud, emoji: '🖼️' },
    { id: 'pdf', label: 'PDF Upload', icon: FileText, emoji: '📄' },
  ];

  return (
    <div className="space-y-6">
      {/* Input Mode Tabs */}
      <div className="flex gap-2 p-1.5 bg-navy-50 rounded-xl w-fit overflow-x-auto scrollbar-thin">
        {modeTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                mode === tab.id
                  ? 'bg-white text-navy-900 card-shadow'
                  : 'text-navy-500 hover:text-navy-700'
              }`}
            >
              <Icon size={16} />
              {tab.label}
              <span className="text-base">{tab.emoji}</span>
            </button>
          );
        })}
      </div>

      {/* Label Tabs (Inspector & Manufacturer only) */}
      {useLabels && (
        <div className="flex gap-2 p-1.5 bg-navy-50 rounded-xl w-fit overflow-x-auto scrollbar-thin">
          {labelList.map((lt) => {
            const has = files.some((f) => f.label === lt.id);
            return (
              <button
                key={lt.id}
                onClick={() => setActiveLabel(lt.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
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
      )}

      {/* === CAMERA MODE === */}
      {mode === 'camera' && (
        <div className="rounded-2xl border-2 border-navy-200 bg-white overflow-hidden">
          {/* Error */}
          {cameraError && !cameraActive && !capturedPhoto && (
            <div className="p-8 text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                <AlertCircle size={28} className="text-red-400" />
              </div>
              <p className="text-sm text-navy-500 max-w-md mx-auto mb-5">{cameraError}</p>
              <button
                onClick={startCamera}
                className="px-5 py-2.5 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors inline-flex items-center gap-2"
              >
                <Camera size={16} />
                Try Again
              </button>
            </div>
          )}

          {/* Live preview */}
          {cameraActive && (
            <div className="relative">
              <video
                ref={videoRef}
                className="w-full h-64 sm:h-80 object-contain bg-navy-950"
                playsInline
                muted
              />
              {/* Scan overlay frame */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-3/4 h-3/4 border-2 border-teal-400/60 rounded-xl" />
              </div>
              {/* Capture button */}
              <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
                <button
                  onClick={stopCamera}
                  className="px-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-sm text-navy-700 text-sm font-semibold hover:bg-white transition-colors flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={capturePhoto}
                  className="h-14 w-14 rounded-full bg-teal-500 hover:bg-teal-400 text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-teal-500/40 ring-4 ring-white/30"
                >
                  <Camera size={24} />
                </button>
              </div>
            </div>
          )}

          {/* Captured photo preview */}
          {capturedPhoto && !cameraActive && (
            <div className="p-4">
              <div className="relative">
                <img src={capturedPhoto} alt="Captured" className="w-full h-64 sm:h-80 object-contain rounded-xl bg-navy-50" />
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-navy-900/80 backdrop-blur-sm text-white text-xs font-medium">
                  Camera capture
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={retakePhoto}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-navy-50 text-navy-700 text-sm font-semibold hover:bg-navy-100 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw size={17} />
                  Retake
                </button>
                <button
                  onClick={usePhoto}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={17} />
                  Use Photo
                </button>
              </div>
            </div>
          )}

          {/* Start camera prompt */}
          {!cameraActive && !capturedPhoto && !cameraError && (
            <div className="py-16 sm:py-20 px-6 text-center">
              <div className="mx-auto h-20 w-20 rounded-2xl bg-navy-50 flex items-center justify-center mb-6">
                <Camera size={36} className="text-teal-500" strokeWidth={1.8} />
              </div>
              <h3 className="text-xl font-display font-bold text-navy-900 mb-2">
                {useLabels ? `Capture ${labelList.find((l) => l.id === activeLabel)?.label}` : 'Capture Product Label'}
              </h3>
              <p className="text-sm text-navy-400 max-w-md mx-auto mb-6">
                Use your device camera to take a photo of the product label
              </p>
              <button
                onClick={startCamera}
                className="px-6 py-3 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors inline-flex items-center gap-2"
              >
                <Camera size={18} />
                Start Camera
              </button>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {/* === IMAGE UPLOAD MODE === */}
      {mode === 'image' && (
        <>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => {
              handleImageFiles(e.target.files);
              e.target.value = '';
            }}
          />
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleImageDrop}
            onClick={() => !currentImage && imageInputRef.current?.click()}
            className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
              dragging
                ? 'border-teal-400 bg-teal-50/50 scale-[1.01]'
                : currentImage
                ? 'border-navy-200 bg-white'
                : 'border-navy-200 bg-navy-50/30 hover:border-teal-300 hover:bg-teal-50/20 cursor-pointer'
            }`}
          >
            {currentImage ? (
              <div className="p-4">
                <div className="relative group">
                  <img src={currentImage.url} alt={currentImage.name} className="w-full h-64 sm:h-80 object-contain rounded-xl bg-navy-50" />
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(currentImage.id); }}
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
                    onClick={() => imageInputRef.current?.click()}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-navy-50 text-navy-700 text-sm font-semibold hover:bg-navy-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <UploadCloud size={17} />
                    Replace Image
                  </button>
                  {useLabels && (
                    <button
                      onClick={() => {
                        const next = labelList.find((lt) => lt.id !== activeLabel && !files.some((f) => f.label === lt.id && f.type === 'image'));
                        if (next) setActiveLabel(next.id);
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-teal-50 text-teal-700 text-sm font-semibold hover:bg-teal-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <ImageIcon size={17} />
                      Add Another Label
                    </button>
                  )}
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
                  {dragging ? 'Drop your image here' : useLabels ? `Upload ${labelList.find((l) => l.id === activeLabel)?.label}` : 'Upload Product Image'}
                </h3>
                <p className="text-sm text-navy-400 max-w-md mx-auto">
                  {useLabels
                    ? <>Drag and drop the <span className="font-semibold text-navy-600">{labelList.find((l) => l.id === activeLabel)?.label}</span> image here, or click to browse</>
                    : 'Drag and drop a product image here, or click to browse'}
                </p>
                <p className="text-xs text-navy-300 mt-3">Supports JPG, JPEG, PNG, WEBP — up to 10MB</p>
              </div>
            )}
          </div>

          {/* Image thumbnails */}
          {hasAnyFile && imageCount > 0 && useLabels && (
            <div className="flex gap-3 flex-wrap">
              {labelList.map((lt) => {
                const img = files.find((f) => f.label === lt.id && f.type === 'image');
                return (
                  <button
                    key={lt.id}
                    onClick={() => { setActiveLabel(lt.id); setMode('image'); }}
                    className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeLabel === lt.id && mode === 'image' ? 'border-teal-500 ring-2 ring-teal-200' : 'border-navy-100'
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
        </>
      )}

      {/* === PDF UPLOAD MODE === */}
      {mode === 'pdf' && (
        <>
          <input
            ref={pdfInputRef}
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            onChange={(e) => {
              handlePdfFiles(e.target.files);
              e.target.value = '';
            }}
          />
          <div
            onClick={() => !currentPdf && pdfInputRef.current?.click()}
            className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
              currentPdf
                ? 'border-navy-200 bg-white'
                : 'border-navy-200 bg-navy-50/30 hover:border-teal-300 hover:bg-teal-50/20 cursor-pointer'
            }`}
          >
            {currentPdf ? (
              <div className="p-5">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-navy-50">
                  <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                    <FileText size={24} className="text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-800 truncate">{currentPdf.name}</p>
                    <p className="text-xs text-navy-400 mt-0.5">PDF Document</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(currentPdf.id); }}
                    className="h-9 w-9 rounded-xl bg-white flex items-center justify-center text-navy-600 hover:bg-red-50 hover:text-red-500 transition-colors card-shadow flex-shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => pdfInputRef.current?.click()}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-navy-50 text-navy-700 text-sm font-semibold hover:bg-navy-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <UploadCloud size={17} />
                    Replace PDF
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-16 sm:py-24 px-6 text-center">
                <div className="mx-auto h-20 w-20 rounded-2xl bg-white card-shadow flex items-center justify-center mb-6">
                  <FileText size={36} className="text-teal-500" strokeWidth={1.8} />
                </div>
                <h3 className="text-xl font-display font-bold text-navy-900 mb-2">
                  {useLabels ? `Upload ${labelList.find((l) => l.id === activeLabel)?.label} PDF` : 'Upload PDF Document'}
                </h3>
                <p className="text-sm text-navy-400 max-w-md mx-auto">
                  {useLabels
                    ? <>Drag and drop the <span className="font-semibold text-navy-600">{labelList.find((l) => l.id === activeLabel)?.label}</span> PDF document here, or click to browse</>
                    : 'Drag and drop a packaging or label PDF document here, or click to browse'}
                </p>
                <p className="text-xs text-navy-300 mt-3">Supports PDF — up to 10MB</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* === INPUT SUMMARY === */}
      {hasAnyFile && (
        <div className="bg-white rounded-2xl p-5 card-shadow border border-navy-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center">
              <Check size={16} className="text-teal-600" />
            </div>
            <h3 className="text-sm font-bold text-navy-900">Input Summary</h3>
            <span className="ml-auto text-xs text-navy-400">{files.length} file{files.length !== 1 ? 's' : ''} ready</span>
          </div>
          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-navy-50/50 border border-navy-50">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  file.type === 'pdf' ? 'bg-red-50' : 'bg-teal-50'
                }`}>
                  {file.type === 'pdf' ? (
                    <FileText size={16} className="text-red-500" />
                  ) : file.source === 'camera' ? (
                    <Camera size={16} className="text-teal-600" />
                  ) : (
                    <ImageIcon size={16} className="text-teal-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-700 truncate">{file.name}</p>
                  <div className="flex items-center gap-2 text-xs text-navy-400">
                    <span className="capitalize">{file.source}</span>
                    <span>·</span>
                    <span className="uppercase">{file.type}</span>
                    {useLabels && file.label && (
                      <>
                        <span>·</span>
                        <span className="capitalize">{file.label} label</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="h-7 w-7 rounded-lg flex items-center justify-center text-navy-400 hover:bg-red-50 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
          {/* Quick stats */}
          <div className="mt-4 pt-4 border-t border-navy-50 flex flex-wrap items-center gap-4 text-xs">
            {imageCount > 0 && (
              <span className="flex items-center gap-1.5 text-navy-500">
                <ImageIcon size={14} className="text-teal-500" />
                {imageCount} image{imageCount !== 1 ? 's' : ''}
              </span>
            )}
            {cameraCount > 0 && (
              <span className="flex items-center gap-1.5 text-navy-500">
                <Camera size={14} className="text-teal-500" />
                {cameraCount} camera capture{cameraCount !== 1 ? 's' : ''}
              </span>
            )}
            {pdfCount > 0 && (
              <span className="flex items-center gap-1.5 text-navy-500">
                <FileText size={14} className="text-red-500" />
                {pdfCount} PDF{pdfCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      )}

      {/* === ANALYZE BUTTON === */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3 text-sm text-navy-400">
          {hasAnyFile
            ? 'Ready to analyze. Click to start the compliance check.'
            : 'Upload or capture at least one product image to begin analysis.'}
        </div>
        <button
          onClick={onAnalyze}
          disabled={!hasAnyFile || analyzing}
          className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 text-white text-base font-semibold hover:shadow-xl hover:shadow-teal-500/30 transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center gap-3 min-w-[200px] justify-center"
        >
          {analyzing ? (
            <>
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {analyzeLabel.includes('...') ? analyzeLabel : `${analyzeLabel}...`}
            </>
          ) : (
            <>
              {analyzeLabel}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>

      {/* === ANALYZING OVERLAY === */}
      {analyzing && (
        <div className="fixed inset-0 bg-navy-950/40 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 card-shadow-lg text-center">
            <div className="relative h-20 w-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-teal-100" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera size={28} className="text-teal-500" />
              </div>
            </div>
            <h3 className="text-lg font-display font-bold text-navy-900 mb-2">{analyzingTitle}</h3>
            <p className="text-sm text-navy-400 mb-4">{analyzingSubtitle}</p>
            <div className="space-y-2 text-left">
              {analyzingSteps.map((step, i) => (
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
  );
}
