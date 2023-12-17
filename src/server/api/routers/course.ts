import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { courses } from "~/server/db/schema";

export const courseRouter = createTRPCRouter({
  getAllCourses: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.courses.findMany({
      orderBy: (course, { asc }) => [asc(course.name)],
    });
  }),
  getCourse: protectedProcedure
    .input(
      z.object({
        courseId: z.number(),
        includeTopics: z.boolean().optional().default(false),
      }),
    )
    .query(async ({ ctx, input }) => {
      const topics = input.includeTopics ? true : undefined;
      return await ctx.db.query.courses.findFirst({
        where: eq(courses.courseId, input.courseId),
        with: { topics },
      });
    }),
});
