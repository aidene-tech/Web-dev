"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";

function StarField(props: any) {
    const ref = useRef<any>(null);

    // Generate random points in a sphere
    const sphere = useMemo(() => {
        const count = 5000;
        const positions = new Float32Array(count * 3);
        const radius = 1.5;

        for (let i = 0; i < count; i++) {
            const r = radius * Math.cbrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        return positions;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            // Slower rotation for less movement
            ref.current.rotation.x -= delta / 20;
            ref.current.rotation.y -= delta / 30;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export function StarfieldBackground({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute inset-0 w-full h-full ${className}`} suppressHydrationWarning>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <StarField />
                <Preload all />
            </Canvas>
        </div>
    );
}
