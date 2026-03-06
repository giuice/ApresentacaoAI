import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Topic9 from '@/components/topics/Topic9';
import { topic9Data } from '@/data/topic9Data';

describe('topic9Data', () => {
  it('exporta estrutura completa para o topico 9', () => {
    expect(topic9Data.title).toBeTruthy();
    expect(topic9Data.subtitle).toBeTruthy();
    expect(topic9Data.phases).toHaveLength(4);
    expect(topic9Data.agents).toHaveLength(9);
    expect(topic9Data.conflictExample.withoutAdr.decisions.length).toBeGreaterThan(0);
    expect(topic9Data.conflictExample.withAdr.decisions.length).toBeGreaterThan(0);
    expect(topic9Data.metricRedHat.value).toBe(41);
    expect(topic9Data.metricMcKinsey.min).toBe(20);
    expect(topic9Data.metricMcKinsey.max).toBe(45);
    expect(topic9Data.narratorNotes.length).toBeGreaterThan(0);
  });
});

describe('Topic9', () => {
  it('renderiza titulo e subtitulo a partir da fonte de dados', () => {
    render(<Topic9 />);

    expect(screen.getByText(topic9Data.title)).toBeInTheDocument();
    expect(screen.getByText(topic9Data.subtitle)).toBeInTheDocument();
  });

  it('renderiza os 4 blocos da esteira de fases', () => {
    render(<Topic9 />);

    topic9Data.phases.forEach((phase) => {
      expect(screen.getByText(phase.name)).toBeInTheDocument();
    });
  });

  it('renderiza pelo menos 7 agentes no squad board', () => {
    render(<Topic9 />);

    const visibleAgentCount = topic9Data.agents.filter(
      (agent) => screen.queryAllByText(agent.name).length > 0,
    ).length;

    expect(visibleAgentCount).toBeGreaterThanOrEqual(7);
  });

  it('alterna entre conteudo e notas com MatrixTerminal', () => {
    render(<Topic9 />);

    expect(screen.queryByTestId('matrix-terminal')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
    expect(screen.getByTestId('matrix-terminal')).toBeInTheDocument();
    expect(screen.getByText(topic9Data.labels.notesTerminalTitle)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Conteudo' }));
    expect(screen.getByText(topic9Data.labels.phaseSectionTitle)).toBeInTheDocument();
  });
});
