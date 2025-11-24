'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function TransformationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas-based energy spiral effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles that transform as they move
    interface Particle {
      x: number;
      y: number;
      angle: number;
      radius: number;
      speed: number;
      size: number;
      hue: number;
      targetHue: number;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;

    // Create initial particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: centerX,
        y: centerY,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 20,
        speed: 0.3 + Math.random() * 0.5,
        size: 1 + Math.random() * 2,
        hue: 270 + Math.random() * 30, // Start purple (anxiety)
        targetHue: 160 + Math.random() * 40, // End teal/green (peace)
        life: 0,
        maxLife: 200 + Math.random() * 100,
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      time += 0.01;

      particles.forEach((p, i) => {
        // Spiral outward
        p.radius += p.speed * 0.5;
        p.angle += p.speed * 0.02;
        p.life++;

        // Calculate position on spiral
        p.x = centerX + Math.cos(p.angle) * p.radius;
        p.y = centerY + Math.sin(p.angle) * p.radius;

        // Transform color from purple to teal as particle ages
        const lifeProgress = p.life / p.maxLife;
        const currentHue = p.hue + (p.targetHue - p.hue) * lifeProgress;
        
        // Fade in and out
        let alpha = 1;
        if (lifeProgress < 0.1) alpha = lifeProgress * 10;
        if (lifeProgress > 0.8) alpha = (1 - lifeProgress) * 5;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + lifeProgress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${currentHue}, 80%, 60%, ${alpha * 0.6})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3 * (1 + lifeProgress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${currentHue}, 80%, 50%, ${alpha * 0.1})`;
        ctx.fill();

        // Reset particle when it dies
        if (p.life >= p.maxLife || p.radius > Math.max(canvas.offsetWidth, canvas.offsetHeight) * 0.6) {
          p.x = centerX;
          p.y = centerY;
          p.angle = Math.random() * Math.PI * 2;
          p.radius = Math.random() * 20;
          p.life = 0;
          p.maxLife = 200 + Math.random() * 100;
          p.hue = 270 + Math.random() * 30;
          p.targetHue = 160 + Math.random() * 40;
        }
      });

      // Draw central energy vortex
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100);
      gradient.addColorStop(0, `hsla(${180 + Math.sin(time) * 20}, 70%, 50%, 0.15)`);
      gradient.addColorStop(0.5, `hsla(${200 + Math.sin(time * 0.5) * 30}, 60%, 40%, 0.08)`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Canvas for particle spiral */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Sacred geometry - Flower of Life rotating slowly */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <motion.svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {/* Simplified Flower of Life pattern */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <circle
              key={i}
              cx={200 + Math.cos((angle * Math.PI) / 180) * 50}
              cy={200 + Math.sin((angle * Math.PI) / 180) * 50}
              r="50"
              fill="none"
              stroke="url(#transformGradient)"
              strokeWidth="1"
            />
          ))}
          <circle cx="200" cy="200" r="50" fill="none" stroke="url(#transformGradient)" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="url(#transformGradient)" strokeWidth="0.5" />
          <defs>
            <linearGradient id="transformGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="50%" stopColor="#22d3d1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* DNA-like helix strands */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(2)].map((_, helixIndex) => (
          <div key={helixIndex} className="absolute h-full w-32" style={{ left: helixIndex === 0 ? '35%' : '55%' }}>
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  left: '50%',
                  top: `${(i / 16) * 100}%`,
                  background: `linear-gradient(135deg, rgba(20, 184, 166, 0.7), rgba(168, 85, 247, 0.7))`,
                  boxShadow: '0 0 20px rgba(20, 184, 166, 0.5)',
                }}
                animate={{
                  x: [
                    Math.sin((i / 16) * Math.PI * 4 + (helixIndex * Math.PI)) * 50,
                    Math.sin((i / 16) * Math.PI * 4 + Math.PI + (helixIndex * Math.PI)) * 50,
                    Math.sin((i / 16) * Math.PI * 4 + (helixIndex * Math.PI)) * 50,
                  ],
                  opacity: [0.5, 0.9, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: "easeInOut"
                }}
              />
            ))}
            {/* Connecting lines between helix points */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute h-px bg-gradient-to-r from-teal-400/40 via-purple-400/40 to-teal-400/40"
                style={{
                  left: '30%',
                  right: '30%',
                  top: `${((i + 0.5) / 16) * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scaleX: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Frequency waves emanating from center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute rounded-full"
            style={{
              width: '200px',
              height: '200px',
              border: '2px solid',
              borderColor: i % 2 === 0 ? 'rgba(20, 184, 166, 0.5)' : 'rgba(168, 85, 247, 0.4)',
              boxShadow: i % 2 === 0 
                ? '0 0 20px rgba(20, 184, 166, 0.3), inset 0 0 20px rgba(20, 184, 166, 0.1)'
                : '0 0 20px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.1)',
            }}
            initial={{ scale: 0.3, opacity: 0.6 }}
            animate={{
              scale: [0.3, 2.5, 4],
              opacity: [0.6, 0.3, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Transformation symbols - alchemical feel */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-64 h-64"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <motion.div
              key={`symbol-${i}`}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-purple-400"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${angle}deg) translateY(-120px)`,
                boxShadow: '0 0 15px rgba(20, 184, 166, 0.6)',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Morphing energy orbs - rising transformation */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${6 + (i % 4) * 3}px`,
            height: `${6 + (i % 4) * 3}px`,
            left: `${25 + (i * 5) % 50}%`,
            bottom: '10%',
            background: i % 3 === 0 
              ? 'radial-gradient(circle, rgba(20, 184, 166, 0.9), rgba(20, 184, 166, 0.3))'
              : i % 3 === 1
                ? 'radial-gradient(circle, rgba(168, 85, 247, 0.9), rgba(168, 85, 247, 0.3))'
                : 'radial-gradient(circle, rgba(34, 211, 209, 0.9), rgba(34, 211, 209, 0.3))',
            boxShadow: i % 3 === 0
              ? '0 0 20px rgba(20, 184, 166, 0.6)'
              : '0 0 20px rgba(168, 85, 247, 0.6)',
          }}
          animate={{
            y: [0, -400 - (i % 3) * 100, 0],
            x: [0, (i % 2 === 0 ? 50 : -50), 0],
            scale: [0.5, 1.5, 0.5],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 6 + (i % 4),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Vertical energy streams */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute h-full"
            style={{
              left: `${20 + i * 10}%`,
              width: '2px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(20, 184, 166, 0.6) 20%, rgba(168, 85, 247, 0.6) 50%, rgba(20, 184, 166, 0.6) 80%, transparent 100%)',
              boxShadow: '0 0 10px rgba(20, 184, 166, 0.3)',
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scaleY: [0.95, 1, 0.95],
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}
