import { AppNavigationLink } from "@/components/app-navigation-link";
import { Heading } from "@/components/ui/heading";
import { Home, Ruler, Settings, User, Users } from "lucide-react";
import Link from "next/link";

export default function AppNavigation() {
  return (
    <aside className="border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-6 py-2">
        <Link href="/">
          <Heading type="h1" className="font-normal">
            Fittest
          </Heading>
        </Link>
      </div>

      <nav className="flex flex-col gap-2 px-2 py-4">
        <AppNavigationLink href="/app/dashboard">
          <Home className="h-4 w-4" />
          <span>Início</span>
        </AppNavigationLink>

        <AppNavigationLink href="/app/clients">
          <Users className="h-4 w-4" />
          <span>Clientes</span>
        </AppNavigationLink>

        <AppNavigationLink href="/app/evaluations">
          <Ruler className="h-4 w-4" />
          <span>Avaliações</span>
        </AppNavigationLink>

        <AppNavigationLink href="/app/profile">
          <User className="h-4 w-4" />
          <span>Meu perfil</span>
        </AppNavigationLink>

        <AppNavigationLink href="/app/settings">
          <Settings className="h-4 w-4" />
          <span>Configurações</span>
        </AppNavigationLink>
      </nav>
    </aside>
  );
}
