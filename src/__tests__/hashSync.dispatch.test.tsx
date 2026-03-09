import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useHashSync } from '@/hooks/useHashSync';
import { usePresentation } from '@/contexts/PresentationContext';
import type { PresentationContextValue } from '@/contexts/PresentationContext';

vi.mock('@/contexts/PresentationContext', () => ({
  TOTAL_TOPICS: 17,
  usePresentation: vi.fn(),
}));

function mockPresentationContext(
  overrides?: Partial<PresentationContextValue>,
): PresentationContextValue {
  return {
    currentTopicIndex: 1,
    direction: 'next',
    isOverviewOpen: false,
    dispatch: vi.fn(),
    ...overrides,
  };
}

describe('useHashSync initialization dispatch', () => {
  beforeEach(() => {
    window.location.hash = '';
    vi.clearAllMocks();
  });

  it('dispatches INIT_FROM_HASH with parsed topic for valid hash', () => {
    const contextValue = mockPresentationContext();
    vi.mocked(usePresentation).mockReturnValue(contextValue);
    window.location.hash = '#/topic/8';

    renderHook(() => useHashSync());

    expect(contextValue.dispatch).toHaveBeenCalledWith({ type: 'INIT_FROM_HASH', payload: 8 });
  });

  it('dispatches INIT_FROM_HASH with fallback topic 1 for invalid hash', () => {
    const contextValue = mockPresentationContext();
    vi.mocked(usePresentation).mockReturnValue(contextValue);
    window.location.hash = '#foo';

    renderHook(() => useHashSync());

    expect(contextValue.dispatch).toHaveBeenCalledWith({ type: 'INIT_FROM_HASH', payload: 1 });
  });
});
