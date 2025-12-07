"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function About({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <section className={`py-32 px-6 md:px-12 relative z-10 flex flex-col justify-center items-center ${className}`}>
                <div className="max-w-7xl mx-auto w-full">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">About Me</h2>
                        <div className="h-1 w-20 bg-white mb-12" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`py-32 px-6 md:px-12 relative z-10 flex flex-col justify-center items-center ${className}`}>
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">About Me</h2>
                            <div className="h-1 w-20 bg-white mb-12" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed font-light"
                        >
                            <p>
                                I am a creative developer passionate about building digital experiences that merge code with aesthetics.
                                My journey started with a curiosity for how things work on the web, evolving into a full-blown career
                                crafting high-performance applications and immersive websites.
                            </p>
                            <p>
                                I specialize in modern web technologies, focusing on performance, accessibility, and user interaction.
                                I believe that the best products are those that feel natural and intuitive to use.
                            </p>
                            <p>
                                When I'm not coding, I'm exploring new technologies, contributing to open source, or designing
                                interfaces that challenge the status quo.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="relative aspect-[3/4] w-full max-w-md mx-auto"
                    >
                        {/* Glowing space-themed border */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-[3px]">
                            <div className="relative w-full h-full rounded-lg overflow-hidden bg-zinc-950">
                                <Image
                                    src="/images/profile.jpg"
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </div>
                        {/* Outer glow effect */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl -z-10"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
