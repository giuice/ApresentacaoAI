# Story 3.7: topico-5-spec-driven-development

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como audiencia,  
eu quero ver o Topico 5 com o SplitScreen comparando Vibe Coding vs Spec-Driven,  
para que a diferenca de abordagens seja visualmente obvia e os ganhos de velocidade impactantes.

## Acceptance Criteria

1. Dado que o apresentador navega ate o Topico 5, quando o topico entra em foco, entao `Topic5.tsx` usa `SplitScreen` com lado esquerdo (Vibe Coding, vermelho) e lado direito (Spec-Driven, verde).
2. Dado o Topico 5 renderizado, quando os contadores aparecem, entao `AnimatedCounter` mostra metricas de ganho (ex: `+26.08%`, `+55%`) em `variant="success"`.
3. Dado o Topico 5, quando inspecionado, entao conteudo vem de `src/data/topic5Data.ts` e componentes vem de `src/components/ui/`.

## Tasks / Subtasks

- [ ] Criar `src/data/topic5Data.ts` com comparativo e metricas (AC: 2, 3)
  - [ ] Incluir contraste "tradicional vs SDD"
  - [ ] Incluir metricas principais aprovadas (`+26.08%`, `+55%`)
  - [ ] Definir itens de apoio para cada lado do split
- [ ] Implementar `Topic5.tsx` com composicao de UI reutilizavel (AC: 1, 2, 3)
  - [ ] Integrar `SplitScreen` (story 3.2)
  - [ ] Integrar `AnimatedCounter` (story 3.1) em variante `success`
  - [ ] Integrar `NeonCard` para blocos auxiliares, quando adequado
- [ ] Manter alinhamento narrativo de fechamento do Bloco 2
  - [ ] Esquerda = problema, direita = solucao
  - [ ] Virada visual consolidada para preparar entrada no bloco de ferramentas (Epic 4)
- [ ] Cobrir com testes (AC: 1, 2, 3)
  - [ ] Verificar uso de `SplitScreen`
  - [ ] Verificar render de counters em `success`
  - [ ] Verificar consumo de `src/data/topic5Data.ts`
- [ ] Executar gates obrigatorios
  - [ ] `npm run test -- --run`
  - [ ] `npm run build`

## Dev Notes

### Developer Context Section

- Topico 5 e fechamento do arco "Problema -> Evolucao", conectando diretamente ao Epic 4 (ferramentas).
- Este topico concentra reutilizacao dos componentes-base criados no Epic 3 (3.1 e 3.2).
- Risco principal: implementar comparativo sem dicotomia visual clara entre esquerda/direita.

### Technical Requirements

- `Topic5.tsx` deve obrigatoriamente consumir:
  - `SplitScreen`
  - `AnimatedCounter`
  - `topic5Data`
- As metricas de ganho devem usar variante `success`.
- Componente precisa manter legibilidade em projetor e responsividade desktop-first.
- Reusar reveal escalonado do Epic 2 para entrada.

### Architecture Compliance

- Nao hardcode de texto diretamente no componente de topico.
- Componentes de UI permanecem em `src/components/ui`.
- Dados em `src/data/topic5Data.ts`.
- Nao alterar infraestrutura global de navegacao/transicao.

### Library / Framework Requirements

- **React 19.x** para composicao.
- **Framer Motion 12.x** via wrappers existentes de reveal/counter.
- **Tailwind 4.x** para estilos e tokens de contraste.
- Sem novas dependencias.

### File Structure Requirements

- Criar:
  - `src/data/topic5Data.ts`
- Atualizar:
  - `src/components/topics/Topic5.tsx`
  - testes de topico em `src/__tests__/`
- Dependencias obrigatorias:
  - `src/components/ui/AnimatedCounter.tsx`
  - `src/components/ui/SplitScreen.tsx`
  - `src/components/ui/NeonCard.tsx` (se utilizado para apoio visual)

### Testing Requirements

- Testar uso de `SplitScreen` e counters em `success`.
- Testar que conteudo vem de `topic5Data`.
- Garantir regressao verde da suite e build.

### Topic Component Pattern (OBRIGATORIO)

**Referencia:** Story 3.3 (Topic1) estabeleceu o pattern definitivo. Ver `src/components/topics/Topic1.tsx` + `src/data/topic1Data.ts`.
- Data source tipado em `src/data/topicNData.ts` (title, subtitle, metric, supportingItems com highlight+text, talkingPoints)
- `TopicReveal`/`TopicRevealItem` para stagger, `AnimatedCounter` para hero metric, `NeonCard` para dados de apoio
- Talking points visiveis na parte inferior (text-xs font-mono text-muted, border-top)
- Este topico usa `SplitScreen` (esquerda=danger, direita=success) + `AnimatedCounter` variant="success"

### Previous Story Intelligence

- Story 3.3 (Topic1) COMPLETA e em review — usar como referencia de pattern.
- Manter abordagem incremental e verificavel.

### Git Intelligence Summary

- Padrrao do repo: entrega por story com testes + build e rastreabilidade no artefato.
- Inference: finalizar Epic 3 com forte reuso de componentes reduz complexidade do Epic 4.

### Latest Tech Information (2026-03-06)

- Motion/React/Tailwind no baseline atual suportam plenamente o comparativo do Topico 5.
- Nenhum upgrade de stack e necessario para cumprir ACs.

### Project Context Reference

- `_bmad-output/planning-artifacts/epics.md` (Epic 3 / Story 3.7)
- `docs/topicos/topic5.md`
- `_bmad-output/planning-artifacts/design-system.md`
- `_bmad-output/implementation-artifacts/3-3-topico-1-hook-o-problema-88.md` (REFERENCIA DE PATTERN)
- `_bmad-output/implementation-artifacts/3-1-componente-animatedcounter.md`
- `_bmad-output/implementation-artifacts/3-2-componentes-splitscreen-e-neoncard.md`
- `_bmad-output/implementation-artifacts/2-4-animacoes-de-entrada-por-topico.md`
- `_bmad-output/project-context.md`
- `src/components/topics/Topic1.tsx` + `src/data/topic1Data.ts` (implementacao de referencia)

### Story Completion Status

- Story context criada para prevenir erros comuns:
  - comparativo sem dicotomia visual problema/solucao
  - metricas sem destaque positivo coerente
  - topico acoplado a copy inline e baixo reuso de componentes
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.7: Topico 5 - Spec-Driven Development]
- [Source: docs/topicos/topic5.md]
- [Source: _bmad-output/implementation-artifacts/3-1-componente-animatedcounter.md]
- [Source: _bmad-output/implementation-artifacts/3-2-componentes-splitscreen-e-neoncard.md]
- [Source: _bmad-output/project-context.md]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/create-story/instructions.xml`

### Completion Notes List

- Story 3.7 criada com dependencias explicitas de componentes do proprio Epic 3.
- Fechamento narrativo do bloco 2 documentado para orientar implementacao.

### File List

- `_bmad-output/implementation-artifacts/3-7-topico-5-spec-driven-development.md` (created)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)
