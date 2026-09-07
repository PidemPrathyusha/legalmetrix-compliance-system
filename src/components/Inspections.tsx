import { useState } from 'react';
import { FileSearch, CheckCircle2, AlertTriangle, Clock, ArrowRight, Search, Filter } from 'lucide-react';
import type { Page, ComplianceStatus } from '@/types';
import { mockInspections } from '@/data';

interface InspectionsProps {
  onNavigate: (page: Page) => void;
}

const statusConfig: Record<ComplianceStatus, { label: string; badge: string; dot: string }> = {
  compliant: { label: 'Compliant', badge: 'bg-teal-50 text-teal-700 border-teal-200', dot: 'bg-teal-500' },
  potential: { label: 'Potential Issue', badge: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  pending: { label: 'Pending', badge: 'bg-navy-50 text-navy-600 border-navy-200', dot: 'bg-navy-400' },
};

type FilterType = 'all' | ComplianceStatus;

export default function Inspections({ onNavigate }: InspectionsProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const filtered = mockInspections.filter((i) => {
    const matchesFilter = filter === 'all' || i.status === filter;
    const matchesSearch = i.product.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filters: { id: FilterType; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: mockInspections.length },
    { id: 'compliant', label: 'Compliant', count: mockInspections.filter((i) => i.status === 'compliant').length },
    { id: 'potential', label: 'Potential Issues', count: mockInspections.filter((i) => i.status === 'potential').length },
    { id: 'pending', label: 'Pending', count: mockInspections.filter((i) => i.status === 'pending').length },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in space-y-6">
      {/* Filters + Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex gap-2 p-1.5 bg-navy-50 rounded-xl overflow-x-auto scrollbar-thin">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                filter === f.id ? 'bg-white text-navy-900 card-shadow' : 'text-navy-500 hover:text-navy-700'
              }`}
            >
              {f.label}
              <span className={`px-1.5 py-0.5 rounded-md text-xs ${filter === f.id ? 'bg-teal-100 text-teal-700' : 'bg-navy-100 text-navy-500'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-navy-50 border border-navy-100 text-navy-400 flex-1 max-w-md">
          <Search size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name or ID..."
            className="bg-transparent text-sm text-navy-700 placeholder-navy-300 outline-none flex-1"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-navy-300 hover:text-navy-500">
              <Filter size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl card-shadow border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead>
              <tr className="bg-navy-50/50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400 hidden md:table-cell">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400 hidden lg:table-cell">Manufacturer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400 hidden lg:table-cell">Net Qty</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400 hidden xl:table-cell">MRP</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">Score</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-navy-400 hidden sm:table-cell">Date</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-navy-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-16 text-center">
                    <FileSearch size={32} className="text-navy-200 mx-auto mb-3" />
                    <p className="text-sm text-navy-400">No inspections found matching your filters</p>
                  </td>
                </tr>
              ) : (
                filtered.map((insp) => {
                  const sc = statusConfig[insp.status];
                  return (
                    <tr key={insp.id} className="hover:bg-navy-50/40 transition-colors">
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
                        <span className="text-sm text-navy-600">{insp.manufacturer}</span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-sm text-navy-600">{insp.netQuantity}</span>
                      </td>
                      <td className="px-6 py-4 hidden xl:table-cell">
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
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => onNavigate('result')}
                          className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 ml-auto transition-colors"
                        >
                          View
                          <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: CheckCircle2, label: 'Compliant', value: mockInspections.filter((i) => i.status === 'compliant').length, color: 'text-teal-600', bg: 'bg-teal-50' },
          { icon: AlertTriangle, label: 'Potential Issues', value: mockInspections.filter((i) => i.status === 'potential').length, color: 'text-amber-600', bg: 'bg-amber-50' },
          { icon: Clock, label: 'Pending Verification', value: mockInspections.filter((i) => i.status === 'pending').length, color: 'text-navy-600', bg: 'bg-navy-50' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-xl p-4 card-shadow border border-navy-100 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                <Icon size={20} className={s.color} />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-navy-900">{s.value}</p>
                <p className="text-xs text-navy-400">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
