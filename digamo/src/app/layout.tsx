import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Montagu_Slab } from 'next/font/google';
import { Montserrat } from "next/font/google";
import "./globals.css";
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
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montagu',
});
export const metadata: Metadata = {
  title: "Digamo",
  description: "AI recipe generator using your pantry ingredients.",
};


const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700', '800', '900'], // Specify desired weights
  subsets: ['latin'], // Specify desired subsets
  display: 'swap', // Recommended for font loading optimization
  variable: '--font-montserrat', // Optional: Define a CSS variable for Tailwind CSS or global use
});

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montagu.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
