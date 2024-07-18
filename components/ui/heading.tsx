import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const headingVariants = cva("", {
  defaultVariants: {
    type: "h1",
  },
  variants: {
    type: {
      h1: "text-xl font-semibold sm:text-2xl",
      h2: "text-lg font-semibold sm:text-xl",
      h3: "text-lg font-medium sm:text-xl",
    },
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

function Heading({ className, type, children, ...props }: HeadingProps) {
  const Tag = type || "h1";
  return (
    <Tag className={cn(headingVariants({ type }), className)} {...props}>
      {children}
    </Tag>
  );
}

export { Heading, headingVariants };
