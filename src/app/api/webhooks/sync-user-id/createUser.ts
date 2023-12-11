import { db } from "~/server/db";
import { user } from "~/server/db/schema";

export async function createUser(id: string) {
  await db.insert(user).values({
    // userId: id,
    // activeLanguageId: "asdf",
  });
  throw new Error("Function not implemented.");
}
