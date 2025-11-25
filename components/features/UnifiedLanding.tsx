'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSound } from '@/lib/contexts/SoundContext';
import EpicModal from '@/components/ui/EpicModal';
import MethodWheel from '@/components/features/MethodWheel';
import { CloudLightning, Sun, Info, Radio, Heart, Waves, Zap, X, Sparkles, Brain, BookOpen } from 'lucide-react'; 
import { LINEAGE_CONTENT } from '@/lib/content';
import AnxietyBackground from '@/components/features/AnxietyBackground';
import PeaceBackground from '@/components/features/PeaceBackground';
import TransformationBackground from '@/components/features/TransformationBackground';

const STATIC_ICONS = [
    'tuning-fork', 'voice-chanting', 'singing-bowl', 
    'didgeridoo', 'world-prayer', 'creative-methods', 
    'meditating-figure', 'breath', 'dance', 'drumming', 'humandalas'
];

const METHOD_ORDER = [
    'tuning-fork',
    'voice-chanting', 
    'singing-bowl',
    'didgeridoo',
    'world-prayer',
    'creative-methods',
    'breath',
    'dance',
    'drumming',
    'humandalas'
];

// Method data for methods not in LINEAGE_CONTENT
const METHODS_DATA: Record<string, { title: string; text: string; fullDescription: string; audioFile?: string; audioSource?: { title: string; artist?: string; url: string } }> = {
    'breath': {
        title: 'Breath',
        text: 'All physical movement is vibration.',
        fullDescription: "Breath is the most fundamental vibration of life. Every inhale and exhale creates rhythmic waves that massage internal organs, stimulate the vagus nerve, and regulate the autonomic nervous system. Conscious breathing practices like pranayama use specific patterns to shift brainwave states, oxygenate tissues, and move stagnant energy.\n\nYou can program your breath with intention by pairing it with silent sound. For example: on your inhale, silently resonate the sound 'MA' in your consciousness. On your exhale, silently resonate 'OM'. These sounds are not spoken aloud—they vibrate only in your mind. This practice layers intention onto the physical vibration of breath, amplifying its transformative power."
    },
    'dance': {
        title: 'Dance',
        text: 'Ecstatic dance and dances of universal peace.',
        fullDescription: "Dance transforms the body into a living instrument of vibration. Ecstatic dance allows free-form movement to release trauma stored in the tissues, while Dances of Universal Peace use sacred phrases from world traditions combined with simple movements to create group coherence. When we dance, we literally shake loose what no longer serves us and align with the rhythm of life itself."
    },
    'drumming': {
        title: 'Drumming',
        text: 'Primal rhythms for trance and healing.',
        fullDescription: "Drumming is one of humanity's oldest healing tools. The steady, repetitive beat of a drum entrains brainwaves into theta states—the realm of deep meditation, trance, and shamanic journeying. Group drumming synchronizes the heartbeats and nervous systems of participants, creating a powerful collective field. The low frequencies penetrate deep into the body, releasing tension and grounding scattered energy.",
        audioFile: 'drumming.mp3',
        audioSource: { title: 'Pure Shamanic Journey', artist: 'Calm Whale', url: 'https://whaleloryb.bandcamp.com/track/pure-shamanic-journey-17' }
    },
    'humandalas': {
        title: 'Humandalas',
        text: 'Sacred geometry through group movement.',
        fullDescription: "Humandalas are intentional group activities that involve guided movements and shapes to create a shared energetic field. Rooted in sacred geometry and ancient healing practices, Humandalas are designed to foster connection, healing, and community. Participants physically form geometric patterns—circles, spirals, stars—becoming living mandalas that generate coherent energy fields. They are a transformative tool for deepening understanding of energy work and group facilitation."
    }
};

const INFO_CARDS = [
  {
    id: 'concept',
    title: 'Core Concept',
    subtitle: 'Vibration Carries Consciousness',
    icon: <Zap className="w-4 h-4" />,
    description: 'Everything is vibration. Sound is not just audible—it is a carrier wave for intent. Healing intent in sound transmits energy that modulates your biofield.',
    color: 'purple'
  },
  {
    id: 'nervous',
    title: 'Nervous System',
    subtitle: 'Polyvagal Regulation',
    icon: <Brain className="w-4 h-4" />,
    description: 'Sound healing activates the parasympathetic nervous system via the vagus nerve, decreasing amygdala activation and down-regulating the default mode network. This shifts you from fight-or-flight into rest-and-digest—the ventral vagal state of safety and social connection.',
    color: 'rose'
  },
  {
    id: 'mechanism',
    title: 'The Mechanism',
    subtitle: 'Acoustic Biofield Modulation',
    icon: <Waves className="w-4 h-4" />,
    description: 'Vibrational Tuning acts as a reset button. Specific frequencies entrain the body\'s rhythms, shifting the nervous system from chaos into coherence.',
    color: 'teal'
  },
  {
    id: 'transmission',
    title: 'Intentional Transmission',
    subtitle: 'Harmonic Transfer Beyond Self',
    icon: <Radio className="w-4 h-4" />,
    description: 'Intent is encoded into the vibrational source itself, transmitted through acoustic harmonics, and received by others as a regulatory influence. Vibration is the carrier, intent is the payload—it ripples outward, modulating the field of anyone within it.',
    color: 'blue'
  },
  {
    id: 'result',
    title: 'Passive Benefit',
    subtitle: 'Simply Being Present',
    icon: <Heart className="w-4 h-4" />,
    description: 'You don\'t need to do anything to receive the healing. Just as a guitar string vibrates when a matching note is played nearby, your body naturally resonates with coherent frequencies. Relax and receive—your nervous system entrains automatically.',
    color: 'amber'
  }
];

export default function UnifiedLanding() {
  const { playVoice, stopVoice, resumeContext, isReady, setZone } = useSound();
  const [icons, setIcons] = useState<Record<string, string>>({});
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedLineage, setSelectedLineage] = useState<string | null>(null);
  const [activeZone, setActiveZone] = useState<'anxiety' | 'transformation' | 'peace'>('transformation');
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

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

  const getMethodInfo = (method: string | null) => {
      if (!method) return null;
      // First check LINEAGE_CONTENT
      const lineage = LINEAGE_CONTENT.find(l => l.relatedMethod === method);
      if (lineage) return lineage;
      // Then check METHODS_DATA for new methods
      const methodData = METHODS_DATA[method];
      if (methodData) return { ...methodData, relatedMethod: method };
      return null;
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

  // Lineage navigation
  const handleLineageNext = () => {
      if (!selectedLineage) return;
      const currentIndex = LINEAGE_CONTENT.findIndex(l => l.id === selectedLineage);
      const nextIndex = (currentIndex + 1) % LINEAGE_CONTENT.length;
      setSelectedLineage(LINEAGE_CONTENT[nextIndex].id);
      stopVoice();
  };

  const handleLineagePrev = () => {
      if (!selectedLineage) return;
      const currentIndex = LINEAGE_CONTENT.findIndex(l => l.id === selectedLineage);
      const prevIndex = (currentIndex - 1 + LINEAGE_CONTENT.length) % LINEAGE_CONTENT.length;
      setSelectedLineage(LINEAGE_CONTENT[prevIndex].id);
      stopVoice();
  };
  
  const methodInfo = getMethodInfo(selectedMethod);
  const currentLineage = LINEAGE_CONTENT.find(l => l.id === selectedLineage);

  const getInfoColor = (color: string) => {
    switch(color) {
      case 'purple': return 'from-purple-500/20 to-purple-900/20 border-purple-500/30 text-purple-300';
      case 'rose': return 'from-rose-500/20 to-rose-900/20 border-rose-500/30 text-rose-300';
      case 'teal': return 'from-teal-500/20 to-teal-900/20 border-teal-500/30 text-teal-300';
      case 'blue': return 'from-blue-500/20 to-blue-900/20 border-blue-500/30 text-blue-300';
      case 'amber': return 'from-amber-500/20 to-amber-900/20 border-amber-500/30 text-amber-300';
      default: return 'from-slate-500/20 to-slate-900/20 border-slate-500/30 text-slate-300';
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] relative overflow-y-auto font-sans text-white selection:bg-teal-500/30 mt-16">
       
       {/* Unified Background */}
       <div className="absolute inset-0">
         <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
         <div 
           className="absolute inset-0"
           style={{
             background: 'linear-gradient(90deg, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.15) 15%, rgba(45,212,191,0.2) 35%, rgba(45,212,191,0.25) 50%, rgba(45,212,191,0.2) 65%, rgba(251,191,36,0.15) 85%, rgba(251,191,36,0.25) 100%)'
           }}
         />
         <div 
           className="absolute inset-0"
           style={{
             background: 'radial-gradient(ellipse 80% 60% at 15% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 50% 50%, rgba(45, 212, 191, 0.15) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 85% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)'
           }}
         />

         {/* Flowing wave bands */}
         <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
           <defs>
             <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
               <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.3" />
               <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
             </linearGradient>
           </defs>
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
         </svg>

         {/* Floating particles */}
         <div className="absolute inset-0 overflow-hidden">
           {[...Array(30)].map((_, i) => {
             const xPos = (i / 30) * 100;
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
       </div>

       {/* Top Header - Title & Info Cards */}
       <div className="absolute top-2 sm:top-4 left-0 right-0 z-20 px-3 sm:px-6">
         <div className="max-w-7xl mx-auto">
           {/* Centered Title */}
           <motion.div 
             className="text-center mb-2 sm:mb-4"
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
           >
             <div className="inline-flex items-center space-x-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-teal-500/10 border border-teal-500/30 backdrop-blur-md mb-1 sm:mb-2">
               <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-teal-400" />
               <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.15em] text-teal-300 uppercase">
                 Sound & Energy Healing
               </span>
             </div>
             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
               <span className="text-slate-200">Transform </span>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-teal-400 to-amber-400">
                 Anxiety into Peace
               </span>
             </h1>
           </motion.div>

           {/* Info Cards Row - Compact */}
           <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap max-w-lg sm:max-w-none mx-auto">
             {INFO_CARDS.map((card, i) => (
               <motion.button
                 key={card.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 + i * 0.1 }}
                 onClick={() => setActiveInfo(activeInfo === card.id ? null : card.id)}
                 className={`group relative px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border backdrop-blur-sm transition-all text-[10px] sm:text-xs flex items-center gap-1 sm:gap-1.5 ${
                   activeInfo === card.id 
                     ? `bg-gradient-to-r ${getInfoColor(card.color)}` 
                     : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                 }`}
               >
                 {card.icon}
                 <span className="font-medium hidden xs:inline">{card.title}</span>
                 <span className="font-medium xs:hidden">{card.title.split(' ')[0]}</span>
                 <Info className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-50" />
               </motion.button>
             ))}
           </div>

           {/* Expanded Info Panel */}
           <AnimatePresence>
             {activeInfo && (
               <motion.div
                 initial={{ opacity: 0, y: -10, height: 0 }}
                 animate={{ opacity: 1, y: 0, height: 'auto' }}
                 exit={{ opacity: 0, y: -10, height: 0 }}
                 className="flex justify-center mt-3"
               >
                 {INFO_CARDS.filter(c => c.id === activeInfo).map(card => (
                   <div 
                     key={card.id}
                     className={`relative max-w-2xl p-6 rounded-2xl border backdrop-blur-xl bg-gradient-to-br ${getInfoColor(card.color)} shadow-2xl`}
                   >
                     <button 
                       onClick={() => setActiveInfo(null)}
                       className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/20 transition-colors"
                     >
                       <X className="w-4 h-4" />
                     </button>
                     <div className="flex items-start gap-4">
                       <div className="p-3 rounded-xl bg-black/30 shrink-0">
                         <div className="w-6 h-6 flex items-center justify-center">
                           {card.icon}
                         </div>
                       </div>
                       <div className="pr-6">
                         <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium">{card.title}</span>
                         <h3 className="font-bold text-white text-lg mt-1">{card.subtitle}</h3>
                         <p className="text-sm text-white/80 mt-2 leading-relaxed">{card.description}</p>
                       </div>
                     </div>
                   </div>
                 ))}
               </motion.div>
             )}
           </AnimatePresence>
         </div>
       </div>

       {/* Main Content - 3 Column Layout */}
       <div className="relative z-10 w-full min-h-[calc(100vh-200px)] grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] pt-48 sm:pt-40 lg:pt-24 pb-16">
          
          {/* ZONE 1: ANXIETY */}
          <motion.section 
            className="relative group flex flex-col items-center justify-center p-4 lg:p-8 cursor-pointer overflow-hidden"
            onMouseEnter={() => handleZoneChange('anxiety')}
            onClick={() => resumeContext()}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
             <div className="absolute inset-0" style={{ mask: 'linear-gradient(90deg, black 0%, black 70%, transparent 100%)', WebkitMask: 'linear-gradient(90deg, black 0%, black 70%, transparent 100%)' }}>
               <AnxietyBackground />
             </div>
             
             <div 
               className="absolute inset-0 pointer-events-none"
               style={{ background: 'linear-gradient(90deg, transparent 60%, rgba(15,23,42,0.8) 100%)' }}
             />
             
             <div className="relative z-10 text-center">
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                   <motion.div 
                     className="w-28 h-28 lg:w-40 lg:h-40 rounded-full border border-purple-500/20"
                     animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                     transition={{ duration: 3, repeat: Infinity }}
                   />
                 </div>
                 
                 <motion.div 
                   className="mb-3 lg:mb-6 inline-flex p-3 lg:p-4 rounded-full bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.3)] overflow-hidden relative w-16 h-16 lg:w-24 lg:h-24 items-center justify-center"
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
                        }}
                     />
                     <CloudLightning className="w-8 h-8 lg:w-12 lg:h-12 text-purple-400" />
                 </motion.div>
                 <h2 className="text-2xl lg:text-4xl font-bold text-white mb-1 lg:mb-3 tracking-tight">ANXIETY</h2>
                 <p className="text-slate-400 text-sm lg:text-base max-w-xs mx-auto leading-relaxed hidden lg:block">
                     Storms, Chaos, Disconnection
                 </p>
                 <span className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-purple-400/60 mt-2 block">
                   Starting Point
                 </span>
             </div>
          </motion.section>

          {/* ZONE 2: TRANSFORMATION (Center) */}
          <motion.section 
             className="relative flex flex-col items-center justify-center overflow-hidden"
             onMouseEnter={() => handleZoneChange('transformation')}
          >
              <div className="absolute inset-0 lg:-inset-x-20" style={{ mask: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)', WebkitMask: 'linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)' }}>
                <TransformationBackground />
              </div>
              
              <div className="absolute inset-0 pointer-events-none">
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] rounded-full opacity-40"
                  style={{
                    background: 'radial-gradient(circle, rgba(45, 212, 191, 0.25) 0%, rgba(45, 212, 191, 0.1) 40%, transparent 70%)'
                  }}
                />
              </div>
              
              {/* Title hidden on desktop as it's covered by info cards */}
              <div className="mb-2 lg:mb-4 text-center relative z-10 lg:hidden">
                  <h2 className="text-xl font-light text-teal-200 tracking-[0.2em] uppercase">Transformation</h2>
                  <p className="text-[10px] text-teal-400/80 mt-1 tracking-wider">Sound & Vibration Carry Consciousness</p>
              </div>

              {/* The Wheel */}
              <div className="scale-[0.6] sm:scale-[0.7] lg:scale-[0.85] xl:scale-100 origin-center relative z-10">
                  <MethodWheel onMethodSelect={handleMethodSelect} icons={icons} />
              </div>
          </motion.section>

          {/* ZONE 3: PEACE */}
          <motion.section 
            className="relative flex flex-col items-center justify-center p-4 lg:p-8 cursor-pointer overflow-hidden"
            onMouseEnter={() => handleZoneChange('peace')}
            onClick={() => resumeContext()}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
             <div className="absolute inset-0" style={{ mask: 'linear-gradient(90deg, transparent 0%, black 30%, black 100%)', WebkitMask: 'linear-gradient(90deg, transparent 0%, black 30%, black 100%)' }}>
               <PeaceBackground />
             </div>
             
             <div 
               className="absolute inset-0 pointer-events-none"
               style={{ background: 'linear-gradient(90deg, rgba(15,23,42,0.8) 0%, transparent 40%)' }}
             />
             
             <div className="relative z-10 text-center">
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                   <motion.div 
                     className="w-28 h-28 lg:w-40 lg:h-40 rounded-full border border-amber-400/20"
                     animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   />
                 </div>
                 
                 <motion.div 
                   className="mb-3 lg:mb-6 inline-flex p-3 lg:p-4 rounded-full bg-slate-900/60 backdrop-blur-sm border border-amber-500/30 shadow-[0_0_50px_rgba(251,191,36,0.3)] overflow-hidden relative w-16 h-16 lg:w-24 lg:h-24 items-center justify-center"
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
                        }}
                     />
                     <Sun className="w-8 h-8 lg:w-12 lg:h-12 text-amber-300 animate-spin-slow" />
                 </motion.div>
                 <h2 className="text-2xl lg:text-4xl font-bold text-white mb-1 lg:mb-3 tracking-tight">PEACE</h2>
                 <p className="text-amber-200/70 text-sm lg:text-base max-w-xs mx-auto leading-relaxed hidden lg:block">
                     Healing, Connection, Flow
                 </p>
                 <span className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-amber-400/60 mt-2 block">
                   The Result
                 </span>
             </div>
          </motion.section>
       </div>

       {/* Lineages Section - Bottom */}
       <div className="relative z-20 w-full px-4 pb-8 pt-4">
         <div className="max-w-5xl mx-auto">
           {/* Section Header */}
           <div className="flex items-center justify-center gap-2 mb-4">
             <BookOpen className="w-4 h-4 text-teal-400" />
             <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-teal-300/80 uppercase">
               Healing Lineages
             </span>
           </div>
           
           {/* Lineage Icons Grid */}
           <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
             {LINEAGE_CONTENT.map((lineageItem, i) => (
               <motion.button
                 key={lineageItem.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 + i * 0.05 }}
                 onClick={() => setSelectedLineage(lineageItem.id)}
                 className="group relative flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/30 transition-all hover:scale-105"
               >
                 {/* Icon */}
                 <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-teal-500/50 transition-colors">
                   <Image
                     src={`/generated/images/methods/lineage-${lineageItem.id}.png`}
                     alt={lineageItem.title}
                     fill
                     className="object-cover group-hover:scale-110 transition-transform"
                   />
                 </div>
                 {/* Label */}
                 <span className="text-[8px] sm:text-[10px] text-white/60 group-hover:text-teal-300 transition-colors text-center max-w-[60px] sm:max-w-[80px] leading-tight truncate">
                   {lineageItem.title.split(' ')[0]}
                 </span>
               </motion.button>
             ))}
           </div>
         </div>
       </div>

       {/* Journey indicator */}
       <div className="relative z-20 flex justify-center pb-4">
         <div className="flex flex-col items-center gap-2">
           <div className="relative w-48 lg:w-64 h-1 rounded-full overflow-hidden bg-white/10">
             <div 
               className="absolute inset-0 rounded-full"
               style={{ background: 'linear-gradient(90deg, #8b5cf6 0%, #2dd4bf 50%, #fbbf24 100%)' }}
             />
             <motion.div
               className="absolute top-1/2 -translate-y-1/2 w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-white shadow-lg"
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
           <span className="text-[10px] lg:text-xs text-white/40 tracking-widest uppercase">
             {activeZone === 'anxiety' ? 'Starting Point' : activeZone === 'transformation' ? 'Transforming' : 'Arriving'}
           </span>
         </div>
       </div>

       {/* Method Modal */}
       <EpicModal
         isOpen={!!selectedMethod}
         onClose={() => setSelectedMethod(null)}
         onNext={handleNext}
         onPrev={handlePrev}
         title={selectedMethod ? (methodInfo?.title || selectedMethod.replace(/-/g, ' ').toUpperCase()) : ''}
         subtitle="Vibrational Healing Method"
         description={methodInfo?.fullDescription || methodInfo?.text || "Sound therapy uses specific frequencies to entrain the brain and body into a state of coherence."}
         imageSrc={selectedMethod ? `/generated/images/methods/${selectedMethod}.png` : undefined}
         audioSrc={methodInfo?.audioFile ? `/generated/audio/${methodInfo.audioFile}` : undefined}
         audioSource={methodInfo?.audioSource}
       />

       {/* Lineage Modal */}
       <EpicModal
         isOpen={!!selectedLineage}
         onClose={() => setSelectedLineage(null)}
         onNext={handleLineageNext}
         onPrev={handleLineagePrev}
         title={currentLineage?.title || ''}
         subtitle="Sound Healing Lineage"
         description={currentLineage?.fullDescription || currentLineage?.text || ''}
         imageSrc={currentLineage ? `/generated/images/methods/lineage-${currentLineage.id}.png` : undefined}
         audioSrc={currentLineage?.audioFile ? `/generated/audio/${currentLineage.audioFile}` : undefined}
         audioSource={currentLineage?.audioSource}
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

