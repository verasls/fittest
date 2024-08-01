"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Client } from "@/lib/schema";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  CircleCheck,
  Eye,
  MoreHorizontal,
  Ruler,
  SquarePen,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { deleteClientById } from "@/lib/actions";
import { toast } from "@/components/ui/use-toast";

async function onDelete(clientId: string) {
  await deleteClientById(clientId);
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

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Nome</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Link href={`/app/clients/${row.original.id}`}>
          <p className="w-[36ch] truncate px-4 underline-offset-4 hover:underline">
            {row.original.name}
          </p>
        </Link>
      );
    },
  },
  {
    accessorKey: "sex",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Sexo</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="px-4">{row.original.sex}</span>;
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Data de nascimento</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateOfBirth = row.getValue<string>("dateOfBirth");
      const formattedDate = dateOfBirth
        ? format(new Date(dateOfBirth), "dd/MM/yyyy")
        : "-";
      return <span className="px-4 tabular-nums">{formattedDate}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Cliente desde</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue<string>("createdAt");
      const formattedDate = createdAt
        ? format(new Date(createdAt), "dd/MM/yyyy")
        : "-";
      return <span className="px-4 tabular-nums">{formattedDate}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="px-4">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link
                  href={`/app/clients/${row.original.id}`}
                  className="flex w-full items-center"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Ver cliente</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link
                  href={`/app/clients/${row.original.id}/edit`}
                  className="flex w-full items-center"
                >
                  <SquarePen className="mr-2 h-4 w-4" />
                  <span>Editar cliente</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  <div className="flex w-full cursor-pointer items-center">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Excluir cliente</span>
                  </div>
                </AlertDialogTrigger>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                <span>Ver avaliações</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Ruler className="mr-2 h-4 w-4" />
                <span>Nova avaliação</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
                onClick={() => onDelete(row.original.id!)}
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
