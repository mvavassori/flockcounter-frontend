import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

import { ClientAuthProvider } from "@/context/ClientAuthProvider";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlockCounter",
  description: "Simple, privacy-first web analytics",
};

declare global {
  interface Window {
    trackCustomEvent: (eventName: string) => void;
  }
}

// added it to pass the backend URL to the script.js file
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="backend-url" content={backendUrl} />
      </head>
      <Script crossOrigin="anonymous" src="/static/script.js"></Script>
      <Script
        crossOrigin="anonymous"
        strategy="lazyOnload"
        src="/static/events.js"
      ></Script>
      <body className={`${inter.className} flex flex-col min-h-full`}>
        <ClientAuthProvider>
          <Navbar />
          <main className="mt-14 max-w-5xl mx-auto w-full flex-1">
            {children}
          </main>
        </ClientAuthProvider>
        <Footer />
      </body>
    </html>
  );
}
