"use client";

import { type InferSelectModel } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type courses } from "~/server/db/schema";
import { api } from "~/trpc/react";

interface FormInputs {
  courseId: number;
}

interface Props {
  courses: InferSelectModel<typeof courses>[];
  activeCourseId?: number;
}

export default function CourseSelection({ courses, activeCourseId }: Props) {
  const router = useRouter();

  const { mutate, error } = api.user.updateActiveCourse.useMutation({
    onSuccess: () => {
      router.push("/home");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInputs>({
    defaultValues: {
      courseId: courses.some(({ courseId }) => courseId === activeCourseId)
        ? activeCourseId
        : undefined,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (data.courseId) {
      mutate({ courseId: data.courseId });
    } else {
      setError("courseId", { message: "You must select a valid course." });
    }
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="course-select">Select a language:</label>
      <select
        id="course-select"
        className="border"
        {...register("courseId", { valueAsNumber: true })}
      >
        <option value="">Select...</option>
        {courses.map(({ name, emoji, courseId }) => (
          <option key={courseId} value={courseId}>
            {name} {emoji}
          </option>
        ))}
      </select>
      {errors.courseId && (
        <p className="text-sm text-red-500">{errors.courseId.message}</p>
      )}
      <button type="submit" className="border">
        Submit
      </button>
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
      {error && <pre className="text-sm text-red-500">{error.message}</pre>}
    </form>
  );
}
