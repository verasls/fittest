import NewEvaluationForm from "@/components/new-evaluation-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { readAllClients } from "@/lib/data-services";

export default async function Page() {
  const clients = await readAllClients();
  const sortedClients = clients.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/app/dashboard">Início</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/app/evaluations">Avaliações</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem className="pointer-events-none text-foreground">
            Nova avaliação
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <NewEvaluationForm clients={sortedClients} />
    </>
  );
}
