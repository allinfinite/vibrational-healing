'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/lib/contexts/SoundContext';
import { PAGES_CONTENT } from '@/lib/content';
import Image from 'next/image';

export default function ConceptPage() {
  const { playVoice, setZone, resumeContext } = useSound();

  useEffect(() => {
      setZone('transformation');
      // Auto-play guide
      playVoice('/generated/audio/page-concept.mp3', PAGES_CONTENT.concept.audioText);
  }, [playVoice, setZone]);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-200 overflow-x-hidden">
        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               {/* Fallback to gradient if image missing, or use Next Image if present */}
               <div className="absolute inset-0 bg-gradient-to-b from-teal-900 to-slate-950 opacity-80 z-10" />
               <img 
                  src="/generated/images/hero-concept.png" 
                  alt="Biofield Visualization" 
                  className="w-full h-full object-cover opacity-60"
                  onError={(e) => e.currentTarget.style.display = 'none'}
               />
            </div>

            <div className="relative z-20 text-center p-8 max-w-4xl">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-100 mb-6"
                >
                    {PAGES_CONTENT.concept.title}
                </motion.h1>
                <p className="text-lg md:text-xl text-teal-100/80 leading-relaxed">
                    Understanding the physics of consciousness and vibrational healing.
                </p>
            </div>
        </section>

        {/* Content Blocks */}
        <section className="max-w-4xl mx-auto px-6 py-20 space-y-32">
            {PAGES_CONTENT.concept.sections.map((section, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col md:flex-row items-center gap-12"
                >
                    <div className={`flex-1 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                        <h2 className="text-3xl font-bold text-teal-300 mb-4">{section.title}</h2>
                        <div className="w-20 h-1 bg-teal-500/30 mb-6" />
                        <p className="text-lg leading-loose text-slate-300">
                            {section.text}
                        </p>
                    </div>
                    
                    {/* Visual Decoration */}
                    <div className="flex-1 flex justify-center">
                        <div className="w-64 h-64 rounded-full border border-teal-500/20 flex items-center justify-center relative">
                            <div className="absolute inset-0 rounded-full border border-teal-500/10 animate-[spin_10s_linear_infinite]" />
                            <div className="w-48 h-48 rounded-full bg-teal-500/5 backdrop-blur-sm" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </section>
    </div>
  );
}

