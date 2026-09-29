"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import { Suspense } from "react";

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
            <div className="w-full h-full">
                <Canvas
                    camera={{ position: [0, 0, 6], fov: 60 }}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 1.5]}
                >
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#14b8a6" />
                    <pointLight position={[-10, -10, -5]} intensity={0.8} color="#22d3ee" />
                    
                    <Suspense fallback={null}>
                        {/* Deep Elegant Starfield - Clean & Non-Intrusive */}
                        <Stars
                            radius={50}
                            depth={40}
                            count={1200}
                            factor={2.5}
                            saturation={0}
                            fade
                            speed={0.4}
                        />

                        {/* Floating Cyan/Teal Luminous Micro-Particles */}
                        <Sparkles
                            count={50}
                            scale={[14, 10, 8]}
                            size={2.5}
                            speed={0.25}
                            color="#14b8a6"
                            opacity={0.35}
                        />
                        <Sparkles
                            count={35}
                            scale={[12, 8, 6]}
                            size={2}
                            speed={0.2}
                            color="#22d3ee"
                            opacity={0.3}
                        />
                        <Sparkles
                            count={25}
                            scale={[8, 6, 4]}
                            size={3}
                            speed={0.35}
                            color="#ffffff"
                            opacity={0.45}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
