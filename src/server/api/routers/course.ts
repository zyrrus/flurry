import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { courses } from "~/server/db/schema";

export const courseRouter = createTRPCRouter({
  getAllCourses: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.courses.findMany();
  }),
  getCourse: protectedProcedure
    .input(
      z.object({
        courseId: z.number(),
        includeLessons: z.boolean().optional().default(false),
      }),
    )
    .query(async ({ ctx, input }) => {
      const lessons = input.includeLessons ? true : undefined;
      return await ctx.db.query.courses.findFirst({
        where: eq(courses.courseId, input.courseId),
        with: { lessons },
      });
    }),
});
