# Story 3.6: topico-4-context-engineering

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como audiencia,  
eu quero ver o Topico 4 introduzindo o conceito de Context Engineering como solucao,  
para que a virada narrativa do Problema para a Solucao seja clara e impactante.

## Acceptance Criteria

1. Dado que o apresentador navega ate o Topico 4, quando o topico entra em foco, entao `Topic4.tsx` e renderizado com definicao e pilares do Context Engineering.
2. Dado o Topico 4 renderizado, quando visualizado, entao contraste visual muda do tom "perigo" (vermelho) para tom "solucao" (verde), marcando a virada narrativa.
3. Dado o Topico 4, quando inspecionado, entao conteudo vem de `src/data/topic4Data.ts`.

## Tasks / Subtasks

- [ ] Criar `src/data/topic4Data.ts` com conceito e escada de maturidade (AC: 1, 3)
  - [ ] Incluir niveis (copy-paste, prompt engineering, context engineering, agentic orchestration)
  - [ ] Destacar transicao-chave `nivel 2 -> nivel 3`
  - [ ] Incluir metricas de apoio aprovadas para contexto de solucao
- [ ] Implementar `Topic4.tsx` com transicao visual de virada (AC: 1, 2, 3)
  - [ ] Reusar reveal escalonado do Epic 2
  - [ ] Aplicar paleta `success` como dominante sem perder legibilidade
  - [ ] Priorizar clareza da escada de maturidade em layout simples
- [ ] Garantir coerencia narrativa com topicos 3 e 5
  - [ ] Fechar problema do context rot e abrir caminho para SDD (Topic5)
- [ ] Cobrir com testes (AC: 1, 2, 3)
  - [ ] Render dos pilares/niveis principais
  - [ ] Uso de data source dedicado
  - [ ] Sinais visuais de tom "solucao"
- [ ] Executar gates obrigatorios
  - [ ] `npm run test -- --run`
  - [ ] `npm run build`

## Dev Notes

### Developer Context Section

- Este topico marca explicitamente a virada do arco narrativo.
- Visualmente, deve reduzir "alarme" e aumentar "clareza/estrutura".
- Risco principal: manter visual de problema e perder a transicao semantica para solucao.

### Technical Requirements

- `topic4Data` deve conter:
  - titulo/subtitulo
  - definicao de context engineering
  - escada de maturidade resumida
  - metricas de apoio nao excessivas
- Componente deve:
  - usar classes e tokens `accent-primary`
  - manter hierarquia de leitura para palco
  - evitar sobrecarga interativa nesta fase

### Architecture Compliance

- Dados em `src/data/topic4Data.ts`; UI em `Topic4.tsx`.
- Nao alterar contexto global.
- Nao importar markdown em runtime.

### Library / Framework Requirements

- Stack baseline atual sem upgrades.
- Reusar infraestrutura existente de motion/reveal.

### File Structure Requirements

- Criar:
  - `src/data/topic4Data.ts`
- Atualizar:
  - `src/components/topics/Topic4.tsx`
  - teste dedicado em `src/__tests__/`

### Testing Requirements

- Verificar render do conteudo principal e data source.
- Verificar classe/semantica visual de tom de solucao.
- Rodar testes + build.

### Topic Component Pattern (OBRIGATORIO)

**Referencia:** Story 3.3 (Topic1) estabeleceu o pattern definitivo. Ver `src/components/topics/Topic1.tsx` + `src/data/topic1Data.ts`.
- Data source tipado em `src/data/topicNData.ts` (title, subtitle, metric, supportingItems com highlight+text, talkingPoints)
- `TopicReveal`/`TopicRevealItem` para stagger, `AnimatedCounter` para hero metric, `NeonCard` para dados de apoio
- Talking points visiveis na parte inferior (text-xs font-mono text-muted, border-top)
- Tipografia: titulo `text-5xl lg:text-6xl font-mono font-bold`, corpo `text-base-lg font-sans`, metric context `text-xs font-mono font-light text-muted`
- Este topico usa `accent-primary` (verde) como dominante — virada narrativa

### Previous Story Intelligence

- Story 3.3 (Topic1) COMPLETA e em review — usar como referencia de pattern.
- Garantir continuidade com padrao de transicao/reveal ja consolidado.

### Git Intelligence Summary

- Base do Epic 2 encerrou com pipeline de navegacao/motion estavel.
- Inference: evitar mudancas fora do topico/data para manter previsibilidade.

### Latest Tech Information (2026-03-06)

- Nenhuma exigencia de tecnologia nova para implementar a virada narrativa deste topico.
- Prioridade e composicao de UI/data sobre novas libs.

### Project Context Reference

- `_bmad-output/planning-artifacts/epics.md` (Epic 3 / Story 3.6)
- `docs/topicos/topic4.md`
- `_bmad-output/planning-artifacts/design-system.md`
- `_bmad-output/implementation-artifacts/3-3-topico-1-hook-o-problema-88.md` (REFERENCIA DE PATTERN)
- `_bmad-output/implementation-artifacts/2-4-animacoes-de-entrada-por-topico.md`
- `_bmad-output/project-context.md`
- `src/components/topics/Topic1.tsx` + `src/data/topic1Data.ts` (implementacao de referencia)

### Story Completion Status

- Story context criada para prevenir erros comuns:
  - virada narrativa sem mudanca visual clara
  - excesso de texto sem estrutura de maturidade
  - acoplamento de conteudo no componente
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.6: Topico 4 - Context Engineering]
- [Source: docs/topicos/topic4.md]
- [Source: _bmad-output/planning-artifacts/design-system.md]
- [Source: _bmad-output/project-context.md]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/create-story/instructions.xml`

### Completion Notes List

- Story 3.6 criada com foco na virada de problema para solucao.
- Requisitos visuais e de estrutura narrativa foram explicitados.

### File List

- `_bmad-output/implementation-artifacts/3-6-topico-4-context-engineering.md` (created)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)
