import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import Topic10 from '@/components/topics/Topic10';
import { topic10Data } from '@/data/topic10Data';
import {
  adoptionSignals,
  adoptionRows,
  comparisonColumns,
  comparisonRows,
} from '@/data/liveTableData';
import { decisionWizardConfig } from '@/data/decisionWizardData';

describe('topic10Data', () => {
  it('exporta estrutura composta a partir das fontes de dados compartilhadas', () => {
    expect(topic10Data.title).toBeTruthy();
    expect(topic10Data.subtitle).toBeTruthy();
    expect(topic10Data.narratorNotes.length).toBeGreaterThan(0);
    expect(topic10Data.liveTable.columns).toBe(comparisonColumns);
    expect(topic10Data.liveTable.rows).toBe(comparisonRows);
    expect(topic10Data.liveTable.adoptionSignals).toBe(adoptionSignals);
    expect(topic10Data.liveTable.adoptionRows).toBe(adoptionRows);
    expect(topic10Data.decisionWizard).toBe(decisionWizardConfig);
  });
});

describe('Topic10', () => {
  it('renderiza titulo e subtitulo a partir de topic10Data', () => {
    render(<Topic10 />);

    expect(screen.getByText(topic10Data.title)).toBeInTheDocument();
    expect(screen.getByText(topic10Data.subtitle)).toBeInTheDocument();
  });

  it('renderiza a LiveTable como elemento principal com dados de comparacao', () => {
    render(<Topic10 />);

    const table = screen.getByTestId('live-table');

    expect(table).toBeInTheDocument();
    expect(within(table).getByText('Complexidade alvo')).toBeInTheDocument();
    expect(within(table).getByText('Spec-Kit')).toBeInTheDocument();
  });

  it('renderiza o DecisionWizard na pagina principal', () => {
    render(<Topic10 />);

    expect(screen.getByTestId('decision-wizard')).toBeInTheDocument();
    expect(screen.getByText(/qual é o escopo e risco/i)).toBeInTheDocument();
    expect(screen.getByText(topic10Data.labels.wizardEyebrow)).toBeInTheDocument();
  });

  it('alterna entre conteudo e notas via NarratorToggle', () => {
    render(<Topic10 />);

    expect(screen.queryByTestId('matrix-terminal')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
    expect(screen.getByTestId('matrix-terminal')).toBeInTheDocument();
    expect(screen.getByText(topic10Data.labels.notesTerminalTitle)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Conteudo' }));
    expect(screen.getByText(topic10Data.labels.liveTableEyebrow)).toBeInTheDocument();
  });

  it('mantem tagline e sinais de adocao no showcase principal', () => {
    render(<Topic10 />);

    expect(screen.getByText(topic10Data.tagline)).toBeInTheDocument();
    expect(screen.getByText(topic10Data.labels.adoptionFootnote)).toBeInTheDocument();
    expect(screen.getByText(/74k stars/i)).toBeInTheDocument();
    expect(screen.getByText(/24\.3k stars/i)).toBeInTheDocument();
    expect(screen.getByText(/39\.1k stars/i)).toBeInTheDocument();
  });
});
