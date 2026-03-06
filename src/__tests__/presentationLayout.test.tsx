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
    globalAlpha: 1,
  })) as unknown as typeof HTMLCanvasElement.prototype.getContext;
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

  it('renders canvas rain and scanline overlay', () => {
    render(
      <PresentationProvider>
        <PresentationLayout>
          <div>Content</div>
        </PresentationLayout>
      </PresentationProvider>
    );

    expect(screen.getByTestId('matrix-background')).toBeInTheDocument();
    expect(screen.getByTestId('scanline-overlay')).toBeInTheDocument();
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

  it('applies horizontal containment classes for projector safety', () => {
    render(
      <PresentationProvider>
        <PresentationLayout>
          <div>Content</div>
        </PresentationLayout>
      </PresentationProvider>
    );

    expect(screen.getByTestId('presentation-shell')).toHaveClass('overflow-hidden');
    expect(screen.getByTestId('presentation-content')).toHaveClass('max-w-7xl');
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

  it('shell has z-index 2 for correct stacking over canvas and scanline', () => {
    render(
      <PresentationProvider>
        <PresentationLayout>
          <div>Content</div>
        </PresentationLayout>
      </PresentationProvider>
    );

    expect(screen.getByTestId('presentation-shell').style.zIndex).toBe('2');
  });
});
