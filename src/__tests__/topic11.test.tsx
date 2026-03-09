import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Topic11 from '@/components/topics/Topic11';
import { topic11Data } from '@/data/topic11Data';

describe('topic11Data', () => {
	it('exporta estrutura completa para o topico 11', () => {
		expect(topic11Data.title).toBeTruthy();
		expect(topic11Data.subtitle).toBeTruthy();
		expect(topic11Data.codeforcesLadder.rows).toHaveLength(4);
		expect(topic11Data.transition.stages).toHaveLength(3);
		expect(topic11Data.responsibilities.before.length).toBeGreaterThan(0);
		expect(topic11Data.responsibilities.after.length).toBeGreaterThan(0);
		expect(topic11Data.closingQuote).toBeTruthy();
		expect(topic11Data.narratorNotes.length).toBeGreaterThan(0);
		expect(topic11Data.orchestrationStat.value).toBe(57);
	});

	it('inclui o dado do o3 como ultimo item da escada Codeforces', () => {
		const rows = topic11Data.codeforcesLadder.rows;
		const lastRow = rows[rows.length - 1];
		expect(lastRow.rating).toBe(2727);
		expect(lastRow.percentile).toContain('99,8');
	});

	it('define os tres estagios da transicao', () => {
		const stages = topic11Data.transition.stages.map((s) => s.name);
		expect(stages).toContain('Coder');
		expect(stages).toContain('Conductor');
		expect(stages).toContain('Orchestrator');
	});
});

describe('Topic11', () => {
	it('renderiza titulo e subtitulo a partir da fonte de dados', () => {
		render(<Topic11 />);

		expect(screen.getByText(topic11Data.title)).toBeInTheDocument();
		expect(screen.getByText(topic11Data.subtitle)).toBeInTheDocument();
	});

	it('renderiza os blocos-chave: Codeforces, transicao e responsabilidades', () => {
		render(<Topic11 />);

		// Codeforces section eyebrow
		expect(screen.getByText(topic11Data.labels.codeforcesEyebrow)).toBeInTheDocument();

		// Transition stages
		topic11Data.transition.stages.forEach((stage) => {
			expect(screen.getByText(stage.name)).toBeInTheDocument();
		});

		// Responsibilities eyebrow
		expect(screen.getByText(topic11Data.labels.responsibilitiesEyebrow)).toBeInTheDocument();

		// Before/after labels
		expect(screen.getByText(topic11Data.labels.beforeLabel)).toBeInTheDocument();
		expect(screen.getByText(topic11Data.labels.afterLabel)).toBeInTheDocument();
	});

	it('renderiza a tabela Codeforces com 4 modelos', () => {
		render(<Topic11 />);

		topic11Data.codeforcesLadder.rows.forEach((row) => {
			expect(screen.getByText(row.model)).toBeInTheDocument();
		});
	});

	it('alterna entre conteudo e notas com MatrixTerminal', () => {
		render(<Topic11 />);

		// MatrixTerminal nao visivel na pagina de conteudo
		expect(screen.queryByTestId('matrix-terminal')).not.toBeInTheDocument();

		// Alternar para notas
		fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
		expect(screen.getByTestId('matrix-terminal')).toBeInTheDocument();
		expect(screen.getByText(topic11Data.labels.notesTerminalTitle)).toBeInTheDocument();

		// Voltar para conteudo
		fireEvent.click(screen.getByRole('button', { name: 'Conteudo' }));
		expect(screen.getByText(topic11Data.labels.codeforcesEyebrow)).toBeInTheDocument();
	});

	it('exibe o dado de orquestracao multi-agente', () => {
		render(<Topic11 />);

		expect(screen.getByText(topic11Data.orchestrationStat.label)).toBeInTheDocument();
		expect(screen.getByText(topic11Data.orchestrationStat.source)).toBeInTheDocument();
	});

	it('os dados exibidos sao oriundos de topic11Data (fonte unica)', () => {
		render(<Topic11 />);

		// Verificar que pelo menos os dados de conteudo visivel correspondem ao data file
		expect(screen.getByText(topic11Data.codeforcesLadder.intro)).toBeInTheDocument();
		expect(screen.getByText(topic11Data.codeforcesLadder.highlight)).toBeInTheDocument();
		expect(screen.getByText(topic11Data.closingQuote)).toBeInTheDocument();
	});
});
