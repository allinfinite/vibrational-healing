'use client';

import React from 'react';
import { motion } from 'framer-motion';

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
            filter: ["drop-shadow(0 0 15px rgba(45,212,191,0.5))", "drop-shadow(0 0 25px rgba(45,212,191,0.8))", "drop-shadow(0 0 15px rgba(45,212,191,0.5))"]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
         <div 
            className="w-32 h-32 text-teal-200"
            dangerouslySetInnerHTML={{ __html: icons['meditating-figure'] || '' }}
         />
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
            className="absolute w-20 h-20 rounded-full bg-slate-900/80 border border-teal-500/50 flex flex-col items-center justify-center backdrop-blur-md hover:bg-teal-900/90 hover:scale-110 hover:border-teal-400 transition-all z-30 group shadow-lg cursor-pointer"
            style={{
               left: `calc(50% + ${x}px - 40px)`,
               top: `calc(50% + ${y}px - 40px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(45,212,191,0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMethodSelect(method.id)}
            aria-label={`Select ${method.label}`}
          >
            <div 
                className="w-8 h-8 mb-1 text-teal-100 group-hover:text-white transition-colors"
                dangerouslySetInnerHTML={{ __html: icons[method.id] || '' }} 
            />
            <span className="text-[8px] font-medium text-teal-200 uppercase tracking-wider text-center leading-tight px-1 group-hover:text-teal-100">
                {method.label}
            </span>
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
