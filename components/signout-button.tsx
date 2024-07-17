import { signOutAction } from "@/lib/actions";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="flex items-center">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sair</span>
      </button>
    </form>
  );
}
