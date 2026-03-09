const SEGMENT_LABELS = [
  'O Problema',
  'A Evolucao',
  'As Ferramentas',
  'O Novo Papel',
  'Impacto',
] as const;

const TOTAL_SEGMENTS = SEGMENT_LABELS.length;
const MIN_TOPIC_INDEX = 1;
const MAX_TOPIC_INDEX = 16;

/**
 * Maps a topic index (1..16) to a segment index (1..5).
 * Segment 1: Topics 1-3, Segment 2: 4-5, Segment 3: 6-10,
 * Segment 4: 11-13, Segment 5: 14-16
 */
export const getSegmentIndex = (topicIndex: number): number => {
  const normalizedTopicIndex = Number.isFinite(topicIndex)
    ? Math.min(MAX_TOPIC_INDEX, Math.max(MIN_TOPIC_INDEX, Math.trunc(topicIndex)))
    : MIN_TOPIC_INDEX;

  if (normalizedTopicIndex <= 3) return 1;
  if (normalizedTopicIndex <= 5) return 2;
  if (normalizedTopicIndex <= 10) return 3;
  if (normalizedTopicIndex <= 13) return 4;
  return 5;
};

interface CyberProgressBarProps {
  currentTopicIndex: number;
}

export const CyberProgressBar = ({ currentTopicIndex }: CyberProgressBarProps) => {
  const activeSegment = getSegmentIndex(currentTopicIndex);

  return (
    <div
      className="w-full max-w-[900px] mx-auto bg-bg-card border border-border-subtle rounded-xl p-4"
    >
      <div
        className="flex gap-1.5"
        role="progressbar"
        aria-valuenow={activeSegment}
        aria-valuemin={1}
        aria-valuemax={TOTAL_SEGMENTS}
        aria-label="Progresso da apresentacao"
      >
        {SEGMENT_LABELS.map((label, i) => {
          const segmentNumber = i + 1;
          const isActive = segmentNumber === activeSegment;
          const isCompleted = segmentNumber < activeSegment;

          return (
            <div
              key={segmentNumber}
              className={`
                h-2 flex-1 rounded-sm transition-all duration-500
                ${isActive
                  ? 'bg-accent-primary shadow-[0_0_12px_var(--glow-primary-strong)]'
                  : isCompleted
                  ? 'bg-accent-primary/50'
                  : 'bg-border-subtle'
                }
              `}
              aria-label={`${label}${isActive ? ' (ativo)' : isCompleted ? ' (concluido)' : ''}`}
            />
          );
        })}
      </div>
      <div className="flex gap-1.5 mt-2 px-0">
        {SEGMENT_LABELS.map((label, i) => {
          const segmentNumber = i + 1;
          const isActive = segmentNumber === activeSegment;
          return (
            <span
              key={segmentNumber}
              className={`flex-1 text-center font-mono text-[0.6rem] tracking-[0.1em] uppercase transition-colors duration-400 ${isActive ? 'text-accent-primary' : segmentNumber < activeSegment ? 'text-accent-primary/60' : 'text-text-muted'}`}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
};
