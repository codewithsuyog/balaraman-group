import type { Metadata } from "next";
import { Outfit, Geist_Mono, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL('https://balaramanlab.com'),
  title: "Raman's Research Lab | IISER Tirupati",
  description: "Official website of Raman's Research Lab at IISER Tirupati. Pioneering research in catalysis, sustainable chemistry, and organometallic systems.",
  keywords: ["Raman's Research Lab", "Prof. E. Balaraman", "IISER Tirupati", "Chemistry Research", "Catalysis", "Sustainable Chemistry", "Organometallic Chemistry"],
  authors: [{ name: "Dr. E. Balaraman" }],
  openGraph: {
    title: "Raman's Research Lab | IISER Tirupati",
    description: "Pioneering research in catalysis and sustainability at IISER Tirupati.",
    url: "https://balaramanlab.com",
    siteName: "Raman's Research Lab",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raman's Research Lab | IISER Tirupati",
    description: "Pioneering research in catalysis and sustainability at IISER Tirupati.",
    images: ["/og-image.jpg"],
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
      className={`${outfit.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Raman's Research Lab",
              "url": "https://balaramanlab.com",
              "logo": "https://balaramanlab.com/logo.png",
              "parentOrganization": {
                "@type": "CollegeOrUniversity",
                "name": "IISER Tirupati"
              },
              "description": "Research lab specializing in Catalysis and Sustainable Chemistry."
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <div className="scroll-progress">
          <div className="scroll-progress-bar h-full w-full" id="scroll-bar" suppressHydrationWarning></div>
        </div>
        {children}
        <SpeedInsights />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('scroll', () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                const scrollBar = document.getElementById('scroll-bar');
                if (scrollBar) {
                  scrollBar.style.transform = 'scaleY(' + (scrolled / 100) + ')';
                }
              });
            `
          }}
        />
      </body>
    </html>
  );
}
