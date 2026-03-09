export interface ScaleCase {
	step: number;
	scaleLabel: string;
	company: string;
	subtitle: string;
	before: string;
	beforeLabel: string;
	after: string;
	afterLabel: string;
	savingsLabel: string;
	extraMetric: string;
	insight: string;
	source: string;
}

export interface TimelinePoint {
	year: string;
	subject: string;
	rating: string;
	percentile: string;
}

export interface Topic15Data {
	title: string;
	subtitle: string;
	scaleCases: ScaleCase[];
	patternNote: string;
	timeline: {
		points: TimelinePoint[];
		closingQuestion: string;
	};
	narratorNotes: string[];
	labels: {
		scalesEyebrow: string;
		timelineEyebrow: string;
		patternEyebrow: string;
		notesTerminalTitle: string;
		notesTerminalLead: string;
		notesLinePrefix: string;
		notesTerminalOutro: string;
	};
}

export const topic15Data: Topic15Data = {
	title: 'Cases Reais — Do Dev Solo ao Enterprise',
	subtitle: 'A prova em escala: estrutura funciona em qualquer tamanho de time.',

	scaleCases: [
		{
			step: 1,
			scaleLabel: 'Indivíduo',
			company: 'Ralph Wiggum Loop',
			subtitle: '1 dev · loop autônomo · MVP completo',
			before: 'US$ 50.000',
			beforeLabel: 'valor do contrato',
			after: 'US$ 297',
			afterLabel: 'custo total em API',
			savingsLabel: '99,4% de economia',
			extraMetric: 'MVP entregue, testado e revisado',
			insight:
				'Com a especificação certa, um dev solo compete com uma agência inteira.',
			source: 'Geoff Huntley (jul/2025) · VentureBeat (jan/2026)',
		},
		{
			step: 2,
			scaleLabel: 'Equipe (6 eng.)',
			company: 'Airbnb',
			subtitle: '3.500 arquivos · Enzyme → React Testing Library',
			before: '18 meses',
			beforeLabel: 'estimativa manual',
			after: '6 semanas',
			afterLabel: 'com pipeline estruturado',
			savingsLabel: '92% mais rápido',
			extraMetric: '97% automatizado · 75% dos arquivos nas primeiras 4 horas',
			insight:
				'Não foi o modelo — foi a arquitetura do pipeline. Context Engineering puro.',
			source: 'Airbnb Engineering Blog (mar/2025)',
		},
		{
			step: 3,
			scaleLabel: 'Enterprise',
			company: 'Google',
			subtitle: '39 migrações · 500M+ linhas de codebase',
			before: '0% IA',
			beforeLabel: 'ponto de partida',
			after: '80%',
			afterLabel: 'do código gerado por IA',
			savingsLabel: '50% menos tempo de migração',
			extraMetric: '87% commitado sem nenhuma alteração humana',
			insight:
				'Sistema rodava toda noite: gera → valida → repara → human review.',
			source: 'arXiv:2501.06972 (jan/2025) · Google Research',
		},
		{
			step: 4,
			scaleLabel: 'Mega-Enterprise',
			company: 'Amazon',
			subtitle: '30.000 apps · Java 8/11 → Java 17 via Amazon Q',
			before: 'décadas estimadas',
			beforeLabel: 'custo manual',
			after: '4.500 anos',
			afterLabel: 'de trabalho economizados',
			savingsLabel: 'US$ 260M savings/ano',
			extraMetric: '79% do código shipado sem mudança · 1.000+ devs beneficiados',
			insight:
				'Números reportados por Andy Jassy a Wall Street — não é experimento.',
			source: 'AWS DevOps Blog (ago/2024) · Q2 2024 Earnings Call',
		},
	],

	patternNote:
		'Padrão comum a todos os cases: especificação estruturada + pipelines com validação automática + human-in-the-loop nos pontos certos. É exatamente o oposto do Vibe Coding.',

	timeline: {
		points: [
			{
				year: '2022',
				subject: 'AlphaCode (Google DeepMind)',
				rating: '~1.200',
				percentile: 'Mediana dos competidores',
			},
			{
				year: '2024',
				subject: 'OpenAI o1',
				rating: '1.807',
				percentile: 'Melhor que 93% dos humanos',
			},
			{
				year: '2025',
				subject: 'OpenAI o3',
				rating: '2.700',
				percentile: 'Top 200 no planeta · Medalha de Ouro IOI',
			},
		],
		closingQuestion: 'Se a IA já é o dev de elite... qual é o seu papel?',
	},

	narratorNotes: [
		'"Chega de teoria. Vamos ver quem já fez isso funcionar — e em que escala." Tom factual, crescente.',
		'DEGRAU 1 — Ralph: "Um dev solo, US$ 50k de contrato, US$ 297 em API. Não é ficção científica — publicado em julho de 2025. O segredo? Ele especificou, não conversou."',
		'DEGRAU 2 — Airbnb: "3.500 arquivos, estimativa de 1,5 anos. Resultado: 6 semanas. O insight: não foi o modelo, foi a arquitetura do pipeline. Context Engineering puro."',
		'DEGRAU 3 — Google: "Codebase de 500M+ linhas. 80% do código das migrações foi IA. 87% commitado sem toque humano. Sistema rodava toda noite — não foi demo."',
		'DEGRAU 4 — Amazon: "30.000 aplicações migradas. 4.500 anos de trabalho economizados. US$ 260 milhões em savings por ano. Andy Jassy reportou isso a Wall Street."',
		'"Notem o padrão." Pausa. "Em todos: especificação estruturada + validação automática + human-in-the-loop. É exatamente o que vimos nos Tópicos 4 e 5."',
		'Timeline Codeforces: "Em 3 anos: mediana → top 7% → top 200 do mundo. Se a IA já é o dev de elite em execução pura... qual é o seu papel?"',
		'Deixar a pergunta no ar. Transição para Tópico 11.',
	],

	labels: {
		scalesEyebrow: 'A Escada de Escala · do dev solo ao mega-enterprise',
		timelineEyebrow: 'A IA em programação competitiva · Codeforces, 3 anos',
		patternEyebrow: 'O padrão comum · o que fez funcionar em todos os cases',
		notesTerminalTitle: 'narrator://topic15',
		notesTerminalLead: 'Condução sugerida — Cases Reais: a prova em escala.',
		notesLinePrefix: 'nota',
		notesTerminalOutro:
			'Fecho: "Se a IA já é o dev de elite... qual é o seu papel?" → Tópico 11.',
	},
};
