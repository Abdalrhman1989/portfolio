import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-card border-t border-border py-12">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="text-lg font-bold">Abd Alrhman<span className="text-primary">.</span></p>
                    <p className="text-sm text-muted-foreground mt-2">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>

                <div className="flex gap-6">
                    <a href="https://github.com/Abdalrhman1989" target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary hover:scale-110 transition-all border border-border">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com/in/abd-alrhman-al-darra-45160911b" target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary hover:scale-110 transition-all border border-border">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/abdalrhman.darra" target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary hover:scale-110 transition-all border border-border">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="mailto:abdalrhmanaldarra@gmail.com" className="p-2 bg-background rounded-full hover:text-primary hover:scale-110 transition-all border border-border">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
