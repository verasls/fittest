import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Entrar</CardTitle>
        <CardDescription>
          Digite seu e-mail abaixo para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="eu@exemplo.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
          <Button variant="outline" className="flex w-full items-center gap-3">
            <Image
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google logo"
              height="22"
              width="22"
            />
            <span>Entrar com Google</span>
          </Button>
          <Button variant="outline" className="flex w-full items-center gap-3">
            <Image
              src="https://authjs.dev/img/providers/apple.svg"
              alt="Apple logo"
              height="22"
              width="22"
            />
            <span>Entrar com Apple</span>
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Ainda não possui uma conta?{" "}
          <Link href="#" className="underline">
            Cadastre-se
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
