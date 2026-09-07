import { useState } from 'react';
import {
  ShieldCheck, AlertTriangle, FileText, Eye, CheckCircle2, XCircle,
  ArrowLeft, Download, Clock, Phone, Building2, Package, Tag,
  IndianRupee, Scale, Globe, FileSearch, Calendar, Hash, ListTree,
  Cookie, Leaf, AlertCircle, Info, ScanLine, Cpu, ClipboardCheck,
  ChevronDown, ChevronUp, Lock,
} from 'lucide-react';
import type { Page } from '@/types';
import { demoAnalysis } from '@/data';

interface ResultProps {
  onNavigate: (page: Page) => void;
}

const fieldIcons: Record<string, typeof Package> = {
  'Product Name': Package,
  'Category': Tag,
  'Net Quantity': Scale,
  'MRP': IndianRupee,
  'Manufacturer Name': Building2,
  'Country of Origin': Globe,
  'Consumer Care Contact': Phone,
  'Batch / Lot Number': Hash,
  'Date of Manufacture': Calendar,
  'Best Before': Clock,
  'FSSAI License No.': FileSearch,
  'Nutritional Information': ListTree,
  'Vegetarian/Non-Veg Symbol': Leaf,
  'Ingredients List': Cookie,
  'Allergen Declaration': AlertCircle,
};

export default function Result({ onNavigate }: ResultProps) {
  const [showEvidence, setShowEvidence] = useState(false);
  const [fieldEvidence, setFieldEvidence] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [expandedWhy, setExpandedWhy] = useState(true);
  const a = demoAnalysis;

  const productInfo = [
    { label: 'Product', value: a.product, icon: Package },
    { label: 'Category', value: a.category, icon: Tag },
    { label: 'Net Quantity', value: a.netQuantity, icon: Scale },
    { label: 'MRP', value: a.mrp, icon: IndianRupee },
    { label: 'Manufacturer', value: a.manufacturer, icon: Building2 },
    { label: 'Country of Origin', value: a.countryOfOrigin, icon: Globe },
    { label: 'Consumer Care', value: a.consumerCare, icon: Phone },
  ];

  const compliantFields = a.detectedFields.filter((f) => f.compliant).length;
  const flaggedFields = a.detectedFields.filter((f) => !f.compliant);
  const totalFields = a.detectedFields.length;
  const avgConfidence = Math.round(a.detectedFields.reduce((s, f) => s + f.confidence, 0) / totalFields);

  const whyReasons = [
    {
      icon: CheckCircle2,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      title: '14 of 15 mandatory fields detected',
      desc: 'The product label contains nearly all required declarations under the Legal Metrology (Packaged Commodities) Rules, including net quantity, MRP, manufacturer details, and allergen information.',
    },
    {
      icon: AlertTriangle,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      title: 'FSSAI License No. requires manual verification',
      desc: 'The FSSAI license number was detected at 79% confidence. While the format appears valid, it should be cross-checked against the FSSAI central registry to confirm the license is active and linked to the declared manufacturer.',
    },
    {
      icon: Cpu,
      color: 'text-navy-600',
      bg: 'bg-navy-50',
      title: 'High overall OCR confidence',
      desc: `Average field confidence is ${avgConfidence}%. Text extraction quality is sufficient for automated screening, but low-confidence fields (below 80%) benefit from human review of the source image.`,
    },
    {
      icon: ClipboardCheck,
      color: 'text-navy-600',
      bg: 'bg-navy-50',
      title: 'Score calculation',
      desc: 'The 94% compliance score is derived from the presence and confidence of mandatory label fields. One field flagged for review reduces the score from a perfect 100%. The score reflects label completeness, not a legal compliance determination.',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back */}
        <button
          onClick={() => onNavigate('scanner')}
          className="flex items-center gap-2 text-sm font-semibold text-navy-500 hover:text-navy-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Scanner
        </button>

        {/* Compliance Score Card + Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-navy-800 to-navy-950 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Score Ring */}
              <div className="relative h-28 w-28 flex-shrink-0">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#14a89a" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(a.score / 100) * 276.5} 276.5`} className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-display font-extrabold">{a.score}%</span>
                  <span className="text-[10px] text-navy-300 uppercase tracking-wide">Score</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck size={20} className="text-teal-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">Compliance Analysis Complete</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold mb-1">{a.product}</h2>
                <p className="text-sm text-navy-200">{a.category} · {a.netQuantity} · {a.mrp}</p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="bg-white/5 rounded-xl px-4 py-2 border border-white/10">
                    <p className="text-xl font-display font-bold text-teal-400">{compliantFields}/{totalFields}</p>
                    <p className="text-[10px] text-navy-300 uppercase tracking-wide">Fields Passed</p>
                  </div>
                  <div className="bg-white/5 rounded-xl px-4 py-2 border border-white/10">
                    <p className="text-xl font-display font-bold text-amber-400">{flaggedFields.length}</p>
                    <p className="text-[10px] text-navy-300 uppercase tracking-wide">Need Review</p>
                  </div>
                  <div className="bg-white/5 rounded-xl px-4 py-2 border border-white/10">
                    <p className="text-xl font-display font-bold text-white">{avgConfidence}%</p>
                    <p className="text-[10px] text-navy-300 uppercase tracking-wide">Avg Confidence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge Card */}
          <div className="bg-white rounded-2xl p-6 card-shadow border border-navy-100 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <AlertTriangle size={22} className="text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Status</p>
                <p className="text-sm font-bold text-navy-900">Compliance Determination</p>
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 mb-4">
              <div className="flex items-start gap-2.5">
                <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-800 leading-snug">Potential Issue</p>
                  <p className="text-sm font-semibold text-amber-700 leading-snug">Human Verification Recommended</p>
                </div>
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-navy-400">Inspection ID</span>
                <span className="font-semibold text-navy-700">INSP-2026-0042</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-navy-400">Date & Time</span>
                <span className="font-semibold text-navy-700">07 Sep 2026, 10:42 AM</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-navy-400">Engine</span>
                <span className="font-semibold text-navy-700">AI v2.1</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-navy-400">Verification</span>
                <span className={`font-semibold ${verified ? 'text-teal-600' : 'text-amber-600'}`}>
                  {verified ? 'Verified' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Why This Result */}
        <div className="bg-white rounded-2xl card-shadow border border-navy-100 overflow-hidden">
          <button
            onClick={() => setExpandedWhy(!expandedWhy)}
            className="w-full p-6 flex items-center justify-between hover:bg-navy-50/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center">
                <Info size={20} className="text-teal-600" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-display font-bold text-navy-900">Why this result?</h2>
                <p className="text-sm text-navy-400">AI reasoning behind the compliance score and status</p>
              </div>
            </div>
            {expandedWhy ? <ChevronUp size={20} className="text-navy-400" /> : <ChevronDown size={20} className="text-navy-400" />}
          </button>
          {expandedWhy && (
            <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              {whyReasons.map((reason, i) => {
                const Icon = reason.icon;
                return (
                  <div key={i} className="flex gap-3.5 p-4 rounded-xl bg-navy-50/50 border border-navy-100">
                    <div className={`h-10 w-10 rounded-xl ${reason.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={20} className={reason.color} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-navy-900 mb-1">{reason.title}</h3>
                      <p className="text-xs text-navy-500 leading-relaxed">{reason.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Detected Information Table */}
        <div className="bg-white rounded-2xl card-shadow border border-navy-100 overflow-hidden">
          <div className="p-6 border-b border-navy-100 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-display font-bold text-navy-900">Detected Information</h2>
              <p className="text-sm text-navy-400">AI-extracted fields with confidence scores and compliance status</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                {compliantFields} Passed
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold flex items-center gap-1.5">
                <AlertTriangle size={13} />
                {flaggedFields.length} Flagged
              </span>
            </div>
          </div>
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full">
              <thead>
                <tr className="bg-navy-50/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">Field</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">Detected Value</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400 hidden md:table-cell">Confidence</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-navy-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {a.detectedFields.map((field) => {
                  const Icon = fieldIcons[field.label] || FileSearch;
                  return (
                    <tr key={field.label} className="hover:bg-navy-50/40 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0">
                            <Icon size={14} className="text-navy-500" />
                          </div>
                          <span className="text-sm font-semibold text-navy-700">{field.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 max-w-xs">
                        <span className="text-sm text-navy-600 line-clamp-2">{field.value}</span>
                        {field.note && (
                          <p className="text-xs text-navy-400 italic mt-1 line-clamp-1 hidden lg:block">{field.note}</p>
                        )}
                      </td>
                      <td className="px-6 py-3.5 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-navy-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${field.confidence >= 90 ? 'bg-teal-500' : field.confidence >= 80 ? 'bg-amber-500' : 'bg-red-400'}`}
                              style={{ width: `${field.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-navy-700">{field.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        {field.compliant ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                            <CheckCircle2 size={14} className="text-teal-500" />
                            Passed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <AlertTriangle size={14} className="text-amber-500" />
                            Verify
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        {!field.compliant ? (
                          <button
                            onClick={() => setFieldEvidence(field.label)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-navy-900 text-white hover:bg-navy-800 transition-colors"
                          >
                            <Eye size={13} />
                            Evidence
                          </button>
                        ) : (
                          <span className="text-xs text-navy-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Field Evidence Modal */}
        {fieldEvidence && (
          <div className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setFieldEvidence(null)}>
            <div className="bg-white rounded-2xl max-w-lg w-full card-shadow-lg animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-navy-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <AlertTriangle size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-navy-900">Field Evidence</h3>
                    <p className="text-sm text-navy-400">{fieldEvidence}</p>
                  </div>
                </div>
                <button onClick={() => setFieldEvidence(null)} className="h-9 w-9 rounded-xl bg-navy-50 flex items-center justify-center text-navy-500 hover:bg-navy-100 transition-colors">
                  <XCircle size={18} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {(() => {
                  const field = a.detectedFields.find((f) => f.label === fieldEvidence);
                  if (!field) return null;
                  return (
                    <>
                      <div className="rounded-xl bg-navy-50 p-4 border border-navy-100">
                        <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">Detected Value</p>
                        <p className="text-sm font-mono text-navy-700">{field.value}</p>
                      </div>
                      <div className="rounded-xl bg-amber-50 p-4 border border-amber-100">
                        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">Flag Reason</p>
                        <p className="text-sm text-amber-800">{field.note || 'This field was flagged for manual review due to lower detection confidence.'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-navy-50 p-3 border border-navy-100 text-center">
                          <p className="text-xs text-navy-400 mb-1">Confidence</p>
                          <p className="text-xl font-display font-bold text-navy-800">{field.confidence}%</p>
                        </div>
                        <div className="rounded-xl bg-navy-50 p-3 border border-navy-100 text-center">
                          <p className="text-xs text-navy-400 mb-1">Threshold</p>
                          <p className="text-xl font-display font-bold text-navy-800">90%</p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-teal-50 p-3 border border-teal-100 flex items-start gap-2.5">
                        <ClipboardCheck size={16} className="text-teal-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-teal-700 leading-relaxed">
                          Recommended action: Cross-verify this value against the official registry or the physical product label before making a compliance determination.
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Global Evidence Modal */}
        {showEvidence && (
          <div className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowEvidence(false)}>
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto scrollbar-thin card-shadow-lg animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-navy-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center">
                    <Eye size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-navy-900">Evidence View</h3>
                    <p className="text-sm text-navy-400">Source data for compliance analysis</p>
                  </div>
                </div>
                <button onClick={() => setShowEvidence(false)} className="h-9 w-9 rounded-xl bg-navy-50 flex items-center justify-center text-navy-500 hover:bg-navy-100 transition-colors">
                  <XCircle size={18} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="rounded-xl bg-navy-50 p-4 border border-navy-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-2">Raw OCR Output</p>
                  <pre className="text-xs text-navy-700 font-mono whitespace-pre-wrap leading-relaxed">{`ABC PREMIUM BISCUITS
NET WT 500 g | MRP ₹120 (incl. of all taxes)
MANUFACTURED BY: ABC Foods Pvt. Ltd.
Mfg. Date: 15/08/2026 | Best Before 6 months
Batch: BN-2026-08-15
FSSAI License No.: FSSAI-100180XX00000
Country of Origin: India
Consumer Care: 1800-XXX-XXXX
INGREDIENTS: Wheat flour, sugar, edible
vegetable oil, cocoa solids, milk solids...
NUTRITIONAL INFO (per 100g): Energy 452 kcal
Protein 7g | Fat 18g | Carbohydrates 68g
[GREEN DOT - VEGETARIAN]
ALLERGEN: Contains wheat and milk.
May contain traces of nuts.`}</pre>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-teal-50 p-3 border border-teal-100">
                    <p className="text-xs font-semibold text-teal-700 mb-1">Mandatory Fields Found</p>
                    <p className="text-2xl font-display font-bold text-teal-800">{compliantFields}/{totalFields}</p>
                  </div>
                  <div className="rounded-xl bg-amber-50 p-3 border border-amber-100">
                    <p className="text-xs font-semibold text-amber-700 mb-1">Fields Needing Review</p>
                    <p className="text-2xl font-display font-bold text-amber-800">{flaggedFields.length}</p>
                  </div>
                </div>
                <div className="rounded-xl bg-navy-50 p-4 border border-navy-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-3">Compliance Checks Performed</p>
                  <div className="space-y-2">
                    {[
                      'Net quantity declared in standard units',
                      'MRP clearly printed with ₹ symbol',
                      'Manufacturer name and address present',
                      'Country of origin declared',
                      'Consumer care contact provided',
                      'Batch/lot number for traceability',
                      'Date of manufacture and best before',
                      'Nutritional info per 100g as required',
                      'Veg/Non-veg symbol present',
                      'Ingredients list present',
                      'Allergen declaration present',
                      'FSSAI license number format valid',
                    ].map((check, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={15} className="text-teal-500 flex-shrink-0" />
                        <span className="text-navy-600">{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prominent Action Buttons */}
        <div className="bg-white rounded-2xl p-6 card-shadow border border-navy-100">
          <div className="flex items-center gap-2 mb-5">
            <ScanLine size={20} className="text-teal-600" />
            <h2 className="text-lg font-display font-bold text-navy-900">Inspection Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setShowEvidence(true)}
              className="group bg-navy-900 rounded-2xl p-5 text-white hover:bg-navy-800 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/20 text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                  <Eye size={20} className="text-teal-400" />
                </div>
                <h3 className="font-display font-bold text-white">View Evidence</h3>
              </div>
              <p className="text-sm text-navy-200">See raw OCR data and all compliance checks performed</p>
            </button>

            <button
              onClick={() => setVerified(true)}
              disabled={verified}
              className={`group rounded-2xl p-5 border transition-all hover:-translate-y-0.5 text-left ${
                verified
                  ? 'bg-teal-50 border-teal-200 cursor-default'
                  : 'bg-gradient-to-br from-teal-500 to-teal-600 border-teal-500 text-white hover:shadow-xl hover:shadow-teal-500/25'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${verified ? 'bg-teal-100' : 'bg-white/15'}`}>
                  <ShieldCheck size={20} className={verified ? 'text-teal-600' : 'text-white'} />
                </div>
                <h3 className={`font-display font-bold ${verified ? 'text-teal-800' : 'text-white'}`}>
                  {verified ? 'Verified' : 'Verify Result'}
                </h3>
              </div>
              <p className={`text-sm ${verified ? 'text-teal-600' : 'text-teal-50'}`}>
                {verified ? 'Human verification confirmed. Inspection marked as verified.' : 'Confirm the AI analysis with human verification'}
              </p>
              {verified && (
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-teal-600">
                  <CheckCircle2 size={14} />
                  Verification complete
                </div>
              )}
            </button>

            <button
              onClick={() => setReportGenerated(true)}
              className="group bg-white rounded-2xl p-5 card-shadow border-2 border-navy-200 hover:border-teal-400 hover:shadow-xl transition-all hover:-translate-y-0.5 text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl bg-navy-50 flex items-center justify-center group-hover:bg-teal-50 transition-colors">
                  <FileText size={20} className="text-navy-600 group-hover:text-teal-600 transition-colors" />
                </div>
                <h3 className="font-display font-bold text-navy-900">Generate Report</h3>
              </div>
              <p className="text-sm text-navy-400">
                {reportGenerated ? 'Report generated and ready for download' : 'Create a detailed compliance report for this product'}
              </p>
              {reportGenerated && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-teal-600">
                    <CheckCircle2 size={14} />
                    Ready
                  </span>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 text-white text-xs font-semibold hover:bg-teal-600 transition-colors">
                    <Download size={13} />
                    Download PDF
                  </button>
                </div>
              )}
            </button>
          </div>
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

        {/* Inspection ID */}
        <div className="flex items-center justify-center gap-2 text-sm text-navy-400 pt-2">
          <Hash size={14} />
          Inspection ID: INSP-2026-0042
          <span className="text-navy-200">•</span>
          <Clock size={14} />
          2026-09-07 at 10:42 AM
        </div>
      </div>
    </div>
  );
}
