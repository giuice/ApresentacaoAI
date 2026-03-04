# Estrutura de Slides — Referência do Projeto

Este documento detalha a estrutura planejada da apresentação. Cada bloco tem um objetivo narrativo e os slides podem ser ajustados conforme necessidade.

A apresentação tem aproximadamente 14–18 slides, organizados em 5 blocos.

---

## Bloco 1 — O Problema (Slides 1–3)

**Objetivo narrativo:** Criar urgência. Mostrar que o modo atual de usar IA para código é insustentável em produção.

### Slide 1: Hook — "O que é Vibe Coding?"
- Definir o termo de forma direta
- Mostrar que é o modo padrão de 76% dos devs
- Analogia: "Construir uma casa gritando instruções sem planta"
- Métrica de destaque: 88% dos CTOs sofreram desastres de produção

### Slide 2: Por que falha?
- A armadilha do chat infinito
- Sintomas: funções repetidas, arquivos com mesma função, IA se perde, dev também
- A conversa longa como antipadrão
- Métrica: 45% dos devs relatam dificuldades com tarefas complexas

### Slide 3: Context Rot
- Tabela de degradação 0%–70%
- Explicar o mecanismo técnico: janela de contexto finita, perda progressiva
- Analogia: "IA com Alzheimer progressivo"
- Este é o slide-chave que justifica todo o resto da apresentação

---

## Bloco 2 — A Evolução (Slides 4–5)

**Objetivo narrativo:** Mostrar que existe um caminho maduro. Transição de problema para solução.

### Slide 4: De Prompt Engineering para Context Engineering
- Prompt Engineering: otimizar uma pergunta
- Context Engineering: projetar todo o ambiente de informação que a IA recebe
- Mostrar que é uma mudança de paradigma, não incremental
- Métrica: tarefas 55% mais rápido com ferramentas estruturadas

### Slide 5: Spec-Driven Development
- O conceito de spec como "blueprint executável"
- A spec é a fonte da verdade — não o chat, não o código
- Com boas specs: 90% do código gerado, 50%–80% de economia de tempo
- Overhead inicial de 20%–40% que se paga em semanas

---

## Bloco 3 — As Ferramentas (Slides 6–10)

**Objetivo narrativo:** Apresentar soluções concretas em ordem crescente de complexidade.

### Slide 6: Overview — A Escala de Complexidade
- Diagrama visual: Spec-Kit → GSD → BMAD (simples → complexo)
- Cada ferramenta resolve um nível diferente de problema
- Não são concorrentes — são complementares em escala

### Slide 7: Spec-Kit — A Constituição do Projeto
- O que é: kit de templates e specs que definem regras do projeto
- Para quem: projetos individuais ou times pequenos
- Problema que resolve: IA sem contexto gera código inconsistente
- Métrica: 60% menos PRs rejeitados por arquitetura

### Slide 8: GSD (Get Shit Done) — Contexto Fresco, Qualidade Constante
- O que é: framework que reseta contexto a cada tarefa
- Para quem: devs solo que querem velocidade com qualidade
- Problema que resolve: Context Rot em sessões longas
- Métrica: 100.000 linhas em 2 semanas (dev solo)

### Slide 9: BMAD — Simulando um Time Completo
- O que é: framework multi-agente com personas (PM, Arquiteto, Dev, QA)
- Para quem: projetos complexos que precisam de múltiplas perspectivas
- Problema que resolve: falta de validação cruzada e visão sistêmica
- Métrica: MVP Fintech em 6 semanas, €80.000 economizados
- Analogia: "Contratar um time completo por US$ 10/hora"

### Slide 10: Comparativo Visual
- Tabela ou diagrama comparando as 3 ferramentas em dimensões:
  - Complexidade do projeto
  - Número de agentes/personas
  - Tipo de output
  - Curva de aprendizado
  - Caso de uso ideal

---

## Bloco 4 — O Novo Papel (Slides 11–13)

**Objetivo narrativo:** Redefinir a identidade profissional do desenvolvedor.

### Slide 11: O Dev virou PM
- Com BMAD, você não programa — você orquestra
- Funções novas: definir requisitos, validar entregas, priorizar tarefas
- A IA é o dev júnior; você é o PM/Arquiteto

### Slide 12: A IA é o Programador de Elite
- Quando bem dirigida, a IA produz código em volume e qualidade
- O gargalo não é mais escrever código — é especificar o que escrever
- Métrica: Microsoft/Accenture +12,92% a +21,83% PRs/semana

### Slide 13: Skills que Agora Importam
- Context Design: saber o que a IA precisa saber
- Validação: saber avaliar o que a IA produziu
- Orquestração: saber dividir um problema em tarefas para agentes
- Spec Writing: saber documentar intenção de forma executável

---

## Bloco 5 — Impacto e Encerramento (Slides 14–16)

**Objetivo narrativo:** Provar o valor com números e fechar com chamada à ação.

### Slide 14: ROI e Linha do Tempo
- Gráfico de curva J: investimento inicial → break-even → retorno
- Meses 1–3: negativo (aprendizado, overhead de specs)
- Meses 3–6: break-even
- Meses 7–12+: ROI positivo
- Métrica: 11 semanas para ROI completo

### Slide 15: Cases Reais
- Google: 50% redução no tempo de migração
- Airbnb: 6 semanas vs. 1,5 anos estimados
- Ralph Loop: MVP US$ 50k por US$ 297
- Selecionar 3 cases que melhor representem a progressão

### Slide 16: Call to Action
- "Pare de conversar com a IA. Comece a especificar."
- Próximos passos concretos: experimentar Spec-Kit em um projeto real
- Mercado: US$ 25 bilhões até 2030 — o trem já saiu
- Métrica final: 60% do código será gerado por IA até 2026