const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Load env vars manually
require('dotenv').config({ path: '.env.local' });

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;
const GEMINI_API_SECRET = process.env.GEMINI_API_SECRET;

if (!GEMINI_API_SECRET) {
    console.error("Missing GEMINI_API_SECRET in .env.local");
    process.exit(1);
}

// Define assets to generate
const ICONS = [
    { name: 'anxiety', prompt: 'storm cloud lightning chaos dark blue simple' },
    { name: 'transformation', prompt: 'healing hands energy wave teal flowing simple' },
    { name: 'peace', prompt: 'sun lotus flower peace golden radiance simple' },
    { name: 'tuning-fork', prompt: 'tuning fork instrument vibration sound therapy simple line art' },
    { name: 'voice-face', prompt: 'human profile face singing sound waves simple line art' },
    { name: 'singing-bowl', prompt: 'tibetan singing bowl with mallet vibration simple line art' },
    { name: 'didgeridoo', prompt: 'didgeridoo instrument wood wind simple line art' },
    { name: 'flute-drum', prompt: 'flute and drum musical instruments simple line art' },
    { name: 'globe-hands', prompt: 'earth globe held in hands healing world simple line art' },
    { name: 'ripple-world', prompt: 'earth globe with sound waves ripples emanating outwards simple' },
    { name: 'meditating-group', prompt: 'two people meditating sitting lotus position simple' }
];

const BACKGROUNDS = [
    { 
        name: 'main-bg', 
        prompt: 'A wide panoramic gradient background for a website. Left side is dark blue stormy clouds (anxiety), transitioning into a center of teal flowing energy waves (transformation), transitioning into a right side of bright golden sun and clear sky (peace). Abstract, spiritual, high quality, seamless flow.' 
    }
];

async function generateSpeech(text, filename) {
    // Placeholder / Mock for now since API is 401
    console.log(`[Mock] Generating speech for: ${filename}`);
    const mockPath = path.join(__dirname, '../public/generated/audio', `${filename}.mp3`);
    if (!fs.existsSync(mockPath)) {
        // Create a dummy empty file or copy a placeholder if we had one
        // For now we just write a tiny text file disguised as mp3 to prevent 404s in UI
        fs.writeFileSync(mockPath, 'Mock Audio Data'); 
    }
}

async function generateIcon(prompt, filename) {
    console.log(`Generating icon for: ${filename}`);
    const filePath = path.join(__dirname, '../public/generated/icons', `${filename}.svg`);
    
    // Skip if exists to save time/quota, remove file to regenerate
    if (fs.existsSync(filePath)) {
        console.log(`Skipping ${filename}, already exists.`);
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_SECRET);
        const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

        const fullPrompt = `Create a clean, minimal, spiritual SVG icon representing: "${prompt}". 
        Rules:
        1. Return ONLY the raw <svg>...</svg> code.
        2. No markdown formatting.
        3. ViewBox="0 0 24 24".
        4. Stroke color: "currentColor".
        5. Stroke width: 1.5.
        6. Fill: "none".
        7. Style: Abstract, elegant, thin lines.`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        let text = response.text();

        text = text.replace(/```xml/g, '').replace(/```svg/g, '').replace(/```/g, '').trim();
        
        const svgStart = text.indexOf('<svg');
        const svgEnd = text.lastIndexOf('</svg>');
        
        if (svgStart !== -1 && svgEnd !== -1) {
            text = text.substring(svgStart, svgEnd + 6);
            fs.writeFileSync(filePath, text);
            console.log(`Saved public/generated/icons/${filename}.svg`);
        } else {
            throw new Error("No SVG found in response");
        }

    } catch (error) {
        console.error(`Error generating icon ${filename}:`, error.message);
        const fallback = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><text x="12" y="16" font-size="10" text-anchor="middle">?</text></svg>`;
        fs.writeFileSync(filePath, fallback);
    }
}

async function generateImage(prompt, filename) {
    console.log(`Generating image for: ${filename}`);
    const filePath = path.join(__dirname, '../public/generated/images', `${filename}.png`);
    
    // Skip if exists
    if (fs.existsSync(filePath)) {
        console.log(`Skipping ${filename}, already exists.`);
        return;
    }

    // Note: Google Generative AI SDK for Node usually returns images as Base64 in response 
    // or requires specific handling for imagen models.
    // Assuming "gemini-3-pro-image-preview" works with generateContent and returns image data.
    
    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_SECRET);
        const model = genAI.getGenerativeModel({ model: "gemini-3-pro-image-preview" });
        
        // For image generation, the prompt is passed directly
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // Check for image data
        // This structure depends on the specific preview API. 
        // Usually it might be in inlineData or similar if it's a multimodal response, 
        // OR if it's an Imagen wrapper it might be different.
        // Given the uncertainty of the "preview" model schema, we'll try standard patterns.
        
        // Warning: The current public Node SDK mostly supports text/multimodal INPUT. 
        // Image OUTPUT via 'generateContent' is less standard unless it's a specific model behavior.
        // If this fails, we will generate a CSS gradient placeholder.
        
        console.log("Image generation via text-to-image model is experimental in this script.");
        throw new Error("Image generation requires specific Imagen endpoint which might not be fully wrapped here.");

    } catch (error) {
        console.error(`Error generating image ${filename}:`, error.message);
        // Create a simple placeholder 1x1 pixel or just don't create it and let CSS handle it
        // Actually, let's creating a dummy file so we know we tried.
        // fs.writeFileSync(filePath, 'Placeholder Image'); 
    }
}

async function main() {
    // Ensure dirs exist
    const dirs = ['../public/generated/icons', '../public/generated/audio', '../public/generated/images'];
    dirs.forEach(d => {
        const p = path.join(__dirname, d);
        if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
    });

    // Generate Icons
    for (const i of ICONS) {
        await generateIcon(i.prompt, i.name);
    }

    // Generate Backgrounds (Placeholder/Experimental)
    for (const b of BACKGROUNDS) {
        await generateImage(b.prompt, b.name);
    }

    // Mock Audio for new Data Points
    const NEW_AUDIO_IDS = [
        'tuning-forks', 'voice', 'singing-bells', 'didgeridoos', 
        'creative-methods', 'world-prayers', 'external-healing', 'passive-benefit'
    ];
    for (const id of NEW_AUDIO_IDS) {
        await generateSpeech(`Info about ${id}`, id);
    }
}

main();
