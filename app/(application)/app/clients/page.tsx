import { columns } from "@/app/(application)/app/clients/columns";
import { DataTable } from "@/app/(application)/app/clients/data-table";
import { Heading } from "@/components/ui/heading";
import { readClients } from "@/lib/data-services";

export default async function Page() {
  const clients = await readClients();

  return (
    <div className="flex flex-col gap-6">
      <Heading type="h2">Meus clientes</Heading>

      <div className="container mx-auto py-4">
        <DataTable columns={columns} data={clients} />
      </div>
    </div>
  );
}
