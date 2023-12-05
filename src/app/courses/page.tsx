import CourseSelection from "~/app/courses/course-selection";

export default async function Course() {
  return (
    <main className="">
      <h1 className="text-2xl font-bold">Course</h1>
      <h2 className="text-lg font-medium">Available languages</h2>
      <CourseSelection />
    </main>
  );
}
