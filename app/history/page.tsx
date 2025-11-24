'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/lib/contexts/SoundContext';
import { LINEAGE_CONTENT, PAGES_CONTENT } from '@/lib/content';

export default function HistoryPage() {
  const { playVoice, setZone } = useSound();

  useEffect(() => {
      setZone('transformation');
      playVoice('/generated/audio/page-history.mp3', PAGES_CONTENT.history.audioText);
  }, [playVoice, setZone]);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
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
                <h1 className="text-5xl font-bold text-amber-100 mb-4 tracking-widest uppercase border-b-2 border-amber-500/30 pb-4 inline-block">
                    The Lineages
                </h1>
                <p className="text-amber-200/60 max-w-2xl mx-auto">
                    Tracing the path of acoustic healing from ancient wisdom to modern science.
                </p>
            </div>
        </section>

        {/* Timeline / Grid */}
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {LINEAGE_CONTENT.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-slate-900/50 border border-white/5 p-8 rounded-xl hover:bg-slate-800/50 transition-colors group cursor-pointer"
                        onClick={() => playVoice(`/generated/audio/${item.id}.mp3`, item.text)} // Play individual lineage audio
                    >
                        <div className="text-xs font-bold text-amber-500/50 uppercase tracking-widest mb-4">
                            Lineage 0{i + 1}
                        </div>
                        <h3 className="text-2xl font-serif text-amber-100 mb-4 group-hover:text-amber-400 transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {item.fullDescription || item.text}
                        </p>
                        <div className="flex items-center text-xs text-teal-500/60">
                            <span>Key Method: </span>
                            <span className="ml-2 text-teal-400 uppercase">{item.relatedMethod.replace('-', ' ')}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    </div>
  );
}

