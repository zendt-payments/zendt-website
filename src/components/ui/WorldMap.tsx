"use client";

import { motion } from "framer-motion";

interface WorldMapProps {
  dots?: {
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }[];
  lineColor?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#7c3aed", // brand-600 typically
}: WorldMapProps) {
  // Projection logic for world.svg (Simplemaps projection)
  const project = (lat: number, lng: number) => {
    // Precise projection mapping for simplemaps 2000x857 coordinate space
    // x: (lng + 180) * (width / 360)
    // y: (90 - lat) * (height / 180) + offset
    const x = (lng + 180) * (2000 / 360);
    // The simplemaps world.svg is slightly shifted and uses a specific scale
    const y = (90 - lat) * (857 / 180) + 45; 
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50; 
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="relative w-full aspect-[2000/857] bg-transparent overflow-visible">
      <svg
        viewBox="0 0 2000 857"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Proper High-Fidelity World Map Background from world.svg */}
        <image 
          href="/world.svg" 
          width="2000" 
          height="857" 
          className="opacity-[0.08] grayscale brightness-0"
        />

        {/* Global Dotted Overlay for Premium Look */}
        <pattern
          id="dots"
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.2" fill="currentColor" className="text-slate-300" />
        </pattern>
        
        <mask id="world-mask">
          <image href="/world.svg" width="2000" height="857" style={{ filter: 'brightness(0) invert(1)' }} />
        </mask>
        
        <rect width="2000" height="854" fill="url(#dots)" mask="url(#world-mask)" className="opacity-60" />

        {/* Connection Flows */}
        {dots.map((dot, i) => {
          const start = project(dot.start.lat, dot.start.lng);
          const end = project(dot.end.lat, dot.end.lng);
          const path = createCurvedPath(start, end);

          return (
            <g key={`flow-${i}`}>
              <defs>
                <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
                  <stop offset="50%" stopColor={lineColor} stopOpacity="0.7" />
                  <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d={path}
                stroke={lineColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
              />
              <motion.path
                d={path}
                stroke={`url(#grad-${i})`}
                strokeWidth="4.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.4,
                }}
              />
            </g>
          );
        })}

        {/* Hub Nodes */}
        {dots.map((dot, i) => {
          const start = project(dot.start.lat, dot.start.lng);
          const end = project(dot.end.lat, dot.end.lng);

          return (
            <g key={`nodes-${i}`}>
              {/* Hub Pulsing Effect */}
              <circle cx={start.x} cy={start.y} r="12" fill={lineColor} className="opacity-30" />
              <motion.circle
                cx={start.x}
                cy={start.y}
                r="12"
                stroke={lineColor}
                strokeWidth="4"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              
              {/* Secondary Node Pulsing */}
              <circle cx={end.x} cy={end.y} r="8" fill={lineColor} className="opacity-30" />
              <motion.circle
                cx={end.x}
                cy={end.y}
                r="8"
                stroke={lineColor}
                strokeWidth="3"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
