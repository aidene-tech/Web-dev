import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BlogPageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params;

    const post = await prisma.post.findFirst({
        where: {
            slug: `/blog/${slug}`
        }
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Back Button */}
                <Link
                    href="/#blog"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-12 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Articles
                </Link>

                {/* Article Header */}
                <header className="mb-12">
                    <span className="text-purple-400 text-sm font-mono mb-4 block">{post.date}</span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
                    {post.excerpt && (
                        <p className="text-xl text-zinc-400 leading-relaxed">{post.excerpt}</p>
                    )}
                </header>

                {/* Article Content */}
                <article className="prose prose-invert prose-lg max-w-none">
                    <div
                        className="text-zinc-300 leading-relaxed whitespace-pre-wrap"
                        style={{ lineHeight: '1.8' }}
                    >
                        {post.content}
                    </div>
                </article>

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t border-zinc-800">
                    <Link
                        href="/#blog"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Articles
                    </Link>
                </footer>
            </div>
        </div>
    );
}
