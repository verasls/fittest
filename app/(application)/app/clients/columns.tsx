"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Client } from "@/lib/schema";
import { format, differenceInYears } from "date-fns";

const renderCell = (value: string | undefined, fallback: string = "-") => {
  return <div>{value?.length ? value : fallback}</div>;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nome",
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
];
