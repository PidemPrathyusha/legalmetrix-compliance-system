import { useState } from 'react';
import { PackageSearch, FileSearch, Sparkles } from 'lucide-react';
import type { Page } from '@/types';
import ScanInput from './ScanInput';

interface MfrCheckProps {
  onNavigate: (page: Page) => void;
}

const labelTypes = [
  { id: 'front' as const, label: 'Front Label' },
  { id: 'back' as const, label: 'Back Label' },
  { id: 'side' as const, label: 'Side Label' },
];

export default function MfrCheck({ onNavigate }: MfrCheckProps) {
  const [checking, setChecking] = useState(false);

  const handleCheck = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      onNavigate('mfr-result');
    }, 2200);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-navy-900">Check New Package</h2>
            <p className="text-sm text-navy-400 mt-1">Upload your label artwork for pre-compliance screening before printing</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium">
            <Sparkles size={15} />
            Pre-Print Screening
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-navy-50 border border-navy-100">
          <div className="h-8 w-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
            <FileSearch size={16} className="text-teal-600" />
          </div>
          <p className="text-xs text-navy-500 leading-relaxed">
            Capture or upload front, back, and side label artwork. You can also upload PDF packaging documents. Our AI engine will check for mandatory declarations required under the Legal Metrology (Packaged Commodities) Rules — including MRP, net quantity, manufacturer details, and more.
          </p>
        </div>

        <ScanInput
          labels={labelTypes}
          onAnalyze={handleCheck}
          analyzeLabel="Run Pre-Compliance Check"
          analyzing={checking}
          analyzingTitle="Running Pre-Compliance Check"
          analyzingSubtitle="Screening your label against Legal Metrology Rules..."
          analyzingSteps={['Extracting text via OCR', 'Identifying mandatory declarations', 'Checking compliance rules', 'Calculating compliance score']}
        />
      </div>
    </div>
  );
}
