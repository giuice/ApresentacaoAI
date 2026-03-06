# Story 3.3: topico-1-hook-o-problema-88

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como audiencia,  
eu quero ver o Topico 1 com o counter de 88% animado e a estetica Matrix impactante,  
para que nos primeiros 30 segundos fique claro que nao e um PowerPoint comum.

## Acceptance Criteria

1. Dado que o apresentador navega ate o Topico 1, quando o topico entra em foco, entao `Topic1.tsx` e renderizado com titulo, subtitulo e `AnimatedCounter` mostrando `88%` em `variant="danger"`.
2. Dado o Topico 1 renderizado, quando visualizado em viewport `1280x720`, entao o numero `88%` e visivel em tamanho grande (minimo `text-8xl`) e legivel sobre fundo escuro.
3. Dado o conteudo do Topico 1, quando exibido, entao vem de `src/data/topic1Data.ts` (nao hardcoded no componente).
4. Dado `Topic1.tsx`, quando inspecionado, entao usa lazy-load configurado no Epic 1 e nao importa de `docs/topicos/`.

## Tasks / Subtasks

- [ ] Criar data source de Topico 1 em `src/data/topic1Data.ts` (AC: 3)
  - [ ] Estruturar titulo, subtitulo, metrica principal e itens de apoio em PT-BR
  - [ ] Incluir referencia explicita para metrica `88%` e contexto de risco
- [ ] Implementar `Topic1.tsx` com composicao visual hero (AC: 1, 2, 4)
  - [ ] Integrar `AnimatedCounter` em `variant="danger"` com `value={88}` e `suffix="%"`
  - [ ] Manter uso do padrao de reveal (`TopicReveal`/`TopicRevealItem`)
  - [ ] Garantir hierarquia visual de projetor (counter dominante)
- [ ] Assegurar separacao conteudo/UI (AC: 3, 4)
  - [ ] Componente deve consumir somente `src/data/topic1Data.ts`
  - [ ] Nao acessar markdown em runtime
- [ ] Cobrir com testes (AC: 1, 2, 3, 4)
  - [ ] Verificar render do titulo/subtitulo/counter
  - [ ] Verificar uso de dados externos ao componente (smoke via import)
  - [ ] Verificar classe/tamanho minimo do hero metric
- [ ] Executar gates obrigatorios
  - [ ] `npm run test -- --run`
  - [ ] `npm run build`

## Dev Notes

### Developer Context Section

- Esta story inaugura a entrega real de topicos do bloco 1.
- Depende da implementacao do componente `AnimatedCounter` (3.1).
- O foco e impacto visual de abertura com clareza de mensagem, sem inflar escopo com elementos avancados ainda.

### Technical Requirements

- Topico 1 deve manter copy em PT-BR e destacar:
  - definicao de vibe coding
  - analogia da "casa sem planta"
  - metrica principal `88%`
- Integrar com `AnimatedCounter` sem logica duplicada de contagem dentro do topico.
- Layout responsivo desktop-first com legibilidade em 1280x720.
- Nao quebrar fluxo de transicao global + reveal local.

### Architecture Compliance

- `Topic1.tsx` permanece em `src/components/topics/`.
- Conteudo fica em `src/data/topic1Data.ts`.
- Nao alterar `App.tsx` registry de lazy-load alem do que ja existe.
- Sem imports de `docs/topicos/topic1.md` no runtime.

### Library / Framework Requirements

- **React 19.x**: componente funcional simples, sem side-effects desnecessarios.
- **Framer Motion 12.x**: reusar camada de reveal existente; evitar animacao ad hoc.
- **Tailwind 4.x**: aplicar tokens e classes de hierarquia visual.

### File Structure Requirements

- Criar:
  - `src/data/topic1Data.ts`
- Atualizar:
  - `src/components/topics/Topic1.tsx`
  - `src/__tests__/` (novo teste dedicado de `Topic1`)
- Nao alterar infraestrutura de navegacao/hash.

### Testing Requirements

- Confirmar render de conteudo vindo de data file.
- Confirmar presence do `AnimatedCounter` com variante `danger`.
- Confirmar legibilidade minima (hero metric grande).
- Rodar testes + build.

### Previous Story Intelligence

- Story 3.2 tambem foi criada como `ready-for-dev`; ainda sem learnings de implementacao.
- Epic 2 consolidou padrao de entrada por topico e reduced-motion que deve ser preservado.

### Git Intelligence Summary

- Base recente de UI/transicao esta estavel apos fechamento do Epic 2.
- Inference: minimizar mudancas fora de `Topic1` + `src/data` + testes reduz risco de regressao.

### Latest Tech Information (2026-03-06)

- React + lazy/Suspense continuam adequados para topicos com code-splitting.
- Motion segue recomendando reduced-motion e variants declarativas.
- Nao ha necessidade tecnica de upgrade de stack para esta story.

### Project Context Reference

- `_bmad-output/planning-artifacts/epics.md` (Epic 3 / Story 3.3)
- `docs/topicos/topic1.md`
- `_bmad-output/planning-artifacts/design-system.md` (`AnimatedCounter`, hierarquia visual)
- `_bmad-output/implementation-artifacts/3-1-componente-animatedcounter.md`
- `_bmad-output/implementation-artifacts/2-4-animacoes-de-entrada-por-topico.md`
- `_bmad-output/project-context.md`
- `src/data/topics.ts` (estado placeholder atual)

### Story Completion Status

- Story context criada para prevenir erros comuns:
  - hardcode de conteudo no componente
  - ausencia de metrica hero no topico de abertura
  - quebra da integracao com lazy-load/reveal existente
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.3: Topico 1 - Hook: O Problema (88%)]
- [Source: docs/topicos/topic1.md]
- [Source: _bmad-output/planning-artifacts/design-system.md#4.1 `<AnimatedCounter />`]
- [Source: _bmad-output/project-context.md#Critical Don't-Miss Rules]
- [Source: _bmad-output/implementation-artifacts/3-1-componente-animatedcounter.md]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/create-story/instructions.xml`

### Completion Notes List

- Story 3.3 criada com contrato claro de conteudo em `src/data` e topico hero.
- Dependencia com 3.1 explicitada.

### File List

- `_bmad-output/implementation-artifacts/3-3-topico-1-hook-o-problema-88.md` (created)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)
