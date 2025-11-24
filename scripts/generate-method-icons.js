#!/usr/bin/env node

/**
 * Generate beautiful circular icon images for each healing method using Gemini
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Load env vars from .env.local
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const GEMINI_API_SECRET = process.env.GEMINI_API_SECRET;

if (!GEMINI_API_SECRET) {
    console.error('❌ GEMINI_API_SECRET environment variable is required');
    console.error('Please add it to .env.local file');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_SECRET);

const METHODS = [
    {
        id: 'tuning-fork',
        prompt: 'A glowing ethereal tuning fork radiating concentric sound waves in teal and gold colors, mystical healing energy, sacred geometry patterns, luminous particles, centered composition, circular icon style, dark cosmic background, photorealistic 3D render'
    },
    {
        id: 'voice-chanting',
        prompt: 'Ethereal human silhouette with sound waves emanating from throat chakra, glowing teal and purple energy, sacred mantras visualized as light, mystical meditation pose, circular icon style, cosmic starry background, photorealistic spiritual art'
    },
    {
        id: 'singing-bowl',
        prompt: 'Tibetan singing bowl with golden ripples of sound energy, floating water droplets frozen in time, teal and amber light rays, sacred temple atmosphere, centered circular composition, photorealistic 3D render with mystical glow'
    },
    {
        id: 'didgeridoo',
        prompt: 'Ancient Aboriginal didgeridoo with earth energy flowing through it, red desert dust particles, deep bass vibrations visualized as golden waves, dreamtime symbols, grounding root energy, circular icon style, cinematic lighting, photorealistic'
    },
    {
        id: 'world-prayer',
        prompt: 'Glowing Earth surrounded by prayer hands from different cultures, unified light beams connecting continents, sacred symbols (Om, Cross, Crescent) in golden light, teal and purple aurora, circular icon composition, divine spiritual atmosphere'
    },
    {
        id: 'creative-methods',
        prompt: 'Shamanic drum with light painting trails in rainbow colors, flowing rhythm visualized as colorful energy waves, dancing spirit particles, creative chaos becoming harmony, circular icon style, mystical dark background, photorealistic with magical elements'
    },
    {
        id: 'meditating-figure',
        prompt: 'Luminous Buddha-like figure in lotus position with seven glowing chakras, teal and gold aura expanding outward in sacred geometry, enlightenment rays, centered circular composition, cosmic starfield background, photorealistic spiritual art masterpiece'
    }
];

async function generateAndSaveImage(method) {
    const filepath = path.join(__dirname, `../public/generated/icons-new/${method.id}.png`);
    
    if (fs.existsSync(filepath)) {
        console.log(`✓ ${method.id} already exists, skipping.`);
        return true;
    }

    try {
        console.log(`\n🎨 Generating ${method.id}...`);
        
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
        
        const fullPrompt = `Generate a stunning circular icon image: ${method.prompt}. Style: photorealistic 3D render, mystical spiritual art, perfect for meditation/healing app icon, centered composition, professional quality.`;
        
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        
        console.log(`Response received for ${method.id}`);
        
        // Check if image was generated in response
        if (response.candidates?.[0]?.content?.parts) {
            const parts = response.candidates[0].content.parts;
            
            // Look for inline image data
            for (const part of parts) {
                if (part.inlineData && part.inlineData.data) {
                    const imageData = part.inlineData.data;
                    const buffer = Buffer.from(imageData, 'base64');
                    
                    // Ensure directory exists
                    const outputDir = path.join(__dirname, '../public/generated/icons-new');
                    if (!fs.existsSync(outputDir)) {
                        fs.mkdirSync(outputDir, { recursive: true });
                    }
                    
                    fs.writeFileSync(filepath, buffer);
                    console.log(`✅ Saved: ${method.id}.png`);
                    return true;
                }
            }
        }
        
        console.log(`⚠️  No image data in response for ${method.id}`);
        console.log('Response structure:', JSON.stringify(response, null, 2).substring(0, 500));
        return false;
        
    } catch (error) {
        console.error(`❌ Error generating ${method.id}:`, error.message);
        if (error.response) {
            console.error('Response:', error.response);
        }
        return false;
    }
}

async function main() {
    console.log('🚀 Starting Gemini icon generation...\n');
    console.log('This will create beautiful circular icons for each healing method.\n');
    console.log(`Using API key: ${GEMINI_API_SECRET.substring(0, 10)}...\n`);
    
    let successCount = 0;
    
    for (const method of METHODS) {
        const success = await generateAndSaveImage(method);
        if (success) successCount++;
        
        // Wait between requests to avoid rate limiting
        if (METHODS.indexOf(method) < METHODS.length - 1) {
            console.log('Waiting 3 seconds...');
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
    
    console.log(`\n✨ Generation complete! ${successCount}/${METHODS.length} icons created.`);
    console.log('\nImages saved to: public/generated/icons-new/');
    
    if (successCount === 0) {
        console.log('\n⚠️  No images were generated. This could be because:');
        console.log('  - The Gemini model does not support image generation via this SDK yet');
        console.log('  - API quota exceeded');
        console.log('  - Network issues');
        console.log('\nThe app will use gradient fallbacks which still look great!');
    }
}

main().catch(console.error);

