import { ReactNode } from 'react';
import { CyberProgressBar } from '@/components/layout/CyberProgressBar';
import { MobileNavArrows } from '@/components/layout/MobileNavArrows';
import { MatrixBackground } from '@/components/layout/MatrixBackground';
import { ScanlineOverlay } from '@/components/layout/ScanlineOverlay';
import { usePresentation } from '@/contexts/PresentationContext';

interface PresentationLayoutProps {
  children: ReactNode;
}

export const PresentationLayout = ({ children }: PresentationLayoutProps) => {
  const { currentTopicIndex, dispatch } = usePresentation();

  return (
    <>
      <MatrixBackground />
      <ScanlineOverlay />
      <div
        className="min-h-screen h-screen flex flex-col text-text-primary overflow-hidden"
        data-testid="presentation-shell"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full min-h-full max-w-7xl mx-auto px-4 sm:px-8" data-testid="presentation-content">
            {children}
          </div>
        </main>
        <MobileNavArrows />
        <footer className="shrink-0 px-4 py-3">
          <CyberProgressBar
            currentTopicIndex={currentTopicIndex}
            onTap={() => dispatch({ type: 'TOGGLE_OVERVIEW' })}
          />
        </footer>
      </div>
    </>
  );
};
