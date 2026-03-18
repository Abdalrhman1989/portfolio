"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Trophy, Box, FastForward, Play, Shield, Timer, Rocket, Volume2, VolumeX, Sparkles } from "lucide-react";
import { gameAudio } from "@/lib/gameAudio";

const OBSTACLE_TYPES = [
    { type: "bug", icon: <Box className="w-5 h-5" />, color: "bg-red-500", glow: "shadow-[0_0_20px_rgba(239,68,68,0.5)]" },
    { type: "shield", icon: <Shield className="w-5 h-5" />, color: "bg-blue-400", glow: "shadow-[0_0_20px_rgba(96,165,250,0.5)]" },
    { type: "slow", icon: <Timer className="w-5 h-5" />, color: "bg-emerald-400", glow: "shadow-[0_0_20px_rgba(52,211,153,0.5)]" },
];

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    life: number;
}

export default function Game2() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [level, setLevel] = useState(1);
    const [shieldActive, setShieldActive] = useState(0);
    const [slowActive, setSlowActive] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    
    const gameRef = useRef<HTMLDivElement>(null);
    const playerX = useRef(50);
    const playerTargetX = useRef(50);
    const obstaclesRef = useRef<{ id: number; x: number; y: number; type: string }[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const frameRef = useRef<number>(0);
    const [renderState, setRenderState] = useState({ 
        pos: 50, 
        obstacles: [] as any[], 
        particles: [] as Particle[],
        shieldTime: 0,
        slowTime: 0 
    });

    const spawnObstacle = useCallback(() => {
        const rand = Math.random();
        let type = "bug";
        if (rand > 0.95) type = "shield";
        else if (rand > 0.90) type = "slow";
        
        return { 
            id: Date.now() + Math.random(), 
            x: Math.random() * 85 + 7.5, 
            y: -10,
            type 
        };
    }, []);

    const spawnParticles = (x: number, y: number, color: string, count = 10) => {
        for (let i = 0; i < count; i++) {
            particlesRef.current.push({
                id: Math.random(),
                x, y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                color,
                life: 1.0
            });
        }
    };

    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        setGameOver(false);
        setLevel(1);
        setShieldActive(0);
        obstaclesRef.current = [];
        particlesRef.current = [];
        playerX.current = 50;
        playerTargetX.current = 50;
        setRenderState({ pos: 50, obstacles: [], particles: [], shieldTime: 0, slowTime: 0 });
        if (!isMuted) gameAudio.playStart();
        gameRef.current?.focus();
    };

    const toggleMute = () => setIsMuted(prev => !prev);

    const handlePointerMove = (e: React.PointerEvent | React.MouseEvent) => {
        if (!isPlaying || gameOver || !gameRef.current) return;
        const rect = gameRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        playerTargetX.current = Math.max(5, Math.min(95, x));
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isPlaying || gameOver) return;
            if (e.key === "ArrowLeft") playerTargetX.current = Math.max(playerTargetX.current - 10, 5);
            if (e.key === "ArrowRight") playerTargetX.current = Math.min(playerTargetX.current + 10, 95);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isPlaying, gameOver]);

    useEffect(() => {
        if (!isPlaying || gameOver) return;

        const update = () => {
            // Level Progression
            const currentLevel = Math.floor(score / 500) + 1;
            if (currentLevel > level) {
                setLevel(currentLevel);
                if (!isMuted) gameAudio.playLevelUp();
            }

            // Smooth Movement
            playerX.current += (playerTargetX.current - playerX.current) * 0.2;

            // Power-up durations
            let sActive = shieldActive;
            if (sActive > 0) sActive -= 16; // approx ms in frame
            
            let slowTime = slowActive;
            if (slowTime > 0) slowTime -= 16;

            // Update Obstacles
            const baseSpeed = 1.2 + (level * 0.3);
            const speed = baseSpeed * (slowTime > 0 ? 0.5 : 1.0);
            const moved = obstaclesRef.current.map(obs => ({ ...obs, y: obs.y + speed })).filter(obs => obs.y < 110);
            
            // Spawn logic
            const spawnChance = 0.03 + (level * 0.005);
            if (Math.random() < spawnChance && moved.length < 5 + level) {
                moved.push(spawnObstacle());
            }

            // Collision Detection
            const survivingObstacles = moved.filter(obs => {
                const hit = obs.y > 78 && obs.y < 92 && Math.abs(obs.x - playerX.current) < 8;
                if (hit) {
                    if (obs.type === "bug") {
                        if (sActive > 0) {
                            spawnParticles(obs.x, obs.y, "#ef4444", 15);
                            if (!isMuted) gameAudio.playMove(); // Use move as "blocked" sound
                            return false; // Remove obstacle
                        } else {
                            spawnParticles(playerX.current, 90, "#ef4444", 30);
                            if (!isMuted) gameAudio.playCollision();
                            setGameOver(true);
                            setIsPlaying(false);
                            return false;
                        }
                    } else if (obs.type === "shield") {
                        sActive = 5000;
                        spawnParticles(obs.x, obs.y, "#60a5fa", 15);
                        if (!isMuted) gameAudio.playPowerUp();
                        return false;
                    } else if (obs.type === "slow") {
                        slowTime = 5000;
                        spawnParticles(obs.x, obs.y, "#34d399", 15);
                        if (!isMuted) gameAudio.playPowerUp();
                        return false;
                    }
                }
                return true;
            });

            // Update Particles
            const movedParticles = particlesRef.current.map(p => ({
                ...p,
                x: p.x + p.vx,
                y: p.y + p.vy,
                life: p.life - 0.02
            })).filter(p => p.life > 0);

            obstaclesRef.current = survivingObstacles;
            particlesRef.current = movedParticles;
            setShieldActive(sActive);
            setSlowActive(slowTime);
            setScore(prev => prev + 1);
            setRenderState({ 
                pos: playerX.current, 
                obstacles: survivingObstacles, 
                particles: movedParticles,
                shieldTime: sActive,
                slowTime: slowTime
            });
            frameRef.current = requestAnimationFrame(update);
        };

        frameRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameRef.current);
    }, [isPlaying, gameOver, level, shieldActive, slowActive, spawnObstacle, score, isMuted, renderState.obstacles]);

    useEffect(() => {
        if (score > highScore) setHighScore(score);
    }, [score, highScore]);

    return (
        <section id="game2" className="py-24 bg-background relative overflow-hidden border-t border-border/10">
            {/* Background Neon Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                   <div className="inline-flex items-center gap-2 p-2 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                        <Sparkles className="w-4 h-4 animate-spin-slow" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Level {level} System Upgrade</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic text-foreground flex items-center justify-center gap-4">
                        <Rocket className="w-12 h-12 text-primary" />
                        TECH <span className="text-primary not-italic">RUNNER</span>
                    </h2>
                    <p className="text-muted-foreground font-medium mb-8 max-w-lg mx-auto">
                        High-performance obstacle avoidance. Deploy the <span className="text-primary font-bold">ZAP</span> module to survive the legacy code bugs.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto relative group">
                    {/* Game UI Overlay - Top Right Controls */}
                    <div className="absolute -top-4 -right-4 z-40">
                        <button 
                            onClick={toggleMute}
                            className="p-3 bg-card border border-border rounded-2xl hover:bg-secondary transition-colors text-muted-foreground"
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-primary" />}
                        </button>
                    </div>

                    <div 
                        ref={gameRef}
                        tabIndex={0}
                        onPointerMove={handlePointerMove}
                        onPointerDown={handlePointerMove}
                        className="relative h-[600px] border-4 border-border/50 rounded-[50px] bg-[#0A0A0B] overflow-hidden backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5)] focus:outline-none cursor-crosshair"
                    >
                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" 
                             style={{ backgroundImage: 'linear-gradient(#primary 1px, transparent 1px), linear-gradient(90deg, #primary 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
                        />

                        <AnimatePresence>
                            {!isPlaying && !gameOver && (
                                <motion.div 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 p-12 text-center"
                                >
                                    <div className="p-10 bg-primary/5 rounded-[50px] border border-primary/20 mb-10">
                                        <div className="flex justify-center gap-6 mb-6">
                                            <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center border border-border">⬅️</div>
                                            <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center border border-border">➡️</div>
                                        </div>
                                        <h4 className="text-xl font-black uppercase tracking-widest text-white mb-2 italic">Neural Interface Mode</h4>
                                        <p className="text-[10px] text-muted-foreground font-medium tracking-widest mb-6">MOVE MOUSE OR USE ARROWS</p>
                                        
                                        <div className="grid grid-cols-2 gap-4 text-left">
                                            <div className="flex items-center gap-2 text-[10px] text-blue-400 font-bold uppercase"><Shield className="w-3 h-3" /> Shield v1.0</div>
                                            <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase"><Timer className="w-3 h-3" /> Time Sync</div>
                                        </div>
                                    </div>
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={startGame} 
                                        className="group px-16 py-6 bg-primary text-primary-foreground font-black rounded-full uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all flex items-center gap-4 text-lg"
                                    >
                                        <Play className="w-6 h-6 fill-current" />
                                        Initialize Link
                                    </motion.button>
                                </motion.div>
                            )}

                            {gameOver && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }} 
                                    animate={{ opacity: 1, scale: 1 }} 
                                    className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-red-950/40 backdrop-blur-xl"
                                >
                                    <div className="p-12 bg-[#0A0A0B] border-2 border-red-500/50 rounded-[60px] text-center shadow-[0_0_100px_rgba(239,68,68,0.2)]">
                                        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                                            <Trophy className="w-12 h-12 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                                        </div>
                                        <h3 className="text-5xl font-black uppercase tracking-tighter mb-2 italic text-white">FATAL ERROR</h3>
                                        <p className="text-sm text-red-400 font-bold uppercase tracking-[0.3em] mb-8 italic">Memory Access Violation</p>
                                        
                                        <div className="flex flex-col gap-4 mb-10">
                                            <div className="text-6xl font-black text-primary drop-shadow-[0_0_20px_rgba(20,184,166,0.3)]">{score}</div>
                                            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">BYTES COLLECTED</div>
                                        </div>

                                        <button 
                                            onClick={startGame} 
                                            className="w-full py-5 bg-white text-black font-black rounded-full uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                                        >
                                            System Reboot
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* HUD */}
                        <div className="absolute top-10 left-10 right-10 flex justify-between z-10 items-end">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-muted-foreground tracking-widest">DATA_STREAM</span>
                                <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-2xl border border-white/10 font-black text-xs tracking-tighter text-white">
                                    {score.toLocaleString()} <span className="opacity-40 ml-1">B</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <div className="px-4 py-1 bg-primary/20 rounded-full border border-primary/30 text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                                    LEVEL {level}
                                </div>
                                {renderState.shieldTime > 0 && (
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-blue-400"
                                            initial={false}
                                            animate={{ width: `${(renderState.shieldTime / 5000) * 100}%` }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-1 items-end">
                                <span className="text-[10px] font-black text-muted-foreground tracking-widest">HIGH_SYNC</span>
                                <div className="bg-primary/10 backdrop-blur-md px-6 py-2 rounded-2xl border border-primary/20 font-black text-xs tracking-tighter text-primary">
                                    {highScore.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/* Player / ZAP Module */}
                        <motion.div 
                            animate={{ x: `${renderState.pos}%` }}
                            transition={{ type: "spring", damping: 15, stiffness: 200 }}
                            className="absolute bottom-12 left-0 -ml-8 z-20"
                        >
                            <div className={`relative w-16 h-16 flex items-center justify-center transition-all duration-300`}>
                                {/* Shield visual */}
                                <AnimatePresence>
                                    {renderState.shieldTime > 0 && (
                                        <motion.div 
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1.8, opacity: 1 }}
                                            exit={{ scale: 2.2, opacity: 0 }}
                                            className="absolute inset-0 rounded-full border-4 border-blue-400/80 bg-blue-400/20 shadow-[0_0_40px_rgba(96,165,250,0.6)]"
                                        />
                                    )}
                                </AnimatePresence>
                                
                                {/* Main Module Visual */}
                                <div className={`w-full h-full relative ${renderState.shieldTime > 0 ? 'bg-blue-400 shadow-[0_0_40px_rgba(96,165,250,1)]' : 'bg-[#121214] shadow-[0_0_50px_rgba(239,68,68,0.4)]'} rounded-2xl flex items-center justify-center border-2 ${renderState.shieldTime > 0 ? 'border-white' : 'border-red-600'} transform rotate-45 group-hover:scale-110 transition-transform`}>
                                    <div className="-rotate-45">
                                        <Zap className={`w-9 h-9 ${renderState.shieldTime > 0 ? 'text-blue-950' : 'text-red-500'} fill-current drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]`} />
                                    </div>
                                    
                                    {/* Inner circuitry effect */}
                                    <div className="absolute inset-1 border border-primary/20 rounded-xl" />
                                </div>
                                
                                {/* Thruster / Engine Trails */}
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
                                    <div className="w-1.5 h-6 bg-gradient-to-t from-transparent via-primary/40 to-primary/80 blur-[2px] rounded-full animate-pulse" />
                                    <div className="w-2 h-8 bg-gradient-to-t from-transparent via-red-500/40 to-red-500/80 blur-[1px] rounded-full animate-pulse" />
                                    <div className="w-1.5 h-6 bg-gradient-to-t from-transparent via-primary/40 to-primary/80 blur-[2px] rounded-full animate-pulse" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Obstacles & Power-ups */}
                        {renderState.obstacles.map(obs => {
                            const config = OBSTACLE_TYPES.find(t => t.type === obs.type) || OBSTACLE_TYPES[0];
                            return (
                                <motion.div 
                                    key={obs.id} 
                                    initial={false}
                                    animate={{ left: `${obs.x}%`, top: `${obs.y}%` }}
                                    transition={{ duration: 0 }}
                                    className={`absolute w-10 h-10 ${config.color} ${config.glow} rounded-2xl flex items-center justify-center border border-white/20 z-10`}
                                >
                                    {config.icon}
                                </motion.div>
                            );
                        })}

                        {/* Particles */}
                        {renderState.particles.map(p => (
                            <div 
                                key={p.id}
                                className="absolute rounded-full pointer-events-none"
                                style={{ 
                                    left: `${p.x}%`, 
                                    top: `${p.y}%`, 
                                    width: `${p.life * 8}px`, 
                                    height: `${p.life * 8}px`,
                                    backgroundColor: p.color,
                                    opacity: p.life,
                                    boxShadow: `0 0 10px ${p.color}`
                                }}
                            />
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center gap-10 text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 italic">
                        <span className="flex items-center gap-2">⬅️ BYPASS LEFT</span>
                        <span className="flex items-center gap-2">RIGHT OVERRIDE ➡️</span>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </section>
    );
}
