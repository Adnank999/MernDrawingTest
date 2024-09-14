import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/redux/provider";
import { Toaster } from "@/components/ui/toaster";




export const metadata: Metadata = {
  title: "Easy Draw",
  description: "Brainstorming tools!Try and move your thoughts and arts to next level",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
