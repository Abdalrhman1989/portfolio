"use client";

import Link from "next/link";
import { ArrowRight, Download, Laptop, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import HeroScene from "./HeroScene";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* 3D Background Scene */}
            <HeroScene />

            <div className="container relative z-10 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-muted/50 border border-border text-sm text-muted-foreground mb-6 backdrop-blur-sm">
                        Based in Odense, Denmark 🇩🇰
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Hi, I'm <span className="text-primary">Abd Alrhman</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Web Developer & UI/UX Designer building scalable, user-focused digital products.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="#projects"
                            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 group"
                        >
                            View Projects
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#contact"
                            className="px-8 py-4 rounded-full bg-card border border-border hover:border-primary/50 text-foreground font-medium transition-all"
                        >
                            Contact Me
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-muted-foreground to-transparent" />
            </motion.div>
        </section>
    );
}
