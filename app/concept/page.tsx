'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/lib/contexts/SoundContext';
import { PAGES_CONTENT } from '@/lib/content';
import BiofieldDiagram from '@/components/features/concept/BiofieldDiagram';
import CoherenceDiagram from '@/components/features/concept/CoherenceDiagram';
import NervousSystemDiagram from '@/components/features/concept/NervousSystemDiagram';

export default function ConceptPage() {
  const { setZone } = useSound();

  useEffect(() => {
      setZone('transformation');
  }, [setZone]);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-200 overflow-x-hidden pt-16">
        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
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
        <section className="max-w-6xl mx-auto px-6 py-20 space-y-32">
            
            {/* Section 1: Biofield */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col md:flex-row items-center gap-12"
            >
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-teal-300 mb-4">Sound as Consciousness</h2>
                    <div className="w-20 h-1 bg-teal-500/30 mb-6" />
                    <p className="text-lg leading-loose text-slate-300">
                        Sound is not just a physical wave; it is a carrier of information. When we speak or sing with intent, we are imprinting our consciousness onto the air molecules, sending a physical and energetic signal into the world. This interacts directly with the Human Biofield.
                    </p>
                </div>
                
                <div className="flex-1 flex justify-center w-full aspect-square max-w-[400px]">
                    <div className="w-full h-full p-8 bg-slate-900/50 rounded-full border border-teal-500/10 shadow-[0_0_50px_rgba(45,212,191,0.1)]">
                        <BiofieldDiagram />
                    </div>
                </div>
            </motion.div>

            {/* Section 2: Coherence */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col md:flex-row items-center gap-12"
            >
                <div className="flex-1 md:order-2">
                    <h2 className="text-3xl font-bold text-amber-300 mb-4">From Anxiety to Coherence</h2>
                    <div className="w-20 h-1 bg-amber-500/30 mb-6" />
                    <p className="text-lg leading-loose text-slate-300">
                        Anxiety is a state of 'Incoherence'—jagged, irregular rhythms in the heart and brain. Sound healing works through 'Entrainment'. Strong, rhythmic, coherent vibrations pull the chaotic internal rhythms into sync, shifting the system into Coherence.
                    </p>
                    <p className="mt-4 text-sm text-slate-400 italic">
                        Visualized here: The shift from noise to sine wave.
                    </p>
                </div>
                
                <div className="flex-1 w-full h-[300px] bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
                    <CoherenceDiagram />
                </div>
            </motion.div>

            {/* Section 3: Nervous System Regulation */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col md:flex-row items-center gap-12"
            >
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-rose-300 mb-4">Nervous System Regulation</h2>
                    <div className="w-20 h-1 bg-rose-500/30 mb-6" />
                    <p className="text-lg leading-loose text-slate-300 mb-4">
                        Sound healing directly influences the autonomic nervous system through <span className="text-rose-300 font-medium">Polyvagal Theory</span> mechanisms. 
                        The vagus nerve—the body's "rest and digest" superhighway—responds to specific frequencies and rhythmic vibrations.
                    </p>
                    
                    <div className="space-y-4 mt-6">
                        <div className="bg-slate-900/50 border border-rose-500/20 rounded-lg p-4">
                            <h4 className="text-rose-300 font-semibold mb-2">Parasympathetic Activation</h4>
                            <p className="text-sm text-slate-400">
                                Coherent sound stimulates the vagus nerve, shifting the nervous system from sympathetic (fight-or-flight) 
                                to parasympathetic (rest-and-digest) dominance. Heart rate variability increases, breathing deepens.
                            </p>
                        </div>
                        
                        <div className="bg-slate-900/50 border border-rose-500/20 rounded-lg p-4">
                            <h4 className="text-rose-300 font-semibold mb-2">Decreased Amygdala Activation</h4>
                            <p className="text-sm text-slate-400">
                                Studies show that rhythmic, predictable sounds reduce activity in the amygdala—the brain's fear center. 
                                This lowers anxiety, stress hormones (cortisol), and hypervigilance.
                            </p>
                        </div>
                        
                        <div className="bg-slate-900/50 border border-rose-500/20 rounded-lg p-4">
                            <h4 className="text-rose-300 font-semibold mb-2">Default Mode Network Quieting</h4>
                            <p className="text-sm text-slate-400">
                                Sound meditation down-regulates the Default Mode Network (DMN)—the brain region associated with 
                                rumination, self-referential thinking, and "monkey mind." This produces states similar to deep meditation.
                            </p>
                        </div>
                        
                        <div className="bg-slate-900/50 border border-rose-500/20 rounded-lg p-4">
                            <h4 className="text-rose-300 font-semibold mb-2">Ventral Vagal State</h4>
                            <p className="text-sm text-slate-400">
                                Per Polyvagal Theory, the goal is to access the "ventral vagal" state—a place of safety, 
                                social connection, and calm alertness. Sound frequencies help the nervous system find this optimal window.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 w-full h-[500px] bg-slate-900/80 border border-rose-500/10 rounded-xl overflow-hidden">
                    <NervousSystemDiagram />
                </div>
            </motion.div>

        </section>
    </div>
  );
}
