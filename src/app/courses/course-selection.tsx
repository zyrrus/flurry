"use client";

import { type InferSelectModel } from "drizzle-orm";
import { redirect } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type language } from "~/server/db/schema";
import { api } from "~/trpc/react";

interface FormInputs {
  languageId: bigint;
}

interface Props {
  courses: InferSelectModel<typeof language>[];
  activeLanguage?: bigint;
}

export default function CourseSelection({ courses, activeLanguage }: Props) {
  const { mutate, error } = api.language.setActiveLanguage.useMutation({
    onSuccess: () => {
      redirect("/home");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInputs>({ defaultValues: { languageId: activeLanguage } });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (data.languageId) {
      mutate({ languageId: BigInt(data.languageId) });
    } else {
      setError("languageId", { message: "You must select a valid language." });
    }
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="course-select">Select a language:</label>
      <select id="course-select" className="border" {...register("languageId")}>
        <option value="">Select...</option>
        {courses.map(({ name, emoji, languageId }) => (
          <option value={languageId}>
            {name} {emoji}
          </option>
        ))}
      </select>
      {errors.languageId && (
        <p className="text-sm text-red-500">{errors.languageId.message}</p>
      )}
      <button type="submit" className="border">
        Submit
      </button>
      {errors.root && (
        <p className="text-sm text-red-500">{errors.root.message}</p>
      )}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </form>
  );
}
