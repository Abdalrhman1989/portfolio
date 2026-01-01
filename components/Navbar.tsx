"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Github, Linkedin, Instagram, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
                    Abd Alrhman<span className="text-primary">.</span>
                </Link>

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
                        <a href="https://github.com/Abdalrhman1989" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com/in/abd-alrhman-al-darra-45160911b" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Linkedin className="w-5 h-5" />
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
                                <a href="https://linkedin.com/in/abd-alrhman-al-darra-45160911b" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                                <a href="https://www.instagram.com/abdalrhman.darra" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                    <Instagram className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
