# Story 3.5: topico-3-context-rot

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como audiencia,  
eu quero ver o Topico 3 com a visualizacao da degradacao progressiva do contexto,  
para que o "Aha!" moment de identificacao com o problema aconteca.

## Acceptance Criteria

1. Dado que o apresentador navega ate o Topico 3, quando o topico entra em foco, entao `Topic3.tsx` e renderizado mostrando a degradacao progressiva do contexto (`0% -> 70%`).
2. Dado a metrica de degradacao, quando exibida, entao usa `AnimatedCounter` com `variant="danger"` animando de `0` a `70`.
3. Dado o Topico 3 renderizado, quando inspecionado, entao conteudo vem de `src/data/topic3Data.ts`.

## Tasks / Subtasks

- [ ] Criar `src/data/topic3Data.ts` com estrutura cientifica do topico (AC: 1, 3)
  - [ ] Incluir faixas de degradacao (`0-30`, `30-50`, `50-70`, `70+`)
  - [ ] Incluir fontes/resumos (Chroma, Adobe, Paulsen arXiv) como metadados editoriais
  - [ ] Definir metrica hero `70%` para animacao
- [ ] Implementar `Topic3.tsx` com narrativa visual de degrado (AC: 1, 2, 3)
  - [ ] Integrar `AnimatedCounter value={70} variant="danger"`
  - [ ] Exibir quadro/tabela simplificada de degradacao
  - [ ] Manter padrao de entrada por reveal
- [ ] Preservar legibilidade e ritmo para apresentacao ao vivo
  - [ ] Evitar sobrecarga visual de muitos elementos simultaneos
  - [ ] Priorizacao visual: metrica > titulo > tabela > fonte
- [ ] Cobrir com testes (AC: 1, 2, 3)
  - [ ] Render da metrica e semantica do topico
  - [ ] Consumo de `src/data/topic3Data.ts`
  - [ ] Integracao de `AnimatedCounter` no topico
- [ ] Executar gates obrigatorios
  - [ ] `npm run test -- --run`
  - [ ] `npm run build`

## Dev Notes

### Developer Context Section

- Este e o clmax tecnico do bloco "Problema".
- O topico deve reforcar que contexto longo sem curadoria degrada resultados de IA.
- Risco principal: transformar evidencias em texto denso sem visualizacao clara de curva de degradacao.

### Technical Requirements

- Data file deve concentrar:
  - titulo/subtitulo
  - metrica hero `70`
  - tabela de faixas com descricoes curtas
- `Topic3.tsx` deve reutilizar componentes existentes (`TopicReveal`, `AnimatedCounter`) em vez de implementar contador local.
- Visual de risco usando paleta `danger`.
- Reduced motion deve seguir comportamento definido em componentes base.

### Architecture Compliance

- Manter segregacao entre dados e apresentacao.
- Nao introduzir estado global novo.
- Nao importar markdown em runtime.

### Library / Framework Requirements

- **React 19.x**, **Tailwind 4.x**, **Framer Motion 12.x** conforme baseline.
- Nao adicionar dependencia para charting nesta story; usar composicao HTML/CSS simples.

### File Structure Requirements

- Criar:
  - `src/data/topic3Data.ts`
- Atualizar:
  - `src/components/topics/Topic3.tsx`
  - teste dedicado em `src/__tests__/`
- Dependencia:
  - `src/components/ui/AnimatedCounter.tsx` (story 3.1)

### Testing Requirements

- Testar render da metrica `70` e variante `danger`.
- Testar que dados sao consumidos de `src/data/topic3Data.ts`.
- Validar suite completa e build.

### Topic Component Pattern (OBRIGATORIO)

**Referencia:** Story 3.3 (Topic1) estabeleceu o pattern definitivo. Ver `src/components/topics/Topic1.tsx` + `src/data/topic1Data.ts`.
- Data source tipado em `src/data/topicNData.ts` (title, subtitle, metric, supportingItems com highlight+text, talkingPoints)
- `TopicReveal`/`TopicRevealItem` para stagger, `AnimatedCounter` para hero metric, `NeonCard` para dados de apoio
- Talking points visiveis na parte inferior (text-xs font-mono text-muted, border-top)
- Tipografia: titulo `text-5xl lg:text-6xl font-mono font-bold`, corpo `text-base-lg font-sans`, metric context `text-xs font-mono font-light text-muted`
- Gaps: `gap-8 lg:gap-16` entre secoes

### Previous Story Intelligence

- Story 3.3 (Topic1) COMPLETA e em review — usar como referencia de pattern.
- Continuar seguindo guardrails de animacao ja validados no Epic 2.

### Git Intelligence Summary

- Ultimos commits mostram disciplina de transicao/reveal e rastreabilidade por story.
- Inference: manter topico autocontido evita regressao em shell/app state.

### Latest Tech Information (2026-03-06)

- Motion e React continuam fornecendo primitives suficientes para este topico sem bibliotecas adicionais.
- Vitest segue adequado para validar composicao e render.

### Project Context Reference

- `_bmad-output/planning-artifacts/epics.md` (Epic 3 / Story 3.5)
- `docs/topicos/topic3.md`
- `_bmad-output/planning-artifacts/design-system.md`
- `_bmad-output/implementation-artifacts/3-3-topico-1-hook-o-problema-88.md` (REFERENCIA DE PATTERN)
- `_bmad-output/implementation-artifacts/3-1-componente-animatedcounter.md`
- `_bmad-output/implementation-artifacts/2-4-animacoes-de-entrada-por-topico.md`
- `_bmad-output/project-context.md`
- `src/components/topics/Topic1.tsx` + `src/data/topic1Data.ts` (implementacao de referencia)

### Story Completion Status

- Story context criada para prevenir erros comuns:
  - topico sem visualizacao de degradacao progressiva
  - metrica central sem destaque/animacao
  - perda de separacao data/UI
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.5: Topico 3 - Context Rot]
- [Source: docs/topicos/topic3.md]
- [Source: _bmad-output/implementation-artifacts/3-1-componente-animatedcounter.md]
- [Source: _bmad-output/implementation-artifacts/2-4-animacoes-de-entrada-por-topico.md]
- [Source: _bmad-output/project-context.md]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/create-story/instructions.xml`

### Completion Notes List

- Story 3.5 criada com foco em evidencias de degradacao e metrica hero de 70%.
- Dependencias com 3.1 e 2.4 documentadas.

### File List

- `_bmad-output/implementation-artifacts/3-5-topico-3-context-rot.md` (created)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)
