# Tópico: Context Rot — O mecanismo técnico por trás da falha
## Tópico: 3
## Bloco: 1 — O Problema

## Título: "Context Rot: Por que a IA piora quanto mais você conversa"

## Conteúdo:

**Conceito central:**
- Context Rot = degradação progressiva da qualidade da IA conforme a janela de contexto é preenchida
- Analogia: "IA com Alzheimer progressivo — quanto mais longa a conversa, mais ela esquece"

**Tabela de degradação (atualizada com dados científicos):**

| Uso do Contexto | Comportamento Observado | Base Científica |
|---|---|---|
| 0%–30% | Qualidade máxima, raciocínio completo | Performance consistente (Chroma, 2025) |
| 30%–50% | Eficiente, pequenos erros começam | Degradação não-uniforme detectável (Chroma) |
| 50%–70% | Respostas apressadas, atalhos, perde detalhes | Raciocínio multi-hop falha (Adobe, 2025) |
| 70%+ | Alucinações, esquece requisitos, deriva arquitetural | Degradação severa — modelos ficam até 99% aquém da janela máxima (arXiv, Paulsen 2025) |

**Dados científicos de suporte:**
- Chroma Research (2025): 18 LLMs testados — performance degrada de formas surpreendentes e não-uniformes conforme o input cresce
- Paper arXiv (Paulsen, set 2025): maioria dos modelos com degradação severa já a partir de 1.000 tokens; todos ficaram muito aquém da janela máxima anunciada (até 99%)
- Adobe (fev 2025): degradação exponencial em tarefas que exigem conectar dois fatos não óbvios (multi-hop reasoning)
- Anthropic: "Contexto deve ser tratado como recurso finito com retornos decrescentes. LLMs têm um orçamento de atenção que se esgota a cada token"
- Factory.ai: janelas maiores não resolvem — facilitam degradação sem curadoria adequada

**Implicação prática:**
- Chat longo = contexto poluído = IA cada vez pior
- Mais tokens ≠ melhor resultado. **Contexto curado > contexto grande.**
- Este é o problema que justifica toda a disciplina de Context Engineering

## Métrica de Destaque
**Até 99% de gap** entre a janela de contexto anunciada e a janela efetiva real (arXiv, Paulsen 2025)

## Notas do Apresentador
Esse tópico é a justificativa técnica de tudo que vem depois. Se vocês saírem daqui com uma coisa só, que seja isso: a janela de contexto da IA não é infinita, e ela degrada de forma não-linear.

O que é Context Rot? Pense assim: toda vez que você manda uma mensagem para a IA, ela precisa processar tudo o que veio antes — o histórico inteiro. Conforme esse histórico cresce, a capacidade de atenção da IA se dilui. É literalmente um Alzheimer progressivo.

A pesquisa da Chroma testou 18 modelos de linguagem e mostrou que a degradação é real, é mensurável, e acontece de formas surpreendentes. A Adobe demonstrou que tarefas que exigem conectar dois fatos — o tipo de raciocínio que a gente precisa em arquitetura de software — são as primeiras a falhar.

E aqui está o dado mais impactante: um paper de setembro de 2025 mostrou que a maioria dos modelos apresenta degradação severa já com 1.000 tokens de contexto. E todos ficaram muito aquém das janelas máximas que anunciam no marketing — em até 99%.

A própria Anthropic, criadora do Claude, diz que contexto deve ser tratado como recurso finito. Cada token novo esgota o orçamento de atenção do modelo.

A implicação prática é direta: chat longo é um antipadrão. Mais contexto não é melhor contexto. E é exatamente isso que as ferramentas que vamos ver a seguir resolvem — não com janelas maiores, mas com contexto curado, fresco e estruturado.

## Experiência Visual e Interativa
- **Elemento principal:** Tabela interativa com degradê animado de cores: verde → amarelo → laranja → vermelho. Cada faixa "acende" conforme o usuário scrolla ou interage
- **Gráfico complementar:** Linha descendente animada mostrando "Qualidade" no eixo Y e "Uso do Contexto" no eixo X — a linha cai conforme a tabela é revelada
- **Quote box:** Citação da Anthropic sobre "orçamento de atenção" como card estilo tech com glow, fixa como âncora visual
- **Visualização de "Alzheimer":** Animação opcional — texto que vai perdendo nitidez/ficando borrado conforme o contexto aumenta (metáfora visual direta)
- **Dados científicos:** Cards expandíveis para cada pesquisa citada (Chroma, Adobe, arXiv) — click para ver detalhes
- **Tom visual:** Vermelho/alarme — encerramento do Bloco 1 (O Problema). Este tópico é o clímax técnico antes da virada pro Bloco 2

## Fontes
- Chroma Research: "Context Rot: How Increasing Input Tokens Impacts LLM Performance", 2025 — research.trychroma.com
- Paulsen (arXiv 2509.21361): "Context Is What You Need: The Maximum Effective Context Window for Real World Limits of LLMs", set 2025
- Adobe: pesquisa sobre multi-hop needle-in-a-haystack, fev 2025 (citada por Understanding AI)
- Anthropic: blog post set 2024 sobre context engineering e orçamento de atenção
- Factory.ai: "The Context Window Problem: Scaling Agents Beyond Token Limits"
- Hossain (arXiv 2601.11564): "Context Discipline and Performance Correlation", dez 2025