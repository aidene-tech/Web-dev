"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

// Defined transition checkpoints based on HomeContent.tsx logic
// Total height: 600vh
// Progress points (End of transition ranges):
// About: 0.25 (Range 0.1-0.25)
// Projects: 0.45 (Range 0.3-0.45)
// Blog: 0.65 (Range 0.5-0.65)
// Contact: 0.9 (Range 0.75-0.9)

const navItems = [
    { name: "About", progress: 0.14, path: "/#about" },
    { name: "Projects", progress: 0.27, path: "/#projects" },
    { name: "Blog", progress: 0.42, path: "/#blog" },
    { name: "Contact", progress: 0.87, path: "/#contact" },
];

export function Header() {
    const [activeSection, setActiveSection] = useState<string>("");
    const { scrollYProgress } = useScroll();
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const isBlogPage = pathname.startsWith("/blog");

    // Set active section based on URL for non-home pages
    useEffect(() => {
        if (isBlogPage) {
            setActiveSection("Blog");
        } else if (pathname.startsWith("/admin")) {
            setActiveSection("");
        }
    }, [pathname, isBlogPage]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Only update based on scroll if on home page
        if (!isHomePage) return;

        if (latest < 0.12) {
            setActiveSection("");
            return;
        }

        // Determine active section based on visibility windows (700vh)
        if (latest >= 0.12 && latest < 0.25) {
            setActiveSection("About");
        } else if (latest >= 0.25 && latest < 0.40) {
            setActiveSection("Projects");
        } else if (latest >= 0.40 && latest < 0.85) {
            setActiveSection("Blog");
        } else if (latest >= 0.85) {
            setActiveSection("Contact");
        }
    });

    const lenis = useLenis();

    const scrollToSection = (progress: number, immediate = false) => {
        if (!lenis) return;

        // Correctly calculate scrollable height (Total Document Height - Viewport Height)
        // This ensures progress 1.0 = Bottom, 0.5 = Middle of scrollable area
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const targetScroll = totalHeight * progress;

        lenis.scrollTo(targetScroll, {
            immediate: immediate,
            duration: immediate ? 0 : 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Optional: Match Lenis default or custom easing
        });
    };

    const handleNavClick = (item: typeof navItems[0]) => {
        if (isHomePage) {
            scrollToSection(item.progress, true);
        } else {
            // Navigate to home page first, then scroll
            // Store target section in session storage or URL hash to scroll after load if needed
            window.location.href = item.path;
        }
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
                    onClick={() => isHomePage && window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-lg font-bold tracking-tighter text-white mr-4 px-4 hover:text-zinc-300 transition-colors"
                >
                    BURAK
                </Link>
                <div className="flex items-center">
                    {navItems.map((item) => (
                        <motion.button
                            key={item.name}
                            onClick={() => handleNavClick(item)}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                                activeSection === item.name ? "text-black" : "text-zinc-400 hover:text-white"
                            )}
                            whileHover={{ scale: 1.5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
                        </motion.button>
                    ))}
                </div>
            </nav>
        </motion.header>
    );
}

