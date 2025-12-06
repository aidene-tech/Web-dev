"use client";

import { motion } from "framer-motion";

export function About({ className }: { className?: string }) {
    return (
        <section className={`py-32 px-6 md:px-12 bg-zinc-950 relative z-10 flex flex-col justify-center items-center ${className}`}>
            <div className="max-w-4xl mx-auto text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">About Me</h2>
                    <div className="h-1 w-20 bg-white mb-12 mx-auto md:mx-0" />

                    <div className="space-y-6 text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
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
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
