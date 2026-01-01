"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
    {
        school: "UCL University College",
        degree: "Webudvikling (Top-up)",
        period: "09/2023 - 01/2025",
        location: "Odense, Denmark"
    },
    {
        school: "Zealand Academy of Technologies and Business",
        degree: "Multimediedesign",
        period: "09/2019 - 06/2021",
        location: "Slagelse, Denmark"
    },
    {
        school: "Next Uddannelse CPH",
        degree: "Film & TV Produktionuddannelse (Grundforløbet 2)",
        period: "01/2018 - 06/2019",
        location: "København, Denmark"
    },
    {
        school: "VUC FYN",
        degree: "Studentereksamen",
        period: "12/2016 - 06/2018",
        location: "Odense, Denmark"
    }
];

export default function Education() {
    return (
        <section id="education" className="py-24 bg-card/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Education <span className="text-primary">&</span> Qualifications
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        My academic foundation in web development, design, and media production.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-background p-6 rounded-xl border border-border hover:border-primary/50 transition-all shadow-sm flex gap-4"
                        >
                            <div className="mt-1">
                                <div className="p-3 bg-primary/10 rounded-full text-primary">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">{edu.degree}</h3>
                                <p className="text-primary font-medium text-sm mb-2">{edu.school}</p>
                                <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                                    <span>{edu.period}</span>
                                    <span>{edu.location}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
