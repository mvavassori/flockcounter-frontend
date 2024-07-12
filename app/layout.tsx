import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

import { ClientAuthProvider } from "@/utils/ClientAuthProvider";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script crossOrigin="anonymous" src="/static/script.js"></Script>
      <Script
        crossOrigin="anonymous"
        strategy="lazyOnload"
        src="/static/events.js"
      ></Script>
      <body className={inter.className}>
        <ClientAuthProvider>
          <Navbar />
          <main className="mt-14 max-w-5xl mx-auto">{children}</main>
        </ClientAuthProvider>
      </body>
    </html>
  );
}
