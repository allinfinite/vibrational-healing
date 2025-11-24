'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Zap, Heart, Waves } from 'lucide-react';

const TRANSMISSION_PILLARS = [
  {
    icon: <Waves className="w-8 h-8" />,
    title: "Vibration as Carrier",
    description: "Sound waves act as the physical medium, carrying information through space and matter.",
    color: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Intent as Payload",
    description: "Consciousness encodes healing intention directly into the vibrational pattern itself.",
    color: "text-purple-400",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: <Radio className="w-8 h-8" />,
    title: "Transmission Beyond Self",
    description: "The coherent signal radiates outward, influencing the biofield of anyone in proximity.",
    color: "text-teal-400",
    borderColor: "border-teal-500/30",
    bgColor: "bg-teal-500/10"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Regulatory Effect",
    description: "Receivers experience entrainment—their internal state shifts toward coherence automatically.",
    color: "text-rose-400",
    borderColor: "border-rose-500/30",
    bgColor: "bg-rose-500/10"
  }
];

export default function IntentionalTransmissionSection() {
  return (
    <section className="relative w-full py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent" />
        
        {/* Animated concentric circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border border-teal-500/10 rounded-full"
              style={{
                width: `${100 + i * 30}%`,
                height: `${100 + i * 30}%`,
                top: `${-15 * i}%`,
                left: `${-15 * i}%`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 text-teal-400 mb-6">
            <Radio className="w-5 h-5" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase">The Core Mechanism</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
            Intentional Harmonic
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400">
              Transmission
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Intent is encoded into the vibrational source itself, transmitted through acoustic 
            or energetic harmonics, and received by others as a regulatory or transformative influence.
          </p>
        </motion.div>

        {/* Four Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {TRANSMISSION_PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl border ${pillar.borderColor} ${pillar.bgColor} backdrop-blur-sm hover:scale-105 transition-transform`}
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center text-xs font-bold text-white">
                {i + 1}
              </div>
              
              <div className={`${pillar.color} mb-4`}>
                {pillar.icon}
              </div>
              
              <h3 className="text-lg font-bold text-white mb-3">
                {pillar.title}
              </h3>
              
              <p className="text-sm text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-12 backdrop-blur-xl">
            
            {/* Flow Diagram */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              
              {/* Source */}
              <div className="text-center flex-1">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500/30 to-purple-900/30 border-2 border-purple-500/50 flex items-center justify-center mb-4">
                  <span className="text-4xl">🧘</span>
                </div>
                <h4 className="font-bold text-white mb-1">Source</h4>
                <p className="text-xs text-slate-400">Practitioner with Intent</p>
              </div>

              {/* Arrow 1 */}
              <div className="hidden md:flex flex-col items-center">
                <motion.div 
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-teal-400 text-2xl"
                >
                  →
                </motion.div>
                <span className="text-[10px] text-teal-400/60 mt-1">ENCODE</span>
              </div>

              {/* Carrier */}
              <div className="text-center flex-1">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-teal-500/30 to-teal-900/30 border-2 border-teal-500/50 flex items-center justify-center mb-4 relative">
                  <span className="text-4xl">〰️</span>
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-teal-400/30"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <h4 className="font-bold text-white mb-1">Carrier Wave</h4>
                <p className="text-xs text-slate-400">Sound / Vibration</p>
              </div>

              {/* Arrow 2 */}
              <div className="hidden md:flex flex-col items-center">
                <motion.div 
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  className="text-teal-400 text-2xl"
                >
                  →
                </motion.div>
                <span className="text-[10px] text-teal-400/60 mt-1">TRANSMIT</span>
              </div>

              {/* Receiver */}
              <div className="text-center flex-1">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-rose-500/30 to-rose-900/30 border-2 border-rose-500/50 flex items-center justify-center mb-4">
                  <span className="text-4xl">💫</span>
                </div>
                <h4 className="font-bold text-white mb-1">Receiver</h4>
                <p className="text-xs text-slate-400">Biofield Entrainment</p>
              </div>

            </div>

            {/* Bottom Caption */}
            <div className="mt-10 pt-8 border-t border-white/10 text-center">
              <p className="text-slate-400 text-sm italic">
                "The coherent signal doesn't just affect the individual—it ripples outward, 
                modulating the surrounding field and anyone within it."
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

