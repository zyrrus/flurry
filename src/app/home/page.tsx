import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function Home() {
  const activeLanguage = await api.user.activeLanguage();
  if (!activeLanguage.language) redirect("/courses");

  return (
    <main className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Home</h1>
      <p>Active language:</p>
      <pre>{JSON.stringify(activeLanguage, undefined, 2)}</pre>
    </main>
  );
}
