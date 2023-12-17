import Link from "next/link";

export default async function Landing() {
  return (
    <main className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Landing</h1>
      <Link href="/home" className="hover:underline">
        Get started
      </Link>
    </main>
  );
}
