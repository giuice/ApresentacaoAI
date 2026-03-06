import { type ReactNode } from 'react';

interface SplitScreenProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  className?: string;
}

export const SplitScreen = ({
  leftContent,
  rightContent,
  className,
}: SplitScreenProps) => {
  return (
    <div
      data-testid="split-screen"
      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full ${className ?? ''}`}
    >
      <div
        data-testid="split-screen-left"
        className="rounded-2xl p-6 lg:p-8 border border-accent-danger-dim/20 bg-[rgba(255,0,60,0.05)]"
      >
        {leftContent}
      </div>
      <div
        data-testid="split-screen-right"
        className="rounded-2xl p-6 lg:p-8 border border-accent-primary-dim/20 bg-[rgba(0,255,65,0.05)]"
      >
        {rightContent}
      </div>
    </div>
  );
};
