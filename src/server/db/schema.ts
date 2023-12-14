import { relations } from "drizzle-orm";
import {
  mysqlTableCreator,
  text,
  varchar,
  serial,
  bigint,
  json,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const mysqlTable = mysqlTableCreator((name) => `flurry_${name}`);

// === Tables =========================================================

export const user = mysqlTable("user", {
  userId: varchar("user_id", { length: 255 }).unique().primaryKey(),
  activeCourseId: bigint("active_course_id", { mode: "number" }),
});

export const course = mysqlTable("course", {
  courseId: serial("course_id").primaryKey(),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  abbreviation: varchar("abbreviation", { length: 8 }),
  emoji: varchar("emoji", { length: 8 }),
  guide: json("guide"),
});

export const lesson = mysqlTable("lesson", {
  lessonId: serial("lesson_id").primaryKey(),
  courseId: bigint("course_id", { mode: "number" }).notNull(),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  guide: json("guide"),
});

export const topic = mysqlTable("topic", {
  topicId: serial("topic_id").primaryKey(),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  guide: json("guide"),
});

export const exercise = mysqlTable("exercise", {
  exerciseId: serial("exercise_id").primaryKey(),
  name: varchar("name", { length: 255 }),
  targetText: varchar("target_text", { length: 255 }),
  nativeText: varchar("native_text", { length: 255 }),
  image: varchar("image", { length: 255 }),
  targetGrammar: json("target_grammar"),
  nativeGrammar: json("native_grammar"),
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

export const userRelations = relations(user, ({ one }) => ({
  activeCourse: one(course, {
    fields: [user.activeCourseId],
    references: [course.courseId],
  }),
}));

export const courseRelations = relations(course, ({ many }) => ({
  lessons: many(lesson),
}));

export const lessonRelations = relations(lesson, ({ one, many }) => ({
  course: one(course, {
    fields: [lesson.courseId],
    references: [course.courseId],
  }),
  topics: many(lessonToTopic),
}));

export const topicRelations = relations(topic, ({ many }) => ({
  lessons: many(lessonToTopic),
  exercises: many(topicToExercise),
}));

export const lessonToTopicRelations = relations(lessonToTopic, ({ one }) => ({
  lesson: one(lesson, {
    fields: [lessonToTopic.lessonId],
    references: [lesson.lessonId],
  }),
  topic: one(topic, {
    fields: [lessonToTopic.topicId],
    references: [topic.topicId],
  }),
}));

export const exerciseRelations = relations(exercise, ({ many }) => ({
  topics: many(topicToExercise),
}));

export const topicToExerciseRelations = relations(
  topicToExercise,
  ({ one }) => ({
    topic: one(topic, {
      fields: [topicToExercise.topicId],
      references: [topic.topicId],
    }),
    exercise: one(exercise, {
      fields: [topicToExercise.exerciseId],
      references: [exercise.exerciseId],
    }),
  }),
);
