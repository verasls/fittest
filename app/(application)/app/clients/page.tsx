import { columns } from "@/app/(application)/app/clients/columns";
import { DataTable } from "@/app/(application)/app/clients/data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { readAllClients } from "@/lib/data-services";

export default async function Page() {
  const clients = await readAllClients();

  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/app/dashboard">Início</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem className="pointer-events-none text-foreground">
            Clientes
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-6">
        <Heading type="h2">Meus clientes</Heading>

        <div className="container mx-auto py-4">
          <DataTable columns={columns} data={clients} />
        </div>
      </div>
    </>
  );
}
