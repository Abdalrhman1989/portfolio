"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize2,
    Instagram,
    Share2,
    Heart,
    MessageCircle,
    ExternalLink,
    ArrowLeft,
    Sparkles,
    Film,
    Check,
    Eye,
    Clock,
    Layers,
    BadgeCheck,
    SlidersHorizontal,
    Grid3X3,
    Smartphone,
    X,
    Flame,
    ArrowUpRight
} from "lucide-react";
import {
    INSTAGRAM_PROFILE,
    INSTAGRAM_VIDEOS,
    InstagramVideo
} from "@/data/instagramVideos";

export default function InstagramPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [viewMode, setViewMode] = useState<"grid" | "reels">("grid");
    const [activeVideoModal, setActiveVideoModal] = useState<InstagramVideo | null>(null);
    const [playingCardId, setPlayingCardId] = useState<string | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [likedVideos, setLikedVideos] = useState<Record<string, boolean>>({});
    const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Initialize like counts
    useEffect(() => {
        const counts: Record<string, number> = {};
        INSTAGRAM_VIDEOS.forEach((v) => {
            const numericLikes = parseInt(v.likes.replace(/[^0-9]/g, ""), 10) || 100;
            counts[v.id] = numericLikes;
        });
        setLikeCounts(counts);
    }, []);

    // Filter videos by category and search
    const filteredVideos = INSTAGRAM_VIDEOS.filter((video) => {
        const matchesCategory =
            selectedCategory === "all" || video.category === selectedCategory;
        const matchesSearch =
            searchQuery.trim() === "" ||
            video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
            video.tools.some((tl) => tl.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const handleLikeToggle = (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setLikedVideos((prev) => {
            const isLiked = !prev[id];
            setLikeCounts((prevCounts) => ({
                ...prevCounts,
                [id]: (prevCounts[id] || 0) + (isLiked ? 1 : -1)
            }));
            return { ...prev, [id]: isLiked };
        });
    };

    const handleShare = (video: InstagramVideo, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        const shareUrl = `${window.location.origin}/instagram#${video.id}`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl);
            setCopiedId(video.id);
            setTimeout(() => setCopiedId(null), 2500);
        }
    };

    return (
        <div className="min-h-screen bg-[#070709] text-foreground selection:bg-pink-500/30 selection:text-pink-200">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-pink-600/15 via-purple-600/10 to-transparent blur-[140px] rounded-full" />
                <div className="absolute top-[35%] -left-32 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full" />
                <div className="absolute top-[65%] -right-32 w-[500px] h-[500px] bg-teal-600/10 blur-[150px] rounded-full" />
            </div>

            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-[#070709]/85 backdrop-blur-xl border-b border-white/[0.08]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                        >
                            <ArrowLeft className="w-4 h-4 text-primary" />
                            <span>Back to Portfolio</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Direct Instagram Profile Link */}
                        <a
                            href={INSTAGRAM_PROFILE.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-xs sm:text-sm font-bold shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all"
                        >
                            <Instagram className="w-4 h-4" />
                            <span>Follow @{INSTAGRAM_PROFILE.handle}</span>
                        </a>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-24">
                {/* Profile Header (Instagram Creator Card) */}
                <section className="relative rounded-3xl bg-card/40 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-10 mb-10 overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.7)]">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-10">
                        {/* Avatar with Animated Instagram Gradient Ring */}
                        <div className="relative group shrink-0">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] animate-spin-slow blur-xs group-hover:blur-sm transition-all" />
                            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-[#0a0a0d]">
                                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/15">
                                    <Image
                                        src={INSTAGRAM_PROFILE.avatar}
                                        alt={INSTAGRAM_PROFILE.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        priority
                                    />
                                </div>
                            </div>
                            <span className="absolute bottom-1 right-2 w-6 h-6 rounded-full bg-gradient-to-tr from-[#f09433] to-[#bc1888] flex items-center justify-center text-[10px] text-white shadow-md border-2 border-[#0a0a0d]">
                                <Flame className="w-3 h-3 fill-current" />
                            </span>
                        </div>

                        {/* Creator Bio & Stats */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                    {INSTAGRAM_PROFILE.handle}
                                </h1>
                                <BadgeCheck className="w-6 h-6 text-sky-400 fill-sky-400/20" />
                                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 uppercase tracking-wider">
                                    Creative Director & Dev
                                </span>
                            </div>

                            <p className="text-sm sm:text-base font-semibold text-foreground/90 mb-3">
                                {INSTAGRAM_PROFILE.name} • <span className="text-primary font-medium">{INSTAGRAM_PROFILE.title}</span>
                            </p>

                            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed mb-6">
                                {INSTAGRAM_PROFILE.bio}
                            </p>

                            {/* Quick Stats Pill */}
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4 border-t border-white/[0.08] text-xs sm:text-sm">
                                <div>
                                    <span className="font-extrabold text-foreground">{INSTAGRAM_VIDEOS.length}</span>{" "}
                                    <span className="text-muted-foreground">Original Videos</span>
                                </div>
                                <div className="h-3 w-[1px] bg-white/10" />
                                <div>
                                    <span className="font-extrabold text-foreground">4K / 1080p</span>{" "}
                                    <span className="text-muted-foreground">Ultra HD Media</span>
                                </div>
                                <div className="h-3 w-[1px] bg-white/10" />
                                <div>
                                    <span className="font-extrabold text-emerald-400">Available</span>{" "}
                                    <span className="text-muted-foreground">for Projects & Hire</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick CTA Actions */}
                        <div className="flex flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0 justify-center">
                            <a
                                href={INSTAGRAM_PROFILE.profileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <Instagram className="w-4 h-4" />
                                <span>Open Instagram</span>
                                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-75" />
                            </a>

                            <a
                                href={INSTAGRAM_PROFILE.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-foreground text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>Send WhatsApp</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                            </a>
                        </div>
                    </div>

                    {/* Instagram Story Highlights Bar */}
                    <div className="mt-8 pt-6 border-t border-white/[0.08]">
                        <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-4">
                            Featured Highlights
                        </p>
                        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
                            <button
                                onClick={() => setSelectedCategory("all")}
                                className={`flex flex-col items-center gap-2 shrink-0 transition-transform hover:scale-105 cursor-pointer ${
                                    selectedCategory === "all" ? "opacity-100" : "opacity-75 hover:opacity-100"
                                }`}
                            >
                                <div
                                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] ${
                                        selectedCategory === "all"
                                            ? "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-md shadow-pink-500/20"
                                            : "bg-white/10"
                                    }`}
                                >
                                    <div className="w-full h-full rounded-full bg-[#111116] flex items-center justify-center text-xl">
                                        ✨
                                    </div>
                                </div>
                                <span className="text-[11px] font-bold tracking-tight">All Works</span>
                            </button>

                            {INSTAGRAM_PROFILE.highlights.map((h, i) => {
                                const isActive = selectedCategory === h.filter;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedCategory(h.filter)}
                                        className={`flex flex-col items-center gap-2 shrink-0 transition-transform hover:scale-105 cursor-pointer ${
                                            isActive ? "opacity-100" : "opacity-75 hover:opacity-100"
                                        }`}
                                    >
                                        <div
                                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] ${
                                                isActive
                                                    ? "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-md shadow-pink-500/20"
                                                    : "bg-white/10"
                                            }`}
                                        >
                                            <div className="w-full h-full rounded-full bg-[#111116] flex items-center justify-center text-xl">
                                                {h.icon}
                                            </div>
                                        </div>
                                        <span className="text-[11px] font-bold tracking-tight">{h.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Filter and View Mode Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
                    {/* Category Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                        {[
                            { id: "all", label: "All Media" },
                            { id: "motion", label: "Motion VFX" },
                            { id: "agency", label: "Agency & Commercial" },
                            { id: "3d", label: "3D Art & Shaders" },
                            { id: "art", label: "Digital Art" },
                            { id: "showreel", label: "Tech Showreels" }
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                    selectedCategory === cat.id
                                        ? "bg-white/15 text-white border border-white/20 shadow-sm"
                                        : "bg-white/[0.03] hover:bg-white/[0.08] text-muted-foreground hover:text-foreground border border-white/[0.05]"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* View Mode Toggle: Grid vs Reels */}
                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                                    viewMode === "grid"
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                                title="Grid View"
                            >
                                <Grid3X3 className="w-3.5 h-3.5" />
                                <span>Grid</span>
                            </button>
                            <button
                                onClick={() => setViewMode("reels")}
                                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                                    viewMode === "reels"
                                        ? "bg-gradient-to-r from-[#f09433] to-[#bc1888] text-white shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                                title="Reels View"
                            >
                                <Smartphone className="w-3.5 h-3.5" />
                                <span>Reels Mode</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Videos Showcase Feed */}
                {filteredVideos.length === 0 ? (
                    <div className="text-center py-20 bg-card/20 rounded-3xl border border-white/[0.08] p-8">
                        <Film className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                        <h3 className="text-lg font-bold mb-2">No videos found</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Try selecting another category or resetting filters.
                        </p>
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredVideos.map((video, idx) => {
                            const isLiked = !!likedVideos[video.id];
                            const currentLikes = likeCounts[video.id] || 0;
                            const isHovered = playingCardId === video.id;

                            return (
                                <motion.div
                                    key={video.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="group relative rounded-2xl bg-[#0c0c11]/80 border border-white/[0.08] hover:border-pink-500/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-[0_12px_36px_rgba(220,39,67,0.15)] flex flex-col cursor-pointer"
                                    onClick={() => setActiveVideoModal(video)}
                                    onMouseEnter={() => setPlayingCardId(video.id)}
                                    onMouseLeave={() => setPlayingCardId(null)}
                                >
                                    {/* Video Player / Poster Frame */}
                                    <div className="relative aspect-video w-full bg-black overflow-hidden">
                                        <Image
                                            src={video.posterUrl}
                                            alt={video.title}
                                            fill
                                            className={`object-cover transition-opacity duration-300 ${
                                                isHovered ? "opacity-0" : "opacity-100"
                                            }`}
                                        />

                                        {/* Auto-playing muted video on hover */}
                                        {isHovered && (
                                            <video
                                                src={video.videoUrl}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover"
                                            />
                                        )}

                                        {/* Play Indicator Overlay */}
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-[#f09433] group-hover:to-[#bc1888] transition-all duration-300 shadow-xl">
                                                <Play className="w-5 h-5 ml-0.5 fill-current" />
                                            </div>
                                        </div>

                                        {/* Top Badges */}
                                        <div className="absolute top-3 left-3 flex items-center gap-2">
                                            <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                                                {video.categoryLabel}
                                            </span>
                                        </div>

                                        {/* Duration pill */}
                                        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-white/90">
                                            {video.duration}
                                        </div>
                                    </div>

                                    {/* Card Content & Metadata */}
                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
                                                <span className="font-mono">{video.date}</span>
                                                <span className="flex items-center gap-1 font-mono text-primary">
                                                    <Eye className="w-3.5 h-3.5" />
                                                    {video.views} views
                                                </span>
                                            </div>

                                            <h3 className="font-extrabold text-base text-foreground group-hover:text-pink-300 transition-colors line-clamp-2 mb-2 leading-snug">
                                                {video.title}
                                            </h3>

                                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                                                {video.description}
                                            </p>
                                        </div>

                                        {/* Tools and Action Footer */}
                                        <div>
                                            {/* Tools list */}
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {video.tools.slice(0, 3).map((tool, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-medium text-foreground/80"
                                                    >
                                                        {tool}
                                                    </span>
                                                ))}
                                                {video.tools.length > 3 && (
                                                    <span className="px-1.5 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-muted-foreground">
                                                        +{video.tools.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Social Stats & Interaction Row */}
                                            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-xs font-semibold">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleLikeToggle(video.id, e)}
                                                        className="flex items-center gap-1.5 text-muted-foreground hover:text-pink-500 transition-colors group/like"
                                                    >
                                                        <Heart
                                                            className={`w-4 h-4 transition-transform group-hover/like:scale-125 ${
                                                                isLiked
                                                                    ? "fill-pink-500 text-pink-500"
                                                                    : "text-muted-foreground"
                                                            }`}
                                                        />
                                                        <span>{currentLikes}</span>
                                                    </button>

                                                    <span className="flex items-center gap-1 text-muted-foreground">
                                                        <MessageCircle className="w-4 h-4" />
                                                        <span>{video.comments}</span>
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={(e) => handleShare(video, e)}
                                                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-muted-foreground hover:text-foreground transition-all"
                                                    title="Copy Video Link"
                                                >
                                                    {copiedId === video.id ? (
                                                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                    ) : (
                                                        <Share2 className="w-3.5 h-3.5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredVideos.map((video, idx) => {
                                const isLiked = !!likedVideos[video.id];
                                const currentLikes = likeCounts[video.id] || 0;

                                return (
                                    <motion.div
                                        key={video.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                        className="relative aspect-[9/16] rounded-3xl bg-black overflow-hidden border border-white/[0.1] shadow-2xl group cursor-pointer"
                                        onClick={() => setActiveVideoModal(video)}
                                    >
                                        <Image
                                            src={video.posterUrl}
                                            alt={video.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />

                                        {/* Gradient Vignette */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

                                        {/* Top Header in Reel */}
                                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                                            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white">
                                                {video.categoryLabel}
                                            </span>
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#f09433] to-[#bc1888] flex items-center justify-center text-white">
                                                <Instagram className="w-3.5 h-3.5" />
                                            </div>
                                        </div>

                                        {/* Right Action Icons (Instagram Style) */}
                                        <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4 z-10">
                                            <button
                                                type="button"
                                                onClick={(e) => handleLikeToggle(video.id, e)}
                                                className="flex flex-col items-center gap-1 text-white group/btn"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover/btn:scale-110 transition-transform">
                                                    <Heart
                                                        className={`w-5 h-5 ${
                                                            isLiked
                                                                ? "fill-pink-500 text-pink-500"
                                                                : "text-white"
                                                        }`}
                                                    />
                                                </div>
                                                <span className="text-[11px] font-bold drop-shadow">
                                                    {currentLikes}
                                                </span>
                                            </button>

                                            <div className="flex flex-col items-center gap-1 text-white">
                                                <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20">
                                                    <MessageCircle className="w-5 h-5 text-white" />
                                                </div>
                                                <span className="text-[11px] font-bold drop-shadow">
                                                    {video.comments}
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={(e) => handleShare(video, e)}
                                                className="flex flex-col items-center gap-1 text-white group/btn"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover/btn:scale-110 transition-transform">
                                                    {copiedId === video.id ? (
                                                        <Check className="w-5 h-5 text-emerald-400" />
                                                    ) : (
                                                        <Share2 className="w-5 h-5 text-white" />
                                                    )}
                                                </div>
                                                <span className="text-[11px] font-bold drop-shadow">Share</span>
                                            </button>
                                        </div>

                                        {/* Bottom Creator & Title Bar */}
                                        <div className="absolute bottom-4 left-4 right-16 z-10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/30 relative">
                                                    <Image
                                                        src={INSTAGRAM_PROFILE.avatar}
                                                        alt={INSTAGRAM_PROFILE.handle}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-white drop-shadow">
                                                    @{INSTAGRAM_PROFILE.handle}
                                                </span>
                                            </div>
                                            <h4 className="text-xs font-extrabold text-white line-clamp-2 drop-shadow leading-snug mb-1">
                                                {video.title}
                                            </h4>
                                            <p className="text-[10px] text-white/70 line-clamp-1 drop-shadow">
                                                {video.tags.slice(0, 3).join(" ")}
                                            </p>
                                        </div>

                                        {/* Center Tap Play Cue */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                                                <Play className="w-6 h-6 ml-1 fill-current" />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
            </main>

            {/* LIGHTBOX THEATER MODAL */}
            <AnimatePresence>
                {activeVideoModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl"
                        onClick={() => setActiveVideoModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-5xl rounded-3xl bg-[#0c0c11] border border-white/15 overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
                        >
                            {/* Close Modal Button */}
                            <button
                                onClick={() => setActiveVideoModal(null)}
                                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
                                title="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Video Player Column */}
                            <div className="lg:w-7/12 bg-black flex items-center justify-center relative min-h-[300px] sm:min-h-[420px]">
                                <video
                                    src={activeVideoModal.videoUrl}
                                    poster={activeVideoModal.posterUrl}
                                    controls
                                    autoPlay
                                    playsInline
                                    className="w-full h-full max-h-[80vh] object-contain"
                                />
                            </div>

                            {/* Video Information & Engagement Sidebar */}
                            <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                                <div>
                                    {/* Creator profile snippet */}
                                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-pink-500/40 relative">
                                                <Image
                                                    src={INSTAGRAM_PROFILE.avatar}
                                                    alt={INSTAGRAM_PROFILE.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-foreground flex items-center gap-1">
                                                    @{INSTAGRAM_PROFILE.handle}
                                                    <BadgeCheck className="w-3.5 h-3.5 text-sky-400" />
                                                </p>
                                                <p className="text-[10px] text-muted-foreground">
                                                    Odense, Denmark 🇩🇰
                                                </p>
                                            </div>
                                        </div>

                                        <a
                                            href={activeVideoModal.instagramUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1 rounded-full bg-gradient-to-r from-[#f09433] to-[#bc1888] text-white text-[11px] font-bold hover:scale-105 transition-transform"
                                        >
                                            Follow
                                        </a>
                                    </div>

                                    {/* Title & Tag */}
                                    <div className="mb-2">
                                        <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                                            {activeVideoModal.categoryLabel}
                                        </span>
                                    </div>
                                    <h2 className="text-lg sm:text-xl font-extrabold text-foreground mb-3 leading-snug">
                                        {activeVideoModal.title}
                                    </h2>

                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                                        {activeVideoModal.description}
                                    </p>

                                    {/* Production Tools Used */}
                                    <div className="mb-6">
                                        <h4 className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-2 flex items-center gap-1.5">
                                            <Layers className="w-3.5 h-3.5 text-primary" />
                                            <span>Production Stack</span>
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {activeVideoModal.tools.map((tool, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-semibold text-foreground/90"
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hashtags */}
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {activeVideoModal.tags.map((tag, i) => (
                                            <span key={i} className="text-xs text-pink-400/80 font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Modal Footer Interactions */}
                                <div className="pt-4 border-t border-white/[0.08] space-y-3">
                                    <div className="flex items-center justify-between text-xs font-semibold">
                                        <div className="flex items-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() => handleLikeToggle(activeVideoModal.id)}
                                                className="flex items-center gap-1.5 text-muted-foreground hover:text-pink-500 transition-colors"
                                            >
                                                <Heart
                                                    className={`w-5 h-5 ${
                                                        likedVideos[activeVideoModal.id]
                                                            ? "fill-pink-500 text-pink-500"
                                                            : "text-muted-foreground"
                                                    }`}
                                                />
                                                <span>{likeCounts[activeVideoModal.id] || 0}</span>
                                            </button>

                                            <span className="flex items-center gap-1.5 text-muted-foreground">
                                                <MessageCircle className="w-5 h-5" />
                                                <span>{activeVideoModal.comments}</span>
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleShare(activeVideoModal)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-foreground text-xs font-bold transition-all"
                                        >
                                            {copiedId === activeVideoModal.id ? (
                                                <>
                                                    <Check className="w-4 h-4 text-emerald-400" />
                                                    <span>Link Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Share2 className="w-4 h-4" />
                                                    <span>Share Reel</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {/* Direct Action Link */}
                                    <a
                                        href={activeVideoModal.instagramUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
                                    >
                                        <Instagram className="w-4 h-4" />
                                        <span>View & Comment on Instagram Profile</span>
                                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
