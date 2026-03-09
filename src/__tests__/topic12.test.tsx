import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Topic12 from '@/components/topics/Topic12';
import { topic12Data } from '@/data/topic12Data';

describe('topic12Data', () => {
	it('exporta estrutura completa para o topico 12', () => {
		expect(topic12Data.title).toBeTruthy();
		expect(topic12Data.subtitle).toBeTruthy();
		expect(topic12Data.heroMetric.value).toBeGreaterThan(0);
		expect(topic12Data.heroMetric.suffix).toBeTruthy();
		expect(topic12Data.heroMetric.label).toBeTruthy();
		expect(topic12Data.heroMetric.source).toBeTruthy();
		expect(topic12Data.roiMetrics.length).toBeGreaterThan(0);
		expect(topic12Data.impactCases.length).toBeGreaterThan(0);
		expect(topic12Data.narratorNotes.length).toBeGreaterThan(0);
	});

	it('define metricas de ROI com valores positivos para AnimatedCounter success', () => {
		topic12Data.roiMetrics.forEach((metric) => {
			expect(metric.value).toBeGreaterThan(0);
			expect(metric.suffix).toBeTruthy();
			expect(metric.label).toBeTruthy();
			expect(metric.source).toBeTruthy();
			expect(metric.context).toBeTruthy();
		});
	});

	it('define metrica hero com valor e sufixo', () => {
		expect(topic12Data.heroMetric.value).toBe(55);
		expect(topic12Data.heroMetric.suffix).toBe('%');
	});

	it('define pelo menos 3 casos de impacto com empresa, badge e detalhe', () => {
		expect(topic12Data.impactCases.length).toBeGreaterThanOrEqual(3);
		topic12Data.impactCases.forEach((c) => {
			expect(c.company).toBeTruthy();
			expect(c.badge).toBeTruthy();
			expect(c.detail).toBeTruthy();
			expect(c.source).toBeTruthy();
		});
	});

	it('define labels para terminal de notas', () => {
		expect(topic12Data.labels.notesTerminalTitle).toBeTruthy();
		expect(topic12Data.labels.notesTerminalLead).toBeTruthy();
		expect(topic12Data.labels.notesLinePrefix).toBeTruthy();
		expect(topic12Data.labels.notesTerminalOutro).toBeTruthy();
	});
});

describe('Topic12', () => {
	it('renderiza titulo e subtitulo a partir da fonte de dados', () => {
		render(<Topic12 />);

		expect(screen.getByText(topic12Data.title)).toBeInTheDocument();
		expect(screen.getByText(topic12Data.subtitle)).toBeInTheDocument();
	});

	it('renderiza eyebrows de hero e metricas e casos a partir dos labels', () => {
		render(<Topic12 />);

		expect(screen.getByText(topic12Data.labels.heroEyebrow)).toBeInTheDocument();
		expect(screen.getByText(topic12Data.labels.metricsEyebrow)).toBeInTheDocument();
		expect(screen.getByText(topic12Data.labels.casesEyebrow)).toBeInTheDocument();
	});

	it('renderiza nota da curva J de ROI', () => {
		render(<Topic12 />);

		expect(screen.getByText(topic12Data.labels.roiTimelineNote)).toBeInTheDocument();
	});

	it('renderiza label e contexto da metrica hero', () => {
		render(<Topic12 />);

		expect(screen.getByText(topic12Data.heroMetric.label)).toBeInTheDocument();
		expect(screen.getByText(topic12Data.heroMetric.context)).toBeInTheDocument();
		expect(screen.getByText(topic12Data.heroMetric.source)).toBeInTheDocument();
	});

	it('renderiza todas as metricas de ROI com labels e contexto', () => {
		render(<Topic12 />);

		topic12Data.roiMetrics.forEach((metric) => {
			expect(screen.getByText(metric.label)).toBeInTheDocument();
			expect(screen.getByText(metric.context)).toBeInTheDocument();
			expect(screen.getByText(metric.source)).toBeInTheDocument();
		});
	});

	it('renderiza todos os casos de impacto com empresa e badge', () => {
		render(<Topic12 />);

		topic12Data.impactCases.forEach((item) => {
			expect(screen.getByText(item.company)).toBeInTheDocument();
			expect(screen.getByText(item.badge)).toBeInTheDocument();
			expect(screen.getByText(item.detail)).toBeInTheDocument();
		});
	});

	it('alterna entre conteudo e notas com MatrixTerminal', () => {
		render(<Topic12 />);

		// MatrixTerminal nao visivel na pagina de conteudo
		expect(screen.queryByTestId('matrix-terminal')).not.toBeInTheDocument();

		// Alternar para notas
		fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
		expect(screen.getByTestId('matrix-terminal')).toBeInTheDocument();
		expect(screen.getByText(topic12Data.labels.notesTerminalTitle)).toBeInTheDocument();

		// Voltar para conteudo
		fireEvent.click(screen.getByRole('button', { name: 'Conteudo' }));
		expect(screen.getByText(topic12Data.labels.heroEyebrow)).toBeInTheDocument();
	});

	it('os dados exibidos sao oriundos de topic12Data (fonte unica)', () => {
		render(<Topic12 />);

		expect(screen.getByText(topic12Data.title)).toBeInTheDocument();
		expect(screen.getByText(topic12Data.heroMetric.label)).toBeInTheDocument();
		topic12Data.impactCases.forEach((c) => {
			expect(screen.getByText(c.company)).toBeInTheDocument();
		});
	});
});
