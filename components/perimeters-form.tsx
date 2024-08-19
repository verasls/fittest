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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Steps,
  useNewEvaluationForm,
} from "@/context/NewEvaluationFormContext";
import { Client, Perimeters, perimetersSchema } from "@/lib/schema";
import { getSelectedClientDetails } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

type PerimetersFormProps = {
  clients: Array<Client>;
  formRef: React.MutableRefObject<NewEvaluationForm | null>;
};

export default function PerimetersForm({
  clients,
  formRef,
}: PerimetersFormProps) {
  const { state, dispatch } = useNewEvaluationForm();
  const { clientName, clientAge } = getSelectedClientDetails(state, clients);

  const perimetersState = state.formData
    .filter((form) => form.step === "perimeters")
    .at(0)!.values;

  const form = useForm<Perimeters>({
    resolver: zodResolver(perimetersSchema),
    defaultValues: perimetersState,
  });
  formRef.current = form;

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const buttonText = event.currentTarget.textContent;

    let step: Steps;
    if (buttonText === "Anterior") {
      step = "anamnesis";
    } else if (buttonText === "Próximo") {
      step = "skinfolds";
    } else {
      throw new Error("Unkown action");
    }

    const status = await getNewEvaluationFormStatus(form, perimetersState);
    const values = form.getValues();

    dispatch({ type: "updateFormStatus", payload: status });
    dispatch({ type: "updateFormValues", payload: values });
    dispatch({ type: "goToNextStep", payload: step });
  }

  return (
    <Card className="px-10 py-8">
      <CardHeader>
        <CardTitle>Perímetros</CardTitle>
        <CardDescription>
          Cliente: {clientName ? clientName : "Nenhum cliente selecionado"}
          <br />
          {clientName && `Idade: ${clientAge} anos`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form className="grid grid-cols-2 gap-4">
            <h3 className="col-span-2 mb-2 text-xl font-semibold leading-none tracking-tight">
              Membros superiores
            </h3>

            <FormField
              control={form.control}
              name="armLeftRelaxed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Braço esquerdo relaxado</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="armRightRelaxed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Braço direito relaxado</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="armLeftFlexed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Braço esquerdo contraído</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="armRightFlexed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Braço direito contraído</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="forearmLeft"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Antebraço esquerdo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="forearmRight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Antebraço direito</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h3 className="col-span-2 mb-2 mt-6 text-xl font-semibold leading-none tracking-tight">
              Membros inferiores
            </h3>

            <FormField
              control={form.control}
              name="thighLeftProximal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coxa esquerda proximal</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thighRightProximal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coxa direita proximal</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thighLeftMedial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coxa esquerda medial</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thighRightMedial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coxa direita medial</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thighLeftDistal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coxa esquerda distal</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thighRightDistal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coxa direita distal</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="calfLeft"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Panturrilha esquerda</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="calfRight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Panturrilha direita</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h3 className="col-span-2 mb-2 mt-6 text-xl font-semibold leading-none tracking-tight">
              Medidas centrais
            </h3>

            <FormField
              control={form.control}
              name="chest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tórax</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="abdomen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abdômen</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="waist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cintura</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hips"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quadril</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(cm)"
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2 flex justify-end gap-3 pt-4">
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
