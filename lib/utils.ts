import { State } from "@/context/NewEvaluationFormContext";
import { Client } from "@/lib/schema";
import { type ClassValue, clsx } from "clsx";
import { differenceInYears } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSelectedClientDetails(state: State, clients: Array<Client>) {
  const evaluationData = state.formData
    .filter((form) => form.step === "client")
    .at(0);
  const evaluationDate = evaluationData?.values.date;
  const clientId = evaluationData?.values.clientId;
  const client = clients.find((client) => client.id! === clientId);
  const clientName = client?.name;
  const clientSex = client?.sex;
  const clientDob = client?.dateOfBirth;
  const clientAge =
    evaluationDate && clientDob
      ? differenceInYears(evaluationDate, clientDob)
      : null;

  return { clientName, clientAge, clientSex };
}
