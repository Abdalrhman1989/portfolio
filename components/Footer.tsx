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
                    <a href="https://github.com/Abdalrhman1989" target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary hover:scale-110 transition-all border border-border" title="GitHub">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com/in/abd-al-rhman-aldarra-8a24bb18b" target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary hover:scale-110 transition-all border border-border" title="LinkedIn">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/abdalrhman.darra" target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary hover:scale-110 transition-all border border-border" title="Instagram">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://discord.com/users/abdalrhmanaldarra" target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary hover:scale-110 transition-all border border-border group" title="Discord: abdalrhmanaldarra">
                         <svg className="w-5 h-5 fill-current" viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14h0C129.58,52.87,121,29,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.43-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>
                    </a>
                    <a href="mailto:abdalrhmanaldarra@gmail.com" className="p-2 bg-background rounded-full hover:text-primary hover:scale-110 transition-all border border-border" title="Email">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
