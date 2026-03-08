# Story 4.7: Topico 10 — Qual Ferramenta Usar?

Status: done

## Story

As a apresentador,
I want apresentar o Topico 10 com a LiveTable e o DecisionWizard integrados,
so that a audiencia visualize a comparacao e os pos-palestra possam tomar a decisao de forma autonoma.

## Acceptance Criteria

1. **Given** que o apresentador navega ate o Topico 10 **When** o topico entra em foco **Then** `Topic10.tsx` e renderizado com `LiveTable` e `DecisionWizard` visiveis
2. **Given** o Topico 10 renderizado **When** apresentado ao vivo **Then** a `LiveTable` e o elemento principal exibido inicialmente; o `DecisionWizard` esta acessivel (scroll ou tab)
3. **Given** o Topico 10 **When** inspecionado **Then** conteudo e dados da tabela/wizard vem de `src/data/topic10Data.ts` (que importa de liveTableData e decisionWizardData)
4. **Given** o Topico 10 com os dois componentes avancados **When** renderizado **Then** Lighthouse Performance > 90 (componentes nao adicionam peso excessivo)
5. **Given** o Topico 10 **When** o usuario clica no toggle **Then** alterna entre Pagina 1 (LiveTable + DecisionWizard) e Pagina 2 (notas narrador) via NarratorToggle
6. **Given** o Topico 10 na Pagina 2 **When** exibida **Then** renderiza notas via MatrixTerminal
7. **Given** o Topico 10 **When** visualizado em projetor **Then** LiveTable e legivel sem overflow, DecisionWizard funcional

## Tasks / Subtasks

- [x] Task 1: Criar `src/data/topic10Data.ts` (AC: #3)
  - [x] 1.1 Definir interface `Topic10Data` com: title, subtitle, narratorNotes. Importar e re-exportar dados de liveTableData e decisionWizardData
  - [x] 1.2 Popular narratorNotes de docs/topicos/topic10.md
  - [x] 1.3 Exportar interface e const
- [x] Task 2: Implementar `Topic10.tsx` com DUAL-COMPONENT SHOWCASE (AC: #1-#7)
  - [x] 2.1 Estrutura base: TopicReveal + NarratorToggle
  - [x] 2.2 PAGINA 1 — Layout showcase com 2 secoes verticais:
    - Titulo + subtitulo ("Ferramentas por escala: Spec-Kit -> GSD -> BMAD")
    - SECAO A: LiveTable como hero (tabela comparativa das 5 dimensoes). Full-width, legivel em projetor. Sinais de adocao (stars) como rodape discreto da tabela
    - GlowDivider separando secoes
    - SECAO B: DecisionWizard como elemento interativo secundario. Card com label "Descubra qual ferramenta usar" acima do wizard. Pode ficar abaixo do fold (scroll) durante apresentacao ao vivo
    - Nota: "Nao e competicao; e maturidade por complexidade" como tagline
  - [x] 2.3 PAGINA 2 — MatrixTerminal com narratorNotes (foco na conducao da comparacao ao vivo)
  - [x] 2.4 Responsivo: LiveTable e DecisionWizard empilham naturalmente
  - [x] 2.5 Performance: componentes ja sao lazy-loaded via Topic10. Nao adicionar bundles extras
- [x] Task 3: Testes (AC: todos)
  - [x] 3.1 Testar render titulo de topic10Data
  - [x] 3.2 Testar que LiveTable esta presente com dados de comparacao
  - [x] 3.3 Testar que DecisionWizard esta presente
  - [x] 3.4 Testar toggle content/notes
  - [x] 3.5 Testar MatrixTerminal nas notas
  - [x] 3.6 Testar dados de topic10Data
- [x] Task 4: Gates
  - [x] 4.1 `npm test` verde
  - [x] 4.2 `npm run build` sem erros
  - [x] 4.3 Lazy-load ok
  - [x] 4.4 Verificar que Lighthouse Performance > 90 (rodar build + serve + lighthouse ou verificar bundle size)

## Dev Notes

### Developer Context Section
- Topico 10 e o FECHAMENTO do Bloco 3 — integra os 2 componentes avancados (LiveTable + DecisionWizard) criados nas Stories 4.5 e 4.6.
- DEPENDE de Stories 4.5 e 4.6 estarem completas antes da implementacao.
- Layout: showcase vertical com LiveTable como hero + DecisionWizard como complemento interativo. Distinto de TODOS os outros topics.
- User argument: "creative on layout + use narrator notes component"
- Risco: dois componentes complexos no mesmo topico podem impactar performance. Ambos devem ser leves (CSS animations, nao JS heavy).

### Technical Requirements
- LiveTable (de Story 4.5) com dados de liveTableData.ts
- DecisionWizard (de Story 4.6) com dados de decisionWizardData.ts
- NarratorToggle + MatrixTerminal para pagina 2
- TopicReveal + TopicRevealItem
- GlowDivider entre secoes
- Performance: nao adicionar deps novas, componentes ja lazy-loaded

### Architecture Compliance
- Dados em src/data/topic10Data.ts (importa de liveTableData e decisionWizardData)
- UI em Topic10.tsx
- NAO duplicar dados — importar dos data files ja criados
- Manter keyboard isolation do DecisionWizard

### Library / Framework Requirements
- React 19.x, Framer Motion 12.x, Tailwind 4.x — sem novas deps

### File Structure Requirements
- Criar: src/data/topic10Data.ts, src/__tests__/topic10.test.tsx
- Atualizar: src/components/topics/Topic10.tsx
- Dependencias OBRIGATORIAS (devem existir antes):
  - src/components/ui/LiveTable.tsx (Story 4.5)
  - src/components/ui/DecisionWizard.tsx (Story 4.6)
  - src/data/liveTableData.ts (Story 4.5)
  - src/data/decisionWizardData.ts (Story 4.6)

### Testing Requirements
- Render titulo, LiveTable, DecisionWizard, toggle, MatrixTerminal
- Dados de topic10Data
- Performance: bundle size razoavel
- Suite + build verde

### Topic Component Pattern (OBRIGATORIO)
- DIFERENCIAL: dual-component showcase (LiveTable hero + DecisionWizard interativo)
- Unico topico que combina 2 componentes avancados
- Nao repetir layouts dos Topics 6-9

### Dependencies
- Story 4.5 (LiveTable) DEVE estar completa
- Story 4.6 (DecisionWizard) DEVE estar completa
- Implementar esta story POR ULTIMO no Epic 4

### Previous Story Intelligence
- Todos os topics 6-9 tem layouts distintos — Topic 10 adiciona mais um layout unico
- NarratorToggle + MatrixTerminal consolidados

### Project Context Reference
- docs/topicos/topic10.md (conteudo consolidado)
- _bmad-output/planning-artifacts/design-system.md
- _bmad-output/planning-artifacts/epics.md (Epic 4 / Story 4.7)
- Stories 4.5 e 4.6 (componentes dependentes)

## Dev Agent Record

### Agent Model Used
GPT-5.4 (GitHub Copilot)
### Debug Log References
- Red phase: `npm test -- topic10.test.tsx` falhou com `Topic10` ainda como placeholder e `topic10Data` sem composicao dos dados compartilhados
- Ajuste de teste: assert de `Spec-Kit` ficou ambiguo por aparecer na tabela e no rodape de adocao; resolvido com `within(screen.getByTestId('live-table'))`
- Gates validados: `npm test` (193 testes passando) e `npm run build` com chunk `Topic10` em 15.35 kB / gzip 5.57 kB
### Completion Notes List
- Implementado `Topic10.tsx` como showcase vertical com `LiveTable` hero, `GlowDivider`, `DecisionWizard` secundario e `NarratorToggle`
- Pagina de notas adicionada com `MatrixTerminal` alimentado por `narratorNotes` derivados do topico consolidado
- `topic10Data.ts` reestruturado com interface `Topic10Data`, re-export de `liveTableData` e `decisionWizardData`, labels dedicados e rodape de adocao com sinais de tracao
- Adicionados testes de integracao em `src/__tests__/topic10.test.tsx` cobrindo data source, tabela, wizard, toggle e notas
- Regressao completa verde: 25 arquivos de teste / 193 testes passando
- Build de producao validado com lazy-load preservado e bundle enxuto para `Topic10`
### File List
- src/components/topics/Topic10.tsx (modificado)
- src/data/topic10Data.ts (modificado)
- src/__tests__/topic10.test.tsx (novo)
- _bmad-output/implementation-artifacts/sprint-status.yaml (modificado)
- _bmad-output/implementation-artifacts/4-7-topico-10-qual-ferramenta-usar.md (modificado)

### Senior Developer Review (AI)
- 2026-03-08: Revisao concluida sem bloqueios para ACs da Story 4.7.
- Validado o fluxo dual-component (LiveTable hero + DecisionWizard) com toggle para notas e MatrixTerminal.
- Evidencias de gate: `npm test -- liveTable.test.tsx decisionWizard.test.tsx topic10.test.tsx --run` (suite verde) e `npm run build` (build verde, chunk Topic10 mantido enxuto).

### Change Log
- 2026-03-08: Story 4.7 implementada com `Topic10` em layout dual-component showcase, `topic10Data` composto a partir de `liveTableData` e `decisionWizardData`, notas em `MatrixTerminal`, testes dedicados e validacao completa (`npm test`, `npm run build`)
- 2026-03-08: Code review aprovado. Story movida para `done` apos ajustes de navegacao por teclado no DecisionWizard.
