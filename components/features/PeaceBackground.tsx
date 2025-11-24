'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PeaceBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Sun Gradient Base */}
      <div className="absolute top-[-20%] right-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/20 via-sky-300/5 to-transparent blur-3xl" />

      {/* Rotating Rays */}
      <motion.div 
        className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
         {[...Array(12)].map((_, i) => (
             <div 
                key={i}
                className="absolute top-1/2 left-1/2 w-full h-1 bg-gradient-to-r from-amber-100 to-transparent origin-left"
                style={{ transform: `rotate(${i * 30}deg)` }}
             />
         ))}
      </motion.div>

      {/* Floating Particles / "Pollen" */}
      {[...Array(20)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute w-1 h-1 bg-amber-100 rounded-full blur-[1px]"
            initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%", 
                opacity: 0 
            }}
            animate={{ 
                y: [null, Math.random() * -100],
                opacity: [0, 0.8, 0] 
            }}
            transition={{ 
                duration: Math.random() * 5 + 5, 
                repeat: Infinity, 
                delay: Math.random() * 5 
            }}
          />
      ))}

      {/* Organic Ripples (CSS) */}
      <div className="absolute bottom-[-20%] right-[-20%] w-full h-full opacity-20">
           {[1, 2, 3].map(i => (
               <div 
                 key={`r-${i}`}
                 className="absolute bottom-0 right-0 rounded-full border border-emerald-300/40"
                 style={{
                     width: '100%',
                     height: '100%',
                     animation: `ripple 8s infinite linear ${i * 2}s`
                 }}
               />
           ))}
      </div>
      
      <style jsx>{`
        @keyframes ripple {
            0% { transform: scale(0.1); opacity: 1; border-width: 2px; }
            100% { transform: scale(1.5); opacity: 0; border-width: 0px; }
        }
      `}</style>
    </div>
  );
}

