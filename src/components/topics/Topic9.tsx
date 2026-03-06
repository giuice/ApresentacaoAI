import { Fragment, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { topic9Data } from '@/data/topic9Data';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { NeonCard } from '@/components/ui/NeonCard';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { useShouldReduceMotion } from '@/hooks/useShouldReduceMotion';

const MOTION_EASING: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const Topic9 = () => {
  const [page, setPage] = useState<'content' | 'notes'>('content');
  const shouldReduceMotion = useShouldReduceMotion();
  const {
    title,
    subtitle,
    phases,
    agents,
    conflictExample,
    metricRedHat,
    metricMcKinsey,
    anchorStatement,
    narratorNotes,
    labels,
  } = topic9Data;

  const terminalLines = useMemo<TerminalLine[]>(() => {
    const lines: TerminalLine[] = [{ type: 'comment', text: labels.notesTerminalLead }];

    narratorNotes.forEach((note, index) => {
      lines.push({
        type: 'output',
        text: `${labels.notesLinePrefix} ${index + 1}: ${note}`,
      });
    });

    lines.push({ type: 'comment', text: labels.notesTerminalOutro });
    return lines;
  }, [labels.notesLinePrefix, labels.notesTerminalLead, labels.notesTerminalOutro, narratorNotes]);

  return (
    <TopicReveal className="flex flex-col h-full px-8 py-8 gap-6">
      <TopicRevealItem className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2 max-w-5xl">
          <h2 className="text-5xl lg:text-6xl font-mono font-bold text-accent-primary leading-tight">
            {title}
          </h2>
          <p className="text-sm font-mono text-text-secondary">{subtitle}</p>
        </div>
        <NarratorToggle page={page} onToggle={setPage} accent="success" />
      </TopicRevealItem>

      {page === 'content' ? (
        <TopicRevealItem className="flex-1 min-h-0 overflow-y-auto pr-1">
          <div className="space-y-7 pb-4">
            <section className="space-y-3" aria-label={labels.phaseSectionTitle}>
              <div className="space-y-1">
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-accent-primary">
                  {labels.phaseSectionTitle}
                </h3>
                <p className="text-sm text-text-muted">{labels.phaseSectionSubtitle}</p>
              </div>

              <div className="flex flex-col xl:flex-row xl:items-stretch gap-3">
                {phases.map((phase, index) => {
                  const itemDelay = shouldReduceMotion ? 0 : 0.4 * (index + 1);

                  return (
                    <Fragment key={phase.name}>
                      <motion.div
                        className="flex-1 min-w-0"
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0.01 : 0.45,
                          delay: itemDelay,
                          ease: MOTION_EASING,
                        }}
                      >
                        <NeonCard variant="success" className="h-full p-4">
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <h4 className="text-base font-mono font-bold text-accent-primary">{phase.name}</h4>
                              <p className="text-sm text-text-secondary leading-relaxed">{phase.description}</p>
                            </div>

                            <div className="space-y-2">
                              <p className="text-xs font-mono uppercase tracking-wider text-text-muted">
                                {labels.phaseOutputsLabel}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {phase.outputs.map((output) => (
                                  <span
                                    key={output}
                                    className="text-xs font-mono px-2.5 py-1 rounded border border-accent-primary/30 text-text-primary bg-accent-primary/10"
                                  >
                                    {output}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <p className="text-xs text-text-muted">
                              <span className="font-mono uppercase tracking-wider text-text-secondary">
                                {labels.phaseAgentLabel}
                              </span>{' '}
                              <span className="text-text-primary">{phase.agentName}</span>
                            </p>
                          </div>
                        </NeonCard>
                      </motion.div>

                      {index < phases.length - 1 && (
                        <motion.div
                          aria-hidden
                          className="relative flex items-center justify-center xl:w-8 xl:flex-col py-1 xl:py-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: shouldReduceMotion ? 0.01 : 0.35,
                            delay: shouldReduceMotion ? 0 : itemDelay + 0.2,
                            ease: MOTION_EASING,
                          }}
                        >
                          <span className="h-8 w-[2px] xl:h-[2px] xl:w-full rounded-full bg-gradient-to-b xl:bg-gradient-to-r from-accent-primary/15 via-accent-primary to-accent-primary/15" />
                          <span className="absolute h-2.5 w-2.5 rounded-full bg-accent-primary animate-pulse shadow-[0_0_12px_var(--glow-primary)]" />
                        </motion.div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </section>

            <GlowDivider />

            <section className="space-y-3" aria-label={labels.agentsSectionTitle}>
              <div className="space-y-1">
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-accent-primary">
                  {labels.agentsSectionTitle}
                </h3>
                <p className="text-sm text-text-muted">{labels.agentsSectionSubtitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {agents.map((agent, index) => (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0.01 : 0.35,
                      delay: shouldReduceMotion ? 0 : 0.4 + index * 0.08,
                      ease: MOTION_EASING,
                    }}
                  >
                    <NeonCard variant="success" className="h-full p-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-mono font-bold text-accent-primary">{agent.name}</h4>
                        <p className="text-xs text-text-secondary">
                          <span className="font-mono uppercase tracking-wider text-text-muted">
                            {labels.agentRoleLabel}
                          </span>{' '}
                          {agent.role}
                        </p>
                        <p className="text-xs text-text-secondary">
                          <span className="font-mono uppercase tracking-wider text-text-muted">
                            {labels.agentWhenLabel}
                          </span>{' '}
                          {agent.whenEnters}
                        </p>
                        <div className="space-y-1">
                          <p className="text-xs font-mono uppercase tracking-wider text-text-muted">
                            {labels.agentDeliversLabel}
                          </p>
                          <ul className="list-disc pl-4 space-y-1 text-xs text-text-primary">
                            {agent.delivers.map((deliverable) => (
                              <li key={deliverable}>{deliverable}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </NeonCard>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-3" aria-label={labels.conflictSectionTitle}>
              <div className="xl:col-span-2 space-y-1">
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-accent-primary">
                  {labels.conflictSectionTitle}
                </h3>
                <p className="text-sm text-text-muted">{labels.conflictSectionSubtitle}</p>
              </div>

              <NeonCard variant="danger" className="p-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-mono font-bold text-accent-danger">{conflictExample.withoutAdr.title}</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-text-primary">
                    {conflictExample.withoutAdr.decisions.map((decision) => (
                      <li key={decision}>{decision}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-text-muted">{conflictExample.withoutAdr.outcome}</p>
                </div>
              </NeonCard>

              <NeonCard variant="success" className="p-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-mono font-bold text-accent-primary">{conflictExample.withAdr.title}</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-text-primary">
                    {conflictExample.withAdr.decisions.map((decision) => (
                      <li key={decision}>{decision}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-text-muted">{conflictExample.withAdr.outcome}</p>
                </div>
              </NeonCard>
            </section>

            <section className="space-y-3" aria-label={labels.impactSectionTitle}>
              <div className="space-y-1">
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-accent-primary">
                  {labels.impactSectionTitle}
                </h3>
                <p className="text-sm text-text-muted">{labels.impactSectionSubtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <NeonCard variant="danger" className="p-4">
                  <div className="space-y-2">
                    <p className="text-xs font-mono uppercase tracking-widest text-text-muted">{metricRedHat.label}</p>
                    <AnimatedCounter
                      value={metricRedHat.value}
                      suffix={metricRedHat.suffix}
                      variant="danger"
                      className="text-[clamp(2rem,4vw,2.75rem)] font-bold"
                    />
                    <p className="text-sm text-text-primary leading-relaxed">{metricRedHat.context}</p>
                    <p className="text-xs text-text-muted">{metricRedHat.source}</p>
                  </div>
                </NeonCard>

                <NeonCard variant="success" className="p-4">
                  <div className="space-y-2">
                    <p className="text-xs font-mono uppercase tracking-widest text-text-muted">{metricMcKinsey.label}</p>
                    <AnimatedCounter
                      value={metricMcKinsey.max}
                      suffix={metricMcKinsey.suffix}
                      variant="success"
                      className="text-[clamp(2rem,4vw,2.75rem)] font-bold"
                    />
                    <p className="text-sm font-mono text-accent-primary">{metricMcKinsey.rangeLabel}</p>
                    <p className="text-sm text-text-primary leading-relaxed">{metricMcKinsey.context}</p>
                    <p className="text-xs text-text-muted">{metricMcKinsey.source}</p>
                  </div>
                </NeonCard>
              </div>

              <blockquote className="border-l-2 border-accent-primary/40 pl-4 text-base text-text-primary italic">
                {anchorStatement}
              </blockquote>
            </section>
          </div>
        </TopicRevealItem>
      ) : (
        <TopicRevealItem className="flex-1 min-h-0 flex items-center justify-center">
          <MatrixTerminal title={labels.notesTerminalTitle} lines={terminalLines} />
        </TopicRevealItem>
      )}
    </TopicReveal>
  );
};

export default Topic9;
