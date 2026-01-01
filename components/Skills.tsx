"use client";

import { motion } from "framer-motion";
import { Code, Server, Database, Palette, Cpu, Zap } from "lucide-react";

// Updated Skills Data
const skillGroups = [
    {
        title: "Frontend & UI",
        icon: <Palette className="w-5 h-5" />,
        skills: ["React", "Next.js", "Vue.js", "Nuxt", "Svelte", "Astro", "React Native", "TypeScript", "Tailwind CSS", "Figma"]
    },
    {
        title: "Backend & Core",
        icon: <Server className="w-5 h-5" />,
        skills: ["Node.js", "Express", "PHP", "C#", "Blazor", "Razor", ".NET", "Java", "REST APIs"]
    },
    {
        title: "Database & DevOps",
        icon: <Database className="w-5 h-5" />,
        skills: ["MySQL", "MongoDB", "PostgreSQL", "Docker", "Git/GitHub", "CI/CD", "Vercel"]
    },
    {
        title: "Multimedia Design", // Renamed from Creative & Media
        icon: <Zap className="w-5 h-5" />,
        skills: [
            "Adobe Premiere Pro",
            "Adobe After Effects",
            "Adobe InDesign", // Added
            "Adobe Animate", // Added
            "Photography",
            "Videography",
            "Drone Pilot",
            "AI Tools" // Added
        ]
    }
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 bg-card/20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Technical <span className="text-primary">Skills</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A versatile toolset bridging code, design, and multimedia production.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {skillGroups.map((group, index) => (
                        <motion.div
                            key={group.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="bg-background rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-colors shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    {group.icon}
                                </div>
                                <h3 className="text-xl font-bold">{group.title}</h3>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 rounded-lg bg-secondary/50 text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
