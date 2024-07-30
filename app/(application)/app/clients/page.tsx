import { Heading } from "@/components/ui/heading";
import { readClients } from "@/lib/data-services";

export default async function Page() {
  const clients = await readClients();

  return (
    <div>
      <Heading type="h2">Meus clientes</Heading>

      <ul>
        {clients.map((client) => (
          <li key={client.name}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
}
