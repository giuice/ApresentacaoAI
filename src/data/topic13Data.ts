export interface SkillConnection {
	tool: 'Spec-Kit' | 'GSD' | 'BMAD';
	detail: string;
}

export interface SkillItem {
	time: string;
	name: string;
	tagline: string;
	scene: string;
	connections: SkillConnection[];
}

export interface SkillMatrixRow {
	skill: string;
	specKit: string;
	gsd: string;
	bmad: string;
}

export interface Topic13Data {
	title: string;
	subtitle: string;
	heroMetric: {
		value: number;
		suffix: string;
		label: string;
		source: string;
	};
	supportingMetrics: {
		text: string;
		source: string;
	}[];
	skills: SkillItem[];
	matrix: SkillMatrixRow[];
	closingQuote: string;
	narratorNotes: string[];
	labels: {
		heroEyebrow: string;
		timelineEyebrow: string;
		matrixEyebrow: string;
		closingEyebrow: string;
		notesTerminalTitle: string;
		notesTerminalLead: string;
		notesLinePrefix: string;
		notesTerminalOutro: string;
	};
}

export const topic13Data: Topic13Data = {
	title: 'As 5 Skills do Context Engineer',
	subtitle: 'Upskilling em quê? 5 competências que não existiam formalmente há 2 anos.',

	heroMetric: {
		value: 80,
		suffix: '%',
		label: 'da força de trabalho de engenharia precisará de upskilling até 2027',
		source: 'Gartner, outubro 2024',
	},

	supportingMetrics: [
		{
			text: '+1.445% em consultas sobre sistemas multi-agentes (Q1/2024→Q2/2025)',
			source: 'Gartner, 2025',
		},
		{
			text: '"Verificação humana será a skill mais valiosa no pipeline de entrega de software"',
			source: 'DevOps Digest, previsões 2026',
		},
		{
			text: 'Com boas specs: 90% do código gerado, 50–80% de economia de tempo',
			source: 'Banco de Métricas — Anthropic, GitHub, McKinsey, 2025',
		},
	],

	skills: [
		{
			time: '08:30',
			name: 'Validação',
			tagline: 'Avaliar criticamente o que a IA produziu',
			scene:
				'Você chega e revisa PRs que agentes geraram overnight. Um dashboard ficou bom; o outro escolheu uma biblioteca que você não quer. Você sabe avaliar porque entende a arquitetura — a IA digitou, você julgou.',
			connections: [
				{ tool: 'Spec-Kit', detail: 'Checklists como unit tests, phase gates de complexidade' },
				{ tool: 'GSD', detail: 'Verifier pós-execução, plan-checker (3 iterações), Nyquist Layer' },
				{ tool: 'BMAD', detail: 'Adversarial review, check-implementation-readiness' },
			],
		},
		{
			time: '09:15',
			name: 'Spec Writing',
			tagline: 'Documentar intenção de forma executável',
			scene:
				'Product pediu um sistema de notificações. Em vez de abrir o editor e codar, você abre o template de spec. Define user stories, critérios Given/When/Then, marca o que não está claro com [NEEDS CLARIFICATION]. Em 30 minutos: um contrato executável.',
			connections: [
				{ tool: 'Spec-Kit', detail: '/speckit.specify, marcadores [NEEDS CLARIFICATION]' },
				{ tool: 'GSD', detail: 'REQUIREMENTS.md com IDs rastreáveis, planos atômicos' },
				{ tool: 'BMAD', detail: 'Pipeline PRD → Architecture → Epics → Stories' },
			],
		},
		{
			time: '10:00',
			name: 'Orquestração',
			tagline: 'Coordenar agentes especializados em paralelo',
			scene:
				'A spec está pronta. Você configura: o pesquisador analisa bibliotecas de WebSocket, o planejador gera o plano técnico, o executor implementa em waves paralelas. Você define a sequência, as dependências, o que roda simultâneo.',
			connections: [
				{
					tool: 'Spec-Kit',
					detail: 'Pipeline specify→plan→tasks, tarefas [P] para execução paralela',
				},
				{ tool: 'GSD', detail: 'Waves paralelas, 4 researchers simultâneos por fase' },
				{ tool: 'BMAD', detail: 'Time virtual PM/Arch/Dev/QA/SM/UX, party-mode' },
			],
		},
		{
			time: '11:30',
			name: 'Context Design',
			tagline: 'Projetar o ambiente de informação da IA',
			scene:
				'O executor do primeiro wave não respeitou a convenção de nomes. Você atualiza o project-context.md com a regra que faltava. Cada executor futuro vai receber automaticamente. Você não corrigiu código — corrigiu contexto.',
			connections: [
				{
					tool: 'Spec-Kit',
					detail: 'Constituição do projeto (9 artigos), templates que constringem LLMs',
				},
				{
					tool: 'GSD',
					detail: 'Contexto fresco 200K tokens/executor, CONTEXT.md por fase',
				},
				{
					tool: 'BMAD',
					detail: 'project-context.md carregado automaticamente, ADRs na arquitetura',
				},
			],
		},
		{
			time: '14:00',
			name: 'System Design for AI',
			tagline: 'Arquitetar sistemas onde IA é componente de primeira classe',
			scene:
				'O gerente pede para automatizar mais. Você projeta um pipeline onde métricas de produção alimentam a priorização de specs. Define qual modelo usar para cada tipo de tarefa: Opus para planejamento, Sonnet para execução, Haiku para verificação.',
			connections: [
				{ tool: 'Spec-Kit', detail: 'Feedback bidirecional specs↔produção' },
				{ tool: 'GSD', detail: 'Model profiles com routing por agente (quality/balanced/budget)' },
				{ tool: 'BMAD', detail: 'Workflow engine, sistema modular, BMad Builder' },
			],
		},
	],

	matrix: [
		{
			skill: 'Context Design',
			specKit: 'Constituição do projeto, templates',
			gsd: 'Contexto 200K/executor, CONTEXT.md',
			bmad: 'project-context.md, ADRs',
		},
		{
			skill: 'Spec Writing',
			specKit: '/speckit.specify, [NEEDS CLARIFICATION]',
			gsd: 'REQUIREMENTS.md, planos atômicos',
			bmad: 'PRD → Architecture → Stories',
		},
		{
			skill: 'Orquestração',
			specKit: 'specify→plan→tasks, [P] paralelas',
			gsd: 'Waves paralelas, 4 researchers',
			bmad: 'Time PM/Arch/Dev/QA/SM/UX',
		},
		{
			skill: 'Validação',
			specKit: 'Checklists, phase gates',
			gsd: 'Verifier, plan-checker, Nyquist',
			bmad: 'Adversarial review, readiness check',
		},
		{
			skill: 'System Design for AI',
			specKit: 'Feedback specs↔produção',
			gsd: 'Model profiles, routing por agente',
			bmad: 'Workflow engine, BMad Builder',
		},
	],

	closingQuote:
		'São 5 skills. Nenhuma exige voltar para a faculdade. Escolha uma e comece no próximo projeto. Context Design é a mais fundamental — sem ela, nenhuma das outras funciona bem.',

	narratorNotes: [
		'Abertura: "A Gartner diz que 80% dos engenheiros precisam de upskilling até 2027. Mas upskilling em quê? São 5 skills. Nenhuma é sobre escrever código mais rápido."',
		'Timeline "Um Dia na Vida": narrar como um dia real. A cada horário, nomear a skill e explicar por que ela substitui digitação bruta.',
		'08:30 VALIDAÇÃO: você revisa PRs de agentes. A IA digitou, você julgou. O conhecimento técnico não some — ele migra de atividade primária para background que informa julgamento.',
		'09:15 SPEC WRITING: 30 minutos de spec economizam dias de retrabalho. A spec é o blueprint executável — sem ela, você grita instruções para um pedreiro sem planta.',
		'10:00 ORQUESTRAÇÃO: Gartner registrou +1.445% em consultas sobre multi-agentes. Não é hype — é o reconhecimento de que um agente genérico não resolve problemas complexos.',
		'11:30 CONTEXT DESIGN: você não corrigiu código — corrigiu contexto. A diferença entre IA que alucina e IA consistente não é o modelo, é o contexto.',
		'14:00 SYSTEM DESIGN FOR AI: não é "usar IA para codar" — é projetar sistemas que incorporam IA em loops de feedback. Um nível acima do que apenas pede código.',
		'Mapa Skills×Ferramentas: cada ferramenta exercita as 5 skills de formas diferentes. Context Design é fundação. Orquestração é DNA do GSD. Validação é obsessão do BMAD.',
		'Fechamento: "O ponto não é dominar as 5 de uma vez. É parar de investir 100% do tempo na skill que a IA já faz bem — escrever código — e começar a investir nas que só você pode fazer."',
	],

	labels: {
		heroEyebrow: 'Upskilling em engenharia · Gartner, outubro 2024',
		timelineEyebrow: 'Um dia na vida do context engineer · 5 skills em ação',
		matrixEyebrow: 'Skills × Ferramentas · como cada tool exercita cada competência',
		closingEyebrow: 'Ponto de partida',
		notesTerminalTitle: 'narrator://topic13',
		notesTerminalLead: 'Condução sugerida — As 5 Skills do Context Engineer.',
		notesLinePrefix: 'nota',
		notesTerminalOutro:
			'Fecho: "Escolha uma skill. Context Design é a mais fundamental — sem ela, nenhuma das outras funciona bem."',
	},
};
