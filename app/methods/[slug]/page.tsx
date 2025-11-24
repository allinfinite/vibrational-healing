'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Play } from 'lucide-react';
import { useSound } from '@/lib/contexts/SoundContext';
import { useParams } from 'next/navigation';

// Simplified detail content since we didn't generate specific text for every single method deep dive yet
// In a full app, this would come from a CMS or the content file
const METHOD_DETAILS: Record<string, any> = {
    'tuning-fork': {
        title: 'Tuning Forks',
        desc: 'Coherent Frequency Emission',
        content: "Tuning forks are precision instruments that emit a pure, coherent acoustic wave. When placed near the body (or on acoustic meridian points), they use the principle of resonance to 'tune' the biofield. They are particularly effective for clearing static or 'noise' in the subtle energy field, much like combing out a tangled knot in hair."
    },
    'voice-chanting': {
        title: 'Voice & Chanting',
        desc: 'Internal Resonance',
        content: "The voice is the most powerful healing instrument because it comes from within. Self-generated sound vibrates the skull, the vagus nerve, and the entire skeletal structure. Chanting regulates the nervous system, lengthens the exhalation (stimulating the parasympathetic response), and releases nitric oxide."
    },
    // ... defaults for others
};

export default function MethodDetail() {
  const { slug } = useParams(); 
  const { playVoice, setZone } = useSound();
  const [iconSvg, setIconSvg] = useState('');

  const methodKey = typeof slug === 'string' ? slug : '';
  const details = METHOD_DETAILS[methodKey] || {
      title: methodKey.replace('-', ' ').toUpperCase(),
      desc: 'Vibrational Healing Tool',
      content: 'This method uses specific frequencies and techniques to harmonize the body and mind.'
  };

  useEffect(() => {
      setZone('transformation');
      // Try to load the icon
      fetch(`/generated/icons/${methodKey}.svg`)
        .then(r => r.text())
        .then(setIconSvg)
        .catch(console.error);
  }, [methodKey, setZone]);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-6">
        <Link href="/methods" className="absolute top-24 left-6 flex items-center text-teal-400 hover:text-teal-300 transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Back to Methods
        </Link>

        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Visual */}
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="aspect-square bg-gradient-to-tr from-teal-900/20 to-slate-900 rounded-full border border-teal-500/20 flex items-center justify-center relative"
            >
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite] border border-dashed border-teal-500/10 rounded-full" />
                <div 
                    className="w-48 h-48 text-teal-200 drop-shadow-[0_0_30px_rgba(45,212,191,0.3)]"
                    dangerouslySetInnerHTML={{ __html: iconSvg }}
                />
            </motion.div>

            {/* Content */}
            <div>
                <h1 className="text-5xl font-bold text-white mb-2">{details.title}</h1>
                <p className="text-xl text-teal-400 mb-8 font-light">{details.desc}</p>
                
                <p className="text-lg leading-loose text-slate-300 mb-10">
                    {details.content}
                </p>

                <button 
                    onClick={() => playVoice(`/generated/audio/${methodKey}.mp3`, `This is the ${details.title}. ${details.content}`)}
                    className="flex items-center px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-bold tracking-wider transition-all shadow-lg group"
                >
                    <Play size={20} className="mr-3 fill-current" />
                    LISTEN TO GUIDE
                </button>
            </div>
        </div>
    </div>
  );
}

