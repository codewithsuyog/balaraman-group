import type { Metadata } from "next";
import { Outfit, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Raman's Research Lab | IISER Tirupati",
  description: "Official website of Raman's Research Lab at IISER Tirupati. Pioneering research in catalysis, organometallic chemistry, asymmetric synthesis, and sustainability.",
  keywords: ["Raman's Research Lab", "Prof. E. Balaraman", "IISER Tirupati", "Chemistry Research", "Catalysis", "Sustainable Chemistry", "Organometallic Chemistry"],
  authors: [{ name: "Raman's Research Lab" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
