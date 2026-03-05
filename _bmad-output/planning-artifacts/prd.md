---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
workflowType: prd
status: complete
lastStep: 12
date: '2026-03-04'
author: 'Giuliano'
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 0
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-ApresentacaoAI-2026-03-04.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/project-context.md
---

# Product Requirements Document - ApresentacaoAI

**Author:** Giuliano  
**Date:** 2026-03-04  

## Executive Summary

O **ApresentacaoAI** é uma **SPA** usada como **apresentação interativa** (não um slide deck) para explicar — com narrativa e demonstração visual — a evolução do desenvolvimento de software com IA: do **“Vibe Coding”** para **Context Engineering**. A mensagem central é prática e de carreira: **IA será parte do trabalho de todo dev**; vantagem competitiva vem de **método + contexto + validação**, não de “truques”.

**Cenários de uso:**
1) **Apresentação ao vivo** (workshop/palestra interna): o apresentador controla o fluxo por **teclado**, com transições previsíveis e legibilidade em projetor.  
2) **Exploração assíncrona pós-palestra**: o app continua como artefato navegável/portfólio.

**Entrega:** app **estático**, **sem backend**, com foco em performance perceptível (fluidez), legibilidade e consistência visual (tema Matrix/tech).

### What Makes This Special

- **Forma = conteúdo (contínuo):** a experiência inteira reforça que não é um deck; a execução “viva” sustenta a narrativa.
- **Mensagem de carreira (sem hype):** foco em disciplina (método e contexto) como diferencial.
- **Keyboard-first para palco:** controle previsível reduz fricção durante a talk.
- **Demanda imediata:** solicitado pelo Tech Lead, com uso claro e recorrente.

## Project Classification

- **Project Type:** `web_app` (SPA no browser)
- **Domain:** `general`
- **Complexity:** `low`
- **Project Context:** `greenfield`
- **Backend:** none (build/deploy estático)

## Success Criteria

### User Success

Sem metas numéricas de audiência/engajamento neste PRD (decisão do autor).  
Sucesso do usuário = a apresentação roda **sem fricção**:

- Navegação por teclado funciona do **tópico 1 ao 16**.
- Conteúdo é **legível em projetor** (contraste/hierarquia visual validados em pelo menos **2 ambientes/dispositivos**).

### Business Success

Sem metas de adoção/negócio neste PRD (decisão do autor).  
Sucesso primário = **entregar o artefato** solicitado (pedido do Tech Lead): app pronto para apresentar e reutilizar.

### Technical Success (Measurable)

- **Performance:** Lighthouse Performance **> 90** (ambiente alvo).
- **Fluidez:** transições sem “jank” perceptível, mirando **60fps consistente** durante a sessão.
- **Compatibilidade:** suportar apenas **Google Chrome (última versão)**.
- **Build/Deploy:** build estático (`dist/`) bem-sucedido e deployável.

### Completion Checklist

- **Completude:** **16 tópicos** implementados e funcionais (**100%**).
- **Navegação:** teclado cobre o fluxo completo (1→16) sem bugs.
- **Legibilidade:** contraste/legibilidade validada em cenário de projetor.
- **Entrega:** build estático publicado/implantável.

## Product Scope

### MVP - Minimum Viable Product

1. Shell/base da apresentação (tema Matrix/tech)
2. Navegação por teclado (← →, espaço, Esc para overview)
3. Overview (mapa) com salto para tópico
4. 16 componentes de tópico
5. Transições entre tópicos
6. Componentes UI reutilizáveis (counters/tabelas/cards conforme necessidade)
7. Background Matrix (sutil)
8. Responsivo (desktop/projetor/tablet; mobile como fallback aceitável)
9. Build estático (dist/)

### Growth Features (Post-MVP)

- Presenter mode (notas em segunda tela)
- Timer por tópico
- Animações/diagramas mais avançados
- Versão em inglês (toggle)
- QR code no call to action

### Vision (Future)

- Evoluir como portfólio vivo e reutilizável (apresentação + artefato permanente).

## User Journeys

### Journey 1 — Ricardo (Tech Lead) — Apresentação ao vivo (happy path)

**Abertura:** Ricardo vai conduzir uma apresentação interna. Ele precisa manter ritmo e controle sem depender de mouse/trackpad.  
**Passos:**
1) Abre o app e entra no **Tópico 1** (hook).  
2) Avança a narrativa por **teclado** (setas/space).  
3) Em tópicos com métricas, elementos visuais entram com animação após a transição estabilizar.  
4) Se precisar saltar, usa **Esc → overview** e vai ao tópico desejado.  
5) Retoma o fluxo e conclui no CTA com legibilidade em projetor.

**Valor:** controle sem fricção; execução “app viva” sustenta autoridade do conteúdo.  
**Recuperação:** Esc/overview para reorientar; validar contraste/legibilidade antes da sessão.

### Journey 2 — Fernanda (Dev Sênior) — Exploração individual pós-palestra

**Objetivo:** revisitar e absorver no próprio ritmo.  
**Passos:** navega linearmente; usa overview para pular; revisita tópicos para consolidar.  
**Valor:** entende a mensagem central sem depender do apresentador.

### Journey 3 — Marcos (Eng Manager/CTO) — Consumir alto nível e decidir replicar/compartilhar

**Objetivo:** extrair mensagem e avaliar se vale replicar internamente.  
**Passos:** abre, entende posicionamento (não é slides), usa overview para impacto, decide compartilhar/recomendar.  
**Valor:** forma reforça seriedade e executabilidade.

### Journey 4 — Visitante pós-apresentação (recrutador/colega) — Portfólio técnico navegável

**Objetivo:** experiência memorável + leitura rápida de competência técnica.  
**Passos:** abre, explora linearmente ou via overview, entende que é artefato técnico (não deck).  
**Valor:** guarda/compartilha/pede detalhes.

### Journey Requirements Summary

- Navegação **keyboard-first** (setas/space) + **Esc para overview** e salto.
- Overview como mapa para reorientação e consumo não-linear.
- Transições/animações previsíveis (reforçam narrativa sem jank).
- Legibilidade em projetor (contraste/hierarquia visual).
- Execução estática (sem backend) para acesso simples via link.

## Web App Specific Requirements

### Project-Type Overview

SPA para apresentação e exploração individual via browser, com **deploy estático** e **sem backend**.

### Technical Architecture Considerations

- SPA com estado interno para controlar navegação/apresentação.
- Build estático (`dist/`) pronto para hospedagem.
- Sem requisitos de: real-time, autenticação, persistência remota, CMS no MVP.

### Browser Matrix (Support)

- **Suportado:** **Google Chrome (última versão)**.  
- **Sem compromisso:** outros browsers e versões legadas.

### Responsive Design

- Prioridade: desktop/projetor (telas grandes).
- Tablet: utilizável.
- Mobile: fallback aceitável (não é foco de “palestra”).

### Performance Targets

- **Lighthouse Performance:** **> 90**.
- **Fluidez:** transições sem “jank” perceptível, mirando **60fps consistente**.
- Troca de tópicos sem “loading” perceptível (pré-carregamento/lazy load conforme necessário, sem quebrar a fluidez).

### SEO Strategy

- SEO não requerido.

### Accessibility Level

- Sem meta WCAG formal.
- Requisito mínimo: **legibilidade em projetor**.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**Experience MVP:** “apresentável e fluido” é o produto. O MVP prova valor por: navegação por teclado, overview, transições fluídas, legibilidade em projetor e estética Matrix/tech consistente.

### Post-MVP

- Phase 2: presenter mode, timer por tópico, animações/diagramas mais avançados.
- Phase 3: versão em inglês (toggle), QR code no CTA.

### Risk Mitigation Strategy

- **Performance/fluidez (animações + background):** priorizar animações via transform/opacity; evitar animações de layout; manter background sutil.
- **Navegação/overview previsíveis:** estado central único + teste manual “mouse-free” do tópico 1 ao 16.
- **Escala (16 tópicos) sem acoplamento:** componentes UI reutilizáveis + organização por tópico.

## Functional Requirements

### Navigation & Presentation Flow

- **FR1:** Presenter pode avançar para o próximo tópico.
- **FR2:** Presenter pode voltar para o tópico anterior.
- **FR3:** Presenter pode abrir/fechar o modo **overview**.
- **FR4:** Presenter pode selecionar um tópico específico a partir do overview e navegar diretamente até ele.
- **FR5:** Sistema mantém e exibe (de forma consistente) qual é o tópico atual e o total de tópicos.

### Topic Rendering & Content Delivery

- **FR6:** Sistema pode renderizar o conteúdo do **Tópico 1**.
- **FR7:** Sistema pode renderizar o conteúdo do **Tópico 2**.
- **FR8:** Sistema pode renderizar o conteúdo do **Tópico 3**.
- **FR9:** Sistema pode renderizar o conteúdo do **Tópico 4**.
- **FR10:** Sistema pode renderizar o conteúdo do **Tópico 5**.
- **FR11:** Sistema pode renderizar o conteúdo do **Tópico 6**.
- **FR12:** Sistema pode renderizar o conteúdo do **Tópico 7**.
- **FR13:** Sistema pode renderizar o conteúdo do **Tópico 8**.
- **FR14:** Sistema pode renderizar o conteúdo do **Tópico 9**.
- **FR15:** Sistema pode renderizar o conteúdo do **Tópico 10**.
- **FR16:** Sistema pode renderizar o conteúdo do **Tópico 11**.
- **FR17:** Sistema pode renderizar o conteúdo do **Tópico 12**.
- **FR18:** Sistema pode renderizar o conteúdo do **Tópico 13**.
- **FR19:** Sistema pode renderizar o conteúdo do **Tópico 14**.
- **FR20:** Sistema pode renderizar o conteúdo do **Tópico 15**.
- **FR21:** Sistema pode renderizar o conteúdo do **Tópico 16**.

### Transitions & Visual Experience

- **FR22:** Sistema pode realizar transição entre tópicos durante navegação.
- **FR23:** Sistema pode executar animações/efeitos visuais associados ao tópico quando o tópico entra em foco.
- **FR24:** Sistema pode exibir um background visual no estilo Matrix de forma consistente durante a apresentação.

### Interaction Patterns (UI Building Blocks)

- **FR25:** Sistema pode exibir métricas/destaques numéricos como componentes visuais reutilizáveis (ex.: counters).
- **FR26:** Sistema pode exibir comparações/quadros informativos usando componentes visuais reutilizáveis (ex.: tabelas/cards).

### Deployment & Offline Constraints (Functional scope)

- **FR27:** Sistema pode ser construído em um bundle estático para publicação.
- **FR28:** Usuário pode acessar o app via link (sem autenticação).
- **FR29:** Sistema opera sem dependência de backend.

## Non-Functional Requirements

### Performance

- **NFR1:** A aplicação deve atingir **Lighthouse Performance > 90** no ambiente alvo.
- **NFR2:** Transições entre tópicos devem ocorrer sem “jank” perceptível e mirando **60fps consistente** durante a apresentação.
- **NFR3:** O background Matrix deve ser **sutil** e não pode degradar a legibilidade nem comprometer a fluidez das transições.

### Reliability (Presentation Readiness)

- **NFR4:** A navegação por teclado deve se manter estável durante uma sessão completa (tópico 1→16) sem exigir refresh para recuperar estado.
- **NFR5:** A aplicação deve iniciar e permitir navegação imediatamente, sem dependências externas (por ser build estático e sem backend).

### Browser Compatibility

- **NFR6:** Compatível com **Google Chrome (última versão)**. Não há requisito de compatibilidade com browsers legados.

### Accessibility (Pragmatic)

- **NFR7:** Legibilidade em projetor é obrigatória: contraste e hierarquia visual devem permitir leitura em ambiente corporativo (sem meta WCAG formal).

### Security / Privacy

- Não aplicável neste escopo (sem autenticação, sem backend, sem dados sensíveis).

### Scalability / Integration

- Não aplicável neste escopo (build estático; sem integrações externas previstas).
