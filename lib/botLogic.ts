export const portfolioData = {
    bio: {
        firstName: "Abd Alrhman",
        lastName: "Darra",
        fullName: "Abd Alrhman Talaat Alshaar Dit Darra",
        role: "Software Developer & Full Stack Mobile App Developer",
        email: "abdalrhmanaldarra@gmail.com",
        location: "Odense, Denmark 🇩🇰",
        born: 1989,
        education: "Bachelor's degree in Web Development & Multimedia Design from UCL University College (Class of 2024)",
        expertise: "Bridging UI/UX design and complex engineering for scalable digital products."
    },
    experience: [
        { 
            company: "AirPlate", 
            role: "Mobile App Developer", 
            period: "06/2024 - 09/2024", 
            details: "Built drone monitoring systems using Flutter and Direct Remote ID tech. Expert in drone scanners." 
        },
        { 
            company: "Self-Employed / Freelance", 
            role: "Full Stack Developer", 
            period: "2021 - Present", 
            details: "Crafting custom SaaS and high-end web solutions using Next.js, React, and modern UI/UX architecture." 
        },
        { 
            company: "IWCS", 
            role: "Film Producer & Designer", 
            period: "2020 - 2021", 
            details: "Produced advertising materials, animations, and tutorials with high visual impact." 
        },
        { 
            company: "uBreakWeFix", 
            role: "Web Developer", 
            period: "2018 - 2020", 
            details: "Lead WooCommerce dev managing complex store systems and inventory integrations." 
        }
    ],
    projects: [
        { name: "DeenPath", tech: "Next.js", desc: "A premium Islamic companion app focusing on high-end user experience." },
        { name: "ServixerSpace", tech: "Framer Motion", desc: "Agency portfolio showcasing advanced animations and interaction design." },
        { name: "AirPlate App", tech: "Flutter", desc: "Drone tracking system available on the App Store." },
        { name: "CityForge", tech: "Python/Blender", desc: "Procedural city generator built for Blender 4.x using Geometry Nodes." },
        { name: "Neon Survivors", tech: "TypeScript", desc: "High-performance top-down shooter game." },
        { name: "Tech Runner", tech: "React/Canvas", desc: "Interactive runner game with procedural audio." },
        { name: "Memory Sculptor", tech: "Python/Blender", desc: "Transforms human memories into unique 3D abstract sculptures." }
    ],
    skills: {
        frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"],
        mobile: ["Flutter", "Dart", "Firebase", "iOS/Android"],
        backend: ["Node.js", "PostgreSQL", "Prisma", "PHP", "WooCommerce"],
        creative: ["Blender", "3D Modeling", "Python API", "UI/UX Architecture", "Video Production"]
    },
    socials: {
        discord: "abdalrhmanaldarra",
        github: "Abdalrhman1989",
        linkedin: "abd-al-rhman-aldarra-8a24bb18b",
        instagram: "abdalrhman.darra"
    }
};

const keywords = {
    projects: ["project", "work", "build", "portfolio", "done", "made", "created", "deenpath", "servixer", "airplate", "cityforge", "game", "runner", "memory"],
    experience: ["experience", "job", "career", "history", "work", "resume", "cv", "airplate", "iwcs", "ubreak", "freelance"],
    skills: ["skill", "tech", "use", "stack", "program", "code", "language", "learn", "know", "react", "next", "flutter", "blender", "python"],
    personal: ["who", "name", "old", "age", "born", "you", "about", "location", "denmark", "odense", "live", "education", "degree", "university", "ucl"],
    contact: ["hire", "contact", "email", "mail", "discord", "social", "message", "linkedin", "phone"]
};

export const findBestResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // Check Personal / Education
    if (keywords.personal.some(k => q.includes(k))) {
        return `I'm ${portfolioData.bio.fullName}, a ${portfolioData.bio.role} based in ${portfolioData.bio.location}. I was born in ${portfolioData.bio.born} and hold a ${portfolioData.bio.education}. I specialize in bridging design and engineering.`;
    }

    // Check Projects
    if (keywords.projects.some(k => q.includes(k))) {
        const pList = portfolioData.projects.map(p => p.name).join(", ");
        return `I've created several high-impact projects like ${pList}. DeenPath is my focus for high-end web dev, while CityForge shows my expertise in Blender & Python. You can find links to them in the Projects section!`;
    }

    // Check Experience
    if (keywords.experience.some(k => q.includes(k))) {
        const exp = portfolioData.experience[0]; // Get most recent
        return `My professional journey includes being a ${exp.role} at ${exp.company} (${exp.period}), and I've been a Full Stack Freelancer since 2021. I've also led WooCommerce developments at uBreakWeFix. Check my Experience section for the full timeline!`;
    }

    // Check Skills
    if (keywords.skills.some(k => q.includes(k))) {
        return `I'm proficient across the stack: ${portfolioData.skills.frontend.slice(0, 3).join(", ")} for web, Flutter for mobile, and Blender/Python for 3D tools. I love pushing the boundaries of what's possible with code!`;
    }

    // Check Contact
    if (keywords.contact.some(k => q.includes(k))) {
        return `You can reach me directly via Discord (${portfolioData.socials.discord}), Email (${portfolioData.bio.email}), or LinkedIn. I'm always open to discussing new projects or scaled engineering challenges!`;
    }

    // Interactive response for specific project
    if (q.includes("deenpath")) return "DeenPath is a premium Islamic companion app I built using Next.js. It focuses on high-end UI/UX and performance.";
    if (q.includes("airplate")) return "At AirPlate, I developed advanced drone tracking systems using Flutter and Direct Remote ID tech.";
    if (q.includes("cityforge")) return "CityForge is a Blender add-on I created for procedural city generation. It uses Geometry Nodes and Python.";

    // Default Greeting or fallback
    if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
        return `Hello! I'm Abd's logical representative. I can tell you all about his projects, technical expertise, or career history. What would you like to explore first?`;
    }

    return `I'm not exactly sure what you mean, but I can certainly tell you about Abd's work at AirPlate, his custom Blender tools like CityForge, or his skills in Next.js and Flutter! What's on your mind?`;
};
