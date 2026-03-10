---
title: 'Topic 17 — Copilot na Prática'
slug: 'topic17-copilot-pratico'
created: '2026-03-10'
status: 'implementation-complete'
stepsCompleted: [1, 2, 3, 4, 5]
tech_stack: [React 19, TypeScript 5 strict, Tailwind CSS 4, Framer Motion 12, Vitest]
files_to_modify:
  - src/data/topic17Data.ts
  - src/components/topics/Topic17.tsx
  - src/__tests__/topic17.test.tsx
code_patterns:
  - TopicReveal/TopicRevealItem para animações de entrada
  - Dados em arquivo separado com interfaces tipadas
  - NarratorToggle alterna content/notes
  - ItemCard com accent colors primary/warning/neutral
  - SectionBlock renderiza NarrativeSection
  - SkillsCaseStudyBlock será removido — integrar como NarrativeSection
test_patterns:
  - Vitest + @testing-library/react
  - render() sem providers (componentes auto-contidos)
  - Testes verificam texto por screen.getByText e data-testid
  - topic17.test.tsx: 3 describe blocks (data, component, CyberProgressBar)
---

# Tech-Spec: Topic 17 — Copilot na Prática

**Created:** 2026-03-10

## Overview

### Problem Statement

O Topic 17 atual mistura conceitos genéricos de governança (threads, plan, fleet, guardrails) com o caso OpenAI Skills. Títulos sensacionalistas ("A velocidade tem um custo escondido", "Quatro comandos que alteram o jogo") tentam convencer em vez de ensinar. O conteúdo não cobre as 4 camadas de customização do Copilot que são o verdadeiro diferencial prático para devs.

### Solution

Reestruturar como guia prático e direto para devs sobre as 4 camadas de customização do Copilot (Skills, MCP Servers, Hooks, Plugins), precedido por uma seção de comandos essenciais, e com o caso OpenAI Skills como seção final de validação. Tom informativo, zero sensacionalismo.

### Scope

**In Scope:**
- Reescrita completa de `src/data/topic17Data.ts` — novas interfaces e novo conteúdo (6 seções)
- Simplificação de `src/components/topics/Topic17.tsx` — remover `SkillsCaseStudyBlock`, usar só `SectionBlock`
- Atualização de `src/__tests__/topic17.test.tsx` — remover testes de `skillsCaseStudy`, adicionar testes para nova estrutura

**Out of Scope:**
- Mudanças em outros tópicos (1–16)
- Novos componentes UI
- Mudanças no design system ou tokens
- Novas dependências npm

---

## Context for Development

### Codebase Patterns

- Topic17 usa `TopicReveal` + `TopicRevealItem` para animações de entrada (sem providers externos)
- Dados separados em `topic17Data.ts` com interfaces tipadas no mesmo arquivo
- Seções narrativas renderizadas via `SectionBlock` — suporta `eyebrow`, `title`, `problem`, `content[]`, `highlight`, `items[]`, `codeBlock`, `quote`
- `ItemCard` renderiza `NarrativeItem` com accent `primary` / `warning` / `neutral`
- `NarratorToggle` alterna `page` entre `'content'` e `'notes'`
- `MatrixTerminal` exibe as notas do narrador na view `notes`
- `GlowDivider` separa seções visualmente

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `src/data/topic17Data.ts` | Dados e interfaces — reescrita completa |
| `src/components/topics/Topic17.tsx` | Componente visual — remover SkillsCaseStudyBlock |
| `src/__tests__/topic17.test.tsx` | Testes — atualizar para nova estrutura |
| `src/components/topics/TopicReveal.tsx` | Padrão de animação — referência, não modificar |
| `_bmad-output/implementation-artifacts/research-topic17-copilot.md` | Fonte do conteúdo das 4 tecnologias |

### Technical Decisions

**TD1 — Remover `SkillsCaseStudy` como tipo separado:**
O tipo `SkillsCaseStudy` e o componente `SkillsCaseStudyBlock` (~160 linhas) têm estrutura única e não reutilizável. Com o novo conteúdo, o caso OpenAI será a 6ª `NarrativeSection` usando `items[]` e `highlight`. Isso simplifica o componente e elimina complexidade desnecessária.

**TD2 — Manter `sections.length >= 6`:**
Nova estrutura = 6 `NarrativeSection` (commands, skills, mcp, hooks, plugins, openai-case). O teste `sections.length >= 6` continua passando sem alteração.

**TD3 — Atualizar testes que referenciam `skillsCaseStudy`:**
Os 3 testes que acessam `topic17Data.skillsCaseStudy` serão reescritos. O teste de dados verificará os 6 IDs de seção. O teste de componente verificará o eyebrow da seção `openai-case`.

**TD4 — Interfaces `NarrativeSection` e `NarrativeItem` não mudam:**
Apenas `SkillsCaseStudy` e `Topic17Data.skillsCaseStudy` são removidos. Todo o restante da interface `Topic17Data` permanece idêntico.

---

## Implementation Plan

### Tasks

- [x] Task 1: Remover `SkillsCaseStudy` interface e campo `skillsCaseStudy` de `Topic17Data`
  - File: `src/data/topic17Data.ts`
  - Action: Deletar o bloco `export interface SkillsCaseStudy { ... }` e o campo `skillsCaseStudy: SkillsCaseStudy` da interface `Topic17Data`
  - Notes: `NarrativeSection`, `NarrativeItem` e o restante de `Topic17Data` (title, subtitle, sections, closing, narratorNotes, labels) permanecem intactos

- [x] Task 2: Reescrever o conteúdo de `topic17Data` com as 6 novas seções
  - File: `src/data/topic17Data.ts`
  - Action: Substituir o `export const topic17Data: Topic17Data = { ... }` completo pelo novo conteúdo conforme especificado em **Seções de Conteúdo** abaixo
  - Notes: Manter `title`, `subtitle`, `closing`, `narratorNotes`, `labels` com novos valores. O campo `sections[]` terá exatamente 6 itens.

- [x] Task 3: Remover `SkillsCaseStudyBlock` e simplificar `Topic17.tsx`
  - File: `src/components/topics/Topic17.tsx`
  - Action:
    1. Deletar o bloco inteiro `const SkillsCaseStudyBlock = ...` (~160 linhas, de `// ─── Skills Case Study Section` até `}`  antes de `// ─── Main Component`)
    2. Remover import de `SkillsCaseStudy` do tipo (se houver)
    3. No componente principal, remover a destructuring de `skillsCaseStudy` e o bloco `<SkillsCaseStudyBlock />`
    4. O loop de `sections.map(...)` já renderiza todas as seções, incluindo a nova `openai-case`
    5. Remover `NeonCard` import se não for mais usado após remoção do bloco
  - Notes: O loop existente `{sections.map((section, i) => <SectionBlock ... />)}` já cobre as 6 seções sem alteração

- [x] Task 4: Atualizar `topic17.test.tsx` para nova estrutura
  - File: `src/__tests__/topic17.test.tsx`
  - Action:
    1. No describe `'topic17Data'`: substituir o teste `'define skills case study ...'` por teste que verifica os 6 IDs de seção esperados: `['commands', 'skills', 'mcp', 'hooks', 'plugins', 'openai-case']`
    2. No describe `'Topic17'`: substituir o teste `'renderiza a secao de skills case study'` por teste que verifica o eyebrow da seção `openai-case` via `screen.getByText(topic17Data.sections.find(s => s.id === 'openai-case')!.eyebrow)`
    3. Manter todos os outros testes existentes sem alteração

---

### Seções de Conteúdo (referência para Task 2)

#### Valores raiz

```
title: "Copilot Customizado"
subtitle: "Comandos essenciais e as 4 camadas de configuração: Skills, MCP, Hooks e Plugins."
```

#### Seção 1 — `commands`

```
eyebrow: "Ponto de entrada"
title: "Comandos que você usa todo dia"
content:
  - "Antes de mergulhar nas camadas de customização, os comandos embutidos do Copilot
     já cobrem a maior parte do trabalho cotidiano."
items:
  - label: "/explain"     description: "Explica o código selecionado com contexto do projeto."             accent: primary
  - label: "/fix"         description: "Corrige bugs no trecho selecionado."                              accent: primary
  - label: "/tests"       description: "Gera testes para o código selecionado."                          accent: primary
  - label: "/doc"         description: "Documenta funções e módulos."                                    accent: primary
  - label: "/create-skill" description: "Cria uma nova skill com ajuda da IA — do zero ou de conversa." accent: neutral
  - label: "/create-hook"  description: "Gera configuração de hook com assistência."                    accent: neutral
  - label: "/skills"      description: "Abre o menu de configuração de skills instaladas."              accent: neutral
  - label: "@workspace"   description: "Inclui o workspace inteiro como contexto na consulta."          accent: neutral
```

#### Seção 2 — `skills`

```
eyebrow: "Camada 1 — Skills"
title: "Skills: instruções empacotadas que carregam sob demanda"
problem: "Custom instructions se aplicam sempre. Skills carregam só quando o contexto
          bate com a description da skill — sem consumir contexto à toa."
content:
  - "Uma skill é uma pasta com SKILL.md (manifesto), scripts/, references/ e assets/.
     O padrão é aberto — funciona no VS Code, Copilot CLI e Copilot coding agent."
  - "O campo description é crítico: define o que a skill faz E quando o modelo deve
     ativá-la automaticamente."
items (campos do frontmatter):
  - label: "name"                      description: "Identificador lowercase único (máx 64 chars).
                                                     Deve coincidir com o nome do diretório."        accent: primary
  - label: "description"               description: "O que faz E quando ativar (máx 1024 chars).
                                                     Chave para auto-invocação pelo modelo."         accent: primary
  - label: "user-invocable"            description: "Aparece como slash command. Padrão: true.
                                                     Use false para skills só-modelo."               accent: neutral
  - label: "disable-model-invocation"  description: "Força invocação manual. Útil para skills
                                                     destrutivas ou que dependem de contexto
                                                     explícito do usuário."                          accent: warning
codeBlock:
  title: "Progressive disclosure — 3 camadas de carregamento"
  lines:
    - "Startup: modelo lê apenas name e description de todas as skills (leve)"
    - "Seleção: SKILL.md completo carrega quando o contexto bate com a description"
    - "Execução: scripts/ e references/ carregam só quando referenciados no SKILL.md"
quote: "Instale quantas skills quiser. Elas não consomem contexto até serem chamadas."
```

#### Seção 3 — `mcp`

```
eyebrow: "Camada 2 — MCP Servers"
title: "MCP: conecte o Copilot a ferramentas externas"
content:
  - "Model Context Protocol é um padrão aberto para conectar modelos a ferramentas externas —
     bancos de dados, APIs, browsers, CLIs. No Agent mode, o Copilot chama essas ferramentas
     automaticamente conforme o contexto."
items:
  - label: "stdio"            description: "Processo local — npx, uvx ou qualquer executável.
                                           Mais comum para ferramentas de desenvolvimento."       accent: primary
  - label: "http / sse"       description: "Servidor remoto via URL. Use headers para auth:
                                           ${input:api-key} solicita o valor em runtime."         accent: primary
  - label: ".vscode/mcp.json" description: "Commitado no repo — o time inteiro usa o mesmo
                                           servidor sem configuração extra."                       accent: primary
  - label: "Sandbox"          description: "Restringe filesystem e rede no macOS/Linux.
                                           Nunca hardcode API keys no arquivo de config."         accent: warning
codeBlock:
  title: "Exemplo: .vscode/mcp.json (stdio)"
  lines:
    - "{ \"servers\": { \"filesystem\": {"
    - "  \"type\": \"stdio\","
    - "  \"command\": \"npx\","
    - "  \"args\": [\"-y\", \"@modelcontextprotocol/server-filesystem\", \"${workspaceFolder}\"],"
    - "  \"sandboxEnabled\": true } } }"
quote: "Nunca hardcode API keys. Use ${input:variavel} — o VS Code solicita em runtime."
```

#### Seção 4 — `hooks`

```
eyebrow: "Camada 3 — Hooks"
title: "Hooks: automação determinística no lifecycle do agente"
problem: "Instruções guiam o modelo. Hooks garantem execução — são comandos shell que
          rodam em eventos específicos, independente do que o modelo decidiu fazer."
content:
  - "8 eventos cobrem todo o ciclo de vida de uma sessão de agente. Os 4 mais úteis no dia a dia:"
items (4 eventos-chave):
  - label: "PreToolUse"   description: "Antes de qualquer ferramenta. Retorne permissionDecision:
                                       'deny' para bloquear ou 'ask' para aprovação manual."     accent: warning
  - label: "PostToolUse"  description: "Após edição de arquivo. Ideal para rodar Prettier, ESLint
                                       ou testes automaticamente."                               accent: primary
  - label: "SessionStart" description: "Primeiro prompt. Injete versão, branch, runtime info
                                       via additionalContext no output JSON."                    accent: primary
  - label: "Stop"         description: "Encerramento da sessão. Gere relatórios ou notificações.
                                       Verifique stop_hook_active para evitar loop infinito."   accent: neutral
codeBlock:
  title: "Exit codes — o que o hook comunica ao agente"
  lines:
    - "Exit 0 + JSON stdout: injeta contexto ou modifica input da ferramenta"
    - "Exit 2: bloqueia a operação e exibe mensagem de erro ao modelo"
    - "Exit outros: emite warning não-bloqueante, agente continua"
quote: "Hooks vivem em .github/hooks/*.json (compartilhado) ou .claude/settings.local.json (local)."
```

#### Seção 5 — `plugins`

```
eyebrow: "Camada 4 — Plugins (Preview)"
title: "Plugins: bundles instaláveis de todas as camadas"
content:
  - "Um plugin é um container de distribuição — empacota skills, MCP servers, hooks e agentes
     customizados em um único pacote instalável. Status: preview (chat.plugins.enabled: true)."
  - "Útil para distribuir uma configuração completa de equipe sem que cada dev configure
     cada camada individualmente."
items:
  - label: "@agentPlugins"        description: "Busque na Extensions Sidebar para descobrir
                                               plugins do marketplace."                        accent: primary
  - label: "Marketplace custom"   description: "Adicione repos GitHub via chat.plugins.marketplaces.
                                               Suporta público, privado e caminhos locais."    accent: neutral
  - label: "chat.plugins.paths"   description: "Registro local para desenvolvimento. Boolean
                                               por caminho: true ativa, false desabilita."     accent: neutral
  - label: "Status: Preview"      description: "Feature em evolução. Skills e MCP standalone
                                               continuam funcionando sem plugins."             accent: warning
```

#### Seção 6 — `openai-case`

```
eyebrow: "Caso real — OpenAI Agents SDK"
title: "Como a OpenAI usa Skills em produção"
content:
  - "A OpenAI publicou como usa Skills nos repositórios do Agents SDK (Python e TypeScript)
     para escalar throughput sem perder governança."
highlight:
  value: "+44%"
  label: "throughput de PRs em 3 meses (316 → 457 merged)"
  tone: positive
items:
  - label: "Estrutura"          description: "SKILL.md + scripts/ + references/ + assets/.
                                             Scripts para trabalho mecânico; modelo para julgamento." accent: primary
  - label: "Progressive disclosure" description: "Metadata carrega no startup. SKILL.md completo
                                                 só na seleção. Scripts só na execução."            accent: primary
  - label: "Anti-pattern #1"    description: "Description vaga: 'Run the mandatory verification
                                             stack'. Sempre especifique quando e por quê."          accent: warning
  - label: "Anti-pattern #2"    description: "Encodar shell recipes em prompts. Mova para scripts/
                                             — determinismo > instrução."                           accent: warning
quote: "O modelo cuida do julgamento. Scripts cuidam do mecânico. Se a IA precisa
       redescobrir a mesma receita toda vez, isso deveria ser um script."
```

#### Closing

```
eyebrow: "Síntese"
headline: "Customização em camadas: do comando ao plugin."
formula: "Skill para workflow especializado. MCP para ferramentas externas. Hook para
          garantias de execução. Plugin para distribuição em equipe."
quote: "O Copilot padrão é um ponto de partida. O que você configura ao redor dele
       define o que ele consegue fazer."
```

#### narratorNotes (6 itens)

```
1. "Abra mostrando os comandos — a plateia vai reconhecer /fix e /explain. Isso cria
    familiaridade antes de aprofundar nas camadas."
2. "Em Skills: enfatize o campo description. É o que decide se o modelo vai chamar a
    skill automaticamente. Description ruim = skill nunca invocada."
3. "Em MCP: mostre o .vscode/mcp.json. Commitado = o time inteiro ganha acesso ao
    servidor sem configuração extra. Esse é o valor real."
4. "Em Hooks: a diferença chave é determinismo. Instrução guia, hook garante. PreToolUse
    pode bloquear antes de o modelo fazer algo irreversível."
5. "Em Plugins: seja breve — é preview. Mensagem: bundles instaláveis que empacotam
    tudo em um pacote de equipe."
6. "Feche com o caso OpenAI: +44% de PRs não é mágica. É Skills com progressive
    disclosure + filosofia clara de quando usar modelo vs script."
```

#### labels

```
notesTerminalTitle: "narrator://topic17"
notesTerminalLead: "Condução sugerida — Copilot na Prática (~7-9 min)."
notesLinePrefix: "nota"
notesTerminalOutro: "Fecho: 4 camadas de customização = Copilot calibrado para seu contexto."
```

---

### Acceptance Criteria

- [x] AC 1: Dado que `topic17Data` é importado, quando verifico `sections.length`, então é exatamente 6 e os IDs são `['commands', 'skills', 'mcp', 'hooks', 'plugins', 'openai-case']` nessa ordem
- [x] AC 2: Dado que `topic17Data` é importado, quando acesso `skillsCaseStudy`, então a propriedade **não existe** (removida da interface e do objeto)
- [x] AC 3: Dado que `<Topic17 />` é renderizado, quando verifico o DOM, então todos os 6 `section.eyebrow` aparecem na tela
- [x] AC 4: Dado que `<Topic17 />` é renderizado, quando verifico o DOM, então **não existe** nenhum elemento com texto do `skillsCaseStudy` antigo (ex: "Progressive Disclosure")
- [x] AC 5: Dado que `<Topic17 />` é renderizado e o usuário clica em "Notas", quando verifico o DOM, então `data-testid="matrix-terminal"` está presente e `sections[0].eyebrow` não está visível
- [x] AC 6: Dado que `<Topic17 />` é renderizado, quando verifico o DOM, então o título `topic17Data.title` ("Copilot Customizado") e o subtítulo estão presentes
- [x] AC 7: Dado que todos os testes são executados com `npm test`, quando o resultado aparece, então **todos passam** sem erros de TypeScript ou runtime
- [x] AC 8: Dado que `npm run build` é executado, quando o build termina, então completa sem erros de tipo ou bundle

---

## Additional Context

### Dependencies

- Nenhuma nova dependência npm — usa apenas o que já está instalado
- Framer Motion já instalado — `whileInView` e `motion.div` continuam em uso via `SectionBlock`

### Testing Strategy

**Testes unitários (automáticos):**
- `topic17.test.tsx` — atualizar conforme Task 4
- Rodar `npm test` após cada task para detectar regressões imediatas

**Verificação manual:**
- Iniciar `npm run dev` e navegar até o Tópico 17
- Verificar scroll das 6 seções com animações corretas
- Verificar toggle Conteúdo / Notas
- Verificar que nenhum conteúdo antigo (threads, fleet, guardrails) aparece

**Build de produção:**
- Rodar `npm run build` ao final — zero erros de tipo e bundle limpo

### Notes

**Risco principal:** `SkillsCaseStudyBlock` tem muitas referências internas. Garantir que a remoção não deixe imports órfãos (`NeonCard` pode ficar sem uso após a remoção).

**Testes do CyberProgressBar:** O terceiro `describe` block em `topic17.test.tsx` testa o CyberProgressBar com `currentTopicIndex={17}` — este teste não muda, é independente do conteúdo do tópico.

---

## Research Consolidado — Fonte de Verdade para o Conteúdo

> **INSTRUÇÃO PARA O AGENTE IMPLEMENTADOR:** As seções abaixo contêm o conteúdo técnico pesquisado diretamente nas documentações oficiais do VS Code. Use este material como base para escrever os textos de `content[]`, `items[]`, `codeBlock` e `quote` de cada seção em `topic17Data.ts`. Não invente dados. Não consulte fontes externas — o conteúdo já está aqui.

---

### R1 — Comandos Essenciais do Copilot

Comandos embutidos disponíveis no chat do Copilot:

| Comando | O que faz |
|---------|-----------|
| `/explain` | Explica o código selecionado com contexto do projeto |
| `/fix` | Corrige bugs no trecho selecionado |
| `/tests` | Gera testes para o código selecionado |
| `/doc` | Documenta funções e módulos |
| `/create-skill` | Cria uma nova skill com ajuda da IA (do zero ou a partir de uma conversa) |
| `/create-hook` | Gera configuração de hook com assistência da IA |
| `/skills` | Abre o menu de configuração de skills instaladas |
| `@workspace` | Inclui o workspace inteiro como contexto na consulta |

---

### R2 — Skills (Agent Skills)

**Fonte oficial:** https://code.visualstudio.com/docs/copilot/customization/agent-skills

**O que são:** Pastas com instruções, scripts e recursos que o Copilot carrega quando relevante. Padrão aberto (agentskills.io) — portável entre VS Code, Copilot CLI e Copilot coding agent.

**Diferença de Custom Instructions:** Skills incluem scripts, exemplos e recursos. Custom instructions focam apenas em diretrizes de código. Skills trabalham em múltiplas plataformas; custom instructions são específicas do VS Code/GitHub.com.

**Estrutura de arquivos:**
```
.github/skills/webapp-testing/
  SKILL.md          ← manifesto obrigatório
  test-template.js  ← referenciado no SKILL.md
  examples/
```

Locais de busca — projeto: `.github/skills/`, `.claude/skills/`, `.agents/skills/`
Locais de busca — pessoal: `~/.copilot/skills/`, `~/.claude/skills/`, `~/.agents/skills/`

**Campos do frontmatter do SKILL.md:**

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `name` | Sim | Identificador lowercase único (máx 64 chars), deve coincidir com o nome do diretório |
| `description` | Sim | O que faz E quando usar (máx 1024 chars) — crítico para auto-invocação |
| `argument-hint` | Não | Hint para uso via slash command |
| `user-invocable` | Não | Aparece como slash command (padrão: true) |
| `disable-model-invocation` | Não | Exige invocação manual apenas (padrão: false) |

**Dois modos de invocação:**
1. **User-Invocable:** Digite `/nome-da-skill` no chat. Pode adicionar contexto: `/webapp-testing para a página de login`
2. **Model-Invocable:** Copilot carrega automaticamente quando o contexto bate com a `description` da skill

**Progressive Disclosure — 3 camadas:**
1. Startup: Copilot lê apenas `name` e `description` de todas as skills (leve, sem custo de contexto)
2. Seleção: SKILL.md completo carrega apenas quando a skill é escolhida ou o contexto bate
3. Execução: Scripts e referências carregam apenas quando o SKILL.md os referencia ativamente

Isso permite ter muitas skills instaladas sem consumir contexto desnecessariamente.

**Gerenciamento:** `/skills` para configurar, `/create-skill` para criar via IA, `chat.agentSkillsLocations` para locais adicionais. Browse: `github/awesome-copilot`, `anthropics/skills`.

---

### R3 — MCP Servers

**Fonte oficial:** https://code.visualstudio.com/docs/copilot/customization/mcp-servers

**O que são:** Model Context Protocol — padrão aberto para conectar modelos a ferramentas e serviços externos. No Agent mode, o Copilot chama essas ferramentas automaticamente conforme o contexto.

**Locais de configuração:**
1. `.vscode/mcp.json` — workspace, commitado, compartilhado com o time
2. User profile global — via `MCP: Open User Configuration`
3. `devcontainer.json` → `customizations.vscode.mcp` — para Dev Containers

**Transportes:**

```jsonc
// stdio — processo local (mais comum para ferramentas de dev)
{
  "servers": {
    "filesystem": {
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
    "remote": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "headers": { "Authorization": "Bearer ${input:api-key}" }
    }
  }
}
```

**Segurança:**
- Sandbox (macOS/Linux): restringe filesystem e rede via `sandboxEnabled`, `sandbox.filesystem.allowWrite`, `sandbox.network.allowedDomains`
- Trust dialog: usuário confirma antes de iniciar servidor; reset via `MCP: Reset Trust`
- **Nunca hardcode API keys** — usar `${input:variavel}` (solicita em runtime) ou variáveis de ambiente
- Workspace Trust: servidores em workspace config respeitam o modelo de Workspace Trust

**Gerenciamento:** `MCP: Add Server`, `MCP: List Servers`, `MCP: Restart Server`. Ferramentas ficam disponíveis no chat — toggle via botão "Configure Tools". Settings Sync para manter config consistente entre máquinas.

---

### R4 — Hooks

**Fonte oficial:** https://code.visualstudio.com/docs/copilot/customization/hooks

**O que são:** Comandos shell que executam em pontos específicos do lifecycle do agente. Automação determinística — ao contrário de instruções que apenas guiam comportamento.

**8 eventos de lifecycle:**

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

**Formato de configuração:**
```json
{
  "hooks": {
    "PreToolUse": [{
      "type": "command",
      "command": "./scripts/check-dangerous.sh",
      "timeout": 10
    }]
  }
}
```
Propriedades: `type` (sempre "command"), `command`, `windows`/`linux`/`osx` (overrides por OS), `cwd`, `env`, `timeout` (padrão: 30s).

**Locais de configuração (precedência):**
1. `.github/hooks/*.json` (projeto, compartilhável)
2. `.claude/settings.local.json` (local, não commitado)
3. `.claude/settings.json` (workspace)
4. `~/.claude/settings.json` (pessoal)

**Exit codes — como o hook se comunica com o agente:**
- **Exit 0:** sucesso — parseia stdout como JSON; pode injetar `additionalContext` ou modificar input
- **Exit 2:** erro bloqueante — para o processamento, exibe mensagem de erro ao modelo
- **Outros:** warning não-bloqueante — agente continua com notificação ao usuário

**PreToolUse — controle de permissão via `hookSpecificOutput`:**
- `permissionDecision`: `"allow"`, `"deny"` ou `"ask"`
- `permissionDecisionReason`: explicação exibida ao usuário
- `updatedInput`: input modificado da ferramenta (opcional)

**PostToolUse:** recebe `tool_name`, `tool_input`, `tool_response` — ideal para rodar Prettier/ESLint após edições de arquivo.

**SessionStart:** injeta contexto via `additionalContext` — versão, branch, runtime info.

**Stop:** verifique `stop_hook_active` no input para evitar loop infinito quando bloqueando.

**Acesso pela UI:** `/hooks` no chat, ou Command Palette → `Chat: Configure Hooks`. `/create-hook` para gerar via IA.

---

### R5 — Plugins

**Fonte oficial:** https://code.visualstudio.com/docs/copilot/customization/agent-plugins

**O que são:** Bundles pré-empacotados de customizações. Status: **preview** — requer `chat.plugins.enabled: true`.

**O que um plugin pode incluir:** slash commands adicionais, agent skills, custom agents (personas + tool configs), hooks, MCP servers.

**Relação com outras features:** Plugins são containers de distribuição — agregam skills, MCP, hooks e agentes em um pacote instalável. Não substituem nenhuma feature individualmente. Skills e MCP standalone continuam funcionando sem plugins.

**Instalação:**
1. Extensions Sidebar → buscar `@agentPlugins`
2. Ou: Chat → ícone de engrenagem → "Plugins" → Install

**Gerenciamento:** View "Agent Plugins - Installed" mostra status (enabled/disabled/uninstalled). Toggle individual por plugin.

**Marketplaces (padrão: `copilot-plugins` e `awesome-copilot`):**
```json
"chat.plugins.marketplaces": ["owner/repo", "https://github.com/org/plugins.git", "file:///local/path"]
```
Suporta GitHub público, privado e caminhos locais.

**Registro local (para desenvolvimento/teste):**
```json
"chat.plugins.paths": {
  "/caminho/para/plugin": true,
  "/plugin-desabilitado": false
}
```

---

### R6 — Caso Real: OpenAI Skills

**Referência:** Publicação da OpenAI sobre uso de Skills nos repos do Agents SDK (Python e TypeScript).

**Estrutura de uma Skill OpenAI:**
- `SKILL.md` — manifesto com name, description e instruções
- `scripts/` — shell scripts para trabalho determinístico (lint, test, format)
- `references/` — documentação e contexto adicional
- `assets/` — materiais de suporte

**Resultados:**
- +44% throughput de PRs: 316 → 457 merged em 3 meses (set–nov 2025 vs dez 2025–fev 2026)
- +72,4% no repo TypeScript: 134 → 231 PRs merged

**Filosofia — Model vs Scripts:**
- Modelo cuida do julgamento: lê código-fonte, compara logs, avalia riscos, produz decisões explicáveis
- Scripts cuidam do mecânico: executa comandos em ordem fixa, coleta logs, busca release tags, expõe helpers

**Anti-patterns (os mais importantes para a apresentação):**
1. Description vaga: "Run the mandatory verification stack" — sem quando/por quê
2. Encodar shell recipes em prompts — mova para `scripts/`
3. Forçar skill usage em todas as tarefas — use condicionalmente
4. Pular o modelo onde julgamento é valioso (comparações, tradeoffs)

**Skills concretas em produção:**
- `code-change-verification` — format + lint + typecheck + tests em mudanças de runtime
- `docs-sync` — audita documentação contra o codebase
- `final-release-review` — compara release tag anterior com candidata atual
- `test-coverage-improver` — analisa cobertura, encontra gaps, propõe testes de alto impacto

**AGENTS.md com triggers automáticos:**
- Se mudança afeta código SDK → chamar `$code-change-verification`
- Antes de editar runtime ou API → chamar `$implementation-strategy`
- Quando finalizar trabalho → chamar `$pr-draft-summary`

**Takeaway:** "O modelo cuida do julgamento. Scripts cuidam do mecânico. Se a IA precisa redescobrir a mesma receita toda vez, isso deveria ser um script."
