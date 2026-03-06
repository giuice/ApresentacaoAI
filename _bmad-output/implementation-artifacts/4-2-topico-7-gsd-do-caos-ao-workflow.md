# Story 4.2: Topico 7 — Spec-Kit: Da Ideia ao PR em 7 Comandos

Status: ready-for-dev

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

- [ ] Task 1: Criar `src/data/topic7Data.ts` (AC: #1, #7)
  - [ ] 1.1 Definir interface `Topic7Data` com: title, subtitle, heroMetric (12h->15min), pipelineSteps (array de 7 etapas com command, description, outputs, checklist), sixPrinciples (array), ecosystem (array de ferramentas SDD), honestView (criticas e respostas), narratorNotes
  - [ ] 1.2 Popular dados a partir de `docs/topicos/topic7.md`
  - [ ] 1.3 Exportar interface e const tipadas
- [ ] Task 2: Implementar `Topic7.tsx` com layout PIPELINE VERTICAL (AC: #1-#7)
  - [ ] 2.1 Estrutura base: TopicReveal + state pagina + NarratorToggle
  - [ ] 2.2 PAGINA 1 — Layout pipeline vertical criativo:
    - Hero metric "12h -> 15min" com AnimatedCounter (value=15, suffix="min") variant="success"
    - Pipeline vertical: 7 nos conectados por linhas com glow (tipo circuito tech)
    - Cada no mostra: comando (/specify, /clarify, /plan, /analyze, /tasks, /implement) + descricao curta + icones de outputs
    - Nos se revelam sequencialmente de cima para baixo com stagger
    - Linha de conexao entre nos com animacao de "fluxo" (gradient moving)
    - Abaixo do pipeline: card de credibilidade com quote do GitHub + stars (71k)
  - [ ] 2.3 PAGINA 2 — MatrixTerminal com narratorNotes
  - [ ] 2.4 Responsividade: pipeline vertical funciona bem em qualquer largura
  - [ ] 2.5 Respeitar prefers-reduced-motion
- [ ] Task 3: Testes (AC: todos)
  - [ ] 3.1 Testar render titulo/subtitulo de topic7Data
  - [ ] 3.2 Testar AnimatedCounter presente
  - [ ] 3.3 Testar que 7 nos do pipeline sao renderizados (commands visiveis)
  - [ ] 3.4 Testar toggle content/notes
  - [ ] 3.5 Testar MatrixTerminal na pagina de notas
  - [ ] 3.6 Testar dados de topic7Data
- [ ] Task 4: Gates de qualidade
  - [ ] 4.1 `npm test` verde
  - [ ] 4.2 `npm run build` sem erros
  - [ ] 4.3 Verificar lazy-load no App.tsx

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
### Debug Log References
### Completion Notes List
### File List
