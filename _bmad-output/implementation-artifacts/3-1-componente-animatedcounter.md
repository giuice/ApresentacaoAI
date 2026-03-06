# Story 3.1: componente-animatedcounter

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como audiencia,  
eu quero ver metricas numericas animando de zero ate o valor final quando um topico entra em foco,  
para que os dados de impacto causem uma impressao emocional forte no momento certo.

## Acceptance Criteria

1. Dado o componente `AnimatedCounter` montado com `value={88}` e `variant="danger"`, quando o topico entra em foco, entao o numero anima de `0` ate `88` com easing suave apos delay de `0.4s`.
2. Dado `variant="danger"`, quando renderizado, entao o counter usa a cor `#FF003C` (`--color-accent-danger`).
3. Dado `variant="success"`, quando renderizado, entao o counter usa a cor `#00FF41` (`--color-accent-primary`).
4. Dado o counter animando, quando a animacao ocorre, entao usa somente `transform` e `opacity` para reveal; o numero e interpolado via Framer Motion.
5. Dado usuario com `prefers-reduced-motion` ativo, quando o counter monta, entao o valor final e exibido imediatamente sem animacao.

## Tasks / Subtasks

- [ ] Criar componente `AnimatedCounter` reutilizavel em `src/components/ui/` (AC: 1, 2, 3, 4, 5)
  - [ ] Definir props tipadas com contrato minimo: `value: number`, `variant: 'danger' | 'success'`, `suffix?: string`, `className?: string`
  - [ ] Extrair constantes de animacao em module scope (duracao, delay `0.4s`, easing), evitando magic numbers inline
  - [ ] Implementar interpolacao numerica com APIs declarativas do Motion (sem `setInterval`)
- [ ] Implementar acessibilidade/reduced-motion no proprio componente (AC: 5)
  - [ ] Usar `useReducedMotion` para bypass de animacao numerica e reveal
  - [ ] Garantir fallback visual estavel (valor final direto, sem deslocamento de eixo)
- [ ] Garantir coerencia visual com design system (AC: 2, 3, 4)
  - [ ] Aplicar variante `danger` com `--color-accent-danger` e `success` com `--color-accent-primary`
  - [ ] Usar tipografia mono e hierarquia adequada para metricas de destaque (desktop/projetor)
  - [ ] Restringir motion visual a `transform`/`opacity`
- [ ] Cobrir comportamento com testes automatizados (AC: 1, 2, 3, 4, 5)
  - [ ] Testar caminho padrao: delay `0.4s`, interpolacao ate valor final e formato com `suffix`
  - [ ] Testar variantes de cor (`danger`/`success`)
  - [ ] Testar reduced-motion (valor final imediato)
  - [ ] Usar `vi.useFakeTimers` quando necessario para testes deterministicos de tempo
- [ ] Executar gates obrigatorios antes de mover para `review`
  - [ ] `npm run test -- --run`
  - [ ] `npm run build`

## Dev Notes

### Developer Context Section

- Esta e a primeira story do Epic 3 e estabelece o bloco base de metricas (FR25) para os topicos 1-5.
- O app hoje ainda usa placeholders (`Topic1..Topic16` via `PlaceholderTopic`) e ja possui orquestracao de entrada por topico (`TopicReveal`) + transicao global (`TopicTransition`).
- O counter deve ser desenhado para ser plugavel nesses topicos sem exigir mudancas no `PresentationContext`.
- Risco principal: implementar contador com timers imperativos e criar jank ou flakiness de teste.

### Technical Requirements

- Interpolacao numerica:
  - usar `motionValue` + `animate` (ou padrao equivalente oficial do Motion) para ir de `0` ao `value`
  - permitir casas decimais quando `value` nao for inteiro (nao truncar indevidamente)
- Reveal visual:
  - somente `opacity` e `transform` (ex.: leve `translateY`/`scale`), sem `width`/`height`/`top`/`left`
  - delay base de `0.4s` apos montagem do componente
- Estilo:
  - `variant="danger"` -> `--color-accent-danger`
  - `variant="success"` -> `--color-accent-primary`
  - tipografia mono para numero, com legibilidade para projetor (`text-8xl`+ quando usado como hero metric)
- Reduced motion:
  - sem interpolacao temporal do numero
  - sem deslocamento de eixo
  - valor final visivel imediatamente
- Nao introduzir novas dependencias.

### Architecture Compliance

- Nao alterar `PresentationContext`, reducer ou contratos de navegacao.
- Nao acoplar `AnimatedCounter` com `docs/` nem com hash/navigation hooks.
- Manter separacao:
  - UI reutilizavel em `src/components/ui/`
  - conteudo textual e metricas por topico em `src/data/` (stories subsequentes)
- Preservar guardrails da arquitetura:
  - sem router
  - sem side effects globais no counter
  - sem variaveis de animacao definidas dentro do render quando evitavel

### Library / Framework Requirements

- **React 19.x (projeto atual)**
  - manter componente funcional puro e tipado
  - evitar efeitos desnecessarios; cleanup obrigatorio para animacoes interrompidas
- **Framer Motion 12.x (projeto atual)**
  - preferir APIs declarativas para interpolacao e reduced-motion
  - `useReducedMotion` como caminho oficial de acessibilidade
- **Tailwind CSS 4.x**
  - usar tokens em `src/styles/theme.css`
  - evitar hardcode de cor fora de tokens salvo quando explicitamente exigido por AC (mapeando para token equivalente)
- **Contexto de versao mais recente (pesquisa em 2026-03-06)**
  - npm registry retornou: React `19.2.4`, Framer Motion `12.35.0`, Tailwind `4.2.1`, Vite `7.3.1`, Vitest `4.0.18`, `@vitejs/plugin-react` `5.1.4`
  - o repositorio esta em Vite 6 / Vitest 3 / plugin-react 4; esta story NAO deve incluir upgrade de major (fora de escopo)

### File Structure Requirements

- Criar:
  - `src/components/ui/AnimatedCounter.tsx`
  - `src/__tests__/animatedCounter.test.tsx` (ou `src/components/ui/AnimatedCounter.test.tsx`, manter um padrao consistente)
- Atualizar (apenas se necessario para integracao/smoke):
  - `src/components/topics/Topic1.tsx` (opcional de baixo impacto; evitar antecipar escopo da story 3.3)
- Nao alterar:
  - `src/contexts/PresentationContext.tsx`
  - `src/hooks/useKeyboardNavigation.ts`
  - `src/hooks/useHashSync.ts`
  - infraestrutura de transicao global ja estabilizada no Epic 2

### Testing Requirements

- Cobertura minima esperada:
  - animacao inicia apos delay `0.4s`
  - valor evolui ate o alvo e estabiliza no fim
  - variantes visuais corretas (`danger`/`success`)
  - reduced-motion mostra valor final sem animacao
- Evitar testes fragilizados por tempo real; usar fake timers quando necessario.
- Garantir que suite global permanece limpa (sem ruido de console/canvas).
- Gates finais:
  - `npm run test -- --run`
  - `npm run build`

### Latest Tech Information (2026-03-06)

- Motion documenta `useReducedMotion` para adaptar animacoes potencialmente desconfortaveis, substituindo deslocamento espacial por `opacity` quando apropriado.
- Motion tambem documenta `MotionConfig reducedMotion="user"` para politica global; nesta story, o requisito minimo e garantir compliance local no `AnimatedCounter`.
- React mantem `lazy`/`Suspense` e `useDeferredValue` como mecanismos centrais para evitar fallback visual brusco em carregamento sob demanda; o counter deve permanecer independente dessa camada.
- Vitest recomenda fake timers (`vi.useFakeTimers`) para testes de delays/time-based behavior, reduzindo flakiness.
- Tailwind continua oferecendo utilitarios de transicao e variantes `motion-reduce:*`; o motion principal do counter segue no Framer Motion.

### Project Context Reference

- `_bmad-output/planning-artifacts/epics.md` (Epic 3 / Story 3.1)
- `_bmad-output/planning-artifacts/architecture.md` (guardrails de performance, estrutura e boundaries)
- `_bmad-output/planning-artifacts/design-system.md` (comportamento e contrato do AnimatedCounter)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (event-driven animations e legibilidade)
- `_bmad-output/project-context.md` (regras criticas de TS/React/Motion/Tailwind)
- `_bmad-output/implementation-artifacts/2-4-animacoes-de-entrada-por-topico.md` (estado atual da coreografia de entrada)
- `src/components/topics/TopicReveal.tsx` (padrao atual de reveal por topico)
- `src/components/layout/TopicTransition.tsx` (duracao de transicao global)
- `src/components/layout/TopicViewport.tsx` (deferred rendering atual)

### Story Completion Status

- Story context criada para prevenir erros comuns:
  - contador com `setInterval` e drift de valor
  - violacao de reduced-motion
  - uso de propriedades de layout em animacao
  - acoplamento desnecessario com estado global de navegacao
  - upgrade de stack fora de escopo (Vite/Vitest/plugin-react)
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.1: Componente AnimatedCounter]
- [Source: _bmad-output/planning-artifacts/design-system.md#4.1 `<AnimatedCounter />`]
- [Source: _bmad-output/planning-artifacts/design-system.md#5. Efeitos e Animacoes]
- [Source: _bmad-output/planning-artifacts/architecture.md#Quality, Testing & Performance Guardrails]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#UX Consistency Patterns]
- [Source: _bmad-output/project-context.md#Framer Motion Rules]
- [Source: https://motion.dev/docs/react-use-reduced-motion]
- [Source: https://motion.dev/docs/react-accessibility]
- [Source: https://motion.dev/motion/motion-config/]
- [Source: https://react.dev/reference/react/lazy]
- [Source: https://react.dev/reference/react/Suspense]
- [Source: https://main.vitest.dev/guide/mocking/timers]
- [Source: https://tailwindcss.com/docs/transition-property]
- [Source: https://vite.dev/guide/features.html]
- [Source: npm registry snapshot via commands executed on 2026-03-06:
  `npm view react version --cache .npm-cache` -> `19.2.4`;
  `npm view framer-motion version --cache .npm-cache` -> `12.35.0`;
  `npm view tailwindcss version --cache .npm-cache` -> `4.2.1`;
  `npm view vite version --cache .npm-cache` -> `7.3.1`;
  `npm view vitest version --cache .npm-cache` -> `4.0.18`;
  `npm view @vitejs/plugin-react version --cache .npm-cache` -> `5.1.4`]

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/create-story/instructions.xml`

### Completion Notes List

- Story 3.1 criada em `_bmad-output/implementation-artifacts/3-1-componente-animatedcounter.md`.
- Contexto tecnico consolidado para implementacao segura do `AnimatedCounter`.
- Guardrails de performance, acessibilidade e testes definidos para evitar regressao no shell atual.

### File List

- `_bmad-output/implementation-artifacts/3-1-componente-animatedcounter.md` (created)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)
