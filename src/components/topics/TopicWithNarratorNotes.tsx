import { useMemo, useState, type ReactNode } from 'react';
import { TopicReveal, TopicRevealItem } from '@/components/topics/TopicReveal';
import { GlowDivider } from '@/components/ui/GlowDivider';
import { MatrixTerminal, type TerminalLine } from '@/components/ui/MatrixTerminal';

type TopicAccent = 'danger' | 'success';

interface TopicWithNarratorNotesProps {
  title: string;
  subtitle?: string;
  accent?: TopicAccent;
  notes: string[];
  children: ReactNode;
}

const accentClass: Record<TopicAccent, string> = {
  danger: 'text-accent-danger',
  success: 'text-accent-primary',
};

const toNarratorLines = (notes: string[]): TerminalLine[] => {
  const lines: TerminalLine[] = [
    { type: 'comment', text: 'Notas do narrador — use como guia, nao como script engessado.' },
  ];

  notes.forEach((note, index) => {
    lines.push({
      type: 'output',
      text: `${index + 1}. Comente: ${note}`,
    });
  });

  lines.push({
    type: 'comment',
    text: 'Fechamento: conecte este topico com o proximo passo da narrativa.',
  });

  return lines;
};

export const TopicWithNarratorNotes = ({
  title,
  subtitle,
  accent = 'success',
  notes,
  children,
}: TopicWithNarratorNotesProps) => {
  const [page, setPage] = useState<'content' | 'notes'>('content');
  const terminalLines = useMemo(() => toNarratorLines(notes), [notes]);

  return (
    <TopicReveal className="flex flex-col h-full p-8 gap-8">
      <TopicRevealItem className="flex items-start justify-between gap-6 flex-wrap">
        <div className="space-y-2">
          <h2 className={`text-5xl lg:text-6xl font-mono font-bold leading-tight ${accentClass[accent]}`}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm md:text-base font-mono text-text-secondary">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage('content')}
            className={`px-3 py-2 text-xs font-mono border rounded transition-colors ${
              page === 'content'
                ? 'border-accent-primary text-accent-primary bg-accent-primary/10'
                : 'border-border-subtle text-text-muted hover:text-text-primary'
            }`}
            aria-pressed={page === 'content'}
          >
            Pagina 1 · Conteudo
          </button>
          <button
            type="button"
            onClick={() => setPage('notes')}
            className={`px-3 py-2 text-xs font-mono border rounded transition-colors ${
              page === 'notes'
                ? 'border-accent-primary text-accent-primary bg-accent-primary/10'
                : 'border-border-subtle text-text-muted hover:text-text-primary'
            }`}
            aria-pressed={page === 'notes'}
          >
            Pagina 2 · Notas
          </button>
        </div>
      </TopicRevealItem>

      <TopicRevealItem>
        <GlowDivider />
      </TopicRevealItem>

      {page === 'content' ? (
        <TopicRevealItem className="flex-1 min-h-0">{children}</TopicRevealItem>
      ) : (
        <TopicRevealItem className="flex-1 min-h-0 flex items-center justify-center">
          <MatrixTerminal
            title="narrador.md"
            lines={terminalLines}
          />
        </TopicRevealItem>
      )}
    </TopicReveal>
  );
};