import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between bg-gray-100 px-4 py-2">
      <Link href="/">
        <h1 className="text-2xl">Home</h1>
      </Link>

      <Button asChild>
        <Link href="/login" className="text-lg">
          Entrar
        </Link>
      </Button>
    </div>
  );
}
