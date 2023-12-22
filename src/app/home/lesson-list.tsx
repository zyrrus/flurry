"use client";

import { useRouter } from "next/navigation";
import { useLessonStore } from "~/app/_hooks/useLessonStore";
import type { SelectCoursesWithTopics } from "~/server/db/schema-types";

interface Props {
  course: SelectCoursesWithTopics;
}

export default function LessonList({ course }: Props) {
  const router = useRouter();

  const setId = useLessonStore((state) => state.setId);

  const handleLessonClicked = (topicId: number, lessonId: number) => {
    setId({ courseId: course.courseId, topicId, lessonId });
    router.push("/lesson");
  };

  return (
    <>
      {course.topics.map((topic) => (
        <section key={topic.topicId} className="my-4">
          <h2 className="">{topic.name}</h2>
          <p className="text-sm">{topic.description}</p>
          <ol className="my-2 list-inside list-decimal">
            {topic.lessons.map(({ lesson }) => (
              <li key={lesson.lessonId}>
                <button
                  onClick={() =>
                    handleLessonClicked(topic.topicId, lesson.lessonId)
                  }
                  className="text-left hover:opacity-70"
                >
                  <h3 className="">{lesson.name}</h3>
                  <p className="">{lesson.description}</p>
                </button>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </>
  );
}
