'use client';

import React, { useEffect, useRef } from 'react';
import { useSound } from '@/lib/contexts/SoundContext';

export default function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { analyser } = useSound();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resize handler
    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !analyser) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let animationId: number;

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Visualization: Flowing Wave
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();

      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;

      for(let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0; // 0..2
        const y = (canvas.height / 2) + (Math.sin(i/20) * v * 50); // Add sine wave modulation

        if(i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth * 2; // Spread out
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      
      // Second layer: Particles or higher frequency circles?
      // Simple circle based on bass (low freq)
      const bass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
      if (bass > 100) {
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, bass, 0, 2 * Math.PI);
          ctx.strokeStyle = `rgba(255, 255, 200, ${bass/500})`;
          ctx.stroke();
      }
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [analyser]);

  return (
    <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
    />
  );
}

