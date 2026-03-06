import type { Variants } from 'framer-motion';

export const REVEAL_DELAY_BASE = 0.6;
export const REVEAL_STAGGER_CHILDREN = 0.12;
export const REVEAL_DURATION = 0.5;
export const REVEAL_Y_OFFSET = 30;
export const REVEAL_EASING: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const revealContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: REVEAL_DELAY_BASE,
      staggerChildren: REVEAL_STAGGER_CHILDREN,
    },
  },
};

export const revealItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: REVEAL_Y_OFFSET,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: REVEAL_DURATION,
      ease: REVEAL_EASING,
    },
  },
};

export const revealReducedContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: REVEAL_DELAY_BASE,
      staggerChildren: REVEAL_STAGGER_CHILDREN,
    },
  },
};

export const revealReducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: REVEAL_DURATION,
      ease: REVEAL_EASING,
    },
  },
};
