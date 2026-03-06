export interface Topic4SupportingItem {
  highlight: string;
  text: string;
}

export interface Topic4TalkingPoint {
  text: string;
}

export interface Topic4Data {
  title: string;
  subtitle: string;
  definition: string;
  metric: {
    value: number;
    suffix: string;
    context: string;
  };
  supportingItems: Topic4SupportingItem[];
  talkingPoints: Topic4TalkingPoint[];
  narratorNotes: string[];
}

export const topic4Data: Topic4Data = {
  title: 'A Escada da Maturidade: De Copy-Paste a Orquestracao de Agentes',
  subtitle: 'De Prompt Engineering para Context Engineering',
  definition:
    'A evolucao do dev com IA nao e linear — e uma escada de maturidade. Cada degrau resolve limitacoes do anterior. A maioria esta presa nos niveis 1 ou 2. O salto real acontece no 3.',
  metric: {
    value: 55,
    suffix: '%',
    context: 'mais rapido com ferramentas estruturadas vs. ad hoc — e com boas specs, 90% do codigo e gerado pela IA',
  },
  supportingItems: [
    {
      highlight: 'Nivel 1',
      text: 'Copy-Paste — copiar codigo do ChatGPT, zero contexto do projeto',
    },
    {
      highlight: 'Nivel 2',
      text: 'Prompt Engineering — otimizar a pergunta, mas contexto degrada (Context Rot)',
    },
    {
      highlight: 'Nivel 3',
      text: 'Context Engineering — projetar todo o ambiente de informacao: specs, memoria, constraints',
    },
    {
      highlight: 'Nivel 4',
      text: 'Agentic Orchestration — orquestrar agentes especializados, cada um com persona e escopo',
    },
  ],
  talkingPoints: [
    {
      text: 'Andrej Karpathy cunhou "Context Engineering" em 2025. Tobi Lutke (CEO Shopify) definiu como a skill mais importante para devs.',
    },
    {
      text: 'Prompt Engineering otimiza a pergunta. Context Engineering projeta todo o ambiente de informacao que a IA recebe.',
    },
    {
      text: 'Equipes com ferramentas estruturadas completam tarefas 55% mais rapido. Com boas specs, a IA gera 90% do codigo.',
    },
    {
      text: 'Nivel 4 ja esta acontecendo: agentes especializados (PM, Arquiteto, Dev, QA) cada um com contexto proprio. E o que o BMAD faz.',
    },
  ],
  narratorNotes: [
    'No ultimo topico vimos que o contexto da IA degrada — Context Rot. A pergunta natural e: e ai, o que fazemos? A resposta e esta escada de maturidade.',
    'A maioria de nos comecou no Nivel 1: copiar e colar do ChatGPT. Depois evoluimos para o Nivel 2: aprendemos a fazer prompts melhores. E muita gente parou ai, achando que "prompt engineering" era o destino final.',
    'Nao e. O Andrej Karpathy — ex-diretor de IA da Tesla, cofundador da OpenAI — cunhou o termo "Context Engineering" em 2025. O Tobi Lutke, CEO do Shopify, foi alem e disse que essa e a skill mais importante para desenvolvedores hoje.',
    'A diferenca e fundamental: Prompt Engineering otimiza a pergunta. Context Engineering projeta todo o ambiente de informacao que a IA recebe — specs, memoria, exemplos, constraints, personas.',
    'E os numeros comprovam: equipes com ferramentas estruturadas completam tarefas 55% mais rapido. Com boas specs, a IA gera 90% do codigo, economizando ate 80% do tempo.',
    'A escada nao para no Nivel 3. O Nivel 4 — Agentic Orchestration — ja esta acontecendo. Nele, voce nao escreve codigo nem prompts. Voce orquestra agentes especializados. E o que o BMAD faz, vamos ver em detalhe mais a frente.',
    'A mensagem central aqui: nao e modismo. E maturidade metodologica. Cada degrau resolve limitacoes reais do anterior.',
  ],
};
