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
import { Client, evaluationSchema } from "@/lib/schema";
import {
  Steps,
  useNewEvaluationForm,
} from "@/context/NewEvaluationFormContext";
import React, { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { CircleAlert } from "lucide-react";

type NewEvaluationFormProps = {
  clients: Array<Client>;
};

export default function NewEvaluationForm({ clients }: NewEvaluationFormProps) {
  const { state, dispatch } = useNewEvaluationForm();
  const formRef = useRef<UseFormReturn<
    z.infer<typeof evaluationSchema>
  > | null>(null);

  function handleStepChange(value: Steps) {
    if (formRef.current) {
      const formData = formRef.current.getValues();
      dispatch({ type: "updateFormValues", payload: formData });
    }

    dispatch({ type: "goToNextStep", payload: value });
  }

  function handleStepperState(value: Steps) {
    const formData = state.formData.find((form) => form.step === value);

    if (state.currentStep === value) return "active";
    if (formData?.status.isValid === false) return "invalid";
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

    return handleStepperState(step) === "invalid" ? (
      <CircleAlert className="h-6 w-6" />
    ) : (
      stepNumber
    );
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
                    data-state={handleStepperState(step.value)}
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
          <StepperContent value="anamnesis">Anamnese</StepperContent>
          <StepperContent value="perimeters">Perímetros</StepperContent>
          <StepperContent value="skinfolds">Dobras cutâneas</StepperContent>
          <StepperContent value="observations">Observações</StepperContent>
        </Stepper>
      </div>
    </div>
  );
}
