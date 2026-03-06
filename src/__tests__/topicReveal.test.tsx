import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

let mockReducedMotion = false;

vi.mock('framer-motion', () => {
  const React = require('react');

  let capturedProps: Record<string, unknown>[] = [];

  const motionDiv = React.forwardRef(
    ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }, ref: React.Ref<HTMLDivElement>) => {
      capturedProps.push(props);
      return React.createElement(
        'div',
        {
          'data-testid': props['data-testid'] || 'motion-div',
          ref,
        },
        children,
      );
    },
  );
  motionDiv.displayName = 'motion.div';

  return {
    motion: { div: motionDiv },
    useReducedMotion: () => mockReducedMotion,
    __getCapturedProps: () => capturedProps,
    __resetCapturedProps: () => { capturedProps = []; },
  };
});

const { __getCapturedProps, __resetCapturedProps } = await import('framer-motion') as unknown as {
  __getCapturedProps: () => Record<string, unknown>[];
  __resetCapturedProps: () => void;
};

import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import {
  REVEAL_DELAY_BASE,
  REVEAL_STAGGER_CHILDREN,
  REVEAL_Y_OFFSET,
  revealContainerVariants,
  revealReducedContainerVariants,
  revealItemVariants,
  revealReducedItemVariants,
} from '@/components/topics/topicRevealVariants';

describe('topicRevealVariants', () => {
  it('has delay base >= transition duration (0.6s) to wait for stabilization', () => {
    expect(REVEAL_DELAY_BASE).toBeGreaterThanOrEqual(0.6);
    const visible = revealContainerVariants.visible as Record<string, unknown>;
    const transition = visible.transition as Record<string, unknown>;
    expect(transition.delayChildren).toBeGreaterThanOrEqual(0.6);
  });

  it('uses staggerChildren for orchestration (not setTimeout)', () => {
    const visible = revealContainerVariants.visible as Record<string, unknown>;
    const transition = visible.transition as Record<string, unknown>;
    expect(transition.staggerChildren).toBe(REVEAL_STAGGER_CHILDREN);
    expect(transition.staggerChildren).toBeGreaterThan(0);
  });

  it('item variants have y offset for standard motion', () => {
    const hidden = revealItemVariants.hidden as Record<string, unknown>;
    expect(hidden.y).toBe(REVEAL_Y_OFFSET);
    expect(hidden.opacity).toBe(0);

    const visible = revealItemVariants.visible as Record<string, unknown>;
    expect(visible.y).toBe(0);
    expect(visible.opacity).toBe(1);
  });

  it('reduced item variants have NO y offset (no axis displacement)', () => {
    const hidden = revealReducedItemVariants.hidden as Record<string, unknown>;
    expect(hidden).not.toHaveProperty('y');
    expect(hidden.opacity).toBe(0);

    const visible = revealReducedItemVariants.visible as Record<string, unknown>;
    expect(visible).not.toHaveProperty('y');
    expect(visible.opacity).toBe(1);
  });

  it('reduced container still applies delay and stagger for informational order', () => {
    const visible = revealReducedContainerVariants.visible as Record<string, unknown>;
    const transition = visible.transition as Record<string, unknown>;
    expect(transition.delayChildren).toBeGreaterThanOrEqual(0.6);
    expect(transition.staggerChildren).toBeGreaterThan(0);
  });

  it('variants are defined as module-scope constants (not recreated per render)', () => {
    expect(typeof revealContainerVariants).toBe('object');
    expect(typeof revealItemVariants).toBe('object');
    expect(typeof revealReducedContainerVariants).toBe('object');
    expect(typeof revealReducedItemVariants).toBe('object');
  });
});

describe('TopicReveal component', () => {
  beforeEach(() => {
    mockReducedMotion = false;
    __resetCapturedProps();
  });

  it('renders children inside a motion container', () => {
    render(
      <TopicReveal>
        <div data-testid="child">Hello</div>
      </TopicReveal>,
    );

    expect(screen.getByTestId('topic-reveal-container')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('uses standard container variants with initial="hidden" and animate="visible"', () => {
    render(
      <TopicReveal>
        <div>Content</div>
      </TopicReveal>,
    );

    const containerProps = __getCapturedProps().find(
      (p) => p['data-testid'] === 'topic-reveal-container',
    );
    expect(containerProps).toBeDefined();
    expect(containerProps!.initial).toBe('hidden');
    expect(containerProps!.animate).toBe('visible');
    expect(containerProps!.variants).toBe(revealContainerVariants);
  });

  it('uses reduced container variants when reduced motion is active', () => {
    mockReducedMotion = true;

    render(
      <TopicReveal>
        <div>Content</div>
      </TopicReveal>,
    );

    const containerProps = __getCapturedProps().find(
      (p) => p['data-testid'] === 'topic-reveal-container',
    );
    expect(containerProps!.variants).toBe(revealReducedContainerVariants);
  });
});

describe('TopicRevealItem component', () => {
  beforeEach(() => {
    mockReducedMotion = false;
    __resetCapturedProps();
  });

  it('renders children inside a motion item', () => {
    render(
      <TopicRevealItem>
        <span data-testid="item-child">Item</span>
      </TopicRevealItem>,
    );

    expect(screen.getByTestId('topic-reveal-item')).toBeInTheDocument();
    expect(screen.getByTestId('item-child')).toBeInTheDocument();
  });

  it('uses standard item variants', () => {
    render(
      <TopicRevealItem>
        <span>Item</span>
      </TopicRevealItem>,
    );

    const itemProps = __getCapturedProps().find(
      (p) => p['data-testid'] === 'topic-reveal-item',
    );
    expect(itemProps!.variants).toBe(revealItemVariants);
  });

  it('uses reduced item variants when reduced motion is active', () => {
    mockReducedMotion = true;

    render(
      <TopicRevealItem>
        <span>Item</span>
      </TopicRevealItem>,
    );

    const itemProps = __getCapturedProps().find(
      (p) => p['data-testid'] === 'topic-reveal-item',
    );
    expect(itemProps!.variants).toBe(revealReducedItemVariants);
  });
});
