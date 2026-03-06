# Story 2.2b — Matrix Background: Visibilidade garantida (Reduced Motion)

## Contexto
O `MatrixBackground` é parte central da identidade visual (tema Matrix/tech). Ao respeitar `prefers-reduced-motion`, o componente estava interrompendo o loop de animação e desenhando apenas uma base escura, o que pode ser percebido como “o background não aparece” — especialmente em telas com conteúdo dominante no primeiro plano.

Esta story garante **presença visual** do background mesmo em modo reduzido, sem violar acessibilidade (sem animação contínua) e sem regressões de performance.

## Problema
- Com `prefers-reduced-motion: reduce`, o background ficava essencialmente “invisível” (sem glyphs / sem chuva digital), dando a impressão de falha.

## Objetivo
- Manter o background **visível e consistente** com a identidade Matrix quando o usuário opta por reduzir movimento.
- Evitar `requestAnimationFrame` em reduced-motion.

## Mudanças implementadas
- Arquivo: `src/components/layout/MatrixBackground.tsx`
  - Adicionado fallback de renderização **estática** quando reduced-motion está ativo.
  - Em reduced-motion:
    - Não inicia loop via `requestAnimationFrame`.
    - Desenha um frame estático de glyphs (baixa densidade) sobre a base.
  - Ao alternar a preferência (reduce ↔ no-preference):
    - O componente alterna corretamente entre modo estático e animado.
    - Mantém o cleanup para evitar vazamento de RAF.

## Critérios de Aceite
1. Com reduced-motion ativado, o background mantém identidade visual (glyphs visíveis) sem animar.
2. Em reduced-motion, **não** existe loop contínuo via `requestAnimationFrame`.
3. Alternar reduced-motion em runtime alterna os modos sem glitches e sem vazamentos.

## Testes
- Arquivo: `src/__tests__/matrixBackground.test.tsx`
  - Atualizado para:
    - Continuar garantindo que **não** inicia RAF em reduced-motion.
    - Validar que existe desenho estático (ex.: `fillText` é chamado).

## Observações
- Esta story corrige um problema que pode ser intermitente/ambiente-dependente: alguns sistemas/browsers ativam reduced-motion por padrão (ou via configuração de acessibilidade), o que amplifica a percepção de “sumiu”.
