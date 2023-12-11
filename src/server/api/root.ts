import { languageRouter } from "~/server/api/routers/language";
import { userRouter } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  language: languageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
