# Master Plan: Vibrational Healing Educational Portal

## Goal
Create an epic, interactive educational portal that mirrors the "Anxiety into Peace" infographic. The portal will be a visually rich, audio-enabled journey through sound healing, powered by AI-generated assets.

## Phase 1: Asset Generation (AI Studio)
We will use `gemini-3-pro-image-preview` for high-fidelity visuals and `gemini-3-pro-preview` for content/structure.

### 1.1 Visual Assets (Images)
- **Backgrounds:**
    - `bg-anxiety.png`: Dark, stormy, lightning, chaotic energy (Left side).
    - `bg-transformation.png`: Ethereal, flowing energy, blue/teal gradients (Center).
    - `bg-peace.png`: Radiant sun, ripples, earth, nature, light (Right side).
- **Central Elements:**
    - `meditating-figure.png`: A silhouette of a person meditating with chakras/energy field.
    - `method-icons/`: Rich illustrations for:
        - Tuning Forks
        - Voice (Chanting)
        - Singing Bells
        - Didgeridoos
        - World Prayers
        - Creative Methods

### 1.2 Audio Assets (ElevenLabs)
- **Voiceovers:** Generate narrations for each zone and tool.
    - Intro: "Journey from Anxiety into Peace..."
    - Methods: Specific descriptions for each tool.
    - Philosophy: Explanations of the lineages (Vibrational Medicine, etc.).

## Phase 2: Frontend Architecture (Next.js)

### 2.1 Layout & Composition
- **Container:** A wide, scrollable or fit-to-screen panoramic view (16:9 aspect ratio container).
- **Zones:** 3-Column Grid layout matching the infographic:
    - **Col 1 (Anxiety):** Interactive storm elements, "Core Concept" text blocks.
    - **Col 2 (Transformation):** The "Method Wheel" - a circular interactive menu surrounding the meditating figure.
    - **Col 3 (Peace):** Solar radiance, Earth ripple effects, "External World" text blocks.

### 2.2 Interactive Components
- **`MethodWheel`**: Rotatable or clickable circle of icons. Hovering expands the slice; clicking opens the modal.
- **`ZoneTrigger`**: Hovering over Anxiety/Peace zones triggers ambient audio changes (Storm sounds vs. Birds/Wind).
- **`RippleSystem`**: Enhanced ripple effect that propagates from the center outwards to the "World" on the right.

### 2.3 Educational Drawers
- **Lineage Deep Dive**: When a user engages with a concept (e.g., "Sound = Intent"), a drawer opens with the detailed text about "Vibrational Medicine" or "Biofield Science".

## Phase 3: Implementation Steps

1.  **Update Scripts**: Modify `generate-assets.js` to include Image Generation for backgrounds and method illustrations.
2.  **Generate Assets**: Run the script to populate `public/generated/`.
3.  **Scaffold UI**: Build the 3-column layout in `InteractiveMap.tsx`.
4.  **Build Method Wheel**: Create the central navigation component.
5.  **Integrate Content**: Map the generated audio and text to the UI elements.
6.  **Polish**: Add animation (framer-motion) for the "Transformation Arrow" and radiating waves.

## Phase 4: Final Polish
- [ ] Ensure mobile responsiveness (stack columns).
- [ ] Add "Start Experience" overlay to ensure audio context is ready.
- [ ] fine-tune audio mixing (ducking background when voice plays).

