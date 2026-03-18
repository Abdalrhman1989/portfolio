"use client";

import { motion } from "framer-motion";
import { MessageCircle, Zap, ShieldCheck, HelpCircle } from "lucide-react";

const faqs = [
    {
        q: "What is your core design philosophy?",
        a: "I believe in 'Functional Aesthetics'—where beauty is never at the expense of performance or usability. Every animation, pixel, and line of code must serve a purpose."
    },
    {
        q: "How do you ensure project scalability?",
        a: "By using modular, type-safe architectures in Next.js and TypeScript. I prioritize clean code principles and early optimization for long-term growth and maintenance."
    },
    {
        q: "Can you work within cross-functional teams?",
        a: "Yes. My background as a Multimedia Designer allows me to communicate effectively with designers, while my Web Dev degree ensures I'm fully aligned with engineering standards."
    },
    {
        q: "Are you available for international projects?",
        a: "Absolutely. I am currently based in Odense, Denmark, but I have experience working with remote teams and global clients across different time zones."
    }
];

export default function FAQ() {
    return (
        <section id="faq" className="py-24 bg-card/10 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 p-2 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                        <HelpCircle className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-widest">Questions</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic">
                        The <span className="text-primary not-italic">Personal</span> <br />Perspective
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Insights into how I approach design, development, and professional collaboration.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-background border border-border/50 rounded-3xl p-8 hover:border-primary/50 transition-all flex flex-col justify-between group"
                        >
                            <div>
                                <h4 className="text-xl font-bold uppercase italic tracking-tighter mb-4 text-primary group-hover:scale-[1.02] origin-left transition-transform leading-snug">{faq.q}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors font-medium">
                                    {faq.a}
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-border/10 flex justify-between items-center">
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground/30">Philosophy.0{index + 1}</span>
                                <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
