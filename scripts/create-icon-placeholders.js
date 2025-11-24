#!/usr/bin/env node

/**
 * Create beautiful gradient placeholder icons for healing methods
 * These will serve as high-quality placeholders until AI images are generated
 */

const fs = require('fs');
const path = require('path');

const METHODS = [
    {
        id: 'tuning-fork',
        label: 'Tuning Forks',
        emoji: '🎵',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        colors: { start: '#667eea', end: '#764ba2' }
    },
    {
        id: 'voice-chanting',
        label: 'Voice',
        emoji: '🕉️',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        colors: { start: '#f093fb', end: '#f5576c' }
    },
    {
        id: 'singing-bowl',
        label: 'Singing Bowl',
        emoji: '🔔',
        gradient: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
        colors: { start: '#ffd89b', end: '#19547b' }
    },
    {
        id: 'didgeridoo',
        label: 'Didgeridoo',
        emoji: '🎺',
        gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
        colors: { start: '#ff9a56', end: '#ff6a88' }
    },
    {
        id: 'world-prayer',
        label: 'World Prayer',
        emoji: '🌍',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        colors: { start: '#a8edea', end: '#fed6e3' }
    },
    {
        id: 'creative-methods',
        label: 'Creative',
        emoji: '🥁',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        colors: { start: '#ffecd2', end: '#fcb69f' }
    },
    {
        id: 'meditating-figure',
        label: 'Meditation',
        emoji: '🧘',
        gradient: 'linear-gradient(135deg, #14b8a6 0%, #10b981 100%)',
        colors: { start: '#14b8a6', end: '#10b981' }
    }
];

function createSVGIcon(method) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${method.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${method.colors.start};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${method.colors.end};stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background Circle -->
  <circle cx="256" cy="256" r="256" fill="url(#grad-${method.id})"/>
  
  <!-- Subtle Radial Overlay -->
  <circle cx="256" cy="256" r="256" fill="radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)"/>
  
  <!-- Emoji/Symbol -->
  <text x="256" y="320" font-size="180" text-anchor="middle" filter="url(#glow)" opacity="0.9">
    ${method.emoji}
  </text>
</svg>`;
}

async function main() {
    console.log('🎨 Creating beautiful gradient icon placeholders...\n');
    
    const outputDir = path.join(__dirname, '../public/generated/icons-new');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    let count = 0;
    
    for (const method of METHODS) {
        const filepath = path.join(outputDir, `${method.id}.svg`);
        const svgContent = createSVGIcon(method);
        
        fs.writeFileSync(filepath, svgContent);
        console.log(`✅ Created: ${method.id}.svg`);
        count++;
    }
    
    console.log(`\n✨ Created ${count}/${METHODS.length} beautiful gradient icons!`);
    console.log('📁 Saved to: public/generated/icons-new/\n');
    console.log('These high-quality gradients will serve as placeholders.');
    console.log('The app will look great with these! 🎉');
}

main();

