/**
 * Neon glow divider — matches demo-ux-components.html .glow-divider exactly.
 */
export const GlowDivider = () => (
  <div
    data-testid="glow-divider"
    className="w-full max-w-[900px] mx-auto"
    style={{
      height: 1,
      background: 'linear-gradient(90deg, transparent 0%, var(--color-accent-primary-dim) 50%, transparent 100%)',
      position: 'relative',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: -3,
        left: '30%',
        right: '30%',
        height: 7,
        background: 'var(--color-accent-primary)',
        filter: 'blur(6px)',
        opacity: 0.4,
      }}
    />
  </div>
);
