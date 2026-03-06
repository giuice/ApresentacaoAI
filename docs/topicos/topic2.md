# Tópico: A Ilusão de Produtividade — Por que falha?
## Tópico: 2
## Bloco: 1 — O Problema

## Título: "A Ilusão de Produtividade: 19% mais lento achando que era 24% mais rápido"

## Conteúdo:

**Headline — O Estudo METR (julho 2025, RCT):**
- Devs achavam que seriam 24% mais rápidos com IA
- Depois do estudo, ainda acreditavam ter sido 20% mais rápidos
- Resultado real: **19% mais lentos**
- Gap percepção vs. realidade: **43 pontos percentuais**

**Por que isso acontece (sintomas do dia-a-dia):**
- 9% do tempo gasto revisando e corrigindo código gerado pela IA
- A IA gera mais "idle time" — dev fica distraído enquanto espera
- Funções duplicadas, arquivos com mesma função, perda de contexto
- O chat longo vira antipadrão: quanto mais conversa, pior o resultado

**Dados de suporte:**
- 45% dos devs relatam dificuldades da IA com tarefas complexas
- 67% gastam tempo extra em debugging na fase de aprendizado
- ~24,7% do código gerado por IA tem falhas de segurança (2026)
- Engenheiros sênior reportam "development hell" com código de IA (Fast Company, set 2025)

## Métrica de Destaque
**43 pontos de gap** entre percepção (+24%) e realidade (-19%) — dado do estudo METR

## Notas do Apresentador
Este é talvez o dado mais importante da apresentação. A METR — uma organização sem fins lucrativos de pesquisa em IA — fez algo que quase ninguém fez: um estudo randomizado e controlado com desenvolvedores reais, em repositórios reais, com ferramentas de ponta.

O resultado? Os devs ficaram 19% mais lentos usando IA. Mas — e aqui está o ponto crucial — eles saíram do estudo achando que tinham sido 20% mais rápidos. A diferença entre o que achavam e o que aconteceu é de 43 pontos percentuais.

Por que isso acontece? Porque a IA torna o trabalho mais fácil cognitivamente, mas não necessariamente mais rápido. Você gasta tempo revisando, corrigindo, esperando. Funções duplicadas aparecem. O contexto se perde. E o chat longo — aquela conversa infinita com a IA — é um antipadrão. Quanto mais longa a conversa, pior o resultado.

45% dos devs já relatam dificuldades com tarefas complexas. Quase um quarto do código gerado tem falhas de segurança. A IA é boa — mas sem estrutura, ela cria uma ilusão de produtividade que esconde problemas reais.

Uma nota importante sobre o estudo METR: ele usou ferramentas de início de 2025, como Cursor com Claude 3.5/3.7 Sonnet. As ferramentas evoluíram desde então. Mas o ponto central permanece: sem estrutura e sem **disciplina de contexto** (importantissimo descatar esse termo), mais ferramenta não resolve o problema — pode até piorá-lo.

## Experiência Visual e Interativa
- **Elemento principal:** Gráfico de barras animado contrastando as 3 barras: "Expectativa +24%" (verde) → "Percepção +20%" (amarelo) → "Realidade -19%" (vermelho) — barras crescem/decrescem com animação
- **Reveal progressivo:** Primeiro mostra a expectativa (+24%), depois a percepção (+20%), e por último a realidade (-19%) com efeito de impacto/shake na tela
- **Counter animado:** "43 pontos de gap" aparecendo como número grande pulsante depois do reveal
- **Seção de sintomas:** Cards dos sintomas do dia-a-dia que aparecem abaixo do gráfico, com scroll
- **Dados de suporte:** Seção expandível/accordion com os dados complementares (segurança, debugging, etc.)
- **Tom visual:** Continuação do vermelho/alarme do Tópico 1, reforçando o problema

## Fontes
- Estudo METR: "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity", julho 2025 (RCT, 16 devs, 246 tarefas) — metr.org
- Atualização METR fev 2026: segundo estudo enfrentou problemas de recrutamento — devs se recusam a trabalhar sem IA
- 9% do tempo em revisão: análise de screen recordings do estudo METR, via Ars Technica
- 45% dificuldades com tarefas complexas: Banco de Métricas
- 67% debugging extra: Banco de Métricas
- 24,7% falhas de segurança: DEV Community, jan 2026
- "Development hell": Fast Company, set 2025