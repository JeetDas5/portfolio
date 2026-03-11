import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"



import "./globals.css";
// import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://jeetdas.site"),
  title: {
    default: "Jeet Das | Full Stack Developer",
    template: "%s | Jeet Das",
  },
  description:
    "Portfolio of Jeet Das, a full stack developer building modern web experiences with Next.js, React, and TypeScript.",
  applicationName: "Jeet Das Portfolio",
  keywords: [
    "Jeet Das",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Jeet Das", url: "http://jeetdas.site" }],
  creator: "Jeet Das",
  publisher: "Jeet Das",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://jeetdas.site",
    siteName: "Jeet Das Portfolio",
    title: "Jeet Das | Full Stack Developer",
    description:
      "Explore projects, experience, and technical expertise of Jeet Das.",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Jeet Das Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeet Das | Full Stack Developer",
    description:
      "Explore projects, experience, and technical expertise of Jeet Das.",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jeet Das",
  url: "http://jeetdas.site",
  jobTitle: "Full Stack Developer",
  sameAs: ["https://github.com/JeetDas5"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        > */}
          {children}
          <Analytics />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}