# Method Icons

Beautiful circular icons for each healing method in the transformation wheel.

## ✅ Current Setup: Using Method Images as Icons

The transformation wheel now uses the **same high-quality AI-generated images** from the method detail pages as icons. This provides:
- ✅ Consistent visual style across the app
- ✅ Professional AI-generated artwork
- ✅ High resolution (ready for any screen size)
- ✅ Automatic fallback to gradient SVGs

## Icon Sources (in priority order)

1. **PNG images** (primary) - `/generated/icons-new/*.png`
   - Copied from `/generated/images/methods/*.png`
   - Full-quality AI-generated method images
   
2. **SVG gradients** (fallback) - `/generated/icons-new/*.svg`
   - Beautiful gradient backgrounds with emoji symbols
   - Used if PNG doesn't exist

## Managing Icons

### Copy Method Images to Icons

Already done! But if you need to refresh:

```bash
# Copy existing method images as icons
cp public/generated/images/methods/*.png public/generated/icons-new/
```

### Generate New Method Images (+ Icons)

Use the unified script that generates both:

```bash
node scripts/gen-method-images.js
```

This will:
1. Generate full-size method images (if Gemini API available)
2. Automatically copy them as icons
3. Skip existing files

### Create SVG Fallbacks

```bash
node scripts/create-icon-placeholders.js
```

Creates beautiful gradient SVG icons as fallbacks.

## Icons List

All 7 methods have both PNG and SVG versions:

1. **tuning-fork** - Mystical vibrating fork with sound waves
2. **voice-chanting** - Golden light waves from human voice
3. **singing-bowl** - Crystal bowl with rainbow light
4. **didgeridoo** - Aboriginal instrument on red earth
5. **world-prayer** - Glowing globe with diverse hands
6. **creative-methods** - Abstract swirl of creative energy
7. **meditating-figure** - Bioluminescent lotus meditation

## Technical Details

- Icons are loaded as PNG first, falling back to SVG if needed
- Next.js Image component optimizes loading automatically
- Sizes: ~500KB-1MB PNG, ~1KB SVG
- Smooth hover animations and transitions
- Labels appear on hover for clarity

