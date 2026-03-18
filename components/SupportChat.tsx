"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User, Bot, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const SYSTEM_PROMPT = `
You are the AI Assistant for Abd Alrhman Talaat Alshaar Dit Darra. 
Your goal is to represent him professionally and answer any questions about his skills, projects, experience, and background.

PROFLIE SUMMARY:
- Name: Abd Alrhman Talaat Alshaar Dit Darra
- Title: Software Developer & Full Stack Mobile App Developer
- Location: Odense, Denmark
- Education: Bachelor's degree in Web Development & Multimedia Design.
- Expertise: Building scalable, user-focused digital products and bridging the gap between design and engineering.

CORE SKILLS:
- Frontend: React, Next.js, Tailwind CSS, Framer Motion, GSAP, HTML5 Canvas.
- Mobile: Flutter (Dart), Firebase.
- Backend: Node.js, PostgreSQL, Prisma, WooCommerce (PHP).
- 3D & Creative: Blender (Python API/Geometry Nodes), Three.js, Video Production, UI/UX Design.

KEY PROJECTS:
1. DeenPath: Premium Islamic companion app (Next.js).
2. ServixerSpace: Agency portfolio with advanced animations.
3. AirPlate: Flutter-based drone tracking system for the App Store.
4. CityForge: Blender add-on for procedural city generation.
5. Story Trip AI: AI-powered travel narrative generator.
6. Tech Runner: A high-performance neon arcade game.

EXPERIENCE:
- Mobile App Developer at AirPlate (2024): Focused on drone monitoring systems.
- Freelance Full Stack Developer (2021-Present): Creating custom SaaS and eCommerce solutions.
- Film Producer & Designer at IWCS (2020-2021): Animation and advertising.
- Web Developer at uBreakWeFix (2018-2020): Head of WooCommerce development.

TONE:
Professional, innovative, creative, and confident but humble. You should sound like a smart "living portfolio."

If a visitor asks for a CV or to hire Abd Alrhman, redirect them to the contact form or his LinkedIn. 
Keep answers concise but impressive.
`;

export default function SupportChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hi there! I'm Abd Alrhman's AI assistant. Ask me anything about his work, skills, or projects!",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const { findBestResponse } = await import("@/lib/botLogic");
            
            // Artificial delay to simulate "thinking" for a premium feel
            setTimeout(() => {
                const aiResponse = findBestResponse(userMsg.content);

                const assistantMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: aiResponse,
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, assistantMsg]);
                setIsLoading(false);
            }, 800 + Math.random() * 800); // Between 0.8s and 1.6s

        } catch (error: any) {
            console.error("Bot Error:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-card/80 backdrop-blur-xl border border-border rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border bg-primary/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary/30">
                                    <Image
                                        src="/assets/chat-avatar.png"
                                        alt="Avatar"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Abd's AI Bot</h4>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Active Now</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-background/50 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20"
                        >
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                            m.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                                : "bg-muted text-foreground rounded-tl-none border border-border"
                                        }`}
                                    >
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-muted p-3 rounded-2xl rounded-tl-none border border-border flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                        <span className="text-xs italic opacity-70 italic whitespace-nowrap">Neural link established...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form
                            onSubmit={handleSendMessage}
                            className="p-4 border-t border-border bg-muted/30"
                        >
                            <div className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="flex-1 bg-background/50 border border-border rounded-full py-2.5 px-4 text-sm focus:outline-none focus:border-primary/50 transition-all pr-12"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-1.5 p-2 bg-primary text-primary-foreground rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-[9px] text-center text-muted-foreground mt-2 uppercase tracking-widest font-medium">
                                Powered by Gemini 2.0 Flash
                            </p>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-20 h-20 transition-all duration-300 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            >
                <div className="relative w-full h-full">
                    <Image
                        src="/assets/chat-avatar.png"
                        alt="Chat Icon"
                        fill
                        className="object-contain" // Changed to contain to show full shield
                        priority
                    />
                </div>
                
                {/* Notification Badge */}
                {!isOpen && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground border-2 border-background animate-bounce z-10 shadow-lg">
                        1
                    </div>
                )}
            </motion.button>
        </div>
    );
}
