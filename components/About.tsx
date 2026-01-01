"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-24 bg-background relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
                >
                    {/* Image Side */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-border bg-muted">
                            <Image
                                src="/assets/profile.jpg"
                                alt="Abd Alrhman Profile"
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Decorative elements */}
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10" />
                            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -z-10" />
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            About <span className="text-primary">Me</span>
                        </h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            I'm Abd Alrhman Talaat Alshaar Dit Darra, a passionate Web Developer and UI/UX Designer based in Odense, Denmark.
                            With a background in Multimedia Design and a Bachelor's degree in Web Development, I bridge the gap between design and engineering.
                        </p>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            I have experience working with frontend and backend technologies, SaaS platforms, and eCommerce solutions.
                            My focus is on writing clean, performant code and creating intuitive user experiences that solve real-world problems.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
