import { ShieldCheck, Factory, User, ArrowRight, ScanLine } from 'lucide-react';
import type { Page } from '@/types';
import Logo from './Logo';

interface RoleSelectProps {
  onNavigate: (page: Page) => void;
}

const roles = [
  {
    id: 'inspector' as const,
    icon: ShieldCheck,
    emoji: '👮',
    title: 'Regulatory Inspector',
    desc: 'Inspect packaged commodities and verify compliance.',
    button: 'Continue as Inspector',
    target: 'dashboard' as Page,
    gradient: 'from-navy-700 to-navy-900',
    iconBg: 'bg-navy-100 text-navy-700',
    border: 'hover:border-navy-300',
  },
  {
    id: 'manufacturer' as const,
    icon: Factory,
    emoji: '🏭',
    title: 'Manufacturer',
    desc: 'Check packaging declarations before printing or launching.',
    button: 'Continue as Manufacturer',
    target: 'mfr-dashboard' as Page,
    gradient: 'from-teal-500 to-teal-700',
    iconBg: 'bg-teal-100 text-teal-700',
    border: 'hover:border-teal-300',
  },
  {
    id: 'consumer' as const,
    icon: User,
    emoji: '👤',
    title: 'Consumer',
    desc: 'Scan products and view simple compliance information.',
    button: 'Continue as Consumer',
    target: 'consumer' as Page,
    gradient: 'from-navy-600 to-navy-800',
    iconBg: 'bg-navy-100 text-navy-600',
    border: 'hover:border-navy-300',
  },
];

export default function RoleSelect({ onNavigate }: RoleSelectProps) {
  return (
    <div className="min-h-screen bg-navy-900 relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-950" />
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl" />
      <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16">
        {/* Logo */}
        <div className="mb-8 animate-fade-in-up">
          <Logo variant="light" size="lg" />
        </div>

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white mb-3 tracking-tight">
            Welcome to LegalMetrix
          </h1>
          <p className="text-lg sm:text-xl text-navy-200">
            Select your role to continue
          </p>
        </div>

        {/* Role Cards */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {roles.map((role, i) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => onNavigate(role.target)}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-white/10 ${role.border} hover:bg-white/10 transition-all duration-300 hover:-translate-y-1.5 text-left animate-fade-in-up`}
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                {/* Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon size={30} className="text-white" strokeWidth={2} />
                  </div>
                  <span className="text-4xl">{role.emoji}</span>
                </div>

                {/* Title + Desc */}
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-navy-200 leading-relaxed mb-6 min-h-[40px]">
                  {role.desc}
                </p>

                {/* Button */}
                <div className="flex items-center gap-2 text-sm font-semibold text-teal-300 group-hover:text-teal-200 transition-colors">
                  {role.button}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Landing page link */}
        <button
          onClick={() => onNavigate('landing')}
          className="mt-10 flex items-center gap-2 text-sm text-navy-300 hover:text-white transition-colors animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          <ScanLine size={15} />
          Learn more about LegalMetrix
        </button>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-6 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-navy-300">
            LegalMetrix — AI-assisted Legal Metrology Compliance
          </p>
        </div>
      </footer>
    </div>
  );
}
