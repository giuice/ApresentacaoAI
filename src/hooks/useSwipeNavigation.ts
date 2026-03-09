import { useEffect, useRef } from 'react';
import { usePresentation } from '@/contexts/PresentationContext';

const SWIPE_THRESHOLD = 50;
const SWIPE_MAX_VERTICAL = 80;

function isInsideScrollable(el: EventTarget | null): boolean {
  let node = el as HTMLElement | null;
  while (node) {
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      node.scrollHeight > node.clientHeight
    ) {
      return true;
    }
    node = node.parentElement;
  }
  return false;
}

export function useSwipeNavigation() {
  const { dispatch, isOverviewOpen } = usePresentation();
  const touchStart = useRef<{ x: number; y: number; target: EventTarget | null } | null>(null);
  const isOverviewOpenRef = useRef(isOverviewOpen);
  isOverviewOpenRef.current = isOverviewOpen;

  useEffect(() => {
    function handleTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY, target: e.target };
    }

    function handleTouchEnd(e: TouchEvent) {
      if (!touchStart.current || isOverviewOpenRef.current) {
        touchStart.current = null;
        return;
      }

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;
      const startTarget = touchStart.current.target;
      touchStart.current = null;

      if (Math.abs(deltaY) > SWIPE_MAX_VERTICAL) return;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
      if (isInsideScrollable(startTarget)) return;

      if (deltaX < 0) {
        dispatch({ type: 'NEXT' });
      } else {
        dispatch({ type: 'PREV' });
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dispatch]);
}
