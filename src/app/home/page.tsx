import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function Home() {
  const self = await api.user.getSelf();
  if (!self?.activeCourseId) redirect("/courses");

  const activeCourse = await api.course.getCourse({
    courseId: self.activeCourseId,
    includeTopics: true,
  });
  if (!activeCourse) redirect("/courses");

  return (
    <main className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Home</h1>
      <p>Active Course:</p>
      <pre>{JSON.stringify(activeCourse, undefined, 2)}</pre>
      <h2 className="text-lg font-bold">Topics</h2>
      <ol className="list-inside list-decimal">
        {activeCourse.topics.map((topic) => (
          <li>
            <p className="inline">{topic.name}</p>
            <p className="ml-5 text-sm">{topic.description}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
