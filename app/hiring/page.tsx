import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
    Download, 
    Mail, 
    MapPin, 
    CheckCircle2, 
    Calendar, 
    Globe, 
    Code2, 
    Smartphone, 
    Cpu, 
    Database, 
    ArrowRight, 
    ShieldCheck, 
    Layers, 
    Award,
    Clock,
    UserCheck,
    Video
} from "lucide-react";

export const metadata: Metadata = {
    title: "Hire Abd Alrhman | Full-Stack & Mobile Engineer — Odense, Denmark",
    description: "Recruiter brief & executive dossier for Abd Alrhman. Senior Full-Stack Developer & Mobile Engineer based in Odense, Denmark (DK-83). Permanent work authorization, immediate availability for full-time & contract roles.",
    keywords: [
        "Hire Full Stack Developer Odense",
        "Ansæt Softwareudvikler Odense",
        "Flutter Developer Denmark",
        "React Next.js Engineer Fyn",
        "Frontend Engineer Odense",
        "Full-Stack Developer Copenhagen",
        "Abd Alrhman Darra",
        "Software Engineer Odense Denmark"
    ],
    openGraph: {
        title: "Hire Abd Alrhman | Full-Stack & Mobile Engineer (Odense, DK)",
        description: "Permanent Danish work authorization. Full-Stack (Next.js/React/Node), Mobile (Flutter/Dart), AI Systems, and 3D. Open for full-time and contract positions in Denmark.",
        url: "https://portfolio-abdal-2026.vercel.app/hiring",
        siteName: "Abd Alrhman Portfolio",
        images: [
            {
                url: "/assets/chat-avatar.png",
                width: 800,
                height: 800,
                alt: "Abd Alrhman - Full-Stack Engineer"
            }
        ],
        locale: "en_DK",
        type: "profile"
    }
};

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const recruiterFaqs = [
    {
        q: "What is Abd Alrhman's current work authorization in Denmark?",
        a: "Abd Alrhman resides in Odense, Denmark (postcode 5000) and holds valid, permanent work authorization. No sponsorship or visa processing is required to hire him."
    },
    {
        q: "What roles is Abd Alrhman seeking?",
        a: "Full-Stack Software Engineer, Mobile Application Engineer (Flutter/Dart), Frontend Engineer (React/Next.js/TypeScript), and AI Systems Integration Engineer. Open to on-site in Odense/Fyn/Trekantområdet, hybrid in Copenhagen/Aarhus, or remote."
    },
    {
        q: "What is his availability and notice period?",
        a: "Immediate availability (0 weeks notice). Ready to interview and start immediately."
    },
    {
        q: "What languages does he speak?",
        a: "Danish (Professional proficiency), English (Fluent / Full professional proficiency), and Arabic (Native)."
    },
    {
        q: "What makes Abd Alrhman uniquely qualified?",
        a: "He bridges high-performance software engineering (Next.js, TypeScript, Python, C#, Flutter) with production-grade multimedia (certified drone pilot, videography, Blender 3D, AI media automation) — delivering unmatched speed and cross-disciplinary impact."
    }
];

export default function HiringPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": recruiterFaqs.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    return (
        <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Breadcrumb & Live Status Pill */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-foreground font-semibold">Recruiter Dossier & Hiring Hub</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Available for Immediate Hire in Denmark 🇩🇰
                </div>
            </div>

            {/* Header Hero Section */}
            <section className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-card/90 via-card/70 to-card/50 dark:from-neutral-900/90 dark:via-neutral-900/70 dark:to-neutral-950/90 border border-border/80 dark:border-white/[0.08] backdrop-blur-xl shadow-2xl overflow-hidden mb-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-xl shrink-0 bg-neutral-900">
                            <Image
                                src="/assets/chat-avatar.png"
                                alt="Abd Alrhman Darra"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-mono text-xs font-bold border border-primary/20">
                                    Candidate ID: AAD-2026-DK
                                </span>
                                <span className="px-2.5 py-0.5 rounded-md bg-muted text-muted-foreground font-mono text-xs">
                                    Odense, Syddanmark
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                                Abd Alrhman Talaat Alshaar Dit Darra
                            </h1>
                            <p className="text-base sm:text-lg text-primary font-medium mt-1">
                                Senior Full-Stack Developer & Mobile Engineer
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl">
                                Specialized in React, Next.js, Flutter, TypeScript, Python, C#, C++, and enterprise cloud architectures. Bridging software engineering with AI multimedia and 3D spatial tech.
                            </p>
                        </div>
                    </div>

                    {/* Quick Direct Actions */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                        <a
                            href="https://wa.me/4542223110?text=Hej%20Abd%20Alrhman,%20vi%20har%20set%20dit%20kandidat-dossier%20og%20vil%20gerne%20invitere%20dig%20til%20en%20samtale."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
                        >
                            <WhatsAppIcon className="w-5 h-5 fill-current" />
                            <span>WhatsApp Interview (+45 42 22 31 10)</span>
                        </a>

                        <a
                            href="mailto:abdalrhmanaldarra@gmail.com?subject=Job%20Opportunity%20in%20Denmark%20%E2%80%94%20Abd%20Alrhman&body=Hi%20Abd%20Alrhman,%0D%0A%0D%0AWe%20reviewed%20your%20portfolio%20and%20recruiter%20dossier.%20We%20would%20like%20to%20discuss%20an%20open%20engineering%20role%20with%20you.%0D%0A%0D%0ABest%20regards,"
                            className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
                        >
                            <Mail className="w-4 h-4" />
                            <span>Email Directly</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Quick Facts Grid for Recruiters */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                            <MapPin className="w-4 h-4" />
                            Location & Work Authorization
                        </div>
                        <p className="text-xl font-bold text-foreground">Odense, Denmark 🇩🇰</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Permanent legal work permit. CPR registered in Odense. Ready to work without sponsorship delay.
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/50 text-xs font-mono text-emerald-500 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 100% Work Authorized in DK
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                            <Clock className="w-4 h-4" />
                            Availability & Contract
                        </div>
                        <p className="text-xl font-bold text-foreground">Immediate Availability</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Notice period: 0 weeks. Open for permanent full-time (Fastansættelse), contract, or freelance consultancy.
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/50 text-xs font-mono text-emerald-500 font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Start Date: Immediately
                    </div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                            <Globe className="w-4 h-4" />
                            Languages & Commute
                        </div>
                        <p className="text-xl font-bold text-foreground">Danish • English • Arabic</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Fluent English & professional Danish. Can work on-site in Odense/Fyn, commute to Trekantområdet/København, or remote.
                        </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/50 text-xs font-mono text-primary font-semibold flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5" /> On-site, Hybrid & Remote
                    </div>
                </div>
            </section>

            {/* Official Resume Downloads (3 Languages) */}
            <section className="rounded-2xl p-6 sm:p-8 bg-card border border-border/80 shadow-sm mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <Download className="w-5 h-5 text-primary" />
                            Official CV & Resume Downloads
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Download Abd Alrhman&apos;s verified curriculum vitae in your preferred language.
                        </p>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg border border-border self-start md:self-auto">
                        Updated: September 2026 • Verified
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a
                        href="/Resume danish.pdf"
                        download="Abd_Alrhman_CV_Dansk.pdf"
                        className="p-4 rounded-xl bg-background hover:bg-muted/40 border border-border/80 hover:border-primary/50 transition-all group flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">🇩🇰</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">DANSK</span>
                            </div>
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">
                                Dansk CV (Ansøgning)
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">
                                Skræddersyet til danske virksomheder og rekrutteringsbureauer.
                            </p>
                        </div>
                        <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary">
                            <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                            Download Dansk PDF
                        </div>
                    </a>

                    <a
                        href="/Abd Resume.pdf"
                        download="Abd_Alrhman_CV_English.pdf"
                        className="p-4 rounded-xl bg-background hover:bg-muted/40 border border-border/80 hover:border-primary/50 transition-all group flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">🇬🇧</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">ENGLISH</span>
                            </div>
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">
                                English Master CV
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">
                                International format featuring full tech stack, architectural milestones & projects.
                            </p>
                        </div>
                        <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary">
                            <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                            Download English PDF
                        </div>
                    </a>

                    <a
                        href="/Resume arabic.pdf"
                        download="Abd_Alrhman_CV_Arabic.pdf"
                        className="p-4 rounded-xl bg-background hover:bg-muted/40 border border-border/80 hover:border-primary/50 transition-all group flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">🇦🇪</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">ARABIC</span>
                            </div>
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">
                                Arabic Executive CV
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">
                                Complete profile and engineering record in Arabic.
                            </p>
                        </div>
                        <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary">
                            <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                            Download Arabic PDF
                        </div>
                    </a>
                </div>
            </section>

            {/* Core Competency & Stack Matrix */}
            <section className="rounded-2xl p-6 sm:p-8 bg-card border border-border/80 shadow-sm mb-10">
                <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 mb-2">
                    <Layers className="w-5 h-5 text-primary" />
                    Technical Matrix & Core Specializations
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                    Demonstrated production proficiency across client, server, mobile, data, and visual systems.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-background border border-border/70">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                            <Code2 className="w-4 h-4" />
                            Frontend & Web
                        </div>
                        <ul className="text-xs space-y-1.5 text-muted-foreground">
                            <li>• React 19 / Next.js 15 (SSR, Turbopack)</li>
                            <li>• TypeScript & Modern JavaScript (ESNext)</li>
                            <li>• Tailwind CSS & Vanilla Modern CSS</li>
                            <li>• Framer Motion & Responsive Layouts</li>
                            <li>• Web Performance & Core Web Vitals</li>
                        </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-background border border-border/70">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                            <Smartphone className="w-4 h-4" />
                            Mobile Engineering
                        </div>
                        <ul className="text-xs space-y-1.5 text-muted-foreground">
                            <li>• Flutter & Dart (Cross-Platform iOS & Android)</li>
                            <li>• State Management (Bloc, Riverpod, Provider)</li>
                            <li>• Native Device APIs & Background Tasks</li>
                            <li>• Offline-first Architecture & Local Caching</li>
                            <li>• App Store & Google Play Deployment</li>
                        </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-background border border-border/70">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                            <Database className="w-4 h-4" />
                            Backend & Databases
                        </div>
                        <ul className="text-xs space-y-1.5 text-muted-foreground">
                            <li>• Node.js, Express & NestJS</li>
                            <li>• Python, FastAPI & Automation</li>
                            <li>• C# & .NET Enterprise Services</li>
                            <li>• C++ for High Performance & Engines</li>
                            <li>• PostgreSQL, SQL, Firebase, Supabase, MongoDB</li>
                        </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-background border border-border/70">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                            <Video className="w-4 h-4" />
                            Multimedia & AI
                        </div>
                        <ul className="text-xs space-y-1.5 text-muted-foreground">
                            <li>• Certified Drone Pilot & Aerial Videography</li>
                            <li>• Blender 3D & Three.js WebGL Experiences</li>
                            <li>• Davinci Resolve & Motion Graphics</li>
                            <li>• Generative AI & LLM Systems Integration</li>
                            <li>• Game Development (Unity & Unreal)</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Recruiter FAQ (Generative Engine Optimization & SEO) */}
            <section className="rounded-2xl p-6 sm:p-8 bg-card border border-border/80 shadow-sm mb-10">
                <div className="mb-6">
                    <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        Recruiter FAQ & Quick Verification
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Direct answers to the most common questions from Danish and European hiring teams.
                    </p>
                </div>

                <div className="space-y-4">
                    {recruiterFaqs.map((faq, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-background border border-border/70">
                            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                {faq.q}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-2 pl-6 leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final Contact & Booking Bar */}
            <section className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 text-center flex flex-col items-center">
                <Award className="w-8 h-8 text-primary mb-3" />
                <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
                    Ready to bring Abd Alrhman onto your team?
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mt-2 mb-6">
                    Get in touch for an introductory call, technical screening, or architectural walkthrough. Response time within 2 hours.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                        href="https://wa.me/4542223110"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-lg transition-transform hover:scale-105"
                    >
                        <WhatsAppIcon className="w-5 h-5 fill-current" />
                        <span>Chat on WhatsApp (004542223110)</span>
                    </a>
                    <a
                        href="mailto:abdalrhmanaldarra@gmail.com?subject=Interview%20Invitation%20%E2%80%94%20Abd%20Alrhman"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-md transition-transform hover:scale-105"
                    >
                        <Mail className="w-4 h-4" />
                        <span>abdalrhmanaldarra@gmail.com</span>
                    </a>
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm border border-border transition-colors"
                    >
                        <span>Explore 28+ Projects</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
