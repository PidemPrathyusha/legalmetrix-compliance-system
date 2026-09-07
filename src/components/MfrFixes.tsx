import {
  AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, RefreshCw,
  Lightbulb, Wrench, Eye, ShieldCheck, Lock, Info,
} from 'lucide-react';
import type { Page } from '@/types';
import { demoFixSuggestions } from '@/data';

interface MfrFixesProps {
  onNavigate: (page: Page) => void;
}

export default function MfrFixes({ onNavigate }: MfrFixesProps) {
  const fixes = demoFixSuggestions;
  const totalFixes = fixes.length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back */}
        <button
          onClick={() => onNavigate('mfr-result')}
          className="flex items-center gap-2 text-sm font-semibold text-navy-500 hover:text-navy-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Result
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-navy-800 to-navy-950 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-amber-500/15 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Wrench size={28} className="text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Fix Suggestions</span>
                </div>
                <h2 className="text-2xl font-display font-bold">Issues to Fix Before Printing</h2>
                <p className="text-sm text-navy-200 mt-1">
                  {totalFixes} issue{totalFixes !== 1 ? 's' : ''} detected on ABC Premium Biscuits — resolve these before sending to print
                </p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl px-5 py-3 border border-white/10 text-center flex-shrink-0">
              <p className="text-3xl font-display font-extrabold text-amber-400">{totalFixes}</p>
              <p className="text-[10px] text-navy-300 uppercase tracking-wide">To Fix</p>
            </div>
          </div>
        </div>

        {/* Fix Cards */}
        <div className="space-y-4">
          {fixes.map((fix, i) => (
            <div
              key={fix.field}
              className="bg-white rounded-2xl card-shadow border border-navy-100 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Card Header */}
              <div className="p-5 border-b border-navy-50 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <AlertTriangle size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-navy-900">{fix.field}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${
                      fix.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-navy-100 text-navy-600'
                    }`}>
                      {fix.severity === 'medium' ? 'Medium Priority' : 'Low Priority'}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-navy-400">Issue {i + 1} of {totalFixes}</span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                {/* What was detected */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0">
                    <Eye size={16} className="text-navy-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-1">What was detected</p>
                    <p className="text-sm text-navy-700 font-mono bg-navy-50 rounded-lg px-3 py-2 inline-block">
                      {fix.detected}
                    </p>
                  </div>
                </div>

                {/* Why it may need verification */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Info size={16} className="text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-1">Why it may need verification</p>
                    <p className="text-sm text-navy-600 leading-relaxed">{fix.reason}</p>
                  </div>
                </div>

                {/* Suggested action */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Lightbulb size={16} className="text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-1">Suggested action</p>
                    <p className="text-sm text-navy-700 leading-relaxed bg-teal-50/50 border border-teal-100 rounded-lg p-3">
                      {fix.action}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-4 bg-navy-50/50 border-t border-navy-50 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 text-xs text-navy-400">
                  <ShieldCheck size={14} className="text-teal-500" />
                  Fix this before printing to improve your compliance score
                </div>
                <button
                  onClick={() => onNavigate('mfr-check')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors"
                >
                  <RefreshCw size={15} />
                  Recheck Package
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Bar */}
        <div className="bg-white rounded-2xl p-5 card-shadow border border-navy-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-teal-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-navy-900">After Fixing</h3>
              <p className="text-xs text-navy-400">Your expected compliance score after resolving all issues</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-navy-700">Current Score</span>
                <span className="text-sm font-bold text-amber-600">94%</span>
              </div>
              <div className="h-3 rounded-full bg-navy-50 overflow-hidden">
                <div className="h-full rounded-full bg-amber-500" style={{ width: '94%' }} />
              </div>
            </div>
            <ArrowRight size={20} className="text-navy-300 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-navy-700">Expected Score</span>
                <span className="text-sm font-bold text-teal-600">100%</span>
              </div>
              <div className="h-3 rounded-full bg-navy-50 overflow-hidden">
                <div className="h-full rounded-full bg-teal-500 transition-all duration-1000" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recheck Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('mfr-result')}
            className="flex items-center gap-2 text-sm font-semibold text-navy-500 hover:text-navy-800 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Result
          </button>
          <button
            onClick={() => onNavigate('mfr-check')}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 text-white text-base font-semibold hover:shadow-xl hover:shadow-teal-500/30 transition-all hover:scale-105 flex items-center gap-3 min-w-[200px] justify-center"
          >
            <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            Recheck Package
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
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
      </div>
    </div>
  );
}
