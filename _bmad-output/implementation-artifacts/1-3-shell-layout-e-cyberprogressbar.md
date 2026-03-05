# Story 1.3: shell-layout-e-cyberprogressbar

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a apresentador,  
I want ver o shell da apresentacao com indicador de progresso no rodape,  
so that eu e a audiencia saibamos em qual bloco narrativo estamos durante a apresentacao.

## Acceptance Criteria

1. Dado que o app e aberto, quando qualquer topico esta ativo, entao `PresentationLayout.tsx` envolve o conteudo com shell (area central + rodape).
2. Dado o shell renderizado, quando `currentTopicIndex` for de 1 a 16, entao `CyberProgressBar` mostra 5 blocos e o bloco ativo recebe glow neon verde (`#00FF41`).
3. Dado que o topico atual e 6, quando a barra e inspecionada, entao o 3o segmento esta ativo/iluminado.
4. Dada a area de conteudo do shell, quando renderizada em viewport 1024x768, entao o conteudo central nao ultrapassa os limites visiveis.
5. Dado que os topicos `Topic1..Topic16` estao configurados como lazy, quando o app carrega, entao apenas o shell carrega eagerly e topicos sao carregados sob demanda com `React.lazy` + `Suspense`.

## Tasks / Subtasks

- [x] Implementar shell base com layout de apresentacao e rodape fixo funcional (AC: 1, 4)
  - [x] Criar `src/components/layout/PresentationLayout.tsx` com estrutura `min-h-screen`, area central de conteudo e regiao de progresso no rodape
  - [x] Garantir contenção visual para 1024x768 sem overflow horizontal e sem cortes de conteudo principal
  - [x] Manter classes de tema Matrix e legibilidade (fundo escuro, texto claro, destaque neon)
- [x] Implementar `CyberProgressBar` com 5 segmentos narrativos e estado ativo derivado do topico (AC: 2, 3)
  - [x] Criar `src/components/layout/CyberProgressBar.tsx`
  - [x] Definir funcao pura de mapeamento `topicIndex -> segmentIndex` (1..16 para 1..5)
  - [x] Aplicar estado visual ativo com glow Matrix Green (`#00FF41`) e estado inativo discreto
- [x] Integrar shell ao app mantendo o `PresentationContext` como source of truth (AC: 1, 2)
  - [x] Refatorar `src/App.tsx` para renderizar `PresentationLayout` envolvendo o conteudo do topico atual
  - [x] Continuar usando `useKeyboardNavigation` sem regressao comportamental
- [x] Configurar lazy-load real dos topicos no App shell (AC: 5)
  - [x] Declarar `React.lazy` para `Topic1..Topic16` e fallback via `Suspense`
  - [x] Garantir que shell e progress bar nao fiquem dentro do fallback (shell deve estar sempre presente)
  - [x] Adotar placeholders temporarios para topicos nao implementados sem bloquear navegacao
- [x] Cobrir comportamento critico com testes automatizados (AC: 2, 3, 4, 5)
  - [x] Testar mapeamento de segmento ativo (incluindo validacao explicita de topico 6 -> segmento 3)
  - [x] Testar render do layout shell + progress bar sem depender de estilos
  - [x] Testar fluxo de lazy/suspense garantindo fallback apenas no conteudo do topico
- [x] Validar story localmente antes de mover para in-progress (AC: 1..5)
  - [x] `npm run test`
  - [x] `npm run build`

## Dev Notes

### Developer Context Section

- Esta story e a transicao do MVP tecnico (contexto + teclado) para um app de apresentacao com estrutura visual real.
- O escopo aqui e shell + progress + lazy dos topicos. Nao implementar ainda: overview completo (1.4), hash sync (1.5) e transicoes cinematicas (Epic 2).
- O resultado deve manter confianca de palco: shell sempre estavel, navegacao por teclado responsiva, e indicacao clara de progresso narrativo.

### Technical Requirements

- `PresentationLayout` deve ser o container principal da experiencia:
  - area central para o topico atual
  - rodape com `CyberProgressBar`
- Mapeamento recomendado para os 5 segmentos narrativos (alinhado aos topicos consolidados):
  - Segmento 1: Topicos 1-3 (Bloco 1 - O Problema)
  - Segmento 2: Topicos 4-5 (Bloco 2 - A Evolucao)
  - Segmento 3: Topicos 6-10 (Bloco 3 - As Ferramentas)
  - Segmento 4: Topicos 11-13 (Bloco 4 - O Novo Papel)
  - Segmento 5: Topicos 14-16 (Bloco 5 - Impacto e Encerramento)
- `currentTopicIndex` continua sendo a unica verdade para calcular topico atual e segmento ativo.
- Topicos devem ser carregados por demanda com `React.lazy` + `Suspense`; shell continua carregado imediatamente.
- Evitar layout fixo em pixels altos. Preferir proporcoes/viewport para robustez em projetor.

### Architecture Compliance

- Manter separacao de responsabilidades:
  - `contexts/` para estado global de navegacao
  - `hooks/` para side effects de teclado
  - `components/layout/` para shell/progresso
  - `components/topics/` para views de topicos
- Nao introduzir router.
- Nao usar barrel exports.
- Reducer continua puro; regras de topico (boundaries 1..16) permanecem no `PresentationContext`.

### Library / Framework Requirements

- React:
  - `React.lazy` para import dinamico de topicos
  - `Suspense` para fallback de carregamento do conteudo
  - `StrictMode` continua ativo em `main.tsx`; efeitos devem ser resilientes ao re-run em dev
- Tailwind 4:
  - manter tokens do tema via `@theme` e classes utilitarias
- Framer Motion:
  - nao e obrigatorio nesta story, mas estrutura de shell deve permitir integracao futura com `AnimatePresence`
- Testing Library:
  - usar `userEvent.setup()` e interacoes orientadas a usuario para fluxos de teclado/comportamento

### File Structure Requirements

- Arquivos principais desta story:
  - `src/components/layout/PresentationLayout.tsx`
  - `src/components/layout/CyberProgressBar.tsx`
  - `src/components/topics/Topic1.tsx` ... `src/components/topics/Topic16.tsx` (placeholders ou implementacoes minimas para lazy-load)
  - `src/App.tsx`
  - `src/__tests__/` (novos testes para layout/progress/lazy)
- Nao alterar estrutura base de pastas definida nas stories anteriores.
- Nao mexer em dependencias/package versions sem necessidade objetiva desta story.

### Testing Requirements

- Cobertura minima obrigatoria para reduzir regressao:
  - mapeamento de segmento ativo por `currentTopicIndex` (incluindo AC explicito: topico 6 ativa segmento 3)
  - render do shell com area central + progress bar no rodape
  - comportamento de lazy-load de topicos via `Suspense` sem esconder o shell
- Regressao basica:
  - navegacao por teclado continua funcional (stories anteriores)
  - boundaries 1 e 16 seguem sem wraparound

### Previous Story Intelligence

- Story 1.2 ja entregou a base correta:
  - `PresentationContext` com reducer, limites e actions obrigatorias
  - `useKeyboardNavigation` com protecao para `event.repeat` e campos editaveis
  - testes de reducer e teclado cobrindo limites e sequencias rapidas
- Evitar retrabalho do que ja esta estavel. Esta story deve compor sobre essa base, nao substituir logica de navegacao.
- A `App.tsx` atual esta minimalista e pode ser refatorada para shell/layout, desde que nao quebre contratos do contexto.

### Git Intelligence Summary

- Commits recentes indicam foco em setup e fundacao da app (`package`, `tsconfig`, `styles`, `App`, artefatos BMAD).
- Padrrao observado: consolidar requisitos primeiro nos arquivos de story e depois implementar com testes.
- Pontos de cuidado para evitar regressao acidental:
  - nao alterar scripts/versions de build sem necessidade
  - preservar alias/import patterns e estrutura definida no `project-context`
  - manter consistencia com arquivos ja criados em `src/contexts`, `src/hooks` e `src/__tests__`

### Latest Tech Information (2026-03-05)

- React docs seguem recomendando `lazy` + `Suspense` para code-splitting de componentes e fallback controlado.
- React `StrictMode` continua com checks de desenvolvimento (double render/re-run de efeitos) para detectar efeitos impuros; handlers/listeners devem ter cleanup correto.
- Vite 7 e a linha estavel, e o time do Vite ja publicou anuncio de Vite 8 Beta (2025-12-03). Esta story nao exige migracao de major.
- Tailwind CSS v4 consolidou o modelo CSS-first com `@theme`; v4.1 expandiu utilitarios (ex.: text shadows/masks/gradients), sem impacto obrigatorio nesta story.
- Motion docs continuam recomendando `AnimatePresence mode=\"wait\"` para sequenciamento de saida/entrada, relevante para as proximas stories de transicao.
- Testing Library mantem `userEvent.setup()` e `keyboard()` como abordagem recomendada para testes realistas de teclado.

### Project Context Reference

- Artefatos que governam esta story:
  - `_bmad-output/planning-artifacts/epics.md` (Epic 1 / Story 1.3)
  - `_bmad-output/planning-artifacts/architecture.md` (layout boundaries, lazy-load, state ownership)
  - `_bmad-output/planning-artifacts/prd.md` (FR1-FR5, FR27-FR29, NFR4-NFR7)
  - `_bmad-output/planning-artifacts/ux-design-specification.md` (keyboard-first, legibilidade e ritmo de apresentacao)
  - `_bmad-output/project-context.md` (regras de stack e codificacao)
  - `docs/topicos/topic1.md` ... `docs/topicos/topic16.md` (blocos narrativos consolidados)

### Story Completion Status

- Story context criada para prevenir erros classicos de implementacao:
  - shell acoplado ao fallback de lazy (quebra UX de apresentacao)
  - mapeamento incorreto de segmentos narrativos
  - regressao de teclado/reducer ao refatorar `App.tsx`
  - layout que estoura em projetor 1024x768
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3: Shell Layout & CyberProgressBar]
- [Source: _bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/prd.md#Functional Requirements]
- [Source: _bmad-output/planning-artifacts/prd.md#Non-Functional Requirements]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Journey 1: The Guided Presentation (Presenter Mode)]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Component Strategy]
- [Source: _bmad-output/project-context.md#Critical Implementation Rules]
- [Source: docs/topicos/topic1.md]
- [Source: docs/topicos/topic4.md]
- [Source: docs/topicos/topic6.md]
- [Source: docs/topicos/topic11.md]
- [Source: docs/topicos/topic14.md]
- [Source: https://react.dev/reference/react/lazy]
- [Source: https://react.dev/reference/react/Suspense]
- [Source: https://react.dev/reference/react/StrictMode]
- [Source: https://vite.dev/blog]
- [Source: https://tailwindcss.com/blog/tailwindcss-v4]
- [Source: https://tailwindcss.com/blog/tailwindcss-v4-1]
- [Source: https://motion.dev/docs/react-animate-presence]
- [Source: https://testing-library.com/docs/user-event/setup/]
- [Source: https://testing-library.com/docs/user-event/keyboard/]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/create-story/instructions.xml`
- Template: `_bmad/bmm/workflows/4-implementation/create-story/template.md`

### Implementation Plan

- Shell layout com `PresentationLayout` como container principal (min-h-screen, flex column, overflow hidden)
- `CyberProgressBar` com funcao pura `getSegmentIndex` para mapeamento topic->segment
- Glow neon via Tailwind shadow utilities com cor #00FF41
- Lazy loading de 16 topicos via `React.lazy` + `Suspense` no `App.tsx`
- Shell (layout + progress bar) fora do Suspense boundary para ficar sempre visivel
- Placeholders para Topic2..Topic16 com conteudo minimo

### Completion Notes List

- Story 1.3 criada no diretorio de implementation artifacts.
- Contexto tecnico consolidado para shell, progress bar e lazy-load dos topicos.
- Inteligencia de story anterior e historico recente incorporada para reduzir regressao.
- Story marcada como `ready-for-dev` no tracking de sprint.
- Story pronta para execucao com `dev-story`.
- Implementacao completa: PresentationLayout, CyberProgressBar, lazy-load de topicos, testes automatizados.
- 27 testes passando (6 arquivos), 0 regressoes. Build OK.
- Todos os 5 ACs satisfeitos e validados com testes.

### File List

- `src/components/layout/PresentationLayout.tsx` (novo)
- `src/components/layout/CyberProgressBar.tsx` (novo)
- `src/components/topics/Topic1.tsx` (novo)
- `src/components/topics/Topic2.tsx` (novo)
- `src/components/topics/Topic3.tsx` (novo)
- `src/components/topics/Topic4.tsx` (novo)
- `src/components/topics/Topic5.tsx` (novo)
- `src/components/topics/Topic6.tsx` (novo)
- `src/components/topics/Topic7.tsx` (novo)
- `src/components/topics/Topic8.tsx` (novo)
- `src/components/topics/Topic9.tsx` (novo)
- `src/components/topics/Topic10.tsx` (novo)
- `src/components/topics/Topic11.tsx` (novo)
- `src/components/topics/Topic12.tsx` (novo)
- `src/components/topics/Topic13.tsx` (novo)
- `src/components/topics/Topic14.tsx` (novo)
- `src/components/topics/Topic15.tsx` (novo)
- `src/components/topics/Topic16.tsx` (novo)
- `src/App.tsx` (modificado)
- `src/App.test.tsx` (modificado)
- `src/__tests__/cyberProgressBar.test.ts` (novo)
- `src/__tests__/presentationLayout.test.tsx` (novo)
- `src/__tests__/appLazyLoad.test.tsx` (novo)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modificado)
- `_bmad-output/implementation-artifacts/1-3-shell-layout-e-cyberprogressbar.md` (modificado)

### Change Log

- 2026-03-05: Implementacao completa da story 1.3 — shell layout, CyberProgressBar, lazy-load de topicos, testes

### Status

- [x] Done
