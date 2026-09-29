"use client";

import { motion } from "framer-motion";
import { Code, Server, Database, Palette, Cpu, Zap, Smartphone, Globe, Terminal, Binary } from "lucide-react";

// Comprehensive Production Skills Data
const skillGroups = [
    {
        title: "Programming Languages & Core",
        icon: <Terminal className="w-5 h-5 text-amber-400" />,
        skills: [
            "Python",
            "C# / .NET Core",
            "C++ (CPP)",
            "Dart",
            "TypeScript (Strict)",
            "JavaScript (ESNext)",
            "Node.js",
            "PHP / Laravel",
            "Java"
        ]
    },
    {
        title: "Databases & Data Architecture",
        icon: <Database className="w-5 h-5 text-indigo-400" />,
        skills: [
            "SQL",
            "PostgreSQL",
            "MySQL / MariaDB",
            "SQLite",
            "MongoDB (NoSQL)",
            "Redis (In-Memory)",
            "Firebase Firestore",
            "Prisma ORM",
            "Supabase / Neon"
        ]
    },
    {
        title: "Mobile & Full-Stack Web",
        icon: <Smartphone className="w-5 h-5 text-sky-400" />,
        skills: [
            "Flutter",
            "React Native",
            "iOS & Android",
            "Next.js 16",
            "React 19",
            "Three.js & WebGL",
            "Tailwind CSS v4",
            "Framer Motion",
            "REST & WebSockets"
        ]
    },
    {
        title: "Cloud, DevOps & Creative Media",
        icon: <Zap className="w-5 h-5 text-teal-400" />,
        skills: [
            "Docker",
            "Git / GitHub Actions",
            "Vercel Edge",
            "Firebase Cloud",
            "Adobe Premiere Pro",
            "Adobe After Effects",
            "Blender 3D CLI",
            "Drone Pilot (AirPlate)"
        ]
    }
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 bg-background dark:bg-[#07080b] relative overflow-hidden border-t border-border dark:border-white/[0.06]">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[130px] pointer-events-none -z-10" />

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold mb-4">
                        <Code className="w-3.5 h-3.5" />
                        <span className="uppercase tracking-widest text-[11px]">Comprehensive Tech Stack</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground dark:text-white mb-4">
                        Technical <span className="bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">Capabilities</span>
                    </h2>

                    <p className="text-muted-foreground dark:text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                        A versatile polyglot toolset spanning low-level systems (C++, C#, Python), cross-platform mobile (Dart & Flutter), relational & NoSQL databases, and full-stack cloud ecosystems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {skillGroups.map((group, index) => (
                        <motion.div
                            key={group.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="bg-card dark:bg-white/[0.03] hover:bg-muted/60 dark:hover:bg-white/[0.05] rounded-3xl p-6 sm:p-7 border border-border dark:border-white/[0.08] hover:border-primary/40 transition-all shadow-xl flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-2.5 rounded-2xl bg-muted dark:bg-white/[0.06] border border-border dark:border-white/[0.08]">
                                        {group.icon}
                                    </div>
                                    <h3 className="font-bold text-foreground dark:text-white text-base sm:text-lg tracking-tight">
                                        {group.title}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {group.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 rounded-xl text-xs font-mono font-medium bg-muted/60 dark:bg-white/[0.04] border border-border dark:border-white/[0.07] text-foreground dark:text-neutral-300 hover:text-primary dark:hover:text-white hover:border-primary/50 transition-colors cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
