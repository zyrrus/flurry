"use client";

import { redirect, useRouter } from "next/navigation";
import Json from "~/app/_components/json";
import { useLessonStore } from "~/app/_hooks/useLessonStore";
import { api } from "~/trpc/react";

export default function Lesson() {
  const router = useRouter();

  const id = useLessonStore((state) => state.id);
  const exerciseIndex = useLessonStore((state) => state.exerciseIndex);
  const nextExercise = useLessonStore((state) => state.nextExercise);

  if (!id) redirect("/home");

  const { data, isLoading } = api.exercise.getExercisesFromLesson.useQuery({
    lessonId: id.lessonId,
  });

  if (!data || isLoading)
    return (
      <main className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold">Lesson</h1>
        <p>
          ID: {id.courseId} / {id.topicId} / {id.lessonId}
        </p>
        <p>Loading...</p>
      </main>
    );

  const handleNextExercise = () => {
    if (exerciseIndex < data.length) nextExercise();
  };

  const handleFinishLesson = () => {
    router.replace("/home");
  };

  return (
    <main className="mx-auto mb-20 max-w-2xl">
      <h1 className="text-2xl font-bold">Lesson</h1>
      {/* <p>
        ID: {id.courseId} / {id.topicId} / {id.lessonId}
      </p>
      <Json>{data}</Json> 
      <hr />*/}
      {exerciseIndex < data.length ? (
        <>
          <h2 className="text-lg font-medium">Current Exercise</h2>
          <Json>{data[exerciseIndex]}</Json>
          <p>
            {exerciseIndex + 1} / {data.length}
          </p>
          <button onClick={handleNextExercise} className="border px-4">
            Next
          </button>
        </>
      ) : (
        <>
          <p>Lesson Complete!</p>
          <button onClick={handleFinishLesson} className="border px-4">
            Finish
          </button>
        </>
      )}
    </main>
  );
}
