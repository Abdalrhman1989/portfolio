export interface InstagramVideo {
    id: string;
    title: string;
    category: "all" | "motion" | "agency" | "art" | "3d" | "showreel";
    categoryLabel: string;
    videoUrl: string;
    posterUrl: string;
    aspectRatio: "16:9" | "9:16" | "1:1";
    duration: string;
    views: string;
    likes: string;
    comments: string;
    description: string;
    tags: string[];
    tools: string[];
    featured?: boolean;
    instagramUrl: string;
    date: string;
}

export const INSTAGRAM_PROFILE = {
    handle: "abdalrhman.darra",
    name: "Abd Alrhman Al Darra",
    title: "Multimedia Designer & Full-Stack AI Engineer",
    avatar: "/assets/hero/hero-avatar.png",
    bio: "Exploring the bleeding edge of 3D motion graphics, VFX, AI-driven digital experiences, and scalable software. Based in Odense, Denmark 🇩🇰.",
    followers: "Active Creative Hub",
    postsCount: "12+ Featured Reels",
    profileUrl: "https://www.instagram.com/abdalrhman.darra",
    whatsappUrl: "https://wa.me/4542223110",
    emailUrl: "mailto:abdalrhmanaldarra@gmail.com",
    highlights: [
        { label: "Motion VFX", icon: "✨", filter: "motion" },
        { label: "Agency Work", icon: "🚀", filter: "agency" },
        { label: "3D Renders", icon: "🧊", filter: "3d" },
        { label: "Digital Art", icon: "🎨", filter: "art" },
        { label: "SaaS Reels", icon: "💻", filter: "showreel" },
    ]
};

export const INSTAGRAM_VIDEOS: InstagramVideo[] = [
    {
        id: "servixer-motion",
        title: "Servixer Space — Flagship Motion Graphics & UI Animation",
        category: "motion",
        categoryLabel: "Motion Graphics & VFX",
        videoUrl: "/videos/instagram/servixer_motion_graphics.mp4",
        posterUrl: "/videos/instagram/posters/servixer_thumb.jpg",
        aspectRatio: "16:9",
        duration: "3:09 min",
        views: "14.2K",
        likes: "1,240",
        comments: "86",
        description: "Official After Effects motion identity showcase for the Servixer Space platform. Highlights 122+ micro-SaaS utilities, dynamic token mechanics, and animated dashboard transitions.",
        tags: ["#MotionGraphics", "#AfterEffects", "#UIAnimation", "#SaaS", "#CreativeDev"],
        tools: ["Adobe After Effects", "Illustrator", "Next.js", "Motion Design"],
        featured: true,
        instagramUrl: "https://www.instagram.com/abdalrhman.darra",
        date: "Feb 2026"
    },
    {
        id: "digital-painting",
        title: "Digital Concept Speed Art & Character Composition",
        category: "art",
        categoryLabel: "Digital Art & Painting",
        videoUrl: "/videos/instagram/digital_painting_speedart.mp4",
        posterUrl: "/videos/instagram/posters/painting_thumb.jpg",
        aspectRatio: "16:9",
        duration: "3:09 min",
        views: "9.8K",
        likes: "892",
        comments: "54",
        description: "High-speed artistic time-lapse demonstrating digital composition, light balancing, color theory, and dynamic character illustration from sketch to final render.",
        tags: ["#DigitalPainting", "#SpeedArt", "#ConceptArt", "#Photoshop", "#Illustration"],
        tools: ["Adobe Photoshop", "Wacom Tablet", "After Effects", "Color Grading"],
        featured: true,
        instagramUrl: "https://www.instagram.com/abdalrhman.darra",
        date: "Jan 2026"
    },
    {
        id: "trump-tower",
        title: "Trump Tower Commercial & Architectural Visuals (Elevate SA)",
        category: "agency",
        categoryLabel: "Commercial & Agency",
        videoUrl: "/videos/instagram/elevate_trump_tower.mp4",
        posterUrl: "/videos/instagram/posters/trump_tower_thumb.jpg",
        aspectRatio: "16:9",
        duration: "0:40 min",
        views: "18.5K",
        likes: "1,680",
        comments: "112",
        description: "Cinematic commercial for luxury architectural properties and high-profile developments, produced for Elevate's brand campaign.",
        tags: ["#Cinematography", "#ArchitecturalFilm", "#ElevateSA", "#Commercial", "#VisualEffects"],
        tools: ["Adobe Premiere Pro", "Color Grading", "After Effects", "Sound Design"],
        featured: true,
        instagramUrl: "https://www.instagram.com/abdalrhman.darra",
        date: "Sep 2025"
    },
    {
        id: "portfolio-showreel",
        title: "Client Platforms & Full-Stack Showreel 2026",
        category: "showreel",
        categoryLabel: "Tech & Showreels",
        videoUrl: "/videos/Abd-Alrhman-Al-Darra-Portfolio.mp4",
        posterUrl: "/videos/portfolio-poster.jpg",
        aspectRatio: "16:9",
        duration: "0:51 min",
        views: "22.1K",
        likes: "2,450",
        comments: "148",
        description: "Fast-paced breakdown of flagship production platforms including Servixer Space, uBreak WeFix repair booking flow, and responsive 3D interactive web applications.",
        tags: ["#Showreel", "#FullStack", "#WebDevelopment", "#Interactive3D", "#NextJS"],
        tools: ["Next.js", "TypeScript", "Three.js", "TailwindCSS"],
        featured: true,
        instagramUrl: "https://www.instagram.com/abdalrhman.darra",
        date: "2026"
    },
    {
        id: "3d-flow",
        title: "Memory Sculptor — Organic 3D Flow Simulation",
        category: "3d",
        categoryLabel: "3D Art & Shaders",
        videoUrl: "/videos/instagram/3d_sculptor_flow.mp4",
        posterUrl: "/videos/instagram/posters/3d_flow_thumb.jpg",
        aspectRatio: "16:9",
        duration: "0:05 min",
        views: "7.4K",
        likes: "640",
        comments: "39",
        description: "Hypnotic procedural generative 3D simulation exploring memory decay, geometric flow, and real-time GPU particle physics.",
        tags: ["#ThreeJS", "#WebGL", "#GenerativeArt", "#Blender3D", "#CreativeCoding"],
        tools: ["Three.js", "WebGL", "Blender", "Shader Art"],
        instagramUrl: "https://www.instagram.com/abdalrhman.darra",
        date: "Jan 2026"
    },
    {
        id: "3d-spiritual",
        title: "Memory Sculptor — Spiritual Consciousness Render",
        category: "3d",
        categoryLabel: "3D Art & Shaders",
        videoUrl: "/videos/instagram/3d_sculptor_spiritual.mp4",
        posterUrl: "/videos/instagram/posters/3d_spiritual_thumb.jpg",
        aspectRatio: "16:9",
        duration: "0:05 min",
        views: "8.1K",
        likes: "730",
        comments: "42",
        description: "Luminous volumetric particle nebula simulating transcendent cognitive spaces and generative light dispersion.",
        tags: ["#GenerativeArt", "#3DDesign", "#VFX", "#DigitalArt", "#Shaders"],
        tools: ["GLSL", "Three.js", "Blender", "Generative Physics"],
        instagramUrl: "https://www.instagram.com/abdalrhman.darra",
        date: "Jan 2026"
    },
    {
        id: "3d-nostalgic",
        title: "Memory Sculptor — Nostalgic Resonance Render",
        category: "3d",
        categoryLabel: "3D Art & Shaders",
        videoUrl: "/videos/instagram/3d_sculptor_nostalgic.mp4",
        posterUrl: "/videos/instagram/posters/3d_nostalgic_thumb.jpg",
        aspectRatio: "16:9",
        duration: "0:05 min",
        views: "6.9K",
        likes: "580",
        comments: "31",
        description: "Soft chromatic bloom and ambient particle lattice capturing nostalgic sensory memory through generative physics.",
        tags: ["#Atmospheric3D", "#Lighting", "#SoundReactive", "#MotionArt"],
        tools: ["Three.js", "Blender", "Sound Reactive Physics"],
        instagramUrl: "https://www.instagram.com/abdalrhman.darra",
        date: "Jan 2026"
    },
    {
        id: "resume-video",
        title: "Developer Career Journey & Technical Background Video",
        category: "showreel",
        categoryLabel: "Tech & Showreels",
        videoUrl: "/videos/Abd-Aldarra-Resume.mp4",
        posterUrl: "/videos/resume-poster.jpg",
        aspectRatio: "16:9",
        duration: "0:51 min",
        views: "15.7K",
        likes: "1,420",
        comments: "79",
        description: "Visual breakdown of academic credentials, multimedia design & communication degree, and full-stack software development milestones.",
        tags: ["#DeveloperJourney", "#MultimediaDesign", "#TechCareer", "#Denmark"],
        tools: ["Motion Design", "Video Editing", "Personal Brand"],
        instagramUrl: "https://www.instagram.com/abdalrhman.darra",
        date: "2026"
    }
];
