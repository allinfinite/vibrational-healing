'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';

interface SoundContextType {
  setZone: (zone: 'anxiety' | 'transformation' | 'peace') => void;
  currentZone: 'anxiety' | 'transformation' | 'peace';
  resumeContext: () => Promise<void>;
  isReady: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  playVoice: (audioSrc: string, description: string) => void;
  stopVoice: () => void;
  analyser: AnalyserNode | null;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentZone, setCurrentZone] = useState<'anxiety' | 'transformation' | 'peace'>('transformation');
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const voiceHowlRef = useRef<Howl | null>(null);
  const previousGainRef = useRef<number>(0.1);

  useEffect(() => {
    const initAudio = () => {
      if (typeof window !== 'undefined') {
          // @ts-ignore
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioCtxRef.current = new AudioContext();
          
          const analyser = audioCtxRef.current.createAnalyser();
          analyser.fftSize = 2048;
          analyserRef.current = analyser;

          // Master gain for muting
          const masterGain = audioCtxRef.current.createGain();
          masterGain.gain.value = 1;
          masterGainRef.current = masterGain;

          const gain = audioCtxRef.current.createGain();
          gain.gain.value = 0.1; 
          
          // Connect: Gain -> MasterGain -> Analyser -> Destination
          gain.connect(masterGain);
          masterGain.connect(analyser);
          analyser.connect(audioCtxRef.current.destination);
          
          gainNodeRef.current = gain;
      }
    };
    initAudio();
  }, []);

  // Drone Synth Logic (Same as before)
  useEffect(() => {
      if (!isReady || !audioCtxRef.current || !gainNodeRef.current) return;
      
      oscillatorsRef.current.forEach(o => {
          try { o.stop(); o.disconnect(); } catch(e){}
      });
      oscillatorsRef.current = [];

      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      const configs = {
          anxiety: { freqs: [55, 110, 114], type: 'sawtooth' as OscillatorType, gain: 0.05 }, 
          transformation: { freqs: [136.1, 272.2, 408.3], type: 'sine' as OscillatorType, gain: 0.1 }, 
          peace: { freqs: [432, 528, 864], type: 'sine' as OscillatorType, gain: 0.08 } 
      };

      const config = configs[currentZone];
      
      gainNodeRef.current.gain.cancelScheduledValues(now);
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, now);
      gainNodeRef.current.gain.linearRampToValueAtTime(0, now + 0.5);
      
      setTimeout(() => {
          if (!gainNodeRef.current) return;
          
          config.freqs.forEach(f => {
              const osc = ctx.createOscillator();
              osc.type = config.type;
              osc.frequency.value = f;
              
              const oscGain = ctx.createGain();
              oscGain.gain.value = 0.3;
              
              osc.connect(oscGain);
              oscGain.connect(gainNodeRef.current!);
              
              osc.start();
              oscillatorsRef.current.push(osc);
          });

          const now2 = ctx.currentTime;
          gainNodeRef.current.gain.linearRampToValueAtTime(config.gain, now2 + 2);
      }, 550);

  }, [currentZone, isReady]);

  const resumeContext = async () => {
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }
    setIsReady(true);
  };

  const toggleMute = () => {
    if (!masterGainRef.current || !audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    
    if (isMuted) {
      // Unmute - restore previous gain
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.setValueAtTime(0, now);
      masterGainRef.current.gain.linearRampToValueAtTime(1, now + 0.3);
      // Also unmute Howler
      Howler.mute(false);
    } else {
      // Mute - fade to 0
      masterGainRef.current.gain.cancelScheduledValues(now);
      masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, now);
      masterGainRef.current.gain.linearRampToValueAtTime(0, now + 0.3);
      // Also mute Howler
      Howler.mute(true);
    }
    
    setIsMuted(!isMuted);
  };

  // Fade out drone sounds when voice plays
  const fadeDrones = (fadeOut: boolean) => {
    if (!gainNodeRef.current || !audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    const currentGain = gainNodeRef.current.gain.value;
    
    gainNodeRef.current.gain.cancelScheduledValues(now);
    gainNodeRef.current.gain.setValueAtTime(currentGain, now);
    
    if (fadeOut) {
      // Store current gain and fade to near-silent
      if (currentGain > 0.01) {
        previousGainRef.current = currentGain;
      }
      gainNodeRef.current.gain.linearRampToValueAtTime(0.01, now + 0.5);
    } else {
      // Restore previous gain
      gainNodeRef.current.gain.linearRampToValueAtTime(previousGainRef.current, now + 0.8);
    }
  };

  const playVoice = (audioSrc: string, description: string) => {
    // Stop any currently playing voice
    if (voiceHowlRef.current) {
      voiceHowlRef.current.stop();
      voiceHowlRef.current.unload();
    }

    // Fade out drone sounds
    fadeDrones(true);

    // Create and play new audio
    voiceHowlRef.current = new Howl({
      src: [audioSrc],
      html5: true,
      volume: 0.8,
      onend: () => {
        voiceHowlRef.current = null;
        // Fade drones back in when audio ends
        fadeDrones(false);
      }
    });

    voiceHowlRef.current.play();
  };

  const stopVoice = () => {
    if (voiceHowlRef.current) {
      voiceHowlRef.current.stop();
      voiceHowlRef.current.unload();
      voiceHowlRef.current = null;
      // Fade drones back in when voice is stopped
      fadeDrones(false);
    }
  };

  return (
    <SoundContext.Provider value={{
      setZone: setCurrentZone,
      currentZone,
      resumeContext,
      isReady,
      isMuted,
      toggleMute,
      playVoice,
      stopVoice,
      analyser: analyserRef.current
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
