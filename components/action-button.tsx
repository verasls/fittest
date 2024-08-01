"use client";

import { CircleCheck, Ruler, SquarePen, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteClientById } from "@/lib/actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type ButtonCreateProps = {
  type: "createClient" | "updateClient" | "deleteClient" | "createEvaluation";
  clientId?: string;
};

export default function ActionButton({ type, clientId }: ButtonCreateProps) {
  const router = useRouter();

  let component: JSX.Element;

  switch (type) {
    case "createClient":
      component = (
        <Link href={"/app/clients/new"}>
          <Users className="mr-2 h-4 w-4" />
          <span>Novo cliente</span>
        </Link>
      );
      break;

    case "updateClient":
      component = (
        <Link href={`/app/clients/${clientId}/edit`}>
          <SquarePen className="mr-2 h-4 w-4" />
          <span>Editar cliente</span>
        </Link>
      );
      break;

    case "deleteClient":
      component = (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="inline-flex h-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Excluir cliente</span>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. O registro deste cliente será
                permanentemente excluído de nossos servidores.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => onDelete(clientId!)}
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
      break;

    case "createEvaluation":
      component = (
        <Link href="#">
          <Ruler className="mr-2 h-4 w-4" />
          <span>Nova avaliação</span>
        </Link>
      );
      break;
  }

  async function onDelete(clientId: string) {
    await deleteClientById(clientId);

    router.push("/app/clients");

    toast({
      description: (
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <CircleCheck className="h-6 w-6" />
          </div>
          <span>Dados do cliente excluídos com sucesso!</span>
        </div>
      ),
    });
  }

  return (
    <Button asChild size="sm">
      {component}
    </Button>
  );
}
