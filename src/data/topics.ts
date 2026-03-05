export interface TopicMeta {
  index: number;
  title: string;
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
};

const getTopicTitle = (topicIndex: number): string =>
  topicTitlesByIndex[topicIndex] ?? `Tópico ${topicIndex} — título pendente`;

export const topics: TopicMeta[] = Array.from({ length: TOTAL_TOPICS }, (_, index) => {
  const topicIndex = index + 1;
  return {
    index: topicIndex,
    title: getTopicTitle(topicIndex),
  };
});
