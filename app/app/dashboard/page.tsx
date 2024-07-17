import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  return <h1>Olá, {session!.user!.name!.split(" ").at(0)}!</h1>;
}
