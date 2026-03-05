import { PresentationProvider, usePresentation, TOTAL_TOPICS } from '@/contexts/PresentationContext';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

function AppContent() {
  const { currentTopicIndex, isOverviewOpen } = usePresentation();
  useKeyboardNavigation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-matrix-bg text-matrix-green">
      <h1 className="text-4xl font-mono mb-4">Vibe Coding &gt; Context Engineering</h1>
      <div className="font-mono text-xl">
        Topic: {currentTopicIndex} / {TOTAL_TOPICS}
      </div>
      {isOverviewOpen && (
        <div className="mt-4 p-4 border border-matrix-green/50 w-full max-w-lg text-center font-mono">
          Overview is OPEN
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <PresentationProvider>
      <AppContent />
    </PresentationProvider>
  );
}
