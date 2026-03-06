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
      className={`grid grid-cols-1 lg:grid-cols-2 gap-[2px] w-full rounded-2xl overflow-hidden border border-border-subtle ${className ?? ''}`}
    >
      <div
        data-testid="split-screen-left"
        className="p-8 lg:p-10 min-h-[380px] flex flex-col justify-center bg-[linear-gradient(135deg,#1a0005_0%,#0a0000_100%)]"
      >
        {leftContent}
      </div>
      <div
        data-testid="split-screen-right"
        className="p-8 lg:p-10 min-h-[380px] flex flex-col justify-center bg-[linear-gradient(135deg,#000a03_0%,#000d00_100%)]"
      >
        {rightContent}
      </div>
    </div>
  );
};
