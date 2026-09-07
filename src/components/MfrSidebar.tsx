import { LayoutDashboard, PackageSearch, FileSearch, FileText, LogOut, ShieldCheck, ArrowLeftRight } from 'lucide-react';
import type { Page } from '@/types';
import Logo from './Logo';

interface MfrSidebarProps {
  current: Page;
  onNavigate: (page: Page) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const navItems: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'mfr-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'mfr-check', label: 'Check New Package', icon: PackageSearch },
  { id: 'mfr-result', label: 'Pre-Compliance Result', icon: FileSearch },
  { id: 'mfr-fixes', label: 'Fix Suggestions', icon: FileText },
];

export default function MfrSidebar({ current, onNavigate, mobileOpen, onCloseMobile }: MfrSidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-navy-900 text-white flex flex-col z-50 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Logo variant="light" size="md" />
        </div>

        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-500/10 border border-teal-400/20">
            <div className="h-7 w-7 rounded-lg bg-teal-500/20 flex items-center justify-center">
              <ShieldCheck size={14} className="text-teal-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-teal-300">Manufacturer Mode</p>
              <p className="text-[10px] text-navy-300">Pre-print compliance checks</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto scrollbar-thin">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-navy-300 mb-2">Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                  active
                    ? 'bg-teal-500/15 text-teal-300'
                    : 'text-navy-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-teal-400 rounded-r-full" />
                )}
                <Icon
                  size={19}
                  className={`transition-transform group-hover:scale-110 ${active ? 'text-teal-400' : ''}`}
                  strokeWidth={2}
                />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 space-y-3">
          <div className="px-3 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="h-8 w-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
                <ShieldCheck size={16} className="text-teal-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Compliance Engine</p>
                <p className="text-[10px] text-navy-300">AI v2.1 — Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-[10px] text-teal-300 font-medium">All systems operational</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-navy-200 hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <ArrowLeftRight size={19} strokeWidth={2} />
            Switch to Inspector
          </button>

          <button
            onClick={() => onNavigate('role-select')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-navy-200 hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <LogOut size={19} strokeWidth={2} />
            Back to Home
          </button>
        </div>
      </aside>
    </>
  );
}
