'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Volume2 } from 'lucide-react';
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
  const { resumeContext, isReady } = useSound();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm"
      >
        <Link href="/" className="text-xl font-bold tracking-widest text-teal-100 hover:text-white transition-colors">
          VIBRATIONAL<span className="text-teal-400">HEALING</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`text-sm uppercase tracking-widest hover:text-teal-300 transition-colors ${
                pathname === item.href ? 'text-teal-300 border-b border-teal-300' : 'text-slate-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          {!isReady && (
            <button 
                onClick={() => resumeContext()}
                className="p-2 rounded-full bg-teal-500/20 hover:bg-teal-500/40 text-teal-200 transition-colors"
                title="Enable Audio"
            >
                <Volume2 size={20} />
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden text-white"
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
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center space-y-8 md:hidden"
        >
            {NAV_ITEMS.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="text-2xl font-light text-slate-200 hover:text-teal-300"
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

