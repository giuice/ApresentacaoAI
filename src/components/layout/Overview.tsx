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
      className="fixed inset-0 bg-bg-deep/95 z-50 flex items-center justify-center"
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
          className="text-xl font-mono text-accent-primary mb-6 text-center"
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
                className={`p-4 border font-mono text-left rounded transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary ${
                  isActive
                    ? 'border-accent-primary bg-accent-primary/20 text-accent-primary'
                    : 'border-accent-primary/30 text-accent-primary/70 hover:border-accent-primary/60 hover:bg-accent-primary/10'
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
