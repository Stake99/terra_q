import type { Metadata } from "next";
import { Architects_Daughter } from 'next/font/google';
import "./globals.css";
import { MotionConfigProvider } from "@/components/MotionConfigProvider";
import StructuredData from "@/components/StructuredData";

const architectsDaughter = Architects_Daughter({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-architects',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TerraQ | Geo-Data Management & Digital Mining Solutions",
  description: "South African geo-data management and digital mining solutions company. We help exploration and mining organisations secure, structure, and manage geological data effectively.",
  keywords: [
    "geo-data management",
    "digital mining solutions",
    "geological data management",
    "mining data governance",
    "exploration data systems",
    "mining technology",
    "data integration",
    "TerraQ",
    "South Africa mining"
  ],
  authors: [{ name: "TerraQ" }],
  creator: "TerraQ",
  publisher: "TerraQ",
  metadataBase: new URL('https://www.terraq.co.za'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TerraQ | Intelligence Beneath the Surface",
    description: "Geo-data management and digital mining solutions for exploration and mining organisations across South Africa.",
    type: "website",
    locale: "en_ZA",
    url: "https://www.terraq.co.za",
    siteName: "TerraQ",
    images: [
      {
        url: "/logo.jpeg",
        width: 1280,
        height: 853,
        alt: "TerraQ Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TerraQ | Intelligence Beneath the Surface",
    description: "Geo-data management and digital mining solutions",
    images: ["/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

// Configure static generation for optimal performance
export const dynamic = 'force-static';
export const revalidate = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpeg" />
        <StructuredData />
      </head>
      <body className={`${architectsDaughter.variable} antialiased`}>
        <MotionConfigProvider>
          {children}
        </MotionConfigProvider>
      </body>
    </html>
  );
}
