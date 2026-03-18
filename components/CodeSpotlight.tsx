"use client";

import { motion } from "framer-motion";
import { Terminal, Code2, Clipboard, Scissors, Sparkles } from "lucide-react";

const codeSnippets = [
    {
        title: "The Architecture",
        desc: "Modular and scalable design pattern using TypeScript and modern hooks for maximum reusability and type safety.",
        lang: "TypeScript",
        code: `const useExperience = (id: string) => {
  const [data, setData] = useState<Experience | null>(null);
  const { fetcher } = usePipeline();

  useEffect(() => {
    fetcher.get('/api/exp', { id }).then(setData);
  }, [id, fetcher]);

  return { data, status: !!data };
};`
    },
    {
        title: "3D Motion Logic",
        desc: "Integrating smooth, physics-based 3D animations in Three.js with responsive controls and reactive shader updates.",
        lang: "Three + React",
        code: `useFrame(({ clock, mouse }) => {
  const time = clock.getElapsedTime();
  ref.current.rotation.x = mouse.y * 0.1;
  ref.current.rotation.y = mouse.x * 0.1;
  ref.current.position.y = Math.sin(time) * 2;
  ref.current.distort = 0.5 + Math.cos(time);
});`
    }
];

export default function CodeSpotlight() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="w-full lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 p-3 px-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 mb-8">
                                <Terminal className="w-5 h-5" />
                                <span className="text-sm font-black uppercase tracking-widest">Logic Showcase</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 italic">
                                Pure <br /><span className="text-primary not-italic">Technical</span> <br />Artistry
                            </h2>
                            <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">
                                I don't just build websites; I engineer complex digital systems. My code is structured for performance, scalability, and extreme type safety.
                                <br /><br />
                                Every line is a deliberate choice toward a perfect user experience.
                            </p>
                        </motion.div>
                    </div>

                    <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {codeSnippets.map((snippet, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="group bg-[#0a0a0a] border border-border/50 rounded-3xl overflow-hidden shadow-2xl relative"
                            >
                                <div className="p-6 bg-[#121212] border-b border-border/50 flex justify-between items-center group-hover:bg-primary/5 transition-colors">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground italic">{snippet.lang}</span>
                                </div>
                                
                                <div className="p-8">
                                    <h4 className="text-xl font-bold uppercase tracking-tight text-foreground mb-4">{snippet.title}</h4>
                                    <p className="text-sm text-muted-foreground mb-10 leading-relaxed group-hover:text-foreground/80 transition-colors">{snippet.desc}</p>
                                    
                                    <div className="relative p-6 bg-black/40 rounded-2xl border border-white/5 group-hover:border-primary/20 transition-all overflow-x-auto scrollbar-hide">
                                        <div className="absolute top-4 right-4 text-white/10 group-hover:text-primary/10 transition-colors">
                                            <Sparkles className="w-12 h-12" />
                                        </div>
                                        <pre className="text-xs md:text-sm font-mono leading-relaxed text-blue-400/80 group-hover:text-blue-400 transition-colors whitespace-pre">
                                            {snippet.code}
                                        </pre>
                                    </div>
                                </div>

                                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
