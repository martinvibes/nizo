import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/contexts/Providers";

export const metadata: Metadata = {
  title: "NIZO",
  description: "AI INFRA ON SOLANA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="md:p-2">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers> {children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
