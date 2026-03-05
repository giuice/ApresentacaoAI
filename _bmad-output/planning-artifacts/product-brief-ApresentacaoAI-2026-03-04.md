---
stepsCompleted: [1, 2, 3, 4, 5, 6]
status: complete
inputDocuments:
  - docs/estrutura-slides.md
  - _bmad-output/project-context.md
  - docs/topicos/topic1.md
  - docs/topicos/topic9.md
  - AGENTS.md
date: '2026-03-04'
author: 'Giuliano'

---

# Product Brief: ApresentacaoAI

## Executive Summary

ApresentacaoAI é uma aplicação web interativa que apresenta a evolução do desenvolvimento de software assistido por IA — do caos do "Vibe Coding" à disciplina do Context Engineering. Construída em React + Tailwind CSS com visual imersivo tema Matrix, é projetada para apresentações corporativas internas e funciona também como portfólio técnico permanente.

A apresentação conduz o público por 16 tópicos em 5 blocos narrativos (Problema → Evolução → Ferramentas → Novo Papel → Call to Action), demonstrando com métricas concretas e cases reais que existem métodos maduros para usar IA com disciplina: Spec-Kit, GSD e BMAD.

Não é um deck de slides — é uma experiência web com animações, counters animados, diagramas interativos, transições cinemáticas e navegação por teclado.

---

## Core Vision

### Problem Statement

A maioria dos desenvolvedores usa IA generativa de forma não estruturada ("Vibe Coding"): conversas longas sem specs, sem contexto gerenciado, sem validação. Isso gera código inconsistente, Context Rot progressivo e falhas em produção — 88% dos CTOs reportam já ter sofrido desastres com código de IA não verificado.

Não existe hoje uma narrativa clara e visualmente impactante que mostre para times técnicos corporativos que esse problema tem solução — e que a solução não é parar de usar IA, mas sim usá-la com engenharia de contexto.

### Problem Impact

- Retrabalho crescente em projetos que usam IA sem estrutura
- Degradação de contexto em sessões longas (até 70% de perda)
- Falta de rastreabilidade entre intenção, decisão técnica e código gerado
- Resistência organizacional à adoção de IA por experiências negativas anteriores

### Why Existing Solutions Fall Short

Apresentações tradicionais (PowerPoint, Google Slides) não transmitem a experiência imersiva necessária para engajar um público técnico. São estáticas, lineares e não demonstram na forma o que pregam no conteúdo — inovação tecnológica. Além disso, apresentações sobre ferramentas de IA tipicamente vendem hype sem métricas concretas ou arco narrativo coerente.

### Proposed Solution

Uma aplicação React interativa com:
- **16 tópicos** organizados em 5 blocos narrativos com arco dramático claro
- **Visual Matrix/tech** imersivo (fundo escuro, verde neon, chuva de código, glow effects)
- **Elementos interativos** por tópico: counters animados, tabelas comparativas, cards flip, diagramas animados, toggles, simulações visuais
- **Navegação por teclado** (setas, espaço, escape para overview)
- **Métricas concretas** com fontes verificáveis em cada ponto de impacto
- **Conteúdo em PT-BR** para audiência corporativa brasileira

### Key Differentiators

1. **Forma = Conteúdo**: uma apresentação sobre tecnologia moderna entregue como tecnologia moderna
2. **Narrativa de maturidade, não hype**: arco evolutivo com dados concretos mostrando que é disciplina, não modismo
3. **Três ferramentas em escala crescente**: Spec-Kit → GSD → BMAD, cada uma resolvendo um nível diferente de complexidade
4. **Portfólio permanente**: funciona standalone como app web acessível após a apresentação
5. **Audiência corporativa**: tom técnico mas acessível, sem simplificação excessiva

---

## Target Users

### Primary Users

#### Persona 1: Ricardo — Tech Lead (apresentação ao vivo)
- **Contexto:** Tech Lead numa empresa média/grande brasileira, 8+ anos de experiência. Time de 5-10 devs que já usa Copilot/ChatGPT mas sem estrutura. Lidera a decisão de adoção de ferramentas.
- **Problema:** Sente que o time está perdendo produtividade com IA-caótica — código inconsistente, retrabalho, PRs confusos. Precisa de argumentos técnicos sólidos para justificar mudança de abordagem para a liderança.
- **O que busca na apresentação:** Métricas concretas, cases reais, e um caminho progressivo claro (não "mude tudo de uma vez"). Quer sair com um plano de ação.
- **Momento "aha!":** Quando vê a escala Spec-Kit → GSD → BMAD e percebe que pode começar simples e escalar.

#### Persona 2: Fernanda — Dev Sênior / Desenvolvedora Individual
- **Contexto:** Dev sênior que usa IA diariamente para coding. Produtiva mas frustrada — sente que o contexto se degrada em sessões longas. Curiosa sobre novas metodologias.
- **Problema:** Context Rot real. Já perdeu trabalho porque a IA "esqueceu" decisões do início da conversa. Quer velocidade com qualidade.
- **O que busca na apresentação:** Entender o mecanismo por trás da degradação e conhecer ferramentas práticas que ela pode adotar sozinha (GSD, Spec-Kit).
- **Momento "aha!":** Slide do Context Rot com a tabela de degradação 0%-70% — "era isso que acontecia comigo."

#### Persona 3: Marcos — Gerente de Engenharia / CTO
- **Contexto:** Decisor orçamentário. Já autorizou licenças de Copilot mas não vê ROI claro. Precisa apresentar resultados para diretoria.
- **Problema:** Investimento em IA sem retorno mensurável. Time usa IA mas produtividade não melhorou de forma consistente.
- **O que busca na apresentação:** ROI, curva J de investimento, cases com números reais (Google, Airbnb, Ralph Loop). Quer dados para defender o investimento.
- **Momento "aha!":** Tópico de ROI mostrando break-even em 11 semanas e case do MVP de €80.000 economizados.

### Secondary Users

#### Visitante do portfólio (acesso posterior)
- **Contexto:** Recrutador, colega, ou profissional que acessa o link do portfólio após a apresentação.
- **Necessidade:** Navegação intuitiva, auto-explicativa (não precisa do apresentador). Experiência visual impactante que demonstra competência técnica do autor.
- **Interação:** Navega por teclado ou clica, explora tópicos de interesse, vê métricas e cases.

### User Journey

1. **Contexto:** Apresentação corporativa interna — o público está numa sala ou call, Giuliano apresenta navegando pelo app
2. **Hook (30s):** Tópico 1 abre com definição de Vibe Coding + stat de 88% — cria urgência imediata
3. **Engajamento:** Blocos 1-3 constroem tensão (problema) e alívio (solução), com elementos visuais que mantêm atenção
4. **Momento de valor:** Bloco 3 (Ferramentas) — público vê opções concretas e se identifica com um nível de complexidade
5. **Redefinição:** Bloco 4 — "o dev virou PM" provoca reflexão sobre o próprio papel
6. **Ação:** Bloco 5 — ROI + cases + call to action deixam o público com próximos passos claros
7. **Pós-apresentação:** Link compartilhado — público revisita tópicos de interesse no portfólio online

---

## Success Metrics

### Métricas de Sucesso do Usuário (audiência da apresentação)
- **Engajamento durante apresentação:** público mantém atenção durante os 16 tópicos sem drop-off visível
- **Compreensão do arco narrativo:** público consegue articular a progressão Vibe Coding → Context Engineering ao final
- **Ação pós-apresentação:** pelo menos 1 pessoa do público experimenta uma das ferramentas (Spec-Kit, GSD ou BMAD) nas semanas seguintes
- **Compartilhamento:** link do portfólio é compartilhado internamente após a apresentação

### Business Objectives
- **Posicionamento profissional:** estabelecer Giuliano como referência interna em engenharia de contexto e IA estruturada
- **Portfólio técnico:** demonstrar competência em React, animações, design de experiência e storytelling técnico
- **Adoção de ferramentas:** influenciar a adoção de pelo menos uma metodologia estruturada (Spec-Kit/GSD/BMAD) no time/organização

### Key Performance Indicators
| KPI | Métrica | Alvo |
|-----|---------|------|
| Tempo de apresentação | Duração total com interações | 30-45 min |
| Performance do app | Lighthouse Performance score | > 90 |
| Acessibilidade visual | Contraste legível em projetor e tela | Testado em 2+ dispositivos |
| Portfólio engagement | Visitantes únicos pós-apresentação | > 10 na primeira semana |
| Completude | Todos os 16 tópicos implementados e funcionais | 100% |
| Navegação fluida | Transições sem lag ou glitch visual | 60fps consistente |

---

## MVP Scope

### Core Features (MVP)
1. **Shell da apresentação** — layout base com background Matrix, barra de progresso, indicador de tópico
2. **Navegação por teclado** — setas ←→, espaço, Escape para overview
3. **16 componentes de tópico** — cada um renderizando o conteúdo de `docs/topicos/topicN.md` com layout específico
4. **Transições entre tópicos** — AnimatePresence com fade/slide direcionais
5. **Componentes UI reutilizáveis** — AnimatedCounter, DataTable, FlipCard, ComparisonToggle
6. **Efeito Matrix background** — chuva de código sutil via canvas/requestAnimationFrame
7. **Responsivo** — funcional em projetor (lg), monitor (md) e tablet
8. **Build estático** — deploy em qualquer hosting (Vercel/Netlify/GitHub Pages)

### Out of Scope para MVP
- Notas do apresentador visíveis em tela secundária (modo presenter)
- Narração com áudio/voz
- Modo escuro/claro toggle (é Matrix-only)
- Analytics de visitantes no portfólio
- PWA / modo offline
- Internacionalização (é PT-BR only)
- Editor de conteúdo / CMS

### MVP Success Criteria
- Todos os 16 tópicos renderizam corretamente com conteúdo dos docs
- Navegação fluida por teclado sem bugs
- Transições a 60fps, sem jank visual
- Lighthouse Performance > 90
- Funcional em Chrome, Firefox, Edge (últimas 2 versões)
- Legível em projetor (contraste testado)

### Future Vision (pós-MVP)
- **Modo presenter:** notas do apresentador em segunda tela/janela
- **Timer integrado:** controle de tempo por tópico
- **Animações avançadas:** diagramas SVG animados, simulações interativas mais elaboradas
- **Versão em inglês:** toggle de idioma para audiências internacionais
- **QR code no call to action:** link direto para ferramentas mencionadas
