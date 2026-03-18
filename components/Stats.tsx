"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Briefcase, Code2, Coffee, Globe } from "lucide-react";

const stats = [
    { label: "Successful Projects", value: 27, icon: <Briefcase className="w-5 h-5" />, suffix: "+" },
    { label: "Years of Experience", value: 6, icon: <Globe className="w-5 h-5" />, suffix: "+" },
    { label: "Technologies Mastered", value: 15, icon: <Code2 className="w-5 h-5" />, suffix: "+" },
    { label: "Cups of Coffee", value: 1200, icon: <Coffee className="w-5 h-5" />, suffix: "" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref} className="text-4xl md:text-5xl font-black tabular-nums">
            {count}{suffix}
        </span>
    );
}

export default function Stats() {
    return (
        <section className="py-20 bg-background border-y border-border/50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="p-3 bg-primary/10 rounded-2xl text-primary mb-4 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <CountUp value={stat.value} suffix={stat.suffix} />
                            <span className="text-muted-foreground font-bold uppercase tracking-widest text-xs mt-2 italic group-hover:text-primary transition-colors">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
