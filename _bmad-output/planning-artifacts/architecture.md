---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-ApresentacaoAI-2026-03-04.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/ux-step-02-content.md
  - _bmad-output/project-context.md
  - docs/topicos/topic1.md
  - docs/topicos/topic8.md
  - docs/topicos/topic9.md
  - docs/topicos/topic10.md
workflowType: 'architecture'
lastStep: 8
project_name: 'ApresentacaoAI'
user_name: 'Giuliano'
date: '2026-03-04'
status: 'complete'
completedAt: '2026-03-04'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (PRD) — agrupadas por área (FR1–FR29):**

- **Navegação & fluxo de apresentação (FR1–FR5):**
  - Avançar/voltar por teclado
  - Abrir/fechar overview (mapa) e saltar para um tópico específico
  - Exibir estado global: tópico atual e total de tópicos
  - Implicação arquitetural: um “source of truth” único para estado da apresentação (índice do tópico, direção da navegação, modo overview).

- **Renderização de conteúdo por tópico (FR6–FR21):**
  - Renderizar Tópicos 1–16 como unidades navegáveis
  - Implicação: padronizar contrato/composição de “Topic Views” e garantir isolamento para evitar acoplamento entre tópicos.

- **Transições & experiência visual (FR22–FR24):**
  - Transição entre tópicos durante navegação
  - Animações/efeitos visuais associados ao tópico quando entra em foco
  - Background Matrix consistente durante a apresentação
  - Implicação: camada de transição global + orquestração de animações internas, com foco em animações baratas (GPU-friendly) para manter fluidez.

- **Componentes UI reutilizáveis (FR25–FR26):**
  - Métricas/destaques numéricos (ex.: counters animados)
  - Comparações/quadros informativos (ex.: tabelas/cards)
  - Implicação: biblioteca de UI interna (componentes genéricos) separada do conteúdo dos tópicos.

- **Build/Deploy e operação sem backend (FR27–FR29):**
  - Build estático (dist) publicável
  - Acesso via link, sem autenticação
  - Operação sem dependência de backend
  - Implicação: arquitetura totalmente client-side e sem dependências externas críticas no runtime.

**Non-Functional Requirements (PRD) — dirigem a arquitetura:**

- **Performance:** Lighthouse Performance **> 90**.
- **Fluidez:** transições sem “jank” perceptível, mirando **60fps consistente**.
- **Background Matrix:** deve ser **sutil** e não pode degradar legibilidade nem comprometer fluidez.
- **Confiabilidade em sessão:** navegação por teclado estável do tópico 1→16 sem exigir refresh.
- **Compatibilidade:** suportar **Google Chrome (última versão)**.
- **Acessibilidade pragmática:** legibilidade em projetor (contraste + hierarquia visual), sem meta WCAG formal.

**UX-driven requirements / Interaction complexity (UX Spec + Tópicos 8/9/10):**

- “Presenter-invisible”: **keyboard-first** (setas, espaço e Esc para overview) e previsibilidade total no palco.
- Transições de tópico com animações cinemáticas; micro-interações de dados (counters, tabelas, cards).
- Fechamento do Bloco 3 com decisão operacional (Tópico 10):
  - **Tabela viva** (grid comparativo com hover/tooltip e destaques)
  - **Wizard de decisão** (perguntas → recomendação + trade-off + próximo passo)

**Scale & Complexity:**

- Domínio primário: **SPA web** (apresentação interativa)
- Complexidade: **baixa em domínio**, **média em UI/animações**
- Componentes arquiteturais estimados (alto nível):
  - App shell/layout + background
  - Presentation state (context) + keyboard navigation
  - Overview/map + progress indicator
  - Topic renderer (lazy-loaded) + 16 topic views
  - UI kit (AnimatedCounter, LiveTable, DecisionWizard, cards, etc.)
  - Conteúdo estruturado separado (dados/textos) vs componentes visuais

### Technical Constraints & Dependencies

- **Sem backend** (build/deploy estático) e sem autenticação.
- Navegação por **estado interno** (sem router) — índice de tópico no `PresentationContext`.
- Stack e regras para agentes já definidas no `project-context.md` (TypeScript strict; sem `any`; sem enums; um componente por arquivo; imports diretos; conteúdo textual separado em `src/data/`; lazy-load de tópicos; Tailwind 4 com tokens via `@theme`; Framer Motion para transições).

### Cross-Cutting Concerns Identified

- **Performance/60fps:** minimizar custo de animações e do background; evitar padrões que causem re-renderizações desnecessárias durante navegação.
- **Consistência de navegação:** mapeamento de teclado e estado global único para evitar drift e comportamentos divergentes entre tópicos.
- **Consistência visual (Matrix/tech) + legibilidade:** tokens de tema, tipografia e contraste pensados para projetor.
- **Governança de conteúdo:** evitar acoplamento conteúdo↔UI; manter rastreabilidade dos tópicos (docs como fonte de verdade) e representação no app.

## Starter Template Evaluation

### Primary Technology Domain

SPA web estática (apresentação interativa), com foco em performance/60fps, animações (Framer Motion) e UI rica (Tailwind).

### Starter Options Considered

- **Vite (React + TypeScript):** melhor aderência ao `project-context.md` (SPA, build estático, DX simples, sem decisões extras de routing/SSR).
- **Next.js:** descartado por overkill no escopo atual (app estático, sem backend e navegação por estado interno).
- **Astro + React:** descartado por adicionar camadas que não trazem benefício claro para o nível de interatividade exigido (tabela viva + wizard + transições).

### Selected Starter: Vite (React + TypeScript)

**Rationale for Selection:**

- Alinha com as regras do `project-context.md` (Node 22 LTS, Vite 6.x, React 19.x, TypeScript strict).
- Mantém arquitetura simples (SPA) e favorece performance.
- Facilita lazy-load dos tópicos e controle de transições via Framer Motion.

**Initialization Command:**

```bash
npm create vite@latest apresentacaoai -- --template react-ts
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**

- TypeScript como base do projeto (manter strict conforme `project-context.md`).

**Build Tooling:**

- Vite como bundler e dev server; build estático em `dist/`.

**Styling Solution:**

- Tailwind CSS 4 será adicionado e configurado com tokens via `@theme` em CSS (conforme `project-context.md`).

**Testing Framework:**

- Vitest + Testing Library serão adicionados (conforme `project-context.md`).

**Code Organization:**

- Estrutura inicial será ajustada para `src/components/{topics,ui,layout}`, `src/contexts`, `src/data`, `src/hooks`, `src/styles`.

**Note:**

Inicialização do projeto via starter deve ser tratada como a primeira story de implementação.

## Core Architectural Decisions

### Data Architecture (Local Content & URL State)

- **Persistir “último tópico visto”:** Não (sempre iniciar no Tópico 1).
  - Racional: fluxo presenter-first; evitar “surpresas” de estado em apresentação ao vivo.

- **Deep link para tópico:** Sim, via **URL hash** (sem router).
  - Abordagem: ler `location.hash` na carga inicial; atualizar hash quando o tópico atual mudar.
  - Objetivo: permitir compartilhar links diretos para um tópico sem adicionar complexidade de roteamento.

- **Fonte de conteúdo para renderização no app:** **TypeScript data em `src/data/`**.
  - Racional: maximizar performance e controle de layout (60fps + legibilidade em projetor) e suportar tópicos ricos/interativos (Tabela Viva + Wizard).
  - Observação: `docs/topicos/topicN.md` permanece como fonte humana/referência; o app consome dados estruturados otimizados para UI.

### Frontend Architecture (State, Navigation, Performance)

- **State management (PresentationContext):** `useReducer` com actions explícitas.
  - Exemplos: `NEXT`, `PREV`, `GOTO(topicIndex)`, `TOGGLE_OVERVIEW`, `SET_DIRECTION`.
  - Racional: previsibilidade e centralização das regras de navegação (keyboard-first), reduzindo drift entre tópicos.

- **URL hash sync (deep link) — source of truth:** **estado manda, hash espelha**.
  - Comportamento:
    - Na carga inicial: ler `location.hash` uma vez (se existir e for válido) e inicializar o tópico.
    - Durante uso: ao mudar o tópico, atualizar o hash.
    - Opcional: tratar `hashchange` apenas para navegação do browser (back/forward), sem deixar o hash “dirigir” a app continuamente.
  - Racional: estabilidade em apresentação ao vivo; evita edge cases de sincronização.

- **Lazy-loading strategy:** lazy-load **apenas** dos componentes de tópicos (`Topic1..Topic17`) via `React.lazy` + `Suspense`.
  - Shell (layout, background, context, keyboard navigation, overview) permanece eager.
  - Racional: performance (Lighthouse/TTI) e controle de fluidez (60fps).

### Infrastructure & Deployment

- **Execução primária (MVP/dev):** rodar localmente (Vite dev server) durante desenvolvimento e apresentações internas quando necessário.

- **Hosting alvo (quando publicar):** **GitHub Pages** (hospedagem estática gratuita para sites estáticos, com ressalvas dependendo de visibilidade/plano do repositório).

- **Base URL:** assumir **subpath** típico de GitHub Pages para projeto (ex.: `https://<user>.github.io/ApresentacaoAI/`).

- **Roteamento:** manter **hash-based deep links** (via `location.hash`) para compatibilidade simples com Pages (sem necessidade de rewrite de SPA).

### Quality, Testing & Performance Guardrails

- **Testing focus (Vitest + Testing Library):** foco em **navegação e estado**.
  - Prioridade: `PresentationContext` (reducer/actions), mapeamento de teclado, toggle de overview, parse/validação de hash na inicialização.
  - UI: smoke tests mínimos apenas para componentes base; **não** testar estilização.

- **Performance guardrails (não-negociáveis):**
  - Animações somente com **`transform`** e **`opacity`** (evitar animar `width/height/top/left`).
  - Background Matrix via **`requestAnimationFrame`**, com intensidade **sutil** e budget: se impactar FPS, reduzir densidade/velocidade.
  - Evitar **re-render global** a cada keypress: isolar estado/handlers e manter o shell estável.
  - Assets (se houver): imagens em WebP e leves; evitar payloads grandes que prejudiquem Lighthouse.

### Authentication & Security

- **N/A (MVP):** aplicação estática, sem backend e sem autenticação.
- **Security baseline:** sem coleta de dados sensíveis; manter dependências atualizadas e evitar expor segredos (não usar `.env` com chaves reais em client-side).

### API & Communication Patterns

- **N/A (MVP):** não há API/backend no escopo atual.

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

- Starter: Vite + React + TypeScript
- Conteúdo em `src/data/`
- Navegação via `PresentationContext` (`useReducer`) e keyboard-first
- Deep link via `location.hash` (estado manda, hash espelha)
- Lazy-load dos tópicos
- Guardrails de performance (transform/opacity; RAF para background Matrix)

**Important Decisions (Shape Architecture):**

- GitHub Pages como alvo de publicação (subpath), com hash routing
- Estratégia de testes focada em navegação/estado

**Deferred Decisions (Post-MVP):**

- Telemetria/analytics
- Presenter mode (segunda tela), timer por tópico
- Internacionalização (EN toggle)
- PWA/offline

### Decision Impact Analysis

**Implementation sequence (alto nível):**

1. Inicializar projeto com Vite (react-ts) e configurar TS strict/alias.
2. Configurar Tailwind 4 tokens via `@theme` e estilos base.
3. Implementar `PresentationContext` com reducer + keyboard navigation + overview toggle.
4. Implementar sync de hash (parse inicial + espelho nas mudanças).
5. Implementar shell (layout + progress + overview) e lazy-load de tópicos.
6. Implementar UI kit mínimo (AnimatedCounter / cards / etc.) e tópicos incrementais.
7. Implementar Matrix background (RAF, sutil, budget de performance).
8. Testes (foco em navegação/estado + smoke) e checagem Lighthouse.

**Cross-component dependencies:**

- Hash sync depende do estado central; lazy-load depende do topic renderer/shell.
- Guardrails de performance afetam principalmente background + transições + UI kit.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**

Pontos com alto risco de divergência entre agentes: naming de arquivos/componentes, organização de pastas, contrato do `PresentationContext` (actions/state), padrão de deep link (hash), lazy-loading/Suspense, padrões de loading/error e regras de performance (animações + background).

### Naming Patterns

**Code Naming Conventions:**

- Components: `PascalCase` (ex.: `AnimatedCounter`, `Topic10`).
- Files: `PascalCase.tsx` para componentes (ex.: `Topic10.tsx`, `MatrixBackground.tsx`).
- Hooks: `camelCase` com prefixo `use` (ex.: `useKeyboardNavigation.ts`).
- Types: `PascalCase` para tipos/interfaces; `interface` para props; `type` para unions/utilities.
- Data/constants: `camelCase.ts` (ex.: `topics.ts`, `topic10Data.ts`), exportando objetos `as const` quando aplicável.
- Sem enums (usar `as const` + union types).

**URL Hash Pattern (Deep links):**

- Formato canônico: `#/topic/<n>` onde `<n>` é 1..17.
- Regra: estado manda, hash espelha; parse do hash acontece na inicialização (e opcionalmente em back/forward).

### Structure Patterns

**Project Organization (obrigatório):**

- `src/components/topics/`: `Topic1.tsx` ... `Topic17.tsx`
- `src/components/ui/`: componentes genéricos (ex.: `AnimatedCounter.tsx`, `LiveTable.tsx`, `DecisionWizard.tsx`)
- `src/components/layout/`: shell (ex.: `PresentationLayout.tsx`, `Overview.tsx`, `ProgressBar.tsx`, `MatrixBackground.tsx`)
- `src/contexts/`: `PresentationContext.tsx`
- `src/hooks/`: hooks (ex.: `useKeyboardNavigation.ts`, `useHashSync.ts`)
- `src/data/`: conteúdo estruturado (PT-BR) dos tópicos e métricas, separado de UI
- `src/styles/`: CSS global e tokens do tema (`@theme`)
- Sem barrel exports (`index.ts`).

**Testing Location Pattern:**

- Preferência: co-located `ComponentName.test.tsx` para contexto/hooks e UI base, ou `src/__tests__/` para testes de navegação/estado.
- Não escrever testes de estilo; testar comportamento (navegação, hash, overview, reducer).

### Communication Patterns (State Management)

**PresentationContext State Shape (padrão):**

- `currentTopicIndex: number` (1..17)
- `direction: 'next' | 'prev'`
- `isOverviewOpen: boolean`

**Action Naming Conventions:**

- Actions em UPPER_SNAKE_CASE: `NEXT`, `PREV`, `GOTO`, `TOGGLE_OVERVIEW`, `SET_DIRECTION`, `INIT_FROM_HASH`.
- Reducer deve ser pura e determinística; side-effects (hash, listeners) ficam em hooks/components.

### Process Patterns

**Loading States (Suspense):**

- Lazy-load apenas dos tópicos.
- Fallback de `Suspense` deve ser leve e consistente (ex.: skeleton/label), sem animações pesadas.

**Error Handling:**

- Hash inválido: fallback determinístico para Tópico 1.
- Não usar `console.log` commitado (exceto dev mode).

### Enforcement Guidelines

**All AI Agents MUST:**

- Respeitar `project-context.md` (TS strict, sem `any`, sem enums, imports diretos, etc.).
- Manter conteúdo em PT-BR em `src/data/` e UI genérica em `src/components/ui/`.
- Seguir guardrails de performance: animar só `transform/opacity`; background Matrix em RAF e sutil.

**Pattern Enforcement:**

- PR checklist: arquivos no lugar certo + naming + reducer/actions + hash format.
- Test mínimo obrigatório: reducer + parse de hash + keyboard navigation.

### Anti-Patterns

- Implementar router (React Router/Next) “só porque sim”.
- Misturar conteúdo textual do tópico dentro de componente UI genérico.
- Animar propriedades de layout (width/height/top/left).
- Criar `index.ts` barrel exports.

## Project Structure & Boundaries

### Complete Project Directory Structure

```
ApresentacaoAI/
├── README.md
├── package.json
├── package-lock.json
├── index.html
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── .gitignore
├── .editorconfig
├── eslint.config.js
├── public/
│   └── assets/
│       └── (static assets - preferir mínimos)
└── src/
  ├── main.tsx
  ├── App.tsx
  ├── types.ts
  ├── styles/
  │   ├── theme.css          # tokens Tailwind 4 via @theme (Matrix)
  │   └── globals.css        # imports + base styles
  ├── data/
  │   ├── topics.ts          # registry: totalTopics=17, helpers, metadata
  │   ├── topic1Data.ts
  │   ├── topic2Data.ts
  │   ├── ...
  │   └── topic17Data.ts
  ├── contexts/
  │   └── PresentationContext.tsx
  ├── hooks/
  │   ├── useKeyboardNavigation.ts
  │   ├── useHashSync.ts
  │   └── usePrefersReducedMotion.ts
  ├── components/
  │   ├── layout/
  │   │   ├── PresentationLayout.tsx
  │   │   ├── ProgressBar.tsx
  │   │   ├── Overview.tsx
  │   │   └── MatrixBackground.tsx
  │   ├── ui/
  │   │   ├── NeonCard.tsx
  │   │   ├── AnimatedCounter.tsx
  │   │   ├── LiveTable.tsx          # Tópico 10 - tabela viva
  │   │   ├── DecisionWizard.tsx     # Tópico 10 - wizard
  │   │   ├── SplitScreen.tsx
  │   │   └── (outros componentes genéricos)
  │   └── topics/
  │       ├── Topic1.tsx
  │       ├── Topic2.tsx
  │       ├── ...
  │       ├── Topic10.tsx
  │       └── Topic17.tsx
  └── __tests__/
    ├── presentationReducer.test.ts
    ├── hashParsing.test.ts
    └── keyboardNavigation.test.ts
```

### Architectural Boundaries

**API Boundaries:**

- N/A (sem backend).

**Component Boundaries:**

- `components/layout/`: orquestra navegação/transição, overview command center e background.
- `components/topics/`: UI específica por tópico (layout e orquestração interna).
- `components/ui/`: componentes reutilizáveis e genéricos (sem conteúdo específico).
- `data/`: conteúdo + métricas em formato estruturado (PT-BR), consumido pelos tópicos.

**State Boundaries:**

- `PresentationContext` é a fonte única para: tópico atual, direção, estado do overview.
- Side-effects (hash, keyboard listeners) ficam em hooks dedicados.

### Requirements to Structure Mapping

**FR Category: Navigation & Presentation Flow (FR1–FR5) →**

- `src/contexts/PresentationContext.tsx`
- `src/hooks/useKeyboardNavigation.ts`
- `src/hooks/useHashSync.ts`
- `src/components/layout/Overview.tsx`
- `src/components/layout/ProgressBar.tsx`

**FR Category: Topic Rendering (FR6–FR21) →**

- `src/components/topics/Topic1..Topic17.tsx` (lazy-loaded)
- `src/data/topicNData.ts` (conteúdo)

**FR Category: Transitions & Visual Experience (FR22–FR24) →**

- `src/components/layout/PresentationLayout.tsx`
- `src/components/layout/MatrixBackground.tsx`
- (variants do Framer Motion definidos fora do corpo do componente)

**FR Category: Reusable UI Blocks (FR25–FR26) →**

- `src/components/ui/*`

**FR Category: Deployment (FR27–FR29) →**

- `vite.config.ts`, `package.json` scripts, output `dist/` e Pages config (quando habilitar)

### Integration Points

**Internal Communication:**

- Tópicos comunicam via props/dados e consultam estado do `PresentationContext`.
- Deep link: `useHashSync` integra URL ↔ estado (estado manda, hash espelha).

**External Integrations:**

- Nenhuma no MVP.

### File Organization Patterns

- Um componente por arquivo; sem barrel exports.
- Conteúdo textual em PT-BR em `src/data/` (não em UI genérica).
- Testes focados no reducer/keyboard/hash; UI apenas smoke.

### Development Workflow Integration

- Dev: `npm run dev` (Vite)
- Build: `npm run build` → `dist/`
- Deploy: GitHub Pages (subpath) quando publicar, com hash routing

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**

- Stack (Vite + React + TS + Tailwind 4 + Framer Motion + Vitest) consistente com `project-context.md`.
- Sem router + deep link via hash compatível com GitHub Pages (subpath) e com o fluxo presenter-first.
- Lazy-load dos tópicos + shell eager coerente com performance e 60fps.

**Pattern Consistency:**

- Naming/estrutura/actions/hash format padronizados; reducer puro e side-effects em hooks.
- Guardrails de performance alinhados com UX (animações cinemáticas sem jank).

**Structure Alignment:**

- Árvore do projeto suporta boundaries (layout/ui/topics/data/hooks/contexts) e facilita trabalho paralelo de agentes.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**

- Navegação/overview, render de 17 tópicos (16 da jornada principal + 1 bônus), transições/background, UI reusável e build estático têm mapeamento claro para arquivos/pastas.

**Non-Functional Requirements Coverage:**

- Performance/Lighthouse e 60fps endereçados via lazy-load + guardrails.
- Legibilidade em projetor endereçada via tokens/tema + regras de UI (já no project-context e UX).

### Implementation Readiness Validation ✅

**Decision Completeness:**

- Decisões críticas documentadas (estado, hash, fonte de conteúdo, deploy alvo, testes).

**Structure Completeness:**

- Estrutura completa e específica para implementação.

**Pattern Completeness:**

- Regras suficientes para evitar conflitos (naming, local dos arquivos, actions, hash, guardrails).

### Gap Analysis Results

**Critical Gaps:** none  
**Important Gaps:** none  
**Nice-to-Have:**

- Definir fallback visual padrão de `Suspense`.
- Decidir se suportaremos `hashchange` para back/forward no browser (opcional).

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION  
**Confidence Level:** high

**Key Strengths:**

- Escopo enxuto (sem backend) com decisões claras para UX/performance.
- Guardrails fortes para evitar regressão de 60fps/Lighthouse.
- Padrões e estrutura minimizam conflitos entre agentes.

**First Implementation Priority:**

- Inicializar o projeto (Vite react-ts) e implementar `PresentationContext` + keyboard navigation + hash sync + shell.

### Implementation Handoff

**AI Agent Guidelines:**

- Seguir `project-context.md` + este documento como fonte de verdade.
- **Design System:** consumir `_bmad-output/planning-artifacts/design-system.md` para tokens, cores, tipografia, componentes e regras visuais. Demo visual em `/demo-ux-components.html`.
- Não introduzir router.
- Manter conteúdo em `src/data/` (PT-BR) e UI genérica em `src/components/ui/`.
- Respeitar guardrails de performance.
