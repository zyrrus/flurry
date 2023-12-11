import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { user } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  activeLanguage: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = await ctx.db.query.user.findFirst({
      columns: {},
      where: eq(user.userId, ctx.auth.userId),
      with: { language: true },
    });

    return {
      language: currentUser?.language,
    };
  }),
});
