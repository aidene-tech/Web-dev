"use client";

import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Projects({ className }: { className?: string }) {
    return (
        <section id="projects" className={`py-32 px-6 md:px-12 bg-zinc-950 relative z-10 ${className}`}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Selected Works</h2>
                    <div className="h-1 w-20 bg-white" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative rounded-2xl bg-zinc-900 border border-zinc-800 p-8 hover:bg-zinc-800 transition-colors duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-zinc-500 font-mono text-sm">{project.year}</span>
                                <Link
                                    href={project.link}
                                    className="p-2 bg-zinc-800 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300"
                                >
                                    <ArrowUpRight size={20} />
                                </Link>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-zinc-400 mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
