import { eq } from "drizzle-orm";
import { z } from "zod";
import { getRandomItems } from "~/server/api/shared/session-generation";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { exercises, lessonToExercise } from "~/server/db/schema";

const getAllLessonExercises = async (lessonId: number) => {
  return await db.query.lessonToExercise.findMany({
    where: eq(lessonToExercise.lessonId, lessonId),
    with: { exercise: true },
  });
};

export const exerciseRouter = createTRPCRouter({
  getAllLessonExercises: protectedProcedure
    .input(z.object({ lessonId: z.number() }))
    .query(async ({ input }) => {
      return await getAllLessonExercises(input.lessonId);
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
  getExercisesFromLesson: protectedProcedure
    .input(z.object({ lessonId: z.number() }))
    .query(async ({ input }) => {
      const exerciseData = await getAllLessonExercises(input.lessonId);
      const reducedExercises = getRandomItems(
        exerciseData.map(({ exercise }) => exercise),
        3,
      );
      return reducedExercises;
    }),
});
