import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type {
  courses,
  topics,
  lessons,
  exercises,
  lessonToExercise,
} from "~/server/db/schema";

export type SelectCourses = InferSelectModel<typeof courses>;
export type InsertCourses = InferInsertModel<typeof courses>;
export type SelectCoursesWithTopics = SelectCourses & {
  topics: SelectTopicsWithLessons[];
};

export type SelectTopics = InferSelectModel<typeof topics>;
export type InsertTopics = InferInsertModel<typeof topics>;
export type SelectTopicsWithLessons = SelectTopics & {
  lessons: SelectLessonToExerciseWithLesson[];
};

export type SelectLessons = InferSelectModel<typeof lessons>;
export type InsertLessons = InferInsertModel<typeof lessons>;

export type SelectExercises = InferSelectModel<typeof exercises>;
export type InsertExercises = InferInsertModel<typeof exercises>;

export type SelectLessonToExercise = InferSelectModel<typeof lessonToExercise>;
export type SelectLessonToExerciseWithLesson = SelectLessonToExercise & {
  lesson: SelectLessons;
};
