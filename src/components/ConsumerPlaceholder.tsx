import { ArrowLeft, User, Clock, Bell, Search, Menu } from 'lucide-react';
import type { Page } from '@/types';

interface ConsumerPlaceholderProps {
  onNavigate: (page: Page) => void;
}

export default function ConsumerPlaceholder({ onNavigate }: ConsumerPlaceholderProps) {
  return (
    <div className="min-h-screen bg-navy-50/30 flex flex-col">
      {/* Top bar */}
      <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-navy-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-display font-bold text-navy-900">Consumer Portal</h1>
            <p className="text-xs sm:text-sm text-navy-400 hidden sm:block">Coming Soon</p>
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
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          {/* Icon */}
          <div className="relative mx-auto h-24 w-24 mb-8 animate-fade-in-up">
            <div className="absolute inset-0 rounded-full bg-teal-100 animate-pulse-ring" />
            <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center shadow-xl">
              <User size={40} className="text-teal-400" />
            </div>
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-sm font-semibold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Clock size={15} />
            Coming Soon
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Consumer Portal
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-navy-500 leading-relaxed mb-8 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            We're building a simple way for consumers to scan products and view compliance information at a glance. Stay tuned — this feature is under development.
          </p>

          {/* Back Button */}
          <button
            onClick={() => onNavigate('role-select')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-all hover:shadow-lg hover:shadow-navy-900/20 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <ArrowLeft size={17} />
            Back to Role Selection
          </button>
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
