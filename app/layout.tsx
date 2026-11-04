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
import { piStats } from "./data";

const statsLine = `${piStats.publications}+ publications, ${(Math.floor(piStats.citations / 100) * 100).toLocaleString("en-US")}+ citations.`;

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
  title: "Dr. Ekambaram Balaraman | Raman's Research Lab — IISER Tirupati",
  description: "Official website of Dr. Ekambaram Balaraman (E. Balaraman), Associate Professor & Chair, Department of Chemistry, IISER Tirupati. Leading research in organometallics, catalysis, sustainable chemistry, and C1 chemistry.",
  keywords: [
    "Dr. Ekambaram Balaraman", "Ekambaram Balaraman", "E. Balaraman",
    "E Balaraman", "Balaraman", "Dr. Balaraman",
    "Balaraman Group", "Raman Group", "Raman's Research Lab", "Raman's Group",
    "Balaraman Research Group", "E. Balaraman Lab", "EB Lab",
    "Catalysis", "Sustainable Chemistry", "C1 Chemistry",
    "Transition-metal organometallic systems", "IISER Tirupati",
    "IISER Tirupati Chemistry", "Organometallic Chemistry India",
    "Homogeneous Catalysis", "Heterogeneous Catalysis",
    "CRSI Bronze Medal", "Pincer Complexes"
  ],
  authors: [{ name: "Dr. Ekambaram Balaraman" }],
  alternates: {
    canonical: 'https://www.ebalaraman.com',
  },
  openGraph: {
    title: "Dr. Ekambaram Balaraman | Raman's Research Lab — IISER Tirupati",
    description: `Official website of Dr. Ekambaram Balaraman, leading research in organometallics, catalysis & sustainable chemistry at IISER Tirupati. ${statsLine}`,
    url: 'https://www.ebalaraman.com',
    siteName: "Raman's Research Lab",
    images: [
      {
        url: 'https://www.ebalaraman.com/pi-photo.webp',
        width: 1024,
        height: 619,
        alt: 'Dr. Ekambaram Balaraman - Associate Professor & Chair, IISER Tirupati',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Ekambaram Balaraman | Raman's Research Lab",
    description: `Organometallics, catalysis & sustainable chemistry at IISER Tirupati. ${statsLine}`,
    images: ["https://www.ebalaraman.com/pi-photo.webp"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
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
        <meta name="robots" content="max-image-preview:large" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://www.ebalaraman.com/#person",
                  "name": "Dr. Ekambaram Balaraman",
                  "alternateName": [
                    "Ekambaram Balaraman", "E. Balaraman", "Ekambaram",
                    "E Balaraman", "Balaraman E",
                    "Balaraman", "Dr. E. Balaraman", "Dr. Balaraman",
                    "Balaraman IISER", "E Balaraman IISER Tirupati"
                  ],
                  "url": "https://www.ebalaraman.com",
                  "image": {
                    "@type": "ImageObject",
                    "url": "https://www.ebalaraman.com/pi-photo.webp",
                    "width": 1024,
                    "height": 619,
                    "caption": "Dr. Ekambaram Balaraman - Associate Professor & Chair, IISER Tirupati"
                  },
                  "jobTitle": "Associate Professor & Chair, Department of Chemistry",
                  "honorificPrefix": "Dr.",
                  "worksFor": { "@id": "https://www.ebalaraman.com/#iiser" },
                  "affiliation": { "@id": "https://www.ebalaraman.com/#iiser" },
                  "memberOf": { "@id": "https://www.ebalaraman.com/#lab" },
                  "knowsAbout": [
                    "Catalysis", "Sustainable Chemistry", "C1 Chemistry",
                    "Transition-metal organometallic systems", "Homogeneous Catalysis",
                    "Heterogeneous Catalysis", "Organometallics", "C-H Activation",
                    "Hydrogenation", "Dehydrogenation", "Pincer Complexes"
                  ],
                  "hasCredential": [
                    { "@type": "EducationalOccupationalCredential", "credentialCategory": "award", "name": "CRSI Bronze Medal – Chemical Research Society of India" },
                    { "@type": "EducationalOccupationalCredential", "credentialCategory": "award", "name": "INSA Associate Fellowship (IAF) – 2026, Indian National Science Academy" },
                    { "@type": "EducationalOccupationalCredential", "credentialCategory": "award", "name": "RSC ChemComm Pioneering Investigators – Royal Society of Chemistry" }
                  ],
                  "alumniOf": [
                    { "@type": "EducationalOrganization", "name": "Weizmann Institute of Science, Israel" },
                    { "@type": "EducationalOrganization", "name": "National Chemical Laboratory (NCL), Pune" },
                    { "@type": "EducationalOrganization", "name": "University of Madras" }
                  ],
                  "sameAs": [
                    "https://scholar.google.com/citations?user=8slXPm4AAAAJ&hl=en",
                    "https://orcid.org/0000-0001-9248-2809",
                    "https://twitter.com/Raman_Lab",
                    "https://x.com/EbLabgroup",
                    "https://www.linkedin.com/in/ekambaram-balaraman-4a11293a/",
                    "https://www.iisertirupati.ac.in/faculty/chemistry/ekambaram-balaraman"
                  ]
                },
                {
                  "@type": ["ResearchOrganization", "EducationalOrganization"],
                  "@id": "https://www.ebalaraman.com/#lab",
                  "name": "Raman's Research Lab",
                  "alternateName": [
                    "Balaraman Research Group", "Balaraman Group", "Raman Group",
                    "Raman's Group", "E. Balaraman Lab", "IISER Tirupati Balaraman Lab",
                    "EB Lab", "Raman Lab IISER"
                  ],
                  "url": "https://www.ebalaraman.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.ebalaraman.com/logo.webp"
                  },
                  "parentOrganization": { "@id": "https://www.ebalaraman.com/#iiser" },
                  "founder": { "@id": "https://www.ebalaraman.com/#person" },
                  "description": "Research lab at IISER Tirupati led by Dr. Ekambaram Balaraman, specializing in organometallics, homogeneous & heterogeneous catalysis, sustainable chemistry, and C1 chemistry.",
                  "knowsAbout": [
                    "Catalysis", "Sustainable Chemistry", "C1 Chemistry",
                    "Transition-metal organometallic systems", "Green Chemistry",
                    "Hydrogen Generation", "CO2 Conversion"
                  ],
                  "numberOfEmployees": { "@type": "QuantitativeValue", "value": 20 }
                },
                {
                  "@type": "EducationalOrganization",
                  "@id": "https://www.ebalaraman.com/#iiser",
                  "name": "Indian Institute of Science Education and Research (IISER) Tirupati",
                  "alternateName": ["IISER Tirupati"],
                  "url": "https://www.iisertirupati.ac.in"
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.ebalaraman.com/#website",
                  "url": "https://www.ebalaraman.com",
                  "name": "Raman's Research Lab",
                  "description": "Official website of Dr. Ekambaram Balaraman's research group at IISER Tirupati",
                  "publisher": { "@id": "https://www.ebalaraman.com/#person" }
                },
                {
                  "@type": "ProfilePage",
                  "dateCreated": "2024-01-01",
                  "dateModified": "2026-07-27",
                  "mainEntity": { "@id": "https://www.ebalaraman.com/#person" }
                },
                {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.ebalaraman.com"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Research",
                      "item": "https://www.ebalaraman.com/research"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": "Publications",
                      "item": "https://www.ebalaraman.com/publications"
                    },
                    {
                      "@type": "ListItem",
                      "position": 4,
                      "name": "Team",
                      "item": "https://www.ebalaraman.com/team"
                    },
                    {
                      "@type": "ListItem",
                      "position": 5,
                      "name": "Patents",
                      "item": "https://www.ebalaraman.com/patents"
                    },
                    {
                      "@type": "ListItem",
                      "position": 6,
                      "name": "Gallery",
                      "item": "https://www.ebalaraman.com/gallery"
                    },
                    {
                      "@type": "ListItem",
                      "position": 7,
                      "name": "Alumni",
                      "item": "https://www.ebalaraman.com/alumni"
                    }
                  ]
                }
              ]
            })
          }}
        />
        <meta name="thumbnail" content="https://www.ebalaraman.com/pi-photo.webp" />
        <link rel="image_src" href="https://www.ebalaraman.com/pi-photo.webp" />
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
