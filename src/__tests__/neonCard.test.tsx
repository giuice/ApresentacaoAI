import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NeonCard } from '@/components/ui/NeonCard';

describe('NeonCard', () => {
  it('renders children content', () => {
    render(<NeonCard variant="success">Card content</NeonCard>);

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders with data-testid neon-card', () => {
    render(<NeonCard variant="success">Test</NeonCard>);

    expect(screen.getByTestId('neon-card')).toBeInTheDocument();
  });

  it('applies danger variant border class with #FF003C token', () => {
    render(<NeonCard variant="danger">Danger card</NeonCard>);

    const card = screen.getByTestId('neon-card');
    expect(card.className).toContain('border-accent-danger');
    expect(card.className).toContain('var(--glow-danger)');
    expect(card.className).toContain('var(--glow-danger-strong)');
  });

  it('applies success variant border class with #00FF41 token', () => {
    render(<NeonCard variant="success">Success card</NeonCard>);

    const card = screen.getByTestId('neon-card');
    expect(card.className).toContain('border-accent-primary');
    expect(card.className).toContain('var(--glow-primary)');
    expect(card.className).toContain('var(--glow-primary-strong)');
  });

  it('has card background class', () => {
    render(<NeonCard variant="success">Test</NeonCard>);

    const card = screen.getByTestId('neon-card');
    expect(card.className).toContain('bg-bg-card');
  });

  it('has border-radius of 16px via rounded-2xl', () => {
    render(<NeonCard variant="success">Test</NeonCard>);

    const card = screen.getByTestId('neon-card');
    expect(card.className).toContain('rounded-2xl');
  });

  it('has hover transition classes for transform and opacity', () => {
    render(<NeonCard variant="success">Test</NeonCard>);

    const card = screen.getByTestId('neon-card');
    expect(card.className).toMatch(/transition/);
  });

  it('has hover translateY class for elevation effect', () => {
    render(<NeonCard variant="danger">Test</NeonCard>);

    const card = screen.getByTestId('neon-card');
    expect(card.className).toMatch(/hover:-translate-y/);
  });

  it('passes custom className', () => {
    render(
      <NeonCard variant="success" className="my-custom">
        Test
      </NeonCard>,
    );

    const card = screen.getByTestId('neon-card');
    expect(card.className).toContain('my-custom');
  });

  it('has subtle border by default', () => {
    render(<NeonCard variant="success">Test</NeonCard>);

    const card = screen.getByTestId('neon-card');
    expect(card.className).toContain('border');
    expect(card.className).toContain('border-accent-primary');
  });
});
