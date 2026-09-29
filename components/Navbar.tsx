"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Github, Linkedin, Download, Play, Film, Sparkles, ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useVideoModal } from "./VideoModalContext";
import { useCvModal } from "./CvModalContext";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Projects", href: "/#projects", count: "28" },
    { name: "Case Study", href: "/case-studies/elevate", isCaseStudy: true },
    { name: "Experience", href: "/#experience" },
    { name: "Showcase", href: "/#showcase" },
    { name: "Contact", href: "/#contact" },
];

const DiscordIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 127.14 96.36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14h0C129.58,52.87,121,29,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.43-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function Navbar() {
    const { openVideoModal } = useVideoModal();
    const { openCvModal } = useCvModal();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 transition-all duration-300 pointer-events-none">
            <div
                className={cn(
                    "max-w-7xl mx-auto rounded-2xl sm:rounded-full px-4 sm:px-5 py-2 flex items-center justify-between pointer-events-auto transition-all duration-300",
                    scrolled
                        ? "bg-background/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-border/80 dark:border-white/[0.12] shadow-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.08)_inset]"
                        : "bg-background/60 dark:bg-[#0a0a0a]/60 backdrop-blur-md border border-border/50 dark:border-white/[0.08] shadow-md dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                )}
            >
                {/* Brand Logo with Official Avatar Emblem */}
                <div className="flex items-center gap-3 shrink-0">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        {/* Branded Chat Avatar Image as Official Logo */}
                        <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-primary/50 shadow-[0_0_14px_rgba(20,184,166,0.35)] group-hover:scale-105 transition-transform shrink-0 bg-neutral-900">
                            <Image
                                src="/assets/chat-avatar.png"
                                alt="Abd Alrhman Logo"
                                width={36}
                                height={36}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                        <span className="font-extrabold tracking-tight text-foreground text-sm sm:text-base whitespace-nowrap">
                            Abd <span className="bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">Alrhman</span>
                            <span className="text-primary">.</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5",
                                link.isCaseStudy
                                    ? "text-primary hover:text-primary-foreground hover:bg-primary/20 bg-primary/10 border border-primary/30 font-semibold"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80 dark:hover:bg-white/[0.06]"
                            )}
                        >
                            <span>{link.name}</span>
                            {link.count && (
                                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-muted dark:bg-white/[0.08] text-foreground">
                                    {link.count}
                                </span>
                            )}
                            {link.isCaseStudy && (
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Right Action Group */}
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                    {/* Quick Showreel Button */}
                    <button
                        onClick={() => openVideoModal("portfolio")}
                        className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground transition-all font-semibold text-xs border border-primary/30 shadow-[0_0_15px_rgba(20,184,166,0.2)] cursor-pointer whitespace-nowrap group"
                        title="Watch Portfolio Showreel"
                    >
                        <Play className="w-3 h-3 fill-current group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Showreel</span>
                    </button>

                    {/* Multi-Language CV Button (EN, DA, AR) */}
                    <button
                        onClick={() => openCvModal()}
                        className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/70 hover:bg-muted dark:bg-white/[0.04] dark:hover:bg-white/[0.09] text-foreground transition-all font-medium text-xs border border-border/80 dark:border-white/[0.08] whitespace-nowrap cursor-pointer group"
                        title="View Resume / CV (English, Danish, Arabic)"
                    >
                        <FileText className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
                        <span>CV</span>
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-primary/10 text-primary font-bold">3L</span>
                    </button>

                    {/* Light / Dark Mode Toggle */}
                    <ThemeToggle />

                    {/* Social Links */}
                    <div className="hidden lg:flex items-center gap-1 pl-1 border-l border-border/60 dark:border-white/[0.08]">
                        <a
                            href="https://wa.me/4542223110"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-muted-foreground hover:text-[#25D366] transition-colors"
                            title="WhatsApp: 004542223110 (+45 42 22 31 10)"
                        >
                            <WhatsAppIcon className="w-4 h-4" />
                        </a>
                        <a
                            href="https://github.com/Abdalrhman1989"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                            title="GitHub Profile"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a
                            href="https://linkedin.com/in/abd-al-rhman-aldarra-8a24bb18b"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                            title="LinkedIn Profile"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                            href="https://discord.com/users/abdalrhmandarra"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                            title="Discord: abdalrhmandarra"
                        >
                            <DiscordIcon className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="lg:hidden p-2 text-foreground focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Navigation Menu"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl bg-card/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border border-border shadow-2xl p-4 pointer-events-auto"
                    >
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                                        link.isCaseStudy
                                            ? "text-primary bg-primary/10 border border-primary/20"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span>{link.name}</span>
                                    {link.count && (
                                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-muted text-muted-foreground">
                                            {link.count} Projects
                                        </span>
                                    )}
                                </Link>
                            ))}

                            <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-border">
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        openVideoModal("portfolio");
                                    }}
                                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 cursor-pointer"
                                >
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                    <span>Showreel</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        openVideoModal("resume");
                                    }}
                                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border font-bold text-xs cursor-pointer"
                                >
                                    <Film className="w-3.5 h-3.5 text-primary" />
                                    <span>Video Resume</span>
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    openCvModal();
                                }}
                                className="flex items-center justify-center gap-2 py-2.5 px-3 mt-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 text-xs font-semibold cursor-pointer"
                            >
                                <FileText className="w-3.5 h-3.5" />
                                <span>Download CV (English, Dansk, العربية)</span>
                            </button>

                            <div className="flex items-center justify-between pt-3 mt-2 border-t border-border px-1">
                                <span className="text-xs text-muted-foreground font-mono">Theme / Socials</span>
                                <div className="flex gap-4 items-center">
                                    <ThemeToggle />
                                    <a 
                                        href="https://wa.me/4542223110" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-[#25D366] hover:scale-110 transition-transform" 
                                        title="WhatsApp 004542223110"
                                    >
                                        <WhatsAppIcon className="w-5 h-5" />
                                    </a>
                                    <a href="https://github.com/Abdalrhman1989" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                        <Github className="w-5 h-5" />
                                    </a>
                                    <a href="https://linkedin.com/in/abd-al-rhman-aldarra-8a24bb18b" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            <a
                                href="https://wa.me/4542223110"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 py-2.5 px-3 mt-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/35 text-xs font-bold transition-all"
                            >
                                <WhatsAppIcon className="w-4 h-4 fill-current" />
                                <span>WhatsApp (+45 42 22 31 10)</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
