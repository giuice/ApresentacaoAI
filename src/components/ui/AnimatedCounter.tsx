import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { useShouldReduceMotion } from '../../hooks/useShouldReduceMotion';

interface AnimatedCounterProps {
  value: number;
  variant: 'danger' | 'success';
  suffix?: string;
  className?: string;
}

const ANIMATION_DELAY = 0.4;
const ANIMATION_DURATION = 1.2;
const ANIMATION_EASING = [0.25, 0.1, 0.25, 1] as const;
const REVEAL_Y_OFFSET = 20;

const variantColorClass: Record<AnimatedCounterProps['variant'], string> = {
  danger: 'text-accent-danger',
  success: 'text-accent-primary',
};

const variantGlowStyle: Record<AnimatedCounterProps['variant'], string> = {
  danger: '0 0 30px var(--glow-danger-strong), 0 0 60px var(--glow-danger)',
  success: '0 0 30px var(--glow-primary-strong), 0 0 60px var(--glow-primary)',
};

const revealVariants = {
  hidden: { opacity: 0, y: REVEAL_Y_OFFSET },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: ANIMATION_DELAY,
      duration: 0.5,
      ease: [...ANIMATION_EASING],
    },
  },
};

const revealReducedVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0,
      duration: 0.01,
    },
  },
};

const DisplayValue = ({
  value,
  suffix,
  isInteger,
}: {
  value: number;
  suffix?: string;
  isInteger: boolean;
}) => {
  const motionVal = useMotionValue(0);
  const displayed = useTransform(motionVal, (v) =>
    isInteger ? Math.round(v).toString() : v.toFixed(getDecimalPlaces(value)),
  );
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      controlsRef.current = animate(motionVal, value, {
        duration: ANIMATION_DURATION,
        ease: [...ANIMATION_EASING],
      });
    }, ANIMATION_DELAY * 1000);

    const unsubscribe = displayed.on('change', (latest) => {
      if (spanRef.current) {
        spanRef.current.textContent = latest + (suffix ?? '');
      }
    });

    return () => {
      clearTimeout(timeout);
      controlsRef.current?.stop();
      unsubscribe();
    };
  }, [motionVal, displayed, value, suffix]);

  return (
    <span ref={spanRef} data-testid="animated-counter-value">
      {`0${suffix ?? ''}`}
    </span>
  );
};

export const AnimatedCounter = ({
  value,
  variant,
  suffix,
  className,
}: AnimatedCounterProps) => {
  const shouldReduceMotion = useShouldReduceMotion();
  const isInteger = Number.isInteger(value);
  const variants = shouldReduceMotion ? revealReducedVariants : revealVariants;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className={`font-mono ${variantColorClass[variant]} ${className ?? ''}`}
      style={{ textShadow: variantGlowStyle[variant] }}
      data-testid="animated-counter"
      aria-label={`${value}${suffix ?? ''}`}
    >
      {shouldReduceMotion ? (
        <span data-testid="animated-counter-value">
          {isInteger ? value.toString() : value.toFixed(getDecimalPlaces(value))}
          {suffix ?? ''}
        </span>
      ) : (
        <DisplayValue value={value} suffix={suffix} isInteger={isInteger} />
      )}
    </motion.div>
  );
};

const getDecimalPlaces = (num: number): number => {
  const str = num.toString();
  const dotIndex = str.indexOf('.');
  return dotIndex === -1 ? 0 : str.length - dotIndex - 1;
};
