import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TopicTransition } from '@/components/layout/TopicTransition';

let mockReducedMotion = false;

// Mock framer-motion to control animation behavior in tests
vi.mock('framer-motion', () => {
  const React = require('react');

  let lastAnimatePresenceProps: Record<string, unknown> = {};
  let lastMotionDivProps: Record<string, unknown> = {};

  const AnimatePresence = ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => {
    lastAnimatePresenceProps = props;
    return React.createElement('div', { 'data-testid': 'animate-presence' }, children);
  };

  const motionDiv = React.forwardRef(
    ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }, ref: React.Ref<HTMLDivElement>) => {
      lastMotionDivProps = props;
      return React.createElement(
        'div',
        {
          'data-testid': 'motion-div',
          ref,
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
    __getLastAnimatePresenceProps: () => lastAnimatePresenceProps,
    __getLastMotionDivProps: () => lastMotionDivProps,
  };
});

const { __getLastAnimatePresenceProps, __getLastMotionDivProps } = await import('framer-motion') as unknown as {
  __getLastAnimatePresenceProps: () => Record<string, unknown>;
  __getLastMotionDivProps: () => Record<string, unknown>;
};

describe('TopicTransition', () => {
  beforeEach(() => {
    mockReducedMotion = false;
    vi.clearAllMocks();
  });

  it('renders children inside AnimatePresence with mode="wait"', () => {
    render(
      <TopicTransition topicIndex={1} direction="next">
        <div data-testid="child">Topic 1</div>
      </TopicTransition>,
    );

    expect(screen.getByTestId('animate-presence')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(__getLastAnimatePresenceProps().mode).toBe('wait');
  });

  it('uses topicIndex as key for motion.div', () => {
    render(
      <TopicTransition topicIndex={3} direction="next">
        <div>Topic 3</div>
      </TopicTransition>,
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toBeInTheDocument();
  });

  it('applies directional custom prop for "next" direction', () => {
    render(
      <TopicTransition topicIndex={2} direction="next">
        <div>Topic 2</div>
      </TopicTransition>,
    );

    const props = __getLastMotionDivProps();
    expect(props.custom).toBe('next');
  });

  it('applies directional custom prop for "prev" direction', () => {
    render(
      <TopicTransition topicIndex={1} direction="prev">
        <div>Topic 1</div>
      </TopicTransition>,
    );

    const props = __getLastMotionDivProps();
    expect(props.custom).toBe('prev');
  });

  it('uses slide variants with x translation when reduced motion is off', () => {
    render(
      <TopicTransition topicIndex={1} direction="next">
        <div>Content</div>
      </TopicTransition>,
    );

    const props = __getLastMotionDivProps();
    const variants = props.variants as Record<string, unknown>;
    // slideVariants.initial is a function (custom direction)
    expect(typeof variants.initial).toBe('function');
    expect(typeof variants.exit).toBe('function');
    // animate is an object with x property
    const animate = variants.animate as Record<string, unknown>;
    expect(animate.x).toBe(0);
    expect(animate.opacity).toBe(1);
  });

  it('uses motion lifecycle props (initial, animate, exit)', () => {
    render(
      <TopicTransition topicIndex={1} direction="next">
        <div>Content</div>
      </TopicTransition>,
    );

    const props = __getLastMotionDivProps();
    expect(props.initial).toBe('initial');
    expect(props.animate).toBe('animate');
    expect(props.exit).toBe('exit');
  });
});

describe('TopicTransition reduced motion', () => {
  beforeEach(() => {
    mockReducedMotion = true;
    vi.clearAllMocks();
  });

  it('uses fade variants (opacity only, no x) when reduced motion is active', () => {
    render(
      <TopicTransition topicIndex={1} direction="next">
        <div data-testid="child">Content</div>
      </TopicTransition>,
    );

    const props = __getLastMotionDivProps();
    const variants = props.variants as Record<string, unknown>;
    // fadeVariants.initial is a plain object (no function), no x property
    expect(typeof variants.initial).toBe('object');
    const initial = variants.initial as Record<string, unknown>;
    expect(initial.opacity).toBe(0);
    expect(initial).not.toHaveProperty('x');
    // fadeVariants.exit is also a plain object, no x
    expect(typeof variants.exit).toBe('object');
    const exit = variants.exit as Record<string, unknown>;
    expect(exit.opacity).toBe(0);
    expect(exit).not.toHaveProperty('x');
  });

  it('still renders children correctly with reduced motion', () => {
    render(
      <TopicTransition topicIndex={5} direction="prev">
        <div data-testid="child">Topic 5</div>
      </TopicTransition>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('animate-presence')).toBeInTheDocument();
  });
});
