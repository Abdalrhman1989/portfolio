import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import ScrollProgress from "@/components/ScrollProgress";
import SupportChat from "@/components/SupportChat";
import { VideoProvider } from "@/components/VideoModalContext";
import { CvProvider } from "@/components/CvModalContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import PwaRegister from "@/components/PwaRegister";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-abdal-2026.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Abd Alrhman | Full-Stack Developer & Mobile Engineer — Odense, Denmark",
    template: "%s | Abd Alrhman",
  },
  description:
    "Portfolio of Abd Alrhman Talaat Alshaar Dit Darra — Senior Full-Stack Developer & Mobile App Engineer based in Odense, Denmark. Expert in Next.js, React, Flutter, TypeScript, Node.js, Python & 3D. Available for full-time roles & projects worldwide.",
  metadataBase: new URL(siteUrl),
  applicationName: "Abd Alrhman Portfolio",
  keywords: [
    "Abd Alrhman",
    "Abd Alrhman Darra",
    "Full Stack Developer Odense",
    "Software Engineer Denmark",
    "Mobile App Developer Denmark",
    "Flutter Developer Odense",
    "Next.js Developer Denmark",
    "React Developer Odense",
    "Frontend Developer Syddanmark",
    "iOS Android App Developer",
    "Python Developer Denmark",
    "Web Developer Odense",
    "Hire Developer Odense",
    "Freelance Developer Denmark",
    "Creative Technologist Denmark",
    "Blender 3D Artist Denmark",
    "Drone Videographer Odense",
    "Full-Stack Engineer Copenhagen",
    "Remote Developer Europe",
  ],
  authors: [{ name: "Abd Alrhman Talaat Alshaar Dit Darra", url: siteUrl }],
  creator: "Abd Alrhman Talaat Alshaar Dit Darra",
  publisher: "Abd Alrhman Talaat Alshaar Dit Darra",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Abd Alrhman",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Abd Alrhman | Full-Stack Developer & Mobile Engineer — Odense, Denmark",
    description:
      "Explore 28+ production projects, live mobile apps, enterprise case studies, cinematic showreels, and verified academic credentials of Abd Alrhman based in Odense, Denmark.",
    url: siteUrl,
    siteName: "Abd Alrhman Portfolio",
    images: [
      {
        url: "/assets/chat-avatar.png",
        width: 800,
        height: 800,
        alt: "Abd Alrhman — Full-Stack Developer & Mobile Engineer",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abd Alrhman | Full-Stack Developer & Mobile Engineer",
    description:
      "Full-Stack & Mobile App Developer in Odense, Denmark. Shipped 28+ production projects in Next.js, React, Flutter & Python.",
    images: ["/assets/chat-avatar.png"],
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
  other: {
    "geo.region": "DK-83",
    "geo.placename": "Odense, Denmark",
    "geo.position": "55.4038;10.4024",
    ICBM: "55.4038, 10.4024",
    "contact:phone_number": "+4542223110",
    "contact:email": "abdalrhmanaldarra@gmail.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#14b8a6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Abd Alrhman Talaat Alshaar Dit Darra",
      alternateName: ["Abd Alrhman", "Abd Darra", "Abdalrhman1989"],
      jobTitle: "Software Developer & Full-Stack Mobile App Developer",
      description:
        "Full-Stack Developer and Mobile App Engineer specializing in Next.js, React, Flutter, Dart, Python, and 3D systems in Odense, Denmark.",
      url: siteUrl,
      image: `${siteUrl}/assets/chat-avatar.png`,
      telephone: "+4542223110",
      email: "mailto:abdalrhmanaldarra@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Odense",
        addressRegion: "Syddanmark",
        postalCode: "5000",
        addressCountry: "DK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 55.4038,
        longitude: 10.4024,
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "UCL University College Denmark",
      },
      sameAs: [
        "https://github.com/Abdalrhman1989",
        "https://linkedin.com/in/abd-al-rhman-aldarra-8a24bb18b",
        "https://wa.me/4542223110",
        "https://discord.com/users/abdalrhmandarra",
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Flutter",
        "Dart",
        "Python",
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "Blender 3D",
        "Mobile App Development",
        "iOS Development",
        "Android Development",
        "Drone Videography",
        "UI/UX Architecture",
        "AI Agents",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Abd Alrhman Portfolio",
      description:
        "Official portfolio and engineering case studies of Abd Alrhman, Full-Stack Developer & Mobile Engineer in Odense, Denmark.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: "Abd Alrhman Profile",
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn(inter.className, "bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary relative")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <PwaRegister />
          <VideoProvider>
            <CvProvider>
              <ScrollProgress />
              <Background3D />
              <Navbar />
              {children}
              <SupportChat />
              <Footer />
            </CvProvider>
          </VideoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

