# Tópico: Comparativo Visual (Spec‑Kit vs GSD vs BMAD)

## Tópico: 10

## Bloco: Bloco 3 — As Ferramentas (Topicos 6–10)

## Título: Comparativo Visual — escolha a ferramenta certa pro tipo de problema

## Conteúdo:

### Objetivo do tópico
Fechar o Bloco 3 com um comparativo **prático** (não “briga de ferramentas”) para responder duas perguntas:

1) **O que cada ferramenta resolve** (o “inimigo” principal).
2) **Quando usar qual** (e quando não vale o overhead).

A proposta aqui é **2 telas**:

- **Tela 1: “Tabela viva”** (overview, comparação nas 5 dimensões oficiais do projeto)
- **Tela 2: “Wizard de decisão”** (guia rápido: perguntas → recomendação)

---

## Tela 1 — Tabela viva (comparativo nas 5 dimensões)

### Copy/estrutura da tela
- Título: **“Ferramentas por escala: Spec‑Kit → GSD → BMAD”**
- Subtítulo: **“Não é competição; é maturidade por complexidade e risco.”**

#### Matriz (5 dimensões do `docs/estrutura-slides.md`)

| Dimensão | Spec‑Kit (Spec‑Driven Development) | GSD (Context Fresh + fases) | BMAD (Multi‑agente + workflows) |
|---|---|---|---|
| **Complexidade do projeto** | **Baixa → Média** (clareza de intenção e contrato) | **Média → Alta** (execução consistente em fases) | **Alta** (produto/plataforma; muitas decisões e validação cruzada) |
| **Número de agentes/personas** | Normalmente **1 agente por vez** (via comandos), com integrações para vários assistants/runtimes | **Orquestra subagentes** (pesquisa/planejamento/execução/verificação) com contexto fresco por plano | **Personas explícitas** (PM/Arquiteto/Dev/SM/QA etc.) + workflows/“tracks” |
| **Tipo de output** | **Constituição/princípios**, **spec**, **plan**, **tasks** (com checkpoints) | Artefatos por fase: **CONTEXT**, **RESEARCH**, **PLAN (atômico)**, **SUMMARY**, **VERIFICATION**, **UAT** + commits atômicos | Artefatos de processo: **PRD**, **Arquitetura/ADRs**, **epics/stories**, **sprint-status** + ciclo de implementação/review |
| **Curva de aprendizado** | **Baixa → Média** (disciplina: spec → plan → tasks → implement) | **Média** (entender fases/waves e disciplina de validação) | **Média → Alta** (ritual/workflow, múltiplos agentes, escolha de track) |
| **Caso de uso ideal** | Time pequeno/solo que quer **contrato de intenção** e previsibilidade | Solo dev / time pequeno que quer **velocidade com consistência** e proteção contra **context rot** | Projetos que precisam de **visão sistêmica**, decisões explícitas e validação por papéis |

#### “Quando usar” em 1 frase (card por coluna)
- **Spec‑Kit**: quando o problema é **traduzir intenção em execução** sem virar “prompt soup” — você quer **um contrato** que sobreviva à conversa.
- **GSD**: quando o problema é **consistência ao longo do tempo** (muitas tarefas/fases) — você quer **contexto fresco + verificação** e histórico rastreável.
- **BMAD**: quando o problema é **coordenação e validação multi‑perspectiva** — você quer um “time simulado” e **workflows** com artefatos (PRD/Arquitetura/Stories).

#### Micro‑bloco “prova social” (rodapé discreto)
Mostrar como “sinais de adoção” (sem virar aula de GitHub):

- Spec‑Kit (`github/spec-kit`): ~74k stars, 112 releases, 93 contributors.
- GSD (`gsd-build/get-shit-done`): ~24.3k stars, 32 releases, 50 contributors.
- BMAD (`bmad-code-org/BMAD-METHOD`): ~39.1k stars, 24 releases, 119 contributors.

> Observação de honestidade: “Esses números mudam; o ponto é a **tração relativa** e o ritmo de evolução.”

---

## Tela 2 — Wizard de decisão (guia rápido)

### Objetivo do wizard
Transformar a comparação em **decisão operacional**. A pessoa sai da tela sabendo:

- “Qual eu testaria primeiro?”
- “O que eu ganho / o que eu pago (overhead)?”
- “Qual é o próximo passo concreto?”

### Estrutura do wizard (4 perguntas)

**Pergunta 1 — Escopo e risco**
- A) “Feature pequena / bug / entrega rápida”
- B) “Feature média / várias partes / precisa de consistência”
- C) “Produto/plataforma / muitos stakeholders / decisões arquiteturais”

**Pergunta 2 — Você precisa de validação cruzada por papéis?**
- A) “Não, eu decido e executo”
- B) “Sim, quero PM/Arquiteto/QA como ‘vozes’”

**Pergunta 3 — Seu maior inimigo agora é…**
- A) “Ambiguidade (o que construir?)”
- B) “Context rot / degradação em sessão longa”
- C) “Conflito de decisões (API, DB, padrões, responsabilidades)”

**Pergunta 4 — Tolerância a overhead (documentação/processo)**
- A) “Baixa (quero velocidade com estrutura mínima)”
- B) “Média (aceito disciplina por fases)”
- C) “Alta (prefiro governança e rastreabilidade)” 

### Mapeamento de resposta → recomendação
Regra simples (explicável na tela):

- Se **(Pergunta 1 = A)** e overhead baixo → **Spec‑Kit** (ou Spec‑Kit + checklists)
- Se o inimigo é **context rot** ou há **fases/execução longa** → **GSD**
- Se precisa de **papéis + validação cruzada + decisões explícitas** → **BMAD**

### Saída do wizard (resultado)
O resultado deve sempre mostrar 3 coisas:

1) **Ferramenta recomendada (primária)**
2) **Trade‑off explícito** (o “preço”)
3) **Próximo passo concreto** (1 ação)

Exemplos de saída:

- **Recomendação: Spec‑Kit**
  - Trade‑off: você precisa manter o hábito de atualizar spec/plan quando mudar o rumo.
  - Próximo passo: rodar o fluxo **Specify → Plan → Tasks → Implement**.

- **Recomendação: GSD**
  - Trade‑off: você compra a disciplina de fases/artefatos (CONTEXT/PLAN/SUMMARY).
  - Próximo passo: iniciar projeto e rodar o loop por fase (**discuss → plan → execute → verify**).

- **Recomendação: BMAD**
  - Trade‑off: mais cerimônia (PRD/Arquitetura/Stories) em troca de alinhamento e previsibilidade.
  - Próximo passo: começar pelo **/bmad-help** para escolher track e iniciar o fluxo.

---

## Métrica de Destaque: “Adoção/tração” (com responsabilidade)

- Spec‑Kit (`github/spec-kit`): ~74k stars; 112 releases; 93 contributors.
- GSD (`gsd-build/get-shit-done`): ~24.3k stars; 32 releases; 50 contributors.
- BMAD (`bmad-code-org/BMAD-METHOD`): ~39.1k stars; 24 releases; 119 contributors.

Uso: rodapé discreto da Tela 1, como “sinal de tração”, não como argumento principal.

---

## Notas do Apresentador:

### Como narrar a Tela 1 (1–2 min)
- “Aqui não tem ‘melhor ferramenta’. Tem **melhor ferramenta pro tipo de problema**.”
- “Spec‑Kit te dá o **contrato**: o que é pra ser construído e por quê, com checkpoints.”
- “GSD é o ‘anti‑context rot’: ele te dá **contexto fresco por plano** e um loop de verificação.”
- “BMAD é quando você precisa simular um time: PRD, arquitetura, stories e review — é governança pra não virar acidente.”
- “Reparem: elas se organizam como uma escada. Você não abandona a anterior — você **sobe de nível** quando o projeto pede.”

### Como narrar a Tela 2 (1 min)
- “Se você sair daqui lembrando só de uma coisa: **escolha pelo inimigo**. Ambiguidade? Context rot? Conflito de decisões?”
- “O wizard transforma o comparativo em ‘próxima ação’ — é um guia de adoção.”

### Fecho/ponte para o Bloco 4 (Novo Papel)
- “A consequência disso é que o dev deixa de ser só executor. Ele vira o cara que define contexto, valida e orquestra.”

---

## Experiência Visual e Interativa:

### Tema visual (Matrix/Tech)
- **Tela 1**: grid com brilho sutil, linhas tipo “HUD”, hover com micro‑animação (scanline) e tooltip com exemplos de artefatos.
- **Tela 2**: wizard como “terminal guiado” (perguntas em sequência), com barra de progresso e resultado em card “deploy recommendation”.

### Interações recomendadas
- **Tabela viva**:
  - Hover/click em cada célula abre “Exemplo rápido” (ex.: o que é PRD, o que é PLAN atômico, o que é constitution).
  - Toggle “Sou solo” vs “Sou time” para realçar colunas.

- **Wizard**:
  - 4 perguntas, cada uma com 3 opções.
  - Resultado com: recomendação + trade-off + próximo passo.
  - Botão: “Quero ver a tabela novamente” (voltar sem perder as respostas).

---

## Fontes:

### Spec‑Kit / Spec‑Driven Development
- Repositório (métricas e estrutura): https://github.com/github/spec-kit
- Documentação (conceito e guia): https://github.github.io/spec-kit/
- Artigo GitHub Blog (processo em 4 fases e checkpoints): https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/

### GSD
- Repositório (posicionamento, métricas, comandos): https://github.com/gsd-build/get-shit-done
- User Guide (diagramas, fases, Nyquist validation, config): https://github.com/gsd-build/get-shit-done/blob/main/docs/USER-GUIDE.md

### BMAD
- Repositório (métricas e quick start): https://github.com/bmad-code-org/BMAD-METHOD
- Documentação completa (fases, tracks, /bmad-help, estrutura): https://docs.bmad-method.org/llms-full.txt
