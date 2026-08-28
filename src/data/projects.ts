export type ProjectCategory = "Websites" | "Branding" | "UI/UX" | "Digital Products";

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  client: string;
  description: string;
  tech: string[];
  image: string;
  year: string;
};

/**
 * Portfolio data is fully dynamic — replace entries here and the
 * grid, filters and pages update automatically.
 */
export const projects: Project[] = [
  {
    id: "modern-business-website",
    name: "Modern Business Website",
    category: "Websites",
    client: "Corporate · Services",
    description:
      "A professional website designed to help a growing business establish a strong online presence.",
    tech: ["React", "Tailwind CSS"],
    image: "https://image.qwenlm.ai/generated-images/f244d4c7-6896-466a-8bb5-083c020f95a4/_result.png",
    year: "2025",
  },
  {
    id: "ecommerce-platform",
    name: "E-Commerce Platform",
    category: "Websites",
    client: "Retail · Online Store",
    description:
      "A modern shopping experience with product browsing, cart functionality, and secure checkout.",
    tech: ["React", "Spring Boot", "MongoDB"],
    image: "https://image.qwenlm.ai/generated-images/57d5c67f-ac8a-416f-a48d-31bb62f0263b/_result.png",
    year: "2025",
  },
  {
    id: "personal-portfolio",
    name: "Personal Portfolio",
    category: "Websites",
    client: "Personal Brand",
    description:
      "A creative portfolio designed to showcase skills, projects, and professional experience.",
    tech: ["React", "Vite", "Tailwind CSS"],
    image: "https://image.qwenlm.ai/generated-images/6531f34a-ca02-4a4a-9948-c067e93c782b/_result.png",
    year: "2024",
  },
  {
    id: "aurora-brand-identity",
    name: "Aurora Brand Identity",
    category: "Branding",
    client: "Startup · Identity System",
    description:
      "A complete identity system — logo, color language, typography and guidelines for a young startup.",
    tech: ["Illustrator", "Figma", "Brand Guidelines"],
    image: "https://image.qwenlm.ai/generated-images/6c0f7435-7663-4c04-8061-5652069cf602/_result.png",
    year: "2025",
  },
  {
    id: "fintech-app-ui",
    name: "Fintech App UI",
    category: "UI/UX",
    client: "Mobile · Product Design",
    description:
      "A dark-mode banking companion with balance insights, spending charts and effortless transfers.",
    tech: ["Figma", "Prototyping", "Design System"],
    image: "https://image.qwenlm.ai/generated-images/25b5e069-3f54-4711-9df2-77763aadaeda/_result.png",
    year: "2024",
  },
  {
    id: "insight-analytics-dashboard",
    name: "Insight Analytics Dashboard",
    category: "Digital Products",
    client: "SaaS · Dashboard",
    description:
      "A business intelligence dashboard turning raw data into clear, decision-ready visual stories.",
    tech: ["React", "TypeScript", "Charts"],
    image: "https://image.qwenlm.ai/generated-images/1db8d524-8909-4f09-9971-aff007aa70ad/_result.png",
    year: "2025",
  },
];

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "Websites",
  "Branding",
  "UI/UX",
  "Digital Products",
];
