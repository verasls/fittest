"use client";

import { Heading } from "@/components/ui/heading";
import {
  Stepper,
  StepperButton,
  StepperContent,
  StepperLabel,
  StepperList,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Separator } from "@/components/ui/separator";
import SelectClientForm from "@/components/select-client-form";
import { Anamnesis, Client, SelectClient } from "@/lib/schema";
import {
  FormStatus,
  Steps,
  useNewEvaluationForm,
} from "@/context/NewEvaluationFormContext";
import React, { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { CircleAlert, CircleCheck } from "lucide-react";
import useLeavePageWarning from "@/hooks/useLeavePageWarning";
import AnamnesisForm from "@/components/anamnesis-form";
import PerimetersForm from "@/components/perimeters-form";

type NewEvaluationFormProps = {
  clients: Array<Client>;
};

export type NewEvaluationForm =
  | UseFormReturn<SelectClient>
  | UseFormReturn<Anamnesis>;

export async function getNewEvaluationFormStatus(
  form: NewEvaluationForm,
  currentFormState: SelectClient | Anamnesis | undefined
): Promise<FormStatus> {
  const isValid = await form.trigger();
  const values = form.getValues();
  const isDirty = JSON.stringify(values) !== JSON.stringify(currentFormState);
  const isSubmitted = false;
  const isVisited = true;
  return { isValid, isDirty, isSubmitted, isVisited };
}

export default function NewEvaluationForm({ clients }: NewEvaluationFormProps) {
  const { state, dispatch } = useNewEvaluationForm();
  const formRef = useRef<NewEvaluationForm | null>(null);

  const isAnyFormStepDirty = state.formData.some((form) => form.status.isDirty);
  useLeavePageWarning(isAnyFormStepDirty);

  async function handleStepChange(step: Steps) {
    const form = formRef.current;
    if (form) {
      const currentFormState = state.formData
        .filter((form) => form.step === state.currentStep)
        .at(0)?.values;

      const status = await getNewEvaluationFormStatus(form, currentFormState);
      const values = form.getValues();

      dispatch({ type: "updateFormStatus", payload: status });
      dispatch({ type: "updateFormValues", payload: values });
    }

    dispatch({ type: "goToNextStep", payload: step });
  }

  function getStepperState(value: Steps) {
    const formData = state.formData.find((form) => form.step === value);

    if (state.currentStep === value) {
      return "active";
    }
    if (!formData) {
      return "inactive";
    }
    if (
      formData.status.isValid === false &&
      formData.status.isVisited === true
    ) {
      return "invalid";
    }
    if (
      formData.status.isValid === true &&
      formData.status.isVisited === true &&
      formData.status.isDirty
    ) {
      return "valid";
    }
    return "inactive";
  }

  function getStepperButtonContent(step: Steps) {
    const stepNumber = {
      client: "1",
      anamnesis: "2",
      perimeters: "3",
      skinfolds: "4",
      observations: "5",
    }[step];

    const stepperState = getStepperState(step);

    if (stepperState === "invalid") return <CircleAlert className="h-6 w-6" />;
    if (stepperState === "valid") return <CircleCheck className="h-6 w-6" />;
    return stepNumber;
  }

  const steps: Array<{ value: Steps; label: string }> = [
    { value: "client", label: "Cliente" },
    { value: "anamnesis", label: "Anamnese" },
    { value: "perimeters", label: "Perímetros" },
    { value: "skinfolds", label: "Dobras cutâneas" },
    { value: "observations", label: "Observações" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading type="h2">Adicionar nova avaliação</Heading>

        <Stepper
          value={state.currentStep}
          onValueChange={handleStepChange as (value: string) => void}
        >
          <div className="flex items-center justify-center">
            <StepperList className="pb-16 pt-10">
              {steps.map((step, index) => (
                <React.Fragment key={step.value}>
                  {index > 0 && <Separator className="w-24" />}
                  <StepperTrigger
                    value={step.value}
                    className="group relative flex flex-col"
                    data-state={getStepperState(step.value)}
                  >
                    <StepperButton>
                      {getStepperButtonContent(step.value)}
                    </StepperButton>
                    <StepperLabel>{step.label}</StepperLabel>
                  </StepperTrigger>
                </React.Fragment>
              ))}
            </StepperList>
          </div>
          <StepperContent value="client">
            <SelectClientForm clients={clients} formRef={formRef} />
          </StepperContent>
          <StepperContent value="anamnesis">
            <AnamnesisForm clients={clients} formRef={formRef} />
          </StepperContent>
          <StepperContent value="perimeters">
            <PerimetersForm />
          </StepperContent>
          <StepperContent value="skinfolds">Dobras cutâneas</StepperContent>
          <StepperContent value="observations">Observações</StepperContent>
        </Stepper>
      </div>
    </div>
  );
}
