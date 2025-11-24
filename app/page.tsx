'use client';

import UnifiedLanding from "@/components/features/UnifiedLanding";
import VisualizerSection from "@/components/features/VisualizerSection";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Sound Visualizer - Fixed at top */}
      <VisualizerSection />
      
      {/* Unified Single-Screen Landing */}
      <UnifiedLanding />
    </div>
  );
}
