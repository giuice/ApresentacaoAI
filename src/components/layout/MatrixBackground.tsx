import { useEffect, useRef } from 'react';

const FONT_SIZE = 18;
const MAX_STREAMS = 40;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const CANVAS_OPACITY = 0.5;
const MATRIX_COLOR_FALLBACK = '#00FF41';
const BACKGROUND_COLOR = '#000000';
const FADE_ALPHA = 0.05;
const CHAR_POOL = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

export const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const dropsRef = useRef<Float32Array | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const matrixColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent-primary')
      .trim() || MATRIX_COLOR_FALLBACK;
    reducedMotionRef.current = mql.matches;

    const stopAnimation = () => {
      if (rafRef.current !== 0) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    const paintBase = () => {
      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      lastFrameRef.current = 0;

      if (e.matches) {
        stopAnimation();
        paintBase();
        return;
      }

      stopAnimation();
      rafRef.current = requestAnimationFrame(draw);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const columns = Math.min(
        Math.floor(window.innerWidth / FONT_SIZE),
        MAX_STREAMS,
      );
      const drops = new Float32Array(columns);
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -20;
      }
      dropsRef.current = drops;

      paintBase();
    };

    const draw = (timestamp: number) => {
      if (reducedMotionRef.current) {
        rafRef.current = 0;
        return;
      }

      const elapsed = timestamp - lastFrameRef.current;
      if (elapsed < FRAME_INTERVAL) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameRef.current = timestamp - (elapsed % FRAME_INTERVAL);

      const drops = dropsRef.current;
      if (!drops) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = `rgba(0, 0, 0, ${FADE_ALPHA})`;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.fillStyle = matrixColor;
      ctx.font = `${FONT_SIZE}px monospace`;

      const maxY = window.innerHeight / FONT_SIZE;

      for (let i = 0; i < drops.length; i++) {
        if (drops[i] < 0) {
          drops[i] += 1;
          continue;
        }

        const char = CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
        const x = i * (window.innerWidth / drops.length);
        const y = drops[i] * FONT_SIZE;

        ctx.fillText(char, x, y);

        if (drops[i] > maxY && Math.random() > 0.975) {
          drops[i] = Math.random() * -10;
        } else {
          drops[i] += 1;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    mql.addEventListener('change', handleMotionChange);
    resize();
    window.addEventListener('resize', resize);

    if (!reducedMotionRef.current) {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      stopAnimation();
      window.removeEventListener('resize', resize);
      mql.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="matrix-background"
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: CANVAS_OPACITY, zIndex: 0 }}
      aria-hidden="true"
    />
  );
};
