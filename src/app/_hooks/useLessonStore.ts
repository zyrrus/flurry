import { create } from "zustand";
import type { SelectExercises } from "~/server/db/schema-types";

interface State {
  id: Id | undefined;
  exercises: SelectExercises[];
  exerciseIndex: number;
}

interface Actions {
  setId: (id?: Id) => void;
  nextExercise: () => void;
  reset: () => void;
}

interface Id {
  courseId: number;
  topicId: number;
  lessonId: number;
}

const initialState: State = {
  id: undefined,
  exercises: [],
  exerciseIndex: 0,
};

export const useLessonStore = create<State & Actions>()((set) => ({
  ...initialState,
  setId: (id) => set(() => ({ id })),
  nextExercise: () =>
    set((state) => ({ exerciseIndex: state.exerciseIndex + 1 })),
  reset: () => set(initialState),
}));
