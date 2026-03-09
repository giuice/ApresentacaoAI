export interface RoiMetric {
	value: number;
	suffix: string;
	label: string;
	source: string;
	context: string;
}

export interface ImpactCase {
	company: string;
	badge: string;
	detail: string;
	source: string;
}

export interface Topic12Data {
	title: string;
	subtitle: string;
	heroMetric: RoiMetric;
	roiMetrics: RoiMetric[];
	impactCases: ImpactCase[];
	narratorNotes: string[];
	labels: {
		heroEyebrow: string;
		metricsEyebrow: string;
		casesEyebrow: string;
		roiTimelineNote: string;
		notesTerminalTitle: string;
		notesTerminalLead: string;
		notesLinePrefix: string;
		notesTerminalOutro: string;
	};
}

export const topic12Data: Topic12Data = {
	title: 'ROI e Métricas de Impacto',
	subtitle: 'Números concretos para justificar investimento em Context Engineering',

	heroMetric: {
		value: 55,
		suffix: '%',
		label: 'mais rápido em tarefas de código com ferramentas estruturadas de IA',
		source: 'GitHub Copilot Research + McKinsey Global Survey, 2025',
		context: 'vs. desenvolvimento sem assistência estruturada de IA',
	},

	roiMetrics: [
		{
			value: 11,
			suffix: ' sem',
			label: 'para atingir ROI positivo com Context Engineering',
			source: 'McKinsey Digital, 2025 — análise de 50+ implementações',
			context:
				'Semanas 1–3: overhead de specs. Semanas 4–6: break-even. Semana 11+: retorno líquido.',
		},
		{
			value: 60,
			suffix: '%',
			label: 'menos PRs rejeitados por inconsistência arquitetural',
			source: 'Spec-Kit Research & GitHub Enterprise Analytics, 2025',
			context: 'Equipes com specs estruturadas e constituição de projeto definida',
		},
		{
			value: 90,
			suffix: '%',
			label: 'do código gerado por IA com boas specs — 50–80% de economia de tempo',
			source: 'Análise combinada: Anthropic, GitHub, McKinsey, 2025',
			context: 'Overhead inicial de 20–40% (criação de specs) amortizado em 6–8 semanas',
		},
		{
			value: 500,
			suffix: 'K+',
			label: 'horas de engenharia economizadas por uma única empresa',
			source: 'TELUS, relatório interno citado pela Anthropic, 2026',
			context: 'Com adoção de workflows agênticos estruturados (Claude + GSD/BMAD)',
		},
	],

	impactCases: [
		{
			company: 'Airbnb',
			badge: '6 semanas vs. 1,5 ano estimado',
			detail:
				'Projeto estimado em 18 meses concluído em 6 semanas com IA + specs estruturadas — 92% de redução no prazo.',
			source: 'Airbnb Engineering Blog, 2025',
		},
		{
			company: 'Google',
			badge: '−50% no tempo de migração',
			detail:
				'50% de redução no tempo de migração de sistemas legados com assistência de IA estruturada e contexto persistente.',
			source: 'Google Cloud Next, 2025',
		},
		{
			company: 'BMAD Community',
			badge: '€80.000 economizados',
			detail:
				'Startup FinTech: MVP completo em 6 semanas com framework multi-agente — equivalente a 4 meses de um time sênior.',
			source: 'BMAD Case Studies, 2025',
		},
	],

	narratorNotes: [
		'Enquadramento: "Vocês não estão aqui para aprender nova tecnologia — estão aqui para entender o ROI antes de alocar budget."',
		'O dado de 55% é conservador. Estudos GitHub (2024) e McKinsey mostram que equipes treinadas chegam a 75–80% em tarefas específicas.',
		'A curva J é a chave: há overhead real nas primeiras 6–8 semanas (criação de specs, treinamento de contexto). Quem desiste aqui perde o retorno.',
		'Para EM: o risco NÃO é a ferramenta — é onboarding sem metodologia. IA sem specs é um dev sênior sem planta arquitetural.',
		'Para CTO: TELUS economizou 500K horas de engenharia. Isso é ~250 engenheiros por 1 ano. O multiplicador está no workflow, não no modelo.',
		'Fechamento executivo: "11 semanas para ROI positivo. O que você está esperando para começar a investir em metodologia?"',
	],

	labels: {
		heroEyebrow: 'Ganho de velocidade · média de múltiplos estudos 2024–2025',
		metricsEyebrow: 'Indicadores-chave de ROI · Context Engineering estruturado',
		casesEyebrow: 'Evidências de impacto · casos reais documentados',
		roiTimelineNote:
			'Curva J: overhead semanas 1–6 → break-even → ROI positivo semana 11+',
		notesTerminalTitle: 'narrator://topic12',
		notesTerminalLead: 'Condução sugerida — ROI e Métricas para audiência executiva (EM/CTO).',
		notesLinePrefix: 'nota',
		notesTerminalOutro: 'Fecho: "11 semanas para ROI. Qual o custo de não começar?"',
	},
};
