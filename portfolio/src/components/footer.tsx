"use client";

import { Twitter, Github } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <footer className={`py-8 px-6 bg-black border-t border-zinc-900 text-center relative z-10 ${className}`}>
            <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto text-zinc-500 text-sm">
                <p>© 2025 Burak. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                        {mounted && <Twitter size={20} />}
                    </a>
                    <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
                        {mounted && <Github size={20} />}
                    </a>
                </div>
            </div>
        </footer>
    );
}
