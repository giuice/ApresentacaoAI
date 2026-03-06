import { useState } from 'react';
import { topic4Data } from '@/data/topic4Data';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { NeonCard } from '@/components/ui/NeonCard';
import { SplitScreen } from '@/components/ui/SplitScreen';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';

/**
 * Topic 4 — "Context Engineering" — Layout ESCADA ASCENDENTE
 *
 * Page 1: VIRADA vermelho→verde. 4 NeonCards dispostos horizontalmente
 *         como degraus (opacidade cresce de N1 a N4). Hero 55% no topo.
 *         Primeiro tópico SUCCESS.
 * Page 2: SplitScreen — esquerda "O que enfatizar" (verde),
 *         direita "Cuidados e armadilhas" (muted). Contexto prático.
 */

const stepOpacity = ['opacity-40', 'opacity-60', 'opacity-85', 'opacity-100'];

const Topic4 = () => {
  const [page, setPage] = useState<'content' | 'notes'>('content');
  const { title, definition, metric, supportingItems, narratorNotes } =
    topic4Data;

  // Split notes: first half = what to emphasize, second half = traps/warnings
  const midpoint = Math.ceil(narratorNotes.length / 2);
  const emphasizeNotes = narratorNotes.slice(0, midpoint);
  const cautionNotes = narratorNotes.slice(midpoint);

  return (
    <TopicReveal className="flex flex-col h-full px-4 py-6 lg:px-8 lg:py-10 gap-6">
      {/* Header: título + toggle */}
      <TopicRevealItem className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-mono font-bold text-accent-primary leading-tight">
            {title}
          </h2>
          <p className="text-sm font-mono text-text-secondary">
            De Prompt Engineering para Context Engineering
          </p>
        </div>
        <NarratorToggle page={page} onToggle={setPage} accent="success" />
      </TopicRevealItem>

      {page === 'content' ? (
        <>
          {/* Definição */}
          <TopicRevealItem>
            <p className="text-lg font-sans text-text-primary leading-relaxed max-w-4xl">
              {definition}
            </p>
          </TopicRevealItem>

          {/* Hero metric — 55% */}
          <TopicRevealItem className="flex flex-col items-center gap-1">
            <AnimatedCounter
              value={metric.value}
              variant="success"
              suffix={metric.suffix}
              className="text-[clamp(3rem,7vw,5rem)] font-bold"
            />
            <p className="text-xs font-mono font-light text-text-muted text-center max-w-lg">
              {metric.context}
            </p>
          </TopicRevealItem>

          {/* STAIRCASE: 4 levels como degraus horizontais — opacidade crescente */}
          <TopicRevealItem className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {supportingItems.map((item, i) => (
              <NeonCard
                key={item.highlight}
                variant="success"
                className={`${stepOpacity[i]} transition-opacity`}
              >
                <div className="space-y-2">
                  <span className="font-mono font-bold text-accent-primary text-lg block">
                    {item.highlight}
                  </span>
                  <p className="text-sm font-sans text-text-primary leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </NeonCard>
            ))}
          </TopicRevealItem>
        </>
      ) : (
        /* PAGE 2: NOTAS — SPLITSCREEN (enfatizar vs cuidados) */
        <TopicRevealItem className="flex-1 min-h-0 overflow-y-auto">
          <SplitScreen
            leftContent={
              <div className="space-y-4">
                <h3 className="text-sm font-mono font-bold text-accent-primary uppercase tracking-widest">
                  O que enfatizar
                </h3>
                {emphasizeNotes.map((note, i) => (
                  <p key={i} className="text-base font-sans text-text-primary leading-relaxed border-l-2 border-accent-primary/40 pl-3">
                    {note}
                  </p>
                ))}
              </div>
            }
            rightContent={
              <div className="space-y-4">
                <h3 className="text-sm font-mono font-bold text-text-muted uppercase tracking-widest">
                  Cuidados e contexto
                </h3>
                {cautionNotes.map((note, i) => (
                  <p key={i} className="text-base font-sans text-text-secondary leading-relaxed border-l-2 border-border-subtle pl-3">
                    {note}
                  </p>
                ))}
              </div>
            }
          />
        </TopicRevealItem>
      )}
    </TopicReveal>
  );
};

export default Topic4;
