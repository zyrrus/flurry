import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLessonStore } from "~/app/_hooks/useLessonStore";

/**
 * This resets the lesson store any time a user leaves
 * the lessons page
 */
export default function useResetLesson() {
  const lastRoute = useRef("/");

  const id = useLessonStore((state) => state.id);
  const reset = useLessonStore((state) => state.reset);

  const pathname = usePathname();
  useEffect(() => {
    if (lastRoute.current === "/lesson" && id) reset();
    lastRoute.current = pathname;
  }, [pathname]);
}
