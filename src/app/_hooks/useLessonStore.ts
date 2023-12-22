import { create } from "zustand";
import type { SelectExercises } from "~/server/db/schema-types";

interface State {
  id: Id | undefined;
  exercises: SelectExercises[];
}

interface Actions {
  setId: (id?: Id) => void;
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
};

export const useLessonStore = create<State & Actions>()((set) => ({
  ...initialState,
  setId: (id) => set(() => ({ id })),
  reset: () => set(initialState),
}));
