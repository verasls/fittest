"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { readClientById } from "@/lib/data-services";
import { Client } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

export async function signInAction() {
  await signIn("google", { redirectTo: "/app/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createClient(formData: Client) {
  const supabase = await getSupabaseClient();
  const session = await auth();
  if (!session) throw new Error("Você precisa estar autenticado");

  const { error } = await supabase.from("clients").insert(formData).select();

  if (error) throw new Error("Não foi possível adicionar um novo cliente");

  redirect("/app/clients");
}

export async function updateClientById(updatedValues: Client) {
  const supabase = await getSupabaseClient();
  const session = await auth();
  if (!session) throw new Error("Você precisa estar autenticado");

  if (updatedValues.userId !== session.user!.id)
    throw new Error(
      "Você não tem autorização para atualizar os dados deste cliente"
    );

  const { error } = await supabase
    .from("clients")
    .update(updatedValues)
    .eq("id", updatedValues.id!);

  if (error) throw new Error("Não foi possível atualizar os dados do cliente");

  redirect(`/app/clients/${updatedValues.id!}`);
}

export async function deleteClientById(clientId: string) {
  const supabase = await getSupabaseClient();
  const session = await auth();
  if (!session) throw new Error("Você precisa estar autenticado");

  const client = await readClientById(clientId);

  if (client.userId !== session.user!.id)
    throw new Error("Você não tem autorização para excluir este cliente");

  const { error } = await supabase.from("clients").delete().eq("id", clientId);

  if (error) throw new Error("Não foi possível exluir este cliente");

  revalidatePath("/app/clients");
}
