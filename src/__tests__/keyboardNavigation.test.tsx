import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PresentationProvider, usePresentation, TOTAL_TOPICS } from '@/contexts/PresentationContext';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

function TestComponent() {
  const { currentTopicIndex, direction, isOverviewOpen } = usePresentation();
  useKeyboardNavigation();
  return (
    <div>
      <span data-testid="index">{currentTopicIndex}</span>
      <span data-testid="direction">{direction}</span>
      <span data-testid="overview">{isOverviewOpen ? 'open' : 'closed'}</span>
      <input type="text" data-testid="input" />
    </div>
  );
}

describe('useKeyboardNavigation', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('navigates with keyboard correctly', async () => {
    const user = userEvent.setup();
    render(
      <PresentationProvider>
        <TestComponent />
      </PresentationProvider>
    );

    expect(screen.getByTestId('index').textContent).toBe('1');

    await user.keyboard('[ArrowRight]');
    expect(screen.getByTestId('index').textContent).toBe('2');
    expect(screen.getByTestId('direction').textContent).toBe('next');

    await user.keyboard('[Space]');
    expect(screen.getByTestId('index').textContent).toBe('3');

    await user.keyboard('[ArrowLeft]');
    expect(screen.getByTestId('index').textContent).toBe('2');
    expect(screen.getByTestId('direction').textContent).toBe('prev');

    await user.keyboard('[Escape]');
    expect(screen.getByTestId('overview').textContent).toBe('open');
  });

  it('respects boundaries and does not wrap around', async () => {
    const user = userEvent.setup();
    render(
      <PresentationProvider>
        <TestComponent />
      </PresentationProvider>
    );

    await user.keyboard('[ArrowLeft]');
    expect(screen.getByTestId('index').textContent).toBe('1');

    for (let i = 0; i < TOTAL_TOPICS + 4; i += 1) {
      await user.keyboard('[ArrowRight]');
    }

    expect(screen.getByTestId('index').textContent).toBe(String(TOTAL_TOPICS));

    await user.keyboard('[ArrowRight]');
    expect(screen.getByTestId('index').textContent).toBe(String(TOTAL_TOPICS));
  });

  it('keeps deterministic state on rapid sequential keys', async () => {
    const user = userEvent.setup();
    render(
      <PresentationProvider>
        <TestComponent />
      </PresentationProvider>
    );

    await user.keyboard('[ArrowRight][ArrowRight][Space][ArrowLeft][ArrowRight][Space][ArrowLeft]');
    expect(screen.getByTestId('index').textContent).toBe('4');
    expect(screen.getByTestId('direction').textContent).toBe('prev');
  });

  it('ignores keyboard events in input fields', async () => {
    const user = userEvent.setup();
    render(
      <PresentationProvider>
        <TestComponent />
      </PresentationProvider>
    );

    const input = screen.getByTestId('input');
    await user.click(input);
    await user.keyboard('[ArrowRight]');
    expect(screen.getByTestId('index').textContent).toBe('1');
  });

  it('ignores repeated keydown events', () => {
    render(
      <PresentationProvider>
        <TestComponent />
      </PresentationProvider>
    );

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', repeat: true, bubbles: true }));
    expect(screen.getByTestId('index').textContent).toBe('1');
  });
});
