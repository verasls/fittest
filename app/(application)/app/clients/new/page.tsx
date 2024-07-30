import CreateClientForm from "@/components/create-client-form";
import { Heading } from "@/components/ui/heading";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  const userId = session!.user!.id!;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading type="h2">Adicionar novo cliente</Heading>
        <div>
          <p>Preencha as informações abaixo para adicionar um novo cliente.</p>
          <p className="text-sm">Os campos marcados (*) são obrigatórios.</p>
        </div>
      </div>
      <CreateClientForm userId={userId} />
    </div>
  );
}
