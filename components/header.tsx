import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import UserAvatar from "@/components/user-avatar";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();

  return (
    <div className="flex h-14 items-center justify-between border-b bg-muted/40 px-6 py-2">
      <Link href="/">
        <Heading type="h1" className="font-normal">
          Fittest
        </Heading>
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
