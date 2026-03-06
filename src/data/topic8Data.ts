import type { TerminalLine } from '@/components/ui/MatrixTerminal';

export interface Topic8Metric {
  label: string;
  value: number;
  suffix: string;
  context: string;
}

export interface Topic8WorkflowStep {
  command: string;
  description: string;
}

export interface Topic8RecoveryCommand {
  command: string;
  description: string;
}

export interface Topic8NarratorContent {
  intro: string;
  outro: string;
  notes: string[];
}

export interface Topic8Labels {
  contentTerminalTitle: string;
  notesTerminalTitle: string;
  terminalSection: string;
  metricsSection: string;
  workflowTitle: string;
  recoveryTitle: string;
  brownfieldTitle: string;
}

export interface Topic8Data {
  title: string;
  subtitle: string;
  summary: string;
  heroMetric: Topic8Metric;
  secondaryMetric: Topic8Metric;
  terminalLines: TerminalLine[];
  workflowRail: Topic8WorkflowStep[];
  recoveryCommands: Topic8RecoveryCommand[];
  brownfieldNote: string;
  narrator: Topic8NarratorContent;
  labels: Topic8Labels;
}

export const topic8Data: Topic8Data = {
  title: 'GSD em Acao: Contexto Fresco, Qualidade Constante',
  subtitle: 'Terminal interativo com workflow real em 5 comandos',
  summary:
    'O GSD troca chat infinito por pipeline executavel: planos atomicos, execucao em contexto limpo e verificacao continua do inicio ao fim.',
  heroMetric: {
    label: 'Execucao guiada por plano',
    value: 52,
    suffix: ' tarefas',
    context: '68 testes validados com rastreabilidade de requisito ate commit atomico.',
  },
  secondaryMetric: {
    label: 'Escala com contexto fresco',
    value: 100,
    suffix: 'k linhas',
    context: '2 semanas em modo dev solo, mantendo qualidade da primeira a ultima entrega.',
  },
  terminalLines: [
    { type: 'comment', text: 'GSD runbook: cada fase com contexto fresco e checkpoint verificavel' },
    { type: 'prompt', text: '/gsd:new-project' },
    { type: 'output', text: 'research + requirements + roadmap criados em .planning/' },
    { type: 'prompt', text: '/gsd:discuss-phase 1' },
    { type: 'output', text: 'decisoes de escopo travadas antes do planejamento' },
    { type: 'prompt', text: '/gsd:plan-phase 1' },
    { type: 'output', text: '3 planos atomicos aprovados no plan-check loop' },
    { type: 'prompt', text: '/gsd:execute-phase 1' },
    { type: 'output', text: 'wave 1 em paralelo + wave 2 sequencial para dependencias' },
    { type: 'output', text: 'git log: 12 commits atomicos (1 tarefa = 1 commit)' },
    { type: 'prompt', text: '/gsd:verify-work 1' },
    { type: 'output', text: 'UAT guiado: 68 testes verdes, sem regressao funcional' },
    { type: 'comment', text: 'orquestrador em 30-40% de contexto; executores com 200k tokens limpos' },
  ],
  workflowRail: [
    {
      command: '/gsd:new-project',
      description: 'Inicia discovery com pesquisa, requisitos e roadmap versionado.',
    },
    {
      command: '/gsd:discuss-phase 1',
      description: 'Fecha decisoes criticas e reduz drift antes de planejar.',
    },
    {
      command: '/gsd:plan-phase 1',
      description: 'Gera 2-3 planos pequenos e valida cobertura contra os requisitos.',
    },
    {
      command: '/gsd:execute-phase 1',
      description: 'Executa em waves com contexto fresco e commits atomicos por tarefa.',
    },
    {
      command: '/gsd:verify-work 1',
      description: 'Conduz UAT e abre correcoes automaticamente quando algo falha.',
    },
  ],
  recoveryCommands: [
    {
      command: '/gsd:progress',
      description: 'Mostra estado atual e proximo passo sem perder o fio da execucao.',
    },
    {
      command: '/gsd:debug "descricao"',
      description: 'Aplica debug sistematico com checkpoints persistentes.',
    },
    {
      command: '/gsd:quick',
      description: 'Faz ajuste pontual mantendo garantias de verify e commits atomicos.',
    },
  ],
  brownfieldNote:
    'Em brownfield, inicie com /gsd:map-codebase para mapear stack, arquitetura, convencoes e concerns antes de abrir o /gsd:new-project.',
  narrator: {
    intro: 'Notas do narrador — como explicar o GSD em acao',
    outro: 'Feche conectando com BMAD: de fluxo solo para time de agentes especializados.',
    notes: [
      'Reforce que o ganho central nao e velocidade bruta, e previsibilidade com qualidade constante.',
      'Mostre que o plano funciona como prompt executavel: pequeno, verificavel e rastreavel.',
      'Explique as waves: paralelo para independencias, sequencial para dependencias.',
      'Use a metrica de 52 tarefas/68 testes para provar controle operacional, nao hype.',
      'Puxe a ponte para BMAD quando surgir necessidade de multiplos papeis especializados.',
    ],
  },
  labels: {
    contentTerminalTitle: 'gsd-session.log',
    notesTerminalTitle: 'topic8-narrator-notes.md',
    terminalSection: 'Simulacao de terminal GSD',
    metricsSection: 'Metricas e trilha de workflow',
    workflowTitle: 'Workflow Rail',
    recoveryTitle: 'Comandos de Recuperacao',
    brownfieldTitle: 'Brownfield Bootstrap',
  },
};
