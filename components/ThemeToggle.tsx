"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className={`w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] ${className || ""}`} />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`p-2 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                isDark 
                    ? "bg-white/[0.06] hover:bg-white/[0.12] text-amber-300 border border-white/[0.08] shadow-[0_0_12px_rgba(251,191,36,0.15)]" 
                    : "bg-slate-200/80 hover:bg-slate-300 text-slate-800 border border-slate-300/80 shadow-[0_0_12px_rgba(0,0,0,0.06)]"
            } ${className || ""}`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180, scale: [0.8, 1] }}
                transition={{ duration: 0.25 }}
            >
                {isDark ? (
                    <Sun className="w-4 h-4" />
                ) : (
                    <Moon className="w-4 h-4" />
                )}
            </motion.div>
        </button>
    );
}
