'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface MethodWheelProps {
  onMethodSelect: (method: string) => void;
  icons: Record<string, string>;
}

const METHODS = [
  { id: 'tuning-fork', label: 'Tuning Forks', angle: 0 },
  { id: 'voice-chanting', label: 'Voice (Chanting)', angle: 60 },
  { id: 'singing-bowl', label: 'Singing Bells', angle: 120 },
  { id: 'didgeridoo', label: 'Didgeridoos', angle: 180 },
  { id: 'world-prayer', label: 'World Prayers', angle: 240 },
  { id: 'creative-methods', label: 'Creative Methods', angle: 300 },
];

export default function MethodWheel({ onMethodSelect, icons }: MethodWheelProps) {
  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      {/* Central Meditating Figure */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        animate={{ 
            y: [0, -10, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
         <div className="relative w-36 h-36 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-[0_0_50px_rgba(45,212,191,0.7)] sm:shadow-[0_0_40px_rgba(45,212,191,0.6)] border-2 border-teal-400/40">
            <Image 
                src="/generated/icons-new/meditating-figure.png"
                alt="Meditation"
                fill
                className="object-cover"
                sizes="144px"
                onError={(e) => {
                    // Fallback to SVG if PNG doesn't exist
                    const img = e.target as HTMLImageElement;
                    if (!img.src.endsWith('.svg')) {
                        img.src = '/generated/icons-new/meditating-figure.svg';
                    }
                }}
            />
         </div>
      </motion.div>

      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-teal-500/30 animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-4 rounded-full border border-teal-500/20 animate-[spin_40s_linear_infinite_reverse]" />

      {/* Interactive Layer for Rotation (Optional advanced: drag to rotate) */}
      
      {/* Methods */}
      {METHODS.map((method, i) => {
        // Calculate position on circle
        const angleRad = (method.angle - 90) * (Math.PI / 180);
        const radius = 160; // Distance from center
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;

        return (
          <motion.button
            key={method.id}
            className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-teal-900/90 via-slate-800/90 to-slate-900/90 border-2 border-teal-400/60 overflow-hidden backdrop-blur-md hover:border-teal-300 transition-all z-30 group shadow-[0_0_25px_rgba(45,212,191,0.5)] cursor-pointer"
            style={{
               left: `calc(50% + ${x}px - 48px)`,
               top: `calc(50% + ${y}px - 48px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.15, boxShadow: "0 0 35px rgba(45,212,191,0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMethodSelect(method.id)}
            aria-label={`Select ${method.label}`}
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                <Image 
                    src={`/generated/icons-new/${method.id}.png`}
                    alt={method.label}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300 brightness-110"
                    sizes="96px"
                    onError={(e) => {
                        // Fallback to SVG if PNG doesn't exist
                        const img = e.target as HTMLImageElement;
                        if (!img.src.endsWith('.svg')) {
                            img.src = `/generated/icons-new/${method.id}.svg`;
                        }
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />
                <span className="absolute bottom-1.5 left-0 right-0 text-[9px] font-bold text-white uppercase tracking-wider text-center leading-tight px-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    {method.label}
                </span>
            </div>
          </motion.button>
        );
      })}
      
      {/* Connecting Lines (Decorative) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        {METHODS.map((method) => {
            const angleRad = (method.angle - 90) * (Math.PI / 180);
            const x = 200 + Math.cos(angleRad) * 160;
            const y = 200 + Math.sin(angleRad) * 160;
            return (
                <line 
                    key={`line-${method.id}`}
                    x1="200" y1="200"
                    x2={x} y2={y}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                />
            );
        })}
        <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="transparent" />
            </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
