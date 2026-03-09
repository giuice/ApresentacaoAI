# Story 5.4: Tópico 14 — Posicionamento de Carreira

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como desenvolvedor,  
eu quero ver o Tópico 14 com orientações práticas de posicionamento de carreira,  
para que eu saia da apresentação com um plano de ação concreto.

## Acceptance Criteria

1. **Given** que o apresentador navega até o Tópico 14 **When** o tópico entra em foco **Then** `Topic14.tsx` é renderizado com orientações de posicionamento profissional.
2. **Given** o Tópico 14 renderizado **When** visualizado **Then** o conteúdo vem de `src/data/topic14Data.ts`.
3. **Given** o Tópico 14 **When** apresentado **Then** disponibiliza Página 2 com notas do narrador convertidas para plano de ação prático.

## Tasks / Subtasks

- [x] Task 1: Criar `src/data/topic14Data.ts` com o conteúdo consolidado (AC: #1, #2)
  - [x] 1.1 Definir interface tipada (hero, curva J, forças do vale, duas curvas, Nyquist, ROI, plano de ação do narrador).
  - [x] 1.2 Consolidar os dados de `docs/topicos/topic14.md` em estrutura renderizável e escaneável.
  - [x] 1.3 Destacar métrica principal (`US$ 3,70 / US$ 10,30` vs `-19%`) e vincular ao posicionamento profissional orientado por validação.
- [x] Task 2: Implementar `Topic14.tsx` com experiência visual coerente ao bloco de impacto (AC: #1, #2, #3)
  - [x] 2.1 Montar Página 1 com narrativa “curva J + verificação rastreável + fórmula de ROI” sem depender de novas libs de charting.
  - [x] 2.2 Reusar componentes existentes (`TopicReveal`, `NeonCard`, `AnimatedCounter` quando aplicável, `GlowDivider`, `NarratorToggle`, `MatrixTerminal`).
  - [x] 2.3 Garantir legibilidade em projetor e foco em mensagem prática de carreira (o que fazer agora, no próximo projeto).
  - [x] 2.4 Montar Página 2 com roteiro de fala em formato acionável para público técnico/executivo.
- [x] Task 3: Cobrir com testes da story (AC: #1, #2, #3)
  - [x] 3.1 Criar `src/__tests__/topic14.test.tsx` para validar render dos blocos centrais e métricas.
  - [x] 3.2 Validar consumo de `topic14Data.ts` (sem hardcode de conteúdo no JSX).
  - [x] 3.3 Validar toggle entre página de conteúdo e notas do narrador.
- [x] Task 4: Executar gates obrigatórios do repositório
  - [x] 4.1 `npm run test`
  - [x] 4.2 `npm run build`

## Dev Notes

### Developer Context Section

- Esta story está no Epic 5 (FR19) e inicia o bloco de impacto/encerramento, conectando narrativa técnica com decisão de carreira.
- O material de `topic14.md` já traz estrutura robusta de ROI (Curva J, Nyquist, duas curvas); a implementação deve transformar isso em orientação prática de posicionamento sem perder precisão técnica.
- O tópico precisa manter tom factual (dados e validação), evitando hype.
- Não criar novas dependências, nem gráficos pesados: o design system atual já cobre as necessidades de composição visual.

### Technical Requirements

- Criar `src/data/topic14Data.ts` com conteúdo integral em PT-BR.
- Implementar `Topic14.tsx` seguindo padrão de duas páginas:
  - Página 1: narrativa principal (curva J, contraste com/sem estrutura, Nyquist, ROI).
  - Página 2: plano de ação do narrador (posicionamento de carreira e próximos passos).
- Reusar componentes já existentes para manter consistência visual e custo de manutenção baixo.
- Preservar responsividade desktop-first e compatibilidade com projeção.
- Respeitar `prefers-reduced-motion` conforme padrões de animação já adotados.

### Architecture Compliance

- Manter separação estrita entre dados e UI (`src/data` vs `src/components/topics`).
- Não alterar contratos do `PresentationContext` nem mecanismo de navegação/global state.
- Preservar lazy-load de tópicos existente (`Topic14` continua carregado sob demanda).
- Seguir convenções de arquivo/componente do projeto (sem barrel exports; sem `any`; sem markdown importado em runtime).

### Library / Framework Requirements

- React 19.x
- TypeScript 5.x (strict)
- Tailwind CSS 4.x
- Framer Motion 12.x
- Vitest + Testing Library
- Sem inclusão de novas dependências.

### File Structure Requirements

- Criar:
  - `src/data/topic14Data.ts`
  - `src/__tests__/topic14.test.tsx`
- Atualizar:
  - `src/components/topics/Topic14.tsx`
- Não alterar arquivos fora do escopo da story.

### Testing Requirements

- Validar render dos blocos principais e da métrica de destaque.
- Validar uso de `topic14Data.ts` como fonte única de conteúdo.
- Validar alternância de páginas via `NarratorToggle`.
- Executar `npm run test` e `npm run build` como gates finais.

### Project Context Reference

- `_bmad-output/planning-artifacts/epics.md` (Epic 5 / Story 5.4)
- `docs/topicos/topic14.md`
- `_bmad-output/planning-artifacts/design-system.md`
- `_bmad-output/planning-artifacts/architecture.md`
- `_bmad-output/project-context.md`
- `_bmad-output/implementation-artifacts/4-6-componente-decisionwizard-wizard-terminal.md`
- `_bmad-output/implementation-artifacts/4-7-topico-10-qual-ferramenta-usar.md`

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6 (claude-sonnet-4-6)

### Debug Log References

- Workflow engine: `_bmad/core/tasks/workflow.xml`
- Workflow config: `_bmad/bmm/workflows/4-implementation/dev-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/dev-story/instructions.xml`

### Completion Notes List

- Story context 5.4 gerada em modo YOLO a partir do fluxo create-story.
- Contexto consolidado com base em Epic 5, `docs/topicos/topic14.md` e padrão de documentação das stories 4.x.
- Documento pronto para execução por dev agent com guardrails de arquitetura, testes e estrutura de arquivos.
- **Implementação completa**: `src/data/topic14Data.ts` criado com interface tipada completa (hero, curva J, 3 forças do vale, 2 curvas, 4 métricas ROI, fórmula, notas do narrador).
- **Topic14.tsx** implementado com 5 seções: hero contraste (-19% vs US$3,70/10,30), fases da curva J, forças do vale, duas curvas, dashboard ROI + fórmula. Página 2 com MatrixTerminal.
- **16 testes criados** em `src/__tests__/topic14.test.tsx` — todos passando.
- **251/251 testes** na suíte completa — zero regressões.
- **Build limpo** — `Topic14-TGG14jSZ.js` (13.79 kB) gerado sem erros TypeScript.
- Padrão de componente Topic11/12/13 seguido rigorosamente: TopicReveal, NeonCard, AnimatedCounter, GlowDivider, NarratorToggle, MatrixTerminal. Sem novas dependências.

### File List

- `_bmad-output/implementation-artifacts/5-4-topico-14-posicionamento-de-carreira.md` (created, updated)
- `src/data/topic14Data.ts` (created)
- `src/components/topics/Topic14.tsx` (updated — was placeholder)
- `src/__tests__/topic14.test.tsx` (created)

## Change Log

- 2026-03-08: Criação da story de contexto 5.4 com status `ready-for-dev`, ACs, tarefas, guardrails técnicos e referências de projeto.
- 2026-03-09: Implementação completa — `topic14Data.ts`, `Topic14.tsx`, `topic14.test.tsx`. 251/251 testes, build limpo. Status → `review`.

