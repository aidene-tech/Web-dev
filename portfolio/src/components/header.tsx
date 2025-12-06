"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useLenis } from "lenis/react";

// Defined transition checkpoints based on HomeContent.tsx logic
// Total height: 600vh
// Progress points (End of transition ranges):
// About: 0.25 (Range 0.1-0.25)
// Projects: 0.45 (Range 0.3-0.45)
// Blog: 0.65 (Range 0.5-0.65)
// Contact: 0.9 (Range 0.75-0.9)

const navItems = [
    { name: "About", progress: 0.25 },
    { name: "Projects", progress: 0.45 },
    { name: "Blog", progress: 0.65 },
    { name: "Contact", progress: 0.9 },
];

export function Header() {
    const [activeSection, setActiveSection] = useState<string>("");
    const { scrollYProgress } = useScroll();

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.1) {
            setActiveSection("");
            return;
        }

        // Determine active section based on visibility windows
        if (latest >= 0.1 && latest < 0.3) {
            setActiveSection("About");
        } else if (latest >= 0.3 && latest < 0.5) {
            setActiveSection("Projects");
        } else if (latest >= 0.5 && latest < 0.75) {
            setActiveSection("Blog");
        } else if (latest >= 0.75) {
            setActiveSection("Contact");
        }
    });

    const lenis = useLenis();

    const scrollToSection = (progress: number) => {
        if (!lenis) return;

        // Correctly calculate scrollable height (Total Document Height - Viewport Height)
        // This ensures progress 1.0 = Bottom, 0.5 = Middle of scrollable area
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const targetScroll = totalHeight * progress;

        lenis.scrollTo(targetScroll, {
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Optional: Match Lenis default or custom easing
        });
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6"
        >
            <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-2 py-2 backdrop-blur-md supports-[backdrop-filter]:bg-black/20">
                <Link
                    href="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-lg font-bold tracking-tighter text-white mr-4 px-4 hover:text-zinc-300 transition-colors"
                >
                    BURAK
                </Link>
                <div className="flex items-center">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => scrollToSection(item.progress)}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                                activeSection === item.name ? "text-black" : "text-zinc-400 hover:text-white"
                            )}
                        >
                            {activeSection === item.name && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 z-[-1] rounded-full bg-white"
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30
                                    }}
                                />
                            )}
                            {item.name}
                        </button>
                    ))}
                </div>
            </nav>
        </motion.header>
    );
}
