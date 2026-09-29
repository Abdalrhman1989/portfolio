"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, X, FileText, Check, Sparkles, Globe2, Eye } from "lucide-react";
import Image from "next/image";

export type CvLanguage = "en" | "da" | "ar";

interface CvOption {
    id: CvLanguage;
    title: string;
    nativeName: string;
    flag: string;
    pdfUrl: string;
    previewUrl: string;
    fileSize: string;
    description: string;
}

export const cvOptions: CvOption[] = [
    {
        id: "en",
        title: "English (Global / ATS)",
        nativeName: "International Resume",
        flag: "🇬🇧",
        pdfUrl: "/assets/resumes/abd-resume-en.pdf",
        previewUrl: "/assets/resumes/preview-en-1.png",
        fileSize: "603 KB",
        description: "Comprehensive English CV optimized for global tech companies and ATS screening."
    },
    {
        id: "da",
        title: "Danish (Dansk)",
        nativeName: "Danmark CV",
        flag: "🇩🇰",
        pdfUrl: "/assets/resumes/abd-resume-da.pdf",
        previewUrl: "/assets/resumes/preview-da-1.png",
        fileSize: "612 KB",
        description: "Skræddersyet dansk CV rettet mod virksomheder og bureauer i Danmark."
    },
    {
        id: "ar",
        title: "Arabic (العربية)",
        nativeName: "السيرة الذاتية المهنية",
        flag: "🇸🇦",
        pdfUrl: "/assets/resumes/abd-resume-ar.pdf",
        previewUrl: "/assets/resumes/preview-ar-1.png",
        fileSize: "471 KB",
        description: "سيرة ذاتية متكاملة باللغة العربية للشركات والمؤسسات الإقليمية والدولية."
    }
];

interface CvModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialLang?: CvLanguage;
}

export default function CvModal({ isOpen, onClose, initialLang = "en" }: CvModalProps) {
    const [selectedLang, setSelectedLang] = useState<CvLanguage>(initialLang);

    // Sync initialLang
    useEffect(() => {
        if (initialLang) setSelectedLang(initialLang);
    }, [initialLang]);

    // Keyboard ESC to close & lock body scroll
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    const activeCv = cvOptions.find(c => c.id === selectedLang) || cvOptions[0];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Modal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="relative w-full max-w-4xl rounded-3xl bg-card dark:bg-[#0d0e14] border border-border dark:border-white/[0.12] shadow-[0_20px_70px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden z-10 my-auto text-left"
                    >
                        {/* Header Bar */}
                        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-border dark:border-white/[0.08] bg-muted/40 dark:bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-primary/10 border border-primary/25 text-primary">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-foreground dark:text-white tracking-tight flex items-center gap-2">
                                        <span>Download CV & Resume</span>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/30">
                                            3 Languages
                                        </span>
                                    </h3>
                                    <p className="text-xs text-muted-foreground dark:text-neutral-400">
                                        Choose your preferred language for Abd Alrhman's official resume
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-muted hover:bg-muted/80 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-muted-foreground hover:text-foreground dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Language Selector Pills */}
                        <div className="px-5 sm:px-7 pt-5 pb-3">
                            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-muted/50 dark:bg-white/[0.03] border border-border dark:border-white/[0.08]">
                                {cvOptions.map((cv) => {
                                    const isSelected = cv.id === selectedLang;
                                    return (
                                        <button
                                            key={cv.id}
                                            onClick={() => setSelectedLang(cv.id)}
                                            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                                isSelected
                                                    ? "bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(20,184,166,0.35)]"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted dark:text-neutral-300 dark:hover:text-white dark:hover:bg-white/[0.05]"
                                            }`}
                                        >
                                            <span className="text-base">{cv.flag}</span>
                                            <span className="truncate">{cv.title.split(" ")[0]}</span>
                                            {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Main Body: Document Preview + Actions */}
                        <div className="px-5 sm:px-7 pb-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            {/* Document Preview Card */}
                            <div className="md:col-span-6 relative rounded-2xl overflow-hidden border border-border dark:border-white/[0.1] bg-muted/30 dark:bg-[#050608] shadow-2xl aspect-[1/1.3] max-h-[420px] group">
                                <Image
                                    src={activeCv.previewUrl}
                                    alt={`${activeCv.title} Preview`}
                                    fill
                                    className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    priority
                                />
                                <a
                                    href={activeCv.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-[2px]"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Click to View Full Screen</span>
                                </a>
                            </div>

                            {/* Details & Actions Panel */}
                            <div className="md:col-span-6 flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">{activeCv.flag}</span>
                                        <div>
                                            <h4 className="font-extrabold text-foreground dark:text-white text-lg tracking-tight">
                                                {activeCv.title}
                                            </h4>
                                            <span className="text-xs text-primary font-mono font-medium">
                                                {activeCv.nativeName}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground dark:text-neutral-300 mb-6 leading-relaxed">
                                        {activeCv.description}
                                    </p>

                                    <div className="p-4 rounded-2xl bg-muted/40 dark:bg-white/[0.03] border border-border dark:border-white/[0.06] mb-6 space-y-2 text-xs font-mono">
                                        <div className="flex justify-between text-muted-foreground dark:text-neutral-400">
                                            <span>Format:</span>
                                            <span className="text-foreground dark:text-white font-bold">PDF (Vector Crisp)</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground dark:text-neutral-400">
                                            <span>File Size:</span>
                                            <span className="text-foreground dark:text-white">{activeCv.fileSize}</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground dark:text-neutral-400">
                                            <span>Optimization:</span>
                                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% ATS Compliant</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground dark:text-neutral-400">
                                            <span>Profile:</span>
                                            <span className="text-primary font-semibold">Full-Stack & Mobile Engineer</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href={activeCv.pdfUrl}
                                        download={`Abd-Alrhman-Al-Darra-Resume-${activeCv.id}.pdf`}
                                        className="flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-primary dark:to-emerald-400 text-white dark:text-black font-extrabold text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(20,184,166,0.3)] cursor-pointer"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Download PDF</span>
                                    </a>

                                    <a
                                        href={activeCv.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-3 px-5 rounded-full bg-muted/80 hover:bg-muted dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-foreground dark:text-neutral-200 border border-border dark:border-white/[0.1] font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span>Open Preview</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
