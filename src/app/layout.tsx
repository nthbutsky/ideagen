import type { Metadata } from "next";

import clsx from "clsx";

import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IDeaGen",
  description: "AI tool for generating ideas for gifts and presents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={clsx("antialiased h-full", inter.className)}>
        {children}
      </body>
    </html>
  );
}
