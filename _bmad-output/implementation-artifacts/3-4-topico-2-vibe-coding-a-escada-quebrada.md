# Story 3.4: topico-2-vibe-coding-a-escada-quebrada

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como audiencia,  
eu quero ver o Topico 2 ilustrando o ciclo vicioso do Vibe Coding,  
para que eu entenda visualmente por que a abordagem sem metodo falha.

## Acceptance Criteria

1. Dado que o apresentador navega ate o Topico 2, quando o topico entra em foco, entao `Topic2.tsx` e renderizado com o conteudo de Vibe Coding (titulo, analogia da "casa sem planta", dados).
2. Dado o Topico 2 renderizado, quando visualizado, entao conteudo vem de `src/data/topic2Data.ts` e e legivel em projetor.
3. Dado as animacoes de entrada do Topico 2, quando o topico estabiliza, entao elementos entram com delay escalonado respeitando o padrao `>=0.4s` do Epic 2.

## Tasks / Subtasks

- [ ] Criar `src/data/topic2Data.ts` com estrutura do topico (AC: 1, 2)
  - [ ] Incluir headline do estudo METR (`+24%` expectativa, `+20%` percepcao, `-19%` realidade)
  - [ ] Incluir metrica principal de gap (`43 pontos`)
  - [ ] Incluir sintomas operacionais e dados de apoio
- [ ] Implementar `Topic2.tsx` com foco em narrativa do problema (AC: 1, 2, 3)
  - [ ] Reusar `TopicReveal` para sequenciamento de entrada
  - [ ] Manter destaque de risco em paleta `danger`
  - [ ] Garantir legibilidade em desktop/projetor
- [ ] Preparar extensibilidade para componente de comparacao no futuro (sem inflar escopo)
  - [ ] Estruturar markup para facil adicao de grafico/barras em story posterior, se necessario
- [ ] Cobrir com testes (AC: 1, 2, 3)
  - [ ] Verificar render dos dados centrais (`-19%`, `43 pontos`)
  - [ ] Verificar consumo de `src/data/topic2Data.ts`
  - [ ] Verificar uso de wrapper de reveal
- [ ] Executar gates obrigatorios
  - [ ] `npm run test -- --run`
  - [ ] `npm run build`

## Dev Notes

### Developer Context Section

- Topico 2 aprofunda o problema iniciado no Topico 1 e prepara o clmax tecnico no Topico 3 (Context Rot).
- Conteudo aprovado destaca discrepancia percepcao vs realidade (METR), devendo ser visualmente claro e direto.
- Risco principal: excesso de texto sem hierarquia visual, reduzindo impacto no palco.

### Technical Requirements

- Manter separacao de dados em `src/data/topic2Data.ts`.
- Estruturar o componente para:
  - titulo/subtitulo de alto impacto
  - bloco de metricas principais
  - bloco resumido de sintomas
- Reusar reveal/stagger do Epic 2.
- Nao introduzir logica de estado local complexa para este topico.

### Architecture Compliance

- `Topic2.tsx` permanece lazy-loaded no registry existente.
- Nao importar markdown em runtime.
- Nao alterar hooks de navegacao/global state.

### Library / Framework Requirements

- **React 19.x** e **Tailwind 4.x** para composicao.
- **Framer Motion 12.x** somente via padrao de reveal existente.
- Sem dependencias novas.

### File Structure Requirements

- Criar:
  - `src/data/topic2Data.ts`
- Atualizar:
  - `src/components/topics/Topic2.tsx`
  - testes em `src/__tests__/` para `Topic2`
- Nao alterar arquivos de infraestrutura global.

### Testing Requirements

- Cobrir render de metricas e estrutura principal.
- Confirmar integracao com reveal.
- Rodar test suite + build.

### Previous Story Intelligence

- 3.1, 3.2 e 3.3 estao em `ready-for-dev`, sem feedback de review ate o momento.
- Seguir padrao de artefatos do Epic 2: escopo enxuto, rastreabilidade e gates tecnicos.

### Git Intelligence Summary

- Historico recente indica estabilidade da camada de transicao/reveal.
- Inference: manter mudanca isolada em `Topic2` + `src/data` evita regressao lateral.

### Latest Tech Information (2026-03-06)

- Sem mudancas tecnicas obrigatorias para esta story; stack atual cobre os requisitos.
- Recomendada manutencao de reduced-motion via camada ja existente.

### Project Context Reference

- `_bmad-output/planning-artifacts/epics.md` (Epic 3 / Story 3.4)
- `docs/topicos/topic2.md`
- `_bmad-output/implementation-artifacts/2-4-animacoes-de-entrada-por-topico.md`
- `_bmad-output/project-context.md`
- `src/components/topics/TopicReveal.tsx`
- `src/data/topics.ts`

### Story Completion Status

- Story context criada para prevenir erros comuns:
  - topico sem foco em metrica central
  - mistura de conteudo e layout sem separacao de dados
  - quebra de padrao de animacao de entrada
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.4: Topico 2 - Vibe Coding: A Escada Quebrada]
- [Source: docs/topicos/topic2.md]
- [Source: _bmad-output/implementation-artifacts/2-4-animacoes-de-entrada-por-topico.md]
- [Source: _bmad-output/project-context.md]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/create-story/instructions.xml`

### Completion Notes List

- Story 3.4 criada com foco em narrativa de gap percepcao x realidade.
- Padrao de reveal e separacao data/UI explicitados.

### File List

- `_bmad-output/implementation-artifacts/3-4-topico-2-vibe-coding-a-escada-quebrada.md` (created)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)
