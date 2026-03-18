"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Send, Rocket } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-24 bg-card/20 relative overflow-hidden border-t border-border/50">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2" />
            
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 p-3 px-6 rounded-full bg-primary/10 border border-primary/20 text-primary mb-12 animate-pulse">
                        <Rocket className="w-5 h-5" />
                        <span className="text-sm font-black uppercase tracking-widest">Available for new opportunities</span>
                    </div>

                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-10 italic leading-tight">
                        Ready to <br />
                        <span className="text-primary not-italic inline-flex items-center gap-4">
                            Build <ArrowRight className="w-12 h-12 md:w-20 md:h-20" /> Perfect 
                        </span> <br />
                        Experiences?
                    </h2>

                    <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
                        Currently in Odense, Denmark & working with clients worldwide. Whether you have a project in mind or just want to say hi, my inbox is always open.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            href="#contact"
                            className="w-full sm:w-auto px-12 py-5 rounded-full bg-primary text-primary-foreground font-black uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-3 group group-hover:scale-105"
                        >
                            Start A Project
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                        
                        <a
                            href="mailto:contact@abdalrhman.com"
                            className="w-full sm:w-auto px-12 py-5 rounded-full bg-card border border-border/50 hover:border-primary/50 text-foreground font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                        >
                            Say Hello
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                    
                    <div className="mt-20 flex justify-center gap-12 text-muted-foreground/30">
                        {["Creative Design", "Full-Stack Code", "3D Animation", "Process Driven"].map(item => (
                            <span key={item} className="text-xs font-black uppercase tracking-widest hidden md:inline">{item}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
