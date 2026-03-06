import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App, getTopicComponentForIndex } from './App';

describe('App', () => {
  it('renders the presentation shell with progress bar', async () => {
    render(<App />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByTestId('matrix-background')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Topic 1/)).toBeInTheDocument();
    });
  });

  it('uses topic 1 as fallback for invalid topic indexes', () => {
    expect(getTopicComponentForIndex(0)).toBe(getTopicComponentForIndex(1));
    expect(getTopicComponentForIndex(99)).toBe(getTopicComponentForIndex(1));
  });
});
