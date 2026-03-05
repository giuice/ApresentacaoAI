# Tópico: Spec-Kit — A Constituição do Projeto
## Tópico: 7
## Bloco: 3 — As Ferramentas
## Título: Spec-Kit — Da Ideia ao PR em 7 Comandos

---

## Conteúdo

### Abertura — O Problema que o Spec-Kit Resolve

Sem uma spec, cada desenvolvedor (humano ou IA) faz suposições diferentes. O PM pensou que "preferências de notificação" significava toggles por canal. O backend construiu um botão liga/desliga. O frontend assumiu integração com notificações do OS. O designer fez um mockup que exigiria reconstruir metade do serviço de usuário.

Isso não é falha de comunicação — é falha de **contexto compartilhado**. E com agentes de IA, o problema multiplica: pesquisa da Red Hat mostrou que IA sem estrutura aumenta a complexidade do código em ~41% e warnings de análise estática em 30%.

O Spec-Kit resolve isso com uma ideia simples e poderosa: **especificação como fonte da verdade**. Não o chat. Não o código. A spec.

> "Specifications don't serve code — code serves specifications."
> — GitHub, Spec-Driven Development

### O que é o Spec-Kit

O Spec-Kit é o toolkit open-source do GitHub para **Spec-Driven Development (SDD)** — uma metodologia onde especificações estruturadas geram implementação, não o contrário.

Lançado em agosto de 2025, acumulou **71.000 GitHub stars** (16k na primeira semana, 40k+ em 2 meses), tornando-se uma das ferramentas de desenvolvedor de crescimento mais rápido. Em fevereiro de 2026, está na versão v0.1.4, com 110 releases, contribuidores de 50+ países e suporte a 22+ plataformas de agentes de IA (Claude Code, Copilot, Cursor, Gemini CLI, Windsurf, Codex e mais).

É **agent-agnostic** — funciona em qualquer IDE ou CI/CD pipeline. Não é uma IDE nova, não é um agente. É uma camada de estrutura que se adiciona ao seu workflow existente.

### A Constituição — O DNA do Projeto

Antes de qualquer linha de código, o Spec-Kit exige que você defina uma **constitution.md** — um documento com princípios imutáveis que todos (humanos e agentes) devem seguir.

Pense nisso como a constituição de um país para o seu projeto. Ela define:

- **Stack obrigatória** — "Toda feature DEVE começar como uma library standalone"
- **Regras de teste** — "NENHUM código de implementação antes que testes unitários existam"
- **Convenções de código** — "CLI-first: toda funcionalidade deve ser acessível via linha de comando"
- **Limites de complexidade** — "Máximo 3 projetos para implementação inicial"
- **Estratégia de commits** — "Toda task completada requer seu próprio commit estruturado"

A constituição é poderosa porque **constrange o comportamento do LLM**. Sem ela, a IA faz suposições plausíveis mas potencialmente incorretas. Com ela, a IA tem guardrails explícitos que previnem over-engineering, inconsistências e desvio arquitetural.

Para organizações, é uma ferramenta para padronizar stacks e convenções entre times — cada projeto herda as mesmas regras fundamentais.

### O Workflow Completo — Da Ideia ao PR em 7 Comandos

Este é o fluxo real do Spec-Kit. Cada etapa produz artefatos que alimentam a próxima, criando uma cadeia de contexto progressivo:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SPEC-KIT WORKFLOW                            │
│                                                                     │
│  ┌──────────────┐                                                   │
│  │ CONSTITUTION │  Princípios imutáveis do projeto                  │
│  │ (uma vez)    │  → constitution.md                                │
│  └──────┬───────┘                                                   │
│         │                                                           │
│         ▼            ┌─────────────────────────────────────┐        │
│  ┌──────────────┐    │  Para cada feature, repita:          │        │
│  │  /speckit    │    │                                     │        │
│  │  .specify    │────│→ spec.md + branch + dir structure   │        │
│  └──────┬───────┘    │                                     │        │
│         │            │                                     │        │
│         ▼            │                                     │        │
│  ┌──────────────┐    │                                     │        │
│  │  /speckit    │    │  (opcional mas recomendado)          │        │
│  │  .clarify    │────│→ Remove ambiguidades, marca gaps    │        │
│  └──────┬───────┘    │                                     │        │
│         │            │                                     │        │
│         ▼            │                                     │        │
│  ┌──────────────┐    │                                     │        │
│  │  /speckit    │────│→ plan.md + research.md +            │        │
│  │  .plan       │    │  data-model.md + contracts/ +       │        │
│  └──────┬───────┘    │  quickstart.md                      │        │
│         │            │                                     │        │
│         ▼            │                                     │        │
│  ┌──────────────┐    │                                     │        │
│  │  /speckit    │────│→ Valida consistência spec↔plan↔     │        │
│  │  .analyze    │    │  constitution (quality gate)        │        │
│  └──────┬───────┘    │                                     │        │
│         │            │                                     │        │
│         ▼            │                                     │        │
│  ┌──────────────┐    │                                     │        │
│  │  /speckit    │────│→ tasks.md com [P] para paralelismo  │        │
│  │  .tasks      │    │  + dependency management            │        │
│  └──────┬───────┘    │                                     │        │
│         │            │                                     │        │
│         ▼            │                                     │        │
│  ┌──────────────┐    │                                     │        │
│  │  /speckit    │────│→ Código + testes por task → PR      │        │
│  │  .implement  │    │                                     │        │
│  └──────────────┘    └─────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────────────┘
```

### Tabela Detalhada do Fluxo

| Etapa | Comando | O que faz | Inputs | Outputs | Checklist interno |
|:---:|---|---|---|---|---|
| **0** | `/constitution` | Define regras imutáveis do projeto. Executado uma vez. | Princípios do time, stack decisions, regras de teste | `constitution.md` | ☐ Princípios de teste definidos ☐ Stack documentada ☐ Convenções de código ☐ Limites de complexidade |
| **1** | `/speckit.specify` | Transforma descrição em linguagem natural numa spec estruturada. Cria branch e estrutura de diretório automaticamente. | Descrição da feature + constitution | `spec.md` + branch git + `specs/[NNN-feature]/` | ☐ User stories com critérios de aceite ☐ `[NEEDS CLARIFICATION]` em toda ambiguidade ☐ Foco no QUE/POR QUÊ, nunca no COMO ☐ NFRs identificados |
| **1.5** | `/speckit.clarify` | Identifica riscos, ambiguidades e gaps na spec. Sugere perguntas ao stakeholder. | `spec.md` | Spec atualizada com clarificações resolvidas | ☐ Zero marcadores `[NEEDS CLARIFICATION]` restantes ☐ Edge cases documentados ☐ Critérios de sucesso mensuráveis |
| **2** | `/speckit.plan` | Gera plano de implementação completo. Inclui fase de research automática (investigação de libraries, benchmarks, compatibilidade). | `spec.md` + `constitution.md` + codebase existente | `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md` | ☐ Phase -1 Gates: Simplicity Gate (≤3 projetos?) ☐ Anti-Abstraction Gate (framework direto?) ☐ Integration-First Gate (contracts definidos?) ☐ Compliance com constitution |
| **2.5** | `/speckit.analyze` | Valida consistência cross-artifact. Verifica alinhamento entre spec, plan, tasks e constitution. Quality gate antes da implementação. | Todos os artefatos anteriores | Relatório de alinhamento + recomendações | ☐ Spec ↔ Plan consistentes ☐ Tasks cobrem todos os requisitos ☐ Constitution respeitada ☐ Sem contradições entre artefatos |
| **3** | `/speckit.tasks` | Quebra o plano em tarefas atômicas, executáveis e testáveis. Marca tarefas independentes com `[P]` para execução paralela. | `plan.md` + `data-model.md` + `contracts/` | `tasks.md` com tasks organizadas por user story | ☐ Tasks ordenadas por dependência ☐ Cada task rastreável a um requisito ☐ Tasks paralelas marcadas [P] ☐ Tasks pequenas o suficiente para um contexto |
| **4** | `/speckit.implement` | Executa tarefas uma a uma (ou em paralelo). Dev revisa código gerado por task. | `tasks.md` + todo contexto anterior | Código + testes + commits por task → PR | ☐ Testes escritos ANTES da implementação ☐ Cada task = 1 commit estruturado ☐ Code review por task ☐ PR pronto para merge |

### Exemplo Prático — Chat em Tempo Real em 15 Minutos

**Abordagem tradicional (~12 horas):**
1. Escrever PRD no Google Docs (2-3h)
2. Criar documentos de design (2-3h)
3. Configurar estrutura do projeto (30min)
4. Escrever especificações técnicas (3-4h)
5. Criar planos de teste (2h)

**Com Spec-Kit (~15 minutos):**

```bash
# Passo 1: Definir a feature (5 min)
/speckit.specify Real-time chat system with message history and user presence

# → Cria automaticamente:
#   - Branch "003-chat-system"
#   - specs/003-chat-system/spec.md (com user stories e critérios de aceite)
#   - Numeração automática de features

# Passo 2: Gerar plano de implementação (5 min)
/speckit.plan WebSocket for real-time messaging, PostgreSQL for history, Redis for presence

# → Gera automaticamente:
#   - specs/003-chat-system/plan.md (arquitetura + decisões técnicas)
#   - specs/003-chat-system/research.md (comparação de libraries WebSocket)
#   - specs/003-chat-system/data-model.md (schemas Message e User)
#   - specs/003-chat-system/contracts/ (eventos WebSocket, endpoints REST)
#   - specs/003-chat-system/quickstart.md (cenários de validação)

# Passo 3: Validar consistência
/speckit.analyze
# → Verifica alinhamento spec ↔ plan ↔ constitution

# Passo 4: Gerar tarefas executáveis (5 min)
/speckit.tasks

# → specs/003-chat-system/tasks.md:
#   Fase 1 — Infrastructure [P]
#     T001: Create Message model + migration
#     T002: Create UserPresence model + migration [P]
#   Fase 2 — API Layer
#     T003: Implement WebSocket connection handler
#     T004: Implement message history REST endpoint [P]
#   Fase 3 — Real-time Features
#     T005: Implement presence tracking with Redis
#     T006: Implement message broadcasting
#   ...

# Passo 5: Implementar
/speckit.implement
# → Executa task por task, com testes antes do código
```

**Resultado em 15 minutos:**
- Spec completa com user stories e critérios de aceite
- Plano de implementação com escolhas tecnológicas documentadas e justificadas
- Contratos de API e modelos de dados prontos para geração de código
- Tasks atômicas com dependências e paralelismo mapeados
- Tudo versionado numa feature branch

### Os 6 Princípios que Constrangem o LLM

Os templates do Spec-Kit não são apenas estrutura — são **prompts sofisticados** que forçam a IA a produzir output de melhor qualidade:

1. **Previnem detalhes prematuros de implementação** — O template de spec instrui: "Foque no QUE e POR QUÊ, nunca no COMO". Isso mantém a spec estável mesmo quando a tecnologia muda.

2. **Forçam marcadores de incerteza** — Em vez de adivinhar, a IA deve marcar `[NEEDS CLARIFICATION]`. Previne o comportamento comum de LLMs de fazer suposições plausíveis mas incorretas.

3. **Checklists como "testes unitários" da spec** — Cada artefato tem uma lista de completude que funciona como um framework de QA para o próprio documento.

4. **Gates de compliance constitucional** — O plan template tem "Phase -1 Gates" que previnem over-engineering: Simplicity Gate (≤3 projetos?), Anti-Abstraction Gate (usando framework direto?), Integration-First Gate (contracts definidos?).

5. **Hierarquia de detalhes** — Detalhes técnicos extensos vão para `implementation-details/`, mantendo o documento principal navegável. A IA aprende a manter níveis de abstração apropriados.

6. **Pensamento test-first obrigatório** — A ordem de criação de arquivos é: contracts → testes → código fonte. A IA pensa em testabilidade ANTES da implementação.

### Estrutura de Arquivos Gerada

```
specs/003-chat-system/
├── spec.md              ← O QUE construir (features, user stories, critérios)
├── plan.md              ← COMO construir (arquitetura, decisões técnicas)
├── research.md          ← Investigação de libraries, benchmarks, compatibilidade
├── data-model.md        ← Schemas, entidades, relações
├── quickstart.md        ← Cenários-chave de validação
├── contracts/           ← Contratos de API (WebSocket events, REST endpoints)
│   ├── websocket-events.md
│   └── rest-api.md
└── tasks.md             ← Tarefas atômicas com dependências e [P] para paralelo
```

### A Visão Honesta — Limitações e Nuances

Para manter credibilidade, é importante reconhecer que o Spec-Kit não é bala de prata:

**O que dizem os críticos:**
- O blog de Scott Logic (nov/2025) testou o Spec-Kit reconstruindo uma feature e descreveu a experiência como "um mar de documentos markdown, tempos longos de execução e fricção inesperada". Concluiu que SDD é um "experimento interessante, uma ideia radical" mas questionou a viabilidade na forma mais pura.
- A equipe de Martin Fowler identificou que mesmo com todos os templates e checklists, agentes frequentemente não seguem todas as instruções. E que SDD funciona melhor para features maiores e projetos greenfield — small bug fixes provavelmente não justificam o overhead.
- O próprio GitHub diz explicitamente: "Spec Kit é um experimento — ainda temos muitas perguntas a responder."

**A resposta pragmática:**
- SDD não precisa ser adotado na forma mais pura (spec-as-source). Há 3 níveis: **spec-first** (escreva a spec, use no desenvolvimento), **spec-anchored** (mantenha a spec atualizada após implementação) e **spec-as-source** (só a spec é editada, código é regenerado). Comece pelo spec-first.
- O overhead inicial de 20-40% se paga em semanas — especialmente em projetos com múltiplos devs ou agentes.
- A constituição sozinha já agrega valor enorme mesmo sem o workflow completo.

**O ponto-chave:** A questão não é "SDD perfeito vs. sem SDD". É que **qualquer nível de especificação estruturada** produz resultados significativamente melhores que vibe coding puro.

### Ecossistema SDD em 2026

O Spec-Kit não está sozinho. O conceito de SDD amadureceu num ecossistema:

- **GitHub Spec-Kit** — O mais puro (spec-as-source), agent-agnostic, 71k stars
- **Amazon Kiro** — IDE dedicada ao SDD, baseada no Code OSS, com Claude Sonnet integrado
- **Tessl** — Startup que empurra a fronteira do spec-as-source
- **Artigo acadêmico arXiv (fev/2026)** — Formalizou 3 níveis de rigor: spec-first, spec-anchored, spec-as-source

Ferramentas de SDD combinadas: 137.000+ GitHub stars. De nicho em 2025 a movimento em 2026.

---

## Métrica de Destaque
**"12 horas de documentação manual → 15 minutos com Spec-Kit. E a spec é executável."**

Métrica secundária: **60% menos PRs rejeitados por arquitetura** quando specs estruturadas são usadas.

---

## Notas do Apresentador

**Abertura (30s):**
"Vocês já viram o slide do Context Rot. Sabem que chat longo com IA é um antipadrão. Agora vamos ver a primeira ferramenta que resolve isso — não com janelas maiores, mas com especificações estruturadas que servem como a ÚNICA fonte da verdade do projeto."

**Constituição (45s):**
"O Spec-Kit começa com uma ideia simples: antes de qualquer linha de código, defina as regras do jogo. Isso se chama constitution.md — e funciona literalmente como uma constituição: princípios imutáveis que todo mundo segue, inclusive a IA. Stack obrigatória, regras de teste, limites de complexidade. Quando a IA tenta over-engineer, a constituição barra. Quando dois devs trabalham em features paralelas, a constituição garante consistência."

**Workflow — mostrar o pipeline animado (90s):**
"O fluxo tem 7 etapas. Deixa eu mostrar como funciona na prática. [apontar para o pipeline]
- Primeiro: /specify — você descreve a feature em linguagem natural. O Spec-Kit cria a spec, a branch e a estrutura de diretórios automaticamente.
- /clarify — remove ambiguidades. Em vez de adivinhar, a IA marca TUDO que não está claro.
- /plan — gera o plano completo: arquitetura, research de libraries, data model, contratos de API. TUDO documentado.
- /analyze — quality gate. Verifica se spec, plan e constitution estão alinhados.
- /tasks — quebra em tarefas atômicas. Marca quais podem rodar em paralelo.
- /implement — executa task por task, com testes ANTES do código.

O resultado? De 12 horas de documentação manual para 15 minutos. E a documentação não é estática — ela gera o código."

**Exemplo do chat (30s):**
"Imagina que você precisa implementar um sistema de chat em tempo real. Com SDD: /specify 'real-time chat with message history'. Em 5 minutos a IA criou a spec com user stories e critérios de aceite. /plan — em mais 5 minutos, plano completo com WebSocket, PostgreSQL, Redis, contratos de API. /tasks — tarefas atômicas com dependências mapeadas. 15 minutos total."

**Nuance/credibilidade (30s):**
"Agora, transparência: isso não é bala de prata. O blog da equipe de Martin Fowler testou e identificou que agentes nem sempre seguem todos os checklists. O próprio GitHub diz que é 'um experimento'. E para bug fixes simples, o overhead provavelmente não se justifica. Mas o ponto é: qualquer nível de especificação estruturada — mesmo começar só com a constituição — já produz resultados dramaticamente melhores que vibe coding puro."

**Fechamento/transição (15s):**
"O Spec-Kit resolve o problema de contexto compartilhado e consistência. Mas e quando o projeto cresce? E quando você precisa de planejamento fase a fase, com contexto fresco a cada execução? Aí entra o GSD."

**Tempo total estimado: ~4 minutos**

---

## Experiência Visual e Interativa

### Elemento Principal: Pipeline Animado do Workflow
- Diagrama tipo pipeline/flowchart vertical que se revela progressivamente
- Cada etapa "acende" com animação ao scroll ou click
- Ao ativar cada etapa, mostra:
  - O comando
  - Uma miniatura dos arquivos gerados (ícones de arquivo aparecendo)
  - O checklist interno da etapa (checkmarks animados)
- Cores: gradient de ciano → verde conforme avança no pipeline
- Estilo: linhas de conexão tipo circuito/tech com glow neon

### Elemento Secundário: Antes vs Depois
- Split screen animado:
  - Esquerda: "Sem Spec" — ícones de caos (PRs rejeitados, arquivos conflitantes, timer mostrando 12h)
  - Direita: "Com Spec-Kit" — pipeline organizado, timer mostrando 15min
- Transição smooth entre os dois estados

### Elemento de Exemplo: Terminal Animado
- Mini terminal estilizado mostrando os comandos do exemplo do chat system
- Typing animation nos comandos
- Output dos arquivos gerados aparecendo como tree structure
- Estilo Matrix/tech com fundo escuro e texto verde/ciano

### Elemento de Credibilidade: Quote Cards
- Cards com citações dos críticos (Scott Logic, Martin Fowler, GitHub)
- Seguido do card de resposta pragmática
- Animação de flip card ou slide lateral

### Métricas Flutuantes
- Números grandes animados (counter up):
  - "71k ⭐" (GitHub stars)
  - "22+ plataformas"
  - "12h → 15min"
  - "60% menos PRs rejeitados"
- Aparecem em pontos estratégicos do scroll

### Tabela do Fluxo Completo
- Tabela estilizada com a tabela detalhada (7 etapas)
- Cada linha tem ícone do comando, cores por tipo de artefato
- Hover/click expande para ver o checklist interno
- Scroll horizontal em mobile se necessário

---

## Fontes

### Do Banco de Métricas (verificadas)
- 71k GitHub stars desde lançamento em agosto 2025 — Ry Walker Research, Augment Code
- 22+ plataformas de agentes IA suportadas — Augment Code
- 110 releases até fev/2026, contribuidores de 50+ países — Augment Code
- 60% menos PRs rejeitados por arquitetura — Banco de Métricas (atribuído ao uso de specs estruturadas)
- IA sem estrutura aumenta complexidade do código em ~41% — Red Hat Developer, out/2025
- Artigo acadêmico arXiv (fev/2026) propõe 3 níveis de rigor SDD — arXiv:2602.00180

### Da Pesquisa Complementar (novas)
- Spec Kit v0.1.4, fev/2026 — IntuitionLabs.ai (intuitionlabs.ai/articles/spec-driven-development-spec-kit)
- Martin Fowler / Birgitta Böckeler: "Understanding SDD: Kiro, spec-kit, and Tessl", 3 níveis de SDD — martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
- Scott Logic: "Putting Spec Kit Through Its Paces: Radical Idea or Reinvented Waterfall?", nov/2025 — blog.scottlogic.com
- Microsoft Developer Blog: "Diving Into Spec-Driven Development With GitHub Spec Kit", set/2025 — developer.microsoft.com
- Rick Hightower (Medium, fev/2026): 4 ferramentas SDD com 137k+ stars combinados — medium.com
- Scalable Path: "Spec-Driven Development Tutorial using GitHub Spec Kit", nov/2025 — scalablepath.com
- GitHub Spec-Kit repo oficial: github.com/github/spec-kit
- Ry Walker Research: rywalker.com/research/github-spec-kit

### Da Documentação do Projeto
- GitHub Spec-Kit Guide (documento do projeto) — workflow completo, 9 artigos da constituição, templates
- Exemplo do chat system: do guide oficial do Spec-Kit (spec-driven.md)