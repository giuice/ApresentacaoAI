import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  topic18Data,
  type TimelineDay,
  type ToolModelEntry,
  type LiteralPrompt,
  type Lesson,
  type Limitation,
  type WorkflowStep,
} from '@/data/topic18Data';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import { NarratorToggle } from '@/components/ui/NarratorToggle';
import { NeonCard } from '@/components/ui/NeonCard';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { useShouldReduceMotion } from '@/hooks/useShouldReduceMotion';

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// ─── Sub-components ──────────────────────────────────────────────────────────

const EvidenceBadge = ({ label }: { label: string }) => (
  <span className="inline-block rounded-full border border-accent-primary/25 px-2 py-0.5 text-[0.6rem] font-mono uppercase tracking-[0.18em] text-accent-primary/80">
    {label}
  </span>
);

const TimelineCard = ({
  day,
  index,
  reduceMotion,
}: {
  day: TimelineDay;
  index: number;
  reduceMotion: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : index * 0.08, ease: EASE }}
    className="rounded-2xl border border-accent-primary/20 bg-accent-primary/5 p-4"
  >
    <div className="flex items-baseline gap-3">
      <span className="text-2xl font-mono font-bold text-accent-primary">{day.date}</span>
      <span className="text-sm font-mono font-bold text-text-primary">{day.label}</span>
    </div>
    <ul className="mt-3 space-y-1.5">
      {day.events.map((event, i) => (
        <li key={i} className="flex gap-2 text-sm leading-relaxed text-text-secondary">
          <span className="shrink-0 text-accent-primary/60">&#x25B8;</span>
          <span>{event}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const WorkflowStepCard = ({ step }: { step: WorkflowStep }) => (
  <div className="flex items-center gap-3">
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-primary/30 font-mono text-xs font-bold text-accent-primary">
      {step.order}
    </span>
    <span className="text-sm text-text-primary">{step.label}</span>
  </div>
);

const ToolModelRow = ({ entry }: { entry: ToolModelEntry }) => (
  <div className="grid grid-cols-[1fr_1.2fr_1fr] gap-3 border-b border-border-subtle/40 py-2 text-sm">
    <span className="font-mono text-accent-primary/90">{entry.range}</span>
    <span className="text-text-secondary">{entry.evidence}</span>
    <span className="font-mono text-text-primary">{entry.model}</span>
  </div>
);

const PromptBlock = ({
  prompt,
  index,
  reduceMotion,
}: {
  prompt: LiteralPrompt;
  index: number;
  reduceMotion: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, x: reduceMotion ? 0 : -12 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: reduceMotion ? 0.01 : 0.4, delay: reduceMotion ? 0 : index * 0.1, ease: EASE }}
    className="rounded-2xl border border-border-subtle bg-bg-card/70 p-4"
  >
    <p className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-text-muted mb-2">
      {prompt.context}
    </p>
    <p className="font-mono text-sm leading-relaxed text-accent-primary/90 break-words">
      {prompt.text}
    </p>
  </motion.div>
);

const LessonCard = ({ lesson }: { lesson: Lesson }) => (
  <div className="rounded-2xl border border-[#ffb700]/20 bg-[#ffb700]/5 p-4">
    <p className="text-sm font-mono font-bold text-[#ffb700]">{lesson.title}</p>
    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{lesson.description}</p>
  </div>
);

const LimitationItem = ({ limitation }: { limitation: Limitation }) => (
  <li className="flex gap-2 text-sm leading-relaxed text-text-secondary">
    <span className="shrink-0 text-[#ffb700]/60">&#x26A0;</span>
    <span>{limitation.text}</span>
  </li>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const Topic18 = () => {
  const [page, setPage] = useState<'content' | 'notes'>('content');
  const shouldReduceMotion = useShouldReduceMotion();
  const reduceMotion = shouldReduceMotion ?? false;

  const {
    title,
    subtitle,
    hero,
    timeline,
    workflow,
    toolsModels,
    prompts,
    lessons,
    limitations,
    metric,
    closing,
    narratorNotes,
    labels,
  } = topic18Data;

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
      {/* ─── Hero ─── */}
      <TopicRevealItem className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-5xl space-y-2">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.28em] text-[#ffd166]">
            Tópico 18 · Bastidores
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
            {/* ─── Abertura ─── */}
            <section aria-label={hero.eyebrow} className="space-y-4">
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
                {hero.eyebrow}
              </p>
              {hero.lead.map((paragraph, i) => (
                <p key={i} className="max-w-3xl text-base leading-relaxed text-text-primary">
                  {paragraph}
                </p>
              ))}
            </section>

            <GlowDivider />

            {/* ─── Timeline ─── */}
            <section aria-label="Linha do tempo" className="space-y-5">
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
                Linha do tempo verificável
              </p>
              <h3 className="text-2xl font-mono font-bold text-text-primary lg:text-3xl">
                De 04/03 a 10/03
              </h3>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
                {timeline.map((day, i) => (
                  <TimelineCard key={day.date} day={day} index={i} reduceMotion={reduceMotion} />
                ))}
              </div>
            </section>

            <GlowDivider />

            {/* ─── Workflow BMAD ─── */}
            <section aria-label={workflow.eyebrow} className="space-y-5">
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
                {workflow.eyebrow}
              </p>
              <h3 className="text-2xl font-mono font-bold text-text-primary lg:text-3xl">
                {workflow.title}
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 max-w-2xl">
                {workflow.steps.map((step) => (
                  <WorkflowStepCard key={step.order} step={step} />
                ))}
              </div>
              <blockquote className="border-l-2 border-accent-primary/40 pl-4 text-sm italic text-text-secondary max-w-2xl">
                {workflow.reviewNote}
              </blockquote>
            </section>

            <GlowDivider />

            {/* ─── Ferramentas & Modelos ─── */}
            <section aria-label={toolsModels.eyebrow} className="space-y-5">
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
                {toolsModels.eyebrow}
              </p>
              <h3 className="text-2xl font-mono font-bold text-text-primary lg:text-3xl">
                {toolsModels.title}
              </h3>
              <div className="rounded-2xl border border-border-subtle bg-bg-card/70 p-4 overflow-x-auto">
                <div className="grid grid-cols-[1fr_1.2fr_1fr] gap-3 border-b border-accent-primary/20 pb-2 text-[0.65rem] font-mono uppercase tracking-[0.2em] text-text-muted">
                  <span>Faixa</span>
                  <span>Evidência</span>
                  <span>Modelo</span>
                </div>
                {toolsModels.entries.map((entry) => (
                  <ToolModelRow key={entry.range} entry={entry} />
                ))}
              </div>
              <p className="text-xs text-text-muted italic max-w-2xl">{toolsModels.caveat}</p>
            </section>

            <GlowDivider />

            {/* ─── Prompts literais ─── */}
            <section aria-label={prompts.eyebrow} className="space-y-5">
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
                {prompts.eyebrow}
              </p>
              <h3 className="text-2xl font-mono font-bold text-text-primary lg:text-3xl">
                {prompts.title}
              </h3>
              <div className="space-y-3 max-w-3xl">
                {prompts.items.map((prompt, i) => (
                  <PromptBlock key={i} prompt={prompt} index={i} reduceMotion={reduceMotion} />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {prompts.validationCommands.map((cmd) => (
                  <span
                    key={cmd}
                    className="rounded-lg border border-border-subtle bg-bg-card/60 px-3 py-1 font-mono text-xs text-text-secondary"
                  >
                    {cmd}
                  </span>
                ))}
              </div>
            </section>

            <GlowDivider />

            {/* ─── Aprendizados ─── */}
            <section aria-label={lessons.eyebrow} className="space-y-5">
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-primary">
                {lessons.eyebrow}
              </p>
              <h3 className="text-2xl font-mono font-bold text-text-primary lg:text-3xl">
                {lessons.title}
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {lessons.items.map((lesson) => (
                  <LessonCard key={lesson.title} lesson={lesson} />
                ))}
              </div>
            </section>

            <GlowDivider />

            {/* ─── Limitações ─── */}
            <section aria-label={limitations.eyebrow} className="space-y-4">
              <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ffb700]">
                {limitations.eyebrow}
              </p>
              <h3 className="text-2xl font-mono font-bold text-text-primary lg:text-3xl">
                {limitations.title}
              </h3>
              <ul className="space-y-2 max-w-2xl">
                {limitations.items.map((item, i) => (
                  <LimitationItem key={i} limitation={item} />
                ))}
              </ul>
            </section>

            <GlowDivider />

            {/* ─── Métrica de destaque ─── */}
            <motion.div
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: EASE }}
            >
              <NeonCard variant="success" className="inline-flex items-baseline gap-4 p-5">
                <span className="text-4xl font-mono font-bold lg:text-5xl">{metric.value}</span>
                <span className="text-sm text-text-primary">{metric.label}</span>
              </NeonCard>
            </motion.div>

            {/* ─── Evidence badges ─── */}
            <div className="flex flex-wrap gap-2">
              <EvidenceBadge label={labels.evidenceBadgeCommit} />
              <EvidenceBadge label={labels.evidenceBadgeStory} />
              <EvidenceBadge label={labels.evidenceBadgeSession} />
            </div>

            <GlowDivider />

            {/* ─── Closing ─── */}
            <section
              aria-label={closing.eyebrow}
              className="rounded-[1.75rem] border border-accent-primary/20 bg-[radial-gradient(circle_at_top,rgba(0,255,65,0.12),transparent_50%),rgba(5,12,9,0.92)] p-6"
            >
              <p className="text-[0.65rem] font-mono uppercase tracking-[0.24em] text-accent-primary">
                {closing.eyebrow}
              </p>
              <p className="mt-4 text-2xl font-mono font-bold text-text-primary lg:text-3xl">
                {closing.headline}
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

export default Topic18;
