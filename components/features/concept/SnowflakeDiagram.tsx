'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SnowflakeDiagram() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full p-1">
        {/* Central Hexagon */}
        <motion.path
          d="M50 35 L63 42.5 L63 57.5 L50 65 L37 57.5 L37 42.5 Z"
          fill="none"
          stroke="#67e8f9"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Inner Star */}
        <motion.path
          d="M50 20 L50 80 M24 35 L76 65 M24 65 L76 35"
          stroke="#22d3ee"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Outer Crystals - 6 points */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.g key={i} transform={`rotate(${angle} 50 50)`}>
            {/* Main branch */}
            <motion.line 
              x1="50" y1="20" x2="50" y2="5" 
              stroke="#a5f3fc" 
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ y2: 20 }}
              animate={{ y2: 5 }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Side branches */}
            <motion.path
              d="M50 15 L45 10 M50 15 L55 10 M50 10 L42 6 M50 10 L58 6"
              stroke="#cffafe"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 + i * 0.1, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Tip diamond */}
            <motion.rect
              x="48.5" y="2" width="3" height="3"
              transform="rotate(45 50 3.5)"
              fill="#ecfeff"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 1 + i * 0.1, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.g>
        ))}

        {/* Sparkling Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={`sparkle-${i}`}
            cx="50" cy="50" r="1"
            fill="white"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: Math.cos(i * 60 * Math.PI / 180) * 35,
              y: Math.sin(i * 60 * Math.PI / 180) * 35,
            }}
            transition={{ 
              duration: 2, 
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
}

