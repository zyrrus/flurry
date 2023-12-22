"use client";

import { redirect } from "next/navigation";
import Json from "~/app/_components/json";
import { useLessonStore } from "~/app/_hooks/useLessonStore";
import { api } from "~/trpc/react";

export default function Lesson() {
  const id = useLessonStore((state) => state.id);
  if (!id) redirect("/home");

  const { data } = api.exercise.getExercisesFromLesson.useQuery({
    lessonId: id.lessonId,
  });

  return (
    <main className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">Lesson</h1>
      <p>
        ID: {id.courseId} / {id.topicId} / {id.lessonId}
      </p>
      <Json>{data}</Json>
    </main>
  );
}
