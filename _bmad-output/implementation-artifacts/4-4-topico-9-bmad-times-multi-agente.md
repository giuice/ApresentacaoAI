# Story 4.4: Topico 9 — BMAD: Times Multi-Agente

Status: ready-for-dev

## Story

As a audiencia,
I want ver o Topico 9 apresentando o BMAD como framework agil para orquestracao de agentes IA especializados,
so that eu entenda o salto de um dev solo para um time virtual com roles definidos, artefatos compartilhados e rastreabilidade.

## Acceptance Criteria

1. **Given** que o apresentador navega ate o Topico 9 **When** o topico entra em foco **Then** `Topic9.tsx` e renderizado com conteudo de `src/data/topic9Data.ts`
2. **Given** o Topico 9 renderizado **When** visualizado em projetor **Then** conteudo legivel, sem overflow, padding minimo p-8
3. **Given** as animacoes de entrada **When** o topico estabiliza **Then** elementos entram com delay escalonado >= 0.4s
4. **Given** o Topico 9 **When** renderizado **Then** exibe layout de SQUAD BOARD com cards de agentes organizados como painel de time agil — visualmente distinto dos topics anteriores
5. **Given** o Topico 9 **When** renderizado **Then** mostra a esteira de 4 fases (Analysis->Planning->Solutioning->Implementation) com artefatos fluindo entre elas
6. **Given** o Topico 9 **When** o usuario clica no toggle **Then** alterna entre Pagina 1 (squad board + fases) e Pagina 2 (notas narrador) via NarratorToggle
7. **Given** o Topico 9 na Pagina 2 **When** exibida **Then** renderiza notas via MatrixTerminal
8. **Given** o Topico 9 **When** inspecionado **Then** todo conteudo vem de topic9Data.ts

## Tasks / Subtasks

- [ ] Task 1: Criar `src/data/topic9Data.ts` (AC: #1, #8)
  - [ ] 1.1 Definir interface `Topic9Data` com: title, subtitle, phases (array de 4 fases com name, description, outputs, agentName), agents (array de 9 agentes com name, role, whenEnters, delivers), conflictExample (sem ADR vs com ADR), metricRedHat (41% complexidade), metricMcKinsey (20-45% produtividade), narratorNotes
  - [ ] 1.2 Popular dados de docs/topicos/topic9.md e docs/bmad-guide.md
  - [ ] 1.3 Exportar interface e const
- [ ] Task 2: Implementar `Topic9.tsx` com SQUAD BOARD + ESTEIRA DE FASES (AC: #1-#8)
  - [ ] 2.1 Estrutura base: TopicReveal + NarratorToggle
  - [ ] 2.2 PAGINA 1 — Layout squad board criativo:
    - Titulo + subtitulo no topo
    - SECAO 1: Esteira de 4 fases horizontal (Analysis -> Planning -> Solutioning -> Implementation) como blocos conectados com setas/linhas. Cada bloco mostra nome + outputs principais. Blocos se revelam sequencialmente.
    - SECAO 2: Grid de agent cards (3x3 ou responsivo) — cada card mostra: nome do agente, role (1 linha), quando entra. Cards usam NeonCard variant="success" com tamanho compacto.
    - SECAO 3: Metricas de impacto — Red Hat (41% sem estrutura) e McKinsey (20-45% com estrutura) como counters pequenos
    - Frase ancora: "Documentos sao fonte da verdade. Chat e transitorio."
  - [ ] 2.3 PAGINA 2 — MatrixTerminal com narratorNotes
  - [ ] 2.4 Responsivo: esteira empilha vertical, grid de agents adapta colunas
  - [ ] 2.5 Respeitar prefers-reduced-motion
- [ ] Task 3: Testes (AC: todos)
  - [ ] 3.1 Testar render titulo de topic9Data
  - [ ] 3.2 Testar que 4 blocos de fases sao renderizados
  - [ ] 3.3 Testar que cards de agentes sao renderizados (minimo 7 agents visiveis)
  - [ ] 3.4 Testar toggle content/notes
  - [ ] 3.5 Testar MatrixTerminal nas notas
  - [ ] 3.6 Testar dados de topic9Data
- [ ] Task 4: Gates
  - [ ] 4.1 `npm test` verde
  - [ ] 4.2 `npm run build` sem erros
  - [ ] 4.3 Lazy-load ok

## Dev Notes

### Developer Context Section
- Topico 9 apresenta BMAD como o patamar mais alto da escada de ferramentas SDD.
- Layout SQUAD BOARD e o diferencial — parece um painel de time agil com cards de agentes, inspirado em Kanban/squad boards.
- Complementa com esteira de 4 fases horizontal mostrando fluxo de artefatos.
- User argument: "creative on layout + use narrator notes component"
- Risco: muita informacao (9 agentes + 4 fases + metricas). Priorizar: fases como hero visual, agents como grid compacto, metricas como rodape.

### Technical Requirements
- NeonCard (agent cards + phase blocks), TopicReveal, NarratorToggle, MatrixTerminal, GlowDivider
- Esteira de fases: flex-row com setas CSS entre blocos
- Agent grid: CSS grid auto-fill com min 200px
- Metricas: podem ser texto bold em vez de AnimatedCounter (sao metricas de contraste, nao hero)

### Architecture Compliance
- Dados em src/data/topic9Data.ts, UI em Topic9.tsx
- Nao alterar contexto global

### Library / Framework Requirements
- React 19.x, Framer Motion 12.x, Tailwind 4.x — sem novas deps

### File Structure Requirements
- Criar: src/data/topic9Data.ts, src/__tests__/topic9.test.tsx
- Atualizar: src/components/topics/Topic9.tsx

### Testing Requirements
- Render titulo, 4 fases, agent cards, toggle, MatrixTerminal
- Suite + build verde

### Topic Component Pattern (OBRIGATORIO)
- DIFERENCIAL: squad board (grid de agent cards) + esteira horizontal de 4 fases
- Nao repetir: escada (T6), pipeline (T7), terminal+metricas (T8), SplitScreen (T1-5)

### Previous Story Intelligence
- Topics 6-8 cada um com layout distinto — Topic 9 deve continuar essa diversidade
- NarratorToggle + MatrixTerminal consolidados para pagina 2

### Project Context Reference
- docs/topicos/topic9.md, docs/bmad-guide.md
- _bmad-output/planning-artifacts/design-system.md
- _bmad-output/planning-artifacts/epics.md (Epic 4 / Story 4.4)

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
