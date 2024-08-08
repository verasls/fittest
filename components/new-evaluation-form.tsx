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
import { Client } from "@/lib/schema";
import {
  Steps,
  useNewEvaluationForm,
} from "@/context/NewEvaluationFormContext";

type NewEvaluationFormProps = {
  clients: Array<Client>;
};

export default function NewEvaluationForm({ clients }: NewEvaluationFormProps) {
  const { state, dispatch } = useNewEvaluationForm();

  function onStepChange(value: Steps) {
    dispatch({ type: "goToNextStep", payload: value });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading type="h2">Adicionar nova avaliação</Heading>

        <Stepper
          value={state.currentStep}
          onValueChange={onStepChange as (value: string) => void}
        >
          <div className="flex items-center justify-center">
            <StepperList className="pb-16 pt-10">
              <StepperTrigger
                value="client"
                className="group relative flex flex-col"
              >
                <StepperButton>1</StepperButton>
                <StepperLabel>Cliente</StepperLabel>
              </StepperTrigger>

              <Separator className="w-24" />

              <StepperTrigger
                value="anamnesis"
                className="group relative flex flex-col"
              >
                <StepperButton>2</StepperButton>
                <StepperLabel>Anamnese</StepperLabel>
              </StepperTrigger>

              <Separator className="w-24" />

              <StepperTrigger
                value="perimeters"
                className="group relative flex flex-col"
              >
                <StepperButton>3</StepperButton>
                <StepperLabel>Perímetros</StepperLabel>
              </StepperTrigger>

              <Separator className="w-24" />

              <StepperTrigger
                value="skinfolds"
                className="group relative flex flex-col"
              >
                <StepperButton>4</StepperButton>
                <StepperLabel>Dobras cutâneas</StepperLabel>
              </StepperTrigger>

              <Separator className="w-24" />

              <StepperTrigger
                value="observations"
                className="group relative flex flex-col"
              >
                <StepperButton>5</StepperButton>
                <StepperLabel>Observações</StepperLabel>
              </StepperTrigger>
            </StepperList>
          </div>
          <StepperContent value="client">
            <SelectClientForm clients={clients} />
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
