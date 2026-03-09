import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Topic14 from '@/components/topics/Topic14';
import { topic14Data } from '@/data/topic14Data';

describe('topic14Data', () => {
	it('exporta estrutura completa para o topico 14', () => {
		expect(topic14Data.title).toBeTruthy();
		expect(topic14Data.subtitle).toBeTruthy();
		expect(topic14Data.heroBlock.negative.value).toBeTruthy();
		expect(topic14Data.heroBlock.positive.avg).toBeTruthy();
		expect(topic14Data.heroBlock.positive.top).toBeTruthy();
		expect(topic14Data.jCurve.phases).toHaveLength(3);
		expect(topic14Data.valeForces).toHaveLength(3);
		expect(topic14Data.twoCurves.curves).toHaveLength(2);
		expect(topic14Data.roiMetrics.length).toBeGreaterThan(0);
		expect(topic14Data.narratorNotes.length).toBeGreaterThan(0);
	});

	it('destaca a metrica principal: US$ 3,70 / US$ 10,30 vs -19%', () => {
		expect(topic14Data.heroBlock.positive.avg).toContain('3,70');
		expect(topic14Data.heroBlock.positive.top).toContain('10,30');
		expect(topic14Data.heroBlock.negative.value).toContain('19%');
	});

	it('define tres fases da curva J', () => {
		const phases = topic14Data.jCurve.phases.map((p) => p.phase);
		expect(phases).toContain('O Vale');
		expect(phases).toContain('Break-even');
		expect(phases).toContain('ROI Positivo');
	});

	it('define tres forcas do vale', () => {
		const titles = topic14Data.valeForces.map((f) => f.title);
		expect(titles).toContain('O Paradoxo da Percepção');
		expect(titles).toContain('Volume ≠ Valor');
		expect(titles).toContain('Dispersão Mata');
	});

	it('define duas curvas de comparacao', () => {
		const [curveA, curveB] = topic14Data.twoCurves.curves;
		expect(curveA.label).toContain('Sem Estrutura');
		expect(curveB.label).toContain('Com Specs');
		expect(curveA.markers.length).toBeGreaterThan(0);
		expect(curveB.markers.length).toBeGreaterThan(0);
	});

	it('define formula de ROI com todos os campos', () => {
		expect(topic14Data.formula.text).toContain('ROI');
		expect(topic14Data.formula.text).toContain('Velocidade');
		expect(topic14Data.formula.text).toContain('Verificação');
		expect(topic14Data.formula.speedNote).toBeTruthy();
		expect(topic14Data.formula.verificationNote).toBeTruthy();
	});

	it('todos os roiMetrics possuem value numerico', () => {
		topic14Data.roiMetrics.forEach((m) => {
			expect(typeof m.value).toBe('number');
			expect(m.label).toBeTruthy();
			expect(m.source).toBeTruthy();
		});
	});
});

describe('Topic14', () => {
	it('renderiza titulo e subtitulo a partir da fonte de dados', () => {
		render(<Topic14 />);

		expect(screen.getByText(topic14Data.title)).toBeInTheDocument();
		expect(screen.getByText(topic14Data.subtitle)).toBeInTheDocument();
	});

	it('renderiza o bloco hero com as metricas de contraste', () => {
		render(<Topic14 />);

		expect(screen.getByText(topic14Data.heroBlock.negative.value)).toBeInTheDocument();
		expect(screen.getByText(topic14Data.heroBlock.positive.avg)).toBeInTheDocument();
		expect(screen.getByText(topic14Data.labels.heroEyebrow)).toBeInTheDocument();
	});

	it('renderiza as tres fases da curva J', () => {
		render(<Topic14 />);

		topic14Data.jCurve.phases.forEach((phase) => {
			expect(screen.getByText(phase.phase)).toBeInTheDocument();
			expect(screen.getByText(phase.timeframe)).toBeInTheDocument();
		});
	});

	it('renderiza as tres forcas do vale', () => {
		render(<Topic14 />);

		topic14Data.valeForces.forEach((force) => {
			expect(screen.getByText(force.title)).toBeInTheDocument();
			expect(screen.getByText(force.stat)).toBeInTheDocument();
		});
	});

	it('renderiza as duas curvas de comparacao', () => {
		render(<Topic14 />);

		topic14Data.twoCurves.curves.forEach((curve) => {
			expect(screen.getByText(curve.label)).toBeInTheDocument();
		});

		expect(screen.getByText(topic14Data.twoCurves.separator)).toBeInTheDocument();
	});

	it('renderiza a formula de ROI', () => {
		render(<Topic14 />);

		expect(screen.getByText(topic14Data.formula.text)).toBeInTheDocument();
		expect(screen.getByText(topic14Data.labels.formulaEyebrow)).toBeInTheDocument();
	});

	it('renderiza o grid de metricas de ROI (AnimatedCounter)', () => {
		render(<Topic14 />);

		topic14Data.roiMetrics.forEach((metric) => {
			expect(screen.getByText(metric.label)).toBeInTheDocument();
		});
	});

	it('os dados exibidos sao oriundos de topic14Data (fonte unica)', () => {
		render(<Topic14 />);

		expect(screen.getByText(topic14Data.jCurve.note)).toBeInTheDocument();
		expect(
			screen.getByText(`→ ${topic14Data.twoCurves.conclusion}`)
		).toBeInTheDocument();
	});

	it('alterna entre conteudo e notas com MatrixTerminal', () => {
		render(<Topic14 />);

		// MatrixTerminal nao visivel na pagina de conteudo
		expect(screen.queryByTestId('matrix-terminal')).not.toBeInTheDocument();

		// Alternar para notas
		fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
		expect(screen.getByTestId('matrix-terminal')).toBeInTheDocument();
		expect(screen.getByText(topic14Data.labels.notesTerminalTitle)).toBeInTheDocument();

		// Voltar para conteudo
		fireEvent.click(screen.getByRole('button', { name: 'Conteudo' }));
		expect(screen.getByText(topic14Data.labels.heroEyebrow)).toBeInTheDocument();
	});
});
