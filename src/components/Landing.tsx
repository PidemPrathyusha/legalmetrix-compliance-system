import { ShieldCheck, ScanLine, FileSearch, CheckCircle2, ArrowRight, Sparkles, Eye, FileText, Lock, Zap, BarChart3, ChevronRight, PackageSearch } from 'lucide-react';
import type { Page } from '@/types';
import Logo from './Logo';

interface LandingProps {
  onNavigate: (page: Page) => void;
}

const steps = [
  { icon: ScanLine, title: 'Scan', desc: 'Capture or upload images of the product label — front, back, and side views.', color: 'from-teal-400 to-teal-600' },
  { icon: Eye, title: 'Read', desc: 'Our AI engine reads and extracts every piece of text and data from the label.', color: 'from-navy-600 to-navy-800' },
  { icon: FileSearch, title: 'Check', desc: 'Extracted data is checked against Legal Metrology Act packaging requirements.', color: 'from-teal-500 to-teal-700' },
  { icon: CheckCircle2, title: 'Verify', desc: 'Get a compliance score with flagged issues for human verification and review.', color: 'from-navy-700 to-navy-900' },
];

const features = [
  { icon: Zap, title: 'Instant Analysis', desc: 'Get compliance results in seconds, not hours of manual review.' },
  { icon: ShieldCheck, title: 'Legal Metrology Act', desc: 'Checks against the Standards of Weights & Measures and Packaged Commodities Rules.' },
  { icon: BarChart3, title: 'Compliance Scoring', desc: 'Clear, quantified compliance score with field-by-field breakdown.' },
  { icon: FileText, title: 'Audit-Ready Reports', desc: 'Generate detailed reports for regulatory submissions and record-keeping.' },
  { icon: Lock, title: 'Secure & Private', desc: 'Your inspection data stays protected with enterprise-grade security.' },
  { icon: Sparkles, title: 'AI-Powered OCR', desc: 'Advanced optical character recognition tuned for product packaging labels.' },
];

export default function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-navy-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo variant="dark" size="md" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors">How It Works</a>
            <a href="#features" className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors">Features</a>
            <button onClick={() => onNavigate('role-select')} className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors">Role Selection</button>
            <button onClick={() => onNavigate('dashboard')} className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors">Dashboard</button>
            <button onClick={() => onNavigate('mfr-dashboard')} className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors">Manufacturer Portal</button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('mfr-dashboard')}
              className="px-4 py-2.5 rounded-xl bg-teal-50 text-teal-700 text-sm font-semibold hover:bg-teal-100 transition-all flex items-center gap-2"
            >
              <PackageSearch size={16} />
              Manufacturer
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2.5 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-all hover:shadow-lg hover:shadow-navy-900/20 flex items-center gap-2"
            >
              Launch App
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-navy-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-950" />
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-400/20 text-teal-300 text-sm font-medium mb-8 animate-fade-in-up">
            <Sparkles size={15} />
            Smart India Hackathon 2026
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white leading-tight tracking-tight text-balance animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Scan. Understand.{' '}
            <span className="bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">Verify.</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-navy-200 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            An AI-powered system that checks packaged-product labels for potential{' '}
            <span className="text-white font-semibold">Legal Metrology compliance</span> issues — in seconds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => onNavigate('scanner')}
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 text-white text-base font-semibold hover:shadow-2xl hover:shadow-teal-500/30 transition-all hover:scale-105 flex items-center gap-3"
            >
              <ScanLine size={20} />
              Start Inspection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-base font-semibold hover:bg-white/15 transition-all flex items-center gap-3"
            >
              View Dashboard
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() => onNavigate('mfr-dashboard')}
              className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-teal-400/30 text-teal-300 text-base font-semibold hover:bg-teal-500/10 transition-all flex items-center gap-3"
            >
              <PackageSearch size={18} />
              Manufacturer Portal
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {[
              { value: '2,400+', label: 'Products Scanned' },
              { value: '98.7%', label: 'OCR Accuracy' },
              { value: '< 5s', label: 'Analysis Time' },
              { value: '15+', label: 'Compliance Checks' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-display font-bold text-white">{stat.value}</p>
                <p className="text-sm text-navy-300 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900">Four Steps to Compliance</h2>
            <p className="mt-4 text-lg text-navy-500 max-w-2xl mx-auto">
              From scanning a product label to getting a verified compliance report — a streamlined pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative group">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[60%] w-full h-px">
                      <div className="h-full w-full bg-gradient-to-r from-navy-200 to-transparent" />
                    </div>
                  )}
                  <div className="relative bg-white rounded-2xl p-6 card-shadow border border-navy-100 hover:card-shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-5">
                      <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                        <Icon size={26} className="text-white" strokeWidth={2} />
                      </div>
                      <span className="text-5xl font-display font-extrabold text-navy-100 group-hover:text-teal-100 transition-colors">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-navy-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-navy-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-28 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 mb-3">Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900">Built for Regulatory Compliance</h2>
            <p className="mt-4 text-lg text-navy-500 max-w-2xl mx-auto">
              Everything you need to verify packaged products against the Legal Metrology Act and Packaged Commodities Rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group bg-white rounded-2xl p-6 card-shadow border border-navy-100 hover:border-teal-200 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
                    <Icon size={24} className="text-teal-600" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-navy-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck size={48} className="text-teal-400 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Ready to verify your products?
          </h2>
          <p className="text-lg text-navy-200 mb-10 max-w-2xl mx-auto">
            Start your first inspection in seconds. No setup required — just scan and verify.
          </p>
          <button
            onClick={() => onNavigate('scanner')}
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 text-white text-base font-semibold hover:shadow-2xl hover:shadow-teal-500/30 transition-all hover:scale-105 inline-flex items-center gap-3"
          >
            <ScanLine size={20} />
            Start Inspection
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo variant="light" size="sm" />
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-navy-300">
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <button onClick={() => onNavigate('role-select')} className="hover:text-white transition-colors">Role Selection</button>
              <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">Dashboard</button>
            </div>
            <p className="text-sm text-navy-400">Smart India Hackathon 2026</p>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-navy-400">LegalMetrix — AI-Powered Legal Metrology Compliance</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
