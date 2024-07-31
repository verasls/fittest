import CreateButton from "@/components/create-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
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
    <Card>
      <CardHeader>
        <CardTitle>{client.name}</CardTitle>
        <CardDescription>
          Cliente{" "}
          {formatDistanceToNow(new Date(client.createdAt!), {
            locale: ptBR,
            addSuffix: true,
          })}{" "}
          (desde {format(new Date(client.createdAt!), "dd/MM/yyyy")})
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Heading type="h3" className="mb-2">
          Informações pessoais
        </Heading>

        <ul>
          <li>
            <span className="font-semibold">Sexo:</span>{" "}
            <span>{client.sex}</span>
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

        <Separator className="my-4" />

        <Heading type="h3" className="mb-2">
          Avaliações
        </Heading>

        <ul>
          <li>
            <span className="font-semibold">Última avaliação:</span>{" "}
            <span>Nenhuma avaliação realizada</span>
          </li>
          <li>
            <span className="font-semibold">Próxima avaliação:</span>{" "}
            <span>Nenhuma avaliação prevista</span>
          </li>
        </ul>
      </CardContent>

      <CardFooter className="flex gap-3 pt-6">
        <CreateButton type="updateClient" />
        <CreateButton type="evaluation" />
      </CardFooter>
    </Card>
  );
}
