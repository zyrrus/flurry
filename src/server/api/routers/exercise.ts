import { eq } from "drizzle-orm";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { exercises } from "~/server/db/schema";

export const exerciseRouter = createTRPCRouter({});
