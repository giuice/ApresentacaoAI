# Story 4.5: Componente LiveTable (Tabela Viva)

Status: done

## Story

As a audiencia,
I want ver uma tabela comparativa interativa (Spec-Kit vs GSD vs BMAD) com hover e tooltips,
so that a decisao de qual ferramenta usar seja visualmente obvia sem o apresentador precisar explicar cada celula.

## Acceptance Criteria

1. **Given** o componente `LiveTable` com dados de comparacao das 3 ferramentas **When** renderizado **Then** exibe grid com linhas (dimensoes de comparacao) e colunas (Spec-Kit, GSD, BMAD)
2. **Given** o `LiveTable` em estado padrao **When** o cursor passa sobre uma celula (hover) **Then** a celula recebe efeito scanline Matrix (linha horizontal animada) e destaque de borda verde
3. **Given** celulas com informacao adicional configuradas com tooltip **When** o hover ocorre **Then** um tooltip aparece com texto explicativo da celula
4. **Given** o `LiveTable` **When** renderizado em viewport de projetor **Then** todas as celulas sao legiveis sem overflow horizontal
5. **Given** o `LiveTable` **When** utilizado **Then** aceita dados genericos via props (columns, rows) — componente reutilizavel, nao acoplado a dados especificos

## Tasks / Subtasks

- [x] Task 1: Implementar componente `LiveTable` reutilizavel (AC: #1-#5)
  - [x] 1.1 Definir interfaces: `TableColumn` (key, label), `TableCell` (text, tooltip?, highlight?: 'low'|'medium'|'high'), `TableRow` (label, cells: Record<string, TableCell>)
  - [x] 1.2 Implementar grid responsivo: header row + data rows. Header com accent-primary, rows com bg-bg-card alternado
  - [x] 1.3 Implementar hover effect: scanline animada (pseudo-element com translateY animation) + border accent-primary + box-shadow glow
  - [x] 1.4 Implementar tooltips: on hover, tooltip aparece abaixo da celula com bg-bg-surface, border-border-subtle, text-text-secondary, max-width para legibilidade
  - [x] 1.5 Implementar highlight por intensidade: low=text-text-muted, medium=text-text-secondary, high=text-accent-primary (visual heatmap sutil)
  - [x] 1.6 Garantir legibilidade em projetor: min font-size text-sm, padding adequado, sem overflow horizontal (truncate com tooltip se necessario)
  - [x] 1.7 Respeitar prefers-reduced-motion: scanline desabilitada, hover so muda cor
- [x] Task 2: Criar dados de comparacao para uso no Topic 10 (AC: #1)
  - [x] 2.1 Criar src/data/liveTableData.ts com os dados das 5 dimensoes do comparativo (complexidade, agentes, output, curva, caso ideal) + sinais de adocao
  - [x] 2.2 Exportar como const tipada
- [x] Task 3: Testes do LiveTable (AC: #1-#5)
  - [x] 3.1 Testar render do grid com colunas e linhas
  - [x] 3.2 Testar que celulas renderizam texto correto
  - [x] 3.3 Testar que tooltips existem para celulas configuradas
  - [x] 3.4 Testar que highlight classes sao aplicadas corretamente
  - [x] 3.5 Testar que componente aceita dados genericos (nao acoplado)
- [x] Task 4: Gates
  - [x] 4.1 `npm test` verde
  - [x] 4.2 `npm run build` sem erros

## Dev Notes

### Developer Context Section
- LiveTable e um COMPONENTE REUTILIZAVEL, nao um topico. Sera usado no Topic 10 (Story 4.7).
- O design system ja especifica o componente (secao 4.5 do design-system.md).
- Scanline effect: pseudo-element com height ~2px, bg accent-primary/30, translateY animado de top a bottom ~1.5s infinite.
- Este componente ja existia como placeholder em src/components/ui/LiveTable.tsx (verificar se ja tem algo implementado).

### Technical Requirements
- Componente em src/components/ui/LiveTable.tsx
- Props genericas: columns (TableColumn[]), rows (TableRow[])
- Scanline via CSS animation (keyframes translateY)
- Tooltips: CSS-only ou state simples (hover tracking), sem lib externa
- Design system tokens para cores, bordas, glows

### Architecture Compliance
- Componente em src/components/ui/ (UI reutilizavel)
- Dados de comparacao em src/data/liveTableData.ts (separado do componente)
- Nao acoplar a dados especificos — componente generico

### File Structure Requirements
- Criar/Atualizar: src/components/ui/LiveTable.tsx
- Criar: src/data/liveTableData.ts, src/__tests__/liveTable.test.tsx

### Testing Requirements
- Render grid, celulas, tooltips, highlights
- Dados genericos aceitos
- Suite + build verde

### Previous Story Intelligence
- Design system secao 4.5 ja especifica LiveTable
- Verificar se LiveTable.tsx ja existe com alguma implementacao do Epic anterior

### Project Context Reference
- _bmad-output/planning-artifacts/design-system.md (secao 4.5)
- _bmad-output/planning-artifacts/epics.md (Epic 4 / Story 4.5)
- docs/topicos/topic10.md (dados de comparacao)

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6 (GitHub Copilot)

### Debug Log References
Nenhum — implementação sem bloqueios.

### Completion Notes List
- Reescreveu LiveTable.tsx com interfaces completas: TableColumn (key, label), TableCell (text, tooltip?, highlight? low/medium/high), TableRow (label, cells Record)
- Implementou scanline sweep via CSS keyframes translateY em pseudo-element overlay, com box-shadow glow
- Tooltips CSS-only com posicionamento fixo via ref, role="tooltip", max-width para legibilidade
- Highlight por intensidade: low→text-muted, medium→text-secondary, high→accent-primary+font-semibold
- prefers-reduced-motion: scanline animation e style tag condicionais
- Rows alternadas bg-bg-card / bg-bg-surface, font-size text-sm para projetor
- Atualizou topic10Data.ts para nova interface (TableColumn[], TableRow[] com Record<string, TableCell>)
- Criou liveTableData.ts com 5 dimensões comparativas + 3 sinais de adoção, todos com tooltips
- 7 testes unitários cobrindo render, tooltips, highlights, genericidade
- 176/176 testes passando, build limpo

### File List
- src/components/ui/LiveTable.tsx (modified — rewritten with new interfaces, tooltips, highlight levels, scanline, reduced-motion)
- src/data/liveTableData.ts (created — comparison data with 5 dimensions + adoption signals)
- src/data/topic10Data.ts (modified — adapted to new TableColumn/TableRow interfaces)
- src/__tests__/liveTable.test.tsx (created — 7 tests)

### Senior Developer Review (AI)
- 2026-03-08: Revisao concluida sem bloqueios para ACs da Story 4.5.
- Correcoes aplicadas no componente: tooltip agora reposiciona em scroll/resize para evitar drift visual durante apresentacao.
- Evidencias de gate: `npm test -- liveTable.test.tsx decisionWizard.test.tsx topic10.test.tsx --run` (suite verde) e `npm run build` (build verde).

### Change Log
- 2026-03-08: Story 4-5 implementada. LiveTable reescrito com interfaces ricas (tooltip, highlight levels, generic Record-based cells). Dados de comparação criados. topic10Data adaptado. 7 testes, 176 total suite verde, build OK.
- 2026-03-08: Code review aprovado. Story movida para `done` com ajustes de robustez no tooltip.
