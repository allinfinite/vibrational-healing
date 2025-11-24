'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Image from 'next/image';
import { useSound } from '@/lib/contexts/SoundContext';

interface EpicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  title: string;
  subtitle?: string;
  description: string;
  imageSrc?: string; // URL to the generated image
  audioSrc?: string; // URL to the audio guide
}

export default function EpicModal({
  isOpen, onClose, onNext, onPrev,
  title, subtitle, description, imageSrc, audioSrc
}: EpicModalProps) {
  const { playVoice, stopVoice } = useSound();
  const [isPlaying, setIsPlaying] = useState(false);

  // Keyboard Navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight' && onNext) onNext();
        if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  // Stop audio on close
  useEffect(() => {
      if (!isOpen) {
          stopVoice();
          setIsPlaying(false);
      }
  }, [isOpen, stopVoice]);

  const handlePlay = () => {
      if (isPlaying) {
          stopVoice();
          setIsPlaying(false);
      } else if (audioSrc) {
          playVoice(audioSrc, description);
          setIsPlaying(true);
      }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 lg:p-12"
          >
             {/* Main Card */}
             <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", duration: 0.6 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl h-[80vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
             >
                 {/* Close Button */}
                 <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-all"
                 >
                     <X size={24} />
                 </button>

                 {/* Visual Side (Left/Top) */}
                 <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full bg-black">
                     {imageSrc ? (
                         <>
                            <Image 
                                src={imageSrc} 
                                alt={title}
                                fill
                                className="object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r" />
                         </>
                     ) : (
                         <div className="w-full h-full bg-gradient-to-br from-teal-900 to-slate-900 animate-pulse" />
                     )}
                     
                     {/* Floating Badge */}
                     <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-teal-300 text-sm font-medium tracking-widest uppercase">
                         {subtitle || "Healing Method"}
                     </div>
                 </div>

                 {/* Content Side (Right/Bottom) */}
                 <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-8 lg:p-12 flex flex-col justify-center relative">
                     <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4 font-serif tracking-tight">
                         {title}
                     </h2>
                     
                     <div className="w-24 h-1 bg-teal-500 mb-8 rounded-full" />
                     
                     <p className="text-lg lg:text-xl text-slate-300 leading-relaxed mb-10 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 pr-4">
                         {description}
                     </p>

                     {/* Controls */}
                     <div className="flex items-center justify-between pt-6 border-t border-white/10">
                         {/* Navigation */}
                         <div className="flex items-center space-x-4">
                             {onPrev && (
                                 <button 
                                    onClick={onPrev}
                                    className="p-3 rounded-full bg-white/5 hover:bg-teal-500 text-white transition-all group"
                                    title="Previous (Left Arrow)"
                                 >
                                     <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                                 </button>
                             )}
                             {onNext && (
                                 <button 
                                    onClick={onNext}
                                    className="p-3 rounded-full bg-white/5 hover:bg-teal-500 text-white transition-all group"
                                    title="Next (Right Arrow)"
                                 >
                                     <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                                 </button>
                             )}
                         </div>

                         {/* Play Action */}
                         <button 
                            onClick={handlePlay}
                            className={`flex items-center px-8 py-4 rounded-full font-bold tracking-wider transition-all shadow-lg ${
                                isPlaying 
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse' 
                                : 'bg-teal-600 hover:bg-teal-500 text-white'
                            }`}
                         >
                             {isPlaying ? <Pause size={20} className="mr-3" /> : <Play size={20} className="mr-3 fill-current" />}
                             {isPlaying ? 'LISTENING...' : 'LISTEN GUIDE'}
                         </button>
                     </div>
                 </div>
             </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

