import { Menu, Bell, Search } from 'lucide-react';
import type { Page } from '@/types';

interface TopbarProps {
  onOpenMobile: () => void;
  current: Page;
}

const pageTitles: Record<Page, { title: string; subtitle: string }> = {
  'role-select': { title: '', subtitle: '' },
  landing: { title: '', subtitle: '' },
  dashboard: { title: 'Dashboard', subtitle: 'Overview of compliance inspections' },
  scanner: { title: 'Scan Product', subtitle: 'Upload product images for AI compliance analysis' },
  inspections: { title: 'Inspections', subtitle: 'View and manage all product inspections' },
  reports: { title: 'Reports', subtitle: 'Generate and download compliance reports' },
  result: { title: 'Compliance Result', subtitle: 'AI analysis and detected information' },
  'mfr-dashboard': { title: 'Manufacturer Dashboard', subtitle: 'Pre-print compliance overview for your packages' },
  'mfr-check': { title: 'Check New Package', subtitle: 'Upload label artwork for pre-compliance screening' },
  'mfr-result': { title: 'Pre-Compliance Result', subtitle: 'AI analysis of your package declarations' },
  'mfr-fixes': { title: 'Fix Suggestions', subtitle: 'Actionable fixes for flagged compliance issues' },
  consumer: { title: 'Consumer Portal', subtitle: 'Coming Soon' },
};

export default function Topbar({ onOpenMobile, current }: TopbarProps) {
  const info = pageTitles[current];

  const isMfr = current.startsWith('mfr-');

  return (
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-navy-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="lg:hidden h-10 w-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-600 hover:bg-navy-100 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-display font-bold text-navy-900">{info.title}</h1>
          <p className="text-xs sm:text-sm text-navy-400 hidden sm:block">{info.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden md:flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-navy-50 border border-navy-100 text-navy-400 w-64">
          <Search size={16} />
          <input
            type="text"
            placeholder={isMfr ? 'Search packages...' : 'Search inspections...'}
            className="bg-transparent text-sm text-navy-700 placeholder-navy-300 outline-none flex-1"
          />
        </div>
        <button className="relative h-10 w-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-600 hover:bg-navy-100 transition-colors">
          <Bell size={19} />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-teal-500 ring-2 ring-white" />
        </button>
        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-navy-100">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center text-white text-sm font-semibold">
            {isMfr ? 'AF' : 'RO'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-navy-800 leading-tight">
              {isMfr ? 'ABC Foods Pvt. Ltd.' : 'Regulatory Officer'}
            </p>
            <p className="text-xs text-navy-400 leading-tight">
              {isMfr ? 'Manufacturer Portal' : 'Legal Metrology Dept.'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
