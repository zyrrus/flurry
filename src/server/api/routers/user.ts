import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

const getUser = async (userId: string) =>
  await db.query.users.findFirst({ where: eq(users.userId, userId) });

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await getUser(input.userId);
    }),
  getSelf: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;
    return await getUser(userId);
  }),
  updateActiveCourse: protectedProcedure
    .input(z.object({ courseId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      await ctx.db
        .update(users)
        .set({ activeCourseId: input.courseId })
        .where(eq(users.userId, userId));
    }),
});
