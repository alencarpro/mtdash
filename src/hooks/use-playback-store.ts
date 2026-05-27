import { create } from 'zustand';
import { DateTime } from 'luxon';

type ColumnStatus = 'RUNNING' | 'PAUSED' | 'SYNCING';

interface ColumnState {
  status: ColumnStatus;
  currentDashboardId?: string;
  nextDashboardId?: string;
  lastSwapTime?: DateTime;
}

interface PlaybackState {
  globalTime: DateTime;
  columnStates: Record<number, ColumnState>;
  setColumnStatus: (columnIndex: number, status: ColumnStatus) => void;
  updateGlobalTime: (time: DateTime) => void;
}

export const usePlaybackStore = create<PlaybackState>((set) => ({
  globalTime: DateTime.now(),
  columnStates: {
    0: { status: 'RUNNING' },
    1: { status: 'RUNNING' },
    2: { status: 'RUNNING' },
    3: { status: 'RUNNING' },
  },
  setColumnStatus: (columnIndex, status) => 
    set((state) => {
      if (state.columnStates[columnIndex]?.status === status) return state;
      return {
        columnStates: {
          ...state.columnStates,
          [columnIndex]: { ...state.columnStates[columnIndex], status }
        }
      };
    }),
  updateGlobalTime: (time) => set((state) => {
    if (state.globalTime.hasSame(time, 'second')) return state;
    return { globalTime: time };
  }),
}));
