import { auth } from "@/lib/auth";
import { Client, clientSchema } from "@/lib/schema";
import { supabase } from "@/lib/supabase";

export async function getUser(email: string) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

type User = {
  name: string;
  email: string;
};

export async function createNewUser(newUser: User) {
  const { data, error } = await supabase.from("users").insert([newUser]);

  if (error) throw new Error("User could not be created");

  return data;
}

export async function readClientById(clientId: string): Promise<Client> {
  const session = await auth();
  if (!session) throw new Error("Você precisa estar autenticado");

  const userId = session.user!.id;

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("userId", userId)
    .eq("id", clientId);

  if (error) throw new Error("Não foi possível obter os dados do cliente");

  const clientArray = data.map((client) => {
    const processedClient = {
      ...client,
      createdAt: new Date(client.createdAt),
      dateOfBirth: new Date(client.dateOfBirth),
    };
    const parsedData = clientSchema.safeParse(processedClient);

    if (!parsedData.success)
      throw new Error(
        `Dados do cliente inválidos: ${parsedData.error.message}`
      );

    return parsedData.data;
  });

  const client = clientArray.at(0)!;

  return client;
}

export async function readAllClients(): Promise<Array<Client>> {
  const session = await auth();
  if (!session) throw new Error("Você precisa estar autenticado");

  const userId = session.user!.id;

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("userId", userId);

  if (error) throw new Error("Não foi possível obter os dados dos clientes");

  const clients = data.map((client) => {
    const processedClient = {
      ...client,
      createdAt: new Date(client.createdAt),
      dateOfBirth: new Date(client.dateOfBirth),
    };
    const parsedData = clientSchema.safeParse(processedClient);

    if (!parsedData.success)
      throw new Error(
        `Dados do cliente inválidos: ${parsedData.error.message}`
      );

    return parsedData.data;
  });

  const sortedClients = clients.sort(
    (a, b) =>
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
  );

  return sortedClients;
}
