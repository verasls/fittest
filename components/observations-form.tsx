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
import { Textarea } from "@/components/ui/textarea";
import {
  Steps,
  useNewEvaluationForm,
} from "@/context/NewEvaluationFormContext";
import { Client, Observations, observationsSchema } from "@/lib/schema";
import { getSelectedClientDetails } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

type ObservationsFormProps = {
  clients: Array<Client>;
  formRef: React.MutableRefObject<NewEvaluationForm | null>;
};

export default function ObservationsForm({
  clients,
  formRef,
}: ObservationsFormProps) {
  const { state, dispatch } = useNewEvaluationForm();
  const { clientName, clientAge } = getSelectedClientDetails(state, clients);

  const observationsState = state.formData
    .filter((form) => form.step === "observations")
    .at(0)!.values;

  const form = useForm<Observations>({
    resolver: zodResolver(observationsSchema),
    defaultValues: observationsState,
  });
  formRef.current = form;

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const buttonText = event.currentTarget.textContent;

    let step: Steps;
    if (buttonText === "Anterior") {
      step = "skinfolds";
    } else {
      throw new Error("Unkown action");
    }

    const status = await getNewEvaluationFormStatus(form, observationsState);
    const values = form.getValues();

    dispatch({ type: "updateFormStatus", payload: status });
    dispatch({ type: "updateFormValues", payload: values });
    dispatch({ type: "goToNextStep", payload: step });
  }

  return (
    <Card className="px-10 py-8">
      <CardHeader>
        <CardTitle>Observações</CardTitle>
        <CardDescription>
          Cliente: {clientName ? clientName : "Nenhum cliente selecionado"}
          <br />
          {clientName && `Idade: ${clientAge} anos`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" type="button" onClick={handleClick}>
                Anterior
              </Button>

              <Button type="button">Concluir</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
