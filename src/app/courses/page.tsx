import CourseSelection from "~/app/courses/course-selection";
import { api } from "~/trpc/server";

export default async function Course() {
  const courses = await api.course.getAllCourses();
  const self = await api.user.getSelf();

  return (
    <main className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Course</h1>
      <h2 className="text-lg font-medium">Available languages</h2>
      <CourseSelection
        courses={courses}
        activeCourseId={self?.activeCourseId ?? undefined}
      />
    </main>
  );
}
