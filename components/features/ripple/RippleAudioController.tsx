'use client';

import React, { useEffect } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';
import { useSound } from '@/lib/contexts/SoundContext';

interface RippleAudioControllerProps {
    progress: MotionValue<number>;
}

export default function RippleAudioController({ progress }: RippleAudioControllerProps) {
    const { setZone, playVoice } = useSound();

    useMotionValueEvent(progress, "change", (latest) => {
        if (latest < 0.3) {
            setZone('anxiety'); // Internal/Mono focus
        } else if (latest < 0.7) {
            setZone('transformation'); // Expanding
        } else {
            setZone('peace'); // Connected
        }
    });

    // Optional: Trigger voice cues at certain points?
    // For now, the drone shifting is the main effect.

    return null; // Logic only
}

