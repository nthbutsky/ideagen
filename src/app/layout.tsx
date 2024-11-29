import { ReactNode } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import clsx from "clsx";

import { Inter } from "next/font/google";
import "@/app/globals.css";

import { Header } from "@/components/Header";

import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";

import { ERoute } from "@/types/route";

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
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  console.log(data.user); // FIXME: remove
  console.log(error?.message); // FIXME: remove

  return (
    <html lang="en" className="h-full bg-white">
      <body className={clsx("h-full antialiased", inter.className)}>
        <AuthProvider user={data.user}>
          <ToastProvider>
            <Header />
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
