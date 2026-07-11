import React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Geist_Mono, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import BackButton from "@/components/BackButton";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollProgress from "@/components/ScrollProgress";
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
  metadataBase: new URL('https://balaraman-group.com'),
  title: "Balaraman Group | E. Balaraman (Ekambaram)",
  description: "Official website of the Balaraman Group, led by Dr. E. Balaraman (Ekambaram). Explore our research in catalysis, academic publications, patents, and lab gallery.",
  keywords: ["E. Balaraman", "Ekambaram", "ebalarama", "ekambaramam", "Balaraman Group", "Catalysis", "chemistry research", "IISER Tirupati"],
  authors: [{ name: "Dr. E. Balaraman" }],
  alternates: {
    canonical: 'https://balaraman-group.com',
  },
  openGraph: {
    title: "Balaraman Group | E. Balaraman (Ekambaram)",
    description: "Official website of the Balaraman Group, led by Dr. E. Balaraman (Ekambaram). Explore our research in catalysis, academic publications, patents, and lab gallery.",
    url: "https://balaraman-group.com",
    siteName: "Balaraman Group",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balaraman Group | E. Balaraman (Ekambaram)",
    description: "Official website of the Balaraman Group, led by Dr. E. Balaraman (Ekambaram). Explore our research in catalysis, academic publications, patents, and lab gallery.",
    images: ["/og-image.jpg"],
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
                "name": "E. Balaraman",
                "alternateName": ["Ekambaram", "Ebalarama", "Ekambaramam", "E Balaraman", "Balaraman E"],
                "url": "https://balaraman-group.com",
                "jobTitle": "Professor / Principal Investigator",
                "knowsAbout": ["Catalysis", "Chemistry", "Organic Synthesis"],
                "sameAs": [
                  "https://twitter.com/Raman_Lab",
                  "https://www.linkedin.com/in/ekambaram-balaraman-4a11293a/"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "ResearchOrganization",
                "name": "Balaraman Research Group",
                "alternateName": ["Raman's Research Lab", "E. Balaraman Lab", "IISER Tirupati Balaraman Lab"],
                "url": "https://balaraman-group.com",
                "logo": "https://balaraman-group.com/logo.webp",
                "parentOrganization": {
                  "@type": "CollegeOrUniversity",
                  "name": "Indian Institute of Science Education and Research (IISER) Tirupati",
                  "url": "https://www.iisertirupati.ac.in"
                },
                "member": {
                  "@type": "Person",
                  "name": "Dr. E. Balaraman",
                  "jobTitle": "Associate Professor",
                  "affiliation": "IISER Tirupati",
                  "sameAs": ["https://twitter.com/Raman_Lab", "https://www.linkedin.com/in/ekambaram-balaraman-4a11293a/"]
                },
                "description": "Research lab at IISER Tirupati specializing in catalysis, sustainable chemistry, C1 chemistry, and organometallic systems.",
                "knowsAbout": ["Catalysis", "Sustainable Chemistry", "Organometallic Chemistry", "C1 Chemistry"]
              }
            ])
          }}
        />
        <link rel="preload" as="image" type="image/webp" href="/images/Background/group-photo.webp" />
      </head>
      <body className="font-sans min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300 select-none" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
