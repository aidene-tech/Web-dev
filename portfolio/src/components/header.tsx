"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Defined transition checkpoints based on HomeContent.tsx logic
// Track height is 600vh. Scrollable distance is 500vh.
// Progress points:
// About: 0.25
// Projects: 0.45
// Blog: 0.65
// Contact: 0.85

const navItems = [
    { name: "About", progress: 0.25 },
    { name: "Projects", progress: 0.45 },
    { name: "Blog", progress: 0.65 },
    { name: "Contact", progress: 0.85 },
];

export function Header() {
    const pathname = usePathname();

    const scrollToSection = (progress: number) => {
        // Calculate total scrollable height (approximate 500vh)
        // Ideally we'd measure the element, but vh math works well enough for fullscreen sections
        const totalHeight = window.innerHeight * 5;
        const targetScroll = totalHeight * progress;

        window.scrollTo({
            top: targetScroll,
            behavior: "smooth"
        });
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6"
        >
            <nav className="flex items-center gap-6 rounded-full border border-white/10 bg-black/50 px-6 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-black/20">
                <Link
                    href="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-lg font-bold tracking-tighter text-white mr-4 hover:text-zinc-300 transition-colors"
                >
                    BURAK
                </Link>
                <div className="flex items-center gap-4">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => scrollToSection(item.progress)}
                            className={cn(
                                "text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                            )}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </nav>
        </motion.header>
    );
}
