import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Topic6 from '@/components/topics/Topic6';
import { topic6Data } from '@/data/topic6Data';

describe('topic6Data', () => {
  it('exports required data structure for Topic 6', () => {
    expect(topic6Data.title).toBeTruthy();
    expect(topic6Data.subtitle).toBeTruthy();
    expect(topic6Data.heroMetric.value).toBe(85);
    expect(topic6Data.toolLadder).toHaveLength(3);
    expect(topic6Data.narratorNotes.length).toBeGreaterThan(0);
  });
});

describe('Topic6', () => {
  it('renders title and subtitle from topic6Data', () => {
    render(<Topic6 />);

    expect(screen.getByText(topic6Data.title)).toBeInTheDocument();
    expect(screen.getByText(topic6Data.subtitle)).toBeInTheDocument();
  });

  it('renders hero metric with AnimatedCounter success state', () => {
    render(<Topic6 />);

    const counter = screen.getByTestId('animated-counter');
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveAttribute('aria-label', '85%');
    expect(counter.className).toContain('text-accent-primary');
  });

  it('renders staircase layout with three tool cards', () => {
    render(<Topic6 />);

    const cards = screen.getAllByTestId('neon-card');
    expect(cards).toHaveLength(topic6Data.toolLadder.length);
    topic6Data.toolLadder.forEach((tool) => {
      expect(screen.getByText(tool.name)).toBeInTheDocument();
      expect(screen.getByText(tool.problem)).toBeInTheDocument();
      expect(screen.getByText(tool.impactMetric)).toBeInTheDocument();
      expect(screen.getByText(tool.sddLevel)).toBeInTheDocument();
    });
  });

  it('keeps spacing and overflow controls for projector readability', () => {
    render(<Topic6 />);

    const revealContainer = screen.getByTestId('topic-reveal-container');
    expect(revealContainer.className).toContain('p-8');
    expect(revealContainer.className).toContain('overflow-hidden');
  });

  it('toggles to narrator page and renders MatrixTerminal', () => {
    render(<Topic6 />);

    fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
    expect(screen.getByTestId('matrix-terminal')).toBeInTheDocument();
    expect(screen.getByText(topic6Data.narratorTerminalTitle)).toBeInTheDocument();
  });

  it('renders supporting copy from topic6Data source', () => {
    render(<Topic6 />);

    expect(screen.getByText(new RegExp(topic6Data.inevitabilityQuote))).toBeInTheDocument();
    expect(screen.getByText(topic6Data.complexityAxisLabel)).toBeInTheDocument();
    expect(screen.getByText(topic6Data.comparisonNote)).toBeInTheDocument();
  });
});
