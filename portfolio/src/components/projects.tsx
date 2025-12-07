"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { getProjects } from "@/actions/projects";
import { useEffect, useState } from "react";

export function Projects({ className }: { className?: string }) {
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        getProjects().then(setProjects);
    }, []);
    return (
        <section id="projects" className={`py-16 px-6 md:px-12 bg-zinc-950 relative z-10 ${className}`}>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
                    <div className="h-1 w-16 bg-white" />
                </motion.div>

                {/* Compact timeline list - same style as Blog */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-zinc-800" />

                    <div className="space-y-2">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="relative pl-10"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-1 top-4 w-4 h-4 rounded-full bg-zinc-900 border-2 border-purple-500/50 z-10" />

                                <div className="group bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex-1 min-w-0 flex items-center gap-4">
                                            {/* Tags */}
                                            <div className="hidden sm:flex gap-1">
                                                {project.tags?.split(',').slice(0, 2).map((tag: string, i: number) => (
                                                    <span key={i} className="px-2 py-0.5 text-[10px] font-medium text-zinc-400 bg-zinc-800 rounded">
                                                        {tag.trim()}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors truncate">
                                                {project.title}
                                            </h3>
                                        </div>

                                        {/* Links */}
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            {project.repoLink && (
                                                <Link
                                                    href={project.repoLink}
                                                    className="text-zinc-600 hover:text-white transition-colors"
                                                    target="_blank"
                                                >
                                                    <Github size={14} />
                                                </Link>
                                            )}
                                            {project.demoLink && (
                                                <Link
                                                    href={project.demoLink}
                                                    className="text-zinc-600 hover:text-purple-400 transition-colors"
                                                    target="_blank"
                                                >
                                                    <ArrowUpRight size={14} />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {projects.length === 0 && (
                        <div className="text-center text-zinc-500 py-8">
                            No projects yet. Check back soon!
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
