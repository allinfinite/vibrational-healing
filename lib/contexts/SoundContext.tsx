'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';

interface SoundContextType {
  playVoice: (src: string, textFallback?: string) => void;
  stopVoice: () => void;
  setZone: (zone: 'anxiety' | 'transformation' | 'peace') => void;
  resumeContext: () => Promise<void>;
  isReady: boolean;
  analyser: AnalyserNode | null;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [currentZone, setCurrentZone] = useState<'anxiety' | 'transformation' | 'peace'>('transformation');
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  
  // Web Audio API refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const voiceRef = useRef<Howl | null>(null);
  
  // TTS State
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const initAudio = () => {
      if (typeof window !== 'undefined') {
          // @ts-ignore
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioCtxRef.current = new AudioContext();
          
          // Create Analyser
          const anal = audioCtxRef.current.createAnalyser();
          anal.fftSize = 2048;
          anal.smoothingTimeConstant = 0.8;
          setAnalyser(anal);
          
          const gain = audioCtxRef.current.createGain();
          // Connect to analyser first, then destination
          gain.connect(anal);
          anal.connect(audioCtxRef.current.destination);
          
          gain.gain.value = 0.1; 
          gainNodeRef.current = gain;
          
          // Note: Howler uses its own context usually, so visualizing Howler sounds requires connecting Howler's masterGain to this analyser if possible.
          // Since Howler creates its own context, we might just visualize the Drone Synth here.
          // To visualize Howler, we can tell Howler to use our context:
          // @ts-ignore
          if (Howler.ctx) {
              // If Howler initialized its own context, we might not be able to easily merge without more setup.
              // But we can try to connect Howler master gain to our analyser if they share context.
          }
      }
    };
    initAudio();
    
    return () => {
        if (typeof window !== 'undefined') {
            window.speechSynthesis.cancel();
        }
    };
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

  const duckAudio = (duck: boolean) => {
      if (gainNodeRef.current && audioCtxRef.current) {
          const now = audioCtxRef.current.currentTime;
          const target = duck ? 0.02 : 0.1;
          gainNodeRef.current.gain.linearRampToValueAtTime(target, now + 0.5);
      }
  };

  const playVoice = (src: string, textFallback?: string) => {
    // Stop existing
    stopVoice();

    // Try playing audio file first
    const sound = new Howl({
      src: [src],
      volume: 1.0,
      onplay: () => duckAudio(true),
      onend: () => duckAudio(false),
      onloaderror: () => {
           // Fallback to Browser TTS if audio file fails
           console.warn("Audio file failed/missing, using TTS fallback.");
           if (textFallback && typeof window !== 'undefined') {
               const utterance = new SpeechSynthesisUtterance(textFallback);
               utterance.rate = 0.9;
               utterance.pitch = 1;
               utterance.volume = 0.8;
               
               // Try to find a good voice
               const voices = window.speechSynthesis.getVoices();
               const calmVoice = voices.find(v => v.name.includes("Google UK English Female") || v.name.includes("Samantha"));
               if (calmVoice) utterance.voice = calmVoice;

               utterance.onstart = () => duckAudio(true);
               utterance.onend = () => duckAudio(false);
               
               window.speechSynthesis.speak(utterance);
               setSpeaking(true);
           } else {
               duckAudio(false);
           }
      }
    });
    
    voiceRef.current = sound;
    sound.play();
  };

  const stopVoice = () => {
      if (voiceRef.current) voiceRef.current.stop();
      if (typeof window !== 'undefined') {
          window.speechSynthesis.cancel();
      }
      duckAudio(false);
  };

  return (
    <SoundContext.Provider value={{
      playVoice,
      stopVoice,
      setZone: setCurrentZone,
      resumeContext,
      isReady,
      analyser
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
