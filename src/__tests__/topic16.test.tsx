import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Topic16 from '@/components/topics/Topic16';
import { topic16Data } from '@/data/topic16Data';
import { CyberProgressBar } from '@/components/layout/CyberProgressBar';
import { getSegmentIndex } from '@/components/layout/CyberProgressBar';

// Subtask 4.1 — Testes do data source e do componente Topic16

describe('topic16Data', () => {
	it('exporta estrutura completa para o topico 16', () => {
		expect(topic16Data.title).toBeTruthy();
		expect(topic16Data.subtitle).toBeTruthy();
		expect(topic16Data.paradox.metrics).toHaveLength(2);
		expect(topic16Data.riskFindings.length).toBeGreaterThan(0);
		expect(topic16Data.enterpriseCards).toHaveLength(4);
		expect(topic16Data.loopSteps).toHaveLength(4);
		expect(topic16Data.finalManifesto.lines).toHaveLength(3);
		expect(topic16Data.narratorNotes.length).toBeGreaterThan(0);
	});

	it('define os 4 momentos visuais com labels corretos', () => {
		const { labels } = topic16Data;
		expect(labels.paradoxEyebrow).toBeTruthy();
		expect(labels.riskEyebrow).toBeTruthy();
		expect(labels.enterpriseEyebrow).toBeTruthy();
		expect(labels.loopEyebrow).toBeTruthy();
		expect(labels.manifestoEyebrow).toBeTruthy();
	});

	it('inclui as 4 empresas de referencia', () => {
		const companies = topic16Data.enterpriseCards.map((c) => c.company);
		expect(companies).toContain('GOOGLE');
		expect(companies).toContain('STRIPE');
		expect(companies).toContain('UBER');
		expect(companies).toContain('SHOPIFY');
	});

	it('define os 4 passos do loop fechado com fases corretas', () => {
		const phases = topic16Data.loopSteps.map((s) => s.phase);
		expect(phases).toContain('specs');
		expect(phases).toContain('generate');
		expect(phases).toContain('review');
		expect(phases).toContain('human');
	});

	it('o manifesto final tem 3 linhas e uma citacao', () => {
		expect(topic16Data.finalManifesto.lines).toHaveLength(3);
		expect(topic16Data.finalManifesto.quote).toBeTruthy();
		expect(topic16Data.finalManifesto.source).toBeTruthy();
	});

	it('as metricas do paradoxo tem cores definidas', () => {
		const colors = topic16Data.paradox.metrics.map((m) => m.color);
		expect(colors).toContain('positive');
		expect(colors).toContain('negative');
	});
});

describe('Topic16', () => {
	it('renderiza titulo e subtitulo a partir da fonte de dados', () => {
		render(<Topic16 />);

		expect(screen.getByText(topic16Data.title)).toBeInTheDocument();
		expect(screen.getByText(topic16Data.subtitle)).toBeInTheDocument();
	});

	it('renderiza os 4 labels de momentos visuais na pagina de conteudo', () => {
		render(<Topic16 />);

		expect(screen.getByText(topic16Data.labels.paradoxEyebrow)).toBeInTheDocument();
		expect(screen.getByText(topic16Data.labels.riskEyebrow)).toBeInTheDocument();
		expect(screen.getByText(topic16Data.labels.enterpriseEyebrow)).toBeInTheDocument();
		expect(screen.getByText(topic16Data.labels.loopEyebrow)).toBeInTheDocument();
		expect(screen.getByText(topic16Data.labels.manifestoEyebrow)).toBeInTheDocument();
	});

	it('renderiza as metricas do paradoxo (+98%, +91%)', () => {
		render(<Topic16 />);

		topic16Data.paradox.metrics.forEach((metric) => {
			expect(screen.getByText(metric.value)).toBeInTheDocument();
			expect(screen.getByText(metric.label)).toBeInTheDocument();
		});
	});

	it('renderiza os findings de risco na parede de dados', () => {
		render(<Topic16 />);

		topic16Data.riskFindings.forEach((finding) => {
			expect(screen.getByText(finding.text)).toBeInTheDocument();
		});
	});

	it('renderiza os 4 cards de empresas', () => {
		render(<Topic16 />);

		topic16Data.enterpriseCards.forEach((card) => {
			expect(screen.getByText(card.company)).toBeInTheDocument();
			expect(screen.getByText(card.stat)).toBeInTheDocument();
		});
	});

	it('renderiza o loop fechado com os 4 passos', () => {
		render(<Topic16 />);

		topic16Data.loopSteps.forEach((step) => {
			expect(screen.getByText(step.label)).toBeInTheDocument();
		});
	});

	it('renderiza o manifesto final com as 3 linhas', () => {
		render(<Topic16 />);

		topic16Data.finalManifesto.lines.forEach((line) => {
			expect(screen.getByText(line)).toBeInTheDocument();
		});
	});

	it('nao exibe MatrixTerminal na pagina de conteudo', () => {
		render(<Topic16 />);

		expect(screen.queryByTestId('matrix-terminal')).not.toBeInTheDocument();
	});

	it('alterna para notas e exibe MatrixTerminal', () => {
		render(<Topic16 />);

		// Alternar para notas
		fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
		expect(screen.getByTestId('matrix-terminal')).toBeInTheDocument();
		expect(screen.getByText(topic16Data.labels.notesTerminalTitle)).toBeInTheDocument();
	});

	it('volta para conteudo a partir das notas', () => {
		render(<Topic16 />);

		fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
		fireEvent.click(screen.getByRole('button', { name: 'Conteudo' }));
		expect(screen.getByText(topic16Data.labels.paradoxEyebrow)).toBeInTheDocument();
		expect(screen.queryByTestId('matrix-terminal')).not.toBeInTheDocument();
	});

	it('os dados exibidos sao oriundos de topic16Data (fonte unica)', () => {
		render(<Topic16 />);

		expect(screen.getByText(topic16Data.paradox.implication)).toBeInTheDocument();
		expect(screen.getByText(topic16Data.enterpriseConsensus)).toBeInTheDocument();
		expect(screen.getByText(topic16Data.loopNote)).toBeInTheDocument();
		expect(screen.getByText(topic16Data.finalManifesto.quote)).toBeInTheDocument();
	});
});

// Subtask 4.2 — CyberProgressBar no contexto do Topico 16 (AC #3)
describe('CyberProgressBar — Topico 16 (estado de conclusao)', () => {
	it('topic 16 mapeia para o segmento 5 (Impacto + Bonus)', () => {
		expect(getSegmentIndex(16)).toBe(5);
	});

	it('renderiza 5 segmentos no progressbar', () => {
		const { container } = render(<CyberProgressBar currentTopicIndex={16} />);
		const bars = container.querySelectorAll('[role="progressbar"] > div');
		expect(bars).toHaveLength(5);
	});

	it('no topico 16 o aria-valuenow e 5 (todos os blocos atingidos)', () => {
		render(<CyberProgressBar currentTopicIndex={16} />);
		const progressbar = screen.getByRole('progressbar');
		expect(progressbar).toHaveAttribute('aria-valuenow', '5');
	});

	it('no topico 16 o segmento ativo (Impacto + Bonus) tem aria-label com ativo', () => {
		render(<CyberProgressBar currentTopicIndex={16} />);
		expect(screen.getByLabelText('Impacto + Bonus (ativo)')).toBeInTheDocument();
	});

	it('no topico 16 os segmentos anteriores tem aria-label com concluido', () => {
		render(<CyberProgressBar currentTopicIndex={16} />);
		// Segmentos 1-4 devem estar concluidos
		expect(screen.getByLabelText('O Problema (concluido)')).toBeInTheDocument();
		expect(screen.getByLabelText('A Evolucao (concluido)')).toBeInTheDocument();
		expect(screen.getByLabelText('As Ferramentas (concluido)')).toBeInTheDocument();
		expect(screen.getByLabelText('O Novo Papel (concluido)')).toBeInTheDocument();
	});

	it('no topico 1 apenas o segmento 1 esta ativo (sem concluidos)', () => {
		render(<CyberProgressBar currentTopicIndex={1} />);
		expect(screen.getByLabelText('O Problema (ativo)')).toBeInTheDocument();
		expect(screen.queryByLabelText('A Evolucao (concluido)')).not.toBeInTheDocument();
	});
});
