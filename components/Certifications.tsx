"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Award, X, Lock, Unlock, Eye, Mail, Send, Check, Building, User, HelpCircle, ShieldCheck } from "lucide-react";

export const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const certificates = [
    {
        title: "Bachelor's Degree",
        issuer: "Ministry of Higher Education",
        image: "/assets/certs/bachelor-diploma.png",
        date: "June 2021"
    },
    {
        title: "Multimedia Design & Communication",
        issuer: "Zealand Academy",
        image: "/assets/certs/multimedia-diploma.png",
        date: "June 2021"
    },
    {
        title: "Python Programming",
        issuer: "Itucation",
        image: "/assets/certs/python.png",
        date: "July 2023"
    },
    {
        title: "ASP.NET Core MVC",
        issuer: "Itucation",
        image: "/assets/certs/asp-net.png",
        date: "Sep 2022"
    },
    {
        title: "SQL Database Development",
        issuer: "Itucation",
        image: "/assets/certs/sql-dev.png",
        date: "Aug 2022"
    },
    {
        title: "Digital Marketing",
        issuer: "KEA",
        image: "/assets/certs/digital-marketing.png",
        date: "Jan 2023"
    }
];

export default function Certifications() {
    const [selectedCert, setSelectedCert] = useState<string | null>(null);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState(false);

    // Request Access Code Modal State
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [reqName, setReqName] = useState("");
    const [reqCompany, setReqCompany] = useState("");
    const [reqEmail, setReqEmail] = useState("");
    const [reqReason, setReqReason] = useState("Recruitment / Hiring Assessment");
    const [reqSubmitted, setReqSubmitted] = useState(false);

    // Use the password from the environment variable (or a default for demo)
    const SECRET_PASSWORD = process.env.NEXT_PUBLIC_CERTS_PASSWORD || "demo123";

    useEffect(() => {
        // Check if user already unlocked this session
        const status = sessionStorage.getItem("certs_unlocked");
        if (status === "true") {
            setIsUnlocked(true);
        }
    }, []);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === SECRET_PASSWORD) {
            setIsUnlocked(true);
            setError(false);
            sessionStorage.setItem("certs_unlocked", "true");
        } else {
            setError(true);
            setPasswordInput("");
            // Reset error after 2 seconds
            setTimeout(() => setError(false), 2000);
        }
    };

    const handleSendWhatsApp = (e: React.FormEvent) => {
        e.preventDefault();
        const text = `Hi Abd Alrhman! My name is ${reqName.trim() || "a visitor"}${reqCompany.trim() ? ` from ${reqCompany.trim()}` : ""}. I am reviewing your portfolio and would like to request the access code to view your official certificates and credentials.%0A%0A• Contact Email: ${reqEmail.trim() || "Provided on request"}%0A• Reason/Role: ${reqReason}`;
        window.open(`https://wa.me/4542223110?text=${text}`, "_blank");
        setReqSubmitted(true);
        setTimeout(() => {
            setReqSubmitted(false);
            setIsRequestModalOpen(false);
        }, 2200);
    };

    const handleSendEmail = () => {
        const subject = encodeURIComponent("Certificate Access Code Request — Abd Alrhman Portfolio");
        const body = encodeURIComponent(
            `Hi Abd Alrhman,\n\nI would like to request the access code to view your official university degrees and accredited certifications on your portfolio.\n\nName: ${reqName || "N/A"}\nCompany / Organization: ${reqCompany || "N/A"}\nEmail: ${reqEmail || "N/A"}\nPurpose: ${reqReason}\n\nThank you!`
        );
        window.location.href = `mailto:abdalrhmandarra@gmail.com?subject=${subject}&body=${body}`;
        setReqSubmitted(true);
        setTimeout(() => {
            setReqSubmitted(false);
            setIsRequestModalOpen(false);
        }, 2200);
    };

    return (
        <section id="certifications" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Certifications <span className="text-primary">&</span> Awards
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Continuous learning and professional development achievements. Click to view details.
                    </p>
                </div>

                <div className="relative">
                    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${!isUnlocked ? 'blur-md grayscale saturate-50 pointer-events-none opacity-80 select-none' : 'blur-0 opacity-100'}`}>
                        {certificates.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                onClick={() => isUnlocked && setSelectedCert(cert.image)}
                                className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md"
                            >
                                <div className="relative h-64 w-full bg-muted overflow-hidden">
                                    <Image
                                        src={cert.image}
                                        alt={cert.title}
                                        fill
                                        className="object-cover object-top hover:scale-105 transition-transform duration-500"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-4">
                                        <Award className="w-8 h-8 text-primary mb-2" />
                                        <p className="text-white font-bold">{cert.title}</p>
                                        <p className="text-gray-300 text-sm">{cert.issuer}</p>
                                        <p className="text-primary text-xs mt-2">{cert.date}</p>
                                        <p className="text-white/80 text-xs mt-4 border border-white/30 px-3 py-1 rounded-full">Click to Open</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Security Overlay */}
                    {!isUnlocked && (
                        <motion.div 
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                            className="absolute inset-0 flex items-center justify-center z-20 px-4 sm:px-6 py-8 bg-background/20 backdrop-blur-sm"
                        >
                            <div className="bg-card/80 dark:bg-[#0c0c0c]/85 backdrop-blur-2xl border border-border dark:border-white/15 shadow-[0_0_50px_-12px_rgba(20,184,166,0.3)] p-6 sm:p-9 rounded-[2rem] sm:rounded-[2.5rem] max-w-lg w-full text-center relative overflow-hidden group transition-all">
                                {/* Decorative gradient background for the card */}
                                <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-700 pointer-events-none" />
                                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />
                                
                                <div className="relative z-10">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/15 rounded-3xl flex items-center justify-center mx-auto mb-5 sm:mb-6 rotate-6 group-hover:rotate-0 transition-transform duration-500 border border-primary/30 shadow-inner">
                                        <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight">Credentials Protected</h3>
                                    <p className="text-muted-foreground mb-6 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                                        Official university degrees and accredited certifications are encrypted to protect sensitive academic IDs. Enter your code to unlock.
                                    </p>
                                    
                                    <form onSubmit={handleUnlock} className="space-y-3.5">
                                        <div className="relative group/input">
                                            <input
                                                type="password"
                                                value={passwordInput}
                                                onChange={(e) => setPasswordInput(e.target.value)}
                                                placeholder="Enter Access Code"
                                                className={`w-full bg-background/80 dark:bg-black/50 border-2 ${error ? 'border-red-500/70 animate-shake' : 'border-border dark:border-white/10'} focus:border-primary outline-none px-4 sm:px-6 py-3.5 rounded-2xl text-center transition-all backdrop-blur-sm text-base sm:text-lg tracking-[0.25em] font-mono placeholder:tracking-normal placeholder:font-sans placeholder:text-muted-foreground/60 text-foreground`}
                                            />
                                            {error && (
                                                <motion.p 
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-500 dark:text-red-400 text-[11px] mt-2 font-semibold uppercase tracking-widest"
                                                >
                                                    Invalid Authentication Code
                                                </motion.p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-primary text-primary-foreground font-black py-3.5 sm:py-4 rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_10px_20px_-10px_rgba(20,184,166,0.5)] flex items-center justify-center gap-2.5 group/btn overflow-hidden relative cursor-pointer"
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                            <span className="relative z-10 uppercase tracking-widest text-xs font-bold">Authorize & View Diplomas</span>
                                            <Unlock className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </form>

                                    {/* Request Access Code Section */}
                                    <div className="mt-6 pt-5 border-t border-border/70 dark:border-white/10">
                                        <div className="flex items-center justify-center gap-2 mb-3">
                                            <span className="h-[1px] w-6 bg-border dark:bg-white/10" />
                                            <p className="text-xs font-semibold text-foreground tracking-wide">
                                                Don't have an access code?
                                            </p>
                                            <span className="h-[1px] w-6 bg-border dark:bg-white/10" />
                                        </div>
                                        <p className="text-[11px] sm:text-xs text-muted-foreground mb-4">
                                            Recruiters & hiring managers can request instant access via WhatsApp or Email:
                                        </p>

                                        {/* Action Buttons for Requesting */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            {/* WhatsApp Request Direct */}
                                            <a
                                                href="https://wa.me/4542223110?text=Hi%20Abd%20Alrhman,%20I%20am%20reviewing%20your%20portfolio%20and%20would%20like%20to%20request%20the%20access%20code%20to%20view%20your%20official%20certificates%20and%20credentials."
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 py-3 px-3.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/35 transition-all text-xs font-bold group/wa shadow-sm hover:shadow-[0_0_20px_rgba(37,211,102,0.35)] cursor-pointer"
                                                title="Send WhatsApp request to 004542223110"
                                            >
                                                <WhatsAppIcon className="w-4 h-4 fill-current group-hover/wa:scale-110 transition-transform shrink-0" />
                                                <span className="truncate">WhatsApp Request</span>
                                            </a>

                                            {/* Open Modal Request Form */}
                                            <button
                                                type="button"
                                                onClick={() => setIsRequestModalOpen(true)}
                                                className="flex items-center justify-center gap-2 py-3 px-3.5 rounded-xl bg-muted/80 hover:bg-muted text-foreground border border-border dark:border-white/10 hover:border-primary/50 transition-all text-xs font-bold cursor-pointer"
                                            >
                                                <Mail className="w-4 h-4 text-primary shrink-0" />
                                                <span className="truncate">Request Form</span>
                                            </button>
                                        </div>

                                        {/* Phone & Instant Demo helper */}
                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground px-1">
                                            <span className="flex items-center gap-1.5 font-mono">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span>WhatsApp:</span>
                                                <a 
                                                    href="https://wa.me/4542223110" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="text-foreground hover:text-primary font-bold transition-colors"
                                                >
                                                    004542223110
                                                </a>
                                            </span>

                                            {/* Quick Recruiter Demo Code hint */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPasswordInput(SECRET_PASSWORD);
                                                }}
                                                className="text-[10px] text-primary/80 hover:text-primary underline underline-offset-2 transition-colors cursor-pointer font-medium"
                                                title="Quick demo access for reviewers"
                                            >
                                                Fill demo code ({SECRET_PASSWORD})
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Modals: Certificate Full View & Access Code Request Form */}
            <AnimatePresence>
                {/* Certificate Full View Modal */}
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-5xl max-h-[95vh] w-full bg-background/50 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors border border-white/20"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="relative w-full h-[85vh] p-4">
                                <Image
                                    src={selectedCert}
                                    alt="Certificate Full View"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Request Access Code Modal */}
                {isRequestModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setIsRequestModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-lg w-full bg-card dark:bg-[#0f0f10] border border-border dark:border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
                        >
                            {/* Decorative background glow */}
                            <div className="absolute -top-20 -right-20 w-44 h-44 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-[#25D366]/15 rounded-full blur-3xl pointer-events-none" />

                            {/* Close button */}
                            <button
                                onClick={() => setIsRequestModalOpen(false)}
                                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/80 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-extrabold text-foreground">Request Access Code</h3>
                                        <p className="text-xs text-muted-foreground">Direct access for recruiters & clients</p>
                                    </div>
                                </div>

                                <p className="text-xs sm:text-sm text-muted-foreground mb-5 leading-relaxed">
                                    To protect academic credential numbers from scraping, enter your details below. Abd Alrhman will send you the verification code instantly via WhatsApp or Email.
                                </p>

                                {reqSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-10 text-center space-y-3"
                                    >
                                        <div className="w-14 h-14 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                                            <Check className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-lg font-bold text-foreground">Request Prepared!</h4>
                                        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                                            Redirecting you now to complete transmission. Abd will respond promptly with your access code.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSendWhatsApp} className="space-y-3.5">
                                        <div>
                                            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                                                Your Full Name *
                                            </label>
                                            <div className="relative">
                                                <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={reqName}
                                                    onChange={(e) => setReqName(e.target.value)}
                                                    placeholder="e.g. Sarah Jensen / John Smith"
                                                    className="w-full bg-background dark:bg-black/50 border border-border dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:border-primary outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                                                    Company / Org
                                                </label>
                                                <div className="relative">
                                                    <Building className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                                                    <input
                                                        type="text"
                                                        value={reqCompany}
                                                        onChange={(e) => setReqCompany(e.target.value)}
                                                        placeholder="e.g. Tech Corp / HR"
                                                        className="w-full bg-background dark:bg-black/50 border border-border dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:border-primary outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                                                    Your Email
                                                </label>
                                                <div className="relative">
                                                    <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                                                    <input
                                                        type="email"
                                                        value={reqEmail}
                                                        onChange={(e) => setReqEmail(e.target.value)}
                                                        placeholder="recruiter@company.com"
                                                        className="w-full bg-background dark:bg-black/50 border border-border dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:border-primary outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                                                Purpose
                                            </label>
                                            <select
                                                value={reqReason}
                                                onChange={(e) => setReqReason(e.target.value)}
                                                className="w-full bg-background dark:bg-black/50 border border-border dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground focus:border-primary outline-none transition-colors"
                                            >
                                                <option value="Recruitment / Hiring Assessment">Recruitment / Hiring Assessment</option>
                                                <option value="Client Project Due Diligence">Client Project Due Diligence</option>
                                                <option value="Academic Degree Verification">Academic Degree Verification</option>
                                                <option value="Contract / Freelance Partnership">Contract / Freelance Partnership</option>
                                                <option value="General Portfolio Review">General Portfolio Review</option>
                                            </select>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            {/* WhatsApp Direct Submit */}
                                            <button
                                                type="submit"
                                                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all cursor-pointer group"
                                            >
                                                <WhatsAppIcon className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                                                <span>Send via WhatsApp</span>
                                            </button>

                                            {/* Email Submit */}
                                            <button
                                                type="button"
                                                onClick={handleSendEmail}
                                                className="w-full py-3 px-4 rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border dark:border-white/10 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                                            >
                                                <Mail className="w-4 h-4 text-primary" />
                                                <span>Send via Email</span>
                                            </button>
                                        </div>

                                        {/* Direct Contact info footer */}
                                        <div className="pt-3 border-t border-border/60 text-center">
                                            <p className="text-[11px] text-muted-foreground">
                                                Immediate access needed? WhatsApp directly to:{" "}
                                                <a
                                                    href="https://wa.me/4542223110"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-bold text-emerald-500 hover:underline font-mono"
                                                >
                                                    004542223110 (+45 42 22 31 10)
                                                </a>
                                            </p>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both;
                    animation-iteration-count: 2;
                }
            `}</style>
        </section>
    );
}
