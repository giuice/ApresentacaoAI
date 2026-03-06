export interface Topic2SupportingItem {
  highlight: string;
  text: string;
}

export interface Topic2TalkingPoint {
  text: string;
}

export interface Topic2Data {
  title: string;
  subtitle: string;
  definition: string;
  metric: {
    value: number;
    suffix: string;
    context: string;
  };
  supportingItems: Topic2SupportingItem[];
  talkingPoints: Topic2TalkingPoint[];
  narratorNotes: string[];
}

export const topic2Data: Topic2Data = {
  title: 'A Ilusao de Produtividade: A Escada Quebrada',
  subtitle: 'O Estudo METR — Percepcao vs. Realidade',
  definition:
    'Devs achavam que seriam 24% mais rapidos com IA. Resultado real: 19% mais lentos. O gap entre percepcao e realidade e de 43 pontos percentuais.',
  metric: {
    value: 43,
    suffix: 'pts',
    context: 'gap entre percepcao (+20%) e realidade (-19%) — Estudo METR, julho 2025 (RCT)',
  },
  supportingItems: [
    {
      highlight: '+24%',
      text: 'expectativa dos devs antes do estudo — achavam que seriam mais rapidos',
    },
    {
      highlight: '+20%',
      text: 'percepcao pos-estudo — ainda acreditavam ter sido mais rapidos',
    },
    {
      highlight: '-19%',
      text: 'resultado real medido — na verdade ficaram mais lentos com IA',
    },
    {
      highlight: '24,7%',
      text: 'do codigo gerado por IA tem falhas de seguranca (2026)',
    },
  ],
  talkingPoints: [
    {
      text: 'O estudo METR (RCT, 16 devs, 246 tarefas) e o dado mais robusto que temos: a IA torna o trabalho mais facil cognitivamente, mas nao necessariamente mais rapido.',
    },
    {
      text: '9% do tempo gasto revisando e corrigindo codigo gerado. A IA gera mais "idle time" — dev fica distraido enquanto espera.',
    },
    {
      text: 'O chat longo e um antipadrao: quanto mais conversa, pior o resultado. Sem disciplina de contexto, mais ferramenta nao resolve.',
    },
  ],
  narratorNotes: [
    'Este e talvez o dado mais importante da apresentacao. A METR — uma organizacao sem fins lucrativos de pesquisa em IA — fez algo que quase ninguem fez: um estudo randomizado e controlado com desenvolvedores reais, em repositorios reais, com ferramentas de ponta.',
    'O resultado? Os devs ficaram 19% mais lentos usando IA. Mas — e aqui esta o ponto crucial — eles sairam do estudo achando que tinham sido 20% mais rapidos. A diferenca entre o que achavam e o que aconteceu e de 43 pontos percentuais.',
    'Por que isso acontece? Porque a IA torna o trabalho mais facil cognitivamente, mas nao necessariamente mais rapido. Voce gasta tempo revisando, corrigindo, esperando. Funcoes duplicadas aparecem. O contexto se perde.',
    'Uma nota importante: o estudo METR usou ferramentas de inicio de 2025. As ferramentas evoluiram. Mas o ponto central permanece: sem estrutura e sem disciplina de contexto, mais ferramenta nao resolve — pode ate piora-lo.',
    'Enfatize a palavra "disciplina de contexto" — ela prepara o terreno para o Topico 3 (Context Rot).',
  ],
};
