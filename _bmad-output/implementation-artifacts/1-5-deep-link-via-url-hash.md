# Story 1.5: deep-link-via-url-hash

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a espectador pos-palestra,  
I want acessar um link direto para um topico especifico (ex: `#/topic/8`),  
so that eu possa revisitar partes especificas da apresentacao sem navegar do inicio.

## Acceptance Criteria

1. Dado que o usuario abre a URL com `#/topic/8`, quando o app inicializa, entao `INIT_FROM_HASH` e disparada e `currentTopicIndex` comeca em 8.
2. Dado um hash invalido (ex: `#/topic/99`, `#/topic/0`, `#foo`), quando o app inicializa, entao o fallback deterministico e Topico 1 sem crash ou erro visivel.
3. Dado que o usuario navega do Topico 3 para o Topico 4, quando a navegacao ocorre, entao a URL atualiza para `#/topic/4` automaticamente (estado manda, hash espelha).
4. Dado o hook `useHashSync`, quando testado via Vitest, entao o parse de hash valido, hash invalido e a atualizacao ao navegar passam nos testes.

## Tasks / Subtasks

- [x] Implementar hook `useHashSync` para parse inicial e espelhamento do estado na URL (AC: 1, 2, 3)
  - [x] Criar `src/hooks/useHashSync.ts` com parse do formato canonic `#/topic/<n>` (1..16)
  - [x] Na inicializacao, disparar `INIT_FROM_HASH` com fallback em 1 para hash invalido
  - [x] Atualizar hash quando `currentTopicIndex` mudar, sem loop infinito de sincronizacao
- [x] Integrar `useHashSync` no fluxo principal da aplicacao (AC: 1, 2, 3)
  - [x] Chamar `useHashSync` em `AppContent` junto de `useKeyboardNavigation`
  - [x] Garantir que navegacao por teclado e overview continuem funcionando sem regressao
- [x] Cobrir o comportamento com testes automatizados (AC: 4)
  - [x] Criar `src/__tests__/hashSync.test.tsx` com cenarios de hash valido/invalido na inicializacao
  - [x] Validar atualizacao de hash ao navegar (`NEXT`, `PREV`, `GOTO`)
  - [x] Validar que hash fora da faixa (0, 99) cai em topico 1
- [x] Validar regressao de fluxo principal
  - [x] Executar `npm run test`
  - [x] Executar `npm run build`

## Dev Notes

### Developer Context Section

- Esta story fecha o ultimo item do Epic 1 e habilita compartilhamento granular por topico.
- O contrato de estado ja existe no reducer (`INIT_FROM_HASH` incluido), mas falta o hook de sincronizacao hash <-> estado.
- A regra central da arquitetura e: estado manda, hash espelha. Nao introduzir router.

### Technical Requirements

- Formato canonico obrigatorio: `#/topic/<n>` com `<n>` em `1..16`.
- Parse inicial:
  - Ler `window.location.hash` no mount do app.
  - Se hash for valido, disparar `dispatch({ type: 'INIT_FROM_HASH', payload: n })`.
  - Se hash for invalido ou ausente, inicializar deterministicamente em topico 1.
- Espelhamento de estado:
  - Sempre que `currentTopicIndex` mudar, atualizar hash para `#/topic/<currentTopicIndex>`.
  - Evitar writes redundantes quando hash atual ja estiver correto.
- Confiabilidade:
  - Nenhum crash em entradas invalidas de hash.
  - Comportamento consistente em sessao completa (1 -> 16) sem drift entre UI e URL.

### Architecture Compliance

- Manter `PresentationContext` como unica source of truth.
- Nao adicionar React Router ou qualquer camada de roteamento.
- Reducer permanece puro; side effects de hash ficam no hook.
- Seguir estrutura alvo:
  - `src/hooks/useHashSync.ts`
  - integracao em `src/App.tsx`
  - testes em `src/__tests__/hashSync.test.tsx`

### Library / Framework Requirements

- React 19.x:
  - usar `useEffect` para side effects de leitura/escrita de hash.
  - garantir dependencia correta para evitar stale closures.
- Vite:
  - manter arquitetura sem router para compatibilidade simples com deploy estatico e hash links.
- Vitest + Testing Library:
  - usar ambiente jsdom para simular `window.location.hash`.
  - asserts focadas em comportamento observavel (estado inicial e URL final).

### File Structure Requirements

- Criar:
  - `src/hooks/useHashSync.ts`
  - `src/__tests__/hashSync.test.tsx`
- Atualizar:
  - `src/App.tsx` (integracao do hook)
- Nao alterar arquivos de topicos nesta story.

### Testing Requirements

- Cenarios minimos obrigatorios:
  - inicializa em topico do hash valido (`#/topic/8` -> 8)
  - invalido cai em topico 1 (`#/topic/99`, `#/topic/0`, `#foo`)
  - navegar para topico N atualiza hash para `#/topic/N`
  - sem regressao de navegacao por teclado e overview

### Previous Story Intelligence

- Story 1.4 consolidou o overview e bloqueio de teclado global quando `isOverviewOpen` esta ativo.
- A nova sincronizacao de hash nao pode interferir no fluxo de Esc/overview nem no comportamento de `NEXT/PREV`.
- `PresentationContext` ja contem action `INIT_FROM_HASH`; aproveitar o contrato existente e evitar nova action.

### Git Intelligence Summary

- Commits recentes concentraram shell, lazy loading, contexto e testes (`src/App.tsx`, `src/contexts/PresentationContext.tsx`, `src/hooks/useKeyboardNavigation.ts`, `src/__tests__/`).
- Padrao estabelecido no projeto:
  - implementacao enxuta por hook/componente
  - cobertura de comportamento com Vitest
  - validacao final com `npm run test` e `npm run build`

### Latest Tech Information (2026-03-05)

- React docs continuam recomendando split de codigo com `lazy` + `Suspense` para views sob demanda.
- Vite docs reforcam preload automatico de chunks dinamicos e requisito de Node moderno (20.19+ ou 22.12+), alinhado ao projeto em Node 22 LTS.
- MDN confirma que `hashchange` reage a mudancas de fragmento da URL e nao dispara em `history.pushState()`/`replaceState()`, importante para evitar suposicoes erradas no hook.
- WAI-ARIA APG para dialog modal permanece referencia para manter o comportamento de overview consistente enquanto hash sync e introduzido.
- Vitest segue integracao direta com ecossistema Vite e suporte a jsdom para testes de comportamento de URL no browser.

### Project Context Reference

- `_bmad-output/planning-artifacts/epics.md` (Epic 1 / Story 1.5)
- `_bmad-output/planning-artifacts/architecture.md` (deep link hash, state boundaries, testing focus)
- `_bmad-output/planning-artifacts/prd.md` (FR1-FR5, NFR4-NFR6)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (keyboard-first + presenter flow)
- `_bmad-output/project-context.md` (rules de stack e guardrails de implementacao)
- `_bmad-output/implementation-artifacts/1-4-modo-overview-mapa-de-topicos.md` (aprendizados imediatos do epic)

### Story Completion Status

- Story context criada para prevenir erros comuns:
  - parse incompleto de hash (aceitando lixo silenciosamente)
  - drift entre estado e URL em navegacao por teclado
  - efeitos colaterais no fluxo do overview
  - falta de testes para comportamento de deep link
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.5: Deep Link via URL Hash]
- [Source: _bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/prd.md#Functional Requirements]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Journey 1: The Guided Presentation (Presenter Mode)]
- [Source: _bmad-output/project-context.md#Critical Implementation Rules]
- [Source: https://react.dev/reference/react/lazy]
- [Source: https://react.dev/reference/react/Suspense]
- [Source: https://vite.dev/guide/features.html]
- [Source: https://vitest.dev/guide/]
- [Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event]
- [Source: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/]

## File List

- `src/hooks/useHashSync.ts` (created, updated in review fix)
- `src/__tests__/hashSync.test.tsx` (created, updated in review fix)
- `src/__tests__/hashSync.dispatch.test.tsx` (created)
- `src/App.tsx` (modified)
- `_bmad-output/implementation-artifacts/1-5-deep-link-via-url-hash.md` (modified)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)

## Change Log

- 2026-03-05: Implemented useHashSync hook with canonical hash parse (#/topic/N), INIT_FROM_HASH dispatch, and state-to-hash mirroring. Integrated in AppContent. Added 12 tests covering valid/invalid hashes and navigation sync. All 57 tests pass, build succeeds.
- 2026-03-05: Senior code review fixes applied. useHashSync now always dispatches INIT_FROM_HASH with deterministic fallback, avoids initial sync drift, canonicalizes invalid hash to #/topic/1, and adds dispatch-focused tests. Validation rerun: 61 tests passed and build succeeded.

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/dev-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/dev-story/instructions.xml`

### Implementation Plan

- Created `useHashSync` hook: parses `#/topic/<n>` on mount via regex, dispatches `INIT_FROM_HASH` for valid topics (1-16), falls back to topic 1 for invalid/absent hash. Uses `useEffect` to mirror `currentTopicIndex` changes back to URL hash, with guard to avoid redundant writes.
- Integrated hook in `AppContent` alongside `useKeyboardNavigation`.
- Tests cover: valid hash init (1, 8, 16), invalid hash fallback (0, 99, -5, garbage, non-numeric, empty), and hash mirroring on NEXT/PREV/GOTO navigation.

### Completion Notes List

- Story 1.5 criada em `_bmad-output/implementation-artifacts/`.
- Contexto tecnico consolidado para deep link via hash com guardrails de estado e testes.
- Hook useHashSync implementado com parse robusto e espelhamento de estado.
- 14 testes em `hashSync.test.tsx` e 2 testes de dispatch adicionados (`hashSync.dispatch.test.tsx`), todos passando.
- Suite completa de 61 testes sem regressao.
- Build de producao bem sucedido.
- Ajustes de review aplicados para eliminar discrepancias de inicializacao/sincronizacao do hash.

## Senior Developer Review (AI)

- Data: 2026-03-05
- Resultado: Approve
- Correcao aplicada:
  - INIT_FROM_HASH agora e disparada de forma deterministica no mount, inclusive fallback para topico 1.
  - Sincronizacao hash <- estado evita write prematuro durante bootstrap inicial.
  - Hash invalido e canonizado para `#/topic/1`.
  - Cobertura de testes ampliada para dispatch de inicializacao e cenarios de canonizacao.
- Evidencias:
  - `npm run test` -> 61 passed
  - `npm run build` -> success

## Workspace Notes

- Unrelated local changes were detected during review and are intentionally out of scope for Story 1.5:
  - `CLAUDE.md`
  - `_bmad-output/planning-artifacts/architecture.md`
  - `_bmad-output/planning-artifacts/ux-design-specification.md`
  - `_bmad-output/planning-artifacts/design-system.md`
  - `demo-temas.html`
  - `demo-ux-components.html`

### Status

- [ ] In Progress
- [ ] Review
- [ ] Ready for Dev
- [x] Done
