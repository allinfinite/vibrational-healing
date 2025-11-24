'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/lib/contexts/SoundContext';
import EpicModal from '@/components/ui/EpicModal';
import AudioVisualizer from '@/components/features/AudioVisualizer';
import MethodWheel from '@/components/features/MethodWheel';
import AnxietyBackground from '@/components/features/AnxietyBackground';
import PeaceBackground from '@/components/features/PeaceBackground';
import { CloudLightning, Sun, Info } from 'lucide-react'; 
import { LINEAGE_CONTENT } from '@/lib/content';

const STATIC_ICONS = [
    'tuning-fork', 'voice-chanting', 'singing-bowl', 
    'didgeridoo', 'world-prayer', 'creative-methods', 
    'meditating-figure'
];

export default function InteractiveMap() {
  const { playVoice, stopVoice, resumeContext, isReady, setZone } = useSound();
  const [icons, setIcons] = useState<Record<string, string>>({});
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  useEffect(() => {
    const loadIcons = async () => {
        const loaded: Record<string, string> = {};
        for (const name of STATIC_ICONS) {
            try {
                const res = await fetch(`/generated/icons/${name}.svg`);
                if (res.ok) loaded[name] = await res.text();
            } catch (e) {
                console.error(`Failed to load icon ${name}`);
            }
        }
        setIcons(loaded);
    };
    loadIcons();
  }, []);

  const handleMethodSelect = (method: string) => {
      setSelectedMethod(method);
      stopVoice();
      // If audio existed: playVoice(`/generated/audio/${method}.mp3`); 
  };

  const getLineageInfo = (method: string | null) => {
      if (!method) return null;
      return LINEAGE_CONTENT.find(l => l.relatedMethod === method);
  };
  
  const lineage = getLineageInfo(selectedMethod);

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden font-sans bg-slate-950 text-white selection:bg-teal-500/30 flex flex-col lg:block lg:h-screen lg:overflow-hidden">
       
       {/* Audio Visualizer Background (Global) */}
       <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
           <AudioVisualizer />
       </div>

       {/* 3-Column Layout */}
       <div className="relative z-10 w-full flex-grow grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          
          {/* ZONE 1: ANXIETY */}
          <section 
            className="relative group flex flex-col items-center justify-center p-8 min-h-[50vh] lg:min-h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden cursor-pointer"
            onMouseEnter={() => setZone('anxiety')}
            onClick={() => resumeContext()}
          >
             <AnxietyBackground />
             
             <div className="relative z-10 text-center">
                 <div className="mb-6 inline-flex p-4 rounded-full bg-slate-800/80 border border-slate-700 shadow-2xl shadow-purple-900/20">
                     <CloudLightning className="w-12 h-12 text-slate-400" />
                 </div>
                 <h2 className="text-4xl font-bold text-slate-200 mb-2 tracking-tight">ANXIETY</h2>
                 <p className="text-slate-400 max-w-xs mx-auto leading-relaxed">
                     Storms, Chaos, Disconnection. <br/>
                     <span className="text-xs uppercase tracking-widest opacity-60 mt-2 block">The Starting Point</span>
                 </p>
             </div>
          </section>

          {/* ZONE 2: TRANSFORMATION (Center) */}
          <section 
             className="relative flex flex-col items-center justify-center min-h-[80vh] lg:min-h-full bg-gradient-to-b from-teal-900/20 via-slate-900 to-teal-900/20 py-20 lg:py-0"
             onMouseEnter={() => setZone('transformation')}
          >
              {/* Ethereal Glow */}
              <div className="absolute inset-0 bg-teal-500/5 radial-gradient pointer-events-none" />
              
              <div className="mb-8 text-center relative z-10">
                  <h2 className="text-2xl font-light text-teal-200 tracking-[0.2em] uppercase">Transformation</h2>
                  <p className="text-xs text-teal-400/60 mt-1">Sound & Vibration Carry Consciousness</p>
              </div>

              {/* The Wheel */}
              <div className="scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
                  <MethodWheel onMethodSelect={handleMethodSelect} icons={icons} />
              </div>
          </section>

          {/* ZONE 3: PEACE */}
          <section 
            className="relative flex flex-col items-center justify-center p-8 min-h-[50vh] lg:min-h-full bg-gradient-to-b from-amber-900/20 via-sky-900/20 to-emerald-900/20 cursor-pointer"
            onMouseEnter={() => setZone('peace')}
            onClick={() => resumeContext()}
          >
             <PeaceBackground />
             
             <div className="relative z-10 text-center">
                 <div className="mb-6 inline-flex p-4 rounded-full bg-amber-100/10 border border-amber-400/30 shadow-[0_0_50px_rgba(251,191,36,0.2)]">
                     <Sun className="w-12 h-12 text-amber-300 animate-spin-slow" />
                 </div>
                 <h2 className="text-4xl font-bold text-amber-100 mb-2 tracking-tight">PEACE</h2>
                 <p className="text-amber-200/80 max-w-xs mx-auto leading-relaxed">
                     Healing, Connection, Flow. <br/>
                     <span className="text-xs uppercase tracking-widest opacity-60 mt-2 block">The Result</span>
                 </p>
             </div>
          </section>
       </div>

       {/* Info Modal */}
       <EpicModal
         isOpen={!!selectedMethod}
         onClose={() => setSelectedMethod(null)}
         title={selectedMethod ? (lineage?.title || selectedMethod.replace(/-/g, ' ').toUpperCase()) : ''}
         subtitle="Vibrational Healing Lineage"
         description={lineage?.fullDescription || lineage?.text || "Sound therapy uses specific frequencies to entrain the brain and body into a state of coherence."}
         imageSrc={lineage?.relatedMethod ? `/generated/images/methods/${lineage.relatedMethod}.png` : undefined}
         audioSrc={lineage ? `/generated/audio/${lineage.id}.mp3` : undefined}
       />

       {/* Start Overlay */}
       {!isReady && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-500 px-4">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="text-center text-white p-8 md:p-12 max-w-lg w-full"
           >
             <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
                 Anxiety into Peace
             </h1>
             <p className="text-lg md:text-xl text-slate-300 mb-12 font-light">
                 A visualized journey through sound and energy healing.
             </p>
             <button 
                className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-bold tracking-wider transition-all hover:scale-105 shadow-[0_0_30px_rgba(45,212,191,0.4)] w-full md:w-auto"
                onClick={() => resumeContext()}
             >
                 BEGIN JOURNEY
             </button>
           </motion.div>
         </div>
       )}
    </div>
  );
}
