# Story 5.3: Tópico 13 — O Paradoxo do Júnior

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como desenvolvedor júnior/pleno,  
eu quero ver o Tópico 13 abordando o paradoxo de competir com IA + senior,  
para que eu entenda que método é o diferencial e não a experiência bruta.

## Acceptance Criteria

1. **Given** que o apresentador navega até o Tópico 13 **When** o tópico entra em foco **Then** `Topic13.tsx` é renderizado com o paradoxo e a resolução via metodologia.
2. **Given** o Tópico 13 renderizado **When** visualizado **Then** o conteúdo vem de `src/data/topic13Data.ts` e permanece legível em projetor.
3. **Given** o Tópico 13 **When** finalizado **Then** segue o padrão de duas páginas com notas do narrador para conduzir o “Aha!” sem tom alarmista.

## Tasks / Subtasks

- [ ] Task 1: Criar `src/data/topic13Data.ts` a partir do conteúdo consolidado (AC: #1, #2)
  - [ ] 1.1 Definir interface tipada para o tópico (título, subtítulo, métrica principal, skills, matriz skills×ferramentas, narrador).
  - [ ] 1.2 Consolidar os dados de `docs/topicos/topic13.md` em blocos prontos para renderização (abertura, 5 skills, mapa comparativo, fechamento).
  - [ ] 1.3 Incluir a métrica principal de upskilling (80%) e métricas de suporte do tópico, sem hardcode no JSX.
- [ ] Task 2: Implementar `Topic13.tsx` com layout narrativo único do bloco “Novo Papel” (AC: #1, #2, #3)
  - [ ] 2.1 Estruturar Página 1 com composição distinta dos tópicos 6–12 (timeline narrativa + seção de skills + tabela comparativa).
  - [ ] 2.2 Reusar componentes do design system já existentes (`TopicReveal`, `NeonCard`, `GlowDivider`, `NarratorToggle`, `MatrixTerminal`) sem criar biblioteca nova.
  - [ ] 2.3 Garantir hierarquia visual de palco (métrica de destaque, títulos, conteúdo, metadados) e responsividade desktop-first.
  - [ ] 2.4 Implementar Página 2 com notas do narrador em tom conversacional (orientadas ao “Aha!” e transição para fechamento do Epic 5).
- [ ] Task 3: Cobrir com testes da story (AC: #1, #2, #3)
  - [ ] 3.1 Criar `src/__tests__/topic13.test.tsx` para validar render de título, métrica de destaque e blocos principais.
  - [ ] 3.2 Validar que `Topic13` consome `topic13Data.ts` (sem conteúdo hardcoded no componente).
  - [ ] 3.3 Validar toggle entre Página 1 e Página 2 e render das notas do narrador.
- [ ] Task 4: Executar gates obrigatórios do repositório
  - [ ] 4.1 `npm run test`
  - [ ] 4.2 `npm run build`

## Dev Notes

### Developer Context Section

- Esta story está no Epic 5 (FR18) e conclui o bloco “O Novo Papel” antes do bloco final de impacto/CTA.
- O conteúdo consolidado de `topic13.md` enfatiza as 5 skills do Context Engineer; para este tópico, o enquadramento deve explicitar essas skills como resposta prática ao paradoxo de carreira do bloco.
- Evitar repetição de layout dos tópicos 9 e 10; o tópico deve manter identidade visual própria e foco em clareza de narrativa.
- Não há dependências técnicas novas; usar somente os componentes e stack já aprovados no projeto.

### Technical Requirements

- Criar data source dedicado em `src/data/topic13Data.ts` com conteúdo em PT-BR.
- Implementar `Topic13.tsx` sem importar markdown em runtime.
- Manter padrão de duas páginas com `NarratorToggle`:
  - Página 1: conteúdo principal (skills, comparação, métrica, fechamento narrativo).
  - Página 2: notas do narrador.
- Reusar tokens/estilo Matrix do design system (contraste, glow, tipografia mono/sans).
- Preservar `prefers-reduced-motion` via padrões de animação já existentes.

### Architecture Compliance

- Seguir arquitetura vigente:
  - tópico em `src/components/topics/Topic13.tsx`;
  - dados em `src/data/topic13Data.ts`;
  - testes em `src/__tests__/topic13.test.tsx`.
- Não alterar `PresentationContext`, navegação global, hash sync ou lazy-loading do shell.
- Manter regra de um componente por arquivo e sem barrel exports.

### Library / Framework Requirements

- React 19.x
- TypeScript 5.x (strict)
- Tailwind CSS 4.x
- Framer Motion 12.x
- Vitest + Testing Library
- Sem inclusão de novas dependências.

### File Structure Requirements

- Criar:
  - `src/data/topic13Data.ts`
  - `src/__tests__/topic13.test.tsx`
- Atualizar:
  - `src/components/topics/Topic13.tsx`
- Não modificar arquivos de infraestrutura global para esta story.

### Testing Requirements

- Validar renderização dos blocos narrativos principais do tópico.
- Validar consumo de `topic13Data.ts` como fonte única de conteúdo.
- Validar alternância conteúdo/notas via `NarratorToggle`.
- Executar suíte completa (`npm run test`) e build (`npm run build`).

### Project Context Reference

- `_bmad-output/planning-artifacts/epics.md` (Epic 5 / Story 5.3)
- `docs/topicos/topic13.md`
- `_bmad-output/planning-artifacts/design-system.md`
- `_bmad-output/planning-artifacts/architecture.md`
- `_bmad-output/project-context.md`
- `_bmad-output/implementation-artifacts/4-4-topico-9-bmad-times-multi-agente.md`
- `_bmad-output/implementation-artifacts/4-7-topico-10-qual-ferramenta-usar.md`

## Dev Agent Record

### Agent Model Used

GitHub Copilot CLI (GPT-5.4)

### Debug Log References

- Workflow engine: `_bmad/core/tasks/workflow.xml`
- Workflow config: `_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/create-story/instructions.xml`

### Completion Notes List

- Story context 5.3 gerada em modo YOLO a partir do fluxo create-story.
- Contexto consolidado com base em Epic 5, `docs/topicos/topic13.md` e padrões das stories 4.x.
- Documento estruturado para execução direta por dev agent sem dependências novas.

### File List

- `_bmad-output/implementation-artifacts/5-3-topico-13-o-paradoxo-do-junior.md` (created)

## Change Log

- 2026-03-08: Criação da story de contexto 5.3 com status `ready-for-dev`, ACs, tarefas, guardrails técnicos e referências de projeto.

