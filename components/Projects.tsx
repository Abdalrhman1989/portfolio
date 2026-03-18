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
        title: "DeenPath",
        category: "Web App",
        image: "/assets/projects/deenpath.png",
        description: "A premium Islamic companion app featuring Quranic insights, Hadith, and prayer tools with a highly polished dashboard.",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
        links: { demo: "https://deenpath.vercel.app", github: "#" },
        badge: "Featured"
    },
    {
        id: 2,
        title: "ServixerSpace",
        category: "Agency",
        image: "/assets/projects/servixerspace.png",
        description: "Official website for a creative tech agency specializing in design, development, and film production.",
        tech: ["Next.js", "Framer Motion", "GSAP"],
        links: { demo: "https://servixerspace.com", github: "https://github.com/Abdalrhman1989/servixerspace.git" },
        badge: "Live"
    },
    {
        id: 3,
        title: "AirPlate",
        category: "Mobile",
        image: "/assets/projects/airplate.png",
        description: "Mobile application for drone tracking and monitoring data using Network/Direct Remote ID.",
        tech: ["Flutter", "Dart", "Firebase", "Maps API"],
        links: { demo: "https://apps.apple.com/dk/app/airplate/id6670435015?l=da", github: "#" },
        badge: "App Store"
    },
    {
        id: 4,
        title: "Elevate OS",
        category: "Marketing",
        image: "/assets/projects/elevateos.png",
        description: "A high-end marketing agency landing page for 'Elevate,' featuring personalized growth tools for businesses.",
        tech: ["React", "Custom CSS", "Performance Optimized"],
        links: { demo: "https://elevate-os-v1.vercel.app", github: "#" },
        badge: "Corporate"
    },
    {
        id: 5,
        title: "ExploreEase (Tawny)",
        category: "Booking",
        image: "/assets/projects/exploreease.png",
        description: "Smart travel and hotel booking platform with interactive map integration and seamless itinerary management.",
        tech: ["Next.js", "Firebase", "Tailwind"],
        links: { demo: "https://explore-ease-tawny.vercel.app", github: "https://github.com/Abdalrhman1989/ExploreEase.git" },
        badge: "Stable"
    },
    {
        id: 6,
        title: "uBreakWeFix",
        category: "Services",
        image: "/assets/projects/ubreakwefix.png",
        description: "A professional device repair service platform for phones, tablets, and computers across Denmark.",
        tech: ["React", "Tailwind", "Node.js"],
        links: { demo: "https://ubreakwefix.vercel.app", github: "#" },
        badge: "Commercial"
    },
    {
        id: 7,
        title: "Sud Event Decoration",
        category: "Agency",
        image: "/assets/projects/sud-decoration.png",
        description: "Elegant portfolio for a luxury event planning and decoration business, showcasing high-end floral and stage design.",
        tech: ["Next.js", "Framer Motion", "Tailwind"],
        links: { demo: "https://sud-event-decoration.vercel.app", github: "#" },
        badge: "Premium"
    },
    {
        id: 8,
        title: "Basmeh",
        category: "Social",
        image: "/assets/projects/basmeh.png",
        description: "A community-focused creative platform for sharing, discovering, and collaborating on innovative projects.",
        tech: ["React", "Custom Icons", "Shared State"],
        links: { demo: "https://basmeh-five.vercel.app", github: "#" },
        badge: "Community"
    },
    {
        id: 9,
        title: "Vavion",
        category: "3D Tools",
        image: "/assets/projects/vavion.png",
        description: "A 3D aviation logistics visualizer featuring real-time flight tracking and aircraft fleet management.",
        tech: ["Three.js", "React Three Fiber", "Logistics API"],
        links: { demo: "https://vavion.vercel.app", github: "#" },
        badge: "New"
    },
    {
        id: 10,
        title: "Amera Kraidi",
        category: "Portfolio",
        image: "/assets/projects/amera-kraidi.png",
        description: "Artistic fashion and textile design portfolio showcasing unique collections, sketches, and textures.",
        tech: ["Next.js", "Tailwind CSS", "GSAP"],
        links: { demo: "https://amera-kraidi.vercel.app", github: "#" },
        badge: "Design"
    },
    {
        id: 11,
        title: "Story Trip AI",
        category: "AI",
        image: "/assets/projects/storytrip.png",
        description: "AI-powered travel story generator that transforms your trip details into engaging narratives and journals.",
        tech: ["Next.js", "OpenAI API", "Framer Motion"],
        links: { demo: "https://story-trip-ai.vercel.app", github: "#" },
        badge: "AI Native"
    },
    {
        id: 12,
        title: "Zenith Apex Overdrive",
        category: "Game",
        image: null,
        description: "High-octane futuristic racing experience featuring cutting-edge graphics and intense competitive play.",
        tech: ["Next.js", "WebGL", "Framer Motion"],
        links: { demo: "https://zenith-apex-overdrive.vercel.app", github: "#" },
        badge: "High Performance"
    },
    {
        id: 13,
        title: "Triply",
        category: "Booking",
        image: null,
        description: "Smart travel itinerary planner with integrated booking features and interactive destination guides.",
        tech: ["Next.js", "Sanity.io", "Tailwind"],
        links: { demo: "https://triply-one-nu.vercel.app", github: "#" },
        badge: "Travel"
    },
    {
        id: 14,
        title: "Snake Neo",
        category: "Game",
        image: "/assets/projects/snakeneo.png",
        description: "A modern, arcade-style snake game with neon aesthetics, optimized for both mobile and web.",
        tech: ["React", "Canvas API", "Audio API"],
        links: { demo: "https://snake-neo-mobile.vercel.app", github: "#" },
        badge: "Arcade"
    },
    {
        id: 15,
        title: "Flux",
        category: "Blockchain",
        image: "/assets/projects/flux.png",
        description: "A Web3 platform integrated with Solana and Metaplex for advanced token and NFT management.",
        tech: ["Next.js", "Web3.js", "Solana SDK"],
        links: { demo: "https://flux-mauve-ten.vercel.app", github: "#" },
        badge: "Web3"
    },
    {
        id: 16,
        title: "Arcadeverse",
        category: "Social",
        image: "/assets/projects/arcadeverse.png",
        description: "A community gaming platform built for arcade enthusiasts and social gaming interactions.",
        tech: ["Next.js", "TypeScript", "Socket.io"],
        links: { demo: "https://aracdeverse-next.vercel.app", github: "#" },
        badge: "Community"
    },
    {
        id: 17,
        title: "Hover Drift",
        category: "Game",
        image: "/assets/projects/hoverdrift.png",
        description: "High-speed 3D hover-racing game with physics-based mechanics and competitive rankings.",
        tech: ["Three.js", "React", "Physics Engine"],
        links: { demo: "https://hover-drift.vercel.app", github: "#" },
        badge: "High Tech"
    },
    {
        id: 18,
        title: "Nexus Infinity Elite",
        category: "Dashboards",
        image: null,
        description: "Advanced infrastructure monitoring system with predictive analytics and high-density data visualization.",
        tech: ["Next.js", "Advanced Charts", "Real-time API"],
        links: { demo: "https://nexus-infinity-elite.vercel.app", github: "#" },
        badge: "Pro"
    },
    {
        id: 19,
        title: "Nexus Pro",
        category: "Dashboards",
        image: "/assets/projects/nexus.png",
        description: "Unified infrastructure control center for smart city management and resource monitoring.",
        tech: ["Next.js", "Data Viz", "IoT Integration"],
        links: { demo: "https://nexus-vert-gamma-96.vercel.app", github: "#" },
        badge: "System"
    },
    {
        id: 20,
        title: "Neon Drift",
        category: "Game",
        image: null,
        description: "Retro-futuristic driving experience featuring synthwave visuals and responsive 3D environments.",
        tech: ["Three.js", "React", "Shaders"],
        links: { demo: "https://neon-drift-pi.vercel.app", github: "#" },
        badge: "Visual"
    },
    {
        id: 21,
        title: "Neon Survivors",
        category: "Game",
        image: null,
        description: "Elite survival game set in a neon-drenched dystopia. High difficulty and addictive retro mechanics.",
        tech: ["Vite", "React", "Fast Canvas"],
        links: { demo: "https://neon-survivors-nine.vercel.app", github: "#" },
        badge: "Action"
    },
    {
        id: 22,
        title: "LinkFlow",
        category: "Web App",
        image: "/assets/projects/linkflow.png",
        description: "A modern, creator-focused link-in-bio platform with deep social integration and analytics.",
        tech: ["React", "Node.js", "PostgreSQL"],
        links: { demo: "https://linkflow-teal.vercel.app", github: "#" },
        badge: "Creator Tool"
    },
    {
        id: 23,
        title: "Trix Card Game",
        category: "Game",
        image: null,
        description: "Digital implementation of the popular Middle Eastern card game Trix, built with robust game logic.",
        tech: ["TypeScript", "State Management", "Game Logic"],
        links: { demo: "#", github: "https://github.com/Abdalrhman1989/Trix-Card-Game" },
        badge: "Logic"
    },
    {
        id: 24,
        title: "RESTAVO",
        category: "Services",
        image: null,
        description: "Complete restaurant operating system for table booking, order tracking, and inventory management.",
        tech: ["TypeScript", "Next.js", "Prisma"],
        links: { demo: "#", github: "https://github.com/Abdalrhman1989/RESTAVO" },
        badge: "B2B"
    },
    {
        id: 25,
        title: "CityForge",
        category: "3D Tools",
        image: null,
        description: "Blender add-on for procedural city generation, creating complex road networks and buildings with ease.",
        tech: ["Python", "Blender API", "Geometry Nodes"],
        links: { demo: "#", github: "https://github.com/Abdalrhman1989/-CityForge" },
        badge: "Open Source"
    },
    {
        id: 26,
        title: "Memory Sculptor",
        category: "AI",
        image: null,
        description: "Data-driven memory visualization tool that transforms cognitive training data into abstract 3D forms.",
        tech: ["Python", "AI", "Matplotlib"],
        links: { demo: "#", github: "https://github.com/Abdalrhman1989/memory-sculptor" },
        badge: "AI Research"
    },
    {
        id: 27,
        title: "Personal Portfolio",
        category: "Web App",
        image: "/assets/project-portfolio.png",
        description: "The very site you're exploring! A premium showcase of work using advanced web technologies.",
        tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
        links: { demo: "/", github: "https://github.com/Abdalrhman1989/portfolio" },
        badge: "Current"
    }
];

const filters = ["All", "Web App", "Agency", "Mobile", "Marketing", "Booking", "Services", "Game", "Blockchain", "Social", "AI", "Dashboards", "3D Tools", "Portfolio"];

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


                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-secondary/50">
                                            <Layers className="w-12 h-12 opacity-20 mb-2" />
                                            <span className="text-xs uppercase tracking-widest opacity-50 font-bold">{project.category}</span>
                                        </div>
                                    )}

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
