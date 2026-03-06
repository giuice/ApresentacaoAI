import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import { MatrixBackground } from '@/components/layout/MatrixBackground';

const mockCtx = {
  fillStyle: '',
  font: '',
  setTransform: vi.fn(),
  fillRect: vi.fn(),
  fillText: vi.fn(),
};

describe('MatrixBackground', () => {
  let rafSpy: MockInstance;
  let cafSpy: MockInstance;
  let rafId: number;
  let rafCallback: FrameRequestCallback | null;
  let matchMediaMatches = false;

  beforeEach(() => {
    rafId = 1;
    rafCallback = null;
    matchMediaMatches = false;
    rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      rafCallback = callback;
      return rafId++;
    });
    cafSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: vi.fn().mockImplementation((property: string) => {
        if (property === '--color-accent-primary') {
          return '#12AB34';
        }

        return '';
      }),
    } as unknown as CSSStyleDeclaration);

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: matchMediaMatches,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });

    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(mockCtx) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('registers requestAnimationFrame on mount', () => {
    render(<MatrixBackground />);
    expect(rafSpy).toHaveBeenCalled();
  });

  it('does not start the RAF loop when reduced motion is enabled', () => {
    matchMediaMatches = true;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });

    render(<MatrixBackground />);

    expect(rafSpy).not.toHaveBeenCalled();
  });

  it('calls cancelAnimationFrame on unmount', () => {
    const { unmount } = render(<MatrixBackground />);
    unmount();
    expect(cafSpy).toHaveBeenCalled();
  });

  it('renders a canvas with pointer-events-none and aria-hidden', () => {
    render(<MatrixBackground />);
    const canvas = screen.getByTestId('matrix-background');
    expect(canvas.tagName).toBe('CANVAS');
    expect(canvas).toHaveClass('pointer-events-none');
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with fixed positioning for fullscreen coverage', () => {
    render(<MatrixBackground />);
    const canvas = screen.getByTestId('matrix-background');
    expect(canvas).toHaveClass('fixed');
    expect(canvas).toHaveClass('inset-0');
  });

  it('applies subtle opacity via inline style', () => {
    render(<MatrixBackground />);
    const canvas = screen.getByTestId('matrix-background');
    expect(canvas.style.opacity).toBe('0.5');
  });

  it('uses the semantic accent token for matrix characters', () => {
    render(<MatrixBackground />);

    act(() => {
      rafCallback?.(100);
    });

    expect(mockCtx.fillStyle).toBe('#12AB34');
  });
});
