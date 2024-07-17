import SignOutButton from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";

type UserAvatarProps = {
  session: Session;
};

export default function UserAvatar({ session }: UserAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full p-1">
          <Image
            src={session.user!.image!}
            alt="User avatar"
            height={32}
            width={32}
            className="rounded-full"
            referrerPolicy="no-referrer"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>
          Olá, {session.user!.name!.split(" ").at(0)}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Meu perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
