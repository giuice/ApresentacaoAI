# Banco de Métricas e Cases — Referência do Projeto

Este documento contém todas as métricas(nao checadas), dados e cases de sucesso aprovados para uso na apresentação. Confirme estes dados sempre que possível.

---

## Context Rot (Qualidade por Uso de Contexto)

| Uso do Contexto | Comportamento da IA |
|---|---|
| 0% – 30% | Qualidade máxima, memória completa |
| 30% – 50% | Eficiente, pequenos erros |
| 50% – 70% | IA "corre", atalhos, respostas concisas demais |
| Acima de 70% | Alucinações, deriva arquitetural, esquece requisitos |

**Uso sugerido:** Slide de Context Rot (Bloco 1). Apresentar como tabela visual com degradê de cores verde→vermelho.

---

## Custos e Economia

- Desenvolvimento manual com IA: ~US$ 10,42/hora
- Dev júnior ≈ ¼ do salário de um sênior com IA
- MVP de US$ 50.000 entregue por US$ 297 em chamadas de API (Ralph Loop)
- Custo por tarefa small: US$ 5–15 | Tarefa complexa: US$ 50–150
- Custo por desenvolvedor/ano (ferramentas + treinamento): US$ 5.000–15.000
- Licenciamento de ferramentas: US$ 10–50/mês por dev

**Uso sugerido:** Slides de ROI (Bloco 5) e slide de BMAD (Bloco 3) para o argumento de custo-benefício.

---

## Adoção e Produtividade

- 76% dos devs usam ou planejam usar ferramentas de IA (Stack Overflow, 65k+ devs)
- 44% já adotaram ativamente
- 60% do novo código será gerado por IA até 2026 (Gartner)
- 25% das startups Y Combinator já tinham bases de código majoritariamente geradas por IA (2025)
- Tarefas concluídas 55% mais rápido com ferramentas estruturadas
- Economia de tempo: 2–3h/semana, podendo chegar a +6h para high performers
- Com boas specs: IA gera 90% do código, economizando 50%–80% do tempo de implementação
- Microsoft/Accenture: +12,92% a +21,83% de PRs por semana com IA estruturada

**Uso sugerido:** Slide de hook (Bloco 1) para mostrar que é mainstream; Bloco 2 para contrastar produtividade ad hoc vs. estruturada.

---

## ROI e Curva de Adoção

- 81,4% instalam extensões no 1º dia
- Leva em média 11 semanas para ROI completo se materializar
- Linha do tempo: Meses 1–3 (negativo) → Meses 3–6 (break-even) → Meses 7–12+ (ROI positivo)
- Criar specs: 15–30min (função simples) até 8–16h (arquitetura completa)
- Overhead inicial de specs: 20%–40% de tempo extra

**Uso sugerido:** Slide 14 (ROI e Linha do Tempo). Ideal para gráfico de curva J mostrando o vale inicial e o retorno posterior.

---

## Riscos do Vibe Coding

- 88% dos CTOs sofreram desastres de produção com código não verificado por IA
- 45% dos devs relatam dificuldades da IA com tarefas complexas
- 67% gastam tempo extra em debugging durante a fase de aprendizado

**Uso sugerido:** Slides 1–2 (Bloco 1) para estabelecer o problema com urgência.

---

## Cases de Sucesso

### Google
- 80% das modificações feitas por agentes de IA
- 50% de redução no tempo total de migração
- 91% de precisão na previsão de edição de arquivos
- **Contexto:** migração de código em larga escala com agentes IA

### Airbnb
- 3.500 arquivos de teste migrados em 6 semanas (vs. 1,5 anos estimados)
- **Contexto:** migração automatizada de testes

### Ralph Loop / CI-CD Automation
- 67% dos bugs de regressão resolvidos automaticamente
- Tempo médio de correção: 4h → 23 minutos
- 40% das builds que falharam corrigidas sem intervenção manual
- MVP de US$ 50.000 entregue por US$ 297 em chamadas de API

### BMAD
- 50.000 linhas de COBOL → Java com 40% menos tempo de integração
- MVP Fintech em 6 semanas, poupando €80.000 em consultoria
- GitHub Spec Kit: 60% menos PRs rejeitados por arquitetura

### GSD
- Dev solo: 100.000 linhas de código em 2 semanas
- 52 tarefas, 68 testes, 1.473 linhas em 24 arquivos (15 min de planejamento inicial)

**Uso sugerido:** Slide 15 (Cases reais). Selecione 3 cases que melhor ilustrem a progressão simples→complexo.

---

## Mercado

- Mercado global de ferramentas de IA para código: US$ 25 bilhões até 2030
- Cursor: 7 milhões de devs, incluindo Fortune 1000
- Windsurf: US$ 40M ARR, 1.000 clientes corporativos
- Lovable: US$ 100M ARR em apenas 8 meses
- GitHub Copilot: +40% do crescimento de receita do GitHub

**Uso sugerido:** Slide de hook ou Call to Action para mostrar que o mercado já se moveu.