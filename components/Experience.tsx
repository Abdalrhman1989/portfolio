"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

// Chronological Order: Most Recent -> Oldest based on user data
// AirPlate: 06/2024 - 09/2024 (Most recent specific job)
// Freelance: 2021 - Present (Current ongoing)
// IWCS: 01/2020 - 04/2021
// Ubreak Wefix: 07/2018 - 01/2020

const experiences = [
    {
        role: "Mobile App Developer",
        company: "AirPlate",
        period: "06/2024 - 09/2024",
        description: "Developed comprehensive drone monitoring systems using Network/Direct Remote ID and drone scanners. Specialized in Flutter and mobile technologies.",
    },
    {
        role: "Freelance Web Developer & Designer",
        company: "Self-Employed",
        period: "2021 - Present",
        description: "Designing and developing responsive websites for diverse clients. Specializing in React, Next.js, and modern UI/UX principles to deliver high-quality digital solutions.",
    },
    {
        role: "Film Producer & Designer",
        company: "IWCS",
        period: "01/2020 - 04/2021",
        description: "Working with animation, graphic design, and production of advertising materials and tutorials. Created engaging visual content for marketing campaigns.",
    },
    {
        role: "Web Developer",
        company: "Ubreak Wefix",
        period: "07/2018 - 01/2020",
        description: "Lead developer for the WooCommerce platform. Managed website maintenance, feature updates, and inventory system integration.",
    }
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 bg-background relative">
            {/* Decorative vertical line */}
            <div className="absolute left-4 md:left-1/2 top-24 bottom-24 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-background inline-block px-4">
                        Work <span className="text-primary">Experience</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        My professional journey in web development and design.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto space-y-12 md:space-y-0 relative">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                } relative z-10`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-4 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 hidden md:block" />

                            {/* Content Card */}
                            <div className="md:w-1/2">
                                <div className={`bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-all shadow-sm ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                                    }`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <Briefcase className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{exp.company}</h3>
                                            <span className="text-sm text-primary font-medium">{exp.period}</span>
                                        </div>
                                    </div>

                                    <h4 className="text-xl font-bold mb-2">{exp.role}</h4>
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>

                            {/* Empty Spacer for alternating layout */}
                            <div className="md:w-1/2" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
