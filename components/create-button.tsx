import { Ruler, SquarePen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ButtonCreateProps = {
  type: "client" | "evaluation" | "updateClient";
};

export default function CreateButton({ type }: ButtonCreateProps) {
  let icon: JSX.Element;
  let text: string;
  let link: string;

  switch (type) {
    case "client":
      icon = <Users className="mr-2 h-4 w-4" />;
      text = "Novo cliente";
      link = "/app/clients/new";
      break;

    case "evaluation":
      icon = <Ruler className="mr-2 h-4 w-4" />;
      text = "Nova avaliação";
      link = "#";
      break;

    case "updateClient":
      icon = <SquarePen className="mr-2 h-4 w-4" />;
      text = "Editar cliente";
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
