"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Laptop, Phone, Layout, Zap, Rocket, CheckCircle, Camera, Share2 } from "lucide-react";

const services = [
    {
        title: "Web Development",
        icon: <Laptop className="w-8 h-8" />,
        description: "Building high-performance, pixel-perfect web applications using the latest Next.js 15 and React technology.",
        color: "#4f46e5"
    },
    {
        title: "AI & Coding Agents",
        icon: <Zap className="w-8 h-8" />,
        description: "Implementing advanced AI agents, customized LLM workflows, and intelligent coding automation systems.",
        color: "#8b5cf6"
    },
    {
        title: "Mobile App Development",
        icon: <Phone className="w-8 h-8" />,
        description: "Developing cross-platform mobile solutions with Flutter and React Native for iOS and Android.",
        color: "#1d4ed8"
    },
    {
        title: "3D Design & Motion",
        icon: <Rocket className="w-8 h-8" />,
        description: "Creating immersive 3D visuals, cinematic motion graphics, and interactive elements for high-end digital products.",
        color: "#fbbf24"
    },
    {
        title: "Automation & APIs",
        icon: <CheckCircle className="w-8 h-8" />,
        description: "Designing robust API architectures and complex automation tunnels to streamline internal business logic.",
        color: "#10b981"
    },
    {
        title: "UI/UX Design",
        icon: <Layout className="w-8 h-8" />,
        description: "Crafting intuitive digital experiences that combine stunning aesthetics with seamless, conversion-focused journeys.",
        color: "#db2777"
    },
    {
        title: "Cinematic Drone & Photo",
        icon: <Camera className="w-8 h-8" />,
        description: "Professional 4K drone pilot and photography services for real estate, events, and cinematic brand storytelling.",
        color: "#f97316"
    },
    {
        title: "Marketing & Content",
        icon: <Share2 className="w-8 h-8" />,
        description: "Strategic digital marketing campaigns and viral content creation to scale your brand presence globally.",
        color: "#06b6d4"
    }
];

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative h-96 w-full rounded-2xl bg-muted/30 p-8 border border-border/50 hover:border-primary/50 transition-all cursor-pointer overflow-hidden backdrop-blur-sm"
        >
            <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }} className="flex flex-col h-full justify-between">
                <div>
                    <div style={{ backgroundColor: `${service.color}20`, color: service.color }} className="p-4 rounded-xl w-fit mb-6">
                        {service.icon}
                    </div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
                
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                    <Rocket className="w-4 h-4 animate-pulse" />
                    <span>Inquire Now</span>
                </div>
            </div>

            {/* Background dynamic light */}
            <div 
                className="absolute inset-x-0 bottom-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                style={{
                    background: `radial-gradient(circle at center, ${service.color}40 0%, transparent 70%)`,
                }}
            />
        </motion.div>
    );
};

export default function Services() {
    return (
        <section id="services" className="py-24 bg-background relative z-10">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic">
                        Experience <span className="text-primary not-italic">&</span> Services
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto font-medium">
                        High-end digital solutions powered by modern engineering and precise design.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
