"use client";

import { motion } from "framer-motion";
import TechCloud3D from "./TechCloud3D";
import { Cpu, Zap, Layers, Rocket, Code2, Globe } from "lucide-react";

export default function TechShowcase() {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    {/* Left: Text Content */}
                    <div className="w-full lg:w-5/12 relative">
                        {/* Decorative Background Element */}
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
                        
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] block mb-6 px-4 py-1.5 bg-primary/5 border border-primary/20 w-fit rounded-full italic">The Technical Frontier</span>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-10 italic leading-[0.9]">
                                Modern <br /><span className="text-primary not-italic">Tech</span> Stack
                            </h2>
                            <p className="text-muted-foreground text-xl mb-12 leading-relaxed font-medium max-w-lg italic">
                                I leverage a cutting-edge selection of technologies to build high-performance, scalable, and visually stunning digital products.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                                {[
                                    { name: "Next.js 15", cat: "Framework", color: "primary", icon: <Code2 className="w-5 h-5" /> },
                                    { name: "Three.js", cat: "3D Rendering", color: "blue-500", icon: <Layers className="w-5 h-5" /> },
                                    { name: "Framer Motion", cat: "Animations", color: "pink-500", icon: <Zap className="w-5 h-5" /> },
                                    { name: "Node.js", cat: "Backend", color: "green-500", icon: <Cpu className="w-5 h-5" /> }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-6 bg-card/40 border border-border/50 rounded-3xl flex items-center gap-4 group hover:border-primary/50 transition-all hover:bg-card/60">
                                        <div className={`p-3 bg-${item.color}/10 rounded-2xl text-${item.color} group-hover:scale-110 transition-transform`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg leading-tight uppercase tracking-tighter italic">{item.name}</h4>
                                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{item.cat}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: 3D Visualization */}
                    <div className="w-full lg:w-7/12 min-h-[600px] relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="w-full h-full glass-container rounded-[40px] border border-border/50 overflow-hidden shadow-2xl relative bg-[#050505]/40 backdrop-blur-3xl"
                        >
                            <TechCloud3D />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
