# Tópico: Bastidores — Como esta aplicação foi construída
## Tópico: 18
## Bloco: Apêndice — Bastidores Técnicos
## Título: Do briefing ao deploy: como a ApresentacaoAI foi construída com VS Code, BMAD e uma esteira híbrida de agentes

## Conteúdo

### Abertura — a forma de construir virou parte da mensagem
Esta aplicação fala sobre a transição do “Vibe Coding” para a **Engenharia de Contexto**. O ponto mais interessante dos bastidores é que ela própria foi construída desse jeito: não nasceu de um prompt único pedindo “faz tudo”, mas de uma esteira com **briefing, PRD, arquitetura, UX, épicos, stories, implementação, review e validação**.

Em outras palavras: o projeto não apenas **explica** Context Engineering para a plateia. Ele também **demonstra** Context Engineering no próprio processo de construção.

O cockpit principal foi o **VS Code**, com uso combinado de **Copilot CLI**, **GitHub Copilot**, **Claude**, **Codex** e a disciplina operacional do **BMAD** para organizar contexto, dividir trabalho e manter rastreabilidade.

---

### Linha do tempo verificável

#### 04/03 — Setup do método antes do código
O primeiro commit registrado foi **“Inicio do projeto e setup BMAD e AGENTS.md”**. Isso mostra uma decisão importante: antes de construir o app React, foi montado o sistema operacional do projeto.

No mesmo dia, os artefatos de planejamento já apareceram no repositório:
- `product-brief-ApresentacaoAI-2026-03-04.md`
- `prd.md`
- `architecture.md`
- `ux-design-specification.md`
- `project-context.md`

Também nesse início foram consolidados os tópicos narrativos em `docs/topicos/`, ou seja: **a história da apresentação foi estabilizada antes da implementação React**.

#### 05/03 — O app ganha estrutura real
No dia seguinte, a timeline mostra a virada do planejamento para execução:
- **“Estrutura criada”**
- **“story 1-1-inicializacao-e-configuracao-do-projeto”**
- **“story 1.3 shell layout”**
- **“feat: implement lazy loading and progress bar for presentation topics”**

Na prática, isso significa:
- inicialização do projeto com **Vite + React + TypeScript**
- estrutura de pastas e testes
- shell da apresentação
- barra de progresso
- lazy loading dos tópicos

Os artefatos das stories também registram que essa fase já incluía **testes e correções pós-review**, não só geração inicial de código.

#### 06/03 — Identidade visual, narrativa e paralelismo real
O dia 06/03 é o mais intenso da timeline. Pela manhã aparecem:
- `useHashSync` com testes
- retrospectiva do Epic 1
- início e conclusão do Epic 2 (tema Matrix, transições, background, animações)

Depois, o projeto entra no Epic 3 e logo em seguida no Epic 4. É aqui que aparece um dos logs mais reveladores do processo:

> `/dev-story vamos desenvolver as stories 4.1 → 4.2 → 4.3 → 4.4 (tópicos independentes) lance agentes para trabalhar nisso simultaneamente`

O resultado registrado no `session_store` foi exatamente o que o prompt sugeria: **agentes trabalhando em paralelo** para implementar os Tópicos 6, 7, 8 e 9, com criação de arquivos como:
- `topic6Data.ts`
- `topic7Data.ts`
- `topic8Data.ts`
- `topic9Data.ts`

Além disso, a execução foi fechada com validação explícita por:
- `npm test`
- `npm run build`

Esse é um momento importante para mostrar à plateia que multiagente aqui não foi discurso. Foi **execução paralela de stories independentes**, com rastros concretos.

#### 08/03 — BMAD como fábrica de contexto para o Epic 5
Em 08/03, o log mostra outro padrão operacional forte: uso do BMAD para gerar contexto antes de codar.

Prompt recuperado literalmente:

> `Fleet deployed: vamos @.agents\skills\bmad-bmm-create-story\ todas as stories do epic 5 por favor carregue o workflow de contexto e delegue pra agentes`

O que aconteceu depois, segundo os logs e artefatos:
- o workflow de contexto gerou as stories `5-1` até `5-6`
- os arquivos foram salvos em `_bmad-output/implementation-artifacts`
- a validação rodou **antes e depois** com `npm run test && npm run build`

Esse trecho ilustra bem o papel do BMAD no projeto: **não como “gerador de código mágico”, mas como motor de preparação de contexto e gestão de workflow**.

#### 09/03 — Epic 5, deploy e mudança de escopo controlada
No dia 09/03 aparecem três movimentos diferentes:

1. **Implementação do Epic 5**
   - commit: **“stories do epico 5”**
   - commit: **“epico 5 finalizado(sem review)”**

2. **Preparação de entrega**
   - commit: **“feat: configure GitHub Pages deployment”**
   - o único workflow encontrado no GitHub foi o de deploy para GitHub Pages, criado em `2026-03-09T11:35:00-03:00`

3. **Mudança de escopo já no final do projeto**
   - surgimento do `topic17-bonus.md`
   - pedido para aprofundar comandos, threads, plan e fleet
   - depois, um pedido explícito para incluir um **deep dive técnico de 8 minutos**

O mais didático para a plateia é que essa mudança não entrou como “remendo”. Ela abriu uma nova trilha de trabalho:
- atualização de `prd.md`
- atualização de `epics.md`
- atualização de `architecture.md`
- atualização de `ux-design-specification.md`
- criação dos artefatos do **Epic 6**

Ou seja: quando o escopo mudou, o projeto voltou para a camada de especificação antes de seguir para a implementação. Isso é **governança de contexto na prática**.

#### 10/03 — Polimento fino após a expansão
No dia 10/03, a timeline registra:
- **“fix: ensure reduceMotion defaults to false in Topic17 component”**
- **“feat: add tech specs for Mobile Navigation and Topic 17 redesign”**

Essa fase mostra o comportamento típico de finalização madura:
- correção pontual de comportamento
- documentação complementar
- ajustes finos em cima de uma feature recém-introduzida

Não é mais construção de base; é **refinamento com rastreabilidade**.

---

### O workflow BMAD que estruturou o projeto
O fluxo observável no repositório foi este:

1. **Setup BMAD e instruções do projeto**
2. **Product Brief**
3. **PRD**
4. **Arquitetura**
5. **UX Design**
6. **Épicos**
7. **Stories de contexto em `_bmad-output/implementation-artifacts`**
8. **`dev-story` para implementar com testes e build**
9. **Review + atualização de `sprint-status.yaml`**
10. **Retrospectiva / ajuste de escopo quando necessário**

O `sprint-status.yaml` deixa isso muito explícito. Ele registra os estados:
- `ready-for-dev`
- `in-progress`
- `review`
- `done`

E traz uma regra especialmente interessante para contar ao público:

> **“Dev moves story to review, then runs code-review (fresh context, different LLM recommended)”**

Isso mostra que o review não era tratado como detalhe opcional, mas como uma etapa formal do workflow.

---

### Qual ferramenta/modelo apareceu onde
Os artefatos não registram todo o histórico de interação, mas registram **vários modelos explicitamente** nas stories. O quadro abaixo é representativo:

| Faixa do projeto | Evidência nos artefatos | Ferramenta/modelo explicitamente salvo |
|---|---|---|
| Stories 1.1 e 1.2 | setup e navegação base | `Codex (GPT-5)` |
| Stories 1.3 a 3.3 | shell, overview, hash, design system inicial, primeiros componentes | `Claude Opus 4.6` |
| Stories 3.4 a 3.7 | tópicos narrativos 2–5 | `GPT-5 Codex` |
| Story 4.1 | Topic 6 | `GPT-5 (GitHub Copilot CLI)` |
| Story 4.2 | Topic 7 | `GPT-5.1 (GitHub Copilot CLI)` |
| Story 4.3 | Topic 8 | `GPT-5.2 (GitHub Copilot CLI)` |
| Story 4.4 | Topic 9 | `GitHub Copilot CLI (GPT-5)` |
| Stories 4.5 e 4.6 | componentes do Topic 10 | `Claude Opus 4.6` |
| Story 4.7 | Topic 10 | `GPT-5.4 (GitHub Copilot)` |
| Epic 5 (mix) | Topics 11–16 | `claude-sonnet-4-6`, `Claude Sonnet 4.6`, `GitHub Copilot CLI (GPT-5.4)` |

O que isso conta para a plateia é simples: **o projeto não foi feito por uma única IA em modo monolítico**. Ele foi construído com uma **esteira híbrida**, alternando ferramenta/modelo conforme contexto, fase e preferência operacional do momento.

Importante: **esses são apenas os modelos que ficaram gravados nos artefatos**. Podem ter existido outras interações no VS Code que não ficaram persistidas nesse ambiente.

---

### Como o review parecia funcionar na prática
Os dados sugerem um padrão de review principalmente **local, orientado por CLI e registrado nos próprios artefatos**, e não por PR no GitHub.

Evidências:
- `sprint-status.yaml` formaliza a passagem da story para `review`
- a Story 1.1 registra **`Senior Developer Review (AI)`** com reviewer explícito: `Codex (GPT-5)`
- várias stories registram **correções pós-review**
- exemplos:
  - Story 1.1: correções em `strict`, `framer-motion`, `strictPort`, escopo do Tailwind e import sem extensão
  - Story 4.2: correções de design system e layout
  - Story 4.5: review aprovado após ajustes de robustez no tooltip
  - Story 4.7: review aprovado após ajustes de navegação por teclado no `DecisionWizard`

Ao mesmo tempo, a timeline também mostra pragmatismo: o commit **“epico 5 finalizado(sem review)”** indica que nem toda rodada fechou com o review completo antes do fechamento do bloco.

Outro dado relevante: **nenhum pull request foi encontrado** no repositório no momento da consulta. Então, com a evidência disponível, o review parece ter acontecido principalmente em:
- fluxo local no VS Code
- Copilot CLI / BMAD
- artefatos de story
- rodadas de `npm test` e `npm run build`

---

### Prompts e comandos recuperados literalmente dos logs

#### Prompts/commands de orquestração
> `/dev-story vamos desenvolver as stories 4.1 → 4.2 → 4.3 → 4.4 (tópicos independentes) lance agentes para trabalhar nisso simultaneamente`

> `Fleet deployed: vamos @.agents\skills\bmad-bmm-create-story\ todas as stories do epic 5 por favor carregue o workflow de contexto e delegue pra agentes`

#### Pedidos em linguagem natural que alteraram escopo
> `esse projeto é uma apresentaçào sobre desenvolvimento com inteligencia artificial. A gente já estruturou os tópicos no folder @docs\topicos\ , temos 16 topicos, e eu gostaria de acrecentar mais um com dicas sobre como utilizar o copilot(voce) os novos commandos, fleet, thread, como lancar multi-agentes...`

> `acho melhor adicionar ao 17 pois o bmad é chato com mudança , toda vez que surge novo codigo vc tem que adicionar ao epico, mudar prd etc... entao crie a seçao deep dive`

#### Comandos de validação que aparecem repetidamente nos artefatos
- `npm run dev`
- `npm test`
- `npm run build`
- `npm test -- src/__tests__/topic7.test.tsx`
- `npm test -- src/__tests__/topic9.test.tsx`
- `npm test -- liveTable.test.tsx decisionWizard.test.tsx topic10.test.tsx --run`

Esses exemplos ajudam a mostrar que havia um padrão recorrente:
**gerar contexto → implementar → validar → revisar → ajustar**.

---

### O que essa timeline ensina
Para a plateia, o aprendizado não é “qual modelo ganhou”. O aprendizado é outro:

1. **Ferramenta sem método gera velocidade instável**
2. **Workflow com contexto reduz retrabalho**
3. **Multiagente funciona melhor quando a tarefa já está quebrada em stories**
4. **Review precisa de contexto fresco e evidência**
5. **Quando o escopo muda, a especificação precisa mudar junto**

Esse projeto virou um bom estudo de caso porque foi construído exatamente assim:
**não no improviso contínuo, mas em ondas de contexto, execução e validação**.

---

### Limitações das evidências
Para manter rigor técnico, vale deixar claro para a audiência o que **foi recuperado** e o que **não foi recuperado**:

- os modelos citados acima são apenas os que ficaram gravados nos artefatos de stories
- podem ter existido outras interações em VS Code, GitHub Copilot Chat, Claude ou Codex que não ficaram persistidas nesse ambiente
- o `session_store` recuperou apenas parte das sessões, não a totalidade da jornada
- não foram encontrados PRs no GitHub, então não há como reconstruir threads de review por PR porque, ao que tudo indica, elas não existiram nesse repositório

Essa honestidade é importante porque transforma o tópico em **bastidor técnico auditável**, e não em storytelling inventado depois.

## Métrica de Destaque
**Em 6 dias corridos, o projeto saiu de setup BMAD + briefing para uma aplicação com 6 épicos mapeados, 17 tópicos implementados/planejados no fluxo, validações recorrentes com `npm test` + `npm run build` e deploy configurado no GitHub Pages.**

## Notas do Apresentador

### Roteiro de fala (~7–8 minutos)

**[Abertura — 40s]**  
“Essa aplicação não foi feita como um experimento de prompt solto. Ela foi construída exatamente do jeito que a própria apresentação defende: com contexto, workflow, review e rastreabilidade.”

**[Dia 1 — 60s]**  
“O primeiro movimento não foi abrir React e sair codando. Foi montar BMAD, AGENTS, product brief, PRD, arquitetura, UX e os tópicos. Ou seja: antes do código, foi criada a máquina de decisão.”

**[Dia 2 — 60s]**  
“Depois veio a base operacional: Vite, React, TypeScript, shell, overview, teclado, lazy loading, hash sync. A aplicação começou pelo esqueleto de apresentação, não pelo efeito visual.”

**[Dia 3 — 90s]**  
“No Epic 4 aparece uma coisa muito concreta: multiagente de verdade. Existe log do comando `/dev-story` pedindo quatro stories independentes em paralelo. O resultado foi Topic6, 7, 8 e 9 implementados com data files, testes dedicados e build validado.”

**[Factory de stories — 75s]**  
“Depois, no Epic 5, o BMAD entrou como fábrica de contexto. O log mostra o pedido para lançar o workflow `create-story` em fleet mode e delegar as stories do épico. Ou seja: antes de implementar, foi produzido contexto suficiente para várias frentes andarem em paralelo.”

**[Review e governança — 75s]**  
“O review não aparece como PR no GitHub. Ele aparece dentro do processo local: `review` no sprint-status, ‘Senior Developer Review’ em artefatos e correções pós-review nas próprias stories. Em alguns casos houve rigor completo; em outros, o próprio histórico mostra um fechamento ‘sem review’. Isso é importante porque mostra a realidade do time, não uma versão romantizada.”

**[Mudança de escopo — 60s]**  
“Quando surgiu o Tópico 17, o projeto não recebeu um patch solto. Atualizou PRD, épicos, arquitetura e UX. Isso é o momento em que a apresentação deixa de ser só sobre contexto engineering e vira prova viva de contexto engineering.”

**[Fechamento — 40s]**  
“Se eu tivesse que resumir em uma frase: não foi uma IA fazendo tudo; foi um ambiente de trabalho no VS Code usando várias IAs com papéis diferentes, amarradas por método, stories, validação e revisão.” 

### Frases curtas de impacto
- “A aplicação foi construída como o próprio argumento que ela defende.”
- “Não foi um prompt só; foi uma esteira.”
- “A diferença não foi usar IA. Foi usar IA com workflow.”

## Experiência Visual e Interativa
- **Timeline horizontal neon** de `04/03` a `10/03`, com cada dia abrindo cards de commit, artefatos BMAD e eventos de validação.
- **Swimlanes por tipo de evidência**: `Git`, `session_store`, `_bmad-output`, `GitHub`.
- **Painel lateral em estilo terminal** exibindo os prompts recuperados literalmente dos logs.
- **Badges por fase** mostrando a alternância de modelos: `Codex`, `Claude Opus`, `Claude Sonnet`, `GPT-5.x no Copilot`.
- **Camada de governança** destacando o fluxo `brief -> PRD -> architecture -> UX -> epics -> stories -> dev-story -> review`.
- **Overlay de “mudança controlada”** no momento do Topic 17, mostrando que o escopo extra exigiu atualização formal de PRD/épicos/arquitetura/UX.
- **Selo visual de evidência** em cada bloco: “recuperado de commit”, “recuperado de story artifact”, “recuperado de session log”.

## Fontes
- `git log` do repositório (`2026-03-04` a `2026-03-10`)
- `C:\Projects\ApresentacaoAI\_bmad-output\planning-artifacts\product-brief-ApresentacaoAI-2026-03-04.md`
- `C:\Projects\ApresentacaoAI\_bmad-output\planning-artifacts\prd.md`
- `C:\Projects\ApresentacaoAI\_bmad-output\planning-artifacts\epics.md`
- `C:\Projects\ApresentacaoAI\_bmad-output\planning-artifacts\architecture.md`
- `C:\Projects\ApresentacaoAI\_bmad-output\planning-artifacts\ux-design-specification.md`
- `C:\Projects\ApresentacaoAI\_bmad-output\implementation-artifacts\sprint-status.yaml`
- stories em `C:\Projects\ApresentacaoAI\_bmad-output\implementation-artifacts\*.md`, com destaque para:
  - `1-1-inicializacao-e-configuracao-do-projeto.md`
  - `4-1-topico-6-spec-kit-a-especificacao-como-codigo.md`
  - `4-2-topico-7-gsd-do-caos-ao-workflow.md`
  - `4-4-topico-9-bmad-times-multi-agente.md`
  - `4-5-componente-livetable-tabela-viva.md`
  - `4-7-topico-10-qual-ferramenta-usar.md`
  - `5-2-topico-12-roi-e-metricas-de-impacto.md`
  - `5-3-topico-13-o-paradoxo-do-junior.md`
  - `5-5-topico-15-caminho-de-implementacao.md`
  - `5-6-topico-16-call-to-action-final.md`
- `session_store` do Copilot CLI:
  - sessão `53e3565b-d27c-467b-826d-b6ed492333df`
  - sessão `13131da7-9283-40c8-9273-43dbf308981f`
  - sessão `868d75dc-31e6-4bee-90fc-b75f41a27849`
- consulta ao GitHub do repositório `giuice/ApresentacaoAI`:
  - nenhum pull request encontrado no momento da consulta
  - workflow `Deploy to GitHub Pages` ativo
