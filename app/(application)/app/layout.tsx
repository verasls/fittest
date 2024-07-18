import React from "react";
import "@/styles/globals.css";
import AppHeader from "@/components/app-header";
import AppNavigation from "@/components/app-navigation";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function ApplicationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="grid min-h-screen w-full grid-cols-[224px_1fr]">
          <AppNavigation />

          <main>
            <AppHeader />
            <div className="p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
