import { type ReactNode } from 'react';

interface NeonCardProps {
  variant: 'danger' | 'success';
  children: ReactNode;
  className?: string;
}

const variantBaseClasses: Record<NeonCardProps['variant'], string> = {
  danger: 'border-border-subtle hover:border-accent-danger-dim',
  success: 'border-border-subtle hover:border-accent-primary-dim',
};

const variantClasses: Record<NeonCardProps['variant'], string> = {
  danger:
    'hover:shadow-[0_8px_32px_var(--glow-danger)]',
  success:
    'hover:shadow-[0_8px_32px_var(--glow-primary)]',
};

const variantTopBar: Record<NeonCardProps['variant'], string> = {
  danger: 'group-hover:opacity-100 bg-accent-danger',
  success: 'group-hover:opacity-100 bg-accent-primary',
};

export const NeonCard = ({ variant, children, className }: NeonCardProps) => {
  return (
    <div
      data-testid="neon-card"
      className={`group relative bg-bg-card border rounded-2xl p-6 transition-all duration-[400ms] ease-smooth will-change-transform hover:-translate-y-[6px] hover:bg-bg-card-hover ${variantBaseClasses[variant]} ${variantClasses[variant]} ${className ?? ''}`}
    >
      <div
        className={`absolute top-0 left-4 right-4 h-[3px] rounded-b-full opacity-0 transition-opacity duration-300 ${variantTopBar[variant]}`}
      />
      {children}
    </div>
  );
};
