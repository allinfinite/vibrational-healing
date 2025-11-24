'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function NervousSystemDiagram() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-rose-500/10 via-transparent to-transparent" />
      
      {/* Central nervous system representation */}
      <svg viewBox="0 0 300 400" className="w-full h-full max-w-[280px]">
        <defs>
          {/* Gradient for calm state */}
          <linearGradient id="calmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          
          {/* Gradient for stress state */}
          <linearGradient id="stressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Brain silhouette */}
        <motion.ellipse
          cx="150"
          cy="60"
          rx="50"
          ry="40"
          fill="none"
          stroke="url(#calmGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Amygdala - smaller when calm */}
        <motion.circle
          cx="135"
          cy="70"
          fill="#f87171"
          animate={{
            r: [8, 5, 8],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.circle
          cx="165"
          cy="70"
          fill="#f87171"
          animate={{
            r: [8, 5, 8],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
        <text x="150" y="95" textAnchor="middle" fill="#f8717180" fontSize="8" fontFamily="system-ui">
          Amygdala
        </text>

        {/* Spine / Vagus nerve path */}
        <motion.path
          d="M150,100 C150,150 145,200 150,250 S155,300 150,350"
          fill="none"
          stroke="url(#calmGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          animate={{
            strokeDashoffset: [0, -20, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          strokeDasharray="10 5"
        />

        {/* Vagus nerve label */}
        <text x="180" y="180" fill="#22d3ee" fontSize="10" fontFamily="system-ui">
          Vagus Nerve
        </text>
        <motion.line
          x1="170"
          y1="175"
          x2="155"
          y2="175"
          stroke="#22d3ee"
          strokeWidth="1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Heart */}
        <motion.path
          d="M150,260 C140,250 125,260 125,275 C125,290 150,310 150,310 C150,310 175,290 175,275 C175,260 160,250 150,260"
          fill="none"
          stroke="url(#calmGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        
        {/* Coherent waves emanating from heart */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx="150"
            cy="280"
            fill="none"
            stroke="#4ade80"
            strokeWidth="1"
            initial={{ r: 20, opacity: 0.8 }}
            animate={{
              r: [20, 60],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
            }}
          />
        ))}

        {/* Gut / Enteric nervous system */}
        <motion.ellipse
          cx="150"
          cy="350"
          rx="30"
          ry="15"
          fill="none"
          stroke="url(#calmGradient)"
          strokeWidth="2"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <text x="150" y="380" textAnchor="middle" fill="#4ade8080" fontSize="8" fontFamily="system-ui">
          Gut-Brain Axis
        </text>

        {/* State labels */}
        <motion.g
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <rect x="10" y="140" width="80" height="50" rx="8" fill="#f8717120" stroke="#f8717140" />
          <text x="50" y="158" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">
            Sympathetic
          </text>
          <text x="50" y="172" textAnchor="middle" fill="#f8717180" fontSize="7">
            Fight or Flight
          </text>
          <text x="50" y="184" textAnchor="middle" fill="#f8717160" fontSize="6">
            ↓ Decreased
          </text>
        </motion.g>

        <motion.g
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <rect x="210" y="140" width="80" height="50" rx="8" fill="#4ade8020" stroke="#4ade8040" />
          <text x="250" y="158" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">
            Parasympathetic
          </text>
          <text x="250" y="172" textAnchor="middle" fill="#4ade8080" fontSize="7">
            Rest & Digest
          </text>
          <text x="250" y="184" textAnchor="middle" fill="#4ade8060" fontSize="6">
            ↑ Activated
          </text>
        </motion.g>

        {/* Polyvagal states */}
        <motion.g>
          <rect x="10" y="250" width="60" height="35" rx="6" fill="#22d3ee10" stroke="#22d3ee30" />
          <text x="40" y="265" textAnchor="middle" fill="#22d3ee" fontSize="7" fontWeight="bold">
            Ventral Vagal
          </text>
          <text x="40" y="277" textAnchor="middle" fill="#22d3ee80" fontSize="6">
            Social Safety
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

