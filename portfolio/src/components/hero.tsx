"use client";

import { motion } from "framer-motion";


export function Hero() {
    return (
        <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Starfield removed, using global one */}

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-7xl md:text-9xl font-bold tracking-tight text-white mix-blend-difference font-[family-name:var(--font-orbitron)]"
                >
                    BURAK
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-4 text-xl md:text-2xl text-gray-400 font-light tracking-widest uppercase font-[family-name:var(--font-orbitron)]"
                >
                    Tech Enthusiast
                </motion.p>
            </div>
        </section>
    );
}
