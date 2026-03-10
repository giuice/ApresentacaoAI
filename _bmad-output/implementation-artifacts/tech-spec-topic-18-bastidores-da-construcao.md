---
title: 'Implementar Tópico 18 — Bastidores da construção da ApresentacaoAI'
slug: 'topic-18-bastidores-da-construcao'
created: '2026-03-10'
status: 'implementation-complete'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['React 19', 'TypeScript 5 strict', 'Vite 6', 'Tailwind CSS 4', 'Framer Motion 12', 'Vitest', '@testing-library/react']
files_to_modify: ['src/App.tsx', 'src/data/topics.ts', 'src/data/topic18Data.ts', 'src/components/topics/Topic18.tsx', 'src/__tests__/topic18.test.tsx', 'src/components/layout/Overview.tsx', 'src/components/layout/CyberProgressBar.tsx', 'src/__tests__/overview.test.tsx', 'src/__tests__/cyberProgressBar.test.ts', 'src/__tests__/hashSync.dispatch.test.tsx']
code_patterns: ['topic data file + topic component + dedicated test file', 'topics metadata drives overview and TOTAL_TOPICS', 'bonus topics are separated via isBonus in overview', 'progress bar maps topic ranges into 5 macro-segments', 'dense editorial topics use TopicReveal with content/notes toggle and MatrixTerminal']
test_patterns: ['data integrity assertions', 'render assertions driven by exported topic data', 'interaction tests with NarratorToggle and keyboard events', 'navigation/overview integration tests', 'range mapping tests for CyberProgressBar']
---

# Tech-Spec: Implementar Tópico 18 — Bastidores da construção da ApresentacaoAI

**Created:** 2026-03-10

## Overview

### Problem Statement

A apresentação defende Engenharia de Contexto como método, mas ainda não possui um tópico implementado no app que demonstre, com evidências verificáveis, como a própria aplicação foi construída com workflow, multiagente, validação e governança de contexto. Hoje o fluxo navegável para em `Topic17`, enquanto o conteúdo consolidado do Tópico 18 já existe em `docs/topicos/topic18-bastidores-da-construcao.md`.

### Solution

Adicionar o `Topic18` como tópico oficial navegável da apresentação, seguindo o padrão arquitetural existente (`data + component + tests + registro no catálogo`), mas com uma experiência visual editorial e interativa leve que preserve quase todo o conteúdo válido do markdown-fonte. O MVP deve priorizar timeline verificável, evidências operacionais, prompts literais e leitura clara, sem depender de interações complexas para transmitir a narrativa.

### Scope

**In Scope:**
- adicionar o Tópico 18 como item oficial na sequência navegável da apresentação
- criar `src/data/topic18Data.ts` com estrutura tipada derivada do markdown consolidado
- criar `src/components/topics/Topic18.tsx` com experiência visual de leitura rica e interatividade leve
- atualizar `src/App.tsx` para lazy load do `Topic18`
- atualizar `src/data/topics.ts` para incluir metadata do novo tópico no overview/navegação
- implementar testes em `src/__tests__/topic18.test.tsx`
- representar quase todo o conteúdo relevante do markdown, incluindo timeline, workflow BMAD, modelos/ferramentas, revisão, prompts literais, aprendizados e limitações
- incluir os elementos visuais de maior valor do tópico, com foco em timeline, cards de evidência, terminal/prompt panel, badges e selo de evidência

**Out of Scope:**
- reescrever ou alterar substancialmente o conteúdo-fonte em `docs/topicos/topic18-bastidores-da-construcao.md`
- modificar a narrativa ou implementação dos Tópicos 1 a 17 além do necessário para registrar o Tópico 18
- implementar automações reais de BMAD, GitHub, session store ou consultas externas em tempo de execução
- criar uma camada de interação pesada com filtros complexos, drag-and-drop, ou visualizações analíticas avançadas além do escopo de interatividade leve
- alterar deploy, pipeline ou estrutura global de navegação fora do necessário para suportar mais um tópico

## Context for Development

### Codebase Patterns

- Cada tópico segue o padrão `src/data/topicNData.ts` + `src/components/topics/TopicN.tsx` + `src/__tests__/topicN.test.tsx`.
- `src/App.tsx` registra tópicos com `React.lazy` e mantém fallback para carregamento.
- O overview/catálogo de tópicos usa metadata em `src/data/topics.ts`.
- Conteúdo textual deve ficar em arquivos de dados, não hardcoded em componentes visuais.
- O projeto usa React 19 + TypeScript strict + Tailwind CSS 4 + Framer Motion.
- Navegação é interna, sem router; adicionar o tópico implica atualizar a lista oficial e a navegação existente.
- O visual precisa manter o tema Matrix/tech e privilegiar leitura clara em fundo escuro com destaques neon.
- `src/data/topics.ts` é a fonte de verdade para `topics`, `topicBlocks` e `TOTAL_TOPICS`; mudanças ali propagam para contexto, hash sync, mobile nav e overview.
- O bloco `bonus` já existe e hoje concentra o Tópico 17; `Overview.tsx` separa `coreTopics` e `bonusTopics` via `topic.isBonus`.
- `CyberProgressBar.tsx` não representa cada tópico individualmente; ele comprime a jornada em 5 segmentos macro, e o último segmento já agrega `Impacto + Bonus`.
- Tópicos densos e editoriais, como o 17, usam `TopicReveal`, `TopicRevealItem`, `NarratorToggle`, `GlowDivider` e `MatrixTerminal` para alternar entre conteúdo principal e notas do apresentador.
- Os arquivos de dados recentes tipam explicitamente interfaces locais e exportam um único objeto `topicNData` como fonte para componente e testes.
- Os testes costumam validar tanto a integridade do data model quanto a renderização orientada por dados, reduzindo hardcode duplicado na suite.

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `docs/topicos/topic18-bastidores-da-construcao.md` | Fonte de verdade do conteúdo do Tópico 18 |
| `src/App.tsx` | Registro lazy-loaded dos componentes de tópico |
| `src/data/topics.ts` | Metadata do overview e navegação da apresentação |
| `src/components/topics/Topic17.tsx` | Referência recente de composição visual e densidade de conteúdo |
| `src/data/topic17Data.ts` | Referência recente de modelagem de dados de um tópico mais extenso |
| `src/__tests__/topic17.test.tsx` | Referência recente de testes para data + rendering do tópico |
| `src/components/layout/Overview.tsx` | Separa rota principal e bônus, com cópia e métricas específicas do bloco bônus |
| `src/components/layout/CyberProgressBar.tsx` | Mapeia tópicos para 5 segmentos macro, incluindo `Impacto + Bonus` |
| `src/hooks/useHashSync.ts` | Valida deep links usando `TOTAL_TOPICS` |
| `src/__tests__/overview.test.tsx` | Exercita comportamento e copy do overview, inclusive o bônus |
| `src/__tests__/cyberProgressBar.test.ts` | Valida mapeamento de faixa de tópicos para segmentos |
| `src/__tests__/hashSync.dispatch.test.tsx` | Contém mock explícito de `TOTAL_TOPICS: 17`, potencialmente impactado |
| `_bmad-output/project-context.md` | Regras críticas de implementação, stack e convenções |

### Technical Decisions

- O Tópico 18 será implementado como **tópico oficial navegável**, aumentando a sequência da apresentação para 18 tópicos.
- A implementação seguirá o **padrão clássico da codebase**, evitando uma solução paralela ou self-contained fora dos padrões do projeto.
- A UI deve preservar **quase todo o conteúdo relevante** do markdown, com condensação apenas onde a leitura e o ritmo visual exigirem.
- A experiência será de **interatividade leve**: expansão visual moderada, destaque de blocos e organização escaneável, sem transformar o tópico em dashboard complexo.
- Os elementos visuais prioritários serão timeline verificável, blocos de evidência, painel estilo terminal para prompts literais, badges de ferramentas/modelos e selo de evidência.
- Elementos mais sofisticados como swimlanes muito ricas ou overlays avançados podem ser simplificados no MVP, desde que a informação continue presente e legível.
- O Tópico 18 deve entrar no **mesmo bloco bônus/apêndice estendido**, em vez de criar um sexto macro-segmento de progresso; isso minimiza impacto estrutural e preserva a semântica da barra de progresso atual.
- `src/data/topics.ts` precisará evoluir o bloco bônus de “Tópico 17” para “Tópicos 17-18” e ajustar textos derivados do overview que hoje assumem `+1 bônus`.
- `Overview.tsx` possui copy específica para o bônus atual (“Copilot, plan, threads e multiagentes”); essa narrativa deverá ser generalizada para acomodar um segundo tópico bônus/apêndice sem parecer remendo textual.
- `CyberProgressBar.tsx` pode manter 5 segmentos, mas seus comentários/testes precisam refletir que o segmento 5 passa a cobrir `14-18`, não `14-17`.
- A estratégia visual recomendada para `Topic18` é um layout editorial modular: hero + timeline por dia + blocos temáticos (workflow, modelos, review, prompts, lições, limitações) + modo de notas via terminal.
- Como o markdown-fonte é longo e denso, o `topic18Data.ts` deve ser modelado por seções semânticas e coleções tipadas, em vez de um único array genérico de parágrafos.

## Implementation Plan

### Tasks

- [x] Task 1: Expandir metadata global para suportar o segundo tópico bônus/apêndice
	- File: `src/data/topics.ts`
	- Action: Adicionar o item do `Topic18` na lista `topics`, mantendo `block: 'bonus'` e `isBonus: true`; atualizar `topicBlocks` para refletir que o bloco bônus cobre `Tópicos 17-18`; revisar textos auxiliares e placeholders que assumem apenas um bônus.
	- Notes: `TOTAL_TOPICS` deriva de `topics.length`, então essa mudança precisa ser a primeira para alinhar navegação, hash e overview.

- [x] Task 2: Modelar a fonte de dados tipada do Tópico 18
	- File: `src/data/topic18Data.ts`
	- Action: Criar interfaces locais e exportar `topic18Data` com estrutura semântica para hero, timeline diária, bloco de workflow BMAD, tabela/faixa de ferramentas-modelos, review, prompts literais, aprendizados, limitações, métrica de destaque, notas do apresentador e labels de UI.
	- Notes: Evitar um shape genérico demais; a modelagem deve permitir renderização clara de quase todo o conteúdo do markdown sem hardcode textual no componente.

- [x] Task 3: Implementar o componente `Topic18` com layout editorial modular e interatividade leve
	- File: `src/components/topics/Topic18.tsx`
	- Action: Criar o componente usando o padrão do projeto para tópicos ricos, com hero principal, timeline por dia, cards/blocos de evidência, prompts em terminal/quote blocks, badges de ferramentas/modelos, bloco de lições aprendidas, bloco de limitações e modo de notas do apresentador.
	- Notes: Reutilizar primitives existentes quando fizer sentido (`TopicReveal`, `TopicRevealItem`, `NarratorToggle`, `MatrixTerminal`, `GlowDivider`, `NeonCard`), mantendo performance e acessibilidade.

- [x] Task 4: Integrar o novo tópico ao carregamento lazy da aplicação
	- File: `src/App.tsx`
	- Action: Adicionar import lazy de `@/components/topics/Topic18` no mapa `topicComponents` e garantir fallback consistente.
	- Notes: O índice 18 deve existir explicitamente; não depender de fallback silencioso para tópico inexistente.

- [x] Task 5: Atualizar o overview para acomodar dois bônus/apêndices
	- File: `src/components/layout/Overview.tsx`
	- Action: Ajustar a copy do painel para refletir dois tópicos extras/apêndices; manter separação entre core e bonus topics; revisar labels como `+1 bônus`, `Tópico extra` e descrições do bloco bônus para não ficarem presas ao conteúdo do Topic17.
	- Notes: A UX do overview deve continuar destacando o arco principal sem esconder que agora há dois tópicos no bloco bônus.

- [x] Task 6: Confirmar e documentar a semântica do segmento final da progress bar
	- File: `src/components/layout/CyberProgressBar.tsx`
	- Action: Atualizar comentários/documentação interna para indicar que o segmento final cobre tópicos `14-18`; manter a mesma lógica de 5 segmentos, sem criar novo macro-bloco visual.
	- Notes: A implementação da função `getSegmentIndex` provavelmente não muda na prática, mas os comentários e os testes precisam refletir a realidade nova.

- [x] Task 7: Cobrir o Tópico 18 com testes dedicados de dados e renderização
	- File: `src/__tests__/topic18.test.tsx`
	- Action: Criar testes para validar estrutura do `topic18Data`, renderização do título/subtítulo, presença das seções principais, prompts literais, métrica de destaque, bloco final e alternância entre conteúdo/notas.
	- Notes: Seguir o padrão de `topic17.test.tsx`, mas adequar ao novo shape de dados.

- [x] Task 8: Atualizar testes de integração afetados pela expansão para 18 tópicos
	- File: `src/__tests__/overview.test.tsx`
	- Action: Ajustar asserts que presumem um único bônus; validar que o overview lista dois tópicos no bloco bônus/apêndice e que a copy atualizada aparece corretamente.
	- Notes: Manter cobertura de acessibilidade e de foco intacta.

- [x] Task 9: Atualizar testes da progress bar para a nova faixa final
	- File: `src/__tests__/cyberProgressBar.test.ts`
	- Action: Alterar testes e descrições para que o segmento 5 cubra `14-18`, incluindo clamp acima do range.
	- Notes: Garantir que o comportamento continue igual visualmente, mudando apenas a documentação comportamental da faixa.

- [x] Task 10: Remover suposições hardcoded de 17 tópicos nos testes de hash sync
	- File: `src/__tests__/hashSync.dispatch.test.tsx`
	- Action: Atualizar o mock de `TOTAL_TOPICS` para 18 ou generalizar a fixture para não congelar o valor antigo.
	- Notes: Esse arquivo não implementa a feature, mas pode quebrar a suite se ficar preso em 17.

### Acceptance Criteria

- [ ] AC 1: Given a aplicação carregada, when o usuário navega até o fim da sequência ou acessa `#/topic/18`, then o `Topic18` é exibido corretamente como tópico navegável oficial.
- [ ] AC 2: Given o catálogo de tópicos aberto, when o usuário visualiza o bloco bônus/apêndice, then ele encontra os tópicos 17 e 18 listados separadamente com metadata coerente e seleção funcional.
- [ ] AC 3: Given o `Topic18` renderizado no modo conteúdo, when a UI é exibida, then ela apresenta título, subtítulo, timeline verificável por dia, blocos de evidência, prompts literais e conclusão/limitações sem depender de notas externas para compreensão básica.
- [ ] AC 4: Given o `Topic18` no modo conteúdo, when o usuário alterna para notas, then as notas do apresentador aparecem em um terminal visual consistente com o padrão do projeto e o conteúdo principal deixa de ser o foco visível.
- [ ] AC 5: Given os dados do `Topic18`, when os testes de integridade rodam, then a estrutura tipada contém todas as seções obrigatórias e na ordem esperada para suportar a narrativa planejada.
- [ ] AC 6: Given a barra de progresso, when o tópico atual estiver entre 14 e 18, then o segmento final continua ativo como `Impacto + Bonus`, sem criação de um novo macro-segmento.
- [ ] AC 7: Given hashes inválidos ou fora da faixa, when o `useHashSync` inicializa, then a navegação continua fazendo fallback seguro para o tópico 1; given `#/topic/18`, when a hash é válida, then o hook aceita o novo índice máximo.
- [ ] AC 8: Given quase todo o conteúdo do markdown-fonte precisa ser preservado, when a implementação do `Topic18` for concluída, then os blocos narrativos centrais (timeline, workflow BMAD, ferramentas/modelos, review, prompts, lições e limitações) estarão representados no app sem reescrita substancial da fonte.
- [ ] AC 9: Given usuários com navegação por teclado, when interagem com overview e toggle de notas do `Topic18`, then os controles permanecem acessíveis por foco, Enter/Espaço e sem regressão do comportamento já existente.
- [ ] AC 10: Given a suíte de testes atualizada, when os testes relevantes forem executados, then os testes novos do `Topic18` e os testes impactados por `TOTAL_TOPICS`/overview/progress bar passam sem depender do valor antigo 17.

## Additional Context

### Dependencies

- Não há nova dependência externa prevista; a implementação deve reutilizar React, Tailwind, Framer Motion e os componentes/utilitários já existentes.
- O `Topic18` depende funcionalmente da atualização prévia de `src/data/topics.ts`, porque `TOTAL_TOPICS`, overview, hash sync e navegação derivam dessa fonte.
- A experiência visual ideal depende do reuso de primitives já existentes no projeto (`TopicReveal`, `NarratorToggle`, `MatrixTerminal`, `GlowDivider`, `NeonCard`) para reduzir custo de manutenção e manter consistência visual.
- Os testes de integração dependem da atualização coordenada entre metadata (`topics.ts`), navegação (`App.tsx`) e mocks/testes com `TOTAL_TOPICS` fixado.

### Testing Strategy

A estratégia é validar a integridade dos dados estruturados, a presença dos principais blocos narrativos na renderização e a integração correta do Tópico 18 no fluxo existente da apresentação.

- **Unitário / data model:** validar shape de `topic18Data`, presença das coleções obrigatórias, ordem das seções e existência de labels usadas pelo componente.
- **Componente:** validar render de hero, timeline, blocos de evidência, prompts literais, métrica de destaque, conclusão e alternância entre conteúdo/notas.
- **Integração leve:** validar inclusão do tópico 18 no overview, atualização do bloco bônus e continuidade do deep link `#/topic/18`.
- **Regressão de navegação:** validar que `TOTAL_TOPICS` passa a 18 sem quebrar clamps em reducer, hash sync e navegação móvel/teclado.
- **Validação manual recomendada:** percorrer setas/space até o tópico 18, abrir overview com `Esc`, selecionar o tópico 18, alternar para notas e verificar legibilidade em viewport desktop/projetor.

### Notes

O foco deste tópico é reforçar a tese central da apresentação com uma prova auditável do processo de construção. A implementação deve equilibrar densidade de informação com escaneabilidade visual, preservando rigor sem virar parede de texto hostil — ou, em bom português técnico, sem cometer crimes tipográficos em produção.

- **Risco principal:** tentar reproduzir cada detalhe visual sugerido no markdown (timeline neon, swimlanes, overlay, terminal, badges, selos) em uma única passada pode inflar o componente e reduzir clareza. Priorizar fidelidade informacional antes de sofisticação ornamental.
- **Risco de regressão:** a mudança em `topics.ts` afeta múltiplos pontos via `TOTAL_TOPICS`; qualquer teste ou comentário fixado em 17 pode quebrar silenciosamente a confiança da suite.
- **Limitação consciente do MVP:** swimlanes ultra-elaboradas e overlays cinematográficos podem ser simplificados desde que a informação continue presente e o storytelling permaneça auditável.
- **Consideração futura:** se o bloco bônus continuar crescendo além do Tópico 18, pode valer criar nomenclatura de bloco mais ampla que “Bônus Operacional”, separando “bonus” de “appendix” no metadata global.
