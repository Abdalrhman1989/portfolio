"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Award, X, Lock, Unlock, Eye } from "lucide-react";

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
                            className="absolute inset-0 flex items-center justify-center z-20 px-6 py-12 bg-background/10"
                        >
                            <div className="bg-card/40 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_-12px_rgba(20,184,166,0.3)] p-10 rounded-[2.5rem] max-w-md w-full text-center relative overflow-hidden group">
                                {/* Decorative gradient background for the card */}
                                <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-700" />
                                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700" />
                                
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12 group-hover:rotate-0 transition-transform duration-500 border border-primary/30">
                                        <Lock className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-3 tracking-tight">Access Restricted</h3>
                                    <p className="text-muted-foreground mb-10 text-sm leading-relaxed">
                                        These official academic credentials are encrypted. Enter your personalized access code to verify authenticity.
                                    </p>
                                    
                                    <form onSubmit={handleUnlock} className="space-y-5">
                                        <div className="relative group/input">
                                            <input
                                                type="password"
                                                value={passwordInput}
                                                onChange={(e) => setPasswordInput(e.target.value)}
                                                placeholder="Enter Access Code"
                                                className={`w-full bg-black/40 border-2 ${error ? 'border-red-500/50 animate-shake' : 'border-white/5'} focus:border-primary/50 outline-none px-6 py-4 rounded-2xl text-center transition-all backdrop-blur-sm text-lg tracking-[0.3em] font-mono placeholder:tracking-normal placeholder:font-sans placeholder:text-muted-foreground/50`}
                                            />
                                            {error && (
                                                <motion.p 
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-400 text-[11px] mt-3 font-semibold uppercase tracking-widest"
                                                >
                                                    Invalid Authentication Code
                                                </motion.p>
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-primary text-primary-foreground font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_20px_-10px_rgba(20,184,166,0.5)] flex items-center justify-center gap-3 group/btn overflow-hidden relative"
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                            <span className="relative z-10 uppercase tracking-widest text-xs">Authorize Access</span>
                                            <Unlock className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                    
                                    <div className="flex items-center justify-center gap-2 mt-8 opacity-40">
                                        <div className="h-[1px] w-8 bg-current" />
                                        <p className="text-[9px] uppercase tracking-[0.2em] font-bold">
                                            Secure End-to-End Session
                                        </p>
                                        <div className="h-[1px] w-8 bg-current" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Modal for viewing certificate */}
            <AnimatePresence>
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
