import { useEffect, useRef, useCallback } from 'react';
import { usePresentation } from '@/contexts/PresentationContext';
import { topicBlocks, topics, type TopicBlockKey, type TopicMeta } from '@/data/topics';

const blockContainerClassByKey: Record<TopicBlockKey, string> = {
  problem: 'border-accent-primary/20 bg-accent-primary/5',
  evolution: 'border-cyan-400/20 bg-cyan-400/5',
  tools: 'border-emerald-300/20 bg-emerald-300/5',
  'new-role': 'border-lime-300/20 bg-lime-300/5',
  impact: 'border-[#ffb700]/20 bg-[#ffb700]/5',
  bonus: 'border-[#ffd166]/30 bg-[#ffd166]/8',
};

const topicButtonClassByKey: Record<TopicBlockKey, string> = {
  problem: 'border-accent-primary/25 hover:border-accent-primary/60 hover:bg-accent-primary/10',
  evolution: 'border-cyan-400/25 hover:border-cyan-400/60 hover:bg-cyan-400/10',
  tools: 'border-emerald-300/25 hover:border-emerald-300/60 hover:bg-emerald-300/10',
  'new-role': 'border-lime-300/25 hover:border-lime-300/60 hover:bg-lime-300/10',
  impact: 'border-[#ffb700]/25 hover:border-[#ffb700]/60 hover:bg-[#ffb700]/10',
  bonus: 'border-[#ffd166]/35 hover:border-[#ffd166]/70 hover:bg-[#ffd166]/12',
};

const coreTopics = topics.filter((topic) => !topic.isBonus);
const bonusTopics = topics.filter((topic) => topic.isBonus);

function TopicCard({
  topic,
  isActive,
  onSelect,
}: {
  topic: TopicMeta;
  isActive: boolean;
  onSelect: (topicIndex: number) => void;
}) {
  return (
    <button
      type="button"
      data-topic-index={topic.index}
      onClick={() => onSelect(topic.index)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(topic.index);
        }
      }}
      className={`group relative flex min-h-28 flex-col justify-between rounded-2xl border px-4 py-4 text-left font-mono transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-primary ${
        isActive
          ? 'border-accent-primary bg-accent-primary/12 text-accent-primary shadow-[0_0_28px_rgba(0,255,65,0.18)]'
          : `text-text-secondary ${topicButtonClassByKey[topic.block]}`
      }`}
      aria-current={isActive ? 'true' : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`rounded-full border px-2 py-1 text-[0.65rem] font-bold tracking-[0.24em] uppercase ${
            topic.isBonus
              ? 'border-[#ffd166]/40 text-[#ffd166]'
              : 'border-border-subtle text-text-muted'
          }`}
        >
          {topic.isBonus ? 'BÔNUS' : `TOP ${topic.index.toString().padStart(2, '0')}`}
        </span>
        {isActive && (
          <span className="text-[0.65rem] font-bold tracking-[0.24em] uppercase text-accent-primary">
            AO VIVO
          </span>
        )}
      </div>

      <div className="space-y-1">
        <span className="block text-base font-bold leading-tight text-text-primary transition-colors group-hover:text-text-primary">
          {topic.shortTitle}
        </span>
        <span className="block text-xs leading-relaxed text-text-muted">{topic.title}</span>
      </div>
    </button>
  );
}

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
        const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>('button');
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-deep/95"
      onClick={handleClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="overview-title"
        className="w-full max-w-[min(96vw,1400px)] max-h-[calc(100vh-2rem)] overflow-y-auto overflow-x-hidden p-4 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="rounded-[2rem] border border-accent-primary/20 bg-[radial-gradient(circle_at_top,_rgba(0,255,65,0.12),_transparent_42%),linear-gradient(180deg,rgba(4,9,13,0.98),rgba(4,9,13,0.92))] p-5 shadow-[0_0_40px_rgba(0,255,65,0.08)] sm:p-7">
          <div className="mb-6 flex flex-col gap-5 border-b border-border-subtle pb-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-accent-primary">
                Menu Command Center
              </p>
              <h2
                id="overview-title"
                className="text-2xl font-mono font-bold text-text-primary sm:text-3xl"
              >
                Visão operacional da apresentação
              </h2>
              <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                A rota principal permanece em {coreTopics.length} tópicos. Os tópicos bônus
                fecham a experiência com Copilot operacional e os bastidores da construção
                desta aplicação.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border-subtle bg-bg-card/70 px-4 py-3">
                <p className="text-[0.65rem] font-mono uppercase tracking-[0.24em] text-text-muted">
                  Estado Atual
                </p>
                <p className="mt-2 text-2xl font-mono font-bold text-accent-primary">
                  Tópico {currentTopicIndex}
                </p>
              </div>
              <div className="rounded-2xl border border-border-subtle bg-bg-card/70 px-4 py-3">
                <p className="text-[0.65rem] font-mono uppercase tracking-[0.24em] text-text-muted">
                  Jornada Base
                </p>
                <p className="mt-2 text-2xl font-mono font-bold text-text-primary">
                  {coreTopics.length} tópicos
                </p>
              </div>
              <div className="rounded-2xl border border-[#ffd166]/20 bg-[#ffd166]/6 px-4 py-3">
                <p className="text-[0.65rem] font-mono uppercase tracking-[0.24em] text-[#ffd166]">
                  Extensão
                </p>
                <p className="mt-2 text-2xl font-mono font-bold text-[#ffd166]">+{bonusTopics.length} bônus</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(280px,360px)_1fr]">
            <aside className="space-y-4">
              <div className="rounded-2xl border border-border-subtle bg-bg-card/70 p-4">
                <p className="text-[0.65rem] font-mono uppercase tracking-[0.24em] text-text-muted">
                  Protocolo de uso
                </p>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary">
                  <p>Use `Esc` para abrir ou fechar este painel sem perder o tópico atual.</p>
                  <p>
                    Selecione qualquer tópico para saltar direto com deep link, barra de
                    progresso e estado global sincronizados.
                  </p>
                  <p>
                    O bônus foi isolado para preservar o arco principal e ainda oferecer uma
                    ponte prática para o dia 1.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-accent-primary/15 bg-accent-primary/5 p-4">
                <p className="text-[0.65rem] font-mono uppercase tracking-[0.24em] text-accent-primary">
                  Macrofluxo
                </p>
                <div className="mt-4 space-y-3">
                  {topicBlocks.map((block) => (
                    <div key={block.key} className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-mono font-bold text-text-primary">
                          {block.label}
                        </p>
                        <p className="text-xs text-text-muted">{block.description}</p>
                      </div>
                      <span className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-text-muted">
                        {block.rangeLabel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="space-y-4">
              {topicBlocks
                .filter((block) => !block.isBonus)
                .map((block) => {
                  const blockTopics = coreTopics.filter((topic) => topic.block === block.key);

                  return (
                    <section
                      key={block.key}
                      className={`rounded-2xl border p-4 sm:p-5 ${blockContainerClassByKey[block.key]}`}
                    >
                      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="text-[0.65rem] font-mono uppercase tracking-[0.24em] text-text-muted">
                            {block.rangeLabel}
                          </p>
                          <h3 className="text-lg font-mono font-bold text-text-primary">
                            {block.label}
                          </h3>
                          <p className="mt-1 text-sm text-text-secondary">
                            {block.description}
                          </p>
                        </div>
                        <span className="text-[0.65rem] font-mono uppercase tracking-[0.24em] text-text-muted">
                          {blockTopics.length} entradas
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
                        {blockTopics.map((topic) => (
                          <TopicCard
                            key={topic.index}
                            topic={topic}
                            isActive={topic.index === currentTopicIndex}
                            onSelect={handleSelect}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}

              <section className="rounded-2xl border border-[#ffd166]/30 bg-[linear-gradient(135deg,rgba(255,209,102,0.12),rgba(255,209,102,0.04))] p-4 sm:p-5">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[0.65rem] font-mono uppercase tracking-[0.24em] text-[#ffd166]">
                      Tópicos extras
                    </p>
                    <h3 className="text-lg font-mono font-bold text-text-primary">
                      Bônus & Bastidores
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      Copilot operacional e os bastidores da construção desta aplicação.
                    </p>
                  </div>
                  <span className="text-[0.65rem] font-mono uppercase tracking-[0.24em] text-[#ffd166]">
                    Pós-CTA
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {bonusTopics.map((topic) => (
                    <TopicCard
                      key={topic.index}
                      topic={topic}
                      isActive={topic.index === currentTopicIndex}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
