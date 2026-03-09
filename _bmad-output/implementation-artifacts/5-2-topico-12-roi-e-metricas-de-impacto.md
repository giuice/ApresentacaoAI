# Story 5.2: Tópico 12 — ROI e Métricas de Impacto

Status: ready-for-dev

## Story

As a Engineering Manager/CTO,  
I want ver o Tópico 12 com métricas de ROI e eficiência,  
so that eu possa justificar o investimento em ferramentas e metodologia para minha organização.

## Acceptance Criteria

1. **Given** que o apresentador navega até o Tópico 12 **When** o tópico entra em foco **Then** `Topic12.tsx` é renderizado com métricas de ROI e ganhos de eficiência.
2. **Given** métricas numéricas no Tópico 12 **When** o tópico entra em foco **Then** usa `AnimatedCounter` com `variant="success"` para os ganhos positivos.
3. **Given** o Tópico 12 **When** inspecionado **Then** conteúdo vem de `src/data/topic12Data.ts`.
4. **Given** o Tópico 12 **When** apresentado **Then** possui Página 2 com notas do narrador orientadas a público executivo (EM/CTO).

## Tasks / Subtasks

- [ ] Task 1: Criar `src/data/topic12Data.ts` com foco executivo (AC: #1, #3, #4)
  - [ ] 1.1 Definir interface `Topic12Data` com blocos de ROI (métricas positivas), evidências de impacto e notas para decisão de investimento.
  - [ ] 1.2 Estruturar coleção de métricas numéricas para renderização por `AnimatedCounter` (`variant="success"`), com contexto e fonte.
  - [ ] 1.3 Consolidar `narratorNotes` orientadas à conversa com EM/CTO (trade-offs, risco de não adoção estruturada e payoff esperado).
- [ ] Task 2: Implementar `src/components/topics/Topic12.tsx` (AC: #1, #2, #4)
  - [ ] 2.1 Substituir placeholder por layout completo com `TopicReveal` + `NarratorToggle`.
  - [ ] 2.2 Página 1: renderizar painel de ROI e impacto com destaque para ganhos positivos usando `AnimatedCounter variant="success"`.
  - [ ] 2.3 Compor seções de suporte (ex.: evidências, contexto de eficiência, implicações organizacionais) com `NeonCard`/`GlowDivider` sem poluir leitura.
  - [ ] 2.4 Página 2: renderizar notas executivas em `MatrixTerminal`.
  - [ ] 2.5 Garantir legibilidade em projetor e responsividade sem overflow.
- [ ] Task 3: Criar testes em `src/__tests__/topic12.test.tsx` (AC: #1-#4)
  - [ ] 3.1 Validar render do conteúdo principal com base em `topic12Data`.
  - [ ] 3.2 Validar presença de `AnimatedCounter` nas métricas positivas (variant success).
  - [ ] 3.3 Validar toggle Conteúdo/Notas e renderização de `MatrixTerminal`.
  - [ ] 3.4 Validar que texto e métricas vêm de `src/data/topic12Data.ts`.
- [ ] Task 4: Gates de qualidade
  - [ ] 4.1 Executar `npm test` com suíte verde.
  - [ ] 4.2 Executar `npm run build` sem erros.
  - [ ] 4.3 Confirmar ausência de regressão em navegação global da apresentação.

## Dev Notes

### Developer Context Section
- Este tópico deve traduzir “impacto técnico” em “linguagem de negócio”, com framing claro para tomada de decisão executiva.
- A história precisa permanecer coerente com o arco do Epic 5 e com o padrão visual já estabelecido nas stories 4.x.
- O objetivo é reduzir ambiguidade para o dev-agent: os números devem ser explícitos, rastreáveis e prontos para visualização.

### Technical Requirements
- `AnimatedCounter` é obrigatório para ganhos positivos (AC formal da story).
- Reutilizar stack visual existente (`NeonCard`, `NarratorToggle`, `MatrixTerminal`, `TopicReveal`) sem introduzir novas libs.
- Dados e cópia devem residir em `src/data/topic12Data.ts`; `Topic12.tsx` atua como camada de composição visual.

### Architecture Compliance
- Estrutura obrigatória: dados em `src/data`, componente em `src/components/topics`, testes em `src/__tests__`.
- Manter TypeScript strict e padrão de import alias `@/`.
- Não alterar componentes globais de navegação/progresso; escopo limitado ao tópico 12 e seus dados/testes.

### Library / Framework Requirements
- React 19.x
- TypeScript 5.x (strict)
- Tailwind CSS 4.x
- Framer Motion 12.x
- Vitest + Testing Library

### File Structure Requirements
- Criar: `src/data/topic12Data.ts`
- Atualizar: `src/components/topics/Topic12.tsx`
- Criar: `src/__tests__/topic12.test.tsx`

### Testing Requirements
- Cobrir render de métricas e narrativa executiva.
- Cobrir uso de `AnimatedCounter` para ganhos positivos.
- Cobrir página de notas (narrator mode) e alternância por `NarratorToggle`.
- Validar suíte completa com `npm test` e build com `npm run build`.

### Previous Story Intelligence
- Reusar padrão consolidado em stories 4.x: duas páginas (conteúdo + notas), dados tipados em arquivo dedicado e testes focados por tópico.
- Para continuidade do Epic 5, manter consistência com Story 5.1 na estrutura de interação e nível de detalhamento das notas do narrador.

### Project Context Reference
- `C:\Projects\ApresentacaoAI\_bmad-output\planning-artifacts\epics.md` (Epic 5 / Story 5.2)  
- `C:\Projects\ApresentacaoAI\docs\topicos\topic12.md`  
- `C:\Projects\ApresentacaoAI\docs\topicos\topic11.md` (contexto de continuidade narrativa do bloco)  
- `C:\Projects\ApresentacaoAI\_bmad-output\project-context.md`  
- `C:\Projects\ApresentacaoAI\_bmad-output\planning-artifacts\design-system.md`

## Dev Agent Record

### Agent Model Used
- A preencher no `dev-story`.

### Debug Log References
- A preencher no `dev-story`.

### Completion Notes List
- A preencher no `dev-story`.

### File List
- `src/data/topic12Data.ts` (novo)
- `src/components/topics/Topic12.tsx` (atualizar placeholder)
- `src/__tests__/topic12.test.tsx` (novo)
- `C:\Projects\ApresentacaoAI\_bmad-output\implementation-artifacts\5-2-topico-12-roi-e-metricas-de-impacto.md` (contexto)

## Change Log

- 2026-03-08: Story criada em modo não-interativo (YOLO) com status `ready-for-dev`, ACs completos e guia de implementação orientado a público executivo.
