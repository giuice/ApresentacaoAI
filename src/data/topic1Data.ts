export interface Topic1SupportingItem {
  highlight: string;
  text: string;
}

export interface Topic1TalkingPoint {
  text: string;
}

export interface Topic1Data {
  title: string;
  subtitle: string;
  definition: string;
  analogy: string;
  metric: {
    value: number;
    suffix: string;
    context: string;
  };
  supportingItems: Topic1SupportingItem[];
  talkingPoints: Topic1TalkingPoint[];
  narratorNotes: string[];
}

export const topic1Data: Topic1Data = {
  title: 'Vibe Coding: Todo mundo esta fazendo. Poucos sabem o risco.',
  subtitle: 'Hook — O que e Vibe Coding?',
  definition:
    'Descrever o que voce quer em linguagem natural e aceitar o codigo que a IA gera — sem revisar, sem entender.',
  analogy: 'Construir uma casa gritando instrucoes para operarios — sem planta, sem engenheiro, sem inspecao.',
  metric: {
    value: 88,
    suffix: '%',
    context: 'dos CTOs ja sofreram desastres de producao com codigo de IA nao verificado',
  },
  supportingItems: [
    {
      highlight: '84%',
      text: 'dos desenvolvedores ja usam ou planejam usar ferramentas de IA (2026)',
    },
    {
      highlight: 'Palavra do Ano',
      text: '"Vibe Coding" eleita pelo Collins Dictionary em 2025',
    },
    {
      highlight: '25%',
      text: 'das startups Y Combinator (Winter 2025): codebases 95% gerados por IA',
    },
  ],
  talkingPoints: [
    {
      text: 'Termo cunhado por Andrej Karpathy no inicio de 2025 — voce descreve, a IA gera, voce aceita sem entender.',
    },
    {
      text: 'Isso virou mainstream: 84% dos devs ja usam IA, Collins elegeu "vibe coding" como Palavra do Ano.',
    },
    {
      text: '88% dos CTOs reportam desastres em producao com codigo de IA nao verificado. Nao e teoria — e a realidade.',
    },
  ],
  narratorNotes: [
    'Vibe Coding e um termo cunhado por Andrej Karpathy no inicio de 2025. A ideia e simples: voce descreve o que quer, a IA gera o codigo, e voce aceita sem necessariamente entender o que foi gerado.',
    'E como construir uma casa gritando instrucoes para operarios — sem planta, sem engenheiro, sem inspecao.',
    'O problema? Isso virou mainstream. 84% dos devs ja usam ou planejam usar ferramentas de IA. O Collins Dictionary elegeu "vibe coding" como Palavra do Ano. Um quarto das startups da Y Combinator tem codebases quase inteiramente gerados por IA.',
    'E o resultado? 88% dos CTOs reportam que ja tiveram problemas serios em producao com codigo de IA nao verificado. Nao e teoria — e a realidade das empresas hoje.',
    'Deixe a audiencia sentir a urgencia antes de avancar. Esse e o gancho que prepara tudo que vem depois.',
  ],
};
