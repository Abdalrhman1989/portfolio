"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Send, Rocket } from "lucide-react";
import Link from "next/link";

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

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
                        Currently in Odense, Denmark & working with clients worldwide. Whether you have a project in mind or just want to say hi, my WhatsApp and inbox are always open.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="#contact"
                            className="w-full sm:w-auto px-9 py-4 rounded-full bg-primary text-primary-foreground font-black uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-3 group group-hover:scale-105 text-sm"
                        >
                            Start A Project
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>

                        <a
                            href="https://wa.me/4542223110"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/25 text-sm hover:scale-105 cursor-pointer"
                            title="Chat directly on WhatsApp: 004542223110"
                        >
                            <WhatsAppIcon className="w-4 h-4 fill-current" />
                            WhatsApp Me
                        </a>
                        
                        <a
                            href="mailto:abdalrhmanaldarra@gmail.com"
                            className="w-full sm:w-auto px-9 py-4 rounded-full bg-card border border-border/80 hover:border-primary/50 text-foreground font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 text-sm"
                        >
                            Say Hello
                            <Mail className="w-4 h-4" />
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
