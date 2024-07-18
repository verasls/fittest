import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();

  return (
    <div className="flex h-14 justify-between border-b bg-muted/40 px-4 py-2">
      <Link href="/">
        <h1 className="text-2xl">Fittest</h1>
      </Link>

      {session?.user?.image ? (
        <UserAvatar session={session} />
      ) : (
        <Button asChild>
          <Link href="/login" className="text-lg">
            Entrar
          </Link>
        </Button>
      )}
    </div>
  );
}
