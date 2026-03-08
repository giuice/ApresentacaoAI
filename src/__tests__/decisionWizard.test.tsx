import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

/* Mock framer-motion to avoid animation timing issues in tests */
vi.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef(
        ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>, ref: React.Ref<HTMLDivElement>) => {
          // filter out framer-motion props
          const { initial, animate, exit, transition, variants, ...rest } = props;
          return React.createElement('div', { ...rest, ref }, children);
        },
      ),
    },
    AnimatePresence: ({ children }: React.PropsWithChildren) => children,
  };
});

import { DecisionWizard } from '@/components/ui/DecisionWizard';
import type { WizardConfig } from '@/components/ui/DecisionWizard';
import { decisionWizardConfig } from '@/data/decisionWizardData';

/* ── Minimal generic config for isolation tests ────────────────── */

const testConfig: WizardConfig = {
  questions: [
    {
      id: 'q1',
      text: 'First question?',
      options: [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
      ],
    },
    {
      id: 'q2',
      text: 'Second question?',
      options: [
        { label: 'Option X', value: 'x' },
        { label: 'Option Y', value: 'y' },
      ],
    },
  ],
  getRecommendation: (answers) => ({
    tool: answers.q1 === 'a' ? 'ToolAlpha' : 'ToolBeta',
    tradeoff: 'Trade-off text here',
    nextStep: 'Next step instruction',
  }),
};

describe('DecisionWizard', () => {
  it('nao captura foco automaticamente ao montar', () => {
    render(<DecisionWizard config={testConfig} />);

    expect(screen.getByTestId('decision-wizard')).not.toHaveFocus();
  });

  it('renderiza primeira pergunta com opcoes (AC #1)', () => {
    render(<DecisionWizard config={testConfig} />);

    expect(screen.getByTestId('decision-wizard')).toBeInTheDocument();
    expect(screen.getByText('First question?')).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('avanca para proxima pergunta ao clicar numa opcao (AC #2)', () => {
    render(<DecisionWizard config={testConfig} />);

    fireEvent.click(screen.getByText('Option A'));

    expect(screen.getByText('Second question?')).toBeInTheDocument();
    expect(screen.getByText('Option X')).toBeInTheDocument();
  });

  it('mostra recomendacao ao completar todas as perguntas (AC #3)', () => {
    render(<DecisionWizard config={testConfig} />);

    fireEvent.click(screen.getByText('Option A'));
    fireEvent.click(screen.getByText('Option X'));

    expect(screen.getByText('ToolAlpha')).toBeInTheDocument();
  });

  it('recomendacao contem tool, tradeoff e nextStep (AC #3)', () => {
    render(<DecisionWizard config={testConfig} />);

    fireEvent.click(screen.getByText('Option B'));
    fireEvent.click(screen.getByText('Option Y'));

    expect(screen.getByText('ToolBeta')).toBeInTheDocument();
    expect(screen.getByText(/Trade-off text here/)).toBeInTheDocument();
    expect(screen.getByText(/Next step instruction/)).toBeInTheDocument();
  });

  it('Esc reinicia o wizard (AC #4)', () => {
    render(<DecisionWizard config={testConfig} />);

    // advance to second question
    fireEvent.click(screen.getByText('Option A'));
    expect(screen.getByText('Second question?')).toBeInTheDocument();

    // press Escape on wizard container
    fireEvent.keyDown(screen.getByTestId('decision-wizard'), { key: 'Escape' });

    // back to first question
    expect(screen.getByText('First question?')).toBeInTheDocument();
  });

  it('permite navegar opcoes com ArrowUp/ArrowDown + Enter quando focado', () => {
    render(<DecisionWizard config={testConfig} />);

    const wizard = screen.getByTestId('decision-wizard');
    wizard.focus();

    fireEvent.keyDown(wizard, { key: 'ArrowDown' });
    fireEvent.keyDown(wizard, { key: 'Enter' });

    expect(screen.getByText('Second question?')).toBeInTheDocument();
  });

  it('state reseta ao desmontar e remontar (AC #5)', () => {
    const { unmount } = render(<DecisionWizard config={testConfig} />);

    fireEvent.click(screen.getByText('Option A'));
    expect(screen.getByText('Second question?')).toBeInTheDocument();

    unmount();

    render(<DecisionWizard config={testConfig} />);
    expect(screen.getByText('First question?')).toBeInTheDocument();
  });

  it('aceita dados genericos — componente reutilizavel (AC #6)', () => {
    const customConfig: WizardConfig = {
      questions: [
        {
          id: 'custom',
          text: 'Custom question here?',
          options: [{ label: 'Custom opt', value: 'c' }],
        },
      ],
      getRecommendation: () => ({
        tool: 'CustomTool',
        tradeoff: 'Custom tradeoff',
        nextStep: 'Custom next',
      }),
    };

    render(<DecisionWizard config={customConfig} />);

    expect(screen.getByText('Custom question here?')).toBeInTheDocument();
    expect(screen.getByText('Custom opt')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Custom opt'));
    expect(screen.getByText('CustomTool')).toBeInTheDocument();
  });

  it('exibe barra de progresso que avanca com as perguntas', () => {
    render(<DecisionWizard config={testConfig} />);

    const progress = screen.getByTestId('wizard-progress');
    expect(progress).toBeInTheDocument();

    // step 0/2 = 0%
    expect(progress.style.width).toBe('0%');

    fireEvent.click(screen.getByText('Option A'));
    // step 1/2 = 50%
    expect(progress.style.width).toBe('50%');

    fireEvent.click(screen.getByText('Option X'));
    // result = 100%
    expect(progress.style.width).toBe('100%');
  });

  it('exibe terminal header com dots e titulo', () => {
    render(<DecisionWizard config={testConfig} title="test-terminal" />);

    expect(screen.getByText('test-terminal')).toBeInTheDocument();
    // 3 dots are in the header
    const container = screen.getByTestId('decision-wizard');
    const dots = container.querySelectorAll('.rounded-full');
    expect(dots.length).toBe(3);
  });

  it('botao Reiniciar na tela de resultado volta ao inicio', () => {
    render(<DecisionWizard config={testConfig} />);

    fireEvent.click(screen.getByText('Option A'));
    fireEvent.click(screen.getByText('Option X'));
    expect(screen.getByText('ToolAlpha')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Reiniciar/));
    expect(screen.getByText('First question?')).toBeInTheDocument();
  });

  it('funciona com dados reais do decisionWizardData', () => {
    render(<DecisionWizard config={decisionWizardConfig} />);

    expect(screen.getByText(/escopo e risco/i)).toBeInTheDocument();
  });
});
