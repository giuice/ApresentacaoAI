import { useState } from 'react';
import { topic1Data } from '@/data/topic1Data';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { NeonCard } from '@/components/ui/NeonCard';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';

/**
 * Topic 1 — "Hook: 88%" — Layout ALARME DE EMERGÊNCIA
 *
 * Page 1: Hero counter 88% centralizado dominante,
 *         definição + analogia abaixo, cards em linha horizontal
 * Page 2: Briefing de segurança — seções numeradas com border-left danger,
 *         separadas por GlowDividers, scrollável
 */
const Topic1 = () => {
  const [page, setPage] = useState<'content' | 'notes'>('content');
  const { title, definition, analogy, metric, supportingItems, narratorNotes } =
    topic1Data;

  return (
    <TopicReveal className="flex flex-col h-full px-4 py-6 lg:px-8 lg:py-10 gap-6">
      {/* Header: título + toggle */}
      <TopicRevealItem className="flex items-start justify-between gap-4 flex-wrap">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-mono font-bold text-accent-danger leading-tight max-w-4xl">
          {title}
        </h2>
        <NarratorToggle page={page} onToggle={setPage} accent="danger" />
      </TopicRevealItem>

      {page === 'content' ? (
        <>
          {/* HERO: Counter 88% domina o centro da tela */}
          <TopicRevealItem className="flex flex-col items-center gap-2 py-4">
            <AnimatedCounter
              value={metric.value}
              variant="danger"
              suffix={metric.suffix}
              className="text-[clamp(5rem,12vw,8rem)] font-bold"
            />
            <p className="text-sm font-mono font-light text-text-muted text-center max-w-lg">
              {metric.context}
            </p>
          </TopicRevealItem>

          {/* Definição + Analogia centralizados */}
          <TopicRevealItem className="text-center max-w-3xl mx-auto space-y-3">
            <p className="text-lg font-sans text-text-primary leading-relaxed">
              {definition}
            </p>
            <p className="text-base font-sans text-text-secondary italic border-l-2 border-accent-danger/40 pl-4 text-left">
              &ldquo;{analogy}&rdquo;
            </p>
          </TopicRevealItem>

          {/* Cards de suporte — linha horizontal */}
          <TopicRevealItem className="flex flex-wrap gap-4 justify-center w-full">
            {supportingItems.map((item) => (
              <NeonCard key={item.highlight} variant="danger" className="flex-1 min-w-[220px] max-w-[340px]">
                <p className="text-base font-sans text-text-primary">
                  <span className="font-mono font-bold text-accent-danger text-2xl block mb-1">
                    {item.highlight}
                  </span>
                  {item.text}
                </p>
              </NeonCard>
            ))}
          </TopicRevealItem>
        </>
      ) : (
        /* PAGE 2: NOTAS — BRIEFING DE SEGURANÇA */
        <TopicRevealItem className="flex-1 min-h-0 overflow-y-auto pr-2">
          <div className="max-w-3xl mx-auto space-y-6 py-4">
            <p className="text-xs font-mono text-accent-danger uppercase tracking-widest">
              ⚠ Briefing do Narrador — Topico 1
            </p>
            <GlowDivider />
            {narratorNotes.map((note, i) => (
              <div key={i} className="space-y-4">
                <div className="flex gap-4 items-start">
                  <span className="text-accent-danger font-mono font-bold text-lg shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base font-sans text-text-primary leading-relaxed border-l-2 border-accent-danger/30 pl-4">
                    {note}
                  </p>
                </div>
                {i < narratorNotes.length - 1 && <GlowDivider />}
              </div>
            ))}
          </div>
        </TopicRevealItem>
      )}
    </TopicReveal>
  );
};

export default Topic1;
