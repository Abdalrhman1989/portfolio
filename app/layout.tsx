import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abd Alrhman | Web Developer & UI/UX Designer",
  description: "Portfolio of Abd Alrhman Talaat Alshaar Dit Darra, a Web Developer & UI/UX Designer based in Odense, Denmark.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn(inter.className, "bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary")}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
