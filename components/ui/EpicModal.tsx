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
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 lg:p-12"
          >
             {/* Main Card */}
             <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", duration: 0.6 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl h-[90vh] lg:h-[80vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-row group/modal"
             >
                 {/* Close Button */}
                 <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-all"
                 >
                     <X size={24} />
                 </button>

                 {/* Left Arrow */}
                 {onPrev && (
                     <button
                        onClick={onPrev}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-4 rounded-full bg-black/60 hover:bg-teal-500/80 text-white/60 hover:text-white transition-all opacity-70 lg:opacity-0 lg:group-hover/modal:opacity-100"
                        title="Previous (←)"
                     >
                         <ChevronLeft size={20} className="sm:w-8 sm:h-8" />
                     </button>
                 )}

                 {/* Right Arrow */}
                 {onNext && (
                     <button
                        onClick={onNext}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-4 rounded-full bg-black/60 hover:bg-teal-500/80 text-white/60 hover:text-white transition-all opacity-70 lg:opacity-0 lg:group-hover/modal:opacity-100"
                        title="Next (→)"
                     >
                         <ChevronRight size={20} className="sm:w-8 sm:h-8" />
                     </button>
                 )}

                 {/* Visual Side (Left) */}
                 <div className="relative w-2/5 sm:w-2/5 lg:w-1/2 h-full bg-black flex-shrink-0">
                     {imageSrc ? (
                         <>
                            <Image 
                                src={imageSrc} 
                                alt={title}
                                fill
                                className="object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
                         </>
                     ) : (
                         <div className="w-full h-full bg-gradient-to-br from-teal-900 to-slate-900 animate-pulse" />
                     )}
                     
                     {/* Floating Badge */}
                     <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-black/60 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 text-teal-300 text-xs sm:text-sm font-medium tracking-widest uppercase">
                         {subtitle || "Healing Method"}
                     </div>
                 </div>

                 {/* Content Side (Right) */}
                 <div className="w-3/5 sm:w-3/5 lg:w-1/2 h-full p-4 sm:p-6 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                     <div className="flex-shrink-0">
                         <h2 className="text-xl sm:text-2xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 font-serif tracking-tight">
                             {title}
                         </h2>
                         
                         <div className="w-12 sm:w-24 h-1 bg-teal-500 mb-3 sm:mb-6 lg:mb-8 rounded-full" />
                     </div>
                     
                     {/* Scrollable Description Area */}
                     <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent pr-1 sm:pr-4 mb-3 sm:mb-6 lg:mb-10">
                         <p className="text-xs sm:text-base lg:text-xl text-slate-300 leading-relaxed whitespace-pre-line">
                             {description}
                         </p>
                     </div>

                     {/* Controls */}
                     <div className="flex-shrink-0 flex flex-col gap-2 sm:gap-4 pt-3 sm:pt-6 border-t border-white/10">
                         <div className="flex flex-row items-center justify-between gap-2">
                             {/* Navigation */}
                             <div className="flex items-center space-x-1.5 sm:space-x-2">
                                 {onPrev ? (
                                     <button 
                                        onClick={onPrev}
                                        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-3 rounded-full bg-white/5 hover:bg-teal-500 text-white transition-all group"
                                        title="Previous (Left Arrow)"
                                     >
                                         <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px] group-hover:-translate-x-1 transition-transform" />
                                         <span className="text-[10px] sm:text-xs font-medium hidden sm:inline">PREV</span>
                                     </button>
                                 ) : <div className="w-0 sm:w-20" />}
                                 {onNext ? (
                                     <button 
                                        onClick={onNext}
                                        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-3 rounded-full bg-white/5 hover:bg-teal-500 text-white transition-all group"
                                        title="Next (Right Arrow)"
                                     >
                                         <span className="text-[10px] sm:text-xs font-medium hidden sm:inline">NEXT</span>
                                         <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform" />
                                     </button>
                                 ) : <div className="w-0 sm:w-20" />}
                             </div>

                             {/* Play Action */}
                             {audioSrc && (
                                 <button 
                                    onClick={handlePlay}
                                    className={`flex items-center justify-center px-3 sm:px-8 py-2 sm:py-4 rounded-full font-bold tracking-wider transition-all shadow-lg text-[10px] sm:text-base ${
                                        isPlaying 
                                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse' 
                                        : 'bg-teal-600 hover:bg-teal-500 text-white'
                                    }`}
                                 >
                                     {isPlaying ? <Pause size={14} className="sm:w-5 sm:h-5 mr-1.5 sm:mr-3" /> : <Play size={14} className="sm:w-5 sm:h-5 mr-1.5 sm:mr-3 fill-current" />}
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

