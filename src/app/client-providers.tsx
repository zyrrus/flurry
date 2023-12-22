"use client";

import type { PropsWithChildren } from "react";
import useResetLesson from "~/app/_hooks/useResetLesson";

/**
 * Client-side provider components that need to wrap
 * the entire app should be defined here to avoid
 * turning the entire app into a client component
 */
export default function ClientProviders({ children }: PropsWithChildren) {
  useResetLesson();
  return <>{children}</>;
}
