import type { Metadata } from "next";
import { Playfair_Display, Geist_Mono, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import BackButton from "@/components/BackButton";
import { ThemeProvider } from "@/components/ThemeProvider";
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
      className={`${playfair.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
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
        <link rel="preload" as="image" type="image/webp" href="/images/Background/group-photo.webp" fetchPriority="high" />
      </head>
      <body className="font-sans min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300 select-none" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="scroll-progress">
            <div className="scroll-progress-bar h-full w-full" id="scroll-bar" suppressHydrationWarning></div>
          </div>
          {children}
          <SpeedInsights />
          <Analytics />
          <BackButton />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Scroll Progress
                window.addEventListener('scroll', () => {
                  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                  const scrolled = (winScroll / height) * 100;
                  const scrollBar = document.getElementById('scroll-bar');
                  if (scrollBar) {
                    scrollBar.style.transform = 'scaleY(' + (scrolled / 100) + ')';
                  }
                });

                // Security: Disable Right Click
                document.addEventListener('contextmenu', event => event.preventDefault());

                // Security: Disable Image Dragging
                document.addEventListener('dragstart', event => {
                  if (event.target.tagName && event.target.tagName.toLowerCase() === 'img') {
                    event.preventDefault();
                  }
                });

                // Security: Disable Keyboard Shortcuts (Ctrl+C, Ctrl+U, Ctrl+S, etc.)
                document.addEventListener('keydown', event => {
                  if (event.ctrlKey || event.metaKey) {
                    if (['c', 'u', 's', 'p'].includes(event.key.toLowerCase())) {
                      event.preventDefault();
                    }
                  }
                });
              `
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
