import { CheckCircle2, AlertTriangle, Clock, PackageSearch, TrendingUp, TrendingDown, ArrowRight, FileSearch } from 'lucide-react';
import type { Page, PackageCheck, ComplianceStatus } from '@/types';
import { mockPackageChecks } from '@/data';

interface MfrDashboardProps {
  onNavigate: (page: Page) => void;
}

const statusConfig: Record<ComplianceStatus, { label: string; badge: string; dot: string }> = {
  compliant: { label: 'Compliant', badge: 'bg-teal-50 text-teal-700 border-teal-200', dot: 'bg-teal-500' },
  potential: { label: 'Potential Issue', badge: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  pending: { label: 'Pending', badge: 'bg-navy-50 text-navy-600 border-navy-200', dot: 'bg-navy-400' },
};

export default function MfrDashboard({ onNavigate }: MfrDashboardProps) {
  const total = mockPackageChecks.length;
  const compliant = mockPackageChecks.filter((c) => c.status === 'compliant').length;
  const potential = mockPackageChecks.filter((c) => c.status === 'potential').length;
  const pending = mockPackageChecks.filter((c) => c.status === 'pending').length;

  const cards = [
    { label: 'Packages Checked', value: total, icon: PackageSearch, change: '+8%', trend: 'up' as const, iconBg: 'bg-navy-100 text-navy-700' },
    { label: 'Compliant', value: compliant, icon: CheckCircle2, change: '67%', trend: 'up' as const, iconBg: 'bg-teal-100 text-teal-700' },
    { label: 'Potential Issues', value: potential, icon: AlertTriangle, change: '-2', trend: 'down' as const, iconBg: 'bg-amber-100 text-amber-700' },
    { label: 'Pending Review', value: pending, icon: Clock, change: '1 new', trend: 'up' as const, iconBg: 'bg-navy-100 text-navy-600' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-navy-800 to-navy-950 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-teal-500/15 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PackageSearch size={20} className="text-teal-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">Manufacturer Compliance Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">Welcome back, ABC Foods</h2>
            <p className="text-sm text-navy-200 max-w-xl">
              Check your product packages for potential Legal Metrology declaration issues before printing or launching. Catch compliance gaps early and avoid costly recalls.
            </p>
          </div>
          <button
            onClick={() => onNavigate('mfr-check')}
            className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-semibold hover:shadow-xl hover:shadow-teal-500/30 transition-all hover:scale-105 flex items-center gap-2.5 flex-shrink-0"
          >
            <PackageSearch size={18} />
            Check New Package
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

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

      {/* Recent Package Checks */}
      <div className="bg-white rounded-2xl card-shadow border border-navy-100 overflow-hidden">
        <div className="p-6 border-b border-navy-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-display font-bold text-navy-900">Recent Package Checks</h2>
            <p className="text-sm text-navy-400">Latest pre-compliance screenings for your products</p>
          </div>
          <button
            onClick={() => onNavigate('mfr-result')}
            className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
          >
            View Latest Result
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
              {mockPackageChecks.map((pkg: PackageCheck) => {
                const sc = statusConfig[pkg.status];
                return (
                  <tr
                    key={pkg.id}
                    className="hover:bg-navy-50/40 transition-colors cursor-pointer"
                    onClick={() => onNavigate('mfr-result')}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
                          <PackageSearch size={16} className="text-navy-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy-800">{pkg.product}</p>
                          <p className="text-xs text-navy-400">{pkg.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-sm text-navy-600">{pkg.category}</span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm text-navy-600">{pkg.netQuantity}</span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-sm font-semibold text-navy-700">{pkg.mrp}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-navy-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${pkg.score >= 90 ? 'bg-teal-500' : pkg.score >= 75 ? 'bg-amber-500' : 'bg-red-400'}`}
                            style={{ width: `${pkg.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-navy-800">{pkg.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${sc.badge}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="text-sm text-navy-600">{pkg.date}</p>
                      <p className="text-xs text-navy-400">{pkg.time}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: CheckCircle2, title: 'Check Before Printing', desc: 'Run a pre-compliance check on your label artwork before sending it to print.', color: 'text-teal-600', bg: 'bg-teal-50' },
          { icon: AlertTriangle, title: 'Fix Issues Early', desc: 'Get actionable fix suggestions for any flagged declarations.', color: 'text-amber-600', bg: 'bg-amber-50' },
          { icon: Clock, title: 'Save Time', desc: 'Avoid costly reprints and recalls by catching issues upfront.', color: 'text-navy-600', bg: 'bg-navy-50' },
        ].map((tip, i) => {
          const Icon = tip.icon;
          return (
            <div key={i} className="bg-white rounded-xl p-5 card-shadow border border-navy-100 flex items-start gap-3">
              <div className={`h-10 w-10 rounded-xl ${tip.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={20} className={tip.color} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy-900 mb-1">{tip.title}</h3>
                <p className="text-xs text-navy-400 leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
