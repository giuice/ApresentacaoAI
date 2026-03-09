# Story 5.6: Topico 16 — Call to Action Final

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a apresentador,
I want apresentar o Topico 16 como encerramento impactante com call to action,
so that a audiencia saia motivada e com os proximos passos claros.

## Acceptance Criteria

1. **Given** que o apresentador navega ate o Topico 16 **When** o topico entra em foco **Then** `Topic16.tsx` e renderizado com o CTA final (links/recursos/proximos passos).
2. **Given** o Topico 16 como fechamento principal da jornada base **When** renderizado **Then** e visualmente distinto dos demais, com tom de conclusao e predominancia de verde neon.
3. **Given** a apresentacao completa (Topicos 1-17 navegados) **When** o Topico 16 esta visivel **Then** a `CyberProgressBar` mostra os 5 blocos como completos/iluminados.
4. **Given** o Topico 16 **When** inspecionado **Then** conteudo vem de `src/data/topic16Data.ts`.
5. **Given** o app completo apos Epic 5 **When** `npm run build` e executado **Then** performance permanece dentro do baseline esperado do projeto (sem regressao evidente de bundle/runtime).
6. **Given** o Topico 16 **When** apresentado **Then** inclui Pagina 2 com notas do narrador para fechamento e chamada para acao.
7. **Given** o Topico 16 na Pagina 1 **When** percorrido do inicio ao fim **Then** exibe os 4 momentos narrativos consolidados no `topic16.md` (paradoxo, parede de dados, padrao dos grandes, loop fechado) e frase final de encerramento.

## Tasks / Subtasks

- [x] Task 1: Criar `src/data/topic16Data.ts` com modelo tipado do fechamento (AC: #1, #2, #4, #7)
  - [x] 1.1 Definir interface `Topic16Data` com: `title`, `subtitle`, `paradoxMetrics`, `riskFindings`, `enterpriseSignals`, `loopFlow`, `finalManifesto`, `narratorNotes`, `labels`.
  - [x] 1.2 Popular dados de `docs/topicos/topic16.md`, mantendo metricas e frases de fechamento aprovadas.
  - [x] 1.3 Estruturar campos para renderizar os 4 momentos visuais sem hardcode no componente.
- [x] Task 2: Implementar `Topic16.tsx` substituindo placeholder por encerramento completo (AC: #1, #2, #4, #6, #7)
  - [x] 2.1 Compor estrutura base com `TopicReveal` + `NarratorToggle`.
  - [x] 2.2 PAGINA 1: implementar secao "Paradoxo" com metricas de contraste (ex.: +98% vs +91%).
  - [x] 2.3 PAGINA 1: implementar "Parede de Dados" e "Padrao dos Grandes" com cards legiveis e hierarquia clara.
  - [x] 2.4 PAGINA 1: implementar "Loop Fechado" (specs upstream + review downstream + humano aprova) e manifesto final.
  - [x] 2.5 PAGINA 2: renderizar notas do narrador via `MatrixTerminal`.
- [x] Task 3: Adequar `CyberProgressBar` para estado de conclusao no Topico 16 (AC: #3)
  - [x] 3.1 Revisar `src/components/layout/CyberProgressBar.tsx` para suportar representacao de progresso cumulativo na etapa final.
  - [x] 3.2 Preservar mapeamento de segmentos existente (`getSegmentIndex`) e comportamento dos topicos anteriores.
  - [x] 3.3 Garantir acessibilidade (`aria-valuenow`, labels) consistente com o novo estado visual.
- [x] Task 4: Cobertura de testes para Topico 16 e progresso final (AC: #1-#7)
  - [x] 4.1 Criar `src/__tests__/topic16.test.tsx` para render de secoes, toggle de notas e data source.
  - [x] 4.2 Atualizar/adicionar testes do progress bar para verificar 5 blocos completos no contexto do Topico 16.
  - [x] 4.3 Rodar regressao (`npm test`) e build (`npm run build`).

## Dev Notes

### Developer Context Section
- Este e o fechamento da narrativa inteira: precisa sintetizar problema, evolucao, ferramentas e novo papel sem recontar a apresentacao inteira.
- `docs/topicos/topic16.md` define um CTA conclusivo baseado no paradoxo de review e em governanca upstream/downstream; manter esse enquadramento.
- O topico deve soar confiante e tecnico, sem tom alarmista nem hype.

### Technical Requirements
- Todo conteudo textual e numerico deve vir de `topic16Data`.
- Implementar estrutura em 4 momentos visuais (paradoxo, dados, grandes empresas, loop fechado) + manifesto final.
- Garantir contraste e legibilidade para palco/projetor (cards, tipografia, espacamento).
- Pagina 2 obrigatoria com `MatrixTerminal` para roteiro de fala.
- Integrar validacao de estado final da progress bar no ultimo topico.

### Architecture Compliance
- Conteudo em `src/data/topic16Data.ts`; UI em `src/components/topics/Topic16.tsx`.
- Alteracoes de progresso limitadas a `src/components/layout/CyberProgressBar.tsx` e testes associados.
- Nao alterar contrato do `PresentationContext` nem estrategia de lazy-loading.
- Sem dependencias novas.

### Library / Framework Requirements
- React 19.x
- TypeScript strict
- Tailwind CSS 4.x (tokens Matrix/tech do design system)
- Framer Motion 12.x (reveal/transicoes ja existentes)
- Vitest + Testing Library

### File Structure Requirements
- Criar:
  - `src/data/topic16Data.ts`
  - `src/__tests__/topic16.test.tsx`
- Atualizar:
  - `src/components/topics/Topic16.tsx`
  - `src/components/layout/CyberProgressBar.tsx` (se necessario para AC #3)
  - `src/__tests__/cyberProgressBar.test.ts` (ou teste equivalente de render/comportamento)
- Reusar:
  - `src/components/topics/TopicReveal.tsx`
  - `src/components/ui/NarratorToggle.tsx`
  - `src/components/ui/MatrixTerminal.tsx`
  - `src/components/ui/GlowDivider.tsx` (opcional para separar momentos)

### Testing Requirements
- Validar render das secoes principais do Topico 16 a partir do data source.
- Validar alternancia content/notes e exibicao do `MatrixTerminal`.
- Validar comportamento da `CyberProgressBar` no topico final (5 blocos completos/iluminados).
- Executar `npm test` e `npm run build` sem regressao.

### Previous Story Intelligence
- Stories 4.1-4.7 consolidaram: layout exclusivo por topico + dados fora do componente + pagina de notas para apresentador.
- Topico 10 provou que secoes densas funcionam melhor com divisores e hierarquia clara; aplicar o mesmo principio no fechamento, sem copiar o layout.
- Historico de qualidade do repo exige gates de teste/build em toda entrega.

### Project Context Reference
- `_bmad-output/planning-artifacts/epics.md` (Epic 5 / Story 5.6)
- `docs/topicos/topic16.md`
- `_bmad-output/planning-artifacts/design-system.md`
- `_bmad-output/planning-artifacts/architecture.md`
- `_bmad-output/project-context.md`
- `src/components/layout/CyberProgressBar.tsx`
- `src/__tests__/cyberProgressBar.test.ts`
- `_bmad-output/implementation-artifacts/4-7-topico-10-qual-ferramenta-usar.md`

## Dev Agent Record

### Agent Model Used
claude-sonnet-4-6

### Debug Log References
- Workflow source: `_bmad/core/tasks/workflow.xml`
- Story workflow config: `_bmad/bmm/workflows/4-implementation/dev-story/workflow.yaml`
- Story instructions: `_bmad/bmm/workflows/4-implementation/dev-story/instructions.xml`

### Completion Notes List
- Story 5.6 criada em modo nao-interativo (YOLO) com status `ready-for-dev`.
- Requisitos do fechamento alinhados ao Epic 5 e ao topico consolidado (`topic16.md`).
- Guardrails tecnicos explicitam a validacao de progresso final sem introduzir dependencias externas.
- **Task 1**: `src/data/topic16Data.ts` criado com interface `Topic16Data` tipada e dados completos dos 4 momentos visuais (paradoxo, riskFindings, enterpriseCards, loopSteps) + finalManifesto + narratorNotes.
- **Task 2**: `Topic16.tsx` implementado substituindo placeholder. Estrutura: TopicReveal + NarratorToggle, Pagina 1 com 4 momentos separados por GlowDivider, Pagina 2 com MatrixTerminal. Animacoes Framer Motion com suporte a reduced motion.
- **Task 3**: `CyberProgressBar.tsx` atualizado para progresso cumulativo — segmentos `< activeSegment` recebem `bg-accent-primary/50` (concluido) e `aria-label "(concluido)"`. O segmento ativo mantem o glow completo. `getSegmentIndex` preservado sem alteracao.
- **Task 4**: `src/__tests__/topic16.test.tsx` criado com 16 testes cobrindo data source, render das 4 secoes, toggle de paginas e CyberProgressBar no contexto do topico 16. 292 testes passando, build limpo (10.10 kB gzip 3.62 kB para Topic16).

### File List
- `_bmad-output/implementation-artifacts/5-6-topico-16-call-to-action-final.md` (updated)
- `src/data/topic16Data.ts` (created)
- `src/components/topics/Topic16.tsx` (updated)
- `src/components/layout/CyberProgressBar.tsx` (updated)
- `src/__tests__/topic16.test.tsx` (created)

## Change Log

- 2026-03-08: Criada story de contexto 5.6 (ready-for-dev) com ACs, tasks, guardrails tecnicos e referencias de projeto.
- 2026-03-09: Implementacao completa — Topic16Data, Topic16.tsx (4 momentos visuais + MatrixTerminal), CyberProgressBar progresso cumulativo, 16 testes. 292 testes passando, build limpo.
