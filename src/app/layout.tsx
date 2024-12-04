import "@/app/globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { Header } from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import { AuthProvider } from "@/context/AuthContext";
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
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  console.log("data.user", data.user); // FIXME: remove
  console.log("error?.message", error?.message); // FIXME: remove

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
