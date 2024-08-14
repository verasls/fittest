"use client";

import { useEffect } from "react";

export default function useLeavePageWarning(warningCondition: boolean) {
  useEffect(() => {
    if (!warningCondition) return;

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
    }

    window.addEventListener("beforeunload", handleBeforeUnload, {
      capture: true,
    });

    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload, {
        capture: true,
      });
  }, [warningCondition]);
}
