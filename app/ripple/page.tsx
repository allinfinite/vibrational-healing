'use client';

import React, { useRef } from 'react';
import { useRippleScroll } from '@/components/features/ripple/useRippleScroll';
import VoidSection from '@/components/features/ripple/VoidSection';
import ExpansionCanvas from '@/components/features/ripple/ExpansionCanvas';
import NetworkCanvas from '@/components/features/ripple/NetworkCanvas';
import RippleAudioController from '@/components/features/ripple/RippleAudioController';
import ScrollTextOverlay from '@/components/features/ripple/ScrollTextOverlay';

export default function RipplePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, voidOpacity, voidScale, waveIntensity, networkDensity } = useRippleScroll(containerRef);

  return (
    <div ref={containerRef} className="relative bg-slate-950 h-[400vh] pt-16">
        {/* Fixed Content Layer */}
        <div className="fixed inset-0 overflow-hidden">
            <VoidSection opacity={voidOpacity} scale={voidScale} />
            <ExpansionCanvas intensity={waveIntensity} />
            <NetworkCanvas density={networkDensity} />
            <ScrollTextOverlay progress={scrollYProgress} />
        </div>

        {/* Audio Logic */}
        <RippleAudioController progress={scrollYProgress} />

        {/* Scroll Spacers (Implicit via h-[400vh]) */}
    </div>
  );
}
