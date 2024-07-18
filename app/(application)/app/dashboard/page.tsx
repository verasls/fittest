import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { auth } from "@/lib/auth";
import { Ruler, Users } from "lucide-react";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <Heading type="h2">Olá, {session!.user!.name!.split(" ").at(0)}!</Heading>

      <div className="flex gap-3 pt-6">
        <Button className="h-9">
          <Users className="mr-2 h-4 w-4" />
          <span>Novo cliente</span>
        </Button>
        <Button className="h-9">
          <Ruler className="mr-2 h-4 w-4" />
          <span>Nova avaliação</span>
        </Button>
      </div>
    </div>
  );
}
