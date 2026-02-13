"use client";

import React from "react";
import { motion } from "framer-motion";

const ProjectHeader = ({ isLightTheme }) => {
    return (
        <div className={`
      relative w-full py-10 px-6 md:px-16 flex flex-col items-start justify-center overflow-hidden transition-colors duration-500 md:hidden 
      ${isLightTheme ? "bg-[#f7f7f5]" : "bg-[#000000]"}
    `}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className={`
          text-4xl sm:text-5xl md:text-7xl font-orbitron uppercase tracking-[0.2em] leading-tight
          ${isLightTheme ? "text-black" : "text-white"}
        `}>
                    Projects
                </h2>
                <div className={`
          w-24 h-1 mt-4 rounded-full
          ${isLightTheme ? "bg-black/80" : "bg-white/80"}
        `} />
                <p className={`
          text-sm sm:text-base mt-6 font-orbitron tracking-widest uppercase opacity-60
          ${isLightTheme ? "text-black" : "text-white"}
        `}>
                    Scroll vertically to explore
                </p>
            </motion.div>
        </div>
    );
};

export default ProjectHeader;
