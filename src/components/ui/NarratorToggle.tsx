interface NarratorToggleProps {
  page: 'content' | 'notes';
  onToggle: (page: 'content' | 'notes') => void;
  accent?: 'danger' | 'success';
}

const accentMap = {
  danger: {
    active: 'border-accent-danger text-accent-danger bg-accent-danger/10',
    inactive: 'border-border-subtle text-text-muted hover:text-text-primary',
  },
  success: {
    active: 'border-accent-primary text-accent-primary bg-accent-primary/10',
    inactive: 'border-border-subtle text-text-muted hover:text-text-primary',
  },
};

export const NarratorToggle = ({
  page,
  onToggle,
  accent = 'success',
}: NarratorToggleProps) => {
  const styles = accentMap[accent];

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onToggle('content')}
        className={`px-3 py-2 text-xs font-mono border rounded transition-colors ${
          page === 'content' ? styles.active : styles.inactive
        }`}
        aria-pressed={page === 'content'}
      >
        Conteudo
      </button>
      <button
        type="button"
        onClick={() => onToggle('notes')}
        className={`px-3 py-2 text-xs font-mono border rounded transition-colors ${
          page === 'notes' ? styles.active : styles.inactive
        }`}
        aria-pressed={page === 'notes'}
      >
        Notas
      </button>
    </div>
  );
};
