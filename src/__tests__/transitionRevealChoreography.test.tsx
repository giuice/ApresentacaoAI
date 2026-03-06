import { act, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let mockReducedMotion = false;

vi.mock('framer-motion', () => {
  const React = require('react');

  const OrchestrationContext = React.createContext(null);

  const resolveVariant = (
    variants: Record<string, unknown> | undefined,
    state: unknown,
    custom: unknown,
  ) => {
    if (!variants || typeof state !== 'string') {
      return undefined;
    }

    const variant = variants[state];
    return typeof variant === 'function' ? variant(custom) : variant;
  };

  const AnimatePresence = ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
    React.createElement('div', { 'data-testid': 'animate-presence', 'data-mode': props.mode }, children);

  const motionDiv = React.forwardRef(
    (
      { children, variants, initial, animate, exit, custom, ...props }: { children?: React.ReactNode; [key: string]: unknown },
      ref: React.Ref<HTMLDivElement>,
    ) => {
      const parentOrchestration = React.useContext(OrchestrationContext);
      const itemOrderRef = React.useRef(null);
      if (parentOrchestration && itemOrderRef.current === null) {
        itemOrderRef.current = parentOrchestration.nextIndexRef.current;
        parentOrchestration.nextIndexRef.current += 1;
      }

      const inheritedDelayMs = parentOrchestration
        ? parentOrchestration.baseDelayMs + ((itemOrderRef.current ?? 0) * parentOrchestration.staggerMs)
        : 0;

      const resolvedInitial = (
        resolveVariant(variants as Record<string, unknown> | undefined, initial, custom)
        ?? resolveVariant(variants as Record<string, unknown> | undefined, 'hidden', custom)
      ) as Record<string, unknown> | undefined;
      const resolvedAnimate = (
        resolveVariant(variants as Record<string, unknown> | undefined, animate, custom)
        ?? resolveVariant(variants as Record<string, unknown> | undefined, 'visible', custom)
      ) as Record<string, unknown> | undefined;
      const resolvedExit = resolveVariant(variants as Record<string, unknown> | undefined, exit, custom) as Record<string, unknown> | undefined;

      const transition = (resolvedAnimate?.transition as Record<string, unknown> | undefined) ?? {};
      const selfDelayMs = Number(transition.delay ?? 0) * 1000;
      const delayChildrenMs = Number(transition.delayChildren ?? 0) * 1000;
      const staggerChildrenMs = Number(transition.staggerChildren ?? 0) * 1000;
      const totalDelayMs = inheritedDelayMs + selfDelayMs;

      const [animatedValues, setAnimatedValues] = React.useState(resolvedInitial);

      React.useEffect(() => {
        const timeout = setTimeout(() => {
          setAnimatedValues(resolvedAnimate);
        }, totalDelayMs);

        return () => clearTimeout(timeout);
      }, [resolvedAnimate, totalDelayMs]);

      const nextIndexRef = React.useRef({ current: 0 });
      nextIndexRef.current.current = 0;

      const orchestrationForChildren = {
        baseDelayMs: totalDelayMs + delayChildrenMs,
        staggerMs: staggerChildrenMs,
        nextIndexRef: nextIndexRef.current,
      };

      const testId = props['data-testid']
        ?? (initial === 'initial' && animate === 'animate' ? 'topic-transition-motion' : 'motion-div');

      const element = React.createElement(
        'div',
        {
          ref,
          'data-testid': testId,
          'data-current-opacity': animatedValues?.opacity,
          'data-current-y': animatedValues?.y,
          'data-animate-duration': (resolvedAnimate?.transition as Record<string, unknown> | undefined)?.duration,
          'data-animate-delay-children': (resolvedAnimate?.transition as Record<string, unknown> | undefined)?.delayChildren,
          'data-animate-stagger-children': (resolvedAnimate?.transition as Record<string, unknown> | undefined)?.staggerChildren,
          'data-exit-opacity': resolvedExit?.opacity,
          'data-exit-x': resolvedExit?.x,
          'data-total-delay-ms': totalDelayMs,
        },
        children,
      );

      return React.createElement(
        OrchestrationContext.Provider,
        { value: orchestrationForChildren },
        element,
      );
    },
  );
  motionDiv.displayName = 'motion.div';

  return {
    AnimatePresence,
    motion: { div: motionDiv },
    useReducedMotion: () => mockReducedMotion,
  };
});

import { TopicTransition, TRANSITION_DURATION } from '@/components/layout/TopicTransition';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import {
  REVEAL_DELAY_BASE,
  REVEAL_STAGGER_CHILDREN,
} from '@/components/topics/topicRevealVariants';

describe('TopicTransition + TopicReveal choreography', () => {
  beforeEach(() => {
    mockReducedMotion = false;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('aplica reveal progressivo por tempo (delay + stagger) após estabilização da transição', () => {
    render(
      <TopicTransition topicIndex={2} direction="next">
        <TopicReveal>
          <TopicRevealItem>
            <span>Título</span>
          </TopicRevealItem>
          <TopicRevealItem>
            <span>Conteúdo</span>
          </TopicRevealItem>
          <TopicRevealItem>
            <span>Métrica</span>
          </TopicRevealItem>
        </TopicReveal>
      </TopicTransition>,
    );

    const transition = screen.getByTestId('topic-transition-motion');
    const reveal = screen.getByTestId('topic-reveal-container');
    const items = screen.getAllByTestId('topic-reveal-item');
    const [firstItem, secondItem, thirdItem] = items;

    expect(screen.getByTestId('animate-presence')).toHaveAttribute('data-mode', 'wait');
    expect(transition).toContainElement(reveal);
    expect(items).toHaveLength(3);
    expect(transition).toHaveAttribute('data-animate-duration', String(TRANSITION_DURATION));
    expect(reveal).toHaveAttribute('data-animate-delay-children', String(REVEAL_DELAY_BASE));
    expect(reveal).toHaveAttribute('data-animate-stagger-children', String(REVEAL_STAGGER_CHILDREN));
    expect(REVEAL_DELAY_BASE).toBeGreaterThanOrEqual(TRANSITION_DURATION);

    expect(firstItem).toHaveAttribute('data-current-opacity', '0');
    expect(secondItem).toHaveAttribute('data-current-opacity', '0');
    expect(thirdItem).toHaveAttribute('data-current-opacity', '0');

    act(() => {
      vi.advanceTimersByTime((REVEAL_DELAY_BASE * 1000) - 1);
    });

    expect(firstItem).toHaveAttribute('data-current-opacity', '0');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(firstItem).toHaveAttribute('data-current-opacity', '1');
    expect(secondItem).toHaveAttribute('data-current-opacity', '0');

    act(() => {
      vi.advanceTimersByTime(REVEAL_STAGGER_CHILDREN * 1000);
    });

    expect(secondItem).toHaveAttribute('data-current-opacity', '1');
    expect(thirdItem).toHaveAttribute('data-current-opacity', '0');

    act(() => {
      vi.advanceTimersByTime(REVEAL_STAGGER_CHILDREN * 1000);
    });

    expect(thirdItem).toHaveAttribute('data-current-opacity', '1');
  });

  it('mantém timing progressivo no reduced motion sem deslocamento em eixo Y', () => {
    mockReducedMotion = true;

    render(
      <TopicTransition topicIndex={3} direction="prev">
        <TopicReveal>
          <TopicRevealItem>
            <span>Primeiro</span>
          </TopicRevealItem>
          <TopicRevealItem>
            <span>Segundo</span>
          </TopicRevealItem>
        </TopicReveal>
      </TopicTransition>,
    );

    const reveal = screen.getByTestId('topic-reveal-container');
    const firstItem = screen.getAllByTestId('topic-reveal-item')[0];

    expect(reveal).toHaveAttribute('data-animate-delay-children', String(REVEAL_DELAY_BASE));
    expect(firstItem).not.toHaveAttribute('data-current-y');

    act(() => {
      vi.advanceTimersByTime((REVEAL_DELAY_BASE * 1000) - 1);
    });
    expect(firstItem).toHaveAttribute('data-current-opacity', '0');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(firstItem).toHaveAttribute('data-current-opacity', '1');
    expect(firstItem).not.toHaveAttribute('data-current-y');
  });
});
