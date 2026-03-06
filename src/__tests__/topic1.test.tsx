import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { topic1Data } from '@/data/topic1Data';
import Topic1 from '@/components/topics/Topic1';

describe('topic1Data', () => {
  it('exports topic data with required fields', () => {
    expect(topic1Data).toBeDefined();
    expect(topic1Data.title).toBeTruthy();
    expect(topic1Data.definition).toBeTruthy();
    expect(topic1Data.analogy).toBeTruthy();
    expect(topic1Data.metric).toBeDefined();
    expect(topic1Data.metric.value).toBe(88);
    expect(topic1Data.metric.suffix).toBe('%');
    expect(topic1Data.metric.context).toBeTruthy();
  });

  it('contains supporting items with highlights', () => {
    expect(topic1Data.supportingItems.length).toBeGreaterThan(0);
    topic1Data.supportingItems.forEach((item) => {
      expect(item.highlight).toBeTruthy();
      expect(item.text).toBeTruthy();
    });
  });

  it('contains talking points', () => {
    expect(topic1Data.talkingPoints.length).toBeGreaterThan(0);
    topic1Data.talkingPoints.forEach((point) => {
      expect(point.text).toBeTruthy();
    });
  });

  it('contains narrator notes', () => {
    expect(topic1Data.narratorNotes.length).toBeGreaterThan(0);
    topic1Data.narratorNotes.forEach((note) => {
      expect(note).toBeTruthy();
    });
  });
});

describe('Topic1', () => {
  it('renders title from data source', () => {
    render(<Topic1 />);
    expect(screen.getByText(topic1Data.title)).toBeInTheDocument();
  });

  it('renders definition and analogy', () => {
    render(<Topic1 />);
    expect(screen.getByText(topic1Data.definition)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(topic1Data.analogy))).toBeInTheDocument();
  });

  it('renders AnimatedCounter with danger variant', () => {
    render(<Topic1 />);
    const counter = screen.getByTestId('animated-counter');
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveAttribute('aria-label', '88%');
  });

  it('renders hero metric with large text size (min text-8xl)', () => {
    render(<Topic1 />);
    const counter = screen.getByTestId('animated-counter');
    expect(counter.className).toMatch(/text-[89]xl|text-\[/);
  });

  it('renders reveal container', () => {
    render(<Topic1 />);
    expect(screen.getByTestId('topic-reveal-container')).toBeInTheDocument();
  });

  it('renders NeonCard data cards', () => {
    render(<Topic1 />);
    const cards = screen.getAllByTestId('neon-card');
    expect(cards.length).toBe(topic1Data.supportingItems.length);
  });

  it('renders supporting item highlights', () => {
    render(<Topic1 />);
    topic1Data.supportingItems.forEach((item) => {
      expect(screen.getByText(item.highlight)).toBeInTheDocument();
    });
  });

  it('has narrator toggle buttons', () => {
    render(<Topic1 />);
    expect(screen.getByText('Conteudo')).toBeInTheDocument();
    expect(screen.getByText('Notas')).toBeInTheDocument();
  });

  it('shows narrator notes when Notas button is clicked', () => {
    render(<Topic1 />);
    fireEvent.click(screen.getByText('Notas'));
    expect(screen.getByText(topic1Data.narratorNotes[0])).toBeInTheDocument();
  });
});
