"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Award, X } from "lucide-react";

const certificates = [
    {
        title: "Bachelor's Degree",
        issuer: "Ministry of Higher Education",
        image: "/assets/certs/bachelor-diploma.png",
        date: "June 2021"
    },
    {
        title: "Multimedia Design & Communication",
        issuer: "Zealand Academy",
        image: "/assets/certs/multimedia-diploma.png",
        date: "June 2021"
    },
    {
        title: "Python Programming",
        issuer: "Itucation",
        image: "/assets/certs/python.png",
        date: "July 2023"
    },
    {
        title: "ASP.NET Core MVC",
        issuer: "Itucation",
        image: "/assets/certs/asp-net.png",
        date: "Sep 2022"
    },
    {
        title: "SQL Database Development",
        issuer: "Itucation",
        image: "/assets/certs/sql-dev.png",
        date: "Aug 2022"
    },
    {
        title: "Digital Marketing",
        issuer: "KEA",
        image: "/assets/certs/digital-marketing.png",
        date: "Jan 2023"
    }
];

export default function Certifications() {
    const [selectedCert, setSelectedCert] = useState<string | null>(null);

    return (
        <section id="certifications" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Certifications <span className="text-primary">&</span> Awards
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Continuous learning and professional development achievements. Click to view details.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            onClick={() => setSelectedCert(cert.image)}
                            className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md"
                        >
                            <div className="relative h-64 w-full bg-muted overflow-hidden">
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    fill
                                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-4">
                                    <Award className="w-8 h-8 text-primary mb-2" />
                                    <p className="text-white font-bold">{cert.title}</p>
                                    <p className="text-gray-300 text-sm">{cert.issuer}</p>
                                    <p className="text-primary text-xs mt-2">{cert.date}</p>
                                    <p className="text-white/80 text-xs mt-4 border border-white/30 px-3 py-1 rounded-full">Click to Open</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal for viewing certificate */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl max-h-[90vh] w-full bg-background rounded-xl overflow-hidden shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="relative w-full h-[80vh]">
                                <Image
                                    src={selectedCert}
                                    alt="Certificate Full View"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
