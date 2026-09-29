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
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abd Alrhman | Full-Stack Developer & Mobile Engineer",
  description: "Portfolio of Abd Alrhman Talaat Alshaar Dit Darra, a Full-Stack Developer & Mobile Engineer based in Odense, Denmark.",
  metadataBase: new URL("https://abdalrhmandarra.com"),
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/chat-avatar.png",
    apple: "/assets/chat-avatar.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Abd Darra",
  },
};

export const viewport: Viewport = {
  themeColor: "#14b8a6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn(inter.className, "bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary relative")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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
