import { useEffect } from 'react';
import { usePresentation } from '@/contexts/PresentationContext';

export function useKeyboardNavigation() {
  const { dispatch } = usePresentation();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat) return;

      const activeElement = document.activeElement as HTMLElement;
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.tagName === 'SELECT' ||
          activeElement.isContentEditable)
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowRight':
        case ' ': {
          event.preventDefault();
          dispatch({ type: 'NEXT' });
          break;
        }
        case 'ArrowLeft': {
          event.preventDefault();
          dispatch({ type: 'PREV' });
          break;
        }
        case 'Escape': {
          event.preventDefault();
          dispatch({ type: 'TOGGLE_OVERVIEW' });
          break;
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);
}
