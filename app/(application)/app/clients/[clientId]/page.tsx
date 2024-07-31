import CreateButton from "@/components/create-button";
import { Heading } from "@/components/ui/heading";
import { readClientById } from "@/lib/data-services";
import { differenceInYears, format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function Page({
  params,
}: {
  params: { clientId: string };
}) {
  const clientId = params.clientId;
  const client = await readClientById(clientId);

  if (!client) return;

  console.log(client);

  return (
    <div className="flex flex-col gap-6">
      <Heading type="h2">{client.name}</Heading>
      <p>
        Cliente{" "}
        {formatDistanceToNow(new Date(client.createdAt!), {
          locale: ptBR,
          addSuffix: true,
        })}{" "}
        (desde {format(new Date(client.createdAt!), "dd/MM/yyyy")})
      </p>

      <Heading type="h3">Informações pessoais</Heading>
      <ul>
        <li>
          <span className="font-semibold">Sexo:</span> <span>{client.sex}</span>
        </li>
        <li>
          <span className="font-semibold">Data de nascimento:</span>{" "}
          <span>{format(new Date(client.dateOfBirth), "dd/MM/yyyy")}</span>
        </li>
        <li>
          <span className="font-semibold">Idade atual:</span>{" "}
          <span>
            {differenceInYears(new Date(), new Date(client.dateOfBirth))} anos
          </span>
        </li>
        <li>
          <span className="font-semibold">Email:</span>{" "}
          <span>{client.email || "Não informado"}</span>
        </li>
        <span className="font-semibold">Telefone:</span>{" "}
        <span>{client.phone || "Não informado"}</span>
        <li></li>
      </ul>

      <Heading type="h3">Últimas avaliações</Heading>

      <div>
        <CreateButton type="evaluation" />
      </div>
    </div>
  );
}
