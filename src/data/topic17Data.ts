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

export interface Topic17Data {
  title: string;
  subtitle: string;
  sections: NarrativeSection[];
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
  title: 'Copilot Customizado',
  subtitle: 'Comandos essenciais e as 4 camadas de configuração: Skills, MCP, Hooks e Plugins.',

  sections: [
    {
      id: 'commands',
      eyebrow: 'Ponto de entrada',
      title: 'Comandos que você usa todo dia',
      content: [
        'Antes de mergulhar nas camadas de customização, os comandos embutidos do Copilot já cobrem a maior parte do trabalho cotidiano.',
      ],
      items: [
        {
          label: '/explain',
          description: 'Explica o código selecionado com contexto do projeto.',
          accent: 'primary',
        },
        {
          label: '/fix',
          description: 'Corrige bugs no trecho selecionado.',
          accent: 'primary',
        },
        {
          label: '/tests',
          description: 'Gera testes para o código selecionado.',
          accent: 'primary',
        },
        {
          label: '/doc',
          description: 'Documenta funções e módulos.',
          accent: 'primary',
        },
        {
          label: '/create-skill',
          description: 'Cria uma nova skill com ajuda da IA — do zero ou de conversa.',
          accent: 'neutral',
        },
        {
          label: '/create-hook',
          description: 'Gera configuração de hook com assistência.',
          accent: 'neutral',
        },
        {
          label: '/skills',
          description: 'Abre o menu de configuração de skills instaladas.',
          accent: 'neutral',
        },
        {
          label: '@workspace',
          description: 'Inclui o workspace inteiro como contexto na consulta.',
          accent: 'neutral',
        },
      ],
    },
    {
      id: 'skills',
      eyebrow: 'Camada 1 — Skills',
      title: 'Skills: instruções empacotadas que carregam sob demanda',
      problem:
        'Custom instructions se aplicam sempre. Skills carregam só quando o contexto bate com a description da skill — sem consumir contexto à toa.',
      content: [
        'Uma skill é uma pasta com SKILL.md, scripts, references e assets. O padrão é aberto — funciona no VS Code, Copilot CLI e Copilot coding agent.',
        'O campo description é crítico: define o que a skill faz e quando o modelo deve ativá-la automaticamente.',
      ],
      items: [
        {
          label: 'name',
          description: 'Identificador lowercase único, com no máximo 64 caracteres. Deve coincidir com o nome do diretório.',
          accent: 'primary',
        },
        {
          label: 'description',
          description: 'Explica o que faz e quando ativar, com no máximo 1024 caracteres. É a chave para auto-invocação pelo modelo.',
          accent: 'primary',
        },
        {
          label: 'user-invocable',
          description: 'Aparece como slash command. O padrão é true; use false para skills apenas-modelo.',
          accent: 'neutral',
        },
        {
          label: 'disable-model-invocation',
          description: 'Força invocação manual. Útil para skills destrutivas ou que dependem de contexto explícito do usuário.',
          accent: 'warning',
        },
      ],
      codeBlock: {
        title: 'Carregamento progressivo — 3 camadas',
        lines: [
          'Startup: o modelo lê apenas name e description de todas as skills.',
          'Seleção: o SKILL.md completo carrega quando o contexto bate com a description.',
          'Execução: scripts e references carregam só quando são referenciados no SKILL.md.',
        ],
      },
      quote: 'Instale quantas skills quiser. Elas não consomem contexto até serem chamadas.',
    },
    {
      id: 'mcp',
      eyebrow: 'Camada 2 — MCP Servers',
      title: 'MCP: conecte o Copilot a ferramentas externas',
      content: [
        'Model Context Protocol é um padrão aberto para conectar modelos a ferramentas externas — bancos de dados, APIs, browsers e CLIs.',
        'No Agent mode, o Copilot chama essas ferramentas automaticamente conforme o contexto.',
      ],
      items: [
        {
          label: 'stdio',
          description: 'Processo local via npx, uvx ou qualquer executável. É o formato mais comum para ferramentas de desenvolvimento.',
          accent: 'primary',
        },
        {
          label: 'http / sse',
          description: 'Servidor remoto via URL. Use headers para auth; ${input:api-key} solicita o valor em runtime.',
          accent: 'primary',
        },
        {
          label: '.vscode/mcp.json',
          description: 'Commitado no repositório, permite que o time inteiro use o mesmo servidor sem configuração extra.',
          accent: 'primary',
        },
        {
          label: 'Sandbox',
          description: 'Restringe filesystem e rede no macOS/Linux. Nunca hardcode API keys no arquivo de config.',
          accent: 'warning',
        },
      ],
      codeBlock: {
        title: 'Exemplo: .vscode/mcp.json (stdio)',
        lines: [
          '{ "servers": { "filesystem": {',
          '  "type": "stdio",',
          '  "command": "npx",',
          '  "args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}"],',
          '  "sandboxEnabled": true } } }',
        ],
      },
      quote: 'Nunca hardcode API keys. Use ${input:variavel} — o VS Code solicita em runtime.',
    },
    {
      id: 'hooks',
      eyebrow: 'Camada 3 — Hooks',
      title: 'Hooks: automação determinística no lifecycle do agente',
      problem:
        'Instruções guiam o modelo. Hooks garantem execução — são comandos shell que rodam em eventos específicos, independente do que o modelo decidiu fazer.',
      content: [
        'Oito eventos cobrem todo o ciclo de vida de uma sessão de agente. Os quatro mais úteis no dia a dia aparecem aqui.',
      ],
      items: [
        {
          label: 'PreToolUse',
          description: 'Antes de qualquer ferramenta. Retorne permissionDecision deny para bloquear ou ask para aprovação manual.',
          accent: 'warning',
        },
        {
          label: 'PostToolUse',
          description: 'Após edição de arquivo. Ideal para rodar Prettier, ESLint ou testes automaticamente.',
          accent: 'primary',
        },
        {
          label: 'SessionStart',
          description: 'Primeiro prompt. Injete versão, branch e runtime info via additionalContext no output JSON.',
          accent: 'primary',
        },
        {
          label: 'Stop',
          description: 'Encerramento da sessão. Gere relatórios ou notificações e verifique stop_hook_active para evitar loop infinito.',
          accent: 'neutral',
        },
      ],
      codeBlock: {
        title: 'Exit codes — o que o hook comunica ao agente',
        lines: [
          'Exit 0 + JSON stdout: injeta contexto ou modifica o input da ferramenta.',
          'Exit 2: bloqueia a operação e exibe mensagem de erro ao modelo.',
          'Qualquer outro exit: emite warning não-bloqueante e o agente continua.',
        ],
      },
      quote: 'Hooks vivem em .github/hooks/*.json (compartilhado) ou .claude/settings.local.json (local).',
    },
    {
      id: 'plugins',
      eyebrow: 'Camada 4 — Plugins (Preview)',
      title: 'Plugins: bundles instaláveis de todas as camadas',
      content: [
        'Um plugin é um container de distribuição — empacota skills, MCP servers, hooks e agentes customizados em um único pacote instalável.',
        'Útil para distribuir uma configuração completa de equipe sem que cada dev configure cada camada individualmente.',
      ],
      items: [
        {
          label: '@agentPlugins',
          description: 'Busque na Extensions Sidebar para descobrir plugins do marketplace.',
          accent: 'primary',
        },
        {
          label: 'Marketplace custom',
          description: 'Adicione repositórios GitHub via chat.plugins.marketplaces. Suporta público, privado e caminhos locais.',
          accent: 'neutral',
        },
        {
          label: 'chat.plugins.paths',
          description: 'Registro local para desenvolvimento. Boolean por caminho: true ativa, false desabilita.',
          accent: 'neutral',
        },
        {
          label: 'Status: Preview',
          description: 'Feature em evolução. Skills e MCP standalone continuam funcionando sem plugins.',
          accent: 'warning',
        },
      ],
    },
    {
      id: 'openai-case',
      eyebrow: 'Caso real — OpenAI Agents SDK',
      title: 'Como a OpenAI usa Skills em produção',
      content: [
        'A OpenAI publicou como usa Skills nos repositórios do Agents SDK, em Python e TypeScript, para escalar throughput sem perder governança.',
      ],
      highlight: {
        value: '+44%',
        label: 'throughput de PRs em 3 meses (316 → 457 merged)',
        tone: 'positive',
      },
      items: [
        {
          label: 'Estrutura',
          description: 'SKILL.md, scripts, references e assets. Scripts para trabalho mecânico; modelo para julgamento.',
          accent: 'primary',
        },
        {
          label: 'Carregamento progressivo',
          description: 'Metadata carrega no startup. SKILL.md completo só na seleção. Scripts só na execução.',
          accent: 'primary',
        },
        {
          label: 'Anti-pattern #1',
          description: 'Description vaga: “Run the mandatory verification stack”. Sempre especifique quando e por quê.',
          accent: 'warning',
        },
        {
          label: 'Anti-pattern #2',
          description: 'Encodar shell recipes em prompts. Mova para scripts — determinismo vence instrução.',
          accent: 'warning',
        },
      ],
      quote: 'O modelo cuida do julgamento. Scripts cuidam do mecânico. Se a IA precisa redescobrir a mesma receita toda vez, isso deveria ser um script.',
    },
  ],

  closing: {
    eyebrow: 'Síntese',
    headline: 'Customização em camadas: do comando ao plugin.',
    formula:
      'Skill para workflow especializado. MCP para ferramentas externas. Hook para garantias de execução. Plugin para distribuição em equipe.',
    quote:
      'O Copilot padrão é um ponto de partida. O que você configura ao redor dele define o que ele consegue fazer.',
  },

  narratorNotes: [
    'Abra mostrando os comandos — a plateia vai reconhecer /fix e /explain. Isso cria familiaridade antes de aprofundar nas camadas.',
    'Em Skills, enfatize o campo description. É o que decide se o modelo vai chamar a skill automaticamente. Description ruim é skill nunca invocada.',
    'Em MCP, mostre o .vscode/mcp.json. Commitado significa que o time inteiro ganha acesso ao servidor sem configuração extra.',
    'Em Hooks, a diferença chave é determinismo. Instrução guia, hook garante. PreToolUse pode bloquear antes de o modelo fazer algo irreversível.',
    'Em Plugins, seja breve — é preview. A mensagem é bundles instaláveis que empacotam tudo em um pacote de equipe.',
    'Feche com o caso OpenAI: +44% de PRs não é mágica. É Skills com progressive disclosure e filosofia clara de quando usar modelo versus script.',
  ],

  labels: {
    notesTerminalTitle: 'narrator://topic17',
    notesTerminalLead: 'Condução sugerida — Copilot na Prática (~7-9 min).',
    notesLinePrefix: 'nota',
    notesTerminalOutro:
      'Fecho: 4 camadas de customização = Copilot calibrado para seu contexto.',
  },
};
