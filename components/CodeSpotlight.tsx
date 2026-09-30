"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Terminal,
    Code2,
    CheckCircle2,
    Copy,
    Check,
    Smartphone,
    Server,
    Brain,
    Box,
    ShieldCheck,
    Zap,
    Layers,
    ArrowUpRight,
    Play,
    RefreshCw,
    Cpu,
    Activity,
    Database,
    Flame,
    Lock
} from "lucide-react";
import Link from "next/link";

interface EngineeringDomain {
    id: string;
    tabLabel: string;
    icon: any;
    badge: string;
    projectRef: string;
    projectLink?: string;
    title: string;
    description: string;
    metrics: { label: string; value: string; color: string }[];
    capabilities: string[];
    fileName: string;
    language: string;
    code: string;
    sampleOutput: string;
    simulationAction: string;
    simulationResult: string;
}

const engineeringDomains: EngineeringDomain[] = [
    {
        id: "saas",
        tabLabel: "Full-Stack SaaS & Web",
        icon: Server,
        badge: "Production SaaS & B2B Portals",
        projectRef: "Powering Repairo.dk & Elevate Platforms",
        projectLink: "https://www.repairo.dk",
        title: "Scalable SaaS Architectures & Secure Payment Engines",
        description: "I engineer complete end-to-end web platforms featuring multi-tenant PostgreSQL databases, ACID transactions, automated Stripe checkout tunnels, role-based admin portals, and sub-100ms API endpoints.",
        metrics: [
            { label: "API Latency", value: "<85ms", color: "text-emerald-500" },
            { label: "ACID Safety", value: "100%", color: "text-teal-500" },
            { label: "Test Coverage", value: "Type-Safe", color: "text-sky-500" },
            { label: "Uptime SLA", value: "99.98%", color: "text-cyan-500" },
        ],
        capabilities: [
            "Next.js 15 App Router & Server Actions for zero-client-bundle data fetching",
            "Multi-tenant PostgreSQL schema design with Prisma ORM & Connection Pooling",
            "Stripe webhook idempotent listeners with cryptographically verified signatures",
            "Real-time customer status tracking and automated SMS/Email dispatch",
        ],
        fileName: "bookingPipeline.server.ts",
        language: "TypeScript",
        code: `// Secure Stripe Payment & Booking ACID Pipeline
export async function processRepairBooking(payload: BookingPayload) {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError();

  return await prisma.$transaction(async (tx) => {
    // 1. Reserve device inventory slot with optimistic locking
    const slot = await tx.serviceSlot.update({
      where: { id: payload.slotId, isAvailable: true },
      data: { isAvailable: false, reservedBy: session.user.id }
    });

    // 2. Initialize cryptographically signed Stripe Payment Intent
    const payment = await stripe.paymentIntents.create({
      amount: payload.amountInCents,
      currency: "dkk",
      customer: session.user.stripeCustomerId,
      metadata: { slotId: slot.id, deviceModel: payload.device }
    });

    // 3. Persist order with audit log & trigger notification worker
    const order = await tx.order.create({
      data: { userId: session.user.id, paymentRef: payment.id, status: "CONFIRMED" }
    });
    await inngest.send({ name: "order.confirmed", data: { orderId: order.id } });
    return { success: true, orderId: order.id, clientSecret: payment.client_secret };
  });
}`,
        sampleOutput: `✓ Transaction committed (PostgreSQL ACID)
✓ Stripe PaymentIntent signed: pi_3Nz9LkL8... [200 OK]
✓ Inngest background event dispatched: order.confirmed
✓ Customer confirmation email & SMS queued (<120ms)`,
        simulationAction: "Simulate Secure Booking Pipeline",
        simulationResult: "Verified: Inventory locked -> Stripe Intent Created -> Order Committed in 74ms"
    },
    {
        id: "mobile",
        tabLabel: "Cross-Platform Mobile",
        icon: Smartphone,
        badge: "Live on Apple App Store",
        projectRef: "AirPlate Drone Telemetry App (iOS & Android)",
        projectLink: "https://apps.apple.com/dk/app/airplate/id6670435015?l=da",
        title: "Hardware-Integrated Mobile Apps with 60 FPS Precision",
        description: "I build responsive, offline-first mobile applications in Flutter and React Native. From Direct Remote-ID drone detection over Bluetooth Low Energy (BLE) to hardware camera pipelines and background geofencing.",
        metrics: [
            { label: "Render Frame Rate", value: "60 FPS", color: "text-emerald-500" },
            { label: "App Store Status", value: "Live iOS", color: "text-teal-500" },
            { label: "BLE Telemetry", value: "Sub-10ms", color: "text-sky-500" },
            { label: "Crash-Free Rate", value: "99.9%", color: "text-cyan-500" },
        ],
        capabilities: [
            "Native BLE and Wi-Fi Aware packet decoders for FAA/EASA Remote-ID standard",
            "High-speed geospatial radar calculation and real-time map vector rendering",
            "Local SQLite encrypted caching for uninterrupted offline field operation",
            "Native FFI bridging for C++ hardware drivers and background services",
        ],
        fileName: "droneRadarService.dart",
        language: "Dart / Flutter",
        code: `// Real-Time Drone Remote-ID Telemetry Parser (EASA Compliant)
class DroneTelemetryService {
  final FlutterReactiveBle _ble = FlutterReactiveBle();
  final StreamController<DronePacket> _telemetryStream = StreamController.broadcast();

  Stream<DronePacket> startRadarScan({required LatLng userCoords}) {
    return _ble.scanForDevices(
      withServices: [Uuid.parse("0000fffa-0000-1000-8000-00805f9b34fb")],
      scanMode: ScanMode.lowLatency,
    ).map((scanResult) {
      final rawPayload = scanResult.manufacturerData;
      final drone = RemoteIdParser.decodeOpenDroneId(rawPayload);
      
      // Calculate spatial distance and altitude delta in real-time
      final distanceMeters = Geolocator.distanceBetween(
        userCoords.latitude, userCoords.longitude,
        drone.latitude, drone.longitude,
      );

      return DronePacket(
        uasId: drone.uasId,
        coordinates: LatLng(drone.latitude, drone.longitude),
        altitudeMsl: drone.altitudeGeoMeters,
        velocityKmh: drone.speedHorizontalMps * 3.6,
        distanceMeters: distanceMeters,
        timestamp: DateTime.now(),
      );
    });
  }
}`,
        sampleOutput: `📡 BLE LowLatency Scanner Active [Channel 37/38/39]
✓ Remote-ID Packet Decoded: UAS-DK-849201
✓ Telemetry: Alt +120m | Velocity 48.2 km/h | Bearing 142°
✓ Geofence check: Safe Distance (420m from pilot)
✓ UI updated @ 60 FPS zero-jank frame timing`,
        simulationAction: "Simulate Drone Telemetry Ping",
        simulationResult: "Packet Decoded: UAS-DK-849201 | Speed 48.2 km/h | Distance 420m | Stream Healthy"
    },
    {
        id: "ai",
        tabLabel: "AI Agents & Automation",
        icon: Brain,
        badge: "AI Engineering & Systems",
        projectRef: "Memory Sculptor & Auto-Diagnostics Engine",
        projectLink: "#projects",
        title: "Intelligent AI Agents, RAG Pipelines & Structured Output",
        description: "I engineer AI systems that solve real business problems — not just basic chat boxes. Multi-agent workflows, vector retrieval over domain databases, automated hardware diagnostics, and strictly validated JSON schemas.",
        metrics: [
            { label: "Schema Accuracy", value: "100%", color: "text-emerald-500" },
            { label: "Vector Search", value: "<25ms", color: "text-teal-500" },
            { label: "Autonomous Steps", value: "Multi-Tool", color: "text-sky-500" },
            { label: "Tokens Optimized", value: "-45%", color: "text-cyan-500" },
        ],
        capabilities: [
            "Structured JSON output enforcement via Pydantic & Zod schemas for deterministic logic",
            "Vector embeddings (pgvector / Pinecone) for high-precision semantic knowledge retrieval",
            "Multi-agent autonomous tool execution with human-in-the-loop validation fallbacks",
            "Streaming response architectures with token throttling and prompt cost optimization",
        ],
        fileName: "repairDiagnosticsAgent.py",
        language: "Python / AI SDK",
        code: `# Autonomous Hardware Repair Diagnostic Agent with Vector RAG
from pydantic import BaseModel, Field
from openai import OpenAI
from vector_db import query_schematics_database

class DiagnosticReport(BaseModel):
    issue_category: str = Field(description="Identified hardware fault domain")
    confidence_score: float = Field(ge=0.0, le=1.0)
    required_parts: list[str] = Field(description="OEM replacement components")
    estimated_repair_minutes: int
    step_by_step_guide: list[str]

def run_diagnostic_agent(device_model: str, user_symptoms: str) -> DiagnosticReport:
    # 1. Retrieve official OEM repair schematics and fault frequencies
    schematic_context = query_schematics_database(
        device=device_model, query=user_symptoms, top_k=3
    )

    # 2. Instruct LLM agent with strict tool calling and verified schema output
    response = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a master hardware technician."},
            {"role": "user", "content": f"Device: {device_model}\\nSymptoms: {user_symptoms}\\nContext: {schematic_context}"}
        ],
        response_format=DiagnosticReport,
    )
    return response.choices[0].message.parsed`,
        sampleOutput: `🧠 Semantic Query: "iPhone 15 Pro flickering OLED green lines"
✓ 3 Official OEM Schematics retrieved via Vector DB (0.018s)
✓ Strict Schema Validated: DiagnosticReport
- Issue: Display Digitizer Ribbon Micro-Fracture (Confidence: 96.8%)
- Required Parts: ["OLED Assembly OEM", "Waterproof Seal Adhesive"]
- Est. Time: 35 minutes`,
        simulationAction: "Run Automated Diagnostic Test",
        simulationResult: "Diagnosed: Display Ribbon Micro-Fracture (96.8% Confidence) | 2 Parts Identified"
    },
    {
        id: "graphics",
        tabLabel: "3D WebGL & Systems",
        icon: Box,
        badge: "WebGL & Procedural Engines",
        projectRef: "CityForge Blender Add-on & 60+ FPS Canvas Games",
        projectLink: "#projects",
        title: "High-Performance 3D Graphics, Shaders & Simulation",
        description: "I combine mathematical graphics programming with creative digital design. Developing custom Three.js WebGL shaders, Python procedural generators for Blender, and hardware-accelerated canvas game engines.",
        metrics: [
            { label: "Hardware FPS", value: "60+ FPS", color: "text-emerald-500" },
            { label: "Shader Speed", value: "Zero Drop", color: "text-teal-500" },
            { label: "Bundle Size", value: "Optimized", color: "text-sky-500" },
            { label: "Math Core", value: "Vector/Quat", color: "text-cyan-500" },
        ],
        capabilities: [
            "Custom GLSL Vertex & Fragment Shaders for real-time wave distortion and lighting",
            "Procedural city and mesh generation using Python & Blender Geometry Nodes API",
            "Physics-driven collision engines in pure HTML5 Canvas with sub-pixel interpolation",
            "Low-draw-call instanced meshes for rendering thousands of interactive 3D elements",
        ],
        fileName: "quantumParticleShader.glsl",
        language: "GLSL / Three.js",
        code: `// High-Performance Dynamic Vertex Wave & Dispersion Shader
uniform float uTime;
uniform vec2 uMouse;
uniform float uIntensity;

varying vec2 vUv;
varying vec3 vNormal;
varying float vDisplacement;

void main() {
  vUv = uv;
  vNormal = normal;

  // Compute organic 3D harmonic turbulence based on time and mouse vector
  vec3 pos = position;
  float waveA = sin(pos.x * 2.5 + uTime * 1.8) * 0.15;
  float waveB = cos(pos.z * 3.0 + uTime * 1.4) * 0.20;
  float mouseDistance = distance(uv, uMouse);
  float ripple = sin(mouseDistance * 18.0 - uTime * 3.0) * exp(-mouseDistance * 3.0);

  float displacement = (waveA + waveB + ripple * 0.35) * uIntensity;
  pos += normal * displacement;
  vDisplacement = displacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`,
        sampleOutput: `🎮 WebGL 2.0 Context Initialized (Renderer: Hardware GPU)
✓ Vertex & Fragment Shader Compiled: 0 warnings
✓ Instanced Mesh: 1,200 dynamic geometry instances
✓ Draw Calls: 1 (GPU Instancing active)
✓ Framerate: Stable 60.1 FPS | Frame Time: 16.6ms`,
        simulationAction: "Simulate Shader Render Cycle",
        simulationResult: "Shader Compiled: 1,200 Instanced Nodes | Frame Time 16.6ms (60 FPS Solid)"
    }
];

export default function CodeSpotlight() {
    const [activeTab, setActiveTab] = useState<string>("saas");
    const [copied, setCopied] = useState<boolean>(false);
    const [simulating, setSimulating] = useState<boolean>(false);
    const [simulationOutput, setSimulationOutput] = useState<string | null>(null);

    const currentDomain = engineeringDomains.find(d => d.id === activeTab) || engineeringDomains[0];

    const handleCopy = () => {
        navigator.clipboard.writeText(currentDomain.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSimulate = () => {
        setSimulating(true);
        setSimulationOutput(null);
        setTimeout(() => {
            setSimulating(false);
            setSimulationOutput(currentDomain.simulationResult);
        }, 700);
    };

    return (
        <section id="what-i-build" className="py-24 bg-background relative overflow-hidden border-t border-border dark:border-white/[0.08]">
            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-10 w-[500px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold mb-4 backdrop-blur-md shadow-sm">
                            <Terminal className="w-3.5 h-3.5" />
                            <span className="uppercase tracking-widest text-[11px]">Engineering Systems • What I Build</span>
                        </div>

                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-foreground dark:text-white leading-[1.08] mb-5">
                            Production-Grade Systems <br />
                            <span className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 dark:from-teal-400 dark:via-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                Engineered For Real Impact
                            </span>
                        </h2>

                        <p className="text-muted-foreground dark:text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                            I don't just write scripts — I architect complete digital ecosystems. Explore live production patterns across full-stack SaaS, App Store mobile engineering, autonomous AI workflows, and 3D graphics below.
                        </p>
                    </motion.div>
                </div>

                {/* Domain Selector Navigation Tabs */}
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10">
                    {engineeringDomains.map((domain) => {
                        const IconComponent = domain.icon;
                        const isSelected = domain.id === activeTab;
                        return (
                            <button
                                key={domain.id}
                                onClick={() => {
                                    setActiveTab(domain.id);
                                    setSimulationOutput(null);
                                }}
                                className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                                    isSelected
                                        ? "bg-primary text-primary-foreground font-bold shadow-[0_0_25px_rgba(20,184,166,0.35)] scale-102"
                                        : "bg-card dark:bg-white/[0.04] text-muted-foreground hover:text-foreground dark:text-neutral-300 dark:hover:text-white hover:bg-muted/80 dark:hover:bg-white/[0.08] border border-border dark:border-white/[0.08]"
                                }`}
                            >
                                <IconComponent className="w-4 h-4 shrink-0" />
                                <span>{domain.tabLabel}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Interactive Workbench Container */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-3xl bg-card dark:bg-[#0c0d13] border border-border dark:border-white/[0.12] p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                        {/* Left Column: Solution Architecture, Impact & Live Simulation */}
                        <div className="lg:col-span-5 flex flex-col justify-between h-full">
                            <div>
                                {/* Project Reference Badge */}
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/10 border border-primary/25 text-primary">
                                        {currentDomain.badge}
                                    </span>
                                    {currentDomain.projectLink && (
                                        <Link
                                            href={currentDomain.projectLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors group/link"
                                        >
                                            <span>{currentDomain.projectRef}</span>
                                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                        </Link>
                                    )}
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground dark:text-white mb-3">
                                    {currentDomain.title}
                                </h3>

                                <p className="text-muted-foreground dark:text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
                                    {currentDomain.description}
                                </p>

                                {/* 4 Key Production Metrics */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-muted/40 dark:bg-white/[0.02] border border-border dark:border-white/[0.06] mb-6">
                                    {currentDomain.metrics.map((metric, i) => (
                                        <div key={i} className="text-center p-1.5">
                                            <span className={`block font-mono font-black text-lg ${metric.color}`}>
                                                {metric.value}
                                            </span>
                                            <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground dark:text-neutral-400">
                                                {metric.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Core Capabilities Bullet Points */}
                                <div className="space-y-2.5 mb-6">
                                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground dark:text-neutral-400 block font-semibold">
                                        Architectural Capabilities Shipped:
                                    </span>
                                    {currentDomain.capabilities.map((cap, i) => (
                                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-foreground dark:text-neutral-200">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                            <span>{cap}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Interactive Simulation Console Trigger */}
                            <div className="pt-4 border-t border-border dark:border-white/[0.08]">
                                <button
                                    onClick={handleSimulate}
                                    disabled={simulating}
                                    className="w-full py-3 px-4 rounded-xl bg-primary/15 hover:bg-primary/25 border border-primary/30 text-primary font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                                >
                                    <RefreshCw className={`w-4 h-4 ${simulating ? "animate-spin" : ""}`} />
                                    <span>{simulating ? "Running Pipeline Execution..." : currentDomain.simulationAction}</span>
                                </button>

                                {simulationOutput && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-2.5 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-2"
                                    >
                                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                        <span>{simulationOutput}</span>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Code Editor & Live Output Terminal */}
                        <div className="lg:col-span-7 flex flex-col gap-3">
                            {/* Editor Window Header */}
                            <div className="rounded-2xl overflow-hidden border border-border dark:border-white/[0.12] bg-[#090a10] shadow-xl">
                                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-white/[0.03]">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5 mr-2">
                                            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                                            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                                            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                                        </div>
                                        <span className="font-mono text-xs text-neutral-300 font-semibold tracking-tight">
                                            {currentDomain.fileName}
                                        </span>
                                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-neutral-400">
                                            {currentDomain.language}
                                        </span>
                                    </div>

                                    {/* Copy Code Button */}
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 text-xs font-mono transition-colors cursor-pointer"
                                        title="Copy Source Code"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                <span className="text-emerald-400 font-bold">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3.5 h-3.5" />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Syntax-Highlighted Production Code Block */}
                                <div className="p-4 sm:p-5 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed bg-[#06070a] text-neutral-200 custom-scrollbar max-h-[360px] overflow-y-auto">
                                    <pre className="whitespace-pre">
                                        <code>{currentDomain.code}</code>
                                    </pre>
                                </div>

                                {/* Live Terminal Execution Diagnostic Output */}
                                <div className="border-t border-white/[0.08] bg-[#030406] p-3 sm:p-4 font-mono text-[11px] sm:text-xs">
                                    <div className="flex items-center gap-2 mb-1.5 text-neutral-400">
                                        <Terminal className="w-3.5 h-3.5 text-primary" />
                                        <span className="uppercase tracking-wider text-[10px] font-bold text-neutral-400">
                                            Runtime Diagnostic Output
                                        </span>
                                    </div>
                                    <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                                        {currentDomain.sampleOutput}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 4 Professional Engineering Delivery Guarantees */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Production Tested",
                            desc: "Zero boilerplate shortcuts. Clean, modular, type-safe code ready for deployment.",
                            color: "text-emerald-500",
                            bg: "bg-emerald-500/10 border-emerald-500/20"
                        },
                        {
                            icon: Zap,
                            title: "Sub-100ms Performance",
                            desc: "Fine-tuned database indexing, caching strategies, and 60 FPS mobile render loops.",
                            color: "text-teal-500",
                            bg: "bg-teal-500/10 border-teal-500/20"
                        },
                        {
                            icon: Lock,
                            title: "Enterprise Security",
                            desc: "Strict authentication, webhook cryptographic verification, and OWASP compliance.",
                            color: "text-sky-500",
                            bg: "bg-sky-500/10 border-sky-500/20"
                        },
                        {
                            icon: Flame,
                            title: "Full-Stack Ownership",
                            desc: "From initial Figma design to backend APIs, database schemas, and App Store approval.",
                            color: "text-amber-500",
                            bg: "bg-amber-500/10 border-amber-500/20"
                        },
                    ].map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={idx}
                                className="p-4 sm:p-5 rounded-2xl bg-card dark:bg-white/[0.02] border border-border dark:border-white/[0.06] shadow-sm hover:border-primary/40 transition-colors"
                            >
                                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center ${item.color} mb-3`}>
                                    <IconComponent className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-foreground dark:text-white text-sm mb-1">
                                    {item.title}
                                </h4>
                                <p className="text-xs text-muted-foreground dark:text-neutral-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
