import { useState } from 'react';
import { topic5Data } from '@/data/topic5Data';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { NeonCard } from '@/components/ui/NeonCard';
import { SplitScreen } from '@/components/ui/SplitScreen';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';

/**
 * Topic 5 — "Spec-Driven Development" — Layout SPLITSCREEN + BLUEPRINT
 *
 * Page 1: Dual hero counters (26.08% + 55%) acima do SplitScreen
 *         comparando Vibe Coding (danger) vs Spec-Driven (success).
 *         Único tópico que usa SplitScreen no conteúdo — identidade própria.
 * Page 2: "Blueprint/Spec" — texto em seções numeradas com headings mono,
 *         GlowDividers entre seções, visual de documento técnico scrollável.
 */
const Topic5 = () => {
  const [page, setPage] = useState<'content' | 'notes'>('content');
  const {
    title,
    definition,
    metric,
    secondaryMetric,
    vibeCodingProblems,
    specDrivenGains,
    narratorNotes,
  } = topic5Data;

  return (
    <TopicReveal className="flex flex-col h-full px-4 py-6 lg:px-8 lg:py-10 gap-6">
      {/* Header: título + toggle */}
      <TopicRevealItem className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-mono font-bold text-accent-primary leading-tight">
            {title}
          </h2>
          <p className="text-sm font-mono text-text-secondary">
            Spec-Driven Development
          </p>
        </div>
        <NarratorToggle page={page} onToggle={setPage} accent="success" />
      </TopicRevealItem>

      {page === 'content' ? (
        <>
          {/* Definição */}
          <TopicRevealItem>
            <p className="text-lg font-sans text-text-primary leading-relaxed text-center max-w-4xl mx-auto">
              {definition}
            </p>
          </TopicRevealItem>

          {/* Hero metrics side by side */}
          <TopicRevealItem className="flex flex-wrap justify-center gap-8 lg:gap-16">
            <div className="flex flex-col items-center gap-2">
              <AnimatedCounter
                value={metric.value}
                variant="success"
                suffix={metric.suffix}
                className="text-[clamp(3rem,7vw,4.5rem)] font-bold"
              />
              <p className="text-xs font-mono font-light text-text-muted text-center max-w-xs">
                {metric.context}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <AnimatedCounter
                value={secondaryMetric.value}
                variant="success"
                suffix={secondaryMetric.suffix}
                className="text-[clamp(3rem,7vw,4.5rem)] font-bold"
              />
              <p className="text-xs font-mono font-light text-text-muted text-center max-w-xs">
                {secondaryMetric.context}
              </p>
            </div>
          </TopicRevealItem>

          {/* SplitScreen: Vibe Coding vs Spec-Driven */}
          <TopicRevealItem className="w-full">
            <SplitScreen
              leftContent={
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-mono font-bold text-accent-danger mb-2">
                    Vibe Coding
                  </h3>
                  {vibeCodingProblems.map((item) => (
                    <NeonCard key={item.highlight} variant="danger">
                      <p className="text-base font-sans text-text-primary">
                        <span className="font-mono font-bold text-accent-danger text-xl">
                          {item.highlight}
                        </span>{' '}
                        {item.text}
                      </p>
                    </NeonCard>
                  ))}
                </div>
              }
              rightContent={
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-mono font-bold text-accent-primary mb-2">
                    Spec-Driven
                  </h3>
                  {specDrivenGains.map((item) => (
                    <NeonCard key={item.highlight} variant="success">
                      <p className="text-base font-sans text-text-primary">
                        <span className="font-mono font-bold text-accent-primary text-xl">
                          {item.highlight}
                        </span>{' '}
                        {item.text}
                      </p>
                    </NeonCard>
                  ))}
                </div>
              }
            />
          </TopicRevealItem>
        </>
      ) : (
        /* PAGE 2: NOTAS — BLUEPRINT / SPEC SCROLLÁVEL */
        <TopicRevealItem className="flex-1 min-h-0 overflow-y-auto pr-2">
          <div className="max-w-3xl mx-auto py-4">
            {/* Cabeçalho estilo spec */}
            <div className="border border-accent-primary/20 rounded-xl p-6 bg-bg-card space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-accent-primary" />
                <span className="text-xs font-mono text-accent-primary uppercase tracking-widest">
                  SPEC: Roteiro do Narrador — Topico 5
                </span>
              </div>
              {narratorNotes.map((note, i) => (
                <div key={i}>
                  <h4 className="text-xs font-mono font-bold text-accent-primary mb-2">
                    § {i + 1}
                  </h4>
                  <p className="text-base font-sans text-text-primary leading-relaxed pl-4">
                    {note}
                  </p>
                  {i < narratorNotes.length - 1 && (
                    <div className="mt-5">
                      <GlowDivider />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TopicRevealItem>
      )}
    </TopicReveal>
  );
};

export default Topic5;
