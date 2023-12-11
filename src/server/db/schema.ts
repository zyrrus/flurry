import { relations } from "drizzle-orm";
import {
  mysqlTableCreator,
  text,
  varchar,
  serial,
  int,
  bigint,
} from "drizzle-orm/mysql-core";

export const mysqlTable = mysqlTableCreator((name) => `flurry_${name}`);

// Foreign keys: https://planetscale.com/blog/working-with-related-data-using-drizzle-and-planetscale

// === Tables =========================================================

export const user = mysqlTable("user", {
  userId: varchar("userId", { length: 255 }).unique().primaryKey(),
  activeLanguageId: bigint("activeLanguageId", { mode: "bigint" }).notNull(),
  // .references(() => language.languageId),
});

export const language = mysqlTable("language", {
  languageId: serial("languageId").primaryKey(),
  name: varchar("name", { length: 255 }),
  abbreviation: varchar("abbreviation", { length: 2 }),
});

export const course = mysqlTable("course", {
  courseId: serial("courseId").primaryKey(),
  languageId: bigint("languageId", { mode: "bigint" }).notNull(),
  // .references(() => language.languageId),
  name: varchar("name", { length: 255 }),
  description: text("description"),
});

export const progress = mysqlTable("progress", {
  // Probably need to explicitly make a composite key
  userId: varchar("userId", { length: 255 }),
  //   .references(() => user.userId),
  languageId: bigint("languageId", { mode: "bigint" }).notNull(),
  // .references(() => language.languageId),
  interactions: int("interactions"),
  successes: int("successes"),
});

export const content = mysqlTable("content", {
  contentId: serial("contentId").primaryKey(),
  courseId: bigint("courseId", { mode: "bigint" }).notNull(),
  // .references(() => course.courseId),
  content: text("content"),
});

// === Relations =========================================================

export const userRelations = relations(user, ({ one }) => ({
  language: one(language, {
    fields: [user.activeLanguageId],
    references: [language.languageId],
  }),
}));

export const courseRelations = relations(course, ({ one }) => ({
  language: one(language, {
    fields: [course.languageId],
    references: [language.languageId],
  }),
}));

export const progressRelations = relations(progress, ({ many }) => ({
  language: many(language),
  user: many(user),
}));

export const contentRelations = relations(content, ({ one }) => ({
  course: one(course, {
    fields: [content.courseId],
    references: [course.courseId],
  }),
}));
