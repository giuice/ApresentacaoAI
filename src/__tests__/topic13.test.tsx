import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Topic13 from '@/components/topics/Topic13';
import { topic13Data } from '@/data/topic13Data';

describe('topic13Data', () => {
	it('exporta estrutura completa para o topico 13', () => {
		expect(topic13Data.title).toBeTruthy();
		expect(topic13Data.subtitle).toBeTruthy();
		expect(topic13Data.heroMetric.value).toBeGreaterThan(0);
		expect(topic13Data.heroMetric.suffix).toBeTruthy();
		expect(topic13Data.heroMetric.label).toBeTruthy();
		expect(topic13Data.heroMetric.source).toBeTruthy();
		expect(topic13Data.supportingMetrics.length).toBeGreaterThan(0);
		expect(topic13Data.skills.length).toBe(5);
		expect(topic13Data.matrix.length).toBe(5);
		expect(topic13Data.narratorNotes.length).toBeGreaterThan(0);
	});

	it('define metrica hero com valor 80 e sufixo %', () => {
		expect(topic13Data.heroMetric.value).toBe(80);
		expect(topic13Data.heroMetric.suffix).toBe('%');
	});

	it('define 5 skills com time, name, tagline, scene e connections', () => {
		expect(topic13Data.skills).toHaveLength(5);
		topic13Data.skills.forEach((skill) => {
			expect(skill.time).toBeTruthy();
			expect(skill.name).toBeTruthy();
			expect(skill.tagline).toBeTruthy();
			expect(skill.scene).toBeTruthy();
			expect(skill.connections).toHaveLength(3);
			skill.connections.forEach((conn) => {
				expect(conn.tool).toBeTruthy();
				expect(conn.detail).toBeTruthy();
			});
		});
	});

	it('define matrix com 5 linhas (uma por skill) e colunas para as 3 ferramentas', () => {
		expect(topic13Data.matrix).toHaveLength(5);
		topic13Data.matrix.forEach((row) => {
			expect(row.skill).toBeTruthy();
			expect(row.specKit).toBeTruthy();
			expect(row.gsd).toBeTruthy();
			expect(row.bmad).toBeTruthy();
		});
	});

	it('define metricas de suporte com texto e fonte', () => {
		topic13Data.supportingMetrics.forEach((m) => {
			expect(m.text).toBeTruthy();
			expect(m.source).toBeTruthy();
		});
	});

	it('define labels para terminal de notas', () => {
		expect(topic13Data.labels.notesTerminalTitle).toBeTruthy();
		expect(topic13Data.labels.notesTerminalLead).toBeTruthy();
		expect(topic13Data.labels.notesLinePrefix).toBeTruthy();
		expect(topic13Data.labels.notesTerminalOutro).toBeTruthy();
	});

	it('define closingQuote nao vazio', () => {
		expect(topic13Data.closingQuote).toBeTruthy();
	});
});

describe('Topic13', () => {
	it('renderiza titulo e subtitulo a partir da fonte de dados', () => {
		render(<Topic13 />);

		expect(screen.getByText(topic13Data.title)).toBeInTheDocument();
		expect(screen.getByText(topic13Data.subtitle)).toBeInTheDocument();
	});

	it('renderiza eyebrow da metrica hero a partir dos labels', () => {
		render(<Topic13 />);

		expect(screen.getByText(topic13Data.labels.heroEyebrow)).toBeInTheDocument();
	});

	it('renderiza label da metrica hero', () => {
		render(<Topic13 />);

		expect(screen.getByText(topic13Data.heroMetric.label)).toBeInTheDocument();
		expect(screen.getByText(topic13Data.heroMetric.source)).toBeInTheDocument();
	});

	it('renderiza eyebrow da timeline de skills', () => {
		render(<Topic13 />);

		expect(screen.getByText(topic13Data.labels.timelineEyebrow)).toBeInTheDocument();
	});

	it('renderiza todas as 5 skills com nome e timestamp', () => {
		render(<Topic13 />);

		topic13Data.skills.forEach((skill) => {
			// skill.name aparece na timeline e na tabela — verificar que ao menos 1 elemento existe
			const nameEls = screen.getAllByText(skill.name);
			expect(nameEls.length).toBeGreaterThan(0);
			expect(screen.getByText(skill.time)).toBeInTheDocument();
		});
	});

	it('renderiza scenes das skills como texto descritivo', () => {
		render(<Topic13 />);

		topic13Data.skills.forEach((skill) => {
			expect(screen.getByText(skill.scene)).toBeInTheDocument();
		});
	});

	it('renderiza eyebrow da tabela matrix', () => {
		render(<Topic13 />);

		expect(screen.getByText(topic13Data.labels.matrixEyebrow)).toBeInTheDocument();
	});

	it('renderiza skills na tabela matrix', () => {
		render(<Topic13 />);

		topic13Data.matrix.forEach((row) => {
			// skill name aparece na tabela (pode haver duplicata com a timeline, usar getAllByText)
			const els = screen.getAllByText(row.skill);
			expect(els.length).toBeGreaterThan(0);
		});
	});

	it('renderiza closing quote', () => {
		render(<Topic13 />);

		expect(screen.getByText(topic13Data.closingQuote)).toBeInTheDocument();
	});

	it('alterna entre conteudo e notas com MatrixTerminal', () => {
		render(<Topic13 />);

		// MatrixTerminal nao visivel na pagina de conteudo
		expect(screen.queryByTestId('matrix-terminal')).not.toBeInTheDocument();

		// Alternar para notas
		fireEvent.click(screen.getByRole('button', { name: 'Notas' }));
		expect(screen.getByTestId('matrix-terminal')).toBeInTheDocument();
		expect(screen.getByText(topic13Data.labels.notesTerminalTitle)).toBeInTheDocument();

		// Voltar para conteudo
		fireEvent.click(screen.getByRole('button', { name: 'Conteudo' }));
		expect(screen.getByText(topic13Data.labels.heroEyebrow)).toBeInTheDocument();
	});

	it('os dados exibidos sao oriundos de topic13Data (fonte unica)', () => {
		render(<Topic13 />);

		expect(screen.getByText(topic13Data.title)).toBeInTheDocument();
		expect(screen.getByText(topic13Data.heroMetric.label)).toBeInTheDocument();
		topic13Data.skills.forEach((skill) => {
			// skill.name pode aparecer na timeline e na tabela — verificar ao menos 1
			const nameEls = screen.getAllByText(skill.name);
			expect(nameEls.length).toBeGreaterThan(0);
		});
	});
});
