import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { lessons, topicToLesson } from "~/server/db/schema";

export const lessonRouter = createTRPCRouter({
  getAllTopicLessons: protectedProcedure
    .input(z.object({ topicId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.topicToLesson.findMany({
        where: eq(topicToLesson.topicId, input.topicId),
        with: { lesson: true },
      });
    }),
  getLesson: protectedProcedure
    .input(
      z.object({
        lessonId: z.number(),
        includeExercises: z.boolean().optional().default(false),
      }),
    )
    .query(async ({ ctx, input }) => {
      const exercises = input.includeExercises ? true : undefined;
      return await ctx.db.query.lessons.findFirst({
        where: eq(lessons.lessonId, input.lessonId),
        with: { exercises },
      });
    }),
});
