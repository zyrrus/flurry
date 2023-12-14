import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { lessons } from "~/server/db/schema";

export const lessonRouter = createTRPCRouter({
  getAllCourseLessons: protectedProcedure
    .input(z.object({ courseId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.lessons.findMany({
        where: eq(lessons.courseId, input.courseId),
      });
    }),
  getLesson: protectedProcedure
    .input(
      z.object({
        lessonId: z.number(),
        includeTopics: z.boolean().optional().default(false),
      }),
    )
    .query(async ({ ctx, input }) => {
      const topics = input.includeTopics ? true : undefined;
      return await ctx.db.query.lessons.findFirst({
        where: eq(lessons.lessonId, input.lessonId),
        with: { topics },
      });
    }),
});
