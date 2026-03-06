import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

let mockReducedMotion = false;

vi.mock('framer-motion', () => {
  const React = require('react');

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
      const resolvedInitial = resolveVariant(variants as Record<string, unknown> | undefined, initial, custom) as Record<string, unknown> | undefined;
      const resolvedAnimate = resolveVariant(variants as Record<string, unknown> | undefined, animate, custom) as Record<string, unknown> | undefined;
      const resolvedExit = resolveVariant(variants as Record<string, unknown> | undefined, exit, custom) as Record<string, unknown> | undefined;

      const testId = props['data-testid']
        ?? (initial === 'initial' && animate === 'animate' ? 'topic-transition-motion' : 'motion-div');

      return React.createElement(
        'div',
        {
          ref,
          'data-testid': testId,
          'data-initial-opacity': resolvedInitial?.opacity,
          'data-initial-y': resolvedInitial?.y,
          'data-animate-opacity': resolvedAnimate?.opacity,
          'data-animate-y': resolvedAnimate?.y,
          'data-animate-duration': (resolvedAnimate?.transition as Record<string, unknown> | undefined)?.duration,
          'data-animate-delay-children': (resolvedAnimate?.transition as Record<string, unknown> | undefined)?.delayChildren,
          'data-animate-stagger-children': (resolvedAnimate?.transition as Record<string, unknown> | undefined)?.staggerChildren,
          'data-exit-opacity': resolvedExit?.opacity,
          'data-exit-x': resolvedExit?.x,
        },
        children,
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
  });

  it('renders the reveal container inside the transition shell and delays children until after stabilization', () => {
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

    expect(screen.getByTestId('animate-presence')).toHaveAttribute('data-mode', 'wait');
    expect(transition).toContainElement(reveal);
    expect(items).toHaveLength(3);
    expect(transition).toHaveAttribute('data-animate-duration', String(TRANSITION_DURATION));
    expect(reveal).toHaveAttribute('data-animate-delay-children', String(REVEAL_DELAY_BASE));
    expect(reveal).toHaveAttribute('data-animate-stagger-children', String(REVEAL_STAGGER_CHILDREN));
    expect(REVEAL_DELAY_BASE).toBeGreaterThanOrEqual(TRANSITION_DURATION);
  });

  it('keeps progressive reveal timing even when reduced motion removes axis displacement', () => {
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
    expect(firstItem).not.toHaveAttribute('data-initial-y');
    expect(firstItem).not.toHaveAttribute('data-animate-y');
  });
});
