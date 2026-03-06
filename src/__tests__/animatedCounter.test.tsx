import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let mockReducedMotion = false;
let animateCalls: Array<{ from: unknown; to: unknown; options: unknown }> = [];
let mockMotionValueListeners: Map<string, Array<(v: unknown) => void>> = new Map();

vi.mock('framer-motion', () => {
  const React = require('react');

  const createMockMotionValue = (initial: number) => {
    const listeners: Array<(v: unknown) => void> = [];
    const id = Math.random().toString();
    mockMotionValueListeners.set(id, listeners);

    return {
      get: () => initial,
      set: (v: number) => {
        listeners.forEach((fn) => fn(v));
      },
      on: (_event: string, callback: (v: unknown) => void) => {
        listeners.push(callback);
        return () => {
          const idx = listeners.indexOf(callback);
          if (idx >= 0) listeners.splice(idx, 1);
        };
      },
      onChange: (callback: (v: unknown) => void) => {
        listeners.push(callback);
        return () => {
          const idx = listeners.indexOf(callback);
          if (idx >= 0) listeners.splice(idx, 1);
        };
      },
      _id: id,
    };
  };

  const motionDiv = React.forwardRef(
    (
      { children, ...props }: { children?: React.ReactNode; [key: string]: unknown },
      ref: React.Ref<HTMLDivElement>,
    ) => {
      const variants = props.variants as Record<string, unknown> | undefined;
      const hiddenVariant = variants?.hidden as Record<string, unknown> | undefined;
      const visibleVariant = variants?.visible as Record<string, unknown> | undefined;
      const visibleTransition = visibleVariant?.transition as Record<string, unknown> | undefined;

      return React.createElement(
        'div',
        {
          'data-testid': props['data-testid'] || 'motion-div',
          'data-hidden-has-y': hiddenVariant?.y !== undefined ? 'true' : 'false',
          'data-visible-delay': visibleTransition?.delay ?? '',
          'data-visible-duration': visibleTransition?.duration ?? '',
          className: props.className,
          style: props.style,
          'aria-label': props['aria-label'],
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
    useMotionValue: (initial: number) => createMockMotionValue(initial),
    useTransform: (motionVal: ReturnType<typeof createMockMotionValue>, transform: (v: number) => string) => {
      const listeners: Array<(v: unknown) => void> = [];
      const sourceListeners = mockMotionValueListeners.get(motionVal._id) || [];

      sourceListeners.push((v: unknown) => {
        const transformed = transform(v as number);
        listeners.forEach((fn) => fn(transformed));
      });

      return {
        get: () => transform(motionVal.get() as number),
        on: (_event: string, callback: (v: unknown) => void) => {
          listeners.push(callback);
          return () => {
            const idx = listeners.indexOf(callback);
            if (idx >= 0) listeners.splice(idx, 1);
          };
        },
      };
    },
    animate: (motionVal: ReturnType<typeof createMockMotionValue>, to: number, options: Record<string, unknown>) => {
      animateCalls.push({ from: motionVal.get(), to, options });

      // Simulate immediate completion for testing
      const sourceListeners = mockMotionValueListeners.get(motionVal._id) || [];
      sourceListeners.forEach((fn) => fn(to));

      return { stop: vi.fn() };
    },
  };
});

import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

describe('AnimatedCounter', () => {
  beforeEach(() => {
    mockReducedMotion = false;
    animateCalls = [];
    mockMotionValueListeners = new Map();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with data-testid and aria-label', () => {
    render(<AnimatedCounter value={88} variant="danger" />);

    expect(screen.getByTestId('animated-counter')).toBeInTheDocument();
    expect(screen.getByTestId('animated-counter')).toHaveAttribute('aria-label', '88');
  });

  it('starts animation after 0.4s delay', () => {
    render(<AnimatedCounter value={88} variant="danger" />);

    expect(animateCalls).toHaveLength(0);

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(animateCalls).toHaveLength(1);
    expect(animateCalls[0].to).toBe(88);
  });

  it('uses easing and duration 1.2s for interpolation', () => {
    render(<AnimatedCounter value={88} variant="danger" />);

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(animateCalls[0].options).toMatchObject({
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    });
  });

  it('displays suffix alongside the value', () => {
    render(<AnimatedCounter value={88} variant="danger" suffix="%" />);

    act(() => {
      vi.advanceTimersByTime(400);
    });

    const valueEl = screen.getByTestId('animated-counter-value');
    expect(valueEl.textContent).toContain('%');
  });

  it('has aria-label with suffix', () => {
    render(<AnimatedCounter value={88} variant="danger" suffix="%" />);

    expect(screen.getByTestId('animated-counter')).toHaveAttribute('aria-label', '88%');
  });

  it('applies danger variant color class', () => {
    render(<AnimatedCounter value={88} variant="danger" />);

    const el = screen.getByTestId('animated-counter');
    expect(el.className).toContain('text-accent-danger');
  });

  it('applies success variant color class', () => {
    render(<AnimatedCounter value={42} variant="success" />);

    const el = screen.getByTestId('animated-counter');
    expect(el.className).toContain('text-accent-primary');
  });

  it('applies glow text-shadow for danger variant', () => {
    render(<AnimatedCounter value={88} variant="danger" />);

    const el = screen.getByTestId('animated-counter');
    expect(el.style.textShadow).toContain('--glow-danger');
  });

  it('applies glow text-shadow for success variant', () => {
    render(<AnimatedCounter value={42} variant="success" />);

    const el = screen.getByTestId('animated-counter');
    expect(el.style.textShadow).toContain('--glow-primary');
  });

  it('uses font-mono class', () => {
    render(<AnimatedCounter value={88} variant="danger" />);

    const el = screen.getByTestId('animated-counter');
    expect(el.className).toContain('font-mono');
  });

  it('passes custom className', () => {
    render(<AnimatedCounter value={88} variant="danger" className="text-8xl" />);

    const el = screen.getByTestId('animated-counter');
    expect(el.className).toContain('text-8xl');
  });

  describe('reduced motion', () => {
    beforeEach(() => {
      mockReducedMotion = true;
    });

    it('shows final value immediately without animation', () => {
      render(<AnimatedCounter value={88} variant="danger" />);

      const valueEl = screen.getByTestId('animated-counter-value');
      expect(valueEl.textContent).toBe('88');
    });

    it('shows final value with suffix immediately', () => {
      render(<AnimatedCounter value={88} variant="danger" suffix="%" />);

      const valueEl = screen.getByTestId('animated-counter-value');
      expect(valueEl.textContent).toBe('88%');
    });

    it('does not trigger animate call', () => {
      render(<AnimatedCounter value={88} variant="danger" />);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(animateCalls).toHaveLength(0);
    });

    it('preserves decimal precision for non-integer values', () => {
      render(<AnimatedCounter value={3.14} variant="success" />);

      const valueEl = screen.getByTestId('animated-counter-value');
      expect(valueEl.textContent).toBe('3.14');
    });

    it('uses reduced-motion reveal variant without axis displacement and with minimal transition', () => {
      render(<AnimatedCounter value={88} variant="danger" />);

      const counterEl = screen.getByTestId('animated-counter');
      expect(counterEl).toHaveAttribute('data-hidden-has-y', 'false');
      expect(counterEl).toHaveAttribute('data-visible-delay', '0');
      expect(counterEl).toHaveAttribute('data-visible-duration', '0.01');
    });
  });

  describe('decimal values', () => {
    it('handles non-integer values', () => {
      render(<AnimatedCounter value={0.08} variant="danger" suffix="%" />);

      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(animateCalls[0].to).toBe(0.08);
    });
  });
});
