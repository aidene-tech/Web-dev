"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export function Contact({ className }: { className?: string }) {
    return (
        <section id="contact" className={`py-32 px-6 relative z-10 bg-zinc-950 border-t border-zinc-900 ${className}`}>
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Let&apos;s work together</h2>
                    <p className="text-zinc-400 mb-12 text-lg max-w-2xl mx-auto">
                        Have a project in mind? Building something ambitious? I&apos;d love to help you bring it to life.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-md mx-auto space-y-4 text-left"
                >
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-zinc-600"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-zinc-600"
                        />
                    </div>
                    <div>
                        <textarea
                            rows={4}
                            placeholder="Message"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-zinc-600 resize-none"
                        />
                    </div>
                    <button
                        type="button" // Prevent submit for now
                        className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group"
                    >
                        Send Message
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.form>
            </div>
        </section>
    );
}
