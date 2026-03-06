import { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import type { PresentationDirection } from '@/contexts/PresentationContext';

interface TopicTransitionProps {
  topicIndex: number;
  direction: PresentationDirection;
  children: ReactNode;
}

const SLIDE_OFFSET_X = 300;
export const TRANSITION_DURATION = 0.6;
const TRANSITION_EASING: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const slideVariants: Variants = {
  initial: (direction: PresentationDirection) => ({
    x: direction === 'next' ? SLIDE_OFFSET_X : -SLIDE_OFFSET_X,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: TRANSITION_DURATION, ease: TRANSITION_EASING },
  },
  exit: (direction: PresentationDirection) => ({
    x: direction === 'next' ? -SLIDE_OFFSET_X : SLIDE_OFFSET_X,
    opacity: 0,
    transition: { duration: TRANSITION_DURATION, ease: TRANSITION_EASING },
  }),
};

const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: TRANSITION_DURATION, ease: TRANSITION_EASING },
  },
  exit: {
    opacity: 0,
    transition: { duration: TRANSITION_DURATION, ease: TRANSITION_EASING },
  },
};

export const TopicTransition = ({ topicIndex, direction, children }: TopicTransitionProps) => {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? fadeVariants : slideVariants;

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={topicIndex}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
