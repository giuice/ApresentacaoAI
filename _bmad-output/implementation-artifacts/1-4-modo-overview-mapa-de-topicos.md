# Story 1.4: modo-overview-mapa-de-topicos

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a apresentador,  
I want pressionar Esc para ver todos os 16 topicos em visao panoramica e saltar para qualquer um,  
so that eu possa reorientar a apresentacao sem perder o fluxo narrativo.

## Acceptance Criteria

1. Dado que o app esta em qualquer topico, quando Esc e pressionado, entao `isOverviewOpen` muda para `true` e o overlay de overview e exibido.
2. Dado o overview aberto, quando Esc e pressionado novamente, entao `isOverviewOpen` volta para `false` e o topico anterior permanece ativo.
3. Dado o overview visivel, quando renderizado, entao todos os 16 topicos aparecem como cards com numero e titulo (ou placeholder de titulo).
4. Dado o overview aberto, quando um card de topico e clicado ou Enter e pressionado com foco nele, entao a action `GOTO(topicIndex)` e disparada, o overview fecha e o topico selecionado fica ativo.
5. Dado o overview aberto, quando testado em viewport 1280x720, entao os 16 cards sao legiveis e nao ha overflow horizontal ou vertical.

## Tasks / Subtasks

- [x] Implementar componente `Overview` como overlay de navegacao (AC: 1, 2, 3, 5)
  - [x] Criar `src/components/layout/Overview.tsx` com grid de 16 cards e destaque do topico atual
  - [x] Adicionar semantica de acessibilidade (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`)
  - [x] Garantir backdrop e camada visual sem competir com legibilidade do conteudo
- [x] Estruturar fonte de dados dos cards de overview (AC: 3)
  - [x] Criar/ajustar `src/data/topics.ts` com metadados de 16 topicos (`index`, `title`)
  - [x] Consumir titulos reais quando disponiveis; fallback deterministico para placeholder
- [x] Integrar interacao de selecao e fechamento (AC: 2, 4)
  - [x] `onClick` do card dispara `GOTO` e fecha overview
  - [x] `Enter` e `Space` no card focado disparam o mesmo fluxo de selecao
  - [x] `Esc` continua alternando abertura/fechamento sem perder topico ativo ao fechar
- [x] Ajustar conflito entre navegacao global e modo overview (AC: 2, 4)
  - [x] Atualizar `useKeyboardNavigation` para bloquear `NEXT/PREV` quando `isOverviewOpen === true`
  - [x] Permitir `Escape` para fechar overview mesmo com bloqueio de navegacao global
  - [x] Evitar que teclas do overview acionem transicao de topico em segundo plano
- [x] Implementar foco e navegacao por teclado acessivel no modal (AC: 4, 5)
  - [x] Ao abrir, mover foco para o card do topico atual (ou primeiro card como fallback)
  - [x] Manter foco contido no dialog enquanto aberto (Tab/Shift+Tab)
  - [x] Ao fechar, restaurar foco para elemento que abriu o overview
- [x] Cobrir comportamento com testes automatizados (AC: 1..5)
  - [x] Testar toggle com `Escape` (abre e fecha mantendo topico)
  - [x] Testar render de 16 cards e titulos/placeholder
  - [x] Testar selecao por clique e por teclado (Enter/Space)
  - [x] Testar ausencia de overflow em 1280x720 por classes/estrutura de layout
  - [x] Testar que `ArrowRight/ArrowLeft` nao mudam topico enquanto overview estiver aberto
- [x] Validar story localmente antes de mover para in-progress
  - [x] `npm run test`
  - [x] `npm run build`

## Dev Notes

### Developer Context Section

- Esta story transforma o placeholder atual de overview em uma superficie real de navegacao.
- O estado global ja possui `isOverviewOpen` e action `GOTO`; a implementacao deve reutilizar esse contrato sem criar estado paralelo.
- O risco principal desta story e conflito de teclado: sem bloqueio apropriado, o usuario tenta navegar no overview e muda topicos ao fundo.

### Technical Requirements

- Manter `PresentationContext` como unica fonte de verdade:
  - `isOverviewOpen` controla visibilidade do overlay
  - `currentTopicIndex` controla destaque do card ativo
  - `GOTO` define o novo topico selecionado
- Overview deve exibir 16 cards em grid responsivo (desktop/projetor):
  - meta primaria: legibilidade e ausencia de overflow em 1280x720
  - cards com numero do topico e titulo curto
- Comportamento de teclado obrigatorio:
  - `Escape`: abre/fecha overview
  - `Enter` (e opcionalmente `Space`) no card focado: seleciona topico (`GOTO`) e fecha overview
  - `ArrowLeft/ArrowRight` globais nao devem navegar topico quando overview estiver aberto
- Guardrail de UX:
  - fechar overview sem selecao deve manter topico anterior
  - selecao de card deve fechar overview imediatamente apos `GOTO`

### Architecture Compliance

- Nao introduzir router.
- Nao criar barrel exports.
- Reducer permanece puro; qualquer logica de foco/listeners fica em componente/hook.
- Manter separacao de responsabilidades:
  - `components/layout/Overview.tsx` para UI do overlay
  - `hooks/useKeyboardNavigation.ts` para regras de teclado global
  - `data/topics.ts` para metadados de topicos

### Library / Framework Requirements

- React:
  - Continuar usando lazy-load dos topicos no `App.tsx`
  - Evitar remounts desnecessarios do shell ao abrir/fechar overview
- Acessibilidade (WAI-ARIA + MDN):
  - Dialog modal com foco inicial dentro do overlay
  - Tab cycle contido no dialog
  - `Escape` fecha dialog
  - Focus restore ao fechar
- Keyboard events:
  - Tratar `event.key === " "` para Space em `keydown` (comportamento padrao atual)
- Testing Library:
  - Preferir assertions por role (`dialog`, `button`) e accessible name

### File Structure Requirements

- Arquivos principais desta story:
  - `src/components/layout/Overview.tsx` (novo)
  - `src/data/topics.ts` (novo ou ajuste)
  - `src/App.tsx` (integracao final do overview real)
  - `src/hooks/useKeyboardNavigation.ts` (bloqueio de navegacao global quando overview aberto)
  - `src/__tests__/overview.test.tsx` (novo)
  - `src/__tests__/keyboardNavigation.test.tsx` (ajustes de cenarios com overview aberto)
- Nao alterar `PresentationContext` alem do estritamente necessario.
- Nao mexer em dependencias/package versions para esta story.

### Testing Requirements

- Cobertura minima obrigatoria:
  - abre/fecha overview com Esc
  - render de 16 cards
  - selecao por clique e Enter
  - topico ativo preservado ao fechar sem selecao
  - bloqueio de `NEXT/PREV` com overview aberto
- Testes devem validar comportamento e acessibilidade basica, nao detalhes cosmeticos.

### Previous Story Intelligence

- Story 1.3 deixou um placeholder de overview em `src/App.tsx` que apenas mostra texto.
- `useKeyboardNavigation` hoje dispara `NEXT/PREV` independentemente de `isOverviewOpen`; isso precisa ser corrigido nesta story para evitar regressao de fluxo.
- `PresentationLayout` ja garante shell estavel e fallback lazy no conteudo, o que facilita adicionar overlay sem mudar estrutura central.
- A base de testes do projeto ja cobre reducer, teclado e layout; estender essa suite e mais seguro que criar testes isolados redundantes.

### Git Intelligence Summary

- Ultimos commits concentraram mudancas em:
  - `src/App.tsx`
  - `src/contexts/PresentationContext.tsx`
  - `src/hooks/useKeyboardNavigation.ts`
  - suites em `src/__tests__/`
- Padrao observado: implementar feature + adicionar testes comportamentais + validar build.
- Risco de regressao conhecido: alterar handler global de teclado sem cenarios de overview aberto.

### Latest Tech Information (2026-03-05)

- React `lazy` e `Suspense` permanecem abordagem recomendada para code-splitting de topicos e fallback durante carregamento.
- Vite segue otimizando `import()` assincrono com preload de chunks e CSS code splitting automatico, importante para manter troca de topicos fluida.
- APG/W3C para modal dialog reforca requisitos de foco inicial no dialog, `Tab`/`Shift+Tab` contidos e `Escape` para fechar.
- MDN reforca que:
  - `KeyboardEvent.key` para Space e `" "` em `keydown`
  - botao focado deve responder a `Enter` e `Space`
  - dialog deve restaurar foco apos fechamento.
- Testing Library continua recomendando queries por role/acessible name para validar comportamento acessivel.

### Project Context Reference

- `_bmad-output/planning-artifacts/epics.md` (Epic 1 / Story 1.4)
- `_bmad-output/planning-artifacts/architecture.md` (state boundaries, keyboard-first, project structure)
- `_bmad-output/planning-artifacts/prd.md` (FR1-FR5, NFR4-NFR7)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (overview rapido, presenter mode, legibilidade)
- `_bmad-output/project-context.md` (stack rules e guardrails para agentes)
- `docs/topicos/topic1.md` ... `docs/topicos/topic16.md` (titulos de referencia)

### Story Completion Status

- Story context criada para evitar erros classicos:
  - overview visual sem navegacao real
  - conflito entre teclado global e teclado interno do overview
  - regressao de acessibilidade por falta de foco/restauro
  - grid de cards com overflow em 1280x720
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.4: Modo Overview (Mapa de Topicos)]
- [Source: _bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/prd.md#Functional Requirements]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Journey 1: The Guided Presentation (Presenter Mode)]
- [Source: _bmad-output/project-context.md#Critical Implementation Rules]
- [Source: https://react.dev/reference/react/lazy]
- [Source: https://react.dev/reference/react/Suspense]
- [Source: https://vite.dev/guide/features.html]
- [Source: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/]
- [Source: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/]
- [Source: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role]
- [Source: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role]
- [Source: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key]
- [Source: https://testing-library.com/docs/queries/byrole]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/dev-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/dev-story/instructions.xml`

### Implementation Plan

- Criar `src/data/topics.ts` com metadados dos 16 topicos (index + titulo real extraido de docs/topicos/)
- Criar `src/components/layout/Overview.tsx` como dialog modal acessivel com grid 4x4, foco trap, focus restore
- Substituir placeholder de overview no `App.tsx` pelo componente real `Overview`
- Atualizar `useKeyboardNavigation` para bloquear NEXT/PREV quando overview aberto (isOverviewOpen check)
- Criar suite de testes em `src/__tests__/overview.test.tsx` cobrindo todos os ACs

### Completion Notes List

- Story 1.4 criada em `_bmad-output/implementation-artifacts/`.
- Contexto tecnico consolidado para overview navegavel com guardrails de teclado e acessibilidade.
- Story marcada como `ready-for-dev` no tracking de sprint.
- Story pronta para execucao com `dev-story`.
- Implementacao completa: Overview com 16 cards, dialog modal acessivel, foco trap (Tab/Shift+Tab), focus restore ao fechar
- useKeyboardNavigation atualizado para bloquear ArrowRight/ArrowLeft/Space quando overview aberto
- 9 testes automatizados cobrindo toggle, selecao por clique/Enter/Space, bloqueio de navegacao, acessibilidade e layout
- Todos os 42 testes passam sem regressao; build limpo
- Revisao adversarial aplicada e findings corrigidos (AC5, foco acessivel, titulos/fallback e rastreabilidade Git vs Story)
- `Overview` atualizado para restaurar foco de abertura de forma robusta e evitar overflow horizontal
- `topics.ts` alinhado com titulos consolidados em `docs/topicos/` + fallback deterministico para topicos sem titulo consolidado
- Suite `overview.test.tsx` expandida para cobrir foco inicial, trap de Tab/Shift+Tab, focus restore e validacoes estruturais de 1280x720

### Change Log

- 2026-03-05: Implementacao completa da story 1.4 — Overview como superficie real de navegacao com acessibilidade WAI-ARIA
- 2026-03-05: Code review (AI) executado com correcoes aplicadas e validacao de testes/build

### File List

- `src/components/layout/Overview.tsx` (novo)
- `src/data/topics.ts` (novo)
- `src/App.tsx` (modificado — import Overview, substituiu placeholder)
- `src/hooks/useKeyboardNavigation.ts` (modificado — bloqueio NEXT/PREV com overview aberto)
- `src/__tests__/overview.test.tsx` (novo — 12 testes, incluindo foco/trap/restore e AC5 estrutural)
- `_bmad-output/implementation-artifacts/1-4-modo-overview-mapa-de-topicos.md` (atualizado)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (atualizado)

### Senior Developer Review (AI)

- Issues HIGH/MEDIUM identificados no review foram corrigidos nesta iteracao.
- Cobertura adicional implementada para acessibilidade de teclado no modal (`focus in`, `focus trap`, `focus restore`).
- Transparencia Git vs Story registrada: ha alteracoes pre-existentes no working tree fora do escopo direto da story 1.4:
  - `src/App.test.tsx`
  - `src/__tests__/appLazyLoad.test.tsx`
  - `src/__tests__/cyberProgressBar.test.ts`
  - `src/__tests__/presentationLayout.test.tsx`
  - `src/components/layout/CyberProgressBar.tsx`
  - `src/components/layout/PresentationLayout.tsx`
  - `src/components/topics/Topic1.tsx` ... `src/components/topics/Topic16.tsx`

### Status

- [ ] In Progress
- [ ] Review
- [ ] Ready for Dev
- [x] Done
