'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/lib/contexts/SoundContext';
import { Play, Pause, Volume2, X } from 'lucide-react';

export default function GlobalPlayer() {
  const { stopVoice, isReady, resumeContext } = useSound();
  // In a real app, we'd expose "isPlaying" state from context to toggle the icon
  // For now, we assume if audio is playing, the user might want to stop it.
  // We'll add a simple "Stop Narration" button when active.
  
  // To make this "Epic", it should be a floating orb or bar.
  
  if (!isReady) return null;

  return (
    <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 right-6 z-50 flex items-center space-x-4"
    >
        <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full p-2 pl-4 pr-2 flex items-center shadow-2xl">
            <div className="flex flex-col mr-4">
                <span className="text-[10px] text-teal-400 uppercase tracking-wider font-bold">Audio Guide</span>
                <span className="text-xs text-slate-300">Active</span>
            </div>
            
            <button 
                onClick={() => stopVoice()}
                className="p-3 rounded-full bg-teal-500/20 hover:bg-teal-500/40 text-teal-300 transition-colors"
                title="Stop Audio"
            >
                <Pause size={16} fill="currentColor" />
            </button>
        </div>
    </motion.div>
  );
}

