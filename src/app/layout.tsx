import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { PullToRefresh } from "@/components/layout/PullToRefresh";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#F7F4EE",
};

export const metadata: Metadata = {
  title: "China One | Chongqing",
  description: "Guide de voyage et carnet de bord pour Chongqing",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "China One",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-primary/10 selection:text-primary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PullToRefresh>
            <main className="min-h-screen pb-24">
              {children}
            </main>
          </PullToRefresh>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
