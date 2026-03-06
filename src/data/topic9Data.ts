export interface Topic9Phase {
  name: string;
  description: string;
  outputs: string[];
  agentName: string;
}

export interface Topic9Agent {
  name: string;
  role: string;
  whenEnters: string;
  delivers: string[];
}

export interface Topic9ConflictScenario {
  title: string;
  decisions: string[];
  outcome: string;
}

export interface Topic9ConflictExample {
  withoutAdr: Topic9ConflictScenario;
  withAdr: Topic9ConflictScenario;
}

export interface Topic9MetricRedHat {
  label: string;
  value: number;
  suffix: string;
  context: string;
  source: string;
}

export interface Topic9MetricMcKinsey {
  label: string;
  min: number;
  max: number;
  suffix: string;
  context: string;
  source: string;
  rangeLabel: string;
}

export interface Topic9Labels {
  phaseSectionTitle: string;
  phaseSectionSubtitle: string;
  phaseOutputsLabel: string;
  phaseAgentLabel: string;
  agentsSectionTitle: string;
  agentsSectionSubtitle: string;
  agentRoleLabel: string;
  agentWhenLabel: string;
  agentDeliversLabel: string;
  conflictSectionTitle: string;
  conflictSectionSubtitle: string;
  impactSectionTitle: string;
  impactSectionSubtitle: string;
  notesTerminalTitle: string;
  notesTerminalLead: string;
  notesTerminalOutro: string;
  notesLinePrefix: string;
}

export interface Topic9Data {
  title: string;
  subtitle: string;
  anchorStatement: string;
  phases: Topic9Phase[];
  agents: Topic9Agent[];
  conflictExample: Topic9ConflictExample;
  metricRedHat: Topic9MetricRedHat;
  metricMcKinsey: Topic9MetricMcKinsey;
  narratorNotes: string[];
  labels: Topic9Labels;
}

export const topic9Data: Topic9Data = {
  title: 'BMAD — Quando o Problema e Coordenacao, nao Codigo',
  subtitle: 'Framework agil para orquestrar um squad virtual com agentes IA especializados',
  anchorStatement: 'Documentos sao fonte da verdade. Chat e transitorio.',
  phases: [
    {
      name: 'Analysis',
      description: 'Explora incerteza e transforma ambiguidade em contexto utilizavel.',
      outputs: ['Research report', 'Product brief'],
      agentName: 'Analyst (Mary)',
    },
    {
      name: 'Planning',
      description: 'Define o que construir, para quem e com quais prioridades.',
      outputs: ['PRD.md', 'UX spec (quando necessario)'],
      agentName: 'PM (John)',
    },
    {
      name: 'Solutioning',
      description: 'Converte requisitos em arquitetura e decisoes tecnicas explicitas.',
      outputs: ['architecture.md', 'ADRs + epics/stories'],
      agentName: 'Architect (Winston)',
    },
    {
      name: 'Implementation',
      description: 'Executa com disciplina operacional, validacao e rastreabilidade.',
      outputs: ['Codigo + testes', 'sprint-status.yaml + retrospectiva'],
      agentName: 'Developer + QA + Scrum Master',
    },
  ],
  agents: [
    {
      name: 'Analyst (Mary)',
      role: 'Discovery e pesquisa orientada por incerteza.',
      whenEnters: 'Inicio do fluxo ou quando faltam evidencias.',
      delivers: ['Insights de dominio', 'Briefs que viram contexto estruturado'],
    },
    {
      name: 'PM (John)',
      role: 'Definicao de produto e priorizacao.',
      whenEnters: 'Planning e revisoes de escopo.',
      delivers: ['PRD.md', 'Epics e stories implementaveis'],
    },
    {
      name: 'Architect (Winston)',
      role: 'Decisoes tecnicas cross-epic.',
      whenEnters: 'Solutioning antes da codificacao.',
      delivers: ['architecture.md', 'ADRs que evitam conflitos'],
    },
    {
      name: 'Scrum Master (Bob)',
      role: 'Cadencia, prontidao e governanca do sprint.',
      whenEnters: 'Implementacao continua e checkpoints.',
      delivers: ['Story readiness', 'Rituals e retrospective'],
    },
    {
      name: 'Developer (Amelia)',
      role: 'Entrega tecnica a partir de stories prontas.',
      whenEnters: 'Build cycle de cada historia.',
      delivers: ['Codigo funcional', 'Testes unitarios e integracao'],
    },
    {
      name: 'QA Engineer (Quinn)',
      role: 'Validacao automatizada orientada a risco.',
      whenEnters: 'Apos feature/epic implementada.',
      delivers: ['Suite E2E/API', 'Cobertura para regressao'],
    },
    {
      name: 'Quick Flow Solo Dev (Barry)',
      role: 'Fast-path para mudancas pequenas.',
      whenEnters: 'Bugs ou ajustes de baixo risco.',
      delivers: ['Quick tech spec', 'Implementacao enxuta com guardrails'],
    },
    {
      name: 'UX Designer (Sally)',
      role: 'Experiencia e consistencia de interacao.',
      whenEnters: 'Quando o fluxo exige decisoes de UX.',
      delivers: ['ux-spec.md', 'Diretrizes de jornada e interface'],
    },
    {
      name: 'Technical Writer (Paige)',
      role: 'Documentacao e clareza de artefatos.',
      whenEnters: 'Formalizacao de conhecimento do projeto.',
      delivers: ['Documentacao tecnica', 'Diagramas e padroes versionados'],
    },
  ],
  conflictExample: {
    withoutAdr: {
      title: 'Sem arquitetura documentada',
      decisions: [
        'Agente A decide REST; agente B decide GraphQL.',
        'Agente A aplica snake_case; agente B aplica camelCase.',
        'Agente A adota Redux; agente B escolhe Context API.',
      ],
      outcome: 'Desalinhamento, retrabalho e conflitos tecnicos no merge.',
    },
    withAdr: {
      title: 'Com architecture.md + ADRs',
      decisions: [
        'ADR define protocolo unico de comunicacao para todo o produto.',
        'Convention define naming e padroes de estado compartilhados.',
        'Cada agente consulta o mesmo artefato antes de implementar.',
      ],
      outcome: 'Squad virtual alinhado, menos retrabalho e maior previsibilidade.',
    },
  },
  metricRedHat: {
    label: 'Red Hat 2025',
    value: 41,
    suffix: '%',
    context: 'Aumento medio de complexidade de codigo com IA usada sem estrutura.',
    source: 'developers.redhat.com (out/2025)',
  },
  metricMcKinsey: {
    label: 'McKinsey 2025',
    min: 20,
    max: 45,
    suffix: '%',
    context: 'Faixa de ganho de produtividade em adocao estruturada de IA.',
    source: 'Citado pela Red Hat Developer (2025)',
    rangeLabel: 'Faixa observada: 20% a 45%',
  },
  narratorNotes: [
    'Em projetos maiores, o gargalo deixa de ser gerar codigo e passa a ser coordenar decisoes entre papeis.',
    'BMAD aplica principios ageis classicos ao trabalho com agentes: roles claros, artefatos versionados e rituais.',
    'A esteira de 4 fases cria contexto progressivo: cada fase entrega arquivos que alimentam a seguinte.',
    'A arquitetura com ADRs (Architecture Decision Records) funciona como um tech lead assinado em arquivo, disponivel para qualquer agente.',
    'A mensagem central: sem estrutura, IA escala caos; com estrutura, IA escala throughput com qualidade.',
  ],
  labels: {
    phaseSectionTitle: 'Esteira de contexto em 4 fases',
    phaseSectionSubtitle: 'Cada fase produz artefatos consumidos pela proxima etapa do fluxo.',
    phaseOutputsLabel: 'Outputs',
    phaseAgentLabel: 'Agente lider',
    agentsSectionTitle: 'Squad board — agentes especializados',
    agentsSectionSubtitle: 'Cada card representa um papel agil com escopo claro e entregaveis definidos.',
    agentRoleLabel: 'Papel',
    agentWhenLabel: 'Quando entra',
    agentDeliversLabel: 'Entrega',
    conflictSectionTitle: 'Conflito entre agentes: sem ADR vs com ADR',
    conflictSectionSubtitle: 'Arquitetura documentada transforma decisoes implicitas em alinhamento obrigatorio.',
    impactSectionTitle: 'Impacto mensuravel de coordenacao',
    impactSectionSubtitle: 'Estrutura reduz risco tecnico e libera produtividade em escala.',
    notesTerminalTitle: 'topic9-narrator-notes.log',
    notesTerminalLead: 'Notas do narrador — BMAD como squad virtual com governanca.',
    notesTerminalOutro: 'Fechamento: BMAD e sobre coordenacao disciplinada, nao sobre hype.',
    notesLinePrefix: 'Ponto',
  },
};
