'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/lib/contexts/SoundContext';
import { PAGES_CONTENT } from '@/lib/content';
import EpicModal from '@/components/ui/EpicModal';
import Image from 'next/image';

const METHODS_LIST = [
  { 
    id: 'tuning-fork', 
    label: 'Tuning Forks', 
    desc: 'Precision frequency tools for biofield clearing.', 
    fullText: "Tuning forks are precision instruments that emit a pure, coherent acoustic wave. When placed near the body (or on acoustic meridian points), they use the principle of resonance to 'tune' the biofield. They are particularly effective for clearing static or 'noise' in the subtle energy field, much like combing out a tangled knot in hair.",
    audioFile: 'tuning-forks.mp3',
    audioSource: { title: 'Sound Healing Vibes', url: 'https://www.youtube.com/watch?v=0MzHdxXhUwQ' }
  },
  { 
    id: 'voice-chanting', 
    label: 'Voice & Chanting', 
    desc: 'Using the body as a resonant chamber.', 
    fullText: "The voice is the most powerful healing instrument because it comes from within. Self-generated sound vibrates the skull, the vagus nerve, and the entire skeletal structure. Chanting regulates the nervous system, lengthens the exhalation (stimulating the parasympathetic response), and releases nitric oxide.",
    audioFile: 'voice.mp3',
    audioSource: { title: 'Eternal Om', artist: 'Mystre and Dyloot · Communication With Spirit', url: 'https://www.youtube.com/watch?v=z96qe75LOF8' }
  },
  { 
    id: 'singing-bowl', 
    label: 'Singing Bowls', 
    desc: 'Harmonic overtones for deep relaxation.', 
    fullText: "Crystal and Tibetan singing bowls produce a rich tapestry of harmonics. These complex frequencies confuse the linear mind, allowing it to relax, while the pure tones entrain the brain into Alpha and Theta states—the zone of deep meditation and healing.",
    audioFile: 'singing-bells.mp3',
    audioSource: { title: '528Hz Mani Singing Bowl', artist: 'Sound and Silence Resonant Healing', url: 'https://soundandsilenceresonanthealing.bandcamp.com/track/528hz-mani-singing-bowl-30min' }
  },
  { 
    id: 'didgeridoo', 
    label: 'Didgeridoos', 
    desc: 'Earth frequencies for grounding.', 
    fullText: "The Didgeridoo produces ultra-low frequency (ULF) sound waves that can penetrate deep into muscle tissue and bone. It is often used for pain relief and grounding, connecting the listener to the resonant frequency of the Earth (Schumann Resonance).",
    audioFile: 'didgeridoos.mp3',
    audioSource: { title: 'Pablo Arellano Relaxing Music', url: 'https://www.youtube.com/watch?v=_jEySIFBfwQ' }
  },
  { 
    id: 'world-prayer', 
    label: 'World Prayers', 
    desc: 'Intention-based collective resonance.', 
    fullText: "Prayer, when vocalized or held in group silence, creates a coherent field of intent. Studies in consciousness science suggest that focused group intention can affect random number generators and water structure, implying that our 'sound'—whether audible or internal—shapes reality.",
    audioFile: 'world-prayers.mp3',
    audioSource: { title: 'Gregorian Chanting', url: 'https://www.youtube.com/watch?v=z96qe75LOF8' }
  },
  { 
    id: 'creative-methods', 
    label: 'Creative Expression', 
    desc: 'Art and movement as vibrational therapy.', 
    fullText: "Sound healing isn't just passive. Engaging in creative flow—painting to music, dancing to rhythm, or free-form toning—releases trapped emotional energy (e-motion = energy in motion) and integrates the healing into the physical body.",
    audioFile: 'creative-methods.mp3',
    audioSource: { title: 'Malte Marten Music', url: 'https://www.maltemartenmethod.com/' }
  },
  { 
    id: 'breath', 
    label: 'Breath', 
    desc: 'All physical movement is vibration.', 
    fullText: "Breath is the most fundamental vibration of life. Every inhale and exhale creates rhythmic waves that massage internal organs, stimulate the vagus nerve, and regulate the autonomic nervous system. Conscious breathing practices like pranayama use specific patterns to shift brainwave states, oxygenate tissues, and move stagnant energy. The breath is both a bridge between conscious and unconscious, and a powerful tool for self-regulation.\n\nYou can program your breath with intention by pairing it with silent sound. For example: on your inhale, silently resonate the sound 'MA' in your consciousness. On your exhale, silently resonate 'OM'. These sounds are not spoken aloud—they vibrate only in your mind. This practice layers intention onto the physical vibration of breath, amplifying its transformative power. The inner sound becomes a carrier wave for your focused awareness."
  },
  { 
    id: 'dance', 
    label: 'Dance', 
    desc: 'Ecstatic dance and dances of universal peace.', 
    fullText: "Dance transforms the body into a living instrument of vibration. Ecstatic dance allows free-form movement to release trauma stored in the tissues, while Dances of Universal Peace use sacred phrases from world traditions combined with simple movements to create group coherence. When we dance, we literally shake loose what no longer serves us and align with the rhythm of life itself."
  },
  { 
    id: 'drumming', 
    label: 'Drumming', 
    desc: 'Primal rhythms for trance and healing.', 
    fullText: "Drumming is one of humanity's oldest healing tools. The steady, repetitive beat of a drum entrains brainwaves into theta states—the realm of deep meditation, trance, and shamanic journeying. Group drumming synchronizes the heartbeats and nervous systems of participants, creating a powerful collective field. The low frequencies penetrate deep into the body, releasing tension and grounding scattered energy.",
    audioFile: 'drumming.mp3',
    audioSource: { title: 'Pure Shamanic Journey', artist: 'Calm Whale', url: 'https://whaleloryb.bandcamp.com/track/pure-shamanic-journey-17' }
  },
  { 
    id: 'humandalas', 
    label: 'Humandalas', 
    desc: 'Intentional Harmonic Transmission through sacred geometry.', 
    fullText: "Humandalas are the embodiment of Intentional Harmonic Transmission—the principle that intent can be encoded into a vibrational source, transmitted through energetic harmonics, and received by others as a regulatory or transformative influence.\n\nIn a Humandala, participants physically form sacred geometric patterns—circles, spirals, stars—becoming living mandalas. Each person holds focused intention while moving in synchronized harmony. The vibration of the group's collective intent is amplified by the geometric structure, creating a coherent field that extends beyond the individual participants.\n\nThis is vibrational healing at the collective scale: the group becomes both transmitter and receiver, broadcasting coherence into the surrounding field. Humandalas demonstrate that we are not isolated—our internal state ripples outward, and when we align together with shared intention, we become powerful instruments of transformation.",
    externalLink: 'https://humandalas.com'
  },
];

export default function MethodsIndex() {
  const { playVoice, setZone } = useSound();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
      setZone('transformation');
      playVoice('/generated/audio/page-methods.mp3', PAGES_CONTENT.methods.audioText);
  }, [playVoice, setZone]);

  const handleNext = () => {
      if (!selectedId) return;
      const idx = METHODS_LIST.findIndex(m => m.id === selectedId);
      const next = METHODS_LIST[(idx + 1) % METHODS_LIST.length];
      setSelectedId(next.id);
  };

  const handlePrev = () => {
      if (!selectedId) return;
      const idx = METHODS_LIST.findIndex(m => m.id === selectedId);
      const prev = METHODS_LIST[(idx - 1 + METHODS_LIST.length) % METHODS_LIST.length];
      setSelectedId(prev.id);
  };

  const selectedMethod = METHODS_LIST.find(m => m.id === selectedId);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-200 pt-16">
        {/* Hero */}
        <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-gradient-to-b from-teal-900/40 to-slate-950 z-10" />
               <img 
                  src="/generated/images/hero-methods.png" 
                  alt="Healing Methods" 
                  className="w-full h-full object-cover opacity-50"
                  onError={(e) => e.currentTarget.style.display = 'none'}
               />
            </div>
            <div className="relative z-20 text-center">
                <h1 className="text-5xl font-bold text-teal-100 tracking-widest uppercase">
                    The Tools
                </h1>
            </div>
        </section>

        {/* Methods Grid */}
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {METHODS_LIST.map((m, i) => (
                    <motion.div 
                        key={m.id}
                        whileHover={{ y: -10 }}
                        onClick={() => setSelectedId(m.id)}
                        className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-xl"
                    >
                        {/* Card Background Image */}
                        <div className="absolute inset-0">
                            <Image 
                                src={`/generated/images/methods/${m.id}.png`} 
                                alt={m.label}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">{m.label}</h3>
                            <p className="text-sm text-slate-300 line-clamp-2">{m.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Epic Modal */}
        <EpicModal 
            isOpen={!!selectedId}
            onClose={() => setSelectedId(null)}
            onNext={handleNext}
            onPrev={handlePrev}
            title={selectedMethod?.label || ''}
            subtitle="Vibrational Tool"
            description={selectedMethod?.fullText || ''}
            imageSrc={selectedMethod ? `/generated/images/methods/${selectedMethod.id}.png` : undefined}
            audioSrc={selectedMethod?.audioFile ? `/generated/audio/${selectedMethod.audioFile}` : undefined}
            audioSource={selectedMethod?.audioSource}
        />
    </div>
  );
}
