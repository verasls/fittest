import UserAvatar from "@/components/user-avatar";
import { auth } from "@/lib/auth";

export default async function AppHeader() {
  const session = await auth();

  return (
    <div className="flex h-14 justify-end border-b bg-muted/40 px-4 py-2">
      <UserAvatar session={session!} />
    </div>
  );
}
