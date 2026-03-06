/**
 * CRT scanline overlay — matches demo-ux-components.html exactly.
 * Fixed fullscreen layer between canvas (z-0) and content (z-2).
 */
export const ScanlineOverlay = () => (
  <div
    data-testid="scanline-overlay"
    aria-hidden="true"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
      pointerEvents: 'none',
      background: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 65, 0.03) 2px,
        rgba(0, 255, 65, 0.03) 4px
      )`,
    }}
  />
);
