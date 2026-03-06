import { useEffect, useRef } from 'react';
import { usePresentation, TOTAL_TOPICS } from '@/contexts/PresentationContext';

const FALLBACK_TOPIC_INDEX = 1;
const HASH_PATTERN = /^#\/topic\/(\d+)$/;

function parseTopicFromHash(hash: string): number | null {
  const match = hash.match(HASH_PATTERN);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  if (num < 1 || num > TOTAL_TOPICS) return null;
  return num;
}

function getInitialTopicFromHash(hash: string): number {
  return parseTopicFromHash(hash) ?? FALLBACK_TOPIC_INDEX;
}

export function useHashSync() {
  const { currentTopicIndex, dispatch } = usePresentation();
  const initialized = useRef(false);
  const pendingInitializationTopic = useRef<number | null>(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initialTopic = getInitialTopicFromHash(window.location.hash);
    pendingInitializationTopic.current = initialTopic;
    dispatch({ type: 'INIT_FROM_HASH', payload: initialTopic });
  }, [dispatch]);

  useEffect(() => {
    if (!initialized.current) return;

    if (pendingInitializationTopic.current !== null && currentTopicIndex !== pendingInitializationTopic.current) {
      return;
    }
    pendingInitializationTopic.current = null;

    const expected = `#/topic/${currentTopicIndex}`;
    if (window.location.hash !== expected) {
      window.location.hash = expected;
    }
  }, [currentTopicIndex]);
}
