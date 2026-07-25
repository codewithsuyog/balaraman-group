import React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Geist_Mono, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import BackButton from "@/components/BackButton";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollProgress from "@/components/ScrollProgress";
import { FloatingPaths } from '@/components/ui/background-paths';
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = 'force-static';

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ebalaraman.com'),
  title: "Dr. Ekambaram Balaraman | Raman's Research Lab | IISER Tirupati",
  description: "Raman's Research Lab led by Dr. Ekambaram Balaraman at IISER Tirupati.",
  keywords: ["Dr. Ekambaram Balaraman", "Ekambaram Balaraman", "E. Balaraman", "Raman's Research Lab", "Catalysis", "Sustainable Chemistry", "C1 Chemistry", "Transition-metal organometallic systems", "IISER Tirupati"],
  authors: [{ name: "Dr. Ekambaram Balaraman" }],
  alternates: {
    canonical: 'https://www.ebalaraman.com',
  },
  openGraph: {
    title: "Dr. Ekambaram Balaraman | Raman's Research Lab | IISER Tirupati",
    description: "Raman's Research Lab led by Dr. Ekambaram Balaraman at IISER Tirupati.",
    url: 'https://www.ebalaraman.com',
    siteName: "Raman's Research Lab",
    images: [
      {
        url: '/pi-photo.webp',
        width: 800,
        height: 800,
        alt: "Dr. Ekambaram Balaraman - Associate Professor & Chair",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Ekambaram Balaraman | Raman's Research Lab | IISER Tirupati",
    description: "Raman's Research Lab led by Dr. Ekambaram Balaraman at IISER Tirupati.",
    images: ["/pi-photo.webp"],
  },
  icons: {
    apple: '/apple-touch-icon.png',
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
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Dr. Ekambaram Balaraman",
                "alternateName": ["Ekambaram Balaraman", "E. Balaraman", "Ekambaram", "Ebalarama", "E Balaraman", "Balaraman E"],
                "url": "https://www.ebalaraman.com",
                "image": "https://www.ebalaraman.com/pi-photo.webp",
                "jobTitle": "Associate Professor & Chair",
                "worksFor": {
                  "@type": "EducationalOrganization",
                  "name": "IISER Tirupati",
                  "url": "https://www.iisertirupati.ac.in"
                },
                "affiliation": {
                  "@type": "EducationalOrganization",
                  "name": "IISER Tirupati",
                  "url": "https://www.iisertirupati.ac.in"
                },
                "knowsAbout": ["Catalysis", "Sustainable Chemistry", "C1 Chemistry", "Transition-metal organometallic systems"],
                "sameAs": [
                  "https://scholar.google.com/citations?user=8slXPm4AAAAJ&hl=en",
                  "https://orcid.org/0000-0001-9248-2809",
                  "https://twitter.com/Raman_Lab",
                  "https://x.com/EbLabgroup",
                  "https://www.linkedin.com/in/ekambaram-balaraman-4a11293a/"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                "name": "Raman's Research Lab",
                "alternateName": ["Balaraman Research Group", "E. Balaraman Lab", "IISER Tirupati Balaraman Lab"],
                "url": "https://www.ebalaraman.com",
                "logo": "https://www.ebalaraman.com/logo.webp",
                "parentOrganization": {
                  "@type": "EducationalOrganization",
                  "name": "IISER Tirupati",
                  "url": "https://www.iisertirupati.ac.in"
                },
                "founder": {
                  "@type": "Person",
                  "name": "Dr. Ekambaram Balaraman"
                },
                "description": "Research lab at IISER Tirupati specializing in Catalysis, Sustainable Chemistry, C1 Chemistry, and Transition-metal organometallic systems.",
                "knowsAbout": ["Catalysis", "Sustainable Chemistry", "C1 Chemistry", "Transition-metal organometallic systems"]
              }
            ])
          }}
        />
        <link rel="preload" as="image" type="image/webp" href="/images/Background/group-photo.webp" />
      </head>
      <body className="font-sans min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300 select-none" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="contents">
            <div className="fixed inset-0 z-[-1] opacity-10 pointer-events-none overflow-hidden">
              <FloatingPaths position={1} />
              <FloatingPaths position={-1} />
            </div>
            <div className="scroll-progress">
              <div className="scroll-progress-bar h-full w-full" id="scroll-bar" suppressHydrationWarning></div>
            </div>
            {children}
            <React.Suspense fallback={null}>
              <SpeedInsights />
            </React.Suspense>
            <React.Suspense fallback={null}>
              <Analytics />
            </React.Suspense>
            <BackButton />
            <ScrollProgress />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
