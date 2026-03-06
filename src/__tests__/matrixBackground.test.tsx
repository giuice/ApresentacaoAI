import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import { MatrixBackground } from '@/components/layout/MatrixBackground';

const mockCtx = {
  fillStyle: '',
  font: '',
  globalAlpha: 1,
  fillRect: vi.fn(),
  fillText: vi.fn(),
};

describe('MatrixBackground', () => {
  let rafSpy: MockInstance;
  let cafSpy: MockInstance;
  let rafId: number;
  let rafCallback: FrameRequestCallback | null;

  beforeEach(() => {
    rafId = 1;
    rafCallback = null;
    rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      rafCallback = callback;
      return rafId++;
    });
    cafSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: vi.fn().mockImplementation((property: string) => {
        if (property === '--color-accent-primary') return '#12AB34';
        return '';
      }),
    } as unknown as CSSStyleDeclaration);

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

  it('calls cancelAnimationFrame on unmount', () => {
    const { unmount } = render(<MatrixBackground />);
    unmount();
    expect(cafSpy).toHaveBeenCalled();
  });

  it('renders a canvas with aria-hidden', () => {
    render(<MatrixBackground />);
    const canvas = screen.getByTestId('matrix-background');
    expect(canvas.tagName).toBe('CANVAS');
    expect(canvas).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with fixed positioning for fullscreen coverage', () => {
    render(<MatrixBackground />);
    const canvas = screen.getByTestId('matrix-background');
    expect(canvas.style.position).toBe('fixed');
    expect(canvas.style.top).toBe('0px');
    expect(canvas.style.left).toBe('0px');
    expect(canvas.style.width).toBe('100%');
    expect(canvas.style.height).toBe('100%');
  });

  it('applies subtle opacity via inline style', () => {
    render(<MatrixBackground />);
    const canvas = screen.getByTestId('matrix-background');
    expect(canvas.style.opacity).toBe('0.5');
  });

  it('draws characters on even frames using accent color', () => {
    render(<MatrixBackground />);

    // Frame 1 (odd) — skipped
    act(() => { rafCallback?.(16); });
    // Frame 2 (even) — draws
    act(() => { rafCallback?.(32); });

    expect(mockCtx.fillStyle).toBe('#12AB34');
    expect(mockCtx.fillRect).toHaveBeenCalled();
  });

  it('has pointer-events none and z-index 0', () => {
    render(<MatrixBackground />);
    const canvas = screen.getByTestId('matrix-background');
    expect(canvas.style.pointerEvents).toBe('none');
    expect(canvas.style.zIndex).toBe('0');
  });
});
