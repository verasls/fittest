"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNewEvaluationForm } from "@/context/NewEvaluationFormContext";
import { Client, Evaluation } from "@/lib/schema";
import { differenceInYears } from "date-fns";
import { UseFormReturn } from "react-hook-form";

type AnamnesisFormProps = {
  clients: Array<Client>;
  formRef: React.MutableRefObject<UseFormReturn<Evaluation> | null>;
};

export default function AnamnesisForm({
  clients,
  formRef,
}: AnamnesisFormProps) {
  const { state } = useNewEvaluationForm();

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
      <CardContent className="pt-6"></CardContent>
    </Card>
  );
}
