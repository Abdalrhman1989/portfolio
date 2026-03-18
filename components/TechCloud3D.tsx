"use client";

import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, TrackballControls, Float } from "@react-three/drei";
import * as THREE from "three";

const tech = [
    "Next.js 15", "React 19", "TypeScript", "Three.js", "Node.js", "TailwindCSS", 
    "Framer Motion", "Prisma", "PostgreSQL", "Docker", "Vercel", "GSAP",
    "GraphQL", "MongoDB", "Redux", "Python", "PHP", "Laravel", "MySQL",
    "API Design", "AI Agents", "LLMs", "Automation", "CI/CD", "Web3",
    "UI/UX", "Multimedia", "Cross-Platform", "React Native", "Cloud"
];

const COLORS = ["#3b82f6", "#06b6d4", "#8b5cf6", "#ec4899", "#ffffff"];

function Word({ children, ...props }: any) {
    const color = new THREE.Color();
    const fontProps = { fontSize: 0.3, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false };
    const ref = useRef<any>(null);
    const [hovered, setHovered] = useState(false);
    
    // Choose a persistent color for this word
    const baseColor = useMemo(() => COLORS[Math.floor(Math.random() * COLORS.length)], []);
    
    const over = (e: any) => (e.stopPropagation(), setHovered(true));
    const out = () => setHovered(false);

    useFrame(({ clock }) => {
        if (ref.current) {
            const targetColor = hovered ? "#ffffff" : baseColor;
            ref.current.material.color.lerp(color.set(targetColor), 0.1);
            if (hovered) {
                ref.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
            } else {
                ref.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            }
        }
    });

    return (
        <Text 
            ref={ref} 
            onPointerOver={over} 
            onPointerOut={out} 
            {...props} 
            {...fontProps} 
            children={children} 
        />
    );
}

function Cloud({ count = 6, radius = 5 }) {
    const words = useMemo(() => {
        const temp = [] as any;
        const spherical = new THREE.Spherical();
        
        for (let i = 0; i < tech.length; i++) {
            const phi = Math.acos(-1 + (2 * i) / tech.length);
            const theta = Math.sqrt(tech.length * Math.PI) * phi;
            
            temp.push([
                new THREE.Vector3().setFromSpherical(spherical.set(radius, phi, theta)), 
                tech[i]
            ]);
        }
        return temp;
    }, [radius]);

    const groupRef = useRef<any>(null);
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002;
            groupRef.current.rotation.x += 0.001;
        }
    });

    return (
        <group ref={groupRef}>
            {words.map(([pos, word]: any, index: number) => (
                <Word key={index} position={pos}>
                    {word}
                </Word>
            ))}
        </group>
    );
}

export default function TechCloud3D() {
    return (
        <div className="w-full h-[600px] cursor-grab active:cursor-grabbing relative overflow-hidden group">
            <div className="absolute top-8 left-8 z-10 pointer-events-none">
                <div className="flex items-center gap-4 bg-primary/5 backdrop-blur-xl border border-primary/20 p-4 rounded-3xl">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <h3 className="text-xs font-black tracking-[0.3em] text-primary uppercase italic leading-none">Interactive.3D.Cloud</h3>
                </div>
            </div>
            
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 12], fov: 35 }}>
                <Suspense fallback={null}>
                    <fog attach="fog" args={["#000000", 0, 25]} />
                    <Cloud radius={6} />
                    <TrackballControls noPan noZoom rotateSpeed={3} />
                </Suspense>
            </Canvas>

            <div className="absolute bottom-8 right-8 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 italic">Drag to Rotate / Hover to Explore</span>
            </div>
        </div>
    );
}
