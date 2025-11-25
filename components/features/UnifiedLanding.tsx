'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSound } from '@/lib/contexts/SoundContext';
import EpicModal from '@/components/ui/EpicModal';
import MethodWheel from '@/components/features/MethodWheel';
import { CloudLightning, Sun, Info, Radio, Heart, Waves, Zap, X, Sparkles, Brain, BookOpen, Snowflake, Activity, ChevronLeft, ChevronRight } from 'lucide-react'; 
import { LINEAGE_CONTENT, WATER_CRYSTAL_CONTENT, VAGUS_NERVE_CONTENT } from '@/lib/content';
import ChaosBackground from '@/components/features/ChaosBackground';
import CalmBackground from '@/components/features/CalmBackground';
import TransformationBackground from '@/components/features/TransformationBackground';
import BiofieldDiagram from '@/components/features/concept/BiofieldDiagram';
import CoherenceDiagram from '@/components/features/concept/CoherenceDiagram';
import NervousSystemDiagram from '@/components/features/concept/NervousSystemDiagram';
import SnowflakeDiagram from '@/components/features/concept/SnowflakeDiagram';

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
        text: 'Intentional Harmonic Transmission through sacred geometry.',
        fullDescription: "Humandalas are the embodiment of Intentional Harmonic Transmission—the principle that intent can be encoded into a vibrational source, transmitted through energetic harmonics, and received by others as a regulatory or transformative influence.\n\nIn a Humandala, participants physically form sacred geometric patterns—circles, spirals, stars—becoming living mandalas. Each person holds focused intention while moving in synchronized harmony. The vibration of the group's collective intent is amplified by the geometric structure, creating a coherent field that extends beyond the individual participants.\n\nThis is vibrational healing at the collective scale: the group becomes both transmitter and receiver, broadcasting coherence into the surrounding field. Humandalas demonstrate that we are not isolated—our internal state ripples outward, and when we align together with shared intention, we become powerful instruments of transformation."
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

// Science concept details for modals
const SCIENCE_CONCEPTS = {
  biofield: {
    title: 'Sound as Consciousness',
    subtitle: 'The Human Biofield',
    description: `Sound is not just a physical wave—it is a carrier of information and consciousness. When we speak, sing, or play an instrument with intention, we are literally imprinting our consciousness onto air molecules, sending both a physical and energetic signal into the world.

The Human Biofield is the electromagnetic field that surrounds and interpenetrates the physical body. This field is not static—it responds to thoughts, emotions, and external vibrations. Sound waves interact directly with this field, creating ripples that can either harmonize or disrupt its coherence.

Research in biofield science suggests that intentional sound can:
• Restructure the geometric patterns of the biofield
• Clear energetic blockages and stagnation
• Restore natural oscillation rhythms
• Facilitate information transfer between cells

When a healer uses sound with focused intention, they are essentially "broadcasting" a coherent signal that the recipient's biofield can entrain to—like tuning a radio to a clearer station.`
  },
  vagusNerve: {
    title: "The Vagus Nerve",
    subtitle: "Your Body's Master Reset Switch",
    description: `The Vagus Nerve is the longest cranial nerve in your body, wandering from your brainstem through your neck, heart, lungs, and into your gut. Its name comes from the Latin word for "wandering" (the same root as "vagabond"). This nerve is the primary communication highway of your parasympathetic nervous system—the "rest and digest" state.

When the vagus nerve is activated (high "vagal tone"), your body shifts out of the fight-or-flight stress response and into a state of calm, safety, and social connection. Heart rate slows, breathing deepens, digestion improves, and the immune system strengthens.

Sound healing directly stimulates the vagus nerve through several mechanisms:

• **Humming & Chanting**: The vibrations from your own voice physically massage the vagus nerve as it passes through your throat
• **Low Frequencies**: Deep tones (like didgeridoo, gongs, or bass singing bowls) stimulate vagal afferents in the gut
• **Rhythmic Breathing**: Slow, rhythmic breathing patterns entrain the vagus nerve's natural oscillation
• **Social Engagement**: Group sound experiences activate the "ventral vagal" state of safety and connection

The Polyvagal Theory (Dr. Stephen Porges) reveals that we have three states:
1. **Dorsal Vagal** (shutdown, freeze, depression)
2. **Sympathetic** (fight-or-flight, anxiety, hypervigilance)
3. **Ventral Vagal** (safety, social connection, calm alertness)

Sound healing is one of the most effective tools for shifting from states 1 or 2 into the ventral vagal state of wellbeing. When we entrain to coherent sound, we literally "tune" our nervous system into harmony.`
  },
  waterCrystals: {
    title: "Dr. Emoto's Water Crystal Experiments",
    subtitle: "Intention Made Visible",
    description: `In the 1990s, Japanese researcher Dr. Masaru Emoto conducted groundbreaking experiments that would challenge our understanding of consciousness and matter. By exposing water to words, music, prayers, and intentions before freezing it, he discovered that the resulting ice crystals formed dramatically different geometric patterns depending on the emotional quality of the exposure.

Water exposed to words like "Love," "Gratitude," and "Thank You" formed intricate, symmetrical, beautiful crystalline structures reminiscent of snowflakes. In contrast, water exposed to negative words like "Hate," "Fear," or "You Disgust Me" formed chaotic, fragmented, asymmetrical patterns with muddy coloration.

These experiments suggest something profound: consciousness directly influences the structure of matter. Since the human body is approximately 60-70% water, the implications are staggering. Every thought we think, every word we speak, every intention we hold may be literally reshaping the molecular structure of our own bodies.

When we engage in sound healing with positive intention, we are not just creating pleasant experiences—we may be restructuring the water molecules within our cells into more coherent, harmonious patterns. This provides a visual, scientific framework for understanding how "vibration carries consciousness."

The crystal photographs serve as a bridge between the seen and unseen, making the invisible effects of intention tangible and undeniable.`
  },
  coherence: {
    title: 'From Chaos to Calm',
    subtitle: 'The Science of Entrainment',
    description: `Chaos is a state of physiological and energetic incoherence—jagged, irregular rhythms in the heart, brain, and nervous system. When we're in chaos, our heart rate variability becomes erratic, our brainwaves scatter, and our energy field becomes fragmented.

Sound healing works through a principle called "Entrainment"—the tendency of oscillating systems to synchronize. When a strong, coherent vibration (like a drum beat, singing bowl, or steady chant) enters the field of a chaotic system, the weaker oscillations naturally begin to align with the stronger one.

The transformation looks like this:
• CHAOS: Scattered thoughts, racing heart, shallow breath, fragmented biofield
• ENTRAINMENT: External coherent sound penetrates the field
• SYNCHRONIZATION: Internal rhythms begin matching the external pattern
• CALM: Unified heartbeat, synchronized brainwaves, peaceful breath, integrated field

This isn't metaphor—it's physics. The same principle that causes grandfather clocks on the same wall to eventually swing in unison causes your nervous system to synchronize with coherent sound vibrations.

The result: chaos dissolves, replaced by a felt sense of calm, presence, and wholeness.`
  }
};

// Science navigation order
const SCIENCE_ORDER: Array<keyof typeof SCIENCE_CONCEPTS> = ['biofield', 'vagusNerve', 'waterCrystals', 'coherence'];

export default function UnifiedLanding() {
  const { playVoice, stopVoice, resumeContext, isReady, setZone } = useSound();
  const [icons, setIcons] = useState<Record<string, string>>({});
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedLineage, setSelectedLineage] = useState<string | null>(null);
  const [selectedScience, setSelectedScience] = useState<keyof typeof SCIENCE_CONCEPTS | null>(null);
  const [activeZone, setActiveZone] = useState<'chaos' | 'transformation' | 'calm'>('transformation');
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  // Science navigation handlers
  const handleScienceNext = () => {
    if (!selectedScience) return;
    const currentIndex = SCIENCE_ORDER.indexOf(selectedScience);
    const nextIndex = (currentIndex + 1) % SCIENCE_ORDER.length;
    setSelectedScience(SCIENCE_ORDER[nextIndex]);
  };

  const handleSciencePrev = () => {
    if (!selectedScience) return;
    const currentIndex = SCIENCE_ORDER.indexOf(selectedScience);
    const prevIndex = (currentIndex - 1 + SCIENCE_ORDER.length) % SCIENCE_ORDER.length;
    setSelectedScience(SCIENCE_ORDER[prevIndex]);
  };

  // Keyboard navigation for science modals
  useEffect(() => {
    if (!selectedScience) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedScience(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = SCIENCE_ORDER.indexOf(selectedScience);
        const nextIndex = (currentIndex + 1) % SCIENCE_ORDER.length;
        setSelectedScience(SCIENCE_ORDER[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = SCIENCE_ORDER.indexOf(selectedScience);
        const prevIndex = (currentIndex - 1 + SCIENCE_ORDER.length) % SCIENCE_ORDER.length;
        setSelectedScience(SCIENCE_ORDER[prevIndex]);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedScience]);

  const handleZoneChange = (zone: 'chaos' | 'transformation' | 'calm') => {
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
    <div className="w-full h-screen relative overflow-hidden font-sans text-white selection:bg-teal-500/30">
       
       {/* Full-screen Unified Background */}
       <div className="absolute inset-0">
         <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
         <div 
           className="absolute inset-0"
           style={{
             background: 'linear-gradient(90deg, rgba(139,92,246,0.2) 0%, rgba(45,212,191,0.15) 50%, rgba(251,191,36,0.2) 100%)'
           }}
         />
         
         {/* Radial glows for each zone */}
         <div className="absolute inset-0" style={{
           background: 'radial-gradient(ellipse 50% 80% at 15% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 50% 50%, rgba(45, 212, 191, 0.12) 0%, transparent 50%), radial-gradient(ellipse 50% 80% at 85% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)'
         }} />

         {/* Subtle flowing wave */}
         <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
           <defs>
             <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
               <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.4" />
               <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.5" />
             </linearGradient>
           </defs>
           <motion.path
             d="M-100,50% Q25%,40% 50%,50% T100%,50% T150%,50%"
             fill="none"
             stroke="url(#flowGradient1)"
             strokeWidth="100"
             initial={{ x: 0 }}
             animate={{ x: [-200, 0, -200] }}
             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             style={{ filter: 'blur(60px)' }}
           />
         </svg>

         {/* Floating particles across entire screen */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {[...Array(25)].map((_, i) => {
             const xPos = (i / 25) * 100;
             const color = xPos < 30 
               ? 'rgba(139,92,246,0.5)' 
               : xPos < 70 
                 ? 'rgba(45,212,191,0.5)' 
                 : 'rgba(251,191,36,0.5)';
             return (
               <motion.div
                 key={`particle-${i}`}
                 className="absolute w-1 h-1 rounded-full"
                 style={{
                   left: `${xPos}%`,
                   top: `${20 + Math.random() * 60}%`,
                   backgroundColor: color,
                   boxShadow: `0 0 8px ${color}`,
                 }}
                 animate={{
                   y: [0, -20, 0],
                   opacity: [0.2, 0.6, 0.2],
                 }}
                 transition={{
                   duration: 5 + Math.random() * 4,
                   repeat: Infinity,
                   delay: Math.random() * 3,
                 }}
               />
             );
           })}
         </div>
       </div>

       {/* UNIFIED SINGLE-SCREEN LAYOUT */}
       <div className="relative z-10 h-full">
         
         {/* Floating Header - Absolute positioned at top */}
         <div className="absolute top-0 left-0 right-0 z-20 py-2 px-4">
           <div className="flex flex-col items-center">
             {/* Main Title */}
             <motion.h1 
               className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-center drop-shadow-lg mb-1"
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
             >
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400">
                 Vibrational Healing Portal
               </span>
             </motion.h1>
             
             {/* Subtitle */}
             <motion.h2 
               className="text-sm sm:text-base lg:text-lg font-semibold tracking-tight text-center drop-shadow-md"
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
             >
               <span className="text-slate-300">Transform </span>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-teal-400 to-amber-400">
                 Chaos into Calm
               </span>
             </motion.h2>

             {/* Info Cards - Inline */}
             <div className="flex justify-center gap-1 mt-1.5 flex-wrap">
               {INFO_CARDS.map((card, i) => (
                 <motion.button
                   key={card.id}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.2 + i * 0.05 }}
                   onClick={() => setActiveInfo(activeInfo === card.id ? null : card.id)}
                   className={`px-2 py-0.5 rounded-full border text-[9px] flex items-center gap-1 transition-all backdrop-blur-md shadow-lg ${
                     activeInfo === card.id 
                       ? `bg-gradient-to-r ${getInfoColor(card.color)}` 
                       : 'bg-slate-900/60 border-white/20 text-white/70 hover:bg-slate-800/80 hover:text-white'
                   }`}
                 >
                   {card.icon}
                   <span className="hidden sm:inline">{card.title}</span>
                   <span className="sm:hidden">{card.title.split(' ')[0]}</span>
                 </motion.button>
               ))}
             </div>

             {/* Mobile CHAOS and CALM Zones - Under header, far left and right */}
             <div className="lg:hidden flex justify-between items-start mt-3 px-2 w-full">
               {/* Mobile CHAOS Zone - Far Left */}
               <motion.div 
                 className="relative cursor-pointer flex-shrink-0"
                 onMouseEnter={() => handleZoneChange('chaos')}
                 onClick={() => resumeContext()}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.4 }}
               >
                 {/* Background for zone */}
                 <div className="absolute inset-0 -inset-x-2 rounded-2xl overflow-hidden" style={{ mask: 'linear-gradient(90deg, black 0%, black 70%, transparent 100%)', WebkitMask: 'linear-gradient(90deg, black 0%, black 70%, transparent 100%)' }}>
                   <ChaosBackground />
                 </div>
                 <div className="absolute inset-0 -inset-x-2 rounded-2xl" style={{ background: 'linear-gradient(90deg, transparent 20%, rgba(15,23,42,0.95) 100%)' }} />
                 
                 {/* Zone Content */}
                 <div className="relative z-10 text-center px-3 py-2.5">
                   <motion.div 
                     className="mb-1.5 inline-flex p-1.5 rounded-full bg-slate-900/70 border border-purple-500/30 shadow-[0_0_30px_rgba(139,92,246,0.25)] relative w-10 h-10 items-center justify-center overflow-hidden"
                     animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0.2)", "0 0 40px rgba(139,92,246,0.35)", "0 0 20px rgba(139,92,246,0.2)"] }}
                     transition={{ duration: 2, repeat: Infinity }}
                   >
                     <Image src="/generated/images/methods/icon-chaos.png" alt="Chaos" fill className="object-cover opacity-80" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                     <CloudLightning className="w-5 h-5 text-purple-400" />
                   </motion.div>
                   <h2 className="text-sm font-bold text-white tracking-tight">CHAOS</h2>
                   <p className="text-[8px] text-purple-300/60 uppercase tracking-wider mt-0.5">Starting</p>
                 </div>
               </motion.div>

               {/* Mobile CALM Zone - Far Right */}
               <motion.div 
                 className="relative cursor-pointer flex-shrink-0"
                 onMouseEnter={() => handleZoneChange('calm')}
                 onClick={() => resumeContext()}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.5 }}
               >
                 {/* Background for zone */}
                 <div className="absolute inset-0 -inset-x-2 rounded-2xl overflow-hidden" style={{ mask: 'linear-gradient(90deg, transparent 0%, black 30%, black 100%)', WebkitMask: 'linear-gradient(90deg, transparent 0%, black 30%, black 100%)' }}>
                   <CalmBackground />
                 </div>
                 <div className="absolute inset-0 -inset-x-2 rounded-2xl" style={{ background: 'linear-gradient(90deg, rgba(15,23,42,0.95) 0%, transparent 80%)' }} />
                 
                 {/* Zone Content */}
                 <div className="relative z-10 text-center px-3 py-2.5">
                   <motion.div 
                     className="mb-1.5 inline-flex p-1.5 rounded-full bg-slate-900/60 border border-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.25)] relative w-10 h-10 items-center justify-center overflow-hidden"
                     animate={{ boxShadow: ["0 0 25px rgba(251,191,36,0.2)", "0 0 45px rgba(251,191,36,0.3)", "0 0 25px rgba(251,191,36,0.2)"] }}
                     transition={{ duration: 3, repeat: Infinity }}
                   >
                     <Image src="/generated/images/methods/icon-calm.png" alt="Calm" fill className="object-cover opacity-80" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                     <Sun className="w-5 h-5 text-amber-300" />
                   </motion.div>
                   <h2 className="text-sm font-bold text-white tracking-tight">CALM</h2>
                   <p className="text-[8px] text-amber-300/60 uppercase tracking-wider mt-0.5">The Result</p>
                 </div>
               </motion.div>
             </div>
           </div>
         </div>

         {/* Expanded Info Panel - Overlay */}
         <AnimatePresence>
           {activeInfo && (
             <motion.div
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="absolute top-16 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4"
             >
               {INFO_CARDS.filter(c => c.id === activeInfo).map(card => (
                 <div 
                   key={card.id}
                   className={`relative p-4 rounded-xl border backdrop-blur-xl bg-gradient-to-br ${getInfoColor(card.color)} shadow-2xl`}
                 >
                   <button 
                     onClick={() => setActiveInfo(null)}
                     className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20"
                   >
                     <X className="w-3 h-3" />
                   </button>
                   <div className="flex items-start gap-3 pr-6">
                     <div className="p-2 rounded-lg bg-black/30 shrink-0">
                       {card.icon}
                     </div>
                     <div>
                       <h3 className="font-bold text-white text-sm">{card.subtitle}</h3>
                       <p className="text-xs text-white/80 mt-1 leading-relaxed">{card.description}</p>
                     </div>
                   </div>
                 </div>
               ))}
             </motion.div>
           )}
         </AnimatePresence>

       {/* Main Content Area - Full height with padding for header */}
       <div className="h-full pt-32 lg:pt-14 pb-8 grid grid-cols-1 lg:grid-cols-[180px_1fr_180px] relative">
          
         {/* Left Column: CHAOS Zone - Only on Desktop */}
          <div className="max-lg:hidden relative flex flex-col overflow-hidden h-full">
            {/* CHAOS Zone Container - Full Height */}
            <motion.div 
              className="relative cursor-pointer h-full flex flex-col items-center justify-center"
              onMouseEnter={() => handleZoneChange('chaos')}
              onClick={() => resumeContext()}
            >
              {/* Background for zone - Full Height */}
              <div className="absolute inset-0 -inset-x-8 lg:-inset-x-16 overflow-hidden" style={{ mask: 'linear-gradient(90deg, black 0%, black 60%, transparent 100%)', WebkitMask: 'linear-gradient(90deg, black 0%, black 60%, transparent 100%)' }}>
                <ChaosBackground />
              </div>
              <div className="absolute inset-0 -inset-x-8 lg:-inset-x-16" style={{ background: 'linear-gradient(90deg, transparent 30%, rgba(15,23,42,0.95) 100%)' }} />
              
              {/* Zone Content */}
              <div className="relative z-10 text-center px-6 py-4 lg:py-6">
                <motion.div 
                  className="mb-2 inline-flex p-2 lg:p-3 rounded-full bg-slate-900/70 border border-purple-500/30 shadow-[0_0_30px_rgba(139,92,246,0.25)] relative w-12 h-12 lg:w-16 lg:h-16 items-center justify-center overflow-hidden"
                  animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0.2)", "0 0 40px rgba(139,92,246,0.35)", "0 0 20px rgba(139,92,246,0.2)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Image src="/generated/images/methods/icon-chaos.png" alt="Chaos" fill className="object-cover opacity-80" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                  <CloudLightning className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
                </motion.div>
                <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">CHAOS</h2>
                <p className="text-[10px] text-purple-300/60 uppercase tracking-wider mt-1">Starting Point</p>
              </div>
            </motion.div>
          </div>

          {/* Center Zone: TRANSFORMATION + Wheel + Lineages */}
          <motion.div 
            className="relative flex flex-col items-center justify-start lg:justify-center overflow-visible lg:overflow-hidden lg:col-start-2 pt-4 lg:pt-0"
            onMouseEnter={() => handleZoneChange('transformation')}
          >
             {/* Background */}
             <div className="absolute inset-0 lg:-inset-x-12" style={{ mask: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)', WebkitMask: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
               <TransformationBackground />
             </div>
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(45, 212, 191, 0.2) 0%, transparent 70%)' }} />
             
           {/* Method Wheel with Science Diagrams flanking it */}
           <div className="relative z-10 flex flex-col items-center justify-center">
             {/* Methods Label - Positioned directly above wheel */}
             <div className="flex items-center justify-center gap-1 -mb-4 lg:-mb-5">
               <Sparkles className="w-3 h-3 text-teal-400/70" />
               <span className="text-[8px] font-bold tracking-[0.15em] text-teal-300/60 uppercase">Methods</span>
             </div>
             {/* Wheel and Science Diagrams Row */}
             <div className="flex items-center justify-center gap-2 lg:gap-4">
              {/* Left Science Diagrams - Biofield & Vagus */}
              <div className="hidden lg:flex flex-col gap-3 items-center">
                <motion.button 
                  onClick={(e) => { e.stopPropagation(); setSelectedScience('biofield'); }}
                  className="group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="relative w-16 h-16 mx-auto rounded-full bg-teal-900/30 border border-teal-500/30 group-hover:border-teal-500/60 group-hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transition-all overflow-hidden">
                    <BiofieldDiagram />
                  </div>
                  <p className="text-[8px] text-teal-400/70 mt-1 group-hover:text-teal-300 transition-colors">Biofield</p>
                </motion.button>

                <motion.button 
                  onClick={(e) => { e.stopPropagation(); setSelectedScience('vagusNerve'); }}
                  className="group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="relative w-14 h-14 mx-auto rounded-xl bg-rose-900/30 border border-rose-500/30 group-hover:border-rose-500/60 group-hover:shadow-[0_0_25px_rgba(244,63,94,0.4)] transition-all overflow-hidden">
                    <NervousSystemDiagram />
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-rose-400/40"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <p className="text-[8px] text-rose-400/70 mt-1 group-hover:text-rose-300 transition-colors flex items-center justify-center gap-0.5">
                    <Activity className="w-2 h-2" />
                    Vagus
                  </p>
                </motion.button>
              </div>

              {/* Method Wheel */}
              <div className="relative scale-[0.70] sm:scale-[0.80] lg:scale-[0.85] xl:scale-[0.95] origin-center">
                <MethodWheel onMethodSelect={handleMethodSelect} icons={icons} />
                
                {/* Water Crystal Snowflake Icon - Positioned top-right of wheel (Desktop only) */}
                <motion.button
                  onClick={(e) => { e.stopPropagation(); setSelectedScience('waterCrystals'); }}
                  className="hidden lg:block absolute -top-4 -right-4 lg:-top-8 lg:-right-8 z-20 group"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative w-14 h-14 lg:w-16 lg:h-16 p-2 lg:p-3 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all">
                    <SnowflakeDiagram />
                  </div>
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-cyan-400/70 whitespace-nowrap group-hover:text-cyan-300 transition-colors">
                    Water Crystals
                  </span>
                </motion.button>
              </div>

              {/* Right Science Diagram - Coherence */}
              <div className="hidden lg:flex flex-col gap-3 items-center">
                <motion.button 
                  onClick={(e) => { e.stopPropagation(); setSelectedScience('coherence'); }}
                  className="group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="relative w-24 h-16 mx-auto rounded-xl bg-amber-900/30 border border-amber-500/30 group-hover:border-amber-500/60 group-hover:shadow-[0_0_25px_rgba(251,191,36,0.4)] transition-all overflow-hidden">
                    <CoherenceDiagram />
                  </div>
                  <p className="text-[8px] text-amber-400/70 mt-1 group-hover:text-amber-300 transition-colors">Chaos → Coherence</p>
                </motion.button>
              </div>
             </div>
            </div>

            {/* Mobile Science Icons Row - Only visible on mobile */}
            <div className="lg:hidden relative z-10 mt-0.5">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Brain className="w-3 h-3 text-teal-400/70" />
                <span className="text-[8px] font-bold tracking-[0.15em] text-teal-300/60 uppercase">Science</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <motion.button 
                  onClick={(e) => { e.stopPropagation(); setSelectedScience('biofield'); }}
                  className="group flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative w-10 h-10 rounded-full bg-teal-900/40 border border-teal-500/40 group-hover:border-teal-500/70 transition-all overflow-hidden">
                    <BiofieldDiagram />
                  </div>
                  <p className="text-[7px] text-teal-400/70 mt-0.5">Biofield</p>
                </motion.button>

                <motion.button 
                  onClick={(e) => { e.stopPropagation(); setSelectedScience('vagusNerve'); }}
                  className="group flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="relative w-10 h-10 rounded-lg bg-rose-900/40 border border-rose-500/40 group-hover:border-rose-500/70 transition-all overflow-hidden">
                    <NervousSystemDiagram />
                  </div>
                  <p className="text-[7px] text-rose-400/70 mt-0.5 flex items-center gap-0.5">
                    <Activity className="w-2 h-2" />
                    Vagus
                  </p>
                </motion.button>

                <motion.button 
                  onClick={(e) => { e.stopPropagation(); setSelectedScience('waterCrystals'); }}
                  className="group flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="relative w-10 h-10 rounded-full bg-cyan-900/40 border border-cyan-500/40 group-hover:border-cyan-500/70 transition-all overflow-hidden flex items-center justify-center p-1">
                    <SnowflakeDiagram />
                  </div>
                  <p className="text-[7px] text-cyan-400/70 mt-0.5">Water</p>
                </motion.button>

                <motion.button 
                  onClick={(e) => { e.stopPropagation(); setSelectedScience('coherence'); }}
                  className="group flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="relative w-14 h-10 rounded-lg bg-amber-900/40 border border-amber-500/40 group-hover:border-amber-500/70 transition-all overflow-hidden">
                    <CoherenceDiagram />
                  </div>
                  <p className="text-[7px] text-amber-400/70 mt-0.5">Coherence</p>
                </motion.button>
              </div>
            </div>
             
             {/* Lineages Row - Compact, integrated below wheel */}
             <div className="relative z-10 mt-2 lg:mt-4 w-full px-1 sm:px-2">
               <div className="flex items-center justify-center gap-1 mb-2">
                 <BookOpen className="w-3 h-3 text-teal-400/70" />
                 <span className="text-[8px] font-bold tracking-[0.15em] text-teal-300/60 uppercase">Lineages</span>
               </div>
               <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 w-full min-w-0">
                 {LINEAGE_CONTENT.map((lineageItem, i) => (
                   <motion.button
                     key={lineageItem.id}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.3 + i * 0.03 }}
                     onClick={() => setSelectedLineage(lineageItem.id)}
                     className="group relative flex flex-col items-center p-1 sm:p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-teal-500/30 transition-all flex-shrink-0"
                   >
                     <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/10 group-hover:border-teal-500/40">
                       <Image src={`/generated/images/methods/lineage-${lineageItem.id}.png`} alt={lineageItem.title} fill className="object-cover group-hover:scale-110 transition-transform" />
                     </div>
                     <span className="text-[6px] sm:text-[7px] text-white/40 group-hover:text-teal-300 transition-colors mt-0.5 sm:mt-1 max-w-[45px] sm:max-w-[50px] truncate">
                       {lineageItem.title.split(' ')[0]}
                     </span>
                   </motion.button>
                 ))}
               </div>
             </div>
           </motion.div>

          {/* Right Column: CALM Zone - Only on Desktop */}
          <div className="max-lg:hidden relative flex flex-col overflow-hidden h-full">
            {/* CALM Zone Container - Full Height */}
            <motion.div 
              className="relative cursor-pointer h-full flex flex-col items-center justify-center"
              onMouseEnter={() => handleZoneChange('calm')}
              onClick={() => resumeContext()}
            >
              {/* Background for zone - Full Height */}
              <div className="absolute inset-0 -inset-x-8 lg:-inset-x-16 overflow-hidden" style={{ mask: 'linear-gradient(90deg, transparent 0%, black 40%, black 100%)', WebkitMask: 'linear-gradient(90deg, transparent 0%, black 40%, black 100%)' }}>
                <CalmBackground />
              </div>
              <div className="absolute inset-0 -inset-x-8 lg:-inset-x-16" style={{ background: 'linear-gradient(90deg, rgba(15,23,42,0.95) 0%, transparent 70%)' }} />
              
              {/* Zone Content */}
              <div className="relative z-10 text-center px-6 py-4 lg:py-6">
                <motion.div 
                  className="mb-2 inline-flex p-2 lg:p-3 rounded-full bg-slate-900/60 border border-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.25)] relative w-12 h-12 lg:w-16 lg:h-16 items-center justify-center overflow-hidden"
                  animate={{ boxShadow: ["0 0 25px rgba(251,191,36,0.2)", "0 0 45px rgba(251,191,36,0.3)", "0 0 25px rgba(251,191,36,0.2)"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Image src="/generated/images/methods/icon-calm.png" alt="Calm" fill className="object-cover opacity-80" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                  <Sun className="w-6 h-6 lg:w-8 lg:h-8 text-amber-300" />
                </motion.div>
                <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">CALM</h2>
                <p className="text-[10px] text-amber-300/60 uppercase tracking-wider mt-1">The Result</p>
              </div>
            </motion.div>
          </div>
         </div>

         {/* Bottom Journey Indicator - Minimal */}
         <div className="flex-shrink-0 pb-2 pt-1 flex justify-center">
           <div className="flex items-center gap-3">
             <div className="relative w-32 lg:w-48 h-0.5 rounded-full overflow-hidden bg-white/10">
               <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #8b5cf6 0%, #2dd4bf 50%, #fbbf24 100%)' }} />
               <motion.div
                 className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-lg"
                 style={{ boxShadow: activeZone === 'chaos' ? '0 0 15px rgba(139,92,246,0.8)' : activeZone === 'transformation' ? '0 0 15px rgba(45,212,191,0.8)' : '0 0 15px rgba(251,191,36,0.8)' }}
                 animate={{ left: activeZone === 'chaos' ? '0%' : activeZone === 'transformation' ? '50%' : '100%', x: activeZone === 'chaos' ? '0%' : activeZone === 'transformation' ? '-50%' : '-100%' }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
               />
             </div>
             <span className="text-[9px] text-white/30 tracking-wider uppercase w-20">
               {activeZone === 'chaos' ? 'Starting' : activeZone === 'transformation' ? 'Transforming' : 'Arriving'}
             </span>
           </div>
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

       {/* Science Concept Modal (Biofield & Coherence) */}
       <AnimatePresence>
         {selectedScience && (selectedScience === 'biofield' || selectedScience === 'coherence') && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setSelectedScience(null)}
             className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 lg:p-12"
           >
             <motion.div
               initial={{ scale: 0.9, opacity: 0, y: 50 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 50 }}
               transition={{ type: "spring", duration: 0.6 }}
               onClick={(e) => e.stopPropagation()}
               className={`relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl border shadow-2xl group ${
                 selectedScience === 'biofield' 
                   ? 'bg-gradient-to-br from-slate-900 via-teal-950/50 to-slate-900 border-teal-500/30' 
                   : 'bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900 border-amber-500/30'
               }`}
             >
               {/* Navigation Arrows */}
               <button
                 onClick={(e) => { e.stopPropagation(); handleSciencePrev(); }}
                 className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/60 hover:bg-teal-500/80 text-white/60 hover:text-white transition-all opacity-70 lg:opacity-0 lg:group-hover:opacity-100"
                 title="Previous (←)"
               >
                 <ChevronLeft size={32} />
               </button>
               <button
                 onClick={(e) => { e.stopPropagation(); handleScienceNext(); }}
                 className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/60 hover:bg-teal-500/80 text-white/60 hover:text-white transition-all opacity-70 lg:opacity-0 lg:group-hover:opacity-100"
                 title="Next (→)"
               >
                 <ChevronRight size={32} />
               </button>

               {/* Close Button */}
               <button 
                 onClick={() => setSelectedScience(null)}
                 className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-all"
               >
                 <X size={24} />
               </button>

               <div className="p-8 lg:p-12 overflow-y-auto max-h-[85vh]">
                 {/* Header */}
                 <div className="flex items-start gap-6 mb-8">
                   <div className={`w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden flex-shrink-0 ${
                     selectedScience === 'biofield' 
                       ? 'bg-teal-500/20 border border-teal-500/30' 
                       : 'bg-amber-500/20 border border-amber-500/30'
                   }`}>
                     {selectedScience === 'biofield' ? (
                       <BiofieldDiagram />
                     ) : (
                       <CoherenceDiagram />
                     )}
                   </div>
                   <div>
                     <span className={`text-xs uppercase tracking-widest ${
                       selectedScience === 'biofield' ? 'text-teal-400' : 'text-amber-400'
                     }`}>
                       {SCIENCE_CONCEPTS[selectedScience].subtitle}
                     </span>
                     <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2">
                       {SCIENCE_CONCEPTS[selectedScience].title}
                     </h2>
                   </div>
                 </div>

                 {/* Divider */}
                 <div className={`w-32 h-1 rounded-full mb-8 ${
                   selectedScience === 'biofield' ? 'bg-teal-500' : 'bg-amber-500'
                 }`} />

                 {/* Content */}
                 <div className="prose prose-invert prose-lg max-w-none">
                   {SCIENCE_CONCEPTS[selectedScience].description.split('\n\n').map((paragraph, i) => (
                     <p key={i} className="text-slate-300 leading-relaxed mb-4 whitespace-pre-line">
                       {paragraph}
                     </p>
                   ))}
                 </div>

               </div>
             </motion.div>
           </motion.div>
         )}
      </AnimatePresence>

      {/* Water Crystal Modal */}
      <AnimatePresence>
        {selectedScience === 'waterCrystals' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedScience(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 lg:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.6 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-2xl lg:rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-900 border border-cyan-500/30 shadow-[0_0_60px_rgba(34,211,238,0.2)]"
            >
              {/* Navigation Arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); handleSciencePrev(); }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-4 rounded-full bg-black/60 hover:bg-cyan-500/80 text-white/60 hover:text-white transition-all opacity-70"
                title="Previous (←)"
              >
                <ChevronLeft size={20} className="sm:w-8 sm:h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleScienceNext(); }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-4 rounded-full bg-black/60 hover:bg-cyan-500/80 text-white/60 hover:text-white transition-all opacity-70"
                title="Next (→)"
              >
                <ChevronRight size={20} className="sm:w-8 sm:h-8" />
              </button>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedScience(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-all"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>

              <div className="p-4 sm:p-6 lg:p-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center p-2">
                    <SnowflakeDiagram />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-cyan-400">
                      {WATER_CRYSTAL_CONTENT.subtitle}
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2">
                      {WATER_CRYSTAL_CONTENT.title}
                    </h2>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-24 sm:w-32 h-1 rounded-full mb-6 sm:mb-8 bg-gradient-to-r from-cyan-500 to-blue-500" />

                {/* Crystal Gallery */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {WATER_CRYSTAL_CONTENT.crystals.map((crystal, i) => (
                    <motion.div
                      key={crystal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="group relative"
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group-hover:border-cyan-500/50 transition-all">
                        <Image 
                          src={`/generated/images/methods/${crystal.image}`} 
                          alt={crystal.word}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                          <h4 className="text-xs sm:text-sm font-bold text-white">{crystal.word}</h4>
                        </div>
                      </div>
                      <p className="hidden lg:block text-[10px] text-slate-400 mt-2 leading-relaxed">{crystal.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Description */}
                <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
                  {WATER_CRYSTAL_CONTENT.description.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-slate-300 leading-relaxed mb-3 sm:mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vagus Nerve Modal */}
      <AnimatePresence>
        {selectedScience === 'vagusNerve' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedScience(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 lg:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.6 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-2xl lg:rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/30 to-slate-900 border border-rose-500/30 shadow-[0_0_60px_rgba(244,63,94,0.2)]"
            >
              {/* Navigation Arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); handleSciencePrev(); }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-4 rounded-full bg-black/60 hover:bg-rose-500/80 text-white/60 hover:text-white transition-all opacity-70"
                title="Previous (←)"
              >
                <ChevronLeft size={20} className="sm:w-8 sm:h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleScienceNext(); }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-4 rounded-full bg-black/60 hover:bg-rose-500/80 text-white/60 hover:text-white transition-all opacity-70"
                title="Next (→)"
              >
                <ChevronRight size={20} className="sm:w-8 sm:h-8" />
              </button>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedScience(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-all"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>

              <div className="p-4 sm:p-6 lg:p-10">
                {/* Header with Vagus Nerve Image */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-6 sm:mb-8">
                  <div className="lg:w-1/3">
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-rose-500/30 bg-rose-900/20">
                      <Image 
                        src="/generated/images/methods/vagus-nerve.png" 
                        alt="Vagus Nerve Pathway"
                        fill
                        className="object-cover"
                      />
                      {/* Animated pulse overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-transparent to-rose-500/10"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </div>
                  
                  <div className="lg:w-2/3">
                    <span className="text-xs uppercase tracking-widest text-rose-400">
                      {VAGUS_NERVE_CONTENT.subtitle}
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 mb-4">
                      {VAGUS_NERVE_CONTENT.title}
                    </h2>
                    
                    {/* Key Points Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {VAGUS_NERVE_CONTENT.keyPoints.map((point, i) => (
                        <motion.div
                          key={point.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="p-3 sm:p-4 rounded-xl bg-rose-900/20 border border-rose-500/20"
                        >
                          <h4 className="text-sm font-bold text-rose-300 mb-1">{point.title}</h4>
                          <p className="text-xs text-slate-400">{point.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-24 sm:w-32 h-1 rounded-full mb-6 sm:mb-8 bg-gradient-to-r from-rose-500 to-pink-500" />

                {/* Full Description */}
                <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
                  {VAGUS_NERVE_CONTENT.description.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-slate-300 leading-relaxed mb-3 sm:mb-4 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start Overlay */}
      {!isReady && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-500 px-4 py-8">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="text-center text-white p-8 md:p-12 max-w-lg w-full"
           >
             <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-teal-300 to-amber-300 bg-clip-text text-transparent leading-tight">
                 Chaos into Calm
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

