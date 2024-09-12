import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_KEY environment variables");
}

let supabaseInstance: ReturnType<typeof createClient> | null = null;

export async function initSupabase(accessToken: string) {
  supabaseInstance = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  return supabaseInstance;
}

export function getSupabase() {
  if (!supabaseInstance) {
    throw new Error(
      "Supabase client not initialized. Call initSupabase() first."
    );
  }

  return supabaseInstance;
}
