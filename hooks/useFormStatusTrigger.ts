import { useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FormStatus } from "@/context/NewEvaluationFormContext";

type UseFormStatusTrigger<T extends FieldValues> = {
  form: UseFormReturn<T>;
  formStatus: FormStatus;
  fieldsToWatch: keyof T | Array<keyof T>;
};

export default function useFormStatusTrigger<T extends FieldValues>({
  form,
  formStatus,
  fieldsToWatch,
}: UseFormStatusTrigger<T>) {
  useEffect(() => {
    const triggerForm = async () => await form.trigger();

    if (formStatus.isSubmitted && !formStatus.isValid) triggerForm();

    const fieldArray = Array.isArray(fieldsToWatch)
      ? fieldsToWatch
      : [fieldsToWatch];

    const subscriptions = fieldArray.map((fieldName) =>
      form.watch((_, { name }) => {
        if (name === fieldName) {
          triggerForm();
        }
      })
    );

    return () =>
      subscriptions.forEach((subscription) => subscription.unsubscribe());
  }, [form, formStatus, fieldsToWatch]);
}
