import CreateNewClientForm from "@/components/create-new-client-form";
import { Heading } from "@/components/ui/heading";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading type="h2">Adicionar novo cliente</Heading>
        <div>
          <p>Preencha as informações abaixo para adicionar um novo cliente.</p>
          <p className="text-sm">Os campos marcados (*) são obrigatórios.</p>
        </div>
      </div>
      <CreateNewClientForm />
    </div>
  );
}
