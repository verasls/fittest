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
