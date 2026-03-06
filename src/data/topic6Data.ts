export interface Topic6HeroMetric {
  value: number;
  suffix: string;
  label: string;
  context: string;
  variant: 'success';
}

export interface Topic6Tool {
  name: string;
  level: string;
  icon: string;
  problem: string;
  solution: string;
  audience: string;
  sddLevel: string;
  adoptionSignal: string;
  impactMetric: string;
}

export interface Topic6Data {
  title: string;
  subtitle: string;
  heroMetric: Topic6HeroMetric;
  inevitabilityQuote: string;
  inevitabilitySource: string;
  complexityAxisLabel: string;
  toolLadder: Topic6Tool[];
  comparisonNote: string;
  narratorTerminalTitle: string;
  narratorHeader: string;
  narratorFooter: string;
  narratorNotes: string[];
}

export const topic6Data: Topic6Data = {
  title: 'A Ferramenta Certa para a Escala Certa',
  subtitle: 'Topico 6 · Spec-Kit -> GSD -> BMAD',
  heroMetric: {
    value: 85,
    suffix: '%',
    label: 'A inevitabilidade',
    context:
      'dos desenvolvedores ja usam IA regularmente em 2025; a diferenca entre caos e resultado esta na estrutura.',
    variant: 'success',
  },
  inevitabilityQuote:
    '2025 foi o ano da transicao do Vibe Coding para Context Engineering.',
  inevitabilitySource: 'MIT Technology Review · Novembro de 2025',
  complexityAxisLabel: 'Complexidade ->',
  toolLadder: [
    {
      name: 'Spec-Kit',
      level: 'Nivel 1',
      icon: '📜',
      problem:
        'Problema: IA sem contexto consistente gera codigo desalinhado entre sessoes.',
      solution:
        'Solucao: cria a constituicao do projeto com templates, regras e convencoes spec-first.',
      audience: 'Escopo ideal: projeto individual ou time pequeno em fase inicial.',
      sddLevel: 'Nivel SDD: spec-first.',
      adoptionSignal: 'Sinal de adocao: ~71k stars, 22+ plataformas e 110 releases.',
      impactMetric: 'Impacto: 60% menos PRs rejeitados por arquitetura.',
    },
    {
      name: 'GSD',
      level: 'Nivel 2',
      icon: '🔄',
      problem:
        'Problema: Context Rot degrada qualidade em sessoes longas e vira retrabalho.',
      solution:
        'Solucao: reseta o contexto por tarefa com executores autonomos e contexto fresco.',
      audience: 'Escopo ideal: dev solo com projeto em crescimento e alta cadencia.',
      sddLevel: 'Nivel SDD: spec-anchored.',
      adoptionSignal:
        'Sinal de adocao: usado por engenheiros de Amazon, Google e Shopify; multi-runtime.',
      impactMetric: 'Impacto: 100 mil linhas em 2 semanas em caso dev solo.',
    },
    {
      name: 'BMAD',
      level: 'Nivel 3',
      icon: '🧠',
      problem:
        'Problema: falta validacao cruzada quando uma pessoa tenta cobrir todos os papeis.',
      solution:
        'Solucao: orquestra agentes especialistas (PM, arquiteto, dev, QA, UX) a partir da spec.',
      audience: 'Escopo ideal: projetos complexos com governanca e multiplas perspectivas.',
      sddLevel: 'Nivel SDD: spec-as-source.',
      adoptionSignal:
        'Sinal de adocao: v6 alpha cross-platform, open source e filosofia docs-as-code.',
      impactMetric: 'Impacto: MVP Fintech em 6 semanas com economia de €80 mil.',
    },
  ],
  comparisonNote:
    'Essas ferramentas nao competem: comeca com Spec-Kit, escala com GSD e amadurece com BMAD conforme a complexidade aumenta.',
  narratorTerminalTitle: 'narrador-topic6.md',
  narratorHeader: 'Notas do narrador — Escada de complexidade',
  narratorFooter:
    'Fechamento: ferramenta certa para escala certa; as tres sao complementares.',
  narratorNotes: [
    'Nao existe melhor ferramenta universal; existe aderencia entre problema e escala.',
    'Spec-Kit resolve a base: consistencia de contexto e padronizacao inicial.',
    'GSD resolve degradacao de contexto com ciclos curtos e execucao orientada a fases.',
    'BMAD resolve a necessidade de visao sistêmica com agentes especializados por papel.',
    'A mesma jornada pode evoluir em camadas: Spec-Kit primeiro, GSD no crescimento e BMAD na complexidade alta.',
    'Conecte com os proximos topicos: agora aprofundamos cada ferramenta individualmente.',
  ],
};
