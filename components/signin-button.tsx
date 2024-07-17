import { Button } from "@/components/ui/button";
import { signInAction } from "@/lib/actions";
import Image from "next/image";

type SignInButtonProps = {
  provider: "Google" | "Apple";
};

export default function SignInButton({ provider }: SignInButtonProps) {
  return (
    <form action={signInAction}>
      <Button variant="outline" className="flex w-full items-center gap-3">
        <Image
          src={`https://authjs.dev/img/providers/${provider.toLowerCase()}.svg`}
          alt={`${provider} logo`}
          height="22"
          width="22"
        />
        <span>Entrar com {provider}</span>
      </Button>
    </form>
  );
}
