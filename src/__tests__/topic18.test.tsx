import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Topic18 from '@/components/topics/Topic18';
import { topic18Data } from '@/data/topic18Data';

describe('topic18Data', () => {
  it('exporta estrutura completa para o topico 18', () => {
    expect(topic18Data.title).toBeTruthy();
    expect(topic18Data.subtitle).toBeTruthy();
    expect(topic18Data.hero.lead.length).toBeGreaterThan(0);
    expect(topic18Data.timeline.length).toBe(6);
    expect(topic18Data.workflow.steps.length).toBe(10);
    expect(topic18Data.toolsModels.entries.length).toBeGreaterThan(0);
    expect(topic18Data.prompts.items.length).toBeGreaterThan(0);
    expect(topic18Data.lessons.items.length).toBe(5);
    expect(topic18Data.limitations.items.length).toBeGreaterThan(0);
    expect(topic18Data.metric.value).toBeTruthy();
    expect(topic18Data.closing).toBeTruthy();
    expect(topic18Data.narratorNotes.length).toBeGreaterThan(0);
  });

  it('define timeline com datas e eventos', () => {
    topic18Data.timeline.forEach((day) => {
      expect(day.date).toBeTruthy();
      expect(day.label).toBeTruthy();
      expect(day.events.length).toBeGreaterThan(0);
    });
  });

  it('define workflow steps na ordem correta', () => {
    const orders = topic18Data.workflow.steps.map((s) => s.order);
    expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('define prompts literais com contexto e texto', () => {
    topic18Data.prompts.items.forEach((prompt) => {
      expect(prompt.context).toBeTruthy();
      expect(prompt.text).toBeTruthy();
    });
  });

  it('define labels de evidencia', () => {
    expect(topic18Data.labels.evidenceBadgeCommit).toBeTruthy();
    expect(topic18Data.labels.evidenceBadgeStory).toBeTruthy();
    expect(topic18Data.labels.evidenceBadgeSession).toBeTruthy();
  });
});

describe('Topic18', () => {
  it('renderiza titulo e subtitulo a partir da fonte de dados', () => {
    render(<Topic18 />);

    expect(screen.getByText(topic18Data.title)).toBeInTheDocument();
    expect(screen.getByText(topic18Data.subtitle)).toBeInTheDocument();
  });

  it('renderiza a secao de abertura', () => {
    render(<Topic18 />);

    expect(screen.getByText(topic18Data.hero.lead[0])).toBeInTheDocument();
  });

  it('renderiza as datas da timeline', () => {
    render(<Topic18 />);

    topic18Data.timeline.forEach((day) => {
      expect(screen.getByText(day.date)).toBeInTheDocument();
    });
  });

  it('renderiza os prompts literais', () => {
    render(<Topic18 />);

    topic18Data.prompts.items.forEach((prompt) => {
      expect(screen.getByText(prompt.text)).toBeInTheDocument();
    });
  });

  it('renderiza a metrica de destaque', () => {
    render(<Topic18 />);

    expect(screen.getByText(topic18Data.metric.value)).toBeInTheDocument();
    expect(screen.getByText(topic18Data.metric.label)).toBeInTheDocument();
  });

  it('renderiza os badges de evidencia', () => {
    render(<Topic18 />);

    expect(screen.getByText(topic18Data.labels.evidenceBadgeCommit)).toBeInTheDocument();
    expect(screen.getByText(topic18Data.labels.evidenceBadgeStory)).toBeInTheDocument();
    expect(screen.getByText(topic18Data.labels.evidenceBadgeSession)).toBeInTheDocument();
  });

  it('renderiza o closing com headline e quote', () => {
    render(<Topic18 />);

    expect(screen.getByText(topic18Data.closing.headline)).toBeInTheDocument();
    expect(screen.getByText(topic18Data.closing.quote)).toBeInTheDocument();
  });

  it('alterna para notas e exibe MatrixTerminal', () => {
    render(<Topic18 />);

    fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
    expect(screen.getByTestId('matrix-terminal')).toBeInTheDocument();
    expect(screen.getByText(topic18Data.labels.notesTerminalTitle)).toBeInTheDocument();
    expect(screen.queryByText(topic18Data.hero.lead[0])).not.toBeInTheDocument();
  });

  it('volta para conteudo a partir das notas', () => {
    render(<Topic18 />);

    fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
    fireEvent.click(screen.getByRole('button', { name: 'Conteudo' }));

    expect(screen.getByText(topic18Data.hero.lead[0])).toBeInTheDocument();
    expect(screen.queryByTestId('matrix-terminal')).not.toBeInTheDocument();
  });
});
