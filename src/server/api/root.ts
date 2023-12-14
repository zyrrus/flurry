import { userRouter } from "~/server/api/routers/user";
import { courseRouter } from "~/server/api/routers/course";
import { lessonRouter } from "~/server/api/routers/lesson";
import { topicRouter } from "~/server/api/routers/topic";
import { exerciseRouter } from "~/server/api/routers/exercise";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  course: courseRouter,
  lesson: lessonRouter,
  topic: topicRouter,
  exercise: exerciseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
