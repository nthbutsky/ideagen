import type { Metadata } from "next";

import clsx from "clsx";

import { Inter } from "next/font/google";
import "@/app/globals.css";

import { ToastProvider } from '@/context/ToastContext';
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IDeaGen",
  description: "AI tool for generating ideas for gifts and presents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={clsx("h-full antialiased", inter.className)}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
