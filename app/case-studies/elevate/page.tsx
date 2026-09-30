"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ExternalLink,
    Globe,
    ShieldCheck,
    Users,
    Briefcase,
    FileText,
    Layers,
    Code2,
    Database,
    Zap,
    CheckCircle2,
    ChevronRight,
    CreditCard,
    Film,
    Laptop,
    Sliders,
    Award,
    TrendingUp,
    Server,
    Lock,
    Eye,
    Download,
    Share2,
    Smartphone,
    Languages
} from "lucide-react";

type SubsystemKey = "website" | "admin" | "partner" | "client" | "cms";

interface SubsystemTab {
    key: SubsystemKey;
    label: string;
    subLabel: string;
    icon: React.ComponentType<{ className?: string }>;
    tag: string;
    image: string;
    badge: string;
    overview: string;
    highlights: { title: string; desc: string }[];
    techPoints: string[];
    liveActionUrl?: string;
    liveActionLabel?: string;
    alternateImages?: { label: string; src: string; caption?: string }[];
}

const SUBSYSTEMS: Record<SubsystemKey, SubsystemTab> = {
    website: {
        key: "website",
        label: "Public Agency Web",
        subLabel: "Brand Platform & 3D Visuals",
        icon: Globe,
        tag: "Customer-Facing Portal",
        image: "/assets/projects/elevate_pro_showcase.png",
        alternateImages: [
            { label: "Live Platform Showcase", src: "/assets/projects/elevate_pro_showcase.png", caption: "Live Platform (elevatewithus.co) — 3D Space Orbit, Commercial Video Hub & Real Astronaut" },
            { label: "Full-Bleed Dark UI", src: "/assets/projects/elevate_dark_16_9_v2.png", caption: "Live Platform — KSA Earth Orbit, 4K Showreels & Bilingual Architecture" },
            { label: "Client Case Studies", src: "/assets/projects/elevate_real_work.png", caption: "Live Platform — Nestlé Pure Life, Red Bull & Free Life Brand Activations" }
        ],
        badge: "Live at elevatewithus.co",
        overview:
            "A luxury corporate platform serving as the primary digital home for Elevate in Saudi Arabia (Jeddah & Riyadh). Built to capture high-value enterprise leads, showcase 4K commercial reels, and articulate 360-degree brand marketing across Vision 2030 initiatives.",
        highlights: [
            {
                title: "3D Earth Orbit & Cinematic Space Intro",
                desc: "Custom WebGL / CSS GPU shaders rendering Saudi Arabia from orbit, transitioning seamlessly into luxury brand storytelling."
            },
            {
                title: "Bilingual English & Arabic Engine",
                desc: "Instant language switcher with bidirectional layout flipping (LTR/RTL), custom typography, and region-aware localization."
            },
            {
                title: "Dynamic Project Case Studies",
                desc: "Deep-dive multimedia galleries for clients like Nestlé Pure Life, Red Bull, Pekarna, and Seafront Suites with embedded video players."
            },
            {
                title: "Interactive Booking & Services Directory",
                desc: "Integrated scheduling flow allowing enterprise prospects to select service categories and book discovery calls directly."
            }
        ],
        techPoints: [
            "Next.js 16 (App Router + Turbopack)",
            "Tailwind CSS 4 with custom dark/light theme tokens",
            "Framer Motion layout transitions",
            "SEO JSON-LD Organization & Service schemas",
            "Sub-second TTFB across GCC edge networks"
        ],
        liveActionUrl: "https://elevatewithus.co/en",
        liveActionLabel: "Visit Live Website"
    },
    admin: {
        key: "admin",
        label: "Admin Command Center",
        subLabel: "Operations, Revenue & CRM",
        icon: Sliders,
        tag: "Agency Operations Core",
        image: "/assets/case-studies/elevate-admin.jpg",
        badge: "Internal Enterprise Suite",
        overview:
            "The mission-control dashboard for Elevate leadership, creative directors, and project managers. Centralizes inbound leads, real-time revenue analytics (SAR & USD), project milestone completion, and team allocations into one unified system.",
        highlights: [
            {
                title: "Real-Time Revenue & Finance Analytics",
                desc: "Live gross volume, monthly billings in Saudi Riyals (SAR) and USD, invoice aging analysis, and automated profit margins."
            },
            {
                title: "Visual Lead Pipeline & CRM",
                desc: "Multi-stage Kanban board tracking enterprise inquiries from initial consultation through proposal, negotiation, and closed-won."
            },
            {
                title: "Project Milestone Oversight",
                desc: "Gantt & milestone progress monitors tracking creative deliverables across concepting, 4K production, editing, and VFX."
            },
            {
                title: "Role-Based Access Control (RBAC)",
                desc: "Granular permissions separating Super Admin, Executive Partners, Creative Directors, and Finance Officers."
            }
        ],
        techPoints: [
            "NextAuth.js with multi-tenant session invalidation",
            "Prisma ORM over PostgreSQL database",
            "Optimistic UI updates for instant pipeline dragging",
            "Automated PDF invoice generation and audit logging",
            "Real-time webhook notifications via Discord/Slack"
        ]
    },
    partner: {
        key: "partner",
        label: "Partner & Affiliate Hub",
        subLabel: "Agency Network & Payouts",
        icon: Users,
        tag: "Growth & Co-Marketing",
        image: "/assets/case-studies/elevate-partner.jpg",
        badge: "B2B Partner Ecosystem",
        overview:
            "A purpose-built portal for strategic co-marketing agencies, independent producers, and affiliate partners. Enables partner onboarding, unique referral link distribution, live commission tracking, and downloadable brand assets.",
        highlights: [
            {
                title: "Tiered Partner Progression",
                desc: "Dynamic tier badges (Silver, Gold, Platinum) with tiered commission percentages based on 12-month trailing referral volume."
            },
            {
                title: "Commission Wallet & Payouts",
                desc: "Transparent commission balance in SAR with one-click payout requests, automated tax withholding statements, and transaction history."
            },
            {
                title: "30-Day Referral Tracking & Analytics",
                desc: "Unique tracked links for specific services (Branding, Web Dev, Film Production) showing clicks, conversions, and closed deal rates."
            },
            {
                title: "Brand Asset Vault",
                desc: "Centralized downloads of vector logos, official pitch decks, approved promotional videos, and co-branding guidelines."
            }
        ],
        techPoints: [
            "Signed referral cookie attribution engine",
            "Secure multi-currency payout ledger",
            "Cloudflare R2 asset downloads with signed URLs",
            "Automated partner agreement digital e-signing",
            "Tier progression webhook triggers"
        ]
    },
    client: {
        key: "client",
        label: "Client Collaboration Hub",
        subLabel: "Milestones & Video Proofing",
        icon: Briefcase,
        tag: "White-Glove Client Experience",
        image: "/assets/case-studies/elevate-client.jpg",
        badge: "Client Collaboration",
        overview:
            "A dedicated client workspace providing full transparency throughout complex multi-month creative and digital campaigns. Clients review video cuts with frame-accurate timecode comments, approve phase milestones, and pay invoices instantly.",
        highlights: [
            {
                title: "Frame-Accurate Video Review Player",
                desc: "Interactive 4K review player allowing clients to pause at exact timecodes (e.g. 0:25, 0:45) and leave annotated revision feedback."
            },
            {
                title: "Milestone Approval & Sign-Offs",
                desc: "Visual phase breakdown (Concept, Filming, Editing, VFX, Final Delivery) requiring explicit cryptographic client approval."
            },
            {
                title: "Instant Digital Invoice Settlement",
                desc: "Direct integration with regional payment gateways supporting Apple Pay, Mada (Saudi national payment system), and Stripe."
            },
            {
                title: "Deliverables Download Vault",
                desc: "Direct access to final 4K masters, social media cuts, high-res photography, and source archives with download quotas."
            }
        ],
        techPoints: [
            "HLS adaptive bitrate video streaming",
            "Interactive timecode comment synchronization",
            "Mada & Apple Pay native checkout integration",
            "Encrypted S3 bucket deliverable downloads",
            "Real-time client status email & SMS notifications"
        ]
    },
    cms: {
        key: "cms",
        label: "Bilingual Headless CMS",
        subLabel: "Dual EN / AR & Media Engine",
        icon: FileText,
        tag: "Content Architecture",
        image: "/assets/case-studies/elevate-cms.jpg",
        badge: "Custom Content Manager",
        overview:
            "A bespoke content management engine engineered to eliminate content editing friction. Allows Elevate's editorial team to author bilingual articles, publish case studies, update services, and manage media without touching code.",
        highlights: [
            {
                title: "Side-by-Side Dual Language Editor",
                desc: "Synchronized English (LTR) and Arabic (RTL) editing panels with bidirectional input mirroring and specialized Arabic typography."
            },
            {
                title: "Automated SEO & Schema Scorer",
                desc: "Built-in audit tool scoring content out of 100 based on keyword density, OpenGraph previews, readability, and schema readiness."
            },
            {
                title: "Centralized Media Asset Selector",
                desc: "Modern asset manager with automated WebP conversion, responsive image srcset generation, and 4K video transcoding."
            },
            {
                title: "Live Responsive Simulator",
                desc: "Instant live preview toggle switching between mobile and desktop viewport renderings in both languages before publishing."
            }
        ],
        techPoints: [
            "TipTap / ProseMirror rich text architecture",
            "RTL/LTR bidirectional layout validation",
            "Automated image compression & WebP optimization",
            "Next.js Incremental Static Regeneration (ISR)",
            "Draft preview modes via secure tokenized URLs"
        ]
    }
};

export default function ElevateCaseStudyPage() {
    const [activeTab, setActiveTab] = useState<SubsystemKey>("website");
    const [selectedImages, setSelectedImages] = useState<Record<string, string>>({
        website: "/assets/projects/elevate_pro_showcase.png"
    });
    const currentSubsystem = SUBSYSTEMS[activeTab];
    const currentImage = selectedImages[currentSubsystem.key] || currentSubsystem.image;

    return (
        <main className="min-h-screen bg-[#08090B] text-stone-100 selection:bg-[#FF8A00] selection:text-black font-sans relative overflow-hidden">
            {/* Ambient Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#FF8A00]/15 via-[#FF5F15]/5 to-transparent rounded-full blur-[150px] pointer-events-none -z-10" />
            <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] bg-[#FF8A00]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

            {/* Navigation Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#08090B]/85 border-b border-white/10 transition-all">
                <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#FF8A00]" />
                        <span>Back to Portfolio</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-stone-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Production Verified
                        </span>
                        <a
                            href="https://elevatewithus.co/en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF9600] to-[#FF7400] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-orange-500/20"
                        >
                            <span>Live Platform</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-16 pb-20 px-6 border-b border-white/10 relative">
                <div className="max-w-7xl mx-auto">
                    {/* Eyebrow & Badges */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-6">
                        <span className="px-3.5 py-1 rounded-full bg-[#FF8A00]/15 border border-[#FF8A00]/30 text-[#FF8A00] text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5" />
                            Comprehensive Case Study
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-semibold">
                            Full-Stack & Systems Architecture
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-semibold">
                            Jeddah & Riyadh, KSA 🇸🇦
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
                        <div className="lg:col-span-8">
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.02] mb-6">
                                Elevate OS: <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9600] via-[#FF8A00] to-[#FFA726]">
                                    One House. Full Ecosystem.
                                </span>
                            </h1>
                            <p className="text-stone-300 text-lg sm:text-xl leading-relaxed max-w-3xl">
                                Engineered a complete digital operating suite powering a premier Saudi creative house.
                                Spanning a luxury bilingual marketing website, executive admin command center, partner
                                affiliate engine, white-glove client hub, and a unified headless CMS.
                            </p>
                        </div>

                        {/* Quick Spec Card */}
                        <div className="lg:col-span-4 bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                            <div className="text-xs font-mono font-bold text-[#FF8A00] uppercase tracking-wider mb-4 flex items-center justify-between">
                                <span>Project Blueprint</span>
                                <Server className="w-4 h-4" />
                            </div>
                            <dl className="space-y-3 text-xs sm:text-sm">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <dt className="text-stone-400">Live URL:</dt>
                                    <dd className="font-mono text-stone-200 font-bold">elevatewithus.co</dd>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <dt className="text-stone-400">Primary Market:</dt>
                                    <dd className="text-stone-200 font-semibold">Saudi Arabia & GCC</dd>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <dt className="text-stone-400">Architecture:</dt>
                                    <dd className="text-stone-200 font-semibold">Multi-Tenant 5-Pillar Suite</dd>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <dt className="text-stone-400">Core Stack:</dt>
                                    <dd className="text-[#FF8A00] font-semibold">Next.js 16 • TS • Tailwind</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-stone-400">Languages:</dt>
                                    <dd className="text-stone-200 font-semibold">English & Arabic (RTL)</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Impact KPI Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { value: "+340%", label: "Inbound Lead Conversion", sub: "Optimized booking flow & UX" },
                            { value: "<450ms", label: "Edge TTFB in GCC", sub: "Cloudflare & Next.js ISR" },
                            { value: "100%", label: "Automated Billing", sub: "Mada, Apple Pay & Stripe" },
                            { value: "45%", label: "Faster Revision Cycles", sub: "Timecoded video review player" }
                        ].map((kpi, idx) => (
                            <div
                                key={idx}
                                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#FF8A00]/40 transition-all"
                            >
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#FF8A00] mb-1 font-mono">
                                    {kpi.value}
                                </div>
                                <div className="text-xs sm:text-sm font-bold text-white mb-0.5">{kpi.label}</div>
                                <div className="text-[11px] text-stone-400 leading-tight">{kpi.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subsystem Interactive Explorer */}
            <section className="py-24 px-6 border-b border-white/10">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF8A00] block mb-2">
                            Interactive System Architecture
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
                            The 5 Core Pillars of <span className="text-[#FF8A00]">Elevate OS</span>
                        </h2>
                        <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                            Click through the tabs below to explore the architecture, interface workflows, and technical
                            details of each subsystem built for Elevate.
                        </p>
                    </div>

                    {/* Navigation Pills */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
                        {(Object.keys(SUBSYSTEMS) as SubsystemKey[]).map((key) => {
                            const item = SUBSYSTEMS[key];
                            const Icon = item.icon;
                            const isActive = activeTab === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                                        isActive
                                            ? "bg-[#FF8A00] text-black shadow-lg shadow-orange-500/25 scale-[1.02]"
                                            : "bg-white/[0.04] text-stone-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
                                    }`}
                                >
                                    <Icon className="w-4 h-4 shrink-0" />
                                    <div className="text-left">
                                        <div className="leading-tight">{item.label}</div>
                                        <div className="text-[10px] opacity-75 font-normal hidden md:block">
                                            {item.subLabel}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Subsystem Showcase Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSubsystem.key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35 }}
                            className="bg-white/[0.02] border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                        >
                            {/* Card Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-3 py-1 rounded-full bg-[#FF8A00]/15 text-[#FF8A00] text-[10px] font-black uppercase tracking-wider border border-[#FF8A00]/30 font-mono">
                                            {currentSubsystem.tag}
                                        </span>
                                        <span className="text-xs font-mono text-stone-400">
                                            {currentSubsystem.badge}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl sm:text-4xl font-black text-white">
                                        {currentSubsystem.label}
                                    </h3>
                                </div>

                                {currentSubsystem.liveActionUrl && (
                                    <a
                                        href={currentSubsystem.liveActionUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#FF8A00] hover:text-black text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/15 self-start md:self-auto shrink-0 shadow-lg"
                                    >
                                        <span>{currentSubsystem.liveActionLabel}</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                )}
                            </div>

                            {/* Main Content Grid: Image + Highlights */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                                {/* Left: UI Visual (7 cols) */}
                                <div className="lg:col-span-7 space-y-4">
                                    {currentSubsystem.alternateImages && (
                                        <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-white/[0.03] rounded-2xl border border-white/10">
                                            <span className="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-wider pl-2">
                                                Visual Source:
                                            </span>
                                            <div className="flex gap-1.5">
                                                {currentSubsystem.alternateImages.map((alt) => {
                                                    const active = currentImage === alt.src;
                                                    return (
                                                        <button
                                                            key={alt.src}
                                                            onClick={() => setSelectedImages(prev => ({ ...prev, [currentSubsystem.key]: alt.src }))}
                                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                                                active
                                                                    ? "bg-[#FF8A00] text-black shadow-lg shadow-orange-500/20 font-black"
                                                                    : "text-stone-300 hover:text-white bg-white/5 hover:bg-white/10"
                                                            }`}
                                                        >
                                                            {alt.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl group">
                                        <Image
                                            key={currentImage}
                                            src={currentImage}
                                            alt={currentSubsystem.label}
                                            fill
                                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                                            <span className="font-mono bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10">
                                                {currentSubsystem.alternateImages?.find(a => a.src === currentImage)?.caption || "High-Fidelity Production UI"}
                                            </span>
                                            <span className="font-bold text-[#FF8A00] flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                                            </span>
                                        </div>
                                    </div>

                                    {/* Tech Highlights Pills */}
                                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                                        <div className="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-wider mb-2">
                                            Under The Hood Engineering:
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {currentSubsystem.techPoints.map((tp, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-stone-300 font-mono"
                                                >
                                                    {tp}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Detailed Breakdown (5 cols) */}
                                <div className="lg:col-span-5 space-y-6">
                                    <div>
                                        <h4 className="text-lg font-bold text-[#FF8A00] mb-2 uppercase tracking-wide">
                                            Subsystem Overview
                                        </h4>
                                        <p className="text-stone-300 text-sm leading-relaxed">
                                            {currentSubsystem.overview}
                                        </p>
                                    </div>

                                    <div className="space-y-3.5">
                                        <h4 className="text-xs font-mono font-bold text-stone-400 uppercase tracking-widest">
                                            Architectural Highlights
                                        </h4>
                                        {currentSubsystem.highlights.map((h, i) => (
                                            <div
                                                key={i}
                                                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FF8A00]/40 transition-all"
                                            >
                                                <div className="font-bold text-sm text-white mb-1 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
                                                    {h.title}
                                                </div>
                                                <div className="text-xs text-stone-400 leading-relaxed pl-3.5">
                                                    {h.desc}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Architecture Flow Diagram Section */}
            <section className="py-24 px-6 border-b border-white/10 bg-black/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF8A00] block mb-2">
                            Unified Enterprise Flow
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
                            System Flow & <span className="text-[#FF8A00]">Data Topology</span>
                        </h2>
                        <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                            How all 5 platforms communicate through a secure multi-tenant edge runtime, granular RBAC,
                            and high-performance database caching.
                        </p>
                    </div>

                    {/* Visual Architecture Topology Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {/* Layer 1: Presentation Layer */}
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 relative">
                            <div className="flex items-center gap-2.5 text-[#FF8A00] font-bold text-sm uppercase tracking-wider mb-4">
                                <Laptop className="w-4 h-4" />
                                <span>1. Edge Client Layer</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Multi-Surface Access</h3>
                            <p className="text-xs text-stone-400 leading-relaxed mb-6">
                                Optimized for high-concurrency desktop and mobile browsers across Saudi Arabia & global GCC.
                            </p>
                            <ul className="space-y-2.5 text-xs text-stone-300">
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Public Website (elevatewithus.co/en)</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Admin Operations Portal (/admin)</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <Users className="w-3.5 h-3.5 text-blue-400" />
                                    <span>Partner Network Dashboard (/partner)</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                                    <span>Client Milestone Hub (/client)</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <FileText className="w-3.5 h-3.5 text-rose-400" />
                                    <span>Bilingual CMS Studio (/cms)</span>
                                </li>
                            </ul>
                        </div>

                        {/* Layer 2: API & Security Layer */}
                        <div className="p-6 rounded-3xl bg-white/[0.04] border border-[#FF8A00]/30 relative shadow-xl shadow-orange-500/5">
                            <div className="flex items-center gap-2.5 text-[#FF8A00] font-bold text-sm uppercase tracking-wider mb-4">
                                <ShieldCheck className="w-4 h-4" />
                                <span>2. Security & Routing</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Edge Gateway & RBAC</h3>
                            <p className="text-xs text-stone-400 leading-relaxed mb-6">
                                Tokenized session verification, cryptographic signatures, and localization routing.
                            </p>
                            <ul className="space-y-2.5 text-xs text-stone-300">
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <Lock className="w-3.5 h-3.5 text-[#FF8A00]" />
                                    <span>JWT & NextAuth Session Management</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <Languages className="w-3.5 h-3.5 text-cyan-400" />
                                    <span>Geo-Routing (en / ar auto-detection)</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Mada, Apple Pay & Stripe Webhooks</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                                    <span>Rate Limiting & DDoS Shielding</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <Film className="w-3.5 h-3.5 text-orange-400" />
                                    <span>HLS 4K Video Streaming Controller</span>
                                </li>
                            </ul>
                        </div>

                        {/* Layer 3: Persistence & Storage */}
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 relative">
                            <div className="flex items-center gap-2.5 text-[#FF8A00] font-bold text-sm uppercase tracking-wider mb-4">
                                <Database className="w-4 h-4" />
                                <span>3. Core Persistence</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Multi-Tenant Store</h3>
                            <p className="text-xs text-stone-400 leading-relaxed mb-6">
                                Relational PostgreSQL data storage paired with Cloudflare R2 object storage for master media.
                            </p>
                            <ul className="space-y-2.5 text-xs text-stone-300">
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <Database className="w-3.5 h-3.5 text-indigo-400" />
                                    <span>PostgreSQL via Prisma ORM</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <Server className="w-3.5 h-3.5 text-sky-400" />
                                    <span>Cloudflare R2 Object Storage (4K Video)</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Financial Audit & Transaction Ledger</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                                    <span>Timecode Comment Thread Store</span>
                                </li>
                                <li className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                                    <Share2 className="w-3.5 h-3.5 text-pink-400" />
                                    <span>Partner Affiliate Conversion Graphs</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* In-Depth Feature Matrix Table */}
            <section className="py-24 px-6 border-b border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF8A00] block mb-2">
                            Comparative Capability Matrix
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
                            Platform Features by User Role
                        </h2>
                        <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                            How each user persona experiences Elevate OS with tailored tooling and enterprise safeguards.
                        </p>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border border-white/15 bg-white/[0.02]">
                        <table className="w-full text-left text-xs sm:text-sm">
                            <thead className="bg-white/5 border-b border-white/10 font-mono text-[11px] uppercase tracking-wider text-stone-300">
                                <tr>
                                    <th className="p-4 sm:p-5">Platform Feature</th>
                                    <th className="p-4 sm:p-5 text-center">Public Web</th>
                                    <th className="p-4 sm:p-5 text-center">Admin Hub</th>
                                    <th className="p-4 sm:p-5 text-center">Partner Portal</th>
                                    <th className="p-4 sm:p-5 text-center">Client Workspace</th>
                                    <th className="p-4 sm:p-5 text-center">CMS Engine</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-stone-300">
                                {[
                                    { feat: "Bilingual EN / AR (RTL Support)", web: true, adm: true, par: true, cli: true, cms: true },
                                    { feat: "Role-Based Access Control (RBAC)", web: false, adm: true, par: true, cli: true, cms: true },
                                    { feat: "Real-Time Revenue Analytics (SAR/USD)", web: false, adm: true, par: false, cli: false, cms: false },
                                    { feat: "Timecoded Video Review Player", web: false, adm: true, par: false, cli: true, cms: false },
                                    { feat: "Mada & Apple Pay Checkout", web: true, adm: true, par: false, cli: true, cms: false },
                                    { feat: "Affiliate Referral Link Tracker", web: false, adm: true, par: true, cli: false, cms: false },
                                    { feat: "Dynamic Project Case Studies", web: true, adm: true, par: true, cli: false, cms: true },
                                    { feat: "Side-by-Side Content Editor", web: false, adm: true, par: false, cli: false, cms: true },
                                    { feat: "Deliverables Download Vault", web: false, adm: true, par: true, cli: true, cms: false },
                                    { feat: "SEO & Schema Scoring Engine", web: false, adm: false, par: false, cli: false, cms: true }
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4 sm:p-5 font-semibold text-white">{row.feat}</td>
                                        <td className="p-4 sm:p-5 text-center">
                                            {row.web ? <CheckCircle2 className="w-4 h-4 text-[#FF8A00] mx-auto" /> : <span className="text-stone-600">—</span>}
                                        </td>
                                        <td className="p-4 sm:p-5 text-center">
                                            {row.adm ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-stone-600">—</span>}
                                        </td>
                                        <td className="p-4 sm:p-5 text-center">
                                            {row.par ? <CheckCircle2 className="w-4 h-4 text-blue-400 mx-auto" /> : <span className="text-stone-600">—</span>}
                                        </td>
                                        <td className="p-4 sm:p-5 text-center">
                                            {row.cli ? <CheckCircle2 className="w-4 h-4 text-purple-400 mx-auto" /> : <span className="text-stone-600">—</span>}
                                        </td>
                                        <td className="p-4 sm:p-5 text-center">
                                            {row.cms ? <CheckCircle2 className="w-4 h-4 text-cyan-400 mx-auto" /> : <span className="text-stone-600">—</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Engineering Leadership & Author Statement */}
            <section className="py-24 px-6 border-b border-white/10 bg-gradient-to-b from-transparent via-[#FF8A00]/5 to-transparent">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="w-20 h-20 rounded-full border-2 border-[#FF8A00] p-1 mx-auto overflow-hidden relative shadow-xl shadow-orange-500/20">
                        <Image
                            src="/assets/profile.jpg"
                            alt="Abd Alrhman"
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black text-white">Abd Alrhman Aldarra</h3>
                        <p className="text-xs font-mono text-[#FF8A00] uppercase tracking-widest font-bold">
                            Lead Architect & Full-Stack Engineer
                        </p>
                    </div>
                    <p className="text-stone-300 text-base sm:text-lg leading-relaxed italic max-w-2xl mx-auto">
                        "Building Elevate OS required synthesizing creative artistry with mission-critical enterprise engineering.
                        From sub-second edge routing in Saudi Arabia to frame-accurate video review and multi-tenant financial ledgers,
                        every component was designed to empower modern creative production at scale."
                    </p>
                    <div className="pt-4 flex flex-wrap justify-center gap-3">
                        <Link
                            href="/#contact"
                            className="px-6 py-3 rounded-full bg-[#FF8A00] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-orange-500/25"
                        >
                            Discuss Your Enterprise Project
                        </Link>
                        <a
                            href="https://elevatewithus.co/en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all"
                        >
                            Explore Live elevatewithus.co
                        </a>
                    </div>
                </div>
            </section>

            {/* Bottom Footer Callout */}
            <footer className="py-12 px-6 text-center text-xs text-stone-500 font-mono">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span>© {new Date().getFullYear()} Abd Alrhman Aldarra • Portfolio Case Study</span>
                    <div className="flex items-center gap-4">
                        <Link href="/#projects" className="hover:text-white transition-colors">
                            All Projects
                        </Link>
                        <span>•</span>
                        <Link href="/#showcase" className="hover:text-white transition-colors">
                            Video Showreel
                        </Link>
                        <span>•</span>
                        <a href="https://elevatewithus.co/en" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF8A00] transition-colors">
                            elevatewithus.co
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
