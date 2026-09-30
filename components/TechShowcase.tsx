"use client";

import { motion } from "framer-motion";
import TechEcosystem from "./TechEcosystem";
import { Smartphone, Globe, Layers, Server, Code2, CheckCircle2 } from "lucide-react";

export default function TechShowcase() {
    return (
        <section id="tech-stack" className="py-28 bg-background dark:bg-[#07080b] relative overflow-hidden border-t border-border dark:border-white/[0.08]">
            {/* Ambient Background Lighting */}
            <div className="absolute top-1/3 left-10 w-[500px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                    {/* Left: Text & Key Pillars */}
                    <div className="w-full lg:w-5/12 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -25 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold mb-6 backdrop-blur-md">
                                <Code2 className="w-3.5 h-3.5" />
                                <span className="uppercase tracking-widest text-[11px]">The Technical Frontier</span>
                            </div>

                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-foreground dark:text-white leading-[1.05] mb-6">
                                Modern <br />
                                <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 dark:from-teal-400 dark:via-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                    Tech Stack
                                </span>
                            </h2>

                            <p className="text-muted-foreground dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                                A battle-tested engineering stack refined across <strong className="text-foreground dark:text-white font-semibold">28+ production projects</strong>. From high-performance mobile apps on the App Store to scalable enterprise backends and interactive 3D WebGL experiences.
                            </p>

                            {/* 4 Core Pillars */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                                {[
                                    {
                                        name: "Next.js 16 & React",
                                        cat: "Full-Stack Web",
                                        icon: Globe,
                                        color: "text-emerald-500 dark:text-emerald-400",
                                        bg: "bg-emerald-500/10 border-emerald-500/20"
                                    },
                                    {
                                        name: "Flutter & React Native",
                                        cat: "Mobile Engineering",
                                        icon: Smartphone,
                                        color: "text-sky-500 dark:text-sky-400",
                                        bg: "bg-sky-500/10 border-sky-500/20"
                                    },
                                    {
                                        name: "Node.js & Postgres",
                                        cat: "Cloud & Database",
                                        icon: Server,
                                        color: "text-indigo-400",
                                        bg: "bg-indigo-500/10 border-indigo-500/20"
                                    },
                                    {
                                        name: "Three.js & WebGL",
                                        cat: "Interactive 3D",
                                        icon: Layers,
                                        color: "text-amber-400",
                                        bg: "bg-amber-500/10 border-amber-500/20"
                                    }
                                ].map((item, idx) => {
                                    const IconComp = item.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] flex items-center gap-3 transition-colors"
                                        >
                                            <div className={`p-2.5 rounded-xl border ${item.bg} ${item.color} shrink-0`}>
                                                <IconComp className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-sm tracking-tight">
                                                    {item.name}
                                                </h4>
                                                <p className="text-[11px] text-neutral-400 font-mono">
                                                    {item.cat}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                <span>Zero placeholders • 100% authentic production code</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Interactive Tech Architecture Hub */}
                    <div className="w-full lg:w-7/12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                        >
                            <TechEcosystem />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
