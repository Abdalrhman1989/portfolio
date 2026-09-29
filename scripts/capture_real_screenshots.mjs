import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const projectsDir = path.resolve("./public/assets/projects");

const targets = [
  { name: "DeenPath", url: "https://deenpath.vercel.app", file: "deenpath.png", delay: 2 },
  { name: "ServixerSpace", url: "https://servixerspace.com", file: "servixerspace.png", delay: 3 },
  { name: "ExploreEase", url: "https://explore-ease-tawny.vercel.app", file: "exploreease.png", delay: 2 },
  { name: "uBreakWeFix", url: "https://ubreakwefix.vercel.app", file: "ubreakwefix.png", delay: 2 },
  { name: "Sud Event Decoration", url: "https://sud-event-decoration.vercel.app", file: "sud-decoration.png", delay: 2 },
  { name: "Basmeh", url: "https://basmeh-five.vercel.app", file: "basmeh.png", delay: 2 },
  { name: "Vavion", url: "https://vavion.vercel.app", file: "vavion.png", delay: 2 },
  { name: "Amera Kraidi", url: "https://amera-kraidi.vercel.app", file: "amera-kraidi.png", delay: 2 },
  { name: "StoryTrip AI", url: "https://story-trip-ai.vercel.app", file: "storytrip.png", delay: 2 },
  { name: "Zenith Apex Overdrive", url: "https://zenith-apex-overdrive.vercel.app", file: "zenith-apex.png", delay: 3 },
  { name: "Triply", url: "https://triply-one-nu.vercel.app", file: "triply.png", delay: 2 },
  { name: "Snake Neo", url: "https://snake-neo-mobile.vercel.app", file: "snakeneo.png", delay: 2 },
  { name: "Flux", url: "https://flux-mauve-ten.vercel.app", file: "flux.png", delay: 2 },
  { name: "Arcadeverse", url: "https://aracdeverse-next.vercel.app", file: "arcadeverse.png", delay: 2 },
  { name: "Hover Drift", url: "https://hover-drift.vercel.app", file: "hoverdrift.png", delay: 3 },
  { name: "Nexus Infinity Elite", url: "https://nexus-infinity-elite.vercel.app", file: "nexus-infinity.png", delay: 2 },
  { name: "Nexus Pro", url: "https://nexus-vert-gamma-96.vercel.app", file: "nexus.png", delay: 2 },
  { name: "Neon Drift", url: "https://neon-drift-pi.vercel.app", file: "neondrift.png", delay: 3 },
  { name: "Neon Survivors", url: "https://neon-survivors-nine.vercel.app", file: "neonsurvivors.png", delay: 2 },
  { name: "LinkFlow", url: "https://linkflow-teal.vercel.app", file: "linkflow.png", delay: 2 },
  { name: "Portfolio", url: "http://localhost:3000", file: "project-portfolio.png", delay: 2 },
];

for (const target of targets) {
  const outputPath = path.join(projectsDir, target.file);
  console.log(`Capturing ${target.name} from ${target.url}...`);
  try {
    const cmd = `npx capture-website-cli "${target.url}" --output="${outputPath}" --width=1280 --height=800 --scale-factor=1 --delay=${target.delay} --timeout=30 --overwrite`;
    execSync(cmd, { stdio: "inherit", timeout: 45000 });
    const stat = fs.statSync(outputPath);
    console.log(`✓ Successfully captured ${target.name} (${Math.round(stat.size / 1024)} KB) -> ${target.file}`);
  } catch (err) {
    console.error(`✗ Error capturing ${target.name}:`, err.message);
  }
}
console.log("All captures completed!");
