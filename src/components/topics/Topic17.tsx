import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { topic17Data, type NarrativeSection, type NarrativeItem } from '@/data/topic17Data';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { NeonCard } from '@/components/ui/NeonCard';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { useShouldReduceMotion } from '@/hooks/useShouldReduceMotion';

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const accentBorder = {
  primary: 'border-accent-primary/30',
  warning: 'border-[#ffb700]/30',
  neutral: 'border-border-subtle',
} as const;

const accentBg = {
  primary: 'bg-accent-primary/8',
  warning: 'bg-[#ffb700]/8',
  neutral: 'bg-bg-card/60',
} as const;

const accentText = {
  primary: 'text-accent-primary',
  warning: 'text-[#ffb700]',
  neutral: 'text-text-muted',
} as const;

const ItemCard = ({
  item,
  index,
  reduceMotion,
}: {
  item: NarrativeItem;
  index: number;
  reduceMotion: boolean;
}) => {
  const accent = item.accent ?? 'primary';
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : index * 0.07, ease: EASE }}
      className={`rounded-2xl border ${accentBorder[accent]} ${accentBg[accent]} p-4`}
    >
      <p className={`text-sm font-mono font-bold ${accentText[accent]}`}>{item.label}</p>
      <p className="mt-2 text-sm leading-relaxed text-text-primary">{item.description}</p>
      {item.detail && (
        <p className="mt-2 text-xs leading-relaxed text-text-secondary">{item.detail}</p>
      )}
    </motion.div>
  );
};

const SectionBlock = ({
  section,
  reduceMotion,
}: {
  section: NarrativeSection;
  reduceMotion: boolean;
}) => (
  <section id={`t17-${section.id}`} aria-label={section.eyebrow} className="space-y-5">
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: EASE }}
      className="space-y-2"
    >
      <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
        {section.eyebrow}
      </p>
      <h3 className="text-2xl font-mono font-bold text-text-primary lg:text-3xl">
        {section.title}
      </h3>
      {section.problem && (
        <p className="max-w-3xl text-base leading-relaxed text-text-secondary italic">
          {section.problem}
        </p>
      )}
    </motion.div>

    {section.content.map((paragraph, i) => (
      <p key={i} className="max-w-3xl text-base leading-relaxed text-text-primary">
        {paragraph}
      </p>
    ))}

    {section.highlight && (
      <motion.div
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: EASE }}
      >
        <NeonCard
          variant={section.highlight.tone === 'positive' ? 'success' : 'danger'}
          className="inline-flex items-baseline gap-4 p-5"
        >
          <span className="text-4xl font-mono font-bold lg:text-5xl">{section.highlight.value}</span>
          <span className="text-sm text-text-primary">{section.highlight.label}</span>
        </NeonCard>
      </motion.div>
    )}

    {section.items && (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {section.items.map((item, i) => (
          <ItemCard key={item.label} item={item} index={i} reduceMotion={reduceMotion} />
        ))}
      </div>
    )}

    {section.codeBlock && (
      <div className="rounded-2xl border border-border-subtle bg-bg-card/70 p-5 max-w-2xl">
        <p className="text-[0.65rem] font-mono uppercase tracking-[0.24em] text-text-muted mb-3">
          {section.codeBlock.title}
        </p>
        <ol className="space-y-2">
          {section.codeBlock.lines.map((line, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent-primary/25 font-mono text-xs text-accent-primary">
                {i + 1}
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ol>
      </div>
    )}

    {section.quote && (
      <blockquote className="border-l-2 border-accent-primary/40 pl-4 text-sm italic text-text-secondary max-w-2xl">
        {section.quote}
      </blockquote>
    )}
  </section>
);

const Topic17 = () => {
  const [page, setPage] = useState<'content' | 'notes'>('content');
  const shouldReduceMotion = useShouldReduceMotion();

  const { title, subtitle, sections, closing, narratorNotes, labels } = topic17Data;

  const terminalLines = useMemo<TerminalLine[]>(() => {
    const lines: TerminalLine[] = [{ type: 'comment', text: labels.notesTerminalLead }];
    narratorNotes.forEach((note, index) => {
      lines.push({ type: 'output', text: `${labels.notesLinePrefix} ${index + 1}: ${note}` });
    });
    lines.push({ type: 'comment', text: labels.notesTerminalOutro });
    return lines;
  }, [labels, narratorNotes]);

  return (
    <TopicReveal className="flex h-full flex-col gap-6 overflow-hidden px-4 py-8 sm:px-8">
      <TopicRevealItem className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-5xl space-y-2">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.28em] text-[#ffd166]">
            Tópico 17 · Bônus Operacional
          </p>
          <h2 className="text-5xl font-mono font-bold leading-tight text-accent-primary lg:text-6xl">
            {title}
          </h2>
          <p className="text-sm font-mono text-text-secondary">{subtitle}</p>
        </div>
        <NarratorToggle page={page} onToggle={setPage} accent="success" />
      </TopicRevealItem>

      {page === 'content' ? (
        <TopicRevealItem className="min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="space-y-10 pb-8">
            {sections.map((section, i) => (
              <div key={section.id}>
                <SectionBlock section={section} reduceMotion={shouldReduceMotion ?? false} />
                {i < sections.length - 1 && (
                  <div className="mt-10">
                    <GlowDivider />
                  </div>
                )}
              </div>
            ))}

            <GlowDivider />

            <section
              id="t17-closing"
              aria-label={closing.eyebrow}
              className="rounded-[1.75rem] border border-accent-primary/20 bg-[radial-gradient(circle_at_top,rgba(0,255,65,0.12),transparent_50%),rgba(5,12,9,0.92)] p-6"
            >
              <p className="text-[0.65rem] font-mono uppercase tracking-[0.24em] text-accent-primary">
                {closing.eyebrow}
              </p>
              <p className="mt-4 text-2xl font-mono font-bold text-text-primary lg:text-3xl">
                {closing.headline}
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                {closing.formula}
              </p>
              <blockquote className="mt-5 border-l-2 border-accent-primary/40 pl-4 text-sm italic text-text-primary">
                {closing.quote}
              </blockquote>
            </section>
          </div>
        </TopicRevealItem>
      ) : (
        <TopicRevealItem className="flex min-h-0 flex-1 items-center justify-center">
          <MatrixTerminal title={labels.notesTerminalTitle} lines={terminalLines} contrast="high" />
        </TopicRevealItem>
      )}
    </TopicReveal>
  );
};

export default Topic17;
