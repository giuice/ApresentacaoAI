import { createContext, useContext, useReducer, ReactNode } from 'react';

export type PresentationDirection = 'next' | 'prev';

export interface PresentationState {
  currentTopicIndex: number;
  direction: PresentationDirection;
  isOverviewOpen: boolean;
}

export type PresentationAction =
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'GOTO'; payload: number }
  | { type: 'TOGGLE_OVERVIEW' }
  | { type: 'SET_DIRECTION'; payload: PresentationDirection }
  | { type: 'INIT_FROM_HASH'; payload: number };

export const TOTAL_TOPICS = 16;

const initialState: PresentationState = {
  currentTopicIndex: 1,
  direction: 'next',
  isOverviewOpen: false,
};

export function presentationReducer(state: PresentationState, action: PresentationAction): PresentationState {
  switch (action.type) {
    case 'NEXT': {
      if (state.currentTopicIndex >= TOTAL_TOPICS) return { ...state, direction: 'next' };
      return {
        ...state,
        currentTopicIndex: state.currentTopicIndex + 1,
        direction: 'next',
      };
    }
    case 'PREV': {
      if (state.currentTopicIndex <= 1) return { ...state, direction: 'prev' };
      return {
        ...state,
        currentTopicIndex: state.currentTopicIndex - 1,
        direction: 'prev',
      };
    }
    case 'GOTO': {
      const target = Math.max(1, Math.min(TOTAL_TOPICS, action.payload || 1));
      if (target === state.currentTopicIndex) return state;
      return {
        ...state,
        currentTopicIndex: target,
        direction: target > state.currentTopicIndex ? 'next' : 'prev',
      };
    }
    case 'TOGGLE_OVERVIEW': {
      return {
        ...state,
        isOverviewOpen: !state.isOverviewOpen,
      };
    }
    case 'SET_DIRECTION': {
      return {
        ...state,
        direction: action.payload,
      };
    }
    case 'INIT_FROM_HASH': {
      const target = Math.max(1, Math.min(TOTAL_TOPICS, action.payload || 1));
      return {
        ...state,
        currentTopicIndex: target,
      };
    }
    default:
      return state;
  }
}

export interface PresentationContextValue extends PresentationState {
  dispatch: React.Dispatch<PresentationAction>;
}

export const PresentationContext = createContext<PresentationContextValue | undefined>(undefined);

export function PresentationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(presentationReducer, initialState);

  return (
    <PresentationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentation() {
  const context = useContext(PresentationContext);
  if (context === undefined) {
    throw new Error('usePresentation must be used within a PresentationProvider');
  }
  return context;
}
