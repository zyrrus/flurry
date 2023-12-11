import CourseSelection from "~/app/courses/course-selection";
import { api } from "~/trpc/server";

export default async function Course() {
  const { languages } = await api.language.getAllLanguages();
  const activeLanguage = await api.language.getActiveLanguage();

  return (
    <main className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Course</h1>
      <h2 className="text-lg font-medium">Available languages</h2>
      <CourseSelection
        courses={languages}
        activeLanguage={activeLanguage?.activeLanguageId ?? undefined}
      />
    </main>
  );
}
