# Tópico: BMAD — Framework Ágil para Orquestração de Agentes
## Tópico: 9
## Bloco: 3 — As Ferramentas
## Título: BMAD — Quando o Problema É Coordenação, Não Código

---
**doc ref:** `docs/bmad-guide.md` + referências oficiais (Workflow Map / Agents / Commands)

## Conteúdo

### Abertura — O próximo degrau: de execução para coordenação

Até aqui a gente subiu a régua de maturidade:

- **Spec-Kit**: coloca regras e specs como "constituição" do projeto
- **GSD**: garante execução com contexto fresco e verificação automática

Agora vem um problema diferente. Quando o projeto cresce, o gargalo não é mais *gerar código* — é **coordenar decisões**.

Em qualquer projeto real, qualidade não falha porque "faltou código". Falha porque faltou:
- alinhamento entre quem define, quem projeta e quem implementa,
- decisões arquiteturais explícitas (e não "a gente resolve na hora"),
- rastreabilidade: do requisito → à decisão técnica → à story → ao código,
- validação cruzada entre perspectivas diferentes (produto vs. engenharia vs. QA).

Isso é verdade com times humanos. E é **ainda mais verdade** com agentes IA — porque agentes não têm contexto compartilhado por padrão. Cada conversa começa do zero.

O BMAD aplica uma abordagem conhecida para resolver isso: **princípios ágeis adaptados para o trabalho com agentes IA**. Roles definidos, artefatos como fonte de verdade, cerimônias que geram rastreabilidade.

> Frase-âncora: **No BMAD, documentos são a fonte da verdade. O chat é transitório; o arquivo é governança.**


### O princípio: agile com agentes IA

O problema central que qualquer framework ágil resolve é: *como manter N pessoas (ou agentes) alinhadas enquanto o trabalho avança em paralelo?*

A resposta clássica do agile é: **roles claros + artefatos compartilhados + cerimônias de alinhamento**.

O BMAD traduz isso para o contexto de IA:

| Conceito ágil | No BMAD |
|---|---|
| Roles (PM, dev, QA…) | Agentes com personas e escopos definidos |
| Artefatos (backlog, specs, ADRs) | Arquivos Markdown versionáveis (`PRD.md`, `architecture.md`, `story-*.md`) |
| Cerimônias (planning, review, retro) | Workflows estruturados com gates de qualidade |
| Contexto compartilhado | Cada agente recebe os artefatos relevantes — não depende de memória de chat |

Isso evita o antipadrão do "chat infinito": o que importa não fica preso numa conversa — vira **arquivo versionável** que qualquer agente (ou humano) pode ler.


### O workflow: 4 fases, cada uma alimenta a próxima

O BMAD organiza o trabalho em 4 fases. Cada fase produz artefatos Markdown que viram o contexto da fase seguinte — uma esteira de contexto progressivo.

**1) Analysis (opcional)** — explorar e validar antes de comprometer
- Brainstorming orientado, pesquisa, product brief
- Outputs: relatórios e briefings que reduzem ambiguidade

**2) Planning** — definir *o que* construir e *para quem*
- Output central: `PRD.md` (requisitos funcionais e não-funcionais)
- Se UX importa: `ux-spec.md`

**3) Solutioning** — decidir *como* construir e quebrar em trabalho implementável
- Output central: `architecture.md` com ADRs (Architecture Decision Records)
- Depois: epics e stories + gate de prontidão para implementação

**4) Implementation** — construir com disciplina, story por story
- Sprint tracking (`sprint-status.yaml`), stories individuais, código + testes, code review, retrospectiva

**Por que isso importa:**
Sem essa estrutura, cada agente IA toma decisões independentes. O agente A decide usar REST; o agente B decide GraphQL. O agente A usa snake_case; o B usa camelCase. A arquitetura documentada funciona como **contexto compartilhado obrigatório** — igual a um tech lead que padroniza decisões antes do squad começar a codar.

> Para mudanças pequenas e bem entendidas, existe o **Quick Flow**: um atalho que pula as fases 1-3 e vai direto para tech-spec + implementação. Se o escopo cresce além do esperado, o próprio workflow detecta e sugere escalar para o fluxo completo.


### Os agentes: roles ágeis, não personas de marketing

Cada agente tem um papel definido, workflows específicos e um escopo claro. A tabela abaixo mostra quem faz o quê e quando entra:

| Agente | Papel | Quando entra | O que entrega |
|---|---|---|---|
| Analyst (Mary) | Discovery e pesquisa | Início / incerteza alta | Research e briefs que viram contexto estruturado |
| PM (John) | Definição de produto | Planning + quebra em trabalho | `PRD.md`, epics/stories, correções de curso |
| Architect (Winston) | Decisões técnicas | Solutioning | `architecture.md` + ADRs (padroniza decisões cross-epic) |
| Scrum Master (Bob) | Coordenação de execução | Implementação contínua | Sprint tracking, story readiness, retrospectiva |
| Developer (Amelia) | Implementação | Build cycle | Código + testes a partir da story; code review |
| QA Engineer (Quinn) | Automação de testes | Após épico/feature completo | Suíte de testes para features existentes |
| Quick Flow Solo Dev (Barry) | Mudanças pequenas | Bugs, features simples | Tech-spec + implementação rápida com guardrails |
| UX Designer (Sally) | Experiência do usuário | Quando UX importa | `ux-spec.md` e decisões de experiência |
| Technical Writer (Paige) | Documentação | Quando precisa formalizar | Docs, padrões, diagramas Mermaid, clareza |

O ponto não é memorizar nomes. É entender o princípio: **cada perspectiva tem voz, e cada voz tem um escopo definido**. Isso é o que um squad ágil faz — o BMAD replica isso com agentes.

> Detalhe prático: cada agente tem **triggers** (códigos curtos como `CP`, `DS`, `QA`) para acionar workflows via menu, e **slash commands** (como `/bmad-bmm-create-prd`) para execução direta. O framework também inclui um guia inteligente (`/bmad-help`) que inspeciona o estado do projeto e recomenda o próximo passo — funciona como onboarding contínuo.


### Por que arquitetura documentada evita conflito entre agentes

Este é o argumento técnico central para devs e tech leads.

Quando múltiplos agentes (ou devs) implementam partes diferentes do mesmo sistema, conflitos aparecem se decisões ficam implícitas:

| Sem arquitetura documentada | Com arquitetura (ADRs) |
|---|---|
| Agente A decide REST, Agente B decide GraphQL | ADR define: "GraphQL para toda comunicação client-server" |
| Agente A usa snake_case, Agente B usa camelCase | Padrão documentado: naming conventions explícitas |
| Agente A usa Redux, Agente B usa Context API | ADR define: abordagem de state management |

O `architecture.md` com ADRs funciona como o **tech lead que não está disponível 24h** — as decisões estão documentadas e acessíveis para qualquer agente, a qualquer momento.

Isso não é exclusivo do BMAD como conceito — é boa prática de engenharia. O que o BMAD faz é **embutir essa prática no workflow**, garantindo que a arquitetura seja produzida *antes* da implementação e consumida *por* cada agente durante a implementação.

Existe também um artefato complementar, o `project-context.md`, que funciona como uma "constituição de implementação": regras, padrões e convenções que todos os agentes seguem. Isso conecta diretamente com o conceito de "constituição" que o Spec-Kit introduziu — aqui, aplicado ao nível de execução.


### O que muda para cada persona na audiência

- **Para PMs e gerentes:** ganham um pipeline para transformar intenção em backlog implementável com rastreabilidade. Sabem o que foi decidido, por quê, e onde está documentado.
- **Para devs:** recebem decisões explícitas (arquitetura + ADRs) e stories com contexto completo. Menos adivinhação, menos retrabalho por desalinhamento.
- **Para analistas:** conseguem transformar pesquisa e ambiguidade em artefatos que alimentam o planejamento — e que não se perdem num chat.


### Nota sobre a Creative Intelligence Suite (CIS)
O ecossistema BMAD inclui módulos opcionais além do fluxo ágil principal. A **Creative Intelligence Suite (CIS)** é um deles — focada em criatividade estruturada para early stage (ideação, design thinking, storytelling). É um módulo separado, não parte do fluxo de engenharia. Mencionado aqui apenas para completude do ecossistema.


---

## Métrica de Destaque
**"IA aumenta complexidade do código em ~41% e warnings de análise estática em 30% quando usada sem estrutura."** — Red Hat Developer, 2025

Complemento: **"Organizações com IA estruturada obtêm 20-45% de ganho em produtividade."** — McKinsey, 2025

> A métrica não é sobre o BMAD especificamente — é sobre por que frameworks de coordenação importam.


---

## Notas do Apresentador

**Abertura (20–30s):**
"O GSD resolve execução com qualidade constante. Mas em projetos maiores, o problema muda: não é gerar código, é coordenar decisões. Quem define requisitos? Quem decide a arquitetura? Quem valida? Em times humanos, a gente resolve com agile. Com agentes IA, o BMAD faz o mesmo: roles, artefatos, cerimônias."

**Princípio ágil (15–20s):**
"A ideia não é nova: roles claros, artefatos compartilhados, cerimônias de alinhamento. O BMAD traduz isso para o contexto de agentes IA — onde o 'contexto compartilhado' não existe por padrão."

**Workflow (30–40s):**
"São quatro fases. Cada uma gera artefatos Markdown que alimentam a próxima. Analysis opcional, Planning com PRD, Solutioning com arquitetura e ADRs, Implementation story por story. É uma esteira de contexto progressivo."

**Tabela de agentes (20–30s):**
"Não precisa memorizar nomes. O princípio é: cada perspectiva tem voz e escopo. PM define o quê, Arquiteto define o como, Dev implementa com contexto completo, QA valida. Igual a um squad — o onboarding é que leva segundos."

**ADRs e conflitos (20–30s):**
"Quando dois agentes mexem no mesmo sistema sem alinhamento, um decide REST e o outro GraphQL. A arquitetura documentada resolve isso — funciona como um tech lead disponível 24h. Não é feature do BMAD, é boa prática de engenharia embutida no workflow."

**Métricas (15–20s):**
"Red Hat mediu: IA sem estrutura aumenta complexidade do código em 41%. McKinsey: com IA estruturada, produtividade sobe 20 a 45%. A ferramenta importa menos que o princípio — estrutura de coordenação."

**Fechamento (10–15s):**
"BMAD não é sobre mais IA. É sobre aplicar o que já sabemos de agile — roles, artefatos, rastreabilidade — ao trabalho com agentes."


---

## Experiência Visual e Interativa

### Cena 1 — "Esteira de Contexto" (Context Pipeline)
- Animação de 4 blocos conectados (Analysis → Planning → Solutioning → Implementation).
- Conforme o usuário avança, artefatos aparecem fluindo entre blocos: `PRD.md` sai de Planning e entra em Solutioning, `architecture.md` sai de Solutioning e entra em Implementation.
- Cada artefato tem tooltip: "produzido por [agente]" e "consumido por [agente]".
- Visual: esteira industrial tech/Matrix com partículas verdes fluindo entre os blocos.

### Cena 2 — "Squad Board" (Painel de Agentes)
- Layout de quadro de squad com cards de agentes.
- Ao clicar/hover num agente, expande mostrando:
  - Papel (1 linha),
  - 2 outputs principais,
  - Quando entra no workflow.
- Sem triggers visíveis no layout principal — mantém limpo. Triggers disponíveis num tooltip discreto para quem quiser.

### Cena 3 — "Conflict Resolver" (Por que ADRs existem)
- Mini-simulação visual dividida em dois painéis:
  - **Painel esquerdo "Sem Arquitetura":** dois agentes fazendo escolhas divergentes (REST vs GraphQL, snake_case vs camelCase) — linhas cruzadas, ícones de conflito.
  - **Painel direito "Com ADRs":** mesmos agentes, mesmas decisões, mas agora alinhados — linhas paralelas, ícone de check.
- Toggle interativo para alternar entre os dois estados.

### Cena 4 — "O que muda para você" (Persona Cards)
- 3 cards lado a lado: PM | Dev | Analista
- Cada card mostra em 2 linhas: "antes" (problema) vs. "com framework ágil" (resolução).
- Animação: cards viram ao clicar, revelando o "depois".


---

## Fontes

### Métricas utilizadas
- IA aumenta complexidade em ~41%: Red Hat Developer, out/2025 — https://developers.redhat.com/articles/2025/10/22/how-spec-driven-development-improves-ai-coding-quality
- McKinsey 20-45% produtividade com IA estruturada: Red Hat Developer (citando McKinsey 2025) — mesma fonte acima

### Documentação oficial BMAD
- Workflow Map: https://docs.bmad-method.org/reference/workflow-map/
- Agents (BMM default): https://docs.bmad-method.org/reference/agents/
- Commands: https://docs.bmad-method.org/reference/commands/
- Modules (inclui CIS): https://docs.bmad-method.org/reference/modules/
- Quick Flow: https://docs.bmad-method.org/explanation/quick-flow/
- Preventing Agent Conflicts: https://docs.bmad-method.org/explanation/preventing-agent-conflicts/
- Project Context: https://docs.bmad-method.org/explanation/project-context/

### Referências internas do projeto
- `docs/estrutura-slides.md`
- `docs/banco-metricas.md`
- `docs/bmad-guide.md`