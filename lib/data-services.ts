import { auth } from "@/lib/auth";
import { Client, clientSchema } from "@/lib/schema";
import { getSupabase, initSupabase } from "@/lib/supabase";

let supabaseInitialized = false;

async function ensureSupabaseInitialized() {
  if (!supabaseInitialized) {
    try {
      const session = await auth();
      const supabaseAccessToken = session!.supabaseAccessToken;
      await initSupabase(supabaseAccessToken);
      supabaseInitialized = true;
    } catch (error) {
      console.error("Failed to initialize Supabase client:", error);
      throw error;
    }
  }
}

async function getSupabaseClient() {
  await ensureSupabaseInitialized();
  return getSupabase();
}

export async function readClientById(clientId: string): Promise<Client> {
  const supabase = await getSupabaseClient();
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
  const supabase = await getSupabaseClient();
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
