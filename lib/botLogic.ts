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
        expertise: "Bridging UI/UX design and complex engineering for scalable digital products.",
        philosophy: "I believe in 'Functional Aesthetics'—where beauty is never at the expense of performance or usability. Every animation, pixel, and line of code must serve a purpose."
    },
    services: [
        { title: "Web Development", desc: "High-performance web applications using the latest Next.js 15 and React technology." },
        { title: "AI & Coding Agents", desc: "Implementing advanced AI agents, customized LLM workflows, and intelligent coding automation systems." },
        { title: "Mobile App Development", desc: "Cross-platform mobile solutions with Flutter and React Native for iOS and Android." },
        { title: "3D Design & Motion", desc: "Immersive 3D visuals, cinematic motion graphics (Blender/GSAP)." },
        { title: "Automation & APIs", desc: "Robust API architectures and complex automation tunnels." },
        { title: "UI/UX Design", desc: "Intuitive digital experiences combining aesthetics with conversion-focused journeys." },
        { title: "Cinematic Drone & Photo", desc: "Professional 4K drone pilot and photography services." }
    ],
    experience: [
        { 
            company: "AirPlate", 
            role: "Mobile App Developer", 
            period: "06/2024 - 09/2024", 
            details: "Developed drone monitoring systems using Network/Direct Remote ID and drone scanners. Specialized in Flutter and mobile technologies." 
        },
        { 
            company: "Self-Employed / Freelance", 
            role: "Full Stack Developer", 
            period: "2021 - Present", 
            details: "Crafting custom SaaS and premium web solutions with Next.js and modern UI/UX architecture." 
        },
        { 
            company: "IWCS", 
            role: "Film Producer & Designer", 
            period: "2020 - 2021", 
            details: "Animation, graphic design, and production of advertising materials and tutorials." 
        },
        { 
            company: "Ubreak Wefix", 
            role: "Web Developer", 
            period: "2018 - 2020", 
            details: "Lead developer for WooCommerce platform. Managed maintenance, feature updates, and inventory system integration." 
        }
    ],
    projects: [
        { name: "DeenPath", tech: "Next.js", desc: "Premium Islamic companion app focusing on high-end user experience." },
        { name: "ServixerSpace", tech: "Framer Motion", desc: "Agency portfolio showcasing advanced animations and interaction design." },
        { name: "AirPlate App", tech: "Flutter", desc: "Drone tracking system available on the App Store." },
        { name: "CityForge", tech: "Python/Blender", desc: "Procedural city generator built for Blender 4.x using Geometry Nodes." },
        { name: "Neon Survivors", tech: "TypeScript", desc: "High-performance top-down shooter game." },
        { name: "Tech Runner", tech: "React/Canvas", desc: "Interactive runner game with procedural audio." }
    ],
    skills: {
        frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"],
        mobile: ["Flutter", "Dart", "Firebase", "iOS", "Android"],
        backend: ["Node.js", "PostgreSQL", "Prisma", "PHP", "WooCommerce", "APIs"],
        creative: ["Blender", "3D Animation", "Python API", "Cinematic Drone Photography", "UI/UX Architecture"]
    },
    faq: [
        { q: "Design Philosophy", a: "I focus on Functional Aesthetics—ensuring performance matches the beauty." },
        { q: "Scalability", a: "I use modular, type-safe architectures in Next.js and TypeScript." },
        { q: "International Work", a: "Yes, I work globally from Odense, Denmark." }
    ],
    socials: {
        discord: "abdalrhmanaldarra",
        github: "Abdalrhman1989",
        linkedin: "abd-al-rhman-aldarra-8a24bb18b",
        instagram: "abdalrhman.darra",
        portfolioUrl: "abdalrhmanaldarra.com"
    }
};

const keywords = {
    projects: ["project", "work", "build", "portfolio", "done", "made", "deenpath", "servixer", "airplate", "cityforge", "game", "runner", "memory"],
    experience: ["experience", "job", "career", "history", "work", "resume", "cv", "airplate", "iwcs", "ubreak", "freelance"],
    skills: ["skill", "tech", "use", "stack", "program", "code", "language", "react", "next", "flutter", "blender", "python", "drone", "animation"],
    personal: ["who", "name", "old", "age", "born", "about", "location", "denmark", "odense", "education", "degree", "university", "ucl", "philosophy", "sculptor"],
    contact: ["hire", "contact", "email", "mail", "discord", "social", "message", "linkedin", "phone", "instagram"]
};

export const findBestResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // Check specific project triggers
    if (q.includes("deenpath")) return "DeenPath is a premium Islamic companion app I built using Next.js. It focuses on high-end UI/UX and religious utility.";
    if (q.includes("airplate")) return "At AirPlate, I developed advanced drone tracking systems using Flutter and Direct Remote ID tech. It's built for precision and safety.";
    if (q.includes("cityforge")) return "CityForge is my custom Blender add-on for procedural city generation, powered by Geometry Nodes and Python.";
    if (q.includes("sculptor")) return "Memory Sculptor is a creative Python tool I built that transforms human memories into unique 3D abstract sculptures.";

    // Logic for Personal/About
    if (keywords.personal.some(k => q.includes(k))) {
        if (q.includes("philosophy")) return portfolioData.bio.philosophy;
        if (q.includes("education") || q.includes("degree") || q.includes("university")) return `I hold a ${portfolioData.bio.education}. My academic journey at UCL University College helped me bridge the gap between design and high-level engineering.`;
        return `I'm ${portfolioData.bio.fullName}, a ${portfolioData.bio.role} based in ${portfolioData.bio.location}. I was born in ${portfolioData.bio.born} and my focus is on building scalable, user-focused digital products.`;
    }

    // Logic for Services
    if (q.includes("service") || q.includes("offer") || q.includes("do for me") || q.includes("help")) {
        return `I offer a wide range of high-end services including ${portfolioData.services.slice(0, 4).map(s => s.title).join(", ")}, and even Cinematic Drone Photography. You can see the full list in my Services section!`;
    }

    // Logic for Projects
    if (keywords.projects.some(k => q.includes(k))) {
        const pNames = portfolioData.projects.map(p => p.name).join(", ");
        return `I've built several high-performance projects like ${pNames}. I specialize in Next.js for web and Flutter for mobile. You can explore the interactive demos in the Projects section above!`;
    }

    // Logic for Experience
    if (keywords.experience.some(k => q.includes(k))) {
        const latest = portfolioData.experience[0];
        return `My professional background includes being a ${latest.role} at ${latest.company} (${latest.period}), leading WooCommerce development at uBreakWeFix, and several years of high-end Full Stack Freelancing. I've worked across Denmark and globally!`;
    }

    // Logic for Skills
    if (keywords.skills.some(k => q.includes(k))) {
        return `I'm highly proficient in ${portfolioData.skills.frontend.join(", ")} for web, plus ${portfolioData.skills.mobile.join(", ")} for mobile devices. I also have deep expertise in ${portfolioData.skills.creative.join(", ")}. Basically, I can handle everything from design to complex logic!`;
    }

    // Logic for Contact
    if (keywords.contact.some(k => q.includes(k))) {
        return `Let's build something together! You can reach me at ${portfolioData.bio.email}, find me on Discord (${portfolioData.socials.discord}), or check my Instagram for my creative photography work. All links are in the Contact section!`;
    }

    // Fallback/Greeting
    if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
        return `Hello! I'm your gateway to Abd Alrhman's professional world. Ask me about his drone projects, his Next.js expertise, or his unique design philosophy!`;
    }

    return `I'm optimized to tell you everything about Abd's career—from his degree at UCL to his engineering work at AirPlate. What specific part of his experience or skills would you like to know more about?`;
};
