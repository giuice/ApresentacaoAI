# Story 1.1: inicializacao-e-configuracao-do-projeto

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a desenvolvedor/agente,  
I want ter o projeto React + TypeScript inicializado com dependencias e configuracoes corretas,  
so that os proximos agentes implementem as stories em ambiente consistente, com baixo risco de retrabalho.

## Acceptance Criteria

1. Dado que o repositorio existe, quando `npm run dev` for executado, entao o Vite inicia sem erros e o app abre em `http://localhost:5173`, sem erro de console na inicializacao.
2. Dado o projeto inicializado, quando o TypeScript for compilado, entao `tsconfig.json` esta com `strict: true` e sem erros de tipos.
3. Dado o projeto inicializado, quando `npm run build` for executado, entao o bundle estatico e gerado em `dist/` sem erros.
4. Dada a estrutura de pastas, quando inspecionada, entao contem `src/components/topics/`, `src/components/ui/`, `src/components/layout/`, `src/contexts/`, `src/data/`, `src/hooks/`, `src/styles/` e sem barrel exports `index.ts`.
5. Dado Tailwind CSS 4 configurado, quando classes forem aplicadas, entao tokens Matrix estao disponiveis via `@theme` em `src/styles/theme.css`.
6. Dado Vitest configurado, quando `npm run test` for executado, entao o runner inicia sem erro.

## Tasks / Subtasks

- [x] Inicializar app base React + TypeScript com Vite no root do repositorio (AC: 1, 3)
- [x] Configurar scripts em `package.json`: `dev`, `build`, `preview`, `test` (AC: 1, 3, 6)
- [x] Configurar TypeScript strict e alias `@/ -> src/` em `tsconfig.json` e `vite.config.ts` (AC: 2)
- [x] Criar estrutura obrigatoria de pastas em `src/` e garantir ausencia de `index.ts` barrel (AC: 4)
- [x] Configurar Tailwind CSS 4 com tokens via `@theme` em `src/styles/theme.css` e importar estilo global no bootstrap (AC: 5)
- [x] Configurar Vitest + Testing Library para inicializar sem erro (AC: 6)
- [x] Executar verificacao local final: `npm run dev`, `npm run build`, `npm run test` (AC: 1, 3, 6)

## Dev Notes

### Developer Context Section

- Esta story e o bootstrap do **Epic 1 (App Shell & Sistema de Navegacao)** e desbloqueia todas as stories seguintes.
- O resultado esperado nao e visual final da apresentacao; e a base tecnica estavel para os proximos componentes (contexto, layout, topicos e animacoes).
- O projeto e **SPA estatica sem backend**. Nao introduzir API server, auth, banco, nem roteador completo.

### Technical Requirements

- Runtime alvo: **Node.js 22 LTS**.
- Linguagem: **TypeScript strict** (sem `any`, sem `@ts-ignore`, sem `enum`).
- Framework: **React 19.x**.
- Build/dev: **Vite**.
- Estilos: **Tailwind CSS 4** com `@theme` em CSS.
- Animacoes (futuras stories): **Framer Motion**.
- Testes: **Vitest + @testing-library/react**.
- App deve manter arquitetura `src/components/{topics,ui,layout}`, `src/contexts`, `src/data`, `src/hooks`, `src/styles`.

### Architecture Compliance

- Nao usar React Router nesta story (navegacao sera por estado interno em stories futuras).
- Nao misturar conteudo de topico em componentes UI genericos.
- Um componente por arquivo, importacao direta, sem barrel exports.
- Preparar base para lazy-load de `Topic1..Topic16` em stories futuras, mas sem implementar as 16 telas agora.

### Library / Framework Requirements

- Seguir decisoes aprovadas de arquitetura:
  - `react`/`react-dom`: linha 19.x
  - `typescript`: linha 5.x
  - `tailwindcss`: linha 4.x
  - `framer-motion`: linha 12.x
  - `vitest` + `@testing-library/react`
- Guardrail de versao para evitar incompatibilidade silenciosa:
  - A arquitetura registrada foi definida com **Vite 6.x**.
  - Latest do ecossistema em 2026-03-05 e **Vite 7.3.1**; se o scaffold subir para 7.x, nao fazer downgrade/upgrade de major sem decisao explicita de arquitetura no mesmo ciclo.
  - Se permanecer em Vite 6.x, manter consistencia com os artefatos atuais.

### File Structure Requirements

- Estrutura minima obrigatoria:
  - `src/components/topics/`
  - `src/components/ui/`
  - `src/components/layout/`
  - `src/contexts/`
  - `src/data/`
  - `src/hooks/`
  - `src/styles/`
- Arquivos base esperados:
  - `src/main.tsx`
  - `src/App.tsx`
  - `src/styles/theme.css`
  - `src/styles/globals.css`
  - `vite.config.ts`
  - `tsconfig.json`
  - `vitest.config.ts` (ou equivalente funcional)

### Testing Requirements

- `npm run test` deve iniciar runner sem erro.
- Validar no minimo:
  - smoke de render inicial do app
  - ambiente de testes configurado com jsdom
- Nao testar estilizacao nesta story; foco em sanidade do setup.

### Latest Tech Information (2026-03-05)

- Versoes latest no npm (consulta direta):
  - `react`: 19.2.4
  - `react-dom`: 19.2.4
  - `vite`: 7.3.1
  - `vitest`: 4.0.18
  - `typescript`: 5.9.3
  - `tailwindcss`: 4.2.1
  - `framer-motion`: 12.35.0
  - `@testing-library/react`: 16.3.2
- Sinais de mudanca relevantes:
  - Vite 7 exige Node `20.19+` ou `22.12+` e remove suporte ao Node 18.
  - Vite 7 alterou target default de browser para baseline widelly-available.
  - Tailwind v4 consolidou configuracao CSS-first com `@theme`.
  - TypeScript 5.9 trouxe mudancas que podem introduzir novos erros de tipo em alguns projetos; manter CI/check de tipos no bootstrap.

### Project Context Reference

- Conteudo e regras que governam esta implementacao:
  - `_bmad-output/planning-artifacts/epics.md` (Epic 1 / Story 1.1)
  - `_bmad-output/planning-artifacts/architecture.md`
  - `_bmad-output/planning-artifacts/prd.md`
  - `_bmad-output/planning-artifacts/ux-design-specification.md`
  - `_bmad-output/project-context.md`

### Story Completion Status

- Story context criada com foco em prevenir erros comuns de agente:
  - Reinventar estrutura do projeto
  - Usar versoes/ferramentas fora do plano aprovado
  - Colocar arquivos em pastas erradas
  - Quebrar padroes de TypeScript strict
  - Deixar setup de testes incompleto
- Completion note: **Ultimate context engine analysis completed - comprehensive developer guide created**.

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Epic 1: App Shell & Sistema de Navegacao]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1: Inicializacao e Configuracao do Projeto]
- [Source: _bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/prd.md#Functional Requirements]
- [Source: _bmad-output/planning-artifacts/prd.md#Non-Functional Requirements]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Design System Foundation]
- [Source: _bmad-output/project-context.md#Technology Stack & Versions]
- [Source: npm registry (`npm view`) consultado em 2026-03-05]
- [Source: https://vite.dev/blog/announcing-vite7]
- [Source: https://tailwindcss.com/blog/tailwindcss-v4]
- [Source: https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/]
- [Source: https://vitest.dev/blog/vitest-4]
- [Source: https://github.com/nodejs/release?tab=readme-ov-file#release-schedule]

## Dev Agent Record

### Agent Model Used

Codex (GPT-5)

### Debug Log References

- Workflow: `_bmad/bmm/workflows/4-implementation/create-story/workflow.yaml`
- Instructions: `_bmad/bmm/workflows/4-implementation/create-story/instructions.xml`

### Completion Notes List

- Story 1.1 criada no diretório de implementation artifacts.
- Contexto tecnico consolidado com requisitos, guardrails e referencias.
- Pronta para execucao do fluxo `dev-story`.
- ✅ Inicializado Vite + React + TS no diretório raiz do projeto com Vite v6.
- ✅ Configurado aliases (`@/`), strict mode e separação de scripts `build`, `dev`, `test`, `preview`.
- ✅ Estrutura de pastas `components/(topics|ui|layout)`, `contexts`, `data`, `hooks`, `styles` criadas sem barrels.
- ✅ Tailwind CSS 4 inicializado globalmente com variáveis Matrix-theme (`src/styles/theme.css` + `src/styles/globals.css`).
- ✅ Setup do ambiente testing (`vitest` + `jsdom` + `@testing-library/react`) funcionando 100%.
- ✅ Correção pós-code-review: `tsconfig.json` agora explicita `strict: true` e alias `@/*`.
- ✅ Correção pós-code-review: adicionado `framer-motion` 12.x nas dependências e lockfile atualizado.
- ✅ Correção pós-code-review: script `dev` fixado em `localhost:5173` com `--strictPort`.
- ✅ Correção pós-code-review: Tailwind limitado a fontes de `src/` e `index.html` para evitar classes inválidas no build.
- ✅ Correção pós-code-review: import em `main.tsx` sem extensão, conforme padrão do projeto.

### File List

- `_bmad-output/implementation-artifacts/1-1-inicializacao-e-configuracao-do-projeto.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `src/App.test.tsx`
- `src/test/setup.ts`
- `src/styles/globals.css`
- `src/styles/theme.css`
- `src/vite-env.d.ts`

### Status

- [x] Done

## Senior Developer Review (AI)

### Reviewer

- Codex (GPT-5)
- Date: 2026-03-05

### Findings Resolved

- [CRITICAL] Task marcada como concluída sem evidência no arquivo raiz: `tsconfig.json` atualizado para declarar `strict` e alias `@/*`.
- [HIGH] Requisito de stack de arquitetura atendido com inclusão de `framer-motion` 12.x.
- [MEDIUM] Script `dev` atualizado para iniciar em `localhost:5173` com `--strictPort`.
- [MEDIUM] Escopo do Tailwind restringido com `@source` para evitar captura de conteúdo fora do app e geração de CSS inválido.
- [LOW] Import em `src/main.tsx` ajustado para omitir extensão de arquivo.

### Validation

- `npm run test` executado com sucesso.
- `npm run build` executado com sucesso, sem warning de propriedade CSS inválida gerada por classe acidental.

### Change Log

- 2026-03-05: Revisão de código executada e correções aplicadas em `package.json`, `package-lock.json`, `tsconfig.json`, `src/styles/theme.css` e `src/main.tsx`. Story promovida para `done`.
