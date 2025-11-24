'use client';

import React, { useEffect, useRef } from 'react';

export default function CoherenceDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = 600;
    const height = canvas.height = 300;

    let offset = 0;

    const draw = () => {
        ctx.clearRect(0, 0, width, height);
        offset += 2;

        // Top Wave: Incoherence (Jagged)
        ctx.beginPath();
        ctx.strokeStyle = '#fbbf24'; // Amber
        ctx.lineWidth = 2;
        for(let x=0; x<width; x++) {
            // Mix of sine waves to create noise
            const y = 75 + Math.sin((x + offset) * 0.05) * 20 
                         + Math.sin((x + offset) * 0.13) * 15
                         + (Math.random() - 0.5) * 5;
            if (x===0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Bottom Wave: Coherence (Smooth)
        ctx.beginPath();
        ctx.strokeStyle = '#2dd4bf'; // Teal
        ctx.lineWidth = 2;
        for(let x=0; x<width; x++) {
            // Smooth Sine
            const y = 225 + Math.sin((x + offset) * 0.03) * 40;
            if (x===0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px sans-serif';
        ctx.fillText('Incoherent (Anxiety)', 10, 30);
        ctx.fillText('Coherent (Peace)', 10, 180);

        requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return (
    <canvas ref={canvasRef} className="w-full h-full" />
  );
}
