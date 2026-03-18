"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, MeshWobbleMaterial, GradientTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function FloatingOrb() {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere args={[1, 100, 100]} scale={1.8}>
                <MeshDistortMaterial
                    color="#4f46e5"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0}
                    metalness={0.8}
                >
                    <GradientTexture
                        stops={[0, 1]}
                        colors={['#4f46e5', '#ec4899']}
                        size={1024}
                    />
                </MeshDistortMaterial>
            </Sphere>
        </Float>
    );
}

function SmallFloatingOrb({ position, color }: { position: [number, number, number], color: string }) {
    return (
        <Float speed={3} rotationIntensity={0.5} floatIntensity={2}>
            <Sphere args={[0.3, 32, 32]} position={position}>
                <MeshWobbleMaterial color={color} factor={0.6} speed={3} />
            </Sphere>
        </Float>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full max-w-[1400px] max-h-[900px]">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true }} dpr={[1, 2]}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[10, 10, 5]} intensity={2} />
                    <pointLight position={[-10, -10, -5]} intensity={1} color="#4f46e5" />
                    <Suspense fallback={null}>
                        <FloatingOrb />
                        <SmallFloatingOrb position={[2.5, 1.5, -1]} color="#ec4899" />
                        <SmallFloatingOrb position={[-2.5, -1.5, 1]} color="#14b8a6" />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
