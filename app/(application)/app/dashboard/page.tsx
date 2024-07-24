import CreateButton from "@/components/create-button";
import { Heading } from "@/components/ui/heading";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <Heading type="h2">Olá, {session!.user!.name!.split(" ").at(0)}!</Heading>

      <div className="flex gap-3 pt-6">
        <CreateButton type="client" />
        <CreateButton type="evaluation" />
      </div>
    </div>
  );
}
