import type { TableRow } from '@/components/ui/LiveTable';

export interface DecisionOption {
  id: string;
  label: string;
  score: {
    specKit: number;
    gsd: number;
    bmad: number;
  };
}

export interface DecisionQuestion {
  id: string;
  prompt: string;
  options: DecisionOption[];
}

export const topic10Data = {
  title: 'Qual Ferramenta Usar?',
  subtitle: 'Comparativo prático: Spec-Kit vs GSD vs BMAD',
  columns: ['Dimensão', 'Spec-Kit', 'GSD', 'BMAD'],
  rows: [
    {
      cells: [
        { text: 'Complexidade alvo' },
        { text: 'Baixa a média', highlight: true },
        { text: 'Média a alta', highlight: true },
        { text: 'Alta + coordenação multi-agente', highlight: true },
      ],
    },
    {
      cells: [
        { text: 'Curva inicial' },
        { text: 'Rápida' },
        { text: 'Moderada' },
        { text: 'Mais íngreme, maior retorno em escala' },
      ],
    },
    {
      cells: [
        { text: 'Força principal' },
        { text: 'Spec estruturada e clara' },
        { text: 'Workflow disciplinado de execução' },
        { text: 'Orquestração de papéis especializados' },
      ],
    },
    {
      cells: [
        { text: 'Melhor cenário' },
        { text: 'Produto com escopo claro' },
        { text: 'Entrega contínua com contexto vivo' },
        { text: 'Times/projetos com múltiplos fluxos simultâneos' },
      ],
    },
  ] as TableRow[],
  questions: [
    {
      id: 'team-size',
      prompt: 'Qual o tamanho/coordenação do time atual?',
      options: [
        {
          id: 'solo',
          label: 'Solo ou dupla, escopo bem definido',
          score: { specKit: 2, gsd: 1, bmad: 0 },
        },
        {
          id: 'small',
          label: 'Time pequeno com entregas contínuas',
          score: { specKit: 1, gsd: 2, bmad: 1 },
        },
        {
          id: 'multi',
          label: 'Múltiplos papéis e coordenação complexa',
          score: { specKit: 0, gsd: 1, bmad: 3 },
        },
      ],
    },
    {
      id: 'pain-point',
      prompt: 'Qual dor é mais urgente hoje?',
      options: [
        {
          id: 'ambiguity',
          label: 'Ambiguidade de requisitos',
          score: { specKit: 3, gsd: 1, bmad: 0 },
        },
        {
          id: 'flow',
          label: 'Inconsistência de execução / retrabalho',
          score: { specKit: 1, gsd: 3, bmad: 1 },
        },
        {
          id: 'scale',
          label: 'Escalar throughput sem perder qualidade',
          score: { specKit: 0, gsd: 1, bmad: 3 },
        },
      ],
    },
  ] as DecisionQuestion[],
  narratorNotes: [
    'Comece pela tabela para nivelar entendimento visual da audiência.',
    'Use o wizard como pós-palestra: cada resposta explicita trade-offs de decisão.',
    'Reforce que não existe ferramenta universal; existe ajuste ao contexto.',
  ],
};
