import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0d0d0d] text-[#f0ede8]">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
