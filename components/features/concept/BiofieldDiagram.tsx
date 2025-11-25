'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BiofieldDiagram() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full p-1">
        {/* Human Figure */}
        <path
          d="M50 35 C50 35 45 40 45 55 L45 85 L55 85 L55 55 C55 40 50 35 50 35 Z"
          fill="#0f172a"
          stroke="#2dd4bf"
          strokeWidth="0.5"
          opacity="0.8"
        />
        <circle cx="50" cy="28" r="6" fill="#0f172a" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.8" />

        {/* Toroidal Field Rings */}
        {[...Array(6)].map((_, i) => (
          <motion.ellipse
            key={i}
            cx="50" cy="50"
            rx={20 + i * 6} ry={35 + i * 4}
            fill="none"
            stroke="#2dd4bf"
            strokeWidth={0.5}
            initial={{ opacity: 0.3 }}
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              strokeWidth: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Energy Flow Lines */}
        {[0, 180].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 50 50)`}>
            <motion.path
              d="M50 10 Q70 30 50 50 Q30 70 50 90"
              fill="none"
              stroke="#5eead4"
              strokeWidth="0.5"
              strokeDasharray="2 2"
              animate={{ strokeDashoffset: [0, -40] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              opacity="0.6"
            />
          </g>
        ))}

        {/* Chakras */}
        {[
          { y: 28, c: '#a855f7' }, // Crown
          { y: 35, c: '#6366f1' }, // Third Eye
          { y: 40, c: '#3b82f6' }, // Throat
          { y: 48, c: '#22c55e' }, // Heart
          { y: 56, c: '#eab308' }, // Solar
          { y: 64, c: '#f97316' }, // Sacral
          { y: 72, c: '#ef4444' }, // Root
        ].map((chakra, i) => (
          <motion.circle
            key={i}
            cx="50" cy={chakra.y} r="1.5"
            fill={chakra.c}
            animate={{ 
              r: [1.5, 2.5, 1.5],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
}
