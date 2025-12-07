"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { usePathname } from "next/navigation";
import * as THREE from "three";

function StarField(props: any) {
    const ref = useRef<any>(null);
    const pathname = usePathname();

    // Warp speed state
    const speedRef = useRef(1); // Normal speed multiplier

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

    // Trigger warp on path change
    useEffect(() => {
        // Warp start
        speedRef.current = 20; // 20x speed
        const timeout = setTimeout(() => {
            speedRef.current = 1; // Back to normal
        }, 800); // Duration of warp
        return () => clearTimeout(timeout);
    }, [pathname]);

    useFrame((state, delta) => {
        if (ref.current) {
            // Smoothly interpolate current speed (optional, or just use the ref directly for instant acceleration)
            // For smoother accel/decel, we could use a lerp variable, but ref is simple for now.
            // Let's do simple lerp for smoothness

            // ref.current.rotation.x -= delta / 20;
            // ref.current.rotation.y -= delta / 30;

            // Base speeds
            const baseX = delta / 20;
            const baseY = delta / 30;

            // Apply multiplier
            ref.current.rotation.x -= baseX * speedRef.current;
            ref.current.rotation.y -= baseY * speedRef.current;

            // During warp, maybe also slightly scale?
            const targetScale = speedRef.current > 1 ? 1.2 : 1;
            ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2);
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
