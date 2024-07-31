import ActionButton from "@/components/action-button";
import { Heading } from "@/components/ui/heading";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <Heading type="h2" className="mt-6">
        Olá, {session!.user!.name!.split(" ").at(0)}!
      </Heading>

      <div className="flex gap-3 pt-6">
        <ActionButton type="createClient" />
        <ActionButton type="createEvaluation" />
      </div>
    </div>
  );
}
