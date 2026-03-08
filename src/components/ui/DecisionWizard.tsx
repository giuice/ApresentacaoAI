import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Public interfaces (Task 1.1) ──────────────────────────────── */

export interface WizardOption {
  label: string;
  value: string;
}

export interface WizardQuestion {
  id: string;
  text: string;
  options: WizardOption[];
}

export interface WizardRecommendation {
  tool: string;
  tradeoff: string;
  nextStep: string;
}

export interface WizardConfig {
  questions: WizardQuestion[];
  getRecommendation: (answers: Record<string, string>) => WizardRecommendation;
}

interface DecisionWizardProps {
  config: WizardConfig;
  title?: string;
}

/* ── Reduced-motion detection ──────────────────────────────────── */

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
};

/* ── Animation variants ────────────────────────────────────────── */

const questionVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/* ── Component ─────────────────────────────────────────────────── */

export const DecisionWizard = ({ config, title = 'decision-wizard' }: DecisionWizardProps) => {
  const { questions, getRecommendation } = config;
  const totalSteps = questions.length;

  /* State machine (Task 1.2) */
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<'questions' | 'result'>('questions');
  const [selectedIdx, setSelectedIdx] = useState(0);

  const prefersReducedMotion = usePrefersReducedMotion();
  /* Derived */
  const currentQuestion = questions[currentStep] as WizardQuestion | undefined;
  const recommendation = phase === 'result' ? getRecommendation(answers) : null;
  const progress = phase === 'result' ? 1 : currentStep / totalSteps;

  /* Handlers */
  const selectOption = useCallback(
    (value: string) => {
      const q = questions[currentStep];
      if (!q) return;

      const newAnswers = { ...answers, [q.id]: value };
      setAnswers(newAnswers);

      if (currentStep + 1 < totalSteps) {
        setCurrentStep((s) => s + 1);
        setSelectedIdx(0);
      } else {
        setPhase('result');
      }
    },
    [answers, currentStep, questions, totalSteps],
  );

  const restart = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setPhase('questions');
    setSelectedIdx(0);
  }, []);

  /* Keyboard navigation (Task 1.6) */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        restart();
        return;
      }

      if (phase === 'result') return;
      if (!currentQuestion) return;

      const optCount = currentQuestion.options.length;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIdx((i) => (i + 1) % optCount);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIdx((i) => (i - 1 + optCount) % optCount);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        selectOption(currentQuestion.options[selectedIdx].value);
      }
    },
    [phase, currentQuestion, selectedIdx, selectOption, restart],
  );

  /* Animation props helper */
  const motionProps = prefersReducedMotion
    ? {}
    : {
        variants: questionVariants,
        initial: 'enter',
        animate: 'center',
        exit: 'exit',
        transition: { duration: 0.3, ease: 'easeOut' as const },
      };

  return (
    <div
      data-testid="decision-wizard"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="flex w-full max-w-[700px] flex-col overflow-hidden rounded-xl border border-accent-primary/20 bg-bg-card shadow-[0_4px_24px_rgba(0,0,0,0.4)] outline-none"
    >
      {/* Terminal header (Task 1.8) */}
      <div className="flex items-center gap-2 border-b border-border-subtle bg-bg-surface px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
        <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
        <span className="ml-4 rounded-t bg-bg-card px-3 py-0.5 font-mono text-xs text-text-muted">
          {title}
        </span>
      </div>

      {/* Progress bar (Task 1.3) */}
      <div className="h-1 w-full bg-border-subtle">
        <div
          data-testid="wizard-progress"
          className="h-full bg-accent-primary transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Body */}
      <div className="min-h-[260px] bg-bg-card p-6 text-text-primary">
        <AnimatePresence mode="wait" initial={false}>
          {phase === 'questions' && currentQuestion && (
            <motion.div key={currentQuestion.id} {...motionProps} className="text-text-primary">
              {/* Step indicator */}
              <p className="mb-2 font-mono text-xs text-text-muted">
                {currentStep + 1}/{totalSteps}
              </p>

              {/* Question text (Task 1.3) */}
              <p className="mb-6 font-mono text-lg text-accent-primary">{currentQuestion.text}</p>

              {/* Options (Task 1.3) */}
              <div className="flex flex-col gap-3">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = idx === selectedIdx;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => selectOption(opt.value)}
                      onMouseEnter={() => setSelectedIdx(idx)}
                      className={`rounded-lg border px-4 py-3 text-left font-mono text-sm transition-all ${
                        isSelected
                          ? 'border-accent-primary bg-accent-primary/10 text-text-primary shadow-[0_0_12px_var(--glow-primary)]'
                          : 'border-border-subtle bg-bg-card text-text-secondary hover:border-accent-primary/50 hover:text-text-primary'
                      }`}
                    >
                      <span className="mr-2 text-accent-primary">
                        {String.fromCharCode(65 + idx)})
                      </span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {phase === 'result' && recommendation && (
            <motion.div key="result" {...motionProps} className="text-text-primary">
              {/* Result card (Task 1.5) */}
              <p className="mb-4 font-mono text-xs text-text-muted">resultado</p>

              <div className="space-y-4">
                <h3 className="font-mono text-2xl font-bold text-accent-primary">
                  {recommendation.tool}
                </h3>

                <div className="space-y-2">
                  <p className="font-mono text-sm text-text-secondary">
                    <span className="text-accent-warning">trade-off:</span>{' '}
                    {recommendation.tradeoff}
                  </p>
                  <p className="font-mono text-sm text-text-secondary">
                    <span className="text-accent-primary">próximo passo:</span>{' '}
                    {recommendation.nextStep}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={restart}
                  className="mt-4 rounded-lg border border-border-subtle bg-bg-surface px-4 py-2 font-mono text-xs text-text-secondary transition-colors hover:border-accent-primary/50 hover:text-text-primary"
                >
                  ↻ Reiniciar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
