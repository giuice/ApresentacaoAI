import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { topic7Data } from '@/data/topic7Data';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { NeonCard } from '@/components/ui/NeonCard';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { useShouldReduceMotion } from '@/hooks/useShouldReduceMotion';

const Topic7 = () => {
  const [page, setPage] = useState<'content' | 'notes'>('content');
  const shouldReduceMotion = useShouldReduceMotion();

  const terminalLines = useMemo<TerminalLine[]>(() => {
    const lines: TerminalLine[] = [{ type: 'comment', text: topic7Data.notesIntro }];

    topic7Data.narratorNotes.forEach((note) => {
      lines.push({ type: 'output', text: note });
    });

    lines.push({ type: 'comment', text: topic7Data.notesOutro });
    return lines;
  }, []);

  return (
    <TopicReveal className="flex flex-col h-full p-8 gap-6">
      <TopicRevealItem className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <h2 className="text-5xl lg:text-6xl font-mono font-bold text-accent-primary leading-tight">
            {topic7Data.title}
          </h2>
          <p className="text-sm md:text-base font-mono text-text-secondary">
            {topic7Data.subtitle}
          </p>
        </div>
        <NarratorToggle page={page} onToggle={setPage} accent="success" />
      </TopicRevealItem>

      {page === 'content' ? (
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          <div className="max-w-6xl mx-auto space-y-6 pb-4">
            <TopicRevealItem>
              <p className="text-base lg:text-lg font-sans text-text-primary leading-relaxed">
                {topic7Data.definition}
              </p>
            </TopicRevealItem>

            <TopicRevealItem>
              <NeonCard variant="success" className="space-y-4">
                <h3 className="text-sm uppercase tracking-[0.2em] font-mono text-accent-primary">
                  {topic7Data.heroMetric.context}
                </h3>

                <div className="flex flex-wrap items-end gap-6 md:gap-10">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider font-mono text-text-muted">
                      {topic7Data.heroMetric.before.label}
                    </p>
                    <p className="font-mono font-bold text-[clamp(2.5rem,6vw,3.75rem)] text-accent-danger leading-none">
                      {topic7Data.heroMetric.before.value}
                      {topic7Data.heroMetric.before.suffix}
                    </p>
                  </div>

                  <span className="text-xl md:text-3xl text-accent-primary/70 font-mono select-none">
                    →
                  </span>

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider font-mono text-text-muted">
                      {topic7Data.heroMetric.after.label}
                    </p>
                    <AnimatedCounter
                      value={topic7Data.heroMetric.after.value}
                      suffix={topic7Data.heroMetric.after.suffix}
                      variant="success"
                      className="text-[clamp(2.5rem,6vw,3.75rem)] font-bold leading-none"
                    />
                  </div>
                </div>
              </NeonCard>
            </TopicRevealItem>

            <TopicRevealItem>
              <GlowDivider />
            </TopicRevealItem>

            <TopicRevealItem className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl font-mono font-bold text-accent-primary">
                  {topic7Data.pipelineSectionTitle}
                </h3>
                <p className="text-sm font-sans text-text-secondary">
                  {topic7Data.pipelineSectionSubtitle}
                </p>
              </div>

              <div className="relative pl-10 md:pl-14">
                <motion.div
                  aria-hidden="true"
                  className="absolute left-[0.72rem] md:left-[1.15rem] top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-accent-primary/30 via-accent-primary to-accent-primary/30"
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          backgroundPositionY: ['0%', '100%'],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 2.8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'linear',
                        }
                  }
                  style={{ backgroundSize: '100% 220%' }}
                />

                <div className="space-y-4">
                  {topic7Data.pipelineSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: shouldReduceMotion ? 0 : 0.4 + index * 0.12,
                        duration: shouldReduceMotion ? 0.01 : 0.45,
                        ease: 'easeOut',
                      }}
                      className="relative"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -left-[2.12rem] md:-left-[2.86rem] top-8 h-5 w-5 rounded-full border border-accent-primary/50 bg-bg-card shadow-[0_0_14px_var(--glow-primary)]"
                      />

                      <NeonCard variant="success" className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3 justify-between">
                          <span className="text-[11px] md:text-xs font-mono uppercase tracking-wider text-text-muted">
                            {step.stage}
                          </span>
                          <span className="text-sm md:text-base font-mono font-bold text-accent-primary">
                            {step.command}
                          </span>
                        </div>

                        <p className="text-sm md:text-base font-sans text-text-primary leading-relaxed">
                          {step.description}
                        </p>

                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-wider font-mono text-text-muted">
                            {topic7Data.outputsLabel}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {step.outputs.map((output) => (
                              <span
                                key={output}
                                className="px-2 py-1 rounded border border-accent-primary/25 bg-accent-primary/10 text-[11px] md:text-xs font-mono text-accent-primary"
                              >
                                {output}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-wider font-mono text-text-muted">
                            {topic7Data.checklistLabel}
                          </p>
                          <ul className="grid gap-1 md:grid-cols-2">
                            {step.checklist.map((item) => (
                              <li
                                key={item}
                                className="text-xs md:text-sm font-sans text-text-secondary leading-relaxed"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </NeonCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TopicRevealItem>

            <TopicRevealItem>
              <NeonCard variant="success" className="space-y-3">
                <h3 className="text-sm uppercase tracking-[0.2em] font-mono text-accent-primary">
                  {topic7Data.credibilityCard.title}
                </h3>
                <p className="text-base font-sans text-text-primary leading-relaxed">
                  &ldquo;{topic7Data.credibilityCard.quote}&rdquo;
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-mono text-text-muted">
                    {topic7Data.credibilityCard.source}
                  </p>
                  <p className="text-sm font-mono font-bold text-accent-primary">
                    {topic7Data.credibilityCard.starsLabel}: {topic7Data.credibilityCard.starsValue}
                  </p>
                </div>
              </NeonCard>
            </TopicRevealItem>

            <TopicRevealItem className="grid gap-4 xl:grid-cols-3">
              <NeonCard variant="success" className="space-y-3">
                <h3 className="text-sm uppercase tracking-[0.2em] font-mono text-accent-primary">
                  {topic7Data.principlesTitle}
                </h3>
                <ul className="space-y-2">
                  {topic7Data.sixPrinciples.map((principle) => (
                    <li key={principle.title} className="space-y-1">
                      <p className="text-sm font-mono font-bold text-text-primary">
                        {principle.title}
                      </p>
                      <p className="text-xs md:text-sm font-sans text-text-secondary leading-relaxed">
                        {principle.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </NeonCard>

              <NeonCard variant="success" className="space-y-3">
                <h3 className="text-sm uppercase tracking-[0.2em] font-mono text-accent-primary">
                  {topic7Data.ecosystemTitle}
                </h3>
                <ul className="space-y-2">
                  {topic7Data.ecosystem.map((item) => (
                    <li key={item.name} className="space-y-1">
                      <p className="text-sm font-mono font-bold text-text-primary">{item.name}</p>
                      <p className="text-xs md:text-sm font-sans text-text-secondary leading-relaxed">
                        {item.focus}
                      </p>
                    </li>
                  ))}
                </ul>
              </NeonCard>

              <NeonCard variant="success" className="space-y-3">
                <h3 className="text-sm uppercase tracking-[0.2em] font-mono text-accent-primary">
                  {topic7Data.honestView.title}
                </h3>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider font-mono text-text-muted">
                    {topic7Data.honestView.criticsTitle}
                  </p>
                  <ul className="space-y-1">
                    {topic7Data.honestView.criticisms.map((item) => (
                      <li key={item} className="text-xs md:text-sm font-sans text-text-secondary">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider font-mono text-text-muted">
                    {topic7Data.honestView.responsesTitle}
                  </p>
                  <ul className="space-y-1">
                    {topic7Data.honestView.responses.map((item) => (
                      <li key={item} className="text-xs md:text-sm font-sans text-text-secondary">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm font-sans text-text-primary leading-relaxed border-l-2 border-accent-primary/35 pl-3">
                  {topic7Data.honestView.keyPoint}
                </p>
              </NeonCard>
            </TopicRevealItem>
          </div>
        </div>
      ) : (
        <TopicRevealItem className="flex-1 min-h-0 flex items-center justify-center">
          <MatrixTerminal title={topic7Data.notesTerminalTitle} lines={terminalLines} />
        </TopicRevealItem>
      )}
    </TopicReveal>
  );
};

export default Topic7;
