import { useMemo, useState } from 'react';
import { topic8Data } from '@/data/topic8Data';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { NeonCard } from '@/components/ui/NeonCard';

const toNarratorLines = (
  intro: string,
  notes: string[],
  outro: string,
): TerminalLine[] => {
  const lines: TerminalLine[] = [{ type: 'comment', text: intro }];

  notes.forEach((note, index) => {
    lines.push({
      type: 'output',
      text: `${index + 1}. ${note}`,
    });
  });

  lines.push({ type: 'comment', text: outro });
  return lines;
};

const Topic8 = () => {
  const [page, setPage] = useState<'content' | 'notes'>('content');
  const {
    title,
    subtitle,
    summary,
    heroMetric,
    secondaryMetric,
    terminalLines,
    workflowRail,
    recoveryCommands,
    brownfieldNote,
    narrator,
    labels,
  } = topic8Data;

  const narratorLines = useMemo(
    () => toNarratorLines(narrator.intro, narrator.notes, narrator.outro),
    [narrator.intro, narrator.notes, narrator.outro],
  );

  return (
    <TopicReveal className="flex h-full flex-col gap-6 p-8">
      <TopicRevealItem className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1 max-w-4xl">
          <h2 className="text-5xl lg:text-6xl font-mono font-bold text-accent-primary leading-tight">
            {title}
          </h2>
          <p className="text-sm font-mono text-text-secondary">{subtitle}</p>
        </div>
        <NarratorToggle page={page} onToggle={setPage} accent="success" />
      </TopicRevealItem>

      {page === 'content' ? (
        <>
          <TopicRevealItem>
            <p className="text-base md:text-lg font-sans text-text-primary leading-relaxed max-w-5xl">
              {summary}
            </p>
          </TopicRevealItem>

          <TopicRevealItem className="flex-1 min-h-0">
            <div className="grid h-full gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,1fr)]">
              <section
                aria-label={labels.terminalSection}
                className="min-h-0 flex h-full"
              >
                <MatrixTerminal
                  title={labels.contentTerminalTitle}
                  lines={terminalLines}
                  contrast="high"
                  className="max-w-none flex-1"
                  bodyClassName="min-h-[420px] lg:min-h-[540px]"
                />
              </section>

              <aside
                aria-label={labels.metricsSection}
                className="flex min-h-0 flex-col gap-4"
              >
                <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {[heroMetric, secondaryMetric].map((metric) => (
                    <NeonCard key={metric.label} variant="success" className="h-full p-4">
                      <div className="flex h-full flex-col gap-3">
                        <p className="text-xs font-mono uppercase tracking-[0.12em] text-text-secondary">
                          {metric.label}
                        </p>
                        <AnimatedCounter
                          value={metric.value}
                          variant="success"
                          suffix={metric.suffix}
                          className="text-[clamp(2.4rem,5vw,3.4rem)] font-bold leading-none"
                        />
                        <p className="text-xs font-sans leading-relaxed text-text-secondary">
                          {metric.context}
                        </p>
                        <p className="text-xs font-sans leading-relaxed text-text-primary">
                          {metric.impact}
                        </p>
                        <p className="pt-1 text-[11px] font-mono text-text-secondary">
                          {metric.source}
                        </p>
                      </div>
                    </NeonCard>
                  ))}
                </div>

                <NeonCard variant="success" className="p-4">
                  <h3 className="text-xs font-mono uppercase tracking-[0.12em] text-accent-primary mb-3">
                    {labels.workflowTitle}
                  </h3>
                  <ol className="space-y-2">
                    {workflowRail.map((step) => (
                      <li key={step.command} className="space-y-1">
                        <p className="text-sm font-mono text-accent-primary">{step.command}</p>
                        <p className="text-xs font-sans text-text-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                </NeonCard>

                <NeonCard variant="success" className="p-4">
                  <h3 className="text-xs font-mono uppercase tracking-[0.12em] text-accent-primary mb-3">
                    {labels.recoveryTitle}
                  </h3>
                  <ul className="space-y-2">
                    {recoveryCommands.map((command) => (
                      <li key={command.command} className="space-y-1">
                        <p className="text-sm font-mono text-accent-primary">{command.command}</p>
                        <p className="text-xs font-sans text-text-secondary leading-relaxed">
                          {command.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </NeonCard>
              </aside>
            </div>
          </TopicRevealItem>

          <TopicRevealItem>
            <NeonCard variant="success" className="p-4">
              <h3 className="text-xs font-mono uppercase tracking-[0.12em] text-accent-primary mb-2">
                {labels.brownfieldTitle}
              </h3>
              <p className="text-sm font-sans text-text-secondary leading-relaxed">
                {brownfieldNote}
              </p>
            </NeonCard>
          </TopicRevealItem>
        </>
      ) : (
        <TopicRevealItem className="flex-1 min-h-0 flex items-center justify-center">
          <MatrixTerminal title={labels.notesTerminalTitle} lines={narratorLines} />
        </TopicRevealItem>
      )}
    </TopicReveal>
  );
};

export default Topic8;
