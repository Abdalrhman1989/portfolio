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
    Smartphone, 
    Globe, 
    Terminal, 
    Binary,
    HardDrive,
    Flame
} from "lucide-react";

const skills = [
    { name: "Python", icon: <Terminal className="w-5 h-5 text-amber-400" /> },
    { name: "C# / .NET", icon: <Cpu className="w-5 h-5 text-purple-400" /> },
    { name: "C++ (CPP)", icon: <Binary className="w-5 h-5 text-blue-500" /> },
    { name: "Dart / Flutter", icon: <Smartphone className="w-5 h-5 text-sky-400" /> },
    { name: "SQL & PostgreSQL", icon: <Database className="w-5 h-5 text-indigo-400" /> },
    { name: "MySQL", icon: <HardDrive className="w-5 h-5 text-orange-400" /> },
    { name: "MongoDB", icon: <Database className="w-5 h-5 text-emerald-400" /> },
    { name: "Redis", icon: <Zap className="w-5 h-5 text-rose-500" /> },
    { name: "Firebase", icon: <Flame className="w-5 h-5 text-amber-500" /> },
    { name: "Next.js 16", icon: <Globe className="w-5 h-5 text-white" /> },
    { name: "React 19", icon: <Layout className="w-5 h-5 text-cyan-400" /> },
    { name: "TypeScript", icon: <Code2 className="w-5 h-5 text-blue-400" /> },
    { name: "Three.js & WebGL", icon: <Layers className="w-5 h-5 text-teal-400" /> },
    { name: "Node.js", icon: <Server className="w-5 h-5 text-green-400" /> },
    { name: "Tailwind CSS", icon: <Palette className="w-5 h-5 text-teal-400" /> },
];

export default function SkillsMarquee() {
    return (
        <section className="py-16 bg-muted/40 dark:bg-[#060709] overflow-hidden relative border-y border-border dark:border-white/[0.06]">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background dark:from-[#060709] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background dark:from-[#060709] to-transparent z-10 pointer-events-none" />
            
            <div className="flex overflow-hidden group">
                <motion.div
                    animate={{
                        x: [0, -1800],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 35,
                            ease: "linear",
                        },
                    }}
                    className="flex whitespace-nowrap gap-5 py-2"
                >
                    {[...skills, ...skills, ...skills].map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2.5 px-5 py-2.5 bg-card dark:bg-white/[0.03] hover:bg-muted dark:hover:bg-white/[0.07] rounded-2xl border border-border dark:border-white/[0.08] hover:border-primary/40 transition-colors shadow-sm cursor-default"
                        >
                            <span>{skill.icon}</span>
                            <span className="text-xs font-mono font-bold text-foreground dark:text-neutral-200 tracking-tight">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
