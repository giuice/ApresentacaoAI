export interface Topic1SupportingItem {
  text: string;
}

export interface Topic1Data {
  title: string;
  subtitle: string;
  metric: {
    value: number;
    suffix: string;
    context: string;
  };
  supportingItems: Topic1SupportingItem[];
}

export const topic1Data: Topic1Data = {
  title: 'Vibe Coding: Todo mundo esta fazendo. Poucos sabem o risco.',
  subtitle: 'Construir uma casa gritando instrucoes sem planta',
  metric: {
    value: 88,
    suffix: '%',
    context: 'dos CTOs ja sofreram desastres de producao com codigo de IA nao verificado',
  },
  supportingItems: [
    { text: '84% dos desenvolvedores ja usam ou planejam usar ferramentas de IA (2026)' },
    { text: '"Vibe Coding" eleita Palavra do Ano 2025 pelo Collins Dictionary' },
    { text: '25% das startups Y Combinator (Winter 2025): codebases 95% gerados por IA' },
  ],
};
