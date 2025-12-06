"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { createPost } from "@/actions/blog";
import { verifyPassword } from "@/actions/auth";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        content: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const isValid = await verifyPassword(password);
        setIsLoading(false);

        if (isValid) {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.content) return alert("Please fill in required fields");

        setStatus("loading");
        try {
            await createPost(formData);
            setStatus("success");
            setFormData({
                title: "",
                excerpt: "",
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                content: ""
            });
            setTimeout(() => setStatus("idle"), 3000);
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
                <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-center text-zinc-500 text-sm">Hint: admin123</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-3xl font-bold">Write New Post</h1>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                    <h2 className="text-xl font-bold mb-4">Content Details</h2>

                    <div>
                        <label className="block text-zinc-400 text-sm mb-2">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-zinc-400 text-sm mb-2">Excerpt</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            rows={3}
                            className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-zinc-400 text-sm mb-2">Date</label>
                        <input
                            type="text"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-zinc-400 text-sm mb-2">Detailed Content (Markdown)</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={12}
                            className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors font-mono text-sm"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={status === "loading" || status === "success"}
                        className={`w-full font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${status === "success"
                            ? "bg-green-500 text-black cursor-default"
                            : "bg-white text-black hover:bg-zinc-200"
                            }`}
                    >
                        {status === "loading" && <Loader2 size={18} className="animate-spin" />}
                        {status === "success" && <Check size={18} />}
                        {status === "idle" ? "Publish Post" : status === "loading" ? "Publishing..." : status === "success" ? "Published!" : "Publish Post"}
                    </button>

                    {status === "error" && (
                        <p className="text-red-500 text-sm text-center">Failed to create post. Check console.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
