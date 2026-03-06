# Story 4.6: Componente DecisionWizard (Wizard Terminal)

Status: ready-for-dev

## Story

As a espectador pos-palestra,
I want responder a perguntas sequenciais e receber uma recomendacao personalizada de ferramenta,
so that eu possa descobrir qual ferramenta (Spec-Kit, GSD ou BMAD) faz sentido para meu contexto sem precisar do apresentador.

## Acceptance Criteria

1. **Given** o componente `DecisionWizard` renderizado **When** o usuario ve a primeira pergunta **Then** as opcoes de resposta (A/B/C) sao exibidas como botoes clicaveis ou focaveis por teclado
2. **Given** o usuario responde uma pergunta **When** a resposta e selecionada **Then** a proxima pergunta aparece com animacao de entrada (fade/slide)
3. **Given** o usuario completa todas as perguntas **When** a ultima resposta e dada **Then** uma recomendacao (Spec-Kit, GSD ou BMAD) e exibida com trade-offs e proximo passo sugerido
4. **Given** o wizard em qualquer etapa **When** o usuario pressiona Enter para confirmar ou Esc para reiniciar **Then** a navegacao interna funciona sem interferir com a navegacao global da apresentacao
5. **Given** o estado interno do wizard **When** o topico e desmontado e remontado **Then** o wizard reinicia do inicio (sem persistencia de estado)
6. **Given** o DecisionWizard **When** utilizado **Then** aceita dados genericos via props (questions, recommendations) — componente reutilizavel

## Tasks / Subtasks

- [ ] Task 1: Implementar componente `DecisionWizard` (AC: #1-#6)
  - [ ] 1.1 Definir interfaces: `WizardOption` (label, value), `WizardQuestion` (id, text, options: WizardOption[]), `WizardRecommendation` (tool, tradeoff, nextStep), `WizardConfig` (questions, getRecommendation: (answers) => WizardRecommendation)
  - [ ] 1.2 Implementar state machine: currentStep (0..N), answers (Record<string, string>), phase ('questions' | 'result')
  - [ ] 1.3 Implementar UI de pergunta: texto da pergunta em font-mono accent-primary, opcoes como botoes com borda neon, hover com glow. Barra de progresso (step/total) no topo
  - [ ] 1.4 Implementar transicao entre perguntas: fade+translateY com Framer Motion
  - [ ] 1.5 Implementar tela de resultado: card com recomendacao (nome da ferramenta em destaque accent-primary, trade-off em text-secondary, proximo passo em accent-warning). Botao "Reiniciar" para voltar ao inicio
  - [ ] 1.6 Implementar keyboard navigation: Enter confirma opcao selecionada, Esc reinicia wizard. Usar stopPropagation para nao interferir com navegacao global
  - [ ] 1.7 Reset state on unmount (cleanup no useEffect ou state reset)
  - [ ] 1.8 Visual estilo terminal: fundo bg-bg-card, borda accent-primary/20, header com dots (red/yellow/green) estilo terminal window
  - [ ] 1.9 Respeitar prefers-reduced-motion: transitions desabilitadas, mostrar diretamente
- [ ] Task 2: Criar dados do wizard para Topic 10 (AC: #3)
  - [ ] 2.1 Criar src/data/decisionWizardData.ts com 4 perguntas (escopo, validacao cruzada, inimigo, overhead) e logica de mapeamento resposta->recomendacao
  - [ ] 2.2 Exportar como const tipada
- [ ] Task 3: Testes do DecisionWizard (AC: #1-#6)
  - [ ] 3.1 Testar render da primeira pergunta com opcoes
  - [ ] 3.2 Testar que clicar numa opcao avanca para proxima pergunta
  - [ ] 3.3 Testar que completar todas as perguntas mostra recomendacao
  - [ ] 3.4 Testar que recomendacao contem tool, tradeoff, nextStep
  - [ ] 3.5 Testar que Esc reinicia o wizard
  - [ ] 3.6 Testar que state reseta ao desmontar/remontar
  - [ ] 3.7 Testar que componente aceita dados genericos
- [ ] Task 4: Gates
  - [ ] 4.1 `npm test` verde
  - [ ] 4.2 `npm run build` sem erros

## Dev Notes

### Developer Context Section
- DecisionWizard e um COMPONENTE REUTILIZAVEL que sera integrado no Topic 10 (Story 4.7).
- Design system secao 4.6 ja especifica o componente.
- Visual estilo terminal/wizard — diferente de todos os outros componentes existentes.
- Keyboard handling critico: Enter/Esc internos NAO devem propagar para PresentationContext (que usa arrow keys para navegacao).
- Risco: conflito de keyboard events entre wizard e navegacao global. Usar stopPropagation + preventDefault nos handlers internos.

### Technical Requirements
- Componente em src/components/ui/DecisionWizard.tsx
- State machine local com useState (currentStep, answers, phase)
- Framer Motion para transicoes entre perguntas (AnimatePresence + variants)
- Keyboard: onKeyDown com stopPropagation para isolar do PresentationContext
- Terminal chrome: 3 dots + tab label no header (reusar pattern do MatrixTerminal se possivel)
- Progress bar: div com scaleX transition baseado em currentStep/totalSteps

### Architecture Compliance
- Componente generico em src/components/ui/
- Dados em src/data/decisionWizardData.ts (separado)
- NAO interferir com PresentationContext keyboard navigation
- NAO persistir estado entre visitas ao topico

### Library / Framework Requirements
- React 19.x, Framer Motion 12.x, Tailwind 4.x — sem novas deps

### File Structure Requirements
- Criar: src/components/ui/DecisionWizard.tsx, src/data/decisionWizardData.ts, src/__tests__/decisionWizard.test.tsx

### Testing Requirements
- Render perguntas, avancar, resultado, reset, keyboard, generics
- Suite + build verde

### Previous Story Intelligence
- MatrixTerminal ja tem terminal chrome (dots + tab) — reusar CSS pattern
- PresentationContext usa onKeyDown global — wizard DEVE isolar seus handlers

### Project Context Reference
- _bmad-output/planning-artifacts/design-system.md (secao 4.6)
- _bmad-output/planning-artifacts/epics.md (Epic 4 / Story 4.6)
- docs/topicos/topic10.md (wizard questions e logica)

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### File List
