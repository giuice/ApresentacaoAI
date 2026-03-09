# Story 6.3: Topico 17 - Copilot Operacional

Status: done

## Story

As a audiencia,
I want consumir um topico bonus sobre comandos, threads, plan e fleet,
so that a apresentacao termine com uma ponte pratica entre conceito e operacao no dia 1.

## Acceptance Criteria

1. **Given** que o apresentador navega ate o Topico 17 **When** o topico entra em foco **Then** `Topic17.tsx` e renderizado com dados vindos de `src/data/topic17Data.ts`.
2. **Given** a pagina de conteudo do Tópico 17 **When** percorrida **Then** cobre comandos, thread graph, plan board, fleet, guardrails e sintese final.
3. **Given** o modo notas **When** ativado **Then** o topico exibe uma pagina dedicada de narracao via `MatrixTerminal`.

## Implementacao

- `src/data/topic17Data.ts` criado com modelo tipado para:
  - tensao de metricas
  - cards de comandos
  - lanes de thread
  - plan board
  - fleet core/satelites
  - guardrails, antipadroes e fechamento
- `src/components/topics/Topic17.tsx` implementado com layout narrativo completo e alternancia `Conteudo`/`Notas`.

## Validacao

- `src/__tests__/topic17.test.tsx`
- `npm test`
- `npm run build`
