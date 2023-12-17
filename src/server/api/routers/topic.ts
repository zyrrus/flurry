import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { topics } from "~/server/db/schema";

export const topicRouter = createTRPCRouter({
  getAllCourseTopics: protectedProcedure
    .input(z.object({ courseId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.topics.findMany({
        where: eq(topics.courseId, input.courseId),
      });
    }),
  getTopic: protectedProcedure
    .input(
      z.object({
        topicId: z.number(),
        includeLessons: z.boolean().optional().default(false),
      }),
    )
    .query(async ({ ctx, input }) => {
      const lessons = input.includeLessons ? true : undefined;
      return await ctx.db.query.topics.findFirst({
        where: eq(topics.topicId, input.topicId),
        with: { lessons },
      });
    }),
});
