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
      className="flex gap-2 justify-center"
      role="progressbar"
      aria-valuenow={activeSegment}
      aria-valuemin={1}
      aria-valuemax={TOTAL_SEGMENTS}
      aria-label="Progresso da apresentacao"
    >
      {SEGMENT_LABELS.map((label, i) => {
        const segmentNumber = i + 1;
        const isActive = segmentNumber === activeSegment;

        return (
          <div
            key={segmentNumber}
            className={`
              h-2 flex-1 max-w-32 rounded-sm transition-all duration-300
              ${isActive
                ? 'bg-matrix-green shadow-[0_0_8px_#00FF41,0_0_16px_#00FF41]'
                : 'bg-matrix-green/20'
              }
            `}
            aria-label={`${label}${isActive ? ' (ativo)' : ''}`}
          />
        );
      })}
    </div>
  );
};
