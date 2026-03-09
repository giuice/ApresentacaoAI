// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface NarrativeSection {
  id: string;
  eyebrow: string;
  title: string;
  problem?: string;
  content: string[];
  highlight?: { label: string; value: string; tone: 'positive' | 'warning' | 'neutral' };
  items?: NarrativeItem[];
  codeBlock?: { title: string; lines: string[] };
  quote?: string;
}

export interface NarrativeItem {
  label: string;
  description: string;
  detail?: string;
  accent?: 'primary' | 'warning' | 'neutral';
}

export interface SkillsCaseStudy {
  eyebrow: string;
  title: string;
  intro: string;
  concept: string;
  structure: NarrativeItem[];
  progressiveDisclosure: { layers: { label: string; description: string }[] };
  results: { label: string; value: string; detail: string; tone: 'positive' | 'warning' }[];
  philosophy: { model: string[]; scripts: string[] };
  antiPatterns: string[];
  concreteSkills: NarrativeItem[];
  triggers: { description: string; examples: string[] };
  takeaway: string;
}

export interface Topic17Data {
  title: string;
  subtitle: string;
  sections: NarrativeSection[];
  skillsCaseStudy: SkillsCaseStudy;
  closing: {
    eyebrow: string;
    headline: string;
    formula: string;
    quote: string;
  };
  narratorNotes: string[];
  labels: {
    notesTerminalTitle: string;
    notesTerminalLead: string;
    notesLinePrefix: string;
    notesTerminalOutro: string;
  };
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const topic17Data: Topic17Data = {
  title: 'Copilot além do autocomplete',
  subtitle: 'Como operar comandos, threads, plan e multiagentes com controle — e o caso real da OpenAI com Skills.',

  sections: [
    {
      id: 'tension',
      eyebrow: 'Tensão operacional',
      title: 'A velocidade tem um custo escondido',
      problem:
        'Copilot acelera execução. Mas sem governança, esse ganho volta como custo de revisão, ruído e retrabalho.',
      content: [
        'Equipes que adotam IA intensivamente ganham velocidade imediata — mas os dados mostram um efeito colateral silencioso.',
      ],
      highlight: {
        label: '+55% velocidade em tarefa controlada com Copilot',
        value: '+55%',
        tone: 'positive',
      },
      items: [
        {
          label: '+91% tempo de review',
          description: 'Adoção intensiva de IA aumentou o tempo de revisão em 91%.',
          detail: 'Fonte: Faros AI telemetry, 2026',
          accent: 'warning',
        },
      ],
      quote:
        'O ponto não é usar mais IA. O ponto é operar IA com arquitetura de trabalho.',
    },
    {
      id: 'commands',
      eyebrow: 'Comandos que mudam governança',
      title: 'Quatro comandos que alteram o jogo',
      problem:
        'Em vez de decorar dezenas de comandos, foque nos que alteram governança real.',
      content: [
        'Cada comando resolve um problema específico de operação. Use-os como instrumentos de controle, não como atalhos mágicos.',
      ],
      items: [
        {
          label: '/fork',
          description: 'Thread paralela para trade-off real.',
          detail: 'Bifurque quando houver duas estratégias válidas ou impacto arquitetural. Cuidado: fork para detalhe cosmético fragmenta contexto.',
          accent: 'primary',
        },
        {
          label: '/compact',
          description: 'Higiene de contexto antes da decisão.',
          detail: 'Use em sessão longa antes de review, merge ou mudança estrutural. Sempre declare o que manter e o que descartar.',
          accent: 'primary',
        },
        {
          label: '/ide',
          description: 'Ponte entre terminal e diff visual.',
          detail: 'Gere no CLI e inspecione no editor. Diff limpo não substitui validação humana.',
          accent: 'primary',
        },
        {
          label: '/skills',
          description: 'Workflow especializado em vez de prompt genérico.',
          detail: 'Troca improviso por fluxo reutilizável. Skill acelera execução, mas não inventa critério de aceite.',
          accent: 'primary',
        },
      ],
    },
    {
      id: 'threads',
      eyebrow: 'Threads na prática',
      title: 'Thread é controle de risco, não conversa nova',
      problem:
        'Thread não é nova conversa. Thread é controle explícito de risco de decisão.',
      content: [
        'Thread principal = caminho de entrega com objetivo único e histórico limpo.',
        'Thread fork = experimento com hipótese explícita e critério de descarte.',
      ],
      items: [
        {
          label: 'Thread principal',
          description: 'Caminho de entrega. Decisão e merge vivem aqui.',
          accent: 'primary',
        },
        {
          label: 'Fork conservador',
          description: 'Explora opção de menor risco. Volta com hipótese validada ou descartada.',
          accent: 'warning',
        },
        {
          label: 'Fork agressivo',
          description: 'Testa ganho de performance ou automação adicional. Só converge se a evidência superar o custo.',
          accent: 'warning',
        },
      ],
      quote: 'Paralelo para explorar. Serial para decidir e consolidar.',
    },
    {
      id: 'plan',
      eyebrow: 'Plan primeiro, execução depois',
      title: 'Sem plan, multiagente é paralelismo de suposição',
      problem: 'Sem planejamento explícito, cada agente otimiza localmente e o sistema falha globalmente.',
      content: [
        'Um plan curto de cinco itens funciona como contrato de execução para qualquer agente ou fleet.',
      ],
      items: [
        { label: '1. Problema', description: 'Descreva o bug ou entrega em até 3 linhas.', accent: 'primary' },
        { label: '2. Hipótese', description: 'Declare a abordagem e o principal trade-off.', accent: 'primary' },
        { label: '3. Tarefas', description: 'Liste etapas com dependência e ordem.', accent: 'primary' },
        { label: '4. Aceite', description: 'Defina testes, asserts e evidências mínimas.', accent: 'primary' },
        { label: '5. Rollback', description: 'Especifique o que não pode ser alterado.', accent: 'primary' },
      ],
      quote: 'Sem plan, a IA executa rápido. Com plan, ela executa com governança.',
    },
    {
      id: 'fleet',
      eyebrow: 'Fleet mínimo e ampliado',
      title: 'Multiagentes com papéis, não com caos',
      problem: 'Fleet sem contrato por agente gera throughput bruto e perde confiabilidade.',
      content: [
        'Pense em fleet como linha de produção por papéis. Cada agente tem escopo exato, saída esperada e critério de validação.',
      ],
      items: [
        { label: 'Builder', description: 'Implementa a mudança. Saída: código + diffs + notas de impacto.', accent: 'primary' },
        { label: 'QA', description: 'Gera e ajusta validações. Saída: testes, gaps e comandos de verificação.', accent: 'primary' },
        { label: 'Reviewer', description: 'Revisão adversarial. Saída: riscos, regressões e recomendação final.', accent: 'primary' },
        { label: 'Architect', description: 'Valida integração e coerência técnica. (satélite)', accent: 'warning' },
        { label: 'Tech Writer', description: 'Consolida documentação e decisões. (satélite)', accent: 'warning' },
      ],
      codeBlock: {
        title: 'Roteiro tático de lançamento',
        lines: [
          '1. Definir objetivo único da rodada',
          '2. Publicar constraints e áreas proibidas',
          '3. Rodar Builder + QA em paralelo',
          '4. Executar Reviewer ao final da wave',
          '5. Abrir fork antes do merge se houver dúvida',
          '6. Compactar contexto antes da decisão final',
          '7. Aprovar com evidência: testes, diff e riscos',
        ],
      },
    },
    {
      id: 'guardrails',
      eyebrow: 'Guardrails vs antipadrões',
      title: 'O que separa demo de produção',
      content: [
        'Guardrails evitam "falha silenciosa com aparência de sucesso". Antipadrões são os sinais de que a operação está travada.',
      ],
      items: [
        { label: 'Hooks', description: 'Lint, test e checks em pontos críticos.', accent: 'primary' },
        { label: 'Bloqueio', description: 'Arquivos sensíveis e caminhos de infraestrutura.', accent: 'primary' },
        { label: 'Checklist', description: 'Review humano obrigatório para merge.', accent: 'primary' },
        { label: 'Rastreabilidade', description: 'O que mudou, por quê e em qual thread.', accent: 'primary' },
      ],
      quote: 'Prompt gigante sem objetivo mensurável. Abrir muitos forks sem convergência. Rodar muitos agentes sem papel definido. Aceitar código por "cara de certo". Sem plan, sem aceite e sem rollback.',
    },
  ],

  skillsCaseStudy: {
    eyebrow: 'Caso real — OpenAI Agents SDK',
    title: 'Skills: como a OpenAI operacionaliza agentes em produção',
    intro:
      'A OpenAI publicou como usa Skills nos repositórios do Agents SDK (Python e TypeScript) para escalar throughput sem perder governança. É a prova prática de tudo que discutimos.',
    concept:
      'Uma Skill é um pacote pequeno de conhecimento operacional: um SKILL.md (manifesto), scripts opcionais para trabalho mecânico, referências e assets.',
    structure: [
      { label: 'SKILL.md', description: 'Manifesto com name, description e instruções.', accent: 'primary' },
      { label: 'scripts/', description: 'Shell scripts para trabalho determinístico (lint, test, format).', accent: 'primary' },
      { label: 'references/', description: 'Documentação e contexto adicional.', accent: 'neutral' },
      { label: 'assets/', description: 'Materiais de suporte.', accent: 'neutral' },
    ],
    progressiveDisclosure: {
      layers: [
        { label: 'Layer 1 — Startup', description: 'Agente lê apenas name e description de cada skill para routing.' },
        { label: 'Layer 2 — Seleção', description: 'SKILL.md completo carrega só quando a skill é escolhida.' },
        { label: 'Layer 3 — Execução', description: 'Scripts e referências carregam só quando necessários.' },
      ],
    },
    results: [
      {
        label: '+44% throughput de PRs',
        value: '316 → 457',
        detail: 'PRs merged em 3 meses (set-nov 2025 vs dez 2025-fev 2026)',
        tone: 'positive',
      },
      {
        label: '+72,4% no repo TypeScript',
        value: '134 → 231',
        detail: 'PRs merged no repo JS do Agents SDK',
        tone: 'positive',
      },
    ],
    philosophy: {
      model: [
        'Lê código-fonte e infere comportamento',
        'Compara logs com comportamento esperado',
        'Avalia riscos de compatibilidade',
        'Produz decisões explicáveis',
      ],
      scripts: [
        'Executa comandos de verificação em ordem fixa',
        'Coleta logs e output',
        'Busca release tags',
        'Expõe helpers (start, stop, logs, rerun)',
      ],
    },
    antiPatterns: [
      'Descrição vaga: "Run the mandatory verification stack" — sem quando/porquê',
      'Encodar shell recipes em prompts — mova para scripts/',
      'Forçar skill usage em todas as tarefas — use condicionalmente',
      'Pular o modelo onde julgamento é valioso (comparações, tradeoffs)',
    ],
    concreteSkills: [
      { label: 'code-change-verification', description: 'Roda format + lint + typecheck + tests em mudanças de runtime.', accent: 'primary' },
      { label: 'docs-sync', description: 'Audita documentação contra o codebase — docstrings são a fonte.', accent: 'primary' },
      { label: 'final-release-review', description: 'Compara release tag anterior com candidata atual.', accent: 'primary' },
      { label: 'test-coverage-improver', description: 'Analisa cobertura, encontra gaps, propõe testes de alto impacto.', accent: 'primary' },
      { label: 'pr-draft-summary', description: 'Gera branch name, título e descrição do PR no handoff.', accent: 'neutral' },
      { label: 'integration-tests', description: 'Publica em registry local, testa install/run em Node, Bun, Deno, Workers.', accent: 'neutral' },
    ],
    triggers: {
      description: 'AGENTS.md usa regras if/then para ativar skills automaticamente nos momentos certos.',
      examples: [
        'Se mudança afeta código SDK → chamar $code-change-verification',
        'Antes de editar runtime ou API → chamar $implementation-strategy',
        'Quando toca API/platform da OpenAI → chamar $openai-knowledge',
        'Quando finalizar trabalho → chamar $pr-draft-summary',
      ],
    },
    takeaway:
      'O modelo cuida do julgamento. Scripts cuidam do trabalho mecânico. Se a IA precisa redescobrir a mesma receita toda vez, isso deveria ser um script.',
  },

  closing: {
    eyebrow: 'Síntese final',
    headline: 'Velocidade sem governança só desloca o gargalo.',
    formula:
      'Comando certo + thread certa + plan claro + fleet com papéis = velocidade com controle.',
    quote:
      'Copilot multiplica o sistema de engenharia que já existe no time.',
  },

  narratorNotes: [
    'Abra dizendo que IA acelera execução, mas método é o que sustenta a qualidade no time.',
    'Use /fork, /compact, /ide e /skills como instrumentos de governança, não como atalhos mágicos.',
    'Reforce que thread existe para tratar risco de decisão, não para espalhar microvariações.',
    'Quando falar de plan, repita: problema, hipótese, tarefas, aceite e rollback.',
    'Na seção de Skills OpenAI, foque no resultado (+44%) e na filosofia modelo vs script.',
    'Feche com a tensão entre +55% de velocidade e +91% de review: o ganho sustentável depende de operação com critérios claros.',
  ],

  labels: {
    notesTerminalTitle: 'narrator://topic17',
    notesTerminalLead: 'Condução sugerida — Copilot Operacional (~6-8 min).',
    notesLinePrefix: 'nota',
    notesTerminalOutro:
      'Fecho: velocidade com IA só escala quando a operação tem governança.',
  },
};
