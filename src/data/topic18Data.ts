// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface TimelineDay {
  date: string;
  label: string;
  events: string[];
}

export interface ToolModelEntry {
  range: string;
  evidence: string;
  model: string;
}

export interface WorkflowStep {
  order: number;
  label: string;
}

export interface LiteralPrompt {
  context: string;
  text: string;
}

export interface Lesson {
  title: string;
  description: string;
}

export interface Limitation {
  text: string;
}

export interface Topic18Data {
  title: string;
  subtitle: string;
  hero: {
    eyebrow: string;
    lead: string[];
  };
  timeline: TimelineDay[];
  workflow: {
    eyebrow: string;
    title: string;
    steps: WorkflowStep[];
    reviewNote: string;
  };
  toolsModels: {
    eyebrow: string;
    title: string;
    entries: ToolModelEntry[];
    caveat: string;
  };
  prompts: {
    eyebrow: string;
    title: string;
    items: LiteralPrompt[];
    validationCommands: string[];
  };
  lessons: {
    eyebrow: string;
    title: string;
    items: Lesson[];
  };
  limitations: {
    eyebrow: string;
    title: string;
    items: Limitation[];
  };
  metric: {
    value: string;
    label: string;
  };
  closing: {
    eyebrow: string;
    headline: string;
    quote: string;
  };
  narratorNotes: string[];
  labels: {
    notesTerminalTitle: string;
    notesTerminalLead: string;
    notesLinePrefix: string;
    notesTerminalOutro: string;
    evidenceBadgeCommit: string;
    evidenceBadgeStory: string;
    evidenceBadgeSession: string;
  };
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const topic18Data: Topic18Data = {
  title: 'Bastidores da Construção',
  subtitle:
    'Do briefing ao deploy: como a ApresentacaoAI foi construída com VS Code, BMAD e uma esteira híbrida de agentes.',

  hero: {
    eyebrow: 'Abertura',
    lead: [
      'Esta aplicação fala sobre a transição do "Vibe Coding" para a Engenharia de Contexto. O ponto mais interessante dos bastidores é que ela própria foi construída desse jeito.',
      'Não nasceu de um prompt único pedindo "faz tudo", mas de uma esteira com briefing, PRD, arquitetura, UX, épicos, stories, implementação, review e validação.',
      'O cockpit principal foi o VS Code, com uso combinado de Copilot CLI, GitHub Copilot, Claude, Codex e a disciplina operacional do BMAD.',
    ],
  },

  timeline: [
    {
      date: '04/03',
      label: 'Setup do método antes do código',
      events: [
        'Primeiro commit: "Inicio do projeto e setup BMAD e AGENTS.md"',
        'Artefatos de planejamento: product-brief, PRD, architecture, UX, project-context',
        'Tópicos narrativos consolidados em docs/topicos/ antes da implementação React',
      ],
    },
    {
      date: '05/03',
      label: 'O app ganha estrutura real',
      events: [
        'Inicialização com Vite + React + TypeScript',
        'Shell da apresentação, barra de progresso, lazy loading',
        'Stories já incluíam testes e correções pós-review',
      ],
    },
    {
      date: '06/03',
      label: 'Identidade visual, narrativa e paralelismo real',
      events: [
        'useHashSync com testes, retrospectiva do Epic 1',
        'Epic 2 completo: tema Matrix, transições, animações',
        'Epic 4: multiagente — 4 stories paralelas (Topics 6-9) com /dev-story',
        'Validação com npm test + npm run build',
      ],
    },
    {
      date: '08/03',
      label: 'BMAD como fábrica de contexto para o Epic 5',
      events: [
        'Fleet mode: workflow create-story gerou stories 5-1 a 5-6',
        'Arquivos salvos em _bmad-output/implementation-artifacts',
        'Validação antes e depois com npm run test && npm run build',
      ],
    },
    {
      date: '09/03',
      label: 'Epic 5, deploy e mudança de escopo controlada',
      events: [
        'Commits: "stories do epico 5", "epico 5 finalizado(sem review)"',
        'Deploy: GitHub Pages configurado',
        'Escopo expandido: Tópico 17 com deep dive técnico',
        'Atualização formal de PRD, épicos, arquitetura e UX',
      ],
    },
    {
      date: '10/03',
      label: 'Polimento fino após a expansão',
      events: [
        'Fix: reduceMotion defaults para Topic17',
        'Tech specs: Mobile Navigation e Topic 17 redesign',
        'Refinamento com rastreabilidade',
      ],
    },
  ],

  workflow: {
    eyebrow: 'Workflow BMAD',
    title: 'O fluxo que estruturou o projeto',
    steps: [
      { order: 1, label: 'Setup BMAD e instruções do projeto' },
      { order: 2, label: 'Product Brief' },
      { order: 3, label: 'PRD' },
      { order: 4, label: 'Arquitetura' },
      { order: 5, label: 'UX Design' },
      { order: 6, label: 'Épicos' },
      { order: 7, label: 'Stories de contexto' },
      { order: 8, label: 'dev-story para implementar com testes' },
      { order: 9, label: 'Review + sprint-status.yaml' },
      { order: 10, label: 'Retrospectiva / ajuste de escopo' },
    ],
    reviewNote:
      'Dev moves story to review, then runs code-review (fresh context, different LLM recommended)',
  },

  toolsModels: {
    eyebrow: 'Ferramentas & Modelos',
    title: 'Qual ferramenta/modelo apareceu onde',
    entries: [
      { range: 'Stories 1.1-1.2', evidence: 'setup e navegação base', model: 'Codex (GPT-5)' },
      {
        range: 'Stories 1.3-3.3',
        evidence: 'shell, overview, design system, primeiros componentes',
        model: 'Claude Opus 4.6',
      },
      { range: 'Stories 3.4-3.7', evidence: 'tópicos narrativos 2-5', model: 'GPT-5 Codex' },
      {
        range: 'Stories 4.1-4.4',
        evidence: 'Topics 6-9 (paralelo)',
        model: 'GPT-5 / GPT-5.1 / GPT-5.2 (Copilot CLI)',
      },
      {
        range: 'Stories 4.5-4.6',
        evidence: 'componentes do Topic 10',
        model: 'Claude Opus 4.6',
      },
      { range: 'Story 4.7', evidence: 'Topic 10', model: 'GPT-5.4 (Copilot)' },
      {
        range: 'Epic 5',
        evidence: 'Topics 11-16',
        model: 'Claude Sonnet 4.6, GPT-5.4 (Copilot CLI)',
      },
    ],
    caveat:
      'Esses são apenas os modelos que ficaram gravados nos artefatos. Podem ter existido outras interações não persistidas.',
  },

  prompts: {
    eyebrow: 'Prompts literais',
    title: 'Comandos recuperados dos logs',
    items: [
      {
        context: 'Multiagente — Epic 4',
        text: '/dev-story vamos desenvolver as stories 4.1 → 4.2 → 4.3 → 4.4 (tópicos independentes) lance agentes para trabalhar nisso simultaneamente',
      },
      {
        context: 'Fleet mode — Epic 5',
        text: 'Fleet deployed: vamos @.agents\\skills\\bmad-bmm-create-story\\ todas as stories do epic 5 por favor carregue o workflow de contexto e delegue pra agentes',
      },
      {
        context: 'Mudança de escopo — Tópico 17',
        text: 'esse projeto é uma apresentação sobre desenvolvimento com inteligencia artificial. A gente já estruturou os tópicos... eu gostaria de acrecentar mais um com dicas sobre como utilizar o copilot...',
      },
    ],
    validationCommands: [
      'npm run dev',
      'npm test',
      'npm run build',
      'npm test -- src/__tests__/topic7.test.tsx',
    ],
  },

  lessons: {
    eyebrow: 'Aprendizados',
    title: 'O que essa timeline ensina',
    items: [
      {
        title: 'Ferramenta sem método gera velocidade instável',
        description:
          'Sem workflow, cada sessão de IA começa do zero e produz resultados inconsistentes.',
      },
      {
        title: 'Workflow com contexto reduz retrabalho',
        description: 'Briefing, PRD e stories eliminam o "tenta de novo" repetitivo.',
      },
      {
        title: 'Multiagente funciona quando a tarefa já está quebrada',
        description:
          'Stories independentes permitiram paralelismo real com 4 agentes simultâneos.',
      },
      {
        title: 'Review precisa de contexto fresco e evidência',
        description:
          'Review local com modelo diferente e sprint-status formalizado como etapa.',
      },
      {
        title: 'Quando o escopo muda, a spec muda junto',
        description:
          'O Tópico 17 não entrou como remendo — exigiu atualização de PRD, épicos, arquitetura e UX.',
      },
    ],
  },

  limitations: {
    eyebrow: 'Limitações',
    title: 'Limitações das evidências',
    items: [
      { text: 'Os modelos citados são apenas os gravados nos artefatos de stories.' },
      {
        text: 'Podem ter existido interações em VS Code, Copilot Chat ou Claude não persistidas.',
      },
      { text: 'O session_store recuperou apenas parte das sessões.' },
      {
        text: 'Não foram encontrados PRs no GitHub — review aconteceu no fluxo local.',
      },
    ],
  },

  metric: {
    value: '6 dias',
    label:
      'Do setup BMAD ao deploy: 6 épicos mapeados, 17 tópicos implementados, validações recorrentes e GitHub Pages configurado.',
  },

  closing: {
    eyebrow: 'Síntese',
    headline: 'A aplicação foi construída como o próprio argumento que ela defende.',
    quote:
      'Não foi uma IA fazendo tudo; foi um ambiente de trabalho no VS Code usando várias IAs com papéis diferentes, amarradas por método, stories, validação e revisão.',
  },

  narratorNotes: [
    'Abra dizendo que a aplicação não foi um experimento de prompt solto — foi construída exatamente do jeito que defende.',
    'Dia 1: o primeiro movimento não foi abrir React. Foi montar BMAD, product brief, PRD, arquitetura, UX e tópicos.',
    'Dia 2: base operacional — Vite, React, TypeScript, shell, overview, lazy loading, hash sync.',
    'Dia 3: multiagente real — mostre o log do /dev-story com 4 stories paralelas. Topics 6-9 com data files, testes e build.',
    'Factory de stories: BMAD como fábrica de contexto. Fleet mode gerou stories do Epic 5 antes de implementar.',
    'Review e governança: review no sprint-status, Senior Developer Review em artefatos, correções pós-review. Nem tudo fechou com review completo — mostre o "sem review".',
    'Mudança de escopo: Tópico 17 não foi patch. Atualizou PRD, épicos, arquitetura e UX. Prova viva de governança.',
    'Feche com: "não foi uma IA fazendo tudo; foi um ambiente com várias IAs, papéis diferentes, amarradas por método."',
  ],

  labels: {
    notesTerminalTitle: 'narrator://topic18',
    notesTerminalLead: 'Condução sugerida — Bastidores da Construção (~7-8 min).',
    notesLinePrefix: 'nota',
    notesTerminalOutro:
      'Fecho: a forma de construir é parte da mensagem.',
    evidenceBadgeCommit: 'recuperado de commit',
    evidenceBadgeStory: 'recuperado de story artifact',
    evidenceBadgeSession: 'recuperado de session log',
  },
};
