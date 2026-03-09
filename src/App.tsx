import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { PresentationProvider, usePresentation } from '@/contexts/PresentationContext';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useHashSync } from '@/hooks/useHashSync';
import { PresentationLayout } from '@/components/layout/PresentationLayout';
import { TopicViewport } from '@/components/layout/TopicViewport';
import { Overview } from '@/components/layout/Overview';

type TopicComponent = LazyExoticComponent<ComponentType>;

const FALLBACK_TOPIC_INDEX = 1;

const TopicLoadingFallback = () => (
  <div
    className="w-full h-full flex items-center justify-center text-sm font-mono text-text-muted"
    role="status"
    aria-live="polite"
    data-testid="topic-loading-fallback"
  >
    Carregando tópico...
  </div>
);

const topicComponents: Record<number, TopicComponent> = {
  1: lazy(() => import('@/components/topics/Topic1')),
  2: lazy(() => import('@/components/topics/Topic2')),
  3: lazy(() => import('@/components/topics/Topic3')),
  4: lazy(() => import('@/components/topics/Topic4')),
  5: lazy(() => import('@/components/topics/Topic5')),
  6: lazy(() => import('@/components/topics/Topic6')),
  7: lazy(() => import('@/components/topics/Topic7')),
  8: lazy(() => import('@/components/topics/Topic8')),
  9: lazy(() => import('@/components/topics/Topic9')),
  10: lazy(() => import('@/components/topics/Topic10')),
  11: lazy(() => import('@/components/topics/Topic11')),
  12: lazy(() => import('@/components/topics/Topic12')),
  13: lazy(() => import('@/components/topics/Topic13')),
  14: lazy(() => import('@/components/topics/Topic14')),
  15: lazy(() => import('@/components/topics/Topic15')),
  16: lazy(() => import('@/components/topics/Topic16')),
  17: lazy(() => import('@/components/topics/Topic17')),
};

export const getTopicComponentForIndex = (topicIndex: number): TopicComponent =>
  topicComponents[topicIndex] ?? topicComponents[FALLBACK_TOPIC_INDEX];

function AppContent() {
  const { currentTopicIndex, direction, isOverviewOpen } = usePresentation();
  useKeyboardNavigation();
  useSwipeNavigation();
  useHashSync();

  return (
    <PresentationLayout>
      <TopicViewport
        currentTopicIndex={currentTopicIndex}
        direction={direction}
        renderTopic={(topicIndex) => {
          const TopicComponent = getTopicComponentForIndex(topicIndex);
          return (
            <Suspense fallback={<TopicLoadingFallback />}>
              <TopicComponent />
            </Suspense>
          );
        }}
      />
      {isOverviewOpen && <Overview />}
    </PresentationLayout>
  );
}

export function App() {
  return (
    <PresentationProvider>
      <AppContent />
    </PresentationProvider>
  );
}
