# Research: Copilot Customization — Topic 17

**Data:** 2026-03-10
**Fontes:** Documentação oficial VS Code (fetched via WebFetch)

---

## 1. Comandos Essenciais do Copilot

Comandos práticos disponíveis no chat:

- `/explain` — Explica o código selecionado
- `/fix` — Corrige bugs no código selecionado
- `/tests` — Gera testes para o código selecionado
- `/doc` — Documenta o código selecionado
- `/create-skill` — Cria uma nova skill com ajuda da IA (extrai de conversas ou do zero)
- `/create-hook` — Gera configuração de hook com ajuda da IA
- `/skills` — Abre menu de configuração de skills
- `/hooks` — Abre menu de configuração de hooks
- `@workspace` — Inclui o workspace inteiro como contexto

---

## 2. Skills (Agent Skills)

**Fonte:** https://code.visualstudio.com/docs/copilot/customization/agent-skills

### O que são
Pastas com instruções, scripts e recursos que o Copilot carrega quando relevante para executar tarefas especializadas. Standard aberto (agentskills.io) — portável entre VS Code, Copilot CLI e Copilot coding agent.

**Diferença de Custom Instructions:** Skills incluem scripts, exemplos e recursos. Custom instructions focam apenas em diretrizes de código.

### Estrutura de Arquivos
```
.github/skills/
  webapp-testing/
    SKILL.md
    test-template.js
    examples/
```

**Locais de busca:**
- Projeto: `.github/skills/`, `.claude/skills/`, `.agents/skills/`
- Pessoal: `~/.copilot/skills/`, `~/.claude/skills/`, `~/.agents/skills/`

### SKILL.md — Campos do Frontmatter

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `name` | Sim | Identificador lowercase único (máx 64 chars), igual ao nome do diretório |
| `description` | Sim | O que faz E quando usar (máx 1024 chars) — crítico para auto-invocação |
| `argument-hint` | Não | Hint para uso via slash command |
| `user-invocable` | Não | Aparece como slash command (padrão: true) |
| `disable-model-invocation` | Não | Exige invocação manual apenas (padrão: false) |

### Dois Modos de Invocação

1. **User-Invocable (Slash Command):** Digite `/nome-da-skill` no chat. Pode adicionar contexto: `/webapp-testing para a página de login`
2. **Model-Invocable (Automático):** Copilot carrega automaticamente quando o contexto bate com a description da skill

### Progressive Disclosure (3 Camadas)
1. **Descoberta:** Copilot lê apenas `name` e `description` para avaliar relevância
2. **Carregamento:** Corpo completo do SKILL.md só carrega quando selecionada
3. **Recursos:** Scripts e arquivos referenciados carregam só quando necessários

Permite ter muitas skills instaladas sem consumir contexto desnecessariamente.

### Compartilhamento e Boas Práticas
- Browse: `github/awesome-copilot`, `anthropics/skills`
- Revisar skills de terceiros antes de usar (segurança)
- `/create-skill` para gerar via IA
- Extrair skills reutilizáveis de conversas multi-turn
- Configurar locais adicionais via `chat.agentSkillsLocations`

---

## 3. MCP Servers

**Fonte:** https://code.visualstudio.com/docs/copilot/customization/mcp-servers

### O que são
Model Context Protocol — padrão aberto para conectar modelos de IA a ferramentas e serviços externos. MCP servers dão ao Copilot acesso a ferramentas adicionais (DBs, APIs, browsers, CLIs) no Agent mode.

### Locais de Configuração
1. **Workspace:** `.vscode/mcp.json` (commitado — compartilhado com time)
2. **User profile:** Global `mcp.json` (via `MCP: Open User Configuration`)
3. **Dev Container:** `devcontainer.json` → `customizations.vscode.mcp`

### Transportes

```json
// stdio — processo local
{
  "servers": {
    "nome": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}"],
      "sandboxEnabled": true
    }
  }
}

// http — servidor remoto
{
  "servers": {
    "nome": {
      "type": "http",
      "url": "https://mcp.example.com/mcp"
    }
  }
}
```

### Segurança
- **Sandbox (macOS/Linux):** Restringe filesystem e rede via `sandbox.filesystem.allowWrite` e `sandbox.network.allowedDomains`
- **Trust dialog:** Usuário confirma antes de iniciar servidor
- **Input variables:** Nunca hardcodar API keys — usar `${input:variable}` ou env files
- **Revisão:** Verificar publisher e config antes de executar

### Gerenciamento
- `MCP: Add Server` — wizard de configuração
- `MCP: List Servers` — ver status (running/stopped/error) e ferramentas expostas
- `MCP: Restart Server` — reiniciar
- Logs de diagnóstico acessíveis via "MCP: List Servers"
- Ferramentas ficam disponíveis no chat — toggle via botão "Configure Tools"

### Boas Práticas
- `.vscode/mcp.json` para servidores do projeto (time todo usa)
- Settings sync para manter config consistente entre máquinas
- Sandbox para limitar permissões de servidores stdio

---

## 4. Hooks

**Fonte:** https://code.visualstudio.com/docs/copilot/customization/hooks

### O que são
Comandos shell que executam em pontos específicos do lifecycle do agente. Automação determinística — ao contrário de instruções que apenas guiam comportamento.

### 8 Eventos de Lifecycle

| Evento | Trigger | Uso Principal |
|--------|---------|---------------|
| `SessionStart` | Primeiro prompt da sessão | Inicializar recursos, injetar contexto |
| `UserPromptSubmit` | Usuário submete prompt | Auditar, injetar contexto do sistema |
| `PreToolUse` | Antes de invocar ferramenta | Bloquear operações perigosas, modificar inputs |
| `PostToolUse` | Após ferramenta completar | Rodar formatters, lint, testes |
| `PreCompact` | Antes de compactar contexto | Exportar dados importantes |
| `SubagentStart` | Subagente iniciado | Rastrear agentes aninhados |
| `SubagentStop` | Subagente completa | Agregar resultados |
| `Stop` | Sessão encerrada | Relatórios, notificações |

### Formato de Configuração

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/validate.sh",
        "timeout": 15
      }
    ]
  }
}
```

**Propriedades:** `type` (sempre "command"), `command`, `windows`/`linux`/`osx` (overrides), `cwd`, `env`, `timeout` (padrão: 30s)

### Locais de Configuração (ordem de precedência)
1. `.github/hooks/*.json` (projeto, compartilhável)
2. `.claude/settings.local.json` (local, não commitado)
3. `.claude/settings.json` (workspace)
4. `~/.claude/settings.json` (pessoal)

### Comportamento por Exit Code
- **0:** Sucesso — parseia stdout como JSON
- **2:** Erro bloqueante — para processamento
- **Outros:** Warning não-bloqueante — continua com notificação

### PreToolUse — Controle de Permissão
Output `hookSpecificOutput`:
- `permissionDecision`: "allow", "deny" ou "ask"
- `permissionDecisionReason`: Explicação para o usuário
- `updatedInput`: Input modificado (opcional)

### Casos de Uso Práticos
- **Bloquear rm -rf:** PreToolUse filtra `runTerminalCommand` para padrões perigosos
- **Auto-format:** PostToolUse roda Prettier/ESLint após edições
- **Audit log:** SessionStart registra início com timestamp e session ID
- **Injetar contexto:** SessionStart adiciona versão, branch, runtime info
- **Hooks em agentes personalizados (preview):** Definir no frontmatter YAML do agente

---

## 5. Plugins

**Fonte:** https://code.visualstudio.com/docs/copilot/customization/agent-plugins

### O que são
Bundles pré-empacotados de customizações do chat. Status: **preview** (requer `chat.plugins.enabled: true`).

### O que um Plugin pode incluir
- Slash commands adicionais
- Agent skills (skills on-demand)
- Custom agents (personas + tool configs)
- Hooks (automação de lifecycle)
- MCP servers (integrações externas)

**Relação com outras features:** Plugins são containers de distribuição — agregam skills, MCP, hooks e agentes em um pacote instalável. Não substituem nenhuma feature individualmente.

### Instalação
1. Extensions Sidebar → buscar `@agentPlugins`
2. Ou: Chat → ícone de engrenagem → "Plugins"
3. Instalar → fica disponível no perfil do usuário

### Gerenciamento
- View "Agent Plugins - Installed" mostra status (enabled/disabled/uninstalled)
- Toggle individual por plugin

### Marketplaces
Fontes padrão: `copilot-plugins` e `awesome-copilot` repos.
Custom marketplace via `chat.plugins.marketplaces`:

```json
"chat.plugins.marketplaces": ["owner/repo", "https://github.com/org/plugins.git"]
```

### Registro Local (desenvolvimento)
```json
"chat.plugins.paths": {
  "/caminho/para/plugin": true,
  "/plugin-desabilitado": false
}
```

---

## 6. Caso Real: OpenAI Skills (já no topic17Data.ts)

Manter os dados existentes de `skillsCaseStudy` em `topic17Data.ts` — apenas reorganizar como seção final de validação prática.

**Dados-chave a manter:**
- Skill = SKILL.md + scripts/ + references/ + assets/
- Progressive disclosure: 3 layers (metadata → SKILL.md → scripts)
- +44% throughput de PRs (316 → 457 em 3 meses)
- Filosofia: model cuida do julgamento, scripts cuidam do mecânico
- 4 anti-patterns a evitar
- 6 skills concretas em produção
- AGENTS.md com triggers if/then automáticos
