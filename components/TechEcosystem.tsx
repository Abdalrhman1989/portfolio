"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Smartphone, Globe, Database, Cpu, Sparkles, Layers, 
    Code2, Terminal, ExternalLink, CheckCircle2, Zap, ArrowRight,
    Server, Box, ShieldCheck, Flame, GitBranch, Binary, HardDrive
} from "lucide-react";

interface TechItem {
    id: string;
    name: string;
    category: "languages" | "databases" | "mobile" | "frontend" | "3d";
    level: string;
    experience: string;
    desc: string;
    projects: string[];
    icon: any;
    color: string;
    glowColor: string;
    tags: string[];
}

const techItems: TechItem[] = [
    // --- LANGUAGES & SYSTEMS ---
    {
        id: "python",
        name: "Python",
        category: "languages",
        level: "AI & Automation",
        experience: "4+ Years",
        desc: "Advanced scripting, automation pipelines, machine learning algorithms, and procedural 3D generation with Blender API.",
        projects: ["CityForge (Blender CLI)", "Memory Sculptor (AI Visualization)"],
        icon: Terminal,
        color: "text-amber-400",
        glowColor: "rgba(251, 191, 36, 0.25)",
        tags: ["FastAPI", "Automation", "Data Modeling", "Blender CLI"]
    },
    {
        id: "csharp",
        name: "C# & .NET",
        category: "languages",
        level: "Enterprise Core",
        experience: "4+ Years",
        desc: "Robust object-oriented systems, ASP.NET Core web APIs, Blazor components, and multi-threaded enterprise application logic.",
        projects: ["Enterprise Backends", "High-Reliability APIs"],
        icon: Cpu,
        color: "text-purple-400",
        glowColor: "rgba(192, 132, 252, 0.25)",
        tags: [".NET Core", "ASP.NET", "Entity Framework", "OOP Architecture"]
    },
    {
        id: "cpp",
        name: "C++ (CPP)",
        category: "languages",
        level: "Systems & Engines",
        experience: "3+ Years",
        desc: "Low-level memory management, high-performance computing, data structures, algorithms, and native performance execution.",
        projects: ["Systems Engineering", "Performance Algorithms", "Game Architecture"],
        icon: Binary,
        color: "text-blue-500",
        glowColor: "rgba(59, 130, 246, 0.25)",
        tags: ["Memory Management", "Algorithms", "Data Structures", "Native Speed"]
    },
    {
        id: "dart",
        name: "Dart & Flutter",
        category: "mobile",
        level: "Production Mobile",
        experience: "4+ Years",
        desc: "High-performance cross-platform mobile apps for iOS and Android with native Bluetooth, GPS, and custom radar pipelines.",
        projects: ["AirPlate (Live App Store)", "RESTAVO Mobile"],
        icon: Smartphone,
        color: "text-sky-400",
        glowColor: "rgba(56, 189, 248, 0.25)",
        tags: ["iOS & Android", "Direct Remote ID", "Native Bridges", "Maps API"]
    },
    {
        id: "typescript",
        name: "TypeScript (Strict)",
        category: "languages",
        level: "Mastery",
        experience: "5+ Years",
        desc: "End-to-end type safety across client, server, and database schemas with zero runtime type surprises.",
        projects: ["All 28 Portfolio Repositories"],
        icon: Code2,
        color: "text-blue-400",
        glowColor: "rgba(96, 165, 250, 0.25)",
        tags: ["Strict Mode", "Generics", "Zod Validation", "Full-Stack Types"]
    },

    // --- DATABASES & DATA SYSTEMS ---
    {
        id: "postgresql",
        name: "SQL & PostgreSQL",
        category: "databases",
        level: "Relational Architecture",
        experience: "5+ Years",
        desc: "Complex relational queries, indexing, ACID transactions, stored procedures, and Prisma/TypeORM schema migrations.",
        projects: ["REPAIRO", "Elevate Suite", "LinkFlow"],
        icon: Database,
        color: "text-indigo-400",
        glowColor: "rgba(129, 140, 248, 0.25)",
        tags: ["PostgreSQL", "Complex SQL", "Prisma ORM", "Supabase / Neon", "ACID"]
    },
    {
        id: "mysql",
        name: "MySQL & MariaDB",
        category: "databases",
        level: "Enterprise SQL",
        experience: "5+ Years",
        desc: "High-scale relational database modeling, foreign key constraints, normalized schemas, and transactional data integrity.",
        projects: ["RESTAVO Database", "Booking & E-Commerce"],
        icon: HardDrive,
        color: "text-orange-400",
        glowColor: "rgba(251, 146, 60, 0.25)",
        tags: ["MySQL 8.0", "Transactions", "Relational Schemas", "Query Tuning"]
    },
    {
        id: "mongodb",
        name: "MongoDB & NoSQL",
        category: "databases",
        level: "Document Store",
        experience: "4+ Years",
        desc: "Flexible JSON document schemas, aggregation pipelines, indexes, and scalable distributed storage.",
        projects: ["ServixerSpace", "Arcadeverse Platform"],
        icon: Database,
        color: "text-emerald-500",
        glowColor: "rgba(16, 185, 129, 0.25)",
        tags: ["Mongoose", "Aggregation Pipeline", "BSON", "Distributed Stores"]
    },
    {
        id: "redis",
        name: "Redis",
        category: "databases",
        level: "In-Memory Caching",
        experience: "3+ Years",
        desc: "Ultra-low-latency in-memory data store for caching, session stores, rate-limiting, and Pub/Sub message queues.",
        projects: ["Flux (Web3 Exchange)", "Real-time Telemetry"],
        icon: Zap,
        color: "text-rose-500",
        glowColor: "rgba(244, 63, 94, 0.25)",
        tags: ["Key-Value Caching", "Pub/Sub", "Rate Limiting", "Sub-millisecond"]
    },
    {
        id: "sqlite",
        name: "SQLite",
        category: "databases",
        level: "Embedded Database",
        experience: "4+ Years",
        desc: "Serverless, zero-configuration relational database engine for offline-first mobile apps and local desktop data storage.",
        projects: ["AirPlate Offline Radar Logs", "Mobile Local Sync"],
        icon: Database,
        color: "text-cyan-300",
        glowColor: "rgba(103, 232, 249, 0.25)",
        tags: ["Embedded SQL", "Offline-First", "Mobile Sync", "Zero-Config"]
    },
    {
        id: "firebase",
        name: "Firebase & Firestore",
        category: "databases",
        level: "Cloud Database",
        experience: "4+ Years",
        desc: "Cloud Firestore, real-time snapshot listeners, authentication rules, Cloud Storage, and push notifications.",
        projects: ["AirPlate", "ExploreEase", "DeenPath"],
        icon: Flame,
        color: "text-amber-500",
        glowColor: "rgba(245, 158, 11, 0.25)",
        tags: ["Cloud Firestore", "Real-Time Listeners", "Security Rules", "FCM Push"]
    },

    // --- WEB, 3D & CORE ---
    {
        id: "nextjs",
        name: "Next.js 16 & React 19",
        category: "frontend",
        level: "Production Core",
        experience: "5+ Years",
        desc: "Server Components, App Router, Server Actions, Edge Runtime, and high-performance hybrid rendering architectures.",
        projects: ["Elevate OS", "REPAIRO", "DeenPath", "ExploreEase"],
        icon: Globe,
        color: "text-white",
        glowColor: "rgba(255, 255, 255, 0.25)",
        tags: ["Next.js 16", "React 19", "Server Actions", "Edge Runtime"]
    },
    {
        id: "node",
        name: "Node.js & Express",
        category: "languages",
        level: "Production Core",
        experience: "5+ Years",
        desc: "Scalable asynchronous backend services, RESTful API design, microservices, authentication pipelines, and WebSockets.",
        projects: ["REPAIRO Backend", "Arcadeverse", "LinkFlow"],
        icon: Server,
        color: "text-emerald-400",
        glowColor: "rgba(52, 211, 153, 0.25)",
        tags: ["REST APIs", "WebSockets", "Microservices", "JWT Auth"]
    },
    {
        id: "threejs",
        name: "Three.js & WebGL",
        category: "3d",
        level: "Advanced 3D",
        experience: "3+ Years",
        desc: "Interactive 3D graphics, procedural mesh generation, custom GLSL shaders, and hardware-accelerated animations.",
        projects: ["Zenith Apex", "Hover Drift", "Neon Drift", "CityForge"],
        icon: Layers,
        color: "text-teal-400",
        glowColor: "rgba(45, 212, 191, 0.25)",
        tags: ["GLSL Shaders", "R3F / Drei", "Blender CLI", "Canvas Engine"]
    }
];

const categories = [
    { id: "all", label: "All Stack" },
    { id: "languages", label: "Languages (Python, C#, C++, TS, Node)" },
    { id: "databases", label: "Databases (PostgreSQL, MySQL, Mongo, Redis, SQLite)" },
    { id: "mobile", label: "Mobile (Dart / Flutter, React Native)" },
    { id: "frontend", label: "Web & UI (Next.js 16, React)" },
    { id: "3d", label: "3D & Creative (Three.js, WebGL)" }
];

export default function TechEcosystem() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [activeTechId, setActiveTechId] = useState<string>("python");

    const filteredTech = selectedCategory === "all" 
        ? techItems 
        : techItems.filter(item => item.category === selectedCategory);

    const activeTech = techItems.find(t => t.id === activeTechId) || filteredTech[0] || techItems[0];

    return (
        <div className="w-full rounded-3xl bg-card dark:bg-[#090a0f] border border-border dark:border-white/[0.1] p-4 sm:p-6 shadow-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.06)_inset] relative overflow-hidden">
            {/* Ambient Background Lighting */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            {/* Terminal Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-border dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 mr-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground dark:text-neutral-300 font-semibold tracking-tight">
                        polyglot_architecture.tsx
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                        14+ Enterprise Technologies
                    </span>
                </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            setSelectedCategory(cat.id);
                            // Auto select first item in that category
                            const match = cat.id === "all" ? techItems[0] : techItems.find(t => t.category === cat.id);
                            if (match) setActiveTechId(match.id);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                            selectedCategory === cat.id
                                ? "bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                                : "bg-muted dark:bg-white/[0.04] text-muted-foreground dark:text-neutral-400 hover:text-foreground dark:hover:text-white hover:bg-muted/80 dark:hover:bg-white/[0.08] border border-border dark:border-white/[0.06]"
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Main Content Layout: Grid of Tech Cards + Active Detail Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Tech Cards Grid */}
                <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                    {filteredTech.map(item => {
                        const IconComponent = item.icon;
                        const isSelected = item.id === activeTechId;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTechId(item.id)}
                                className={`p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer relative group flex flex-col justify-between ${
                                    isSelected
                                        ? "bg-primary/10 border-2 border-primary shadow-[0_0_20px_rgba(20,184,166,0.25)]"
                                        : "bg-muted/50 dark:bg-white/[0.03] hover:bg-muted dark:hover:bg-white/[0.06] border border-border dark:border-white/[0.07]"
                                }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className={`p-2 rounded-xl bg-muted dark:bg-white/[0.06] ${item.color} group-hover:scale-110 transition-transform`}>
                                        <IconComponent className="w-4 h-4" />
                                    </div>
                                    <span className="text-[9px] font-mono text-muted-foreground dark:text-neutral-400 bg-muted/60 dark:bg-white/[0.04] px-1.5 py-0.5 rounded border border-border dark:border-white/[0.05]">
                                        {item.experience}
                                    </span>
                                </div>

                                <div>
                                    <h4 className="font-bold text-foreground dark:text-white text-xs tracking-tight mb-0.5 truncate">
                                        {item.name}
                                    </h4>
                                    <p className="text-[10px] text-muted-foreground dark:text-neutral-400 font-mono truncate">
                                        {item.level}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Active Tech Spotlight Deep-Dive Card */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-muted/30 dark:bg-white/[0.03] border border-border dark:border-white/[0.08] flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-3 rounded-2xl bg-muted dark:bg-white/[0.06] ${activeTech.color} shadow-lg`}>
                                <activeTech.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                                    {activeTech.category.toUpperCase()} ARCHITECTURE
                                </span>
                                <h3 className="text-lg font-black text-foreground dark:text-white tracking-tight">
                                    {activeTech.name}
                                </h3>
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground dark:text-neutral-300 mb-4 leading-relaxed font-normal">
                            {activeTech.desc}
                        </p>

                        <div className="mb-4">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground dark:text-neutral-400 block mb-1.5 font-semibold">
                                Shipped in Real Projects:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {activeTech.projects.map((proj, i) => (
                                    <span
                                        key={i}
                                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-primary/10 border border-primary/25 text-primary"
                                    >
                                        {proj}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground dark:text-neutral-400 block mb-1.5 font-semibold">
                                Architecture Capabilities:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {activeTech.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted/60 dark:bg-white/[0.04] text-foreground dark:text-neutral-300 border border-border dark:border-white/[0.06]"
                                    >
                                        ✓ {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border dark:border-white/[0.08] flex items-center justify-between text-[11px] text-muted-foreground dark:text-neutral-400 font-mono">
                        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Production Code</span>
                        </span>
                        <span className="text-muted-foreground/80 dark:text-neutral-500 font-mono">{activeTech.level}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Summary Strip: Comprehensive Database & Systems Proof */}
            <div className="mt-5 pt-4 border-t border-border dark:border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-muted/40 dark:bg-white/[0.02]">
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">Python & C# & C++</span>
                    <span className="block text-[10px] text-muted-foreground dark:text-neutral-400 uppercase font-mono">Systems & AI Core</span>
                </div>
                <div className="p-2 rounded-xl bg-muted/40 dark:bg-white/[0.02]">
                    <span className="font-mono font-bold text-sky-600 dark:text-sky-400 text-sm">Dart & Flutter</span>
                    <span className="block text-[10px] text-muted-foreground dark:text-neutral-400 uppercase font-mono">App Store Mobile</span>
                </div>
                <div className="p-2 rounded-xl bg-muted/40 dark:bg-white/[0.02]">
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">SQL & PostgreSQL</span>
                    <span className="block text-[10px] text-muted-foreground dark:text-neutral-400 uppercase font-mono">MySQL, Mongo, SQLite</span>
                </div>
                <div className="p-2 rounded-xl bg-muted/40 dark:bg-white/[0.02]">
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">Redis & Firebase</span>
                    <span className="block text-[10px] text-muted-foreground dark:text-neutral-400 uppercase font-mono">Real-Time Caching</span>
                </div>
            </div>
        </div>
    );
}
