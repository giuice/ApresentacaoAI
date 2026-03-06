export interface TopicMeta {
  index: number;
  title: string;
}

export interface TopicPlaceholderContent {
  title: string;
  subtitle: string;
  description: string;
}

const TOTAL_TOPICS = 16;

const topicTitlesByIndex: Partial<Record<number, string>> = {
  1: 'Hook — O que é Vibe Coding?',
  2: 'A Ilusão de Produtividade — Por que falha?',
  3: 'Context Rot — O mecanismo técnico por trás da falha',
  4: 'De Prompt Engineering para Context Engineering',
  5: 'Spec-Driven Development',
  6: 'Overview — A Escala de Complexidade',
  7: 'Spec-Kit — A Constituição do Projeto',
  8: 'GSD (Get Shit Done) — Contexto Fresco, Qualidade Constante',
  9: 'BMAD — Framework Ágil para Orquestração de Agentes',
  10: 'Comparativo Visual (Spec-Kit vs GSD vs BMAD)',
  11: 'O Dev virou PM',
  12: 'O Paradoxo do Júnior',
  13: 'Skills que Agora Importam',
  14: 'ROI e Linha do Tempo',
  15: 'Cases Reais — A Prova em Escala',
  16: 'Call to Action',
};

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

const getTopicTitle = (topicIndex: number): string =>
  topicTitlesByIndex[topicIndex] ?? `Tópico ${topicIndex} — título pendente`;

export const getTopicPlaceholderContent = (topicIndex: number): TopicPlaceholderContent =>
  topicPlaceholderContentByIndex[topicIndex] ?? {
    title: `Tópico ${topicIndex} — título pendente`,
    subtitle: 'Conteúdo em consolidação',
    description: 'Conteúdo interativo em desenvolvimento',
  };

export const topics: TopicMeta[] = Array.from({ length: TOTAL_TOPICS }, (_, index) => {
  const topicIndex = index + 1;
  return {
    index: topicIndex,
    title: getTopicTitle(topicIndex),
  };
});
