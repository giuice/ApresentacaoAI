export interface Topic5SupportingItem {
  highlight: string;
  text: string;
}

export interface Topic5TalkingPoint {
  text: string;
}

export interface Topic5Data {
  title: string;
  subtitle: string;
  definition: string;
  metric: {
    value: number;
    suffix: string;
    context: string;
  };
  secondaryMetric: {
    value: number;
    suffix: string;
    context: string;
  };
  vibeCodingProblems: Topic5SupportingItem[];
  specDrivenGains: Topic5SupportingItem[];
  talkingPoints: Topic5TalkingPoint[];
  narratorNotes: string[];
}

export const topic5Data: Topic5Data = {
  title: 'O Blueprint Executavel: Quando a Spec Vira a Fonte da Verdade',
  subtitle: 'Spec-Driven Development',
  definition:
    'A spec nao e um documento descartavel — e a fonte da verdade que gera codigo, testes e documentacao. Manter software vira evoluir specs. Debugar vira corrigir specs.',
  metric: {
    value: 26.08,
    suffix: '%',
    context: 'aumento em tarefas completadas — field RCTs com 4.867 devs (Microsoft, Accenture, Fortune 100)',
  },
  secondaryMetric: {
    value: 55,
    suffix: '%',
    context: 'mais rapido em experimento controlado — 1h11 com Copilot vs. 2h41 sem (GitHub, 2022/2024)',
  },
  vibeCodingProblems: [
    {
      highlight: '-19%',
      text: 'produtividade real medida em devs experientes (METR RCT)',
    },
    {
      highlight: '24,7%',
      text: 'do codigo gerado por IA tem falhas de seguranca',
    },
    {
      highlight: '12h',
      text: 'para documentacao tradicional (PRD + design docs + specs + testes)',
    },
  ],
  specDrivenGains: [
    {
      highlight: '+26,08%',
      text: 'tarefas completadas com assistente de IA estruturado',
    },
    {
      highlight: '15 min',
      text: 'para spec completa + plano + task list com SDD',
    },
    {
      highlight: '+84%',
      text: 'builds bem-sucedidos em ambiente enterprise (Accenture RCT)',
    },
  ],
  talkingPoints: [
    {
      text: 'Durante 60 anos, codigo foi a fonte da verdade. O SDD inverte isso: a spec e o artefato primario, o codigo e uma expressao dela.',
    },
    {
      text: 'Com Spec-Kit: specify, plan, tasks — em 15 minutos voce tem spec completa, plano de implementacao e task list versionados numa branch.',
    },
    {
      text: 'O trade-off e honesto: especificar bem da trabalho. Mas quem construiu sem planta vai gastar muito mais refazendo comodos.',
    },
    {
      text: 'SDD e o paradigma. Spec-Kit, GSD e BMAD sao as ferramentas que o operacionalizam em diferentes escalas.',
    },
  ],
  narratorNotes: [
    'O Topico 4 mostrou a escada de maturidade. Agora respondemos a pergunta: como se faz Context Engineering na pratica? A resposta e Spec-Driven Development.',
    'Durante 60 anos, codigo foi rei. Specs eram scaffolding descartavel — PRDs, design docs existiam para guiar o dev, que depois os descartava e programava. Codigo era a fonte da verdade.',
    'No SDD, a hierarquia se inverte: a spec e a fonte da verdade que gera codigo, testes e documentacao. Manter software vira evoluir specs. Debugar vira corrigir specs.',
    'Com Spec-Kit: specify, plan, tasks — em 15 minutos voce tem spec completa, plano de implementacao e task list versionados numa branch. Compare com 12 horas do workflow tradicional.',
    'O trade-off e honesto: especificar bem da trabalho. E como gastar tempo fazendo a planta da casa antes de construir. Parece perda de tempo se comparado com comecar a erguer paredes no dia 1. Mas quem construiu sem planta vai gastar muito mais refazendo comodos.',
    'SDD e o paradigma. Spec-Kit, GSD e BMAD sao as ferramentas que o operacionalizam em diferentes escalas — vamos ver cada uma a seguir.',
  ],
};
