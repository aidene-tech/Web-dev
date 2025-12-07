"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getPosts } from "@/actions/blog";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Blog({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        setMounted(true);
        getPosts().then(setPosts);
    }, []);

    if (!mounted) {
        return (
            <section id="blog" className={`py-16 px-6 md:px-12 relative z-10 ${className}`}>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest Articles</h2>
                    <div className="h-1 w-16 bg-white" />
                </div>
            </section>
        );
    }

    return (
        <section id="blog" className={`py-16 px-6 md:px-12 relative z-10 ${className}`}>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest Articles</h2>
                    <div className="h-1 w-16 bg-white" />
                </motion.div>

                {/* Compact list */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-zinc-800" />

                    <div className="space-y-2">
                        {posts.map((post, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="relative pl-10"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-1 top-4 w-4 h-4 rounded-full bg-zinc-900 border-2 border-purple-500/50 z-10" />

                                <Link
                                    href={post.slug}
                                    className="block group bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex-1 min-w-0 flex items-center gap-4">
                                            {/* Date */}
                                            <span className="text-zinc-600 text-xs font-mono whitespace-nowrap hidden sm:block">{post.date}</span>

                                            {/* Title */}
                                            <h3 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors truncate">
                                                {post.title}
                                            </h3>
                                        </div>

                                        {/* Arrow */}
                                        <ArrowUpRight
                                            size={14}
                                            className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
                                        />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {posts.length === 0 && (
                    <div className="text-center text-zinc-500 py-8">
                        No articles yet. Check back soon!
                    </div>
                )}
            </div>
        </section>
    );
}
