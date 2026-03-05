import { lazy, type ComponentType } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { PresentationProvider } from '@/contexts/PresentationContext';
import { PresentationLayout } from '@/components/layout/PresentationLayout';

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

  it('shows suspense fallback while loading topic and keeps shell visible', async () => {
    let resolveTopicModule: ((module: { default: ComponentType }) => void) | undefined;

    const LazyTopic = lazy(
      () =>
        new Promise<{ default: ComponentType }>((resolve) => {
          resolveTopicModule = resolve;
        })
    );

    render(
      <PresentationProvider>
        <PresentationLayout>
          <LazyTopic />
        </PresentationLayout>
      </PresentationProvider>
    );

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await act(async () => {
      resolveTopicModule?.({ default: () => <div>Lazy Topic</div> });
    });

    await waitFor(() => {
      expect(screen.getByText('Lazy Topic')).toBeInTheDocument();
    });
  });
});
