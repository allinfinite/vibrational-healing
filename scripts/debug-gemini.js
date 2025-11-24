const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Load env vars manually since we are running this as a standalone script
require('dotenv').config({ path: '.env.local' });

const GEMINI_API_SECRET = process.env.GEMINI_API_SECRET;

if (!GEMINI_API_SECRET) {
    console.error("Missing GEMINI_API_SECRET in .env.local");
    process.exit(1);
}

async function listModels() {
    const genAI = new GoogleGenerativeAI(GEMINI_API_SECRET);
    try {
         // No direct listModels in this SDK version easily exposed or requires newer method
         // We will just try a known working model directly: gemini-pro
         // The error said: models/gemini-1.5-flash is not found for API version v1beta
         // This often means the API key doesn't have access to 1.5 or it's named differently (gemini-1.5-flash-latest)
         // But gemini-pro is usually safe.
         console.log("Skipping list models, trying gemini-pro...");
    } catch (e) {
        console.error(e);
    }
}

async function testModel(modelName) {
    console.log(`Testing model: ${modelName}`);
    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_SECRET);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Test");
        const response = await result.response;
        console.log(`SUCCESS: ${modelName} works.`);
        return true;
    } catch (e) {
        console.log(`FAIL: ${modelName} failed. ${e.message}`);
        return false;
    }
}

async function main() {
    const models = ['gemini-pro', 'gemini-1.0-pro', 'gemini-1.5-flash', 'gemini-1.5-pro-latest'];
    for (const m of models) {
        await testModel(m);
    }
}

main();

