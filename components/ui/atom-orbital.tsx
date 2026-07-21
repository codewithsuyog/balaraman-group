"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AtomOrbitalProps {
  className?: string;
  /** Size in pixels — controls the width and height of the atom. */
  size?: number;
}

function Orbit({
  rotateX,
  rotateZ,
  duration,
  delay,
  ringColor,
  electronColor,
  glowColor,
  electronSize = 10,
}: {
  rotateX: number;
  rotateZ: number;
  duration: number;
  delay: number;
  ringColor: string;
  electronColor: string;
  glowColor: string;
  electronSize?: number;
}) {
  return (
    <div
      className="absolute inset-[5%]"
      style={{
        transform: `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Orbit ring */}
      <div
        className="w-full h-full rounded-full"
        style={{ border: `1.5px solid ${ringColor}` }}
      />

      {/* Electron wrapper — rotates the electron around the orbit */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      >
        {/* Electron glow trail (larger, more diffuse) */}
        <div
          className="absolute top-0 left-1/2 rounded-full"
          style={{
            width: electronSize * 3,
            height: electronSize * 3,
            transform: `translate(-50%, -50%)`,
            backgroundColor: glowColor,
            filter: `blur(${electronSize}px)`,
            opacity: 0.4,
          }}
        />
        {/* Electron core */}
        <div
          className="absolute top-0 left-1/2 rounded-full"
          style={{
            width: electronSize,
            height: electronSize,
            transform: `translate(-50%, -50%)`,
            backgroundColor: electronColor,
            boxShadow: `0 0 ${electronSize}px ${glowColor}, 0 0 ${electronSize * 2.5}px ${glowColor}`,
          }}
        />
      </motion.div>
    </div>
  );
}

export function AtomOrbital({ className, size = 400 }: AtomOrbitalProps) {
  const nucleusSize = Math.max(12, size * 0.055);
  const electronSize = Math.max(6, size * 0.025);

  return (
    <div
      className={cn("relative select-none pointer-events-none", className)}
      style={{ width: size, height: size, perspective: "1000px" }}
    >
      {/* Ambient electron cloud glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute rounded-full bg-amber-500/10 dark:bg-amber-500/20 blur-[60px]"
          style={{ width: "45%", height: "45%" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[40px]"
          style={{ width: "60%", height: "60%" }}
          animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.15, 0.3, 0.15] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Nucleus */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {/* Outer nucleus glow */}
        <motion.div
          className="absolute rounded-full bg-amber-500/20 dark:bg-amber-400/30 blur-xl"
          style={{ width: nucleusSize * 4, height: nucleusSize * 4 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Nucleus core */}
        <motion.div
          className="rounded-full"
          style={{
            width: nucleusSize,
            height: nucleusSize,
            background:
              "radial-gradient(circle at 35% 35%, #fcd34d, #f59e0b 40%, #d97706 70%, #92400e)",
            boxShadow:
              "0 0 15px rgba(245,158,11,0.5), 0 0 30px rgba(245,158,11,0.25), 0 0 60px rgba(245,158,11,0.1)",
          }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Orbit 1 — Amber (primary accent) */}
      <Orbit
        rotateX={72}
        rotateZ={0}
        duration={6}
        delay={0}
        ringColor="rgba(245,158,11,0.18)"
        electronColor="rgba(251,191,36,1)"
        glowColor="rgba(245,158,11,0.6)"
        electronSize={electronSize}
      />

      {/* Orbit 2 — Emerald */}
      <Orbit
        rotateX={72}
        rotateZ={65}
        duration={4.5}
        delay={1.5}
        ringColor="rgba(52,211,153,0.14)"
        electronColor="rgba(110,231,183,1)"
        glowColor="rgba(52,211,153,0.5)"
        electronSize={electronSize}
      />

      {/* Orbit 3 — Cyan/Blue */}
      <Orbit
        rotateX={72}
        rotateZ={130}
        duration={7.5}
        delay={0.8}
        ringColor="rgba(96,165,250,0.14)"
        electronColor="rgba(147,197,253,1)"
        glowColor="rgba(96,165,250,0.5)"
        electronSize={electronSize}
      />
    </div>
  );
}
