'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useSound } from '@/lib/contexts/SoundContext';

interface AudioSource {
  title: string;
  artist?: string;
  url: string;
}

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
  audioSource?: AudioSource; // Attribution for the audio
}

export default function EpicModal({
  isOpen, onClose, onNext, onPrev,
  title, subtitle, description, imageSrc, audioSrc, audioSource
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

  // Auto-play audio when modal opens or content changes, stop when it closes
  useEffect(() => {
      if (isOpen && audioSrc) {
          // Stop any currently playing audio first
          stopVoice();
          // Small delay to let the modal animate in (or content to switch)
          const timer = setTimeout(() => {
              playVoice(audioSrc, description);
              setIsPlaying(true);
          }, 300);
          return () => clearTimeout(timer);
      } else if (!isOpen) {
          stopVoice();
          setIsPlaying(false);
      }
  }, [isOpen, audioSrc, description, playVoice, stopVoice]);

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
                className="relative w-full max-w-6xl h-[80vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row group/modal"
             >
                 {/* Close Button */}
                 <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-all"
                 >
                     <X size={24} />
                 </button>

                 {/* Left Arrow (Hover) */}
                 {onPrev && (
                     <button
                        onClick={onPrev}
                        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/60 hover:bg-teal-500/80 text-white/60 hover:text-white transition-all opacity-0 group-hover/modal:opacity-100"
                        title="Previous (←)"
                     >
                         <ChevronLeft size={32} />
                     </button>
                 )}

                 {/* Right Arrow (Hover) */}
                 {onNext && (
                     <button
                        onClick={onNext}
                        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/60 hover:bg-teal-500/80 text-white/60 hover:text-white transition-all opacity-0 group-hover/modal:opacity-100"
                        title="Next (→)"
                     >
                         <ChevronRight size={32} />
                     </button>
                 )}

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
                     <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
                         <div className="flex items-center justify-between">
                             {/* Navigation */}
                             <div className="flex items-center space-x-2">
                                 {onPrev ? (
                                     <button 
                                        onClick={onPrev}
                                        className="flex items-center space-x-2 px-4 py-3 rounded-full bg-white/5 hover:bg-teal-500 text-white transition-all group"
                                        title="Previous (Left Arrow)"
                                     >
                                         <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                         <span className="text-xs font-medium hidden sm:inline">PREV</span>
                                     </button>
                                 ) : <div className="w-20" />}
                                 {onNext ? (
                                     <button 
                                        onClick={onNext}
                                        className="flex items-center space-x-2 px-4 py-3 rounded-full bg-white/5 hover:bg-teal-500 text-white transition-all group"
                                        title="Next (Right Arrow)"
                                     >
                                         <span className="text-xs font-medium hidden sm:inline">NEXT</span>
                                         <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                     </button>
                                 ) : <div className="w-20" />}
                             </div>

                             {/* Play Action */}
                             {audioSrc && (
                                 <button 
                                    onClick={handlePlay}
                                    className={`flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold tracking-wider transition-all shadow-lg text-sm sm:text-base ${
                                        isPlaying 
                                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse' 
                                        : 'bg-teal-600 hover:bg-teal-500 text-white'
                                    }`}
                                 >
                                     {isPlaying ? <Pause size={20} className="mr-2 sm:mr-3" /> : <Play size={20} className="mr-2 sm:mr-3 fill-current" />}
                                     <span className="hidden sm:inline">{isPlaying ? 'LISTENING...' : 'LISTEN GUIDE'}</span>
                                     <span className="sm:hidden">{isPlaying ? 'STOP' : 'PLAY'}</span>
                                 </button>
                             )}
                         </div>
                         
                         {/* Audio Source Attribution */}
                         {audioSource && (
                             <div className="flex items-center justify-end">
                                 <a 
                                    href={audioSource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-xs text-slate-400 hover:text-teal-300 transition-colors group"
                                 >
                                     <span className="opacity-60">Sound:</span>
                                     <span className="font-medium">{audioSource.title}</span>
                                     {audioSource.artist && (
                                         <span className="opacity-60">by {audioSource.artist}</span>
                                     )}
                                     <ExternalLink size={12} className="opacity-50 group-hover:opacity-100" />
                                 </a>
                             </div>
                         )}
                     </div>
                 </div>
             </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

