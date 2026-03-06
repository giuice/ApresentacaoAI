import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  revealContainerVariants,
  revealReducedContainerVariants,
  revealItemVariants,
  revealReducedItemVariants,
} from '@/components/topics/topicRevealVariants';
import { useShouldReduceMotion } from '../../hooks/useShouldReduceMotion';

interface TopicRevealProps {
  children: ReactNode;
  className?: string;
}

interface TopicRevealItemProps {
  children: ReactNode;
  className?: string;
}

export const TopicReveal = ({ children, className }: TopicRevealProps) => {
  const shouldReduceMotion = useShouldReduceMotion();
  const containerVariants = shouldReduceMotion ? revealReducedContainerVariants : revealContainerVariants;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      data-testid="topic-reveal-container"
    >
      {children}
    </motion.div>
  );
};

export const TopicRevealItem = ({ children, className }: TopicRevealItemProps) => {
  const shouldReduceMotion = useShouldReduceMotion();
  const itemVariants = shouldReduceMotion ? revealReducedItemVariants : revealItemVariants;

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      data-testid="topic-reveal-item"
    >
      {children}
    </motion.div>
  );
};
