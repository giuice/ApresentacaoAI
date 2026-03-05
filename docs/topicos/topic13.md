# Tópico: Skills que Agora Importam

## Tópico: 13
## Bloco: 4 — O Novo Papel
## Título: As 5 Skills do Context Engineer

---

## Conteúdo

### Abertura — O Gap de Skills

Depois de entender que o dev virou orquestrador (Tópico 11) e que a IA nivela a execução mas não nivela o julgamento (Tópico 12 — Paradoxo do Júnior), a pergunta natural é: **o que exatamente eu preciso aprender?**

A Gartner prevê que 80% da força de trabalho de engenharia precisará fazer upskilling até 2027. Mas upskilling em quê? A resposta não é "aprender a nova framework da moda". É desenvolver um novo conjunto de competências que não existiam formalmente há 2 anos.

São 5 skills. Nenhuma delas é sobre escrever código mais rápido.

---

### As 5 Skills do Context Engineer

#### 1. Context Design
**O que é:** Projetar todo o ambiente de informação que a IA recebe — não apenas o prompt, mas os documentos, as regras, o histórico, as restrições, o papel que ela deve assumir.

**Por que importa:** A diferença entre uma IA que alucina e uma que entrega código consistente não é o modelo — é o contexto. Times que dominam context design entregam resultados sistematicamente; os que não dominam dependem de sorte.

**Na prática:** Criar e manter arquivos como `project-context.md` (BMAD), a constituição do projeto (Spec-Kit), ou o `CONTEXT.md` por fase (GSD). Definir o que a IA precisa saber antes que ela comece a trabalhar.

**Conexão com as ferramentas:**
- **Spec-Kit:** A constituição do projeto (`memory/constitution.md`) é o exemplo canônico — 9 artigos que definem as regras imutáveis que todo agente deve seguir. Os templates agem como prompts sofisticados que constringem o LLM para outputs de qualidade.
- **GSD:** Cada executor recebe 200K tokens de contexto limpo. O `CONTEXT.md` por fase captura decisões do desenvolvedor. O context rot é combatido arquiteturalmente — nunca ultrapassando 30-40% da janela no contexto principal.
- **BMAD:** O `project-context.md` funciona como constituição de implementação. Carregado automaticamente por todo workflow de implementação. O arquivo de arquitetura com ADRs (Architecture Decision Records) garante que decisões técnicas sejam contexto explícito, não implícito.

---

#### 2. Spec Writing
**O que é:** Documentar intenção de forma executável — não como documentação que ninguém lê, mas como blueprints que geram código.

**Por que importa:** Com boas specs, a IA gera 90% do código, economizando 50%–80% do tempo de implementação. Sem specs, a IA gera código que funciona no demo e quebra em produção. A spec é a planta arquitetônica executável — sem ela, você está gritando instruções para um pedreiro sem planta.

**Na prática:** Escrever user stories com critérios de aceitação em Given/When/Then. Definir requisitos funcionais e não-funcionais com precisão suficiente para que um agente os implemente sem ambiguidade. Usar marcadores explícitos de incerteza (`[NEEDS CLARIFICATION]`) ao invés de adivinhar.

**Conexão com as ferramentas:**
- **Spec-Kit:** O coração da metodologia. O comando `/speckit.specify` transforma uma descrição em spec estruturada. Os templates forçam o LLM a manter o nível certo de abstração — `WHAT` e `WHY`, nunca `HOW`. Marcadores de `[NEEDS CLARIFICATION]` impedem que o LLM adivinhe.
- **GSD:** O `REQUIREMENTS.md` com IDs rastreáveis é a spec do projeto. Cada fase tem planos atômicos com tarefas específicas — a spec se desdobra em unidades executáveis.
- **BMAD:** O fluxo PRD → Architecture → Epics → Stories é um pipeline de refinamento de specs. Cada nível adiciona detalhe técnico mantendo rastreabilidade com requisitos originais. O PM agent guia a criação de FRs/NFRs com precisão de implementação.

---

#### 3. Orquestração
**O que é:** Saber dividir um problema complexo em tarefas para agentes especializados, coordenar a execução e garantir que as partes se integrem.

**Por que importa:** A Gartner registrou um aumento de 1.445% nas consultas sobre sistemas multi-agentes entre Q1/2024 e Q2/2025. Não é hype — é o reconhecimento de que um único agente genérico não resolve problemas complexos. Assim como um time de software tem PM, arquiteto, dev e QA, os agentes precisam de especialização e coordenação.

**Na prática:** Definir qual agente faz o quê. Sequenciar tarefas respeitando dependências. Decidir o que pode rodar em paralelo. Saber quando escalar de um agente solo para um time multi-agente.

**Conexão com as ferramentas:**
- **Spec-Kit:** O pipeline `specify → plan → tasks` é orquestração em 3 passos. O comando `/speckit.tasks` analisa o plano e marca tarefas independentes com `[P]` para execução paralela. A spec é o contrato compartilhado que permite que agentes diferentes trabalhem na mesma feature.
- **GSD:** Orquestração é o DNA do GSD. O `execute-phase` analisa dependências e distribui tarefas em waves paralelas — cada executor recebe um contexto limpo de 200K tokens. O `plan-phase` coordena 4 researchers paralelos (stack, features, arquitetura, pitfalls) antes de gerar o plano.
- **BMAD:** O time virtual completo (PM, Architect, Dev, QA, SM, UX) é orquestração por design. Cada agente tem escopo definido, menu de workflows e persona especializada. O `party-mode` coloca todos os agentes numa conversa para decisões cross-cutting.

---

#### 4. Validação
**O que é:** Saber avaliar criticamente o que a IA produziu — não apenas se funciona, mas se é correto, seguro, consistente e manutenível.

**Por que importa:** "Verificação humana será a habilidade mais valiosa no pipeline de entrega de software" (DevOps Digest, previsões 2026). O conhecimento técnico não desaparece — ele migra de atividade primária para conhecimento de fundo que informa revisão e julgamento. Você precisa entender como boilerplate funciona para avaliar se o boilerplate gerado pela IA está correto. Você só não precisa mais digitá-lo.

**Na prática:** Revisar diffs de código gerado por agentes. Identificar hallucinations arquiteturais. Validar se a implementação respeita as decisões da spec. Executar adversarial reviews onde você *assume* que há problemas e os procura ativamente.

**Conexão com as ferramentas:**
- **Spec-Kit:** Os checklists nos templates funcionam como "unit tests" para a spec — cada item é uma verificação explícita de completude e qualidade. Os phase gates (Simplicity Gate, Anti-Abstraction Gate) forçam o LLM a justificar complexidade.
- **GSD:** O `verifier` pós-execução compara o codebase contra os objetivos da fase. O `plan-checker` valida planos em até 3 iterações antes de aprovar. A Nyquist Validation Layer mapeia cobertura de testes automatizados para cada requisito antes de escrever código.
- **BMAD:** O `code-review` workflow usa adversarial review — o revisor *deve* encontrar problemas, zero findings dispara re-análise. O `check-implementation-readiness` valida coesão entre todos os documentos de planejamento antes de implementar. A advanced elicitation força a IA a reconsiderar seu próprio output com métodos de raciocínio específicos.

---

#### 5. System Design for AI
**O que é:** Arquitetar sistemas onde IA é componente de primeira classe — não um add-on, mas parte estrutural do pipeline de desenvolvimento e operação.

**Por que importa:** O futuro não é "usar IA para codar". É projetar sistemas que incorporam IA em loops de feedback, validação automatizada, geração contínua e monitoramento. O engenheiro que só sabe pedir código para a IA está um nível abaixo do que projeta o sistema que orquestra múltiplas IAs.

**Na prática:** Projetar pipelines de CI/CD que incluem validação de IA. Definir como contexto flui entre agentes. Criar frameworks de avaliação para outputs não-determinísticos. Decidir qual modelo usar para qual tarefa (routing multi-modelo). Projetar feedback loops onde métricas de produção alimentam refinamento de specs.

**Conexão com as ferramentas:**
- **Spec-Kit:** O conceito de bidirectional feedback — métricas de produção alimentam evolução de specs — é system design para IA. A constituição com artigos imutáveis é uma decisão arquitetural sobre como constringir agentes.
- **GSD:** Os model profiles (quality/balanced/budget) com routing por agente são system design em ação. A arquitetura de Nyquist Validation — mapear cobertura de testes automatizados antes de escrever código — é projetar o sistema de feedback do pipeline.
- **BMAD:** O workflow engine que carrega automaticamente project-context em todo workflow de implementação é infra de contexto. O sistema de módulos (BMM, TEA, CIS, GDS) é arquitetura modular para agentes especializados. O BMad Builder permite criar novos agentes e workflows — é meta-system-design.

---

### Mapa: Skills × Ferramentas

| Skill | Spec-Kit | GSD | BMAD |
|-------|----------|-----|------|
| **Context Design** | Constituição do projeto, templates que constringem LLMs | Contexto fresco 200K por executor, CONTEXT.md por fase | project-context.md, ADRs na arquitetura |
| **Spec Writing** | `/speckit.specify`, marcadores `[NEEDS CLARIFICATION]` | REQUIREMENTS.md com IDs, planos atômicos | PRD → Architecture → Stories pipeline |
| **Orquestração** | `specify → plan → tasks`, tarefas `[P]` paralelas | Waves paralelas, 4 researchers simultâneos | Time virtual PM/Arch/Dev/QA/SM/UX |
| **Validação** | Checklists como unit tests, phase gates | Verifier, plan-checker (3 iterações), Nyquist Layer | Adversarial review, implementation readiness check |
| **System Design for AI** | Feedback bidirecional specs↔produção | Model profiles com routing por agente | Workflow engine, sistema modular, BMad Builder |

---

### Encerramento — Tom de Empoderamento

"São 5 skills. Nenhuma exige que você volte para a faculdade. Todas podem ser desenvolvidas no próximo projeto que você começar.

Escolha uma. Context Design é a mais fundamental — sem ela, nenhuma das outras funciona bem. Spec Writing é a mais imediatamente aplicável — você pode começar hoje com um template. Orquestração e Validação crescem naturalmente conforme você usa as ferramentas. System Design for AI é o horizonte — onde você quer estar em 12 meses.

O ponto não é dominar as 5 de uma vez. É parar de investir 100% do seu tempo na skill que a IA já faz bem — escrever código — e começar a investir nas 5 que só você pode fazer."

---

## Métrica de Destaque

**80% dos engenheiros precisarão fazer upskilling até 2027** (Gartner, outubro 2024)

Métricas de suporte:
- +1.445% de aumento em consultas sobre sistemas multi-agentes (Gartner, Q1/2024→Q2/2025)
- "Verificação humana será a skill mais valiosa no pipeline de entrega de software" (DevOps Digest, 2026)
- Com boas specs: 90% do código gerado, 50%–80% de economia de tempo (Banco de Métricas)

---

## Notas do Apresentador

**[ABERTURA — ~30s]**
"No tópico 11 vimos que o dev virou orquestrador. No 12, que a IA nivela a execução mas cria o paradoxo do júnior. A pergunta óbvia é: ok, mas o que eu preciso aprender? A Gartner diz que 80% dos engenheiros precisam de upskilling até 2027. Mas upskilling em quê? Vou mostrar 5 skills. Nenhuma é sobre escrever código mais rápido."

**[TIMELINE — "UM DIA NA VIDA" — ~3-4 min]**
Narrar a timeline como se fosse um dia real. A cada momento do dia, nomear a skill e explicar:

- **8:30 — Revisão matinal (VALIDAÇÃO):** "Você chega e revisa os PRs que dois agentes geraram durante a noite. Um dashboard ficou bom, o outro escolheu uma biblioteca que você não quer usar. Você sabe avaliar porque entende a arquitetura. A IA digitou, você julgou."

- **9:15 — Spec da feature nova (SPEC WRITING):** "Product pediu um sistema de notificações. Em vez de abrir o Cursor e começar a codar, você abre o template de spec. Define user stories, critérios de aceitação em Given/When/Then, marca o que não está claro com [NEEDS CLARIFICATION]. Em 30 minutos, você tem um contrato executável."

- **10:00 — Configuração do pipeline (ORQUESTRAÇÃO):** "A spec está pronta. Você configura quais agentes vão trabalhar: o pesquisador analisa bibliotecas de WebSocket, o planejador gera o plano técnico, o executor vai implementar em waves paralelas. Você define a sequência, as dependências, o que pode rodar simultâneo."

- **11:30 — Ajuste de contexto (CONTEXT DESIGN):** "O executor do primeiro wave não respeitou a convenção de nomes. Você atualiza o project-context.md com a regra que faltava. Cada executor futuro vai receber essa informação automaticamente. Você não corrigiu código — corrigiu contexto."

- **14:00 — Arquitetura do feedback loop (SYSTEM DESIGN FOR AI):** "O gerente pede para automatizar mais. Você projeta um pipeline onde métricas de produção alimentam automaticamente a priorização de specs. Define qual modelo usar para cada tipo de tarefa: Opus para planejamento, Sonnet para execução, Haiku para verificação. Isso não é usar IA — é projetar sistemas que incorporam IA."

**[MAPA SKILLS × FERRAMENTAS — ~1 min]**
"Cada uma das 3 ferramentas que vimos — Spec-Kit, GSD e BMAD — exercita essas 5 skills de formas diferentes. [mostrar tabela] Context Design é fundação de todas. Spec Writing é o core do Spec-Kit. Orquestração é DNA do GSD. Validação é obsessão do BMAD. System Design é o horizonte onde todas convergem."

**[ENCERRAMENTO — ~30s]**
"São 5 skills. Nenhuma exige voltar para a faculdade. Escolha uma e comece no próximo projeto. Context Design é a mais fundamental. Spec Writing é a mais imediata. O ponto não é dominar as 5 de uma vez — é parar de investir 100% do tempo na skill que a IA já faz bem, e começar a investir nas que só você pode fazer."

---

## Experiência Visual e Interativa

### Conceito: "O Dia do Orquestrador" — Timeline Interativa

**Layout principal:** Uma timeline horizontal (ou vertical em mobile) estilo terminal/Matrix — timestamps em verde neon (`08:30`, `09:15`, etc.) com código fluindo sutilmente no background.

**Mecânica de revelação:**
- Cada bloco de horário começa colapsado, mostrando apenas o timestamp e o nome da skill em destaque
- Ao scrollar (ou click do apresentador), o bloco se expande com animação de "digitação" (typewriter effect em verde sobre fundo escuro)
- O conteúdo aparece progressivamente: primeiro a cena ("Você chega e revisa PRs..."), depois o nome da skill se ilumina, depois o ícone da ferramenta associada pulsa

**Elementos visuais por skill:**
1. **VALIDAÇÃO (8:30):** Ícone de lupa/shield. Animação de diff de código sendo revisado — linhas verdes (aprovadas) e vermelhas (rejeitadas) aparecendo.
2. **SPEC WRITING (9:15):** Ícone de blueprint/documento. Animação de template sendo preenchido progressivamente, com marcadores `[NEEDS CLARIFICATION]` pulsando em amarelo.
3. **ORQUESTRAÇÃO (10:00):** Ícone de nós conectados/workflow. Animação de agentes (representados como nós) sendo ativados em sequência e em paralelo — linhas conectoras se iluminando.
4. **CONTEXT DESIGN (11:30):** Ícone de cérebro/database. Animação de arquivo sendo editado e a informação "propagando" para múltiplos agentes simultaneamente (efeito ripple).
5. **SYSTEM DESIGN FOR AI (14:00):** Ícone de arquitetura/circuito. Animação de pipeline com feedback loop — dados fluindo de produção de volta para specs, modelos diferentes sendo roteados.

**Seção de encerramento:**
- Após a timeline, transição para o **Mapa Skills × Ferramentas** como tabela interativa
- Cada célula da tabela, ao hover, mostra um tooltip com o exemplo concreto
- A frase de empoderamento aparece em typewriter com highlight nas palavras-chave

**Easter egg interativo (opcional):**
- Um mini-quiz "Qual é seu gap?" onde a audiência pode tocar em cada skill e ver uma auto-avaliação rápida (1 frase descrevendo "você provavelmente já tem essa skill se..." e "você precisa desenvolver se...")

### Paleta e Estilo
- Background: preto com matrix rain sutil (caracteres menores, mais lentos que nos tópicos anteriores — tom mais reflexivo)
- Timestamps: verde neon (#00ff41)
- Skills: cada uma com uma cor de acento diferente mas harmônica (verde, ciano, amarelo, magenta, azul)
- Texto principal: branco com glow sutil
- Animações: suaves, typewriter-based — menos "explosivo" que tópicos anteriores, mais "construção progressiva"

---

## Fontes

- **Gartner (out/2024):** 80% da força de trabalho de engenharia precisará de upskilling até 2027. Fonte: [Gartner Press Release](https://www.gartner.com/en/newsroom/press-releases/2024-10-03-gartner-says-generative-ai-will-require-80-percent-of-engineering-workforce-to-upskill-through-2027)
- **Gartner (via DEV.to, 2026):** +1.445% de aumento em consultas sobre sistemas multi-agentes Q1/2024→Q2/2025
- **DevOps Digest (2026):** "Human verification will become the most valuable skill in software delivery" — previsões de líderes de DevOps para 2026. Fonte: [DevOps Digest](https://www.devopsdigest.com/2026-devops-predictions-5)
- **PinkLime (2026):** "From Developer to Orchestrator: The New Role AI Created" — descrição do dia-a-dia do orquestrador. Fonte: [PinkLime](https://pinklime.io/blog/developer-to-orchestrator-role)
- **Faros AI (dez/2025):** "Em 2026, os times que entregam código confiável gerado por IA serão os que dominam quais informações seus agentes veem, quando, e como estão estruturadas." Fonte: [Faros AI](https://www.faros.ai/blog/context-engineering-for-developers)
- **CDO Trends (2025):** Desenvolvedores mais eficazes complementam código com domínio de contexto persistente e de alta qualidade. Fonte: [CDO Trends](https://www.cdotrends.com/story/4831/2025-year-context-became-king-and-how-developers-are-wielding-it)
- **McKinsey/QuantumBlack (fev/2026):** Agentic workflows para desenvolvimento de software — orquestração determinística + execução bounded de agentes. Fonte: [Medium - QuantumBlack](https://medium.com/quantumblack/agentic-workflows-for-software-development-dc8e64f4a79d)
- **InfoQ (jan/2026):** "Architecture is no longer advisory; it is executable and enforceable" — SDD como shift de 5ª geração. Fonte: [InfoQ](https://www.infoq.com/articles/spec-driven-development/)
- **MIT Technology Review (nov/2025):** "From vibe coding to context engineering: 2025 in software development" — validação institucional do arco narrativo. Fonte: [MIT Tech Review](https://www.technologyreview.com/2025/11/05/1127477/from-vibe-coding-to-context-engineering-2025-in-software-development/)
- **Banco de Métricas do projeto:** Com boas specs: 90% do código gerado, 50%–80% de economia de tempo