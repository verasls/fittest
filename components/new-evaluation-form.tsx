"use client";

import { Heading } from "@/components/ui/heading";
import {
  Steps,
  StepsButton,
  StepsContent,
  StepsLabel,
  StepsList,
  StepsTrigger,
} from "@/components/ui/steps";
import { Separator } from "@/components/ui/separator";
import SelectClientForm from "@/components/select-client-form";
import { Client } from "@/lib/schema";
import { useState } from "react";

type NewEvaluationFormProps = {
  clients: Array<Client>;
};

export type Steps =
  | "client"
  | "anamnesis"
  | "perimeters"
  | "skinfolds"
  | "observations";

export default function NewEvaluationForm({ clients }: NewEvaluationFormProps) {
  const [step, setStep] = useState<Steps>("client");

  function onStepChange(value: Steps) {
    setStep(value);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading type="h2">Adicionar nova avaliação</Heading>

        <Steps
          value={step}
          onValueChange={onStepChange as (value: string) => void}
        >
          <div className="flex items-center justify-center">
            <StepsList className="pb-16 pt-10">
              <StepsTrigger
                value="client"
                className="group relative flex flex-col"
              >
                <StepsButton>1</StepsButton>
                <StepsLabel>Cliente</StepsLabel>
              </StepsTrigger>

              <Separator className="w-24" />

              <StepsTrigger
                value="anamnesis"
                className="group relative flex flex-col"
              >
                <StepsButton>2</StepsButton>
                <StepsLabel>Anamnese</StepsLabel>
              </StepsTrigger>

              <Separator className="w-24" />

              <StepsTrigger
                value="perimeters"
                className="group relative flex flex-col"
              >
                <StepsButton>3</StepsButton>
                <StepsLabel>Perímetros</StepsLabel>
              </StepsTrigger>

              <Separator className="w-24" />

              <StepsTrigger
                value="skinfolds"
                className="group relative flex flex-col"
              >
                <StepsButton>4</StepsButton>
                <StepsLabel>Dobras cutâneas</StepsLabel>
              </StepsTrigger>

              <Separator className="w-24" />

              <StepsTrigger
                value="observations"
                className="group relative flex flex-col"
              >
                <StepsButton>5</StepsButton>
                <StepsLabel>Observações</StepsLabel>
              </StepsTrigger>
            </StepsList>
          </div>
          <StepsContent value="client">
            <SelectClientForm clients={clients} handleNextStep={onStepChange} />
          </StepsContent>
          <StepsContent value="anamnesis">Anamnese</StepsContent>
          <StepsContent value="perimeters">Perímetros</StepsContent>
          <StepsContent value="skinfolds">Dobras cutâneas</StepsContent>
          <StepsContent value="observations">Observações</StepsContent>
        </Steps>
      </div>
    </div>
  );
}
