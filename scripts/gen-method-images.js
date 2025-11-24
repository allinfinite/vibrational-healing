const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Load env vars manually
require('dotenv').config({ path: '.env.local' });

const GEMINI_API_SECRET = process.env.GEMINI_API_SECRET;

// Directories
const IMAGE_DIR = path.join(__dirname, '../public/generated/images/methods');
const HERO_DIR = path.join(__dirname, '../public/generated/images');
if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });
if (!fs.existsSync(HERO_DIR)) fs.mkdirSync(HERO_DIR, { recursive: true });

// Hero Image for Landing Page
const HERO_IMAGE = {
    name: 'hero-landing-epic',
    prompt: 'A hyper-cinematic, wide-angle masterpiece visualizing the transition from Anxiety to Peace through Sound. LEFT SIDE: A storm of dark, jagged chaotic frequencies, lightning made of discordant sound waves, dark blue and charcoal tones. CENTER: A massive, luminous golden tuning fork standing like a monolith, radiating powerful concentric shockwaves of teal and gold light that shatter the storm. RIGHT SIDE: The shockwaves resolve into perfect sacred geometry, blooming flowers of light, crystalline structures, and a serene, glowing horizon of infinite peace. 8k resolution, volumetric lighting, particle effects, mystical, transcendence, highly detailed digital art style.'
};

const METHODS = [
    { 
        name: 'tuning-fork', 
        prompt: 'Cinematic close-up of a silver tuning fork vibrating in a mystical dark void. Visible sound waves rippling out in teal and gold light. Hyper-realistic, 8k, macro photography style, magical atmosphere.' 
    },
    { 
        name: 'voice-chanting', 
        prompt: 'Artistic visualization of the human voice as golden light waves exiting the mouth of a silhouette profile. Ethereal, glowing, spiritual connection, sacred geometry patterns in the breath.' 
    },
    { 
        name: 'singing-bowl', 
        prompt: 'A crystal singing bowl glowing with pure white and rainbow light in a peaceful temple setting. Sound resonance visualized as ripples in the air. High detail, serene, meditative.' 
    },
    { 
        name: 'didgeridoo', 
        prompt: 'A wooden didgeridoo resting on red earth, emitting low frequency vibrations visualized as deep roots connecting to the ground. Aboriginal artistic style mixed with photorealism, earthy tones, grounding.' 
    },
    { 
        name: 'world-prayer', 
        prompt: 'A glowing holographic globe held in pair of diverse hands. Beams of light connecting different continents. Visualization of collective intention and prayer. Hopeful, radiant, cinematic.' 
    },
    { 
        name: 'creative-methods', 
        prompt: 'Abstract swirl of paint, music notes, and dance ribbons merging into a vortex of creative energy. Colorful, dynamic, flowing, expressive, high resolution art.' 
    },
    {
        name: 'meditating-figure',
        prompt: 'A bioluminescent human silhouette sitting in lotus position, floating in space. Seven chakras glowing brightly along the spine. Energy field expanding outward. Mystical, transcendent.'
    },
    {
        name: 'icon-anxiety',
        prompt: 'Abstract circular icon representing Anxiety. A chaotic storm of jagged, dark purple and electric blue frequencies contained within a circle. Sharp, dissonant lines, lightning-like energy, heavy atmosphere. High contrast, 3D render, icon style.'
    },
    {
        name: 'icon-peace',
        prompt: 'Abstract circular icon representing Peace. A perfect, coherent golden ripple of light expanding outward. Soft, warm amber and gold tones, sacred geometry patterns, harmonious and radiant. Glowing, ethereal, high quality 3D render, icon style.'
    },
    {
        name: 'passive-benefit',
        prompt: 'Two figures (male and female) sitting in meditation in a serene, glowing blue environment. Surrounded by flowing waves of healing energy and soft light particles. Peaceful, harmonious, ethereal, spiritual art style, shades of teal, blue, and soft white.'
    }
];

// Lineage Icons - for the lineages section on the landing page
const LINEAGES = [
    {
        name: 'lineage-vibrational-medicine',
        prompt: 'Circular icon: A tuning fork emitting perfect concentric sound waves, surrounded by a glowing biofield aura. Scientific yet mystical. Teal and silver tones, clean design, 3D render icon style.'
    },
    {
        name: 'lineage-energy-medicine',
        prompt: 'Circular icon: Flowing prana/chi energy spiraling through a human silhouette outline. Golden life force energy. Eastern medicine meets modern science aesthetic. Warm gold and white, icon style.'
    },
    {
        name: 'lineage-nada-yoga',
        prompt: 'Circular icon: The Om symbol (ॐ) radiating sound waves, transforming into lotus petals. Ancient Sanskrit meets cosmic vibration. Deep purple and gold, spiritual, icon style.'
    },
    {
        name: 'lineage-mantra-healing',
        prompt: 'Circular icon: Sacred Sanskrit letters floating in a mandala pattern, emitting healing light rays. Spiritual text as vibration. Saffron orange and gold tones, mystical, icon style.'
    },
    {
        name: 'lineage-sound-therapy',
        prompt: 'Circular icon: Brain waves (alpha, theta, delta patterns) being harmonized by sound frequencies. Scientific visualization of entrainment. Clean blue and white, medical-meets-spiritual, icon style.'
    },
    {
        name: 'lineage-shamanic-healing',
        prompt: 'Circular icon: A drum with rippling energy waves connecting to earth and sky. Shamanic journey visualization. Earthy browns, deep reds, and ethereal blues. Primal yet cosmic, icon style.'
    },
    {
        name: 'lineage-integral-resonance',
        prompt: 'Circular icon: A coherent heart emitting toroidal field energy that expands outward to other hearts. Heart-brain coherence visualization. Rose pink and teal, interconnected, icon style.'
    },
    {
        name: 'lineage-field-effect',
        prompt: 'Circular icon: Earth surrounded by overlapping coherent wave fields from multiple sources, creating a global harmonic grid. Planetary healing visualization. Blue, green, and gold, cosmic scale, icon style.'
    }
];

async function generateImage(prompt, filename, isHero = false) {
    const targetDir = isHero ? HERO_DIR : IMAGE_DIR;
    const filepath = path.join(targetDir, `${filename}.png`);
    
    if (fs.existsSync(filepath)) {
        console.log(`✓ ${filename} already exists, skipping.`);
        return;
    }
    
    console.log(`Generating ${isHero ? 'HERO' : 'method'} image for: ${filename}`);
    
    if (!GEMINI_API_SECRET) {
        console.log("Skipping image generation (No API Key)");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_SECRET);
        const model = genAI.getGenerativeModel({ model: "gemini-3-pro-image-preview" });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        let base64Image = null;
        
        if (response.candidates && response.candidates.length > 0) {
            const parts = response.candidates[0].content.parts;
            for (const part of parts) {
                if (part.inlineData && part.inlineData.data) {
                    base64Image = part.inlineData.data;
                    break;
                }
            }
        }
        
        if (base64Image) {
             fs.writeFileSync(filepath, Buffer.from(base64Image, 'base64'));
             console.log(`SAVED: ${filename}.png`);
        } else {
            console.log(`NO IMAGE DATA for ${filename}`);
            // Log the response structure to help debugging
            console.log(JSON.stringify(response, null, 2).substring(0, 500)); 
        }

    } catch (error) {
        console.error(`Error generating image ${filename}:`, error.message);
    }
}

async function main() {
    // Generate Hero Image
    await generateImage(HERO_IMAGE.prompt, HERO_IMAGE.name, true);

    // Generate Method Images
    for (const m of METHODS) {
        await generateImage(m.prompt, m.name);
    }
    
    // Generate Lineage Icons
    console.log('\n--- Generating Lineage Icons ---');
    for (const l of LINEAGES) {
        await generateImage(l.prompt, l.name);
    }
}

main();

