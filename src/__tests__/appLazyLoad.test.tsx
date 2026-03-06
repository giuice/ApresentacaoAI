import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { App } from '@/App';

describe('App lazy loading', () => {
  it('renders shell (progress bar) immediately while topic loads via Suspense', async () => {
    render(<App />);

    // Shell/progress bar should be present immediately
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByTestId('matrix-background')).toBeInTheDocument();

    // Topic content should appear after lazy load resolves
    await waitFor(() => {
      expect(screen.getByText(/Topic 1/)).toBeInTheDocument();
    });
  });

  it('shell remains visible during topic loading', () => {
    render(<App />);

    // Progress bar is always outside of Suspense fallback
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar.closest('footer')).toBeInTheDocument();
    expect(screen.getByTestId('matrix-background')).toBeInTheDocument();
  });
});
