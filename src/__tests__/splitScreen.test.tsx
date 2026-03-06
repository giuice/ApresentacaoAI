import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SplitScreen } from '@/components/ui/SplitScreen';

describe('SplitScreen', () => {
  it('renders left and right content', () => {
    render(
      <SplitScreen
        leftContent={<div data-testid="left">Problema</div>}
        rightContent={<div data-testid="right">Solucao</div>}
      />,
    );

    expect(screen.getByTestId('left')).toBeInTheDocument();
    expect(screen.getByTestId('right')).toBeInTheDocument();
  });

  it('renders with data-testid split-screen', () => {
    render(
      <SplitScreen
        leftContent={<span>L</span>}
        rightContent={<span>R</span>}
      />,
    );

    expect(screen.getByTestId('split-screen')).toBeInTheDocument();
  });

  it('has grid layout class for desktop two-column display', () => {
    render(
      <SplitScreen
        leftContent={<span>L</span>}
        rightContent={<span>R</span>}
      />,
    );

    const container = screen.getByTestId('split-screen');
    expect(container.className).toContain('grid');
    expect(container.className).toMatch(/lg:grid-cols-2/);
  });

  it('uses single column by default for mobile (stacked layout)', () => {
    render(
      <SplitScreen
        leftContent={<span>L</span>}
        rightContent={<span>R</span>}
      />,
    );

    const container = screen.getByTestId('split-screen');
    expect(container.className).toContain('grid-cols-1');
  });

  it('renders left pane before right pane in DOM order', () => {
    render(
      <SplitScreen
        leftContent={<span>Problema</span>}
        rightContent={<span>Solucao</span>}
      />,
    );

    const container = screen.getByTestId('split-screen');
    const panes = container.children;
    expect(panes.length).toBe(2);
    expect(panes[0]).toHaveTextContent('Problema');
    expect(panes[1]).toHaveTextContent('Solucao');
  });

  it('applies danger tone styling to left pane', () => {
    render(
      <SplitScreen
        leftContent={<span>L</span>}
        rightContent={<span>R</span>}
      />,
    );

    const leftPane = screen.getByTestId('split-screen-left');
    expect(leftPane.className).toMatch(/1a0005/);
  });

  it('applies success tone styling to right pane', () => {
    render(
      <SplitScreen
        leftContent={<span>L</span>}
        rightContent={<span>R</span>}
      />,
    );

    const rightPane = screen.getByTestId('split-screen-right');
    expect(rightPane.className).toMatch(/000a03/);
  });

  it('passes custom className to container', () => {
    render(
      <SplitScreen
        leftContent={<span>L</span>}
        rightContent={<span>R</span>}
        className="custom-class"
      />,
    );

    const container = screen.getByTestId('split-screen');
    expect(container.className).toContain('custom-class');
  });
});
