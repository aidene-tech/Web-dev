"use client";

import { AnimatePresence, motion, LayoutGroup, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// Variants for the "emerge from within" effect
const variants: Variants = {
    initial: {
        scale: 0.92,
        opacity: 0,
        filter: "blur(8px)",
        y: 20, // Slight upward movement for the emerging feel
        zIndex: 2, // New page starts on top
    },
    enter: {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        zIndex: 2,
        transition: {
            duration: 0.8,
            ease: [0.2, 1, 0.2, 1], // Cubic-bezier for buttery smooth feel
        },
    },
    exit: {
        scale: 0.95,
        opacity: 0,
        filter: "blur(6px)",
        zIndex: 1, // Old page stays behind
        transition: {
            duration: 0.6,
            ease: [0.6, 0.05, -0.01, 0.9], // Slightly faster exit
        },
    },
};

export function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <LayoutGroup>
            {/* 
        The grid container ensures that the exiting and entering pages 
        overlap perfectly in the same coordinate space.
      */}
            <div className="relative w-full min-h-screen grid grid-cols-1 grid-rows-1">
                <AnimatePresence
                    mode="popLayout" // "popLayout" allows the exiting component to 'pop' out of the flow proper while entering takes its place in the grid
                    initial={false}
                >
                    <motion.div
                        key={pathname}
                        variants={variants}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className="w-full h-full min-h-screen [grid-area:1/1] row-start-1 col-start-1 will-change-[transform,opacity,filter]"
                        style={{
                            transformOrigin: "center top", // Expand from top-center usually looks good or center for pure emerge
                        }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </div>
        </LayoutGroup>
    );
}
