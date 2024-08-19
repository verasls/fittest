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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Steps,
  useNewEvaluationForm,
} from "@/context/NewEvaluationFormContext";
import useFormStatusTrigger from "@/hooks/useFormStatusTrigger";
import { Client, Skinfolds, skinfoldsSchema } from "@/lib/schema";
import { getSelectedClientDetails } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

type SkinfoldsFormProps = {
  clients: Array<Client>;
  formRef: React.MutableRefObject<NewEvaluationForm | null>;
};

export default function SkinfoldsForm({
  clients,
  formRef,
}: SkinfoldsFormProps) {
  const { state, dispatch } = useNewEvaluationForm();
  const { clientName, clientAge } = getSelectedClientDetails(state, clients);

  const skinfoldsState = state.formData
    .filter((form) => form.step === "skinfolds")
    .at(0)!.values;
  const skinfoldsStatus = state.formData
    .filter((form) => form.step === "skinfolds")
    .at(0)!.status;

  const form = useForm<Skinfolds>({
    resolver: zodResolver(skinfoldsSchema),
    defaultValues: skinfoldsState,
  });
  formRef.current = form;

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const buttonText = event.currentTarget.textContent;

    let step: Steps;
    if (buttonText === "Anterior") {
      step = "perimeters";
    } else if (buttonText === "Próximo") {
      step = "observations";
    } else {
      throw new Error("Unkown action");
    }

    const status = await getNewEvaluationFormStatus(form, skinfoldsState);
    const values = form.getValues();

    dispatch({ type: "updateFormStatus", payload: status });
    dispatch({ type: "updateFormValues", payload: values });
    dispatch({ type: "goToNextStep", payload: step });
  }

  useFormStatusTrigger({
    form,
    formStatus: skinfoldsStatus,
    fieldsToWatch: "protocol",
  });

  return (
    <Card className="px-10 py-8">
      <CardHeader>
        <CardTitle>Dobras cutâneas</CardTitle>
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
              Selecionar protocolo
            </h3>

            <FormField
              control={form.control}
              name="protocol"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Protocolo</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pollock 7 dobras">
                        Pollock 7 dobras
                      </SelectItem>
                      <SelectItem value="Pollock 3 dobras">
                        Pollock 3 dobras
                      </SelectItem>
                      <SelectItem value="Petroski">Petroski</SelectItem>
                      <SelectItem value="Guedes">Guedes</SelectItem>
                      <SelectItem value="Faulkner">Faulkner</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div></div>

            <h3 className="col-span-2 mb-2 mt-6 text-xl font-semibold leading-none tracking-tight">
              Dobras
            </h3>

            <FormField
              control={form.control}
              name="chest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peitoral</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(mm)"
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
              name="subscapular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subescapular</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(mm)"
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
              name="midaxillary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Axilar média</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(mm)"
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
              name="abdominal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abdominal</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(mm)"
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
              name="suprailiac"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supra-ilíaca</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(mm)"
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
              name="triceps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tricipital</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(mm)"
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
              name="thigh"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coxa</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(mm)"
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
              name="calf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Panturrilha medial</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="(mm)"
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
