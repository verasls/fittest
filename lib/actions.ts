"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { Client } from "@/lib/schema";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/app/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createClient(formData: Client) {
  const session = await auth();
  if (!session) throw new Error("Você precisa estar autenticado");

  const { error } = await supabase.from("clients").insert(formData).select();

  if (error) throw new Error("Não foi possível adicionar um novo cliente");

  redirect("/app/clients");
}

export async function updateClientById(updatedValues: Client) {
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
