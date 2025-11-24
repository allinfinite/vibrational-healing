#!/usr/bin/env node

/**
 * Create a beautiful SVG placeholder for the hero image
 */

const fs = require('fs');
const path = require('path');

const heroSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1600" height="1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#134e4a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
    
    <radialGradient id="anxietyGlow" cx="20%" cy="50%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:0" />
    </radialGradient>
    
    <radialGradient id="transformGlow" cx="50%" cy="50%">
      <stop offset="0%" style="stop-color:#14b8a6;stop-opacity:0.5" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:0" />
    </radialGradient>
    
    <radialGradient id="peaceGlow" cx="80%" cy="50%">
      <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:0" />
    </radialGradient>
    
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="1600" height="1200" fill="url(#bgGrad)"/>
  
  <!-- Glowing Zones -->
  <ellipse cx="320" cy="600" rx="300" ry="400" fill="url(#anxietyGlow)"/>
  <ellipse cx="800" cy="600" rx="400" ry="500" fill="url(#transformGlow)"/>
  <ellipse cx="1280" cy="600" rx="300" ry="400" fill="url(#peaceGlow)"/>
  
  <!-- Left Zone - Anxiety -->
  <g opacity="0.7">
    <!-- Storm Cloud -->
    <ellipse cx="280" cy="300" rx="120" ry="80" fill="#64748b" opacity="0.6"/>
    <ellipse cx="340" cy="320" rx="100" ry="70" fill="#475569" opacity="0.7"/>
    
    <!-- Lightning Bolts -->
    <path d="M 290 380 L 270 440 L 285 440 L 265 500" stroke="#fbbf24" stroke-width="4" fill="none" filter="url(#glow)"/>
    <path d="M 330 390 L 315 445 L 330 445 L 315 495" stroke="#fbbf24" stroke-width="3" fill="none" filter="url(#glow)"/>
    
    <!-- Anxious Figures (Simple) -->
    <circle cx="250" cy="620" r="25" fill="#94a3b8"/>
    <rect x="238" y="645" width="24" height="60" rx="12" fill="#94a3b8"/>
    <circle cx="320" cy="640" r="22" fill="#94a3b8"/>
    <rect x="310" y="662" width="20" height="55" rx="10" fill="#94a3b8"/>
  </g>
  
  <!-- Center Zone - Transformation -->
  <g filter="url(#glow)">
    <!-- Wheel Circle -->
    <circle cx="800" cy="600" r="180" fill="none" stroke="#14b8a6" stroke-width="3" opacity="0.6"/>
    <circle cx="800" cy="600" r="150" fill="none" stroke="#14b8a6" stroke-width="2" opacity="0.4"/>
    
    <!-- Center Meditation Figure -->
    <circle cx="800" cy="580" r="35" fill="#14b8a6"/>
    <ellipse cx="800" cy="650" rx="45" ry="30" fill="#14b8a6" opacity="0.8"/>
    
    <!-- Method Symbols (Simplified) -->
    <circle cx="800" cy="420" r="28" fill="#0d9488" opacity="0.9"/>
    <circle cx="956" cy="495" r="28" fill="#0d9488" opacity="0.9"/>
    <circle cx="956" cy="705" r="28" fill="#0d9488" opacity="0.9"/>
    <circle cx="800" cy="780" r="28" fill="#0d9488" opacity="0.9"/>
    <circle cx="644" cy="705" r="28" fill="#0d9488" opacity="0.9"/>
    <circle cx="644" cy="495" r="28" fill="#0d9488" opacity="0.9"/>
    
    <!-- Energy Lines -->
    <line x1="800" y1="600" x2="800" y2="420" stroke="#14b8a6" stroke-width="1" opacity="0.3"/>
    <line x1="800" y1="600" x2="956" y2="495" stroke="#14b8a6" stroke-width="1" opacity="0.3"/>
    <line x1="800" y1="600" x2="956" y2="705" stroke="#14b8a6" stroke-width="1" opacity="0.3"/>
    <line x1="800" y1="600" x2="800" y2="780" stroke="#14b8a6" stroke-width="1" opacity="0.3"/>
    <line x1="800" y1="600" x2="644" y2="705" stroke="#14b8a6" stroke-width="1" opacity="0.3"/>
    <line x1="800" y1="600" x2="644" y2="495" stroke="#14b8a6" stroke-width="1" opacity="0.3"/>
  </g>
  
  <!-- Right Zone - Peace -->
  <g opacity="0.8">
    <!-- Sun -->
    <circle cx="1280" cy="280" r="60" fill="#fbbf24" opacity="0.8" filter="url(#glow)"/>
    <circle cx="1280" cy="280" r="70" fill="none" stroke="#fbbf24" stroke-width="2" opacity="0.4"/>
    
    <!-- Earth with Healing Aura -->
    <circle cx="1280" cy="600" r="80" fill="#059669" opacity="0.7"/>
    <circle cx="1280" cy="600" r="100" fill="none" stroke="#14b8a6" stroke-width="2" opacity="0.5"/>
    <circle cx="1280" cy="600" r="120" fill="none" stroke="#14b8a6" stroke-width="1" opacity="0.3"/>
    
    <!-- Peaceful Figures (Meditating) -->
    <circle cx="1220" cy="780" r="22" fill="#a3e635"/>
    <ellipse cx="1220" cy="825" rx="30" ry="20" fill="#a3e635" opacity="0.8"/>
    <circle cx="1300" cy="790" r="22" fill="#a3e635"/>
    <ellipse cx="1300" cy="835" rx="30" ry="20" fill="#a3e635" opacity="0.8"/>
  </g>
  
  <!-- Transformation Arrow -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#14b8a6" />
    </marker>
  </defs>
  <line x1="500" y1="150" x2="1100" y2="150" 
        stroke="#14b8a6" stroke-width="6" opacity="0.6" 
        marker-end="url(#arrowhead)" filter="url(#glow)"/>
  
  <!-- Title Text -->
  <text x="800" y="120" font-size="72" font-weight="bold" text-anchor="middle" 
        fill="url(#transformGlow)" filter="url(#glow)" font-family="system-ui">
    ANXIETY → TRANSFORMATION → PEACE
  </text>
  
  <!-- Floating Particles -->
  <circle cx="150" cy="200" r="3" fill="#14b8a6" opacity="0.6"/>
  <circle cx="450" cy="250" r="2" fill="#14b8a6" opacity="0.4"/>
  <circle cx="1100" cy="300" r="3" fill="#fbbf24" opacity="0.5"/>
  <circle cx="1400" cy="400" r="2" fill="#fbbf24" opacity="0.6"/>
  <circle cx="200" cy="900" r="2" fill="#6366f1" opacity="0.5"/>
  <circle cx="500" cy="950" r="3" fill="#14b8a6" opacity="0.4"/>
</svg>`;

async function main() {
    console.log('🎨 Creating hero image placeholder...\n');
    
    const outputPath = path.join(__dirname, '../public/generated/images/hero-landing.svg');
    const outputDir = path.dirname(outputPath);
    
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, heroSVG);
    
    console.log('✅ Created hero-landing.svg');
    console.log('📁 Saved to: public/generated/images/hero-landing.svg\n');
    console.log('This beautiful placeholder will display until AI image is generated!');
}

main();

