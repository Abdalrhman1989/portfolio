"use client";

import { motion } from "framer-motion";
import { 
    Code2, 
    Palette, 
    Cpu, 
    Zap, 
    Database, 
    Layers, 
    Layout, 
    Server, 
    PenTool, 
    Smartphone, 
    Globe, 
    Terminal, 
    Figma, 
    Github 
} from "lucide-react";

const skills = [
    { name: "Next.js", icon: <Globe className="w-5 h-5" /> },
    { name: "React", icon: <Layout className="w-5 h-5" /> },
    { name: "TypeScript", icon: <Code2 className="w-5 h-5" /> },
    { name: "Three.js", icon: <Layers className="w-5 h-5" /> },
    { name: "Node.js", icon: <Terminal className="w-5 h-5" /> },
    { name: "Tailwind", icon: <Palette className="w-5 h-5" /> },
    { name: "Framer", icon: <Zap className="w-5 h-5" /> },
    { name: "Prisma", icon: <Database className="w-5 h-5" /> },
    { name: "PostgreSQL", icon: <Server className="w-5 h-5" /> },
    { name: "Figma", icon: <Figma className="w-5 h-5" /> },
];

export default function SkillsMarquee() {
    return (
        <section className="py-20 bg-card/10 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="flex overflow-hidden group">
                <motion.div
                    animate={{
                        x: [0, -1035],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                    className="flex whitespace-nowrap gap-8 py-4"
                >
                    {[...skills, ...skills, ...skills].map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 px-8 py-4 bg-muted/50 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors shadow-sm"
                        >
                            <span className="text-primary">{skill.icon}</span>
                            <span className="text-lg font-bold tracking-tight uppercase italic">{skill.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
