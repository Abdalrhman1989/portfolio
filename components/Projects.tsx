"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Layers, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Added Import

// Real Project Data from User
const projects = [
    {
        id: 1,
        title: "AirPlate",
        category: "Web App", // Categorized as Web App / Mobile
        image: "/assets/project-airplate.jpg",
        description: "Mobile application for drone tracking and monitoring data using Network/Direct Remote ID.",
        tech: ["Flutter", "Dart", "Mobile", "iOS"],
        links: { demo: "https://apps.apple.com/dk/app/airplate/id6670435015?l=da", github: "#" },
        badge: "App Store"
    },
    {
        id: 2,
        title: "uBreak WeFix",
        category: "eCommerce",
        image: "/assets/project-ubreak.jpg",
        description: "Developed a comprehensive WooCommerce platform for electronics repair and sales.",
        tech: ["WordPress", "WooCommerce", "PHP", "CSS3"],
        links: { demo: "https://ubreakwefix.dk/", github: "#" },
        badge: "Live Site"
    },
    {
        id: 3,
        title: "Vue Todo App",
        category: "Web App",
        image: "/assets/project-todo.jpg",
        description: "A clean and functional Todo application built with Vue.js.",
        tech: ["Vue.js", "JavaScript", "Local Storage"],
        links: { demo: "#", github: "https://github.com/Abdalrhman1989/vue-todo-app" },
        badge: "Open Source"
    },
    {
        id: 4,
        title: "ExploreEase",
        category: "Web App",
        image: "/assets/project-exploreease.jpg",
        description: "A travel platform designed to simplify trip planning and exploration.",
        tech: ["JavaScript", "Web API", "Frontend"],
        links: { demo: "https://letsexploreease.com/", github: "https://github.com/Abdalrhman1989/ExploreEase.git" },
        badge: null
    },
    {
        id: 5,
        title: "Geografisk Have",
        category: "Web App",
        image: "/assets/project-geografisk.jpg",
        description: "Interactive website for Geografisk Have, featuring event calendars and garden maps.",
        tech: ["HTML", "SCSS", "JavaScript"],
        links: { demo: "#", github: "https://github.com/Abdalrhman1989/Geografisk-Have-abd.git" },
        badge: null
    },
    {
        id: 6,
        title: "ServixerSpace",
        category: "SaaS",
        image: "/assets/project-servixer.jpg",
        description: "A service-oriented platform connecting providers with clients.",
        tech: ["React", "Node.js", "Full Stack"],
        links: { demo: "#", github: "https://github.com/Abdalrhman1989/servixerspace.git" },
        badge: null
    },
    {
        id: 7,
        title: "Triply",
        category: "SaaS",
        image: "/assets/project-triply.jpg",
        description: "A comprehensive management platform with admin dashboard, analytics, and user management.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS"],
        links: { demo: "https://triply-one-nu.vercel.app/", github: "#" },
        badge: "New"
    }
];

const filters = ["All", "eCommerce", "SaaS", "Web App", "Data Viz"];

export default function Projects() {
    const [filter, setFilter] = useState("All");

    const filteredProjects = projects.filter(
        (project) => filter === "All" || project.category === filter
    );

    return (
        <section id="projects" className="py-24 bg-card/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Featured <span className="text-primary">Projects</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        A selection of my recent work across different domains.
                    </p>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-background rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all flex flex-col h-full"
                            >
                                {/* Image Placeholder */}
                                <div className="relative h-48 w-full bg-muted overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center gap-4">
                                        {project.links.github !== "#" && (
                                            <Link href={project.links.github} target="_blank" className="p-3 bg-background rounded-full hover:text-primary transition-colors hover:scale-110" title="View Code">
                                                <Github className="w-5 h-5" />
                                            </Link>
                                        )}
                                        {project.links.demo !== "#" && (
                                            <Link href={project.links.demo} target="_blank" className="p-3 bg-background rounded-full hover:text-primary transition-colors hover:scale-110 text-primary" title="Live Demo">
                                                <ExternalLink className="w-5 h-5" />
                                            </Link>
                                        )}
                                    </div>

                                    {/* Fallback visual if no image */}
                                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-secondary/50">
                                        <Layers className="w-12 h-12 opacity-20 mb-2" />
                                        <span className="text-xs uppercase tracking-widest opacity-50 font-bold">{project.category}</span>
                                    </div>

                                    {project.badge && (
                                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded shadow-lg">
                                            {project.badge}
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{project.category}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground border border-border/50">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
