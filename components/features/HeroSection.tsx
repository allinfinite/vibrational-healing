'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, Sparkles, ChevronRight, Zap, Globe, Music } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const CONCEPT_CARDS = [
    {
      title: "Core Concept",
      subtitle: "Vibration Carries Consciousness",
      iconId: "icon-anxiety", // Keeping structure, can update icon later
      fallbackIcon: <Zap className="w-6 h-6 text-purple-400" />,
      desc: "Everything is vibration. Sound is not just audible; it is a carrier wave for intent. Healing intent in sound transmits energy that modulates the biofield.",
      color: "border-purple-500/30 bg-purple-900/20"
    },
    {
      title: "The Mechanism",
      subtitle: "Acoustic Biofield Modulation",
      iconId: "tuning-fork", 
      fallbackIcon: <Music className="w-6 h-6 text-teal-400" />,
      desc: "Vibrational Tuning acts as a reset button. Specific frequencies entrain the body's rhythms, shifting the nervous system from chaos into coherence.",
      color: "border-teal-500/30 bg-teal-900/20"
    },
    {
      title: "The Result",
      subtitle: "The Ripple Effect",
      iconId: "icon-peace",
      fallbackIcon: <Globe className="w-6 h-6 text-amber-400" />,
      desc: "When you stabilize your own vibration, you passively radiate peace. This 'Sound Ripple Effect' heals the external world simply by you being present.",
      color: "border-amber-500/30 bg-amber-900/20"
    }
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950">
      
      {/* 1. Epic Background Image (Parallax) */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/generated/images/hero-landing-epic.png"
          alt="Anxiety into Peace Journey"
          fill
          className={`object-cover transition-opacity duration-1000 ${isImageLoaded ? 'opacity-60' : 'opacity-0'}`}
          priority
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.includes('hero-landing-epic')) {
                  target.src = '/generated/images/hero-landing.svg';
              }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950" />
      </motion.div>

      {/* 2. Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-20 lg:py-32 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
        
        {/* Left Side: Title & Intro */}
        <motion.div 
          style={{ opacity }}
          className="max-w-2xl space-y-8 pt-12 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 backdrop-blur-md mx-auto lg:mx-0"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold tracking-[0.2em] text-teal-300 uppercase">
              Sound & Energy Healing Visualized
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-[1.1]"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
              Anxiety Into
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-200">
              Peace.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-300 leading-relaxed font-light"
          >
            Experience the science of Acoustic Biofield Modulation.
            Learn how sound frequencies carry intent to restore coherence
            and heal from the inside out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
          >
            <button
              onClick={onExplore}
              className="group relative px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-full font-bold tracking-wide transition-all hover:scale-105 shadow-[0_0_40px_rgba(20,184,166,0.3)] flex items-center"
            >
              <span>Begin Journey</span>
              <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side: Educational Cards */}
        <div className="w-full max-w-lg space-y-4 perspective-1000">
          {CONCEPT_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (i * 0.15), duration: 0.6 }}
              className={`p-6 rounded-2xl border backdrop-blur-xl transition-all hover:scale-[1.02] ${card.color}`}
            >
              <div className="flex items-start space-x-4">
                <div className="relative w-12 h-12 rounded-lg bg-black/40 shrink-0 overflow-hidden border border-white/10">
                  <Image
                    src={`/generated/images/methods/${card.iconId}.png`}
                    alt={card.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                        // Fallback to icon if image fails
                        const target = e.target as HTMLElement;
                        target.style.opacity = '0';
                    }}
                  />
                  {/* Fallback Icon Layer (visible if image fails or hasn't loaded) */}
                  <div className="absolute inset-0 flex items-center justify-center -z-10">
                    {card.fallbackIcon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    {card.title}
                    <span className="text-xs font-normal text-white/50 uppercase tracking-wider border-l border-white/20 pl-2 ml-2">
                      {card.subtitle}
                    </span>
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
