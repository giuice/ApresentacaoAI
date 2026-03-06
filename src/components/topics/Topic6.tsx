import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { topic6Data } from '@/data/topic6Data';
import { useShouldReduceMotion } from '@/hooks/useShouldReduceMotion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { NeonCard } from '@/components/ui/NeonCard';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';

const ladderOffsets = ['lg:translate-y-14', 'lg:translate-y-7', 'lg:translate-y-0'];
const ladderScales = ['lg:scale-[0.96]', 'lg:scale-[0.98]', 'lg:scale-100'];
const ladderGlows = [
  'shadow-[0_0_20px_var(--glow-primary-dim)]',
  'shadow-[0_0_32px_var(--glow-primary)]',
  'shadow-[0_0_44px_var(--glow-primary-strong)]',
];

const Topic6 = () => {
  const [page, setPage] = useState<'content' | 'notes'>('content');
  const shouldReduceMotion = useShouldReduceMotion();
  const {
    title,
    subtitle,
    heroMetric,
    inevitabilityQuote,
    inevitabilitySource,
    complexityAxisLabel,
    toolLadder,
    comparisonNote,
    narratorHeader,
    narratorFooter,
    narratorNotes,
    narratorTerminalTitle,
  } = topic6Data;

  const terminalLines = useMemo<TerminalLine[]>(() => {
    const lines: TerminalLine[] = [{ type: 'comment', text: narratorHeader }];
    narratorNotes.forEach((note, index) => {
      lines.push({
        type: 'output',
        text: `${index + 1}. ${note}`,
      });
    });
    lines.push({ type: 'comment', text: narratorFooter });
    return lines;
  }, [narratorHeader, narratorFooter, narratorNotes]);

  return (
    <TopicReveal className="flex h-full flex-col gap-6 overflow-hidden p-8 lg:gap-8 lg:p-10">
      <TopicRevealItem className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <h2 className="text-5xl lg:text-6xl font-mono font-bold text-accent-primary leading-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base font-mono text-text-secondary">
            {subtitle}
          </p>
        </div>
        <NarratorToggle page={page} onToggle={setPage} accent="success" />
      </TopicRevealItem>

      {page === 'content' ? (
        <>
          <TopicRevealItem className="flex flex-col items-center gap-2 text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-text-muted">
              {heroMetric.label}
            </p>
            <AnimatedCounter
              value={heroMetric.value}
              suffix={heroMetric.suffix}
              variant={heroMetric.variant}
              className="text-[clamp(3.5rem,10vw,6rem)] font-bold"
            />
            <p className="max-w-3xl text-xs font-mono text-text-muted">
              {heroMetric.context}
            </p>
          </TopicRevealItem>

          <TopicRevealItem>
            <div className="rounded-2xl border border-accent-primary/30 bg-bg-card px-6 py-5 text-center">
              <p className="text-lg font-sans text-text-primary leading-relaxed">
                &ldquo;{inevitabilityQuote}&rdquo;
              </p>
              <p className="mt-2 text-xs font-mono text-text-muted">
                {inevitabilitySource}
              </p>
            </div>
          </TopicRevealItem>

          <TopicRevealItem>
            <GlowDivider />
          </TopicRevealItem>

          <TopicRevealItem className="flex-1 min-h-0 overflow-y-auto">
            <div className="space-y-5 pb-2">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-end">
                {toolLadder.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : index * 0.4,
                      duration: shouldReduceMotion ? 0.01 : 0.45,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className={`min-w-0 ${ladderOffsets[index]} ${ladderScales[index]}`}
                  >
                    <NeonCard
                      variant="success"
                      className={`h-full border-accent-primary/30 ${ladderGlows[index]}`}
                    >
                      <article className="space-y-3" aria-label={tool.name}>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-2xl leading-none" aria-hidden="true">
                            {tool.icon}
                          </span>
                          <span className="text-[0.65rem] font-mono uppercase tracking-widest text-accent-primary">
                            {tool.level}
                          </span>
                        </div>
                        <h3 className="text-xl font-mono font-bold text-accent-primary">
                          {tool.name}
                        </h3>
                        <p className="text-sm font-sans text-text-primary leading-relaxed">
                          {tool.problem}
                        </p>
                        <p className="text-sm font-sans text-text-secondary leading-relaxed">
                          {tool.solution}
                        </p>
                        <p className="text-xs font-mono text-text-muted">
                          {tool.audience}
                        </p>
                        <p className="text-xs font-mono text-text-muted">
                          {tool.sddLevel}
                        </p>
                        <p className="text-xs font-mono text-text-muted">
                          {tool.adoptionSignal}
                        </p>
                        <p className="text-sm font-mono text-accent-primary">
                          {tool.impactMetric}
                        </p>
                      </article>
                    </NeonCard>
                  </motion.div>
                ))}
              </div>

              <p className="pt-2 text-center text-xs font-mono uppercase tracking-widest text-text-muted">
                {complexityAxisLabel}
              </p>
              <p className="mx-auto max-w-4xl text-center text-sm font-sans leading-relaxed text-text-secondary">
                {comparisonNote}
              </p>
            </div>
          </TopicRevealItem>
        </>
      ) : (
        <TopicRevealItem className="flex-1 min-h-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center py-2">
            <MatrixTerminal title={narratorTerminalTitle} lines={terminalLines} />
          </div>
        </TopicRevealItem>
      )}
    </TopicReveal>
  );
};

export default Topic6;
