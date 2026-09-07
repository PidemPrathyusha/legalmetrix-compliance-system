import { FileText, Download, Calendar, TrendingUp, CheckCircle2, AlertTriangle, Clock, FileBarChart, ArrowRight } from 'lucide-react';
import type { Page } from '@/types';
import { mockInspections } from '@/data';

interface ReportsProps {
  onNavigate: (page: Page) => void;
}

export default function Reports({ onNavigate }: ReportsProps) {
  const total = mockInspections.length;
  const compliant = mockInspections.filter((i) => i.status === 'compliant').length;
  const potential = mockInspections.filter((i) => i.status === 'potential').length;
  const pending = mockInspections.filter((i) => i.status === 'pending').length;
  const avgScore = Math.round(mockInspections.reduce((sum, i) => sum + i.score, 0) / total);

  const reportTypes = [
    { title: 'Monthly Compliance Summary', desc: 'Overview of all inspections with compliance rates and trends', icon: FileBarChart, date: 'September 2026', color: 'from-navy-700 to-navy-900' },
    { title: 'Non-Compliance Report', desc: 'Detailed list of products with potential compliance issues', icon: AlertTriangle, date: 'September 2026', color: 'from-amber-500 to-amber-700' },
    { title: 'Product Category Analysis', desc: 'Compliance breakdown by product category and manufacturer', icon: FileText, date: 'Q3 2026', color: 'from-teal-500 to-teal-700' },
    { title: 'Verification Audit Trail', desc: 'Record of human-verified inspections and audit history', icon: CheckCircle2, date: 'September 2026', color: 'from-navy-600 to-navy-800' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', value: total, icon: FileText, color: 'bg-navy-50 text-navy-700' },
          { label: 'Avg. Compliance Score', value: `${avgScore}%`, icon: TrendingUp, color: 'bg-teal-50 text-teal-700' },
          { label: 'Issues Flagged', value: potential, icon: AlertTriangle, color: 'bg-amber-50 text-amber-700' },
          { label: 'Pending Review', value: pending, icon: Clock, color: 'bg-navy-50 text-navy-600' },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl p-5 card-shadow border border-navy-100 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`h-10 w-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">{card.value}</p>
              <p className="text-xs sm:text-sm text-navy-400 mt-0.5">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Compliance Trend Chart */}
      <div className="bg-white rounded-2xl p-6 card-shadow border border-navy-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-display font-bold text-navy-900">Compliance Trend</h2>
            <p className="text-sm text-navy-400">Weekly compliance score over the last 5 weeks</p>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 text-xs font-semibold flex items-center gap-1.5">
            <TrendingUp size={14} />
            +4.2% improvement
          </span>
        </div>
        <div className="flex items-end justify-between gap-3 h-48">
          {[
            { week: 'W1', score: 82, height: '65%' },
            { week: 'W2', score: 85, height: '72%' },
            { week: 'W3', score: 79, height: '58%' },
            { week: 'W4', score: 88, height: '82%' },
            { week: 'W5', score: 91, height: '92%' },
          ].map((bar, i) => (
            <div key={bar.week} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-navy-700">{bar.score}%</span>
              <div className="w-full rounded-t-xl bg-gradient-to-t from-teal-500 to-teal-400 transition-all duration-1000 hover:from-teal-600 hover:to-teal-500" style={{ height: bar.height, animationDelay: `${i * 0.1}s` }} />
              <span className="text-xs text-navy-400">{bar.week}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Report Types */}
      <div>
        <h2 className="text-lg font-display font-bold text-navy-900 mb-4">Available Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((report, i) => {
            const Icon = report.icon;
            return (
              <div key={report.title} className="group bg-white rounded-2xl p-5 card-shadow border border-navy-100 hover:border-teal-200 hover:card-shadow-lg transition-all duration-300 hover:-translate-y-0.5 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-navy-900 mb-1">{report.title}</h3>
                    <p className="text-sm text-navy-400 mb-3 leading-relaxed">{report.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-navy-400">
                        <Calendar size={13} />
                        {report.date}
                      </span>
                      <button className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                        <Download size={14} />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white rounded-2xl card-shadow border border-navy-100 overflow-hidden">
        <div className="p-6 border-b border-navy-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-display font-bold text-navy-900">Recently Generated Reports</h2>
            <p className="text-sm text-navy-400">Download or view previously generated compliance reports</p>
          </div>
          <button
            onClick={() => onNavigate('scanner')}
            className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
          >
            New Inspection
            <ArrowRight size={15} />
          </button>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead>
              <tr className="bg-navy-50/50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400 hidden md:table-cell">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400 hidden lg:table-cell">Period</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400 hidden sm:table-cell">Generated</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-navy-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {[
                { name: 'September Compliance Summary', type: 'Monthly Summary', period: 'Sep 2026', date: '2026-09-07' },
                { name: 'ABC Premium Biscuits — Inspection Report', type: 'Single Product', period: 'INSP-0042', date: '2026-09-07' },
                { name: 'Packaged Food Category Analysis', type: 'Category Analysis', period: 'Q3 2026', date: '2026-09-05' },
                { name: 'August Non-Compliance Report', type: 'Non-Compliance', period: 'Aug 2026', date: '2026-09-01' },
                { name: 'Q3 Verification Audit Trail', type: 'Audit Trail', period: 'Q3 2026', date: '2026-08-31' },
              ].map((report, i) => (
                <tr key={i} className="hover:bg-navy-50/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
                        <FileText size={16} className="text-navy-500" />
                      </div>
                      <span className="text-sm font-semibold text-navy-800">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-navy-600">{report.type}</span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-sm text-navy-600">{report.period}</span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="text-sm text-navy-600">{report.date}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 ml-auto transition-colors">
                      <Download size={15} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
