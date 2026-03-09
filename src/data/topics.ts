export type TopicBlockKey =
  | 'problem'
  | 'evolution'
  | 'tools'
  | 'new-role'
  | 'impact'
  | 'bonus';

export interface TopicMeta {
  index: number;
  title: string;
  shortTitle: string;
  block: TopicBlockKey;
  isBonus?: boolean;
}

export interface TopicBlockMeta {
  key: TopicBlockKey;
  label: string;
  rangeLabel: string;
  description: string;
  isBonus?: boolean;
}

export interface TopicPlaceholderContent {
  title: string;
  subtitle: string;
  description: string;
}

export const topicBlocks: TopicBlockMeta[] = [
  {
    key: 'problem',
    label: 'Bloco 1 — O Problema',
    rangeLabel: 'Tópicos 1-3',
    description: 'Vibe Coding, a ilusão de velocidade e o colapso do contexto.',
  },
  {
    key: 'evolution',
    label: 'Bloco 2 — A Evolução',
    rangeLabel: 'Tópicos 4-5',
    description: 'Da conversa solta para engenharia de contexto e specs executáveis.',
  },
  {
    key: 'tools',
    label: 'Bloco 3 — As Ferramentas',
    rangeLabel: 'Tópicos 6-10',
    description: 'Spec-Kit, GSD e BMAD posicionados por escala, fluxo e governança.',
  },
  {
    key: 'new-role',
    label: 'Bloco 4 — O Novo Papel',
    rangeLabel: 'Tópicos 11-13',
    description: 'O desenvolvedor vira orquestrador, PM de contexto e revisor crítico.',
  },
  {
    key: 'impact',
    label: 'Bloco 5 — Impacto & CTA',
    rangeLabel: 'Tópicos 14-16',
    description: 'ROI, sinais de mercado e o fechamento principal da narrativa.',
  },
  {
    key: 'bonus',
    label: 'Bônus Operacional',
    rangeLabel: 'Tópico 17',
    description: 'Copilot além do autocomplete: threads, plan, comandos e fleet.',
    isBonus: true,
  },
];

export const topics: TopicMeta[] = [
  {
    index: 1,
    title: 'Hook — O que é Vibe Coding?',
    shortTitle: 'Hook',
    block: 'problem',
  },
  {
    index: 2,
    title: 'A Ilusão de Produtividade — Por que falha?',
    shortTitle: 'A Ilusão de Produtividade',
    block: 'problem',
  },
  {
    index: 3,
    title: 'Context Rot — O mecanismo técnico por trás da falha',
    shortTitle: 'Context Rot',
    block: 'problem',
  },
  {
    index: 4,
    title: 'De Prompt Engineering para Context Engineering',
    shortTitle: 'Context Engineering',
    block: 'evolution',
  },
  {
    index: 5,
    title: 'Spec-Driven Development',
    shortTitle: 'Spec-Driven Development',
    block: 'evolution',
  },
  {
    index: 6,
    title: 'Overview — A Escala de Complexidade',
    shortTitle: 'A Escala de Complexidade',
    block: 'tools',
  },
  {
    index: 7,
    title: 'Spec-Kit — A Constituição do Projeto',
    shortTitle: 'Spec-Kit',
    block: 'tools',
  },
  {
    index: 8,
    title: 'GSD (Get Shit Done) — Contexto Fresco, Qualidade Constante',
    shortTitle: 'GSD',
    block: 'tools',
  },
  {
    index: 9,
    title: 'BMAD — Framework Ágil para Orquestração de Agentes',
    shortTitle: 'BMAD',
    block: 'tools',
  },
  {
    index: 10,
    title: 'Comparativo Visual (Spec-Kit vs GSD vs BMAD)',
    shortTitle: 'Comparativo Visual',
    block: 'tools',
  },
  {
    index: 11,
    title: 'O Dev virou PM',
    shortTitle: 'O Dev virou PM',
    block: 'new-role',
  },
  {
    index: 12,
    title: 'O Paradoxo do Júnior',
    shortTitle: 'O Paradoxo do Júnior',
    block: 'new-role',
  },
  {
    index: 13,
    title: 'Skills que Agora Importam',
    shortTitle: 'Skills que Importam',
    block: 'new-role',
  },
  {
    index: 14,
    title: 'ROI e Linha do Tempo',
    shortTitle: 'ROI e Linha do Tempo',
    block: 'impact',
  },
  {
    index: 15,
    title: 'Cases Reais — A Prova em Escala',
    shortTitle: 'Cases Reais',
    block: 'impact',
  },
  {
    index: 16,
    title: 'Call to Action',
    shortTitle: 'Call to Action',
    block: 'impact',
  },
  {
    index: 17,
    title: 'Copilot além do autocomplete: como operar comandos, threads e multiagentes com controle',
    shortTitle: 'Copilot Operacional',
    block: 'bonus',
    isBonus: true,
  },
];

export const TOTAL_TOPICS = topics.length;

const topicPlaceholderContentByIndex: Partial<Record<number, TopicPlaceholderContent>> = {
  1: {
    title: 'Tópico 1 — O Problema: 88% de Falha',
    subtitle: 'Vibe Coding e seus riscos em produção',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  2: {
    title: 'Tópico 2 — Por que Falha?',
    subtitle: 'A armadilha do chat infinito',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  3: {
    title: 'Tópico 3 — Context Rot',
    subtitle: 'A degradação progressiva do contexto',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  4: {
    title: 'Tópico 4 — Context Engineering',
    subtitle: 'De Prompt Engineering para Context Engineering',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  5: {
    title: 'Tópico 5 — Spec-Driven Development',
    subtitle: 'A spec como blueprint executável',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  6: {
    title: 'Tópico 6 — A Escala de Complexidade',
    subtitle: 'Spec-Kit → GSD → BMAD',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  7: {
    title: 'Tópico 7 — Spec-Kit',
    subtitle: 'A Constituição do Projeto',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  8: {
    title: 'Tópico 8 — GSD',
    subtitle: 'Contexto Fresco, Qualidade Constante',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  9: {
    title: 'Tópico 9 — BMAD',
    subtitle: 'Simulando um Time Completo',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  10: {
    title: 'Tópico 10 — Comparativo Visual',
    subtitle: 'Qual Ferramenta Usar?',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  11: {
    title: 'Tópico 11 — O Dev virou PM',
    subtitle: 'O Novo Desenvolvedor',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  12: {
    title: 'Tópico 12 — O Paradoxo do Júnior',
    subtitle: 'A Escada Quebrada',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  13: {
    title: 'Tópico 13 — Skills que Agora Importam',
    subtitle: 'Context Design, Validação, Orquestração',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  14: {
    title: 'Tópico 14 — ROI e Linha do Tempo',
    subtitle: 'Investimento, Break-even, Retorno',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  15: {
    title: 'Tópico 15 — Cases Reais',
    subtitle: 'Google, Airbnb, Ralph Loop',
    description: 'Conteúdo interativo em desenvolvimento',
  },
  16: {
    title: 'Tópico 16 — Call to Action',
    subtitle: 'Pare de conversar com a IA. Comece a especificar.',
    description: 'Conteúdo interativo em desenvolvimento',
  },
};

export const getTopicPlaceholderContent = (topicIndex: number): TopicPlaceholderContent =>
  topicPlaceholderContentByIndex[topicIndex] ?? {
    title: `Tópico ${topicIndex} — título pendente`,
    subtitle: 'Conteúdo em consolidação',
    description: 'Conteúdo interativo em desenvolvimento',
  };
