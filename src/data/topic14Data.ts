export interface JCurvePhase {
	phase: string;
	timeframe: string;
	description: string;
}

export interface ValeForce {
	title: string;
	stat: string;
	note: string;
	source: string;
}

export interface CurveData {
	label: string;
	markers: string[];
	outcome: string;
}

export interface RoiDashMetric {
	value: number;
	suffix: string;
	label: string;
	source: string;
}

export interface Topic14Data {
	title: string;
	subtitle: string;
	narratorNotes: string[];
	heroBlock: {
		positive: {
			avg: string;
			top: string;
			label: string;
		};
		negative: {
			value: string;
			label: string;
		};
		source: string;
	};
	jCurve: {
		phases: JCurvePhase[];
		note: string;
	};
	valeForces: ValeForce[];
	twoCurves: {
		curves: CurveData[];
		separator: string;
		conclusion: string;
	};
	roiMetrics: RoiDashMetric[];
	formula: {
		text: string;
		speedNote: string;
		verificationNote: string;
	};
	labels: {
		heroEyebrow: string;
		jCurveEyebrow: string;
		valeEyebrow: string;
		curvesEyebrow: string;
		roiEyebrow: string;
		formulaEyebrow: string;
		notesTerminalTitle: string;
		notesTerminalLead: string;
		notesLinePrefix: string;
		notesTerminalOutro: string;
	};
}

export const topic14Data: Topic14Data = {
	title: 'A Curva J da IA',
	subtitle: 'Por que velocidade sem verificação é prejuízo disfarçado.',

	narratorNotes: [
		'"Vamos falar de dinheiro." Enquadrar desde o início: não é sobre tecnologia, é sobre ROI e onde você se posiciona na curva.',
		'A Curva J: a produtividade CAI antes de subir. A pergunta não é SE o vale existe — é quanto tempo você fica nele.',
		'Estudo METR: 16 devs experientes, 246 tarefas reais com screen recording. -19% mais lentos, mas acharam que foram +20% mais rápidos. Gap de 39pp entre percepção e realidade.',
		'Volume ≠ Valor: 41% do código é gerado por IA em 2026. O DORA mostrou correlação inversa — mais adoção sem estrutura = menos entrega, menos estabilidade.',
		'Duas curvas: mostrar a curva sem estrutura primeiro, depois revelar a curva com estrutura. "O que separa as duas? Uma palavra: verificação."',
		'ROI com estrutura: US$ 3,70 por dólar investido na média, US$ 10,30 nos top performers. Airbnb fez em 6 semanas o que estimava 18 meses. Google reduziu migração em 50%.',
		'"A fórmula é simples: ROI = Velocidade × Qualidade da Verificação. Sem o segundo fator, o primeiro é ilusão." Pausa longa aqui.',
		'Transição: "Na próxima seção, os cases de quem já está no topo da curva."',
	],

	heroBlock: {
		positive: {
			avg: 'US$ 3,70',
			top: 'US$ 10,30',
			label: 'por dólar investido — com estrutura',
		},
		negative: {
			value: '−19%',
			label: 'produtividade real — sem estrutura',
		},
		source: 'Wharton/Industry 2025 (médio/top) | METR arXiv:2507.09089 (sem estrutura)',
	},

	jCurve: {
		phases: [
			{
				phase: 'O Vale',
				timeframe: 'Meses 1–3',
				description:
					'Produtividade cai. Overhead de aprendizado, criação de specs, ajuste de processos. Investimento inicial consome 20–40% de tempo extra.',
			},
			{
				phase: 'Break-even',
				timeframe: 'Meses 3–6',
				description:
					'Processos estabilizam. Times aprendem onde a IA agrega e onde atrapalha. Métricas começam a se alinhar.',
			},
			{
				phase: 'ROI Positivo',
				timeframe: 'Meses 7–12+',
				description:
					'Ganhos compostos aparecem. Specs maduras, verificação automatizada, dívida técnica controlada. ~11 semanas com ferramentas estruturadas.',
			},
		],
		note: 'Padrão confirmado por MIT Sloan (manufatura), BCG (enterprise) e METR (desenvolvimento). Enterprise: 12–24 meses (IBM/Second Talent). Com ferramentas estruturadas: ~11 semanas.',
	},

	valeForces: [
		{
			title: 'O Paradoxo da Percepção',
			stat: '−19% real | +20% percebido',
			note: '16 devs, 246 tarefas, screen recording. Menos esforço cognitivo = sensação errada de velocidade. Gap de 39 pontos percentuais.',
			source: 'METR RCT, jul/2025 (arXiv:2507.09089)',
		},
		{
			title: 'Volume ≠ Valor',
			stat: '41% do código é IA · −1,5% entrega',
			note: 'DORA 2024 (39.000+ profissionais): cada +25% adoção de IA → −1,5% velocidade de entrega e −7,2% estabilidade do sistema.',
			source: 'DORA 2024 | Index.dev, 2026',
		},
		{
			title: 'Dispersão Mata',
			stat: '74% não escalam · 4% criam valor',
			note: 'Empresas que falham: 6,1 use cases simultâneos. Líderes: 3,5. Menos de 25% da força de trabalho capacitada na maioria das empresas.',
			source: 'BCG, abr/2025',
		},
	],

	twoCurves: {
		curves: [
			{
				label: 'Curva A — Sem Estrutura (Vibe Coding)',
				markers: [
					'Vale profundo e prolongado',
					'Complexidade do código +41%',
					'Warnings de análise estática +30%',
					'Confiança nos outputs: 29–46%',
					'Recuperação lenta ou inexistente',
				],
				outcome: 'Representada pelo estudo METR: −19% real',
			},
			{
				label: 'Curva B — Com Specs + Verificação',
				markers: [
					'Vale menor (overhead inicial amortizado)',
					'Recuperação em ~11 semanas',
					'ROI médio: US$ 3,70 por dólar investido',
					'Top performers: US$ 10,30 por dólar',
					'AI review no loop: +81% qualidade',
				],
				outcome: 'Representada por Google, Airbnb, top performers',
			},
		],
		separator: 'O que separa as duas curvas?',
		conclusion:
			'VERIFICAÇÃO RASTREÁVEL. Velocidade sem feedback loop gera dívida técnica invisível que consome o ganho.',
	},

	roiMetrics: [
		{
			value: 67,
			suffix: '%',
			label: 'das organizações com agentes reportam ganhos mensuráveis',
			source: 'DigitalOcean/VentureBeat, fev/2026 (1.100 devs/CTOs)',
		},
		{
			value: 81,
			suffix: '%',
			label: 'de ganho de qualidade com AI review no loop',
			source: 'Qodo State of AI Code Quality, jun/2025 (vs. 55% sem review)',
		},
		{
			value: 11,
			suffix: ' sem',
			label: 'para atingir ROI positivo com ferramentas estruturadas',
			source: 'McKinsey Digital, 2025 — análise de 50+ implementações',
		},
		{
			value: 62,
			suffix: '%',
			label: 'dos times com ≥25% de ganho de produtividade com implementação adequada',
			source: 'Jellyfish, nov/2025',
		},
	],

	formula: {
		text: 'ROI = Velocidade × Qualidade da Verificação',
		speedNote: 'IA gera código rápido — mas isso é commodity',
		verificationNote: 'Nyquist, specs, feedback loops — isso é o diferencial',
	},

	labels: {
		heroEyebrow: 'O contraste central · com estrutura vs. sem estrutura',
		jCurveEyebrow: 'A Curva J é real · padrão confirmado por MIT Sloan, BCG, METR',
		valeEyebrow: 'As três forças do vale · por que a produtividade cai antes de subir',
		curvesEyebrow: 'Duas curvas, não uma · o que separa o ROI positivo do negativo',
		roiEyebrow: 'ROI comprovado · quem atravessa o vale com estrutura',
		formulaEyebrow: 'A fórmula',
		notesTerminalTitle: 'narrator://topic14',
		notesTerminalLead: 'Condução sugerida — A Curva J da IA: posicionamento de carreira.',
		notesLinePrefix: 'nota',
		notesTerminalOutro:
			'Fecho: "ROI = Velocidade × Qualidade da Verificação. Sem verificação, velocidade é ilusão."',
	},
};
