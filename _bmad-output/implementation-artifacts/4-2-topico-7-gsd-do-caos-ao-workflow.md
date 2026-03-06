# Story 4.2: Topico 7 — Spec-Kit: Da Ideia ao PR em 7 Comandos

Status: done

## Story

As a audiencia,
I want ver o Topico 7 apresentando o Spec-Kit em detalhe com seu workflow de 7 comandos,
so that eu entenda como especificacao estruturada substitui 12h de documentacao manual por 15min de pipeline executavel.

## Acceptance Criteria

1. **Given** que o apresentador navega ate o Topico 7 **When** o topico entra em foco **Then** `Topic7.tsx` e renderizado com conteudo vindo de `src/data/topic7Data.ts`
2. **Given** o Topico 7 renderizado **When** visualizado em projetor **Then** conteudo e legivel (WCAG AA+), sem overflow, padding minimo p-8
3. **Given** as animacoes de entrada **When** o topico estabiliza **Then** elementos entram com delay escalonado >= 0.4s
4. **Given** o Topico 7 **When** renderizado **Then** exibe layout de PIPELINE VERTICAL ANIMADO mostrando os 7 comandos do Spec-Kit como nos interconectados — visualmente distinto da escada do Topic 6 e do SplitScreen dos Topics 1-5
5. **Given** o Topico 7 **When** o usuario clica no toggle **Then** alterna entre Pagina 1 (pipeline) e Pagina 2 (notas do narrador) usando NarratorToggle
6. **Given** o Topico 7 na Pagina 2 **When** exibida **Then** renderiza notas via MatrixTerminal
7. **Given** o Topico 7 **When** inspecionado **Then** nenhum texto hardcoded — todo conteudo de topic7Data.ts

## Tasks / Subtasks

- [x] Task 1: Criar `src/data/topic7Data.ts` (AC: #1, #7)
  - [x] 1.1 Definir interface `Topic7Data` com: title, subtitle, heroMetric (12h->15min), pipelineSteps (array de 7 etapas com command, description, outputs, checklist), sixPrinciples (array), ecosystem (array de ferramentas SDD), honestView (criticas e respostas), narratorNotes
  - [x] 1.2 Popular dados a partir de `docs/topicos/topic7.md`
  - [x] 1.3 Exportar interface e const tipadas
- [x] Task 2: Implementar `Topic7.tsx` com layout PIPELINE VERTICAL (AC: #1-#7)
  - [x] 2.1 Estrutura base: TopicReveal + state pagina + NarratorToggle
  - [x] 2.2 PAGINA 1 — Layout pipeline vertical criativo:
    - [x] Hero metric "12h -> 15min" com AnimatedCounter (value=15, suffix="min") variant="success"
    - [x] Pipeline vertical: 7 nos conectados por linhas com glow (tipo circuito tech)
    - [x] Cada no mostra: comando (/specify, /clarify, /plan, /analyze, /tasks, /implement) + descricao curta + icones de outputs
    - [x] Nos se revelam sequencialmente de cima para baixo com stagger
    - [x] Linha de conexao entre nos com animacao de "fluxo" (gradient moving)
    - [x] Abaixo do pipeline: card de credibilidade com quote do GitHub + stars (71k)
  - [x] 2.3 PAGINA 2 — MatrixTerminal com narratorNotes
  - [x] 2.4 Responsividade: pipeline vertical funciona bem em qualquer largura
  - [x] 2.5 Respeitar prefers-reduced-motion
- [x] Task 3: Testes (AC: todos)
  - [x] 3.1 Testar render titulo/subtitulo de topic7Data
  - [x] 3.2 Testar AnimatedCounter presente
  - [x] 3.3 Testar que 7 nos do pipeline sao renderizados (commands visiveis)
  - [x] 3.4 Testar toggle content/notes
  - [x] 3.5 Testar MatrixTerminal na pagina de notas
  - [x] 3.6 Testar dados de topic7Data
- [x] Task 4: Gates de qualidade
  - [x] 4.1 `npm test` verde
  - [x] 4.2 `npm run build` sem erros
  - [x] 4.3 Verificar lazy-load no App.tsx

## Dev Notes

### Developer Context Section
- Topico 7 mergulha no Spec-Kit em detalhe, apresentando o workflow completo de 7 comandos.
- Layout PIPELINE VERTICAL e o diferencial — visualmente distinto da escada (Topic 6) e do SplitScreen (Topics 1-5).
- O pipeline deve parecer um diagrama de fluxo tech/circuito com nos conectados por linhas neon.
- User argument: "make sure to be creative on layout (not the same for all topics) and use narrator notes component"
- Risco: pipeline ficar confuso ou ilegivel com 7 nos. Manter cada no compacto (command + 1 linha + outputs icons).

### Technical Requirements
- Componentes: TopicReveal, TopicRevealItem, AnimatedCounter, NeonCard (para nos do pipeline), NarratorToggle, MatrixTerminal, GlowDivider
- Pipeline layout: flex-col com connecting lines via CSS (pseudo-elements ou divs com border/gradient)
- Glow nas linhas de conexao: use accent-primary com opacity gradient
- Cada no do pipeline: NeonCard variant="success" com command em font-mono bold

### Architecture Compliance
- Dados em src/data/topic7Data.ts, UI em Topic7.tsx
- Nao alterar contexto global, nao importar markdown, nao hardcodar texto

### Library / Framework Requirements
- React 19.x, Framer Motion 12.x, Tailwind 4.x — sem novas deps

### File Structure Requirements
- Criar: src/data/topic7Data.ts, src/__tests__/topic7.test.tsx
- Atualizar: src/components/topics/Topic7.tsx

### Testing Requirements
- Render titulo/dados do data source
- 7 pipeline nodes renderizados
- Toggle pagina funcional
- MatrixTerminal nas notas
- Suite + build verde

### Topic Component Pattern (OBRIGATORIO)
- TopicReveal/TopicRevealItem, AnimatedCounter, NeonCard, NarratorToggle+MatrixTerminal
- Tipografia: text-5xl lg:text-6xl font-mono font-bold titulo, text-base-lg font-sans corpo
- DIFERENCIAL: pipeline vertical com nos conectados e animacao de fluxo

### Previous Story Intelligence
- Topic 6 usa escada de 3 degraus — NAO repetir
- Topics 1-5 usam SplitScreen/grid — NAO repetir
- Todos usam NarratorToggle + MatrixTerminal para pagina 2 — MANTER

### Project Context Reference
- docs/topicos/topic7.md (conteudo consolidado)
- _bmad-output/planning-artifacts/design-system.md
- _bmad-output/planning-artifacts/epics.md (Epic 4 / Story 4.2)
- src/components/topics/Topic5.tsx (referencia de pattern)
- memory/topic-pattern.md

## Dev Agent Record

### Agent Model Used
- GPT-5.1 (GitHub Copilot CLI)
### Debug Log References
- `npm test -- src/__tests__/topic7.test.tsx` (falha inicial: `act is not a function`; corrigido import de `act`)
- `npm test -- src/__tests__/topic7.test.tsx` (passou: 6/6)
- `npm run build` (passou)
- `npm test` (suite completa passou: 169/169)
### Completion Notes List
- Placeholder de `Topic7.tsx` substituido por implementacao completa com pipeline vertical de 7 nos conectados e animacao de fluxo.
- Todo texto funcional do topico foi centralizado em `src/data/topic7Data.ts`, incluindo labels de secoes, metrica hero, pipeline, principios, ecossistema, visao honesta e notas.
- Pagina 2 implementada com `NarratorToggle` + `MatrixTerminal`, mantendo padrao dos topicos e acessibilidade.
- Criada suite `src/__tests__/topic7.test.tsx` cobrindo dados e comportamento principal do Topico 7.
### File List
- `src/data/topic7Data.ts` (novo)
- `src/components/topics/Topic7.tsx` (atualizado)
- `src/__tests__/topic7.test.tsx` (novo)
- `_bmad-output/implementation-artifacts/4-2-topico-7-gsd-do-caos-ao-workflow.md` (atualizado)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (atualizado — story status → review)

## Change Log

- 2026-03-06: Implementacao completa da Story 4.2 (Topic7), com dados tipados, layout diferencial de pipeline vertical, testes dedicados e validacao de build/test suite.
- 2026-03-06: Code review — corrigido titulo para text-5xl lg:text-6xl (design system compliance); adicionado GlowDivider entre hero metric e pipeline.
