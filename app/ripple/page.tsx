'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/lib/contexts/SoundContext';
import { PAGES_CONTENT } from '@/lib/content';

export default function RipplePage() {
  const { playVoice, setZone } = useSound();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
      setZone('peace');
      playVoice('/generated/audio/page-ripple.mp3', PAGES_CONTENT.ripple.audioText);
  }, [playVoice, setZone]);

  // Particle Simulation
  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;

      const particles: {x: number, y: number, r: number, a: number, vx: number, vy: number}[] = [];
      
      const createParticle = (x: number, y: number) => {
          particles.push({
              x, y,
              r: Math.random() * 2 + 1,
              a: 1,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2
          });
      };

      let frame = 0;
      const animate = () => {
          ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; // Trail effect
          ctx.fillRect(0, 0, width, height);
          
          // Emit from center
          if (frame % 5 === 0) {
              createParticle(width/2, height/2);
          }

          ctx.fillStyle = '#fbbf24'; // Amber-400
          
          for (let i = 0; i < particles.length; i++) {
              const p = particles[i];
              p.x += p.vx;
              p.y += p.vy;
              p.a -= 0.005;
              
              if (p.a <= 0) {
                  particles.splice(i, 1);
                  i--;
                  continue;
              }

              ctx.globalAlpha = p.a;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.fill();
          }
          ctx.globalAlpha = 1;
          frame++;
          requestAnimationFrame(animate);
      };
      animate();

      const resize = () => {
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        <div className="relative z-10 max-w-2xl text-center p-8 pointer-events-none">
             <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2 }}
                className="mb-8 inline-block"
             >
                 <div className="w-32 h-32 rounded-full bg-amber-100/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_100px_rgba(251,191,36,0.3)]">
                     <div className="w-16 h-16 bg-amber-100 rounded-full animate-ping" />
                 </div>
             </motion.div>
             
             <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-5xl font-bold text-amber-100 mb-6"
             >
                 The Ripple Effect
             </motion.h1>
             
             <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xl text-amber-100/80 leading-relaxed"
             >
                 When you stabilize your own frequency, you don't just heal yourself.
                 You become a tuning fork for the world around you.
             </motion.p>
        </div>
    </div>
  );
}

