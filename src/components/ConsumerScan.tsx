import { useState } from 'react';
import { ArrowLeft, User, ScanLine, FileSearch, Sparkles, Bell } from 'lucide-react';
import type { Page } from '@/types';
import ScanInput from './ScanInput';

interface ConsumerScanProps {
  onNavigate: (page: Page) => void;
}

export default function ConsumerScan({ onNavigate }: ConsumerScanProps) {
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      onNavigate('consumer-result');
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-navy-50/30 flex flex-col">
      {/* Top bar */}
      <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-navy-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('role-select')}
            className="h-10 w-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-600 hover:bg-navy-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-display font-bold text-navy-900">Scan Product</h1>
            <p className="text-xs sm:text-sm text-navy-400 hidden sm:block">Check compliance information at a glance</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="relative h-10 w-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-600 hover:bg-navy-100 transition-colors">
            <Bell size={19} />
          </button>
          <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-navy-100">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center text-white text-sm font-semibold">
              <User size={18} />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-navy-800 leading-tight">Consumer</p>
              <p className="text-xs text-navy-400 leading-tight">Guest User</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 animate-fade-in">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-display font-bold text-navy-900">Scan a Product</h2>
              <p className="text-sm text-navy-400 mt-1">Capture or upload a product image to view simple compliance information</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium">
              <Sparkles size={15} />
              Quick Check
            </div>
          </div>

          {/* Info Banner */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-navy-50 border border-navy-100">
            <div className="h-8 w-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
              <FileSearch size={16} className="text-teal-600" />
            </div>
            <p className="text-xs text-navy-500 leading-relaxed">
              Take a photo with your camera, upload an image, or upload a PDF of the product label. We'll show you the compliance information in a simple, easy-to-understand format.
            </p>
          </div>

          <ScanInput
            labels={null}
            onAnalyze={handleAnalyze}
            analyzeLabel="Check Product"
            analyzing={analyzing}
            analyzingTitle="Checking Product Label"
            analyzingSubtitle="Reading label information..."
            analyzingSteps={['Extracting text from label', 'Identifying product details', 'Checking compliance info']}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-navy-100 py-6 px-4 bg-white/50">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-navy-400">
            LegalMetrix — AI-assisted Legal Metrology Compliance
          </p>
        </div>
      </footer>
    </div>
  );
}
