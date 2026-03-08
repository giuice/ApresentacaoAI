import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface TerminalLine {
  type: 'prompt' | 'comment' | 'keyword' | 'string' | 'output';
  text: string;
}

interface MatrixTerminalProps {
  title: string;
  lines: TerminalLine[];
  className?: string;
  bodyClassName?: string;
  contrast?: 'default' | 'high';
}

const lineColorClassByContrast: Record<
  NonNullable<MatrixTerminalProps['contrast']>,
  Record<TerminalLine['type'], string>
> = {
  default: {
    prompt: 'text-text-muted select-none',
    comment: 'text-text-muted',
    keyword: 'text-accent-warning',
    string: 'text-accent-primary',
    output: 'text-accent-primary',
  },
  high: {
    prompt: 'text-text-secondary select-none',
    comment: 'text-text-secondary',
    keyword: 'text-accent-warning',
    string: 'text-accent-primary',
    output: 'text-accent-primary',
  },
};

const headerTitleColorClassByContrast: Record<NonNullable<MatrixTerminalProps['contrast']>, string> = {
  default: 'text-text-muted',
  high: 'text-text-secondary',
};

export const MatrixTerminal = ({
  title,
  lines,
  className,
  bodyClassName,
  contrast = 'default',
}: MatrixTerminalProps) => {
  const lineColorClass = lineColorClassByContrast[contrast];
  const headerTitleColorClass = headerTitleColorClassByContrast[contrast];
  const promptPrefixClass =
    contrast === 'high' ? 'text-text-secondary select-none' : 'text-text-muted select-none';
  const commentPrefixClass = contrast === 'high' ? 'text-text-secondary' : 'text-text-muted';

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);

    if (lines.length === 0) return;

    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setVisibleCount(current);
      if (current >= lines.length) {
        clearInterval(timer);
      }
    }, 300);

    return () => clearInterval(timer);
  }, [lines]);

  return (
    <div
      data-testid="matrix-terminal"
      className={`flex h-full w-full max-w-[800px] flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-card shadow-[0_4px_24px_rgba(0,0,0,0.4)] ${className ?? ''}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-bg-surface border-b border-border-subtle">
        <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
        <span className={`ml-4 rounded-t bg-bg-card px-3 py-0.5 font-mono text-xs ${headerTitleColorClass}`}>
          {title}
        </span>
      </div>

      {/* Body */}
      <div
        className={`min-h-[260px] flex-1 p-6 font-mono text-[0.85rem] leading-[1.8] text-accent-primary ${bodyClassName ?? ''}`}
      >
        {lines.map((line, i) => {
          if (i >= visibleCount) return null;

          const isLast = i === visibleCount - 1;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={lineColorClass[line.type]}
            >
              {line.type === 'prompt' && (
                <span className={promptPrefixClass}>$ </span>
              )}
              {line.type === 'comment' && (
                <span className={commentPrefixClass}>// </span>
              )}
              <span>{line.text}</span>
              {isLast && (
                <span className="inline-block w-2 h-[1.1em] bg-accent-primary align-text-bottom animate-blink" />
              )}
            </motion.div>
          );
        })}

        {/* Cursor when no lines visible yet */}
        {visibleCount === 0 && (
          <span className="inline-block w-2 h-[1.1em] bg-accent-primary align-text-bottom animate-blink" />
        )}
      </div>
    </div>
  );
};
