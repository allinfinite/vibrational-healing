'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSound } from '@/lib/contexts/SoundContext';
import { PAGES_CONTENT } from '@/lib/content';

const METHODS_LIST = [
  { id: 'tuning-fork', label: 'Tuning Forks', desc: 'Precision frequency tools for biofield clearing.' },
  { id: 'voice-chanting', label: 'Voice & Chanting', desc: 'Using the body as a resonant chamber.' },
  { id: 'singing-bowl', label: 'Singing Bowls', desc: 'Harmonic overtones for deep relaxation.' },
  { id: 'didgeridoo', label: 'Didgeridoos', desc: 'Earth frequencies for grounding.' },
  { id: 'world-prayer', label: 'World Prayers', desc: 'Intention-based collective resonance.' },
  { id: 'creative-methods', label: 'Creative Expression', desc: 'Art and movement as vibrational therapy.' },
];

export default function MethodsIndex() {
  const { playVoice, setZone } = useSound();

  useEffect(() => {
      setZone('transformation');
      playVoice('/generated/audio/page-methods.mp3', PAGES_CONTENT.methods.audioText);
  }, [playVoice, setZone]);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-200">
        {/* Hero */}
        <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-gradient-to-b from-teal-900/40 to-slate-950 z-10" />
               <img 
                  src="/generated/images/hero-methods.png" 
                  alt="Healing Methods" 
                  className="w-full h-full object-cover opacity-50"
                  onError={(e) => e.currentTarget.style.display = 'none'}
               />
            </div>
            <div className="relative z-20 text-center">
                <h1 className="text-5xl font-bold text-teal-100 tracking-widest uppercase">
                    The Tools
                </h1>
            </div>
        </section>

        {/* Methods Grid */}
        <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {METHODS_LIST.map((m, i) => (
                    <Link href={`/methods/${m.id}`} key={m.id}>
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="h-64 bg-slate-900 border border-teal-900/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:bg-slate-800 transition-all cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="w-16 h-16 mb-6 rounded-full bg-teal-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                {/* Icon placeholder - in real app would use the SVGs */}
                                <div className="w-8 h-8 bg-teal-500/50 rounded-full" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-teal-100 mb-2">{m.label}</h3>
                            <p className="text-sm text-slate-400">{m.desc}</p>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    </div>
  );
}

