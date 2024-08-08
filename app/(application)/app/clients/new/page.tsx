import NewClientForm from "@/components/new-client-form";
import { Heading } from "@/components/ui/heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  const userId = session!.user!.id!;

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

          <BreadcrumbItem className="pointer-events-none text-foreground">
            Novo cliente
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Heading type="h2">Adicionar novo cliente</Heading>
          <div>
            <p>
              Preencha as informações abaixo para adicionar um novo cliente.
            </p>
            <p className="text-sm">Os campos marcados (*) são obrigatórios.</p>
          </div>
        </div>
        <NewClientForm userId={userId} />
      </div>
    </>
  );
}
