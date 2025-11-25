'use client';

import React, { useEffect, useRef } from 'react';

export default function ChaosBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Rain particles
    const rain: {x: number, y: number, v: number, l: number}[] = [];
    const maxRain = 100;

    // Lightning
    let lightningOpacity = 0;
    let lightningTimer = Math.random() * 200;

    const resize = () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);

    for(let i=0; i<maxRain; i++) {
        rain.push({
            x: Math.random() * width,
            y: Math.random() * height,
            v: Math.random() * 5 + 10, // velocity
            l: Math.random() * 10 + 10 // length
        });
    }

    let animId: number;

    const draw = () => {
        // Clear with semi-transparent black for trails? No, just clear
        ctx.clearRect(0, 0, width, height);

        // Lightning Logic
        if (lightningTimer <= 0) {
            lightningOpacity = 1;
            lightningTimer = Math.random() * 300 + 100;
        } else {
            lightningTimer--;
            if (lightningOpacity > 0) lightningOpacity -= 0.05;
        }

        // Draw Lightning Flash
        if (lightningOpacity > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${lightningOpacity * 0.3})`;
            ctx.fillRect(0, 0, width, height);
            
            // Draw Bolt
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${lightningOpacity})`;
            ctx.lineWidth = 2;
            let lx = Math.random() * width;
            let ly = 0;
            ctx.moveTo(lx, ly);
            while(ly < height) {
                lx += (Math.random() - 0.5) * 50;
                ly += Math.random() * 20 + 10;
                ctx.lineTo(lx, ly);
            }
            ctx.stroke();
        }

        // Draw Rain
        ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let r of rain) {
            ctx.moveTo(r.x, r.y);
            ctx.lineTo(r.x, r.y + r.l);
            
            r.y += r.v;
            if (r.y > height) {
                r.y = -r.l;
                r.x = Math.random() * width;
            }
        }
        ctx.stroke();

        animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen"
    />
  );
}

