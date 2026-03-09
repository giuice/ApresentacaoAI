import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Topic15 from '@/components/topics/Topic15';
import { topic15Data } from '@/data/topic15Data';

describe('topic15Data', () => {
	it('exporta estrutura completa para o topico 15', () => {
		expect(topic15Data.title).toBeTruthy();
		expect(topic15Data.subtitle).toBeTruthy();
		expect(topic15Data.scaleCases).toHaveLength(4);
		expect(topic15Data.timeline.points).toHaveLength(3);
		expect(topic15Data.narratorNotes.length).toBeGreaterThan(0);
		expect(topic15Data.patternNote).toBeTruthy();
	});

	it('os 4 cases seguem a ordem obrigatoria: Ralph -> Airbnb -> Google -> Amazon', () => {
		const companies = topic15Data.scaleCases.map((c) => c.company);
		expect(companies[0]).toContain('Ralph');
		expect(companies[1]).toContain('Airbnb');
		expect(companies[2]).toContain('Google');
		expect(companies[3]).toContain('Amazon');
	});

	it('cada case tem step sequencial de 1 a 4', () => {
		topic15Data.scaleCases.forEach((c, idx) => {
			expect(c.step).toBe(idx + 1);
		});
	});

	it('cada case tem campos obrigatorios preenchidos', () => {
		topic15Data.scaleCases.forEach((c) => {
			expect(c.scaleLabel).toBeTruthy();
			expect(c.before).toBeTruthy();
			expect(c.after).toBeTruthy();
			expect(c.savingsLabel).toBeTruthy();
			expect(c.insight).toBeTruthy();
			expect(c.source).toBeTruthy();
		});
	});

	it('metricas-chave dos cases estao corretas', () => {
		const [ralph, airbnb, google, amazon] = topic15Data.scaleCases;
		expect(ralph.before).toContain('50.000');
		expect(ralph.after).toContain('297');
		expect(airbnb.before).toContain('18');
		expect(airbnb.after).toContain('6');
		expect(google.after).toContain('80%');
		expect(amazon.savingsLabel).toContain('260M');
	});

	it('timeline tem 3 pontos com years e ratings corretos', () => {
		const years = topic15Data.timeline.points.map((p) => p.year);
		expect(years).toContain('2022');
		expect(years).toContain('2024');
		expect(years).toContain('2025');

		const ratings = topic15Data.timeline.points.map((p) => p.rating);
		expect(ratings).toContain('1.807');
		expect(ratings).toContain('2.700');
	});

	it('closing question da timeline contem a pergunta de transicao', () => {
		expect(topic15Data.timeline.closingQuestion).toContain('papel');
	});

	it('labels necessarios estao definidos', () => {
		expect(topic15Data.labels.scalesEyebrow).toBeTruthy();
		expect(topic15Data.labels.timelineEyebrow).toBeTruthy();
		expect(topic15Data.labels.notesTerminalTitle).toBeTruthy();
		expect(topic15Data.labels.notesTerminalLead).toBeTruthy();
	});
});

describe('Topic15', () => {
	it('renderiza titulo e subtitulo a partir da fonte de dados', () => {
		render(<Topic15 />);

		expect(screen.getByText(topic15Data.title)).toBeInTheDocument();
		expect(screen.getByText(topic15Data.subtitle)).toBeInTheDocument();
	});

	it('renderiza os 4 cases com nomes das empresas', () => {
		render(<Topic15 />);

		topic15Data.scaleCases.forEach((c) => {
			expect(screen.getByText(c.company)).toBeInTheDocument();
		});
	});

	it('renderiza os badges de degrau para os 4 cases', () => {
		render(<Topic15 />);

		for (let i = 1; i <= 4; i++) {
			expect(screen.getByText(`DEGRAU ${i}`)).toBeInTheDocument();
		}
	});

	it('renderiza o contraste before/after de cada case', () => {
		render(<Topic15 />);

		topic15Data.scaleCases.forEach((c) => {
			expect(screen.getByText(c.before)).toBeInTheDocument();
			expect(screen.getByText(c.after)).toBeInTheDocument();
		});
	});

	it('renderiza o savings label de cada case', () => {
		render(<Topic15 />);

		topic15Data.scaleCases.forEach((c) => {
			expect(screen.getByText(`↑ ${c.savingsLabel}`)).toBeInTheDocument();
		});
	});

	it('renderiza a timeline de evolucao do Codeforces', () => {
		render(<Topic15 />);

		topic15Data.timeline.points.forEach((point) => {
			expect(screen.getByText(point.year)).toBeInTheDocument();
			expect(screen.getByText(point.rating)).toBeInTheDocument();
		});
	});

	it('renderiza a pergunta de fechamento da timeline', () => {
		render(<Topic15 />);

		expect(screen.getByText(topic15Data.timeline.closingQuestion)).toBeInTheDocument();
	});

	it('renderiza a nota de padrao comum', () => {
		render(<Topic15 />);

		expect(screen.getByText(topic15Data.patternNote)).toBeInTheDocument();
	});

	it('alterna entre conteudo e notas com MatrixTerminal', () => {
		render(<Topic15 />);

		// MatrixTerminal nao visivel na pagina de conteudo
		expect(screen.queryByTestId('matrix-terminal')).not.toBeInTheDocument();

		// Alternar para notas
		fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
		expect(screen.getByTestId('matrix-terminal')).toBeInTheDocument();
		expect(screen.getByText(topic15Data.labels.notesTerminalTitle)).toBeInTheDocument();

		// Voltar para conteudo
		fireEvent.click(screen.getByRole('button', { name: 'Conteudo' }));
		expect(screen.getByText(topic15Data.labels.scalesEyebrow)).toBeInTheDocument();
	});

	it('dados exibidos sao oriundos de topic15Data (fonte unica)', () => {
		render(<Topic15 />);

		expect(screen.getByText(topic15Data.labels.scalesEyebrow)).toBeInTheDocument();
		expect(screen.getByText(topic15Data.labels.timelineEyebrow)).toBeInTheDocument();
		expect(screen.getByText(topic15Data.patternNote)).toBeInTheDocument();
	});
});
