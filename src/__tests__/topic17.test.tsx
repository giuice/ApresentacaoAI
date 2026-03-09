import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Topic17 from '@/components/topics/Topic17';
import { topic17Data } from '@/data/topic17Data';
import { CyberProgressBar } from '@/components/layout/CyberProgressBar';

describe('topic17Data', () => {
  it('exporta estrutura completa para o topico 17', () => {
    expect(topic17Data.title).toBeTruthy();
    expect(topic17Data.subtitle).toBeTruthy();
    expect(topic17Data.sections.length).toBeGreaterThanOrEqual(6);
    expect(topic17Data.skillsCaseStudy).toBeTruthy();
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

  it('define skills case study com resultados e filosofia', () => {
    const cs = topic17Data.skillsCaseStudy;
    expect(cs.results.length).toBeGreaterThanOrEqual(2);
    expect(cs.philosophy.model.length).toBeGreaterThan(0);
    expect(cs.philosophy.scripts.length).toBeGreaterThan(0);
    expect(cs.concreteSkills.length).toBeGreaterThan(0);
    expect(cs.triggers.examples.length).toBeGreaterThan(0);
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

  it('renderiza a secao de skills case study', () => {
    render(<Topic17 />);

    expect(screen.getByText(topic17Data.skillsCaseStudy.title)).toBeInTheDocument();
    expect(screen.getByText(topic17Data.skillsCaseStudy.eyebrow)).toBeInTheDocument();
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
