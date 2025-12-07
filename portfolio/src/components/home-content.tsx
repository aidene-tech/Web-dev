"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hero } from "./hero";
import { Projects } from "./projects";
import { About } from "./about";
import { Blog } from "./blog";
import { Contact } from "./contact";

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



    // Hero is always visible at start, hidden after About appears
    const heroPointerEvents = useTransform(scrollYProgress, (value) => {
        return value < 0.12 ? "auto" : "none";
    });
    // Fade out Hero when About appears
    const heroOpacity = useTransform(scrollYProgress, [0.12, 0.14], [1, 0]);

    // ABOUT
    // Enters: 0.12-0.14 (Opacity 0->1, Scale 0.95->1)
    // Exits: 0.25-0.27 (Opacity 1->0, Scale 1->0.95)
    const aboutOpacity = useTransform(scrollYProgress, [0.12, 0.14, 0.25, 0.27], [0, 1, 1, 0]);
    const aboutScale = useTransform(scrollYProgress, [0.12, 0.14, 0.25, 0.27], [0.95, 1, 1, 0.95]);
    const aboutPointerEvents = useTransform(scrollYProgress, (value) => {
        return (value >= 0.14 && value <= 0.25) ? "auto" : "none";
    });

    // PROJECTS
    const projectsOpacity = useTransform(scrollYProgress, [0.25, 0.27, 0.40, 0.42], [0, 1, 1, 0]);
    const projectsScale = useTransform(scrollYProgress, [0.25, 0.27, 0.40, 0.42], [0.95, 1, 1, 0.95]);
    const projectsPointerEvents = useTransform(scrollYProgress, (value) => {
        return (value >= 0.27 && value <= 0.40) ? "auto" : "none";
    });

    // BLOG
    const blogOpacity = useTransform(scrollYProgress, [0.40, 0.42, 0.85, 0.87], [0, 1, 1, 0]);
    const blogScale = useTransform(scrollYProgress, [0.40, 0.42, 0.85, 0.87], [0.95, 1, 1, 0.95]);
    const blogPointerEvents = useTransform(scrollYProgress, (value) => {
        return (value >= 0.42 && value <= 0.85) ? "auto" : "none";
    });

    // CONTACT
    // Only enters. Stays visible at end.
    const contactOpacity = useTransform(scrollYProgress, [0.85, 0.87], [0, 1]);
    const contactScale = useTransform(scrollYProgress, [0.85, 0.87], [0.95, 1]);
    const contactPointerEvents = useTransform(scrollYProgress, (value) => {
        return value >= 0.87 ? "auto" : "none";
    });

    return (
        <div className="relative w-full">
            {/* Scroll Track */}
            <div ref={containerRef} className="relative h-[700vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden">

                    {/* HERO - Z-0 - Static Base */}
                    <motion.div
                        style={{
                            pointerEvents: heroPointerEvents,
                            opacity: heroOpacity
                        }}
                        className="absolute inset-0 z-0 flex items-center justify-center w-full h-full"
                        suppressHydrationWarning
                    >
                        <Hero />
                    </motion.div>

                    {/* ABOUT - Z-10 */}
                    <motion.div
                        style={{
                            opacity: aboutOpacity,
                            scale: aboutScale,
                            pointerEvents: aboutPointerEvents
                        }}
                        className="absolute inset-0 z-10 flex items-center justify-center"
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
                            opacity: projectsOpacity,
                            scale: projectsScale,
                            pointerEvents: projectsPointerEvents
                        }}
                        className="absolute inset-0 z-20 flex items-center justify-center"
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
                            opacity: blogOpacity,
                            scale: blogScale,
                            pointerEvents: blogPointerEvents
                        }}
                        className="absolute inset-0 z-30 flex items-center justify-center"
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
                            opacity: contactOpacity,
                            scale: contactScale,
                            pointerEvents: contactPointerEvents
                        }}
                        className="absolute inset-0 z-40 flex items-center justify-center"
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
