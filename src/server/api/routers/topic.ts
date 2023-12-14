import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { lessonToTopic, topics } from "~/server/db/schema";

export const topicRouter = createTRPCRouter({
  getAllLessonTopics: protectedProcedure
    .input(z.object({ lessonId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.lessonToTopic.findMany({
        where: eq(lessonToTopic.lessonId, input.lessonId),
        with: { topic: true },
      });
    }),
  getTopic: protectedProcedure
    .input(
      z.object({
        topicId: z.number(),
        includeExercises: z.boolean().optional().default(false),
      }),
    )
    .query(async ({ ctx, input }) => {
      const exercises = input.includeExercises ? true : undefined;
      return await ctx.db.query.topics.findFirst({
        where: eq(topics.topicId, input.topicId),
        with: { exercises },
        // with: { exercises: { with: { exercise: { with: { topics: true } } } } },
      });
    }),
});
