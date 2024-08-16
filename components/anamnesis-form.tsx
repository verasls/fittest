"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Steps,
  useNewEvaluationForm,
} from "@/context/NewEvaluationFormContext";
import { Anamnesis, anamnesisSchema, Client } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInYears } from "date-fns";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type AnamnesisFormProps = {
  clients: Array<Client>;
  formRef: React.MutableRefObject<UseFormReturn<Anamnesis> | null>;
};

export default function AnamnesisForm({
  clients,
  formRef,
}: AnamnesisFormProps) {
  const { state, dispatch } = useNewEvaluationForm();
  const [
    showPracticeExerciseDetailsFields,
    setShowPracticeExerciseDetailsFields,
  ] = useState(false);
  const [showSmokeQuantityField, setShowSmokeQuantityField] = useState(false);
  const [showSmokeTimeSinceStopField, setShowSmokeTimeSinceStopField] =
    useState(false);

  const anamnesisState = state.formData
    .filter((form) => form.step === "anamnesis")
    .at(0)!.values;

  const form = useForm<Anamnesis>({
    resolver: zodResolver(anamnesisSchema),
    defaultValues: anamnesisState,
  });
  formRef.current = form;

  const practiceExerciseValue = form.watch("practiceExercise");
  const smokeValue = form.watch("smoke");
  useEffect(() => {
    setShowPracticeExerciseDetailsFields(practiceExerciseValue === "Sim");

    setShowSmokeQuantityField(
      smokeValue === "Sim" || smokeValue === "Não, mas já fumei"
    );

    setShowSmokeTimeSinceStopField(smokeValue === "Não, mas já fumei");
  }, [practiceExerciseValue, smokeValue]);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const buttonText = event.currentTarget.textContent;

    let step: Steps;
    if (buttonText === "Anterior") {
      step = "client";
    } else if (buttonText === "Próximo") {
      step = "perimeters";
    } else {
      throw new Error("Unkown action");
    }

    dispatch({ type: "goToNextStep", payload: step });
  }

  const evaluationData = state.formData
    .filter((form) => form.step === "client")
    .at(0);
  const evaluationDate = evaluationData?.values.date;
  const clientId = evaluationData?.values.clientId;
  const client = clients.find((client) => client.id! === clientId);
  const clientName = client?.name;
  const clientDob = client?.dateOfBirth;
  const clientAge =
    evaluationDate && clientDob
      ? differenceInYears(evaluationDate, clientDob)
      : null;

  return (
    <Card className="px-10 py-8">
      <CardHeader>
        <CardTitle>Anamnese</CardTitle>
        <CardDescription>
          Cliente: {clientName ? clientName : "Nenhum cliente selecionado"}
          <br />
          {clientName && `Idade: ${clientAge} anos`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form className="grid grid-cols-6 gap-4">
            <h3 className="col-span-6 mb-2 text-xl font-semibold leading-none tracking-tight">
              Atividade física atual
            </h3>

            <FormField
              control={form.control}
              name="practiceExercise"
              render={({ field }) => (
                <FormItem className="col-span-6 mb-2 flex w-full items-center gap-3 space-y-0">
                  <FormLabel>Pratica exercício físico regularmente?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-3"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Sim" />
                        </FormControl>
                        <FormLabel>Sim</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Não" />
                        </FormControl>
                        <FormLabel>Não</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {showPracticeExerciseDetailsFields ? (
              <>
                <FormField
                  control={form.control}
                  name="exerciseType"
                  render={({ field }) => (
                    <FormItem className="col-span-2 flex w-full flex-col">
                      <FormLabel>Qual tipo de exercício?</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="exerciseFrequence"
                  render={({ field }) => (
                    <FormItem className="col-span-2 flex w-full flex-col">
                      <FormLabel>Qual a frequência semanal?</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="exerciseDuration"
                  render={({ field }) => (
                    <FormItem className="col-span-2 flex w-full flex-col">
                      <FormLabel>Qual a duração da sessão?</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            ) : null}

            <FormField
              control={form.control}
              name="physicalActivityHistory"
              render={({ field }) => (
                <FormItem className="col-span-3 flex w-full flex-col">
                  <FormLabel>
                    Qual seu histórico de prática de atividade física?
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="objectives"
              render={({ field }) => (
                <FormItem className="col-span-3 flex w-full flex-col">
                  <FormLabel>Quais seus objetivos?</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <h3 className="col-span-6 mb-2 mt-6 text-xl font-semibold leading-none tracking-tight">
              Estilo de vida
            </h3>

            <FormField
              control={form.control}
              name="smoke"
              render={({ field }) => (
                <FormItem className="col-span-6 mb-2 flex w-full items-center gap-3 space-y-0">
                  <FormLabel>Fuma?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-3"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Sim" />
                        </FormControl>
                        <FormLabel>Sim</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Não, mas já fumei" />
                        </FormControl>
                        <FormLabel>Não, mas já fumei</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Nunca fumei" />
                        </FormControl>
                        <FormLabel>Nunca fumei</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {showSmokeQuantityField ? (
              <FormField
                control={form.control}
                name="smokeQuantity"
                render={({ field }) => (
                  <FormItem className="col-span-3 flex w-full flex-col">
                    <FormLabel>Qual a quantidade por dia?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : null}

            {showSmokeTimeSinceStopField ? (
              <FormField
                control={form.control}
                name="smokeTimeSinceStop"
                render={({ field }) => (
                  <FormItem className="col-span-3 flex w-full flex-col">
                    <FormLabel>Parou há quanto tempo?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : null}

            <div className="col-start-6 flex justify-end gap-3 pt-4">
              <Button variant="outline" type="button" onClick={handleClick}>
                Anterior
              </Button>

              <Button type="button" onClick={handleClick}>
                Próximo
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
