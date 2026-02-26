import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/shared/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Aplix | Aidan Creates",
    template: "%s | Aplix",
  },
  description:
    "Your API. Fully visible. Always under control. Monitor uptime, latency, and error rates at a glance with Aplix.",
  keywords: [
    "API monitoring",
    "SaaS",
    "analytics",
    "uptime",
    "developer tools",
    "Next.js template",
  ],
  authors: [{ name: "Aidan Creates" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Aplix | Aidan Creates",
    description:
      "Your API. Fully visible. Always under control. Monitor uptime, latency, and error rates at a glance.",
    siteName: "Aplix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aplix | Aidan Creates",
    description: "Your API. Fully visible. Always under control.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
