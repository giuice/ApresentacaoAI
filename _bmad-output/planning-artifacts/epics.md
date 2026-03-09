---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
status: complete
date: '2026-03-05'
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# ApresentacaoAI - Epic Breakdown

## Overview

Este documento apresenta o breakdown completo de épicos e histórias para o **ApresentacaoAI**, decompondo os requisitos do PRD, UX Design e Arquitetura em histórias implementáveis.

---

## Requirements Inventory

### Functional Requirements

**Navegação & Fluxo de Apresentação:**
- FR1: Presenter pode avançar para o próximo tópico.
- FR2: Presenter pode voltar para o tópico anterior.
- FR3: Presenter pode abrir/fechar o modo **overview**.
- FR4: Presenter pode selecionar um tópico específico a partir do overview e navegar diretamente até ele.
- FR5: Sistema mantém e exibe (de forma consistente) qual é o tópico atual e o total de tópicos.

**Renderização de Conteúdo por Tópico:**
- FR6: Sistema pode renderizar o conteúdo do Tópico 1.
- FR7: Sistema pode renderizar o conteúdo do Tópico 2.
- FR8: Sistema pode renderizar o conteúdo do Tópico 3.
- FR9: Sistema pode renderizar o conteúdo do Tópico 4.
- FR10: Sistema pode renderizar o conteúdo do Tópico 5.
- FR11: Sistema pode renderizar o conteúdo do Tópico 6.
- FR12: Sistema pode renderizar o conteúdo do Tópico 7.
- FR13: Sistema pode renderizar o conteúdo do Tópico 8.
- FR14: Sistema pode renderizar o conteúdo do Tópico 9.
- FR15: Sistema pode renderizar o conteúdo do Tópico 10.
- FR16: Sistema pode renderizar o conteúdo do Tópico 11.
- FR17: Sistema pode renderizar o conteúdo do Tópico 12.
- FR18: Sistema pode renderizar o conteúdo do Tópico 13.
- FR19: Sistema pode renderizar o conteúdo do Tópico 14.
- FR20: Sistema pode renderizar o conteúdo do Tópico 15.
- FR21: Sistema pode renderizar o conteúdo do Tópico 16.
- FR30: Sistema pode renderizar o conteúdo do Tópico 17 (bônus operacional de Copilot, threads, plan e fleet).

**Transições & Experiência Visual:**
- FR22: Sistema pode realizar transição entre tópicos durante navegação.
- FR23: Sistema pode executar animações/efeitos visuais associados ao tópico quando o tópico entra em foco.
- FR24: Sistema pode exibir um background visual no estilo Matrix de forma consistente durante a apresentação.

**Componentes UI Reutilizáveis:**
- FR25: Sistema pode exibir métricas/destaques numéricos como componentes visuais reutilizáveis (ex.: counters).
- FR26: Sistema pode exibir comparações/quadros informativos usando componentes visuais reutilizáveis (ex.: tabelas/cards).

**Deploy & Operação:**
- FR27: Sistema pode ser construído em um bundle estático para publicação.
- FR28: Usuário pode acessar o app via link (sem autenticação).
- FR29: Sistema opera sem dependência de backend.

---

### NonFunctional Requirements

- NFR1: A aplicação deve atingir **Lighthouse Performance > 90** no ambiente alvo.
- NFR2: Transições entre tópicos devem ocorrer sem "jank" perceptível e mirando **60fps consistente** durante a apresentação.
- NFR3: O background Matrix deve ser **sutil** e não pode degradar a legibilidade nem comprometer a fluidez das transições.
- NFR4: A navegação por teclado deve se manter estável durante uma sessão completa (tópico 1→16) sem exigir refresh para recuperar estado.
- NFR5: A aplicação deve iniciar e permitir navegação imediatamente, sem dependências externas (build estático, sem backend).
- NFR6: Compatível com **Google Chrome (última versão)**.
- NFR7: Legibilidade em projetor é obrigatória: contraste e hierarquia visual devem permitir leitura em ambiente corporativo.

---

### Additional Requirements

**Da Arquitetura:**
- **Starter Template:** Vite (React + TypeScript) — `npm create vite@latest apresentacaoai -- --template react-ts`. A inicialização do projeto é a primeira story de implementação.
- **TypeScript strict:** sem `any`, sem `enum` (usar `as const` + union types).
- **PresentationContext:** `useReducer` com state shape (`currentTopicIndex: number`, `direction: 'next'|'prev'`, `isOverviewOpen: boolean`) e actions (`NEXT`, `PREV`, `GOTO`, `TOGGLE_OVERVIEW`, `SET_DIRECTION`, `INIT_FROM_HASH`).
- **Deep link via URL hash:** formato canônico `#/topic/<n>` (1..16); estado manda, hash espelha; parse na inicialização.
- **Lazy-load:** apenas `Topic1..Topic16` via `React.lazy` + `Suspense`; shell (layout, background, context, navigation, overview) permanece eager.
- **Performance guardrails (não-negociáveis):** animações somente com `transform` e `opacity`; background Matrix em `requestAnimationFrame` com intensidade sutil.
- **Estrutura de pastas obrigatória:** `src/components/{topics,ui,layout}`, `src/contexts`, `src/data`, `src/hooks`, `src/styles`.
- **Conteúdo em `src/data/`:** TypeScript data (PT-BR), separado de UI. `docs/topicos/` permanece como referência humana.
- **Tailwind CSS 4** com tokens via `@theme` em CSS.
- **Framer Motion** para transições e `AnimatePresence`.
- **Vitest + Testing Library:** foco em reducer, keyboard navigation e hash parsing.
- **GitHub Pages** como alvo de deploy (subpath, hash routing).
- Um componente por arquivo; sem barrel exports (`index.ts`).

**Da UX Design:**
- **Keyboard-first:** Setas e Space para navegação; Esc para abrir/fechar overview.
- **AnimatedCounter:** anima de zero ao valor com delay de 0.4s pós-render; variantes `danger` (Red `#FF003C`) e `success` (Matrix Green `#00FF41`).
- **SplitScreen:** divide tela Problema (esquerda/vermelho) vs Solução (direita/verde).
- **LiveTable (Tópico 10):** grid comparativo Spec-Kit vs GSD vs BMAD com hover scanline efeito Matrix e tooltips.
- **DecisionWizard (Tópico 10):** micro-fluxo tipo terminal, perguntas sequenciais → recomendação + trade-off.
- **CyberProgressBar:** rodapé segmentado em 5 blocos (Narrativa, Problemas, Ferramentas, Papel, Impacto) com glow neon.
- **Typewriter effect:** para simulações de código/terminal em tópicos de tools.
- **Paleta:** Background `#000000`/`#0A0A0A`; Matrix Green `#00FF41`; Cyber Red `#FF003C`; Main Text `#F3F4F6`; Muted `#9CA3AF`.
- **Tipografia:** JetBrains Mono/Fira Code (monospace para dados/tech); Inter/Geist (sans-serif para leitura).
- **Responsive Desktop-first:** projetor/desktop como prioridade; tablet utilizável; mobile como fallback vertical (scroll).
- **`prefers-reduced-motion`:** fallback de opacity crossfade sem deslocamento de eixo.
- **Layout:** sem alturas fixas em pixels; usar `vh`/`vw`; fontes em `text-6xl` a `text-9xl` em desktop.

---

### FR Coverage Map

| FR | Épico | Descrição |
|----|-------|-----------|
| FR1 | Epic 1 | Avançar tópico por teclado |
| FR2 | Epic 1 | Voltar tópico por teclado |
| FR3 | Epic 1 | Abrir/fechar overview (Esc) |
| FR4 | Epic 1 | Selecionar tópico pelo overview |
| FR5 | Epic 1 | Exibir tópico atual e total |
| FR6 | Epic 3 | Renderizar Tópico 1 |
| FR7 | Epic 3 | Renderizar Tópico 2 |
| FR8 | Epic 3 | Renderizar Tópico 3 |
| FR9 | Epic 3 | Renderizar Tópico 4 |
| FR10 | Epic 3 | Renderizar Tópico 5 |
| FR11 | Epic 4 | Renderizar Tópico 6 |
| FR12 | Epic 4 | Renderizar Tópico 7 |
| FR13 | Epic 4 | Renderizar Tópico 8 |
| FR14 | Epic 4 | Renderizar Tópico 9 |
| FR15 | Epic 4 | Renderizar Tópico 10 |
| FR16 | Epic 5 | Renderizar Tópico 11 |
| FR17 | Epic 5 | Renderizar Tópico 12 |
| FR18 | Epic 5 | Renderizar Tópico 13 |
| FR19 | Epic 5 | Renderizar Tópico 14 |
| FR20 | Epic 5 | Renderizar Tópico 15 |
| FR21 | Epic 5 | Renderizar Tópico 16 |
| FR30 | Epic 6 | Renderizar Tópico 17 bônus operacional |
| FR22 | Epic 2 | Transições cinemáticas entre tópicos |
| FR23 | Epic 2 | Animações de entrada por tópico |
| FR24 | Epic 2 | Background Matrix consistente |
| FR25 | Epic 3 | Componente AnimatedCounter (counters) |
| FR26 | Epic 3+4 | Componentes SplitScreen, LiveTable, cards |
| FR27 | Epic 1 | Build estático (dist/) |
| FR28 | Epic 1 | Acesso via link sem autenticação |
| FR29 | Epic 1 | Operação sem backend |
| NFR1 | Epic 2 | Lighthouse Performance > 90 |
| NFR2 | Epic 2 | Transições 60fps sem jank |
| NFR3 | Epic 2 | Background Matrix sutil |
| NFR4 | Epic 1 + Epic 6 | Navegação estável 1→17 sem refresh |
| NFR5 | Epic 1 | Inicialização imediata (build estático) |
| NFR6 | Epic 1 | Compatibilidade Chrome |
| NFR7 | Epic 2 | Legibilidade em projetor |

---

## Epic List

### Epic 1: App Shell & Sistema de Navegação
O apresentador pode abrir o app, navegar entre tópicos por teclado (←→/Space), abrir o overview (Esc), saltar para um tópico específico e acessar via link direto (deep link) — o esqueleto funcional da apresentação está operacional.
**FRs cobertos:** FR1, FR2, FR3, FR4, FR5, FR27, FR28, FR29
**NFRs:** NFR4, NFR5, NFR6

### Epic 2: Identidade Visual & Transições Cinematográficas
O app tem a estética Matrix/tech completa (paleta, tipografia, tokens, background digital), transições cinematográficas entre tópicos (Framer Motion) e animações de entrada — a "forma" que valida a autoridade do conteúdo.
**FRs cobertos:** FR22, FR23, FR24
**NFRs:** NFR1, NFR2, NFR3, NFR7

### Epic 3: Bloco 1 & 2 — O Problema (Tópicos 1–5)
O apresentador pode narrar o arco do "Vibe Coding" ao "Context Rot" e à solução inicial com os primeiros 5 tópicos renderizados com animações e métricas impactantes — a audiência sente a dor e a urgência.
**FRs cobertos:** FR6, FR7, FR8, FR9, FR10, FR25, FR26

### Epic 4: Bloco 3 — As Ferramentas (Tópicos 6–10)
O apresentador pode demonstrar a escala de ferramentas (Spec-Kit → GSD → BMAD) com os tópicos 6–10, incluindo a Tabela Viva comparativa e o Wizard de Decisão interativo.
**FRs cobertos:** FR11, FR12, FR13, FR14, FR15, FR25, FR26

### Epic 5: Bloco 4 & 5 — O Novo Papel & CTA (Tópicos 11–16)
O apresentador pode concluir a jornada narrativa principal com os tópicos 11–16 — apresentando o novo papel do desenvolvedor, ROI, Paradoxo do Júnior e o call-to-action final. A jornada base permanece íntegra mesmo com a extensão bônus posterior.
**FRs cobertos:** FR16, FR17, FR18, FR19, FR20, FR21

### Epic 6: Bônus Operacional & Menu Command Center
O apresentador pode acessar um overview com acabamento de command center e concluir a experiência com um Tópico 17 bônus sobre operação prática de Copilot, threads, plan e multiagentes.
**FRs cobertos:** FR4, FR5, FR22, FR23, FR30

---

## Epic 1: App Shell & Sistema de Navegação

O apresentador pode abrir o app, navegar entre tópicos por teclado (←→/Space), abrir o overview (Esc), saltar para um tópico específico e acessar via link direto (deep link) — o esqueleto funcional da apresentação está operacional.

### Story 1.1: Inicialização e Configuração do Projeto

Como desenvolvedor/agente,
Eu quero ter o projeto React + TypeScript inicializado com todas as dependências e configurações corretas,
Para que todos os agentes subsequentes possam trabalhar num ambiente consistente e pronto para desenvolvimento.

**Acceptance Criteria:**

**Given** que o repositório existe
**When** o comando `npm run dev` é executado
**Then** o servidor Vite inicia sem erros e o app abre no browser em `localhost:5173`
**And** nenhum erro de console é exibido na inicialização

**Given** o projeto inicializado
**When** o código TypeScript é compilado
**Then** `tsconfig.json` tem `strict: true` e nenhum erro de tipos é reportado

**Given** o projeto inicializado
**When** `npm run build` é executado
**Then** um bundle estático é gerado em `dist/` sem erros

**Given** a estrutura de pastas
**When** inspecionada
**Then** contém `src/components/topics/`, `src/components/ui/`, `src/components/layout/`, `src/contexts/`, `src/data/`, `src/hooks/`, `src/styles/`
**And** não há arquivos `index.ts` barrel exports

**Given** o Tailwind CSS 4 configurado
**When** classes são aplicadas
**Then** tokens do tema Matrix estão disponíveis via `@theme` em `src/styles/theme.css` (cores, tipografia)

**Given** o Vitest configurado
**When** `npm run test` é executado
**Then** o runner inicializa sem erro

---

### Story 1.2: PresentationContext & Navegação por Teclado

Como apresentador,
Eu quero navegar entre os 16 tópicos usando as teclas ← →, Space e Esc,
Para que eu possa controlar o ritmo da apresentação sem usar o mouse.

**Acceptance Criteria:**

**Given** que o app está aberto no Tópico 1
**When** a tecla → ou Space é pressionada
**Then** `currentTopicIndex` incrementa (máximo: 16) e a action `NEXT` é disparada no reducer

**Given** que o app está aberto no Tópico 5
**When** a tecla ← é pressionada
**Then** `currentTopicIndex` decrementa (mínimo: 1) e a action `PREV` é disparada

**Given** que o app está no Tópico 1
**When** ← é pressionada
**Then** o índice permanece em 1 (sem wraparound)

**Given** que o app está no Tópico 16
**When** → é pressionada
**Then** o índice permanece em 16 (sem wraparound)

**Given** o `PresentationContext`
**When** o estado é inspecionado
**Then** tem shape: `{ currentTopicIndex: number, direction: 'next'|'prev', isOverviewOpen: boolean }`
**And** suporta actions `NEXT`, `PREV`, `GOTO`, `TOGGLE_OVERVIEW`, `SET_DIRECTION`, `INIT_FROM_HASH`

**Given** o reducer
**When** testado via Vitest
**Then** todos os cenários de navegação passam incluindo boundary conditions (índice 1 e 16)

---

### Story 1.3: Shell Layout & CyberProgressBar

Como apresentador,
Eu quero ver o shell da apresentação com o indicador de progresso no rodapé,
Para que eu e a audiência saibamos em qual bloco narrativo estamos durante a apresentação.

**Acceptance Criteria:**

**Given** que o app é aberto
**When** qualquer tópico está ativo
**Then** `PresentationLayout.tsx` envolve o conteúdo com o shell (área de conteúdo central + rodapé)

**Given** o shell renderizado
**When** o `currentTopicIndex` é qualquer valor de 1 a 16
**Then** `CyberProgressBar` no rodapé mostra 5 blocos segmentados e o bloco ativo tem glow verde neon (`#00FF41`)

**Given** que o tópico atual é o 6 (início do Bloco 3 — Ferramentas)
**When** a barra de progresso é inspecionada
**Then** o 3º segmento está ativo/iluminado

**Given** área de conteúdo do shell
**When** renderizada em viewport 1024×768 (simulação de projetor)
**Then** o conteúdo central não ultrapassa os limites visíveis

**Given** os tópicos (Topic1..Topic16) configurados como lazy
**When** o app carrega
**Then** apenas o shell carrega eagerly; tópicos são carregados via `React.lazy` + `Suspense` sob demanda

---

### Story 1.4: Modo Overview (Mapa de Tópicos)

Como apresentador,
Eu quero pressionar Esc para ver todos os 16 tópicos em visão panorâmica e saltar para qualquer um,
Para que eu possa reorientar a apresentação sem perder o fluxo narrativo.

**Acceptance Criteria:**

**Given** que o app está em qualquer tópico
**When** Esc é pressionado
**Then** `isOverviewOpen` muda para `true` e o overlay de overview é exibido

**Given** o overview aberto
**When** Esc é pressionado novamente
**Then** `isOverviewOpen` volta para `false` e o tópico anterior permanece ativo

**Given** o overview visível
**When** renderizado
**Then** todos os 16 tópicos aparecem como cards com número e título (ou placeholder de título)

**Given** o overview aberto
**When** um card de tópico é clicado ou Enter é pressionado com foco nele
**Then** a action `GOTO(topicIndex)` é disparada, overview fecha e o tópico selecionado fica ativo

**Given** o overview aberto
**When** testado em viewport 1280×720
**Then** os 16 cards são legíveis e não há overflow horizontal ou vertical

---

### Story 1.5: Deep Link via URL Hash

Como espectador pós-palestra,
Eu quero acessar um link direto para um tópico específico (ex: `#/topic/8`),
Para que eu possa revisitar partes específicas da apresentação sem navegar do início.

**Acceptance Criteria:**

**Given** que o usuário abre a URL com `#/topic/8`
**When** o app inicializa
**Then** `INIT_FROM_HASH` é disparada e `currentTopicIndex` começa em 8

**Given** um hash inválido (ex: `#/topic/99`, `#/topic/0`, `#foo`)
**When** o app inicializa
**Then** o fallback determinístico é Tópico 1 sem crash ou erro visível

**Given** que o usuário navega do Tópico 3 para o Tópico 4
**When** a navegação ocorre
**Then** a URL atualiza para `#/topic/4` automaticamente (estado manda, hash espelha)

**Given** o hook `useHashSync`
**When** testado via Vitest
**Then** o parse de hash válido, hash inválido e a atualização ao navegar passam nos testes

---

## Epic 2: Identidade Visual & Transições Cinematográficas

O app tem a estética Matrix/tech completa (paleta, tipografia, tokens, background digital), transições cinematográficas entre tópicos (Framer Motion) e animações de entrada — a "forma" que valida a autoridade do conteúdo.

### Story 2.1: Tokens do Tema Matrix & Tipografia

Como desenvolvedor/agente,
Eu quero ter todos os tokens visuais (cores, tipografia) do tema Matrix definidos via Tailwind 4 `@theme`,
Para que todos os componentes usem valores consistentes e a legibilidade em projetor seja garantida.

**Acceptance Criteria:**

**Given** o arquivo `src/styles/theme.css`
**When** inspecionado
**Then** contém tokens: `--color-matrix-green: #00FF41`, `--color-cyber-red: #FF003C`, `--color-bg: #000000`, `--color-bg-secondary: #0A0A0A`, `--color-text-main: #F3F4F6`, `--color-text-muted: #9CA3AF`

**Given** os tokens de tipografia
**When** aplicados
**Then** fonte monospace (JetBrains Mono ou Fira Code) está configurada para títulos/dados e fonte sans-serif (Inter ou Geist) para corpo de texto

**Given** o background da aplicação
**When** renderizado
**Then** usa `#000000` ou `#0A0A0A` como cor de fundo base em toda a aplicação

**Given** texto principal sobre fundo escuro
**When** validado visualmente em projetor simulado
**Then** contraste atinge pelo menos WCAG AA (texto `#F3F4F6` sobre `#000000`)

---

### Story 2.2: Matrix Background (Canvas com RAF)

Como audiência,
Eu quero ver um efeito visual sutil de chuva Matrix no background,
Para que a estética tech seja mantida sem comprometer a legibilidade do conteúdo.

**Acceptance Criteria:**

**Given** o app renderizado
**When** qualquer tópico está ativo
**Then** `MatrixBackground.tsx` exibe caracteres verdes fluindo no background via `requestAnimationFrame`

**Given** o background Matrix em execução
**When** o conteúdo do tópico está visível
**Then** o efeito é sutil e o texto do tópico permanece totalmente legível sem sobreposição prejudicial

**Given** o background em execução durante sessão completa (1→16)
**When** a performance é observada
**Then** não causa degradação perceptível do FPS nas transições entre tópicos

**Given** o componente `MatrixBackground`
**When** desmontado
**Then** o loop RAF é cancelado sem memory leak

**Given** o guardrail de performance
**When** o background está ativo
**Then** usa somente propriedades GPU-friendly (`transform`, `opacity`) para animar elementos

---

### Story 2.2b: Matrix Background — Visibilidade garantida (Reduced Motion)

Como apresentador/audiência,
Eu quero que o background Matrix continue **visível** mesmo quando `prefers-reduced-motion` estiver ativo,
Para que a identidade visual Matrix/tech não desapareça em ambientes corporativos onde animações podem estar desabilitadas por política/OS.

**Acceptance Criteria:**

**Given** que o usuário está com `prefers-reduced-motion: reduce` ativo no SO/browser
**When** o app renderiza qualquer tópico
**Then** o `MatrixBackground.tsx` ainda renderiza um background Matrix **estático e sutil** (sem loop de animação)

**Given** que `prefers-reduced-motion` está ativo
**When** o background é renderizado
**Then** **não** inicia o loop de `requestAnimationFrame` (sem animação contínua)

**Given** que o app está em modo normal (sem reduced motion)
**When** o app renderiza qualquer tópico
**Then** o background Matrix anima via RAF como definido na Story 2.2, sem degradar legibilidade

**Given** que o usuário alterna a preferência de reduced motion enquanto o app está aberto
**When** a mudança ocorre
**Then** o background troca corretamente entre animado (RAF) e estático, com cleanup correto (sem leak)

---

### Story 2.3: Transições Cinematográficas entre Tópicos

Como apresentador,
Eu quero que a troca entre tópicos aconteça com uma transição suave e direcional,
Para que a narrativa flua cinematicamente sem jank ou "piscar" de tela.

**Acceptance Criteria:**

**Given** que o apresentador pressiona → (próximo tópico)
**When** a transição ocorre
**Then** o tópico atual desliza para a esquerda e o novo tópico entra pela direita usando `transform: translateX`

**Given** que o apresentador pressiona ← (tópico anterior)
**When** a transição ocorre
**Then** o tópico atual desliza para a direita e o anterior entra pela esquerda

**Given** a transição acontecendo
**When** medida
**Then** usa somente `transform` e `opacity`, mantendo 60fps sem jank perceptível

**Given** o usuário com `prefers-reduced-motion` ativo no SO
**When** a transição ocorre
**Then** o comportamento é um crossfade simples de opacity sem deslocamento de eixo

**Given** `AnimatePresence` do Framer Motion configurado
**When** o `currentTopicIndex` muda
**Then** o componente de saída anima para fora antes do novo componente animar para dentro

---

### Story 2.4: Animações de Entrada por Tópico

Como audiência,
Eu quero que os elementos visuais de cada tópico se revelem progressivamente após a transição,
Para que minha atenção seja guiada naturalmente para os dados chave sem esforço do apresentador.

**Acceptance Criteria:**

**Given** que um novo tópico entra em foco
**When** a transição de entrada estabiliza
**Then** os elementos do tópico (título, conteúdo, métricas) aparecem com delay mínimo de `0.4s` após o início da transição

**Given** o padrão de animação de entrada
**When** implementado em qualquer tópico
**Then** usa variantes do Framer Motion definidas fora do corpo do componente (evitar re-criação a cada render)

**Given** animações de entrada configuradas
**When** o tópico está estável na tela
**Then** todos os elementos estão totalmente visíveis e legíveis sem nenhum elemento "preso" em estado intermediário

**Given** múltiplos elementos com animações escalonadas
**When** renderizados
**Then** delays são definidos via `staggerChildren` ou delays explícitos nas variantes, nunca via `setTimeout` impuro

---

## Epic 3: Bloco 1 & 2 — O Problema (Tópicos 1–5)

O apresentador pode narrar o arco do "Vibe Coding" ao "Context Rot" e à solução inicial com os primeiros 5 tópicos renderizados com animações e métricas impactantes.

### Story 3.1: Componente AnimatedCounter

Como audiência,
Eu quero ver métricas numéricas animando de zero até o valor final quando um tópico entra em foco,
Para que os dados de impacto causem uma impressão emocional forte no momento certo.

**Acceptance Criteria:**

**Given** o componente `AnimatedCounter` montado com `value={88}` e `variant="danger"`
**When** o tópico entra em foco
**Then** o número anima de 0 até 88 com easing suave após delay de 0.4s

**Given** `variant="danger"`
**When** renderizado
**Then** o counter usa a cor `#FF003C` (Cyber Red)

**Given** `variant="success"`
**When** renderizado
**Then** o counter usa a cor `#00FF41` (Matrix Green)

**Given** o counter animando
**When** a animação ocorre
**Then** usa somente `transform` e `opacity` para o reveal; o número é interpolado via Framer Motion

**Given** o usuário com `prefers-reduced-motion` ativo
**When** o counter monta
**Then** o valor final é exibido imediatamente sem animação

---

### Story 3.2: Sistema de Composição dos Tópicos (Design System + Notas do Narrador)

Como apresentador,
Eu quero um padrão obrigatório de composição para todos os tópicos do Story 3.2 em diante,
Para que cada tópico mantenha identidade visual, criatividade orientada por roteiro e suporte ao narrador sem quebrar layout.

**Acceptance Criteria:**

**Given** qualquer tópico dos Stories 3.3 a 5.6
**When** implementado
**Then** deve usar componentes do design system já existentes (ex.: `TopicReveal`, `AnimatedCounter`, `NeonCard`, `SplitScreen`, `MatrixTerminal`, `LiveTable`, `GlowDivider`, `NarratorToggle`) conforme o objetivo narrativo do tópico

**Given** qualquer tópico dos Stories 3.3 a 5.6
**When** renderizado
**Then** deve possuir duas páginas internas: Página 1 (conteúdo principal) e Página 2 (notas do narrador)

**Given** a Página 2 (notas do narrador)
**When** exibida
**Then** as notas devem ser reescritas como lembretes de fala (tom conversacional para apresentação), baseadas no roteiro do tópico

**Given** tópicos dos Stories 3.3 a 5.6
**When** implementados
**Then** não podem usar `PlaceholderTopic` como conteúdo final de tópico

**Given** viewport de projetor `1024x728`
**When** qualquer tópico estiver ativo
**Then** o conteúdo principal e controles da página não podem ficar cortados horizontal ou verticalmente

**Given** um tópico da apresentação
**When** inspecionado
**Then** o conteúdo vem de `src/data/topicNData.ts` (ou arquivo de dados equivalente por tópico), nunca hardcoded no JSX

---

#### Diretriz de Criatividade Visual (OBRIGATÓRIA)

**Cada tópico DEVE ter layout, composição e experiência visual ÚNICOS.** Copiar a mesma estrutura (ex.: título + grid 2-col + cards + talking points) entre tópicos é proibido. Agentes devem usar os componentes do design system de formas variadas e criativas:

**Variações obrigatórias entre tópicos:**
- Layout geral (hero centralizado vs grid assimétrico vs vertical timeline vs staircase vs SplitScreen)
- Forma de exibir métricas (counter solo hero vs trio horizontal vs integrado em cards)
- Posicionamento do título (topo centralizado vs lateral vs sobre o conteúdo)
- Exibição de dados de suporte (NeonCards vs timeline vs tabela vs badges inline)

**Para a Página 2 (Notas do Narrador) — criatividade equivalente:**
- Cada tópico deve apresentar suas notas de forma DIFERENTE e tematicamente conectada ao conteúdo
- Exemplos válidos: MatrixTerminal (estilo log de sistema), NeonCards scrolláveis (briefing de pesquisa), SplitScreen (o que dizer vs cuidados), painel scrollável com GlowDividers entre seções, lista estilizada com bordas de acento
- Cada dado (`topicNData.ts`) inclui campo `narratorNotes: string[]` com texto conversacional para a Página 2
- O componente `NarratorToggle` fornece botões consistentes para trocar entre páginas sem impor layout

**Anti-patterns proibidos:**
- Template único copiado entre tópicos (mesmo que funcional)
- Todos os tópicos com grid 2-col + cards à direita + counter à esquerda
- Notas do narrador usando sempre o mesmo componente (ex.: sempre MatrixTerminal)
- Layout simétrico em todos os tópicos (nunca ter mais de 2 tópicos consecutivos com mesmo padrão de grid)

---

### Story 3.3: Tópico 1 — Hook: O Problema (88%)

Como audiência,
Eu quero ver o Tópico 1 com o counter de 88% animado e a estética Matrix impactante,
Para que nos primeiros 30 segundos fique claro que não é um PowerPoint comum.

**Direção Criativa:** Layout "alarme de emergência" — o counter 88% é HERO central dominante que rouba a cena. Definição e analogia aparecem abaixo como texto imersivo. Cards de dados de suporte empilhados lateralmente como "relatórios de incidente". Página 2 usa um painel scrollável com estilo "briefing de segurança" (seções numeradas com border-left de acento danger, separadas por GlowDividers).

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 1
**When** o tópico entra em foco
**Then** `Topic1.tsx` é renderizado com título, subtítulo e `AnimatedCounter` mostrando 88% em `variant="danger"`

**Given** o Tópico 1 renderizado
**When** visualizado em viewport 1280×720
**Then** o número 88% é visível em tamanho grande (mínimo `text-8xl`) e legível sobre o fundo escuro

**Given** o conteúdo do Tópico 1
**When** exibido
**Then** vem de `src/data/topic1Data.ts` (não hardcoded no componente)

**Given** o componente `Topic1.tsx`
**When** inspecionado
**Then** usa lazy-load configurado no Epic 1 e não importa de `docs/topicos/`

**Given** o Tópico 1
**When** em modo de apresentação
**Then** deve oferecer Página 1 (conteúdo) e Página 2 (notas do narrador via `narratorNotes` em topic1Data.ts)

---

### Story 3.4: Tópico 2 — Vibe Coding: A Escada Quebrada

Como audiência,
Eu quero ver o Tópico 2 ilustrando o ciclo vicioso do Vibe Coding,
Para que eu entenda visualmente por que a abordagem sem método falha.

**Direção Criativa:** Layout "triple reveal" — três AnimatedCounters lado a lado (+24% expectativa, +20% percepção, -19% realidade) com reveal progressivo. Hero gap de 43pts como destaque central abaixo. NeonCards de suporte em linha horizontal ao invés de coluna. Página 2 usa NeonCards scrolláveis em formato de "diário de pesquisa" — cada nota é um card independente com variant danger.

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 2
**When** o tópico entra em foco
**Then** `Topic2.tsx` é renderizado com o conteúdo do Vibe Coding (título, analogia da "casa sem planta", dados)

**Given** o Tópico 2 renderizado
**When** visualizado
**Then** conteúdo vem de `src/data/topic2Data.ts` e é legível em projetor

**Given** as animações de entrada do Tópico 2
**When** o tópico estabiliza
**Then** elementos entram com delay escalonado respeitando o padrão ≥0.4s do Epic 2

**Given** o Tópico 2
**When** renderizado
**Then** usa layout único com triple counter e inclui Página 2 com notas do narrador via NeonCards

---

### Story 3.5: Tópico 3 — Context Rot

Como audiência,
Eu quero ver o Tópico 3 com a visualização da degradação progressiva do contexto,
Para que o "Aha!" moment de identificação com o problema aconteça.

**Direção Criativa:** Layout "timeline de degradação" — 4 zonas de contexto como barras horizontais com degradê visual (verde → amarelo → laranja → vermelho). Analogia do Alzheimer como quote estilizado. Counter 99% hero no topo. Sem grid convencional — usar layout todo vertical com as zonas como uma "barra de progresso da degradação". Página 2 usa MatrixTerminal — tematicamente perfeito para "contexto decaindo" (linhas aparecendo como logs do sistema perdendo coerência).

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 3
**When** o tópico entra em foco
**Then** `Topic3.tsx` é renderizado mostrando a degradação progressiva do contexto (0% → 70%+)

**Given** a métrica de degradação
**When** exibida
**Then** usa `AnimatedCounter` com `variant="danger"` animando de 0 a 99

**Given** o Tópico 3 renderizado
**When** inspecionado
**Then** conteúdo vem de `src/data/topic3Data.ts`

**Given** o Tópico 3
**When** em apresentação
**Then** possui Página 2 com notas do narrador via MatrixTerminal temático

---

### Story 3.6: Tópico 4 — Context Engineering

Como audiência,
Eu quero ver o Tópico 4 introduzindo o conceito de Context Engineering como solução,
Para que a virada narrativa do Problema para a Solução seja clara e impactante.

**Direção Criativa:** Layout "escada ascendente" — 4 NeonCards de nível dispostos horizontalmente como degraus (de opaco/escuro no nível 1 até glow brilhante no nível 3/4). Hero metric 55% no topo com accent success. A virada vermelho→verde é marcante: este é o primeiro tópico SUCCESS dopo três DANGER. Página 2 usa SplitScreen: lado esquerdo "O que enfatizar" (verde), lado direito "Cuidados e armadilhas" (muted), dando contexto prático ao apresentador.

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 4
**When** o tópico entra em foco
**Then** `Topic4.tsx` é renderizado com definição e pilares do Context Engineering

**Given** o Tópico 4 renderizado
**When** visualizado
**Then** contraste visual muda do tom "perigo" (vermelho) para tom "solução" (verde) — marcando a virada narrativa

**Given** o Tópico 4
**When** inspecionado
**Then** conteúdo vem de `src/data/topic4Data.ts`

**Given** o Tópico 4
**When** renderizado
**Then** usa layout de escada ascendente com duas páginas (conteúdo + notas via SplitScreen)

---

### Story 3.7: Tópico 5 — Spec-Driven Development

Como audiência,
Eu quero ver o Tópico 5 com o SplitScreen comparando Vibe Coding vs Spec-Driven,
Para que a diferença de abordagens seja visualmente óbvia e os ganhos de velocidade impactantes.

**Direção Criativa:** Layout com SplitScreen (já único entre os tópicos — mantém). Hero counters duplos (26.08% + 55%) acima do split. Página 2 usa um painel estilo "spec/blueprint" — texto estruturado em seções com headings mono, GlowDividers entre seções, visual de documento técnico scrollável (como se fosse a própria spec servindo de roteiro).

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 5
**When** o tópico entra em foco
**Then** `Topic5.tsx` usa `SplitScreen` com lado esquerdo (Vibe Coding, vermelho) e lado direito (Spec-Driven, verde)

**Given** o Tópico 5 renderizado
**When** os contadores aparecem
**Then** `AnimatedCounter` mostra métricas de ganho (ex: +26.08%, +55%) em `variant="success"`

**Given** o Tópico 5
**When** inspecionado
**Then** conteúdo vem de `src/data/topic5Data.ts` e componentes vêm de `src/components/ui/`

**Given** o Tópico 5
**When** em apresentação
**Then** deve incluir Página 2 com notas do narrador estilo blueprint/spec scrollável

---

## Epic 4: Bloco 3 — As Ferramentas (Tópicos 6–10)

O apresentador pode demonstrar a escala de ferramentas (Spec-Kit → GSD → BMAD) com os tópicos 6–10, incluindo a Tabela Viva comparativa e o Wizard de Decisão interativo.

### Story 4.1: Tópico 6 — Spec-Kit: A Especificação como Código

Como audiência,
Eu quero ver o Tópico 6 apresentando o Spec-Kit como a primeira ferramenta prática,
Para que eu entenda o conceito de "spec como planta arquitetônica executável".

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 6
**When** o tópico entra em foco
**Then** `Topic6.tsx` é renderizado com definição, caso de uso e benefícios do Spec-Kit

**Given** o Tópico 6 renderizado
**When** visualizado em projetor
**Then** conteúdo é legível e vem de `src/data/topic6Data.ts`

**Given** as animações de entrada do Tópico 6
**When** o tópico estabiliza
**Then** elementos entram com delay escalonado ≥0.4s

**Given** o Tópico 6
**When** finalizado
**Then** usa composição criativa com design system e inclui Página 2 de notas do narrador

---

### Story 4.2: Tópico 7 — GSD: Do Caos ao Workflow

Como audiência,
Eu quero ver o Tópico 7 apresentando o GSD como evolução do Spec-Kit,
Para que eu entenda quando e por que escalar para um workflow estruturado.

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 7
**When** o tópico entra em foco
**Then** `Topic7.tsx` é renderizado com posicionamento do GSD na escala de ferramentas

**Given** o Tópico 7 renderizado
**When** visualizado
**Then** conteúdo vem de `src/data/topic7Data.ts` e é legível

**Given** as animações de entrada
**When** o tópico estabiliza
**Then** elementos entram com delay escalonado ≥0.4s

**Given** o Tópico 7
**When** finalizado
**Then** possui Página 2 de notas do narrador com foco em quando escalar de Spec-Kit para GSD

---

### Story 4.3: Tópico 8 — GSD em Ação (Typewriter Effect)

Como audiência,
Eu quero ver o Tópico 8 com uma simulação de terminal mostrando o GSD rodando,
Para que eu visualize de forma concreta como o workflow funciona na prática.

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 8
**When** o tópico entra em foco
**Then** `Topic8.tsx` é renderizado com simulação de terminal digitando comandos GSD

**Given** a simulação de terminal
**When** ativa
**Then** o texto aparece via typewriter effect (caractere por caractere) em fonte monospace verde sobre fundo escuro

**Given** o typewriter effect
**When** em execução
**Then** a velocidade de digitação é rápida (simula output de LLM) e o efeito não bloqueia a interação do teclado

**Given** o Tópico 8
**When** inspecionado
**Then** conteúdo do terminal vem de `src/data/topic8Data.ts`

**Given** o Tópico 8
**When** apresentado
**Then** utiliza `MatrixTerminal` (ou componente terminal equivalente do design system) na Página 1 e notas do narrador na Página 2

---

### Story 4.4: Tópico 9 — BMAD: Times Multi-Agente

Como audiência,
Eu quero ver o Tópico 9 apresentando o BMAD como a solução mais completa,
Para que eu entenda o salto de um dev solo para um time virtual de agentes.

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 9
**When** o tópico entra em foco
**Then** `Topic9.tsx` é renderizado com posicionamento do BMAD e métricas de escala

**Given** o Tópico 9 renderizado
**When** visualizado
**Then** conteúdo vem de `src/data/topic9Data.ts`

**Given** as animações de entrada
**When** o tópico estabiliza
**Then** elementos entram com delay escalonado ≥0.4s

**Given** o Tópico 9
**When** renderizado
**Then** mantém padrão de duas páginas e reforça visualmente o conceito de orquestração multi-agente

---

### Story 4.5: Componente LiveTable (Tabela Viva)

Como audiência,
Eu quero ver uma tabela comparativa interativa (Spec-Kit vs GSD vs BMAD) com hover e tooltips,
Para que a decisão de qual ferramenta usar seja visualmente óbvia sem o apresentador precisar explicar cada célula.

**Acceptance Criteria:**

**Given** o componente `LiveTable` com dados de comparação das 3 ferramentas
**When** renderizado
**Then** exibe grid com linhas (dimensões de comparação) e colunas (Spec-Kit, GSD, BMAD)

**Given** o `LiveTable` em estado padrão
**When** o cursor passa sobre uma célula (hover)
**Then** a célula recebe efeito scanline Matrix (linha horizontal animada) e destaque de borda verde

**Given** células com informação adicional configuradas com tooltip
**When** o hover ocorre
**Then** um tooltip aparece com texto explicativo da célula

**Given** o `LiveTable`
**When** renderizado em viewport de projetor
**Then** todas as células são legíveis sem overflow horizontal

---

### Story 4.6: Componente DecisionWizard (Wizard Terminal)

Como espectador pós-palestra,
Eu quero responder a perguntas sequenciais e receber uma recomendação personalizada de ferramenta,
Para que eu possa descobrir qual ferramenta faz sentido para meu contexto sem precisar do apresentador.

**Acceptance Criteria:**

**Given** o componente `DecisionWizard` renderizado
**When** o usuário vê a primeira pergunta
**Then** as opções de resposta (A/B/C ou similar) são exibidas como botões clicáveis ou focáveis por teclado

**Given** o usuário responde uma pergunta
**When** a resposta é selecionada
**Then** a próxima pergunta aparece com animação de entrada (typewriter ou fade)

**Given** o usuário completa todas as perguntas
**When** a última resposta é dada
**Then** uma recomendação (Spec-Kit, GSD ou BMAD) é exibida com trade-offs e próximo passo sugerido

**Given** o wizard em qualquer etapa
**When** o usuário pressiona teclado (Enter para confirmar, Esc para reiniciar)
**Then** a navegação interna do wizard funciona sem interferir com a navegação global da apresentação

**Given** o estado interno do wizard
**When** o tópico é desmontado e remontado
**Then** o wizard reinicia do início (sem persistência de estado entre visitas)

---

### Story 4.7: Tópico 10 — Qual Ferramenta Usar?

Como apresentador,
Eu quero apresentar o Tópico 10 com a LiveTable e o DecisionWizard integrados,
Para que a audiência visualize a comparação e os pós-palestra possam tomar a decisão de forma autônoma.

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 10
**When** o tópico entra em foco
**Then** `Topic10.tsx` é renderizado com `LiveTable` e `DecisionWizard` visíveis

**Given** o Tópico 10 renderizado
**When** apresentado ao vivo
**Then** a `LiveTable` é o elemento principal exibido inicialmente; o `DecisionWizard` está acessível (scroll ou tab)

**Given** o Tópico 10
**When** inspecionado
**Then** conteúdo e dados da tabela/wizard vêm de `src/data/topic10Data.ts`

**Given** o Tópico 10 com os dois componentes avançados
**When** renderizado
**Then** o Lighthouse Performance permanece > 90 (componentes não adicionam peso excessivo)

**Given** o Tópico 10
**When** apresentado
**Then** além de `LiveTable` e `DecisionWizard`, deve oferecer Página 2 com notas do narrador para condução da decisão em tempo real

---

## Epic 5: Bloco 4 & 5 — O Novo Papel & CTA (Tópicos 11–16)

O apresentador pode concluir a jornada narrativa completa com os tópicos 11–16 — apresentando o novo papel do desenvolvedor, ROI, Paradoxo do Júnior e o call-to-action final.

### Story 5.1: Tópico 11 — O Novo Desenvolvedor

Como audiência,
Eu quero ver o Tópico 11 reposicionando o papel do desenvolvedor na era da IA,
Para que eu entenda que a IA não substitui o dev mas amplifica quem usa método.

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 11
**When** o tópico entra em foco
**Then** `Topic11.tsx` é renderizado com o reposicionamento do papel do desenvolvedor

**Given** o Tópico 11 renderizado
**When** visualizado em projetor
**Then** conteúdo vem de `src/data/topic11Data.ts` e é legível

**Given** as animações de entrada
**When** o tópico estabiliza
**Then** elementos entram com delay escalonado ≥0.4s

**Given** o Tópico 11
**When** finalizado
**Then** inclui Página 2 com notas do narrador focadas no reposicionamento de papel

---

### Story 5.2: Tópico 12 — ROI e Métricas de Impacto

Como Engineering Manager/CTO,
Eu quero ver o Tópico 12 com métricas de ROI e eficiência,
Para que eu possa justificar o investimento em ferramentas e metodologia para minha organização.

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 12
**When** o tópico entra em foco
**Then** `Topic12.tsx` é renderizado com métricas de ROI e ganhos de eficiência

**Given** métricas numéricas no Tópico 12
**When** o tópico entra em foco
**Then** usa `AnimatedCounter` com `variant="success"` para os ganhos positivos

**Given** o Tópico 12
**When** inspecionado
**Then** conteúdo vem de `src/data/topic12Data.ts`

**Given** o Tópico 12
**When** apresentado
**Then** possui Página 2 com notas do narrador orientadas a público executivo (EM/CTO)

---

### Story 5.3: Tópico 13 — O Paradoxo do Júnior

Como desenvolvedor júnior/pleno,
Eu quero ver o Tópico 13 abordando o paradoxo de competir com IA + senior,
Para que eu entenda que método é o diferencial e não a experiência bruta.

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 13
**When** o tópico entra em foco
**Then** `Topic13.tsx` é renderizado com o paradoxo e a resolução via metodologia

**Given** o Tópico 13 renderizado
**When** visualizado
**Then** conteúdo vem de `src/data/topic13Data.ts` e é legível em projetor

**Given** o Tópico 13
**When** finalizado
**Then** segue padrão de duas páginas com notas do narrador para conduzir o “Aha!” sem tom alarmista

---

### Story 5.4: Tópico 14 — Posicionamento de Carreira

Como desenvolvedor,
Eu quero ver o Tópico 14 com orientações práticas de posicionamento de carreira,
Para que eu saia da apresentação com um plano de ação concreto.

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 14
**When** o tópico entra em foco
**Then** `Topic14.tsx` é renderizado com orientações de posicionamento profissional

**Given** o Tópico 14 renderizado
**When** visualizado
**Then** conteúdo vem de `src/data/topic14Data.ts`

**Given** o Tópico 14
**When** apresentado
**Then** disponibiliza Página 2 com notas do narrador convertidas para plano de ação prático

---

### Story 5.5: Tópico 15 — Caminho de Implementação

Como desenvolvedor/Tech Lead,
Eu quero ver o Tópico 15 com o caminho prático para começar a aplicar Context Engineering,
Para que eu saia com um roadmap de adoção claro e acionável.

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 15
**When** o tópico entra em foco
**Then** `Topic15.tsx` é renderizado com o caminho de implementação passo a passo

**Given** o Tópico 15 renderizado
**When** visualizado
**Then** conteúdo vem de `src/data/topic15Data.ts` e é legível em projetor

**Given** o Tópico 15
**When** finalizado
**Then** inclui Página 2 com notas do narrador para conduzir roadmap em etapas

---

### Story 5.6: Tópico 16 — Call to Action Final

Como apresentador,
Eu quero apresentar o Tópico 16 como encerramento impactante com call to action,
Para que a audiência saia motivada e com os próximos passos claros.

**Acceptance Criteria:**

**Given** que o apresentador navega até o Tópico 16
**When** o tópico entra em foco
**Then** `Topic16.tsx` é renderizado com o CTA final (links/recursos/próximos passos)

**Given** o Tópico 16 como fechamento principal da jornada base
**When** renderizado
**Then** é visualmente distinto dos demais — tom de conclusão/celebração com verde neon predominante

**Given** a apresentação completa (Tópicos 1–17 navegados)
**When** o Tópico 16 está visível
**Then** a `CyberProgressBar` mostra todos os 5 blocos completos/iluminados

**Given** o Tópico 16
**When** inspecionado
**Then** conteúdo vem de `src/data/topic16Data.ts`

**Given** o app completo após Epic 5
**When** `npm run build` é executado e o Lighthouse é auditado
**Then** Performance score ≥ 90 com todos os 16 tópicos implementados

**Given** o Tópico 16
**When** apresentado
**Then** inclui Página 2 com notas do narrador para fechamento e chamada para ação

## Epic 6: Bônus Operacional & Menu Command Center

O apresentador pode abrir um overview com leitura de command center, navegar até o bônus operacional e fechar a apresentação com uma ponte prática entre conceito e operação no dia 1.

### Story 6.1: Redesign do Menu/Overview

Como apresentador,
Eu quero que o overview funcione como um command center coerente com a identidade visual da apresentação,
Para que o salto entre tópicos seja funcional, legível em projetor e visualmente memorável.

**Acceptance Criteria:**

**Given** o overview aberto
**When** renderizado
**Then** exibe agrupamento por blocos narrativos, destaque claro do tópico ativo e seção visualmente distinta para o bônus operacional

**Given** o overview em uso ao vivo
**When** o apresentador navega por teclado
**Then** foco, trap de Tab, Esc para fechar e seleção de tópico continuam funcionando sem regressão

### Story 6.2: Extensão da Navegação para 17 Tópicos

Como sistema,
Eu quero suportar 17 tópicos em registry, hash, overview e lazy-load,
Para que o bônus faça parte da jornada sem hacks locais.

**Acceptance Criteria:**

**Given** qualquer navegação por teclado, hash ou overview
**When** o índice alvo estiver entre 1 e 17
**Then** o sistema sincroniza estado, deep link e progress bar corretamente

### Story 6.3: Tópico 17 — Copilot Operacional

Como audiência,
Eu quero consumir um tópico bônus sobre comandos, threads, plan e fleet,
Para que a apresentação termine com uma ponte prática entre conceito e operação no dia 1.

**Acceptance Criteria:**

**Given** o apresentador navega até o Tópico 17
**When** o tópico entra em foco
**Then** `Topic17.tsx` é renderizado com dados estruturados vindos de `src/data/topic17Data.ts`

**Given** o Tópico 17 em exibição
**When** a audiência percorre a tela
**Then** a experiência cobre comandos, thread graph, plan board, fleet e guardrails com notas do narrador em página dedicada

### Story 6.4: Regressão e Testes

Como time,
Eu quero validar overview, progresso, navegação e renderização do Tópico 17,
Para que a extensão não introduza regressão no fluxo 1–17.

**Acceptance Criteria:**

**Given** a extensão do Epic 6 concluída
**When** `npm test` e `npm run build` são executados
**Then** a suíte permanece verde e o bundle compila sem regressão de navegação, overview ou progress bar

