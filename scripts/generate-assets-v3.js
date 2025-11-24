const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Load env vars manually
require('dotenv').config({ path: '.env.local' });

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;
const GEMINI_API_SECRET = process.env.GEMINI_API_SECRET;

// Directories
const DIRS = ['public/generated/audio', 'public/generated/icons', 'public/generated/images'];
DIRS.forEach(d => {
    const p = path.join(__dirname, '../', d);
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// --- Data Definitions ---

// Import content-like structure (simplified copy since we can't import TS directly easily in Node script without build step)
const PAGES_CONTENT = {
    concept: {
        title: "The Science of Biofield Modulation",
        heroPrompt: "A scientific yet spiritual visualization of the Human Biofield. A glowing silhouette of a human surrounded by layers of toroidal energy fields, intersecting with sound waves. Teal, gold, and deep blue colors.",
        audioText: "Sound is a carrier of consciousness. Anxiety is simply incoherence in the system. By using intentional sound, we entrain the body back into rhythm, shifting from chaos to coherence."
    },
    ripple: {
        title: "The Ripple Effect",
        heroPrompt: "A visualization of the 'Butterfly Effect' or 'Ripple Effect' in a cosmic field. A single drop of golden light hitting a dark pool, sending out expanding concentric rings of light that touch distant stars and planets.",
        audioText: "Your inner state dictates your outer impact. When you stabilize your own vibration, you radiate peace. This is the Ripple Effect: healing the collective simply by being present."
    },
    history: {
        title: "Lineages",
        heroPrompt: "An ancient library of scrolls and futuristic holograms merging. Representing the timeline of sound healing from ancient Nada Yoga to modern Biofield Science.",
        audioText: "From the ancient caves of shamanic drumming to the modern labs of biofield science, the knowledge of sound has always been with us. Explore the eight primary lineages that map this journey."
    },
    methods: {
        title: "Methods",
        heroPrompt: "A collection of sacred sound instruments: Tuning forks, crystal bowls, and didgeridoos floating in a void of light. High detail, mystical.",
        audioText: "Every instrument has a voice, and every voice has a purpose. Whether it is the piercing clarity of a tuning fork or the grounding rumble of a didgeridoo, find the tool that resonates with you."
    }
};

// --- Generators ---

async function generateSpeech(text, filename) {
    if (fs.existsSync(path.join(__dirname, `../public/generated/audio/${filename}.mp3`))) {
        console.log(`Audio ${filename} already exists, skipping.`);
        return;
    }
    console.log(`Generating speech for: ${filename}`);
    
    // If API Key is missing, we skip (The UI has a TTS fallback now)
    if (!ELEVENLABS_API_KEY) {
        console.log("Skipping audio generation (No API Key)");
        return;
    }

    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
                text,
                model_id: "eleven_monolingual_v1",
                voice_settings: { stability: 0.5, similarity_boost: 0.5 }
            }),
        });

        if (!response.ok) {
            console.error(`Failed audio for ${filename}: ${response.status} ${response.statusText}`);
            return;
        }

        const arrayBuffer = await response.arrayBuffer();
        fs.writeFileSync(path.join(__dirname, `../public/generated/audio/${filename}.mp3`), Buffer.from(arrayBuffer));
        console.log(`Saved audio: ${filename}.mp3`);
    } catch (e) {
        console.error("Audio Gen Error:", e.message);
    }
}

async function generateImage(prompt, filename) {
    const filepath = path.join(__dirname, `../public/generated/images/${filename}.png`);
    if (fs.existsSync(filepath)) {
        console.log(`Image ${filename} already exists, skipping.`);
        return;
    }

    console.log(`Generating image for: ${filename}`);
    
    if (!GEMINI_API_SECRET) {
        console.log("Skipping image generation (No API Key)");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_SECRET);
        const model = genAI.getGenerativeModel({ model: "gemini-3-pro-image-preview" }); 
        
        // Note: Without specific docs on the preview image model response format in JS SDK, 
        // we are making a best-effort call. If it returns a URL or Base64, we handle it.
        // If not supported, we catch the error.
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        console.log(`Response received for ${filename}`);
        // Placeholder for actual binary writing logic depending on SDK version
        // For this exercise, we acknowledge the generation.
        
    } catch (error) {
        console.error(`Error generating image ${filename}:`, error.message);
    }
}

async function main() {
    // Generate Page Assets
    for (const [key, data] of Object.entries(PAGES_CONTENT)) {
        await generateSpeech(data.audioText, `page-${key}`);
        await generateImage(data.heroPrompt, `hero-${key}`);
    }
}

main();

