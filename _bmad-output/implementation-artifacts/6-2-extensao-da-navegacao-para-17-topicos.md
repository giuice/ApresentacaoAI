# Story 6.2: Extensao da Navegacao para 17 Topicos

Status: done

## Story

As a sistema,
I want suportar 17 topicos em registry, hash, overview e lazy-load,
so that o bonus faca parte da jornada sem hacks locais.

## Acceptance Criteria

1. **Given** navegacao por teclado, hash ou overview **When** o indice alvo estiver entre 1 e 17 **Then** estado, deep link e renderizacao permanecem sincronizados.
2. **Given** o progresso narrativo **When** os topicos 14-17 estiverem ativos **Then** a barra de progresso continua fechando no segmento final sem quebrar o mapa de 5 blocos.
3. **Given** um indice invalido **When** o sistema normaliza a navegacao **Then** o fallback permanece seguro e previsivel.

## Implementacao

- `src/data/topics.ts` atualizado para 17 topicos com metadata por bloco.
- `src/contexts/PresentationContext.tsx` passou a reutilizar `TOTAL_TOPICS` centralizado.
- `src/App.tsx` recebeu lazy-load de `Topic17`.
- `src/components/layout/CyberProgressBar.tsx` passou a considerar 17 topicos no segmento final.

## Validacao

- `src/__tests__/keyboardNavigation.test.tsx`
- `src/__tests__/hashSync.test.tsx`
- `src/__tests__/presentationContext.reducer.test.ts`
- `src/__tests__/cyberProgressBar.test.ts`
- `npm test`
