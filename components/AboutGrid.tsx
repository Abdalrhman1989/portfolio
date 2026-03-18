"use client";

import { motion } from "framer-motion";
import { User, MapPin, Code2, Github, Cpu, Briefcase, ExternalLink, Mail, Phone, Rocket, Zap, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BentoCard = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={`bg-card p-6 rounded-3xl border border-border/50 shadow-lg relative overflow-hidden group hover:border-primary/40 transition-all ${className}`}
    >
        {children}
    </motion.div>
);

export default function AboutGrid() {
    return (
        <section id="about" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        Meet <span className="text-primary italic">The Engineer</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        A Multimedia Designer turned Full-Stack Developer, blending precision and artistic vision.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Image Card - NEW */}
                    <BentoCard className="md:col-span-4 md:row-span-2 p-0 overflow-hidden relative group/img">
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60" />
                        <Image
                            src="/assets/profile.jpg"
                            alt="Abd Alrhman Profile"
                            fill
                            className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                        />
                        <div className="absolute bottom-6 left-6 z-20">
                            <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/20 px-3 py-1 rounded-full backdrop-blur-md">Professional Engineer</span>
                        </div>
                    </BentoCard>

                    {/* Main Bio Card */}
                    <BentoCard className="md:col-span-8 md:row-span-2 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                    <User className="w-6 h-6" />
                                </div>
                                <span className="font-bold text-xl tracking-wide uppercase">Profile</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black mb-4 text-foreground leading-[1.05] tracking-tight">
                                ABD ALRHMAN <br /><span className="text-primary italic">DARRA</span>
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">
                                Born in 1989, I am a seasoned <span className="text-foreground font-bold">Web Developer & UI/UX Designer</span> based in Odense, Denmark. 
                                My background in Multimedia Design allows me to bridge the gap between complex engineering and pixel-perfect aesthetics.
                            </p>
                        </div>
                        <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap gap-3">
                            {["Multimedia Design", "Full-Stack Dev", "UI/UX Architecture", "AI Integration"].map((tag) => (
                                <span key={tag} className="px-5 py-2 rounded-full bg-secondary/80 text-secondary-foreground text-[10px] font-black uppercase tracking-widest border border-border/50">{tag}</span>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Location/Denmark Card - ENHANCED */}
                    <BentoCard className="md:col-span-5 flex flex-col justify-between overflow-hidden group/loc min-h-[220px]">
                        <div className="flex items-center justify-between relative z-20">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 group-hover/loc:bg-blue-500 group-hover/loc:text-white transition-all">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <span className="font-bold uppercase tracking-widest text-sm text-muted-foreground group-hover/loc:text-foreground">Current Hub</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-500 rounded-full border border-green-500/30">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-tighter">Available</span>
                            </div>
                        </div>
                        
                        <div className="relative z-20 mt-4">
                            <p className="text-3xl font-black tracking-tighter">ODENSE, <br /><span className="text-primary italic">DENMARK</span></p>
                        </div>

                        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10 group-hover/loc:opacity-30 transition-opacity">
                             <div className="absolute -right-4 -bottom-4 text-[100px] font-black text-foreground italic select-none">DK</div>
                        </div>
                        <p className="text-xs text-muted-foreground relative z-20 mt-4 font-medium italic">Danish quality meets global innovation.</p>
                    </BentoCard>

                    {/* Tech Stats Card */}
                    <BentoCard className="md:col-span-4 flex flex-col gap-5 justify-center">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    <span>Frontend Craft</span>
                                    <span className="text-primary tracking-normal">95%</span>
                                </div>
                                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: "95%" }} transition={{ duration: 1.5 }} className="h-full bg-primary" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    <span>Engineering</span>
                                    <span className="text-blue-500 tracking-normal">80%</span>
                                </div>
                                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: "80%" }} transition={{ duration: 1.5, delay: 0.2 }} className="h-full bg-blue-500" />
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Small Interests Card */}
                    <BentoCard className="md:col-span-3 flex flex-col gap-4">
                        <div className="p-3 bg-red-500/10 rounded-2xl text-red-500 w-fit">
                            <Heart className="w-6 h-6 animate-pulse" />
                        </div>
                        <h4 className="text-lg font-bold uppercase tracking-tight italic">Focus</h4>
                        <div className="flex flex-wrap gap-2">
                            {["AI", "3D", "Agile", "API"].map(item => (
                                <span key={item} className="text-[9px] font-black uppercase text-foreground/60 border border-border px-2 py-1 rounded hover:border-primary/40 hover:text-primary transition-all cursor-default">{item}</span>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Education Brief Card */}
                    <BentoCard className="md:col-span-7 flex items-center gap-8 group/edu">
                        <div className="hidden sm:block relative w-24 h-24 flex-shrink-0">
                            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover/edu:bg-primary/40 transition-colors" />
                            <div className="w-full h-full border border-primary/30 rounded-2xl flex items-center justify-center bg-card relative z-10 transition-transform group-hover/edu:-rotate-6">
                                <Rocket className="w-10 h-10 text-primary" />
                            </div>
                        </div>
                        <div>
                            <span className="font-black italic text-primary uppercase text-[10px] mb-2 tracking-[0.3em] block">Academic Background</span>
                            <h4 className="text-2xl font-black tracking-tighter leading-tight mb-2 uppercase italic">Bachelor in <span className="text-primary not-italic">Web Development</span></h4>
                            <p className="text-muted-foreground font-bold text-sm tracking-tight">UCL University College, <span className="text-foreground">Class of 2024</span></p>
                        </div>
                    </BentoCard>

                    {/* Quick Contact Card */}
                    <BentoCard className="md:col-span-5 bg-primary/5 group/contact flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-primary/20 rounded-2xl text-primary group-hover/contact:scale-110 transition-transform">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <span className="font-black text-xs uppercase tracking-[0.2em] italic">Engineering Nexus</span>
                            </div>
                            <Link href="#contact" className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                                <ExternalLink className="w-5 h-5" />
                            </Link>
                        </div>
                        <div>
                           <h4 className="text-3xl font-black uppercase italic tracking-tighter mb-2 leading-none">LET'S <span className="text-primary not-italic">BUILD</span></h4>
                           <p className="text-muted-foreground font-medium italic group-hover/contact:text-foreground transition-colors text-sm">Digital products are my canvas. Coding is my craft.</p>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </section>
    );
}
