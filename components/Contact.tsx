"use client";

import { useState } from "react";
import { Mail, MapPin, Send, MessageCircle, Phone, ArrowUpRight } from "lucide-react";

export const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mailto fallback
        const subject = encodeURIComponent(formData.subject || "Portfolio Contact");
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:abdalrhmanaldarra@gmail.com?subject=${subject}&body=${body}`;
    };

    const handleWhatsAppSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const text = encodeURIComponent(
            `Hi Abd Alrhman! My name is ${formData.name || "a visitor"}${formData.email ? ` (${formData.email})` : ""}.\n\nSubject: ${formData.subject || "Portfolio Inquiry"}\n\n${formData.message || "I'd like to get in touch regarding a potential project or opportunity."}`
        );
        window.open(`https://wa.me/4542223110?text=${text}`, "_blank");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="py-24 bg-background relative overflow-hidden">
            {/* Subtle glow background */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#25D366]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                    {/* Contact Info Side */}
                    <div className="w-full lg:w-5/12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                            Direct Communication
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight text-foreground">
                            Let's <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">Connect</span>
                        </h2>
                        <p className="text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
                            Have an exciting project, full-time engineering role, or just want to chat? Reach out directly via WhatsApp for fastest response or send an email.
                        </p>

                        <div className="space-y-4">
                            {/* WhatsApp Card - Highlighted */}
                            <a
                                href="https://wa.me/4542223110"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-card border border-[#25D366]/30 hover:border-[#25D366] transition-all shadow-sm hover:shadow-[0_0_30px_rgba(37,211,102,0.2)] block"
                            >
                                <div className="p-3 bg-[#25D366]/15 group-hover:bg-[#25D366] text-[#25D366] group-hover:text-white rounded-xl transition-colors shrink-0">
                                    <WhatsAppIcon className="w-6 h-6 fill-current" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                                            WhatsApp & Mobile
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </span>
                                        </h3>
                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </div>
                                    <p className="text-foreground font-mono font-bold text-base sm:text-lg mt-0.5 tracking-wide">
                                        +45 42 22 31 10
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[11px] font-mono text-muted-foreground">004542223110</span>
                                        <span className="text-muted-foreground/40">•</span>
                                        <span className="text-[11px] text-[#25D366] font-semibold">Fastest Response</span>
                                    </div>
                                </div>
                            </a>

                            {/* Email Card */}
                            <a
                                href="mailto:abdalrhmanaldarra@gmail.com"
                                className="group flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all shadow-sm block"
                            >
                                <div className="p-3 bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary rounded-xl transition-colors shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-bold text-base text-foreground">Email</h3>
                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </div>
                                    <p className="text-muted-foreground group-hover:text-primary transition-colors text-sm sm:text-base truncate mt-0.5 font-medium">
                                        abdalrhmanaldarra@gmail.com
                                    </p>
                                    <p className="text-[11px] text-muted-foreground mt-1">For formal inquiries, NDAs & proposals</p>
                                </div>
                            </a>

                            {/* Location Card */}
                            <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-sm">
                                <div className="p-3 bg-muted text-foreground rounded-xl shrink-0">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base text-foreground">Location</h3>
                                    <p className="text-muted-foreground text-sm sm:text-base font-medium mt-0.5">
                                        Odense, Denmark 🇩🇰
                                    </p>
                                    <p className="text-[11px] text-muted-foreground mt-1">Available for local roles & remote global contracts</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Side */}
                    <div className="w-full lg:w-7/12 bg-card p-6 sm:p-9 rounded-3xl border border-border shadow-lg relative">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">Send a Message</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                            Fill out the form below. You can send it directly via Email or send it straight to WhatsApp.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                                        placeholder="e.g. Sarah Connor"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Your Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                                        placeholder="sarah@company.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-foreground"
                                    placeholder="Project Inquiry / Job Opportunity / Certificate Request"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-sm text-foreground"
                                    placeholder="Tell me about your project, timeline, or requirement..."
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                {/* WhatsApp Submit Button */}
                                <button
                                    type="button"
                                    onClick={handleWhatsAppSubmit}
                                    className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20 cursor-pointer group"
                                    title="Send this message directly to WhatsApp 004542223110"
                                >
                                    <WhatsAppIcon className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                                    <span>Chat on WhatsApp</span>
                                </button>

                                {/* Email Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-3.5 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20 cursor-pointer"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Send via Email</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

