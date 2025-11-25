'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSound } from '@/lib/contexts/SoundContext';

interface AudioVisualizerProps {
  height?: number;
  showZoneColors?: boolean;
}

export default function AudioVisualizer({ height = 200, showZoneColors = true }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { analyser, isReady } = useSound();
  const [currentZone, setCurrentZone] = useState<'chaos' | 'transformation' | 'calm'>('transformation');
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Zone color configurations - vibrant and bold
  const zoneColors = {
    chaos: {
      primary: 'rgba(167, 139, 250, 1)',      // Bright Purple
      secondary: 'rgba(139, 92, 246, 0.9)',   // Purple
      tertiary: 'rgba(99, 102, 241, 0.7)',    // Indigo
      glow: 'rgba(167, 139, 250, 0.5)',
    },
    transformation: {
      primary: 'rgba(45, 212, 191, 1)',       // Bright Teal
      secondary: 'rgba(16, 185, 129, 0.9)',   // Emerald
      tertiary: 'rgba(6, 182, 212, 0.7)',     // Cyan
      glow: 'rgba(45, 212, 191, 0.5)',
    },
    calm: {
      primary: 'rgba(251, 191, 36, 1)',       // Bright Amber
      secondary: 'rgba(245, 158, 11, 0.9)',   // Orange
      tertiary: 'rgba(234, 179, 8, 0.7)',     // Yellow
      glow: 'rgba(251, 191, 36, 0.5)',
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      timeRef.current += 0.02;

      const width = canvas.offsetWidth;
      const h = height;

      // Clear canvas
      ctx.clearRect(0, 0, width, h);

      // Get audio data if available
      let dataArray: Uint8Array | null = null;
      let hasAudioData = false;
      
      if (analyser && isReady) {
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        analyser.getByteFrequencyData(dataArray as any);
        hasAudioData = dataArray.some(v => v > 10);
      }

      const colors = zoneColors[currentZone];
      const centerY = h / 2;
      const points = 150;

      // Draw multiple wave layers - more prominent
      const layerColors = [colors.primary, colors.secondary, colors.tertiary];
      const layerWidths = [4, 3, 2];
      
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        ctx.lineWidth = layerWidths[layer];
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Create gradient stroke with smooth edges
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.1, layerColors[layer]);
        gradient.addColorStop(0.5, layerColors[layer]);
        gradient.addColorStop(0.9, layerColors[layer]);
        gradient.addColorStop(1, 'transparent');
        ctx.strokeStyle = gradient;

        // Add shadow for glow effect
        if (layer === 0) {
          ctx.shadowColor = colors.glow;
          ctx.shadowBlur = 20;
        } else {
          ctx.shadowBlur = 0;
        }

        for (let i = 0; i <= points; i++) {
          const x = (i / points) * width;
          const normalizedX = i / points;
          
          // Base wave parameters - bigger amplitude
          let amplitude = 40 + layer * 15;
          let frequency = 0.02 + layer * 0.01;
          let phase = timeRef.current * (1 + layer * 0.3);

          // Modulate with audio data if available
          if (hasAudioData && dataArray) {
            const dataIndex = Math.floor(normalizedX * dataArray.length * 0.5);
            const audioValue = dataArray[dataIndex] / 255;
            amplitude += audioValue * 60;
          }

          // Create organic wave shape
          const y = centerY + 
            Math.sin(x * frequency + phase) * amplitude * 0.5 +
            Math.sin(x * frequency * 2 + phase * 1.3) * amplitude * 0.3 +
            Math.sin(x * frequency * 0.5 + phase * 0.7) * amplitude * 0.2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow
      }

      // Add glow effect at center
      const glowGradient = ctx.createRadialGradient(
        width / 2, centerY, 0,
        width / 2, centerY, width / 3
      );
      glowGradient.addColorStop(0, colors.glow);
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, h);

      // Add audio-reactive pulse if playing
      if (hasAudioData && dataArray) {
        const bass = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
        if (bass > 50) {
          ctx.beginPath();
          ctx.arc(width / 2, centerY, bass * 0.5, 0, 2 * Math.PI);
          ctx.strokeStyle = colors.glow;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [analyser, isReady, currentZone, height]);

  // Listen for zone changes from parent or context
  useEffect(() => {
    const handleZoneChange = (e: CustomEvent) => {
      setCurrentZone(e.detail as 'chaos' | 'transformation' | 'calm');
    };
    
    window.addEventListener('zonechange' as any, handleZoneChange);
    return () => window.removeEventListener('zonechange' as any, handleZoneChange);
  }, []);

  return (
    <div className="relative w-full bg-slate-950" style={{ height }}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ height }}
      />
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
}
