"use client";

import Link from "next/link";
import { ArrowRight, Play, Film, Smartphone, Globe, Code2, Layers, FileText } from "lucide-react";
import { motion } from "framer-motion";
import HeroScene from "./HeroScene";
import { useVideoModal } from "./VideoModalContext";
import { useCvModal } from "./CvModalContext";

const techBadges = [
    "Next.js 16",
    "Flutter & React Native",
    "TypeScript",
    "Python",
    "Node.js",
    "PostgreSQL & SQL",
    "iOS & Android"
];

const credibilityStats = [
    { label: "Production Projects", value: "28+", icon: Layers, desc: "Shipped & Live" },
    { label: "Mobile Applications", value: "App Store", icon: Smartphone, desc: "iOS & Android" },
    { label: "Full Stack Mastery", value: "Web & Cloud", icon: Globe, desc: "Modern Architecture" },
    { label: "Original Codebase", value: "100% Real", icon: Code2, desc: "Authentic Engineering" },
];

export default function Hero() {
    const { openVideoModal } = useVideoModal();
    const { openCvModal } = useCvModal();

    return (
        <section className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-background pt-28 pb-16 sm:py-32 transition-colors duration-300">
            {/* Subtle Studio Spotlight Glow - Clean & Diffused */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] sm:h-[420px] bg-gradient-to-tr from-primary/15 via-teal-500/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

            {/* Subtle Cybernetic Dot Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] opacity-[0.05] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none -z-10" />

            {/* 3D Background Scene (Clean Ambient Stars & Sparkles - Zero Intrusive Circles) */}
            <HeroScene />

            <div className="container relative z-10 px-4 sm:px-6 mx-auto text-center max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    {/* Status Pill Badge */}
                    <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-muted/60 dark:bg-white/[0.04] hover:bg-muted dark:hover:bg-white/[0.07] border border-border dark:border-white/[0.1] backdrop-blur-md shadow-sm mb-6 text-xs sm:text-sm font-medium text-foreground transition-all cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>Available for Full-Time Roles & Projects</span>
                        <span className="text-muted-foreground/40">•</span>
                        <span className="text-muted-foreground">Odense, Denmark 🇩🇰</span>
                    </div>

                    {/* Main Headline - Bold, Clean & Prestige */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground mb-3 sm:mb-4 leading-[1.1]">
                        Hi, I'm <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 dark:from-teal-300 dark:via-emerald-400 dark:to-cyan-300 bg-clip-text text-transparent">Abd Alrhman</span>
                    </h1>

                    {/* Role Title - Elegant & Balanced */}
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-muted-foreground tracking-tight mb-4 sm:mb-5">
                        Full-Stack Developer & Mobile Engineer
                    </h2>

                    {/* Concise Bio */}
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-7 leading-relaxed font-normal">
                        Architecting scalable web platforms, native iOS/Android mobile apps, and high-performance digital systems. 28+ production projects shipped with 100% authentic code.
                    </p>

                    {/* Core Tech Badges Strip */}
                    <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mb-8 max-w-2xl mx-auto">
                        {techBadges.map((badge) => (
                            <span
                                key={badge}
                                className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium bg-muted/60 dark:bg-white/[0.03] border border-border dark:border-white/[0.08] text-foreground hover:border-primary/50 transition-colors"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-3.5 justify-center items-center w-full mb-12">
                        {/* Primary Button */}
                        <Link
                            href="#projects"
                            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-primary to-emerald-400 text-primary-foreground font-bold text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 group shadow-[0_0_25px_rgba(20,184,166,0.3)] cursor-pointer"
                        >
                            <span>Explore 28+ Projects</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {/* Watch Portfolio Showreel Button */}
                        <button
                            onClick={() => openVideoModal("portfolio")}
                            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-muted/80 dark:bg-white/[0.05] hover:bg-muted dark:hover:bg-white/[0.09] border border-border dark:border-white/[0.12] text-foreground font-semibold text-sm transition-all flex items-center justify-center gap-2.5 group backdrop-blur-md cursor-pointer shadow-md"
                            aria-label="Watch Portfolio Showreel"
                        >
                            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Play className="w-3 h-3 fill-current translate-x-0.5" />
                            </span>
                            <span>Watch Showreel</span>
                        </button>

                        {/* Download CV Multi-Language Modal Button */}
                        <button
                            onClick={() => openCvModal()}
                            className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-semibold text-sm transition-all flex items-center justify-center gap-2 group backdrop-blur-md cursor-pointer"
                            aria-label="Download CV in 3 Languages"
                        >
                            <FileText className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                            <span>Download CV (3L)</span>
                        </button>

                        {/* Quick 50s Video Resume Button */}
                        <button
                            onClick={() => openVideoModal("resume")}
                            className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-muted/60 dark:bg-white/[0.03] hover:bg-muted dark:hover:bg-white/[0.08] border border-border dark:border-white/[0.08] text-muted-foreground hover:text-foreground font-medium text-sm transition-all flex items-center justify-center gap-2 group backdrop-blur-md cursor-pointer"
                            aria-label="Play 50s Video Resume"
                        >
                            <Film className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                            <span>50s Video Resume</span>
                        </button>

                        {/* Direct Contact Button */}
                        <Link
                            href="#contact"
                            className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground font-medium text-sm transition-all flex items-center justify-center"
                        >
                            Get in Touch
                        </Link>
                    </div>

                    {/* Credibility Stats Strip */}
                    <div className="w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-card/60 dark:bg-white/[0.02] border border-border dark:border-white/[0.06] backdrop-blur-md shadow-xl">
                        {credibilityStats.map((stat) => {
                            const IconComponent = stat.icon;
                            return (
                                <div
                                    key={stat.label}
                                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-background/50 dark:bg-white/[0.02] border border-border/50 dark:border-white/[0.04] hover:border-primary/30 transition-colors"
                                >
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <IconComponent className="w-3.5 h-3.5 text-primary" />
                                        <span className="text-base sm:text-lg font-black tracking-tight text-foreground">
                                            {stat.value}
                                        </span>
                                    </div>
                                    <span className="text-xs font-semibold text-foreground">{stat.label}</span>
                                    <span className="text-[10px] text-muted-foreground font-mono">{stat.desc}</span>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Animated Modern Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-12 flex flex-col items-center gap-2 text-muted-foreground text-xs"
            >
                <div className="w-5 h-9 rounded-full border border-border flex items-start justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">Scroll</span>
            </motion.div>
        </section>
    );
}
