import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PresentationProvider } from '@/contexts/PresentationContext';
import { PresentationLayout } from '@/components/layout/PresentationLayout';

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    fillStyle: '',
    fillRect: vi.fn(),
    fillText: vi.fn(),
    font: '',
    setTransform: vi.fn(),
  })) as unknown as typeof HTMLCanvasElement.prototype.getContext;

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe('PresentationLayout', () => {
  it('renders shell with content area and progress bar in footer', () => {
    render(
      <PresentationProvider>
        <PresentationLayout>
          <div data-testid="topic-content">Topic Content</div>
        </PresentationLayout>
      </PresentationProvider>
    );

    expect(screen.getByTestId('topic-content')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders progress bar with correct aria attributes', () => {
    render(
      <PresentationProvider>
        <PresentationLayout>
          <div>Content</div>
        </PresentationLayout>
      </PresentationProvider>
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '1');
    expect(progressBar).toHaveAttribute('aria-valuemin', '1');
    expect(progressBar).toHaveAttribute('aria-valuemax', '5');
  });

  it('renders 5 progress segments', () => {
    render(
      <PresentationProvider>
        <PresentationLayout>
          <div>Content</div>
        </PresentationLayout>
      </PresentationProvider>
    );

    const progressBar = screen.getByRole('progressbar');
    const segments = progressBar.children;
    expect(segments.length).toBe(5);
  });

  it('applies horizontal containment classes for 1024x768 safety', () => {
    render(
      <PresentationProvider>
        <PresentationLayout>
          <div>Content</div>
        </PresentationLayout>
      </PresentationProvider>
    );

    expect(screen.getByTestId('presentation-shell')).toHaveClass('overflow-hidden');
    expect(screen.getByRole('main')).toHaveClass('overflow-x-hidden');
    expect(screen.getByTestId('presentation-content')).toHaveClass('max-w-[1024px]');
  });

  it('keeps the shell on semantic primary text instead of accent text', () => {
    render(
      <PresentationProvider>
        <PresentationLayout>
          <div>Content</div>
        </PresentationLayout>
      </PresentationProvider>
    );

    expect(screen.getByTestId('presentation-shell')).toHaveClass('text-text-primary');
    expect(screen.getByTestId('presentation-shell')).not.toHaveClass('text-accent-primary');
  });

  it('renders children directly without wrapping Suspense (Suspense is in App)', () => {
    render(
      <PresentationProvider>
        <PresentationLayout>
          <div data-testid="direct-child">Direct Content</div>
        </PresentationLayout>
      </PresentationProvider>
    );

    expect(screen.getByTestId('direct-child')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
