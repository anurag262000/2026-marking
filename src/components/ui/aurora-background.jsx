"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `
            [--white-gradient:conic-gradient(from_0deg_at_50%_50%,#ffffff_0deg,#ffffff_72deg,#ffffff_144deg,#ffffff_216deg,#ffffff_288deg,#ffffff_360deg)]
            [--dark-gradient:conic-gradient(from_0deg_at_50%_50%,#000000_0deg,#000000_72deg,#000000_144deg,#000000_216deg,#000000_288deg,#000000_360deg)]
            [--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#3b82f6_15%,#6366f1_20%,#0ea5e9_25%,#3b82f6_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
