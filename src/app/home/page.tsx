import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import LessonList from "~/app/home/lesson-list";

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
      {/* <p>Active Course:</p>
      <Json>{activeCourse}</Json> */}
      <h2 className="mt-8 text-lg font-bold">Topics</h2>
      <LessonList course={activeCourse} />
    </main>
  );
}
