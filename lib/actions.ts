"use server";

import { auth, signIn, signOut } from "@/lib/auth";
import { Client } from "@/lib/schema";
import { supabase } from "@/lib/supabase";

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
}
