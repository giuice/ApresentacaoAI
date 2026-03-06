import { ReactNode, useDeferredValue, useEffect, useRef } from 'react';
import type { PresentationDirection } from '@/contexts/PresentationContext';
import { TopicTransition } from '@/components/layout/TopicTransition';

interface TopicViewportProps {
  currentTopicIndex: number;
  direction: PresentationDirection;
  renderTopic: (topicIndex: number) => ReactNode;
}

export const TopicViewport = ({ currentTopicIndex, direction, renderTopic }: TopicViewportProps) => {
  const displayedTopicIndex = useDeferredValue(currentTopicIndex);
  const previousDisplayedTopicIndexRef = useRef(displayedTopicIndex);

  const transitionDirection: PresentationDirection =
    displayedTopicIndex > previousDisplayedTopicIndexRef.current
      ? 'next'
      : displayedTopicIndex < previousDisplayedTopicIndexRef.current
        ? 'prev'
        : direction;

  useEffect(() => {
    previousDisplayedTopicIndexRef.current = displayedTopicIndex;
  }, [displayedTopicIndex]);

  return (
    <TopicTransition topicIndex={displayedTopicIndex} direction={transitionDirection}>
      {renderTopic(displayedTopicIndex)}
    </TopicTransition>
  );
};
