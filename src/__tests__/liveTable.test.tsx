import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { LiveTable } from '@/components/ui/LiveTable';
import type { TableColumn, TableRow } from '@/components/ui/LiveTable';
import { comparisonColumns, comparisonRows } from '@/data/liveTableData';

const testColumns: TableColumn[] = [
  { key: 'a', label: 'Col A' },
  { key: 'b', label: 'Col B' },
];

const testRows: TableRow[] = [
  {
    label: 'Row 1',
    cells: {
      a: { text: 'Cell A1' },
      b: { text: 'Cell B1', tooltip: 'Tooltip B1' },
    },
  },
  {
    label: 'Row 2',
    cells: {
      a: { text: 'Cell A2', highlight: 'high' },
      b: { text: 'Cell B2', highlight: 'low' },
    },
  },
  {
    label: 'Row 3',
    cells: {
      a: { text: 'Cell A3', highlight: 'medium' },
      b: { text: 'Cell B3' },
    },
  },
];

describe('LiveTable', () => {
  it('renderiza grid com colunas e linhas', () => {
    render(<LiveTable columns={testColumns} rows={testRows} />);

    expect(screen.getByTestId('live-table')).toBeInTheDocument();
    expect(screen.getByText('Col A')).toBeInTheDocument();
    expect(screen.getByText('Col B')).toBeInTheDocument();
    expect(screen.getByText('Row 1')).toBeInTheDocument();
    expect(screen.getByText('Row 2')).toBeInTheDocument();
    expect(screen.getByText('Row 3')).toBeInTheDocument();
  });

  it('renderiza texto correto nas celulas', () => {
    render(<LiveTable columns={testColumns} rows={testRows} />);

    expect(screen.getByText('Cell A1')).toBeInTheDocument();
    expect(screen.getByText('Cell B1')).toBeInTheDocument();
    expect(screen.getByText('Cell A2')).toBeInTheDocument();
    expect(screen.getByText('Cell B2')).toBeInTheDocument();
  });

  it('exibe indicador de tooltip para celulas com tooltip configurado', () => {
    render(<LiveTable columns={testColumns} rows={testRows} />);

    const tooltipIndicators = screen.getAllByLabelText('info');
    expect(tooltipIndicators.length).toBeGreaterThanOrEqual(1);
  });

  it('mostra tooltip ao hover em celula com tooltip', () => {
    render(<LiveTable columns={testColumns} rows={testRows} />);

    const cellWithTooltip = screen.getByText('Cell B1').closest('td')!;
    fireEvent.mouseEnter(cellWithTooltip);

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip B1');
  });

  it('aplica classes de highlight corretamente', () => {
    render(<LiveTable columns={testColumns} rows={testRows} />);

    const highCell = screen.getByText('Cell A2').closest('td')!;
    expect(highCell.className).toContain('text-accent-primary');
    expect(highCell.className).toContain('font-semibold');

    const lowCell = screen.getByText('Cell B2').closest('td')!;
    expect(lowCell.className).toContain('text-text-muted');

    const mediumCell = screen.getByText('Cell A3').closest('td')!;
    expect(mediumCell.className).toContain('text-text-secondary');
  });

  it('aceita dados genericos (nao acoplado a dados especificos)', () => {
    const customColumns: TableColumn[] = [
      { key: 'x', label: 'Custom X' },
      { key: 'y', label: 'Custom Y' },
    ];
    const customRows: TableRow[] = [
      {
        label: 'Custom Label',
        cells: {
          x: { text: 'Value X' },
          y: { text: 'Value Y' },
        },
      },
    ];

    render(<LiveTable columns={customColumns} rows={customRows} />);

    expect(screen.getByText('Custom X')).toBeInTheDocument();
    expect(screen.getByText('Custom Y')).toBeInTheDocument();
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
    expect(screen.getByText('Value X')).toBeInTheDocument();
    expect(screen.getByText('Value Y')).toBeInTheDocument();
  });

  it('renderiza dados de comparacao reais do liveTableData', () => {
    render(<LiveTable columns={comparisonColumns} rows={comparisonRows} />);

    expect(screen.getByText('Spec-Kit')).toBeInTheDocument();
    expect(screen.getByText('GSD')).toBeInTheDocument();
    expect(screen.getByText('BMAD')).toBeInTheDocument();
    expect(screen.getByText('Complexidade alvo')).toBeInTheDocument();
  });
});
