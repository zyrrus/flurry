import { currentUser } from "@clerk/nextjs";
import Json from "~/app/_components/json";

export default async function Profile() {
  const user = await currentUser();

  return (
    <main className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Profile</h1>
      <Json>{user}</Json>
    </main>
  );
}
