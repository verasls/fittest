import { Ruler, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ButtonCreateProps = {
  type: "client" | "evaluation";
};

export default function CreateButton({ type }: ButtonCreateProps) {
  return (
    <Button asChild size="sm">
      {type === "client" ? (
        <Link href="/app/clients/new">
          <Users className="mr-2 h-4 w-4" />
          <span>Novo cliente</span>
        </Link>
      ) : (
        <Link href="#">
          <Ruler className="mr-2 h-4 w-4" />
          <span>Nova avaliação</span>
        </Link>
      )}
    </Button>
  );
}
