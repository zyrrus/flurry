import { eq } from "drizzle-orm";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { lessons } from "~/server/db/schema";

export const lessonRouter = createTRPCRouter({});
