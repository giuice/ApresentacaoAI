# Sprint Change Proposal

**Data:** 2026-03-09  
**Projeto:** ApresentacaoAI  
**Workflow:** Correct Course  
**Modo assumido:** Incremental (padrao recomendado, assumido por ausencia de preferencia explicita)

## 1. Resumo do Problema

Durante a revisao final da apresentacao, foi identificado um gap de escopo e de acabamento:

1. A apresentacao precisa incluir um **novo Topico 17** com base em [`docs/topicos/topic17-bonus.md`](C:\Projects\ApresentacaoAI\docs\topicos\topic17-bonus.md), cobrindo o tema "Copilot alem do autocomplete: como operar comandos, threads e multiagentes com controle".
2. A tela de **menu/overview** existente cumpre a navegacao, mas ainda nao cumpre o nivel de direcao visual esperado para a apresentacao. O componente atual funciona como grid utilitario, sem a forca estetica e narrativa do restante do app.

### Contexto de descoberta

- A necessidade surgiu apos a implementacao dos topicos 11-16, ainda marcados como `review` em [`sprint-status.yaml`](C:\Projects\ApresentacaoAI\_bmad-output\implementation-artifacts\sprint-status.yaml).
- O material do novo topico ja esta consolidado em [`topic17-bonus.md`](C:\Projects\ApresentacaoAI\docs\topicos\topic17-bonus.md).
- O overview atual esta implementado em [`Overview.tsx`](C:\Projects\ApresentacaoAI\src\components\layout\Overview.tsx) como um grid simples de botoes.

### Triggering story

- **Story gatilho principal:** 5.6 `topico-16-call-to-action-final`
- **Story relacionada:** 1.4 `modo-overview-mapa-de-topicos`

### Tipo de mudanca

- **Novo requisito emergente do stakeholder** durante a reta final de implementacao
- **Refinamento de UX pendente** identificado na revisao do fluxo de navegacao

### Evidencias

- O app hoje ainda esta parametrizado para **16 topicos** em [`src/data/topics.ts`](C:\Projects\ApresentacaoAI\src\data\topics.ts) e [`src/App.tsx`](C:\Projects\ApresentacaoAI\src\App.tsx).
- A barra de progresso considera o encerramento em 16 topicos em [`CyberProgressBar.tsx`](C:\Projects\ApresentacaoAI\src\components\layout\CyberProgressBar.tsx).
- O overview atual usa uma grade funcional, mas sem tratamento visual equivalente ao restante da experiencia.

## 2. Analise de Impacto

### 2.1 Impacto em Epicos

- **Epic 1 - App Shell & Sistema de Navegacao:** impactado pelo redesenho do overview/menu.
- **Epic 5 - Bloco 4 & 5 - O Novo Papel & CTA:** impactado porque o Tópico 16 deixa de ser o ultimo topico da aplicacao.
- **Novo Epic 6 proposto:** necessario para isolar a extensao de escopo sem reabrir artificialmente o objetivo original do MVP.

### 2.2 Impacto em Stories

- **5.6 Topico 16 - Call to Action Final**
  - precisa deixar de ser descrito como "ultimo topico"
  - continua sendo o fechamento principal da narrativa base, mas passa a ser seguido por um bonus operacional
- **1.4 Modo Overview**
  - precisa evoluir de "mapa funcional" para "menu command center" com melhor hierarquia visual
- **Novas stories recomendadas no Epic 6**
  - 6.1 Redesign do menu/overview
  - 6.2 Extensao da navegacao, registro e progresso para 17 topicos
  - 6.3 Implementacao do Topico 17 com dados e experiencia visual
  - 6.4 Testes e regressao de navegacao/overview/progresso

### 2.3 Conflitos com Artefatos

- **PRD:** hoje fixa escopo, navegacao e checklist em 16 topicos.
- **Epics:** hoje encerram a jornada no Topico 16.
- **Architecture:** hoje define deep link `#/topic/<n>` com faixa 1..16 e lazy-load de `Topic1..Topic16`.
- **UX Spec:** descreve a experiencia panoramica e a jornada geral em 16 topicos.
- **Sprint status:** ainda nao contempla um novo epic nem novas stories.

### 2.4 Impacto Tecnico

- Atualizacao do registro central de topicos
- Inclusao de `topic17Data.ts` e `Topic17.tsx`
- Atualizacao do lazy-load em `App.tsx`
- Atualizacao de testes que assumem 16 topicos
- Ajuste da barra de progresso para considerar o bonus sem quebrar a narrativa dos 5 blocos
- Refinamento visual do overview para manter acessibilidade, keyboard-first e legibilidade em projetor

### 2.5 Artefatos Secundarios Impactados

- testes em `src/__tests__/overview.test.tsx`
- testes em `src/__tests__/cyberProgressBar.test.ts`
- testes que validam viewport e navegacao por indice
- possivel ajuste em dados narrativos/metadata centralizados

## 3. Avaliacao de Caminhos

### Opcao 1 - Ajuste direto com novo Epic 6

- **Viabilidade:** alta
- **Esforco:** medio
- **Risco:** baixo a medio
- **Resumo:** preservar o escopo ja entregue dos Epics 1-5 e adicionar um Epic 6 para bonus operacional + polish do menu.

**Vantagens**

- preserva rastreabilidade do MVP original
- evita reescrever artificialmente o trabalho ja concluido
- permite entregar a extensao como incremento controlado

**Desvantagens**

- exige atualizacao de PRD/epics/arquitetura/UX e sprint status

### Opcao 2 - Reabrir Epic 5 e absorver tudo nele

- **Viabilidade:** media
- **Esforco:** medio
- **Risco:** medio
- **Resumo:** incorporar Topic 17 e menu redesign dentro do Epic 5.

**Motivo para nao recomendar**

- mistura fechamento narrativo com extensao de escopo
- piora a rastreabilidade
- enfraquece a separacao entre "journey core" e "bonus operacional"

### Opcao 3 - Revisar MVP e manter apenas 16 topicos

- **Viabilidade:** alta
- **Esforco:** baixo
- **Risco:** baixo
- **Resumo:** nao implementar o bonus agora.

**Motivo para nao recomendar**

- contraria a necessidade explicitamente declarada pelo stakeholder
- perde o material ja consolidado em `topic17-bonus.md`

### Caminho recomendado

**Opcao 1 - Ajuste direto com novo Epic 6**

**Justificativa:** a mudanca e relevante o suficiente para exigir backlog novo, mas nao grande o bastante para exigir rollback ou replanning estrutural. O caminho mais limpo e adicionar um **Epic 6** focado em:

1. estender a aplicacao de 16 para 17 topicos
2. redesenhar o overview/menu com qualidade visual compativel com o restante do produto
3. implementar o bonus operacional sem comprometer o arco principal ja construido

## 4. Propostas Detalhadas de Mudanca

### 4.1 PRD

#### Secao: Success Criteria / Completion Checklist

**OLD**

- "Navegacao por teclado funciona do topico 1 ao 16."
- "Completude: 16 topicos implementados e funcionais (100%)."

**NEW**

- "Navegacao por teclado funciona do topico 1 ao 17."
- "Completude: 17 topicos implementados e funcionais, sendo 16 topicos da jornada principal e 1 topico bonus operacional."

**Rationale:** o comportamento real da aplicacao muda; a documentacao precisa refletir a nova faixa navegavel.

#### Secao: MVP / Product Scope

**OLD**

- "16 componentes de topico"

**NEW**

- "17 componentes de topico, incluindo 1 topico bonus de operacao com Copilot/threads/plan/fleet"

**Rationale:** o escopo funcional passa a incluir um capitulo adicional.

#### Secao: Functional Requirements

**OLD**

- FR21: renderizar o Topico 16

**NEW**

- FR21: renderizar o Topico 16
- **FR30: Sistema pode renderizar o conteudo do Topico 17 (bonus operacional de Copilot, threads, plan e fleet).**

**Rationale:** manter rastreabilidade formal do novo requisito.

### 4.2 Epics / Stories

#### Modificacao em Story 5.6

**Story:** 5.6 Topico 16 - Call to Action Final

**OLD**

- "Given o Topico 16 como ultimo topico"
- "Given a apresentacao completa (Topicos 1-16 navegados)"

**NEW**

- "Given o Topico 16 como fechamento principal da jornada base"
- "Given a apresentacao completa (Topicos 1-17 navegados)"

**Rationale:** o Topico 16 deixa de ser o ultimo indice da aplicacao, mas continua sendo o encerramento principal do arco central.

#### Novo Epic 6

**NEW**

### Epic 6: Bonus Operacional & Menu Command Center

O apresentador pode acessar um menu/overview com acabamento visual de command center e concluir a experiencia com um Topico 17 bonus sobre operacao pratica de Copilot, threads, plan e multiagentes.

**FRs cobertos:** FR4, FR5, FR22, FR23, FR30  
**NFRs:** NFR1, NFR2, NFR4, NFR7

##### Story 6.1: Redesign do Menu/Overview

Como apresentador,  
Eu quero que o overview funcione como um command center coerente com a identidade visual da apresentacao,  
Para que o salto entre topicos seja funcional e visualmente memoravel.

##### Story 6.2: Extensao da Navegacao para 17 Topicos

Como sistema,  
Eu quero suportar 17 topicos em registry, hash, overview e loading lazy,  
Para que o bonus faca parte da jornada sem hacks locais.

##### Story 6.3: Topico 17 - Copilot Operacional

Como audiencia,  
Eu quero consumir um topico bonus sobre comandos, threads, plan e fleet,  
Para que a apresentacao termine com uma ponte pratica entre conceito e operacao no dia 1.

##### Story 6.4: Regressao e Testes

Como time,  
Eu quero validar overview, progresso, navegacao e renderizacao do Topico 17,  
Para que a extensao nao introduza regressao no fluxo 1-17.

### 4.3 Architecture

#### Secao: Deep link / faixa de indices

**OLD**

- formato canônico `#/topic/<n>` onde `<n>` e 1..16
- lazy-load de `Topic1..Topic16`

**NEW**

- formato canônico `#/topic/<n>` onde `<n>` e 1..17
- lazy-load de `Topic1..Topic17`

**Rationale:** a arquitetura de navegacao precisa refletir o novo teto de topicos.

#### Secao: Project Structure

**OLD**

- `src/components/topics/Topic1.tsx ... Topic16.tsx`
- `src/data/topic1Data.ts ... topic16Data.ts`

**NEW**

- `src/components/topics/Topic1.tsx ... Topic17.tsx`
- `src/data/topic1Data.ts ... topic17Data.ts`

**Rationale:** manter consistencia estrutural.

#### Secao: Layout / Overview

**OLD**

- overview como mapa funcional para reorientacao

**NEW**

- overview evolui para **menu command center**, com:
  - hierarquia visual mais forte
  - agrupamento por bloco narrativo
  - destaque claro do topico ativo
  - leitura confortavel em projetor
  - suporte keyboard-first preservado

**Rationale:** a UX atual funciona, mas ainda nao expressa a direcao visual do produto.

### 4.4 UX Design Specification

#### Secao: User Journey / Overview

**OLD**

- modo overview rapido para mostrar 16 topicos

**NEW**

- modo overview/menu como "painel de comando" da apresentacao
- exibicao de 17 topicos, com o Topico 17 tratado visualmente como bonus operacional/fase extra

**Rationale:** o overview deixa de ser apenas utilitario e passa a reforcar a narrativa.

#### Secao: Bonus Topic Experience

**NEW**

Adicionar direcao visual para o Topico 17 com base em [`topic17-bonus.md`](C:\Projects\ApresentacaoAI\docs\topicos\topic17-bonus.md):

- cena de "Painel de Comando" para `/fork`, `/compact`, `/ide`, `/skills`
- grafo visual de threads
- board de plan em 5 blocos
- pipeline de fleet/multiagentes
- tensao visual entre ganho de velocidade e custo de review

**Rationale:** o bonus ja tem linguagem visual aprovada e suficientemente detalhada para implementacao.

## 5. Handoff de Implementacao

### Classificacao de Escopo

**Moderate**

Motivo:

- nao exige rollback
- exige reorganizacao de backlog
- exige atualizacao de multiplos artefatos centrais
- impacta navegacao global, overview e conclusao da jornada

### Responsaveis Recomendados

- **Product Owner / Scrum Master**
  - adicionar o Epic 6 e stories associadas
  - atualizar `epics.md`
  - atualizar `sprint-status.yaml`
- **Developer**
  - implementar menu redesign
  - adicionar `Topic17.tsx` e `topic17Data.ts`
  - estender registro, lazy-load, overview, progresso e testes
- **QA / Reviewer**
  - validar navegacao 1..17
  - revisar regressao no overview
  - garantir que o bonus nao quebre performance e legibilidade

### Criterios de Sucesso

1. O app navega corretamente de 1 a 17 por teclado, overview e hash.
2. O menu/overview deixa de ser um grid utilitario e passa a ter acabamento visual coerente com o produto.
3. O Topico 17 renderiza o conteudo bonus a partir de `topic17-bonus.md`, com narrativa, dados e notas do apresentador.
4. Nenhum teste existente de navegacao e progresso quebra sem atualizacao justificada.
5. O impacto visual continua apropriado para projetor e o desempenho permanece dentro do baseline atual.

## 6. Proximos Passos Recomendados

1. Aprovar esta Sprint Change Proposal.
2. Atualizar `epics.md`, `prd.md`, `architecture.md`, `ux-design-specification.md` e `sprint-status.yaml`.
3. Criar as stories do Epic 6.
4. Executar a implementacao do Epic 6.
