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

---

## Adoção Atualizada (2025–2026) — Dados Verificados Online

- **85% dos devs usam IA regularmente** (final de 2025) — atualização do 76% do Stack Overflow 2024. Fonte: [Greptile - State of AI Coding 2025](https://www.greptile.com/state-of-ai-coding-2025)
- **90% dos engenheiros enterprise usarão assistentes de IA até 2028** — Gartner. Fonte: [LogRocket AI Dev Tool Rankings Feb 2026](https://blog.logrocket.com/ai-dev-tool-power-rankings/)
- **80% da força de engenharia precisará de upskilling até 2027** — Gartner (mesmo relatório)
- **MIT Technology Review** publicou artigo "From vibe coding to context engineering: 2025 in software development" — validação institucional do arco narrativo. Fonte: [MIT Tech Review, Nov 2025](https://www.technologyreview.com/2025/11/05/1127477/from-vibe-coding-to-context-engineering-2025-in-software-development/)

**Uso sugerido:** Bloco 3 (overview de ferramentas) e Call to Action. O 85% atualiza o 76% anterior. O artigo do MIT valida a narrativa inteira.

---

## Spec-Kit — Dados Verificados Online

- **~71k GitHub stars** desde lançamento em agosto 2025 (16k na primeira semana; 40k+ em nov/2025). Fonte: [Augment Code](https://www.augmentcode.com/tools/best-ai-tools-for-spec-driven-development), [Ry Walker Research](https://rywalker.com/research/github-spec-kit)
- **Suporte a 22+ plataformas de agentes IA** (Claude Code, Codex, Cursor, etc.). Fonte: [Augment Code](https://www.augmentcode.com/tools/best-ai-tools-for-spec-driven-development)
- **110 releases** até fev/2026, contribuidores de 50+ países. Fonte: [Augment Code](https://www.augmentcode.com/tools/best-ai-tools-for-spec-driven-development)
- **Artigo acadêmico arXiv (fev/2026)** propõe 3 níveis de rigor SDD: spec-first, spec-anchored, spec-as-source. Fonte: [arXiv:2602.00180](https://arxiv.org/abs/2602.00180)

**Uso sugerido:** Slide 7 (Spec-Kit) e Slide 6 (overview de ferramentas). Os 71k stars mostram adoção explosiva.

---

## GSD — Dados Verificados Online

- **Usado por engenheiros da Amazon, Google e Shopify**. Fonte: [GSD Build](https://gsd.build/)
- **Arquitetura de contexto fresco:** cada executor recebe 200K tokens limpos; contexto principal fica em 30-40%. Fonte: [The New Stack](https://thenewstack.io/beating-the-rot-and-getting-stuff-done/)
- **Multi-runtime:** suporta Claude Code, OpenCode, Gemini CLI e Codex. Fonte: [GSD GitHub](https://github.com/gsd-build/get-shit-done)

**Uso sugerido:** Slide 8 (GSD). A arquitetura de contexto fresco é a resposta direta ao Context Rot do Bloco 1.

---

## BMAD — Dados Verificados Online

- **v6 Alpha:** cross-platform agent teams, skills architecture, dev loop automation. Fonte: [BMAD GitHub](https://github.com/bmad-code-org/BMAD-METHOD)
- **100% open source**, framework universal para múltiplos domínios. Fonte: [BMAD Docs](https://docs.bmad-method.org/)
- **Filosofia docs-as-code:** documentação (PRDs, arquitetura, stories) é a fonte da verdade, código é derivado. Fonte: [Benny's Mind Hack - Applied BMAD](https://bennycheung.github.io/bmad-reclaiming-control-in-ai-dev)

**Uso sugerido:** Slide 9 (BMAD). A filosofia docs-as-code conecta diretamente com SDD do Tópico 5.

---

## Pesquisa Acadêmica — SDD e IA

- **IA aumenta complexidade do código em ~41%** e warnings de análise estática em 30% (quando usada sem estrutura). Fonte: [Red Hat Developer](https://developers.redhat.com/articles/2025/10/22/how-spec-driven-development-improves-ai-coding-quality)
- **McKinsey 2025:** organizações com IA estruturada obtêm 20-45% de ganho em produtividade. Fonte: [Red Hat Developer](https://developers.redhat.com/articles/2025/10/22/how-spec-driven-development-improves-ai-coding-quality)
- **EU AI Act:** sistemas de IA de alto risco devem cumprir obrigações a partir de 2 de agosto de 2026. Fonte: [LogRocket](https://blog.logrocket.com/ai-dev-tool-power-rankings/)

**Uso sugerido:** Contraponto no Bloco 2 (IA sem estrutura piora as coisas) e Call to Action (regulamentação vindo).