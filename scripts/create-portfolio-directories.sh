#!/bin/bash

# Script to create portfolio directory structure for all 3D Animation subcategories
# Run this from the project root: bash scripts/create-portfolio-directories.sh

BASE_DIR="public/portfolio/3d-animation"

# Function to create directory structure
create_dirs() {
    local subcategory=$1
    shift
    local categories=("$@")
    
    for category in "${categories[@]}"; do
        mkdir -p "${BASE_DIR}/${subcategory}/${category}"
        echo "Created: ${BASE_DIR}/${subcategory}/${category}"
    done
}

echo "Creating portfolio directory structure for 3D Animation subcategories..."
echo ""

# 1. Character Design & Modeling
echo "Creating Character Design & Modeling directories..."
create_dirs "character-design-modeling" \
    "gaming-characters" \
    "religious-figures" \
    "political-figures" \
    "celebrities" \
    "movie-characters"

# 2. 3D Animation Production
echo ""
echo "Creating 3D Animation Production directories..."
create_dirs "3d-animation-production" \
    "character-animation" \
    "product-animation" \
    "motion-graphics" \
    "cinematic-sequences"

# 3. Product Visualization
echo ""
echo "Creating Product Visualization directories..."
create_dirs "product-visualization" \
    "consumer-products" \
    "industrial-products" \
    "automotive" \
    "electronics"

# 4. Architectural Visualization
echo ""
echo "Creating Architectural Visualization directories..."
create_dirs "architectural-visualization" \
    "exterior-renders" \
    "interior-renders" \
    "walkthroughs" \
    "360-panoramas"

# 5. Medical & Scientific Animation
echo ""
echo "Creating Medical & Scientific Animation directories..."
create_dirs "medical-scientific-animation" \
    "medical-procedures" \
    "anatomical-models" \
    "scientific-visualizations" \
    "device-demonstrations"

# 6. Commercial & Brand Animation
echo ""
echo "Creating Commercial & Brand Animation directories..."
create_dirs "commercial-brand-animation" \
    "brand-animations" \
    "product-launches" \
    "advertising-spots" \
    "social-media-content"

# 7. 3D Rigging & Setup
echo ""
echo "Creating 3D Rigging & Setup directories..."
create_dirs "3d-rigging-setup" \
    "character-rigs" \
    "facial-rigs" \
    "mechanical-rigs"

# 8. Gaming Environment
echo ""
echo "Creating Gaming Environment directories..."
create_dirs "gaming-environment" \
    "fantasy-environments" \
    "sci-fi-environments" \
    "realistic-environments" \
    "stylized-environments"

# 9. 3D Asset Creation
echo ""
echo "Creating 3D Asset Creation directories..."
create_dirs "3d-asset-creation" \
    "props-and-objects" \
    "vehicles" \
    "environments" \
    "asset-libraries"

# 10. Motion Graphics 3D
echo ""
echo "Creating Motion Graphics 3D directories..."
create_dirs "motion-graphics-3d" \
    "title-sequences" \
    "logo-animations" \
    "infographics" \
    "abstract-motion"

echo ""
echo "✅ Directory structure created successfully!"
echo ""
echo "Next steps:"
echo "1. Add your portfolio images/videos to the appropriate category folders"
echo "2. Create thumbnail.jpg files for each category (800x450px recommended)"
echo "3. Update the subcategory data in src/content/subcategories.ts with image paths"
echo ""
echo "See readme/PORTFOLIO_DIRECTORY_STRUCTURE.md for detailed guidelines."
