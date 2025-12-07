"use client";

import { useState } from "react";
import { Link as LinkIcon, ArrowLeft, Check, Loader2, FileText, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { createPost } from "@/actions/blog";
import { createProject } from "@/actions/projects";
import { verifyPassword } from "@/actions/auth";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"blog" | "projects">("blog");

    // Blog Form State
    const [blogData, setBlogData] = useState({
        title: "",
        excerpt: "",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        content: ""
    });

    // Project Form State
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        imageUrl: "",
        demoLink: "",
        repoLink: "",
        tags: ""
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

    const handleBlogSubmit = async () => {
        if (!blogData.title || !blogData.content) return alert("Please fill in required fields");

        setStatus("loading");
        try {
            await createPost(blogData);
            setStatus("success");
            setBlogData({
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

    const handleProjectSubmit = async () => {
        if (!projectData.title || !projectData.description || !projectData.tags) return alert("Please fill in required fields");

        setStatus("loading");
        try {
            await createProject(projectData);
            setStatus("success");
            setProjectData({
                title: "",
                description: "",
                imageUrl: "",
                demoLink: "",
                repoLink: "",
                tags: ""
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
                            disabled={isLoading}
                        >
                            {isLoading ? "Checking..." : "Login"}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-zinc-500 text-sm">Hint: admin123</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white px-8 pb-8 pt-32 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    </div>

                    <div className="flex bg-zinc-900 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab("blog")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === "blog" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            <FileText size={18} />
                            <span>Blog Posts</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("projects")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === "projects" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            <FolderGit2 size={18} />
                            <span>Projects</span>
                        </button>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">
                            {activeTab === "blog" ? "Write New Post" : "Add New Project"}
                        </h2>
                    </div>

                    {activeTab === "blog" ? (
                        <>
                            <div>
                                <label className="block text-zinc-400 text-sm mb-2">Title</label>
                                <input
                                    type="text"
                                    value={blogData.title}
                                    onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-zinc-400 text-sm mb-2">Excerpt</label>
                                <textarea
                                    value={blogData.excerpt}
                                    onChange={(e) => setBlogData({ ...blogData, excerpt: e.target.value })}
                                    rows={3}
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-zinc-400 text-sm mb-2">Date</label>
                                <input
                                    type="text"
                                    value={blogData.date}
                                    onChange={(e) => setBlogData({ ...blogData, date: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-zinc-400 text-sm mb-2">Detailed Content (Markdown)</label>
                                <textarea
                                    value={blogData.content}
                                    onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
                                    rows={12}
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors font-mono text-sm"
                                />
                            </div>

                            <button
                                onClick={handleBlogSubmit}
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
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-zinc-400 text-sm mb-2">Project Title</label>
                                <input
                                    type="text"
                                    value={projectData.title}
                                    onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-zinc-400 text-sm mb-2">Description</label>
                                <textarea
                                    value={projectData.description}
                                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                                    rows={3}
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-zinc-400 text-sm mb-2">Image URL (Visual Link)</label>
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        value={projectData.imageUrl}
                                        onChange={(e) => setProjectData({ ...projectData, imageUrl: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-zinc-400 text-sm mb-2">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        placeholder="Next.js, TypeScript, AI..."
                                        value={projectData.tags}
                                        onChange={(e) => setProjectData({ ...projectData, tags: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-zinc-400 text-sm mb-2">Demo Link</label>
                                    <div className="relative">
                                        <LinkIcon size={16} className="absolute left-3 top-3 text-zinc-500" />
                                        <input
                                            type="text"
                                            placeholder="https://..."
                                            value={projectData.demoLink}
                                            onChange={(e) => setProjectData({ ...projectData, demoLink: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-zinc-400 text-sm mb-2">Repository Link</label>
                                    <div className="relative">
                                        <LinkIcon size={16} className="absolute left-3 top-3 text-zinc-500" />
                                        <input
                                            type="text"
                                            placeholder="https://github.com/..."
                                            value={projectData.repoLink}
                                            onChange={(e) => setProjectData({ ...projectData, repoLink: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleProjectSubmit}
                                disabled={status === "loading" || status === "success"}
                                className={`w-full font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${status === "success"
                                    ? "bg-green-500 text-black cursor-default"
                                    : "bg-white text-black hover:bg-zinc-200"
                                    }`}
                            >
                                {status === "loading" && <Loader2 size={18} className="animate-spin" />}
                                {status === "success" && <Check size={18} />}
                                {status === "idle" ? "Add Project" : status === "loading" ? "Adding..." : status === "success" ? "Added!" : "Add Project"}
                            </button>
                        </>
                    )}

                    {status === "error" && (
                        <p className="text-red-500 text-sm text-center">Failed to save. Check console.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
