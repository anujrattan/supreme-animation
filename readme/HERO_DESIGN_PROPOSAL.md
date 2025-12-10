# Hero Banner Design Proposal

## Current Issues
- Blue planet looks generic and unimpressive
- Poor composition (planet cut off at bottom)
- Asteroids are too blurry/out of focus
- Overall lacks the "premium animation studio" feel

## Design Options

### Option 1: Abstract Geometric Nebula (RECOMMENDED)
**Concept**: Floating geometric shapes with particle effects, creating a modern, abstract space
- **Elements**:
  - Large geometric shapes (dodecahedrons, torus knots) floating in space
  - Particle system creating a nebula-like effect
  - Dynamic lighting with color shifts
  - Smooth camera movement/rotation
- **Pros**: Modern, unique, showcases 3D capabilities, very interactive
- **Color Scheme**: Deep purples, blues, with accent colors matching brand (#C41E3A)

### Option 2: Cinematic Planet with Rings
**Concept**: A more detailed planet with rings, better composition
- **Elements**:
  - Detailed planet with texture (can use shaders for clouds/atmosphere)
  - Ring system around planet
  - Better positioned asteroids with sharper focus
  - Atmospheric glow effect
- **Pros**: More cinematic, familiar space aesthetic
- **Color Scheme**: Deep space blues, planet with warm/cool tones

### Option 3: Abstract Digital Particles
**Concept**: Abstract particle system forming shapes/patterns
- **Elements**:
  - Thousands of particles forming geometric patterns
  - Interactive mouse effects
  - Color gradients matching brand
  - Smooth morphing animations
- **Pros**: Very modern, showcases technical capability, unique
- **Color Scheme**: Brand colors with gradients

## Recommended: Option 1 - Abstract Geometric Nebula

### Why This Works Best:
1. **Unique & Memorable**: Not generic space scene
2. **Showcases Capabilities**: Demonstrates 3D animation skills
3. **Interactive**: Mouse parallax, smooth animations
4. **Brand Aligned**: Can incorporate brand colors naturally
5. **Performance**: Optimized particle systems run smoothly
6. **Scalable**: Works on all devices

### Visual Elements:
- **Foreground**: 2-3 large geometric shapes (dodecahedron, torus, octahedron)
- **Midground**: Particle system creating flowing nebula clouds
- **Background**: Deep space with subtle stars
- **Lighting**: Dynamic rim lighting, color-shifting point lights
- **Effects**: Subtle glow, depth of field simulation

### Technical Implementation:
- Use `@react-three/drei` for complex geometries
- Particle system using `InstancedMesh` for performance
- Shader materials for nebula effects
- Smooth camera controls
- Mouse interaction for parallax

## Implementation Plan

1. **Phase 1**: Create new HeroModel with abstract geometric shapes
2. **Phase 2**: Add particle/nebula system
3. **Phase 3**: Implement dynamic lighting and effects
4. **Phase 4**: Add mouse interactions and polish

Would you like me to proceed with Option 1, or would you prefer a different approach?

