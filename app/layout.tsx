import CookieBanner from "@/components/consent/cookie-banner";
import GoogleAnalytics from "@/components/consent/google-analytics";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "700"],
  style: ["normal", "italic"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-[3.5rem]">
      <GoogleAnalytics GA_MEASUREMENT_ID="G-7P7WYKN019" />
      <body className={cn("min-h-screen bg-background font-ubuntu antialiased", ubuntu.variable)}>
        <Providers>
          <section className="relative flex flex-col min-h-dvh bg-background">
            <SiteHeader />
            <main className="flex-1">
              {children}
              <CookieBanner />
            </main>
            <SiteFooter />
          </section>
        </Providers>
      </body>
    </html>
  );
}
