import React from "react";
import "@/styles/globals.css";
import AppHeader from "@/components/app-header";
import AppNavigation from "@/components/app-navigation";

export default async function ApplicationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="grid min-h-screen w-full grid-cols-[224px_1fr]">
          <AppNavigation />

          <main>
            <AppHeader />
            <div className="p-4">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
