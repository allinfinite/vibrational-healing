'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PeaceBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Warm ambient glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(251,191,36,0.08) 0%, transparent 60%)'
        }}
      />

      {/* Water Ripples - Peaceful expanding circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute rounded-full border border-amber-300/20"
            style={{
              width: '100px',
              height: '100px',
            }}
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ 
              scale: [0.5, 3, 5],
              opacity: [0.5, 0.2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Secondary ripples with emerald tint */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ripple2-${i}`}
            className="absolute rounded-full border border-emerald-400/15"
            style={{
              width: '80px',
              height: '80px',
            }}
            initial={{ scale: 0.3, opacity: 0.4 }}
            animate={{ 
              scale: [0.3, 2.5, 4],
              opacity: [0.4, 0.15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2.5 + 0.5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Floating light particles - like dust motes in sunlight */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: i % 3 === 0 
              ? 'rgba(251, 191, 36, 0.6)' 
              : i % 3 === 1 
                ? 'rgba(252, 211, 77, 0.5)' 
                : 'rgba(16, 185, 129, 0.4)',
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Soft breathing glow in center */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Subtle vertical light streaks - like light through water */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`streak-${i}`}
            className="absolute h-full w-px"
            style={{
              left: 20 + i * 20 + '%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(251,191,36,0.3) 30%, rgba(251,191,36,0.3) 70%, transparent 100%)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scaleY: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}
