'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface ScrollTextProps {
  progress: MotionValue<number>;
}

export default function ScrollTextOverlay({ progress }: ScrollTextProps) {
  const opacity1 = useTransform(progress, [0.1, 0.2, 0.3], [0, 1, 0]);
  const opacity2 = useTransform(progress, [0.4, 0.5, 0.6], [0, 1, 0]);
  const opacity3 = useTransform(progress, [0.7, 0.8, 0.9], [0, 1, 0]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center">
        <motion.div style={{ opacity: opacity1 }} className="absolute text-center">
            <h2 className="text-4xl font-bold text-white mb-4">It Starts Within</h2>
            <p className="text-xl text-slate-300">Coherence begins with a single pulse.</p>
        </motion.div>

        <motion.div style={{ opacity: opacity2 }} className="absolute text-center">
            <h2 className="text-4xl font-bold text-teal-300 mb-4">The Frequency Expands</h2>
            <p className="text-xl text-slate-300">Intent radiates outward, reorganizing the field.</p>
        </motion.div>

        <motion.div style={{ opacity: opacity3 }} className="absolute text-center">
            <h2 className="text-4xl font-bold text-amber-300 mb-4">We Are The Network</h2>
            <p className="text-xl text-slate-300">Individual peace becomes collective harmony.</p>
        </motion.div>
    </div>
  );
}

