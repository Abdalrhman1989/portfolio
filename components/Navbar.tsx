"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Github, Linkedin, Instagram, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Workflow", href: "#process" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
];

const DiscordIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 127.14 96.36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14h0C129.58,52.87,121,29,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.43-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString("en-GB", {
                timeZone: "Europe/Copenhagen",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            setTime(timeString);
        };
        const timer = setInterval(updateTime, 1000);
        updateTime();
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/40" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo & Time Group */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
                        Abd Alrhman<span className="text-primary">.</span>
                    </Link>
                    
                    <div className="hidden lg:flex flex-col border-l border-border/50 pl-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Odense, DK</span>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            <span className="text-xs font-mono font-bold tracking-tighter text-foreground/80">{time}</span>
                        </div>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex gap-4 items-center">
                        <a
                            href="/assets/resume.png"
                            target="_blank"
                            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all font-medium text-sm border border-primary/20"
                        >
                            <Download className="w-4 h-4" />
                            <span>View CV</span>
                        </a>
                        <div className="h-4 w-[1px] bg-border mx-2 hidden md:block" />
                        <a href="https://github.com/Abdalrhman1989" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="GitHub">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com/in/abd-al-rhman-aldarra-8a24bb18b" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="LinkedIn">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="https://discord.com/users/abdalrhmanaldarra" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" title="Discord: abdalrhmanaldarra">
                            <DiscordIcon className="w-5 h-5" />
                        </a>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border"
                    >
                        <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium py-2 border-b border-border/40 last:border-0"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex gap-6 py-4 justify-center">
                                <a href="https://github.com/Abdalrhman1989" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                    <Github className="w-6 h-6" />
                                </a>
                                <a href="https://linkedin.com/in/abd-al-rhman-aldarra-8a24bb18b" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                                <a href="https://www.instagram.com/abdalrhman.darra" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                    <Instagram className="w-6 h-6" />
                                </a>
                                <a href="https://discord.com/users/abdalrhmanaldarra" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" title="Discord: abdalrhmanaldarra">
                                    <DiscordIcon className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
