import { useState, useMemo } from 'react';
import { topic3Data } from '@/data/topic3Data';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';

/**
 * Topic 3 — "Context Rot" — Layout TIMELINE DE DEGRADAÇÃO
 *
 * Page 1: Counter 99% hero no topo. Abaixo, 4 zonas como barras horizontais
 *         com degradê visual (verde → amarelo → laranja → vermelho).
 *         Analogia como quote estilizado. Layout TODO vertical — sem grid.
 * Page 2: MatrixTerminal — tematicamente perfeito: linhas aparecendo como
 *         logs do sistema "perdendo coerência", espelhando o Context Rot.
 */

const zoneColors = [
  { bg: 'bg-accent-primary/10', border: 'border-accent-primary/40', text: 'text-accent-primary' },
  { bg: 'bg-yellow-500/10', border: 'border-yellow-500/40', text: 'text-yellow-400' },
  { bg: 'bg-orange-500/10', border: 'border-orange-500/40', text: 'text-orange-400' },
  { bg: 'bg-accent-danger/10', border: 'border-accent-danger/40', text: 'text-accent-danger' },
];

const Topic3 = () => {
  const [page, setPage] = useState<'content' | 'notes'>('content');
  const { title, definition, analogy, metric, supportingItems, narratorNotes } =
    topic3Data;

  const terminalLines = useMemo<TerminalLine[]>(() => {
    const lines: TerminalLine[] = [
      { type: 'comment', text: 'Notas do narrador — Context Rot' },
    ];
    narratorNotes.forEach((note, i) => {
      lines.push({ type: i < 2 ? 'string' : 'output', text: `[${i + 1}] ${note}` });
    });
    lines.push({ type: 'comment', text: '> Conecte com o proximo topico: a solucao.' });
    return lines;
  }, [narratorNotes]);

  return (
    <TopicReveal className="flex flex-col h-full px-4 py-6 lg:px-8 lg:py-10 gap-5">
      {/* Header: título + toggle */}
      <TopicRevealItem className="flex items-start justify-between gap-4 flex-wrap">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-mono font-bold text-accent-danger leading-tight max-w-4xl">
          {title}
        </h2>
        <NarratorToggle page={page} onToggle={setPage} accent="danger" />
      </TopicRevealItem>

      {page === 'content' ? (
        <>
          {/* Definição + Analogia */}
          <TopicRevealItem className="max-w-4xl mx-auto space-y-2">
            <p className="text-lg font-sans text-text-primary leading-relaxed">
              {definition}
            </p>
            <p className="text-sm font-mono text-text-secondary italic">
              &ldquo;{analogy}&rdquo;
            </p>
          </TopicRevealItem>

          {/* Counter hero — 99% gap */}
          <TopicRevealItem className="flex flex-col items-center gap-1">
            <AnimatedCounter
              value={metric.value}
              variant="danger"
              suffix={metric.suffix}
              className="text-[clamp(3.5rem,8vw,5rem)] font-bold"
            />
            <p className="text-xs font-mono font-light text-text-muted text-center max-w-md">
              {metric.context}
            </p>
          </TopicRevealItem>

          {/* DEGRADATION TIMELINE — 4 zonas como barras horizontais */}
          <TopicRevealItem className="flex flex-col gap-3 w-full max-w-4xl mx-auto">
            {supportingItems.map((item, i) => (
              <div
                key={item.highlight}
                className={`flex items-center gap-4 px-5 py-3 rounded-lg border ${zoneColors[i].bg} ${zoneColors[i].border} transition-all`}
              >
                <span className={`font-mono font-bold text-lg shrink-0 min-w-[70px] ${zoneColors[i].text}`}>
                  {item.highlight}
                </span>
                <p className="text-sm font-sans text-text-primary leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </TopicRevealItem>
        </>
      ) : (
        /* PAGE 2: NOTAS — MATRIX TERMINAL (decay log) */
        <TopicRevealItem className="flex-1 min-h-0 flex items-center justify-center">
          <MatrixTerminal
            title="context-rot-notes.log"
            lines={terminalLines}
          />
        </TopicRevealItem>
      )}
    </TopicReveal>
  );
};

export default Topic3;
