import { useState } from 'react';
import { topic2Data } from '@/data/topic2Data';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { NeonCard } from '@/components/ui/NeonCard';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';

/**
 * Topic 2 — "Ilusão de Produtividade" — Layout TRIPLE REVEAL
 *
 * Page 1: Três counters lado a lado (+24%, +20%, -19%) revelando o gap.
 *         Hero 43pts como destaque central. Cards em linha horizontal.
 * Page 2: "Diário de pesquisa" — cada nota é um NeonCard scrollável,
 *         estilo log de estudo acadêmico.
 */
const Topic2 = () => {
  const [page, setPage] = useState<'content' | 'notes'>('content');
  const { title, definition, metric, supportingItems, narratorNotes } =
    topic2Data;

  return (
    <TopicReveal className="flex flex-col h-full px-4 py-6 lg:px-8 lg:py-10 gap-6">
      {/* Header: título + toggle */}
      <TopicRevealItem className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-mono font-bold text-accent-danger leading-tight">
            {title}
          </h2>
          <p className="text-sm font-mono text-text-secondary">
            Estudo METR — Percepcao vs. Realidade
          </p>
        </div>
        <NarratorToggle page={page} onToggle={setPage} accent="danger" />
      </TopicRevealItem>

      {page === 'content' ? (
        <>
          {/* Definição */}
          <TopicRevealItem>
            <p className="text-lg font-sans text-text-primary leading-relaxed text-center max-w-4xl mx-auto">
              {definition}
            </p>
          </TopicRevealItem>

          {/* TRIPLE REVEAL: 3 counters lado a lado */}
          <TopicRevealItem className="flex flex-wrap justify-center gap-6 lg:gap-12">
            {supportingItems.slice(0, 3).map((item) => (
              <div key={item.highlight} className="flex flex-col items-center gap-2 min-w-[140px]">
                <span className="text-[clamp(2.5rem,6vw,4rem)] font-mono font-bold text-accent-danger">
                  {item.highlight}
                </span>
                <p className="text-xs font-mono text-text-muted text-center max-w-[180px]">
                  {item.text}
                </p>
              </div>
            ))}
          </TopicRevealItem>

          {/* HERO GAP: 43pts — destaque central */}
          <TopicRevealItem className="flex flex-col items-center gap-2 py-2">
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest">
              Gap percepcao vs realidade
            </p>
            <AnimatedCounter
              value={metric.value}
              variant="danger"
              suffix={metric.suffix}
              className="text-[clamp(4rem,10vw,6rem)] font-bold"
            />
            <p className="text-xs font-mono font-light text-text-muted text-center max-w-md">
              {metric.context}
            </p>
          </TopicRevealItem>

          {/* Card de segurança — destaque isolado */}
          {supportingItems[3] && (
            <TopicRevealItem className="flex justify-center">
              <NeonCard variant="danger" className="max-w-md">
                <p className="text-base font-sans text-text-primary text-center">
                  <span className="font-mono font-bold text-accent-danger text-xl">
                    {supportingItems[3].highlight}
                  </span>{' '}
                  {supportingItems[3].text}
                </p>
              </NeonCard>
            </TopicRevealItem>
          )}
        </>
      ) : (
        /* PAGE 2: NOTAS — DIÁRIO DE PESQUISA */
        <TopicRevealItem className="flex-1 min-h-0 overflow-y-auto pr-2">
          <div className="max-w-3xl mx-auto space-y-4 py-4">
            <p className="text-xs font-mono text-accent-danger uppercase tracking-widest mb-4">
              📋 Diario de Pesquisa — Topico 2
            </p>
            {narratorNotes.map((note, i) => (
              <NeonCard key={i} variant="danger">
                <div className="flex gap-3 items-start">
                  <span className="text-accent-danger font-mono font-bold text-sm shrink-0">
                    #{i + 1}
                  </span>
                  <p className="text-base font-sans text-text-primary leading-relaxed">
                    {note}
                  </p>
                </div>
              </NeonCard>
            ))}
          </div>
        </TopicRevealItem>
      )}
    </TopicReveal>
  );
};

export default Topic2;
