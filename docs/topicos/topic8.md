# Tópico: GSD (Get Shit Done) — Contexto Fresco, Qualidade Constante
## Tópico: 8
## Bloco: 3 — As Ferramentas
## Título: GSD (Get Shit Done) — Contexto Fresco, Qualidade Constante

---
**doc ref** `/docs/gsd-guid.md`

## Conteúdo

### Abertura — "Chat longo não é build system"
No Bloco 1 a gente nomeou o problema: **Context Rot**. Não é "falta de disciplina" do dev, nem "prompt fraco". É o efeito natural de uma sessão longa: decisões se perdem, requisitos ficam escondidos, e a qualidade começa a cair.

O GSD parte de uma tese pragmática:

- Você não combate Context Rot pedindo para o modelo "ser mais conciso".
- Você combate Context Rot **mudando a forma do trabalho**: de conversa infinita → **pipeline de planos pequenos, verificáveis e executados em contexto novo**.

> Em outras palavras: GSD não melhora o prompt. Ele melhora o **workflow**.


### O que é o GSD (na prática)
**GSD (Get Shit Done)** é um framework de *meta-prompting + context engineering* que transforma desenvolvimento assistido por IA em um ciclo previsível:

- **Contexto durável** vira arquivos (`.planning/`) em vez de ficar "preso" no chat.
- O trabalho é dividido em **planos atômicos** (2–3 tarefas por plano).
- Cada plano é executado em **fresh subagent context**: cada executor recebe **200K tokens limpos**, enquanto o contexto principal do orquestrador se mantém em **30–40%** — bem dentro da zona de qualidade máxima.

**Para quem é** (alinhado com o posicionamento do Bloco 3):
- Devs solo (ou duplas) que querem velocidade com qualidade.
- Projetos reais e multi-sessão, onde vibe coding começa bem e termina instável.

**Quem já usa:** engenheiros da Amazon, Google e Shopify. Multi-runtime: roda em Claude Code, OpenCode, Gemini CLI e Codex.


### O workflow (dev-friendly) — 5 comandos, 1 sistema
O valor do GSD fica claro quando você vê o fluxo completo. Para devs, o que importa é: "Como eu executo isso sem virar caos?"

1) **`/gsd:new-project`**
- Entrevista → research → requirements → roadmap.

2) **`/gsd:discuss-phase N`**
- Trava decisões e preferências antes de planejar (reduz suposições e drift).

3) **`/gsd:plan-phase N`**
- Research + criação de **2–3 planos atômicos** + checagem (plan-check loop até passar).

4) **`/gsd:execute-phase N`**
- Executa planos em **waves** (paralelo quando independente; sequencial quando há dependência).
- **Fresh context por plano** (200K tokens limpos).
- **Commits atômicos por tarefa**.

5) **`/gsd:verify-work N`**
- UAT guiado: valida comportamento observável.
- Se algo falhar: diagnóstico automático e planos de correção prontos.

**E se algo quebrar?** O GSD tem comandos de recuperação prontos:
- `/gsd:progress` — "onde estou, o que faço agora?" (funciona a qualquer momento)
- `/gsd:debug "descrição"` — debugging sistemático com estado persistente
- `/gsd:quick` — fix pontual com as mesmas garantias (commits atômicos, verify)

**Frase âncora:**
> No GSD, o plano não é "documentação". O plano é o **prompt executável**.


### Brownfield — "E se o projeto já existe?"
GSD não é só para greenfield. Para projetos existentes, o fluxo começa com:

**`/gsd:map-codebase`** → quatro agentes paralelos analisam o que já existe:
- Stack Mapper → `STACK.md`
- Architecture Mapper → `ARCHITECTURE.md`
- Convention Mapper → `CONVENTIONS.md`
- Concern Mapper → `CONCERNS.md`

Depois disso, `/gsd:new-project` foca no que você está **adicionando**, não no que já existe. A IA recebe contexto real do código, não suposições.

> **Exemplo concreto:** O **Epimed Monitor** — sistema legado/enterprise de saúde — é um candidato direto para esse fluxo. Em vez de a IA "adivinhar" a arquitetura de um sistema complexo, o `map-codebase` extrai e documenta o que já está lá, e todo plano subsequente respeita essas convenções.


### O "porquê" (manager-friendly) — previsibilidade e qualidade constante
Para quem não quer saber dos comandos, o GSD é uma mudança de *governança do trabalho*:

- **Qualidade constante por design:** tarefas tardias não "herdam" sujeira de contexto.
- **Rastreabilidade:** requisitos → fases → planos → commits.
- **Reversibilidade:** se uma parte deu errado, você reverte um commit específico e segue.

Isso transforma "velocidade de IA" em **velocidade com controle**.


### Métrica protagonista (headline) + mecanismo
**Métrica protagonista:**
- **52 tarefas, 68 testes, 1.473 linhas em 24 arquivos — com 15 minutos de planejamento inicial.**

**Uma linha de mecanismo (pra não soar como hype):**
- Isso é possível porque cada tarefa é atômica, verificável e executada em contexto limpo. O planejamento de 15 minutos produz a estrutura; o GSD executa com previsibilidade.

**Métrica secundária (escala):**
- Dev solo: **100.000 linhas de código em 2 semanas**. Volume impressionante, mas o ponto não é o volume — é que a qualidade da linha 100.000 é a mesma da linha 1, porque o contexto é sempre fresco.


### Teaser (controlado) — Nyquist Validation Layer (volta no Bloco de Impacto)
O guide atualizado do GSD adiciona uma camada que vale um "zoom" mais tarde:

- **Nyquist Validation Layer:** antes de escrever código, o GSD tenta mapear cada requisito para um comando de verificação automatizado.
- Output: `{phase}-VALIDATION.md` como um "contrato de feedback".

> **Sinalização de narrativa:** No **Bloco 5 (Impacto)**, voltamos nesse ponto: por que "velocidade" sem feedback loop vira dívida, e como o Nyquist transforma ganho de throughput em **redução de risco**.


### Pontos honestos (credibilidade)
- GSD é otimizado para "real work" com estrutura. Para tarefas minúsculas/one-off, o próprio ecossistema recomenda usar modos mais leves (ex.: `/gsd:quick`) ou fluxo direto, sem cerimônia.
- Se os planos ficam grandes demais, a qualidade cai: o sistema depende de **atomicidade agressiva**.
- O brownfield (`map-codebase`) depende de quão legível é o código existente — em bases muito caóticas, o mapeamento pode precisar de curadoria manual.


### Ponte para o Tópico 9 — BMAD
GSD resolve o problema do **dev solo ou dupla**: velocidade com qualidade constante, contexto fresco, planos atômicos. Mas o que acontece quando o projeto precisa de **múltiplas perspectivas** — um PM definindo requisitos, um arquiteto validando decisões técnicas, um QA checando cobertura?

> É aí que entra o **BMAD**: em vez de um dev orquestrando tarefas, você orquestra um **time inteiro de agentes especializados**.


---

## Métrica de Destaque
**"52 tarefas, 68 testes, 1.473 linhas em 24 arquivos — 15 minutos de planejamento. Contexto fresco + planos atômicos + verify = qualidade constante do início ao fim."**


---

## Notas do Apresentador

**Abertura (20–30s):**
"Até aqui a gente entendeu que chat longo é um antipadrão: Context Rot. O GSD nasce com uma ideia meio provocativa: parar de tratar um chat como 'build system'. Você resolve isso com um workflow que reseta contexto onde importa e deixa o contexto durável em arquivos."

**Dado técnico (10–15s):**
"Cada executor no GSD recebe 200 mil tokens limpos. O orquestrador principal fica em 30 a 40% de uso de contexto — bem dentro da zona verde que a gente viu no slide de Context Rot. Isso é context engineering na prática."

**Dev-friendly (45–60s):**
"Pra quem é dev, o GSD é bem direto: cinco comandos principais. `new-project` cria visão, requisitos e roadmap. `discuss-phase` trava decisões. `plan-phase` gera 2 ou 3 planos pequenos e checa se eles batem com os requisitos. `execute-phase` roda em waves e faz commits atômicos. `verify-work` guia o UAT e, se algo falhar, cria planos de correção. E se algo quebrar no meio? Tem `debug`, `quick` e `progress` pra recuperar sem perder o fio."

**Brownfield (20–30s):**
"E se o projeto já existe? O GSD tem o `map-codebase`: quatro agentes analisam stack, arquitetura, convenções e pontos de atenção. Exemplo nosso: o Epimed Monitor, sistema legado enterprise de saúde. Em vez de a IA adivinhar a arquitetura, o mapeamento extrai o que já existe e todo plano respeita essas convenções."

**Manager-friendly (20–30s):**
"Pra quem está olhando do ponto de vista de entrega: rastreabilidade e reversibilidade. Requisitos viram fases, fases viram planos, planos viram commits. Se uma parte deu errado, você reverte um commit específico e segue."

**Métrica (15–20s):**
"A métrica que eu quero destacar: 52 tarefas, 68 testes, quase 1.500 linhas em 24 arquivos. Tudo com 15 minutos de planejamento inicial. Isso não é sobre volume — é sobre previsibilidade. E pra dar a escala: dev solo, 100 mil linhas em duas semanas. Mas a qualidade da última linha é a mesma da primeira, porque o contexto é sempre fresco."

**Adoção (10s):**
"E isso não é teoria: engenheiros da Amazon, Google e Shopify já usam. Roda em Claude Code, Gemini CLI, Codex."

**Teaser Nyquist (10–15s):**
"E no bloco de impacto eu volto numa camada específica do GSD, o Nyquist: como ele força um feedback loop de teste e verificação antes do código existir."

**Ponte para BMAD (10–15s):**
"O GSD resolve o problema do dev solo: velocidade com qualidade. Mas e quando o projeto precisa de múltiplas perspectivas — PM, arquiteto, QA? É aí que entra o BMAD."


---

## Experiência Visual e Interativa

### Cena 1 — "Context Gauge" (anti-rot)
- Um medidor visual sobe de 0% → 30% → 50% → 70%.
- Conforme sobe, a UI "glitcha": texto some, caixas tremem, aparecem "decisions lost".
- Destaque visual: o executor do GSD opera em **30–40%** (zona verde).
- A ação "`EXECUTE PHASE`" dispara um **reset** visual (fresh context).

### Cena 2 — "Workflow Rail" (5 comandos + recuperação)
- Trilha com 5 nós principais: `new-project` → `discuss-phase` → `plan-phase` → `execute-phase` → `verify-work`.
- Ao clicar em cada nó:
  - "O que sai" (artefatos em `.planning/`).
  - "O que garante" (ex.: atomic commits, waves, UAT guiado).
- Abaixo da trilha: 3 ícones menores para comandos de recuperação (`progress`, `debug`, `quick`) com tooltip explicativo.

### Cena 3 — "Waves + git log" (prova de controle)
- Visual de waves (paralelo vs sequencial) + um `git log` estilizado (um commit por tarefa).
- Mostra como tarefas independentes rodam em Wave 1 (paralelo) e dependentes esperam Wave 2 (sequencial).
- O `git log` reforça: cada commit é atômico, revertível, rastreável.

### Cena 4 — "Brownfield: map-codebase" (Epimed Monitor)
- Visual de 4 agentes paralelos escaneando um codebase:
  - Stack → Architecture → Conventions → Concerns
- Output: 4 arquivos `.md` alimentando o `/gsd:new-project`.
- Label: "Epimed Monitor — sistema legado/enterprise de saúde".

### Teaser Nyquist (card pequeno)
- Um card discreto: "`{phase}-VALIDATION.md` = contrato de feedback".
- Tooltip/"em breve" apontando para o Bloco 5.


---

## Fontes

- Banco interno do projeto (métricas aprovadas): `docs/banco-metricas.md`.
- Guide local atualizado (referência principal do tópico): `docs/gsd-guid.md`.
- Documentação oficial do GSD (README): https://github.com/gsd-build/get-shit-done
- User Guide do GSD (Nyquist / validate-phase / waves): https://github.com/gsd-build/get-shit-done/blob/main/docs/USER-GUIDE.md
- Site do projeto (indicadores de adoção): https://gsd.build/
- The New Stack — arquitetura de contexto fresco (200K tokens, 30-40%): https://thenewstack.io/beating-the-rot-and-getting-stuff-done/
- Referência didática (curso/overview do workflow): https://ccforeveryone.com/gsd