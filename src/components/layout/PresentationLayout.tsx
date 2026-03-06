import { ReactNode, Suspense } from 'react';
import { CyberProgressBar } from '@/components/layout/CyberProgressBar';
import { MatrixBackground } from '@/components/layout/MatrixBackground';
import { usePresentation } from '@/contexts/PresentationContext';

interface PresentationLayoutProps {
  children: ReactNode;
}

const TopicFallback = () => (
  <div className="flex items-center justify-center h-full text-accent-primary/60 font-mono">
    Carregando...
  </div>
);

export const PresentationLayout = ({ children }: PresentationLayoutProps) => {
  const { currentTopicIndex } = usePresentation();

  return (
    <div
      className="min-h-screen h-screen flex flex-col bg-bg-deep text-text-primary overflow-hidden"
      data-testid="presentation-shell"
    >
      <MatrixBackground />
      <main className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden">
        <Suspense fallback={<TopicFallback />}>
          <div className="w-full h-full max-w-[1024px] mx-auto px-4" data-testid="presentation-content">
            {children}
          </div>
        </Suspense>
      </main>
      <footer className="relative z-10 shrink-0 px-4 py-3">
        <CyberProgressBar currentTopicIndex={currentTopicIndex} />
      </footer>
    </div>
  );
};
