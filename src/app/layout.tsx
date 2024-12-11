import "@/app/globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { Header } from "@/components/Header";
import { ToastProvider } from "@/context/ToastContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IdeaGen",
  description: "AI tool for generating ideas for gifts and presents",
};

const Layout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={clsx("h-full antialiased", inter.className)}>
          <ToastProvider>
            <Header />
            {children}
          </ToastProvider>
      </body>
    </html>
  );
};

export default Layout;
