'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function NervousSystemDiagram() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full p-1">
        {/* Brain */}
        <path
          d="M35 20 C35 10 65 10 65 20 C65 25 60 28 55 28 L45 28 C40 28 35 25 35 20"
          fill="#fb7185" 
          opacity="0.7"
        />
        
        {/* Spinal Cord / Vagus Nerve */}
        <motion.path
          d="M50 28 C50 28 48 40 52 50 C56 60 48 70 50 85"
          fill="none"
          stroke="#fb7185"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Nerve Branches */}
        {[35, 45, 55, 65, 75].map((y, i) => (
          <motion.g key={i} initial={{ opacity: 0.3 }} animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}>
            {/* Left branches */}
            <path d={`M${50 + (i%2 ? 1 : -1)} ${y} Q${30} ${y+5} ${20} ${y}`} fill="none" stroke="#f43f5e" strokeWidth="0.5" />
            {/* Right branches */}
            <path d={`M${50 + (i%2 ? 1 : -1)} ${y} Q${70} ${y+5} ${80} ${y}`} fill="none" stroke="#f43f5e" strokeWidth="0.5" />
          </motion.g>
        ))}

        {/* Connection Nodes (Organs) */}
        {[
          { y: 40, color: '#fb7185', delay: 0 }, // Heart area
          { y: 60, color: '#e11d48', delay: 0.5 }, // Gut area
          { y: 80, color: '#be123c', delay: 1 }, // Root area
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx="50" cy={node.y} r="2"
            fill={node.color}
            animate={{ 
              r: [2, 3, 2],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              delay: node.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Flowing Signals */}
        <motion.circle
          cx="50" cy="28" r="1"
          fill="#fff"
          animate={{ cy: [28, 85] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="50" cy="85" r="1"
          fill="#fff"
          animate={{ cy: [85, 28] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
        />
      </svg>
    </div>
  );
}

