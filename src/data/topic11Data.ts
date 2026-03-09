export interface CodeforcesRow {
	model: string;
	rating: number;
	percentile: string;
	equivalent: string;
}

export interface TransitionStage {
	name: string;
	year: string;
	description: string;
}

export interface ResponsibilityItem {
	label: string;
	description?: string;
}

export interface Topic11Data {
	title: string;
	subtitle: string;
	narratorNotes: string[];
	codeforcesLadder: {
		intro: string;
		rows: CodeforcesRow[];
		highlight: string;
		source: string;
	};
	orchestrationStat: {
		value: number;
		suffix: string;
		label: string;
		source: string;
	};
	transition: {
		stages: TransitionStage[];
		supportText: string;
	};
	responsibilities: {
		before: ResponsibilityItem[];
		after: ResponsibilityItem[];
	};
	closingQuote: string;
	labels: {
		codeforcesEyebrow: string;
		codeforcesTableCaption: string;
		transitionEyebrow: string;
		transitionHeading: string;
		responsibilitiesEyebrow: string;
		beforeLabel: string;
		afterLabel: string;
		closingEyebrow: string;
		notesTerminalTitle: string;
		notesTerminalLead: string;
		notesLinePrefix: string;
		notesTerminalOutro: string;
	};
}

export const topic11Data: Topic11Data = {
	title: 'De Coder a Conductor',
	subtitle: 'A IA é o programador de elite. Você é o orquestrador.',

	narratorNotes: [
		'Abertura: mostre a tabela do Codeforces — a escada sobe de 11% para 99,8% em ~1 ano. Deixe o número impactar antes de continuar.',
		'Pivô: "A IA já programa melhor que 99,8% dos humanos. O que sobra pra gente?" — pausa dramática aqui.',
		'Addy Osmani (Google) nomeou a transição: Coder → Conductor → Orchestrator. 2025-2026 é a era do Orchestrator.',
		'Dado: 57% das organizações já rodam workflows multi-agente. Não é futuro — é presente.',
		'Feche com a frase: "Não estamos sendo substituídos. Estamos sendo promovidos a gerentes de IA." Deixe o silêncio trabalhar.',
	],

	codeforcesLadder: {
		intro:
			'O Codeforces é a maior plataforma de programação competitiva do mundo (1,6M+ usuários). A IA escalou o ranking em ~12 meses:',
		rows: [
			{
				model: 'GPT-4o (2024)',
				rating: 808,
				percentile: '11º percentil',
				equivalent: 'Abaixo da mediana',
			},
			{
				model: 'o1-preview (2024)',
				rating: 1258,
				percentile: '62º percentil',
				equivalent: 'Acima da média',
			},
			{
				model: 'o1 (2024)',
				rating: 1807,
				percentile: '~93º percentil',
				equivalent: 'Top 7%',
			},
			{
				model: 'o3 (Dez 2024)',
				rating: 2727,
				percentile: '99,8º percentil',
				equivalent: 'Int\'l Grandmaster — top 200 do planeta',
			},
		],
		highlight:
			'Com rating 2.727, o o3 superou o chief scientist da própria OpenAI (2.665). Menos de 200 humanos acima dele no ranking global.',
		source: 'OpenAI, "Competitive Programming with Large Reasoning Models" (arXiv, fev/2025)',
	},

	orchestrationStat: {
		value: 57,
		suffix: '%',
		label: 'das organizações já implantam workflows multi-agente',
		source: 'Anthropic, 2026 Agentic Coding Trends Report',
	},

	transition: {
		stages: [
			{
				name: 'Coder',
				year: '2023',
				description: 'Você escreve o código, a IA autocompleta trechos. Execução manual, linha por linha.',
			},
			{
				name: 'Conductor',
				year: '2024',
				description: 'Você dá direções, a IA executa tarefas unitárias. Delegação parcial com supervisão constante.',
			},
			{
				name: 'Orchestrator',
				year: '2025–2026',
				description:
					'Você projeta o sistema, define intenções e coordena múltiplos agentes autônomos trabalhando em paralelo.',
			},
		],
		supportText: 'Addy Osmani (Google) — "From Coder to Orchestrator" (jan/2026)',
	},

	responsibilities: {
		before: [
			{ label: 'Escrever código linha por linha' },
			{ label: 'Debugar manualmente' },
			{ label: 'Code review de outros humanos' },
			{ label: 'Pesquisar Stack Overflow' },
		],
		after: [
			{
				label: 'Especificar intenção',
				description: 'Definir o que construir com precisão — specs, PRDs, stories',
			},
			{
				label: 'Orquestrar agentes',
				description: 'Delegar para agentes especializados que trabalham em paralelo',
			},
			{
				label: 'Revisar output',
				description: 'Avaliar PRs gerados por IA — muitas vezes produzidos overnight',
			},
			{
				label: 'Decidir arquitetura',
				description: 'Tomar decisões que a IA não pode tomar sozinha',
			},
			{
				label: 'Validar entregas',
				description: 'Garantir que o sistema resolve os problemas certos',
			},
		],
	},

	closingQuote:
		'Não estamos sendo substituídos pela IA. Estamos sendo promovidos a gerentes de IA.',

	labels: {
		codeforcesEyebrow: 'A escalada da IA no Codeforces · ~12 meses',
		codeforcesTableCaption: 'Progressão de rating dos modelos OpenAI na plataforma Codeforces',
		transitionEyebrow: 'A transição de papel · Addy Osmani (Google)',
		transitionHeading: 'Coder → Conductor → Orchestrator',
		responsibilitiesEyebrow: 'O novo dia-a-dia · 2023 vs 2025–2026',
		beforeLabel: 'Antes (2023–2024)',
		afterLabel: 'Agora (2025–2026)',
		closingEyebrow: 'O gargalo mudou',
		notesTerminalTitle: 'narrator://topic11',
		notesTerminalLead: 'Condução sugerida — De Coder a Conductor.',
		notesLinePrefix: 'nota',
		notesTerminalOutro: 'Fecho: o gargalo não é velocidade de implementação. É qualidade de especificação.',
	},
};
