export type ServiceCategory = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heroMedia?: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
  };
  keyBenefits: string[];
  deliverables: string[];
  industries: string[];
  useCases: string[];
  processSteps: {
    title: string;
    description: string;
  }[];
  subcategories: string[];
  quickInfo?: {
    timeline?: string;
    typicalProject?: string;
    keyHighlight?: string;
    startingFrom?: string;
  };
  seoMeta?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "3d-animation",
    name: "3D Animation & Modeling",
    tagline: "Bringing characters, products, and worlds to life in three dimensions",
    description: `Supreme Animation specializes in creating immersive 3D experiences that captivate audiences and drive results. Our team combines artistic vision with technical expertise to deliver photorealistic animations, stylized characters, and dynamic environments.

From character design and modeling to full production pipelines, we handle every aspect of 3D creation. Whether you need product visualization, architectural walkthroughs, or character-driven narratives, we bring your vision to life with precision and creativity.

Our AI-enhanced workflows allow us to work faster without compromising quality, delivering premium results that stand out in today's competitive market.`,
    keyBenefits: [
      "Photorealistic and stylized 3D assets",
      "Full production pipeline from concept to delivery",
      "AI-enhanced workflows for faster turnaround",
      "Industry-standard file formats and compatibility"
    ],
    deliverables: [
      "3D character models (high-poly and game-ready)",
      "Environment and world building",
      "Product visualization renders",
      "Architectural visualization walkthroughs",
      "Medical and scientific animations",
      "Commercial and brand animations",
      "3D rigging and setup",
      "Motion graphics in 3D space",
      "3D asset libraries"
    ],
    industries: [
      "Gaming & Entertainment",
      "Advertising & Marketing",
      "Architecture & Real Estate",
      "Healthcare & Medical",
      "E-commerce & Retail",
      "Education & Training"
    ],
    useCases: [
      "Creating immersive, engaging virtual experiences for games and entertainment",
      "Capturing product showcases, virtual showrooms, and client pitches for advertising and marketing",
      "Developing interactive learning environments and training simulations for architecture, real estate, healthcare, and education",
      "Producing virtual tours and cinematic sequences for architectural visualization and real estate marketing",
      "Integrating virtual storytelling into commercial spots and product demonstrations for e-commerce and retail",
      "Generating educational content and training materials for various sectors"
    ],
    processSteps: [
      {
        title: "Discovery & Concept",
        description: "We start by understanding your vision, target audience, and project goals. Our team creates concept art, style frames, and a detailed project roadmap."
      },
      {
        title: "Modeling & Design",
        description: "Our artists create detailed 3D models, ensuring proper topology, UV mapping, and optimization for your specific use case."
      },
      {
        title: "Rigging & Setup",
        description: "We build custom rigs for characters and objects, set up lighting, and prepare the scene for animation or rendering."
      },
      {
        title: "Animation & Rendering",
        description: "Our animators bring models to life with keyframe animation or motion capture, then render final outputs in your required formats."
      },
      {
        title: "Review & Refinement",
        description: "We collaborate closely with you through review cycles, making adjustments to ensure the final product exceeds expectations."
      },
      {
        title: "Delivery & Support",
        description: "We deliver final assets in your specified formats, provide documentation, and offer ongoing support for integration."
      }
    ],
    subcategories: [
      "Character Design & Modeling",
      "3D Animation Production",
      "Product Visualization",
      "Architectural Visualization",
      "Medical & Scientific Animation",
      "Commercial & Brand Animation",
      "3D Rigging & Setup",
      "Gaming Environment",
      "3D Asset Creation",
      "Motion Graphics 3D"
    ],
    quickInfo: {
      timeline: "2-8 weeks",
      typicalProject: "Character animation or product visualization",
      keyHighlight: "AI-enhanced workflows for faster delivery",
      startingFrom: "Custom pricing"
    },
    seoMeta: {
      title: "3D Animation & Modeling Services | Supreme Animation Studio",
      description: "Professional 3D animation and modeling services. Character design, product visualization, architectural walkthroughs, and more. AI-enhanced workflows for faster delivery.",
      keywords: ["3D animation", "3D modeling", "character design", "product visualization", "architectural visualization", "3D rendering"]
    }
  },
  {
    id: "2d-animation",
    name: "2D Animation & Design",
    tagline: "Crafting engaging stories through timeless 2D animation and design",
    description: `Supreme Animation brings your ideas to life with vibrant 2D animation and design. From character-driven narratives to educational explainer videos, we create compelling visual stories that resonate with audiences.

Our 2D animation services combine traditional artistry with modern techniques, delivering everything from hand-drawn character animations to dynamic motion graphics. Whether you need explainer videos, educational content, or brand storytelling, we craft visuals that engage and inspire.

With expertise in various 2D styles and formats, we ensure your message is delivered with clarity, creativity, and impact.`,
    keyBenefits: [
      "Versatile 2D animation styles and techniques",
      "Character-driven storytelling and narratives",
      "Educational and explainer video expertise",
      "Cost-effective production workflows",
      "Quick turnaround times",
      "Scalable for various platforms and formats"
    ],
    deliverables: [
      "2D character animation",
      "Motion graphics and animated graphics",
      "Explainer videos",
      "Whiteboard and educational animations",
      "2D illustrations and design assets",
      "Storyboards and concept art",
      "Animated logos and brand videos",
      "Social media animations",
      "Animated infographics"
    ],
    industries: [
      "Education & E-Learning",
      "Marketing & Advertising",
      "Healthcare & Medical",
      "Technology & SaaS",
      "Finance & Insurance",
      "Non-Profit & Social Impact"
    ],
    useCases: [
      "Creating engaging explainer videos for product launches and marketing campaigns",
      "Developing educational content and training materials for e-learning platforms",
      "Producing animated brand stories and company introductions",
      "Designing animated infographics and data visualizations",
      "Creating character-driven narratives for children's content and entertainment",
      "Building animated presentations and pitch decks for client meetings"
    ],
    processSteps: [
      {
        title: "Concept & Script",
        description: "We collaborate with you to develop the concept, script, and visual style that best communicates your message."
      },
      {
        title: "Storyboard & Design",
        description: "Our team creates detailed storyboards and character designs, establishing the visual language and narrative flow."
      },
      {
        title: "Asset Creation",
        description: "We design and prepare all visual assets, including characters, backgrounds, and graphic elements."
      },
      {
        title: "Animation Production",
        description: "Our animators bring the story to life with smooth, engaging animations that capture attention and convey your message."
      },
      {
        title: "Sound Design & Music",
        description: "We integrate voiceover, sound effects, and music to enhance the emotional impact and engagement."
      },
      {
        title: "Final Delivery",
        description: "We deliver the final animation in your required formats, optimized for your distribution channels."
      }
    ],
    subcategories: [
      "2D Character Animation",
      "Motion Graphics 2D",
      "Explainer Videos",
      "Whiteboard & Educational Animation",
      "2D Illustration & Design",
      "Storyboard & Concept Art"
    ],
    quickInfo: {
      timeline: "1-4 weeks",
      typicalProject: "Explainer video or character animation",
      keyHighlight: "Quick turnaround with engaging storytelling",
      startingFrom: "Custom pricing"
    },
    seoMeta: {
      title: "2D Animation & Design Services | Supreme Animation Studio",
      description: "Professional 2D animation and design services. Character animation, explainer videos, motion graphics, and educational content. Engaging storytelling for your brand.",
      keywords: ["2D animation", "explainer videos", "motion graphics", "character animation", "educational animation", "whiteboard animation"]
    }
  },
  {
    id: "web-development",
    name: "Web, Apps & AI Systems",
    tagline: "Custom digital products that extend your stories beyond the screen",
    description: `Supreme Animation is more than a production studio — we also design and build the digital products that carry your stories into the real world. From high-performance marketing sites and interactive experiences to AI-powered tools, we keep strategy, storytelling, and development under one roof.

We work with modern, scalable stacks to ship custom web and app experiences: no bloated themes, no one-size-fits-all templates. Whether you need a launch site for a new IP, a product dashboard, or automations that connect your tools together, we design and develop systems that grow with your brand.

Because our engineering team sits inside the same studio as our artists, your visuals, motion, and UX stay aligned from first frame to final build.`,
    heroMedia: {
      type: "image",
      src: "/services/web-development/hero/web-app-ai-placeholder.svg",
      alt: "Supreme Animation web and app development hero placeholder",
    },
    keyBenefits: [
      "In-house web, app, and AI system development",
      "Modern, scalable technology stacks (no legacy CMS bloat)",
      "Tight integration between design, animation, and engineering",
      "Built for performance, SEO, and long-term maintainability",
    ],
    deliverables: [
      "Marketing and portfolio websites",
      "Landing pages for launches and campaigns",
      "Custom web apps and dashboards",
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
      "Launching a new IP or animation series with a dedicated site",
      "Building dashboards and tools that visualize production or business data",
      "Creating interactive companion experiences for campaigns and products",
      "Automating workflows with AI-powered chatbots and calling agents",
      "Replatforming from legacy sites to modern, fast, and maintainable stacks",
    ],
    processSteps: [
      {
        title: "Discovery & Architecture",
        description:
          "We map your goals, content, and integrations, then define a technical architecture that stays flexible as you grow.",
      },
      {
        title: "UX, UI & Content Design",
        description:
          "We translate your brand and stories into clear user journeys, page structures, and interface designs.",
      },
      {
        title: "Development & Integration",
        description:
          "We build your site or app using modern frameworks, wiring up APIs, analytics, and AI features where needed.",
      },
      {
        title: "Testing & Launch",
        description:
          "We test performance, accessibility, and responsiveness across devices, then support you through launch.",
      },
      {
        title: "Support & Iteration",
        description:
          "We stay available for optimizations, new features, and future phases as your needs evolve.",
      },
    ],
    subcategories: ["Web, Apps & AI Systems"],
    quickInfo: {
      timeline: "3–10 weeks",
      typicalProject: "Custom marketing site or web app with animation",
      keyHighlight: "In-house design, animation, and engineering alignment",
      startingFrom: "Custom pricing",
    },
    seoMeta: {
      title: "Web, Apps & AI Systems | Supreme Animation Studio",
      description:
        "In-house web and app development for brands and IPs. Custom websites, web apps, dashboards, and AI-powered automations built on modern, scalable stacks.",
      keywords: [
        "web development studio",
        "app development",
        "AI automations",
        "chatbots",
        "calling agents",
        "digital product development",
      ],
    },
  },
  {
    id: "visual-effects",
    name: "Visual Effects",
    tagline: "Seamlessly blending reality with digital artistry",
    description: `Supreme Animation delivers professional visual effects that enhance your live-action footage and create stunning cinematic experiences. Our VFX team specializes in compositing, integration, and post-production work that elevates your content.

From green screen compositing to complex CGI integration, we handle every aspect of visual effects production. Whether you need seamless object removal, motion tracking, or full-scale digital environments, we bring technical expertise and artistic vision to every project.

Our streamlined workflows ensure efficient production while maintaining the highest quality standards, making us the ideal partner for film, commercial, and digital content projects.`,
    keyBenefits: [
      "Professional compositing and integration",
      "Seamless CGI and live-action blending",
      "Advanced motion tracking and match moving",
      "Efficient post-production workflows",
      "High-quality color grading and correction",
      "Expert rotoscoping and cleanup services"
    ],
    deliverables: [
      "Green screen and chroma key compositing",
      "CGI integration with live-action footage",
      "Motion tracking and match moving",
      "Rotoscoping and object removal",
      "Matte painting and environment creation",
      "Color grading and correction",
      "Wire and rig removal",
      "Particle effects and simulations",
      "Digital set extensions"
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
      "Integrating 3D elements seamlessly into live-action footage for commercials and films",
      "Removing unwanted objects, wires, and rigs from production footage",
      "Creating digital environments and set extensions for cost-effective production",
      "Compositing green screen footage with custom backgrounds and environments",
      "Applying color grading and correction to achieve cinematic looks",
      "Tracking and matching camera movements for accurate CGI placement"
    ],
    processSteps: [
      {
        title: "Pre-Production Planning",
        description: "We analyze your footage and plan the VFX approach, identifying technical requirements and creative opportunities."
      },
      {
        title: "Tracking & Match Moving",
        description: "Our team tracks camera movements and matches 3D elements to live-action footage with precision."
      },
      {
        title: "Compositing & Integration",
        description: "We composite digital elements, remove unwanted objects, and seamlessly blend CGI with live-action."
      },
      {
        title: "Color Grading & Correction",
        description: "We apply color grading to achieve the desired look and ensure visual consistency throughout."
      },
      {
        title: "Review & Refinement",
        description: "We collaborate with you through review cycles, making adjustments to perfect the final result."
      },
      {
        title: "Final Delivery",
        description: "We deliver final footage in your required formats, ready for distribution or further post-production."
      }
    ],
    subcategories: [
      "Compositing & Integration",
      "Green Screen & Chroma Key",
      "Rotoscoping & Cleanup",
      "Motion Tracking & Match Moving",
      "CGI Integration",
      "Matte Painting",
      "Wire & Object Removal",
      "Color Grading & Correction"
    ],
    quickInfo: {
      timeline: "2-6 weeks",
      typicalProject: "Commercial or film VFX integration",
      keyHighlight: "Seamless CGI and live-action blending",
      startingFrom: "Custom pricing"
    },
    seoMeta: {
      title: "Visual Effects Services | Supreme Animation Studio",
      description: "Professional VFX services. Compositing, CGI integration, motion tracking, rotoscoping, and color grading. Seamless visual effects for film and commercial production.",
      keywords: ["visual effects", "VFX", "compositing", "CGI integration", "motion tracking", "rotoscoping", "color grading"]
    }
  },
  {
    id: "virtual-reality",
    name: "Virtual & Augmented Reality",
    tagline: "Immersive experiences that blur the line between digital and physical",
    description: `Supreme Animation creates cutting-edge virtual and augmented reality experiences that engage users in entirely new ways. From immersive VR environments to interactive AR applications, we bring your vision to life in three-dimensional space.

Our VR/AR team combines technical expertise with creative innovation, delivering experiences that are both functional and captivating. Whether you need virtual tours, training simulations, or interactive brand experiences, we create immersive content that leaves lasting impressions.

With expertise across multiple platforms and devices, we ensure your VR/AR experiences are accessible, performant, and memorable.`,
    keyBenefits: [
      "Immersive 3D experiences",
      "Interactive and engaging content",
      "Multi-platform compatibility",
      "Real-time rendering and optimization",
      "Custom development solutions",
      "Training and simulation expertise"
    ],
    deliverables: [
      "VR experiences and applications",
      "AR mobile applications",
      "360° video content",
      "Virtual tours and walkthroughs",
      "Interactive 3D experiences",
      "Mixed reality solutions",
      "Virtual production setups",
      "Training simulations",
      "Immersive brand experiences"
    ],
    industries: [
      "Real Estate & Architecture",
      "Education & Training",
      "Healthcare & Medical",
      "Gaming & Entertainment",
      "Retail & E-Commerce",
      "Tourism & Hospitality"
    ],
    useCases: [
      "Creating virtual property tours and architectural walkthroughs for real estate marketing",
      "Developing training simulations and educational experiences for healthcare and corporate training",
      "Building interactive AR applications for retail and e-commerce product visualization",
      "Producing 360° video content for immersive storytelling and marketing campaigns",
      "Designing virtual production environments for film and television",
      "Creating interactive brand experiences and virtual showrooms for client engagement"
    ],
    processSteps: [
      {
        title: "Concept & Strategy",
        description: "We work with you to define the VR/AR experience goals, target platforms, and user interaction design."
      },
      {
        title: "3D Asset Creation",
        description: "Our team creates optimized 3D models, environments, and assets tailored for VR/AR platforms."
      },
      {
        title: "Development & Integration",
        description: "We develop the interactive experience, integrating 3D assets, interactions, and user interfaces."
      },
      {
        title: "Testing & Optimization",
        description: "We test across target devices, optimize performance, and refine the user experience."
      },
      {
        title: "Deployment & Support",
        description: "We deploy the experience to your chosen platforms and provide ongoing support and updates."
      },
      {
        title: "Analytics & Iteration",
        description: "We monitor user engagement and iterate based on feedback to continuously improve the experience."
      }
    ],
    subcategories: [
      "AR Development",
      "VR Experiences",
      "Mixed Reality Solutions",
      "Virtual Production",
      "360° Content Creation",
      "Interactive 3D Experiences"
    ],
    quickInfo: {
      timeline: "4-12 weeks",
      typicalProject: "VR experience or AR application",
      keyHighlight: "Immersive interactive experiences",
      startingFrom: "Custom pricing"
    },
    seoMeta: {
      title: "Virtual & Augmented Reality Services | Supreme Animation Studio",
      description: "Professional VR and AR development services. Virtual tours, training simulations, interactive experiences, and 360° content. Immersive solutions for your business.",
      keywords: ["virtual reality", "VR", "augmented reality", "AR", "360 video", "virtual tours", "interactive 3D", "mixed reality"]
    }
  },
  {
    id: "digital-solutions",
    name: "Digital Solutions",
    tagline: "Comprehensive digital solutions that drive engagement and results",
    description: `Supreme Animation offers end-to-end digital solutions that combine creative design with technical expertise. From web development to interactive installations, we create digital experiences that engage users and deliver measurable results.

Our digital solutions team bridges the gap between creativity and technology, delivering custom software, web applications, and interactive experiences. Whether you need a new website, mobile app, or custom digital platform, we provide solutions that are both beautiful and functional.

With expertise in modern development frameworks and creative technologies, we ensure your digital solutions are scalable, maintainable, and aligned with your business goals.`,
    keyBenefits: [
      "Full-stack development capabilities",
      "Custom software solutions",
      "Responsive and mobile-optimized",
      "Interactive and engaging experiences",
      "SEO and performance optimization",
      "Ongoing support and maintenance"
    ],
    deliverables: [
      "Web development and design",
      "Mobile applications (iOS & Android)",
      "Interactive installations",
      "E-learning platforms",
      "Digital marketing content",
      "Custom software development",
      "Content management systems",
      "API integration and development",
      "Performance optimization"
    ],
    industries: [
      "Technology & SaaS",
      "Education & E-Learning",
      "Healthcare & Medical",
      "Retail & E-Commerce",
      "Corporate & Enterprise",
      "Non-Profit & Social Impact"
    ],
    useCases: [
      "Building custom web applications and platforms for business operations",
      "Developing mobile applications for iOS and Android platforms",
      "Creating interactive installations and digital experiences for events and exhibitions",
      "Designing and developing e-learning platforms and educational tools",
      "Integrating custom software solutions with existing business systems",
      "Optimizing digital platforms for performance, SEO, and user experience"
    ],
    processSteps: [
      {
        title: "Discovery & Planning",
        description: "We analyze your requirements, define project scope, and create a detailed development roadmap."
      },
      {
        title: "Design & Prototyping",
        description: "Our team creates wireframes, prototypes, and design mockups for your review and approval."
      },
      {
        title: "Development & Implementation",
        description: "We build your digital solution using modern frameworks and best practices, ensuring quality and performance."
      },
      {
        title: "Testing & Quality Assurance",
        description: "We conduct thorough testing across devices and browsers, ensuring functionality and user experience."
      },
      {
        title: "Deployment & Launch",
        description: "We deploy your solution to production, configure hosting, and ensure everything is running smoothly."
      },
      {
        title: "Support & Maintenance",
        description: "We provide ongoing support, updates, and maintenance to keep your digital solution running optimally."
      }
    ],
    subcategories: [
      "Web Development",
      "Mobile Applications",
      "Interactive Installations",
      "Digital Marketing Content",
      "E-Learning Platforms",
      "Custom Software Development"
    ],
    quickInfo: {
      timeline: "6-16 weeks",
      typicalProject: "Web application or mobile app",
      keyHighlight: "Full-stack development expertise",
      startingFrom: "Custom pricing"
    },
    seoMeta: {
      title: "Digital Solutions Services | Supreme Animation Studio",
      description: "Professional digital solutions. Web development, mobile apps, interactive installations, and custom software. Comprehensive digital services for your business.",
      keywords: ["web development", "mobile apps", "custom software", "interactive installations", "e-learning platforms", "digital solutions"]
    }
  },
  {
    id: "intellectual-property",
    name: "Intellectual Property",
    tagline: "Creating original characters and stories that become lasting brands",
    description: `Supreme Animation specializes in developing original intellectual property, from character creation to animated series development. We help creators and brands build unique, memorable IP that resonates with audiences and stands the test of time.

Our IP development services cover every aspect of bringing original concepts to life, from initial character design to full animated series production. Whether you're launching a new brand, developing a children's series, or creating original content, we provide the creative and production expertise needed to succeed.

With experience in character design, world-building, and narrative development, we ensure your IP has the foundation needed for long-term success across multiple platforms and media. This also includes building and running our own in-house IPs, such as the LittleChamps Rhymes kids channel, giving us first-hand insight into what it takes to develop, grow, and maintain a modern animation brand.`,
    keyBenefits: [
      "Original character and world creation",
      "Comprehensive IP development",
      "Multi-platform content strategy",
      "Brand identity and design",
      "Animated series production",
      "Content licensing expertise"
    ],
    deliverables: [
      "Original character design and development",
      "Animated series development and production",
      "Brand identity and IP design",
      "World-building and universe creation",
      "Story and narrative development",
      "Content licensing and distribution strategy",
      "Character bibles and style guides",
      "Pilot episodes and proof-of-concept",
      "Merchandising and brand extension"
    ],
    industries: [
      "Entertainment & Media",
      "Children's Content",
      "Gaming & Interactive",
      "Brand & Marketing",
      "Education & E-Learning",
      "Publishing & Literature"
    ],
    useCases: [
      "Developing original animated characters and series for entertainment and children's content",
      "Creating brand mascots and characters for marketing and advertising campaigns",
      "Building original IP for gaming, interactive media, and digital platforms",
      "Designing character-based educational content and e-learning programs",
      "Developing animated series pilots and proof-of-concept content for funding and distribution",
      "Creating original IP with licensing potential for merchandise, books, and cross-media expansion"
    ],
    processSteps: [
      {
        title: "Concept Development",
        description: "We work with you to develop the core concept, characters, and world that will form the foundation of your IP."
      },
      {
        title: "Character & World Design",
        description: "Our team creates detailed character designs, world-building elements, and visual style guides."
      },
      {
        title: "Narrative Development",
        description: "We develop stories, scripts, and narrative arcs that bring your IP to life and engage audiences."
      },
      {
        title: "Production & Animation",
        description: "We produce animated content, pilot episodes, or proof-of-concept materials to showcase your IP."
      },
      {
        title: "Brand Strategy & Licensing",
        description: "We develop brand strategies and licensing opportunities to maximize the value and reach of your IP."
      },
      {
        title: "Distribution & Growth",
        description: "We help you navigate distribution channels and plan for the long-term growth and expansion of your IP."
      }
    ],
    subcategories: [
      "Original Character Creation",
      "Animated Series Development",
      "Brand Identity & IP Design",
      "Content Licensing"
    ],
    quickInfo: {
      timeline: "8-24 weeks",
      typicalProject: "Character creation or animated series pilot",
      keyHighlight: "Original IP development and production",
      startingFrom: "Custom pricing"
    },
    seoMeta: {
      title: "Intellectual Property Development Services | Supreme Animation Studio",
      description: "Professional IP development services. Original character creation, animated series development, brand identity, and content licensing. Building lasting intellectual property.",
      keywords: ["intellectual property", "character creation", "animated series", "IP development", "brand identity", "content licensing"]
    }
  }
];

export function getServiceCategoryById(id: string): ServiceCategory | undefined {
  return serviceCategories.find(cat => cat.id === id);
}

export function getAllServiceCategories(): ServiceCategory[] {
  return serviceCategories;
}

