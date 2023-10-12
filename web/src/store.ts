import { create } from 'zustand';
import { Task } from './entity';

interface CurrentTaskState {
  currentTask: Task | null;
  setCurrentTask: (task: Task | null) => void;
}

export const useCurrentTaskStore = create<CurrentTaskState>()((set) => ({
  currentTask: null,
  setCurrentTask: (currentTask: Task | null) => set({ currentTask }),
}));
