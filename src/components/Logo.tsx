import { ShieldCheck } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 'h-7 w-7', text: 'text-lg', radius: 'rounded-md', iconSize: 16 },
    md: { icon: 'h-9 w-9', text: 'text-xl', radius: 'rounded-lg', iconSize: 20 },
    lg: { icon: 'h-12 w-12', text: 'text-2xl', radius: 'rounded-xl', iconSize: 26 },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`${s.icon} ${s.radius} bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20`}>
        <ShieldCheck size={s.iconSize} className="text-white" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${s.text} font-display font-extrabold tracking-tight ${variant === 'light' ? 'text-white' : 'text-navy-900'}`}>
          Legal<span className="text-teal-500">Metrix</span>
        </span>
      </div>
    </div>
  );
}
