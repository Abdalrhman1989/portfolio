"use client";

import { motion } from "framer-motion";
import { Search, Palette, Code2, Rocket, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";

const steps = [
    {
        id: "01",
        title: "Discovery & Strategy",
        icon: <Search className="w-8 h-8" />,
        description: "In-depth research and strategic planning to define goals and understand user needs before any code is written.",
        color: "#3b82f6"
    },
    {
        id: "02",
        title: "Design & UX",
        icon: <Palette className="w-8 h-8" />,
        description: "Crafting a visual identity and user interface focusing on accessibility, branding, and high-conversion flows.",
        color: "#ec4899"
    },
    {
        id: "03",
        title: "Agile Development",
        icon: <Code2 className="w-8 h-8" />,
        description: "Iterative coding with focus on performance, scalability, and clean architecture using modern tech like Next.js.",
        color: "#8b5cf6"
    },
    {
        id: "04",
        title: "Quality Assurance",
        icon: <CheckCircle2 className="w-8 h-8" />,
        description: "Rigorous testing and optimization across multiple devices to ensure a seamless and bug-free user experience.",
        color: "#10b981"
    },
    {
        id: "05",
        title: "Launch & Growth",
        icon: <Rocket className="w-8 h-8" />,
        description: "Deployment and continuous optimization based on real-world data and user feedback for long-term project success.",
        color: "#f59e0b"
    },
    {
        id: "06",
        title: "Scale & Support",
        icon: <TrendingUp className="w-8 h-8" />,
        description: "Continuous monitoring, security updates, and performance scaling to ensure your product thrives long after the initial launch.",
        color: "#14b8a6"
    }
];

export default function Process() {
    return (
        <section id="process" className="py-32 bg-background/50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[200px]" />
            <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[200px]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-black uppercase tracking-[0.3em] text-sm block mb-4"
                    >
                        How I Work
                    </motion.span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 italic">
                        The <span className="text-primary not-italic">Creative</span> <br />Pipeline
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                        A systematic approach to building digital products from initial spark to final deployment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            whileHover={{ y: -12 }}
                            whileTap={{ scale: 0.97 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-card/40 border border-border/50 rounded-[50px] p-10 relative group hover:border-primary/40 transition-all flex flex-col justify-between h-[420px] cursor-pointer shadow-2xl backdrop-blur-md"
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-10">
                                    <span style={{ color: step.color }} className="text-xs font-black italic tracking-[0.4em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Phase {step.id}</span>
                                    <div style={{ backgroundColor: `${step.color}10`, color: step.color }} className="p-6 rounded-[30px] group-hover:bg-primary/20 transition-all duration-500 shadow-inner">
                                        {step.icon}
                                    </div>
                                </div>
                                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-6 leading-none group-hover:text-primary transition-colors">{step.title}</h3>
                                <p className="text-muted-foreground text-base leading-relaxed mb-6 group-hover:text-foreground transition-colors font-medium opacity-80">{step.description}</p>
                            </div>

                            <div className="relative mt-auto pt-8 border-t border-border/20 flex justify-between items-center group/btn overflow-hidden">
                                <div className="absolute top-0 left-0 w-4 h-[1px] bg-primary group-hover:w-full transition-all duration-700" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors">Protocol</span>
                                    <span className="text-sm uppercase font-black tracking-widest text-foreground">Initiate Stage</span>
                                </div>
                                <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Click Feedback Glow */}
                            <div className="absolute inset-0 bg-primary/0 group-active:bg-primary/5 transition-all rounded-[50px] pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
