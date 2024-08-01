"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Steps = TabsPrimitive.Root;

const StepsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center gap-1 p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
StepsList.displayName = TabsPrimitive.List.displayName;

const StepsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
      className
    )}
    {...props}
  />
));
StepsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface StepsButtonProps extends React.ComponentPropsWithoutRef<"span"> {
  children: React.ReactNode;
}

const StepsButton: React.FC<StepsButtonProps> = ({
  children,
  className,
  ...props
}) => (
  <span
    className={cn(
      "flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium group-data-[state=active]:bg-primary group-data-[state=inactive]:bg-secondary group-data-[state=active]:text-white",
      className
    )}
    {...props}
  >
    {children}
  </span>
);

interface StepsLabelProps extends React.ComponentPropsWithoutRef<"span"> {
  children: React.ReactNode;
}

const StepsLabel: React.FC<StepsLabelProps> = ({
  children,
  className,
  ...props
}) => (
  <span
    className={cn(
      "absolute left-1/2 top-8 -translate-x-1/2 transform",
      className
    )}
    {...props}
  >
    {children}
  </span>
);

const StepsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
StepsContent.displayName = TabsPrimitive.Content.displayName;

export {
  Steps,
  StepsList,
  StepsTrigger,
  StepsButton,
  StepsLabel,
  StepsContent,
};
