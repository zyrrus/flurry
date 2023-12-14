import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { env } from "~/env";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  if (!id) {
    return new Response(`Error occurred -- no user ID found: '${eventType}'`, {
      status: 400,
    });
  }

  switch (eventType) {
    case "user.created":
      return await createUser(id);
    case "user.deleted":
      return await deleteUser(id);
    default:
      return new Response(
        `Error occurred -- unexpected event type: '${eventType}'`,
        { status: 400 },
      );
  }
}

async function createUser(id: string): Promise<Response> {
  const { rowsAffected } = await db.insert(users).values({ userId: id });

  if (rowsAffected === 1) {
    return new Response("Successfully created new user", { status: 200 });
  }

  return new Response("Error occurred -- could not create new user", {
    status: 400,
  });
}

async function deleteUser(id: string): Promise<Response> {
  const { rowsAffected } = await db.delete(users).where(eq(users.userId, id));

  if (rowsAffected === 1) {
    return new Response("Successfully deleted user", { status: 200 });
  }

  return new Response("Error occurred -- could not delete user", {
    status: 400,
  });
}
