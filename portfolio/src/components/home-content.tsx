"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hero } from "./hero";
import { Projects } from "./projects";
import { About } from "./about";
import { Blog } from "./blog";
import { Contact } from "./contact";

import { StarfieldBackground } from "./starfield-background";

export function HomeContent() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Stages (700vh total) - More space for Blog:
    // 1. Hero: 0 - 0.12 (visible)
    // 2. About: 0.12 - 0.14 (transition), 0.14 - 0.25 (visible)
    // 3. Projects: 0.25 - 0.27 (transition), 0.27 - 0.40 (visible)
    // 4. Blog: 0.40 - 0.42 (transition), 0.42 - 0.85 (visible) - LARGE AREA
    // 5. Contact: 0.85 - 0.87 (transition), 0.87 - 1.0 (visible)

    // Short transition (2% of scroll), then stays visible
    const createIncomingValues = (transitionStart: number, transitionEnd: number) => {
        const opacity = useTransform(scrollYProgress, [transitionStart, transitionEnd], [0, 1]);
        const scale = useTransform(scrollYProgress, [transitionStart, transitionEnd], [0.95, 1]);
        // Pointer events: only when fully visible (after transition ends)
        const pointerEvents = useTransform(scrollYProgress, (value) => {
            return value >= transitionEnd ? "auto" : "none";
        });
        return { opacity, scale, pointerEvents };
    };

    // Hero is always visible at start, hidden after About appears
    const heroPointerEvents = useTransform(scrollYProgress, (value) => {
        return value < 0.12 ? "auto" : "none";
    });

    const about = createIncomingValues(0.12, 0.14);
    const projects = createIncomingValues(0.25, 0.27);
    const blog = createIncomingValues(0.40, 0.42);
    const contact = createIncomingValues(0.85, 0.87);

    return (
        <div className="relative w-full bg-black">
            {/* Scroll Track */}
            <div ref={containerRef} className="relative h-[700vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {/* Site-wide Starfield Background */}
                    <StarfieldBackground className="z-0" />

                    {/* HERO - Z-0 - Static Base */}
                    <motion.div
                        style={{ pointerEvents: heroPointerEvents }}
                        className="absolute inset-0 z-0 flex items-center justify-center w-full h-full"
                        suppressHydrationWarning
                    >
                        <Hero />
                    </motion.div>

                    {/* ABOUT - Z-10 */}
                    <motion.div
                        style={{
                            opacity: about.opacity,
                            scale: about.scale,
                            pointerEvents: about.pointerEvents
                        }}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-black"
                        suppressHydrationWarning
                    >
                        <div className="w-full h-full overflow-y-auto no-scrollbar">
                            <div className="min-h-full flex flex-col items-center pt-24 pb-12">
                                <About />
                            </div>
                        </div>
                    </motion.div>

                    {/* PROJECTS - Z-20 */}
                    <motion.div
                        style={{
                            opacity: projects.opacity,
                            scale: projects.scale,
                            pointerEvents: projects.pointerEvents
                        }}
                        className="absolute inset-0 z-20 flex items-center justify-center bg-black"
                        suppressHydrationWarning
                    >
                        <div className="w-full h-full overflow-y-auto no-scrollbar">
                            <div className="min-h-full flex flex-col items-center pt-24 pb-12">
                                <Projects />
                            </div>
                        </div>
                    </motion.div>

                    {/* BLOG - Z-30 */}
                    <motion.div
                        style={{
                            opacity: blog.opacity,
                            scale: blog.scale,
                            pointerEvents: blog.pointerEvents
                        }}
                        className="absolute inset-0 z-30 flex items-center justify-center bg-black"
                        suppressHydrationWarning
                    >
                        <div className="w-full h-full overflow-y-auto no-scrollbar">
                            <div className="min-h-full flex flex-col items-center pt-24 pb-12">
                                <Blog />
                            </div>
                        </div>
                    </motion.div>

                    {/* CONTACT + FOOTER - Z-40 */}
                    <motion.div
                        style={{
                            opacity: contact.opacity,
                            scale: contact.scale,
                            pointerEvents: contact.pointerEvents
                        }}
                        className="absolute inset-0 z-40 flex items-center justify-center bg-black"
                        suppressHydrationWarning
                    >
                        <div className="w-full h-full overflow-y-auto no-scrollbar">
                            <div className="min-h-full flex flex-col items-center pt-24 pb-0">
                                <Contact className="min-h-[60vh] flex items-center" />

                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
