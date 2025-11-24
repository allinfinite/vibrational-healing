import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const useRippleScroll = (containerRef: React.RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Phase 1: The Void (0 - 0.3)
  const voidOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const voidScale = useTransform(scrollYProgress, [0, 0.3], [1, 5]);

  // Phase 2: The Wave (0.3 - 0.7)
  const waveIntensity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  
  // Phase 3: The Network (0.7 - 1.0)
  const networkDensity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return {
    scrollYProgress,
    voidOpacity,
    voidScale,
    waveIntensity,
    networkDensity
  };
};

