'use client';

import React, { useEffect, useRef } from 'react';

export default function BiofieldDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = 400;
    const height = canvas.height = 400;
    const cx = width / 2;
    const cy = height / 2;

    let frame = 0;

    const draw = () => {
        ctx.clearRect(0, 0, width, height);

        // Human Silhouette (Simple)
        ctx.fillStyle = '#0f172a'; // Slate-900
        ctx.beginPath();
        ctx.arc(cx, cy - 50, 20, 0, Math.PI * 2); // Head
        ctx.moveTo(cx, cy - 30);
        ctx.lineTo(cx, cy + 60); // Body
        ctx.stroke();
        
        // Toroidal Field
        const layers = 8;
        for(let i=0; i<layers; i++) {
            const t = (frame * 0.02) + i;
            const rX = 60 + i * 15 + Math.sin(t) * 5;
            const rY = 120 + i * 10;
            
            ctx.strokeStyle = `rgba(45, 212, 191, ${0.1 + (Math.sin(t)*0.1)})`; // Teal
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(cx, cy, rX, rY, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Chakra Points
        const chakras = [
            { y: 60, color: '#a855f7' }, // Crown
            { y: 30, color: '#6366f1' }, // Third Eye
            { y: 10, color: '#3b82f6' }, // Throat
            { y: -10, color: '#22c55e' }, // Heart
            { y: -30, color: '#eab308' }, // Solar
            { y: -50, color: '#f97316' }, // Sacral
            { y: -70, color: '#ef4444' }, // Root
        ];

        chakras.forEach((c, i) => {
            const intensity = (Math.sin(frame * 0.1 + i) + 1) / 2;
            ctx.fillStyle = c.color;
            ctx.globalAlpha = 0.5 + intensity * 0.5;
            ctx.beginPath();
            ctx.arc(cx, cy - c.y, 4 + intensity * 2, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        frame++;
        requestAnimationFrame(draw);
    };
    draw();
  }, []);

  return (
    <canvas ref={canvasRef} className="w-full h-full" />
  );
}
