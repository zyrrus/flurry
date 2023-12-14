import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { exercises, topicToExercise } from "~/server/db/schema";

export const exerciseRouter = createTRPCRouter({
  getAllTopicExercises: protectedProcedure
    .input(z.object({ topicId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.topicToExercise.findMany({
        where: eq(topicToExercise.topicId, input.topicId),
        with: { exercise: true },
      });
    }),
  getExercise: protectedProcedure
    .input(
      z.object({
        exerciseId: z.number(),
        includeExercises: z.boolean().optional().default(false),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.exercises.findFirst({
        where: eq(exercises.exerciseId, input.exerciseId),
      });
    }),
});
