import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-2">
      <Heading type="h2">Página não encontrada</Heading>
      <p>A página que você procura não existe</p>
      <Button asChild className="mt-2 w-auto self-start">
        <Link href="/app/dashboard">Voltar para o Painel</Link>
      </Button>
    </div>
  );
}
