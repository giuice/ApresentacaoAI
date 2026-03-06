# Story 4.1: Topico 6 — Spec-Kit: A Especificacao como Codigo

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a audiencia,
I want ver o Topico 6 apresentando o panorama das tres ferramentas SDD (Spec-Kit, GSD, BMAD) como uma escada de complexidade,
so that eu entenda que nao existe "a melhor ferramenta" — existe a ferramenta certa para a escala certa.

## Acceptance Criteria

1. **Given** que o apresentador navega ate o Topico 6 **When** o topico entra em foco **Then** `Topic6.tsx` e renderizado com o conteudo vindo de `src/data/topic6Data.ts`
2. **Given** o Topico 6 renderizado **When** visualizado em projetor **Then** conteudo e legivel (contraste WCAG AA+), sem overflow horizontal, com padding minimo p-8
3. **Given** as animacoes de entrada do Topico 6 **When** o topico estabiliza **Then** elementos entram com delay escalonado >= 0.4s usando TopicReveal/TopicRevealItem
4. **Given** o Topico 6 **When** renderizado **Then** exibe layout CRIATIVO e DIFERENTE dos topicos 1-5 — deve usar um layout de escada/degraus com 3 cards progressivos (Spec-Kit, GSD, BMAD) em vez do pattern SplitScreen ou grid de NeonCards
5. **Given** o Topico 6 **When** renderizado **Then** inclui hero metric animada (85%) com AnimatedCounter variant="success"
6. **Given** o Topico 6 **When** o usuario clica no toggle de pagina **Then** alterna entre Pagina 1 (conteudo) e Pagina 2 (notas do narrador) usando o componente NarratorToggle existente
7. **Given** o Topico 6 na Pagina 2 **When** exibida **Then** renderiza notas do narrador via MatrixTerminal com linhas formatadas e sequenciais
8. **Given** o Topico 6 **When** inspecionado **Then** nenhum texto esta hardcoded no componente — todo conteudo vem de topic6Data.ts

## Tasks / Subtasks

- [x] Task 1: Criar arquivo de dados `src/data/topic6Data.ts` (AC: #1, #8)
  - [x] 1.1 Definir interface `Topic6Data` com campos: title, subtitle, heroMetric, inevitabilityQuote, toolLadder (array de 3 ferramentas com name, level, icon, problem, solution, audience, sddLevel, adoptionSignal, impactMetric), comparisonNote, narratorNotes
  - [x] 1.2 Popular dados a partir de `docs/topicos/topic6.md` — metricas aprovadas, analogias, textos em PT-BR
  - [x] 1.3 Exportar interface e const tipadas
- [x] Task 2: Implementar componente `Topic6.tsx` com layout de ESCADA DE 3 DEGRAUS (AC: #1, #2, #3, #4, #5, #6, #7)
  - [x] 2.1 Estrutura base: TopicReveal container com state de pagina (content/notes) e NarratorToggle no header
  - [x] 2.2 PAGINA 1 — Layout escada criativo (DIFERENTE dos topicos anteriores):
    - Hero metric (85%) com AnimatedCounter variant="success" centralizado no topo
    - Frase de inevitabilidade (MIT quote) como subtitle
    - 3 CARDS EM ESCADA ASCENDENTE: cada card mais alto que o anterior (translateY progressivo), com tamanho e glow crescente, representando Spec-Kit (nivel 1, glow sutil) -> GSD (nivel 2, glow medio) -> BMAD (nivel 3, glow maximo)
    - Eixo horizontal visual com label "Complexidade ->" embaixo dos cards
    - Cada card mostra: nome da ferramenta, problema que resolve, metrica matadora, nivel SDD
    - Entrada staggered: cards sobem sequencialmente com 400ms delay entre cada
    - Nota de complementaridade na base
  - [x] 2.3 PAGINA 2 — Notas do narrador via MatrixTerminal:
    - Usar MatrixTerminal com title="narrador-topic6.md"
    - Converter narratorNotes em TerminalLine[] (comment header + output lines numeradas + comment footer)
    - Layout centrado, flex-1 com scroll
  - [x] 2.4 Garantir que o layout e responsivo: cards empilham verticalmente em telas menores (<1024px), mantendo escada horizontal em desktop
  - [x] 2.5 Respeitar prefers-reduced-motion (via TopicReveal e AnimatedCounter existentes)
- [x] Task 3: Testes do Topico 6 (AC: #1, #2, #3, #4, #5, #6, #7, #8)
  - [x] 3.1 Testar que Topic6 renderiza titulo e subtitulo vindos de topic6Data
  - [x] 3.2 Testar que AnimatedCounter esta presente com value=85 e variant="success"
  - [x] 3.3 Testar que 3 cards de ferramenta sao renderizados (Spec-Kit, GSD, BMAD)
  - [x] 3.4 Testar alternancia de pagina (content/notes) via NarratorToggle
  - [x] 3.5 Testar que MatrixTerminal aparece na pagina de notas
  - [x] 3.6 Testar que dados vem de topic6Data (nenhum hardcode)
- [x] Task 4: Gates de qualidade (AC: todos)
  - [x] 4.1 Rodar `npm test` — suite completa verde
  - [x] 4.2 Rodar `npm run build` — build sem erros
  - [x] 4.3 Verificar que lazy-load existente no App.tsx ja cobre Topic6 (PlaceholderTopic -> componente real)

## Dev Notes

### Developer Context Section
- Topico 6 e o PRIMEIRO topico do Epic 4 (Bloco 3 — As Ferramentas). Ele funciona como OVERVIEW/MAPA que introduz as tres ferramentas antes de mergulhar em cada uma (Topics 7-9).
- Este topico deve ter um layout CRIATIVO E DISTINTO dos topicos 1-5 (que usavam patterns de SplitScreen, NeonCard grid, ou metric hero centralizado).
- O layout de "escada de 3 degraus" e o diferencial visual: cards ASCENDENTES representando escalas de complexidade crescente.
- User argument: "make sure to be creative on layout (not the same for all topics) and use narrator notes component"
- Risco principal: fazer o topico parecer identico aos anteriores em vez de criar identidade visual propria para o Bloco 3.

### Technical Requirements
- Topic6.tsx deve consumir:
  - TopicReveal + TopicRevealItem (stagger animations)
  - AnimatedCounter (hero metric 85%)
  - NeonCard (3 tool cards com variant="success" e glow crescente)
  - NarratorToggle (page toggle no header)
  - MatrixTerminal (pagina 2 — notas do narrador)
  - GlowDivider (separador visual)
- Dados em src/data/topic6Data.ts com interface tipada
- Layout de escada: usar translateY/margin-top progressivo para criar efeito visual ascendente (ex: card1 mt-16, card2 mt-8, card3 mt-0)
- Glow crescente: cada card tem border-glow mais intenso (primary dim -> primary -> primary-strong)

### Architecture Compliance
- Nao hardcodar texto no componente — todo conteudo via topic6Data.ts
- Componentes de UI em src/components/ui (ja existentes)
- Nao alterar infraestrutura global de navegacao/transicao/contexto
- Nao importar markdown em runtime
- Nao introduzir estado global novo

### Library / Framework Requirements
- React 19.x para composicao
- Framer Motion 12.x via wrappers existentes (TopicReveal)
- Tailwind 4.x para estilos e tokens
- Sem novas dependencias — usar apenas componentes ja criados

### File Structure Requirements
- Criar:
  - src/data/topic6Data.ts
- Atualizar:
  - src/components/topics/Topic6.tsx (substituir PlaceholderTopic)
  - src/__tests__/topic6.test.tsx (novo)
- Dependencias obrigatorias:
  - src/components/topics/TopicReveal.tsx (stagger container)
  - src/components/ui/AnimatedCounter.tsx (hero metric)
  - src/components/ui/NeonCard.tsx (tool cards)
  - src/components/ui/NarratorToggle.tsx (page toggle)
  - src/components/ui/MatrixTerminal.tsx (narrator notes page 2)
  - src/components/ui/GlowDivider.tsx (section separator)

### Testing Requirements
- Testar render do titulo/subtitulo vindos do data source
- Testar AnimatedCounter presente com value=85 e variant="success"
- Testar que 3 cards de ferramentas sao renderizados
- Testar toggle de pagina (content -> notes)
- Testar presenca de MatrixTerminal na pagina de notas
- Testar que dados vem de topic6Data (nenhum hardcode)
- Rodar suite completa + build

### Topic Component Pattern (OBRIGATORIO)
- Referencia: Topics 1-5 seguem patterns estabelecidos. Topic 6 deve INOVAR no layout.
- Data source tipado em src/data/topic6Data.ts (interface customizada para escada de ferramentas)
- TopicReveal/TopicRevealItem para stagger
- AnimatedCounter para hero metric
- NeonCard para tool cards (3 cards em escada)
- NarratorToggle + MatrixTerminal para pagina 2 (notas)
- Tipografia: titulo text-5xl lg:text-6xl font-mono font-bold, corpo text-base-lg font-sans
- Gaps: gap-8 lg:gap-16 entre secoes
- DIFERENCIAL: layout de escada ascendente com 3 niveis visuais

### Previous Story Intelligence
- Story 3.7 (Topic5) COMPLETA e done — usou SplitScreen com dual hero counters. Topic 6 NAO deve repetir esse pattern.
- Story 3.6 (Topic4) usou accent-primary como dominante — Topic 6 tambem usa accent-primary (verde) para tom de solucao/ferramenta.
- Stories 3.3-3.7 todas usaram NarratorToggle com MatrixTerminal na pagina 2 — manter esse padrao.
- Pattern de TopicReveal com stagger ja consolidado e validado.
- NeonCard com variant="success" ja testado em multiplos topicos.

### Git Intelligence Summary
- Ultimo commit: epic statuses atualizados para done (Epics 2 e 3).
- Padrao do repo: entrega por story com testes + build e rastreabilidade no artefato.
- Componentes existentes (AnimatedCounter, NeonCard, SplitScreen, MatrixTerminal, NarratorToggle, TopicReveal) estao todos prontos e testados.
- Nenhuma mudanca de infra necessaria — apenas criar data file + implementar componente + testes.

### Latest Tech Information (2026-03-06)
- React 19.x, Tailwind 4.x, Framer Motion 12.x no baseline atual.
- Nenhum upgrade de stack necessario para cumprir ACs.
- MatrixTerminal e NarratorToggle ja validados em producao pelos topics anteriores.

### Project Context Reference
- _bmad-output/planning-artifacts/epics.md (Epic 4 / Story 4.1)
- docs/topicos/topic6.md (conteudo consolidado e aprovado)
- _bmad-output/planning-artifacts/design-system.md (tokens, tipografia, componentes)
- _bmad-output/planning-artifacts/architecture.md (stack, patterns, naming)
- _bmad-output/implementation-artifacts/3-7-topico-5-spec-driven-development.md (referencia anterior)
- _bmad-output/implementation-artifacts/3-3-topico-1-hook-o-problema-88.md (pattern base)
- _bmad-output/project-context.md
- src/components/topics/Topic5.tsx + src/data/topic5Data.ts (ultima implementacao de referencia)
- src/components/topics/Topic1.tsx + src/data/topic1Data.ts (pattern definitivo)
- C:\Users\giuliano.lemes\.claude\projects\C--Projects-ApresentacaoAI\memory\topic-pattern.md

### Story Completion Status
- Story context criada para prevenir erros comuns:
  - Layout identico aos topicos anteriores (SplitScreen/grid) em vez de inovar com escada
  - Falta de NarratorToggle/MatrixTerminal para pagina 2
  - Hardcoding de conteudo no componente
  - Metricas inventadas em vez de usar dados aprovados do topic6.md
  - Nao usar glow progressivo nos 3 cards da escada
- Completion note: Ultimate context engine analysis completed - comprehensive developer guide created.

## Dev Agent Record

### Agent Model Used

GPT-5 (GitHub Copilot CLI)

### Debug Log References

- `npm test -- src/__tests__/topic6.test.tsx`
- `npm test`
- `npm run build`

### Completion Notes List

- Implementado `topic6Data.ts` com estrutura tipada e todo o conteudo textual do Topico 6.
- Substituido placeholder de `Topic6.tsx` por layout real em escada com 3 cards progressivos (Spec-Kit, GSD, BMAD).
- Integrados `TopicReveal`, `AnimatedCounter`, `NeonCard`, `NarratorToggle`, `MatrixTerminal` e `GlowDivider`.
- Criado teste dedicado `topic6.test.tsx` cobrindo data source, hero metric, escada, toggle e pagina de notas.
- Validacao executada com suite completa de testes e build.

### File List

- `src/data/topic6Data.ts` (created)
- `src/components/topics/Topic6.tsx` (updated)
- `src/__tests__/topic6.test.tsx` (created)
- `_bmad-output/implementation-artifacts/4-1-topico-6-spec-kit-a-especificacao-como-codigo.md` (updated)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (updated — story status → review)

## Change Log

- 2026-03-06: Implementacao completa da Story 4.1 (Topic6 real, data source tipado, testes dedicados, validacao por teste focado + suite completa + build).
