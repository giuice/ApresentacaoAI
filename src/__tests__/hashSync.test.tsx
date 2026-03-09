import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { PresentationProvider, usePresentation } from '@/contexts/PresentationContext';
import { useHashSync } from '@/hooks/useHashSync';

function wrapper({ children }: { children: ReactNode }) {
  return <PresentationProvider>{children}</PresentationProvider>;
}

function useTestHook() {
  const presentation = usePresentation();
  useHashSync();
  return presentation;
}

describe('useHashSync', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  describe('initialization from hash', () => {
    it('initializes to topic from valid hash #/topic/8', () => {
      window.location.hash = '#/topic/8';
      const { result } = renderHook(() => useTestHook(), { wrapper });
      expect(result.current.currentTopicIndex).toBe(8);
    });

    it('initializes to topic 1 for valid hash #/topic/1', () => {
      window.location.hash = '#/topic/1';
      const { result } = renderHook(() => useTestHook(), { wrapper });
      expect(result.current.currentTopicIndex).toBe(1);
    });

    it('initializes to topic 17 for valid hash #/topic/17', () => {
      window.location.hash = '#/topic/17';
      const { result } = renderHook(() => useTestHook(), { wrapper });
      expect(result.current.currentTopicIndex).toBe(17);
    });
  });

  describe('invalid hash fallback to topic 1', () => {
    it('falls back to topic 1 for out-of-range hash #/topic/99', () => {
      window.location.hash = '#/topic/99';
      const { result } = renderHook(() => useTestHook(), { wrapper });
      expect(result.current.currentTopicIndex).toBe(1);
    });

    it('falls back to topic 1 for zero hash #/topic/0', () => {
      window.location.hash = '#/topic/0';
      const { result } = renderHook(() => useTestHook(), { wrapper });
      expect(result.current.currentTopicIndex).toBe(1);
    });

    it('falls back to topic 1 for negative hash #/topic/-5', () => {
      window.location.hash = '#/topic/-5';
      const { result } = renderHook(() => useTestHook(), { wrapper });
      expect(result.current.currentTopicIndex).toBe(1);
    });

    it('falls back to topic 1 for garbage hash #foo', () => {
      window.location.hash = '#foo';
      const { result } = renderHook(() => useTestHook(), { wrapper });
      expect(result.current.currentTopicIndex).toBe(1);
    });

    it('falls back to topic 1 for non-numeric hash #/topic/abc', () => {
      window.location.hash = '#/topic/abc';
      const { result } = renderHook(() => useTestHook(), { wrapper });
      expect(result.current.currentTopicIndex).toBe(1);
    });

    it('falls back to topic 1 when no hash is present', () => {
      window.location.hash = '';
      const { result } = renderHook(() => useTestHook(), { wrapper });
      expect(result.current.currentTopicIndex).toBe(1);
    });

    it('canonicalizes invalid hash to #/topic/1', () => {
      window.location.hash = '#foo';
      renderHook(() => useTestHook(), { wrapper });
      expect(window.location.hash).toBe('#/topic/1');
    });
  });

  describe('hash mirrors state on navigation', () => {
    it('updates hash to #/topic/2 on NEXT dispatch', () => {
      window.location.hash = '';
      const { result } = renderHook(() => useTestHook(), { wrapper });

      act(() => {
        result.current.dispatch({ type: 'NEXT' });
      });

      expect(result.current.currentTopicIndex).toBe(2);
      expect(window.location.hash).toBe('#/topic/2');
    });

    it('updates hash on PREV dispatch', () => {
      window.location.hash = '#/topic/5';
      const { result } = renderHook(() => useTestHook(), { wrapper });

      act(() => {
        result.current.dispatch({ type: 'PREV' });
      });

      expect(result.current.currentTopicIndex).toBe(4);
      expect(window.location.hash).toBe('#/topic/4');
    });

    it('updates hash on GOTO dispatch', () => {
      window.location.hash = '';
      const { result } = renderHook(() => useTestHook(), { wrapper });

      act(() => {
        result.current.dispatch({ type: 'GOTO', payload: 10 });
      });

      expect(result.current.currentTopicIndex).toBe(10);
      expect(window.location.hash).toBe('#/topic/10');
    });

    it('keeps valid initial hash without fallback overwrite', () => {
      window.location.hash = '#/topic/8';
      const { result } = renderHook(() => useTestHook(), { wrapper });

      expect(result.current.currentTopicIndex).toBe(8);
      expect(window.location.hash).toBe('#/topic/8');
    });

    it('navigates when the browser hash changes to a valid topic after initialization', () => {
      window.location.hash = '#/topic/2';
      const { result } = renderHook(() => useTestHook(), { wrapper });

      act(() => {
        window.location.hash = '#/topic/7';
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      });

      expect(result.current.currentTopicIndex).toBe(7);
      expect(window.location.hash).toBe('#/topic/7');
    });

    it('canonicalizes invalid runtime hash back to the current topic', () => {
      window.location.hash = '#/topic/4';
      const { result } = renderHook(() => useTestHook(), { wrapper });

      act(() => {
        window.location.hash = '#foo';
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      });

      expect(result.current.currentTopicIndex).toBe(4);
      expect(window.location.hash).toBe('#/topic/4');
    });
  });
});
