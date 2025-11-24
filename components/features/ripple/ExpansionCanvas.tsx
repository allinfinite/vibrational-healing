'use client';

import React, { useRef, useEffect } from 'react';
import { MotionValue } from 'framer-motion';

interface ExpansionCanvasProps {
  intensity: MotionValue<number>;
}

export default function ExpansionCanvas({ intensity }: ExpansionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: {
        r: number; // radius (distance from center)
        a: number; // angle
        s: number; // speed
        sz: number; // size
        o: number; // opacity
    }[] = [];
    
    // Create initial pool
    for(let i=0; i<300; i++) {
        particles.push({
            r: Math.random() * Math.max(width, height),
            a: Math.random() * Math.PI * 2,
            s: Math.random() * 2 + 0.5,
            sz: Math.random() * 3 + 1,
            o: Math.random() * 0.5 + 0.1
        });
    }

    let animationId: number;
    
    const draw = () => {
        const currentIntensity = intensity.get(); // 0 to 1

        // Clear with trails
        ctx.fillStyle = 'rgba(2, 6, 23, 0.2)';
        ctx.fillRect(0, 0, width, height);
        
        if (currentIntensity > 0) {
            const centerX = width / 2;
            const centerY = height / 2;

            particles.forEach(p => {
                // Move outwards based on intensity
                p.r += p.s * (1 + currentIntensity * 20);
                
                // Reset if out of bounds
                if (p.r > Math.max(width, height) * 0.8) {
                    if (currentIntensity > 0) {
                        p.r = 0; // Loop from center
                    }
                }

                const x = centerX + Math.cos(p.a) * p.r;
                const y = centerY + Math.sin(p.a) * p.r;

                ctx.beginPath();
                ctx.arc(x, y, p.sz * (1 + currentIntensity), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(251, 191, 36, ${p.o * currentIntensity})`; // Amber color
                ctx.fill();
            });

            // Draw Main Rings
            const rings = 5;
            ctx.lineWidth = 2;
            for(let i=0; i<rings; i++) {
                const r = (Date.now() / 20 + i * 200) % (Math.max(width, height) / 2);
                ctx.beginPath();
                ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(45, 212, 191, ${Math.max(0, (1 - r/(width/2)) * currentIntensity * 0.5)})`;
                ctx.stroke();
            }
        }

        animationId = requestAnimationFrame(draw);
    };
    
    draw();

    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationId);
    };
  }, [intensity]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-10" />;
}

