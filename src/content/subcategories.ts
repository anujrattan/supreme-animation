import { ServiceCategory } from "./services";
import { getCdnUrl } from "../lib/constants";

export type Subcategory = {
  id: string;
  categoryId: string;
  name: string;
  tagline: string;
  description: string;
  heroMedia?: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
  };
  keyFeatures: string[];
  deliverables: string[];
  industries: string[];
  useCases: string[];
  processSteps: {
    title: string;
    description: string;
    icon?: string;
  }[];
  portfolioExamples?: {
    title: string;
    description: string;
    image?: string;
    video?: string;
    thumbnail?: string;
    client?: string;
    year?: string;
    category?: string;
  }[];
  portfolioCategories?: {
    id: string;
    name: string;
    description?: string;
    thumbnail?: string;
    images: {
      src: string;
      alt: string;
      type: "image" | "video";
      thumbnail?: string;
      title?: string;
      description?: string;
    }[];
  }[];
  portfolioVideos?: {
    src: string;
    alt?: string;
    hoverSrc?: string;
    fullSrc?: string;
  }[];
  portfolioImages?: {
    src: string;
    alt?: string;
    type?: "image" | "video";
  }[];
  videoGallery?: {
    src: string;
    alt?: string;
  }[];
  youtubeEmbed?: {
    url: string;
    type: 'video' | 'channel';
    title: string;
    description?: string;
  };
  seoMeta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

// Helper function to create subcategory slug from name
export function createSubcategorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to generate subcategory data from category (fallback)
export function generateSubcategoryFromCategory(
  category: ServiceCategory,
  subcategoryName: string
): Subcategory {
  const slug = createSubcategorySlug(subcategoryName);
  return {
    id: slug,
    categoryId: category.id,
    name: subcategoryName,
    tagline: `${subcategoryName} services by Supreme Animation Studio`,
    description: `Professional ${subcategoryName.toLowerCase()} services. ${category.description}`,
    keyFeatures: category.keyBenefits || [],
    deliverables: category.deliverables.filter(d => 
      d.toLowerCase().includes(subcategoryName.toLowerCase().split(' ')[0]) ||
      d.toLowerCase().includes(subcategoryName.toLowerCase().split(' ')[1] || '')
    ).slice(0, 6) || category.deliverables.slice(0, 6),
    industries: category.industries,
    useCases: category.useCases,
    processSteps: category.processSteps.map(step => ({ ...step, icon: undefined })),
    seoMeta: {
      title: `${subcategoryName} Services | Supreme Animation Studio`,
      description: `Professional ${subcategoryName.toLowerCase()} services. ${category.seoMeta?.description || category.description}`,
      keywords: category.seoMeta?.keywords || [],
    },
  };
}

// Comprehensive subcategory data
export const subcategories: Subcategory[] = [
  // 3D Animation & Modeling subcategories
  {
    id: "character-design-modeling",
    categoryId: "3d-animation",
    name: "Character Design & Modeling",
    tagline: "Crafting iconic characters that captivate audiences and drive engagement",
    description: `At Supreme Animation Studio, we transform conceptual narratives into meticulously crafted 3D characters that serve as the emotional core of your project. Our character design and modeling pipeline integrates artistic vision with production-grade technical execution, delivering assets that excel in both aesthetic appeal and functional performance.

Our studio specializes in developing characters with compelling visual identities, nuanced emotional expression, and production-optimized topology. From stylized protagonists for animated series to photorealistic game characters and memorable brand mascots, we create digital personas that forge meaningful connections with audiences while meeting the rigorous demands of modern production pipelines.

Every character we deliver undergoes a comprehensive development process—from initial concept exploration through final asset optimization—ensuring seamless integration into your animation, gaming, or visualization workflow. Our commitment to technical excellence means your characters will perform flawlessly across platforms, from real-time game engines to high-end rendering pipelines.`,
    keyFeatures: [
      "End-to-end character development from concept art to production assets",
      "Multi-resolution pipeline: high-poly sculpts and optimized game-ready models",
      "Advanced facial rigging with comprehensive expression libraries",
      "Production-grade topology optimized for deformation and animation",
      "Professional UV unwrapping and PBR texture workflows",
      "Rigging-ready geometry with clean edge flow and proper edge loops"
    ],
    deliverables: [
      "Comprehensive concept art packages with character sheets and style exploration",
      "High-resolution sculpted models with detailed surface definition",
      "Production-optimized game-ready models with LOD variants",
      "Professional UV layouts and PBR texture sets (albedo, normal, roughness, metallic)",
      "Multi-angle character turnarounds and technical reference documentation",
      "Material and shader configurations for target rendering engines",
      "Complete character style guides and asset documentation"
    ],
    industries: [
      "Gaming & Entertainment",
      "Animation & Film",
      "Advertising & Marketing",
      "E-Learning & Education",
      "Virtual Reality",
      "Brand & Mascot Design"
    ],
    useCases: [
      "Creating main characters and NPCs for video games",
      "Designing animated series characters with distinct personalities",
      "Developing brand mascots and promotional characters",
      "Building character libraries for e-learning platforms",
      "Creating VR avatars and virtual presence characters",
      "Designing characters for commercial and advertising campaigns"
    ],
    processSteps: [
      {
        title: "Concept Development",
        description: "We collaborate with you to define character personality, visual style, and narrative role. Our concept artists produce comprehensive character sheets, exploring multiple design directions and establishing the foundational aesthetic that will guide the entire production pipeline.",
        icon: "🎨"
      },
      {
        title: "3D Sculpting & Modeling",
        description: "Our character artists translate approved concepts into high-resolution 3D sculpts, meticulously crafting form, proportion, and surface details. We establish clean, animation-friendly topology from the outset, ensuring our models are both visually striking and technically sound.",
        icon: "🔨"
      },
      {
        title: "Iterative Refinement",
        description: "Through structured review cycles, we refine character models, enhancing detail, expression, and overall presence. Our iterative approach ensures alignment with your vision while maintaining the technical standards required for production deployment.",
        icon: "✨"
      },
      {
        title: "UV Unwrapping & Texturing",
        description: "We create efficient UV layouts that maximize texture resolution and minimize distortion. Our texture artists develop comprehensive PBR material sets, painting detailed surface properties that bring depth, realism, and character to every surface.",
        icon: "🎭"
      },
      {
        title: "Optimization & LOD Creation",
        description: "We optimize models for your target platform, creating game-ready variants with appropriate polygon counts while preserving visual fidelity. Our optimization process includes LOD generation, texture compression, and platform-specific format conversion.",
        icon: "⚡"
      },
      {
        title: "Final Delivery & Documentation",
        description: "We deliver production-ready assets in your specified formats, accompanied by comprehensive documentation including style guides, technical specifications, and integration guidelines to ensure seamless implementation into your pipeline.",
        icon: "📦"
      }
    ],
    portfolioCategories: [
      {
        id: "gaming-characters",
        name: "Gaming Character Models",
        description: "Stylized and realistic game characters optimized for real-time rendering",
        thumbnail: "/portfolio/3d-animation/character-design-modeling/gaming-characters/01.png",
        images: [
          { src: "/portfolio/3d-animation/character-design-modeling/gaming-characters/01.png", alt: "Gaming Character Model 01", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/gaming-characters/02.png", alt: "Gaming Character Model 02", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/gaming-characters/07.png", alt: "Gaming Character Model 07", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/gaming-characters/Rat_Final.png", alt: "Rat Character Final Model", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/gaming-characters/ZBrush_grey & coloured.jpg", alt: "ZBrush Character Model - Grey and Coloured", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/gaming-characters/image.jpeg", alt: "Gaming Character Image", type: "image" },
        ],
      },
      {
        id: "religious-figures",
        name: "Religious Figure Models",
        description: "Reverent and detailed character models for religious and spiritual content",
        thumbnail: "/portfolio/3d-animation/character-design-modeling/religious-figures/Sant.png",
        images: [
          { src: "/portfolio/3d-animation/character-design-modeling/religious-figures/Sant.png", alt: "Religious Figure - Sant", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/religious-figures/04.png", alt: "Religious Figure Model 04", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/religious-figures/Close_Shot.png", alt: "Religious Figure - Close Shot", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/religious-figures/Full_Shot.png", alt: "Religious Figure - Full Shot", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/religious-figures/Persp_Shot.png", alt: "Religious Figure - Perspective Shot", type: "image" },
        ],
      },
      {
        id: "political-figures",
        name: "Political Figure Models",
        description: "Professional character models representing political figures and leaders",
        thumbnail: "/portfolio/3d-animation/character-design-modeling/political-figures/Obama.jpg",
        images: [
          { src: "/portfolio/3d-animation/character-design-modeling/political-figures/Obama.jpg", alt: "Political Figure - Obama", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/political-figures/Obama.png", alt: "Political Figure - Obama Model", type: "image" },
        ],
      },
      {
        id: "celebrities",
        name: "Celebrity Character Models",
        description: "Animated character models based on celebrities and public figures",
        thumbnail: "/portfolio/3d-animation/character-design-modeling/celebrities/Dwayne Johnson.png",
        images: [
          { src: "/portfolio/3d-animation/character-design-modeling/celebrities/Dwayne Johnson.png", alt: "Celebrity Model - Dwayne Johnson", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/celebrities/Dwayne Johnson wire frame.png", alt: "Celebrity Model - Dwayne Johnson Wireframe", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/celebrities/Dwayne.jpg", alt: "Celebrity Model - Dwayne", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/celebrities/Karan Aujla 01.jpg", alt: "Celebrity Model - Karan Aujla 01", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/celebrities/Karan Aujla 02.jpg", alt: "Celebrity Model - Karan Aujla 02", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/celebrities/Karan Aujla 03.jpg", alt: "Celebrity Model - Karan Aujla 03", type: "image" },
        ],
      },
      {
        id: "movie-characters",
        name: "Movie Character Models",
        description: "Character models inspired by and based on iconic movie characters",
        thumbnail: "/portfolio/3d-animation/character-design-modeling/movie-characters/Thanos_01_Camera 1_001.png",
        images: [
          { src: "/portfolio/3d-animation/character-design-modeling/movie-characters/Thanos_01_Camera 1_001.png", alt: "Movie Character - Thanos Camera 1", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/movie-characters/Thanos_01_Camera 2_001.png", alt: "Movie Character - Thanos Camera 2", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/movie-characters/Thanos_01_Camera 3_001.png", alt: "Movie Character - Thanos Camera 3", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/movie-characters/Thanos_01_Camera 4_001.png", alt: "Movie Character - Thanos Camera 4", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/movie-characters/Terminaor.png", alt: "Movie Character - Terminator", type: "image" },
          { src: "/portfolio/3d-animation/character-design-modeling/movie-characters/Terminaor_texture.png", alt: "Movie Character - Terminator Texture", type: "image" },
        ],
      },
    ],
    seoMeta: {
      title: "Character Design & Modeling Services | Supreme Animation Studio",
      description: "Professional 3D character design and modeling services. Custom characters, game-ready models, character animation assets. Expert character creation for games, animation, and branding.",
      keywords: ["character design", "3D character modeling", "game character design", "character animation", "3D modeling", "character creation"]
    }
  },
  {
    id: "3d-animation-production",
    categoryId: "3d-animation",
    name: "3D Animation Production",
    tagline: "Transforming static models into dynamic, story-driven animated experiences",
    description: `At Supreme Animation Studio, we breathe life into 3D assets through sophisticated animation techniques that captivate audiences and drive engagement. Our animation production pipeline combines artistic storytelling with technical precision, delivering animated content that resonates across commercial, entertainment, and educational sectors.

From character-driven narratives to product demonstrations and abstract motion design, our animation team executes complex movement sequences with attention to timing, weight, and emotional expression. We leverage industry-standard animation workflows alongside innovative techniques to produce content that meets broadcast quality standards while maintaining efficient production timelines.

Our comprehensive animation services encompass keyframe animation, motion capture integration, procedural animation systems, and camera choreography—ensuring every frame contributes to your narrative objectives and brand identity.`,
    keyFeatures: [
      "Professional keyframe animation with precise timing and motion quality",
      "Motion capture data integration, cleanup, and performance enhancement",
      "Character animation with nuanced emotional expression and personality",
      "Dynamic camera choreography and cinematic composition",
      "Advanced rigging systems for efficient animation workflows",
      "Broadcast-quality rendering with optimized output specifications"
    ],
    deliverables: [
      "Animated sequences and clips",
      "Character animation cycles",
      "Product demonstration animations",
      "Motion capture data processing",
      "Animation rigs and controllers",
      "Rendered animation files",
      "Animation style guides"
    ],
    industries: [
      "Gaming & Entertainment",
      "Advertising & Marketing",
      "E-Learning & Education",
      "Architecture & Real Estate",
      "E-commerce & Retail",
      "Film & Television"
    ],
    useCases: [
      "Creating character animations for games and interactive media",
      "Producing product demonstration and marketing animations",
      "Developing educational and training animation content",
      "Building architectural walkthrough animations",
      "Creating animated sequences for films and commercials",
      "Designing motion graphics and abstract animations"
    ],
    processSteps: [
      {
        title: "Pre-Production Planning",
        description: "We develop comprehensive animation plans including animatics, timing sheets, and motion studies. Our pre-visualization process establishes the narrative rhythm, camera blocking, and performance requirements that will guide the entire production pipeline.",
        icon: "📋"
      },
      {
        title: "Rigging & Technical Setup",
        description: "Our technical directors create sophisticated animation rigs with intuitive controllers, constraints, and automated systems. We ensure rigs are production-tested for stability, performance, and animator-friendly workflow efficiency.",
        icon: "⚙️"
      },
      {
        title: "Animation Production",
        description: "Our animation artists execute keyframe animation with attention to the principles of motion—timing, spacing, anticipation, follow-through, and appeal. We integrate motion capture data when applicable, refining raw performance into polished character animation.",
        icon: "🎬"
      },
      {
        title: "Iterative Refinement",
        description: "Through structured review cycles, we polish animations across multiple passes, refining arcs, enhancing weight and impact, and ensuring character performances convey the intended emotion and narrative clarity.",
        icon: "✨"
      },
      {
        title: "Rendering & Compositing",
        description: "We render final animations with optimized settings for your target medium, applying color grading, effects integration, and quality control to ensure broadcast-standard output across all deliverable formats.",
        icon: "🎥"
      },
      {
        title: "Final Delivery & Support",
        description: "We deliver production-ready animation files in your specified formats, accompanied by comprehensive documentation, source files for future edits, and technical support for seamless integration into your pipeline.",
        icon: "📦"
      }
    ],
    portfolioVideos: [
      {
        src: getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-Billu The Dog _ Supreme Animation Studio.mp4"),
        alt: "Billu The Dog - Character Animation",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-Cam_Active_19_08_Final.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/3d-animation-production/compressed/Cam_Active_19_08_Final.mp4"),
        alt: "Camera Animation Showcase",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-Thor VS Hanuman_Final2.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/3d-animation-production/compressed/Thor VS Hanuman_Final2.mp4"),
        alt: "Thor VS Hanuman - Epic Battle Animation",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-Children song 2d 3d- Final.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/3d-animation-production/compressed/Children song 2d 3d- Final.mp4"),
        alt: "Children's Song - 2D 3D Hybrid Animation",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-product animation showreel.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/3d-animation-production/compressed/product animation showreel.mp4"),
        alt: "Product Animation Showreel",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-Mad Croc-comertial.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/3d-animation-production/compressed/Mad Croc-comertial.mp4"),
        alt: "Mad Croc Commercial",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/3d-animation-production/Thumbnail-Portfolio.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/3d-animation-production/compressed/Portfolio.mp4"),
        alt: "Animation Portfolio Reel",
      },
    ],
    seoMeta: {
      title: "3D Animation Production Services | Supreme Animation Studio",
      description: "Professional 3D animation production services. Character animation, motion capture, product animations, and animated sequences. Expert 3D animation for games, films, and marketing.",
      keywords: ["3D animation", "character animation", "motion capture", "product animation", "3D animation production", "animated sequences"]
    }
  },
  {
    id: "architectural-visualization",
    categoryId: "3d-animation",
    name: "Architectural Visualization",
    tagline: "Transforming architectural concepts into photorealistic visual narratives",
    description: `At Supreme Animation Studio, we bridge the gap between architectural vision and tangible visual reality through photorealistic rendering and immersive spatial experiences. Our architectural visualization services transform technical drawings and conceptual designs into compelling visual assets that communicate design intent, secure client approval, and drive real estate marketing success.

Specializing in both exterior and interior visualization, we create meticulously detailed environments where lighting, materiality, and atmospheric conditions converge to showcase architectural projects at their most compelling. From static hero renders to animated walkthroughs and interactive VR experiences, our visualization pipeline delivers presentation-ready assets that resonate with stakeholders, investors, and end users.

Our team combines architectural understanding with advanced rendering technology, ensuring technical accuracy while enhancing visual appeal. Every visualization we produce serves your specific objectives—whether securing planning approval, pre-selling off-plan developments, or communicating design excellence to potential clients.`,
    keyFeatures: [
      "Photorealistic rendering with physically accurate lighting and materials",
      "Interactive VR walkthroughs for immersive spatial exploration",
      "Multiple lighting scenarios: day, night, golden hour, seasonal variations",
      "Precise material representation with PBR workflows and texture accuracy",
      "360° panoramic renders for virtual tours and online property showcases",
      "Cinematic fly-through animations with professional camera choreography"
    ],
    deliverables: [
      "High-resolution architectural renders",
      "Virtual reality walkthroughs",
      "360° panoramic images",
      "Animated fly-through videos",
      "Interactive 3D presentations",
      "Material and lighting studies",
      "Marketing visualization packages"
    ],
    industries: [
      "Architecture & Real Estate",
      "Construction & Development",
      "Interior Design",
      "Urban Planning",
      "Property Marketing",
      "Hospitality & Tourism"
    ],
    useCases: [
      "Creating marketing materials for real estate developments",
      "Producing client presentation visuals for architectural projects",
      "Developing virtual tours for property sales and leasing",
      "Building design development and visualization studies",
      "Creating pre-construction visualization for planning approval",
      "Designing immersive experiences for architectural exhibitions"
    ],
    processSteps: [
      {
        title: "Project Briefing & Analysis",
        description: "We conduct comprehensive review of architectural documentation including plans, elevations, sections, and material specifications. Our team collaborates with you to understand design intent, target audience, and key visual storytelling priorities.",
        icon: "📐"
      },
      {
        title: "3D Scene Construction",
        description: "Our modelers translate architectural drawings into precise 3D geometry, ensuring dimensional accuracy and architectural detail. We model building structures, landscape elements, context surroundings, and interior furnishings to create complete spatial environments.",
        icon: "🏗️"
      },
      {
        title: "Material Development & Lighting Design",
        description: "We apply physically-based materials with accurate surface properties and develop sophisticated lighting setups that enhance architectural features. Our lighting artists create scenarios that showcase spaces at optimal viewing conditions while maintaining atmospheric authenticity.",
        icon: "💡"
      },
      {
        title: "Camera Composition & Rendering",
        description: "We establish compelling camera angles that highlight architectural strengths and spatial relationships. Using production-grade rendering engines, we generate high-resolution images and animation sequences optimized for your presentation and marketing requirements.",
        icon: "🎨"
      },
      {
        title: "Post-Production Enhancement",
        description: "Our compositing artists refine renders with color grading, atmospheric effects, entourage integration, and final polish. We add context elements like people, vehicles, and vegetation to bring visualizations to life and enhance spatial understanding.",
        icon: "✨"
      },
      {
        title: "Final Delivery & Formats",
        description: "We deliver comprehensive visualization packages in your required formats—print-resolution images, web-optimized assets, animation files, and interactive experiences. All deliverables include technical documentation and source files for future modifications.",
        icon: "📦"
      }
    ],
    portfolioVideos: [
      {
        src: getCdnUrl("/portfolio/3d-animation/architectural-visualization/Thumbnail-architecture_4.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/architectural-visualization/compressed/architecture_4.mp4"),
        alt: "Architectural Visualization - Exterior Flythrough",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/architectural-visualization/Thumbnail-archiviz day to night.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/architectural-visualization/compressed/archiviz day to night.mp4"),
        alt: "Architectural Visualization - Day to Night Sequence",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/architectural-visualization/Thumbnail-Podlabs Walkthrough Draft.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/architectural-visualization/compressed/Podlabs Walkthrough Draft.mp4"),
        alt: "Architectural Visualization - Podlabs Walkthrough",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/architectural-visualization/Thumbnail-Oculus VR Screen Recording.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/architectural-visualization/compressed/Oculus VR Screen Recording.mp4"),
        alt: "Architectural Visualization - Oculus VR Experience",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/architectural-visualization/Thumbnail-Unreal.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/architectural-visualization/compressed/Unreal.mp4"),
        alt: "Architectural Visualization - Unreal Engine Walkthrough",
      },
    ],
    seoMeta: {
      title: "Architectural Visualization Services | Supreme Animation Studio",
      description: "Professional architectural visualization services. 3D renders, virtual walkthroughs, architectural animation, and photorealistic visualization. Expert ArchViz for architects and developers.",
      keywords: ["architectural visualization", "3D rendering", "architectural animation", "virtual walkthroughs", "ArchViz", "architectural renders"]
    }
  },
  {
    id: "product-visualization",
    categoryId: "3d-animation",
    name: "Product Visualization",
    tagline: "Elevating product presentation through photorealistic 3D visualization",
    description: `At Supreme Animation Studio, we transform product concepts and CAD data into stunning photorealistic visualizations that drive sales, enhance marketing campaigns, and streamline product development cycles. Our product visualization services bridge the gap between engineering precision and marketing appeal, creating compelling visual assets that showcase products at their absolute best.

From consumer electronics to industrial machinery, furniture to automotive components, our visualization pipeline handles products of any complexity and scale. We create hero images for e-commerce platforms, 360° product viewers for interactive websites, exploded assembly views for technical documentation, and cinematic product animations for advertising campaigns.

Our team combines technical modeling expertise with commercial photography principles, ensuring every visualization captures material authenticity, lighting perfection, and compositional excellence. Whether you need pre-production visualization for crowdfunding campaigns or high-volume e-commerce asset generation, we deliver production-ready visuals that convert viewers into customers.`,
    keyFeatures: [
      "Photorealistic rendering with physically accurate materials and lighting",
      "360° product viewers and interactive configurators for web integration",
      "Exploded assembly views and technical cutaway visualizations",
      "Product animation with dynamic camera movements and feature highlights",
      "Multiple variant generation: colors, materials, configurations automated",
      "E-commerce ready assets optimized for web, print, and AR platforms"
    ],
    deliverables: [
      "High-resolution product renders",
      "360° product spin animations",
      "Interactive product configurators",
      "Exploded view diagrams",
      "Product animation videos",
      "E-commerce image sets",
      "AR-ready 3D models"
    ],
    industries: [
      "Consumer Electronics & Technology",
      "Furniture & Home Decor",
      "Automotive & Transportation",
      "Industrial Equipment & Machinery",
      "Fashion & Accessories",
      "Medical Devices & Healthcare"
    ],
    useCases: [
      "Creating e-commerce product images before physical prototypes exist",
      "Producing marketing visuals for product launches and campaigns",
      "Developing interactive product configurators for websites",
      "Building technical documentation and assembly instruction visuals",
      "Generating product variants efficiently for catalog production",
      "Creating AR experiences for mobile product visualization"
    ],
    processSteps: [
      {
        title: "Product Analysis & Reference",
        description: "We analyze product specifications, CAD files, technical drawings, and reference materials. Our team collaborates with you to understand product features, target audience, and key selling points that visualization should emphasize.",
        icon: "🔍"
      },
      {
        title: "3D Modeling & Accuracy Verification",
        description: "Our modelers create precise 3D representations from CAD data or build models from scratch using reference imagery. We ensure dimensional accuracy, correct proportions, and authentic detail that matches your product specifications.",
        icon: "📐"
      },
      {
        title: "Material Development & Texturing",
        description: "We develop physically-based materials that accurately represent product surfaces—metals, plastics, fabrics, glass, and composite materials. Our texturing artists capture surface details, wear patterns, and material characteristics that communicate quality.",
        icon: "🎨"
      },
      {
        title: "Lighting & Scene Setup",
        description: "Our lighting artists create studio-quality lighting setups that enhance product features and create visual appeal. We establish camera angles, composition, and environmental context that align with your brand aesthetic and marketing objectives.",
        icon: "💡"
      },
      {
        title: "Rendering & Post-Production",
        description: "We render high-resolution images and animations using production-grade rendering engines. Our compositing team applies color grading, background integration, and final polish to create marketing-ready visuals that stand out.",
        icon: "🖼️"
      },
      {
        title: "Delivery & Asset Optimization",
        description: "We deliver comprehensive visualization packages optimized for your specific use cases—web-resolution images, print-quality files, animation sequences, and interactive 3D assets. All deliverables include source files for future modifications.",
        icon: "📦"
      }
    ],
    portfolioImages: [
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/001.jpg", alt: "Product Visualization - Watch Render 001", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/002.JPG", alt: "Product Visualization - Watch Render 002", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/1.jpg", alt: "Product Visualization - Watch Render 1", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/17.JPG", alt: "Product Visualization - Watch Render 17", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/1_11.jpg", alt: "Product Visualization - Watch Render 1_11", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/2.jpg", alt: "Product Visualization - Watch Render 2", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/2.png", alt: "Product Visualization - Watch Render 2 PNG", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/2FrontView.jpg", alt: "Product Visualization - Watch Front View", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/2_21.jpg", alt: "Product Visualization - Watch Render 2_21", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/3.jpg", alt: "Product Visualization - Watch Render 3", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/5.jpg", alt: "Product Visualization - Watch Render 5", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/5CitizenMiyota9015.jpg", alt: "Product Visualization - Citizen Miyota 9015 Watch", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/Final 3.jpg", alt: "Product Visualization - Final Watch Render 3", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/black_side.jpg", alt: "Product Visualization - Black Watch Side View", type: "image" },
      { src: "/portfolio/3d-animation/product-visualization/consumer-products/final main without box.jpg", alt: "Product Visualization - Final Watch Main View", type: "image" },
    ],
    seoMeta: {
      title: "Product Visualization Services | Supreme Animation Studio",
      description: "Professional 3D product visualization services. Photorealistic product renders, 360° viewers, product animation, and e-commerce visuals. Expert product rendering for marketing and sales.",
      keywords: ["product visualization", "3D product rendering", "product animation", "360 product viewer", "e-commerce visualization", "product photography alternative"]
    }
  },
  {
    id: "medical-scientific-animation",
    categoryId: "3d-animation",
    name: "Medical & Scientific Animation",
    tagline: "Visualizing complex medical and scientific concepts with precision and clarity",
    description: `At Supreme Animation Studio, we specialize in translating complex medical, pharmaceutical, and scientific concepts into accurate, engaging visual narratives. Our medical and scientific animation services serve healthcare professionals, pharmaceutical companies, biotech firms, and educational institutions that require precise visualization of anatomical structures, cellular processes, surgical procedures, and molecular mechanisms.

Our team collaborates with medical experts, researchers, and subject matter specialists to ensure scientific accuracy while maintaining visual clarity. From mechanism of action (MOA) animations for drug development to patient education videos and surgical training content, we create animations that communicate complex information effectively to diverse audiences—from medical professionals to patients and investors.

We combine anatomical precision with cinematic storytelling, producing animations that are both scientifically rigorous and visually compelling. Whether you need molecular dynamics visualization, anatomical education content, or pharmaceutical marketing animations, we deliver content that meets regulatory standards while engaging your target audience.`,
    keyFeatures: [
      "Anatomically accurate 3D models based on medical imaging and research",
      "Mechanism of action (MOA) animations for pharmaceutical marketing",
      "Surgical procedure visualization and medical device demonstrations",
      "Cellular and molecular process animation with scientific precision",
      "Patient education content that simplifies complex medical concepts",
      "Interactive medical training modules and VR surgical simulations"
    ],
    deliverables: [
      "Medical animation sequences",
      "Mechanism of action videos",
      "Surgical procedure animations",
      "Patient education videos",
      "Interactive medical training content",
      "Scientific visualization renders",
      "Conference presentation animations"
    ],
    industries: [
      "Pharmaceutical & Biotechnology",
      "Medical Devices & Equipment",
      "Healthcare & Hospitals",
      "Medical Education & Training",
      "Research & Academic Institutions",
      "Veterinary Medicine"
    ],
    useCases: [
      "Creating mechanism of action animations for drug marketing and FDA submissions",
      "Producing surgical training videos for medical device companies",
      "Developing patient education content for healthcare providers",
      "Building scientific visualization for research presentations and publications",
      "Designing interactive anatomy learning modules for medical education",
      "Creating investor presentation animations for biotech fundraising"
    ],
    processSteps: [
      {
        title: "Scientific Research & Consultation",
        description: "We collaborate with medical experts and review scientific literature, medical imaging data, and technical documentation. Our team ensures comprehensive understanding of anatomical structures, physiological processes, and scientific accuracy requirements.",
        icon: "🔬"
      },
      {
        title: "Anatomical Modeling & Validation",
        description: "Our medical modelers create precise 3D anatomical structures, cellular components, and molecular systems based on reference data. We work with subject matter experts to validate anatomical accuracy and scientific correctness throughout the modeling process.",
        icon: "🫀"
      },
      {
        title: "Animation & Process Visualization",
        description: "Our animation team brings medical and scientific processes to life, accurately depicting physiological mechanisms, drug interactions, surgical procedures, and cellular dynamics. We balance scientific precision with visual clarity to ensure comprehension.",
        icon: "🎬"
      },
      {
        title: "Medical Review & Accuracy Verification",
        description: "We conduct thorough medical and scientific review cycles with your experts, ensuring all content meets accuracy standards, regulatory requirements, and educational objectives. We iterate based on expert feedback to achieve scientific rigor.",
        icon: "✓"
      },
      {
        title: "Rendering & Visual Enhancement",
        description: "We render animations with appropriate visual style—from photorealistic anatomical renders to stylized educational graphics. Our team applies color coding, labels, and visual hierarchy that enhance understanding without compromising accuracy.",
        icon: "🎨"
      },
      {
        title: "Final Delivery & Documentation",
        description: "We deliver production-ready animations with comprehensive documentation including scientific references, anatomical nomenclature, and technical specifications. All deliverables meet regulatory standards for medical and pharmaceutical applications.",
        icon: "📦"
      }
    ],
    portfolioVideos: [
      {
        src: getCdnUrl("/portfolio/3d-animation/medical-scientific-animation/Thumbnail-Final_Render_05.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/medical-scientific-animation/compressed/Final_Render_05.mp4"),
        alt: "Medical Visualization - Final Render 05",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/medical-scientific-animation/Thumbnail-Medical pillow animation-Final.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/medical-scientific-animation/compressed/Medical pillow animation-Final.mp4"),
        alt: "Medical Pillow Animation - Medical & Scientific Animation",
      },
    ],
    seoMeta: {
      title: "Medical & Scientific Animation Services | Supreme Animation Studio",
      description: "Professional medical and scientific animation services. MOA animations, surgical visualization, patient education, and anatomical animation. Expert medical visualization for healthcare and pharma.",
      keywords: ["medical animation", "scientific visualization", "MOA animation", "surgical animation", "anatomical animation", "pharmaceutical animation"]
    }
  },
  {
    id: "commercial-brand-animation",
    categoryId: "3d-animation",
    name: "Commercial & Brand Animation",
    tagline: "Crafting compelling animated narratives that elevate brands and drive engagement",
    description: `At Supreme Animation Studio, we create high-impact commercial and brand animations that capture attention, communicate brand values, and drive measurable business results. Our commercial animation services span broadcast television, digital advertising, social media campaigns, and brand identity content—delivering visually stunning animations that resonate with target audiences and amplify brand presence.

From product launch campaigns to brand story animations, logo reveals to social media content series, we craft animations that align with your brand guidelines while pushing creative boundaries. Our team combines strategic marketing insight with animation artistry, ensuring every frame serves your campaign objectives and brand positioning.

We specialize in creating scroll-stopping content optimized for modern media consumption—short-form social animations, long-form brand documentaries, interactive web experiences, and broadcast commercials. Whether you need a 6-second Instagram bumper or a 90-second brand manifesto, we deliver animations that cut through the noise and leave lasting impressions.`,
    keyFeatures: [
      "Broadcast-quality commercial animation for TV and cinema advertising",
      "Social media optimized content: Instagram, TikTok, YouTube, LinkedIn formats",
      "Brand identity animation including logo reveals and motion brand systems",
      "Product launch animations with cinematic storytelling and feature highlights",
      "Animated brand stories and company culture videos",
      "Multi-platform campaign assets with consistent brand execution"
    ],
    deliverables: [
      "TV and cinema commercials",
      "Social media animation series",
      "Logo animations and brand motion systems",
      "Product launch videos",
      "Brand story animations",
      "Digital advertising content",
      "Campaign asset packages"
    ],
    industries: [
      "Consumer Brands & Retail",
      "Technology & Software",
      "Automotive & Transportation",
      "Food & Beverage",
      "Fashion & Lifestyle",
      "Financial Services & Fintech"
    ],
    useCases: [
      "Creating product launch campaigns for new brand releases",
      "Producing social media content series for ongoing brand engagement",
      "Developing brand identity animations and motion design systems",
      "Building TV commercials and broadcast advertising content",
      "Designing animated brand stories for company websites and presentations",
      "Creating digital advertising assets for programmatic and social campaigns"
    ],
    processSteps: [
      {
        title: "Creative Brief & Strategy",
        description: "We collaborate with your marketing team to understand campaign objectives, target audience, brand guidelines, and key messages. Our creative strategists develop animation concepts that align with your marketing goals and brand positioning.",
        icon: "🎯"
      },
      {
        title: "Concept Development & Storyboarding",
        description: "Our creative team develops visual concepts, mood boards, and detailed storyboards that bring your campaign vision to life. We present multiple creative directions and refine the chosen concept through collaborative feedback.",
        icon: "📝"
      },
      {
        title: "Style Frames & Design",
        description: "We create high-fidelity style frames that establish the visual language, color palette, typography, and motion aesthetic. These frames serve as the visual blueprint for the entire animation production.",
        icon: "🎨"
      },
      {
        title: "Animation Production",
        description: "Our animation team brings the storyboard to life with dynamic motion, timing, and visual effects. We balance brand consistency with creative innovation, ensuring animations feel fresh while maintaining brand integrity.",
        icon: "🎬"
      },
      {
        title: "Sound Design & Music",
        description: "We integrate professional sound design, music composition, and voiceover that enhances the emotional impact and brand message. Our audio team creates sonic branding elements that complement the visual narrative.",
        icon: "🎵"
      },
      {
        title: "Final Delivery & Optimization",
        description: "We deliver comprehensive campaign packages optimized for all required platforms—broadcast specs, social media formats, web resolutions, and interactive versions. All assets include technical documentation and usage guidelines.",
        icon: "📦"
      }
    ],
    portfolioVideos: [
      {
        src: getCdnUrl("/portfolio/3d-animation/commercial-brand-animation/Thumbnail-Lock_animation.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/commercial-brand-animation/compressed/Lock_animation.mp4"),
        alt: "Lock Animation - Commercial Brand Animation",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/commercial-brand-animation/Thumbnail-projection mapping.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/commercial-brand-animation/compressed/projection mapping.mp4"),
        alt: "Projection Mapping - Commercial Brand Animation",
      },
    ],
    seoMeta: {
      title: "Commercial & Brand Animation Services | Supreme Animation Studio",
      description: "Professional commercial and brand animation services. TV commercials, social media content, brand stories, and advertising animation. Creative animation that drives brand engagement.",
      keywords: ["commercial animation", "brand animation", "TV commercials", "social media animation", "advertising animation", "brand video production"]
    }
  },
  {
    id: "3d-rigging-setup",
    categoryId: "3d-animation",
    name: "3D Rigging & Setup",
    tagline: "Building robust animation control systems for efficient production workflows",
    description: `At Supreme Animation Studio, we develop sophisticated 3D rigging and technical animation systems that empower animators to create compelling performances efficiently. Our rigging services provide the technical foundation for character animation, creature animation, mechanical systems, and complex deformation setups—delivering intuitive control rigs that balance flexibility with production stability.

From bipedal character rigs to quadruped creatures, facial animation systems to vehicle mechanics, we create custom rigging solutions tailored to your specific animation requirements. Our technical directors combine deep understanding of anatomy, mechanics, and animation principles with advanced rigging techniques to build rigs that feel natural to animate while maintaining technical reliability.

We specialize in production-proven rigging workflows that scale across projects—whether you need a single hero character rig for a commercial or a complete rigging pipeline for an animated series. Our rigs are built for performance, featuring optimized deformation, intuitive controls, and comprehensive documentation that enables your animation team to work efficiently.`,
    keyFeatures: [
      "Advanced character rigging with FK/IK switching and space switching",
      "Facial animation systems with blend shape controls and corrective shapes",
      "Creature and quadruped rigging with anatomically accurate deformation",
      "Mechanical and hard-surface rigging for vehicles and props",
      "Custom control systems and automated rigging tools",
      "Production-tested rigs optimized for animation performance"
    ],
    deliverables: [
      "Character animation rigs",
      "Facial animation systems",
      "Creature and animal rigs",
      "Vehicle and mechanical rigs",
      "Rigging documentation and guides",
      "Custom rigging tools and scripts",
      "Rig demo animations"
    ],
    industries: [
      "Gaming & Interactive Media",
      "Film & Television Animation",
      "Advertising & Commercial Production",
      "Virtual Production & Real-time",
      "VR & AR Experiences",
      "Educational & Training Content"
    ],
    useCases: [
      "Creating game-ready character rigs for real-time animation",
      "Building hero character rigs for film and television production",
      "Developing facial animation systems for dialogue-heavy content",
      "Rigging creatures and animals for natural movement animation",
      "Creating mechanical rigs for vehicle and product animations",
      "Building rigging pipelines for animated series production"
    ],
    processSteps: [
      {
        title: "Requirements Analysis",
        description: "We analyze animation requirements, character designs, and production constraints. Our technical directors collaborate with your animation team to understand performance needs, control preferences, and technical specifications.",
        icon: "📋"
      },
      {
        title: "Joint Placement & Skeleton Setup",
        description: "We create anatomically accurate skeletal structures with optimal joint placement for natural deformation. Our setup ensures proper joint orientation, hierarchy organization, and deformation coverage for all required movements.",
        icon: "🦴"
      },
      {
        title: "Deformation & Skinning",
        description: "Our rigging artists bind geometry to the skeleton with precise weight painting, ensuring smooth, natural deformation. We implement corrective blend shapes, muscle systems, and advanced deformation techniques for production-quality results.",
        icon: "💪"
      },
      {
        title: "Control Rig Development",
        description: "We build intuitive control systems with animator-friendly interfaces, FK/IK switching, space switching, and automated features. Our control rigs balance power and simplicity, enabling animators to focus on performance rather than technical complexity.",
        icon: "🎮"
      },
      {
        title: "Testing & Optimization",
        description: "We conduct rigorous testing with animation scenarios, stress-testing deformation, control behavior, and performance. Our technical team optimizes rig evaluation speed and resolves any technical issues before delivery.",
        icon: "⚡"
      },
      {
        title: "Documentation & Training",
        description: "We deliver comprehensive rigging documentation including control guides, feature explanations, and troubleshooting tips. We provide training sessions to ensure your animation team can utilize rigs effectively and efficiently.",
        icon: "📚"
      }
    ],
    portfolioVideos: [
      {
        src: getCdnUrl("/portfolio/3d-animation/motion-graphics-3d/Thumbnail-Animation for Bank of america.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/motion-graphics-3d/compressed/Animation for Bank of america.mp4"),
        alt: "Motion Graphics - Bank of America Animation",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/motion-graphics-3d/Thumbnail-Earth rotation animation_V3.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/motion-graphics-3d/compressed/Earth rotation animation_V3.mp4"),
        alt: "Motion Graphics - Earth Rotation Animation",
      },
    ],
    seoMeta: {
      title: "3D Rigging & Setup Services | Supreme Animation Studio",
      description: "Professional 3D rigging and character setup services. Character rigs, facial animation systems, creature rigging, and technical animation setup. Expert rigging for animation production.",
      keywords: ["3D rigging", "character rigging", "facial rigging", "creature rigging", "animation setup", "technical animation"]
    }
  },
  {
    id: "gaming-environment",
    categoryId: "3d-animation",
    name: "Gaming Environment",
    tagline: "Crafting immersive game worlds that captivate players and enhance gameplay",
    description: `At Supreme Animation Studio, we design and build immersive 3D game environments that transport players into compelling virtual worlds. Our gaming environment services span environment art, level design, asset creation, and optimization—delivering game-ready environments that balance visual fidelity with performance requirements across PC, console, mobile, and VR platforms.

From stylized fantasy landscapes to photorealistic urban environments, sci-fi installations to historical recreations, we create game worlds that support gameplay mechanics while establishing atmospheric immersion. Our environment artists combine artistic vision with technical expertise, ensuring every asset is optimized for real-time rendering while maintaining visual quality.

We specialize in complete environment production pipelines—from concept art and blockout to final asset creation, lighting, and optimization. Whether you need a single hero environment for a game trailer or a complete level suite for production, we deliver environments that enhance player experience and support your game's artistic vision.`,
    keyFeatures: [
      "Complete 3D environment design from concept to game-ready assets",
      "Modular asset systems for efficient level construction and variation",
      "PBR material workflows with optimized texture sets for real-time rendering",
      "Environment lighting and atmospheric effects for mood and immersion",
      "LOD systems and optimization for target platform performance",
      "Unity and Unreal Engine integration with proper asset setup"
    ],
    deliverables: [
      "Game-ready 3D environment assets",
      "Modular building and prop systems",
      "Environment textures and materials",
      "Lighting and atmosphere setups",
      "Optimized asset packages",
      "Unity/Unreal scene files",
      "Environment documentation"
    ],
    industries: [
      "Video Game Development",
      "Mobile Gaming",
      "VR & AR Gaming Experiences",
      "Serious Games & Simulation",
      "Metaverse & Virtual Worlds",
      "Game Marketing & Trailers"
    ],
    useCases: [
      "Creating game environments for indie and AAA game production",
      "Building VR environments for immersive gaming experiences",
      "Developing mobile game environments optimized for performance",
      "Designing architectural visualization games and virtual tours",
      "Creating environment assets for game marketing and trailers",
      "Building metaverse spaces and virtual world environments"
    ],
    processSteps: [
      {
        title: "Concept & Art Direction",
        description: "We develop environment concepts aligned with your game's artistic vision, gameplay requirements, and narrative context. Our concept artists create mood boards, sketches, and reference compilations that establish the visual direction.",
        icon: "🎨"
      },
      {
        title: "Blockout & Level Design",
        description: "Our level designers create gameplay-focused blockouts that establish spatial layout, player flow, and gameplay opportunities. We iterate on blockouts with your design team to ensure environments support intended gameplay mechanics.",
        icon: "🏗️"
      },
      {
        title: "Asset Creation & Modeling",
        description: "Our environment artists build 3D assets with appropriate detail levels for your target platform. We create modular systems that enable level variation while maintaining visual consistency and optimizing production efficiency.",
        icon: "🔨"
      },
      {
        title: "Texturing & Material Development",
        description: "We develop PBR materials and texture sets optimized for real-time rendering. Our texture artists create material libraries that maintain visual quality while adhering to memory budgets and performance constraints.",
        icon: "🖌️"
      },
      {
        title: "Lighting & Atmosphere",
        description: "Our lighting artists establish environmental mood through lighting design, atmospheric effects, and post-processing. We balance visual impact with performance, implementing optimized lighting solutions for your target platforms.",
        icon: "💡"
      },
      {
        title: "Optimization & Integration",
        description: "We optimize environments for target platform performance through LOD implementation, draw call reduction, and efficient asset organization. We deliver properly configured Unity or Unreal Engine packages ready for integration.",
        icon: "⚡"
      }
    ],
    // Flat video gallery showcasing game environments and gameplay
    portfolioVideos: [
      {
        src: getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-Kids Animal Game.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/Kids Animal Game.mp4"),
        alt: "Gaming Environment - Kids Animal Game",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-Solo Game Play.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/Solo Game Play.mp4"),
        alt: "Gaming Environment - Solo Game Play",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-Highway Racer.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/Highway Racer.mp4"),
        alt: "Gaming Environment - Highway Racer",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-2D Animation.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/2D Animation.mp4"),
        alt: "Gaming Environment - 2D Level Animation",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-SolAR.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/SolAR.mp4"),
        alt: "Gaming Environment - SolAR Experience",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-Montage_Trailler_4.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/Montage_Trailler_4.mp4"),
        alt: "Gaming Environment - Montage Trailer",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-Finla Video.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/Finla Video.mp4"),
        alt: "Gaming Environment - Final Gameplay Video",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-Bike Stunt Game.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/Bike Stunt Game.mp4"),
        alt: "Gaming Environment - Bike Stunt Game",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-Dino_Game - Main_Menu - Android - Unity 2020.3.0f1 Personal _DX11_ 2021-06-14 20-48-16-1.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/Dino_Game - Main_Menu - Android - Unity 2020.3.0f1 Personal _DX11_ 2021-06-14 20-48-16-1.mp4"),
        alt: "Gaming Environment - Dino Game Main Menu",
      },
      {
        src: getCdnUrl("/portfolio/3d-animation/gaming-environment/Thumbnail-difference-game - Menu - Android - Unity 2020.3.0f1 Personal _DX11_ 2021-04-10 18-52-49-1.mp4"),
        fullSrc: getCdnUrl("/portfolio/3d-animation/gaming-environment/compressed/difference-game - Menu - Android - Unity 2020.3.0f1 Personal _DX11_ 2021-04-10 18-52-49-1.mp4"),
        alt: "Gaming Environment - Difference Game Menu",
      },
    ],
    seoMeta: {
      title: "Gaming Environment Design Services | Supreme Animation Studio",
      description: "Professional game environment design and 3D world creation. Game-ready environments, level design, environment art, and optimization. Expert game world creation for all platforms.",
      keywords: ["game environment design", "3D game environments", "level design", "environment art", "game world creation", "Unity Unreal environments"]
    }
  },
  {
    id: "3d-asset-creation",
    categoryId: "3d-animation",
    name: "3D Asset Creation",
    tagline: "Producing high-quality 3D assets optimized for any platform and pipeline",
    description: `At Supreme Animation Studio, we create production-ready 3D assets that meet the demanding requirements of modern digital content production. Our 3D asset creation services deliver meticulously crafted models, props, characters, vehicles, and environmental elements optimized for games, film, VR/AR, visualization, and real-time applications across all platforms.

From hard-surface mechanical assets to organic character props, architectural elements to stylized game items, we build 3D assets with appropriate topology, UV layouts, and optimization for your specific use case. Our asset artists combine modeling expertise with pipeline knowledge, ensuring deliverables integrate seamlessly into your production workflow—whether Unity, Unreal Engine, film rendering, or web-based 3D.

We specialize in scalable asset production that maintains consistent quality across large asset libraries. Whether you need a single hero prop for a cinematic or hundreds of modular assets for a game environment, we deliver assets that balance visual quality with technical performance requirements.`,
    keyFeatures: [
      "High-quality 3D modeling with clean topology and efficient geometry",
      "Game-ready assets with optimized poly counts and LOD systems",
      "Professional UV unwrapping and texture coordinate optimization",
      "PBR material workflows with complete texture sets",
      "Multiple format export: FBX, OBJ, USD, glTF for cross-platform compatibility",
      "Asset documentation with technical specifications and usage guidelines"
    ],
    deliverables: [
      "3D models and assets",
      "Texture sets and materials",
      "LOD variants",
      "Rigged assets (when applicable)",
      "Multiple file format exports",
      "Asset documentation",
      "Source files for modifications"
    ],
    industries: [
      "Gaming & Interactive Media",
      "Film & Television Production",
      "Advertising & Marketing",
      "Architecture & Visualization",
      "E-commerce & Product Visualization",
      "VR/AR & Metaverse Development"
    ],
    useCases: [
      "Creating game asset libraries for production efficiency",
      "Building hero props and assets for film and commercial production",
      "Developing product 3D models for e-commerce and AR experiences",
      "Creating architectural furniture and decor assets for visualization",
      "Building vehicle and transportation assets for games and visualization",
      "Designing stylized assets for mobile games and casual gaming"
    ],
    processSteps: [
      {
        title: "Asset Specification & Reference",
        description: "We analyze asset requirements including technical specifications, visual references, style guidelines, and platform constraints. Our team establishes modeling approach, detail level, and optimization targets based on your use case.",
        icon: "📋"
      },
      {
        title: "3D Modeling & Topology",
        description: "Our modeling artists create 3D assets with clean, efficient topology optimized for your target application. We ensure proper edge flow, polygon distribution, and geometric accuracy while maintaining performance-conscious poly counts.",
        icon: "🔷"
      },
      {
        title: "UV Unwrapping & Layout",
        description: "We create optimized UV layouts with efficient texture space usage, minimal distortion, and appropriate seam placement. Our UV workflows ensure textures apply correctly and support your texturing pipeline requirements.",
        icon: "📐"
      },
      {
        title: "Texturing & Material Creation",
        description: "Our texture artists develop PBR material sets including albedo, roughness, metallic, normal, and ambient occlusion maps. We create materials that look excellent in your target engine while adhering to texture resolution budgets.",
        icon: "🎨"
      },
      {
        title: "Optimization & LOD Creation",
        description: "We optimize assets for target platform performance, creating LOD variants with appropriate poly reduction while maintaining visual quality. We ensure assets meet memory budgets and rendering performance requirements.",
        icon: "⚡"
      },
      {
        title: "Export & Quality Assurance",
        description: "We export assets in required formats with proper pivot points, scale, and naming conventions. Our QA process verifies assets import correctly into your pipeline and meet all technical specifications.",
        icon: "✓"
      }
    ],
    // Flat image gallery for 3D asset creation
    portfolioImages: [
      { src: "/portfolio/3d-animation/3d-asset-creation/01.jpg", alt: "3D Asset - Hard surface model 01", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/02.png", alt: "3D Asset - Hard surface model 02", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/(5).jpg", alt: "3D Asset - Prop render", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/3d Cave low poly.jpg", alt: "3D Asset - Low poly cave environment", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/AM211_008.png", alt: "3D Asset - Product visualization AM211_008", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/AM211_013.png", alt: "3D Asset - Product visualization AM211_013", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/AM211_024.png", alt: "3D Asset - Product visualization AM211_024", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/AM211_039.png", alt: "3D Asset - Product visualization AM211_039", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/AM211_057.png", alt: "3D Asset - Product visualization AM211_057", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/AM211_059.png", alt: "3D Asset - Product visualization AM211_059", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/AM211_060.png", alt: "3D Asset - Product visualization AM211_060", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/AM211_067.png", alt: "3D Asset - Product visualization AM211_067", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/AM211_069.png", alt: "3D Asset - Product visualization AM211_069", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Baba (3).jpeg", alt: "3D Asset - Character sculpt Baba", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/EARTHSTONE_Lvl-01_Shiny.png", alt: "3D Asset - Earthstone level 01 shiny", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Earthsky.png", alt: "3D Asset - Earth and sky environment", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Env 1.JPG", alt: "3D Asset - Environment 1", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Env 2.JPG", alt: "3D Asset - Environment 2", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Env 3.JPG", alt: "3D Asset - Environment 3", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Env 4.JPG", alt: "3D Asset - Environment 4", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Env 5.JPG", alt: "3D Asset - Environment 5", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Env 6.JPG", alt: "3D Asset - Environment 6", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Env 7.JPG", alt: "3D Asset - Environment 7", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Earthsky.png", alt: "3D Asset - Planetary environment", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Forge.png", alt: "3D Asset - Medieval forge environment", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/G_Models.png", alt: "3D Asset - Game models sheet", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/House.png", alt: "3D Asset - Stylized house model", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Images.png", alt: "3D Asset - Prop collection", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Images_016.png", alt: "3D Asset - Prop render set 016", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Laboratory.png", alt: "3D Asset - Laboratory interior", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Meganeudra_Shiny.jpg", alt: "3D Asset - Meganeudra creature", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/MicrosoftTeams-image (31).png", alt: "3D Asset - Industrial prop render", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/WhatsApp Image 2021-08-16 at 11.25.37 AM.jpeg", alt: "3D Asset - Environment composition", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/change_fixed.jpeg", alt: "3D Asset - Stylized environment shot", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/environment5.jpg", alt: "3D Asset - Exterior environment 5", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/female-worrior002.PNG", alt: "3D Asset - Female warrior character", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/galy-and-beer-mug.jpg", alt: "3D Asset - Character and beer mug prop", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/orig.jpg", alt: "3D Asset - Original character render", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/rastaban_1.png", alt: "3D Asset - Sci-fi environment Rastaban", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Warrior_Axe.jpg", alt: "3D Asset - Warrior with axe", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Warrior_Bow&Arrow.jpg", alt: "3D Asset - Warrior with bow and arrow", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Warrior_FullBody.jpg", alt: "3D Asset - Warrior full body armor", type: "image" },
      { src: "/portfolio/3d-animation/3d-asset-creation/Warrior_Male_fullbody.jpg", alt: "3D Asset - Male warrior full body", type: "image" },
    ],
    seoMeta: {
      title: "3D Asset Creation Services | Supreme Animation Studio",
      description: "Professional 3D asset creation and modeling services. Game-ready assets, props, characters, vehicles, and environment elements. Expert 3D modeling for any platform.",
      keywords: ["3D asset creation", "3D modeling services", "game assets", "3D props", "asset production", "game-ready models"]
    }
  },
  {
    id: "motion-graphics-3d",
    categoryId: "3d-animation",
    name: "Motion Graphics 3D",
    tagline: "Dynamic 3D motion design that transforms information into engaging visual experiences",
    description: `At Supreme Animation Studio, we create sophisticated 3D motion graphics that elevate brand communication, simplify complex information, and captivate audiences across digital and broadcast platforms. Our 3D motion graphics services blend dimensional design with kinetic typography, abstract animation, and data visualization—delivering content that stands out in today's attention-driven media landscape.

From broadcast graphics packages and title sequences to explainer animations and social media content, we craft motion graphics that combine aesthetic excellence with strategic communication. Our motion designers leverage 3D space to create depth, hierarchy, and visual interest that 2D motion graphics cannot achieve, while maintaining the clarity and readability essential for effective communication.

We specialize in creating motion graphics systems that scale across campaigns—establishing visual languages, animation templates, and modular systems that maintain consistency while enabling variation. Whether you need a one-off title sequence or a comprehensive motion graphics toolkit, we deliver assets that enhance your brand's visual presence.`,
    keyFeatures: [
      "3D kinetic typography with dimensional letterforms and spatial animation",
      "Abstract motion design with procedural animation and particle systems",
      "Data visualization and infographic animation with 3D representation",
      "Broadcast graphics packages including titles, lower thirds, and transitions",
      "Logo animation with dimensional reveals and motion brand systems",
      "Social media optimized motion graphics for Instagram, TikTok, YouTube"
    ],
    deliverables: [
      "Motion graphics animations",
      "Broadcast graphics packages",
      "Title sequences and openers",
      "Animated infographics",
      "Logo animations",
      "Social media motion content",
      "Motion graphics templates"
    ],
    industries: [
      "Broadcasting & Media",
      "Technology & Software",
      "Finance & Data Analytics",
      "Corporate Communications",
      "Events & Conferences",
      "Digital Marketing & Advertising"
    ],
    useCases: [
      "Creating broadcast graphics packages for TV shows and streaming content",
      "Producing title sequences for films, series, and video content",
      "Developing animated infographics for data storytelling and presentations",
      "Building social media motion graphics for brand engagement campaigns",
      "Designing event graphics for conferences and corporate presentations",
      "Creating explainer animations with motion graphics and 3D elements"
    ],
    processSteps: [
      {
        title: "Creative Brief & Concept",
        description: "We collaborate with your team to understand communication objectives, target audience, brand guidelines, and key messages. Our creative team develops motion graphics concepts that balance aesthetic impact with information clarity.",
        icon: "💡"
      },
      {
        title: "Style Development & Design",
        description: "We create style frames and design explorations that establish the visual language—color palette, typography, 3D elements, and animation aesthetic. We present multiple directions and refine the chosen style through feedback.",
        icon: "🎨"
      },
      {
        title: "Storyboard & Animatic",
        description: "Our motion designers develop detailed storyboards and animatics that establish timing, pacing, and visual flow. We ensure the narrative structure supports information hierarchy and maintains viewer engagement.",
        icon: "📋"
      },
      {
        title: "3D Design & Animation",
        description: "We build 3D elements, set up cameras, and animate motion sequences with attention to timing, easing, and visual rhythm. Our motion designers balance complexity with clarity, ensuring graphics enhance rather than obscure the message.",
        icon: "🎬"
      },
      {
        title: "Compositing & Effects",
        description: "We integrate 3D renders with 2D elements, typography, and effects in compositing. Our team applies color grading, depth effects, and final polish that creates cohesive, professional motion graphics.",
        icon: "✨"
      },
      {
        title: "Final Delivery & Templates",
        description: "We deliver motion graphics in required formats optimized for your distribution channels. When applicable, we provide editable templates that enable your team to create variations while maintaining visual consistency.",
        icon: "📦"
      }
    ],
    videoGallery: [],
    seoMeta: {
      title: "3D Motion Graphics Services | Supreme Animation Studio",
      description: "Professional 3D motion graphics and motion design services. Broadcast graphics, title sequences, animated infographics, and kinetic typography. Expert motion graphics for brands and media.",
      keywords: ["3D motion graphics", "motion design", "broadcast graphics", "title sequences", "animated infographics", "kinetic typography"]
    }
  },
  // Web, Apps & AI Systems subcategory
  {
    id: "web-apps-ai-systems",
    categoryId: "web-development",
    name: "Web, Apps & AI Systems",
    tagline: "Custom web, app, and AI development — under the same roof as your animation team.",
    description: `Supreme Animation Studio doesn’t stop at pixels on screen. Our in-house engineering team designs and builds the web and app experiences that extend your stories into the products and tools your audience actually uses.

We work with modern, scalable stacks to create fast, responsive sites and applications — no legacy themes, no bloated templates. From marketing websites and launch pages to dashboards, internal tools, and AI-driven automations, every build is tailored to your workflow and your audience.

Because engineering, design, and animation live in the same studio, we keep your brand, motion language, and UX tightly aligned from storyboard to shipped product.`,
    keyFeatures: [
      "In-house web, app, and AI system development",
      "Modern, scalable technology stacks for performance and flexibility",
      "Tight integration between design, animation, and engineering",
      "Built for SEO, responsiveness, and long-term maintainability",
    ],
    deliverables: [
      "Marketing and portfolio websites",
      "Campaign and product launch landing pages",
      "Custom web apps, dashboards, and internal tools",
      "AI automations, chatbots, and calling agents",
      "Design systems and component libraries",
    ],
    industries: [
      "Studios & Creative Agencies",
      "Brands & Marketing Teams",
      "Startups & Product Companies",
      "Education & E-Learning",
      "Healthcare & Medical",
      "Finance & Technology",
    ],
    useCases: [
      "Launching a new IP or animation series with a dedicated web experience",
      "Replacing legacy sites with a modern, fast, and maintainable stack",
      "Building dashboards and tools that visualize production or business data",
      "Embedding your animation and motion language directly into product UI",
      "Automating workflows with AI-powered chatbots and calling agents",
    ],
    processSteps: [
      {
        title: "Discovery & Architecture",
        description:
          "We define goals, users, content, and integrations, then design a technical architecture that can grow with you.",
      },
      {
        title: "UX, UI & Content",
        description:
          "We map user journeys, wireframes, and high-fidelity UI — ensuring your story, brand, and product logic all line up.",
      },
      {
        title: "Development & Integration",
        description:
          "We build your site or app using modern frameworks, integrating APIs, analytics, and AI capabilities where they add real value.",
      },
      {
        title: "Quality, Performance & Launch",
        description:
          "We test accessibility, responsiveness, performance, and edge cases, then support you through deployment and launch.",
      },
      {
        title: "Post-launch Support",
        description:
          "We stay available for refinements, new features, and future phases as your product and audience evolve.",
      },
    ],
    // Portfolio placeholder: simple image tiles for now
    portfolioExamples: [
      {
        title: "Marketing Site Placeholder",
        description:
          "Placeholder for a future marketing or portfolio website case study. Replace this with real project content and imagery.",
        image: "/portfolio/web-development/sample-marketing-site-01.svg",
        category: "Web",
      },
      {
        title: "Web App / Dashboard Placeholder",
        description:
          "Placeholder for a future web app or dashboard case study. Replace with screenshots from your production tools or client work.",
        image: "/portfolio/web-development/sample-dashboard-01.svg",
        category: "App",
      },
      {
        title: "AI Automation / Chatbot Placeholder",
        description:
          "Placeholder for an AI automation, chatbot, or calling agent project. Swap this with real visuals from your AI-powered workflows.",
        image: "/portfolio/web-development/sample-ai-automation-01.svg",
        category: "AI",
      },
    ],
    seoMeta: {
      title: "Web, Apps & AI Systems | Supreme Animation Studio",
      description:
        "Custom web, app, and AI system development built in-house at Supreme Animation Studio. Modern, scalable digital products that extend your stories beyond the video.",
      keywords: [
        "web development",
        "app development",
        "AI systems",
        "chatbots",
        "AI automations",
        "digital product studio",
      ],
    },
  },
  // 2D Animation & Design subcategories
  {
    id: "explainer-videos",
    categoryId: "2d-animation",
    name: "Explainer Videos",
    tagline: "Simplifying complex ideas into engaging visual stories",
    description: `Our Explainer Video service transforms complex concepts into clear, engaging animated stories. From product demonstrations to service explanations, we create explainer videos that educate, inform, and convert viewers into customers.

We specialize in various explainer video styles, including character-driven narratives, motion graphics, and whiteboard animations. Whether you need a 60-second product launch video or a detailed service explanation, we craft videos that communicate your message effectively and memorably.

Our explainer videos combine clear storytelling with compelling visuals, ensuring your audience understands and remembers your key messages.`,
    keyFeatures: [
      "Multiple animation styles and techniques",
      "Clear, concise storytelling",
      "Custom character and graphic design",
      "Professional voiceover integration",
      "Optimized for various platforms",
      "Quick turnaround times"
    ],
    deliverables: [
      "60-180 second explainer videos",
      "Multiple format versions (web, social, TV)",
      "Storyboards and scripts",
      "Character designs and assets",
      "Voiceover and sound design",
      "Animated graphics and icons",
      "Social media cutdowns"
    ],
    industries: [
      "Technology & SaaS",
      "Finance & Insurance",
      "Healthcare & Medical",
      "Education & E-Learning",
      "Marketing & Advertising",
      "Non-Profit & Social Impact"
    ],
    useCases: [
      "Explaining complex products and services to potential customers",
      "Creating onboarding and training videos for new users",
      "Developing marketing videos for product launches",
      "Building educational content for e-learning platforms",
      "Producing fundraising and awareness videos for non-profits",
      "Creating investor pitch and company introduction videos"
    ],
    processSteps: [
      {
        title: "Script & Concept",
        description: "We develop a clear script and concept that simplifies your message into an engaging narrative.",
        icon: "✍️"
      },
      {
        title: "Storyboard & Design",
        description: "We create storyboards and design visual assets that support your message and brand.",
        icon: "🎨"
      },
      {
        title: "Animation",
        description: "We animate the storyboard, bringing your concept to life with smooth, engaging motion.",
        icon: "🎬"
      },
      {
        title: "Voiceover & Sound",
        description: "We integrate professional voiceover and sound design to enhance the narrative impact.",
        icon: "🎤"
      },
      {
        title: "Review & Refinement",
        description: "We collaborate with you through review cycles, refining the video to perfection.",
        icon: "✨"
      },
      {
        title: "Delivery",
        description: "We deliver final videos in all required formats, optimized for your distribution channels.",
        icon: "📦"
      }
    ],
    seoMeta: {
      title: "Explainer Video Production Services | Supreme Animation Studio",
      description: "Professional explainer video production. Animated explainer videos, product demos, service explanations, and educational videos. Engaging explainer videos that convert.",
      keywords: ["explainer videos", "animated explainer", "product demo videos", "service explanation videos", "educational videos", "marketing videos"]
    }
  },
  {
    id: "2d-character-animation",
    categoryId: "2d-animation",
    name: "2D Character Animation",
    tagline: "Creating memorable characters that move, emote, and connect",
    description: `Our 2D Character Animation service brings characters to life with expressive, fluid animation. From simple character loops to complex narrative sequences, we create character animations that engage audiences and tell compelling stories.

We specialize in various 2D animation styles, including traditional hand-drawn, cutout, and rigged character animation. Whether you need character-driven commercials, animated series, or educational content, our animators deliver performances that resonate with viewers.

Our character animation combines technical skill with artistic expression, ensuring every movement feels natural and every emotion is clearly communicated.`,
    keyFeatures: [
      "Multiple 2D animation styles",
      "Expressive character performances",
      "Smooth, fluid motion",
      "Custom character design",
      "Lip-sync and dialogue animation",
      "Animation cycles and loops"
    ],
    deliverables: [
      "Character animation sequences",
      "Animation cycles and loops",
      "Character design and style guides",
      "Lip-sync animation",
      "Expression sheets and reference",
      "Animated character assets",
      "Animation source files"
    ],
    industries: [
      "Entertainment & Media",
      "Children's Content",
      "Advertising & Marketing",
      "E-Learning & Education",
      "Gaming & Interactive",
      "Brand & Marketing"
    ],
    useCases: [
      "Creating character-driven animated series and content",
      "Producing character animations for commercials and ads",
      "Developing educational characters for e-learning platforms",
      "Building character animations for games and interactive media",
      "Designing brand mascots and promotional characters",
      "Creating character content for social media and digital platforms"
    ],
    processSteps: [
      {
        title: "Character Design",
        description: "We design characters that fit your brand and story, creating style guides and reference materials.",
        icon: "🎨"
      },
      {
        title: "Rigging & Setup",
        description: "We prepare characters for animation with rigs, controllers, and animation-ready assets.",
        icon: "⚙️"
      },
      {
        title: "Animation",
        description: "Our animators bring characters to life with expressive performances and smooth motion.",
        icon: "🎬"
      },
      {
        title: "Refinement",
        description: "We polish animations, adding details and ensuring consistent character performance.",
        icon: "✨"
      },
      {
        title: "Integration",
        description: "We integrate character animations with backgrounds, effects, and other elements.",
        icon: "🔗"
      },
      {
        title: "Delivery",
        description: "We deliver final character animations in your required formats and resolutions.",
        icon: "📦"
      }
    ],
    seoMeta: {
      title: "2D Character Animation Services | Supreme Animation Studio",
      description: "Professional 2D character animation services. Character-driven animation, animated series, character design, and expressive character performances. Expert 2D character animation.",
      keywords: ["2D character animation", "character animation", "animated characters", "2D animation", "character design", "animated series"]
    }
  },
  // Visual Effects subcategories
  {
    id: "compositing-integration",
    categoryId: "visual-effects",
    name: "Compositing & Integration",
    tagline: "Seamlessly blending digital elements with live-action footage",
    description: `Our Compositing & Integration service combines digital elements with live-action footage to create seamless, believable visual effects. From simple green screen work to complex multi-layer composites, we ensure every element feels integrated and natural.

We specialize in advanced compositing techniques, including color matching, lighting integration, and depth compositing. Whether you need CGI integration, set extensions, or complex visual effects, our compositors deliver results that are indistinguishable from reality.

Our compositing workflow ensures efficient production while maintaining the highest quality standards, making us the ideal partner for film, commercial, and digital content projects.`,
    keyFeatures: [
      "Advanced compositing techniques",
      "Seamless CGI and live-action integration",
      "Color matching and lighting integration",
      "Multi-layer compositing",
      "Depth and atmospheric effects",
      "High-quality output formats"
    ],
    deliverables: [
      "Composited final footage",
      "CGI integration shots",
      "Set extension composites",
      "Green screen compositing",
      "Multi-pass composites",
      "Color-graded final output",
      "Compositing breakdowns"
    ],
    industries: [
      "Film & Television",
      "Commercial & Advertising",
      "Music Videos",
      "Corporate Videos",
      "Documentary Production",
      "Digital Content Creation"
    ],
    useCases: [
      "Integrating 3D elements into live-action footage",
      "Creating digital environments and set extensions",
      "Compositing green screen footage with backgrounds",
      "Building complex multi-layer visual effects shots",
      "Matching digital elements to live-action lighting and color",
      "Creating impossible or dangerous shots safely"
    ],
    processSteps: [
      {
        title: "Analysis & Planning",
        description: "We analyze footage and plan the compositing approach, identifying integration points and requirements.",
        icon: "🔍"
      },
      {
        title: "Tracking & Match Moving",
        description: "We track camera movement and match digital elements to live-action camera motion.",
        icon: "📹"
      },
      {
        title: "Compositing",
        description: "We composite digital elements, matching color, lighting, and atmosphere for seamless integration.",
        icon: "🎨"
      },
      {
        title: "Refinement",
        description: "We refine composites through multiple passes, ensuring perfect integration and realism.",
        icon: "✨"
      },
      {
        title: "Color Grading",
        description: "We apply final color grading to ensure visual consistency across the entire sequence.",
        icon: "🌈"
      },
      {
        title: "Delivery",
        description: "We deliver final composited footage in your required formats and resolutions.",
        icon: "📦"
      }
    ],
    seoMeta: {
      title: "Compositing & Integration Services | Supreme Animation Studio",
      description: "Professional VFX compositing services. CGI integration, green screen compositing, set extensions, and seamless visual effects. Expert compositing for film and commercial production.",
      keywords: ["compositing", "VFX compositing", "CGI integration", "green screen", "set extensions", "visual effects"]
    }
  },
  {
    id: "animated-series-development",
    categoryId: "intellectual-property",
    name: "Animated Series Development",
    tagline: "Building original IPs that captivate and grow loyal audiences",
    description: "Supreme Animation goes beyond standard client work by conceptualizing, developing, and producing original animated properties. We treat every original series as a distinct brand, crafting stories, art styles, and memorable characters that resonate globally. A prime example is our very own LittleChamps Rhymes—an original IP developed specifically for children's entertainment, showcasing our ability to run a successful, high-quality animated YouTube channel from the ground up.",
    keyFeatures: [
      "End-to-End Series Production",
      "Character & World Building",
      "Cross-Platform Distribution Strategy",
      "Audience Retention Planning"
    ],
    deliverables: [
      "Original Character Bibles",
      "Pilot Episodes",
      "Full Season Production",
      "Channel Branding packages"
    ],
    industries: [
      "Entertainment",
      "Kids & Family",
      "Digital Media",
      "Education"
    ],
    useCases: [
      "Launching an original children's series on YouTube",
      "Pitching new shows to streaming networks",
      "Developing engaging mascots for ongoing episodic content"
    ],
    processSteps: [
      {
        title: "Concept & World Building",
        description: "Defining the core premise, target demographic, and visual style."
      },
      {
        title: "Character Design & Scripting",
        description: "Creating relatable protagonists and writing engaging narratives or musical pieces."
      },
      {
        title: "Production & Animation",
        description: "Executing the vision with industry-standard 2D or 3D workflows."
      },
      {
        title: "Launch & Management",
        description: "Deploying the show, analyzing metrics, and continuously improving retention."
      }
    ],
    youtubeEmbed: {
      url: "https://www.youtube.com/channel/UCniyJl5D2gg75NCTFqXPqfg",
      type: "channel",
      title: "LittleChamps Rhymes - Original IP",
      description: "Our successful in-house intellectual property, featuring high-quality 3D animations, original music, and character designs tailor-made for children's entertainment and education. Check out the channel to see our capabilities at scale."
    },
    seoMeta: {
      title: "Animated Series Development & Original IPs | Supreme Animation Studio",
      description: "Explore our original intellectual properties and animated series development services, including our successful LittleChamps Rhymes YouTube channel.",
      keywords: ["animated series", "original IP development", "kids animation", "LittleChamps Rhymes", "YouTube animation channel"]
    }
  }
];

export function getSubcategoryById(categoryId: string, subcategoryId: string): Subcategory | undefined {
  return subcategories.find(
    sub => sub.categoryId === categoryId && (sub.id === subcategoryId || createSubcategorySlug(sub.name) === subcategoryId)
  );
}

export function getSubcategoriesByCategory(categoryId: string): Subcategory[] {
  return subcategories.filter(sub => sub.categoryId === categoryId);
}

export function getAllSubcategories(): Subcategory[] {
  return subcategories;
}
