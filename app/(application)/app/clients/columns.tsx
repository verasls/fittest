"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Client } from "@/lib/schema";
import { format, differenceInYears } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  Ruler,
  SquarePen,
  Trash2,
} from "lucide-react";

const renderCell = (value: string | undefined, fallback: string = "-") => {
  return <div>{value?.length ? value : fallback}</div>;
};

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
  },
  {
    accessorKey: "sex",
    header: () => <div className="text-center">Sexo</div>,
    cell: ({ row }) => {
      const sex = row.getValue<string>("sex") ?? "";
      return <div className="text-center">{sex.at(0)}</div>;
    },
  },
  {
    accessorKey: "age",
    header: () => <div className="text-center">Idade</div>,
    cell: ({ row }) => {
      const dateOfBirth = row.getValue<string>("dateOfBirth");
      const age = dateOfBirth
        ? differenceInYears(new Date(), new Date(dateOfBirth))
        : "-";
      return <div className="text-center tabular-nums">{age}</div>;
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: "Data de nascimento",
    cell: ({ row }) => {
      const dateOfBirth = row.getValue<string>("dateOfBirth");
      const formattedDate = dateOfBirth
        ? format(new Date(dateOfBirth), "dd/MM/yyyy")
        : "-";
      return <div className="tabular-nums">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data de criação",
    cell: ({ row }) => {
      const createdAt = row.getValue<string>("createdAt");
      const formattedDate = createdAt
        ? format(new Date(createdAt), "dd/MM/yyyy")
        : "-";
      return <div className="tabular-nums">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue<string>("email");
      return renderCell(email);
    },
  },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => {
      const phone = row.getValue<string>("phone");
      return renderCell(phone);
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              <span>Ver cliente</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SquarePen className="mr-2 h-4 w-4" />
              <span>Editar cliente</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Excluir cliente</span>
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
      );
    },
  },
];
