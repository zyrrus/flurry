import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { user } from "~/server/db/schema";

export const languageRouter = createTRPCRouter({
  getAllLanguages: publicProcedure.query(async ({ ctx }) => {
    const languages = await ctx.db.query.language.findMany();
    return { languages };
  }),
  getActiveLanguage: protectedProcedure.query(async ({ ctx }) => {
    const activeLanguage = await ctx.db.query.user.findFirst({
      columns: { activeLanguageId: true },
      where: eq(user.userId, ctx.auth.userId),
    });

    return activeLanguage;
  }),
  setActiveLanguage: protectedProcedure
    .input(z.object({ languageId: z.bigint() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(user)
        .set({ activeLanguageId: input.languageId })
        .where(eq(user.userId, ctx.auth.userId));
    }),
});
