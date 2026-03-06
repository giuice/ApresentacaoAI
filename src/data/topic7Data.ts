export interface Topic7PipelineStep {
  id: string;
  stage: string;
  command: string;
  description: string;
  outputs: string[];
  checklist: string[];
}

export interface Topic7Principle {
  title: string;
  description: string;
}

export interface Topic7EcosystemItem {
  name: string;
  focus: string;
}

export interface Topic7HonestView {
  title: string;
  criticsTitle: string;
  responsesTitle: string;
  keyPoint: string;
  criticisms: string[];
  responses: string[];
}

export interface Topic7Data {
  title: string;
  subtitle: string;
  definition: string;
  heroMetric: {
    before: {
      value: number;
      suffix: string;
      label: string;
    };
    after: {
      value: number;
      suffix: string;
      label: string;
    };
    context: string;
  };
  pipelineSectionTitle: string;
  pipelineSectionSubtitle: string;
  outputsLabel: string;
  checklistLabel: string;
  pipelineSteps: Topic7PipelineStep[];
  credibilityCard: {
    title: string;
    quote: string;
    source: string;
    starsLabel: string;
    starsValue: string;
  };
  principlesTitle: string;
  sixPrinciples: Topic7Principle[];
  ecosystemTitle: string;
  ecosystem: Topic7EcosystemItem[];
  honestView: Topic7HonestView;
  notesTerminalTitle: string;
  notesIntro: string;
  notesOutro: string;
  narratorNotes: string[];
}

export const topic7Data: Topic7Data = {
  title: 'Spec-Kit — Da Ideia ao PR em 7 Comandos',
  subtitle: 'Topico 7 · Spec-Driven Development na pratica',
  definition:
    'O Spec-Kit troca documentacao solta por um pipeline executavel: cada comando produz artefatos rastreaveis e reduz a friccao entre ideia, implementacao e review.',
  heroMetric: {
    before: {
      value: 12,
      suffix: 'h',
      label: 'Documentacao manual tradicional',
    },
    after: {
      value: 15,
      suffix: 'min',
      label: 'Pipeline Spec-Kit com spec executavel',
    },
    context:
      'De PRD + design docs + planos de teste para fluxo estruturado com branch, spec, plan e tasks versionados.',
  },
  pipelineSectionTitle: 'Pipeline vertical do workflow Spec-Kit',
  pipelineSectionSubtitle:
    'Sete nos conectados: cada etapa recebe contexto, aplica checks e entrega artefatos concretos.',
  outputsLabel: 'Outputs',
  checklistLabel: 'Checklist interno',
  pipelineSteps: [
    {
      id: 'constitution',
      stage: 'Etapa 0',
      command: '/constitution',
      description:
        'Define regras imutaveis do projeto para stack, qualidade e limites de complexidade.',
      outputs: ['📄 constitution.md'],
      checklist: [
        'Principios de teste definidos',
        'Stack documentada',
        'Convencoes de codigo registradas',
      ],
    },
    {
      id: 'specify',
      stage: 'Etapa 1',
      command: '/speckit.specify',
      description:
        'Transforma linguagem natural em spec estruturada e abre branch da feature automaticamente.',
      outputs: ['📄 spec.md', '🌿 branch git', '📁 specs/[NNN-feature]/'],
      checklist: [
        'User stories com criterios de aceite',
        '[NEEDS CLARIFICATION] para ambiguidades',
        'NFRs identificados',
      ],
    },
    {
      id: 'clarify',
      stage: 'Etapa 1.5',
      command: '/speckit.clarify',
      description:
        'Identifica gaps e riscos da spec antes de seguir para implementacao.',
      outputs: ['🧭 spec atualizada'],
      checklist: [
        'Zero [NEEDS CLARIFICATION] pendentes',
        'Edge cases documentados',
        'Criterios de sucesso mensuraveis',
      ],
    },
    {
      id: 'plan',
      stage: 'Etapa 2',
      command: '/speckit.plan',
      description:
        'Gera plano completo com arquitetura, pesquisa tecnica, modelos e contratos.',
      outputs: [
        '🗺️ plan.md',
        '🔬 research.md',
        '🧱 data-model.md',
        '📡 contracts/',
        '🚀 quickstart.md',
      ],
      checklist: [
        'Simplicity Gate validado',
        'Anti-Abstraction Gate validado',
        'Integration-First Gate validado',
      ],
    },
    {
      id: 'analyze',
      stage: 'Etapa 2.5',
      command: '/speckit.analyze',
      description:
        'Executa quality gate cross-artifact para alinhar spec, plan, tasks e constitution.',
      outputs: ['🧪 relatorio de alinhamento'],
      checklist: [
        'Spec e plan consistentes',
        'Tasks cobrem requisitos',
        'Sem contradicoes entre artefatos',
      ],
    },
    {
      id: 'tasks',
      stage: 'Etapa 3',
      command: '/speckit.tasks',
      description:
        'Quebra o plano em tarefas atomicas, testaveis e com paralelismo explicito.',
      outputs: ['✅ tasks.md com [P] para paralelo'],
      checklist: [
        'Tarefas ordenadas por dependencia',
        'Rastreabilidade requisito -> task',
        'Escopo pequeno por tarefa',
      ],
    },
    {
      id: 'implement',
      stage: 'Etapa 4',
      command: '/speckit.implement',
      description:
        'Executa task por task com testes antes do codigo e review estruturado ate o PR.',
      outputs: ['🧩 codigo + testes', '📝 commits por task', '🔀 PR pronto para merge'],
      checklist: [
        'Testes antes da implementacao',
        '1 task = 1 commit estruturado',
        'Code review por task',
      ],
    },
  ],
  credibilityCard: {
    title: 'Credibilidade do ecossistema',
    quote: 'Spec Kit e um experimento — ainda temos muitas perguntas a responder.',
    source: 'GitHub Spec-Kit (README oficial)',
    starsLabel: 'Stars no GitHub',
    starsValue: '71k ⭐',
  },
  principlesTitle: 'Os 6 principios que constrangem o LLM',
  sixPrinciples: [
    {
      title: 'Foco no QUE e POR QUE',
      description:
        'A spec evita detalhes prematuros de implementacao e preserva estabilidade arquitetural.',
    },
    {
      title: 'Marcadores de incerteza obrigatorios',
      description:
        'A IA marca [NEEDS CLARIFICATION] em vez de adivinhar requisitos ambigos.',
    },
    {
      title: 'Checklist como QA da spec',
      description:
        'Cada artefato possui criterios de completude que funcionam como testes unitarios de documento.',
    },
    {
      title: 'Gates constitucionais',
      description:
        'Simplicity, Anti-Abstraction e Integration-First evitam over-engineering.',
    },
    {
      title: 'Hierarquia de detalhes',
      description:
        'Detalhes extensos ficam em arquivos auxiliares, mantendo o artefato principal navegavel.',
    },
    {
      title: 'Pensamento test-first',
      description:
        'A ordem contracts -> testes -> codigo melhora testabilidade e reduz retrabalho.',
    },
  ],
  ecosystemTitle: 'Ecossistema SDD em 2026',
  ecosystem: [
    {
      name: 'GitHub Spec-Kit',
      focus: 'Fluxo spec-as-source agent-agnostic',
    },
    {
      name: 'Amazon Kiro',
      focus: 'IDE dedicada a SDD com experiencia guiada',
    },
    {
      name: 'Tessl',
      focus: 'Produto focado em software orientado por especificacao',
    },
    {
      name: 'Pesquisa academica arXiv',
      focus: 'Formalizacao de spec-first, spec-anchored e spec-as-source',
    },
  ],
  honestView: {
    title: 'Visao honesta: limites e respostas',
    criticsTitle: 'Criticas frequentes',
    responsesTitle: 'Resposta pragmatica',
    keyPoint:
      'A pergunta correta nao e SDD perfeito vs sem SDD, e sim qual nivel de especificacao estruturada gera mais previsibilidade para o seu contexto.',
    criticisms: [
      'Scott Logic relatou friccao e excesso de markdown em testes reais.',
      'Martin Fowler observou que agentes nem sempre seguem todos os checklists.',
      'Para bug fixes pequenos, o overhead pode nao compensar.',
    ],
    responses: [
      'Adote por niveis: spec-first, depois spec-anchored e so entao spec-as-source.',
      'A constitution sozinha ja melhora consistencia entre devs e agentes.',
      'Projetos multi-dev e features maiores capturam retorno mais rapido do investimento.',
    ],
  },
  notesTerminalTitle: 'topic7-spec-kit-notes.log',
  notesIntro: 'Notas do narrador — Topico 7 (Spec-Kit em detalhe)',
  notesOutro: 'Fechamento: conecte com Topico 8 (GSD) destacando contexto fresco por fase.',
  narratorNotes: [
    'Context Rot nao se resolve com janela maior; resolve com especificacao estruturada compartilhada.',
    'A constitution define o DNA do projeto antes da primeira linha de codigo.',
    'O pipeline em 7 comandos transforma ideia em PR com rastreabilidade de ponta a ponta.',
    'No exemplo de chat em tempo real, em 15 minutos ja existe spec, plano e tarefas atomicas.',
    'Spec-Kit nao e bala de prata: para tarefas pequenas o overhead pode pesar.',
    'Mesmo assim, qualquer nivel de especificacao estruturada supera vibe coding puro em previsibilidade.',
  ],
};
