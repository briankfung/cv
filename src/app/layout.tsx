import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { cvData } from "@/data/cv";
import { PERSONAL_SITE, SITE_URL } from "@/lib/seo/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const { profile } = cvData;

const title = `${profile.name} — Curriculum Vitae`;
const description = `${profile.credentials}. ${profile.headline}. Full curriculum vitae covering experience, publications, teaching, and product work in applied AI, clinical informatics, and health interoperability.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: title,
  authors: [{ name: profile.name, url: PERSONAL_SITE }],
  creator: profile.name,
  alternates: { canonical: "/" },
  keywords: [
    "Brian K. Fung",
    "curriculum vitae",
    "AI product",
    "clinical informatics",
    "FHIR",
    "health interoperability",
    "pharmacy informatics",
  ],
  openGraph: {
    type: "profile",
    firstName: "Brian",
    lastName: "Fung",
    url: SITE_URL,
    siteName: title,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  // Belt and braces: Search Console accepts either the file in public/ or this
  // tag, and keeping both means verification survives losing one of them.
  verification: {
    google: "4ppLHoYrkk3n8XK28PIErKpmfeL9q9E1C3tiVbYN4Xc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1726" },
  ],
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
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
