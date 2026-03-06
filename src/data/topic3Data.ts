export interface Topic3SupportingItem {
  highlight: string;
  text: string;
}

export interface Topic3TalkingPoint {
  text: string;
}

export interface Topic3Data {
  title: string;
  subtitle: string;
  definition: string;
  analogy: string;
  metric: {
    value: number;
    suffix: string;
    context: string;
  };
  supportingItems: Topic3SupportingItem[];
  talkingPoints: Topic3TalkingPoint[];
  narratorNotes: string[];
}

export const topic3Data: Topic3Data = {
  title: 'Context Rot: Por que a IA piora quanto mais voce conversa',
  subtitle: 'O mecanismo tecnico por tras da falha',
  definition:
    'Context Rot e a degradacao progressiva da qualidade da IA conforme a janela de contexto e preenchida. Quanto mais longa a conversa, mais a capacidade de atencao se dilui.',
  analogy: 'IA com Alzheimer progressivo — quanto mais longa a conversa, mais ela esquece.',
  metric: {
    value: 99,
    suffix: '%',
    context: 'gap entre janela de contexto anunciada e janela efetiva real (arXiv, Paulsen 2025)',
  },
  supportingItems: [
    {
      highlight: '0-30%',
      text: 'do contexto: qualidade maxima, raciocinio completo e consistente',
    },
    {
      highlight: '30-50%',
      text: 'do contexto: eficiente, mas pequenos erros comecam a aparecer',
    },
    {
      highlight: '50-70%',
      text: 'do contexto: respostas apressadas, atalhos, perde detalhes importantes',
    },
    {
      highlight: '70%+',
      text: 'do contexto: alucinacoes, esquece requisitos, deriva arquitetural severa',
    },
  ],
  talkingPoints: [
    {
      text: 'A Chroma Research testou 18 LLMs e mostrou que a degradacao e real, mensuravel e acontece de formas surpreendentes e nao-uniformes.',
    },
    {
      text: 'A Adobe demonstrou que tarefas multi-hop (conectar dois fatos) sao as primeiras a falhar — exatamente o tipo de raciocinio que precisamos em arquitetura.',
    },
    {
      text: 'A propria Anthropic diz: contexto deve ser tratado como recurso finito. Cada token novo esgota o orcamento de atencao do modelo.',
    },
    {
      text: 'Implicacao pratica: chat longo = contexto poluido. Mais tokens nao e melhor resultado. Contexto curado > contexto grande.',
    },
  ],
  narratorNotes: [
    'Esse topico e a justificativa tecnica de tudo que vem depois. Se a audiencia sair daqui com uma coisa so, que seja isso: a janela de contexto da IA nao e infinita, e ela degrada de forma nao-linear.',
    'O que e Context Rot? Pense assim: toda vez que voce manda uma mensagem para a IA, ela precisa processar tudo o que veio antes — o historico inteiro. Conforme esse historico cresce, a capacidade de atencao da IA se dilui. E literalmente um Alzheimer progressivo.',
    'A pesquisa da Chroma testou 18 modelos de linguagem e mostrou que a degradacao e real, e mensuravel, e acontece de formas surpreendentes.',
    'E aqui esta o dado mais impactante: um paper de setembro de 2025 mostrou que a maioria dos modelos apresenta degradacao severa ja com 1.000 tokens de contexto. E todos ficaram muito aquem das janelas maximas que anunciam no marketing — em ate 99%.',
    'A propria Anthropic, criadora do Claude, diz que contexto deve ser tratado como recurso finito. Cada token novo esgota o orcamento de atencao do modelo.',
    'A implicacao pratica e direta: chat longo e um antipadrao. Mais contexto nao e melhor contexto. E e exatamente isso que as ferramentas que vamos ver a seguir resolvem.',
  ],
};
