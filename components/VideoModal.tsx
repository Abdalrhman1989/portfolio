"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    Download,
    Film,
    FileText,
    Sparkles,
    CheckCircle2,
    ExternalLink
} from "lucide-react";
import type { VideoType } from "./VideoModalContext";

interface VideoModalProps {
    isOpen: boolean;
    activeVideo: VideoType;
    onSelectVideo: (type: VideoType) => void;
    onClose: () => void;
}

const VIDEO_DATA: Record<
    VideoType,
    {
        title: string;
        subtitle: string;
        description: string;
        src: string;
        poster: string;
        tags: string[];
        durationHint: string;
        docLink?: { label: string; href: string };
    }
> = {
    portfolio: {
        title: "Portfolio Showreel (2026)",
        subtitle: "Featured Client Products, SaaS & Digital Ecosystems",
        description:
            "A motion graphics presentation highlighting key projects, including the Servixer Space platform, uBreak WeFix repair ecosystem, mobile solutions, and 3D web craft.",
        src: "/videos/Abd-Alrhman-Al-Darra-Portfolio.mp4",
        poster: "/videos/portfolio-poster.jpg",
        tags: ["Servixer Space", "uBreak WeFix", "Next.js", "React", "3D & Motion"],
        durationHint: "0:51 min • 1080p Full HD",
        docLink: { label: "Explore Projects Section", href: "#projects" }
    },
    resume: {
        title: "Motion Video Resume (2026)",
        subtitle: "Career Trajectory, Education & Engineering Mastery",
        description:
            "An animated visual journey through professional roles (Repairo.dk, Airplate, uBreak WeFix), academic degrees (UCL University College, Zealand Academy), and technical expertise.",
        src: "/videos/Abd-Aldarra-Resume.mp4",
        poster: "/videos/resume-poster.jpg",
        tags: ["Repairo.dk", "Airplate", "UCL University College", "Full-Stack Dev", "Denmark"],
        durationHint: "0:50 min • 1080p Full HD",
        docLink: { label: "View CV Document (PNG)", href: "/assets/resume.png" }
    }
};

export default function VideoModal({
    isOpen,
    activeVideo,
    onSelectVideo,
    onClose
}: VideoModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    const videoConfig = VIDEO_DATA[activeVideo];

    // Reset and auto-play when activeVideo or isOpen changes
    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.playbackRate = playbackSpeed;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch(() => {
                        // Browser autoplay policy might require mute or user interaction
                        setIsPlaying(false);
                    });
            }
        } else if (!isOpen && videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [isOpen, activeVideo, playbackSpeed]);

    // Handle ESC key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === " " && e.target === document.body) {
                e.preventDefault();
                togglePlay();
            } else if (e.key.toLowerCase() === "m") {
                toggleMute();
            } else if (e.key.toLowerCase() === "f") {
                toggleFullscreen();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, isPlaying, isMuted, isFullscreen]);

    // Toggle play/pause
    const togglePlay = useCallback(() => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, []);

    // Toggle mute
    const toggleMute = useCallback(() => {
        if (!videoRef.current) return;
        const newMuted = !videoRef.current.muted;
        videoRef.current.muted = newMuted;
        setIsMuted(newMuted);
    }, []);

    // Toggle Fullscreen
    const toggleFullscreen = useCallback(() => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(() => {});
            setIsFullscreen(true);
        } else {
            document.exitFullscreen().catch(() => {});
            setIsFullscreen(false);
        }
    }, []);

    // Speed toggle
    const cycleSpeed = useCallback(() => {
        const speeds = [1, 1.25, 1.5, 2];
        const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
        setPlaybackSpeed(nextSpeed);
        if (videoRef.current) {
            videoRef.current.playbackRate = nextSpeed;
        }
    }, [playbackSpeed]);

    const formatTime = (secs: number) => {
        if (isNaN(secs)) return "0:00";
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="video-modal-title"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/85 backdrop-blur-2xl"
                    />

                    {/* Modal Window */}
                    <motion.div
                        ref={containerRef}
                        initial={{ opacity: 0, scale: 0.94, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 20 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-5xl bg-card/95 border border-border/70 rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden z-10 flex flex-col my-auto"
                        onMouseEnter={() => setShowControls(true)}
                    >
                        {/* Header Tabs & Close */}
                        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-border/50 bg-background/60 backdrop-blur-md">
                            {/* Tab Switcher */}
                            <div className="flex items-center gap-2 p-1 bg-muted/60 rounded-2xl border border-border/40">
                                <button
                                    onClick={() => onSelectVideo("portfolio")}
                                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                                        activeVideo === "portfolio"
                                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    }`}
                                >
                                    <Film className="w-4 h-4" />
                                    <span>Portfolio Showreel</span>
                                </button>
                                <button
                                    onClick={() => onSelectVideo("resume")}
                                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                                        activeVideo === "resume"
                                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    }`}
                                >
                                    <FileText className="w-4 h-4" />
                                    <span>Video Resume</span>
                                </button>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="p-2 sm:p-2.5 rounded-full bg-muted/50 hover:bg-destructive hover:text-destructive-foreground text-muted-foreground transition-all duration-200"
                                aria-label="Close video modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Video Player Box */}
                        <div className="relative aspect-video w-full bg-black group overflow-hidden select-none">
                            <video
                                ref={videoRef}
                                src={videoConfig.src}
                                poster={videoConfig.poster}
                                playsInline
                                onTimeUpdate={() => {
                                    if (videoRef.current) {
                                        setCurrentTime(videoRef.current.currentTime);
                                    }
                                }}
                                onLoadedMetadata={() => {
                                    if (videoRef.current) {
                                        setDuration(videoRef.current.duration);
                                    }
                                }}
                                onEnded={() => setIsPlaying(false)}
                                onClick={togglePlay}
                                className="w-full h-full object-contain cursor-pointer"
                            />

                            {/* Center Big Play Button (shown when paused) */}
                            {!isPlaying && (
                                <motion.button
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    onClick={togglePlay}
                                    className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-2xl shadow-primary/50 hover:scale-110 hover:bg-primary transition-all duration-200 z-20"
                                    aria-label="Play video"
                                >
                                    <Play className="w-9 h-9 fill-current translate-x-0.5" />
                                </motion.button>
                            )}

                            {/* Custom Controls Bar */}
                            <div
                                className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300 z-20 ${
                                    showControls || !isPlaying ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                {/* Scrubber Bar */}
                                <div className="relative mb-3 flex items-center">
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration || 100}
                                        value={currentTime}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            setCurrentTime(val);
                                            if (videoRef.current) {
                                                videoRef.current.currentTime = val;
                                            }
                                        }}
                                        className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary hover:h-2.5 transition-all"
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-3 text-white text-xs sm:text-sm">
                                    {/* Left controls: Play/Pause, Mute, Time */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={togglePlay}
                                            className="p-1.5 hover:text-primary transition-colors"
                                            aria-label={isPlaying ? "Pause" : "Play"}
                                        >
                                            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                                        </button>

                                        <button
                                            onClick={toggleMute}
                                            className="p-1.5 hover:text-primary transition-colors"
                                            aria-label={isMuted ? "Unmute" : "Mute"}
                                        >
                                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                        </button>

                                        <span className="font-mono text-xs text-white/80">
                                            {formatTime(currentTime)} / {formatTime(duration)}
                                        </span>
                                    </div>

                                    {/* Right controls: Speed, Download, Fullscreen */}
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <button
                                            onClick={cycleSpeed}
                                            className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-mono font-bold transition-colors"
                                            title="Playback Speed"
                                        >
                                            {playbackSpeed}x
                                        </button>

                                        <a
                                            href={videoConfig.src}
                                            download
                                            className="p-1.5 hover:text-primary transition-colors"
                                            title="Download Video"
                                        >
                                            <Download className="w-4 h-4" />
                                        </a>

                                        <button
                                            onClick={toggleFullscreen}
                                            className="p-1.5 hover:text-primary transition-colors"
                                            aria-label="Toggle Fullscreen"
                                        >
                                            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Video Metadata & Description Footer */}
                        <div className="p-5 sm:p-7 bg-card border-t border-border/40">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-wider">
                                            {videoConfig.durationHint}
                                        </span>
                                        <span className="text-xs text-muted-foreground font-semibold">
                                            {videoConfig.subtitle}
                                        </span>
                                    </div>
                                    <h3 id="video-modal-title" className="text-xl sm:text-2xl font-black text-foreground">
                                        {videoConfig.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                                        {videoConfig.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0">
                                    {videoConfig.docLink && (
                                        <a
                                            href={videoConfig.docLink.href}
                                            onClick={() => {
                                                if (videoConfig.docLink?.href.startsWith("#")) {
                                                    onClose();
                                                }
                                            }}
                                            target={videoConfig.docLink.href.startsWith("#") ? "_self" : "_blank"}
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                                        >
                                            <span>{videoConfig.docLink.label}</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    )}
                                    <div className="flex flex-wrap gap-1.5">
                                        {videoConfig.tags.map((t) => (
                                            <span
                                                key={t}
                                                className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/40"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
