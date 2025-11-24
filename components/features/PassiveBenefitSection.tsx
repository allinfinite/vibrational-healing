'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Waves, Ear, Heart } from 'lucide-react';

export default function PassiveBenefitSection() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="relative w-full py-32 bg-slate-950 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 text-blue-400">
              <Waves className="w-6 h-6" />
              <span className="text-sm font-bold tracking-widest uppercase">The Science of Resonance</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Passive Benefit: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                Simply Being Present
              </span>
            </h2>

            <div className="prose prose-lg text-slate-300">
              <p className="text-xl leading-relaxed">
                You don't need to do anything to receive the healing. 
                Just as a guitar string vibrates when a matching note is played nearby, 
                your body naturally resonates with coherent frequencies.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <Ear className="w-8 h-8 text-teal-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No Chanting Required</h3>
                <p className="text-sm text-slate-400">
                  Your nervous system entrains to the sound automatically. Relax and receive.
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <Heart className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Receive & Resonate</h3>
                <p className="text-sm text-slate-400">
                  Let the vibrations restore balance to your biofield without conscious effort.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-teal-500/30 blur-3xl rounded-full opacity-50" />
            
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="/generated/images/methods/passive-benefit.png"
                alt="Passive Benefit of Sound Healing"
                fill
                className={`object-cover transition-opacity duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsImageLoaded(true)}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Floating Caption */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white font-medium">Sympathetic Resonance</span>
                </div>
              </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] border border-white/5 rounded-full animate-[spin_45s_linear_infinite_reverse]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
