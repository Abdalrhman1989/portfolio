"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    ShieldCheck, 
    Zap, 
    Database, 
    Code2, 
    CheckCircle2, 
    ArrowRight, 
    Play, 
    GitBranch, 
    Clock, 
    Cpu, 
    Lock, 
    Layers, 
    ExternalLink,
    AlertTriangle,
    BarChart3,
    FileText,
    Mail
} from "lucide-react";

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function HROnCaseStudyPage() {
    const [activeTab, setActiveTab] = useState<"webhook" | "transparency" | "schema">("transparency");
    
    // Webhook simulation state
    const [webhookStatus, setWebhookStatus] = useState<"idle" | "verifying" | "success">("idle");
    const [webhookEventLog, setWebhookEventLog] = useState<string[]>([]);

    // Pay Transparency state
    const [maleMedian, setMaleMedian] = useState<number>(62000);
    const [femaleMedian, setFemaleMedian] = useState<number>(59500);
    const [selectedDept, setSelectedDept] = useState<string>("Engineering");

    // Calculations
    const payGap = Math.round(((maleMedian - femaleMedian) / (maleMedian || 1)) * 10000) / 100;
    const thresholdExceeded = Math.abs(payGap) >= 5.0;

    const simulateWebhook = () => {
        setWebhookStatus("verifying");
        setWebhookEventLog([
            "1. Received HTTP POST on /api/v1/webhooks/hron",
            "2. Extracting X-HRON-Signature header...",
            "3. Cryptographic timing-safe HMAC SHA-256 verification: VALID ✓"
        ]);

        setTimeout(() => {
            setWebhookEventLog(prev => [
                ...prev,
                "4. Zod schema validation: candidate.created payload valid ✓",
                "5. Idempotency check: Token 'idemp-hron-9821' unique in PostgreSQL ✓",
                "6. Enqueued message to AWS SQS FIFO (MessageId: sqs-msg-48201) ✓",
                "7. Returned HTTP 202 Accepted (Processing asynchronously)"
            ]);
            setWebhookStatus("success");
        }, 600);
    };

    return (
        <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/#projects" className="hover:text-primary transition-colors">Projects</Link>
                    <span>/</span>
                    <span className="text-foreground font-semibold">HR-ON Serverless Cloud & API Engine</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Engineered for HR-ON • Odense C
                </div>
            </div>

            {/* Header Hero */}
            <section className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-card/90 via-card/70 to-card/50 dark:from-neutral-900/90 dark:via-neutral-900/70 dark:to-neutral-950/90 border border-border/80 dark:border-white/[0.08] backdrop-blur-xl shadow-2xl mb-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
                
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-mono text-xs font-bold border border-primary/20">
                                Showcase Project
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md bg-muted text-muted-foreground font-mono text-xs">
                                Node.js • TypeScript • AWS Lambda • PostgreSQL • SQS • GraphQL
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                            HR-ON Serverless Event Ingestion & EU Pay Transparency Engine
                        </h1>
                        <p className="text-base text-primary font-medium mt-2">
                            Architected specifically for the Senior Software Engineer (Node.js / Serverless) role at HR-ON.
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                            Demonstrating production-grade event-driven microservices, HMAC webhook verification, SQS batch consumer resilience, PostgreSQL schema modeling, and automated compliance calculations for the EU Pay Transparency Directive (2023/970).
                        </p>
                    </div>

                    {/* Quick Action Links */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                        <a
                            href="https://github.com/Abdalrhman1989/portfolio/tree/main/projects/hr-on-integration-engine"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-card hover:bg-muted text-foreground border border-border font-bold text-xs transition-transform hover:scale-[1.02] shadow-sm"
                        >
                            <GitBranch className="w-4 h-4 text-primary" />
                            <span>View Source Code on GitHub</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                        </a>
                        <a
                            href="https://wa.me/4542223110"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition-transform hover:scale-[1.02] shadow-md"
                        >
                            <WhatsAppIcon className="w-4 h-4 fill-current" />
                            <span>Chat on WhatsApp (+45 42 22 31 10)</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Interactive Showcase Tabs */}
            <section className="rounded-2xl p-6 sm:p-8 bg-card border border-border/80 shadow-sm mb-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-border/60 pb-4">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                            <Zap className="w-5 h-5 text-primary" />
                            Interactive Architecture Simulator
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">
                            Test live system components right inside your browser.
                        </p>
                    </div>

                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/60 border border-border">
                        <button
                            onClick={() => setActiveTab("transparency")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                activeTab === "transparency"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            📊 EU Pay Transparency
                        </button>
                        <button
                            onClick={() => setActiveTab("webhook")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                activeTab === "webhook"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            ⚡ Webhook & SQS Engine
                        </button>
                        <button
                            onClick={() => setActiveTab("schema")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                activeTab === "schema"
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            🗄️ SQL & GraphQL Schema
                        </button>
                    </div>
                </div>

                {/* Tab 1: EU Pay Transparency Calculator */}
                {activeTab === "transparency" && (
                    <div className="space-y-6">
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground leading-relaxed">
                            <span className="font-bold text-foreground">EU Directive 2023/970 (Løngennemsigtighed):</span> If an employer&apos;s gender pay gap is at least 5% in any category of workers and cannot be justified by objective, gender-neutral criteria, the employer is legally obligated to conduct a Joint Pay Assessment with workers&apos; representatives.
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-5 rounded-xl bg-background border border-border space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">
                                        Department
                                    </label>
                                    <select
                                        value={selectedDept}
                                        onChange={(e) => setSelectedDept(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        <option value="Engineering">Engineering & Product (Odense C)</option>
                                        <option value="Sales">Commercial & Sales</option>
                                        <option value="CustomerSuccess">Customer Success & Support</option>
                                        <option value="Executive">Leadership & Management</option>
                                    </select>
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-1">
                                        <span>Median Male Salary</span>
                                        <span className="font-mono text-primary">{maleMedian.toLocaleString()} DKK</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={30000}
                                        max={100000}
                                        step={500}
                                        value={maleMedian}
                                        onChange={(e) => setMaleMedian(Number(e.target.value))}
                                        className="w-full accent-primary cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-1">
                                        <span>Median Female Salary</span>
                                        <span className="font-mono text-emerald-500">{femaleMedian.toLocaleString()} DKK</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={30000}
                                        max={100000}
                                        step={500}
                                        value={femaleMedian}
                                        onChange={(e) => setFemaleMedian(Number(e.target.value))}
                                        className="w-full accent-emerald-500 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Live Calculation Output Card */}
                            <div className="md:col-span-2 p-5 rounded-xl bg-background border border-border flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-muted-foreground uppercase font-mono">
                                            Calculated Compliance Assessment
                                        </span>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                                            thresholdExceeded
                                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                                                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                                        }`}>
                                            {thresholdExceeded ? (
                                                <>
                                                    <AlertTriangle className="w-3.5 h-3.5" />
                                                    Joint Assessment Mandated (≥ 5%)
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Compliant with Directive (&lt; 5%)
                                                </>
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex items-baseline gap-3 my-2">
                                        <span className={`text-4xl font-extrabold font-mono ${
                                            thresholdExceeded ? "text-amber-500" : "text-emerald-500"
                                        }`}>
                                            {payGap > 0 ? `+${payGap}%` : `${payGap}%`}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            Unadjusted Gender Pay Gap in {selectedDept}
                                        </span>
                                    </div>

                                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                                        {thresholdExceeded
                                            ? `⚠️ ALERT: The statistical pay gap of ${payGap}% exceeds the 5% EU threshold. The platform automatically triggers an audit notification and schedules a joint assessment with employee representatives.`
                                            : `✓ COMPLIANT: The pay gap of ${payGap}% remains within the permissible 5.0% variance boundary established under EU Directive 2023/970.`}
                                    </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-border flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-muted-foreground">
                                    <span>Formula: ((Median_M - Median_F) / Median_M) * 100</span>
                                    <span>Engine: payTransparencyService.ts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: Webhook Simulator */}
                {activeTab === "webhook" && (
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-xs text-muted-foreground">
                                Simulate an incoming applicant webhook from HR-ON Recruit into the AWS Lambda & SQS pipeline.
                            </p>
                            <button
                                onClick={simulateWebhook}
                                disabled={webhookStatus === "verifying"}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                            >
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span>Simulate Ingestion Event</span>
                            </button>
                        </div>

                        <div className="p-4 rounded-xl bg-neutral-950 font-mono text-xs text-emerald-400 space-y-1.5 min-h-[160px] border border-white/10 shadow-inner">
                            {webhookEventLog.length === 0 ? (
                                <p className="text-neutral-500 italic">
                                    Click &quot;Simulate Ingestion Event&quot; above to trace the Lambda execution log...
                                </p>
                            ) : (
                                webhookEventLog.map((log, index) => (
                                    <p key={index}>{log}</p>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Tab 3: Schema Overview */}
                {activeTab === "schema" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-background border border-border">
                            <div className="flex items-center gap-2 text-primary font-bold text-xs mb-2">
                                <Database className="w-4 h-4" />
                                PostgreSQL Relational Schema
                            </div>
                            <pre className="text-[11px] font-mono text-muted-foreground bg-muted/40 p-3 rounded-lg overflow-x-auto">
{`CREATE TABLE hron_pay_transparency_metrics (
  id UUID PRIMARY KEY,
  company_id INT NOT NULL,
  department VARCHAR(100) NOT NULL,
  median_male_salary_dkk NUMERIC(12, 2),
  median_female_salary_dkk NUMERIC(12, 2),
  unadjusted_pay_gap_percent NUMERIC(5, 2),
  threshold_exceeded BOOLEAN,
  audited_at TIMESTAMPTZ DEFAULT NOW()
);`}
                            </pre>
                        </div>

                        <div className="p-4 rounded-xl bg-background border border-border">
                            <div className="flex items-center gap-2 text-primary font-bold text-xs mb-2">
                                <Code2 className="w-4 h-4" />
                                GraphQL Query Schema
                            </div>
                            <pre className="text-[11px] font-mono text-muted-foreground bg-muted/40 p-3 rounded-lg overflow-x-auto">
{`type Query {
  candidate(id: ID!): Candidate
  candidates(jobId: ID!): [Candidate!]!
  payTransparencyReport(
    companyId: Int!
    department: String!
  ): PayTransparencyReport
}`}
                            </pre>
                        </div>
                    </div>
                )}
            </section>

            {/* Architectural Deep-Dive Highlights */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        <Lock className="w-4 h-4" />
                        Security & Idempotency
                    </div>
                    <p className="text-sm font-bold text-foreground">Cryptographic HMAC & Deduplication</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        Timing-safe SHA-256 HMAC verification prevents tampering. Idempotency table prevents at-least-once AWS duplicate processing.
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        <Cpu className="w-4 h-4" />
                        Serverless Connection Pooling
                    </div>
                    <p className="text-sm font-bold text-foreground">Zero Connection Exhaustion</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        Lambda pooling capped at max 5 connections per container with RDS Proxy compatibility, preventing database saturation on traffic surges.
                    </p>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        <Layers className="w-4 h-4" />
                        Partial Batch Resilience
                    </div>
                    <p className="text-sm font-bold text-foreground">SQS BatchItemFailures</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        Implements granular batchItemFailures contract so failed messages are isolated for DLQ retry without holding back successful transactions.
                    </p>
                </div>
            </section>

            {/* Recruiter Call to Action */}
            <section className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 text-center flex flex-col items-center">
                <ShieldCheck className="w-8 h-8 text-primary mb-3" />
                <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
                    Want to see the code or discuss the architecture?
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mt-2 mb-6">
                    Available for immediate interview and fast onboarding at HR-ON on Østre Stationsvej in Odense C.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                        href="https://wa.me/4542223110"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-lg transition-transform hover:scale-105"
                    >
                        <WhatsAppIcon className="w-5 h-5 fill-current" />
                        <span>Chat on WhatsApp (+45 42 22 31 10)</span>
                    </a>
                    <a
                        href="mailto:abdalrhmandarra@gmail.com?subject=HR-ON%20Interview%20Invitation%20%E2%80%94%20Abd%20Alrhman%20Darra"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-md transition-transform hover:scale-105"
                    >
                        <Mail className="w-4 h-4" />
                        <span>abdalrhmandarra@gmail.com</span>
                    </a>
                    <Link
                        href="/hiring"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm border border-border transition-colors"
                    >
                        <span>View Recruiter Dossier</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
