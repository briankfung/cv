import type { MetadataRoute } from "next";
import { cvData } from "@/data/cv";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${cvData.profile.name} — Curriculum Vitae`,
    short_name: cvData.profile.name,
    description: cvData.profile.headline,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1f3a5f",
  };
}
