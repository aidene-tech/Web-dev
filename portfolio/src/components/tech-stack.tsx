"use client";

import { motion } from "framer-motion";

const tools = [
    "Next.js", "React", "Three.js", "TypeScript", "Tailwind CSS",
    "Node.js", "PostgreSQL", "Framer Motion", "Docker", "AWS",
    "Blender", "Figma", "Git", "Vercel", "Prisma"
];

export function TechStack() {
    return (
        <motion.section
            id="tech"
            className="py-24 bg-black overflow-hidden relative z-10 border-t border-zinc-900"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-20 pointer-events-none" />

            <div className="mb-12 px-6 md:px-12 max-w-6xl mx-auto">
                <span className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Technologies</span>
            </div>

            <div className="flex">
                <motion.div
                    className="flex gap-16 pr-16 whitespace-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30
                    }}
                >
                    {[...tools, ...tools].map((tool, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                            <span className="text-5xl md:text-7xl font-bold text-zinc-800 transition-colors duration-300 group-hover:text-white/20 select-none">
                                {tool}
                            </span>
                            <span className="text-2xl text-purple-500 font-bold">/</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}
