"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { saveContact } from "@/actions/contact";

export function Contact({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.message) {
            return;
        }

        setStatus("loading");

        try {
            // Save to database
            await saveContact(formData);

            // Open mailto: link for email
            const mailtoLink = `mailto:info@ozturkburak.me?subject=New Contact Message&body=${encodeURIComponent(formData.message)}`;
            window.open(mailtoLink, "_blank");

            setStatus("success");
            setFormData({ email: "", message: "" });

            // Reset after 3 seconds
            setTimeout(() => setStatus("idle"), 3000);
        } catch (error) {
            console.error(error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    if (!mounted) {
        return (
            <section id="contact" className={`py-32 px-6 relative z-10 border-t border-zinc-900 ${className}`}>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Get in touch</h2>
                    <p className="text-zinc-400 mb-12 text-lg max-w-2xl mx-auto">
                        If you'd like to contact me, feel free to send a message below.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className={`py-32 px-6 relative z-10 border-t border-zinc-900 ${className}`}>
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Get in touch </h2>
                    <p className="text-zinc-400 mb-12 text-lg max-w-2xl mx-auto">
                        If you’d like to contact me, feel free to send a message below.
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-md mx-auto space-y-4 text-left"
                >

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={status === "loading"}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-zinc-600 disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <textarea
                            rows={4}
                            placeholder="Message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            disabled={status === "loading"}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-zinc-600 resize-none disabled:opacity-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === "loading" && (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Sending...
                            </>
                        )}
                        {status === "success" && (
                            <>
                                <CheckCircle size={18} className="text-green-600" />
                                Message Saved!
                            </>
                        )}
                        {status === "idle" && (
                            <>
                                Send Message
                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                        {status === "error" && (
                            <>
                                Error - Try Again
                            </>
                        )}
                    </button>
                </motion.form>
            </div>
        </section>
    );
}
