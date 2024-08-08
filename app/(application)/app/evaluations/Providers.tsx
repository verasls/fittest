"use client";

import { NewEvaluationFormProvider } from "@/context/NewEvaluationFormContext";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <NewEvaluationFormProvider>{children}</NewEvaluationFormProvider>;
}
