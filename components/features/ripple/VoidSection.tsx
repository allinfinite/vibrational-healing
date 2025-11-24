'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface VoidSectionProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}

export default function VoidSection({ opacity, scale }: VoidSectionProps) {
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-20"
      style={{ opacity, scale }}
    >
        <div className="relative w-4 h-4">
             {/* Core Light */}
             <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse" />
             
             {/* Pulsing Ring */}
             <div className="absolute inset-[-20px] border border-white/20 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
             
             <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                 <p className="text-xs tracking-[0.3em] uppercase text-slate-400 mb-2">The Internal State</p>
                 <h2 className="text-2xl font-light text-white tracking-widest">ONE DROP</h2>
             </div>
        </div>
    </motion.div>
  );
}

