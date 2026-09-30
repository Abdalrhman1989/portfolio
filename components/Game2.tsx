"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Rocket, Trophy, Volume2, VolumeX, Shield, 
    Zap, Timer, RotateCcw, Play, Flame, Crosshair, Award, ArrowLeftRight
} from "lucide-react";
import { gameAudio } from "@/lib/gameAudio";

interface Obstacle {
    x: number;
    y: number;
    size: number;
    speed: number;
    type: "bug" | "firewall" | "glitch";
    rot: number;
    rotSpeed: number;
    color: string;
}

interface Collectible {
    x: number;
    y: number;
    size: number;
    type: "coin" | "shield" | "emp" | "slow";
    rot: number;
    bobOffset: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    alpha: number;
    decay: number;
}

interface FloatingText {
    x: number;
    y: number;
    text: string;
    color: string;
    alpha: number;
    vy: number;
}

export default function Game2() {
    const [gameState, setGameState] = useState<"menu" | "playing" | "gameover">("menu");
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [combo, setCombo] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [shieldActive, setShieldActive] = useState(false);
    const [boostActive, setBoostActive] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Audio helper respecting mute
    const sound = {
        start: () => { if (!isMuted) gameAudio.playStart(); },
        move: () => { if (!isMuted) gameAudio.playMove(); },
        hit: () => { if (!isMuted) gameAudio.playCollision(); },
        powerup: () => { if (!isMuted) gameAudio.playPowerUp(); },
        levelup: () => { if (!isMuted) gameAudio.playLevelUp(); },
    };

    // Load high score from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem("tech_runner_highscore");
            if (saved) setHighScore(parseInt(saved, 10));
        } catch {
            // ignore storage errors
        }
    }, []);

    // Main Game Loop State Ref (Zero React DOM thrashing during 60+ FPS gameplay)
    const engineRef = useRef({
        animId: 0,
        width: 800,
        height: 520,
        player: {
            x: 400,
            y: 440,
            targetX: 400,
            targetY: 440,
            vx: 0,
            bank: 0,
            radius: 18,
            invulnerable: 0,
        },
        speed: 5,
        baseSpeed: 5,
        distance: 0,
        score: 0,
        level: 1,
        combo: 1,
        comboTimer: 0,
        shieldTime: 0,
        slowTime: 0,
        boostTime: 0,
        empEffect: 0,
        screenShake: 0,
        keys: { left: false, right: false, up: false, down: false, boost: false },
        obstacles: [] as Obstacle[],
        collectibles: [] as Collectible[],
        particles: [] as Particle[],
        floatingTexts: [] as FloatingText[],
        stars: [] as { x: number; y: number; size: number; speed: number; alpha: number }[],
        gridOffset: 0,
        lastSpawn: 0,
        lastItemSpawn: 0,
    });

    // Initialize Starfield
    useEffect(() => {
        const stars = [];
        for (let i = 0; i < 90; i++) {
            stars.push({
                x: Math.random() * 800,
                y: Math.random() * 520,
                size: Math.random() * 2 + 0.8,
                speed: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.8 + 0.2,
            });
        }
        engineRef.current.stars = stars;
    }, []);

    // Start Game
    const startGame = useCallback(() => {
        const eng = engineRef.current;
        eng.player.x = eng.width / 2;
        eng.player.targetX = eng.width / 2;
        eng.player.y = eng.height - 70;
        eng.player.targetY = eng.height - 70;
        eng.player.vx = 0;
        eng.player.bank = 0;
        eng.player.invulnerable = 60; // 1 second spawn protection
        eng.score = 0;
        eng.distance = 0;
        eng.level = 1;
        eng.combo = 1;
        eng.comboTimer = 0;
        eng.shieldTime = 0;
        eng.slowTime = 0;
        eng.boostTime = 0;
        eng.empEffect = 0;
        eng.speed = eng.baseSpeed;
        eng.obstacles = [];
        eng.collectibles = [];
        eng.particles = [];
        eng.floatingTexts = [];
        eng.screenShake = 0;

        setScore(0);
        setLevel(1);
        setCombo(1);
        setShieldActive(false);
        setBoostActive(false);
        setGameState("playing");
        sound.start();
    }, [isMuted]);

    // Handle Keyboard Inputs
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const k = engineRef.current.keys;
            if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
                k.left = true;
            } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
                k.right = true;
            } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
                k.up = true;
            } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
                k.down = true;
            } else if (e.key === " " || e.key === "Shift") {
                k.boost = true;
                if (gameState === "menu" || gameState === "gameover") {
                    e.preventDefault();
                    startGame();
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const k = engineRef.current.keys;
            if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") k.left = false;
            else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") k.right = false;
            else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") k.up = false;
            else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") k.down = false;
            else if (e.key === " " || e.key === "Shift") k.boost = false;
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [gameState, startGame]);

    // Pointer Controls (Mouse / Touch)
    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (gameState !== "playing" || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = engineRef.current.width / rect.width;
        const scaleY = engineRef.current.height / rect.height;

        const clientX = (e.clientX - rect.left) * scaleX;
        const clientY = (e.clientY - rect.top) * scaleY;

        engineRef.current.player.targetX = Math.max(30, Math.min(engineRef.current.width - 30, clientX));
        engineRef.current.player.targetY = Math.max(80, Math.min(engineRef.current.height - 30, clientY));
    };

    // Helper: spawn particle bursts
    const addExplosion = (x: number, y: number, color: string, count = 20, speedMult = 1) => {
        const pList = engineRef.current.particles;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = (Math.random() * 5 + 2) * speedMult;
            pList.push({
                x,
                y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                color,
                size: Math.random() * 4 + 2,
                alpha: 1,
                decay: Math.random() * 0.03 + 0.02,
            });
        }
    };

    // Helper: add floating text
    const addFloatingText = (x: number, y: number, text: string, color: string) => {
        engineRef.current.floatingTexts.push({
            x,
            y,
            text,
            color,
            alpha: 1,
            vy: -1.8,
        });
    };

    // Primary Game Loop inside Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const eng = engineRef.current;
        let lastTime = performance.now();

        const loop = (currentTime: number) => {
            const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
            lastTime = currentTime;

            const { width, height, player, keys } = eng;

            // Clear Screen
            ctx.save();

            // Screen Shake
            if (eng.screenShake > 0) {
                const shakeX = (Math.random() - 0.5) * eng.screenShake;
                const shakeY = (Math.random() - 0.5) * eng.screenShake;
                ctx.translate(shakeX, shakeY);
                eng.screenShake = Math.max(0, eng.screenShake - 0.8);
            }

            // Background Deep Space Fill
            ctx.fillStyle = "#07080b";
            ctx.fillRect(0, 0, width, height);

            // Animated Stars
            const currentSpeed = (eng.boostTime > 0 ? 12 : eng.slowTime > 0 ? 2.5 : eng.speed);
            ctx.fillStyle = "#ffffff";
            for (const star of eng.stars) {
                star.y += star.speed * (currentSpeed / 4);
                if (star.y > height) {
                    star.y = 0;
                    star.x = Math.random() * width;
                }
                ctx.globalAlpha = star.alpha;
                ctx.fillRect(star.x, star.y, star.size, eng.boostTime > 0 ? star.size * 3 : star.size);
            }
            ctx.globalAlpha = 1;

            // Cyber Perspective Highway Grid
            eng.gridOffset = (eng.gridOffset + currentSpeed) % 40;
            ctx.strokeStyle = "rgba(20, 184, 166, 0.12)";
            ctx.lineWidth = 1;

            // Horizontal scrolling grid lines
            for (let y = 140; y <= height; y += 30) {
                const offset = (y + eng.gridOffset) % (height - 140) + 140;
                ctx.beginPath();
                ctx.moveTo(0, offset);
                ctx.lineTo(width, offset);
                ctx.stroke();
            }

            // Vertical perspective grid lines
            const vpX = width / 2;
            const vpY = 80;
            for (let x = -width; x <= width * 2; x += 60) {
                ctx.beginPath();
                ctx.moveTo(vpX, vpY);
                ctx.lineTo(x, height);
                ctx.stroke();
            }

            // Horizon Neon Line
            const grad = ctx.createLinearGradient(0, 0, width, 0);
            grad.addColorStop(0, "rgba(20,184,166,0)");
            grad.addColorStop(0.5, "rgba(34,211,238,0.6)");
            grad.addColorStop(1, "rgba(20,184,166,0)");
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, vpY);
            ctx.lineTo(width, vpY);
            ctx.stroke();

            // IF PLAYING: Update Game Physics & Elements
            if (gameState === "playing") {
                // Keyboard Movement Update
                const moveSpeed = 8;
                if (keys.left) player.targetX = Math.max(30, player.targetX - moveSpeed);
                if (keys.right) player.targetX = Math.min(width - 30, player.targetX + moveSpeed);
                if (keys.up) player.targetY = Math.max(100, player.targetY - moveSpeed);
                if (keys.down) player.targetY = Math.min(height - 30, player.targetY + moveSpeed);

                // Smooth Player Position Lerp
                const dx = player.targetX - player.x;
                const dy = player.targetY - player.y;
                player.x += dx * 0.18;
                player.y += dy * 0.18;
                player.vx = dx;
                player.bank = Math.max(-0.4, Math.min(0.4, dx * 0.02));

                if (player.invulnerable > 0) player.invulnerable--;

                // Timers
                if (eng.shieldTime > 0) {
                    eng.shieldTime -= delta;
                    if (eng.shieldTime <= 0) setShieldActive(false);
                }
                if (eng.slowTime > 0) eng.slowTime -= delta;
                if (eng.boostTime > 0) {
                    eng.boostTime -= delta;
                    if (eng.boostTime <= 0) setBoostActive(false);
                }
                if (eng.empEffect > 0) eng.empEffect -= delta * 2;

                // Level & Score Progression
                eng.distance += currentSpeed;
                eng.score += Math.round((currentSpeed / 5) * eng.combo);

                // Update combo timer
                if (eng.combo > 1) {
                    eng.comboTimer -= delta;
                    if (eng.comboTimer <= 0) {
                        eng.combo = 1;
                        setCombo(1);
                    }
                }

                const newLevel = Math.floor(eng.score / 2500) + 1;
                if (newLevel > eng.level) {
                    eng.level = newLevel;
                    eng.baseSpeed = 5 + newLevel * 0.7;
                    setLevel(newLevel);
                    sound.levelup();
                    addFloatingText(width / 2, height / 2 - 40, `LEVEL ${newLevel} UPGRADED!`, "#22d3ee");
                    addExplosion(width / 2, height / 2, "#22d3ee", 30);
                }

                // Periodic Score Sync to React State (Throttled)
                if (Math.random() < 0.1) {
                    setScore(eng.score);
                }

                // Thruster Particles
                eng.particles.push({
                    x: player.x - 7 + (Math.random() - 0.5) * 4,
                    y: player.y + 16,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: Math.random() * 4 + 4,
                    color: eng.boostTime > 0 ? "#22d3ee" : "#14b8a6",
                    size: Math.random() * 3 + 2,
                    alpha: 0.9,
                    decay: 0.06,
                });
                eng.particles.push({
                    x: player.x + 7 + (Math.random() - 0.5) * 4,
                    y: player.y + 16,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: Math.random() * 4 + 4,
                    color: eng.boostTime > 0 ? "#60a5fa" : "#10b981",
                    size: Math.random() * 3 + 2,
                    alpha: 0.9,
                    decay: 0.06,
                });

                // Spawn Obstacles
                const spawnInterval = Math.max(45, 90 - eng.level * 6);
                eng.lastSpawn++;
                if (eng.lastSpawn > spawnInterval) {
                    eng.lastSpawn = 0;
                    const randType = Math.random();
                    const type = randType > 0.75 ? "firewall" : randType > 0.4 ? "glitch" : "bug";
                    const color = type === "bug" ? "#ef4444" : type === "firewall" ? "#f97316" : "#ec4899";
                    eng.obstacles.push({
                        x: Math.random() * (width - 80) + 40,
                        y: -30,
                        size: type === "firewall" ? 36 : 24,
                        speed: (Math.random() * 1.5 + 3.5 + eng.level * 0.4) * (eng.slowTime > 0 ? 0.45 : 1),
                        type,
                        rot: 0,
                        rotSpeed: (Math.random() - 0.5) * 0.1,
                        color,
                    });
                }

                // Spawn Collectibles
                eng.lastItemSpawn++;
                if (eng.lastItemSpawn > 160) {
                    eng.lastItemSpawn = 0;
                    const rand = Math.random();
                    const type = rand > 0.85 ? "shield" : rand > 0.7 ? "emp" : rand > 0.5 ? "slow" : "coin";
                    eng.collectibles.push({
                        x: Math.random() * (width - 80) + 40,
                        y: -30,
                        size: 20,
                        type,
                        rot: 0,
                        bobOffset: Math.random() * Math.PI * 2,
                    });
                }

                // Update & Check Obstacles
                eng.obstacles = eng.obstacles.filter((obs) => {
                    obs.y += obs.speed * (eng.slowTime > 0 ? 0.5 : 1);
                    obs.rot += obs.rotSpeed;

                    // Check Collision with Player
                    const dist = Math.hypot(obs.x - player.x, obs.y - player.y);
                    const collisionDist = obs.size + player.radius;

                    if (dist < collisionDist) {
                        // Shield or EMP active? Destroy obstacle!
                        if (eng.shieldTime > 0 || player.invulnerable > 0) {
                            addExplosion(obs.x, obs.y, obs.color, 25);
                            addFloatingText(obs.x, obs.y, "+150 SHIELD BLOCK", "#60a5fa");
                            eng.score += 150;
                            eng.screenShake = 6;
                            sound.hit();
                            return false;
                        } else {
                            // Player Hit -> GAME OVER
                            addExplosion(player.x, player.y, "#ef4444", 45, 1.5);
                            addExplosion(player.x, player.y, "#ffffff", 20, 1.2);
                            eng.screenShake = 18;
                            sound.hit();

                            // Final score update
                            setScore(eng.score);
                            if (eng.score > highScore) {
                                setHighScore(eng.score);
                                try {
                                    localStorage.setItem("tech_runner_highscore", eng.score.toString());
                                } catch {
                                    // ignore
                                }
                            }
                            setGameState("gameover");
                            return false;
                        }
                    }

                    // Near Miss bonus
                    if (dist < collisionDist + 35 && !obs.speed && dist > collisionDist) {
                        eng.score += 25;
                    }

                    return obs.y < height + 50;
                });

                // Update & Check Collectibles
                eng.collectibles = eng.collectibles.filter((item) => {
                    item.y += 3.5 * (eng.slowTime > 0 ? 0.6 : 1);
                    item.rot += 0.04;

                    const dist = Math.hypot(item.x - player.x, item.y - player.y);
                    if (dist < item.size + player.radius + 8) {
                        // Collected!
                        sound.powerup();

                        if (item.type === "coin") {
                            const pts = 200 * eng.combo;
                            eng.score += pts;
                            eng.combo = Math.min(eng.combo + 1, 8);
                            eng.comboTimer = 4.5;
                            setCombo(eng.combo);
                            addFloatingText(item.x, item.y, `+${pts} (${eng.combo}x COMBO)`, "#34d399");
                            addExplosion(item.x, item.y, "#34d399", 15);
                        } else if (item.type === "shield") {
                            eng.shieldTime = 7;
                            setShieldActive(true);
                            addFloatingText(item.x, item.y, "SHIELD CHARGED! (7s)", "#60a5fa");
                            addExplosion(item.x, item.y, "#60a5fa", 25);
                        } else if (item.type === "emp") {
                            eng.empEffect = 1;
                            eng.screenShake = 12;
                            // Vaporize all obstacles on screen
                            eng.obstacles.forEach((o) => {
                                addExplosion(o.x, o.y, o.color, 15);
                                eng.score += 100;
                            });
                            eng.obstacles = [];
                            addFloatingText(width / 2, height / 2, "EMP SHOCKWAVE DETONATED!", "#a855f7");
                        } else if (item.type === "slow") {
                            eng.slowTime = 6;
                            addFloatingText(item.x, item.y, "TIME DILATION ACTIVE! (6s)", "#38bdf8");
                            addExplosion(item.x, item.y, "#38bdf8", 20);
                        }

                        return false;
                    }

                    return item.y < height + 40;
                });
            }

            // DRAW EMP Shockwave if active
            if (eng.empEffect > 0) {
                ctx.save();
                ctx.strokeStyle = `rgba(168, 85, 247, ${eng.empEffect})`;
                ctx.lineWidth = 14 * eng.empEffect;
                ctx.beginPath();
                ctx.arc(width / 2, height / 2, (1 - eng.empEffect) * (width * 0.8), 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // DRAW Collectibles
            for (const item of eng.collectibles) {
                ctx.save();
                ctx.translate(item.x, item.y);
                ctx.rotate(item.rot);

                if (item.type === "coin") {
                    // Glowing Data Core (Emerald Diamond)
                    ctx.shadowColor = "#34d399";
                    ctx.shadowBlur = 15;
                    ctx.fillStyle = "#34d399";
                    ctx.beginPath();
                    ctx.moveTo(0, -item.size);
                    ctx.lineTo(item.size, 0);
                    ctx.lineTo(0, item.size);
                    ctx.lineTo(-item.size, 0);
                    ctx.closePath();
                    ctx.fill();

                    // Inner highlight
                    ctx.fillStyle = "#ffffff";
                    ctx.beginPath();
                    ctx.arc(0, 0, item.size * 0.35, 0, Math.PI * 2);
                    ctx.fill();
                } else if (item.type === "shield") {
                    // Shield Orb (Blue)
                    ctx.shadowColor = "#60a5fa";
                    ctx.shadowBlur = 18;
                    ctx.fillStyle = "#1e3a8a";
                    ctx.strokeStyle = "#60a5fa";
                    ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    ctx.arc(0, 0, item.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();

                    // Shield glyph
                    ctx.fillStyle = "#ffffff";
                    ctx.font = "bold 13px sans-serif";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("🛡", 0, 1);
                } else if (item.type === "emp") {
                    // EMP Orb (Purple)
                    ctx.shadowColor = "#a855f7";
                    ctx.shadowBlur = 18;
                    ctx.fillStyle = "#581c87";
                    ctx.strokeStyle = "#c084fc";
                    ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    ctx.arc(0, 0, item.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = "#ffffff";
                    ctx.font = "bold 13px sans-serif";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("⚡", 0, 1);
                } else if (item.type === "slow") {
                    // Time Dilation (Cyan)
                    ctx.shadowColor = "#38bdf8";
                    ctx.shadowBlur = 18;
                    ctx.fillStyle = "#0c4a6e";
                    ctx.strokeStyle = "#38bdf8";
                    ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    ctx.arc(0, 0, item.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = "#ffffff";
                    ctx.font = "bold 13px sans-serif";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("⏱", 0, 1);
                }
                ctx.restore();
            }

            // DRAW Obstacles
            for (const obs of eng.obstacles) {
                ctx.save();
                ctx.translate(obs.x, obs.y);
                ctx.rotate(obs.rot);

                ctx.shadowColor = obs.color;
                ctx.shadowBlur = 16;
                ctx.strokeStyle = obs.color;
                ctx.lineWidth = 2.5;
                ctx.fillStyle = "#18060a";

                if (obs.type === "bug") {
                    // Hexagonal Spiky Virus Drone
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const a = (i * Math.PI) / 3;
                        const r = i % 2 === 0 ? obs.size : obs.size * 0.7;
                        const px = Math.cos(a) * r;
                        const py = Math.sin(a) * r;
                        if (i === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    // Center evil pulsing eye
                    ctx.fillStyle = "#ef4444";
                    ctx.beginPath();
                    ctx.arc(0, 0, obs.size * 0.35, 0, Math.PI * 2);
                    ctx.fill();
                } else if (obs.type === "firewall") {
                    // Spiky Firewall Crystal
                    ctx.beginPath();
                    ctx.moveTo(0, -obs.size);
                    ctx.lineTo(obs.size * 0.8, -obs.size * 0.3);
                    ctx.lineTo(obs.size, obs.size * 0.8);
                    ctx.lineTo(-obs.size, obs.size * 0.8);
                    ctx.lineTo(-obs.size * 0.8, -obs.size * 0.3);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = "#ffedd5";
                    ctx.beginPath();
                    ctx.arc(0, 0, 4, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Glitch Polygon
                    ctx.beginPath();
                    ctx.rect(-obs.size / 2, -obs.size / 2, obs.size, obs.size);
                    ctx.fill();
                    ctx.stroke();

                    ctx.strokeStyle = "#ffffff";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(-obs.size / 2, 0);
                    ctx.lineTo(obs.size / 2, 0);
                    ctx.stroke();
                }
                ctx.restore();
            }

            // DRAW Particles
            eng.particles = eng.particles.filter((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= p.decay;

                if (p.alpha > 0) {
                    ctx.save();
                    ctx.globalAlpha = p.alpha;
                    ctx.fillStyle = p.color;
                    ctx.shadowColor = p.color;
                    ctx.shadowBlur = 8;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                    return true;
                }
                return false;
            });

            // DRAW Floating Texts
            eng.floatingTexts = eng.floatingTexts.filter((ft) => {
                ft.y += ft.vy;
                ft.alpha -= 0.025;

                if (ft.alpha > 0) {
                    ctx.save();
                    ctx.globalAlpha = ft.alpha;
                    ctx.fillStyle = ft.color;
                    ctx.font = "bold 14px monospace";
                    ctx.textAlign = "center";
                    ctx.shadowColor = ft.color;
                    ctx.shadowBlur = 10;
                    ctx.fillText(ft.text, ft.x, ft.y);
                    ctx.restore();
                    return true;
                }
                return false;
            });

            // DRAW Player Cyber Interceptor
            if (gameState === "playing" || gameState === "menu") {
                ctx.save();
                ctx.translate(player.x, player.y);
                ctx.rotate(player.bank);

                // Invulnerability flicker
                if (player.invulnerable > 0 && Math.floor(player.invulnerable / 4) % 2 === 0) {
                    ctx.globalAlpha = 0.4;
                }

                // Active Quantum Shield Bubble
                if (eng.shieldTime > 0) {
                    ctx.save();
                    ctx.strokeStyle = "rgba(96, 165, 250, 0.8)";
                    ctx.fillStyle = "rgba(96, 165, 250, 0.15)";
                    ctx.shadowColor = "#60a5fa";
                    ctx.shadowBlur = 24;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(0, 0, player.radius + 14, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();
                }

                // Ship Shadow & Glow
                ctx.shadowColor = eng.boostTime > 0 ? "#22d3ee" : "#14b8a6";
                ctx.shadowBlur = 20;

                // Futuristic Delta Wings
                ctx.fillStyle = "#0f172a";
                ctx.strokeStyle = "#14b8a6";
                ctx.lineWidth = 2.5;

                ctx.beginPath();
                ctx.moveTo(0, -26); // Nose cone
                ctx.lineTo(22, 18);  // Right wingtip
                ctx.lineTo(8, 12);   // Right inner joint
                ctx.lineTo(0, 16);   // Engine bay
                ctx.lineTo(-8, 12);  // Left inner joint
                ctx.lineTo(-22, 18); // Left wingtip
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Cockpit Glass Canopy
                ctx.fillStyle = "#38bdf8";
                ctx.shadowColor = "#38bdf8";
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.ellipse(0, -6, 5, 12, 0, 0, Math.PI * 2);
                ctx.fill();

                // Wing Accents
                ctx.strokeStyle = "#22d3ee";
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(-14, 10);
                ctx.lineTo(-6, -4);
                ctx.moveTo(14, 10);
                ctx.lineTo(6, -4);
                ctx.stroke();

                ctx.restore();
            }

            ctx.restore();
            eng.animId = requestAnimationFrame(loop);
        };

        eng.animId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(eng.animId);
    }, [gameState]);

    return (
        <section id="game2" className="py-24 bg-background dark:bg-[#060709] relative overflow-hidden border-t border-border dark:border-white/[0.08]">
            {/* Background Ambient Glows */}
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                {/* Header Title & Badges */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold mb-4 backdrop-blur-md">
                        <Zap className="w-3.5 h-3.5" />
                        <span className="uppercase tracking-widest text-[11px]">Arcade Engine v2.4 • 60+ FPS Pure Canvas</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-foreground dark:text-white flex items-center justify-center gap-3">
                        <Rocket className="w-9 h-9 sm:w-11 sm:h-11 text-primary animate-pulse" />
                        <span>TECH <span className="bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">RUNNER</span></span>
                    </h2>

                    <p className="text-muted-foreground dark:text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-3">
                        High-speed cybernetic obstacle avoidance. Steer your quantum jet, dodge legacy code bugs, collect data cores, and deploy shields!
                    </p>
                </div>

                {/* Arcade Cabinet Container */}
                <div ref={containerRef} className="relative max-w-4xl mx-auto rounded-3xl bg-[#0b0d13] border-2 border-border dark:border-white/[0.12] p-2 sm:p-4 shadow-[0_0_50px_rgba(0,0,0,0.4)] dark:shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(20,184,166,0.15)]">
                    {/* Top HUD Control Strip */}
                    <div className="flex items-center justify-between px-3 py-2 mb-2 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs">
                        <div className="flex items-center gap-4 sm:gap-6">
                            <div className="flex items-center gap-1.5">
                                <span className="text-neutral-500 font-mono text-[10px] uppercase">SCORE</span>
                                <span className="font-mono font-bold text-white text-sm sm:text-base">{score.toLocaleString()}</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-1.5">
                                <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                                <span className="text-neutral-500 font-mono text-[10px] uppercase">HIGH</span>
                                <span className="font-mono font-bold text-yellow-400 text-sm">{highScore.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary font-mono text-[11px] font-bold">
                                    LVL {level}
                                </span>
                                {combo > 1 && (
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold animate-pulse">
                                        {combo}x COMBO
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Powerup Status & Mute Button */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {shieldActive && (
                                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-bold border border-blue-500/40 animate-pulse">
                                    <Shield className="w-3 h-3" />
                                    <span>SHIELD</span>
                                </span>
                            )}
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
                                title={isMuted ? "Unmute Sound" : "Mute Sound"}
                                aria-label="Toggle Sound"
                            >
                                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-primary" />}
                            </button>
                        </div>
                    </div>

                    {/* Canvas Stage */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#07080b] aspect-[16/10] max-h-[540px]">
                        <canvas
                            ref={canvasRef}
                            width={800}
                            height={520}
                            onPointerMove={handlePointerMove}
                            onPointerDown={handlePointerMove}
                            className="w-full h-full block cursor-crosshair touch-none select-none"
                        />

                        {/* OVERLAY: Menu Screen */}
                        <AnimatePresence>
                            {gameState === "menu" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/75 backdrop-blur-md p-6 text-center"
                                >
                                    <div className="max-w-md p-6 rounded-3xl bg-neutral-900/90 border border-primary/30 shadow-[0_0_40px_rgba(20,184,166,0.25)] mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-4 text-primary">
                                            <Rocket className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
                                            Quantum Flight Ready
                                        </h3>
                                        <p className="text-neutral-400 text-xs sm:text-sm mb-5 leading-relaxed">
                                            Move your mouse / touch anywhere to pilot. Collect <strong className="text-emerald-400">Data Cores</strong>, grab <strong className="text-blue-400">Shields</strong>, and detonate <strong className="text-purple-400">EMPs</strong>!
                                        </p>

                                        <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300 font-mono mb-2">
                                            <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-1.5">
                                                <ArrowLeftRight className="w-3.5 h-3.5 text-primary" />
                                                <span>Mouse / Touch / Arrows</span>
                                            </div>
                                            <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-1.5">
                                                <Shield className="w-3.5 h-3.5 text-blue-400" />
                                                <span>Quantum Shield (7s)</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={startGame}
                                        className="px-10 py-4 rounded-full bg-gradient-to-r from-primary to-emerald-400 text-black font-extrabold text-sm sm:text-base uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(20,184,166,0.45)] flex items-center gap-2.5 cursor-pointer"
                                    >
                                        <Play className="w-5 h-5 fill-current" />
                                        <span>INITIALIZE RUNNER</span>
                                    </button>
                                </motion.div>
                            )}

                            {/* OVERLAY: Game Over Screen */}
                            {gameState === "gameover" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/85 backdrop-blur-xl p-6 text-center"
                                >
                                    <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-neutral-900/95 border-2 border-red-500/40 shadow-[0_0_60px_rgba(239,68,68,0.3)]">
                                        <div className="w-16 h-16 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
                                            <Award className="w-8 h-8 text-yellow-400" />
                                        </div>

                                        <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-1">
                                            SYSTEM COLLISION
                                        </h3>
                                        <p className="text-red-400 font-mono text-xs uppercase tracking-widest mb-6">
                                            Sub-routine Overload
                                        </p>

                                        <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                                            <div>
                                                <div className="text-[10px] text-neutral-400 font-mono uppercase">FINAL SCORE</div>
                                                <div className="text-2xl font-black text-primary font-mono">{score.toLocaleString()}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-neutral-400 font-mono uppercase">BEST SCORE</div>
                                                <div className="text-2xl font-black text-yellow-400 font-mono">{highScore.toLocaleString()}</div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={startGame}
                                            className="w-full py-4 rounded-full bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                            <span>REBOOT SYSTEM & PLAY AGAIN</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Controls Legend */}
                    <div className="mt-3 flex flex-wrap items-center justify-between px-2 text-[11px] text-neutral-500 font-mono">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span>Data Core: Points</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-blue-400" />
                                <span>Shield: Invulnerability</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-purple-400" />
                                <span>EMP: Clear Screen</span>
                            </span>
                        </div>
                        <div className="hidden sm:block">
                            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-white">Space</kbd> or Drag to Play</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
            `}</style>
        </section>
    );
}
