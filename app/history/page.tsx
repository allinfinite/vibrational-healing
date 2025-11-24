'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useSound } from '@/lib/contexts/SoundContext';
import { LINEAGE_CONTENT, PAGES_CONTENT } from '@/lib/content';

export default function HistoryPage() {
  const { playVoice, setZone } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
  });

  useEffect(() => {
      setZone('transformation');
      playVoice('/generated/audio/page-history.mp3', PAGES_CONTENT.history.audioText);
  }, [playVoice, setZone]);

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-slate-950 text-slate-200 pb-40 pt-16">
        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 to-slate-950 z-10" />
               <img 
                  src="/generated/images/hero-history.png" 
                  alt="Lineage History" 
                  className="w-full h-full object-cover opacity-50"
                  onError={(e) => e.currentTarget.style.display = 'none'}
               />
            </div>
            <div className="relative z-20 text-center p-8">
                <motion.h1 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-6xl font-bold text-amber-100 mb-4 tracking-widest uppercase font-serif"
                >
                    The Lineages
                </motion.h1>
                <p className="text-amber-200/60 max-w-xl mx-auto text-lg">
                    A chronology of vibration. From ancient roots to modern resonance.
                </p>
            </div>
        </section>

        {/* Connecting Line (The Central Axis) */}
        <div className="absolute left-8 md:left-1/2 top-[60vh] bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-teal-500/50 to-transparent" />

        {/* Timeline Items */}
        <div className="max-w-6xl mx-auto px-6 py-20 relative space-y-32">
            {LINEAGE_CONTENT.map((item, i) => (
                <TimelineItem key={item.id} item={item} index={i} />
            ))}
        </div>
    </div>
  );
}

function TimelineItem({ item, index }: { item: typeof LINEAGE_CONTENT[0], index: number }) {
    const isEven = index % 2 === 0;
    const { playVoice } = useSound();

    return (
        <motion.div 
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Content Side */}
            <div className="flex-1 w-full p-6 sm:p-8 bg-slate-900/80 border border-white/10 rounded-2xl hover:border-amber-500/30 transition-colors shadow-2xl relative group cursor-pointer"
                 onClick={() => item.audioFile && playVoice(`/generated/audio/${item.audioFile}`, item.text)}
            >
                {/* Lineage Icon */}
                <div className="flex items-start gap-4 sm:gap-6">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-amber-500/30 flex-shrink-0 shadow-lg shadow-amber-500/10">
                        <Image
                            src={`/generated/images/methods/lineage-${item.id}.png`}
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="absolute top-4 right-4 opacity-10 text-4xl sm:text-6xl font-bold text-amber-500">
                            0{index + 1}
                        </div>
                        <h3 className="text-xl sm:text-3xl font-serif text-amber-100 mb-2 sm:mb-4 group-hover:text-amber-400 transition-colors pr-12">
                            {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-4 sm:mb-6">
                            {item.fullDescription || item.text}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                            <span className="text-teal-500/60 font-mono tracking-widest uppercase">
                                Method: {item.relatedMethod.replace('-', ' ')}
                            </span>
                            {item.audioFile && (
                                <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                    🔊 Click to listen
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer/Axis */}
            <div className="w-px md:w-24 h-12 md:h-px bg-amber-500/30 relative flex-shrink-0">
                <div className="absolute left-1/2 md:left-auto md:inset-x-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_#fbbf24]" />
            </div>

            {/* Empty Side (Desktop) */}
            <div className="flex-1 hidden md:block" />
        </motion.div>
    );
}
