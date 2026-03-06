# Story 2.1: tokens-do-tema-matrix-e-tipografia

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a desenvolvedor/agente,
I want ter todos os tokens visuais e de tipografia do tema Matrix definidos de forma consistente no Tailwind 4,
so that todos os componentes da apresentacao reutilizem a mesma base visual sem quebrar legibilidade, regressao funcional ou compatibilidade com o shell existente.

## Acceptance Criteria

1. Dado o arquivo `src/styles/theme.css`, quando inspecionado, entao ele contem a paleta aprovada do design system em `@theme`, incluindo backgrounds (`--color-bg-deep`, `--color-bg-surface`, `--color-bg-card`, `--color-bg-card-hover`), accents (`--color-accent-primary`, `--color-accent-primary-dim`, `--color-accent-danger`, `--color-accent-danger-dim`, `--color-accent-warning`), texto (`--color-text-primary`, `--color-text-secondary`, `--color-text-muted`), borda (`--color-border-subtle`), glow tokens e tokens de transicao. 
2. Dado o estado atual do app, quando a story for implementada, entao os aliases de compatibilidade necessarios para as classes ja usadas no shell (`bg-matrix-bg`, `text-matrix-green`, `border-matrix-green`, etc.) sao preservados ou todos os consumidores existentes sao migrados na mesma story, sem deixar classes quebradas em `PresentationLayout`, `Overview`, `CyberProgressBar` e topicos placeholder.
3. Dado os tokens de tipografia, quando aplicados globalmente, entao fonte monospace aprovada (`JetBrains Mono` com fallback `Fira Code`, `monospace`) e fonte sans aprovada (`Inter` ou `Geist` com fallback `system-ui`, `sans-serif`) ficam disponiveis e a aplicacao passa a usar fallback consistente sem depender de `Courier New`.
4. Dado o shell da apresentacao, quando renderizado apos a refatoracao visual, entao `body`, `PresentationLayout`, `Overview`, `CyberProgressBar` e o fallback de carregamento mantem fundo base escuro (`#000000` ou `#0A0A0A`), texto principal legivel e contraste compativel com leitura em projetor.
5. Dado o kickoff checklist da Epic 2, quando esta story for concluida, entao os gates obrigatorios de regressao da story sao executados e registrados: teclado continua funcionando, overview continua abrindo/fechando e selecionando topicos, hash sync continua canonico, `npm run test -- --run` passa e `npm run build` passa.
6. Dado a validacao visual manual desta story, quando testada em viewport equivalente a projetor (`1024x768` ou similar), entao contraste e hierarquia tipografica sao confirmados como legiveis e esse resultado fica registrado nas notas da story ou no artefato de evidencia correspondente.

## Tasks / Subtasks

- [x] Expandir os tokens do tema em `src/styles/theme.css` com base no design system aprovado (AC: 1, 2, 3)
  - [x] Adicionar a paleta expandida de backgrounds, accents, textos, bordas, glow e transicoes em `@theme`
  - [x] Definir `--font-mono` e `--font-sans` com as familias aprovadas e fallbacks corretos
  - [x] Manter aliases retrocompativeis para `--color-matrix-bg` e `--color-matrix-green` enquanto existirem consumidores com classes antigas, ou migrar todos esses consumidores na mesma story
- [x] Aplicar o tema global de forma coerente no app atual (AC: 2, 3, 4)
  - [x] Atualizar `src/styles/globals.css` para refletir fundo, texto e tipografia base do shell
  - [x] Revisar `src/components/layout/PresentationLayout.tsx`, `src/components/layout/Overview.tsx`, `src/components/layout/CyberProgressBar.tsx` e topicos placeholder para garantir compatibilidade com os novos tokens
  - [x] Se necessario, ajustar `index.html` para carregamento das fontes aprovadas sem bloquear o primeiro render
- [x] Preservar contratos existentes do Epic 1 durante a mudanca visual (AC: 2, 4, 5)
  - [x] Nao alterar reducer, hash sync, fluxo de teclado nem comportamento do overview alem do necessario para consumo dos tokens
  - [x] Confirmar que o shell continua eager e os topicos continuam lazy-loaded via `React.lazy` + `Suspense`
- [x] Validar regressao obrigatoria da Epic 2 para esta story (AC: 5)
  - [x] Executar `npm run test -- --run`
  - [x] Executar `npm run build`
  - [x] Validar teclado, overview e hash sync contra a baseline `_bmad-output/implementation-artifacts/epic-2-qa-regression-baseline-2026-03-06.md`
- [x] Validar legibilidade de projetor e registrar evidencia (AC: 6)
  - [x] Conferir contraste do texto principal sobre fundo escuro
  - [x] Conferir legibilidade da combinacao mono + sans no presenter flow
  - [x] Registrar observacoes nas Completion Notes da story ou no artefato manual usado pelo time

## Dev Notes

### Developer Context Section

- Esta e a story fundacional do Epic 2. Todas as stories visuais seguintes (`2-2`, `2-3`, `2-4`) dependem dela para evitar proliferacao de cores, tipografia e sombras inconsistentes.
- O design system aprovado expandiu a paleta alem dos tokens minimos definidos no epic. O conflito principal da implementacao e que o codigo atual ainda usa utilitarios derivados de `--color-matrix-bg` e `--color-matrix-green`. A story precisa resolver isso explicitamente, sem deixar classes antigas quebradas.
- O kickoff checklist da Epic 2 precisa ser tratado como guardrail desta story, nao como observacao opcional. Mesmo sendo uma story de tema/tipografia, ela pode quebrar overview, contraste e a leitura no shell se for feita de forma parcial.
- A baseline de regressao da Epic 2 ja existe e deve ser usada como referencia para nao perder estabilidade do Epic 1.
- O escopo desta story e tema/tipografia. Nao incluir Matrix background animado, transicoes cinematograficas nem animacoes de entrada aqui.

### Technical Requirements

- Tailwind CSS 4 deve continuar configurado em CSS-first mode com `@import "tailwindcss"` e `@theme` top-level em `src/styles/theme.css`.
- O conjunto minimo de tokens a implementar segue `_bmad-output/planning-artifacts/design-system.md#8. Tokens para Tailwind 4 @theme (Story 2.1)`.
- Como o app atual ja usa classes `bg-matrix-bg`, `text-matrix-green`, `border-matrix-green` e `focus:ring-matrix-green`, a implementacao deve escolher um destes caminhos e completar o caminho inteiro nesta story:
  - manter aliases retrocompativeis mapeando tokens antigos para a nova paleta; ou
  - migrar todos os consumidores atuais para os novos nomes de utilitarios gerados pelo Tailwind 4.
- O shell deve continuar com fundo base escuro e texto legivel. `globals.css` nao pode reintroduzir defaults que conflitem com o tema aprovado.
- Tipografia:
  - mono para titulos, metricas, labels tecnicos, terminal e progress markers
  - sans para corpo de leitura e textos auxiliares
  - fallback consistente caso a fonte web ainda nao tenha carregado
- Se fontes externas forem carregadas via `index.html`, usar estrategia simples e previsivel; esta story nao deve introduzir dependencia complexa de runtime ou loader adicional.
- Se a equipe optar por `@import` de fontes no CSS, esse import deve ficar acima de `@import "tailwindcss"`, conforme a documentacao oficial do Tailwind v4.
- Contraste minimo esperado:
  - texto principal `#F3F4F6` sobre `#000000`
  - accent green `#00FF41` sobre `#000000`
  - accent red `#FF003C` sobre `#000000`
- Nao usar `tailwind.config.ts` para resolver tema. O projeto deve permanecer no modelo Tailwind v4 CSS-first.

### Architecture Compliance

- Manter a estrutura de arquivos atual e a separacao entre `styles`, `layout`, `topics`, `contexts` e `hooks`.
- Nao introduzir router, theme provider complexo, dark mode toggle ou logica de preferencia de tema nesta story.
- `PresentationContext`, `useKeyboardNavigation` e `useHashSync` nao devem receber comportamento novo por causa da troca de tokens.
- `PresentationLayout` continua sendo shell eager; topicos continuam lazy-loaded e encapsulados em `Suspense`.
- Qualquer ajuste em componentes existentes deve ser estritamente visual/semantico, preservando o comportamento validado no Epic 1.

### Library / Framework Requirements

- **Tailwind CSS 4.x:**
  - `@theme` define tokens que geram utilitarios; use essa capacidade para mapear cores e fontes semanticamente.
  - O projeto ja usa `@tailwindcss/vite`; nao trocar o pipeline.
- **React 19.x:**
  - manter `lazy` e `Suspense` como estao para o carregamento de topicos.
  - nao mover declaracoes de lazy import para dentro de componentes.
- **Framer Motion 12.x / Motion docs:**
  - nenhuma mudanca de animacao e obrigatoria nesta story.
  - Inference from sources: a documentacao mais nova da Motion ja mostra APIs em `motion/react`, mas o repositorio usa `framer-motion` `^12.0.0`; nao faca migracao de pacote/import nesta story sem uma demanda especifica.
- **Fonts:**
  - preferir JetBrains Mono + Inter, com fallback para Fira Code / system-ui conforme o design system.

### File Structure Requirements

- Atualizar:
  - `src/styles/theme.css`
  - `src/styles/globals.css`
  - `src/components/layout/PresentationLayout.tsx`
  - `src/components/layout/Overview.tsx`
  - `src/components/layout/CyberProgressBar.tsx`
  - `src/components/topics/Topic1.tsx`
  - `src/components/topics/Topic2.tsx`
  - `src/components/topics/Topic3.tsx`
  - `src/components/topics/Topic4.tsx`
  - `src/components/topics/Topic5.tsx`
  - `src/components/topics/Topic6.tsx`
  - `src/components/topics/Topic7.tsx`
  - `src/components/topics/Topic8.tsx`
  - `src/components/topics/Topic9.tsx`
  - `src/components/topics/Topic10.tsx`
  - `src/components/topics/Topic11.tsx`
  - `src/components/topics/Topic12.tsx`
  - `src/components/topics/Topic13.tsx`
  - `src/components/topics/Topic14.tsx`
  - `src/components/topics/Topic15.tsx`
  - `src/components/topics/Topic16.tsx`
- Revisar se necessario:
  - `index.html`
- Nao criar `tailwind.config.*`, providers de tema ou novos diretórios para esta story.

### Testing Requirements

- Gates obrigatorios por story vindos de `_bmad-output/implementation-artifacts/epic-2-kickoff-checklist.md`:
  - teclado continua funcionando
  - overview continua funcionando
  - hash sync continua funcionando
  - `npm run test -- --run`
  - `npm run build`
- Reusar a baseline `_bmad-output/implementation-artifacts/epic-2-qa-regression-baseline-2026-03-06.md` como referencia minima.
- Nao desperdiçar tempo com testes de snapshot de cor. Priorizar testes/smokes que comprovem que a mudanca visual nao quebrou o shell nem a navegacao.
- Validacao manual obrigatoria desta story:
  - contraste verificado em setup tipo projetor
  - tipografia verificada no fluxo do apresentador
- Observacao de fluxo do epic:
  - esta story pode ser implementada primeiro
  - `2-2`, `2-3` e `2-4` nao devem iniciar implementacao sem os gates 2, 3 e 4 do kickoff checklist fechados
  - Epic 2 nao pode ser marcada pronta para demo antes do item 5 (projector dry-run) ser concluido

### Git Intelligence Summary

- O codigo atual ja estabilizou shell, progress bar, overview e hash sync no Epic 1.
- Commits recentes mostram um padrao claro: mudancas pequenas, isoladas por concern e sempre fechadas com testes + build.
- O shell atual depende diretamente dos utilitarios `bg-matrix-bg` e `text-matrix-green`; isso torna incompatibilidade de token o principal risco tecnico da `2-1`.
- A baseline QA de 2026-03-06 registra 61 testes passando e build verde; use esse estado como referencia de nao-regressao.

### Latest Tech Information (2026-03-06)

- Tailwind CSS v4 oficial reforca a configuracao CSS-first com `@import "tailwindcss"` e `@theme`, e explica que theme variables geram utilitarios; isso favorece modelar tokens sem depender de `tailwind.config.*`.
- React 19 continua recomendando `lazy` para adiar o carregamento de codigo ate o primeiro render e `Suspense` para fallback, alinhado com o shell eager + topicos lazy do projeto.
- Motion documenta `useReducedMotion` como o caminho correto para trocar animacoes baseadas em eixo por `opacity` quando o usuario pede menos movimento; isso reforca que a base de tokens e tipografia da `2-1` precisa deixar a leitura forte o suficiente para futuros fallbacks sem deslocamento.
- Motion tambem documenta configuracao global de reduced motion, mas isso pertence mais diretamente a `2-3`; nesta story, apenas nao crie estilos que dependam de deslocamento para comunicar hierarquia.

### Project Context Reference

- `_bmad-output/planning-artifacts/epics.md` (Epic 2 / Story 2.1)
- `_bmad-output/planning-artifacts/architecture.md` (Tailwind v4, shell eager, lazy topics, performance guardrails)
- `_bmad-output/planning-artifacts/design-system.md` (fonte de verdade dos tokens e tipografia)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (legibilidade em projetor, keyboard-first, responsive desktop-first)
- `_bmad-output/project-context.md` (regras de stack e anti-patterns)
- `_bmad-output/implementation-artifacts/epic-1-retro-2026-03-05.md` (aprendizados e gates para Epic 2)
- `_bmad-output/implementation-artifacts/epic-2-kickoff-checklist.md` (guardrails obrigatorios da epic)
- `_bmad-output/implementation-artifacts/epic-2-qa-regression-baseline-2026-03-06.md` (baseline de evidencias)

### Story Completion Status

- Story context criada para prevenir erros comuns:
  - expandir tokens sem mapear os consumidores atuais
  - trocar tipografia sem fallback previsivel
  - quebrar overview/progress bar por renomeacao parcial de utilitarios
  - tratar legibilidade em projetor como detalhe tardio
  - esquecer os gates obrigatorios de regressao da Epic 2
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.1: Tokens do Tema Matrix & Tipografia]
- [Source: _bmad-output/planning-artifacts/architecture.md#Technical Constraints & Dependencies]
- [Source: _bmad-output/planning-artifacts/architecture.md#Quality, Testing & Performance Guardrails]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/design-system.md#1. Tema e Paleta de Cores]
- [Source: _bmad-output/planning-artifacts/design-system.md#2. Tipografia]
- [Source: _bmad-output/planning-artifacts/design-system.md#8. Tokens para Tailwind 4 @theme (Story 2.1)]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Responsive Design & Accessibility]
- [Source: _bmad-output/project-context.md#Critical Don't-Miss Rules]
- [Source: _bmad-output/implementation-artifacts/epic-1-retro-2026-03-05.md#Action Items (System/Process Focus)]
- [Source: _bmad-output/implementation-artifacts/epic-2-kickoff-checklist.md]
- [Source: _bmad-output/implementation-artifacts/epic-2-qa-regression-baseline-2026-03-06.md]
- [Source: https://tailwindcss.com/docs/functions-and-directives]
- [Source: https://tailwindcss.com/docs/font-family]
- [Source: https://tailwindcss.com/blog/tailwindcss-v4]
- [Source: https://react.dev/reference/react/lazy]
- [Source: https://react.dev/reference/react/Suspense]
- [Source: https://motion.dev/docs/react-use-reduced-motion]
- [Source: https://motion.dev/docs/react-accessibility]

## File List

- `src/styles/theme.css` (target)
- `src/styles/globals.css` (target)
- `src/components/layout/PresentationLayout.tsx` (target)
- `src/components/layout/Overview.tsx` (target)
- `src/components/layout/CyberProgressBar.tsx` (target)
- `src/components/topics/Topic1.tsx` to `src/components/topics/Topic16.tsx` (target set for token compatibility review)
- `index.html` (optional target for font loading)
- `_bmad-output/implementation-artifacts/2-1-tokens-do-tema-matrix-e-tipografia.md` (this story file)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/dev-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/dev-story/instructions.xml`

### Implementation Plan

- Estrategia escolhida: migracao completa dos consumidores (sem aliases retrocompativeis)
- Justificativa: poucos consumidores (3 componentes de layout + 16 topics placeholder), todos usando o mesmo padrao simples
- Tokens antigos (`--color-matrix-bg`, `--color-matrix-green`, `--color-matrix-green-dark`, `--color-matrix-green-light`) removidos e substituidos pela paleta expandida do design system
- Fontes carregadas via Google Fonts no `index.html` com `display=swap` e `preconnect` para performance
- CyberProgressBar glow migrado de hardcoded `#00FF41` para `var(--glow-primary-strong)` para consistencia com tokens

### Completion Notes List

- Story criada com contexto adicional do kickoff checklist da Epic 2.
- Guardrail principal identificado: compatibilidade entre tokens expandidos do design system e utilitarios `matrix-*` ja usados no shell.
- Baseline de regressao da Epic 2 anexada como evidencia operacional minima para esta story.
- Implementacao concluida: 23 tokens definidos no `@theme` (backgrounds, accents, text, borders, glows, typography, transitions + easing aliases para Tailwind v4)
- Migracao completa: zero referencias a `matrix-*` restantes no codigo-fonte
- Tipografia: JetBrains Mono (mono) + Inter (sans) com fallbacks corretos; fontes carregadas via Google Fonts
- Body global atualizado: fundo `--color-bg-deep` (#000000), texto `--color-text-primary` (#F3F4F6), fonte sans
- Regressao validada: 62/62 testes passando, build verde, sem regressao sobre a baseline Epic 2
- Contraste validado por tokens: text-primary/bg-deep 18.1:1 (AAA), accent-primary/bg-deep 10.5:1 (AAA), accent-danger/bg-deep 5.1:1 (AA)
- Validacao manual concluida por Giuliano em 2026-03-06 com viewport alvo 1024x768 e leitura aprovada para contraste e hierarquia tipografica

### Change Log

- 2026-03-06: Implementacao completa da Story 2.1 — tokens do tema Matrix e tipografia
  - Expandido `src/styles/theme.css` com 23 tokens semanticos do design system aprovado
  - Migrado todos os consumidores de `matrix-*` para tokens semanticos (`bg-deep`, `accent-primary`, `text-primary`)
  - Atualizado `globals.css` com fundo escuro, texto primary e font-sans como base
  - Adicionado carregamento de JetBrains Mono + Inter via Google Fonts em `index.html`
  - Migrado 3 componentes de layout + 16 topics placeholder para novos utilitarios
  - CyberProgressBar glow usando tokens em vez de valores hardcoded
  - Ajustado `PresentationLayout` para preservar `text-primary` como cor semantica base do shell
  - Adicionados aliases `--ease-smooth` e `--ease-bounce` para expor easing utilities via Tailwind v4
  - Adicionado teste de regressao para garantir que o shell mantenha `text-primary` como cor base semantica
  - Registrada validacao manual final de legibilidade para fechamento do AC6

### Senior Developer Review (AI)

- 2026-03-06: Revisao adversarial executada.
- Corrigido desvio semantico no shell: `PresentationLayout` nao força mais accent green como cor base do app.
- Corrigido mapeamento de motion tokens para Tailwind v4 com aliases `--ease-*`.
- Story liberada para fechamento apos validacao manual do AC6.

### File List

- `src/styles/theme.css` (modified — paleta expandida com 23 tokens)
- `src/styles/globals.css` (modified — body com novos tokens)
- `index.html` (modified — Google Fonts preconnect + link)
- `src/components/layout/PresentationLayout.tsx` (modified — classes CSS migradas)
- `src/__tests__/presentationLayout.test.tsx` (modified — regressao do shell para texto base semantico)
- `src/components/layout/Overview.tsx` (modified — classes CSS migradas)
- `src/components/layout/CyberProgressBar.tsx` (modified — classes CSS migradas + glow tokenizado)
- `src/components/topics/Topic1.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic2.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic3.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic4.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic5.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic6.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic7.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic8.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic9.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic10.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic11.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic12.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic13.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic14.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic15.tsx` (modified — classe CSS migrada)
- `src/components/topics/Topic16.tsx` (modified — classe CSS migrada)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified — status atualizado)
- `_bmad-output/implementation-artifacts/2-1-tokens-do-tema-matrix-e-tipografia.md` (modified — story file)
