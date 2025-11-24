const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Load env vars manually
require('dotenv').config({ path: '.env.local' });

const GEMINI_API_SECRET = process.env.GEMINI_API_SECRET;

// Directories
const IMAGE_DIR = path.join(__dirname, '../public/generated/images');
if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

const HERO_IMAGES = [
    { 
        name: 'hero-concept', 
        prompt: 'A scientific yet spiritual visualization of the Human Biofield. A glowing silhouette of a human surrounded by layers of toroidal energy fields, intersecting with sound waves. Teal, gold, and deep blue colors. High resolution, cinematic lighting.' 
    },
    { 
        name: 'hero-ripple', 
        prompt: 'A visualization of the Ripple Effect in a cosmic field. A single drop of golden light hitting a dark pool, sending out expanding concentric rings of light that touch distant stars and planets. Abstract, mystical, high detail.' 
    },
    { 
        name: 'hero-history', 
        prompt: 'An ancient library of scrolls and futuristic holograms merging. Representing the timeline of sound healing from ancient Nada Yoga to modern Biofield Science. Atmospheric, cinematic.' 
    },
    { 
        name: 'hero-methods', 
        prompt: 'A collection of sacred sound instruments: Tuning forks, crystal bowls, and didgeridoos floating in a void of light. High detail, mystical, ethereal.' 
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
        
        // Inspecting response structure for image data
        // Typically standard Gemini text response has candidates[0].content.parts[0].text
        // But image models usually return inlineData.
        
        // Since we are blindly calling a preview model, let's try to find the base64 string
        // This is a heuristic based on common Google AI SDK patterns for media.
        
        let base64Image = null;
        
        // Check candidates
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
            console.log(`NO IMAGE DATA FOUND for ${filename}. Response might be text-only or model mismatched.`);
            // console.log(JSON.stringify(response, null, 2)); // Debug if needed
            
            // Fallback: Create a CSS gradient placeholder SVG if generation fails
            // This ensures the UI has *something* to show
            const svgPlaceholder = `<svg width="1200" height="600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:rgb(15,23,42);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgb(45,212,191);stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grad)" />
                <text x="50%" y="50%" font-family="Arial" font-size="40" fill="white" text-anchor="middle">${filename}</text>
            </svg>`;
            
            // Save as svg so Next.js Image can treat it as static asset (renaming extension logic in component needed? No, just save as .svg)
            // Actually, let's save as .svg
            fs.writeFileSync(path.join(IMAGE_DIR, `${filename}.svg`), svgPlaceholder);
            console.log(`SAVED PLACEHOLDER: ${filename}.svg`);
        }

    } catch (error) {
        console.error(`Error generating image ${filename}:`, error.message);
    }
}

async function main() {
    for (const img of HERO_IMAGES) {
        await generateImage(img.prompt, img.name);
    }
}

main();

