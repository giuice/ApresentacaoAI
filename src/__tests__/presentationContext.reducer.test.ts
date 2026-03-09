import { describe, it, expect } from 'vitest';
import {
  presentationReducer,
  PresentationState,
  TOTAL_TOPICS,
} from '@/contexts/PresentationContext';

describe('presentationReducer', () => {
  const initialState: PresentationState = {
    currentTopicIndex: 1,
    direction: 'next',
    isOverviewOpen: false,
  };

  it('handles NEXT action correctly', () => {
    const newState = presentationReducer(initialState, { type: 'NEXT' });
    expect(newState.currentTopicIndex).toBe(2);
    expect(newState.direction).toBe('next');
  });

  it('clamps NEXT at TOTAL_TOPICS', () => {
    const state: PresentationState = { ...initialState, currentTopicIndex: TOTAL_TOPICS };
    const newState = presentationReducer(state, { type: 'NEXT' });
    expect(newState.currentTopicIndex).toBe(TOTAL_TOPICS);
  });

  it('handles PREV action correctly', () => {
    const state: PresentationState = { ...initialState, currentTopicIndex: 5 };
    const newState = presentationReducer(state, { type: 'PREV' });
    expect(newState.currentTopicIndex).toBe(4);
    expect(newState.direction).toBe('prev');
  });

  it('clamps PREV at 1', () => {
    const newState = presentationReducer(initialState, { type: 'PREV' });
    expect(newState.currentTopicIndex).toBe(1);
  });

  it('handles GOTO action correctly', () => {
    const newState = presentationReducer(initialState, { type: 'GOTO', payload: 10 });
    expect(newState.currentTopicIndex).toBe(10);
    expect(newState.direction).toBe('next');
  });

  it('clamps invalid payload in GOTO', () => {
    const overMax = presentationReducer(initialState, { type: 'GOTO', payload: 99 });
    expect(overMax.currentTopicIndex).toBe(TOTAL_TOPICS);
    expect(overMax.direction).toBe('next');

    const belowMin = presentationReducer(initialState, { type: 'GOTO', payload: -3 });
    expect(belowMin.currentTopicIndex).toBe(1);
    expect(belowMin.direction).toBe('next');

    const zeroPayload = presentationReducer(initialState, { type: 'GOTO', payload: 0 });
    expect(zeroPayload.currentTopicIndex).toBe(1);
  });

  it('handles TOGGLE_OVERVIEW action correctly', () => {
    const newState = presentationReducer(initialState, { type: 'TOGGLE_OVERVIEW' });
    expect(newState.isOverviewOpen).toBe(true);
  });

  it('handles SET_DIRECTION action correctly', () => {
    const newState = presentationReducer(initialState, { type: 'SET_DIRECTION', payload: 'prev' });
    expect(newState.direction).toBe('prev');
  });

  it('handles INIT_FROM_HASH action correctly', () => {
    const newState = presentationReducer(initialState, { type: 'INIT_FROM_HASH', payload: 5 });
    expect(newState.currentTopicIndex).toBe(5);
  });

  it('clamps invalid payload in INIT_FROM_HASH', () => {
    const overMax = presentationReducer(initialState, { type: 'INIT_FROM_HASH', payload: 300 });
    expect(overMax.currentTopicIndex).toBe(TOTAL_TOPICS);

    const belowMin = presentationReducer(initialState, { type: 'INIT_FROM_HASH', payload: -7 });
    expect(belowMin.currentTopicIndex).toBe(1);

    const zeroPayload = presentationReducer(initialState, { type: 'INIT_FROM_HASH', payload: 0 });
    expect(zeroPayload.currentTopicIndex).toBe(1);
  });
});
