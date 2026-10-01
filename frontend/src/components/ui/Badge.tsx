import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline' | 'pill';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = ''
}) => {
  const variantStyles = {
    default: 'bg-white/5 border border-white/10 text-white/60 font-mono text-[10px] tracking-wider uppercase',
    accent: 'bg-primary text-black font-semibold font-mono text-[10px] tracking-wider uppercase',
    outline: 'border border-white/20 text-on-surface-variant font-mono text-[10px] tracking-wider uppercase',
    pill: 'bg-surface-container-high border border-white/10 text-on-surface text-xs font-mono'
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-[2px] ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
