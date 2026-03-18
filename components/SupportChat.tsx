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
- Location: Odense, Denmark
- Education: Bachelor's degree in Web Development & Multimedia Design.
- Expertise: Bridging the gap between UI/UX design and complex web/mobile engineering.

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
            // Check if API key exists in Env or ask user to provide one
            const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
            
            if (!apiKey) {
                // Fallback / Mock behavior if no API key is set
                setTimeout(() => {
                    const fallbackMsg: Message = {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: "I'm currently in 'Offline Mode' as the API key is not configured. But I can tell you that Abd Alrhman is an expert in Next.js and Flutter! (Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env file to enable full AI capabilities.)",
                        timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, fallbackMsg]);
                    setIsLoading(false);
                }, 1000);
                return;
            }

            // Real Gemini API Call
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
                        ...messages.map(m => ({
                            role: m.role === "assistant" ? "model" : "user",
                            parts: [{ text: m.content }]
                        })),
                        { role: "user", parts: [{ text: userMsg.content }] }
                    ]
                })
            });

            const data = await response.json();
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I encountered an error. How else can I help you?";

            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: aiResponse,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMsg]);
        } catch (error) {
            console.error("AI Chat Error:", error);
        } finally {
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
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-16 h-16 rounded-full overflow-hidden shadow-2xl border-2 transition-all duration-300 ${
                    isOpen ? "border-primary" : "border-border hover:border-primary/50"
                }`}
            >
                <div className="relative w-full h-full bg-card">
                    <Image
                        src="/assets/chat-avatar.png"
                        alt="Chat Icon"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                </div>
                
                {/* Notification Badge */}
                {!isOpen && (
                    <div className="absolute top-0 right-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground border-2 border-background animate-bounce">
                        1
                    </div>
                )}
            </motion.button>
        </div>
    );
}
