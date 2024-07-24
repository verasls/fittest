import CreateNewClientForm from "@/components/create-new-client-form";
import { Heading } from "@/components/ui/heading";

export default function Page() {
  return (
    <div>
      <Heading type="h2">Adicionar novo cliente</Heading>
      <CreateNewClientForm />
    </div>
  );
}
