"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { usePathname } from "next/navigation";

const appNavigationLinkVariants = cva(
  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-primary hover:font-semibold",
        active: "bg-muted text-primary font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AppNavigationLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof appNavigationLinkVariants> {
  href: string;
}

function AppNavigationLink({
  href,
  className,
  children,
  ...props
}: AppNavigationLinkProps) {
  const pathname = usePathname();

  const variant = pathname.startsWith(href) ? "active" : "default";

  return (
    <Link
      href={href}
      className={cn(appNavigationLinkVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export { AppNavigationLink, appNavigationLinkVariants };
