# Story 6.1: Redesign do Menu/Overview

Status: done

## Story

As a apresentador,
I want que o overview funcione como um command center coerente com a identidade visual da apresentacao,
so that o salto entre topicos seja funcional, legivel em projetor e visualmente memoravel.

## Acceptance Criteria

1. **Given** o overview aberto **When** renderizado **Then** exibe agrupamento por blocos narrativos, destaque claro do topico ativo e secao distinta para o bonus operacional.
2. **Given** o overview em uso **When** o apresentador opera via teclado **Then** foco inicial, trap de Tab, Escape para fechar e selecao continuam funcionando sem regressao.
3. **Given** a apresentacao em projetor **When** o overview e exibido **Then** a hierarquia visual permanece legivel e sem overflow horizontal em 1280x720.

## Implementacao

- `src/components/layout/Overview.tsx` redesenhado como command center com:
  - cabecalho operacional
  - macrofluxo por blocos
  - cards por topico agrupados
  - destaque visual para o Tópico 17 bonus
- Mantidos os contratos de acessibilidade e keyboard-first existentes.

## Validacao

- `src/__tests__/overview.test.tsx`
- `npm test`
- `npm run build`
