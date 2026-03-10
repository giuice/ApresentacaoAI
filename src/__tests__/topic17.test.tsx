import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Topic17 from '@/components/topics/Topic17';
import { topic17Data } from '@/data/topic17Data';
import { CyberProgressBar } from '@/components/layout/CyberProgressBar';

describe('topic17Data', () => {
  it('exporta estrutura completa para o topico 17', () => {
    expect(topic17Data.title).toBeTruthy();
    expect(topic17Data.subtitle).toBeTruthy();
    expect(topic17Data.sections.length).toBe(6);
    expect('skillsCaseStudy' in topic17Data).toBe(false);
    expect(topic17Data.closing).toBeTruthy();
    expect(topic17Data.narratorNotes.length).toBeGreaterThan(0);
  });

  it('define sections com eyebrow e title', () => {
    topic17Data.sections.forEach((section) => {
      expect(section.id).toBeTruthy();
      expect(section.eyebrow).toBeTruthy();
      expect(section.title).toBeTruthy();
    });
  });

  it('define os 6 ids esperados na ordem correta', () => {
    expect(topic17Data.sections.map((section) => section.id)).toEqual([
      'commands',
      'skills',
      'mcp',
      'hooks',
      'plugins',
      'openai-case',
    ]);
  });
});

describe('Topic17', () => {
  it('renderiza titulo e subtitulo a partir da fonte de dados', () => {
    render(<Topic17 />);

    expect(screen.getByText(topic17Data.title)).toBeInTheDocument();
    expect(screen.getByText(topic17Data.subtitle)).toBeInTheDocument();
  });

  it('renderiza as secoes narrativas por eyebrow', () => {
    render(<Topic17 />);

    topic17Data.sections.forEach((section) => {
      expect(screen.getByText(section.eyebrow)).toBeInTheDocument();
    });
  });

  it('renderiza a secao final do caso OpenAI como NarrativeSection', () => {
    render(<Topic17 />);

    const openAiCase = topic17Data.sections.find((section) => section.id === 'openai-case');

    expect(openAiCase).toBeTruthy();
    expect(screen.getByText(openAiCase!.title)).toBeInTheDocument();
    expect(screen.getByText(openAiCase!.eyebrow)).toBeInTheDocument();
  });

  it('renderiza o closing com headline e formula', () => {
    render(<Topic17 />);

    expect(screen.getByText(topic17Data.closing.headline)).toBeInTheDocument();
    expect(screen.getByText(topic17Data.closing.formula)).toBeInTheDocument();
  });

  it('alterna para notas e exibe MatrixTerminal', () => {
    render(<Topic17 />);

    fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
    expect(screen.getByTestId('matrix-terminal')).toBeInTheDocument();
    expect(screen.getByText(topic17Data.labels.notesTerminalTitle)).toBeInTheDocument();
    expect(screen.queryByText(topic17Data.sections[0].eyebrow)).not.toBeInTheDocument();
  });

  it('volta para conteudo a partir das notas', () => {
    render(<Topic17 />);

    fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
    fireEvent.click(screen.getByRole('button', { name: 'Conteudo' }));

    expect(screen.getByText(topic17Data.sections[0].eyebrow)).toBeInTheDocument();
    expect(screen.queryByTestId('matrix-terminal')).not.toBeInTheDocument();
  });
});

describe('CyberProgressBar — Topico 17', () => {
  it('mantem aria-valuenow em 5 no bonus operacional', () => {
    render(<CyberProgressBar currentTopicIndex={17} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '5');
    expect(screen.getByLabelText('Impacto + Bonus (ativo)')).toBeInTheDocument();
  });
});
