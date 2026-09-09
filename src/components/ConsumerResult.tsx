import { ArrowLeft, User, CheckCircle2, AlertTriangle, ShieldCheck, Bell, Package, Tag, Scale, IndianRupee, Building2, Globe, Phone, Lock } from 'lucide-react';
import type { Page } from '@/types';

interface ConsumerResultProps {
  onNavigate: (page: Page) => void;
}

const productInfo = [
  { label: 'Product', value: 'ABC Premium Biscuits', icon: Package },
  { label: 'Category', value: 'Packaged Food', icon: Tag },
  { label: 'Net Quantity', value: '500 g', icon: Scale },
  { label: 'MRP', value: '₹120', icon: IndianRupee },
  { label: 'Manufacturer', value: 'ABC Foods Pvt. Ltd.', icon: Building2 },
  { label: 'Country of Origin', value: 'India', icon: Globe },
  { label: 'Consumer Care', value: '1800-XXX-XXXX', icon: Phone },
];

export default function ConsumerResult({ onNavigate }: ConsumerResultProps) {
  return (
    <div className="min-h-screen bg-navy-50/30 flex flex-col">
      {/* Top bar */}
      <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-navy-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('consumer')}
            className="h-10 w-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-600 hover:bg-navy-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-display font-bold text-navy-900">Compliance Info</h1>
            <p className="text-xs sm:text-sm text-navy-400 hidden sm:block">Simple compliance summary for your product</p>
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
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Score Card */}
          <div className="bg-gradient-to-br from-navy-800 to-navy-950 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative h-24 w-24 flex-shrink-0">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#14a89a" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(94 / 100) * 276.5} 276.5`} className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-display font-extrabold">94%</span>
                  <span className="text-[10px] text-navy-300 uppercase tracking-wide">Score</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck size={20} className="text-teal-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">Compliance Check Complete</span>
                </div>
                <h2 className="text-2xl font-display font-bold mb-1">ABC Premium Biscuits</h2>
                <p className="text-sm text-navy-200">Packaged Food · 500 g · ₹120</p>
                <div className="mt-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
                    <AlertTriangle size={14} />
                    Minor issue found — see details below
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* What This Means */}
          <div className="bg-white rounded-2xl p-5 card-shadow border border-navy-100">
            <h3 className="text-sm font-bold text-navy-900 mb-3">What This Means</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={16} className="text-teal-600" />
                </div>
                <p className="text-sm text-navy-600 leading-relaxed">
                  This product has most of the mandatory label information required under the Legal Metrology Rules, including MRP, net quantity, and manufacturer details.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={16} className="text-amber-500" />
                </div>
                <p className="text-sm text-navy-600 leading-relaxed">
                  One field (FSSAI License Number) needs verification. This doesn't mean the product is non-compliant — it means the AI couldn't fully confirm this detail from the label image.
                </p>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={info.label} className="bg-white rounded-xl p-4 card-shadow border border-navy-100 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-navy-50 flex items-center justify-center">
                      <Icon size={15} className="text-navy-500" />
                    </div>
                    <span className="text-xs font-medium text-navy-400">{info.label}</span>
                  </div>
                  <p className="text-sm font-semibold text-navy-800 leading-snug">{info.value}</p>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-navy-50 border border-navy-100">
            <div className="h-8 w-8 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
              <Lock size={16} className="text-navy-500" />
            </div>
            <p className="text-xs text-navy-500 leading-relaxed">
              <span className="font-semibold text-navy-700">Disclaimer:</span> AI screening result. Final compliance determination requires authorized human verification.
            </p>
          </div>

          {/* Scan Another */}
          <div className="flex justify-center">
            <button
              onClick={() => onNavigate('consumer')}
              className="px-6 py-3.5 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-all hover:shadow-lg hover:shadow-navy-900/20 flex items-center gap-2"
            >
              <ArrowLeft size={17} />
              Scan Another Product
            </button>
          </div>
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
