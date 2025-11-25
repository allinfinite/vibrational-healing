'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { useRippleScroll } from '@/components/features/ripple/useRippleScroll';
import VoidSection from '@/components/features/ripple/VoidSection';
import ExpansionCanvas from '@/components/features/ripple/ExpansionCanvas';
import NetworkCanvas from '@/components/features/ripple/NetworkCanvas';
import RippleAudioController from '@/components/features/ripple/RippleAudioController';
import ScrollTextOverlay from '@/components/features/ripple/ScrollTextOverlay';

export default function RipplePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, voidOpacity, voidScale, waveIntensity, networkDensity } = useRippleScroll(containerRef);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.1) {
      setShowScrollIndicator(false);
    } else {
      setShowScrollIndicator(true);
    }
  });

  return (
    <div ref={containerRef} className="relative bg-slate-950 h-[400vh]">
        {/* Back to Home Button */}
        <Link 
          href="/"
          className="fixed top-4 left-4 z-50 group"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 hover:border-teal-500/50 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-white/70 group-hover:text-teal-400 transition-colors" />
            <span className="text-sm text-white/70 group-hover:text-teal-400 transition-colors">Home</span>
          </motion.div>
        </Link>

        {/* Scroll Indicator */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-xs text-white/60 uppercase tracking-wider">Scroll to Explore</span>
                <ChevronDown className="w-5 h-5 text-white/40" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fixed Content Layer */}
        <div className="fixed inset-0 overflow-hidden">
            <VoidSection opacity={voidOpacity} scale={voidScale} />
            <ExpansionCanvas intensity={waveIntensity} />
            <NetworkCanvas density={networkDensity} />
            <ScrollTextOverlay progress={scrollYProgress} />
        </div>

        {/* Audio Logic */}
        <RippleAudioController progress={scrollYProgress} />

        {/* Scroll Spacers (Implicit via h-[400vh]) */}
    </div>
  );
}
