# Story 3.2: componentes-splitscreen-e-neoncard

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como apresentador,  
eu quero componentes visuais reutilizaveis para comparacoes lado a lado e cards destacados,  
para que topicos que contrastam "Problema vs Solucao" sejam visualmente claros e impactantes.

## Acceptance Criteria

1. Dado o componente `SplitScreen` com `leftContent` e `rightContent`, quando renderizado em desktop (`>=1024px`), entao divide a tela em duas metades iguais: esquerda com tom vermelho (problema) e direita com tom verde (solucao).
2. Dado o `SplitScreen` em viewport `<768px`, quando renderizado, entao empilha verticalmente (problema em cima, solucao embaixo).
3. Dado o componente `NeonCard`, quando renderizado, entao exibe borda neon (verde ou vermelho conforme `variant`) com glow sutil no hover.
4. Dado `NeonCard` com `variant="danger"`, quando renderizado, entao borda e glow usam `#FF003C`; com `variant="success"` usam `#00FF41`.

## Tasks / Subtasks

- [ ] Criar `SplitScreen` reutilizavel em `src/components/ui/` (AC: 1, 2)
  - [ ] Definir props tipadas: `leftContent`, `rightContent`, `className?`
  - [ ] Implementar layout responsivo desktop-first (2 colunas >= `lg`) com stack em mobile
  - [ ] Fixar semantica espacial: problema na esquerda/solucao na direita em desktop
- [ ] Criar `NeonCard` reutilizavel em `src/components/ui/` (AC: 3, 4)
  - [ ] Definir props tipadas: `variant`, `children`, `className?`
  - [ ] Aplicar tokens do tema para borda/glow por variante
  - [ ] Implementar hover com `transform`/`opacity` (sem animar propriedades de layout)
- [ ] Integrar smoke de uso minimo sem antecipar escopo de topicos finais (AC: 1, 3)
  - [ ] Opcional: usar placeholder simples em `Topic5` para validar composicao base
  - [ ] Nao acoplar copy final dos topicos dentro dos componentes de UI
- [ ] Cobrir comportamento com testes (AC: 1, 2, 3, 4)
  - [ ] Testar comportamento responsivo do `SplitScreen` por classes/estrutura
  - [ ] Testar variantes e classes semanticas do `NeonCard`
  - [ ] Garantir ausencia de regressao nos testes existentes de shell/navigation
- [ ] Executar gates obrigatorios
  - [ ] `npm run test -- --run`
  - [ ] `npm run build`

## Dev Notes

### Developer Context Section

- Esta story entrega a base visual reutilizavel para as stories 3.7 (Topic5) e 4.x que usam comparacoes e cards.
- O projeto ja esta com tema/tokens definidos (2.1), background matrix (2.2), transicao global (2.3) e reveal por topico (2.4).
- O principal risco e acoplar conteudo especifico ao componente generico, dificultando manutencao e reuso.

### Technical Requirements

- `SplitScreen`:
  - layout em duas colunas no desktop e pilha vertical em mobile
  - manter ordem informacional consistente (problema antes de solucao)
  - suportar conteudo arbitrario via `ReactNode`
- `NeonCard`:
  - variantes `danger` e `success` com tokens de cor do tema
  - hover com glow sutil e leve elevacao visual
  - sem dependencia de bibliotecas extras
- Motion/performance:
  - qualquer animacao restrita a `transform` e `opacity`
  - evitar efeitos pesados que competem com `MatrixBackground`

### Architecture Compliance

- Manter componentes genericos em `src/components/ui/`.
- Nao mover logica de navegacao/estado para esses componentes.
- Nao importar conteudo de `docs/` em runtime.
- Seguir regra de um componente por arquivo e sem barrel exports.

### Library / Framework Requirements

- **React 19.x**: componentes funcionais tipados com `interface`.
- **Tailwind CSS 4.x**: usar tokens em `src/styles/theme.css`.
- **Framer Motion 12.x** (opcional nesta story): se usado para microinteracao, manter variantes fora do render.
- **Stack atual**: manter baseline do repo (Vite 6 / Vitest 3 / plugin-react 4), sem upgrades de major.

### File Structure Requirements

- Criar:
  - `src/components/ui/SplitScreen.tsx`
  - `src/components/ui/NeonCard.tsx`
  - `src/__tests__/splitScreen.test.tsx`
  - `src/__tests__/neonCard.test.tsx`
- Atualizar (somente se necessario para smoke):
  - `src/components/topics/Topic5.tsx` (opcional e minimo)
- Nao alterar contratos de `PresentationContext` e hooks globais.

### Testing Requirements

- Verificar ACs de layout/variante em testes de componente.
- Garantir regressao verde para keyboard, overview, hash e transicoes.
- Executar suite completa e build.

### Previous Story Intelligence

- Story 3.1 foi criada como `ready-for-dev`, sem implementacao ainda.
- Portanto, ainda nao ha learnings de dev/review dentro do Epic 3 para reaproveitar.
- Reaproveitar padroes de qualidade consolidados no Epic 2 (reduced-motion, tests + build gates, rastreabilidade).

### Git Intelligence Summary

- Commits recentes reforcam baseline visual e navegacao:
  - `30ee69c` epico 2 terminado
  - `7aec5f8` story 2.2 matrix background
  - `0277ad0` story 2.1 tema e tipografia
  - `216d018` hash sync
- Inference: manter mudancas isoladas em UI reutilizavel reduz risco de regressao no shell.

### Latest Tech Information (2026-03-06)

- Tailwind 4 continua adequado para tokens + utilitarios de layout responsivo.
- Motion recomenda reduced motion para acessibilidade; se houver microanimacao nos cards, respeitar esse fallback.
- React 19 segue sem alteracoes impeditivas para componentes funcionais de apresentacao.

### Project Context Reference

- `_bmad-output/planning-artifacts/epics.md` (Epic 3 / Story 3.2)
- `_bmad-output/planning-artifacts/design-system.md` (SplitScreen e NeonCard)
- `_bmad-output/planning-artifacts/architecture.md` (estrutura, guardrails e boundaries)
- `_bmad-output/project-context.md` (regras de implementacao)
- `_bmad-output/implementation-artifacts/2-4-animacoes-de-entrada-por-topico.md`
- `src/styles/theme.css`
- `src/components/topics/PlaceholderTopic.tsx`

### Story Completion Status

- Story context criada para prevenir erros comuns:
  - hardcode de conteudo especifico em componente reutilizavel
  - quebra de responsividade desktop/projetor
  - variacao de cores fora dos tokens oficiais
  - microanimacao com propriedades de layout (jank)
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.2: Componentes SplitScreen & NeonCard]
- [Source: _bmad-output/planning-artifacts/design-system.md#4.2 `<SplitScreen />`]
- [Source: _bmad-output/planning-artifacts/design-system.md#4.3 `<NeonCard />`]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/project-context.md#Critical Implementation Rules]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/create-story/instructions.xml`

### Completion Notes List

- Story 3.2 criada com escopo tecnico e guardrails para `SplitScreen` e `NeonCard`.
- Dependencias de stories seguintes (3.7 e 4.x) explicitadas.

### File List

- `_bmad-output/implementation-artifacts/3-2-componentes-splitscreen-e-neoncard.md` (created)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)
