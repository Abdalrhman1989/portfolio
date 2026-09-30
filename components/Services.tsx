"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Code2,
    Smartphone,
    Gamepad2,
    BrainCircuit,
    Wand2,
    Box,
    Layers,
    Camera,
    Film,
    Palette,
    ArrowUpRight,
    Play,
    CheckCircle2,
    Rocket,
    Send
} from "lucide-react";
import { useVideoModal } from "./VideoModalContext";

type CategoryFilter = "all" | "code" | "ai" | "media" | "design";

interface ServiceItem {
    id: string;
    number: string;
    title: string;
    category: "code" | "ai" | "media" | "design";
    categoryLabel: string;
    icon: any;
    badge: string;
    color: string;
    gradient: string;
    borderGlow: string;
    description: string;
    deliverables: string[];
    hasReel?: boolean;
}

const services: ServiceItem[] = [
    {
        id: "fullstack",
        number: "01",
        title: "Full-Stack Web Engineering",
        category: "code",
        categoryLabel: "Software",
        icon: Code2,
        badge: "Production Architecture",
        color: "#10b981",
        gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
        borderGlow: "hover:border-emerald-500/50",
        description: "Engineering scalable web platforms with Next.js 15, React, Node.js, and TypeScript. Robust backend APIs, PostgreSQL ACID pipelines, Stripe checkouts, and cloud deployments.",
        deliverables: ["Next.js 15 & React", "PostgreSQL & Prisma", "Stripe Checkout & Billing", "Scalable Serverless APIs"]
    },
    {
        id: "mobile",
        number: "02",
        title: "Mobile App Development",
        category: "code",
        categoryLabel: "Software",
        icon: Smartphone,
        badge: "App Store & Play Store",
        color: "#0ea5e9",
        gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
        borderGlow: "hover:border-sky-500/50",
        description: "Building responsive, cross-platform mobile apps with Flutter and Dart. Native hardware access, BLE drone telemetry scanners, offline SQLite sync, and smooth 60 FPS animations.",
        deliverables: ["Flutter & Dart", "iOS & Android Releases", "BLE & Hardware APIs", "Offline SQLite Database"]
    },
    {
        id: "game",
        number: "03",
        title: "Game Development & Real-Time Engines",
        category: "code",
        categoryLabel: "Software",
        icon: Gamepad2,
        badge: "60+ FPS Canvas & WebGL",
        color: "#f43f5e",
        gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
        borderGlow: "hover:border-rose-500/50",
        description: "Developing physics-driven 2D/3D games and interactive browser simulations. Custom game loops, collision math, particle systems, sprite animation, and hardware-accelerated canvas.",
        deliverables: ["HTML5 Canvas 60 FPS", "Custom Physics & Collisions", "WebGL Shaders", "State Machine Game Logic"]
    },
    {
        id: "ai-systems",
        number: "04",
        title: "AI Systems & Autonomous Agents",
        category: "ai",
        categoryLabel: "Artificial Intelligence",
        icon: BrainCircuit,
        badge: "Custom LLM Workflows",
        color: "#8b5cf6",
        gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
        borderGlow: "hover:border-purple-500/50",
        description: "Architecting autonomous AI agent networks, RAG pipelines over vector databases, multi-step tool calling, automated hardware diagnostics, and strict JSON schemas.",
        deliverables: ["LangChain & OpenAI", "Vector DB Embeddings", "Deterministic Schemas", "Autonomous Tool Agents"]
    },
    {
        id: "ai-video",
        number: "05",
        title: "AI Video & Generative Media",
        category: "ai",
        categoryLabel: "Artificial Intelligence",
        icon: Wand2,
        badge: "Next-Gen Generative Cinema",
        color: "#d946ef",
        gradient: "from-fuchsia-500/20 via-purple-500/10 to-transparent",
        borderGlow: "hover:border-fuchsia-500/50",
        description: "Harnessing cutting-edge generative AI models for hyper-realistic video generation, neural motion synthesis, AI upscaling, and creative commercial video storytelling.",
        deliverables: ["Generative Video Models", "Neural Motion Synthesis", "AI Upscaling (4K)", "Custom LoRA Pipelines"]
    },
    {
        id: "blender",
        number: "06",
        title: "3D Blender & Procedural Modeling",
        category: "design",
        categoryLabel: "3D & Motion",
        icon: Box,
        badge: "Cycles & Geometry Nodes",
        color: "#f59e0b",
        gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
        borderGlow: "hover:border-amber-500/50",
        description: "Creating photorealistic 3D assets, procedural geometry nodes (CityForge Blender add-on), architectural visualizations, lighting, and product mockups in Blender.",
        deliverables: ["Blender 3D & Python API", "Geometry Nodes Systems", "Cycles / Eevee Photorealism", "Procedural Mesh Generators"]
    },
    {
        id: "motion",
        number: "07",
        title: "Motion Graphics & Animation",
        category: "design",
        categoryLabel: "3D & Motion",
        icon: Layers,
        badge: "Cinema & Web Motion",
        color: "#14b8a6",
        gradient: "from-teal-500/20 via-emerald-500/10 to-transparent",
        borderGlow: "hover:border-teal-500/50",
        description: "Crafting fluid motion graphics, kinetic typography, 3D brand reveals, and Lottie web animations that captivate audiences and elevate brand identity.",
        deliverables: ["After Effects & Cinema 4D", "Kinetic Typography", "Spline 3D & Lottie", "Brand Motion Systems"]
    },
    {
        id: "videography",
        number: "08",
        title: "Videography, Drone & Aerial 4K",
        category: "media",
        categoryLabel: "Cinema & Video",
        icon: Camera,
        badge: "Certified 4K Drone Pilot",
        color: "#f97316",
        gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
        borderGlow: "hover:border-orange-500/50",
        description: "Professional cinematic camera operation and certified 4K aerial drone piloting. Capturing breathtaking commercial footage, real estate tours, and event narratives.",
        deliverables: ["4K Drone Aerial Pilot", "Sony & Blackmagic Cinema", "Dynamic Gimbal Tracking", "Commercial Production"],
        hasReel: true
    },
    {
        id: "film-editing",
        number: "09",
        title: "Film Editing & Post-Production",
        category: "media",
        categoryLabel: "Cinema & Video",
        icon: Film,
        badge: "DaVinci & Premiere Master",
        color: "#ef4444",
        gradient: "from-red-500/20 via-rose-500/10 to-transparent",
        borderGlow: "hover:border-red-500/50",
        description: "Comprehensive post-production editing in DaVinci Resolve and Premiere Pro. Precision pacing, multi-camera syncing, Hollywood-standard color grading, and sound design.",
        deliverables: ["DaVinci Resolve Color Grade", "Premiere Pro Master Cuts", "Sound Design & Foley", "Multi-Cam Syncing"],
        hasReel: true
    },
    {
        id: "uiux",
        number: "10",
        title: "UI/UX & Graphic Brand Identity",
        category: "design",
        categoryLabel: "3D & Motion",
        icon: Palette,
        badge: "Conversion-Focused Systems",
        color: "#6366f1",
        gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
        borderGlow: "hover:border-indigo-500/50",
        description: "Designing intuitive, high-converting digital interfaces in Figma. Comprehensive design systems, typography hierarchies, vector logos, and complete brand guidelines.",
        deliverables: ["Figma Design Systems", "Responsive UX Prototypes", "Vector Brand Identity", "Design Tokens & Handoff"]
    }
];

const categories: { id: CategoryFilter; label: string; count: number }[] = [
    { id: "all", label: "All Disciplines", count: 10 },
    { id: "code", label: "Software & Games", count: 3 },
    { id: "ai", label: "AI & Systems", count: 2 },
    { id: "media", label: "Videography & Cinema", count: 2 },
    { id: "design", label: "3D & Motion Design", count: 3 },
];

export default function Services() {
    const { openVideoModal } = useVideoModal();
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");

    const filteredServices = selectedCategory === "all"
        ? services
        : services.filter(s => s.category === selectedCategory);

    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="services" className="py-28 bg-background relative overflow-hidden border-t border-border dark:border-white/[0.08]">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 right-10 w-[550px] h-[450px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                {/* Header Title Section */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold mb-4 backdrop-blur-md shadow-sm">
                            <Layers className="w-3.5 h-3.5" />
                            <span className="uppercase tracking-widest text-[11px]">The Multidisciplinary Spectrum</span>
                        </div>

                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-foreground dark:text-white leading-[1.08] mb-5">
                            Elite Services & <br />
                            <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 dark:from-teal-400 dark:via-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                Creative Engineering
                            </span>
                        </h2>

                        <p className="text-muted-foreground dark:text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                            A rare fusion of high-precision software engineering, 60 FPS game mechanics, 3D Blender wizardry, autonomous AI integrations, and commercial 4K drone cinematography.
                        </p>
                    </motion.div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 mb-12">
                    {categories.map((cat) => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                                    isSelected
                                        ? "bg-primary text-primary-foreground font-bold shadow-[0_0_25px_rgba(20,184,166,0.35)] scale-102"
                                        : "bg-card dark:bg-white/[0.04] text-muted-foreground hover:text-foreground dark:text-neutral-300 dark:hover:text-white hover:bg-muted/80 dark:hover:bg-white/[0.08] border border-border dark:border-white/[0.08]"
                                }`}
                            >
                                <span>{cat.label}</span>
                                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                                    isSelected ? "bg-black/20 text-current" : "bg-muted dark:bg-white/[0.08] text-muted-foreground"
                                }`}>
                                    {cat.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Services Cards Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredServices.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                                <motion.div
                                    key={service.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.96, y: 15 }}
                                    transition={{ duration: 0.35, delay: index * 0.05 }}
                                    className={`group relative rounded-3xl bg-card dark:bg-[#0c0d14] border border-border dark:border-white/[0.1] p-6 sm:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default ${service.borderGlow}`}
                                >
                                    {/* Ambient Card Background Gradient */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10`}
                                    />

                                    <div>
                                        {/* Card Top Row: Number, Icon & Badge */}
                                        <div className="flex items-start justify-between gap-3 mb-5">
                                            {/* Layered Glowing Emblem */}
                                            <div className="relative">
                                                <div
                                                    className="absolute inset-0 rounded-2xl blur-md opacity-40 group-hover:opacity-80 transition-opacity"
                                                    style={{ backgroundColor: service.color }}
                                                />
                                                <div
                                                    className="relative w-12 h-12 rounded-2xl flex items-center justify-center border border-white/[0.15] bg-[#090b10] text-white shadow-md group-hover:scale-110 transition-transform duration-300"
                                                    style={{ color: service.color }}
                                                >
                                                    <IconComponent className="w-6 h-6" />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-muted dark:bg-white/[0.05] border border-border dark:border-white/[0.08] text-muted-foreground group-hover:text-foreground transition-colors">
                                                    {service.number}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Badge */}
                                        <div className="mb-2">
                                            <span
                                                className="text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-md inline-block"
                                                style={{ backgroundColor: `${service.color}15`, color: service.color }}
                                            >
                                                {service.badge}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground dark:text-white mb-3 group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-muted-foreground dark:text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                                            {service.description}
                                        </p>

                                        {/* Deliverables Checklist Chips */}
                                        <div className="space-y-1.5 mb-6">
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground dark:text-neutral-400 block font-semibold">
                                                Key Deliverables:
                                            </span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {service.deliverables.map((item, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-muted/60 dark:bg-white/[0.04] text-foreground dark:text-neutral-300 border border-border dark:border-white/[0.06] group-hover:border-primary/20 transition-colors"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footers */}
                                    <div className="pt-4 border-t border-border dark:border-white/[0.08] flex items-center justify-between">
                                        {service.hasReel ? (
                                            <button
                                                onClick={() => openVideoModal("portfolio")}
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer group/btn"
                                            >
                                                <Play className="w-3.5 h-3.5 fill-current" />
                                                <span>Watch 4K Showreel</span>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={scrollToContact}
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer group/btn"
                                            >
                                                <Send className="w-3.5 h-3.5" />
                                                <span>Inquire This Service</span>
                                            </button>
                                        )}

                                        <button
                                            onClick={scrollToContact}
                                            className="w-8 h-8 rounded-full bg-muted/60 dark:bg-white/[0.05] hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all flex items-center justify-center cursor-pointer group/arrow"
                                            title="Start a project"
                                        >
                                            <ArrowUpRight className="w-4 h-4 group-hover/arrow:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom Assurance Banner */}
                <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-card dark:bg-[#0c0d14] border border-border dark:border-white/[0.1] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 text-center md:text-left">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shrink-0">
                            <Rocket className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <h4 className="text-lg sm:text-xl font-bold text-foreground dark:text-white tracking-tight">
                                Have a customized multidisciplinary project in mind?
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground dark:text-neutral-400">
                                Combining full-stack engineering, AI automation, 3D graphics, or aerial cinema into one seamless solution.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={scrollToContact}
                        className="py-3 px-7 rounded-full bg-gradient-to-r from-primary to-emerald-400 text-primary-foreground font-extrabold text-sm hover:opacity-95 transition-all shadow-md shadow-primary/20 cursor-pointer whitespace-nowrap"
                    >
                        Start A Consultation
                    </button>
                </div>
            </div>
        </section>
    );
}
