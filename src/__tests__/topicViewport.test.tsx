import { lazy, Suspense, useState, type ComponentType, type LazyExoticComponent } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { PresentationDirection } from '@/contexts/PresentationContext';
import { TopicViewport } from '@/components/layout/TopicViewport';

let lastTransitionProps: { topicIndex: number; direction: PresentationDirection } | null = null;

vi.mock('@/components/layout/TopicTransition', () => ({
  TopicTransition: ({
    topicIndex,
    direction,
    children,
  }: {
    topicIndex: number;
    direction: PresentationDirection;
    children: React.ReactNode;
  }) => {
    lastTransitionProps = { topicIndex, direction };
    return (
      <div data-testid="topic-transition" data-direction={direction} data-topic-index={topicIndex}>
        {children}
      </div>
    );
  },
}));

function createDeferredTopic(label: string) {
  let resolveModule: ((value: { default: ComponentType }) => void) | undefined;
  const Topic = lazy(
    () =>
      new Promise<{ default: ComponentType }>((resolve) => {
        resolveModule = resolve;
      }),
  );

  return {
    Topic,
    resolve: () => resolveModule?.({ default: () => <div>{label}</div> }),
  };
}

function TopicViewportHarness({
  deferredTopic,
}: {
  deferredTopic: LazyExoticComponent<ComponentType>;
}) {
  const [currentTopicIndex, setCurrentTopicIndex] = useState(1);
  const [direction, setDirection] = useState<PresentationDirection>('next');

  const topics: Record<number, ComponentType | LazyExoticComponent<ComponentType>> = {
    1: () => <div>Topic 1</div>,
    2: deferredTopic,
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setDirection('next');
          setCurrentTopicIndex(2);
        }}
      >
        Next
      </button>
      <button
        type="button"
        onClick={() => {
          setDirection('prev');
          setCurrentTopicIndex(1);
        }}
      >
        Prev
      </button>
      <TopicViewport
        currentTopicIndex={currentTopicIndex}
        direction={direction}
        renderTopic={(topicIndex) => {
          const TopicComponent = topics[topicIndex];
          return (
            <Suspense fallback={<div data-testid="topic-fallback">Loading</div>}>
              <TopicComponent />
            </Suspense>
          );
        }}
      />
    </>
  );
}

describe('TopicViewport', () => {
  beforeEach(() => {
    lastTransitionProps = null;
  });

  it('keeps the current topic visible while the next lazy topic is still loading', async () => {
    const deferredTopic = createDeferredTopic('Topic 2');
    const user = userEvent.setup();

    render(<TopicViewportHarness deferredTopic={deferredTopic.Topic} />);

    expect(screen.getByText('Topic 1')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByText('Topic 1')).toBeInTheDocument();
    expect(screen.queryByTestId('topic-fallback')).not.toBeInTheDocument();

    deferredTopic.resolve();

    await waitFor(() => {
      expect(screen.getByText('Topic 2')).toBeInTheDocument();
    });

    expect(lastTransitionProps).toEqual({ topicIndex: 2, direction: 'next' });
  });

  it('derives the transition direction from the displayed topic when navigating back', async () => {
    const deferredTopic = createDeferredTopic('Topic 2');
    const user = userEvent.setup();

    render(<TopicViewportHarness deferredTopic={deferredTopic.Topic} />);

    await user.click(screen.getByRole('button', { name: 'Next' }));
    deferredTopic.resolve();

    await waitFor(() => {
      expect(screen.getByText('Topic 2')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: 'Prev' }));

    await waitFor(() => {
      expect(screen.getByText('Topic 1')).toBeInTheDocument();
    });

    expect(lastTransitionProps).toEqual({ topicIndex: 1, direction: 'prev' });
  });
});
