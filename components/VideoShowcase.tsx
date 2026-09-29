"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize2,
    Film,
    FileText,
    Sparkles,
    Download,
    CheckCircle2,
    ArrowRight,
    ExternalLink,
    Layers,
    Code2,
    GraduationCap,
    Briefcase
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useVideoModal, VideoType } from "./VideoModalContext";

interface ShowcaseItem {
    id: VideoType;
    tabLabel: string;
    tabSub: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    videoSrc: string;
    posterSrc: string;
    duration: string;
    highlights: {
        title: string;
        desc: string;
        tag: string;
        icon: React.ComponentType<{ className?: string }>;
    }[];
    stats: { label: string; value: string }[];
    primaryAction: {
        label: string;
        href: string;
        isModalTrigger?: boolean;
    };
    secondaryAction: {
        label: string;
        href: string;
        download?: boolean;
    };
}

const SHOWCASE_DATA: Record<VideoType, ShowcaseItem> = {
    portfolio: {
        id: "portfolio",
        tabLabel: "Portfolio Showreel",
        tabSub: "Client SaaS & Web Platforms",
        icon: Film,
        badge: "Motion Graphics Showreel 2026",
        title: "Client Platforms, SaaS & 3D Engineering",
        subtitle: "Dynamic visual breakdown of flagship digital products and architectures",
        description:
            "A fast-paced showcase covering production-grade platforms including Servixer Space (multi-tool SaaS & agency), uBreak WeFix (device repair booking flow), responsive mobile apps, and interactive 3D web applications.",
        videoSrc: "/videos/Abd-Alrhman-Al-Darra-Portfolio.mp4",
        posterSrc: "/videos/portfolio-poster.jpg",
        duration: "0:51 min • 1080p 60fps",
        highlights: [
            {
                title: "Servixer Space",
                desc: "122-tool application ecosystem, agency services, and SRV utility token integration.",
                tag: "Flagship SaaS",
                icon: Layers
            },
            {
                title: "uBreak WeFix",
                desc: "Instant repair quotes, automated customer booking flows, and inventory synchronization.",
                tag: "E-Commerce / Repair",
                icon: Code2
            },
            {
                title: "Scalable Full-Stack",
                desc: "Engineered using Next.js, React, Node.js, TypeScript, and high-performance databases.",
                tag: "Architecture",
                icon: CheckCircle2
            }
        ],
        stats: [
            { label: "Resolution", value: "1080p FHD" },
            { label: "Duration", value: "51s Reel" },
            { label: "Stack", value: "Next.js / 3D" }
        ],
        primaryAction: {
            label: "Explore All Projects",
            href: "#projects"
        },
        secondaryAction: {
            label: "Download Showreel MP4",
            href: "/videos/Abd-Alrhman-Al-Darra-Portfolio.mp4",
            download: true
        }
    },
    resume: {
        id: "resume",
        tabLabel: "Video Resume",
        tabSub: "Career, Education & Tech Stack",
        icon: FileText,
        badge: "Motion Profile 2026",
        title: "Career Trajectory, Degrees & Skills",
        subtitle: "Visual résumé presenting software experience, degrees, and full-stack capabilities",
        description:
            "An animated walkthrough of professional engineering roles at Repairo.dk, Airplate (drone tracking mobile apps), and uBreak WeFix, along with degrees in Web Development (UCL) and Multimedia Design (Zealand Academy).",
        videoSrc: "/videos/Abd-Aldarra-Resume.mp4",
        posterSrc: "/videos/resume-poster.jpg",
        duration: "0:50 min • 1080p 60fps",
        highlights: [
            {
                title: "Engineering Roles",
                desc: "Full-stack developer at Repairo.dk, Mobile engineer at Airplate, Web lead at uBreak WeFix.",
                tag: "Work Experience",
                icon: Briefcase
            },
            {
                title: "Academic Degrees",
                desc: "Top-up Bachelor in Web Development (UCL) & AP Degree in Multimedia Design (Zealand).",
                tag: "Education",
                icon: GraduationCap
            },
            {
                title: "Technology Breadth",
                desc: "React, Next.js, Flutter, React Native, Python, SQL, Firebase, C++, and UI/UX motion design.",
                tag: "Core Stack",
                icon: Code2
            }
        ],
        stats: [
            { label: "Location", value: "Odense, DK" },
            { label: "Degree", value: "B.Sc. Top-Up" },
            { label: "Format", value: "Video + PDF" }
        ],
        primaryAction: {
            label: "View CV Document (PNG)",
            href: "/assets/resume.png"
        },
        secondaryAction: {
            label: "Download Video CV",
            href: "/videos/Abd-Aldarra-Resume.mp4",
            download: true
        }
    }
};

export default function VideoShowcase() {
    const { openVideoModal } = useVideoModal();
    const [activeTab, setActiveTab] = useState<VideoType>("portfolio");
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const currentItem = SHOWCASE_DATA[activeTab];

    const handleTabChange = (type: VideoType) => {
        setActiveTab(type);
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.pause();
        }
    };

    const toggleInlinePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggleInlineMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        const nextMute = !videoRef.current.muted;
        videoRef.current.muted = nextMute;
        setIsMuted(nextMute);
    };

    return (
        <section id="showcase" className="py-28 bg-card/40 relative overflow-hidden border-y border-border/40">
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-black uppercase tracking-widest mb-4"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Interactive Video Hub</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black tracking-tight mb-4"
                    >
                        Cinematic <span className="text-primary italic">Showreels</span> & Video CV
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-muted-foreground text-base md:text-lg leading-relaxed"
                    >
                        Watch ultra-high-definition presentations showcasing production platforms,
                        mobile applications, and my complete professional timeline.
                    </motion.p>

                    {/* Tab Navigation Pill */}
                    <div className="mt-8 flex justify-center">
                        <div className="inline-flex p-1.5 bg-background/80 border border-border/80 rounded-2xl shadow-xl backdrop-blur-xl gap-2">
                            {(["portfolio", "resume"] as VideoType[]).map((type) => {
                                const item = SHOWCASE_DATA[type];
                                const Icon = item.icon;
                                const isActive = activeTab === type;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => handleTabChange(type)}
                                        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <div className="text-left">
                                            <div className="leading-tight">{item.tabLabel}</div>
                                            <div className="text-[10px] opacity-75 font-normal hidden sm:block">
                                                {item.tabSub}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main Showcase Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left: Video Player Box (7 cols) */}
                    <motion.div
                        layout
                        key={currentItem.id}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="lg:col-span-7 bg-background rounded-3xl border border-border/70 overflow-hidden shadow-2xl shadow-black/40 group relative"
                    >
                        {/* Video Element Container */}
                        <div className="relative aspect-video w-full bg-black overflow-hidden select-none">
                            <video
                                ref={videoRef}
                                src={currentItem.videoSrc}
                                poster={currentItem.posterSrc}
                                playsInline
                                muted={isMuted}
                                loop
                                onEnded={() => setIsPlaying(false)}
                                className="w-full h-full object-cover"
                            />

                            {/* Top Badge Overlay */}
                            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-bold text-white border border-white/10 flex items-center gap-1.5 shadow-lg">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    {currentItem.badge}
                                </span>
                                <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-white/80 border border-white/10 shadow-lg">
                                    {currentItem.duration}
                                </span>
                            </div>

                            {/* Play Overlay (when paused) */}
                            {!isPlaying && (
                                <div
                                    onClick={toggleInlinePlay}
                                    className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity z-10"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl shadow-primary/60 border border-primary-foreground/20"
                                        aria-label="Play video preview"
                                    >
                                        <Play className="w-9 h-9 fill-current translate-x-0.5" />
                                    </motion.button>
                                </div>
                            )}

                            {/* Bottom Controls Bar on Hover */}
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex items-center justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={toggleInlinePlay}
                                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all"
                                        aria-label={isPlaying ? "Pause" : "Play"}
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-4 h-4 fill-current" />
                                        ) : (
                                            <Play className="w-4 h-4 fill-current translate-x-0.5" />
                                        )}
                                    </button>

                                    <button
                                        onClick={toggleInlineMute}
                                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all"
                                        aria-label={isMuted ? "Unmute" : "Mute"}
                                    >
                                        {isMuted ? (
                                            <VolumeX className="w-4 h-4" />
                                        ) : (
                                            <Volume2 className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                <button
                                    onClick={() => openVideoModal(activeTab)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-lg"
                                >
                                    <Maximize2 className="w-3.5 h-3.5" />
                                    <span>Cinema Mode</span>
                                </button>
                            </div>
                        </div>

                        {/* Video Card Footer */}
                        <div className="p-5 sm:p-6 bg-card/90 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-6">
                                {currentItem.stats.map((stat, i) => (
                                    <div key={i} className="text-left">
                                        <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                                            {stat.label}
                                        </div>
                                        <div className="text-sm font-bold text-foreground">
                                            {stat.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => openVideoModal(activeTab)}
                                className="px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-md shadow-primary/10 group/btn"
                            >
                                <Play className="w-4 h-4 fill-current group-hover/btn:scale-110 transition-transform" />
                                <span>Full Theater View</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right: Highlights, Chapters & Actions (5 cols) */}
                    <motion.div
                        layout
                        key={`info-${currentItem.id}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="lg:col-span-5 flex flex-col justify-between space-y-6"
                    >
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary block mb-2">
                                Featured Highlight
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mb-3">
                                {currentItem.title}
                            </h3>
                            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                                {currentItem.description}
                            </p>

                            {/* Key Highlights Cards */}
                            <div className="space-y-3">
                                {currentItem.highlights.map((h, idx) => {
                                    const HIcon = h.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="p-3.5 rounded-2xl bg-card border border-border/60 hover:border-primary/40 transition-all flex items-start gap-3.5"
                                        >
                                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                                                <HIcon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                                    <h4 className="text-sm font-bold text-foreground">
                                                        {h.title}
                                                    </h4>
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/40">
                                                        {h.tag}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground leading-relaxed">
                                                    {h.desc}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 border-t border-border/50 flex flex-wrap gap-3">
                            <Link
                                href={currentItem.primaryAction.href}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                <span>{currentItem.primaryAction.label}</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <a
                                href={currentItem.secondaryAction.href}
                                download={currentItem.secondaryAction.download}
                                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-card border border-border hover:border-primary/40 text-foreground font-semibold text-sm hover:text-primary transition-all"
                            >
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">{currentItem.secondaryAction.label}</span>
                                <span className="sm:hidden">Download</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
