import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Instagram Video Showcase & Reels | Abd Alrhman Al Darra (@abdalrhman.darra)",
    description:
        "Explore original motion graphics, 3D generative simulations, speed painting, and commercial agency showreels by Abd Alrhman Al Darra (@abdalrhman.darra).",
    keywords: [
        "Abd Alrhman Al Darra",
        "abdalrhman.darra",
        "Instagram Reels",
        "Motion Graphics Showreel",
        "After Effects Motion Design",
        "3D WebGL Three.js Shaders",
        "Speed Painting Digital Art",
        "Elevate SA Commercials",
        "Servixer Space"
    ],
    openGraph: {
        title: "Instagram Video Showcase & Reels | Abd Alrhman Al Darra",
        description:
            "Watch 1080p and 4K creative motion graphics, 3D simulations, and design showreels.",
        url: "https://portfolio-abdal-2026.vercel.app/instagram",
        siteName: "Abd Alrhman Al Darra Portfolio",
        images: [
            {
                url: "/videos/portfolio-poster.jpg",
                width: 1200,
                height: 630,
                alt: "Abd Alrhman Al Darra Instagram Video Showcase"
            }
        ],
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Instagram Video Showcase | Abd Alrhman Al Darra",
        description:
            "Watch motion graphics, 3D simulations, and design showreels.",
        images: ["/videos/portfolio-poster.jpg"]
    }
};

export default function InstagramLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
