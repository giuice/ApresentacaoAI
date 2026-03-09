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

// ─── Narrative Item Card ─────────────────────────────────────────────────────

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

// ─── Narrative Section ───────────────────────────────────────────────────────

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

// ─── Skills Case Study Section ──────────────────────────────────────────────

const SkillsCaseStudyBlock = ({ reduceMotion }: { reduceMotion: boolean }) => {
  const cs = topic17Data.skillsCaseStudy;

  return (
    <section id="t17-skills-case" aria-label={cs.eyebrow} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: EASE }}
        className="space-y-2"
      >
        <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ffd166]">
          {cs.eyebrow}
        </p>
        <h3 className="text-2xl font-mono font-bold text-text-primary lg:text-3xl">
          {cs.title}
        </h3>
        <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
          {cs.intro}
        </p>
      </motion.div>

      {/* Concept + Structure */}
      <div className="rounded-2xl border border-[#ffd166]/20 bg-[#ffd166]/5 p-5 max-w-3xl">
        <p className="text-sm leading-relaxed text-text-primary">{cs.concept}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cs.structure.map((item, i) => (
          <ItemCard key={item.label} item={item} index={i} reduceMotion={reduceMotion} />
        ))}
      </div>

      {/* Progressive Disclosure */}
      <div className="space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
          Progressive Disclosure
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {cs.progressiveDisclosure.layers.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: reduceMotion ? 0 : -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : i * 0.1, ease: EASE }}
              className="rounded-2xl border border-accent-primary/20 bg-accent-primary/5 p-4"
            >
              <p className="text-sm font-mono font-bold text-accent-primary">{layer.label}</p>
              <p className="mt-2 text-sm text-text-secondary">{layer.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cs.results.map((result, i) => (
          <motion.div
            key={result.label}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0.01 : 0.45, delay: reduceMotion ? 0 : i * 0.12, ease: EASE }}
          >
            <NeonCard
              variant={result.tone === 'positive' ? 'success' : 'danger'}
              className="h-full p-5"
            >
              <p className="text-3xl font-mono font-bold lg:text-4xl">{result.value}</p>
              <p className="mt-2 text-sm font-bold text-text-primary">{result.label}</p>
              <p className="mt-1 text-xs text-text-muted">{result.detail}</p>
            </NeonCard>
          </motion.div>
        ))}
      </div>

      {/* Philosophy: Model vs Scripts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-accent-primary/20 bg-accent-primary/5 p-5">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary mb-3">
            Modelo cuida do julgamento
          </p>
          <ul className="space-y-2">
            {cs.philosophy.model.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-text-primary">
                <span className="shrink-0 text-accent-primary">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[#ffd166]/20 bg-[#ffd166]/5 p-5">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ffd166] mb-3">
            Scripts cuidam do mecânico
          </p>
          <ul className="space-y-2">
            {cs.philosophy.scripts.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-text-primary">
                <span className="shrink-0 text-[#ffd166]">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Concrete Skills */}
      <div className="space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
          Skills concretas em produção
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {cs.concreteSkills.map((skill, i) => (
            <ItemCard key={skill.label} item={skill} index={i} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>

      {/* Anti-patterns */}
      <div className="space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ffb700]">
          Anti-patterns a evitar
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {cs.antiPatterns.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[#ffb700]/20 bg-[#ffb700]/6 px-4 py-3 text-sm text-text-primary"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* AGENTS.md Triggers */}
      <div className="rounded-2xl border border-border-subtle bg-bg-card/70 p-5 max-w-3xl">
        <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-text-muted mb-3">
          AGENTS.md — Triggers automáticos
        </p>
        <p className="text-sm text-text-secondary mb-3">{cs.triggers.description}</p>
        <div className="space-y-2">
          {cs.triggers.examples.map((ex) => (
            <div key={ex} className="rounded-xl border border-accent-primary/10 bg-accent-primary/5 px-3 py-2 text-sm font-mono text-text-primary">
              {ex}
            </div>
          ))}
        </div>
      </div>

      {/* Takeaway */}
      <blockquote className="border-l-2 border-[#ffd166]/50 pl-4 text-base italic text-text-primary max-w-3xl">
        {cs.takeaway}
      </blockquote>
    </section>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

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
      {/* Header */}
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
            {/* Narrative sections */}
            {sections.map((section, i) => (
              <div key={section.id}>
                <SectionBlock section={section} reduceMotion={shouldReduceMotion} />
                {i < sections.length - 1 && <div className="mt-10"><GlowDivider /></div>}
              </div>
            ))}

            <GlowDivider />

            {/* Skills Case Study */}
            <SkillsCaseStudyBlock reduceMotion={shouldReduceMotion} />

            <GlowDivider />

            {/* Closing */}
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
