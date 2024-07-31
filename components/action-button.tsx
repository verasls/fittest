import { Ruler, SquarePen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ButtonCreateProps = {
  type: "createClient" | "updateClient" | "createEvaluation";
};

export default function ActionButton({ type }: ButtonCreateProps) {
  let icon: JSX.Element;
  let text: string;
  let link: string;

  switch (type) {
    case "createClient":
      icon = <Users className="mr-2 h-4 w-4" />;
      text = "Novo cliente";
      link = "/app/clients/new";
      break;

    case "updateClient":
      icon = <SquarePen className="mr-2 h-4 w-4" />;
      text = "Editar cliente";
      link = "#";
      break;

    case "createEvaluation":
      icon = <Ruler className="mr-2 h-4 w-4" />;
      text = "Nova avaliação";
      link = "#";
      break;
  }

  return (
    <Button asChild size="sm">
      <Link href={link}>
        {icon}
        <span>{text}</span>
      </Link>
    </Button>
  );
}
