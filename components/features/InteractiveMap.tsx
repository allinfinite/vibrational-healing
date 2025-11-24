'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSound } from '@/lib/contexts/SoundContext';
import EpicModal from '@/components/ui/EpicModal';
import MethodWheel from '@/components/features/MethodWheel';
import { CloudLightning, Sun } from 'lucide-react'; 
import { LINEAGE_CONTENT } from '@/lib/content';
import AnxietyBackground from '@/components/features/AnxietyBackground';
import PeaceBackground from '@/components/features/PeaceBackground';
import TransformationBackground from '@/components/features/TransformationBackground';

const STATIC_ICONS = [
    'tuning-fork', 'voice-chanting', 'singing-bowl', 
    'didgeridoo', 'world-prayer', 'creative-methods', 
    'meditating-figure'
];

const METHOD_ORDER = [
    'tuning-fork',
    'voice-chanting', 
    'singing-bowl',
    'didgeridoo',
    'world-prayer',
    'creative-methods'
];

export default function InteractiveMap() {
  const { playVoice, stopVoice, resumeContext, isReady, setZone } = useSound();
  const [icons, setIcons] = useState<Record<string, string>>({});
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [activeZone, setActiveZone] = useState<'anxiety' | 'transformation' | 'peace'>('transformation');

  const handleZoneChange = (zone: 'anxiety' | 'transformation' | 'peace') => {
    setZone(zone);
    setActiveZone(zone);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('zonechange', { detail: zone }));
    }
  };

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
  };

  const getLineageInfo = (method: string | null) => {
      if (!method) return null;
      return LINEAGE_CONTENT.find(l => l.relatedMethod === method);
  };
  
  const handleNext = () => {
      if (!selectedMethod) return;
      const currentIndex = METHOD_ORDER.indexOf(selectedMethod);
      const nextIndex = (currentIndex + 1) % METHOD_ORDER.length;
      setSelectedMethod(METHOD_ORDER[nextIndex]);
      stopVoice();
  };

  const handlePrev = () => {
      if (!selectedMethod) return;
      const currentIndex = METHOD_ORDER.indexOf(selectedMethod);
      const prevIndex = (currentIndex - 1 + METHOD_ORDER.length) % METHOD_ORDER.length;
      setSelectedMethod(METHOD_ORDER[prevIndex]);
      stopVoice();
  };
  
  const lineage = getLineageInfo(selectedMethod);

  return (
    <div className="w-full min-h-screen relative overflow-hidden font-sans text-white selection:bg-teal-500/30">
       
       {/* Unified Background - Seamless flowing gradient */}
       <div className="absolute inset-0">
         {/* Base dark gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
         
         {/* Smooth horizontal journey gradient - Purple to Teal to Gold */}
         <div 
           className="absolute inset-0"
           style={{
             background: 'linear-gradient(90deg, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.15) 15%, rgba(45,212,191,0.2) 35%, rgba(45,212,191,0.25) 50%, rgba(45,212,191,0.2) 65%, rgba(251,191,36,0.15) 85%, rgba(251,191,36,0.25) 100%)'
           }}
         />
         
         {/* Overlapping radial glows that blend zones together */}
         <div 
           className="absolute inset-0"
           style={{
             background: 'radial-gradient(ellipse 80% 60% at 15% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 50% 50%, rgba(45, 212, 191, 0.15) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 85% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)'
           }}
         />

         {/* Flowing horizontal wave bands that connect all zones */}
         <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
           <defs>
             <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
               <stop offset="30%" stopColor="#8b5cf6" stopOpacity="0.2" />
               <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.3" />
               <stop offset="70%" stopColor="#fbbf24" stopOpacity="0.2" />
               <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
             </linearGradient>
             <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
               <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.4" />
               <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
             </linearGradient>
           </defs>
           {/* Multiple flowing wave paths */}
           <motion.path
             d="M-100,200 Q200,150 400,200 T800,200 T1200,200 T1600,200 T2000,200"
             fill="none"
             stroke="url(#flowGradient1)"
             strokeWidth="60"
             strokeLinecap="round"
             initial={{ x: 0 }}
             animate={{ x: [-100, 0, -100] }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             style={{ filter: 'blur(30px)' }}
           />
           <motion.path
             d="M-100,400 Q300,350 500,400 T900,400 T1300,400 T1700,400 T2100,400"
             fill="none"
             stroke="url(#flowGradient2)"
             strokeWidth="80"
             strokeLinecap="round"
             initial={{ x: 0 }}
             animate={{ x: [0, -150, 0] }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             style={{ filter: 'blur(40px)' }}
           />
           <motion.path
             d="M-100,600 Q250,550 450,600 T850,600 T1250,600 T1650,600 T2050,600"
             fill="none"
             stroke="url(#flowGradient1)"
             strokeWidth="50"
             strokeLinecap="round"
             initial={{ x: 0 }}
             animate={{ x: [-50, 50, -50] }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             style={{ filter: 'blur(25px)' }}
           />
         </svg>

         {/* Traveling particles - journey from anxiety to peace */}
         <div className="absolute inset-0 overflow-hidden">
           {[...Array(20)].map((_, i) => (
             <motion.div
               key={`travel-${i}`}
               className="absolute w-2 h-2 rounded-full"
               style={{
                 top: `${20 + (i % 5) * 15}%`,
                 background: 'linear-gradient(90deg, #8b5cf6, #2dd4bf, #fbbf24)',
                 boxShadow: '0 0 10px rgba(45, 212, 191, 0.5)',
               }}
               initial={{ left: '-5%', opacity: 0 }}
               animate={{ 
                 left: ['−5%', '105%'],
                 opacity: [0, 0.8, 0.8, 0],
               }}
               transition={{
                 duration: 12 + (i % 5) * 2,
                 repeat: Infinity,
                 delay: i * 0.8,
                 ease: "linear"
               }}
             />
           ))}
         </div>

         {/* Vertical energy streams that flow through all columns */}
         <div className="absolute inset-0 opacity-20">
           {[...Array(12)].map((_, i) => (
             <motion.div
               key={`vstream-${i}`}
               className="absolute h-full"
               style={{
                 left: `${8 + i * 8}%`,
                 width: '1px',
                 background: i < 4 
                   ? 'linear-gradient(180deg, transparent, rgba(139,92,246,0.5), rgba(45,212,191,0.3), transparent)'
                   : i < 8
                     ? 'linear-gradient(180deg, transparent, rgba(45,212,191,0.5), transparent)'
                     : 'linear-gradient(180deg, transparent, rgba(45,212,191,0.3), rgba(251,191,36,0.5), transparent)',
               }}
               animate={{
                 opacity: [0.2, 0.5, 0.2],
                 scaleY: [0.95, 1, 0.95],
               }}
               transition={{
                 duration: 3 + (i % 3),
                 repeat: Infinity,
                 delay: i * 0.2,
               }}
             />
           ))}
         </div>

         {/* Floating particles across entire section */}
         <div className="absolute inset-0 overflow-hidden">
           {[...Array(40)].map((_, i) => {
             const xPos = (i / 40) * 100;
             const color = xPos < 33 
               ? 'rgba(139,92,246,0.6)' 
               : xPos < 66 
                 ? 'rgba(45,212,191,0.6)' 
                 : 'rgba(251,191,36,0.6)';
             return (
               <motion.div
                 key={`particle-${i}`}
                 className="absolute w-1 h-1 rounded-full"
                 style={{
                   left: `${xPos}%`,
                   top: `${Math.random() * 100}%`,
                   backgroundColor: color,
                   boxShadow: `0 0 6px ${color}`,
                 }}
                 animate={{
                   y: [0, -30, 0],
                   x: [0, (i % 2 === 0 ? 10 : -10), 0],
                   opacity: [0.3, 0.8, 0.3],
                 }}
                 transition={{
                   duration: 4 + Math.random() * 3,
                   repeat: Infinity,
                   delay: Math.random() * 3,
                 }}
               />
             );
           })}
         </div>

         {/* Horizontal connecting beams */}
         <div className="absolute inset-0 pointer-events-none hidden lg:block">
           <motion.div
             className="absolute top-1/3 left-0 right-0 h-px"
             style={{
               background: 'linear-gradient(90deg, rgba(139,92,246,0.4), rgba(45,212,191,0.5), rgba(251,191,36,0.4))',
               boxShadow: '0 0 20px rgba(45,212,191,0.3)',
             }}
             animate={{ opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 4, repeat: Infinity }}
           />
           <motion.div
             className="absolute top-2/3 left-0 right-0 h-px"
             style={{
               background: 'linear-gradient(90deg, rgba(139,92,246,0.3), rgba(45,212,191,0.4), rgba(251,191,36,0.3))',
               boxShadow: '0 0 15px rgba(45,212,191,0.2)',
             }}
             animate={{ opacity: [0.2, 0.5, 0.2] }}
             transition={{ duration: 5, repeat: Infinity, delay: 1 }}
           />
         </div>
       </div>

       {/* Main Content - 3 Column Layout without hard dividers */}
       <div className="relative z-10 w-full min-h-screen grid grid-cols-1 lg:grid-cols-3">
          
          {/* ZONE 1: ANXIETY */}
          <motion.section 
            className="relative group flex flex-col items-center justify-center p-8 min-h-[50vh] lg:min-h-screen cursor-pointer overflow-hidden"
            onMouseEnter={() => handleZoneChange('anxiety')}
            onClick={() => resumeContext()}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
             {/* Rain & Lightning Background - fades at edges */}
             <div className="absolute inset-0" style={{ mask: 'linear-gradient(90deg, black 0%, black 70%, transparent 100%)', WebkitMask: 'linear-gradient(90deg, black 0%, black 70%, transparent 100%)' }}>
             <AnxietyBackground />
             </div>
             
             {/* Soft edge blend to center */}
             <div 
               className="absolute inset-0 pointer-events-none"
               style={{
                 background: 'linear-gradient(90deg, transparent 60%, rgba(15,23,42,0.8) 100%)'
               }}
             />
             
             <div className="relative z-10 text-center">
                 {/* Chaotic energy rings */}
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                   <motion.div 
                     className="w-40 h-40 rounded-full border border-purple-500/20"
                     animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                     transition={{ duration: 3, repeat: Infinity }}
                   />
                   <motion.div 
                     className="absolute inset-0 w-40 h-40 rounded-full border border-purple-400/10"
                     animate={{ scale: [1.1, 1.4, 1.1], opacity: [0.2, 0.05, 0.2], rotate: [0, 180, 360] }}
                     transition={{ duration: 5, repeat: Infinity }}
                   />
                 </div>
                 
                 <motion.div 
                   className="mb-6 inline-flex p-4 rounded-full bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.3)] overflow-hidden relative w-24 h-24 items-center justify-center"
                   whileHover={{ boxShadow: "0 0 60px rgba(139,92,246,0.5)" }}
                   animate={{ 
                     boxShadow: [
                       "0 0 30px rgba(139,92,246,0.2)",
                       "0 0 50px rgba(139,92,246,0.4)",
                       "0 0 30px rgba(139,92,246,0.2)"
                     ]
                   }}
                   transition={{ duration: 2, repeat: Infinity }}
                 >
                     <Image 
                        src="/generated/images/methods/icon-anxiety.png"
                        alt="Anxiety Icon"
                        fill
                        className="object-cover opacity-90"
                        onError={(e) => {
                            const target = e.target as HTMLElement;
                            target.style.display = 'none';
                            if (target.nextElementSibling) {
                                (target.nextElementSibling as HTMLElement).style.display = 'block';
                            }
                        }}
                     />
                     <CloudLightning className="w-12 h-12 text-purple-400 hidden" />
                 </motion.div>
                 <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">ANXIETY</h2>
                 <p className="text-slate-400 max-w-xs mx-auto leading-relaxed">
                     Storms, Chaos, Disconnection
                 </p>
                 <span className="text-xs uppercase tracking-[0.2em] text-purple-400/60 mt-3 block">
                   The Starting Point
                 </span>
             </div>

           </motion.section>

          {/* ZONE 2: TRANSFORMATION (Center) */}
          <motion.section 
             className="relative flex flex-col items-center justify-center min-h-[70vh] lg:min-h-screen py-12 lg:py-0 overflow-hidden"
             onMouseEnter={() => handleZoneChange('transformation')}
          >
              {/* Transformation Background - extends and blends with both sides */}
              <div className="absolute inset-0 lg:-inset-x-20" style={{ mask: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)', WebkitMask: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
                <TransformationBackground />
              </div>
              
              {/* Soft blending edges */}
              <div 
                className="absolute inset-0 pointer-events-none hidden lg:block"
                style={{
                  background: 'linear-gradient(90deg, rgba(139,92,246,0.1) 0%, transparent 20%, transparent 80%, rgba(251,191,36,0.1) 100%)'
                }}
              />
              
              {/* Center glow effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-40"
                  style={{
                    background: 'radial-gradient(circle, rgba(45, 212, 191, 0.25) 0%, rgba(45, 212, 191, 0.1) 40%, transparent 70%)'
                  }}
                />
              </div>
              
              <div className="mb-4 sm:mb-8 text-center relative z-10">
                  <h2 className="text-3xl sm:text-2xl font-light text-teal-200 tracking-[0.2em] sm:tracking-[0.25em] uppercase">Transformation</h2>
                  <p className="text-sm sm:text-xs text-teal-400/80 mt-2 tracking-wider">Sound & Vibration Carry Consciousness</p>
              </div>

              {/* The Wheel - Larger on mobile */}
              <div className="scale-[0.85] sm:scale-[0.8] md:scale-[0.9] lg:scale-100 origin-center -my-4 sm:-my-8 lg:my-0 relative z-10">
                  <MethodWheel onMethodSelect={handleMethodSelect} icons={icons} />
              </div>

          </motion.section>

          {/* ZONE 3: PEACE */}
          <motion.section 
            className="relative flex flex-col items-center justify-center p-8 min-h-[50vh] lg:min-h-screen cursor-pointer overflow-hidden"
            onMouseEnter={() => handleZoneChange('peace')}
            onClick={() => resumeContext()}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
             {/* Peaceful Background - ripples and particles - fades at edges */}
             <div className="absolute inset-0" style={{ mask: 'linear-gradient(90deg, transparent 0%, black 30%, black 100%)', WebkitMask: 'linear-gradient(90deg, transparent 0%, black 30%, black 100%)' }}>
             <PeaceBackground />
             </div>
             
             {/* Soft edge blend from center */}
             <div 
               className="absolute inset-0 pointer-events-none"
               style={{
                 background: 'linear-gradient(90deg, rgba(15,23,42,0.8) 0%, transparent 40%)'
               }}
             />
             
             <div className="relative z-10 text-center">
                 {/* Serene expanding rings */}
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                   <motion.div 
                     className="w-40 h-40 rounded-full border border-amber-400/20"
                     animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   />
                   <motion.div 
                     className="absolute inset-0 w-40 h-40 rounded-full border border-amber-300/15"
                     animate={{ scale: [1.1, 1.5, 1.1], opacity: [0.3, 0.05, 0.3] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   />
                   <motion.div 
                     className="absolute inset-0 w-40 h-40 rounded-full border border-emerald-400/10"
                     animate={{ scale: [0.9, 1.4, 0.9], opacity: [0.2, 0.05, 0.2] }}
                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                   />
                 </div>
                 
                 <motion.div 
                   className="mb-6 inline-flex p-4 rounded-full bg-slate-900/60 backdrop-blur-sm border border-amber-500/30 shadow-[0_0_50px_rgba(251,191,36,0.3)] overflow-hidden relative w-24 h-24 items-center justify-center"
                   whileHover={{ boxShadow: "0 0 70px rgba(251,191,36,0.5)" }}
                   animate={{ 
                     boxShadow: [
                       "0 0 40px rgba(251,191,36,0.2)",
                       "0 0 60px rgba(251,191,36,0.35)",
                       "0 0 40px rgba(251,191,36,0.2)"
                     ]
                   }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 >
                     <Image 
                        src="/generated/images/methods/icon-peace.png"
                        alt="Peace Icon"
                        fill
                        className="object-cover opacity-90"
                        onError={(e) => {
                            const target = e.target as HTMLElement;
                            target.style.display = 'none';
                            if (target.nextElementSibling) {
                                (target.nextElementSibling as HTMLElement).style.display = 'block';
                            }
                        }}
                     />
                     <Sun className="w-12 h-12 text-amber-300 animate-spin-slow hidden" />
                 </motion.div>
                 <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">PEACE</h2>
                 <p className="text-amber-200/70 max-w-xs mx-auto leading-relaxed">
                     Healing, Connection, Flow
                 </p>
                 <span className="text-xs uppercase tracking-[0.2em] text-amber-400/60 mt-3 block">
                   The Result
                 </span>
             </div>
          </motion.section>
       </div>

       {/* Journey indicator - Smooth gradient bar */}
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
         <div className="relative w-64 h-1 rounded-full overflow-hidden bg-white/10">
           <div 
             className="absolute inset-0 rounded-full"
             style={{
               background: 'linear-gradient(90deg, #8b5cf6 0%, #2dd4bf 50%, #fbbf24 100%)'
             }}
           />
           <motion.div
             className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg"
             style={{
               boxShadow: activeZone === 'anxiety' 
                 ? '0 0 20px rgba(139,92,246,0.8)' 
                 : activeZone === 'transformation' 
                   ? '0 0 20px rgba(45,212,191,0.8)'
                   : '0 0 20px rgba(251,191,36,0.8)',
             }}
             animate={{
               left: activeZone === 'anxiety' ? '0%' : activeZone === 'transformation' ? '50%' : '100%',
               x: activeZone === 'anxiety' ? '0%' : activeZone === 'transformation' ? '-50%' : '-100%',
             }}
             transition={{ type: "spring", stiffness: 300, damping: 30 }}
           />
         </div>
         <span className="text-xs text-white/40 tracking-widest uppercase">
           {activeZone === 'anxiety' ? 'Starting Point' : activeZone === 'transformation' ? 'Transforming' : 'Arriving'}
         </span>
       </div>

       {/* Info Modal */}
       <EpicModal
         isOpen={!!selectedMethod}
         onClose={() => setSelectedMethod(null)}
         onNext={handleNext}
         onPrev={handlePrev}
         title={selectedMethod ? (lineage?.title || selectedMethod.replace(/-/g, ' ').toUpperCase()) : ''}
         subtitle="Vibrational Healing Lineage"
         description={lineage?.fullDescription || lineage?.text || "Sound therapy uses specific frequencies to entrain the brain and body into a state of coherence."}
         imageSrc={lineage?.relatedMethod ? `/generated/images/methods/${lineage.relatedMethod}.png` : undefined}
         audioSrc={lineage?.audioFile ? `/generated/audio/${lineage.audioFile}` : undefined}
         audioSource={lineage?.audioSource}
       />

       {/* Start Overlay */}
       {!isReady && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-500 px-4 py-8">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="text-center text-white p-8 md:p-12 max-w-lg w-full"
           >
             <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-teal-300 to-amber-300 bg-clip-text text-transparent leading-tight">
                 Anxiety into Peace
             </h1>
             <p className="text-lg md:text-xl text-slate-300 mb-12 font-light">
                 A visualized journey through sound and energy healing.
             </p>
             <button 
                className="px-8 py-4 bg-gradient-to-r from-purple-600 via-teal-600 to-amber-600 hover:from-purple-500 hover:via-teal-500 hover:to-amber-500 text-white rounded-full font-bold tracking-wider transition-all hover:scale-105 shadow-[0_0_40px_rgba(45,212,191,0.3)] w-full md:w-auto"
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
