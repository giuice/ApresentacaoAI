import { useEffect, useRef } from 'react';

/**
 * Digital rain canvas — direct port from demo-ux-components.html.
 * No DPR scaling, no reduced-motion gating, same draw loop.
 */

const FONT_SIZE = 18;
const MAX_ACTIVE = 40;
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%SpecKitBMADGSD';
const FADE_STYLE = 'rgba(0, 0, 0, 0.08)';
const CHAR_ALPHA = 0.8;
const FALLBACK_COLOR = '#00FF41';

export const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Local aliases that TypeScript knows are non-null inside closures
    const cv = canvas;
    const cx = ctx;

    let cols = 0;
    let drops: Float32Array;
    let activeDrops: Uint8Array;
    let cachedColor = FALLBACK_COLOR;
    let frameCount = 0;

    function refreshColor() {
      cachedColor =
        getComputedStyle(document.documentElement)
          .getPropertyValue('--color-accent-primary')
          .trim() || FALLBACK_COLOR;
    }

    function resize() {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      cols = Math.floor(cv.width / FONT_SIZE);
      drops = new Float32Array(cols);
      activeDrops = new Uint8Array(cols);
      for (let i = 0; i < cols; i++) {
        drops[i] = Math.random() * -50;
        activeDrops[i] = Math.random() < MAX_ACTIVE / cols ? 1 : 0;
      }
    }

    function draw() {
      frameCount++;

      // Skip every other frame → ~30 fps
      if (frameCount % 2 !== 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // Refresh color every 60 frames
      if (frameCount % 60 === 0) refreshColor();

      cx.fillStyle = FADE_STYLE;
      cx.fillRect(0, 0, cv.width, cv.height);

      cx.fillStyle = cachedColor;
      cx.font = `${FONT_SIZE}px monospace`;
      cx.globalAlpha = CHAR_ALPHA;

      let activeCount = 0;
      for (let i = 0; i < cols; i++) {
        if (!activeDrops[i]) continue;
        activeCount++;

        if (drops[i] < 0) {
          drops[i] += 0.3;
          continue;
        }

        const char = CHARS[(Math.random() * CHARS.length) | 0];
        cx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);

        if (drops[i] * FONT_SIZE > cv.height) {
          activeDrops[i] = 0;
          drops[i] = Math.random() * -30;
          // Wake a random sleeping column
          const wake = (Math.random() * cols) | 0;
          if (!activeDrops[wake]) {
            activeDrops[wake] = 1;
            drops[wake] = Math.random() * -15;
          }
        }

        drops[i] += 0.6;
      }

      // Ensure minimum active streams
      if (activeCount < MAX_ACTIVE) {
        const wake = (Math.random() * cols) | 0;
        activeDrops[wake] = 1;
        drops[wake] = Math.random() * -10;
      }

      cx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    refreshColor();
    window.addEventListener('resize', () => {
      resize();
      refreshColor();
    });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="matrix-background"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.5,
      }}
    />
  );
};
