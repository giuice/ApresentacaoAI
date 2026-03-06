# Story 4.5: Componente LiveTable (Tabela Viva)

Status: ready-for-dev

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

- [ ] Task 1: Implementar componente `LiveTable` reutilizavel (AC: #1-#5)
  - [ ] 1.1 Definir interfaces: `TableColumn` (key, label), `TableCell` (text, tooltip?, highlight?: 'low'|'medium'|'high'), `TableRow` (label, cells: Record<string, TableCell>)
  - [ ] 1.2 Implementar grid responsivo: header row + data rows. Header com accent-primary, rows com bg-bg-card alternado
  - [ ] 1.3 Implementar hover effect: scanline animada (pseudo-element com translateY animation) + border accent-primary + box-shadow glow
  - [ ] 1.4 Implementar tooltips: on hover, tooltip aparece abaixo da celula com bg-bg-surface, border-border-subtle, text-text-secondary, max-width para legibilidade
  - [ ] 1.5 Implementar highlight por intensidade: low=text-text-muted, medium=text-text-secondary, high=text-accent-primary (visual heatmap sutil)
  - [ ] 1.6 Garantir legibilidade em projetor: min font-size text-sm, padding adequado, sem overflow horizontal (truncate com tooltip se necessario)
  - [ ] 1.7 Respeitar prefers-reduced-motion: scanline desabilitada, hover so muda cor
- [ ] Task 2: Criar dados de comparacao para uso no Topic 10 (AC: #1)
  - [ ] 2.1 Criar src/data/liveTableData.ts com os dados das 5 dimensoes do comparativo (complexidade, agentes, output, curva, caso ideal) + sinais de adocao
  - [ ] 2.2 Exportar como const tipada
- [ ] Task 3: Testes do LiveTable (AC: #1-#5)
  - [ ] 3.1 Testar render do grid com colunas e linhas
  - [ ] 3.2 Testar que celulas renderizam texto correto
  - [ ] 3.3 Testar que tooltips existem para celulas configuradas
  - [ ] 3.4 Testar que highlight classes sao aplicadas corretamente
  - [ ] 3.5 Testar que componente aceita dados genericos (nao acoplado)
- [ ] Task 4: Gates
  - [ ] 4.1 `npm test` verde
  - [ ] 4.2 `npm run build` sem erros

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
### Debug Log References
### Completion Notes List
### File List
