import { Heading } from "@/components/ui/heading";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  return (
    <Heading type="h2">Olá, {session!.user!.name!.split(" ").at(0)}!</Heading>
  );
}
