import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { exercises, lessonToExercise } from "~/server/db/schema";

export const exerciseRouter = createTRPCRouter({
  getAllLessonExercises: protectedProcedure
    .input(z.object({ lessonId: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.lessonToExercise.findMany({
        where: eq(lessonToExercise.lessonId, input.lessonId),
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
