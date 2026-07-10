import type { Metadata } from "next";
import { Barlow_Condensed, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { AccessGate } from "@/components/layout/AccessGate";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ocrA = localFont({
  src: "../../public/fonts/OCR-A-Regular.ttf",
  variable: "--font-ocr-a",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "D.ARK+ — Dolores Arkitecture | Architecture Studio Cebu",
    template: "%s | D.ARK+",
  },
  description:
    "D.ARK+ (Dolores Arkitecture) is an architecture studio based in Cebu, Philippines, crafting thoughtful residential, commercial, and interior spaces.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://doloresarkitecture.com"
  ),
  openGraph: {
    type: "website",
    siteName: "D.ARK+ — Dolores Arkitecture",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} ${ocrA.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0d0d0d] text-[#f0ede8]">
        <AccessGate>
          <Header />
          <main className="flex-1 pt-[4.5rem]">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </AccessGate>
      </body>
    </html>
  );
}
