# Story 4.3: Topico 8 — GSD em Acao (Terminal Interativo)

Status: done

## Story

As a audiencia,
I want ver o Topico 8 com uma simulacao de terminal mostrando o GSD rodando com comandos reais e output animado,
so that eu visualize concretamente como o workflow GSD funciona na pratica com contexto fresco por fase.

## Acceptance Criteria

1. **Given** que o apresentador navega ate o Topico 8 **When** o topico entra em foco **Then** `Topic8.tsx` e renderizado com conteudo de `src/data/topic8Data.ts`
2. **Given** o Topico 8 renderizado **When** visualizado em projetor **Then** conteudo legivel, sem overflow, padding minimo p-8
3. **Given** as animacoes de entrada **When** o topico estabiliza **Then** elementos entram com delay escalonado >= 0.4s
4. **Given** o Topico 8 **When** renderizado **Then** exibe layout de SIMULACAO DE TERMINAL com MatrixTerminal mostrando comandos GSD sendo "digitados" sequencialmente — visualmente distinto dos topics anteriores
5. **Given** a simulacao de terminal **When** ativa **Then** texto aparece via typewriter effect em fonte monospace verde sobre fundo escuro com velocidade rapida (simula output de LLM)
6. **Given** o Topico 8 **When** o usuario clica no toggle **Then** alterna entre Pagina 1 (terminal + metricas) e Pagina 2 (notas narrador) via NarratorToggle
7. **Given** o Topico 8 na Pagina 2 **When** exibida **Then** renderiza notas via MatrixTerminal
8. **Given** o typewriter effect **When** em execucao **Then** nao bloqueia navegacao por teclado da apresentacao

## Tasks / Subtasks

- [x] Task 1: Criar `src/data/topic8Data.ts` (AC: #1)
  - [x] 1.1 Definir interface `Topic8Data` com: title, subtitle, heroMetric (52 tarefas/68 testes), secondaryMetric (100k linhas/2 semanas), terminalLines (array de TerminalLine para simulacao GSD: new-project, discuss, plan, execute, verify), workflowRail (5 comandos com descricao), recoveryCommands (progress, debug, quick), brownfieldNote, narratorNotes
  - [x] 1.2 Popular dados de docs/topicos/topic8.md — comandos reais do GSD
  - [x] 1.3 Exportar interface e const
- [x] Task 2: Implementar `Topic8.tsx` com TERMINAL + METRICAS SIDE-BY-SIDE (AC: #1-#8)
  - [x] 2.1 Estrutura base: TopicReveal + NarratorToggle
  - [x] 2.2 PAGINA 1 — Layout terminal com metricas laterais:
    - Titulo compacto no topo
    - Layout 2 colunas: esquerda = MatrixTerminal grande com simulacao de comandos GSD (typewriter); direita = stack vertical de metricas (AnimatedCounter 52 tarefas + AnimatedCounter 100k linhas) + cards de workflow rail compactos
    - Terminal mostra sequencia real: $ /gsd:new-project, output, $ /gsd:plan-phase 1, output, $ /gsd:execute-phase 1, output com commits atomicos
    - Metricas com variant="success" e context explicativo
    - Abaixo: nota de brownfield (map-codebase) como card discreto
  - [x] 2.3 PAGINA 2 — MatrixTerminal com narratorNotes
  - [x] 2.4 Responsivo: colunas empilham em < 1024px
  - [x] 2.5 Garantir que typewriter nao bloqueia teclado (keyboard navigation independente)
- [x] Task 3: Testes (AC: todos)
  - [x] 3.1 Testar render titulo de topic8Data
  - [x] 3.2 Testar MatrixTerminal presente com linhas de simulacao
  - [x] 3.3 Testar AnimatedCounter(s) presentes
  - [x] 3.4 Testar toggle content/notes
  - [x] 3.5 Testar dados de topic8Data
- [x] Task 4: Gates
  - [x] 4.1 `npm test -- src/__tests__/topic8.test.tsx` verde
  - [x] 4.2 `npm run build` sem erros
  - [x] 4.3 Lazy-load ok

## Dev Notes

### Developer Context Section
- Topico 8 mostra o GSD "ao vivo" com simulacao de terminal — e o topico mais interativo do Epic 4.
- Layout: terminal grande a esquerda + metricas/cards a direita. Distinto do pipeline (Topic 7) e da escada (Topic 6).
- O MatrixTerminal ja existe e suporta typewriter — reusar diretamente.
- User argument: "creative on layout + use narrator notes component"
- Risco: terminal grande demais pode comprometer legibilidade das metricas. Balancear 60/40 ou 55/45 split.

### Technical Requirements
- MatrixTerminal (terminal simulacao principal + notas narrador pagina 2)
- AnimatedCounter (metricas: 52 tasks, 100k lines)
- NeonCard (workflow rail nodes, brownfield card)
- NarratorToggle (page toggle)
- TopicReveal + TopicRevealItem
- Terminal lines devem usar tipos existentes: prompt, comment, keyword, string, output

### Architecture Compliance
- Dados em src/data/topic8Data.ts, UI em Topic8.tsx
- Reusar MatrixTerminal existente — NAO criar componente de terminal novo
- NAO bloquear keyboard navigation global

### Library / Framework Requirements
- React 19.x, Framer Motion 12.x, Tailwind 4.x — sem novas deps

### File Structure Requirements
- Criar: src/data/topic8Data.ts, src/__tests__/topic8.test.tsx
- Atualizar: src/components/topics/Topic8.tsx

### Testing Requirements
- Render titulo do data source
- MatrixTerminal com linhas de simulacao
- AnimatedCounters presentes
- Toggle funcional
- Suite + build verde

### Topic Component Pattern (OBRIGATORIO)
- DIFERENCIAL: terminal grande + metricas laterais (layout 2 colunas asimetrico)
- Nao repetir pipeline (T7) ou escada (T6) ou SplitScreen (T1-5)

### Previous Story Intelligence
- Topic 7 usa pipeline vertical — NAO repetir
- Topic 6 usa escada — NAO repetir
- MatrixTerminal ja validado em multiplos topics para pagina 2

### Project Context Reference
- docs/topicos/topic8.md, docs/gsd-guid.md
- _bmad-output/planning-artifacts/design-system.md
- _bmad-output/planning-artifacts/epics.md (Epic 4 / Story 4.3)

## Dev Agent Record

### Agent Model Used
- GPT-5.2 (GitHub Copilot CLI)
### Debug Log References
- `npm run build` (passou)
- `npm test -- src/__tests__/topic8.test.tsx` (passou: 7/7)
- `npm test` (suite completa passou: 169/169)
### Completion Notes List
- Placeholder de Topic8 substituido por implementacao real baseada em `topic8Data`, com layout diferencial de terminal grande + metricas laterais.
- Conteudo funcional centralizado em `src/data/topic8Data.ts` (comandos GSD, workflow rail, recovery commands, nota brownfield e notas do narrador).
- Page toggle (Conteudo/Notas) implementado com `NarratorToggle`; pagina de notas renderiza via `MatrixTerminal`.
- Testes focados criados para dados, renderizacao, terminal/typewriter, counters, toggle e nao-bloqueio de teclado global.
- Gate 4.2 validado com build verde apos consolidacao das stories paralelas.
### File List
- `src/data/topic8Data.ts` (novo)
- `src/components/topics/Topic8.tsx` (atualizado)
- `src/__tests__/topic8.test.tsx` (novo)
- `_bmad-output/implementation-artifacts/4-3-topico-8-gsd-em-acao-typewriter-effect.md` (atualizado)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (atualizado — story status → review)

## Change Log

- 2026-03-06: Implementada Story 4.3 com Topic8 completo, data source dedicado e suite de testes focada.
- 2026-03-06: Code review — corrigido titulo para text-5xl lg:text-6xl (design system compliance); File List corrigido para forward slashes e completado com artifact e sprint-status.
