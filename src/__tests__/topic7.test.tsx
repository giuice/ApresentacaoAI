import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Topic7 from '@/components/topics/Topic7';
import { topic7Data } from '@/data/topic7Data';

describe('topic7Data', () => {
  it('exports required structured content', () => {
    expect(topic7Data.title).toBeTruthy();
    expect(topic7Data.subtitle).toBeTruthy();
    expect(topic7Data.pipelineSteps).toHaveLength(7);
    expect(topic7Data.sixPrinciples).toHaveLength(6);
    expect(topic7Data.ecosystem.length).toBeGreaterThan(0);
    expect(topic7Data.honestView.criticisms.length).toBeGreaterThan(0);
    expect(topic7Data.honestView.responses.length).toBeGreaterThan(0);
    expect(topic7Data.narratorNotes.length).toBeGreaterThan(0);
  });

  it('contains complete pipeline metadata for each step', () => {
    topic7Data.pipelineSteps.forEach((step) => {
      expect(step.stage).toBeTruthy();
      expect(step.command).toBeTruthy();
      expect(step.description).toBeTruthy();
      expect(step.outputs.length).toBeGreaterThan(0);
      expect(step.checklist.length).toBeGreaterThan(0);
    });
  });
});

describe('Topic7', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders title and subtitle from data source', () => {
    render(<Topic7 />);
    expect(screen.getByText(topic7Data.title)).toBeInTheDocument();
    expect(screen.getByText(topic7Data.subtitle)).toBeInTheDocument();
  });

  it('renders hero metric counter with 15min target', () => {
    render(<Topic7 />);
    const counter = screen.getByTestId('animated-counter');
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveAttribute(
      'aria-label',
      `${topic7Data.heroMetric.after.value}${topic7Data.heroMetric.after.suffix}`,
    );
  });

  it('renders all seven pipeline commands', () => {
    render(<Topic7 />);
    topic7Data.pipelineSteps.forEach((step) => {
      expect(screen.getByText(step.command)).toBeInTheDocument();
    });
  });

  it('toggles to notes page and renders MatrixTerminal with narrator notes', () => {
    vi.useFakeTimers();
    render(<Topic7 />);

    fireEvent.click(screen.getByText('Notas'));

    expect(screen.getByTestId('matrix-terminal')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.getByText(topic7Data.narratorNotes[0])).toBeInTheDocument();
  });
});
