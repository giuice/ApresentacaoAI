import type { WizardConfig } from '@/components/ui/DecisionWizard';
import type { TableColumn, TableRow } from '@/components/ui/LiveTable';
import {
  adoptionRows,
  adoptionSignals,
  comparisonColumns,
  comparisonRows,
} from '@/data/liveTableData';
import { decisionWizardConfig } from '@/data/decisionWizardData';

export { adoptionRows, adoptionSignals, comparisonColumns, comparisonRows } from '@/data/liveTableData';
export { decisionWizardConfig } from '@/data/decisionWizardData';

export interface Topic10Data {
  title: string;
  subtitle: string;
  tagline: string;
  narratorNotes: string[];
  liveTable: {
    columns: TableColumn[];
    rows: TableRow[];
    adoptionSignals: TableColumn[];
    adoptionRows: TableRow[];
  };
  decisionWizard: WizardConfig;
  adoptionFootnotes: Array<{
    tool: string;
    metric: string;
    detail: string;
  }>;
  labels: {
    liveTableEyebrow: string;
    wizardEyebrow: string;
    wizardHeading: string;
    wizardSupport: string;
    wizardTerminalTitle: string;
    adoptionFootnote: string;
    notesTerminalTitle: string;
    notesTerminalLead: string;
    notesLinePrefix: string;
    notesTerminalOutro: string;
  };
}

export const topic10Data: Topic10Data = {
  title: 'Ferramentas por escala: Spec-Kit → GSD → BMAD',
  subtitle: 'Comparativo prático: Spec-Kit vs GSD vs BMAD',
  tagline: 'Não é competição; é maturidade por complexidade e risco.',
  narratorNotes: [
    'Abra pela tabela: ela mostra que cada ferramenta vence um tipo diferente de inimigo operacional.',
    'Se a dor é ambiguidade, comece por Spec-Kit; se a dor é context rot, puxe GSD; se a dor é conflito de decisões, vá de BMAD.',
    'Use o wizard como guia de adoção pós-palestra: ele transforma comparação em próxima ação concreta.',
    'Feche reforçando a escada de maturidade: você não substitui tudo de uma vez, você sobe de nível quando o contexto exige.',
  ],
  liveTable: {
    columns: comparisonColumns,
    rows: comparisonRows,
    adoptionSignals,
    adoptionRows,
  },
  decisionWizard: decisionWizardConfig,
  adoptionFootnotes: [
    {
      tool: 'Spec-Kit',
      metric: '~74k stars',
      detail: '112 releases · 93 contributors',
    },
    {
      tool: 'GSD',
      metric: '~24.3k stars',
      detail: '32 releases · 50 contributors',
    },
    {
      tool: 'BMAD',
      metric: '~39.1k stars',
      detail: '24 releases · 119 contributors',
    },
  ],
  labels: {
    liveTableEyebrow: 'Tabela viva · escolha pelo tipo de problema',
    wizardEyebrow: 'Descubra qual ferramenta usar',
    wizardHeading: 'Guia rápido para sair da comparação e entrar em ação',
    wizardSupport:
      'Responda em sequência e converta a dor dominante — ambiguidade, context rot ou conflito de decisões — em uma recomendação prática.',
    wizardTerminalTitle: 'decision://topic10',
    adoptionFootnote: 'Sinais de adoção (rodapé discreto, não argumento principal)',
    notesTerminalTitle: 'narrator://topic10',
    notesTerminalLead: 'Condução sugerida para a comparação ao vivo.',
    notesLinePrefix: 'nota',
    notesTerminalOutro: 'Fecho: escolha pelo inimigo dominante, não pela hype do momento.',
  },
};
