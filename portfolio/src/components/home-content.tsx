"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { Hero } from "./hero";
import { About } from "./about";
import { Projects } from "./projects";
import { Blog } from "./blog";
import { Contact } from "./contact";
import { Footer } from "./footer";

export function HomeContent() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Total height: 600vh
    // Logic: Previous sections stay STATIC (Scale 1, Opacity 1).
    // Next section Scales Up and Fades In ON TOP of the previous one.
    // This creates a solid deck/stack effect, avoiding the "nested/ghost" look.

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Incoming animations ONLY.
    // Start - End ranges for when the section enters.

    // Stages:
    // 1. Hero (Always visible at Z-0)
    // 2. About enters: 0.1 - 0.25 (Z-10)
    // 3. Projects enters: 0.3 - 0.45 (Z-20)
    // 4. Blog enters: 0.5 - 0.65 (Z-30)
    // 5. Contact enters: 0.7 - 0.85 (Z-40)

    const createIncomingValues = (start: number, end: number) => {
        const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
        const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);
        const y = useTransform(scrollYProgress, [start, end], [100, 0]); // Slight Y movement for better feel
        return { opacity, scale, y };
    };

    const about = createIncomingValues(0.1, 0.25);
    const projects = createIncomingValues(0.3, 0.45);
    const blog = createIncomingValues(0.5, 0.65);
    const contact = createIncomingValues(0.7, 0.85);

    return (
        <div className="relative w-full bg-black">
            {/* Scroll Track */}
            <div ref={containerRef} className="relative h-[600vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden">

                    {/* HER0 - Z-0 - Static BaSe */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center w-full h-full">
                        <Hero />
                    </div>

                    {/* ABOUT - Z-10 */}
                    <motion.div
                        style={{ opacity: about.opacity, scale: about.scale }}
                        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                    >
                        <div className="w-full h-full pointer-events-auto overflow-y-auto no-scrollbar bg-zinc-950">
                            {/* Removed justify-center to fix 'top visibility', added padding */}
                            <div className="min-h-full flex flex-col items-center pt-24 pb-12">
                                <About />
                            </div>
                        </div>
                    </motion.div>

                    {/* PROJECTS - Z-20 */}
                    <motion.div
                        style={{ opacity: projects.opacity, scale: projects.scale }}
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                    >
                        <div className="w-full h-full pointer-events-auto overflow-y-auto no-scrollbar bg-zinc-950">
                            <div className="min-h-full flex flex-col items-center pt-24 pb-12">
                                <Projects />
                            </div>
                        </div>
                    </motion.div>

                    {/* BLOG - Z-30 */}
                    <motion.div
                        style={{ opacity: blog.opacity, scale: blog.scale }}
                        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                    >
                        <div className="w-full h-full pointer-events-auto overflow-y-auto no-scrollbar bg-zinc-950">
                            <div className="min-h-full flex flex-col items-center pt-24 pb-12">
                                <Blog />
                            </div>
                        </div>
                    </motion.div>

                    {/* CONTACT + FOOTER - Z-40 */}
                    <motion.div
                        style={{ opacity: contact.opacity, scale: contact.scale }}
                        className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
                    >
                        <div className="w-full h-full pointer-events-auto overflow-y-auto no-scrollbar bg-zinc-950">
                            <div className="min-h-full flex flex-col items-center pt-24 pb-0">
                                <Contact className="min-h-[60vh] flex items-center" />
                                <Footer className="w-full mt-auto" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
