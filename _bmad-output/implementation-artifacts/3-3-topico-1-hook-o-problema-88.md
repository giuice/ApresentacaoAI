# Story 3.3: topico-1-hook-o-problema-88

Status: review

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

- [x] Criar data source de Topico 1 em `src/data/topic1Data.ts` (AC: 3)
  - [x] Estruturar titulo, subtitulo, metrica principal e itens de apoio em PT-BR
  - [x] Incluir referencia explicita para metrica `88%` e contexto de risco
- [x] Implementar `Topic1.tsx` com composicao visual hero (AC: 1, 2, 4)
  - [x] Integrar `AnimatedCounter` em `variant="danger"` com `value={88}` e `suffix="%"`
  - [x] Manter uso do padrao de reveal (`TopicReveal`/`TopicRevealItem`)
  - [x] Garantir hierarquia visual de projetor (counter dominante)
- [x] Assegurar separacao conteudo/UI (AC: 3, 4)
  - [x] Componente deve consumir somente `src/data/topic1Data.ts`
  - [x] Nao acessar markdown em runtime
- [x] Cobrir com testes (AC: 1, 2, 3, 4)
  - [x] Verificar render do titulo/subtitulo/counter
  - [x] Verificar uso de dados externos ao componente (smoke via import)
  - [x] Verificar classe/tamanho minimo do hero metric
- [x] Executar gates obrigatorios
  - [x] `npm run test -- --run`
  - [x] `npm run build`

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

Claude Opus 4.6

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/dev-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/dev-story/instructions.xml`

### Implementation Plan

- Criado `src/data/topic1Data.ts` com interface tipada e dados em PT-BR (titulo, subtitulo, definicao, analogia, metrica 88%, supporting items com highlights, talking points)
- Reescrito `Topic1.tsx` com layout split: esquerda = definicao + analogia + AnimatedCounter hero | direita = NeonCards com dados de adocao
- Talking points do apresentador visiveis na parte inferior como lista sutil
- Testes cobrem: render de titulo/definicao/analogia/counter, NeonCards, talking points, tamanho minimo do hero metric, reveal container

### Completion Notes List

- Story 3.3 criada com contrato claro de conteudo em `src/data` e topico hero.
- Dependencia com 3.1 explicitada.
- Implementacao completa: Topic1 com layout split usando NeonCards, AnimatedCounter 88% danger, talking points visiveis
- 141 testes passando (11 novos + 130 existentes), build OK
- Testes existentes `App.test.tsx` e `appLazyLoad.test.tsx` atualizados para refletir novo conteudo do Topic1
- Correcao de compliance com design system: tipografia, espacamento, max-width do PresentationLayout (1024px -> max-w-7xl)
- Documentado topic component pattern para reuso em topicos subsequentes

### File List

- `src/data/topic1Data.ts` (created)
- `src/components/topics/Topic1.tsx` (modified)
- `src/__tests__/topic1.test.tsx` (created)
- `src/App.test.tsx` (modified)
- `src/__tests__/appLazyLoad.test.tsx` (modified)
- `src/components/layout/PresentationLayout.tsx` (modified — max-w-7xl + px-8)
- `src/__tests__/presentationLayout.test.tsx` (modified)
- `_bmad-output/implementation-artifacts/3-3-topico-1-hook-o-problema-88.md` (modified)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)

### Change Log

- 2026-03-06: Implementacao completa do Topic1 com AnimatedCounter 88% danger, data source separado, testes dedicados
- 2026-03-06: Enriquecido Topic1 com layout split (NeonCards a direita), talking points, compliance com design system (tipografia, espacamento, max-width)
- 2026-03-06: PresentationLayout max-width corrigido de 1024px para max-w-7xl per design system
- 2026-03-06: Documentado topic component pattern em memoria do agente
