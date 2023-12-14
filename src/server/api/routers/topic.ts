import { eq } from "drizzle-orm";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { topics } from "~/server/db/schema";

export const topicRouter = createTRPCRouter({});
