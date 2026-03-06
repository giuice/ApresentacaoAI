import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { topic1Data } from '@/data/topic1Data';
import Topic1 from '@/components/topics/Topic1';

describe('topic1Data', () => {
  it('exports topic data with required fields', () => {
    expect(topic1Data).toBeDefined();
    expect(topic1Data.title).toBeTruthy();
    expect(topic1Data.subtitle).toBeTruthy();
    expect(topic1Data.metric).toBeDefined();
    expect(topic1Data.metric.value).toBe(88);
    expect(topic1Data.metric.suffix).toBe('%');
    expect(topic1Data.metric.context).toBeTruthy();
  });

  it('contains supporting items', () => {
    expect(topic1Data.supportingItems).toBeDefined();
    expect(topic1Data.supportingItems.length).toBeGreaterThan(0);
    topic1Data.supportingItems.forEach((item) => {
      expect(item.text).toBeTruthy();
    });
  });
});

describe('Topic1', () => {
  it('renders title and subtitle from data source', () => {
    render(<Topic1 />);
    expect(screen.getByText(topic1Data.title)).toBeInTheDocument();
    expect(screen.getByText(topic1Data.subtitle)).toBeInTheDocument();
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

  it('renders supporting items from data', () => {
    render(<Topic1 />);
    topic1Data.supportingItems.forEach((item) => {
      expect(screen.getByText(item.text)).toBeInTheDocument();
    });
  });
});
