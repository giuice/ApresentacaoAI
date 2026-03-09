import { usePresentation } from '@/contexts/PresentationContext';
import { TOTAL_TOPICS } from '@/data/topics';

export const MobileNavArrows = () => {
  const { dispatch, currentTopicIndex, isOverviewOpen } = usePresentation();

  if (isOverviewOpen) return null;

  const isFirst = currentTopicIndex <= 1;
  const isLast = currentTopicIndex >= TOTAL_TOPICS;

  return (
    <div className="fixed inset-y-0 left-0 right-0 z-30 pointer-events-none flex items-center justify-between px-2 md:hidden">
      <button
        onClick={() => dispatch({ type: 'PREV' })}
        disabled={isFirst}
        aria-disabled={isFirst}
        aria-label="Tópico anterior"
        className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-bg-card/80 backdrop-blur-sm transition-opacity ${isFirst ? 'opacity-20' : 'opacity-60 active:opacity-100'}`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => dispatch({ type: 'NEXT' })}
        disabled={isLast}
        aria-disabled={isLast}
        aria-label="Próximo tópico"
        className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-bg-card/80 backdrop-blur-sm transition-opacity ${isLast ? 'opacity-20' : 'opacity-60 active:opacity-100'}`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};
