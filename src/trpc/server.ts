import "server-only";

import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";

export const api = appRouter.createCaller({ auth: null, db });
