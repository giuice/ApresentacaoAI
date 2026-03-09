# Story 5.5: Topico 15 — Caminho de Implementacao

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a desenvolvedor/Tech Lead,
I want ver o Topico 15 com o caminho pratico para comecar a aplicar Context Engineering,
so that eu saia com um roadmap de adocao claro e acionavel.

## Acceptance Criteria

1. **Given** que o apresentador navega ate o Topico 15 **When** o topico entra em foco **Then** `Topic15.tsx` e renderizado com o caminho de implementacao passo a passo.
2. **Given** o Topico 15 renderizado **When** visualizado **Then** conteudo vem de `src/data/topic15Data.ts` e e legivel em projetor.
3. **Given** o Topico 15 **When** finalizado **Then** inclui Pagina 2 com notas do narrador para conduzir roadmap em etapas.
4. **Given** o Topico 15 na Pagina 1 **When** o usuario percorre a secao principal **Then** visualiza uma "escada de escala" com 4 cases (Ralph, Airbnb, Google, Amazon), cada um com metrica principal e contexto de impacto.
5. **Given** os cases do Topico 15 **When** exibidos **Then** cada case apresenta contraste visual de before/after (custo, tempo ou escala), sem overflow horizontal em desktop de projetor.
6. **Given** a transicao final do Topico 15 **When** chega ao fechamento da secao de conteudo **Then** e exibida timeline de evolucao (2022 -> 2024 -> 2025) conectando ao reposicionamento do papel do desenvolvedor.
7. **Given** o Topico 15 **When** inspecionado **Then** nenhum texto principal fica hardcoded no componente; titulos, metricas, labels e notas vem do data source.

## Tasks / Subtasks

- [ ] Task 1: Criar `src/data/topic15Data.ts` com modelo tipado do Topico 15 (AC: #2, #4, #5, #6, #7)
  - [ ] 1.1 Definir interface `Topic15Data` com: `title`, `subtitle`, `narrativeHook`, `scaleCases[]`, `timeline[]`, `highlightMetrics[]`, `narratorNotes[]`, `labels`.
  - [ ] 1.2 Popular dados a partir de `docs/topicos/topic15.md`, preservando metricas/fatos aprovados e linguagem PT-BR.
  - [ ] 1.3 Estruturar os 4 degraus de escala para renderizacao (ordem obrigatoria: Ralph -> Airbnb -> Google -> Amazon).
- [ ] Task 2: Implementar `Topic15.tsx` substituindo placeholder por layout "Escada de Escala" (AC: #1, #2, #4, #5, #6, #7)
  - [ ] 2.1 Compor estrutura base com `TopicReveal` + `NarratorToggle` seguindo pattern consolidado das stories 4.x.
  - [ ] 2.2 PAGINA 1: renderizar secao de cases em progressao de escala com cards/steps visuais distintos e destaque para metricas-chave.
  - [ ] 2.3 PAGINA 1: incluir secao de timeline de evolucao (2022/2024/2025) com frase de transicao final.
  - [ ] 2.4 PAGINA 2: renderizar notas do narrador via `MatrixTerminal` com linhas sequenciais.
  - [ ] 2.5 Garantir responsividade e legibilidade para projetor (padding minimo `p-8`, sem clipping de metricas longas).
- [ ] Task 3: Cobertura de testes de comportamento do Topico 15 (AC: #1-#7)
  - [ ] 3.1 Criar `src/__tests__/topic15.test.tsx` cobrindo render inicial, dados de `topic15Data`, estrutura de 4 cases e timeline.
  - [ ] 3.2 Testar toggle `content/notes` e presenca de `MatrixTerminal` na Pagina 2.
  - [ ] 3.3 Testar que strings centrais exibidas pertencem ao data source (evitar hardcode acidental).
- [ ] Task 4: Gates de qualidade
  - [ ] 4.1 Executar `npm test` com suite verde.
  - [ ] 4.2 Executar `npm run build` sem regressao.

## Dev Notes

### Developer Context Section
- Apesar do titulo do epic indicar "caminho de implementacao", o topico consolidado (`docs/topicos/topic15.md`) traz prova em escala (dev solo -> enterprise). Tratar isso como roadmap de adocao por escala: comecar pequeno, escalar com governanca.
- Este topico faz parte do bloco final de impacto; precisa manter tom factual, crescendo por escala, sem hype.
- Reaproveitar padrao visual de diversidade de layouts das stories 4.x: evitar repetir exatamente os layouts de Topics 6-10.

### Technical Requirements
- `Topic15.tsx` deve consumir dados exclusivos de `topic15Data` (sem copy inline extensa no JSX).
- Incluir `NarratorToggle` e `MatrixTerminal` para manter padrao de 2 paginas usado no Epic 4.
- Preservar semantica visual Matrix/tech (tokens existentes, contrastes, glow moderado) com foco em leitura de metricas.
- Timeline final deve ser implementada como bloco visual proprio (nao apenas lista textual).

### Architecture Compliance
- Conteudo textual em `src/data/topic15Data.ts`; UI em `src/components/topics/Topic15.tsx`.
- Manter navegacao global inalterada (`PresentationContext`, hash sync, keyboard nav global).
- Nao adicionar dependencias novas; usar stack atual React + Tailwind + Framer Motion.
- Manter lazy-loading ja definido em `App.tsx` para Topic15.

### Library / Framework Requirements
- React 19.x
- TypeScript strict (sem `any`, sem `@ts-ignore`)
- Tailwind CSS 4.x (tokens via theme existente)
- Framer Motion 12.x para entradas/reveals (via componentes/patterns ja existentes)
- Vitest + Testing Library para testes

### File Structure Requirements
- Criar:
  - `src/data/topic15Data.ts`
  - `src/__tests__/topic15.test.tsx`
- Atualizar:
  - `src/components/topics/Topic15.tsx`
- Reusar (sem duplicar):
  - `src/components/topics/TopicReveal.tsx`
  - `src/components/ui/NarratorToggle.tsx`
  - `src/components/ui/MatrixTerminal.tsx`
  - `src/components/ui/GlowDivider.tsx` (quando necessario para separacao de secoes)

### Testing Requirements
- Cobrir render do titulo/subtitulo e 4 cases com dados do data source.
- Cobrir toggle de paginas e render de notas do narrador.
- Validar ausencia de regressao de navegacao/topico lazy-loaded.
- Rodar `npm test` e `npm run build` apos implementacao.

### Previous Story Intelligence
- Stories 4.1-4.4 reforcaram regra de layout unico por topico (escada, pipeline, squad board); Topic15 deve manter esse padrao de diferenciacao.
- Stories 4.5-4.7 consolidaram padrao de componentes orientados a dados e pagina de notas com `NarratorToggle` + `MatrixTerminal`.
- Topic10 demonstrou estrutura robusta com `TopicReveal` e secoes separadas por `GlowDivider`; reutilizar a estrategia de composicao sem copiar layout.

### Project Context Reference
- `_bmad-output/planning-artifacts/epics.md` (Epic 5 / Story 5.5)
- `docs/topicos/topic15.md`
- `_bmad-output/planning-artifacts/design-system.md`
- `_bmad-output/planning-artifacts/architecture.md`
- `_bmad-output/project-context.md`
- `_bmad-output/implementation-artifacts/4-1-topico-6-spec-kit-a-especificacao-como-codigo.md`
- `_bmad-output/implementation-artifacts/4-4-topico-9-bmad-times-multi-agente.md`
- `_bmad-output/implementation-artifacts/4-7-topico-10-qual-ferramenta-usar.md`

## Dev Agent Record

### Agent Model Used
GPT-5 (GitHub Copilot CLI)

### Debug Log References
- Workflow source: `_bmad/core/tasks/workflow.xml`
- Story workflow config: `_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml`
- Story instructions: `_bmad/bmm/workflows/4-implementation/create-story/instructions.xml`

### Completion Notes List
- Story 5.5 criada em modo nao-interativo (YOLO) com status `ready-for-dev`.
- Contexto consolidado a partir de Epic 5, `topic15.md` e padroes de implementacao das stories 4.x.
- Dependencias tecnicas limitadas ao que ja existe no repositorio (sem novas libs obrigatorias).

### File List
- `_bmad-output/implementation-artifacts/5-5-topico-15-caminho-de-implementacao.md` (created)

## Change Log

- 2026-03-08: Criada story de contexto 5.5 (ready-for-dev) com ACs, tasks, guardrails tecnicos e referencias de projeto.
