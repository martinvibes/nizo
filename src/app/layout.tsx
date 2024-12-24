import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/contexts/Providers";
import Footer from "@/components/layout/footer";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers> {children}</Providers>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
