export const portfolioData = {
    bio: {
        name: "Abd Alrhman Talaat Alshaar Dit Darra",
        title: "Software Developer & Full Stack Mobile App Developer",
        location: "Odense, Denmark",
        education: "Bachelor's degree in Web Development & Multimedia Design from UCL University College (2024).",
        summary: "I'm a seasoned developer born in 1989. I bridge the gap between UI/UX design and complex engineering, turning pixel-perfect aesthetics into scalable digital products."
    },
    skills: [
        { name: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "HTML5 Canvas"] },
        { name: "Mobile", items: ["Flutter (Dart)", "Firebase", "iOS/Android Development"] },
        { name: "Backend", items: ["Node.js", "PostgreSQL", "Prisma", "WooCommerce", "PHP"] },
        { name: "3D/Creative", items: ["Blender", "Python API", "Geometry Nodes", "Three.js", "Video Production", "UI/UX Design"] }
    ],
    projects: [
        { name: "DeenPath", desc: "A premium Islamic companion app built with Next.js focusing on high-end user experience." },
        { name: "ServixerSpace", desc: "My professional agency portfolio featuring advanced animations and interactive 3D elements." },
        { name: "AirPlate", desc: "A Flutter-based drone tracking and monitoring system currently on the App Store." },
        { name: "CityForge", desc: "A powerful Blender add-on I created for procedural city generation using Python." },
        { name: "Neon Survivors", desc: "A high-performance top-down shooter game built with pure TypeScript and Canvas." },
        { name: "Tech Runner", desc: "The arcade game you're playing right now! Built with React and Procedural Audio." }
    ],
    experience: [
        { role: "Mobile App Developer", company: "AirPlate", year: "2024", task: "Developed drone monitoring and tracking systems." },
        { role: "Freelance Full Stack Developer", company: "Self-employed", year: "2021-Present", task: "Crafting custom SaaS and eCommerce solutions for global clients." },
        { role: "Film Producer & Designer", company: "IWCS", year: "2020-2021", task: "Handling animation, advertising, and high-end video production." },
        { role: "Web Developer", company: "uBreakWeFix", year: "2018-2020", task: "Lead WooCommerce developer managing complex store architectures." }
    ],
    socials: {
        github: "Abdalrhman1989",
        linkedin: "abd-al-rhman-aldarra-8a24bb18b",
        instagram: "abdalrhman.darra",
        discord: "abdalrhmanaldarra",
        email: "abdalrhmanaldarra@gmail.com"
    }
};

export const findBestResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // 1. Projects
    if (q.includes("project") || q.includes("work") || q.includes("build") || q.includes("portfolio")) {
        const names = portfolioData.projects.map(p => p.name).join(", ");
        return `I've built several high-end projects including ${names}. My favorites are DeenPath and the AirPlate drone system. You can see the full list in the Projects section!`;
    }

    // 2. Skills / Tech
    if (q.includes("skill") || q.includes("tech") || q.includes("use") || q.includes("stack") || q.includes("program") || q.includes("code")) {
        return `My tech stack is quite diverse. I specialize in Next.js and Tailwind for web, Flutter for mobile, and Node.js for backend. I also do a lot of 3D work with Blender and Python. Is there a specific technology you're interested in?`;
    }

    // 3. Experience / Resume
    if (q.includes("experience") || q.includes("job") || q.includes("career") || q.includes("history") || q.includes("resume") || q.includes("cv")) {
        return `I've worked as a Mobile dev at AirPlate, a Web lead at uBreakWeFix, and I've been freelancing since 2021! I hold a Bachelor's in Web Development. You can check the Experience section for the full timeline!`;
    }

    // 4. Personal / Contact
    if (q.includes("who") || q.includes("name") || q.includes("you") || q.includes("hire") || q.includes("contact") || q.includes("email") || q.includes("location") || q.includes("denmark")) {
        return `I'm Abd Alrhman Darra, a Software Developer based in Odense, Denmark 🇩🇰. I'm always open to new challenges! You can reach me at ${portfolioData.socials.email} or find me on Discord (${portfolioData.socials.discord}).`;
    }

    // 5. Game
    if (q.includes("game") || q.includes("play") || q.includes("runner")) {
        return `That's Tech Runner! I built it with React and pure Canvas logic. It even has procedural audio. Use your mouse to dodge the bugs!`;
    }

    // 6. Generic Greetings
    if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("up")) {
        return `Hello! I'm Abd's virtual logic. I can answer questions about his career, code, or projects. What would you like to know?`;
    }

    // 7. Default
    return `That's an interesting question! While I'm just a lightweight logic agent representing Abd, I can definitely tell you about his projects, skills, or professional background. Feel free to ask about his work at AirPlate or his custom Blender tools!`;
};
