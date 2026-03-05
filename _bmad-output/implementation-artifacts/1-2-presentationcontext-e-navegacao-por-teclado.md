# Story 1.2: presentationcontext-e-navegacao-por-teclado

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a apresentador,  
I want navegar entre os 16 topicos com as teclas <- ->, Space e Esc,  
so that eu controle o ritmo da apresentacao sem depender de mouse.

## Acceptance Criteria

1. Dado que o app esta no Topico 1, quando o usuario pressiona `ArrowRight` ou `Space`, entao `currentTopicIndex` incrementa ate o maximo 16 e a action `NEXT` e disparada.
2. Dado que o app esta no Topico 5, quando o usuario pressiona `ArrowLeft`, entao `currentTopicIndex` decrementa ate o minimo 1 e a action `PREV` e disparada.
3. Dado que o app esta no Topico 1, quando `ArrowLeft` e pressionado, entao o indice permanece 1 (sem wraparound).
4. Dado que o app esta no Topico 16, quando `ArrowRight` e pressionado, entao o indice permanece 16 (sem wraparound).
5. Dado o `PresentationContext`, quando o estado for inspecionado, entao ele tem shape `{ currentTopicIndex: number, direction: 'next'|'prev', isOverviewOpen: boolean }` e suporta actions `NEXT`, `PREV`, `GOTO`, `TOGGLE_OVERVIEW`, `SET_DIRECTION`, `INIT_FROM_HASH`.
6. Dado o reducer, quando testado com Vitest, entao cenarios de navegacao e boundary conditions (1 e 16) passam.

## Tasks / Subtasks

- [x] Implementar `PresentationContext` com `useReducer`, types estritos e API de consumo (AC: 5)
  - [x] Definir `PresentationState`, `PresentationAction`, `PresentationDirection` sem `enum` e sem `any`
  - [x] Implementar reducer puro com as 6 actions obrigatorias
  - [x] Garantir clamp 1..16 em `NEXT`, `PREV`, `GOTO` e `INIT_FROM_HASH`
- [x] Implementar provider e hook de acesso ao contexto (AC: 1, 2, 5)
  - [x] Criar `PresentationProvider` para encapsular estado global da apresentacao
  - [x] Criar hook `usePresentation()` com erro explicito se usado fora do provider
- [x] Implementar navegacao por teclado em hook dedicado (AC: 1, 2, 3, 4)
  - [x] Mapear `ArrowRight` e `Space` para proximo topico (`NEXT`)
  - [x] Mapear `ArrowLeft` para topico anterior (`PREV`)
  - [x] Mapear `Escape` para `TOGGLE_OVERVIEW`
  - [x] Registrar e limpar listener em `useEffect` (resistente ao StrictMode)
- [x] Integrar contexto no app shell minimo para habilitar ciclo completo de navegacao (AC: 1, 2, 3, 4, 5)
  - [x] Envolver App com `PresentationProvider`
  - [x] Conectar hook de teclado no shell principal
  - [x] Exibir estado minimo de debug/controle (topico atual + total) sem quebrar tema atual
- [x] Cobrir comportamento com testes automatizados (AC: 6)
  - [x] Testar reducer: transitions, boundaries e actions invalidas
  - [x] Testar teclado com `@testing-library/user-event` para setas, space e esc
  - [x] Garantir ausencia de wraparound e estabilidade em multiplas teclas sequenciais
- [x] Rodar verificacoes locais da story (AC: 1..6)
  - [x] `npm run test`
  - [x] `npm run build`

## Dev Notes

### Developer Context Section

- Esta story entrega o nucleo de navegacao global do Epic 1. Sem ela, stories 1.3+ ficam bloqueadas.
- Escopo desta story e estado + teclado. Nao implementar ainda: overview visual completo (story 1.4), hash sync real (story 1.5), transicoes cinematicas (Epic 2), ou topicos finais.
- A implementacao deve ser previsivel para apresentacao ao vivo: comportamento deterministico, sem wraparound, sem efeitos colaterais ocultos.

### Technical Requirements

- Manter `TOTAL_TOPICS = 16` como constante unica e reutilizavel no reducer/testes.
- `NEXT` e `PREV` devem atualizar `direction` (`next`/`prev`) de forma consistente para preparar animacoes futuras.
- `GOTO` deve ajustar o indice para o intervalo 1..16 e inferir `direction` com base no indice atual.
- `SET_DIRECTION` deve aceitar apenas `'next' | 'prev'`.
- `INIT_FROM_HASH` deve existir nesta story (preparo para 1.5), aplicando clamp 1..16 e fallback para 1 em payload invalido.
- Listener de teclado deve ignorar repeticoes/efeitos colaterais que possam gerar comportamento nao deterministico em keypress rapido.
- Evitar conflito com campos editaveis futuros: proteger handler para nao capturar teclas quando foco estiver em `input`, `textarea`, `select` ou elemento `contenteditable`.

### Architecture Compliance

- Seguir arquitetura aprovada: estado global em `PresentationContext` com `useReducer`; side effects de teclado em hook dedicado.
- Reducer deve ser puro e testavel em isolamento (sem acesso a `window`, `document`, hash ou timers).
- Nao introduzir React Router.
- Nao criar barrel export (`index.ts`).
- Manter imports sem extensao e alias `@/` quando aplicavel.

### Library / Framework Requirements

- React 19 (`useReducer`, `createContext`, `useContext`, `useEffect`) como base.
- React StrictMode esta ativo; efeito de listener deve limpar corretamente para nao duplicar handler em desenvolvimento.
- Vitest + Testing Library para testes de comportamento.
- Para teclado, usar `@testing-library/user-event` (`setup()` + `keyboard()`) em vez de disparos manuais de eventos.
- Manter stack atual do projeto nesta story (sem upgrade de major):
  - `vite` em linha 6.x no repositiorio atual
  - `tailwindcss` em linha 4.x
  - `framer-motion` em linha 12.x

### File Structure Requirements

- Criar/editar apenas arquivos necessarios para o escopo:
  - `src/contexts/PresentationContext.tsx`
  - `src/hooks/useKeyboardNavigation.ts`
  - `src/App.tsx` (integracao minima)
  - `src/main.tsx` (se necessario para provider)
  - `src/__tests__/presentationContext.reducer.test.ts`
  - `src/__tests__/keyboardNavigation.test.tsx`
- Nao mover nem renomear estrutura base criada na story 1.1.
- Nao adicionar dependencias novas sem justificativa tecnica.

### Testing Requirements

- Reducer:
  - cobre `NEXT`, `PREV`, `GOTO`, `TOGGLE_OVERVIEW`, `SET_DIRECTION`, `INIT_FROM_HASH`
  - cobre boundaries 1 e 16 sem wraparound
  - cobre payload invalido em `GOTO` e `INIT_FROM_HASH`
- Teclado:
  - `ArrowRight` e `Space` avancam (ate 16)
  - `ArrowLeft` volta (ate 1)
  - `Escape` alterna `isOverviewOpen`
  - keypress sequencial rapido nao quebra estado
- Resultado minimo: `npm run test` verde para novos testes; `npm run build` sem regressao.

### Previous Story Intelligence

- Story 1.1 ja estabilizou configuracoes base; nao reabrir mudancas de setup sem necessidade.
- Correcoes apos review em 1.1 que devem ser preservadas:
  - `strict: true` explicito no `tsconfig.json`
  - alias `@/*` ativo
  - script `dev` fixado em `localhost:5173 --strictPort`
  - `framer-motion` ja instalado na linha esperada
  - `theme.css` com `@source` restrito para evitar classes invalidas no build
- Padrao atual do projeto usa componentes simples e imports diretos; manter essa consistencia.

### Git Intelligence Summary

- Commits recentes mostram foco em base de projeto, configuracao e quality gates.
- Arquivos sensiveis que nao devem ser alterados sem necessidade nesta story:
  - `package.json` / `package-lock.json`
  - `vite.config.ts`
  - `tsconfig*.json`
  - `src/styles/theme.css`
- Evitar retrabalho no bootstrap: concentre-se em contexto, teclado e testes.

### Latest Tech Information (2026-03-05)

- React docs reforcam que reducer deve ser puro e que em StrictMode o reducer/initializer pode rodar duas vezes em dev; a implementacao deve ser idempotente.
- Vite 7 existe e exige Node 20.19+ ou 22.12+; este projeto esta em Node 22 LTS e Vite 6.x por decisao arquitetural atual.
- Tailwind v4 consolidou modelo CSS-first com `@import "tailwindcss"` e `@theme`; manter padrao ja adotado.
- Vitest 4 foi anunciado (2025-10-22), mas esta story nao deve forcar migracao de major.
- Motion/Framer: `AnimatePresence mode="wait"` continua recomendado para fluxo sequencial (sera usado em historias de transicao), e `useReducedMotion` e a via oficial para fallback de acessibilidade.
- Testing Library `user-event` recomenda `userEvent.setup()` e `keyboard()` para simular interacao realista de teclado nos testes.

### Project Context Reference

- Artefatos que governam esta story:
  - `_bmad-output/planning-artifacts/epics.md` (Epic 1 / Story 1.2)
  - `_bmad-output/planning-artifacts/architecture.md` (state, hash strategy, boundaries)
  - `_bmad-output/planning-artifacts/prd.md` (FR1-FR5, NFR4-NFR6)
  - `_bmad-output/planning-artifacts/ux-design-specification.md` (keyboard-first)
  - `_bmad-output/project-context.md` (regras de codigo para agentes)

### Story Completion Status

- Story context criada para minimizar erros de implementacao:
  - evita reinventar estado de navegacao fora do `PresentationContext`
  - evita violações de boundaries (1 e 16) e efeitos colaterais no reducer
  - evita testes fragilizados com eventos de teclado irreais
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2: PresentationContext & Navegacao por Teclado]
- [Source: _bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/prd.md#Functional Requirements]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#The Guided Presentation]
- [Source: _bmad-output/project-context.md#Critical Implementation Rules]
- [Source: https://react.dev/reference/react/useReducer]
- [Source: https://vite.dev/blog/announcing-vite7]
- [Source: https://tailwindcss.com/blog/tailwindcss-v4]
- [Source: https://tailwindcss.com/blog/tailwindcss-v4-1]
- [Source: https://vitest.dev/blog/vitest-4]
- [Source: https://motion.dev/motion/animate-presence/]
- [Source: https://motion.dev/docs/react-use-reduced-motion]
- [Source: https://testing-library.com/docs/user-event/setup/]
- [Source: https://testing-library.com/docs/user-event/keyboard/]
- [Source: https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/]

## Dev Agent Record

### Agent Model Used

Codex (GPT-5)

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/create-story/instructions.xml`
- Template: `_bmad/bmm/workflows/4-implementation/create-story/template.md`

### Completion Notes List

- Story 1.2 criada no diretorio de implementation artifacts.
- Contexto tecnico consolidado para estado global + teclado + testes.
- Story marcada como `ready-for-dev` no tracking de sprint.
- Story pronta para execucao com `dev-story`.
- Implementado o `PresentationContext` e `useKeyboardNavigation`. Testes criados e cobrindo os ACs e boundary conditions com `vitest` e `user-event`.
- Integrado o context e o teclado no `App.tsx` global. NPM build e testes passaram.
- Code review aplicado e correcoes implementadas:
  - listener de teclado ignora `event.repeat`
  - testes adicionados para payload invalido em `GOTO` e `INIT_FROM_HASH`
  - testes de teclado cobrindo boundaries e sequencia rapida
  - imports padronizados sem extensao e com alias `@/` onde aplicavel
- Story atualizada com arquivos realmente modificados e status final sincronizado.

### File List

- `_bmad-output/implementation-artifacts/1-2-presentationcontext-e-navegacao-por-teclado.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/contexts/PresentationContext.tsx`
- `src/hooks/useKeyboardNavigation.ts`
- `src/__tests__/presentationContext.reducer.test.ts`
- `src/__tests__/keyboardNavigation.test.tsx`
- `src/App.tsx`
- `package.json`
- `package-lock.json`

### Status

- [x] Done

## Senior Developer Review (AI)

### Data
- 2026-03-05

### Resultado
- Changes requested resolvidos.
- Todos os itens High e Medium identificados na review foram corrigidos.
- Validacao local executada com sucesso: `npm run test` e `npm run build`.

### Correcoes Aplicadas
- `useKeyboardNavigation` agora ignora eventos com `event.repeat`.
- Suite de reducer coberta para payloads invalidos em `GOTO` e `INIT_FROM_HASH`.
- Suite de teclado coberta para boundaries (1..16), ausencia de wraparound e sequencia rapida de teclas.
- Imports alinhados ao padrao do projeto (sem extensao, alias `@/` quando aplicavel).

## Change Log

- 2026-03-05: Code review concluido, issues High/Medium corrigidos, status da story atualizado para `done`.
