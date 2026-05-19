"use client";

import React from "react";
import { motion } from "framer-motion";

const ProjectHeader = () => {
    return (
        <div 
            className="relative w-full py-10 px-6 md:px-16 flex flex-col items-start justify-center overflow-hidden transition-colors duration-500 md:hidden"
            style={{ backgroundColor: 'var(--off-white)' }}
        >
            {/* Neo-Brutalist Dot Pattern */}
            <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-20" />
            
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
            >
                <h2 
                    className="text-4xl sm:text-5xl md:text-7xl font-bebas uppercase tracking-tight leading-tight"
                    style={{ color: 'var(--pitch-black)' }}
                >
                    Projects
                </h2>
                <div 
                    className="w-24 h-1 mt-4 rounded-full"
                    style={{ backgroundColor: 'var(--neon-yellow)' }}
                />
            </motion.div>
        </div>
    );
};

export default ProjectHeader;
