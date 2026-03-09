import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PresentationProvider, usePresentation } from '@/contexts/PresentationContext';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { Overview } from '@/components/layout/Overview';
import { topics } from '@/data/topics';

function TestHarness() {
  const { currentTopicIndex, isOverviewOpen, dispatch } = usePresentation();
  useKeyboardNavigation();
  return (
    <div>
      <button type="button" data-testid="opener" onClick={() => dispatch({ type: 'TOGGLE_OVERVIEW' })}>
        Abrir overview
      </button>
      <span data-testid="index">{currentTopicIndex}</span>
      <span data-testid="overview">{isOverviewOpen ? 'open' : 'closed'}</span>
      {isOverviewOpen && <Overview />}
    </div>
  );
}

function renderWithProvider() {
  const user = userEvent.setup();
  const result = render(
    <PresentationProvider>
      <TestHarness />
    </PresentationProvider>,
  );
  return { user, ...result };
}

describe('Overview', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('toggles overview open and closed with Escape', async () => {
    const { user } = renderWithProvider();

    expect(screen.getByTestId('overview').textContent).toBe('closed');

    await user.keyboard('[Escape]');
    expect(screen.getByTestId('overview').textContent).toBe('open');
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('[Escape]');
    expect(screen.getByTestId('overview').textContent).toBe('closed');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('preserves current topic when closing overview without selection', async () => {
    const { user } = renderWithProvider();

    await user.keyboard('[ArrowRight]');
    await user.keyboard('[ArrowRight]');
    expect(screen.getByTestId('index').textContent).toBe('3');

    await user.keyboard('[Escape]');
    expect(screen.getByTestId('overview').textContent).toBe('open');

    await user.keyboard('[Escape]');
    expect(screen.getByTestId('overview').textContent).toBe('closed');
    expect(screen.getByTestId('index').textContent).toBe('3');
  });

  it('renders all topic cards with titles', async () => {
    const { user } = renderWithProvider();

    await user.keyboard('[Escape]');
    const dialog = screen.getByRole('dialog');
    const buttons = within(dialog).getAllByRole('button');

    expect(buttons).toHaveLength(topics.length);

    topics.forEach((topic) => {
      expect(dialog).toHaveTextContent(topic.title);
    });
  });

  it('selects a topic by clicking a card', async () => {
    const { user } = renderWithProvider();

    await user.keyboard('[Escape]');
    expect(screen.getByTestId('overview').textContent).toBe('open');

    const card10 = screen.getByRole('button', { name: /10/i });
    await user.click(card10);

    expect(screen.getByTestId('overview').textContent).toBe('closed');
    expect(screen.getByTestId('index').textContent).toBe('10');
  });

  it('selects a topic by pressing Enter on a focused card', async () => {
    const { user } = renderWithProvider();

    await user.keyboard('[Escape]');

    const card5 = document.querySelector<HTMLButtonElement>('[data-topic-index="5"]')!;
    card5.focus();
    await user.keyboard('[Enter]');

    expect(screen.getByTestId('overview').textContent).toBe('closed');
    expect(screen.getByTestId('index').textContent).toBe('5');
  });

  it('selects a topic by pressing Space on a focused card', async () => {
    const { user } = renderWithProvider();

    await user.keyboard('[Escape]');

    const card8 = document.querySelector<HTMLButtonElement>('[data-topic-index="8"]')!;
    card8.focus();
    await user.keyboard('[Space]');

    expect(screen.getByTestId('overview').textContent).toBe('closed');
    expect(screen.getByTestId('index').textContent).toBe('8');
  });

  it('does not change topic with ArrowRight/ArrowLeft while overview is open', async () => {
    const { user } = renderWithProvider();

    await user.keyboard('[ArrowRight]');
    expect(screen.getByTestId('index').textContent).toBe('2');

    await user.keyboard('[Escape]');
    expect(screen.getByTestId('overview').textContent).toBe('open');

    await user.keyboard('[ArrowRight]');
    expect(screen.getByTestId('index').textContent).toBe('2');

    await user.keyboard('[ArrowLeft]');
    expect(screen.getByTestId('index').textContent).toBe('2');
  });

  it('has correct dialog accessibility attributes', async () => {
    const { user } = renderWithProvider();

    await user.keyboard('[Escape]');

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'overview-title');
    expect(screen.getByText('Visão operacional da apresentação')).toHaveAttribute(
      'id',
      'overview-title',
    );
  });

  it('focuses the active topic card when opening overview', async () => {
    const { user } = renderWithProvider();

    await user.keyboard('[ArrowRight]');
    await user.keyboard('[ArrowRight]');
    expect(screen.getByTestId('index').textContent).toBe('3');

    await user.keyboard('[Escape]');

    expect(document.activeElement).toHaveAttribute('data-topic-index', '3');
  });

  it('traps focus with Tab and Shift+Tab inside the dialog', async () => {
    const { user } = renderWithProvider();

    await user.keyboard('[Escape]');
    const dialog = screen.getByRole('dialog');
    const buttons = within(dialog).getAllByRole('button');
    const firstButton = buttons[0];
    const lastButton = buttons[buttons.length - 1];

    firstButton.focus();
    await user.tab({ shift: true });
    expect(lastButton).toHaveFocus();

    await user.tab();
    expect(firstButton).toHaveFocus();
  });

  it('restores focus to opener after closing the overview', async () => {
    const { user } = renderWithProvider();
    const opener = screen.getByTestId('opener');

    opener.focus();
    expect(opener).toHaveFocus();

    await user.keyboard('[Escape]');
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('[Escape]');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it('keeps overview constrained for 1280x720 without horizontal overflow', async () => {
    const { user } = renderWithProvider();
    window.innerWidth = 1280;
    window.innerHeight = 720;

    await user.keyboard('[Escape]');

    const dialog = screen.getByRole('dialog');
    const sections = within(dialog).getAllByText(/Bloco \d|Bônus Operacional/i);
    expect(sections.length).toBeGreaterThan(0);
    expect(dialog).toHaveClass('max-h-[calc(100vh-2rem)]');
    expect(dialog).toHaveClass('overflow-y-auto');
    expect(dialog).toHaveClass('overflow-x-hidden');
  });

  it('marca o card do topico ativo com aria-current="true"', async () => {
    const { user } = renderWithProvider();

    await user.keyboard('[ArrowRight]');
    await user.keyboard('[ArrowRight]');
    expect(screen.getByTestId('index').textContent).toBe('3');

    await user.keyboard('[Escape]');

    const activeCard = document.querySelector<HTMLButtonElement>('[data-topic-index="3"]');
    expect(activeCard).toHaveAttribute('aria-current', 'true');

    const inactiveCard = document.querySelector<HTMLButtonElement>('[data-topic-index="1"]');
    expect(inactiveCard).not.toHaveAttribute('aria-current');
  });

  it('destaca o topico 17 como bonus operacional', async () => {
    const { user } = renderWithProvider();

    await user.keyboard('[Escape]');

    expect(screen.getAllByText('Bônus Operacional').length).toBeGreaterThan(0);
    expect(
      screen.getByText(
        'Copilot além do autocomplete: como operar comandos, threads e multiagentes com controle',
      ),
    ).toBeInTheDocument();
  });
});
