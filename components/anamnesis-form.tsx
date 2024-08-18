"use client";

import {
  getNewEvaluationFormStatus,
  NewEvaluationForm,
} from "@/components/new-evaluation-form";
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
import { getSelectedClientDetails } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type AnamnesisFormProps = {
  clients: Array<Client>;
  formRef: React.MutableRefObject<NewEvaluationForm | null>;
};

export default function AnamnesisForm({
  clients,
  formRef,
}: AnamnesisFormProps) {
  const { state, dispatch } = useNewEvaluationForm();
  const { clientName, clientAge } = getSelectedClientDetails(state, clients);

  const anamnesisState = state.formData
    .filter((form) => form.step === "anamnesis")
    .at(0)!.values;

  const form = useForm<Anamnesis>({
    resolver: zodResolver(anamnesisSchema),
    defaultValues: anamnesisState,
  });
  formRef.current = form;

  const showPracticeExerciseDetailsFields =
    form.watch("practiceExercise") === "Sim";
  const showSmokeQuantityField =
    form.watch("smoke") === "Sim" ||
    form.watch("smoke") === "Não, mas já fumei";
  const showSmokeTimeSinceStopField =
    form.watch("smoke") === "Não, mas já fumei";
  const showAlcoholQuantityField = form.watch("alcoholComsumption") === "Sim";
  const showDiseasesDetails = form.watch("diseases") === "Sim";
  const showDiseasesFamilyHistoryDetails =
    form.watch("diseasesFamilyHistory") === "Sim";
  const showInjuriesDetails = form.watch("injuries") === "Sim";
  const showSurgeriesDetails = form.watch("surgeries") === "Sim";
  const showMedicationDetails = form.watch("medication") === "Sim";
  const showPainsDetails = form.watch("pains") === "Sim";
  const showPhysicalLimitationsDetails =
    form.watch("physicalLimitations") === "Sim";

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

    const status = await getNewEvaluationFormStatus(form, anamnesisState);
    const values = form.getValues();

    dispatch({ type: "updateFormStatus", payload: status });
    dispatch({ type: "updateFormValues", payload: values });
    dispatch({ type: "goToNextStep", payload: step });
  }

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
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "Não") {
                          form.setValue("exerciseType", "");
                          form.setValue("exerciseFrequence", "");
                          form.setValue("exerciseDuration", "");
                        }
                      }}
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
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "Sim") {
                          form.setValue("smokeQuantity", "");
                        }
                        if (value === "Não, mas já fumei") {
                          form.setValue("smokeQuantity", "");
                          form.setValue("smokeTimeSinceStop", "");
                        }
                      }}
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

            <FormField
              control={form.control}
              name="alcoholComsumption"
              render={({ field }) => (
                <FormItem className="col-span-6 mb-2 flex w-full items-center gap-3 space-y-0">
                  <FormLabel>Consome álcool?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "Não") {
                          form.setValue("alcoholQuantity", "");
                        }
                      }}
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

            {showAlcoholQuantityField ? (
              <>
                <FormField
                  control={form.control}
                  name="alcoholQuantity"
                  render={({ field }) => (
                    <FormItem className="col-span-3 flex w-full flex-col">
                      <FormLabel>Em que quantidade?</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="col-span-3"></div>
              </>
            ) : null}

            <FormField
              control={form.control}
              name="sleepQuality"
              render={({ field }) => (
                <FormItem className="col-span-3 flex w-full flex-col">
                  <FormLabel>Qual a qualidade de seu sono?</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stressLevel"
              render={({ field }) => (
                <FormItem className="col-span-3 flex w-full flex-col">
                  <FormLabel>Qual seu nível de estresse?</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <h3 className="col-span-6 mb-2 mt-6 text-xl font-semibold leading-none tracking-tight">
              Histórico de saúde
            </h3>

            <FormField
              control={form.control}
              name="diseases"
              render={({ field }) => (
                <FormItem className="col-span-6 mb-2 flex w-full items-center gap-3 space-y-0">
                  <FormLabel>Possui alguma doença?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "Não") {
                          form.setValue("diseasesDetails", "");
                        }
                      }}
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

            {showDiseasesDetails ? (
              <FormField
                control={form.control}
                name="diseasesDetails"
                render={({ field }) => (
                  <FormItem className="col-span-6 flex w-full flex-col">
                    <FormLabel>Qual?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="diseasesFamilyHistory"
              render={({ field }) => (
                <FormItem className="col-span-6 mb-2 flex w-full items-center gap-3 space-y-0">
                  <FormLabel>
                    Possui histórico familiar de alguma doença?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "Não") {
                          form.setValue("diseasesFamilyHistoryDetails", "");
                        }
                      }}
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

            {showDiseasesFamilyHistoryDetails ? (
              <FormField
                control={form.control}
                name="diseasesFamilyHistoryDetails"
                render={({ field }) => (
                  <FormItem className="col-span-6 flex w-full flex-col">
                    <FormLabel>Qual?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="injuries"
              render={({ field }) => (
                <FormItem className="col-span-6 mb-2 flex w-full items-center gap-3 space-y-0">
                  <FormLabel>Possui alguma lesão?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "Não") {
                          form.setValue("injuriesDetails", "");
                        }
                      }}
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

            {showInjuriesDetails ? (
              <FormField
                control={form.control}
                name="injuriesDetails"
                render={({ field }) => (
                  <FormItem className="col-span-6 flex w-full flex-col">
                    <FormLabel>Qual?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="surgeries"
              render={({ field }) => (
                <FormItem className="col-span-6 mb-2 flex w-full items-center gap-3 space-y-0">
                  <FormLabel>Já fez alguma cirurgia?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "Não") {
                          form.setValue("surgeriesDetails", "");
                        }
                      }}
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

            {showSurgeriesDetails ? (
              <FormField
                control={form.control}
                name="surgeriesDetails"
                render={({ field }) => (
                  <FormItem className="col-span-6 flex w-full flex-col">
                    <FormLabel>Qual?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="medication"
              render={({ field }) => (
                <FormItem className="col-span-6 mb-2 flex w-full items-center gap-3 space-y-0">
                  <FormLabel>Faz uso de alguma medicação habitual?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "Não") {
                          form.setValue("medicationDetails", "");
                        }
                      }}
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

            {showMedicationDetails ? (
              <FormField
                control={form.control}
                name="medicationDetails"
                render={({ field }) => (
                  <FormItem className="col-span-6 flex w-full flex-col">
                    <FormLabel>Qual?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="pains"
              render={({ field }) => (
                <FormItem className="col-span-6 mb-2 flex w-full items-center gap-3 space-y-0">
                  <FormLabel>Sente alguma dor?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "Não") {
                          form.setValue("painsDetails", "");
                        }
                      }}
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

            {showPainsDetails ? (
              <FormField
                control={form.control}
                name="painsDetails"
                render={({ field }) => (
                  <FormItem className="col-span-6 flex w-full flex-col">
                    <FormLabel>Qual?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="physicalLimitations"
              render={({ field }) => (
                <FormItem className="col-span-6 mb-2 flex w-full items-center gap-3 space-y-0">
                  <FormLabel>Possui alguma limitação física?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === "Não") {
                          form.setValue("physicalLimitationsDetails", "");
                        }
                      }}
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

            {showPhysicalLimitationsDetails ? (
              <FormField
                control={form.control}
                name="physicalLimitationsDetails"
                render={({ field }) => (
                  <FormItem className="col-span-6 flex w-full flex-col">
                    <FormLabel>Qual?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : null}

            <div className="col-span-6 flex justify-end gap-3 pt-4">
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
