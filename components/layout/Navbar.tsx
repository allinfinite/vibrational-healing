'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/lib/contexts/SoundContext';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'The Science', href: '/concept' },
  { label: 'Lineages', href: '/history' },
  { label: 'Methods', href: '/methods' },
  { label: 'The Ripple', href: '/ripple' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { resumeContext, isReady, isMuted, toggleMute } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
      setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 ${
            isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/5 shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <Link href="/" className="text-xl font-bold tracking-widest text-teal-100 hover:text-white transition-colors relative group">
          VIBRATIONAL<span className="text-teal-400">HEALING</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`text-sm uppercase tracking-widest hover:text-teal-300 transition-colors relative ${
                pathname === item.href ? 'text-teal-300' : 'text-slate-300'
              }`}
            >
              {item.label}
              {pathname === item.href && (
                  <motion.div layoutId="underline" className="absolute -bottom-1 left-0 right-0 h-px bg-teal-300" />
              )}
            </Link>
          ))}
          
          <button 
              onClick={() => {
                if (!isReady) {
                  resumeContext();
                } else {
                  toggleMute();
                }
              }}
              className={`p-2 rounded-full transition-all duration-300 ${
                !isReady 
                  ? 'text-slate-400 hover:text-white hover:bg-white/10' 
                  : isMuted 
                    ? 'text-red-400 bg-red-400/10 hover:bg-red-400/20' 
                    : 'text-teal-400 bg-teal-400/10 hover:bg-teal-400/20'
              }`}
              title={!isReady ? "Enable Audio" : isMuted ? "Unmute" : "Mute"}
          >
              {isMuted ? (
                <VolumeX size={20} />
              ) : (
                <Volume2 size={20} className={isReady && !isMuted ? "animate-pulse" : ""} />
              )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <X /> : <Menu />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
        >
            {NAV_ITEMS.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`text-3xl font-light tracking-widest ${
                  pathname === item.href ? 'text-teal-400' : 'text-slate-300'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </>
  );
}
