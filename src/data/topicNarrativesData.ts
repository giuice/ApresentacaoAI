export interface TopicNarrativeData {
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  narratorNotes: string[];
  accent: 'danger' | 'success';
}

export const topicNarrativesData: Record<number, TopicNarrativeData> = {
  6: {
    title: 'A Escala de Complexidade',
    subtitle: 'Spec-Kit → GSD → BMAD',
    summary:
      'Nao existe bala de prata: cada ferramenta resolve um nivel diferente de complexidade e coordenação.',
    highlights: [
      'Spec-Kit para escopo claro e foco em especificação',
      'GSD para fluxo disciplinado com contexto sempre fresco',
      'BMAD para coordenação multi-agente em escala',
    ],
    narratorNotes: [
      'Posicione este topico como mapa mental da audiencia antes de mergulhar em cada ferramenta.',
      'Reforce que o erro comum e tentar usar a ferramenta de escala errada para o problema.',
      'Conecte com o proximo topico: comecamos pela base, o Spec-Kit.',
    ],
    accent: 'success',
  },
  7: {
    title: 'Spec-Kit: A Constituicao do Projeto',
    subtitle: 'Spec como fonte de verdade',
    summary:
      'Spec-Kit transforma intencao em especificacao operacional: requisito, plano e tarefas versionadas.',
    highlights: [
      'Reduz ambiguidade antes de escrever codigo',
      'Padroniza o ponto de partida do time',
      'Acelera entregas quando o problema e bem delimitado',
    ],
    narratorNotes: [
      'Use a analogia da planta arquitetonica executavel uma unica vez aqui.',
      'Mostre que velocidade sem clareza e ilusao; clareza gera velocidade sustentavel.',
      'Prepare a ponte: quando a complexidade cresce, entramos no GSD.',
    ],
    accent: 'success',
  },
  8: {
    title: 'GSD em Acao',
    subtitle: 'Workflow com contexto vivo',
    summary:
      'GSD organiza execucao em ciclos curtos, reduzindo acoplamento com chats longos e contexto poluido.',
    highlights: [
      'Quebra trabalho em etapas objetivas',
      'Mantem rastreabilidade de decisoes',
      'Minimiza context rot por design de fluxo',
    ],
    narratorNotes: [
      'Demonstre ritmo: GSD e cadencia, nao so comando.',
      'Explique que contexto fresco e vantagem competitiva, nao detalhe tecnico.',
      'Feche com a pergunta: e quando precisamos de um time inteiro?',
    ],
    accent: 'success',
  },
  9: {
    title: 'BMAD: Time Multi-Agente',
    subtitle: 'Do dev solo para squad virtual',
    summary:
      'BMAD orquestra papeis especializados para aumentar throughput sem sacrificar qualidade arquitetural.',
    highlights: [
      'Persona e escopo claro para cada agente',
      'Workflow guiado com artefatos verificaveis',
      'Escala colaborativa com disciplina de contexto',
    ],
    narratorNotes: [
      'Use a analogia aprovada do time completo por US$ 10/hora somente aqui.',
      'Mostre que orquestracao sem criterio vira caos automatizado.',
      'Puxe para o topico 10: como decidir qual ferramenta usar.',
    ],
    accent: 'success',
  },
  11: {
    title: 'O Novo Desenvolvedor',
    subtitle: 'De executor para orquestrador',
    summary:
      'A vantagem competitiva muda de velocidade de digitacao para qualidade de contexto e decisao.',
    highlights: [
      'Curadoria de contexto',
      'Design de sistema e criterios de qualidade',
      'Orquestracao de agentes e validacao continua',
    ],
    narratorNotes: [
      'Reforce: IA nao substitui dev com metodo; amplia impacto.',
      'Diferencie claramente executor de prompt versus engenheiro de contexto.',
      'Conecte com ROI no proximo topico.',
    ],
    accent: 'success',
  },
  12: {
    title: 'ROI e Impacto',
    subtitle: 'Metricas que convencem lideranca',
    summary:
      'A adocao metodologica deve ser defendida por ganhos mensuraveis de throughput, qualidade e previsibilidade.',
    highlights: [
      'Mais tarefas concluidas com menos retrabalho',
      'Maior taxa de build bem-sucedido',
      'Menos risco operacional por padronizacao',
    ],
    narratorNotes: [
      'Fale em linguagem de negocio: risco, previsibilidade e retorno.',
      'Evite hype: trate numeros como evidencias, nao propaganda.',
      'Ponte para o paradoxo do junior: impacto nao e distribuido igualmente.',
    ],
    accent: 'success',
  },
  13: {
    title: 'O Paradoxo do Junior',
    subtitle: 'Competicao assimetrica na era IA',
    summary:
      'Sem metodo, o junior compete com IA + senior e perde; com metodo, ele acelera curva de aprendizado.',
    highlights: [
      'Metodo supera improviso',
      'Feedback loop curto acelera maturidade',
      'Documentacao viva vira mentor permanente',
    ],
    narratorNotes: [
      'Evite tom fatalista: o foco e dar caminho pratico, nao assustar.',
      'Enfatize que disciplina de contexto e alavanca de carreira.',
      'Leve para o topico de posicionamento profissional.',
    ],
    accent: 'danger',
  },
  14: {
    title: 'Posicionamento de Carreira',
    subtitle: 'Como se tornar indispensavel',
    summary:
      'O profissional valioso e quem transforma ambiguidade em direcao tecnica executavel.',
    highlights: [
      'Capacidade de framing de problema',
      'Decisao arquitetural com trade-offs explicitos',
      'Comunicacao tecnica orientada a resultado',
    ],
    narratorNotes: [
      'Traga exemplos concretos de postura: dono do problema, nao so do ticket.',
      'Mostre que senioridade agora inclui orquestracao de IA com governanca.',
      'Conecte com o roadmap de implementacao do topico 15.',
    ],
    accent: 'success',
  },
  15: {
    title: 'Caminho de Implementacao',
    subtitle: 'Roadmap em fases',
    summary:
      'Adoção eficaz acontece por ondas: fundacao, piloto controlado, escala com governanca.',
    highlights: [
      'Semana 1-2: padroes minimos e baseline',
      'Semana 3-6: piloto com metricas e retro',
      'Semana 7+: rollout progressivo com guardrails',
    ],
    narratorNotes: [
      'Entregue um plano acionavel, nao uma visao abstrata.',
      'Mostre que comecar pequeno reduz risco e aumenta adesao.',
      'Prepare o fechamento emocional no CTA final.',
    ],
    accent: 'success',
  },
  16: {
    title: 'Call to Action',
    subtitle: 'Do hype para a maturidade',
    summary:
      'Pare de medir sucesso por linhas geradas; comece a medir por valor entregue com contexto de qualidade.',
    highlights: [
      'Escolha uma frente piloto hoje',
      'Defina metrica de impacto e risco',
      'Transforme prompt em processo replicavel',
    ],
    narratorNotes: [
      'Feche com energia e clareza de proximo passo imediato.',
      'Convide a audiencia a adotar metodo antes de adotar mais ferramentas.',
      'Reforce a mensagem central: evolucao metodologica, nao modismo.',
    ],
    accent: 'success',
  },
};
