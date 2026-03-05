import { useEffect, useRef, useCallback } from 'react';
import { usePresentation } from '@/contexts/PresentationContext';
import { topics } from '@/data/topics';

export function Overview() {
  const { currentTopicIndex, dispatch } = usePresentation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleSelect = useCallback(
    (topicIndex: number) => {
      dispatch({ type: 'GOTO', payload: topicIndex });
      dispatch({ type: 'TOGGLE_OVERVIEW' });
    },
    [dispatch],
  );

  const handleClose = useCallback(() => {
    dispatch({ type: 'TOGGLE_OVERVIEW' });
  }, [dispatch]);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;

    return () => {
      previousFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const activeButton = dialogRef.current?.querySelector<HTMLButtonElement>(
      `[data-topic-index="${currentTopicIndex}"]`,
    );
    activeButton?.focus();
  }, [currentTopicIndex]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        handleClose();
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button',
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [handleClose]);

  return (
    <div
      className="fixed inset-0 bg-matrix-bg/95 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="overview-title"
        className="w-full max-w-5xl max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="overview-title"
          className="text-xl font-mono text-matrix-green mb-6 text-center"
        >
          Mapa de Topicos
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {topics.map((topic) => {
            const isActive = topic.index === currentTopicIndex;
            return (
              <button
                key={topic.index}
                data-topic-index={topic.index}
                onClick={() => handleSelect(topic.index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(topic.index);
                  }
                }}
                className={`p-4 border font-mono text-left rounded transition-colors focus:outline-none focus:ring-2 focus:ring-matrix-green ${
                  isActive
                    ? 'border-matrix-green bg-matrix-green/20 text-matrix-green'
                    : 'border-matrix-green/30 text-matrix-green/70 hover:border-matrix-green/60 hover:bg-matrix-green/10'
                }`}
              >
                <span className="block text-lg font-bold">{topic.index}</span>
                <span className="block text-sm mt-1 leading-tight">{topic.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
