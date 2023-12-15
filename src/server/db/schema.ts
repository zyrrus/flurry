import { relations } from "drizzle-orm";
import {
  mysqlTableCreator,
  text,
  varchar,
  serial,
  bigint,
  json,
  primaryKey,
  timestamp,
  boolean,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const mysqlTable = mysqlTableCreator((name) => `flurry_${name}`);

// === Tables =========================================================

export const users = mysqlTable("user", {
  userId: varchar("user_id", { length: 255 }).unique().primaryKey(),
  activeCourseId: bigint("active_course_id", { mode: "number" }),
});

// === Content Storage ===================================================

export const courses = mysqlTable("course", {
  courseId: serial("course_id").primaryKey(),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  abbreviation: varchar("abbreviation", { length: 8 }),
  emoji: varchar("emoji", { length: 8 }),
  guide: json("guide"),
});

export const lessons = mysqlTable("lesson", {
  lessonId: serial("lesson_id").primaryKey(),
  courseId: bigint("course_id", { mode: "number" }).notNull(),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  guide: json("guide"),
});

export const topics = mysqlTable("topic", {
  topicId: serial("topic_id").primaryKey(),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  guide: json("guide"),
});

export const exercises = mysqlTable("exercise", {
  exerciseId: serial("exercise_id").primaryKey(),
  variant: mysqlEnum("variant", ["sentence", "phrase", "characters"]),
  targetText: varchar("target_text", { length: 255 }),
  nativeText: varchar("native_text", { length: 255 }),
  image: varchar("image", { length: 255 }),
  targetGrammar: json("target_grammar"),
  nativeGrammar: json("native_grammar"),
});

// === Progress ==========================================================

export const courseHistory = mysqlTable("course_history", {
  courseHistoryId: serial("course_history_id").primaryKey(),
  userId: varchar("user_id", { length: 255 }),
  courseId: bigint("course_id", { mode: "number" }).notNull(),
  lessonId: bigint("lesson_id", { mode: "number" }).notNull(),
  topicId: bigint("topic_id", { mode: "number" }).notNull(),
  exerciseId: bigint("exercise_id", { mode: "number" }).notNull(),
  completionTime: timestamp("completion_time", { mode: "date" }),
  isCorrect: boolean("is_correct"),
});

// === Junctions =========================================================

export const lessonToTopic = mysqlTable(
  "lesson_to_topic",
  {
    lessonId: bigint("lesson_id", { mode: "number" }).notNull(),
    topicId: bigint("topic_id", { mode: "number" }).notNull(),
  },
  (t) => ({ pk: primaryKey(t.topicId, t.lessonId) }),
);

export const topicToExercise = mysqlTable(
  "topic_to_exercise",
  {
    topicId: bigint("topic_id", { mode: "number" }).notNull(),
    exerciseId: bigint("exercise_id", { mode: "number" }).notNull(),
  },
  (t) => ({ pk: primaryKey(t.topicId, t.exerciseId) }),
);

// === Relations =========================================================

export const userRelations = relations(users, ({ one, many }) => ({
  activeCourse: one(courses, {
    fields: [users.activeCourseId],
    references: [courses.courseId],
  }),
  courseHistory: many(courseHistory),
}));

export const courseRelations = relations(courses, ({ many }) => ({
  lessons: many(lessons),
  courseHistory: many(courseHistory),
}));

export const lessonRelations = relations(lessons, ({ one, many }) => ({
  course: one(courses, {
    fields: [lessons.courseId],
    references: [courses.courseId],
  }),
  topics: many(lessonToTopic),
  courseHistory: many(courseHistory),
}));

export const topicRelations = relations(topics, ({ many }) => ({
  lessons: many(lessonToTopic),
  exercises: many(topicToExercise),
  courseHistory: many(courseHistory),
}));

export const exerciseRelations = relations(exercises, ({ many }) => ({
  topics: many(topicToExercise),
  courseHistory: many(courseHistory),
}));

export const lessonToTopicRelations = relations(lessonToTopic, ({ one }) => ({
  lesson: one(lessons, {
    fields: [lessonToTopic.lessonId],
    references: [lessons.lessonId],
  }),
  topic: one(topics, {
    fields: [lessonToTopic.topicId],
    references: [topics.topicId],
  }),
}));

export const topicToExerciseRelations = relations(
  topicToExercise,
  ({ one }) => ({
    topic: one(topics, {
      fields: [topicToExercise.topicId],
      references: [topics.topicId],
    }),
    exercise: one(exercises, {
      fields: [topicToExercise.exerciseId],
      references: [exercises.exerciseId],
    }),
  }),
);

export const courseHistoryRelations = relations(courseHistory, ({ one }) => ({
  user: one(users, {
    fields: [courseHistory.userId],
    references: [users.userId],
  }),
  course: one(courses, {
    fields: [courseHistory.courseId],
    references: [courses.courseId],
  }),
  lesson: one(lessons, {
    fields: [courseHistory.lessonId],
    references: [lessons.lessonId],
  }),
  topic: one(topics, {
    fields: [courseHistory.topicId],
    references: [topics.topicId],
  }),
  exercise: one(exercises, {
    fields: [courseHistory.exerciseId],
    references: [exercises.exerciseId],
  }),
}));
