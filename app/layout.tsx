import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background3D from "@/components/Background3D";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SupportChat from "@/components/SupportChat";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abd Alrhman | Software Developer & Full Stack Mobile App Developer",
  description: "Portfolio of Abd Alrhman Talaat Alshaar Dit Darra, a Software Developer & Full Stack Mobile App Developer based in Odense, Denmark.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn(inter.className, "bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary relative")}>
        <ScrollProgress />
        <Background3D />
        <CustomCursor />
        <Navbar />
        {children}
        <SupportChat />
        <Footer />
      </body>
    </html>
  );
}
