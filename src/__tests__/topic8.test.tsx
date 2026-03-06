import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Topic8 from '@/components/topics/Topic8';
import { topic8Data } from '@/data/topic8Data';

describe('topic8Data', () => {
  it('exports required content for topic 8', () => {
    expect(topic8Data.title).toBeTruthy();
    expect(topic8Data.subtitle).toBeTruthy();
    expect(topic8Data.summary).toBeTruthy();
    expect(topic8Data.heroMetric.value).toBe(52);
    expect(topic8Data.secondaryMetric.value).toBe(100);
  });

  it('contains GSD workflow and recovery commands', () => {
    expect(topic8Data.workflowRail).toHaveLength(5);
    expect(topic8Data.recoveryCommands).toHaveLength(3);
    expect(topic8Data.workflowRail[0].command).toBe('/gsd:new-project');
    expect(topic8Data.workflowRail[3].command).toBe('/gsd:execute-phase 1');
    expect(topic8Data.recoveryCommands.map((command) => command.command)).toEqual([
      '/gsd:progress',
      '/gsd:debug "descricao"',
      '/gsd:quick',
    ]);
  });
});

describe('Topic8', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
  });

  it('renders title from topic8Data', () => {
    render(<Topic8 />);
    expect(screen.getByText(topic8Data.title)).toBeInTheDocument();
    expect(screen.getByText(topic8Data.subtitle)).toBeInTheDocument();
  });

  it('renders matrix terminal and reveals simulation lines', () => {
    render(<Topic8 />);
    const terminal = screen.getByTestId('matrix-terminal');
    expect(terminal).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(topic8Data.terminalLines.length * 300 + 50);
    });

    expect(within(terminal).getByText('/gsd:new-project')).toBeInTheDocument();
    expect(
      within(terminal).getByText('git log: 12 commits atomicos (1 tarefa = 1 commit)'),
    ).toBeInTheDocument();
  });

  it('renders both animated counters with success metrics', () => {
    render(<Topic8 />);
    const counters = screen.getAllByTestId('animated-counter');

    expect(counters).toHaveLength(2);
    expect(counters[0]).toHaveAttribute(
      'aria-label',
      `${topic8Data.heroMetric.value}${topic8Data.heroMetric.suffix}`,
    );
    expect(counters[1]).toHaveAttribute(
      'aria-label',
      `${topic8Data.secondaryMetric.value}${topic8Data.secondaryMetric.suffix}`,
    );
  });

  it('toggles between content and narrator notes', () => {
    render(<Topic8 />);
    fireEvent.click(screen.getByRole('button', { name: 'Notas' }));

    expect(
      screen.getByText(topic8Data.labels.notesTerminalTitle),
    ).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime((topic8Data.narrator.notes.length + 2) * 300 + 50);
    });

    expect(
      screen.getByText(`1. ${topic8Data.narrator.notes[0]}`),
    ).toBeInTheDocument();
  });

  it('does not prevent global keyboard navigation events', () => {
    render(<Topic8 />);
    const keydown = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      cancelable: true,
      bubbles: true,
    });

    const dispatchResult = window.dispatchEvent(keydown);
    expect(dispatchResult).toBe(true);
    expect(keydown.defaultPrevented).toBe(false);
  });
});
