"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const posts = [
    {
        title: "The Future of Web Development: What to Expect in 2025",
        excerpt: "Exploring the rise of AI-driven coding, server components, and the next generation of frontend frameworks.",
        date: "Dec 12, 2024",
        slug: "#"
    },
    {
        title: "Mastering React Server Components",
        excerpt: "A deep dive into how RSCs are reshaping the way we build performant web applications.",
        date: "Nov 28, 2024",
        slug: "#"
    },
    {
        title: "Why You Should Use Tailwind CSS",
        excerpt: "Efficiency, scalability, and ease of use. Why utility-first CSS is the way forward.",
        date: "Oct 15, 2024",
        slug: "#"
    }
];

export function Blog({ className }: { className?: string }) {
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
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Latest Articles</h2>
                    <div className="h-1 w-20 bg-white" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:bg-zinc-800 transition-all duration-300"
                        >
                            <span className="text-zinc-500 text-sm font-mono mb-4 block">{post.date}</span>
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
                                {post.excerpt}
                            </p>
                            <Link
                                href={post.slug}
                                className="inline-flex items-center gap-2 text-zinc-300 hover:text-white text-sm font-medium transition-colors"
                            >
                                Read Article <ArrowUpRight size={16} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
