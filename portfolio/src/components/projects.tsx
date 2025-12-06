"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

// Placeholder data - replace with real projects later
const projects = [
    {
        title: "E-Commerce Platform",
        description: "A full-featured online store with cart, checkout, and admin dashboard functionality.",
        tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
        link: "#",
        github: "#"
    },
    {
        title: "AI Task Manager",
        description: "Smart task organization tool that uses AI to prioritize and categorize your daily workload.",
        tags: ["React", "Python", "OpenAI API", "Tailwind"],
        link: "#",
        github: "#"
    },
    {
        title: "Portfolio v1",
        description: "My first portfolio website built with vanilla HTML/CSS and JavaScript.",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "#",
        github: "#"
    }
];

export function Projects({ className }: { className?: string }) {
    return (
        <section className={`py-32 px-6 md:px-12 bg-zinc-950 relative z-10 ${className}`}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Featured Projects</h2>
                    <div className="h-1 w-20 bg-white" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:bg-zinc-800 transition-all duration-300 flex flex-col"
                        >
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-medium text-zinc-300 bg-zinc-800 rounded-full border border-zinc-700">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto flex items-center gap-4 pt-4 border-t border-zinc-800/50">
                                <Link
                                    href={project.link}
                                    className="inline-flex items-center gap-2 text-white hover:text-purple-400 text-sm font-medium transition-colors"
                                >
                                    Live Demo <ArrowUpRight size={16} />
                                </Link>
                                <Link
                                    href={project.github}
                                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors ml-auto"
                                >
                                    <Github size={16} /> Source
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
