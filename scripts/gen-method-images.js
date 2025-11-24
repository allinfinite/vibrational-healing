const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Load env vars manually
require('dotenv').config({ path: '.env.local' });

const GEMINI_API_SECRET = process.env.GEMINI_API_SECRET;

// Directories
const IMAGE_DIR = path.join(__dirname, '../public/generated/images/methods');
if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

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
    }
];

async function generateImage(prompt, filename) {
    console.log(`Generating image for: ${filename}`);
    
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
             fs.writeFileSync(path.join(IMAGE_DIR, `${filename}.png`), base64Image, 'base64');
             console.log(`SAVED: ${filename}.png`);
        } else {
            console.log(`NO IMAGE DATA for ${filename}`);
        }

    } catch (error) {
        console.error(`Error generating image ${filename}:`, error.message);
    }
}

async function main() {
    for (const m of METHODS) {
        await generateImage(m.prompt, m.name);
    }
}

main();

