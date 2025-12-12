import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Montagu_Slab } from "next/font/google";
import { Montserrat } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { Quattrocento } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import type { Viewport } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montagu = Montagu_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montagu",
});

const quattrocento = Quattrocento({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quattrocento",
});

const cormorantgaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant-garamond",
});

export const metadata: Metadata = {
  title: "Digamo",
  description: "AI recipe generator using your pantry ingredients.",
};

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montagu.variable} ${montserrat.variable} ${quattrocento.variable} antialiased`}
      >
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
