import { CheckCircle2, AlertTriangle, Clock, FileSearch, TrendingUp, TrendingDown, ArrowRight, ScanLine } from 'lucide-react';
import type { Page, Inspection, ComplianceStatus } from '@/types';
import { mockInspections } from '@/data';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

const statusConfig: Record<ComplianceStatus, { label: string; badge: string; dot: string }> = {
  compliant: { label: 'Compliant', badge: 'bg-teal-50 text-teal-700 border-teal-200', dot: 'bg-teal-500' },
  potential: { label: 'Potential Issue', badge: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  pending: { label: 'Pending', badge: 'bg-navy-50 text-navy-600 border-navy-200', dot: 'bg-navy-400' },
};

export default function Dashboard({ onNavigate }: DashboardProps) {
  const total = mockInspections.length;
  const compliant = mockInspections.filter((i) => i.status === 'compliant').length;
  const potential = mockInspections.filter((i) => i.status === 'potential').length;
  const pending = mockInspections.filter((i) => i.status === 'pending').length;
  const complianceRate = Math.round((compliant / total) * 100);

  const cards = [
    {
      label: 'Total Inspections',
      value: total,
      icon: FileSearch,
      change: '+12%',
      trend: 'up',
      gradient: 'from-navy-700 to-navy-900',
      iconBg: 'bg-navy-100 text-navy-700',
    },
    {
      label: 'Compliant',
      value: compliant,
      icon: CheckCircle2,
      change: `${complianceRate}%`,
      trend: 'up',
      gradient: 'from-teal-500 to-teal-700',
      iconBg: 'bg-teal-100 text-teal-700',
    },
    {
      label: 'Potential Issues',
      value: potential,
      icon: AlertTriangle,
      change: '-3%',
      trend: 'down',
      gradient: 'from-amber-500 to-amber-600',
      iconBg: 'bg-amber-100 text-amber-700',
    },
    {
      label: 'Pending Verification',
      value: pending,
      icon: Clock,
      change: '2 new',
      trend: 'up',
      gradient: 'from-navy-500 to-navy-700',
      iconBg: 'bg-navy-100 text-navy-600',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="group relative bg-white rounded-2xl p-5 sm:p-6 card-shadow border border-navy-100 hover:card-shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`h-12 w-12 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                  <Icon size={22} strokeWidth={2} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${card.trend === 'up' ? 'text-teal-600' : 'text-amber-600'}`}>
                  {card.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {card.change}
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900">{card.value}</p>
              <p className="text-sm text-navy-400 mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Compliance Overview + Quick Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 card-shadow border border-navy-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-display font-bold text-navy-900">Compliance Overview</h2>
              <p className="text-sm text-navy-400">Distribution of inspection results</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative h-40 w-40 flex-shrink-0">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#14a89a" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${(compliant / total) * 264} 264`} className="transition-all duration-1000" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${(potential / total) * 264} 264`}
                  strokeDashoffset={-((compliant / total) * 264)} className="transition-all duration-1000" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#6b7c93" strokeWidth="12" strokeLinecap="round"
                  strokeDasharray={`${(pending / total) * 264} 264`}
                  strokeDashoffset={-(((compliant + potential) / total) * 264)} className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-display font-extrabold text-navy-900">{complianceRate}%</span>
                <span className="text-xs text-navy-400">Compliance</span>
              </div>
            </div>
            <div className="flex-1 space-y-3 w-full">
              {[
                { label: 'Compliant', value: compliant, color: 'bg-teal-500', pct: Math.round((compliant / total) * 100) },
                { label: 'Potential Issues', value: potential, color: 'bg-amber-500', pct: Math.round((potential / total) * 100) },
                { label: 'Pending Verification', value: pending, color: 'bg-navy-400', pct: Math.round((pending / total) * 100) },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                      <span className="text-sm font-medium text-navy-700">{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-navy-900">{item.value} ({item.pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-navy-50 overflow-hidden">
                    <div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-navy-800 to-navy-950 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="relative">
            <div className="h-12 w-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-4">
              <ScanLine size={24} className="text-teal-400" />
            </div>
            <h2 className="text-xl font-display font-bold mb-2">New Inspection</h2>
            <p className="text-sm text-navy-200 mb-6 leading-relaxed">
              Scan a product label to check for Legal Metrology compliance issues instantly.
            </p>
            <button
              onClick={() => onNavigate('scanner')}
              className="w-full px-4 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-teal-500/30 flex items-center justify-center gap-2"
            >
              Start Scanning
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Inspections */}
      <div className="bg-white rounded-2xl card-shadow border border-navy-100 overflow-hidden">
        <div className="p-6 border-b border-navy-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-display font-bold text-navy-900">Recent Inspections</h2>
            <p className="text-sm text-navy-400">Latest product compliance checks</p>
          </div>
          <button
            onClick={() => onNavigate('inspections')}
            className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
          >
            View All
            <ArrowRight size={15} />
          </button>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead>
              <tr className="bg-navy-50/50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400 hidden md:table-cell">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400 hidden lg:table-cell">Net Qty</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400 hidden lg:table-cell">MRP</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">Score</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400 hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {mockInspections.slice(0, 6).map((insp: Inspection) => {
                const sc = statusConfig[insp.status];
                return (
                  <tr key={insp.id} className="hover:bg-navy-50/40 transition-colors cursor-pointer" onClick={() => onNavigate('inspections')}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
                          <FileSearch size={16} className="text-navy-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy-800">{insp.product}</p>
                          <p className="text-xs text-navy-400">{insp.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-sm text-navy-600">{insp.category}</span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm text-navy-600">{insp.netQuantity}</span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm font-semibold text-navy-700">{insp.mrp}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-navy-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${insp.score >= 90 ? 'bg-teal-500' : insp.score >= 75 ? 'bg-amber-500' : 'bg-red-400'}`}
                            style={{ width: `${insp.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-navy-800">{insp.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${sc.badge}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="text-sm text-navy-600">{insp.date}</p>
                      <p className="text-xs text-navy-400">{insp.time}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
