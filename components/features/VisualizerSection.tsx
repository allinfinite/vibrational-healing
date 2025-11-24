'use client';

import React from 'react';
import AudioVisualizer from './AudioVisualizer';

export default function VisualizerSection() {
  return (
    <>
      {/* Fixed Waveform at Top of Screen - Semi-transparent */}
      <div className="fixed top-16 left-0 right-0 z-40 pointer-events-none opacity-30">
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950/80 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950/80 to-transparent z-10" />
          
          <AudioVisualizer height={60} showZoneColors={true} />
        </div>
      </div>
    </>
  );
}
