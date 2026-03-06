# Story 2.2: matrix-background-canvas-com-raf

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como audiencia,
eu quero ver um efeito visual sutil de chuva Matrix no background implementado com canvas e `requestAnimationFrame`,
para que a apresentacao mantenha a estetica tech de forma consistente sem comprometer legibilidade, navegacao ou fluidez do shell.

## Acceptance Criteria

1. Dado o app renderizado, quando qualquer topico esta ativo, entao `MatrixBackground.tsx` exibe caracteres verdes fluindo no background via `requestAnimationFrame`.
2. Dado o background Matrix em execucao, quando o conteudo do topico esta visivel, entao o efeito permanece sutil e o texto continua totalmente legivel sem sobreposicao prejudicial.
3. Dado o background em execucao durante sessao completa (1->16), quando a performance e observada, entao nao ha degradacao perceptivel de FPS nas transicoes nem no shell.
4. Dado o componente `MatrixBackground`, quando desmontado, entao o loop RAF e cancelado e listeners/recursos associados sao limpos sem memory leak.
5. Dado o guardrail de performance, quando o background esta ativo, entao a implementacao segue as regras aprovadas: frame skip (~30fps), maximo ~40 streams, font-size minimo 18px, cache de cor/token e sem animacao baseada em `width`, `height`, `top` ou `left`.
6. Dado os gates obrigatorios do Epic 2, quando a story for concluida, entao teclado, overview e hash sync continuam funcionais e os comandos `npm run test -- --run` e `npm run build` passam.
7. Dado a validacao visual manual em viewport de projetor (ex.: 1024x768), quando o background estiver ativo, entao contraste e legibilidade do conteudo permanecem adequados no fluxo do apresentador.

## Tasks / Subtasks

- [x] Implementar `MatrixBackground.tsx` com ciclo de vida de canvas + RAF (AC: 1, 3, 4, 5)
  - [x] Criar canvas fullscreen em camada de background, com `pointer-events: none` e isolamento do conteudo principal
  - [x] Implementar loop com `requestAnimationFrame`, frame skip (~30fps), limite de streams e draw de caracteres Matrix
  - [x] Escalar canvas com `window.devicePixelRatio` para manter nitidez sem artefatos visuais
  - [x] Cancelar RAF e limpar listeners no unmount
- [x] Integrar background no shell sem quebrar contratos do Epic 1 (AC: 1, 2, 3, 6)
  - [x] Adicionar `MatrixBackground` em `PresentationLayout` como camada global do app
  - [x] Garantir hierarquia de camadas: background atras, conteudo e overview na frente
  - [x] Preservar navegacao keyboard-first, overview e hash sync sem alteracoes de comportamento
- [x] Aplicar guardrails de performance e sutileza visual (AC: 2, 3, 5, 7)
  - [x] Cachear tokens de cor/opacidade para evitar custo desnecessario por frame
  - [x] Ajustar densidade/velocidade/opacidade para nao competir com o texto
  - [x] Incluir fallback para `prefers-reduced-motion` reduzindo intensidade do efeito
- [x] Cobrir comportamento essencial com testes e gates de regressao (AC: 4, 6)
  - [x] Criar teste(s) para registro/cleanup de RAF no `MatrixBackground`
  - [x] Validar que o shell renderiza com background sem quebrar testes existentes de layout
  - [x] Executar `npm run test -- --run`
  - [x] Executar `npm run build`
- [x] Registrar validacao manual para ambiente de apresentacao (AC: 7)
  - [x] Verificar legibilidade/contraste com matrix ativo em viewport tipo projetor
  - [x] Registrar observacoes nas completion notes da story

## Dev Notes

### Developer Context Section

- Esta story inaugura a camada de animacao global do Epic 2 e precisa preservar integralmente os contratos funcionais ja estabilizados no Epic 1 (teclado, overview, hash sync, lazy topics + shell eager).
- O risco principal nao e funcionalidade ausente; e regressao silenciosa de fluidez e legibilidade por excesso de densidade visual no background.
- O design system ja define parametros concretos de performance para o efeito Matrix. O dev nao deve improvisar valores fora desses limites sem justificativa tecnica.
- `MatrixBackground` e um componente de layout global. Ele nao deve acoplar logica de topico, dados narrativos ou estado de navegacao.

### Technical Requirements

- Implementar `src/components/layout/MatrixBackground.tsx` com canvas e `requestAnimationFrame`.
- Nao usar state React por frame; usar `useRef` para estado mutavel de animacao e evitar re-renders no loop.
- Requisitos de performance aprovados:
  - frame skip para ~30fps
  - maximo ~40 streams simultaneos
  - font-size >= 18px para reduzir colunas
  - cache de cor/opacidade (nao consultar estilo a cada frame)
  - cleanup completo no unmount (`cancelAnimationFrame`)
- Background deve permanecer sutil:
  - opacidade controlada (design system sugere 0.5 para canvas)
  - sem sobrepor visualmente o texto do topico
  - sem bloquear interacoes (`pointer-events: none`)
- Implementacao deve considerar `window.devicePixelRatio` para nitidez do canvas em telas/projetores.
- `prefers-reduced-motion`: reduzir intensidade/frequencia do efeito (ou desativar draw dinamico) para respeitar acessibilidade e gates do Epic 2.

### Architecture Compliance

- Manter separacao arquitetural atual:
  - layout global em `src/components/layout/`
  - estado em `PresentationContext`
  - side effects de navegacao em hooks dedicados
- Nao introduzir router, nao mover estado de navegacao, nao alterar contratos do reducer.
- Shell continua eager; topicos continuam lazy-loaded via `React.lazy` + `Suspense`.
- `Overview` deve permanecer no topo visual em relacao ao background.

### Library / Framework Requirements

- React 19.x:
  - efeitos de setup/cleanup no `useEffect`
  - cleanup obrigatorio para RAF/listeners
- Tailwind CSS 4.x:
  - usar tokens semanticos do tema (`--color-accent-primary`, etc.)
  - evitar CSS ad-hoc fora do necessario para o canvas
- Framer Motion 12.x:
  - nenhuma migracao de motion e necessaria nesta story
  - garantir que o background nao interfira nas transicoes que serao introduzidas na 2-3
- Browser target:
  - foco em Chrome (ultima versao), conforme NFR do projeto

### File Structure Requirements

- Criar:
  - `src/components/layout/MatrixBackground.tsx`
- Atualizar:
  - `src/components/layout/PresentationLayout.tsx`
- Criar/atualizar testes conforme implementacao:
  - `src/__tests__/matrixBackground.test.tsx` (novo, recomendado)
  - `src/__tests__/presentationLayout.test.tsx` (ajuste se necessario)
- Nao criar barrels (`index.ts`) nem novos providers globais.

### Testing Requirements

- Gates obrigatorios por story (kickoff Epic 2):
  - regressao de teclado mantida
  - regressao de overview mantida
  - regressao de hash sync mantida
  - `npm run test -- --run` verde
  - `npm run build` verde
- Cobertura minima desta story:
  - `requestAnimationFrame` e registrado na montagem
  - `cancelAnimationFrame` e chamado no unmount
  - componente nao quebra o shell/layout existente
- Validacao manual obrigatoria:
  - legibilidade em viewport tipo projetor com background ativo
  - sutileza visual confirmada (efeito nao compete com conteudo)

### Previous Story Intelligence

- A story 2.1 consolidou tokens semanticos e removeu dependencias do tema antigo `matrix-*`.
- O shell foi explicitamente protegido para manter `text-text-primary` como base semantica; nao reintroduzir cor accent como texto default do app.
- Baseline QA do Epic 2 foi estabelecida com testes/build verdes e deve ser usada como referencia de nao-regressao.

### Git Intelligence Summary

- Commits recentes mostram padrao de mudancas pequenas e cobertura de testes por comportamento (`hash`, `keyboard`, `overview`, `layout`).
- O estado atual nao possui implementacao de `MatrixBackground`; essa story deve introduzir o componente sem retrabalho de arquitetura.
- Ha historico recente de endurecimento em navegacao; qualquer side effect global novo (RAF/resize/listeners) deve ser estritamente isolado.

### Latest Tech Information (2026-03-06)

- `requestAnimationFrame` e uma chamada de um frame por vez; o callback precisa reagendar o proximo frame explicitamente, e `cancelAnimationFrame` deve ser usado para interromper o loop no cleanup.
- Canvas 2D continua a API apropriada para esse tipo de efeito procedural leve no client-side.
- `window.devicePixelRatio` continua relevante para evitar blur em canvas quando o CSS size difere da resolucao real de desenho.
- `prefers-reduced-motion` deve ser respeitado para reduzir/desativar animacao para usuarios com sensibilidade a movimento.
- `useEffect` com retorno de cleanup em React segue sendo o padrao para registrar e limpar side effects como RAF e listeners.

### Project Context Reference

- `_bmad-output/planning-artifacts/epics.md` (Epic 2 / Story 2.2)
- `_bmad-output/planning-artifacts/architecture.md` (guardrails de performance e estrutura)
- `_bmad-output/planning-artifacts/design-system.md` (parametros especificos do Matrix background)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (legibilidade e presenter flow)
- `_bmad-output/project-context.md` (regras criticas de stack e implementacao)
- `_bmad-output/implementation-artifacts/epic-2-kickoff-checklist.md` (gates obrigatorios)
- `_bmad-output/implementation-artifacts/epic-2-qa-regression-baseline-2026-03-06.md` (baseline operacional)
- `_bmad-output/implementation-artifacts/2-1-tokens-do-tema-matrix-e-tipografia.md` (aprendizados da story anterior)

### Story Completion Status

- Story context criada para prevenir erros comuns:
  - implementar RAF sem cleanup
  - exagerar densidade/opacidade e perder legibilidade
  - introduzir re-render por frame
  - quebrar navegacao/overview/hash por side effects globais
  - ignorar gates obrigatorios de regressao do Epic 2
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.2: Matrix Background (Canvas com RAF)]
- [Source: _bmad-output/planning-artifacts/architecture.md#Quality, Testing & Performance Guardrails]
- [Source: _bmad-output/planning-artifacts/design-system.md#5. Efeitos e Animacoes]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Responsive Design & Accessibility]
- [Source: _bmad-output/project-context.md#Critical Don't-Miss Rules]
- [Source: _bmad-output/implementation-artifacts/epic-2-kickoff-checklist.md]
- [Source: _bmad-output/implementation-artifacts/epic-2-qa-regression-baseline-2026-03-06.md]
- [Source: _bmad-output/implementation-artifacts/2-1-tokens-do-tema-matrix-e-tipografia.md]
- [Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame]
- [Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame]
- [Source: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D]
- [Source: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio]
- [Source: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion]
- [Source: https://react.dev/reference/react/useEffect]

## File List

- `src/components/layout/MatrixBackground.tsx` (new)
- `src/components/layout/PresentationLayout.tsx` (modified — added MatrixBackground import and z-index layering)
- `src/__tests__/matrixBackground.test.tsx` (new — 7 tests covering RAF lifecycle, reduced motion, semantic token usage, canvas attributes, positioning and opacity)
- `_bmad-output/implementation-artifacts/2-2-matrix-background-canvas-com-raf.md` (modified — this story file)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified — status tracking)

## Change Log

- 2026-03-06: Implementacao completa do MatrixBackground com canvas + RAF, integracao no shell, correcoes de review para reduced motion e token semantico, testes e gates de regressao aprovados. Validacao manual registrada em browser com viewport equivalente a projetor.

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/dev-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/dev-story/instructions.xml`
- jsdom nao implementa `HTMLCanvasElement.getContext` — testes mockam o contexto 2D e `window.matchMedia`
- Canvas warnings em stderr nos testes do PresentationLayout/App sao esperados (early return no componente quando ctx e null)

### Completion Notes List

- Story criada com contexto tecnico completo, guardrails de performance e gates de regressao do Epic 2.
- Implementado `MatrixBackground.tsx` com canvas fullscreen, RAF loop com frame skip (~30fps), max 40 streams, font-size 18px, cache de cor, devicePixelRatio scaling
- Cor dos caracteres resolvida a partir do token semantico `--color-accent-primary` no mount, com fallback seguro, sem leitura por frame
- `prefers-reduced-motion` respeitado: loop RAF nao inicia quando ativo e e interrompido ao alternar a preferencia
- Cleanup completo no unmount: cancelAnimationFrame + removeEventListener (resize e matchMedia)
- Canvas posicionado com `fixed inset-0`, `pointer-events: none`, `aria-hidden="true"`, `z-index: 0`
- Conteudo e footer elevados com `relative z-10` para hierarquia de camadas correta
- 7 testes unitarios cobrindo: RAF registration, reduced motion, RAF cleanup on unmount, canvas attributes, positioning, opacity e uso do token semantico
- 69/69 testes passando (zero regressoes em keyboard, overview, hash sync, layout, lazy load)
- Build de producao verde
- Validacao manual concluida em browser pelo usuario em 2026-03-06 com viewport equivalente a projetor; sem acesso a projetor fisico nesta etapa, mas contraste e legibilidade aprovados no fluxo do apresentador

### File List

- `src/components/layout/MatrixBackground.tsx` (new)
- `src/components/layout/PresentationLayout.tsx` (modified)
- `src/__tests__/matrixBackground.test.tsx` (new)
- `_bmad-output/implementation-artifacts/2-2-matrix-background-canvas-com-raf.md` (modified)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified)
