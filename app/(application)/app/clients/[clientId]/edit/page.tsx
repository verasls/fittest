import { Heading } from "@/components/ui/heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { auth } from "@/lib/auth";
import { readClientById } from "@/lib/data-services";
import EditClientForm from "@/components/edit-client-form";

export default async function Page({
  params,
}: {
  params: { clientId: string };
}) {
  const session = await auth();
  const userId = session!.user!.id!;
  const clientId = params.clientId;
  const client = await readClientById(clientId);

  if (!client) return;

  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/app/dashboard">Início</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/app/clients">Clientes</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href={`/app/clients/${clientId}`}>
              {client.name}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem className="pointer-events-none text-foreground">
            Editar
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Heading type="h2">Editar cliente</Heading>
          <div>
            <p>Atualize as informações abaixo para editar o cliente.</p>
            <p className="text-sm">Os campos marcados (*) são obrigatórios.</p>
          </div>
        </div>
        <EditClientForm userId={userId} client={client} />
      </div>
    </>
  );
}
